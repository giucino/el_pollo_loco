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


    constructor() {
        this.eventKeyboard();
        // this.eventTouchpad();
    }


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
                if (this.isKeyPressed) {
                    keyboard.KEY_UP = true;
                }
                setTimeout(() => {
                    keyboard.KEY_UP = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key === ' ') {
                if (this.isKeyPressed) {
                    keyboard.KEY_SPACE = true;
                }
                setTimeout(() => {
                    keyboard.KEY_SPACE = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key === 'd' || key === 'D') {
                if (this.isKeyPressed) {
                    keyboard.KEY_D = true;
                }
                setTimeout(() => {
                    keyboard.KEY_D = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key === 'p' || key === 'P') {
                if (this.isKeyPressed) {
                    keyboard.KEY_P = true;
                }
                setTimeout(() => {
                    keyboard.KEY_P = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key === 'm' || key === 'M') {
                if (this.isKeyPressed) {
                    keyboard.KEY_M = true;
                }
                setTimeout(() => {
                    keyboard.KEY_M = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key === 'f' || key === 'F') {
                if (this.isKeyPressed) {
                    keyboard.KEY_F = true;
                }
                setTimeout(() => {
                    keyboard.KEY_F = false;
                }, 500);
                this.isKeyPressed = false;
            }
            if (key === 'Enter') {
                if (this.isKeyPressed) {
                    keyboard.KEY_ENTER = true;
                }
                setTimeout(() => {
                    keyboard.KEY_ENTER = false;
                }, 500);
                this.isKeyPressed = false;
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
                this.isKeyPressed = true;
            }
            if (key === ' ') {
                keyboard.KEY_SPACE = false;
                this.isKeyPressed = true;
            }
            if (key === 'd' || key === 'D') {
                keyboard.KEY_D = false;
                this.isKeyPressed = true;
            }
            if (key === 'p' || key === 'P') {
                keyboard.KEY_P = false;
                this.isKeyPressed = true;
            }
            if (key === 'm' || key === 'M') {
                keyboard.KEY_M = false;
                this.isKeyPressed = true;
            }
            if (key === 'Enter') {
                keyboard.KEY_ENTER = false;
                this.isKeyPressed = true;
            }
        });
    }


    //     eventTouchpad() {
    //         this.checkButtonsArePressed();
    //         this.checkButtonsAreReleased();
    //     }


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