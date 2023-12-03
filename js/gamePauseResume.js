const ACTION_START = 'start';
const ACTION_PAUSE = 'pause';
const OBJECT_TYPE_CHICK = Chick;
const OBJECT_TYPE_CHICKEN = Chicken;
const OBJECT_TYPE_CLOUD = Cloud;
const OBJECT_TYPE_COIN = Coin;
const OBJECT_TYPE_BO = BackgroundObject;

let isGamePaused = false;
let firstContactMade = false;


function handlePauseKey(event) {
    if (event.key.toLowerCase() === 'p') {
        toggleGame();
    }
}


function toggleGame() {
    isGamePaused = !isGamePaused;
    isGamePaused ? pauseGame() : resumeGame();
    changeTooltip('toggleGame', 'Resume Game');
    updateToggleGamePath();
}
document.getElementById('toggleGame').addEventListener('click', toggleGame);


function updateToggleGamePath() {
    let toggleImage = document.getElementById('toggleGame');
    let playPath = "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z";
    let pausePath = "M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z";
    toggleImage.querySelector('path').setAttribute('d', isGamePaused ? playPath : pausePath);
}


function pauseGame() {
    isGamePaused = true;
    pauseAudio('backgroundMusic');
    pauseAudio('endbossAudio');
    pauseAudio('snoringAudio');
    pauseAudio('endbossHurtAudio');
    pauseAllGameObjects();
    updateToggleGamePath();
    pauseWorld();
}


function resumeGame() {
    isGamePaused = false;
    resumeAllGameObjects();
    updateToggleGamePath();
    resumeWorld();

    if (!world.firstContactMade) {
        playAudio('backgroundMusic');
    } else {
        playAudio('endbossAudio');
    }
}


function pauseAllGameObjects() {
    togglePauseResume(level1.enemies, ACTION_PAUSE, OBJECT_TYPE_CHICK);
    togglePauseResume(level1.enemies, ACTION_PAUSE, OBJECT_TYPE_CHICKEN);
    togglePauseResume(level1.clouds, ACTION_PAUSE, OBJECT_TYPE_CLOUD);
    togglePauseResume(level1.coins, ACTION_PAUSE, OBJECT_TYPE_COIN);
    togglePauseResume(level1.backgroundObjects, ACTION_PAUSE, OBJECT_TYPE_BO);
}


function resumeAllGameObjects() {
    togglePauseResume(level1.enemies, ACTION_START, OBJECT_TYPE_CHICK);
    togglePauseResume(level1.enemies, ACTION_START, OBJECT_TYPE_CHICKEN);
    togglePauseResume(level1.clouds, ACTION_START, OBJECT_TYPE_CLOUD);
    togglePauseResume(level1.coins, ACTION_START, OBJECT_TYPE_COIN);
    togglePauseResume(level1.backgroundObjects, ACTION_START, OBJECT_TYPE_BO);
}



function togglePauseResume(objects, action, objectType) {
    objects.forEach((object) => {
        if (object instanceof objectType && typeof object[action] === 'function') {
            object[action]();
        }
    });
}


function pauseWorld() {
    world.pause();
    world.character.pause();
    world.endboss.pause();
}


function resumeWorld() {
    world.start();
    world.character.start();
    world.endboss.animateEndboss();
}