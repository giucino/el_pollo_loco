class StatusBarCoins extends DrawableObject {
    IMAGE_COIN = [
        'img/7_statusbars/3_icons/icon_coin.png'
    ];


    count = 0;

    
    constructor() {
        super();
        this.loadImage(this.IMAGE_COIN);
        this.x = 350;
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
        ctx.fillText(this.count, this.x + this.width - 5, this.y + 43);
    }
}