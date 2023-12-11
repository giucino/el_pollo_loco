/**
 * Represents the health status bar in the game.
 * 
 * The health status bar is a type of drawable object that displays the player's health.
 * It has a specific image, width, height, and percentage of health.
 * The percentage of health can be set to a specific value, and the health status bar can be drawn on a canvas context.
 * 
 * @extends DrawableObject
 */
class StatusBarHealth extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];


    percentage = 100;


    /**
     * Creates a new health status bar.
     * 
     * The health status bar loads its images and sets its initial position, size, and percentage of health.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
    * Sets the percentage of health of the end boss.
    * The percentage of health is set to a specific value, and the image of the health status bar is updated accordingly.
    * 
    * @param {number} percentage - The new percentage of health.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Resolves the index of the image to display based on the percentage of health.
     * The index of the image is determined by the percentage of health.
     * 
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 79) {
            return 4;
        } else if (this.percentage > 59) {
            return 3;
        } else if (this.percentage > 39) {
            return 2;
        } else if (this.percentage > 19) {
            return 1;
        } else {
            return 0;
        }
    }
} 