class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    // speedX = 0;
    // speedY = 0;
    // animationInterval;
    // otherDirection = false;
    lastActivityTime = new Date().getTime();
    // offset = {
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     bottom: 0
    // };
    
    
    loadImage(path) {
        this.img = new Image();  // this.img = document.getElementById('image');  <img id="image" src="";
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    drawInnerFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof ThrowableObject){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.offset.left + this.width,
                this.offset.bottom  + this.height,
                this.offset.right,
                this.offset.top);
            ctx.stroke();
        }
    }


    /**
    * 
    * @param {*} arr ['img/image1.png', 'img/image2.png', 'img/image2.png', ... ]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}