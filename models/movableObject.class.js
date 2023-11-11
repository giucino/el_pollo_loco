class MovableObject extends DrawableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    speed = 0.09;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    energyEndboss = 100;
    lastHit = 0;
    jumpTimeStamp = new Date().getTime();


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                if (this instanceof Character && this.y > 145) {
                    this.y = 145;
                }
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 145;
        }
    }


    isColliding(obj) {
        return (
            this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
        );
    }


    reduceEnergy() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    reduceEnergyEndboss() {
        this.energyEndboss -= 20;
        if (this.energyEndboss < 0) {
            this.energyEndboss = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < .2;
    }

    /**
   * Checks if the object was hit.
   * @returns {boolean} - True if the object was hit, false otherwise.
   */
    wasHit() {
        return this.energy < 100;
    }


    isGameOver() {
        return this.energy == 0;
    }

    endbossIsGameOver() {
        return this.energyEndboss == 0;
    }


    isMovingHorizontally(keyboard) {
        return keyboard.KEY_RIGHT || keyboard.KEY_LEFT;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    characterJump() {
        if (this.canJump()) {
            if (!this.isGameOver()) {
                this.jump();
            }
        }
    }


    jump() {
        this.speedY = 30;
        this.jumpTimeStamp = new Date().getTime();
    }


    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }
}