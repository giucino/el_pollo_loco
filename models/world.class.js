class World {
    character = new Character();
    // chicken = new Chicken();
    // chick = new Chick();
    // bottle = new ThrowableObject();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusbarHealthEndboss = new StatusbarHealthEndboss();
    statusbarHealthEndbossLogo = new StatusbarHealthEndbossLogo();
    throwableObjects = [];
    throw_bottle = new Audio('audio/throw_bottle.flac');
    // coin = new Coin();
    // bottle = new BottleStraight();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.coinSounds = new Map();
        this.bottleSounds = new Map();
        this.collectedCoins = [];
        this.collectedBottles = [];
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.collectCoins();
            this.collectBottles();
        }, 200);
    }


    checkThrowObjects() {
        if (this.keyboard.KEY_D && this.collectedBottles.length > 0) {
            this.statusBarBottles.decreaseCountByOne();
            let bottle = new ThrowableObject(
                this.character.x + 60,
                this.character.y + 100
            );
            this.throwableObjects.push(bottle);
            this.throw_bottle.play();
            this.collectedBottles.pop();
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.reduceEnergy();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }


    // checkBottleCollisions() {
    //     this.level.enemies.forEach((enemy) => {
    //         if (this.bottle.isColliding(enemy)) {
    //             this.chicken.playCollisionAnimation(enemy);
    //         }
    //     });
    // }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Bilder nach Bewegung löschen


        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusbarHealthEndboss);
        this.addToMap(this.statusbarHealthEndbossLogo);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);


        requestAnimationFrame(() => {
            this.draw(); //Dieses "this" bezieht sich direkt auf das "this" im äußeren Kontext der Methode.
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    // Gemeinsame Funktion zum Sammeln von Münzen und Flaschen
    collectItems(items, itemSounds, statusBar, canCollectItem, itemSoundFile) {
        items.forEach((item, index) => {
            if (this.characterCanCollectItem(item, canCollectItem)) {
                this.collectItem(item);
                this.playItemSound(item, itemSounds, itemSoundFile);
                statusBar.increaseCountByOne();
                items.splice(index, 1);
            }
        });
    }


    // Sammeln von Münzen
    collectCoins() {
        this.collectItems(
            this.level.coins,
            this.coinSounds,
            this.statusBarCoins,
            (coin) => this.characterCanCollectItem(coin),
            'audio/coin.mp3'
        );
    }


    // Sammeln von Flaschen
    collectBottles() {
        this.collectItems(
            this.level.bottles,
            this.bottleSounds,
            this.statusBarBottles,
            (bottle) => this.characterCanCollectItem(bottle),
            'audio/collect_bottle2.mp3'  
        );
    }


    // Gemeinsame Funktion zum Abspielen von Item-Sound
    playItemSound(item, itemSounds, itemSoundFile) {
        if (!itemSounds.has(item)) {
            const sound = new Audio(itemSoundFile);
            itemSounds.set(item, sound);
        }
        const sound = itemSounds.get(item);
        sound.play();
    }


    // Gemeinsame Funktion zur Überprüfung, ob der Charakter ein Item sammeln kann
    characterCanCollectItem(item) {
        return this.character.isColliding(item) && !this.character.isHurt();
    }


    collectItem(item) {
        if (item instanceof BottleTilted || item instanceof BottleStraight) {
            this.collectedBottles.push(item);
        } else if (item instanceof Coin) {
            this.collectedCoins.push(item);
        }
    }



    // collectCoins() {
    //     this.level.coins.forEach((coin, index) => {
    //         if (this.characterCanCollectCoin(coin)) {
    //             this.playCoinSound(coin); 
    //             this.statusBarCoins.increaseCountByOne();
    //             this.level.coins.splice(index, 1);
    //         }
    //     });
    // }


    // playCoinSound(coin) {
    //     if (!this.coinSounds.has(coin)) {
    //         const coinSound = new Audio('audio/coin.mp3');
    //         this.coinSounds.set(coin, coinSound);
    //     }
    //     const coinSound = this.coinSounds.get(coin);
    //     coinSound.play();
    // }


    // /**
    //   * Checks if the character should collect a coin.
    //   * @param {DrawableObject} coin - The coin to check collision with.
    //   * @returns {boolean} - True if the character should collect the coin; otherwise, false.
    //   */
    // characterCanCollectCoin(coin) {
    //     return this.character.isColliding(coin) && !this.character.isHurt();
    // }


    // collectBottles() {
    //     this.level.bottles.forEach((bottle, index) => {
    //         if (this.characterCanCollectBottle(bottle)) {
    //             this.playBottleSound(bottle); 
    //             this.statusBarBottles.increaseCountByOne();
    //             this.level.bottles.splice(index, 1);
    //         }
    //     });
    // }


    // playBottleSound(bottle) {
    //     if (!this.bottleSounds.has(bottle)) {
    //         const bottleSound = new Audio('audio/coin.mp3');
    //         this.bottleSounds.set(bottle, bottleSound);
    //     }
    //     const bottleSound = this.bottleSounds.get(bottle);
    //     bottleSound.play();
    // }


    // characterCanCollectBottle(bottle) {
    //     return this.character.isColliding(bottle) && !this.character.isHurt();
    // }
}