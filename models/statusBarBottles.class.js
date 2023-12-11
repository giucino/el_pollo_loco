/**
 * Represents the status bar bottles in the game.
 * 
 * The status bar bottles are a type of drawable object that display the number of bottles the player has.
 * They have a specific image, width, height, and count.
 * The count can be increased or decreased by one, and the bottles can be drawn on a canvas context.
 * 
 * @extends DrawableObject
 */
class StatusBarBottles extends DrawableObject {
    IMAGE_BOTTLE = [
        'img/7_statusbars/3_icons/icon_salsa_bottle.png'
    ];

    count = 0;


    /**
     * Creates a new status bar bottles object.
     * 
     * The status bar bottles object loads its image and sets its initial position and size.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGE_BOTTLE);
        this.x = 280;
        this.y = 10;
        this.width = 60;
        this.height = 60;
    }


    /**
     * Increases the count of the status bar bottles by one.
     */
    increaseCountByOne() {
        this.count++;
    }


    /**
     * Draws the status bar bottles on a canvas context.
     * 
     * The status bar bottles are drawn with their image and count.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.font = '35px Boogaloo';
        ctx.fillStyle = 'black';
        ctx.fillText(this.count, this.x + this.width - 15, this.y + 43);
    }


    /**
     * Decreases the count of the status bar bottles by one.
     */
    decreaseCountByOne() {
        this.count--;
    }
}