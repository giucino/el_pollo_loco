/**
 * Represents the status bar coins in the game.
 * 
 * The status bar coins are a type of drawable object that display the number of coins the player has.
 * They have a specific image, width, height, and count.
 * The count can be increased by one, and the coins can be drawn on a canvas context.
 * 
 * @extends DrawableObject
 */
class StatusBarCoins extends DrawableObject {
    IMAGE_COIN = [
        'img/7_statusbars/3_icons/icon_coin.png'
    ];


    count = 0;


    /**
     * Creates a new status bar coins object.
     * 
     * The status bar coins object loads its image and sets its initial position and size.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGE_COIN);
        this.x = 360;
        this.y = 10;
        this.width = 60;
        this.height = 60;
    }


    /**
     * Increases the count of the status bar coins by one.
     */
    increaseCountByOne() {
        this.count++;
    }


    /**
     * Draws the status bar coins on a canvas context.
     * 
     * The status bar coins are drawn with their image and count.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.font = '35px Boogaloo';
        ctx.fillStyle = 'black';
        ctx.fillText(this.count, this.x + this.width - 5, this.y + 43);
    }
}