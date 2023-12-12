/**
 * Represents a chicken in the game.
 * 
 * A chicken is a type of movable object that has a specific width, height, speed, and offset.
 * It can move to the left and be eliminated.
 * 
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    offset = {
        top: -15,
        bottom: 5,
        left: 8,
        right: 8,
    };

    x = 120;
    y = 347;
    height = 80;
    width = 80;


    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    CHICKEN_ELIMINATED = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    /**
    * Starts the movement and animation of the chicken.
    * 
    * The chicken starts moving to the left and its animation starts playing.
    */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_ELIMINATED);
        this.x = 400 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.5;
        // this.start(); Wird in der level1.js gestartet!!
    }


    /**
    * Starts the movement and animation of the chick.
    * 
    * The chick starts moving to the left and its animation starts playing.
    */
    start() {
        this.chickensMoveLeft();
        this.isChickenEliminated();
    }


    /**
     * Pauses the movement and animation of the chicken.
     */
    pause() {
        clearInterval(this.movingIntervalId);
        clearInterval(this.animationIntervalId);
    }


    /**
     * Moves the chicken to the left.
     */
    chickensMoveLeft() {
        this.movingIntervalId = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


    /**
     * Checks if the chicken is eliminated.
     */
    isChickenEliminated() {
        this.animationIntervalId = setInterval(() => {
            this.animateChicken();
        }, 100);
    }


    /**
     * Animates the chick. If the chick is eliminated, its animation changes.
     */
    animateChicken() {
        if (this.isGameOver()) {
            this.speed = 0;
            this.playAnimation(this.CHICKEN_ELIMINATED);
        } else {
            this.playAnimation(this.CHICKEN_WALKING);
        }
    }
}