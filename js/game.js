let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let character;


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
    document.removeEventListener('keydown', enterGame);
    document.addEventListener('keydown', handlePauseKey);
    // rotateMessage();
}


function enterGame(event) {
    if (event.key === 'Enter') {
        startGame();
    }
}
document.addEventListener('keydown', enterGame);


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function initializeGameScreen() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('toggleGame').style.display = 'flex';
    document.getElementById('enterFullscreen').style.display = 'flex';
}


function changeTooltip(svgId, newTooltip) {
    let svgElement = document.getElementById(svgId);
    let titleElement = svgElement.querySelector('title');
    titleElement.textContent = newTooltip;
}


function restartGameParts() {
    isGameStarted = true;
    pauseAudio('startAudio');
    resetAudioAndPlay('backgroundMusic');
    initializeGameScreen();
    document.removeEventListener('keydown', enterGame);
    document.addEventListener('keydown', handlePauseKey);
}


function rotateMessage() {
    window.addEventListener("orientationchange", function () {
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.getElementById("rotateMessageContainer").style.display = "block";
        } else {
            document.getElementById("rotateMessageContainer").style.display = "none";
        }
    });
}