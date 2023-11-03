class Keyboard {
    KEY_LEFT = false;
    KEY_RIGHT = false;
    KEY_UP = false;
    KEY_DOWN = false;
    KEY_SPACE = false;
    KEY_D = false;

    isSpacePressed = true;

    /**
     * Constructor for the Keyboard class.
     * Initializes keyboard events for both physical keyboard and touchpad.
     */
    constructor() {
        this.eventKeyboard();
        // this.eventTouchpad();
    }

    /**
     * Sets up keyboard events for key press and release.
     */
    eventKeyboard() {
        this.checkKeysArePressed();
        this.checkKeysAreReleased();
    }

    checkKeysArePressed() {
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
            if (key === ' ') {
                if (this.isSpacePressed) {
                    keyboard.KEY_SPACE = true;
                }
                setTimeout(() => {
                    keyboard.KEY_SPACE = false;
                }, 500);
                this.isSpacePressed = false;
            }
            if (key === 'd' || event.key === 'D') {
                if (this.isSpacePressed) {
                    keyboard.KEY_D = true;
                }
                setTimeout(() => {
                    keyboard.KEY_D = false;
                }, 500);
                this.isSpacePressed = false;
            }
        });
    }

    checkKeysAreReleased() {
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
            if (key === ' ') {
                keyboard.KEY_SPACE = false;
                this.isSpacePressed = true;
            }
            if (key === 'd' || key === 'D') {
                keyboard.KEY_D = false;
                this.isSpacePressed = true;
            }
        });
    }
}