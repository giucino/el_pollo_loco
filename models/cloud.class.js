class Cloud extends MovableObject {
    static count = 0;
    y = 20;
    width = 500;
    height = 250;

    
    constructor(x) {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.setYPosition();
        Cloud.count++;
        this.start();
    }


    setYPosition() {
        if (Cloud.count % 2 === 1) {
            this.y = 40;
        }
    }


    start() {
        this.moveCloudLeft();
    }


    pause() {
        clearInterval(this.movingIntervalId);
    }


    moveCloudLeft() {
        this.movingIntervalId = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}