/**
 * Generates an array of Cloud objects.
 *
 * @param {number} count - The number of Cloud objects to generate.
 * @returns {Cloud[]} An array of Cloud objects.
 */
function generateClouds(count) {
    let cloudSpacing = 450;
    let clouds = [];

    for (let i = 0; i < count; i++) {
        const cloud = new Cloud(-1000 + i * cloudSpacing);
        clouds.push(cloud);
    }
    return clouds;
}


/**
 * Generates an array of BottleStraight objects.
 *
 * @param {number} count - The number of BottleStraight objects to generate.
 * @returns {BottleStraight[]} An array of BottleStraight objects.
 */
function generateBottlesStraight(count) {
    let bottlesStraight = [];

    for (let i = 0; i < count; i++) {
        const bottle = new BottleStraight();
        bottlesStraight.push(bottle);
    }
    return bottlesStraight;
}


/**
 * Generates an array of BottleTilted objects.
 *
 * @param {number} count - The number of BottleTilted objects to generate.
 * @param {boolean} useRightTilted - Whether to use right tilted bottles.
 * @returns {BottleTilted[]} An array of BottleTilted objects.
 */
function generateBottlesTilted(count, useRightTilted = false) {
    let bottlesTilted = [];

    for (let i = 0; i < count; i++) {
        const bottle = new BottleTilted(useRightTilted);
        bottlesTilted.push(bottle);
    }
    return bottlesTilted;
}


/**
 * Generates an array of Coin objects.
 *
 * @param {number} count - The number of Coin objects to generate.
 * @returns {Coin[]} An array of Coin objects.
 */
function generateCoins(count) {
    let coins = [];

    for (let i = 0; i < count; i++) {
        const coin = new Coin();
        coins.push(coin);
    }
    return coins;
}


/**
 * Generates an array of enemy objects of a specified type.
 *
 * @param {number} count - The number of enemy objects to generate.
 * @param {string} enemyType - The type of enemy to generate ('Chicken' or 'Chick').
 * @returns {Chicken[]|Chick[]} An array of enemy objects.
 */
function generateEnemies(count, enemyType) {
    const enemyConstructors = {
        'Chicken': Chicken,
        'Chick': Chick
    };

    let enemies = [];

    for (let i = 0; i < count; i++) {
        const Constructor = enemyConstructors[enemyType];
        if (Constructor) {
            const enemy = new Constructor();
            enemies.push(enemy);
        }
    }
    return enemies;
}


/**
 * Generates an array of BackgroundObject objects.
 *
 * @param {number} count - The number of BackgroundObject objects to generate.
 * @returns {BackgroundObject[]} An array of BackgroundObject objects.
 */
function generateBackgroundObjects(count) {
    return [
        ...Array(count).fill().map((_, i) => new BackgroundObject('img/5_background/layers/air.png', -2876 + (719 * i), 0)),
        ...Array(count).fill().map((_, i) => new BackgroundObject(`img/5_background/layers/3_third_layer/${i % 2 === 0 ? '2' : '1'}.png`, -2876 + (719 * i), 0.4)),
        ...Array(count).fill().map((_, i) => new BackgroundObject(`img/5_background/layers/2_second_layer/${i % 2 === 0 ? '2' : '1'}.png`, -2876 + (719 * i), 0.3)),
        ...Array(count).fill().map((_, i) => new BackgroundObject(`img/5_background/layers/1_first_layer/${i % 2 === 0 ? '2' : '1'}.png`, -2876 + (719 * i), 0.2))
    ];
}


const clouds = generateClouds(999);
const coins = generateCoins(12);

const bottlesStraight = generateBottlesStraight(12);
const leftTiltedBottles = generateBottlesTilted(4);
const rightTiltedBottles = generateBottlesTilted(4, true);
const bottles = [...bottlesStraight, ...leftTiltedBottles, ...rightTiltedBottles];

const chickens = generateEnemies(10, 'Chicken');
const chicks = generateEnemies(17, 'Chick');
const enemies = [...chickens, ...chicks];

const backgroundObjects = generateBackgroundObjects(40);

let level1;


/**
 * Initializes Level 1.
 */
function initLevel() {
    level1 = new Level(
        backgroundObjects,
        clouds,
        enemies,
        [new Endboss()],
        bottles,
        coins
    );
    enemies.forEach(enemy => enemy.start());
}


/**
 * Resets Level 1.
 */
function resetLevel() {
    clouds.length = 0;
    coins.length = 0;
    bottlesStraight.length = 0;
    leftTiltedBottles.length = 0;
    rightTiltedBottles.length = 0;
    bottles.length = 0;
    chickens.length = 0;
    chicks.length = 0;
    enemies.length = 0;
    backgroundObjects.length = 0;

    clouds.push(...generateClouds(999));
    coins.push(...generateCoins(12));
    bottlesStraight.push(...generateBottlesStraight(12));
    leftTiltedBottles.push(...generateBottlesTilted(4));
    rightTiltedBottles.push(...generateBottlesTilted(4, true));
    bottles.push(...bottlesStraight, ...leftTiltedBottles, ...rightTiltedBottles);
    chickens.push(...generateEnemies(10, 'Chicken'));
    chicks.push(...generateEnemies(17, 'Chick'));
    enemies.push(...chickens, ...chicks);
    backgroundObjects.push(...generateBackgroundObjects(40));

    level1 = new Level(
        backgroundObjects,
        clouds,
        enemies,
        [new Endboss()],
        bottles,
        coins
    );

    enemies.forEach(enemy => enemy.start());
}