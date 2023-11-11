class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = level1;
    character = new Character();
    endboss = new Endboss();
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarHealthEndboss = new StatusBarHealthEndboss();
    throwableObjects = [];
    coinSounds;
    bottleSounds;
    collectedCoins;
    collectedBottles;
    firstContactMade;


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
        this.statusBarHealthEndboss.visible = false;
        this.firstContactMade = false; 
    }


    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }


    run() {
        setInterval(() => {
            this.draw();
            this.checkThrowableObjects();
            this.checkCollisionEnemy();
            this.bottleIsHurtingEnemy();
            this.checkCollisionEndboss();
            this.bottleIsHurtingEndboss();
            this.collectCoins();
            this.collectBottles();
            // this.reachedEndboss();
        }, 200);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Bilder nach Bewegung löschen

        if (this.character.otherDirection) {
            this.camera_x = -this.character.x + this.canvas.width - 450;
        } else {
            this.camera_x = -this.character.x + 200;
        }



        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addMovableObjectsToMap(this.character);
        this.addMovableObjectsToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ------
        this.addMovableObjectsToMap(this.statusBarHealth);
        this.addMovableObjectsToMap(this.statusBarBottles);
        this.addMovableObjectsToMap(this.statusBarCoins);
        this.addMovableObjectsToMap(this.statusBarHealthEndboss);
        // if (this.statusBarHealthEndboss.visible) {
        //     this.addMovableObjectsToMap(this.statusBarHealthEndboss);
        // }
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);


        requestAnimationFrame(() => {
            this.draw(); //Dieses "this" bezieht sich direkt auf das "this" im äußeren Kontext der Methode.
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addMovableObjectsToMap(o);
        });
    }


    addMovableObjectsToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

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


    checkThrowableObjects() {
        if (this.keyboard.KEY_D && this.collectedBottles.length > 0) {
            this.statusBarBottles.decreaseCountByOne();

            let bottleX = this.character.x + (this.character.otherDirection ? -10 : 50);
            let bottleY = this.character.y + 100;
            let bottleDirection = this.character.otherDirection;

            let bottle = new ThrowableObject(bottleX, bottleY, bottleDirection);
            this.throwableObjects.push(bottle);
            throwBottleAudio.play();
            this.collectedBottles.pop();
        }
    }


    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterJumpAttack(enemy)) {
                this.eliminateEnemy(enemy);
                this.character.jump();
            }
            if (this.enemyCanDamageCharacter(enemy)) {
                this.handleCharacterHealth();
            }
        });
    }


    characterJumpAttack(enemy) {
        return !this.character.isHurt() && this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0;
    }



    eliminateEnemy(enemy) {
        const indexEnemy = this.level.enemies.findIndex(e => e === enemy);
        if (indexEnemy !== -1) {
            this.level.enemies[indexEnemy].energy = 0;
            this.delayedRemoveEnemy(indexEnemy);
        }
    }


    // eliminateEnemy(enemy) {
    //     let indexEnemy = -1;
    //     for (let i = 0; i < this.level.enemies.length; i++) {
    //         if (this.level.enemies[i] === enemy) {
    //             indexEnemy = i;
    //         }
    //     }
    //     if (indexEnemy !== -1) {
    //         this.level.enemies[indexEnemy].energy = 0;
    //         this.delayedRemoveEnemy(indexEnemy);
    //     }
    // }


    delayedRemoveEnemy(enemy) {
        setTimeout(() => {
            this.level.enemies.splice(enemy, 1);
        }, 500);
    }



    enemyCanDamageCharacter(enemy) {
        return this.character.isColliding(enemy) && !this.character.isHurt() && !this.character.isAboveGround();
    }



    handleCharacterHealth() {
        if (this.characterCanBeHurt()) {
            this.character.reduceEnergy();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }


    characterCanBeHurt() {
        return !this.character.isHurt() && !this.character.isGameOver();
    }


    bottleIsHurtingEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (!bottle.isBursted && bottle.isColliding(enemy) && !enemy.isGameOver()) {
                    this.eliminateEnemy(enemy);
                    bottle.isBursted = true;
                }
            });
        });
    }


    checkCollisionEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.reduceEnergy();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }


    bottleIsHurtingEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (!bottle.isBursted && this.isBottleHittingEndboss(bottle)) {
                this.handleEndbossHealth();
                bottle.isBursted = true;
            }
        });
    }


    isBottleHittingEndboss(bottle) {
        return this.endboss.isColliding(bottle) && !this.endboss.isHurt();
    }


    handleEndbossHealth() {
        // this.endboss.isAlarmed = false;
        this.endboss.reduceEnergyEndboss();
        this.statusBarHealthEndboss.setPercentage(this.endboss.energyEndboss);
        console.log(this.endboss.energyEndboss);
        // playAudio("chickenHit");
    }


    reachedEndboss() {
        if (this.isCharacterNearEndboss()) {
            console.log('Character is near endboss');

            this.statusBarHealthEndboss.visible = true;
            this.firstContactMade = true;
        }
    }


    // reachedEndboss() {
    //     console.log('reachedEndboss called');
    //     console.log('isCharacterNearEndboss:', this.isCharacterNearEndboss());
    //     if (this.isCharacterNearEndboss()) {
    //         console.log('Character is near endboss');
    //         this.statusBarHealthEndboss.visible = true;
    //         this.firstContactMade = true;
    //     }
    // }


    // isCharacterNearEndboss() {
    //     return !this.firstContactMade && Math.abs(this.character.x - this.endboss.x) <= 800;
    // }


    // triggerEndbossEncounter() { 
    //     this.statusBarHealthEndboss.visible = true;
    //     this.firstContactMade = true;
    // }




    // /**
    //  * Activates the endboss and plays audio if conditions are met.
    //  */
    // activatingEndboss() {
    //     this.statusBarHealthEndboss.toggleVisibility(true);
    //     // this.endboss.isAlarmed = true;

    //     if (!this.endboss.energy == 0) {
    //         if (!this.character.isGameOver()) {
    //             // endbossAudio.play();
    //             // playAudio("endboss");
    //             // pauseAudio("backgroundSound");
    //         }
    //     }
    // }




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


    collectCoins() {
        this.collectItems(
            this.level.coins,
            this.coinSounds,
            this.statusBarCoins,
            (coin) => this.characterCanCollectItem(coin),
            'audio/coin.mp3'
        );
    }


    collectBottles() {
        this.collectItems(
            this.level.bottles,
            this.bottleSounds,
            this.statusBarBottles,
            (bottle) => this.characterCanCollectItem(bottle),
            'audio/collect_bottle.mp3'
        );
    }


    playItemSound(item, itemSounds, itemSoundFile) {
        if (!itemSounds.has(item)) {
            const sound = new Audio(itemSoundFile);
            itemSounds.set(item, sound);
        }
        const sound = itemSounds.get(item);
        sound.play();
    }


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