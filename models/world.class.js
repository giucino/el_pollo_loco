/**
 * A world is a collection of objects that are drawn on a canvas.
 * It is responsible for drawing all objects and for handling the game logic.
 * The world is also responsible for the camera movement.
 * A world has a level, a character, an endboss, a chick, a status bar for the health of the character,
 */
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
    intervals = [];
    timeouts = [];


    /**
     * Constructor for the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
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


    /**
     * Sets the world property of the character and endboss to this world.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }


    /**
     * Starts the game by running the game logic and drawing the game.
     */
    start() {
        this.run();
        this.draw();
    }


    /**
     * Pauses the game by clearing the game interval and animation frame.
     */
    pause() {
        clearInterval(this.gameIntervalId);
        cancelAnimationFrame(this.animationFrameId);
    }


    /**
     * Clears all intervals and timeouts stored in the intervals and timeouts arrays.
     */
    clearAllIntervalsAndTimeouts() {
        for (let i = 0; i < this.intervals.length; i++) {
            clearInterval(this.intervals[i]);
        }
        for (let i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
        this.intervals = [];
        this.timeouts = [];
    }


    /**
     * Runs the game logic at a rate of 5 times per second.
     */
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


    /**
     * Resets the game to its initial state.
     */
    resetGame() {
        this.clearAllIntervalsAndTimeouts();
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
        // this.coinSounds = new Map();
        // this.bottleSounds = new Map();
        // this.collectedCoins = [];
        // this.collectedBottles = [];
        this.statusBarHealthEndboss.visible = false;
        this.firstContactMade = false;
        this.setWorld();
        this.start();
        // this.pause();
    }


    /* Draw -------------- */

    /**
     * Draws the game by clearing the canvas, translating the camera, drawing the objects, and requesting the next frame.
     */
    draw() {
        this.clearCanvas();
        this.translateCamera();

        this.drawBackgroundObjects();
        this.drawMovingObjects();
        this.resetCamera();

        this.drawFixedObjects();
        this.translateCamera();
        this.resetCamera();

        this.requestNextFrame();
    }


    /**
     * Translates the camera based on the camera_x property.
     */
    translateCamera() {
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * Resets the camera translation.
     */
    resetCamera() {
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Requests the next animation frame and calls the draw method.
     */
    requestNextFrame() {
        this.animationFrameId = requestAnimationFrame(() => {
            this.draw(); //Dieses "this" bezieht sich direkt auf das "this" im äußeren Kontext der Methode.
        });
    }


    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * Draws the background objects.
     */
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


    /**
     * Draws the moving objects.
     */
    drawMovingObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addMovableObjectsToMap(this.character);
        this.addMovableObjectsToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * Draws the fixed objects.
     */
    drawFixedObjects() {
        this.addMovableObjectsToMap(this.statusBarHealth);
        this.addMovableObjectsToMap(this.statusBarBottles);
        this.addMovableObjectsToMap(this.statusBarCoins);
        if (this.statusBarHealthEndboss.visible) {
            this.addMovableObjectsToMap(this.statusBarHealthEndboss);
        }
    }


    /**
     * Adds an array of objects to the map.
     * @param {Array} objects - The objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addMovableObjectsToMap(o);
        });
    }


    /**
     * Adds a movable object to the map.
     * @param {MovableObject} mo - The movable object to add to the map.
     */
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


    /**
     * Flips an image horizontally.
     * @param {MovableObject} mo - The movable object whose image to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Flips an image back to its original orientation.
     * @param {MovableObject} mo - The movable object whose image to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /* Throwable Objects -------------- */

    /**
     * Checks if the character is throwing a bottle.
     * If so, a new bottle is created and added to the throwableObjects array.
     */
    checkThrowableObjects() {
        if (this.keyboard.KEY_D && this.collectedBottles.length > 0) {
            let bottle = this.createBottle();
            this.statusBarBottles.decreaseCountByOne();
            this.throwableObjects.push(bottle);
            this.collectedBottles.pop();
            playAudio('throwBottleAudio');
        }
    }


    /**
     * Creates a new ThrowableObject (bottle) at a position relative to the character,
     * with the direction based on the character's direction.
     * @returns {ThrowableObject} The new ThrowableObject.
     */
    createBottle() {
        let bottleX = this.character.x + (this.character.otherDirection ? -10 : 50);
        let bottleY = this.character.y + 100;
        let bottleDirection = this.character.otherDirection;

        return new ThrowableObject(bottleX, bottleY, bottleDirection);
    }


    /* Chicken -------------- */

    /**
     * Checks if the character is colliding with the chicken.
     */
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


    /**
     * Checks if the character can attack an enemy by jumping on them.
     * @param {Enemy} enemy - The enemy to check.
     * @returns {boolean} True if the character is not hurt, is colliding with the enemy, is above the ground, and is moving upwards, false otherwise.
     */
    characterJumpAttack(enemy) {
        return !this.character.isHurt() && this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0;
    }


    /**
     * Checks if a thrown bottle is hurting an enemy. If so, eliminates the enemy and bursts the bottle.
     */
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


    /**
     * Eliminates an enemy by setting their energy to 0 and removing them from the enemies array after a delay.
     * @param {Enemy} enemy - The enemy to eliminate.
     */
    eliminateEnemy(enemy) {
        let indexEnemy = this.level.enemies.findIndex(e => e === enemy);
        if (indexEnemy !== -1) {
            this.level.enemies[indexEnemy].energy = 0;
            this.delayedRemoveEnemy(indexEnemy);
        }
    }


    /**
     * Removes an enemy from the enemies array after a delay.
     * @param {number} enemy - The index of the enemy to remove.
     */
    delayedRemoveEnemy(enemy) {
        setTimeout(() => {
            this.level.enemies.splice(enemy, 1);
        }, 500);
    }


    /**
     * Checks if an enemy can damage the character.
     * @param {Enemy} enemy - The enemy to check.
     * @returns {boolean} True if the character is colliding with the enemy, is not hurt, is not above the ground, and is not idle, false otherwise.
     */
    enemyCanDamageCharacter(enemy) {
        return this.character.isColliding(enemy) && !this.character.isHurt() && !this.character.isAboveGround() && !this.character.isIdle();
    }


    /**
     * Handles the character's health. If the character can be hurt, reduces the character's energy and updates the health status bar.
     */
    handleCharacterHealth() {
        if (this.characterCanBeHurt()) {
            this.character.reduceEnergy();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }


    /**
     * Checks if the character can be hurt.
     * @returns {boolean} True if the character is not hurt and the game is not over, false otherwise.
     */
    characterCanBeHurt() {
        return !this.character.isHurt() && !this.character.isGameOver();
    }


    /* Endboss -------------- */

    /**
     * Checks if the endboss can damage the character. If so, handles the character's health.
     */
    checkCollisionEndboss() {
        if (this.endbossCanDamageCharacter(this.endboss)) {
            this.handleCharacterHealth();
            // this.resetCharacterPosition();
        }
    }


    /**
     * Resets the character's position by moving it 200 units to the left.
     */
    resetCharacterPosition() {
        this.character.x = this.character.x - 200;
    }


    /**
     * Checks if the endboss can damage the character.
     * @param {Endboss} endboss - The endboss to check.
     * @returns {boolean} True if the character is colliding with the endboss, is not hurt, is not above the ground, and is not idle, false otherwise.
     */
    endbossCanDamageCharacter(endboss) {
        return this.character.isColliding(endboss) && !this.character.isHurt() && !this.character.isAboveGround() && !this.character.isIdle();
    }


    /**
     * Checks if a thrown bottle is hurting the endboss. If so, handles the endboss's health and bursts the bottle.
     */
    bottleIsHurtingEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (!bottle.isBursted && this.isBottleHittingEndboss(bottle)) {
                this.handleEndbossHealth();
                bottle.isBursted = true;
            }
        });
    }


    /**
     * Checks if a bottle is hitting the endboss.
     * @param {Bottle} bottle - The bottle to check.
     * @returns {boolean} True if the endboss is colliding with the bottle and is not hurt, false otherwise.
     */
    isBottleHittingEndboss(bottle) {
        return this.endboss.isColliding(bottle) && !this.endboss.isHurt();
    }


    /**
     * Handles the endboss's health by reducing its energy and updating the health status bar.
     */
    handleEndbossHealth() {
        this.endboss.reduceEnergyEndboss();
        this.statusBarHealthEndboss.setPercentage(this.endboss.energyEndboss);
    }


    /**
     * Checks if the character has reached the endboss. If so, triggers the endboss encounter.
     */
    reachedEndboss() {
        if (this.firstContactMade) {
            return;
        }
        if (!this.firstContactMade && this.isCharacterNearEndboss()) {
            this.triggerEndbossEncounter();
        }
    }


    /**
     * Checks if the character is near the endboss.
     * @returns {boolean} True if the absolute difference between the character's and the endboss's x positions is less than or equal to 1200, false otherwise.
     */
    isCharacterNearEndboss() {
        return Math.abs(this.character.x - this.endboss.x) <= 1200;
    }


    /**
     * Triggers the endboss encounter by setting firstContactMade to true, making the health status bar visible, playing the endboss audio, and pausing the background music.
     */
    triggerEndbossEncounter() {
        this.firstContactMade = true;
        this.statusBarHealthEndboss.visible = true;
        playAudio("endbossAudio");
        pauseAudio("backgroundMusic");
    }


    /* Collect Items -------------- */

    /**
     * Collects items if the character can collect them. Plays the item sound, increases the status bar count by one, and removes the item from the items array.
     * @param {Array} items - The items to collect.
     * @param {Map} itemSounds - The sounds to play when an item is collected.
     * @param {StatusBar} statusBar - The status bar to update when an item is collected.
     * @param {function} canCollectItem - The function to check if the character can collect an item.
     * @param {string} soundName - The name of the sound to play when an item is collected.
     */
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


    /**
     * Checks if the character can collect a coin.
     */
    collectCoins() {
        this.collectItems(
            this.level.coins,
            this.coinSounds,
            this.statusBarCoins,
            (coin) => this.characterCanCollectItem(coin),
            'coinAudio'
        );
    }


    /**
     * Checks if the character can collect a bottle.
     */
    collectBottles() {
        this.collectItems(
            this.level.bottles,
            this.bottleSounds,
            this.statusBarBottles,
            (bottle) => this.characterCanCollectItem(bottle),
            'collectBottleAudio'
        );
    }


    /**
     * Checks if the character can collect an item.
     * @param {MovableObject} item - The item to check.
     * @returns {boolean} True if the character is colliding with the item and is not hurt, false otherwise.
     */
    characterCanCollectItem(item) {
        return this.character.isColliding(item) && !this.character.isHurt();
    }


    /**
     * Adds an item to the collected items array based on its type.
     * @param {MovableObject} item - The item to collect.
     */
    collectItem(item) {
        if (item instanceof BottleTilted || item instanceof BottleStraight) {
            this.collectedBottles.push(item);
        } else if (item instanceof Coin) {
            this.collectedCoins.push(item);
        }
    }


    /**
     * Plays the sound for an item.
     * @param {MovableObject} item - The item to play the sound for.
     * @param {Map} itemSounds - The sounds to play when an item is collected.
     * @param {string} soundName - The name of the sound to play.
     */
    playItemSound(item, itemSounds, soundName) {
        this.findAndSetSound(item, itemSounds, soundName);
        this.createAndPlaySound(item, itemSounds);
    }


    /**
     * Finds and sets the sound for an item.
     * @param {MovableObject} item - The item to find and set the sound for.
     * @param {Map} itemSounds - The sounds to play when an item is collected.
     * @param {string} soundName - The name of the sound to find and set.
     */
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


    /**
     * Creates and plays the sound for an item.
     * @param {MovableObject} item - The item to create and play the sound for.
     * @param {Map} itemSounds - The sounds to play when an item is collected.
     */
    createAndPlaySound(item, itemSounds) {
        let sound = new Audio(itemSounds.get(item).src);
        sound.muted = isSoundMuted;
        sound.play();
    }
}