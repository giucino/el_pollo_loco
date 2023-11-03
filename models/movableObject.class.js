class MovableObject extends DrawableObject {
    speed = 0.09;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastAction = new Date().getTime();


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
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


    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height) &&
    //         obj.onCollisionCourse;
    // }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
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
        this.lastAction = new Date().getTime();
    }


    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    moveCloudLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}