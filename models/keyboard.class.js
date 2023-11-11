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


    //     /**
    //  * Sets up touchpad events for touch start and end.
    //  */
    //     eventTouchpad() {
    //         this.checkButtonsArePressed();
    //         this.checkButtonsAreReleased();
    //     }
    
    //     /**
    //      * Checks for touchpad buttons that are pressed and updates corresponding properties.
    //      */
    //     checkButtonsArePressed() {
    //         setTimeout(() => {
    //             document.getElementById("btnRight").addEventListener(
    //                 "touchstart",
    //                 (e) => {
    //                     e.preventDefault();
    //                     this.KEY_RIGHT = true;
    //                 },
    //                 { passive: false }
    //             );
    
    //             document.getElementById("btnLeft").addEventListener(
    //                 "touchstart",
    //                 (e) => {
    //                     e.preventDefault();
    //                     this.KEY_LEFT = true;
    //                 },
    //                 { passive: false }
    //             );
    
    //             document.getElementById("btnJump").addEventListener(
    //                 "touchstart",
    //                 (e) => {
    //                     e.preventDefault();
    //                     this.KEY_SPACE = true;
    //                 },
    //                 { passive: false }
    //             );
    
    //             document.getElementById("btnThrow").addEventListener(
    //                 "touchstart",
    //                 (e) => {
    //                     e.preventDefault();
    //                     this.KEY_D = true;
    //                 },
    //                 { passive: false }
    //             );
    //         }, 500);
    //     }
    
    //     /**
    //      * Checks for touchpad buttons that are released and updates corresponding properties.
    //      */
    //     checkButtonsAreReleased() {
    //         setTimeout(() => {
    //             document.getElementById("btnRight").addEventListener("touchend", (e) => {
    //                 e.preventDefault();
    //                 this.KEY_RIGHT = false;
    //             });
    
    //             document.getElementById("btnLeft").addEventListener("touchend", (e) => {
    //                 e.preventDefault();
    //                 this.KEY_LEFT = false;
    //             });
    
    //             document.getElementById("btnJump").addEventListener("touchend", (e) => {
    //                 e.preventDefault();
    //                 this.KEY_SPACE = false;
    //             });
    
    //             document.getElementById("btnThrow").addEventListener("touchend", (e) => {
    //                 e.preventDefault();
    //                 this.KEY_D = false;
    //             });
    //         }, 500);
    //     }
}