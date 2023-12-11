/**
 * Represents the health status bar of the end boss in the game.
 * 
 * The health status bar of the end boss is a type of drawable object that displays the health of the end boss.
 * It has a specific image, width, height, and percentage of health.
 * The percentage of health can be set to a specific value, and the health status bar can be drawn on a canvas context.
 * 
 * @extends DrawableObject
 */
class StatusBarHealthEndboss extends DrawableObject {
    IMAGES_HEALTH_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/blue/0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/100.png',
    ];

    percentage = 100;
    visible = false;


    /**
     * Creates a new health status bar for the end boss.
     * 
     * The health status bar loads its images and sets its initial position, size, and percentage of health.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png');
        this.loadImages(this.IMAGES_HEALTH_ENDBOSS);
        this.x = 500;
        this.y = 0;
        this.height = 60;
        this.width = 200;
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
        let path = this.IMAGES_HEALTH_ENDBOSS[this.resolveImageIndex()];
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