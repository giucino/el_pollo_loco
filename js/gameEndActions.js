let isEndScreenShown = false;
let intervals = [];


/**
 * Checks if the character is game over.
 */
function characterIsGameOver() {
    showEndscreen(false);
    pauseSpecificAudios();
    pauseGameObjectsAndListeners(world.endboss, world.character.motionIntervalId);
    resumeBackgroundAfterDelay(world.character);
    clearAllIntervals();
    isGameStarted = false;
}


/**
 * Checks if the endboss is game over.
 */
function characterHasWon() {
    showEndscreen(true);
    pauseSpecificAudios();
    pauseGameObjectsAndListeners(world.character, null);
    resumeBackgroundAfterDelay(world.endboss);
    clearAllIntervals();
    isGameStarted = false;
}


/**
 * Clears all intervals stored in the intervals array.
 */
function clearAllIntervals() {
    setTimeout(() => {
        intervals.forEach(clearInterval);
        intervals = [];
    }, 3000);
}


/**
 * Adds a function to an interval and stores the interval's ID.
 *
 * @param {Function} fn - The function to be executed at specified intervals.
 * @param {number} time - The time, in milliseconds, between each execution of the function.
 * @returns {number} The ID of the created interval.
 */
function addSetInterval(fn, time) {
    let id = setInterval(fn, time);
    intervals.push(id);
    return id;
}


/**
 * Displays the end screen.
 * @param {boolean} isWinner - Whether the character has won the game.
 */
function showEndscreen(isWinner) {
    isEndScreenShown = true;
    selectRandomEndscreenImage();
    playAudio(isWinner ? 'victoryAudio' : 'gameOverAudio');
    initializeEndScreen();
}


/**
 * Initializes the end screen.
 */
function initializeEndScreen() {
    document.getElementById('toggleGame').style.display = 'none';
    document.getElementById('controlInterface').style.display = 'none';
}


/**
 * Pauses specific audio tracks.
 */
function pauseSpecificAudios() {
    pauseAudio('backgroundMusic');
    pauseAudio('walkingAudio');
    pauseAudio('snoringAudio');
    pauseAudio('endbossAudio');
}


/**
 * Pauses game objects and listeners.
 * @param {Object} losingObj - The object that lost the game.
 * @param {number} motionIntervalId - The ID of the motion interval.
 */
function pauseGameObjectsAndListeners(losingObj, motionIntervalId) {
    pauseAllGameObjects();
    pauseBackgroundObjects();
    losingObj.pause();
    clearInterval(motionIntervalId);
    clearInterval(world.gameIntervalId);
    document.removeEventListener('keydown', handlePauseKey);
}


/**
 * Pauses all background objects.
 */
function pauseBackgroundObjects() {
    world.level.backgroundObjects.forEach(bgObject => {
        bgObject.pause();
    });
}


/**
 * Resumes all background objects.
 */
function resumeBackgroundObjects() {
    world.level.backgroundObjects.forEach(backgroundObject => {
        backgroundObject.resetSpeed();
    });
}


/**
 * Resumes the background after a delay.
 * @param {Object} winningObj - The object that won the game.
 */
function resumeBackgroundAfterDelay(winningObj) {
    setTimeout(() => {
        playAudio('outroAudio');
        winningObj.pause();
    }, 3000);
}


/**
 * Selects a random end screen image.
 */
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


/**
 * Shows buttons with a delay.
 */
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


/**
 * Hides all images in a container.
 * @param {HTMLElement} container - The container to hide images in.
 */
function hideAllImages(container) {
    let images = container.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
}


/**
 * Shows a random game over image.
 * @param {HTMLElement} container - The container to show the image in.
 */
function showRandomGameOverImage(container) {
    let images = container.querySelectorAll(".game-over-image");
    showRandomImage(images);
}


/**
 * Shows a random loser image.
 * @param {HTMLElement} container - The container to show the image in.
 */
function showRandomLoserImage(container) {
    let images = container.querySelectorAll(".you-lost-image");
    showRandomImage(images);
}


/**
 * Shows a random image from a list of images.
 * @param {HTMLCollection} images - The list of images to select from.
 */
function showRandomImage(images) {
    let randomIndex = Math.floor(Math.random() * images.length);
    let selectedImage = images[randomIndex];
    selectedImage.style.display = "block";
}


/**
 * Reloads the page to return to the start screen.
 */
function backToStartScreen() {
    location.reload();
}
document.getElementById('backToStartScreen').addEventListener('click', backToStartScreen);


/**
 * Restarts the game.
 */
function restartGame() {
    hideEndScreen();
    resetGameAudio();
    world.resetGame();
    world.character.start();
    removeAllEventListeners();
    restartGameParts();
    resetLevel();
    resumeBackgroundObjects();
    initializeAllEventListeners();
    isGameStarted = true;
}
document.getElementById('restartGame').addEventListener('click', restartGame);


