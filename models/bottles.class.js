/**
 * Represents a tilted bottle in the game.
 * 
 * A tilted bottle is a type of drawable object that has a specific width, height, and offset.
 * It can be positioned randomly on the screen.
 * 
 * @extends DrawableObject
 */
class BottleTilted extends DrawableObject {
    offset = {
        top: 20,
        bottom: 30,
        left: 40,
        right: 40
    };

    height = 70;
    width = 70;
    static IMAGES = {
        RIGHT_TILTED: 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        LEFT_TILTED: 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    };


    /**
     * Creates a new tilted bottle.
     * 
     * @param {boolean} [useRightTilted=false] - Whether to use the right-tilted image for the bottle.
     */
    constructor(useRightTilted = false) {
        super();
        this.loadImage(useRightTilted ? BottleTilted.IMAGES.RIGHT_TILTED : BottleTilted.IMAGES.LEFT_TILTED);
        this.x = -400 + Math.random() * 6500;
        this.y = 350;
    }
}


/**
 * Represents a straight bottle in the game.
 * 
 * A straight bottle is a type of drawable object that has a specific width, height, and offset.
 * It can be positioned randomly on the screen.
 * 
 * @extends DrawableObject
 */
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
     * Creates a new straight bottle.
     */
    constructor() {
        super();
        this.loadImage(BottleStraight.IMAGE);
        this.x = -400 + Math.random() * 6500;
        this.y = 50 + Math.random() * 250;
    }
}