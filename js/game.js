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


function changeTooltip(svgId, newTooltip) {
    let svgElement = document.getElementById(svgId);
    let titleElement = svgElement.querySelector('title');
    titleElement.textContent = newTooltip;
}