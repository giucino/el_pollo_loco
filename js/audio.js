const audioConfig = [
    {
        name: "backgroundMusic",
        path: "audio/backgroundMusic.mp3",
        loop: true,
        volume: 0.2
    },
    {
        name: "walkingAudio",
        path: "audio/running.mp3",
        loop: true,
        volume: 1.0
    },
    {
        name: "jumpingAudio",
        path: "audio/jump.mp3",
        loop: false,
        volume: 1.0
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
        volume: 1.0
    },
    {
        name: "endbossAudio",
        path: "audio/endboss.wav",
        loop: false,
        volume: 1.0
    },
    {
        name: "startAudio",
        path: "audio/startMusic.mp3",
        loop: true,
        volume: 0.1
    }
];


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


let isSoundMuted = false;

function toggleMuteSounds() {
    isSoundMuted = !isSoundMuted;
    const muteImage = document.getElementById('muteSounds');

    // if (isSoundMuted) {
    //     muteAllSounds();
    //     muteImage.setAttribute('src', 'img/mute.png');
    // } else {
    //     unmuteAllSounds();
    //     muteImage.setAttribute('src', 'img/unmute.png');
    // }
    isSoundMuted ? muteAllSounds() : unmuteAllSounds();
    muteImage.setAttribute('src', isSoundMuted ? 'img/mute.png' : 'img/unmute.png');
}
document.getElementById('muteSounds').addEventListener('click', toggleMuteSounds);


// function checkMuteKey() {
//     setInterval(() => {
//         if (keyboard.KEY_M) {
//             toggleMuteSounds();
//             keyboard.KEY_M = false;
//         }
//     }, 100);
// }


function checkMuteKey() {
    document.addEventListener('keydown', (event) => {
        if (event.key.toLowerCase() === 'm') {
            toggleMuteSounds();
        }
    });
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
    document.hidden ? muteAllSounds() : unmuteAllSounds();
});