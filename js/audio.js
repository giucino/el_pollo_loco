const audioConfig = [
    {
        name: "startAudio",
        path: "audio/start_audio.mp3",
        loop: true,
        volume: 0.3
    },
    {
        name: "backgroundMusic",
        path: "audio/backgroundMusic.mp3",
        loop: true,
        volume: 0.2
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
        volume: 1.0
    },
    {
        name: "hurtAudio",
        path: "audio/hurt.mp3",
        loop: false,
        volume: 0.7
    },
    {
        name: "gameOverAudio",
        path: "audio/game_over.mp3",
        loop: false,
        volume: 0.7
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
        volume: 0.4
    },
    {
        name: "endbossAudio",
        path: "audio/endboss_theme.mp3",
        loop: true,
        volume: 0.6
    },
    {
        name: "endbossHurtAudio",
        path: "audio/endboss.wav",
        loop: false,
        volume: 0.3
    },
    {
        name: "victoryAudio",
        path: "audio/victory.mp3",
        loop: false,
        volume: 0.5
    }
];


let isSoundMuted = false;
let wasMutedBeforeLeaving = false;


const allSounds = audioConfig.map(sound => {
    const audio = new Audio(sound.path);
    audio.loop = sound.loop;
    audio.volume = sound.volume;
    return {
        name: sound.name,
        audio: audio
    };
});


function findAudioByName(name) {
    let audioObj = allSounds.find(sound => sound.name === name);
    return audioObj ? audioObj.audio : null;
}


function playAudio(name) {
    let audio = findAudioByName(name);
    if (audio) {
        audio.play();
    }
}


function pauseAudio(name) {
    let audio = findAudioByName(name);
    if (audio) {
        audio.pause();
    }
}


function toggleMuteSounds() {
    isSoundMuted = !isSoundMuted;
    localStorage.setItem('isSoundMuted', isSoundMuted);
    isSoundMuted ? muteAllSounds() : unmuteAllSounds();
    updateMuteIcon(isSoundMuted);
    changeTooltip('muteSounds', isSoundMuted ? 'Unmute Sounds' : 'Mute Sounds');
}
document.getElementById('muteSounds').addEventListener('click', toggleMuteSounds);


function updateMuteIcon(isSoundMuted) {
    let muteImage = document.getElementById('muteSounds');
    let mutePath = "M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3";
    let unmutePath = "M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z";
    muteImage.querySelector('path').setAttribute('d', isSoundMuted ? unmutePath : mutePath);
}


function initializeMuteState() {
    let storedMuteState = localStorage.getItem('isSoundMuted');
    if (storedMuteState !== null) {
        isSoundMuted = storedMuteState === 'true';
        isSoundMuted ? muteAllSounds() : unmuteAllSounds();

        updateMuteIcon(isSoundMuted);
        changeTooltip('muteSounds', isSoundMuted ? 'Unmute Sounds' : 'Mute Sounds');
    }
}
document.addEventListener('DOMContentLoaded', initializeMuteState);


function checkMuteKey(event) {
    if (event.key.toLowerCase() === 'm') {
        toggleMuteSounds();
    }
}


function muteAllSounds() {
    allSounds.forEach(sound => {
        sound.audio.muted = true;
    });
}


function unmuteAllSounds() {
    allSounds.forEach(sound => {
        sound.audio.muted = false;
    });
}


document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        wasMutedBeforeLeaving = isSoundMuted;
        muteAllSounds();
    } else {
        if (!wasMutedBeforeLeaving) {
            unmuteAllSounds();
        }
    }
});