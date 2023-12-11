/**
 * Represents a chick in the game.
 * 
 * A chick is a type of movable object that has a specific width, height, speed, and offset.
 * It can move to the left and be eliminated.
 * 
 * @extends MovableObject
 */
class Chick extends MovableObject {
    offset = {
        top: -22,
        bottom: 0,
        left: -5,
        right: 5,
    };

    x = 120;
    y = 375;
    height = 50;
    width = 50;


    CHICK_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    CHICK_ELIMINATED = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    /**
    * Starts the movement and animation of the chick.
    * 
    * The chick starts moving to the left and its animation starts playing.
    */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.CHICK_WALKING);
        this.loadImages(this.CHICK_ELIMINATED);
        this.x = 300 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.5;
        // this.start(); Wird in der level1.js gestartet!!
    }


    /**
     * Starts the movement and animation of the chick.
     * 
     * The chick starts moving to the left and its animation starts playing.
     */
    start() {
        this.chicksMoveLeft();
        this.isChickEliminated();
    }


    /**
     * Pauses the movement and animation of the chick.
     */
    pause() {
        clearInterval(this.movingIntervalId);
        clearInterval(this.animationIntervalId);
    }


    /**
     * Moves the chick to the left.
     */
    chicksMoveLeft() {
        this.movingIntervalId = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


    /**
     * Checks if the chick is eliminated.
     */
    isChickEliminated() {
        this.animationIntervalId = setInterval(() => {
            this.animateChick();
        }, 100);
    }


    /**
     * Animates the chick. If the chick is eliminated, its animation changes.
     */
    animateChick() {
        if (this.isGameOver()) {
            this.speed = 0;
            this.playAnimation(this.CHICK_ELIMINATED);
        } else {
            this.playAnimation(this.CHICK_WALKING);
        }
    }
}