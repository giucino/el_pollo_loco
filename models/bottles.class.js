class BottleTilted extends DrawableObject {
    offset = {
        top: 20,
        bottom: 30,
        left: 40,
        right: 40,
    };

    height = 70;
    width = 70;

    constructor(useRightTilted = false) {
        super();
        this.loadImage(useRightTilted ? 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png' : 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = -400 + Math.random() * 6500;
        this.y = 350;
    }
}


class BottleStraight extends DrawableObject {
    offset = {
        top: 20,
        bottom: 30,
        left: 40,
        right: 0,
    };

    height = 70;
    width = 70;

    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = -400 + Math.random() * 6500;
        this.y = 50 + Math.random() * 250;
    }
}