class MovableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};


    loadImage(path) {
        this.img = new Image();  // this.img = document.getElementById('image');  <img id="image" src="";
        this.img.src = path;
    }


    /**
     * 
     * @param {*} arr ['img/image1.png', 'img/image2.png', 'img/image2.png', ... ]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }


    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');

    }
}