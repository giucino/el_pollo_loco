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
    }


    pause() {
        clearInterval(this.endbossInterval);
    }


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


    handleGameOverAnimation() {
        this.playAnimation(this.ENDBOSS_GAME_OVER);
        this.triggerGameOver();
    }


    handleHurtAnimation() {
        this.playAnimation(this.ENDBOSS_HURT);
        playAudio('endbossHurtAudio');
    }


    handleAttackOrWalkAnimation(isAttacking) {
        if (isAttacking) {
            this.handleAttackAnimation();
        } else {
            this.handleWalkingAnimation();
        }
    }


    handleAttackAnimation() {
        this.playAnimation(this.ENDBOSS_ATTACK);
        playAudio('endbossHurtAudio');
    }


    handleWalkingAnimation() {
        this.playAnimation(this.ENDBOSS_WALKING);
        this.endbossMoveLeft();
    }


    handleAlertAnimation() {
        this.playAnimation(this.ENDBOSS_ALERT);
    }


    reduceEnergyEndboss() {
        this.energyEndboss -= 20;
        if (this.energyEndboss < 0) {
            this.energyEndboss = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    wasHit() {
        this.isHurt();
        return this.energyEndboss < 100;
    }


    endbossMoveLeft() {
        this.x -= this.endbossSpeed;
    }


    endbossIsGameOver() {
        return this.energyEndboss == 0;
    }


    triggerGameOver() {
        if (!this.isGameOverTriggered) {
            characterHasWon();
            this.isGameOverTriggered = true;
        }
    }
}