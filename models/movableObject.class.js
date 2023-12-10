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
    lastHit = 0;
    jumpTimeStamp = new Date().getTime();



    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }


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


    reduceEnergy() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < .2;
    }


    isGameOver() {
        return this.energy == 0;
    }


    isMovingHorizontally(keyboard) {
        return keyboard.KEY_RIGHT || keyboard.KEY_LEFT;
    }


    jump() {
        this.speedY = 30;
        this.jumpTimeStamp = new Date().getTime();
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }
}