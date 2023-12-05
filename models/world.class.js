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


    // clearAllIntervals() {
    //     for (let i = 1; i < 999999; i++) window.clearInterval(i);
    // }


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


    resetGame() {
        // this.clearAllIntervals();
        this.camera_x = 0;
        this.level = level1;
        this.character = new Character();
        this.endboss = new Endboss();
        this.chick = new Chick();
        this.statusBarHealth = new StatusBarHealth();
        this.statusBarBottles = new StatusBarBottles();
        this.statusBarCoins = new StatusBarCoins();
        this.statusBarHealthEndboss = new StatusBarHealthEndboss();
        this.throwableObjects = [];
        this.coinSounds = new Map();
        this.bottleSounds = new Map();
        this.collectedCoins = [];
        this.collectedBottles = [];
        this.statusBarHealthEndboss.visible = false;
        this.firstContactMade = false;
        this.setWorld();
        this.start();
        this.pause();
    }


    /* Draw -------------- */

    draw() {
        this.clearCanvas();
        this.setCameraPosition();
        this.translateCamera();

        this.drawBackgroundObjects();
        this.drawMovingObjects();
        this.resetCamera();

        this.drawFixedObjects();
        this.translateCamera();
        this.resetCamera();

        this.requestNextFrame();
    }


    translateCamera() {
        this.ctx.translate(this.camera_x, 0);
    }


    resetCamera() {
        this.ctx.translate(-this.camera_x, 0);
    }


    requestNextFrame() {
        this.animationFrameId = requestAnimationFrame(() => {
            this.draw(); //Dieses "this" bezieht sich direkt auf das "this" im äußeren Kontext der Methode.
        });
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    setCameraPosition() {
        if (this.character.otherDirection) {
            this.camera_x = -this.character.x + this.canvas.width - 450;
        } else {
            this.camera_x = -this.character.x + 200;
        }
    }


    drawBackgroundObjects() {
        if (this.character.isMoving) {
            this.level.backgroundObjects.forEach(bgObject => {
                bgObject.start(this.character.otherDirection);
                this.addMovableObjectsToMap(bgObject);
            });
        } else {
            this.addObjectsToMap(this.level.backgroundObjects);
        }
    }


    drawMovingObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addMovableObjectsToMap(this.character);
        this.addMovableObjectsToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }


    drawFixedObjects() {
        this.addMovableObjectsToMap(this.statusBarHealth);
        this.addMovableObjectsToMap(this.statusBarBottles);
        this.addMovableObjectsToMap(this.statusBarCoins);
        if (this.statusBarHealthEndboss.visible) {
            this.addMovableObjectsToMap(this.statusBarHealthEndboss);
        }
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


/* Throwable Objects -------------- */

    checkThrowableObjects() {
        if (this.keyboard.KEY_D && this.collectedBottles.length > 0) {
            let bottle = this.createBottle();
            this.statusBarBottles.decreaseCountByOne();
            this.throwableObjects.push(bottle);
            this.collectedBottles.pop();
            playAudio('throwBottleAudio');
        }
    }


    createBottle() {
        let bottleX = this.character.x + (this.character.otherDirection ? -10 : 50);
        let bottleY = this.character.y + 100;
        let bottleDirection = this.character.otherDirection;

        return new ThrowableObject(bottleX, bottleY, bottleDirection);
    }


/* Chicken -------------- */

    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterJumpAttack(enemy)) {
                this.eliminateEnemy(enemy);
                this.character.jump();
                playAudio("jumpingAudio");
                playAudio("hitEnemyAudio");
            }
            if (this.enemyCanDamageCharacter(enemy)) {
                this.handleCharacterHealth();
            }
        });
    }


    characterJumpAttack(enemy) {
        return !this.character.isHurt() && this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0;
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


    eliminateEnemy(enemy) {
        let indexEnemy = this.level.enemies.findIndex(e => e === enemy);
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
        return this.character.isColliding(enemy) && !this.character.isHurt() && !this.character.isAboveGround() && !this.character.isIdle();
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


/* Endboss -------------- */

    checkCollisionEndboss() {
        if (this.endbossCanDamageCharacter(this.endboss)) {
            this.handleCharacterHealth();
        }
    }


    endbossCanDamageCharacter(endboss) {
        return this.character.isColliding(endboss) && !this.character.isHurt() && !this.character.isAboveGround() && !this.character.isIdle();
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
        playAudio("endbossAudio");
        pauseAudio("backgroundMusic");
    }


/* Collect Items -------------- */

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


    playItemSound(item, itemSounds, soundName) {
        this.findAndSetSound(item, itemSounds, soundName);
        this.createAndPlaySound(item, itemSounds);
    }


    findAndSetSound(item, itemSounds, soundName) {
        if (!itemSounds.has(item)) {
            let soundFile = findAudioByName(soundName);
            if (!soundFile) {
                console.error('Sound not found:', soundName);
                return;
            }
            itemSounds.set(item, soundFile);
        }
    }


    createAndPlaySound(item, itemSounds) {
        let sound = new Audio(itemSounds.get(item).src);
        sound.muted = isSoundMuted;
        sound.play();
    }
}