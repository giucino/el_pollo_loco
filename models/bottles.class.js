class BottleTilted extends DrawableObject {
    offset = {
        top: 20,
        bottom: 30,
        left: 40,
        right: 40,
    };


    height = 70;
    width = 70;
    static IMAGES = {
        RIGHT_TILTED: 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        LEFT_TILTED: 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    };

    /**
     * position the bottle randomly on the screen
     * @param {*} useRightTilted 
     */
    constructor(useRightTilted = false) {
        super();
        this.loadImage(useRightTilted ? BottleTilted.IMAGES.RIGHT_TILTED : BottleTilted.IMAGES.LEFT_TILTED);
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
    static IMAGE = 'img/6_salsa_bottle/salsa_bottle.png';


    /**
     * position the bottle randomly on the screen
     */
    constructor() {
        super();
        this.loadImage(BottleStraight.IMAGE);
        this.x = -400 + Math.random() * 6500;
        this.y = 50 + Math.random() * 250;
    }
}