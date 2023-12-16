/**
 * Represents a background object.
 * A background object is a movable object.
 * It has a width, a height and a speed.
 * It can be started and paused.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    speed;


    /**
     * 
     * @param {*} imagePath - The path to the image of the background object.
     * @param {*} x - The initial x coordinate of the background object.
     * @param {*} speed - The speed of the background object.
     */
    constructor(imagePath, x, speed, otherDirection) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
        this.speed = speed;
        this.originalSpeed = speed;
        this.start(otherDirection);
    }


    /**
     * Starts the background object.
     * 
     * If `otherDirection` is true, the background object moves to the right.
     * If `otherDirection` is false or not provided, the background object moves to the left.     
     * * @param {boolean} otherDirection - The direction of the background object.
     */
    start(otherDirection) {
        if (otherDirection) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
    }


    /**
      * Pauses the movement of the background object.
      * 
      * This is done by setting the speed of the background object to 0.
      */
    pause() {
        this.speed = 0;
    }


    /**
     * Resumes the movement of the background object.
     */
    resetSpeed() {
        this.speed = this.originalSpeed;
    }
}