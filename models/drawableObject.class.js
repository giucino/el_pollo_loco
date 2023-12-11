/**
 * Represents a drawable object in the game.
 * 
 * A drawable object is an object that can be drawn on the screen. It has a specific width, height, and image.
 * 
 * @extends MovableObject
 */
class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * Loads a single image for the drawable object.
     * 
     * @param {string} path - The path of the image.
     */
    loadImage(path) {
        this.img = new Image();  // this.img = document.getElementById('image');  <img id="image" src="";
        this.img.src = path;
    }


    /**
     * Draws the drawable object on a canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Draws a frame around the drawable object on a canvas context.
     * 
     * The frame is only drawn if the drawable object is an instance of Character, Chicken, Chick, Endboss, or ThrowableObject.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * Loads multiple images for the drawable object.
     * The images are stored in an image cache, which is a dictionary where the keys are the image paths and the values are the image objects.
     * 
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}