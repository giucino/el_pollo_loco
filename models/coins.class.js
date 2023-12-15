/**
 * Represents a coin in the game.
 * 
 * A coin is a type of movable object that has a specific width, height, and offset.
 * It can be positioned randomly on the screen and it can play an animation.
 * 
 * @extends MovableObject
 */
class Coin extends MovableObject {
    offset = {
        top: 10,
        bottom: 30,
        left: 40,
        right: 40
    };

    height = 120;
    width = 120;


    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    /**
     * Creates a new coin.
     * 
     * The coin is positioned randomly on the screen and it starts its animation.
     */
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = -500 + Math.random() * 6500;
        this.y = 50 + Math.random() * 250;
        this.start();
    }


    /**
     * Starts the animation of the coin.
     * 
     * The coin plays an animation that cycles through different images.
     */
    start() {
        this.animateCoins();
    }


    /**
     * Pauses the animation of the coin.
     * 
     * This is done by clearing the interval that was set in `animateCoins`.
     */
    pause() {
        clearInterval(this.animationIntervalId);
    }
    

    /**
     * Animates the coin.
     * 
     * The coin plays an animation that cycles through different images at a certain speed.
     */
    animateCoins() {
        this.animationIntervalId = addSetInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 350);
    }
}