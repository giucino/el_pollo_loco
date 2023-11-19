let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let character;
let chick;
let isGamePaused = false;


window.onload = function () {
    startAudio.play();
    document.getElementById('startGame').addEventListener('click', startGame);
}


function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    init();
    startAudio.pause();
    backgroundMusic.play();
    checkPauseKey();
}


function checkPauseKey() {
    setInterval(() => {
        if (keyboard.KEY_P) {
            toggleGame();
            keyboard.KEY_P = false;
        }
    }, 100);
}


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function toggleGame() {
    isGamePaused = !isGamePaused;

    const toggleButton = document.getElementById('toggleGame');
    // if (isGamePaused) {
    //     resumeGame();
    //     isGamePaused = false;
    //     toggleButton.innerHTML = 'Pause';
    // } else {
    //     pauseGame();
    //     isGamePaused = true;
    //     toggleButton.innerHTML = 'Resume';
    // }
    isGamePaused ? pauseGame() : resumeGame();
    toggleButton.textContent = isGamePaused ? 'Resume' : 'Pause';
}


function pauseGame() {
    backgroundMusic.pause();
    world.pause();
    world.character.pause();
    togglePauseResume(level1.enemies, 'pause', Chick);
    togglePauseResume(level1.enemies, 'pause', Chicken);
    togglePauseResume(level1.clouds, 'pause', Cloud);
}


function resumeGame() {
    backgroundMusic.play();
    world.start();
    world.character.start();
    togglePauseResume(level1.enemies, 'start', Chick);
    togglePauseResume(level1.enemies, 'start', Chicken);
    togglePauseResume(level1.clouds, 'start', Cloud);
}


function togglePauseResume(objects, action, objectType) {
    objects.forEach((object) => {
        if (object instanceof objectType) {
            object[action]();
        }
    });
}


// window.addEventListener('keydown', (event) => {
//     const { key, code } = event;

//     if (code === 'ArrowLeft') {
//         keyboard.KEY_LEFT = true;
//     }
//     if (code === 'ArrowRight') {
//         keyboard.KEY_RIGHT = true;
//     }
//     if (code === 'ArrowUp') {
//         keyboard.KEY_UP = true;
//     }
//     if (code === 'ArrowDown') {
//         keyboard.KEY_DOWN = true;
//     }
//     if (key === ' ') { // Leertaste
//         keyboard.KEY_SPACE = true;
//     }
//     if (key === 'd' || event.key === 'D')  {
//         keyboard.KEY_D = true;
//     }
// });


// window.addEventListener('keyup', (event) => {
//     const { key, code } = event;

//     if (code === 'ArrowLeft') {
//         keyboard.KEY_LEFT = false;
//     }
//     if (code === 'ArrowRight') {
//         keyboard.KEY_RIGHT = false;
//     }
//     if (code === 'ArrowUp') {
//         keyboard.KEY_UP = false;
//     }
//     if (code === 'ArrowDown') {
//         keyboard.KEY_DOWN = false;
//     }
//     if (key === ' ') { // Leertaste
//         keyboard.KEY_SPACE = false;
//     }
//     if (key === 'd' || key === 'D') {
//         keyboard.KEY_D = false;
//     }
// });