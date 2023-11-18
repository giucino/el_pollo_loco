class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    speed; 

    constructor(imagePath, x, speed) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
        this.speed = speed;
        this.moveBackground();
    }


    moveBackground(otherDirection) {
        if (otherDirection) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
    }
}