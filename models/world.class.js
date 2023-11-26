class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = level1;
    character = new Character();
    endboss = new Endboss();
    chick = new Chick();
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
    gameIntervalId;
    animationFrameId;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.start();
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


    start() {
        this.run();
        this.draw();
    }


    pause() {
        clearInterval(this.gameIntervalId);
        cancelAnimationFrame(this.animationFrameId);
    }


    run() {
        this.gameIntervalId = setInterval(() => {
            this.checkThrowableObjects();
            this.checkCollisionEnemy();
            this.bottleIsHurtingEnemy();
            this.checkCollisionEndboss();
            this.bottleIsHurtingEndboss();
            this.collectCoins();
            this.collectBottles();
            this.reachedEndboss();
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


        // ------ Space for moving objects ------
        if (this.character.isMoving) {
            this.level.backgroundObjects.forEach(bgObject => {
                bgObject.start(this.character.otherDirection);
                this.addMovableObjectsToMap(bgObject);
            });
        } else {
            this.addObjectsToMap(this.level.backgroundObjects);
        }
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
        if (this.statusBarHealthEndboss.visible) {
            this.addMovableObjectsToMap(this.statusBarHealthEndboss);
        }
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);


        this.animationFrameId = requestAnimationFrame(() => {
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
        // mo.drawInnerFrame(this.ctx);

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
            // throwBottleAudio.play();
            playAudio('throwBottleAudio');
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


    // checkCollisionEndboss() {
    //     this.level.endboss.forEach((endboss) => {
    //         if (this.character.isColliding(endboss)) {
    //             this.character.reduceEnergy();
    //             this.statusBarHealth.setPercentage(this.character.energy);
    //         }
    //     });
    // }


    // checkCollisionEndboss() {
    //     this.level.endboss.forEach((endboss) => {
    //         if (this.character.isColliding(endboss)) {
    //             console.log('Collision detected');
    //             this.character.reduceEnergy();
    //             this.statusBarHealth.setPercentage(this.character.energy);
    //         } 
    //     });
    // }


    checkCollisionEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.endbossCanDamageCharacter(endboss)) {
                this.handleCharacterHealth();
                console.log('Collision detected');
            }
        });
    }


    endbossCanDamageCharacter(endboss) {
        return this.character.isColliding(endboss) && !this.character.isHurt() && !this.character.isAboveGround();
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
        this.endboss.reduceEnergyEndboss();
        this.statusBarHealthEndboss.setPercentage(this.endboss.energyEndboss);
        // playAudio("chickenHit");
    }


    reachedEndboss() {
        if (this.firstContactMade) {
            return;
        }
        if (!this.firstContactMade && this.isCharacterNearEndboss()) {
            this.triggerEndbossEncounter();
        }
    }


    isCharacterNearEndboss() {
        return Math.abs(this.character.x - this.endboss.x) <= 800;
    }


    triggerEndbossEncounter() {
        this.firstContactMade = true;
        this.statusBarHealthEndboss.visible = true;
    }


    collectItems(items, itemSounds, statusBar, canCollectItem, soundName) {
        items.forEach((item, index) => {
            if (this.characterCanCollectItem(item, canCollectItem)) {
                this.collectItem(item);
                this.playItemSound(item, itemSounds, soundName);
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
            'coinAudio'
        );
    }
    
    
    collectBottles() {
        this.collectItems(
            this.level.bottles,
            this.bottleSounds,
            this.statusBarBottles,
            (bottle) => this.characterCanCollectItem(bottle),
            'collectBottleAudio' 
        );
    }
    

    // playItemSound(item, itemSounds, itemSoundFile) {
    //     if (!itemSounds.has(item)) {
    //         itemSounds.set(item, itemSoundFile);
    //     }
    //     const sound = new Audio(itemSoundFile.src);   
    //     sound.muted = isSoundMuted;     
    //     sound.play();
    // }
    playItemSound(item, itemSounds, soundName) {
        if (!itemSounds.has(item)) {
            const soundFile = findAudioByName(soundName);
            if (!soundFile) {
                console.error('Sound not found:', soundName);
                return;
            }
            itemSounds.set(item, soundFile);
        }
        
        const sound = new Audio(itemSounds.get(item).src);
        sound.muted = isSoundMuted;     
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