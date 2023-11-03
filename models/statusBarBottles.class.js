class StatusBarBottles extends DrawableObject {
    IMAGE_BOTTLE = [
        'img/7_statusbars/3_icons/icon_salsa_bottle.png'
    ];

    count = 0;

    constructor() {
        super();
        this.loadImage(this.IMAGE_BOTTLE);
        this.x = 280;
        this.y = 10;
        this.width = 60;
        this.height = 60;
    }


    increaseCountByOne() {
        this.count++;
    }


    draw(ctx) {
        super.draw(ctx);
        ctx.font = '30px Trochut';
        ctx.fillStyle = 'black';
        ctx.fillText(this.count, this.x + this.width - 15, this.y + 43);
    }


    decreaseCountByOne() {
        this.count--;
    }    
}