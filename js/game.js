let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let character;
let isGamePaused = false;
let isFullScreenActive = false;
let isGameStarted = false;
let showControlInterface;


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
    document.addEventListener('keydown', checkMuteKey);
}


function startGame() {
    init();
    isGameStarted = true;
    pauseAudio('startAudio');
    playAudio('backgroundMusic');
    initializeGameScreen();
    document.addEventListener('keydown', handlePauseKey);
}


function initializeGameScreen() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('toggleGame').style.display = 'flex';
    document.getElementById('enter').style.display = 'flex';
}


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function handlePauseKey(event) {
    if (event.key.toLowerCase() === 'p') {
        toggleGame();
    }
}


function addCustomEventListeners() {
    document.addEventListener('keydown', handlePauseKey);
    document.addEventListener('keydown', checkMuteKey);
}


function removeCustomEventListeners() {
    document.removeEventListener('keydown', handlePauseKey);
    document.removeEventListener('keydown', checkMuteKey);
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
    pauseAudio('snoringAudio');
    pauseAllGameObjects();
    updateToggleGamePath();
}


function resumeGame() {
    isGamePaused = false;
    playAudio('backgroundMusic');
    resumeAllGameObjects();
    updateToggleGamePath();
}


function pauseAllGameObjects() {
    world.pause();
    world.character.pause();
    world.endboss.pause();
    togglePauseResume(level1.enemies, ACTION_PAUSE, OBJECT_TYPE_CHICK);
    togglePauseResume(level1.enemies, ACTION_PAUSE, OBJECT_TYPE_CHICKEN);
    togglePauseResume(level1.clouds, ACTION_PAUSE, OBJECT_TYPE_CLOUD);
    togglePauseResume(level1.coins, ACTION_PAUSE, OBJECT_TYPE_COIN);
    togglePauseResume(level1.backgroundObjects, ACTION_PAUSE, OBJECT_TYPE_BO);
}


