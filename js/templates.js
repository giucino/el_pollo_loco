// function createSvgButtonsHTML() {
//     return /*html*/ `  
//     <svg id="toggleGame" onclick="toggleGame()" xmlns="http://www.w3.org/2000/svg" height="40" width="38"
//                 viewBox="0 0 320 512">
//                 <title>Pause Game</title>
//                 <path fill="#ffd111"
//                     d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
//             </svg>
//             <svg id="enter" xmlns="http://www.w3.org/2000/svg" height="40" width="38"
//                 viewBox="0 0 448 512">
//                 <title>Enter Fullscreen</title>
//                 <path opacity="1" fill="#ffd111"
//                     d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" />
//             </svg>
//             <svg id="controlInterface" xmlns="http://www.w3.org/2000/svg" height="16" width="20"
//                 viewBox="0 0 640 512">
//                 <title>Controll Interface</title>
//                 <path fill="#ffd111"
//                     d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" />
//             </svg>
//     `;
// }


// function svgButtons() {
//     let content = document.getElementById('infoBar');
//     content.innerHTML = /*html*/ `<svg id="muteSounds" xmlns="http://www.w3.org/2000/svg" height="40" width="38"
//     viewBox="0 0 640 512">
//     <title>Mute Sounds</title>
//     <path fill="#ffd111"
//         d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
// </svg>`;
// content.innerHTML += createSvgButtonsHTML();}


// world.js
// eliminateEnemy(enemy) {
//     let indexEnemy = -1;
//     for (let i = 0; i < this.level.enemies.length; i++) {
//         if (this.level.enemies[i] === enemy) {
//             indexEnemy = i;
//         }
//     }
//     if (indexEnemy !== -1) {
//         this.level.enemies[indexEnemy].energy = 0;
//         this.delayedRemoveEnemy(indexEnemy);
//     }
// }


// audio.js

// localStorage.setItem('isSoundMuted', isSoundMuted);

// function initializeMuteState() {
//     let hasVisited = localStorage.getItem('hasVisited');
//     let storedMuteState = localStorage.getItem('isSoundMuted');

//     if (hasVisited === null) {
//         muteAllSounds();
//         localStorage.setItem('isSoundMuted', 'true');
//         localStorage.setItem('hasVisited', 'true');
//     } else {
//         isSoundMuted = storedMuteState === 'true';
//         isSoundMuted ? muteAllSounds() : unmuteAllSounds();
//         playStartAudio();
//     }
//     updateMuteIcon(isSoundMuted);
// }
// document.addEventListener('DOMContentLoaded', initializeMuteState);


// function initializeMuteState() {
//     let hasVisited = localStorage.getItem('hasVisited');
//     let storedMuteState = localStorage.getItem('isSoundMuted');

//     if (hasVisited === null) {
//         handleFirstVisit();
//     } else {
//         handleReturningVisit(storedMuteState);
//     }
//     updateMuteIcon(isSoundMuted);
// }

// document.addEventListener('DOMContentLoaded', initializeMuteState);


// function handleFirstVisit() {
//     muteAllSounds();
//     localStorage.setItem('isSoundMuted', 'true');
//     localStorage.setItem('hasVisited', 'true');
// }


// function handleReturningVisit(storedMuteState) {
//     isSoundMuted = storedMuteState === 'true';
//     isSoundMuted ? muteAllSounds() : unmuteAllSounds();
//     playStartAudio();
// }





