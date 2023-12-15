/**
 * Represents a movable object.
 * 
 * A movable object is an object that can be moved in a certain direction.
 * It has a specific width, height, and speed, and it can play different animations for moving and collision.
 * 
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    speed = 0.09;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    jumpTimeStamp = new Date().getTime();



    /**
     * Plays an animation.
     * @param {Array} images - The images to use for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The other object to check for collision.
     * @returns {boolean} - Whether the object is colliding with the other object.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
        
    }


    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        addSetInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                if (this instanceof Character && this.y > 145) {
                    this.y = 145;
                }
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - Whether the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 145;
        }
    }


    /**
     * Reduces the energy of the object.
     */
    reduceEnergy() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object is hurt.
     * @returns {boolean} - Whether the object is hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < .2;
    }


    /**
     * Checks if the game is over.
     * @returns {boolean} - Whether the game is over.
     */
    isGameOver() {
        return this.energy == 0;
    }


    /**
     * Checks if the object is moving horizontally.
     * @param {Keyboard} keyboard - The keyboard input.
     * @returns {boolean} - Whether the object is moving horizontally.
     */
    isMovingHorizontally(keyboard) {
        return keyboard.KEY_RIGHT || keyboard.KEY_LEFT;
    }


    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 30;
        this.jumpTimeStamp = new Date().getTime();
    }


    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}