function resumeAllGameObjects() {
    world.start();
    world.character.start();
    world.endboss.animateEndboss();
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


function characterIsGameOver() {
    // showEndscreen('gameOverAudio');
    showEndscreen(false);
    pauseSpecificAudios();
    pauseGameObjectsAndListeners(world.endboss, world.character.motionIntervalId);
    resumeBackgroundAfterDelay(world.character);
    isGameStarted = false;
}


function characterHasWon() {
    // showEndscreen('victoryAudio');
    showEndscreen(true);
    pauseSpecificAudios();
    pauseGameObjectsAndListeners(world.character, null);
    resumeBackgroundAfterDelay(world.endboss);
    isGameStarted = false;
}


// function showEndscreen(audioName) {
//     selectRandomEndscreenImage();
//     playAudio(audioName);
// }


function showEndscreen(isWinner) {
    selectRandomEndscreenImage();
    playAudio(isWinner ? 'victoryAudio' : 'gameOverAudio');
}


function pauseSpecificAudios() {
    pauseAudio('backgroundMusic');
    pauseAudio('walkingAudio');
    pauseAudio('snoringAudio');
    pauseAudio('endbossAudio');
}


function pauseGameObjectsAndListeners(losingObj, motionIntervalId) {
    pauseAllGameObjects();
    losingObj.pause();
    clearInterval(motionIntervalId);
    clearInterval(world.gameIntervalId);
    document.removeEventListener('keydown', handlePauseKey);
}


function resumeBackgroundAfterDelay(winningObj) {
    setTimeout(() => {
        playAudio('startAudio');
        winningObj.pause();
    }, 3000);
}


function selectRandomEndscreenImage() {
    let endScreenContainer = document.getElementById("endScreenContainer");
    endScreenContainer.classList.remove("d-none");

    hideAllImages(endScreenContainer);
    if (world.character.isGameOver()) {
        showRandomLoserImage(endScreenContainer);
    } else {
        showRandomGameOverImage(endScreenContainer);
    }
    showDelayedButtons();
}


function showDelayedButtons() {
    let delayedButtons = endScreenContainer.querySelectorAll('.delayed-btn');
    let overlay = document.getElementById('overlay');
    delayedButtons.forEach(btn => btn.style.display = 'none');

    setTimeout(() => {
        overlay.style.display = 'block';
        delayedButtons.forEach(btn => {
            btn.style.display = 'block';
            btn.style.animationPlayState = 'running';
        });
    }, 3000);
}


function hideAllImages(container) {
    let images = container.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
}


function showRandomGameOverImage(container) {
    let images = container.querySelectorAll(".game-over-image");
    showRandomImage(images);
}


function showRandomLoserImage(container) {
    let images = container.querySelectorAll(".you-lost-image");
    showRandomImage(images);
}


function showRandomImage(images) {
    let randomIndex = Math.floor(Math.random() * images.length);
    let selectedImage = images[randomIndex];
    selectedImage.style.display = "block";
}


function restartGame() {
    let endScreenContainer = document.getElementById("endScreenContainer");
    let overlay = document.getElementById('overlay');
    endScreenContainer.classList.add("d-none");
    overlay.style.display = 'none';
    startGame();
}
document.getElementById('restartGame').addEventListener('click', restartGame);


function backToMenu() {
    location.reload();
}
document.getElementById('backToMenu').addEventListener('click', backToMenu);


function fullscreen() {
    toggleFullScreen();
    changeSVGPath();
}
document.getElementById('enter').addEventListener('click', fullscreen);


function toggleFullScreen() {
    isFullScreenActive = !isFullScreenActive;
    let fullscreen = document.getElementById("fullscreen");
    isFullScreenActive ? enterFullscreen(fullscreen) : exitFullscreen();
    changeTooltip('enter', 'Exit Fullscreen');
}


function changeSVGPath() {
    let enterImage = document.getElementById('enter');
    let enterPath = "M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z";
    let exitPath = "M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z";
    enterImage.querySelector('path').setAttribute('d', isFullScreenActive ? exitPath : enterPath);
}


/**
 * Enters fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to enter fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
    }
}


/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


function setupControlInterface() {
    showControlInterface = document.getElementById('showControlInterface');
    const controlInterface = document.getElementById('controlInterface');

    controlInterface.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleControlInterface();
        handleGamePauseOrResume();
    });

    document.addEventListener('click', closeControlInterface);
}

document.addEventListener('DOMContentLoaded', setupControlInterface);



function toggleControlInterface() {
    let overlay = document.getElementById('overlay');

    if (showControlInterface.style.display === 'flex') {
        showControlInterface.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        showControlInterface.style.display = 'flex';
        overlay.style.display = 'block';
    }
}


function handleGamePauseOrResume() {
    if (isGameStarted) {
        if (showControlInterface.style.display === 'flex') {
            pauseGame();
            removeCustomEventListeners();
        } else {
            resumeGame();
            addCustomEventListeners();
        }
    }
}


function closeControlInterface() {
    let overlay = document.getElementById('overlay');

    if (showControlInterface.style.display === 'flex') {
        showControlInterface.style.display = 'none';
        overlay.style.display = 'none';
        if (isGameStarted) {
            resumeGame();
            addCustomEventListeners();
        }
    }
}


function changeTooltip(svgId, newTooltip) {
    let svgElement = document.getElementById(svgId);
    let titleElement = svgElement.querySelector('title');
    titleElement.textContent = newTooltip;
}


// function setupControlInterface() {
//     const controlInterface = document.getElementById('controlInterface');
//     const showControlInterface = document.getElementById('showControlInterface');
//     let overlay = document.getElementById('overlay');

//     controlInterface.addEventListener('click', (event) => {
//         event.stopPropagation();
//         if (showControlInterface.style.display === 'flex') {
//             showControlInterface.style.display = 'none';
//             overlay.style.display = 'none';
//             if (isGameStarted) {
//                 resumeGame();
//                 addCustomEventListeners();
//             }
//         } else {
//             showControlInterface.style.display = 'flex';
//             overlay.style.display = 'block';
//             if (isGameStarted) {
//                 pauseGame();
//                 removeCustomEventListeners();
//             }
//         }
//     });
//     document.addEventListener('click', closeControlInterface);
// }
// document.addEventListener('DOMContentLoaded', setupControlInterface);