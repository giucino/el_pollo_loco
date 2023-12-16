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


  // setCameraPosition() {
    //     if (this.character.otherDirection) {
    //         this.camera_x = -this.character.x + this.canvas.width - 450;
    //     } else {
    //         this.camera_x = -this.character.x + 200;
    //     }
    // } aufruf in der draw funktion


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


//keyboard.js
// addTouchListeners(buttonId, startTouch, endTouch) {
//     const button = document.getElementById(buttonId);

//     button.addEventListener('touchstart', startTouch, { passive: false });
//     button.addEventListener('touchend', endTouch, { passive: false });
// }

// checkButtonsArePressed() {
//     this.addTouchListeners('btnRight',
//         (event) => { event.preventDefault(); this.KEY_RIGHT = true; },
//         (event) => { event.preventDefault(); this.KEY_RIGHT = false; }
//     );
//     this.addTouchListeners('btnLeft',
//         (event) => { event.preventDefault(); this.KEY_LEFT = true; },
//         (event) => { event.preventDefault(); this.KEY_LEFT = false; }
//     );
//     this.addTouchListeners('btnJump',
//         (event) => { event.preventDefault(); this.KEY_UP = true; },
//         (event) => { event.preventDefault(); this.KEY_UP = false; }
//     );
//     this.addTouchListeners('btnThrow',
//         (event) => { event.preventDefault(); this.KEY_D = true; },
//         (event) => { event.preventDefault(); this.KEY_D = false; }
//     );
// }


// checkButtonsArePressed() {
//     const btnRight = document.getElementById('btnRight');
//     const btnLeft = document.getElementById('btnLeft');
//     const btnJump = document.getElementById('btnJump');
//     const btnThrow = document.getElementById('btnThrow');

//     btnRight.addEventListener('touchstart', (event) => { event.preventDefault(); this.KEY_RIGHT = true; }, { passive: false });
//     btnLeft.addEventListener('touchstart', (event) => { event.preventDefault(); this.KEY_LEFT = true; }, { passive: false });
//     btnJump.addEventListener('touchstart', (event) => { event.preventDefault(); this.KEY_UP = true; }, { passive: false });
//     btnThrow.addEventListener('touchstart', (event) => { event.preventDefault(); this.KEY_D = true; }, { passive: false });

//     const endTouch = (event) => {
//         event.preventDefault();
//         this.KEY_RIGHT = false;
//         this.KEY_LEFT = false;
//         this.KEY_UP = false;
//         this.KEY_D = false;
//     };

//     btnRight.addEventListener('touchend', endTouch, { passive: false });
//     btnLeft.addEventListener('touchend', endTouch, { passive: false });
//     btnJump.addEventListener('touchend', endTouch, { passive: false });
//     btnThrow.addEventListener('touchend', endTouch, { passive: false });
// }

//oder
// checkButtonsArePressed() {
//     this.addButtonListeners('btnRight', 'KEY_RIGHT');
//     this.addButtonListeners('btnLeft', 'KEY_LEFT');
//     this.addButtonListeners('btnJump', 'KEY_UP');
//     this.addButtonListeners('btnThrow', 'KEY_D');
// }


// gameEndActions.js
// function showEndscreen(audioName) {
//     isEndScreenShown = true;
//     selectRandomEndscreenImage();
//     playAudio(audioName);
//     initializeEndScreen();
// }

// showEndscreen('gameOverAudio');
// showEndscreen('victoryAudio');


// gamePauseResume.js
// const OBJECT_TYPE_BO = BackgroundObject;
// togglePauseResume(level1.backgroundObjects, ACTION_PAUSE, OBJECT_TYPE_BO);
// togglePauseResume(level1.backgroundObjects, ACTION_START, OBJECT_TYPE_BO);



