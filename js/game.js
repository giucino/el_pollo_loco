let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let character;
let isGamePaused = false;

const ACTION_START = 'start';
const ACTION_PAUSE = 'pause';
const OBJECT_TYPE_CHICK = Chick;
const OBJECT_TYPE_CHICKEN = Chicken;
const OBJECT_TYPE_CLOUD = Cloud;
const OBJECT_TYPE_COIN = Coin;
const OBJECT_TYPE_BO = BackgroundObject;


window.onload = function () {
    playAudio('startAudio');
    document.getElementById('startGame').addEventListener('click', startGame);
    checkMuteKey();
}


function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    init();
    pauseAudio('startAudio');
    playAudio('backgroundMusic');
    document.addEventListener('keydown', handlePauseKey);
}


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function toggleGame() {
    isGamePaused = !isGamePaused;
    const toggleImage = document.getElementById('toggleGame');

    isGamePaused ? pauseGame() : resumeGame();
    toggleImage.setAttribute('src', isGamePaused ? 'img/play.png' : 'img/pause.png');
}
document.getElementById('toggleGame').addEventListener('click', toggleGame);


function pauseGame() {
    pauseAudio('backgroundMusic');
    world.pause();
    world.character.pause();
    pauseAllGameObjects();
}


function resumeGame() {
    playAudio('backgroundMusic');
    world.start();
    world.character.start();
    resumeAllGameObjects();
}


function togglePauseResume(objects, action, objectType) {
    objects.forEach((object) => {
        if (object instanceof objectType && typeof object[action] === 'function') {
            object[action]();
        }
    });
}


function handlePauseKey(event) {
    if (event.key.toLowerCase() === 'p') {
        toggleGame();
    }
}


function characterIsGameOver() {
    selectRandomGameOverImage();
    pauseAudio('backgroundMusic');
    pauseAllGameObjects();
    world.endboss.pause();
    clearInterval(world.character.motionIntervalId);
    clearInterval(world.gameIntervalId);
    document.removeEventListener('keydown', handlePauseKey);
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


function selectRandomGameOverImage() {
    let gameOverContainer = document.getElementById("gameOverContainer");
    gameOverContainer.classList.remove("dnone");

    let gameOverImages = gameOverContainer.getElementsByTagName("img");
    for (let i = 0; i < gameOverImages.length; i++) {
        gameOverImages[i].style.display = "none";
    }

    let randomIndex = Math.floor(Math.random() * gameOverImages.length);
    let selectedImage = gameOverImages[randomIndex];

    selectedImage.style.display = "block";
}