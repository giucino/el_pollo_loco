/**
 * Represents a cloud in the game.
 * 
 * A cloud is a type of movable object that has a specific width, height, and y-coordinate.
 * It can be positioned at different y-coordinates depending on its count.
 * It can be started, which makes it move to the left, and paused, which stops its movement.
 * 
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    static count = 0;
    y = 20;
    width = 500;
    height = 250;

    
    /**
     * Creates a new cloud.
     * 
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(x) {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.setYPosition();
        Cloud.count++;
        this.start();
    }

    /**
     * Sets the y-coordinate of the cloud.
     * 
     * If the count of the cloud is odd, the y-coordinate is set to 40.
     * Otherwise, it remains at its initial value of 20.
     */
    setYPosition() {
        if (Cloud.count % 2 === 1) {
            this.y = 40;
        }
    }


    /**
     * Starts the movement of the cloud.
     * 
     * The cloud moves to the left.
     */
    start() {
        this.moveCloudLeft();
    }


    /**
     * Pauses the movement of the cloud.
     * 
     * This is done by clearing the interval that was set in `moveCloudLeft`.
     */
    pause() {
        clearInterval(this.movingIntervalId);
    }


    /**
     * Moves the cloud to the left.
     * 
     * This is done by decreasing the x-coordinate of the cloud at a certain speed.
     */
    moveCloudLeft() {
        this.movingIntervalId = addSetInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}