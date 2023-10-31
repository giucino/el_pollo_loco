class Bottle extends DrawableObject {
    x = 50;
    y = 60;
    height = 80;
    width = 60;

    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 300 + Math.random() * 4000;
        this.y = 335;
    }
}