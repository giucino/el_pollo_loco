/**
 * Represents a throwable object in the game.
 * 
 * A throwable object is a type of movable object that can be thrown in a certain direction.
 * It has a specific width, height, and speed, and it can play different animations for spinning and collision.
 * 
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    SALSA_BOTTLE_SPINNING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    SALSA_BOTTLE_COLLISION = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    isBursted = false;


    /**
     * Creates a new throwable object.
     * 
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {boolean} otherDirection - Whether the throwable object should be thrown in the other direction.
     */
    constructor(x, y, otherDirection) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.SALSA_BOTTLE_SPINNING);
        this.loadImages(this.SALSA_BOTTLE_COLLISION);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 70;
        this.width = 70;
        this.throwBottle();
    }


    /**
     * Throws the throwable object.
     * 
     * The throwable object is thrown with a certain speed and direction, and it plays a spinning animation.
     */
    throwBottle() {
        this.speedY = 30;
        this.applyGravity();
        this.speedX = this.otherDirection ? -10 : 10;

        this.animationInterval = setInterval(() => {
            this.handleBottleAnimation();
        }, 45);
    }


    /**
     * Handles the animation of the throwable object.
     * 
     * The throwable object plays a spinning animation and moves in a certain direction.
     * If it hits the ground, it plays a collision animation.
     */
    handleBottleAnimation() {
        this.playAnimation(this.SALSA_BOTTLE_SPINNING);
        this.x += this.speedX;

        if (this.hasHitPlayGround()) {
            clearInterval(this.animationInterval);
            this.playGroundImpactAnimation();
        }
    }


    /**
     * Checks if the throwable object has hit the ground.
     * @returns {boolean} Whether the throwable object has hit the ground.
     */
    hasHitPlayGround() {
        const groundLevel = 340;
        return this.y >= groundLevel;
    }


    /**
     * Plays the collision animation of the throwable object.
     * 
     * The throwable object plays a collision animation and a sound effect is played.
     */
    playGroundImpactAnimation() {
        this.playAnimation(this.SALSA_BOTTLE_COLLISION);
        playAudio('burstBottleAudio');
    }
}