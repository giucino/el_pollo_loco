class Coin extends MovableObject {
    height = 120;
    width = 120;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = -500 + Math.random() * 6500;
        this.y = 50 + Math.random() * 250;        
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
    }
}