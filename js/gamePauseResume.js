/**
 * Constants for game actions and object types.
 */
const ACTION_START = 'start';
const ACTION_PAUSE = 'pause';
const OBJECT_TYPE_CHICK = Chick;
const OBJECT_TYPE_CHICKEN = Chicken;
const OBJECT_TYPE_CLOUD = Cloud;
const OBJECT_TYPE_COIN = Coin;

let isGamePaused = false;
let firstContactMade = false;


/**
 * Handles the pause key press event.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handlePauseKey(event) {
    if (event.key.toLowerCase() === 'p') {
        toggleGame();
    }
}


/**
 * Toggles the game state between paused and resumed.
 */
function toggleGame() {
    isGamePaused = !isGamePaused;
    isGamePaused ? pauseGame() : resumeGame();
    updateToggleGamePath();
}
document.getElementById('toggleGame').addEventListener('click', toggleGame);


/**
 * Updates the game toggle button image based on the game state.
 */
function updateToggleGamePath() {
    let toggleImage = document.getElementById('toggleGame');
    let playPath = "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z";
    let pausePath = "M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z";
    toggleImage.querySelector('path').setAttribute('d', isGamePaused ? playPath : pausePath);
}


/**
 * Pauses the game.
 */
function pauseGame() {
    isGamePaused = true;
    pauseAudios();
    pauseAllGameObjects();
    updateToggleGamePath();
    pauseWorld();
    changeTooltip('toggleGame', 'Resume Game');
}


/**
 * Pauses specific audio tracks
 */
function pauseAudios() {
    pauseAudio('backgroundMusic');
    pauseAudio('endbossAudio');
    pauseAudio('snoringAudio');
    pauseAudio('endbossHurtAudio');
    pauseAudio('walkingAudio');
}


/**
 * Resumes the game.
 */
function resumeGame() {
    isGamePaused = false;
    resumeAllGameObjects();
    updateToggleGamePath();
    resumeWorld();
    world.firstContactMade ? playAudio('endbossAudio') : playAudio('backgroundMusic');
    changeTooltip('toggleGame', 'Pause Game');
}


/**
 * Pauses all game objects.
 */
function pauseAllGameObjects() {
    togglePauseResume(level1.enemies, ACTION_PAUSE, OBJECT_TYPE_CHICK);
    togglePauseResume(level1.enemies, ACTION_PAUSE, OBJECT_TYPE_CHICKEN);
    togglePauseResume(level1.clouds, ACTION_PAUSE, OBJECT_TYPE_CLOUD);
    togglePauseResume(level1.coins, ACTION_PAUSE, OBJECT_TYPE_COIN);

}


/**
 * Resumes all game objects.
 */
function resumeAllGameObjects() {
    togglePauseResume(level1.enemies, ACTION_START, OBJECT_TYPE_CHICK);
    togglePauseResume(level1.enemies, ACTION_START, OBJECT_TYPE_CHICKEN);
    togglePauseResume(level1.clouds, ACTION_START, OBJECT_TYPE_CLOUD);
    togglePauseResume(level1.coins, ACTION_START, OBJECT_TYPE_COIN);
}


/**
 * Toggles the pause/resume state for a list of game objects.
 * @param {Array} objects - The list of game objects.
 * @param {string} action - The action to perform (start or pause).
 * @param {Function} objectType - The type of objects to affect.
 */
function togglePauseResume(objects, action, objectType) {
    objects.forEach((object) => {
        if (object instanceof objectType && typeof object[action] === 'function') {
            object[action]();
        }
    });
}


/**
 * Pauses the game world.
 */
function pauseWorld() {
    world.pause();
    world.character.pause();
    world.endboss.pause();
    pauseBackgroundObjects();
}


/**
 * Resumes the game world.
 */
function resumeWorld() {
    world.start();
    world.character.start();
    world.endboss.start();
    resumeBackgroundObjects();
}