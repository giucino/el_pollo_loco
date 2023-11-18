class Chicken extends MovableObject {
    offset = {
        top: 0,
        bottom: 0,
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


    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_ELIMINATED);
        this.x = 400 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateChicken();
    }


    animateChicken() {
        this.chickensMoveLeft();
        this.checkChickenIsDead();
    }


    chickensMoveLeft() {
        this.chickenMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


    checkChickenIsDead() {
        this.chickenAnimation = setInterval(() => {
            this.playChicken();
        }, 100);
    }


    playChicken() {
        if (this.isGameOver()) {
            this.speed = 0;
            this.playAnimation(this.CHICKEN_ELIMINATED);
        } else {
            this.playAnimation(this.CHICKEN_WALKING);
        }
    }


    stopSmallChickenInterval() {
        clearInterval(this.chickenMoveLeft);
        clearInterval(this.chickenAnimation);
    }
}