let isGameStarted = false;
let showControlInterface;


function addCustomEventListeners() {
    document.addEventListener('keydown', handlePauseKey);
    document.addEventListener('keydown', checkMuteKey);
}


function removeCustomEventListeners() {
    document.removeEventListener('keydown', handlePauseKey);
    document.removeEventListener('keydown', checkMuteKey);
}


function setupControlInterface() {
    showControlInterface = document.getElementById('showControlInterface');
    const controlInterface = document.getElementById('controlInterface');

    controlInterface.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleControlInterface();
        handleGamePauseOrResume();
    });

    document.addEventListener('click', closeControlInterface);
}

document.addEventListener('DOMContentLoaded', setupControlInterface);



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


// function setupControlInterface() {
//     const controlInterface = document.getElementById('controlInterface');
//     const showControlInterface = document.getElementById('showControlInterface');
//     let overlay = document.getElementById('overlay');

//     controlInterface.addEventListener('click', (event) => {
//         event.stopPropagation();
//         if (showControlInterface.style.display === 'flex') {
//             showControlInterface.style.display = 'none';
//             overlay.style.display = 'none';
//             if (isGameStarted) {
//                 resumeGame();
//                 addCustomEventListeners();
//             }
//         } else {
//             showControlInterface.style.display = 'flex';
//             overlay.style.display = 'block';
//             if (isGameStarted) {
//                 pauseGame();
//                 removeCustomEventListeners();
//             }
//         }
//     });
//     document.addEventListener('click', closeControlInterface);
// }
// document.addEventListener('DOMContentLoaded', setupControlInterface);