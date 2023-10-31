class StatusBarCoin extends DrawableObject {
    IMAGE_COIN = [
        'img/7_statusbars/3_icons/icon_coin.png'
    ];

    id;
    count = 0;

    constructor(id) {
        super();
        this.loadImage(this.IMAGE_COIN);
        this.x = 350;
        this.y = 10;
        this.width = 60;
        this.height = 60;
        this.id = id;
    }


    incrementCount() {
        this.count++;
    }


    draw(ctx) {
        super.draw(ctx);
        ctx.font = '30px Trochut';
        ctx.fillStyle = 'black';
        ctx.fillText(this.count, this.x + this.width - 5, this.y + 43);
    }
}