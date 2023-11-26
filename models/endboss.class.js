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
        this.x = 3000;
        this.animateEndboss();
    }


    pause() {
        clearInterval(this.endbossInterval);
    }


    animateEndboss() {
        let isAttacking = true;

        this.endbossInterval = setInterval(() => {
            if (this.endbossIsGameOver()) {
                this.playAnimation(this.ENDBOSS_GAME_OVER);
                // console.log('GO Animation abgespielt.');
            }
            else if (this.isHurt()) {
                this.playAnimation(this.ENDBOSS_HURT);
                // console.log('Hurt Animation abgespielt.');
            }
            else if (this.wasHit()) {
                if (isAttacking) {
                    this.playAnimation(this.ENDBOSS_ATTACK);
                    // console.log('Attack Animation abgespielt.');
                } else {
                    this.playAnimation(this.ENDBOSS_WALKING);
                    this.endbossMoveLeft();
                    // console.log('Walking Animation abgespielt.');
                }
                isAttacking = !isAttacking;
            } else {
                this.playAnimation(this.ENDBOSS_ALERT);
                // console.log('Alert Animation abgespielt.');
            }
        }, 200);
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


    // endbossMoveLeft() {
    //     this.x -= this.endbossSpeed;
    //     // console.log("endbossSpeed:", this.endbossSpeed)
    // }

    endbossMoveLeft() {
        this.x -= this.endbossSpeed;
        // if (this.x < 840) {
        //     this.x += this.endbossMoveRight();
        // }
    }

    // endbossMoveRight() {
    //     this.x += this.endbossSpeed;
    // }


    endbossIsGameOver() {
        return this.energyEndboss == 0;
    }
}