/**
 * Hides the end screen.
 */
function hideEndScreen() {
    isEndScreenShown = false;
    let endScreenContainer = document.getElementById("endScreenContainer");
    let overlay = document.getElementById('overlay');
    endScreenContainer.classList.add("d-none");
    overlay.style.display = 'none';
}


/**
 * Resets the game audio.
 */
function resetGameAudio() {
    pauseAudio('outroAudio');
    resetAudioAndPause('endbossAudio');
}


/**
 * Restarts parts of the game.
 */
function restartGameParts() {
    isGameStarted = true;
    pauseAudio('startAudio');
    resetAudioAndPlay('backgroundMusic');
    initializeGameScreen();
    document.removeEventListener('keydown', enterGame);
    document.addEventListener('keydown', handlePauseKey);
}


/**
 * Removes all event listeners from the game elements.
 */
function removeAllEventListeners() {
    removeWindowEventListeners();
    removeDocumentEventListeners();
    removeElementEventListeners();
    removeHamburgerAndInfoBarListeners();
}


/**
 * Removes the event listeners for the window.
 */
function removeWindowEventListeners() {
    window.removeEventListener("orientationchange", handleDeviceOrientation);
    window.removeEventListener("resize", handleDeviceOrientation);
    window.removeEventListener('resize', adjustInfoBarPosition);
    window.removeEventListener('load', initializeSoundState);
}


/**
 * Removes the event listeners for the document.
 */
function removeDocumentEventListeners() {
    document.removeEventListener('keydown', checkMuteKey);
    document.removeEventListener('keydown', handlePauseKey);
    document.removeEventListener('keydown', handleFullscreen);
    document.removeEventListener('click', closeControlInterface);
    document.removeEventListener('visibilitychange', visibilityChangeHandler);
}


/**
 * Removes the event listeners for the game elements.
 */
function removeElementEventListeners() {
    document.getElementById('startGame').removeEventListener('click', startGame);
    // document.getElementById('credits').removeEventListener('click', showCredits);
    document.getElementById('toggleGame').removeEventListener('click', toggleGame);
    document.getElementById('enterFullscreen').removeEventListener('click', fullscreen);
    document.getElementById('unmuteSounds').removeEventListener('click', toggleMuteSounds);
    const controlInterface = document.getElementById('controlInterface');
    controlInterface.removeEventListener('click', controlInterfaceClickHandler);
}


/**
 * Removes the hamburger menu and info bar listeners.
 */
function removeHamburgerAndInfoBarListeners() {
    hamburger.removeEventListener("click", hamburgerClickListener);
    document.querySelectorAll('.info-bar-link').forEach(infoLink => infoLink.removeEventListener('click', infoBarClickListener ));
}


/**
 * Initializes all event listeners for the game elements.
 */
function initializeAllEventListeners() {
    initializeWindowEventListeners();
    initializeDocumentEventListeners();
    initializeElementEventListeners();
    initializeHamburgerAndInfoBarListeners();
}


/**
 * Initializes the event listeners for the window.
 */
function initializeWindowEventListeners() {
    window.addEventListener("orientationchange", handleDeviceOrientation);
    window.addEventListener("resize", handleDeviceOrientation);
    window.addEventListener('resize', adjustInfoBarPosition);
    window.addEventListener('load', initializeSoundState);
}


/**
 * Initializes the event listeners for the document.
 */
function initializeDocumentEventListeners() {
    document.addEventListener('keydown', checkMuteKey);
    document.addEventListener('keydown', handlePauseKey);
    document.addEventListener('keydown', handleFullscreen);
    document.addEventListener('click', closeControlInterface);
    document.addEventListener('visibilitychange', visibilityChangeHandler);
}


/**
 * Initializes the event listeners for the game elements.
 */
function initializeElementEventListeners() {
    document.getElementById('startGame').addEventListener('click', startGame);
    // document.getElementById('credits').addEventListener('click', showCredits);
    document.getElementById('toggleGame').addEventListener('click', toggleGame);
    document.getElementById('enterFullscreen').addEventListener('click', fullscreen);
    document.getElementById('unmuteSounds').addEventListener('click', toggleMuteSounds);
    const controlInterface = document.getElementById('controlInterface');
    controlInterface.addEventListener('click', controlInterfaceClickHandler);
}


/**
 * Initializes the hamburger menu and info bar listeners.
 */
function initializeHamburgerAndInfoBarListeners() {
    hamburger.addEventListener("click", hamburgerClickListener);
    document.querySelectorAll('.info-bar-link').forEach(infoLink => infoLink.addEventListener('click', infoBarClickListener ));
}