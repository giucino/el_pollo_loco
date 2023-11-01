let canvas;
let ctx;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is', world.character);
}


window.addEventListener('keydown', (event) => {
    const { key, code } = event;

    if (code === 'ArrowLeft') {
        keyboard.KEY_LEFT = true;
    }
    if (code === 'ArrowRight') {
        keyboard.KEY_RIGHT = true;
    }
    if (code === 'ArrowUp') {
        keyboard.KEY_UP = true;
    }
    if (code === 'ArrowDown') {
        keyboard.KEY_DOWN = true;
    }
    if (key === ' ') { // Leertaste
        keyboard.KEY_SPACE = true;
    }
    if (key === 'd' || event.key === 'D')  {
        keyboard.KEY_D = true;
    }
});


window.addEventListener('keyup', (event) => {
    const { key, code } = event;

    if (code === 'ArrowLeft') {
        keyboard.KEY_LEFT = false;
    }
    if (code === 'ArrowRight') {
        keyboard.KEY_RIGHT = false;
    }
    if (code === 'ArrowUp') {
        keyboard.KEY_UP = false;
    }
    if (code === 'ArrowDown') {
        keyboard.KEY_DOWN = false;
    }
    if (key === ' ') { // Leertaste
        keyboard.KEY_SPACE = false;
    }
    if (key === 'd' || key === 'D') {
        keyboard.KEY_D = false;
    }
});