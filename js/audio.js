    const walkingAudio = new Audio('audio/running.mp3');
    const jumpingAudio = new Audio('audio/jump.mp3');
    // const hurtAudio = new Audio('audio/hurt.mp3');  
    const coinAudio = new Audio('audio/coin.mp3');
    const collectBottleAudio = new Audio('audio/collect_bottle.mp3');
    const throwBottleAudio = new Audio('audio/throw_bottle.flac');
    const burstBottleAudio = new Audio('audio/bottle_burst.flac');
    const snoringAudio = new Audio('audio/snoring.mp3');
    const endbossAudio = new Audio('audio/endboss.wav');
    const backgroundMusic = new Audio('audio/backgroundMusic.mp3');


    const allSounds = [
        walkingAudio,
        jumpingAudio,
        // hurtAudio,
        coinAudio,
        collectBottleAudio,
        throwBottleAudio,
        burstBottleAudio,
        snoringAudio,
        endbossAudio,
        backgroundMusic
    ];


    let isMuted = false;

function toggleSound() {
    if (isMuted) {
        allSounds.forEach((sound) => {
            sound.play();
        });
        isMuted = false;
    } else {
        allSounds.forEach(sound => {
            sound.pause();
        });
        isMuted = true;
    }
}


// let allAudios = [
//     {
//         audioName: "walking_sound",
//         src: "audio/running.mp3",
//         loop: true,
//         volume: 0.4,
//         isPlaying: false,
//     },
//     {
//         audioName: "jumping_sound",
//         src: "audio/jump.mp3",
//         loop: true,
//         volume: 0.4,
//         isPlaying: false,
//     }
// ];


// const audioObjects = {};

// allAudios.forEach(audioData => {
//     const audio = new Audio(audioData.src);
//     audio.loop = audioData.loop;
//     audio.volume = audioData.volume;
//     audioObjects[audioData.audioName] = audio;
// });


// function playAudio(audioName) {
//     if (audioObjects[audioName]) {
//         audioObjects[audioName].play();
//     }
// }


// function pauseAudio(audioName) {
//     if (audioObjects[audioName]) {
//         audioObjects[audioName].pause();
//         audioObjects[audioName].currentTime = 0;
//     }
// }


// const allAudios = [
//     {
//         audioName: "walking_sound",
//         src: "audio/running.mp3",
//         loop: true,
//         volume: 0.4,
//         isPlaying: false,
//     },
//     {
//         audioName: "jumping_sound",
//         src: "audio/jump.mp3",
//         loop: true,
//         volume: 0.4,
//         isPlaying: false,
//     }
// ];


// function preloadAudio(audio) {
//     const audioElement = new Audio(audio.src);
//     audioElement.volume = audio.volume;

//     const promise = audioElement.play();
//     if (promise !== undefined) {
//         promise
//             .then(_ => {
//                 audio.isPlaying = true;
//                 // Das Audio wurde erfolgreich geladen und kann abgespielt werden.
//             })
//             .catch(error => {
//                 audio.isPlaying = false;
//                 // Ein Fehler ist aufgetreten, das Audio konnte nicht geladen werden.
//             });
//     }
// }

// // Funktion zum Vorladen aller Audios
// function preloadAllAudios() {
//     allAudios.forEach(audio => {
//         preloadAudio(audio);
//     });
// }

// // Rufe die Funktion zum Vorladen aller Audios auf
// preloadAllAudios();


// // Funktion zum Abspielen eines Audios
// function playAudio(audioName) {
//     const audio = allAudios.find(audio => audio.audioName === audioName);
//     if (audio) {
//         const audioElement = new Audio(audio.src);
//         audioElement.volume = audio.volume;
//         audioElement.loop = audio.loop;
//         audioElement.play().then(_ => {
//             audio.isPlaying = true;
//             // Das Audio wurde erfolgreich abgespielt.
//         }).catch(error => {
//             audio.isPlaying = false;
//             // Ein Fehler ist aufgetreten, das Audio konnte nicht abgespielt werden.
//         });
//     }
// }

// // Funktion zum Pausieren eines Audios
// function pauseAudio(audioName) {
//     const audio = allAudios.find(audio => audio.audioName === audioName);
//     if (audio) {
//         audio.isPlaying = false;
//     }
// }
