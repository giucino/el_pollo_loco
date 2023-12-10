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
        this.checkButtonsArePressed();
    }


    eventKeyboard() {
        this.checkKeysArePressed();
        this.checkKeysAreReleased();
    }


    checkKeysArePressed() {
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


    checkKeysAreReleased() {
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




    startTouch(event, key) {
        event.preventDefault();
        this.isTouchActive = true;
        this[key] = true;
    }
    

    endTouch(event, key) {
        event.preventDefault();
        this.isTouchActive = false;
        this[key] = false;
    }


    addButtonListeners(buttonId, key) {
        const button = document.getElementById(buttonId);
        button.addEventListener('touchstart', (event) => this.startTouch(event, key), { passive: false });
        button.addEventListener('touchend', (event) => this.endTouch(event, key), { passive: false });
    }


    startTouchWithTimeout(event, key, timeout) {
        event.preventDefault();
        this[key] = true;
        setTimeout(() => {
            this[key] = false;
        }, timeout);
    }

    
    checkButtonsArePressed() {
        this.addButtonListeners('btnRight', 'KEY_RIGHT');
        this.addButtonListeners('btnLeft', 'KEY_LEFT');

        const button = document.getElementById('btnJump');
        button.addEventListener('touchstart', (event) => this.startTouchWithTimeout(event, 'KEY_UP', 500), { passive: false });
        button.addEventListener('touchend', (event) => this.endTouch(event, 'KEY_UP'), { passive: false });

        const buttonThrow = document.getElementById('btnThrow');
        buttonThrow.addEventListener('touchstart', (event) => this.startTouchWithTimeout(event, 'KEY_D', 500), { passive: false });
        buttonThrow.addEventListener('touchend', (event) => this.endTouch(event, 'KEY_D'), { passive: false });
    }

     // checkButtonsArePressed() {
    //     this.addButtonListeners('btnRight', 'KEY_RIGHT');
    //     this.addButtonListeners('btnLeft', 'KEY_LEFT');
    //     this.addButtonListeners('btnJump', 'KEY_UP');
    //     this.addButtonListeners('btnThrow', 'KEY_D');
    // }
}