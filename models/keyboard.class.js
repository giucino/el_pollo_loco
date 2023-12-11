/**
 * Keyboard class to handle keyboard inputs.
 */
class Keyboard {
    KEY_LEFT = false;
    KEY_RIGHT = false;
    KEY_UP = false;
    KEY_SPACE = false;
    KEY_D = false;
    KEY_P = false;
    KEY_M = false;
    KEY_F = false;
    KEY_ENTER = false;
    isKeyPressed = true;


    /**
     * Creates a new Keyboard object.
     */
    constructor() {
        this.initializeKeyboardEvents();
        this.initializeButtonListeners();
    }


    /**
     * Calls the methods to check if keys are pressed or released.
     */
    initializeKeyboardEvents() {
        this.listenForKeyPresses();
        this.listenForKeyReleases();
    }


    /**
     * Checks if keys are pressed and sets the corresponding property to true.
     * After 500 milliseconds, the property is set to false.
     */
    listenForKeyPresses() {
        window.addEventListener('keydown', (event) => {
            const { key, code } = event;

            if (code === 'ArrowLeft') {
                this.KEY_LEFT = true;
            }
            if (code === 'ArrowRight') {
                this.KEY_RIGHT = true;
            }
            if (code === 'ArrowUp') {
                if (this.isKeyPressed) {
                    this.KEY_UP = true;
                }
                setTimeout(() => {
                    this.KEY_UP = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key === ' ') {
                if (this.isKeyPressed) {
                    this.KEY_SPACE = true;
                }
                setTimeout(() => {
                    this.KEY_SPACE = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key.toLowerCase() === 'd') {
                if (this.isKeyPressed) {
                    this.KEY_D = true;
                }
                setTimeout(() => {
                    this.KEY_D = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key.toLowerCase() === 'p') {
                if (this.isKeyPressed) {
                    this.KEY_P = true;
                }
                setTimeout(() => {
                    this.KEY_P = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key.toLowerCase() === 'm') {
                if (this.isKeyPressed) {
                    this.KEY_M = true;
                }
                setTimeout(() => {
                    this.KEY_M = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key.toLowerCase() === 'f') {
                if (this.isKeyPressed) {
                    this.KEY_F = true;
                }
                setTimeout(() => {
                    this.KEY_F = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key === 'Enter') {
                if (this.isKeyPressed) {
                    this.KEY_ENTER = true;
                }
                setTimeout(() => {
                    this.KEY_ENTER = false;
                }, 500);
                this.isKeyPressed = false;
            }
        });
    }


    /**
     * Checks if keys are released and sets the corresponding property to false.
     * Also sets the isKeyPressed property to true.
     */
    listenForKeyReleases() {
        window.addEventListener('keyup', (event) => {
            const { key, code } = event;

            if (code === 'ArrowLeft') {
                this.KEY_LEFT = false;
                this.isKeyPressed = true;
            }
            if (code === 'ArrowRight') {
                this.KEY_RIGHT = false;
                this.isKeyPressed = true;
            }
            if (code === 'ArrowUp') {
                this.KEY_UP = false;
                this.isKeyPressed = true;
            }
            if (key === ' ') {
                this.KEY_SPACE = false;
                this.isKeyPressed = true;
            }
            if (key.toLowerCase() === 'd') {
                this.KEY_D = false;
                this.isKeyPressed = true;
            }
            if (key.toLowerCase() === 'p') {
                this.KEY_P = false;
                this.isKeyPressed = true;
            }
            if (key.toLowerCase() === 'm') {
                this.KEY_M = false;
                this.isKeyPressed = true;
            }
            if (key.toLowerCase() === 'f') {
                this.KEY_F = false;
                this.isKeyPressed = true;
            }
            if (key === 'Enter') {
                this.KEY_ENTER = false;
                this.isKeyPressed = true;
            }
        });
    }


    /**
    * Checks if the buttons are pressed and adds event listeners to them.
    */
    initializeButtonListeners() {
        this.addButtonListeners('btnRight', 'KEY_RIGHT');
        this.addButtonListeners('btnLeft', 'KEY_LEFT');

        const button = document.getElementById('btnJump');
        button.addEventListener('touchstart', (event) => this.startTouchWithTimeout(event, 'KEY_UP', 500), { passive: false });
        button.addEventListener('touchend', (event) => this.endTouch(event, 'KEY_UP'), { passive: false });

        const buttonThrow = document.getElementById('btnThrow');
        buttonThrow.addEventListener('touchstart', (event) => this.startTouchWithTimeout(event, 'KEY_D', 500), { passive: false });
        buttonThrow.addEventListener('touchend', (event) => this.endTouch(event, 'KEY_D'), { passive: false });
    }


    /**
    * Adds event listeners for touchstart and touchend events to a button.
    * @param {string} buttonId - The ID of the button.
    * @param {string} key - The key to set to true or false.
    */
    addButtonListeners(buttonId, key) {
        const button = document.getElementById(buttonId);
        button.addEventListener('touchstart', (event) => this.startTouch(event, key), { passive: false });
        button.addEventListener('touchend', (event) => this.endTouch(event, key), { passive: false });
    }


    /**
    * Starts a touch event and sets the specified key to true.
    * @param {TouchEvent} event - The touch event.
    * @param {string} key - The key to set to true.
    */
    startTouch(event, key) {
        event.preventDefault();
        this.isTouchActive = true;
        this[key] = true;
    }


    /**
    * Ends a touch event and sets the specified key to false.
    * @param {TouchEvent} event - The touch event.
    * @param {string} key - The key to set to false.
    */
    endTouch(event, key) {
        event.preventDefault();
        this.isTouchActive = false;
        this[key] = false;
    }


    /**
    * Starts a touch event with a timeout and sets the specified key to true, then false after the timeout.
    * @param {TouchEvent} event - The touch event.
    * @param {string} key - The key to set to true, then false.
    * @param {number} timeout - The timeout in milliseconds.
    */
    startTouchWithTimeout(event, key, timeout) {
        event.preventDefault();
        this[key] = true;
        setTimeout(() => {
            this[key] = false;
        }, timeout);
    }
}