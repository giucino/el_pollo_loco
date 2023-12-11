let isFullScreenActive = false;

/**
 * Toggles fullscreen mode and changes the SVG path of the fullscreen button.
 * This function is attached to the click event of the 'enterFullscreen' button.
 */
function fullscreen() {
    toggleFullScreen();
    changeSVGPath();
}
document.getElementById('enterFullscreen').addEventListener('click', fullscreen);


/**
 * Toggles the fullscreen mode on and off.
 * When fullscreen mode is activated, it calls the `enterFullscreen` function and changes the tooltip to 'Exit Fullscreen'.
 * When fullscreen mode is deactivated, it calls the `exitFullscreen` function and changes the tooltip to 'Enter Fullscreen'.
 */
function toggleFullScreen() {
    isFullScreenActive = !isFullScreenActive;
    let fullscreen = document.getElementById("fullscreen");
    isFullScreenActive ? enterFullscreen(fullscreen) : exitFullscreen();
    changeTooltip('enterFullscreen', 'Exit Fullscreen');
}


/**
 * Changes the SVG path of the fullscreen button based on the current fullscreen state.
 * If fullscreen mode is active, it sets the SVG path to the `exitPath` (which represents the 'Exit Fullscreen' icon).
 * If fullscreen mode is not active, it sets the SVG path to the `enterPath` (which represents the 'Enter Fullscreen' icon).
 */
function changeSVGPath() {
    let enterImage = document.getElementById('enterFullscreen');
    let enterPath = "M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z";
    let exitPath = "M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z";
    enterImage.querySelector('path').setAttribute('d', isFullScreenActive ? exitPath : enterPath);
}


/**
 * Requests the browser to display an element in fullscreen mode.
 * 
 * @param {HTMLElement} element - The HTML element to display in fullscreen mode.
 * 
 * This function uses the Fullscreen API, which is implemented differently in different browsers.
 * It first tries to use the standard method `requestFullscreen`.
 * If that method is not available, it tries to use the `webkitRequestFullscreen` method for Safari.
 * If that method is not available, it tries to use the `msRequestFullscreen` method for IE11.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
    }
}


/**
 * Handles the keydown event to toggle fullscreen mode.
 * 
 * @param {KeyboardEvent} event - The keydown event.
 * 
 * If the key pressed is 'f', it calls the `fullscreen` function to toggle fullscreen mode.
 * This function is attached to the keydown event of the document.
 */
function handleFullscreen(event) {
    if (event.key.toLowerCase() === 'f') {
        fullscreen();
    }
}
document.addEventListener('keydown', handleFullscreen);


/**
 * Requests the browser to exit fullscreen mode.
 * 
 * This function uses the Fullscreen API, which is implemented differently in different browsers.
 * It first tries to use the standard method `exitFullscreen`.
 * If that method is not available, it tries to use the `webkitExitFullscreen` method for Safari.
 * If that method is not available, it tries to use the `msExitFullscreen` method for IE11.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}