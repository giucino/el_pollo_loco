let isEndScreenShown = false;


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
    isEndScreenShown = true;
    selectRandomEndscreenImage();
    playAudio(isWinner ? 'victoryAudio' : 'gameOverAudio');
    initializeEndScreen();
}


function initializeEndScreen() {
    document.getElementById('toggleGame').style.display = 'none';
    document.getElementById('controlInterface').style.display = 'none';
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
    world.level.backgroundObjects.forEach(bgObject => {
            bgObject.pause();
    });
}


function resumeBackgroundAfterDelay(winningObj) {
    setTimeout(() => {
        playAudio('outroAudio');
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


function backToStartScreen() {
    location.reload();
}
document.getElementById('backToStartScreen').addEventListener('click', backToStartScreen);


function restartGame() {
    hideEndScreen();
    resetGameAudio();
    world.resetGame();
    world.character.start();
    removeAllEventListeners();
    restartGameParts();
    resetLevel();
    isGameStarted = true;
    initializeAllEventListeners();
}
document.getElementById('restartGame').addEventListener('click', restartGame);


function hideEndScreen() {
    isEndScreenShown = false;
    let endScreenContainer = document.getElementById("endScreenContainer");
    let overlay = document.getElementById('overlay');
    endScreenContainer.classList.add("d-none");
    overlay.style.display = 'none';
}


function resetGameAudio() {
    pauseAudio('outroAudio');
    resetAudioAndPause('endbossAudio');
}


function restartGameParts() {
    isGameStarted = true;
    pauseAudio('startAudio');
    resetAudioAndPlay('backgroundMusic');
    initializeGameScreen();
    document.removeEventListener('keydown', enterGame);
    document.addEventListener('keydown', handlePauseKey);
}


function removeAllEventListeners() {
    window.removeEventListener("orientationchange", handleDeviceOrientation);
    window.removeEventListener("resize", handleDeviceOrientation);
    document.getElementById('startGame').removeEventListener('click', startGame);
    document.removeEventListener('keydown', checkMuteKey);
    document.getElementById('credits').removeEventListener('click', showCredits);
    document.removeEventListener('keydown', handlePauseKey);
    window.removeEventListener('resize', adjustInfoBarPosition);

    document.getElementById('toggleGame').removeEventListener('click', toggleGame);
    document.getElementById('enterFullscreen').removeEventListener('click', fullscreen);
    document.removeEventListener('keydown', handleFullscreen);
    document.removeEventListener('click', closeControlInterface);
    const controlInterface = document.getElementById('controlInterface');
    controlInterface.removeEventListener('click', controlInterfaceClickHandler);

    document.getElementById('unmuteSounds').removeEventListener('click', toggleMuteSounds);
    window.removeEventListener('load', initializeSoundState);
    document.removeEventListener('visibilitychange', visibilityChangeHandler);
}


function initializeAllEventListeners() {
    window.addEventListener("orientationchange", handleDeviceOrientation);
    window.addEventListener("resize", handleDeviceOrientation);
    document.getElementById('startGame').addEventListener('click', startGame);
    document.addEventListener('keydown', checkMuteKey);
    document.getElementById('credits').addEventListener('click', showCredits);
    document.addEventListener('keydown', handlePauseKey);
    window.addEventListener('resize', adjustInfoBarPosition);

    document.getElementById('toggleGame').addEventListener('click', toggleGame);
    document.getElementById('enterFullscreen').addEventListener('click', fullscreen);
    document.addEventListener('keydown', handleFullscreen);
    document.addEventListener('click', closeControlInterface);
    const controlInterface = document.getElementById('controlInterface');
    controlInterface.addEventListener('click', controlInterfaceClickHandler);

    document.getElementById('unmuteSounds').addEventListener('click', toggleMuteSounds);
    window.addEventListener('load', initializeSoundState);
    document.addEventListener('visibilitychange', visibilityChangeHandler);
}