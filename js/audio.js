/**
 * This module manages the audio in the game.
 * 
 * It provides functions to play, pause, reset, and mute/unmute audio.
 * It also provides a function to toggle the mute state of all sounds.
 * 
 * @module audio
 */


/**
 * Configuration for the audio files used in the game.
 * Each object in the array represents an audio file, with properties for the name, path, loop, and volume.
 * @type {Object[]}
 */
const audioConfig = [
    {
        name: "startAudio",
        path: "audio/start_audio.mp3",
        loop: true,
        volume: 0.2
    },
    {
        name: "backgroundMusic",
        path: "audio/backgroundMusic.mp3",
        loop: true,
        volume: 0.1
    },
    {
        name: "walkingAudio",
        path: "audio/running.mp3",
        loop: false,
        volume: 1.0
    },
    {
        name: "jumpingAudio",
        path: "audio/jump.mp3",
        loop: false,
        volume: 0.7
    },
    {
        name: "hurtAudio",
        path: "audio/hurt.mp3",
        loop: false,
        volume: 0.3
    },
    {
        name: "gameOverAudio",
        path: "audio/game_over.mp3",
        loop: false,
        volume: 0.2
    },
    {
        name: "hitEnemyAudio",
        path: "audio/hit_enemy.mp3",
        loop: false,
        volume: 0.5
    },
    {
        name: "coinAudio",
        path: "audio/coin.mp3",
        loop: false,
        volume: 1.0
    },
    {
        name: "collectBottleAudio",
        path: "audio/collect_bottle.mp3",
        loop: false,
        volume: 1.0
    },
    {
        name: "throwBottleAudio",
        path: "audio/throw_bottle.flac",
        loop: false,
        volume: 1.0
    },
    {
        name: "burstBottleAudio",
        path: "audio/bottle_burst.flac",
        loop: false,
        volume: 0.5
    },
    {
        name: "snoringAudio",
        path: "audio/snoring.mp3",
        loop: false,
        volume: 0.1
    },
    {
        name: "endbossAudio",
        path: "audio/endboss_theme.mp3",
        loop: true,
        volume: 0.3
    },
    {
        name: "endbossHurtAudio",
        path: "audio/endboss.wav",
        loop: false,
        volume: 0.3
    },
    {
        name: "outroAudio",
        path: "audio/outro.mp3",
        loop: true,
        volume: 0.5
    },
    {
        name: "victoryAudio",
        path: "audio/victory.mp3",
        loop: false,
        volume: 0.5
    }
];


let isSoundMuted = true;
let wasMutedBeforeLeaving = false;


/**
 * An array of all sounds used in the game.
 * Each object in the array represents a sound, with properties for the name and the audio object.
 * @type {Object[]}
 */
const allSounds = audioConfig.map(sound => {
    const audio = new Audio(sound.path);
    audio.loop = sound.loop;
    audio.volume = sound.volume;
    return {
        name: sound.name,
        audio: audio
    };
});


/**
 * Finds an audio object by its name.
 * @param {string} name - The name of the audio object.
 * @returns {Audio|null} The audio object, or null if not found.
 */
function findAudioByName(name) {
    let audioObj = allSounds.find(sound => sound.name === name);
    return audioObj ? audioObj.audio : null;
}


/**
 * Plays an audio object by its name.
 * @param {string} name - The name of the audio object.
 */
function playAudio(name) {
    let audio = findAudioByName(name);
    if (audio) {
        audio.play();
    }
}


/**
 * Pauses an audio object by its name.
 * @param {string} name - The name of the audio object.
 */
function pauseAudio(name) {
    let audio = findAudioByName(name);
    if (audio) {
        audio.pause();
    }
}


/**
 * Resets an audio object and plays it by its name.
 * @param {string} name - The name of the audio object.
 */
function resetAudioAndPlay(name) {
    let audio = findAudioByName(name);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}


/**
 * Resets an audio object and pauses it by its name.
 * @param {string} name - The name of the audio object.
 */
function resetAudioAndPause(name) {
    let audio = findAudioByName(name);
    if (audio) {
        audio.currentTime = 0;
        audio.pause();
    }
}


/**
 * Toggles the mute state of all sounds.
 * Changes the mute icon accordingly.
 */
function toggleMuteSounds() {
    isSoundMuted = !isSoundMuted;
    isSoundMuted ? muteAllSounds() : unmuteAllSounds();
    updateMuteIcon(isSoundMuted);
    if (!isSoundMuted) {
        playConditionalAudio();
    }
}
document.getElementById('unmuteSounds').addEventListener('click', toggleMuteSounds);


/**
 * Plays the appropriate audio based on the game state.
 * @returns {boolean} True if the game is paused, false otherwise.
 */
function playConditionalAudio() {
    let endbossAudio = findAudioByName('endbossAudio');
    if (isGamePaused || isEndScreenShown || (endbossAudio && !endbossAudio.paused)) {
        return;
    }

    isGameStarted ? playAudio('backgroundMusic') : playAudio('startAudio');
}


/**
 * Initializes the sound state when the page loads.
 * The sound is muted and the mute icon is updated accordingly.
 */
function initializeSoundState() {
    isSoundMuted = true;
    muteAllSounds();
    updateMuteIcon(isSoundMuted);
}
window.addEventListener('load', initializeSoundState);


/**
 * Updates the mute icon based on the current mute state.
 * @param {boolean} isSoundMuted - The current mute state.
 */
function updateMuteIcon(isSoundMuted) {
    let muteImage = document.getElementById('unmuteSounds');
    let mutePath = "M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z";
    let unmutePath = "M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z";
    muteImage.querySelector('path').setAttribute('d', isSoundMuted ? unmutePath : mutePath);
}


/**
 * Plays the start audio if the game is not started yet and the end screen is not shown.
 */
function playStartAudio() {
    if (!isGameStarted && !isSoundMuted && !isEndScreenShown) {
        playAudio('startAudio');
    }
}


/**
 * Checks if the mute key was pressed.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function checkMuteKey(event) {
    if (event.key.toLowerCase() === 'm') {
        toggleMuteSounds();
    }
}


/**
 * Mutes all sounds.
 * Changes the tooltip of the mute button to "Unmute Sounds".
 */
function muteAllSounds() {
    allSounds.forEach(sound => {
        sound.audio.muted = true;
    });
    changeTooltip('unmuteSounds', 'Unmute Sounds');
}


/**
 * Unmutes all sounds.
 * Changes the tooltip of the mute button to "Mute Sounds".
 */
function unmuteAllSounds() {
    allSounds.forEach(sound => {
        sound.audio.muted = false;
    });
    changeTooltip('unmuteSounds', 'Mute Sounds');
}


/**
 * Handles the visibility change event of the document.
 * 
 * When the document becomes hidden, it mutes all sounds and remembers the mute state before leaving.
 * When the document becomes visible again, it unmutes all sounds if the sound was not muted before leaving.
 */
function visibilityChangeHandler() {
    if (document.hidden) {
        wasMutedBeforeLeaving = isSoundMuted;
        muteAllSounds();
    } else {
        if (!wasMutedBeforeLeaving) {
            unmuteAllSounds();
        }
    }
};

document.addEventListener('visibilitychange', visibilityChangeHandler);