class Chick extends MovableObject {
    offset = {
        top: -30,
        bottom: 0,
        left: 1,
        right: 1,
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


    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.CHICK_WALKING);
        this.loadImages(this.CHICK_ELIMINATED);
        this.x = 200 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateChick();
    }
    

    animateChick() {
        this.smallChickensMoveLeft();
        this.checkSmallChickenIsDead();
    }



    smallChickensMoveLeft() {
        this.SmallChickenMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }



    checkSmallChickenIsDead() {
        this.SmallChickenAnimation = setInterval(() => {
            this.playChicken();
        }, 100);
    }



    playChicken() {
        if (this.isGameOver()) {
            this.speed = 0;
            this.playAnimation(this.CHICK_ELIMINATED);
        } else {
            this.playAnimation(this.CHICK_WALKING);
        }
    }



    stopSmallChickenInterval() {
        clearInterval(this.SmallChickenMoveLeft);
        clearInterval(this.SmallChickenAnimation);
    }
}