

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

