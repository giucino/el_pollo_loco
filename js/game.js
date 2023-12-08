let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let character;


window.onload = function () {
    handleDeviceOrientation();
    initializeEventListeners();
    openLinksInNewTab();
}


function handleDeviceOrientation() {
    function checkOrientation() {
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.getElementById('deviceContainer').style.display = "flex";
        } else {
            document.getElementById('deviceContainer').style.display = "none";
        }
    }

    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);
}


function initializeEventListeners() {
    document.getElementById('startGame').addEventListener('click', startGame);
    document.addEventListener('keydown', checkMuteKey);
    document.getElementById('credits').addEventListener('click', showCredits);
}


function openLinksInNewTab() {
    let links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].target = '_blank';
    }
}


function showCredits() {
    let credits = document.getElementById('crediteurs');

    if (credits.style.display === 'flex') {
        credits.style.display = 'none';
    } else {
        credits.style.display = 'flex';
    }
}


function startGame() {
    init();
    isGameStarted = true;
    pauseAudio('startAudio');
    initializeGameScreen();
    setupEventListeners();
    playBackgroundMusicIfNotMuted();
    adjustInfoBarPosition();
}

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


function setupEventListeners() {
    document.removeEventListener('keydown', enterGame);
    document.addEventListener('keydown', handlePauseKey);
}


function playBackgroundMusicIfNotMuted() {
    if (!isSoundMuted) {
        playAudio('backgroundMusic');
    }
}


function adjustInfoBarPosition() {
    let mobileBtns = document.getElementById('mobileBtns');

    if (window.innerWidth <= 1000 && isGameStarted) {
        mobileBtns.style.display = 'flex';
    } else {
        mobileBtns.style.display = 'none';
    }
}
window.addEventListener('resize', adjustInfoBarPosition);


function enterGame(event) {
    if (event.key === 'Enter') {
        startGame();
    }
}
document.addEventListener('keydown', enterGame);


function changeTooltip(svgId, newTooltip) {
    let svgElement = document.getElementById(svgId);
    let titleElement = svgElement.querySelector('title');
    titleElement.textContent = newTooltip;
}