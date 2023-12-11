/**
 * This module manages the game control interface.
 * 
 * It provides functions to setup the control interface, handle clicks on the control interface,
 * toggle the visibility of the control interface, handle game pause or resume, close the control interface,
 * and add or remove custom event listeners.
 * 
 * @module gameInterfaceControl
 */


let isGameStarted = false;
let showControlInterface;


/**
 * Sets up the control interface.
 * 
 * It gets the elements for showing the control interface and the control interface itself,
 * and adds event listeners for clicks on the control interface and the document.
 */
function setupControlInterface() {
    showControlInterface = document.getElementById('showControlInterface');
    const controlInterface = document.getElementById('controlInterface');

    controlInterface.addEventListener('click', controlInterfaceClickHandler);

    document.addEventListener('click', closeControlInterface);
}
document.addEventListener('DOMContentLoaded', setupControlInterface);


/**
 * Handles clicks on the control interface.
 * 
 * It stops the propagation of the click event, toggles the control interface, and handles game pause or resume.
 * @param {Event} event - The click event.
 */
let controlInterfaceClickHandler = function(event) {
    event.stopPropagation();
    toggleControlInterface();
    handleGamePauseOrResume();
};


/**
 * Toggles the visibility of the control interface.
 * 
 * It gets the overlay element and toggles the display style of the control interface and the overlay.
 */
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


/**
 * Handles game pause or resume.
 * 
 * If the game has started, it pauses or resumes the game and removes or adds custom event listeners
 * based on the display style of the control interface.
 */
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


/**
 * Closes the control interface.
 * 
 * It gets the overlay element and hides the control interface and the overlay if the control interface is visible.
 * If the game has started, it also resumes the game and adds custom event listeners.
 */
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


/**
 * Adds custom event listeners for the pause and mute keys.
 */
function addCustomEventListeners() {
    document.addEventListener('keydown', handlePauseKey);
    document.addEventListener('keydown', checkMuteKey);
}


/**
 * Removes custom event listeners for the pause and mute keys.
 */
function removeCustomEventListeners() {
    document.removeEventListener('keydown', handlePauseKey);
    document.removeEventListener('keydown', checkMuteKey);
}