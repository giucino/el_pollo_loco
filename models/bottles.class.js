class BottleTilted extends DrawableObject {
    height = 70;
    width = 70;

    constructor(useRightTilted = false) {
        super().loadImage(useRightTilted ? 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png' : 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = -700 + Math.random() * 6500;
        this.y = 350;
    }
}


class BottleStraight extends DrawableObject {
    height = 70;
    width = 70;

    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = -400 + Math.random() * 6500;
        this.y = 50 + Math.random() * 250;
    }
}