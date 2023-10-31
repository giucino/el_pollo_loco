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

    burst_bottle = new Audio('audio/bottle_burst.flac');


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.SALSA_BOTTLE_SPINNING);
        this.loadImages(this.SALSA_BOTTLE_COLLISION);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throwBottle();
    }


    throwBottle() {
        this.speedY = 30;
        this.applyGravity();

        this.animationInterval = setInterval(() => {
            this.handleBottleAnimation();
        }, 45);
    }


    handleBottleAnimation() {
        this.playAnimation(this.SALSA_BOTTLE_SPINNING);
        this.x += 10;

        if (this.hasHitPlayGround()) {
            clearInterval(this.animationInterval);
            this.playGroundImpactAnimation();
        }
    }


    hasHitPlayGround() {
        const groundLevel = 340;
        return this.y >= groundLevel;
    }


    // playGroundImpactAnimation() {
    //     this.playAnimation(this.SALSA_BOTTLE_COLLISION);
    //     this.jumping_sound1.play();
    // }


    playGroundImpactAnimation() {
        const collisionImages = this.SALSA_BOTTLE_COLLISION;
        let currentIndex = 0;

        const animationInterval = setInterval(() => {
            if (currentIndex < collisionImages.length) {
                this.playAnimation([collisionImages[currentIndex]]);
                currentIndex++;
            } else {
                clearInterval(animationInterval);
            }
        }, 40);
        this.burst_bottle.play();
    }
}