// /**
//  * Clears all intervals and timeouts stored in the intervals and timeouts arrays.
//  */
// function clearAllIntervalsAndTimeouts() {
//     for (let i = 0; i < intervals.length; i++) {
//         clearInterval(intervals[i]);
//     }
//     intervals = [];
// }


/**
 * Adds click event listeners to the info bar links.
 */
// function addInfoBarLinkListeners() {
//     document.querySelectorAll('.info-bar-link').forEach(infoLink => {
//         infoLink.addEventListener('click', () => {
//             hamburger.classList.remove('active');
//             infoBar.classList.remove('active');
//             if (hamburger.style.display === 'block') {
//                 infoBar.style.display = 'none';
//             }
//         });
//     });
// }

// function addInfoBarLinkListeners() {
//   const infoLinks = document.querySelectorAll('.info-bar-link');

//   infoBarClickListener = () => {
//       hamburger.classList.remove('active');
//       infoBar.classList.remove('active');
//       if (hamburger.style.display === 'block') {
//           infoBar.style.display = 'none';
//       }
//   };
//   infoLinks.forEach(infoLink => {
//       infoLink.addEventListener('click', infoBarClickListener);
//   });
// }



/*<footer>
    <div id="credits">Credits...
        <div id="creditors" class="creditors">
            <div>
                Music by <a
                    href="https://pixabay.com/de/users/raspberrymusic-27759797/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=164689">raspberrymusic</a>
                from <a
                    href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=164689">Pixabay</a>
            </div>
            <div>
                Music by <a
                    href="https://pixabay.com/de/users/top-flow-production-28521292/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=148320">Sergio
                    Prosvirini</a> from <a
                    href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=148320">Pixabay</a>
            </div>
            <div>
                Bild von <a
                    href="https://pixabay.com/de/users/_luca-10388899/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3784915">Luca</a>
                auf <a
                    href="https://pixabay.com/de//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3784915">Pixabay</a>
            </div>
            <div>
                Bild von <a
                    href="https://pixabay.com/de/users/mostafaelturkey36-13328910/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5112222">Mostafa
                    Elturkey</a> auf <a
                    href="https://pixabay.com/de//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5112222">Pixabay</a>
            </div>
            <div>
                Bild von <a target="_blank" href="https://icons8.com/icon/eBCEOT0oGnaL/mute">Mute</target=> icon by
                    <a target="_blank" href="https://icons8.com">Icons8</a>
            </div>
            <div>
                Music by <a
                    href="https://pixabay.com/de/users/white_records-32584949/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=164704">Maksym
                    Dudchyk</a> from <a
                    href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=164704">Pixabay</a>
            </div>
            <div>
                Music by <a
                    href="https://pixabay.com/de/users/monument_music-34040748/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=159615">Oleksii
                    Holubiev</a> from <a
                    href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=159615">Pixabay</a>
            </div>
            <div>
                Music by <a
                    href="https://pixabay.com/de/users/musictown-25873992/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=103662">Musictown</a>
                from <a
                    href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=103662">Pixabay</a>
            </div>
            <div>
                Music by <a
                    href="https://pixabay.com/de/users/white_records-32584949/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=144293">Maksym
                    Dudchyk</a> from <a
                    href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=144293">Pixabay</a>
            </div>
            <div>
                Sound Effect by <a
                    href="https://pixabay.com/de/users/u_ss015dykrt-26759154/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=146260">u_ss015dykrt</a>
                from <a
                    href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=146260">Pixabay</a>
            </div>
            <div>
                Sound Effect from <a
                    href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=48124">Pixabay</a>
            </div>
            <div>
                Sound Effect by <a
                    href="https://pixabay.com/de/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=122258">UNIVERSFIELD</a>
                from <a
                    href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=122258">Pixabay</a>
            </div>
            <div>
                Sound Effect by <a
                    href="https://pixabay.com/de/users/beetpro-16097074/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=12763">beetpro</a>
                from <a
                    href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=12763">Pixabay</a>
            </div>
        </div>
    </div>
</footer> */
