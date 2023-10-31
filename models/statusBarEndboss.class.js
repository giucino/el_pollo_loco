class StatusbarHealthEndboss extends DrawableObject {
    IMAGES_HEALTH_ENDBOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    percentage = 100;

    
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png');
        this.loadImages(this.IMAGES_HEALTH_ENDBOSS);
        this.x = 500;
        this.y = 0;
        this.height = 60;
        this.width = 200;
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}


class StatusbarHealthEndbossLogo extends DrawableObject {
    IMAGE_ENDBOSS = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        this.loadImages(this.IMAGE_ENDBOSS);
        this.x = 488;
        this.y = 8;
        this.height = 60;
        this.width = 60;
    }
}