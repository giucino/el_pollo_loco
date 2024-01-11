let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let character;
let infoBar = document.querySelector('.info-bar');
let hamburger = document.querySelector('.hamburger');
let hamburgerClickListener;
let infoBarClickListener;


/**
 * This function is called when the window loads.
 * It initializes the device orientation, event listeners, and opens links in a new tab.
 */
window.onload = function () {
    handleDeviceOrientation();
    adjustMobileBtnsPosition();
    adjustInfoBarPosition();
    initializeEventListeners();
    openLinksInNewTab();
}


/**
 * This function handles the device orientation.
 * It checks the orientation and displays a message if the device is in portrait mode.
 */
function handleDeviceOrientation() {
    function checkOrientation() {
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.getElementById('deviceContainer').style.display = "flex";
        } else {
            document.getElementById('deviceContainer').style.display = "none";
        }
    }
    checkOrientation();

    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);
}


/**
 * This function initializes the event listeners for the game.
 * It adds event listeners for starting the game, muting the game, and showing the credits.
 */
function initializeEventListeners() {
    document.getElementById('startGame').addEventListener('click', startGame);
    document.addEventListener('keydown', checkMuteKey);
    // document.getElementById('credits').addEventListener('click', showCredits);
}


/**
 * This function opens all links in a new tab.
 * It sets the target attribute of all anchor elements to '_blank'.
 */
function openLinksInNewTab() {
    let links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].target = '_blank';
    }
}

/**
 * This function shows or hides the credits.
 * It toggles the display style of the credits element between 'flex' and 'none'.
 */
function showCredits() {
    let credits = document.getElementById('creditors');

    if (credits.style.display === 'flex') {
        credits.style.display = 'none';
    } else {
        credits.style.display = 'flex';
    }
}


/**
 * Starts the game by initializing the game elements, setting up event listeners, and playing the background music.
 */
function startGame() {
    init();
    isGameStarted = true;
    pauseAudio('startAudio');
    initializeGameScreen();
    setupEventListeners();
    playBackgroundMusicIfNotMuted();
    adjustMobileBtnsPosition();
    adjustInfoBarPosition();
    addInfoBarLinkListeners();
    addHamburgerListener();
}


/**
 * Initializes the game level and the game world.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * Initializes the game screen by hiding the start screen and showing the game controls.
 */
function initializeGameScreen() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('toggleGame').style.display = 'flex';
    document.getElementById('enterFullscreen').style.display = 'flex';
    document.getElementById('controlInterface').style.display = 'flex';
}


/**
 * Sets up the event listeners for the game.
 */
function setupEventListeners() {
    document.removeEventListener('keydown', enterGame);
    document.addEventListener('keydown', handlePauseKey);
}


/**
 * Plays the background music if the sound is not muted.
 */
function playBackgroundMusicIfNotMuted() {
    if (!isSoundMuted) {
        playAudio('backgroundMusic');
    }
}


/**
 * Adjusts the position of the mobile buttons based on the window size.
 */
function adjustMobileBtnsPosition() {
    let mobileBtns = document.getElementById('mobileBtns');

    if (window.innerWidth <= 1000 && isGameStarted) {
        mobileBtns.style.display = 'flex';
    } else {
        mobileBtns.style.display = 'none';
    }
}
window.addEventListener('resize', adjustMobileBtnsPosition);


/**
 * Adjusts the position of the info bar based on the window size.
 */
function adjustInfoBarPosition() {
    if (window.innerWidth <= 720 && isGameStarted) {
        infoBar.style.display = 'none';
        hamburger.style.display = 'block';
    } else {
        infoBar.style.display = '';
        infoBar.classList.remove('active');
        hamburger.style.display = '';
        hamburger.classList.remove('active');
    }
}
window.addEventListener('resize', adjustInfoBarPosition);


/**
 * Adds a click event listener to the hamburger menu.
 */
function addHamburgerListener() {
    hamburgerClickListener = () => {
        hamburger.classList.toggle("active");
        infoBar.classList.toggle("active");
        infoBar.style.display = infoBar.style.display === 'none' ? 'flex' : 'none';
    };
    hamburger.addEventListener("click", hamburgerClickListener);
}


/**
 * Adds click event listeners to the info bar links.
 */
function addInfoBarLinkListeners() {
    const infoLinks = document.querySelectorAll('.info-bar-link');

    infoBarClickListener = () => {
        hamburger.classList.remove('active');
        infoBar.classList.remove('active');
        if (hamburger.style.display === 'block') {
            infoBar.style.display = 'none';
        }
    };
    infoLinks.forEach(infoLink => {
        infoLink.addEventListener('click', infoBarClickListener);
    });
}


/**
 * Starts the game when the Enter key is pressed.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function enterGame(event) {
    if (event.key === 'Enter') {
        startGame();
    }
}
document.addEventListener('keydown', enterGame);


/**
 * Changes the tooltip of an SVG element.
 * @param {string} svgId - The ID of the SVG element.
 * @param {string} newTooltip - The new tooltip text.
 */
function changeTooltip(svgId, newTooltip) {
    let svgElement = document.getElementById(svgId);
    let titleElement = svgElement.querySelector('title');
    titleElement.textContent = newTooltip;
}