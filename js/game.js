let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let character;


window.onload = function () {
    handleDeviceOrientation();
    document.getElementById('startGame').addEventListener('click', startGame);
    document.addEventListener('keydown', checkMuteKey);
    document.getElementById('credits').addEventListener('click', showCredits);
    let links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].target = '_blank';
    }
    // initializeMuteState(); 
    // muteAllSounds();
    // updateMuteIcon(isSoundMuted);
    // document.getElementById('unmuteSounds').addEventListener('click', toggleMuteSounds);
}


function startGame() {
    init();
    isGameStarted = true;
    pauseAudio('startAudio');
    initializeGameScreen();
    document.removeEventListener('keydown', enterGame);
    document.addEventListener('keydown', handlePauseKey);
    if (!isSoundMuted) {
        playAudio('backgroundMusic');
    }
}


function adjustInfoBarPosition() {
    // let infoBar = document.querySelector('.info-bar');
    let mobileBtns = document.getElementById('mobileBtns');

    if (window.innerWidth <= 1000 && isGameStarted) {
        // infoBar.style.top = '70px';
        mobileBtns.style.display = 'flex';
    } else {
        // infoBar.style.top = '';
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


function showCredits() {
    let credits = document.getElementById('crediteurs');

    if (credits.style.display === 'flex') {
        credits.style.display = 'none';
    } else {
        credits.style.display = 'flex';
    }
}