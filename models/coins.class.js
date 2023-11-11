class Coin extends MovableObject {
    offset = {
        top: 10,
        bottom: 30,
        left: 40,
        right: 40,
    };

    height = 120;
    width = 120;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = -500 + Math.random() * 6500;
        this.y = 50 + Math.random() * 250;
        this.animateCoins();
    }


    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 450);
    }
}