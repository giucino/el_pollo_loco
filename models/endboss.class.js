/**
 * Represents the end boss in the game.
 * 
 * It is a movable object that can be paused and resumed.
 * An end boss has a specific width, height, speed, and offset.
 * 
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    offset = {
        top: 70,
        bottom: 10,
        left: 55,
        right: 30,
    };


    height = 350;
    width = 300;
    y = 95;
    endbossInterval;
    endbossSpeed = 30;
    energyEndboss = 100;
    lastHit = 0;
    isGameOverTriggered = false;


    ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];


    ENDBOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    ENDBOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    ENDBOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];


    ENDBOSS_GAME_OVER = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    /**
     * Creates an end boss.
     */
    constructor() {
        super();
        this.loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.ENDBOSS_WALKING);
        this.loadImages(this.ENDBOSS_ALERT);
        this.loadImages(this.ENDBOSS_ATTACK);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_GAME_OVER);
        this.x = 6600;
        this.start();
        this.world = world;
    }


    /**
     * Pauses the end boss.
     */
    pause() {
        clearInterval(this.endbossInterval);
    }


    /**
     * Starts the end boss.
     */
    start() {
        let isAttacking = true;

        this.endbossInterval = setInterval(() => {
            if (this.endbossIsGameOver()) {
                this.handleGameOverAnimation();
            } else if (this.isHurt()) {
                this.handleHurtAnimation();
            } else if (this.wasHit()) {
                this.handleAttackOrWalkAnimation(isAttacking);
                isAttacking = !isAttacking;
            } else {
                this.handleAlertAnimation();
            }
        }, 200);
    }


    /**
     * Handles the game over animation for the end boss.
     */
    handleGameOverAnimation() {
        this.playAnimation(this.ENDBOSS_GAME_OVER);
        this.triggerGameOver();
    }


    /**
     * Handles the hurt animation for the end boss.
     */
    handleHurtAnimation() {
        this.playAnimation(this.ENDBOSS_HURT);
        playAudio('endbossHurtAudio');
    }


    /**
     * Handles the attack or walk animation for the end boss.
     * @param {boolean} isAttacking - Whether the end boss is attacking.
     */
    handleAttackOrWalkAnimation(isAttacking) {
        if (isAttacking) {
            this.handleAttackAnimation();
        } else {
            this.handleWalkingAnimation();
        }
    }


    /**
     * Handles the attack animation for the end boss.
     */
    handleAttackAnimation() {
        this.playAnimation(this.ENDBOSS_ATTACK);
        playAudio('endbossHurtAudio');
    }


    /**
     * Handles the walking animation for the end boss.
     */
    handleWalkingAnimation() {
        this.playAnimation(this.ENDBOSS_WALKING);
        this.endbossMoveLeft();
    }


    /**
     * Handles the alert animation for the end boss.
     */
    handleAlertAnimation() {
        this.playAnimation(this.ENDBOSS_ALERT);
    }


    /**
     * Reduces the energy of the end boss.
     */
    reduceEnergyEndboss() {
        this.energyEndboss -= 20;
        if (this.energyEndboss < 0) {
            this.energyEndboss = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the end boss was hit.
     * @returns {boolean} - Whether the end boss was hit.
     */
    wasHit() {
        this.isHurt();
        return this.energyEndboss < 100;
    }


    /**
     * Moves the end boss to the left.
     */
    endbossMoveLeft() {
        this.x -= this.endbossSpeed;
    }


    /**
     * Checks if the game is over for the end boss.
     * @returns {boolean} - Whether the game is over for the end boss.
     */
    endbossIsGameOver() {
        return this.energyEndboss == 0;
    }


    /**
     * Triggers the game over state.
     */
    triggerGameOver() {
        if (!this.isGameOverTriggered) {
            characterHasWon();
            this.isGameOverTriggered = true;
        }
    }
}