function generateClouds(count) {
    let cloudSpacing = 450;
    let clouds = [];

    for (let i = 0; i < count; i++) {
        const cloud = new Cloud(-1000 + i * cloudSpacing);
        clouds.push(cloud);
    }
    return clouds;
}


function generateBottlesStraight(count) {
    let bottlesStraight = [];

    for (let i = 0; i < count; i++) {
        const bottle = new BottleStraight();
        bottlesStraight.push(bottle);
    }
    return bottlesStraight;
}


function generateBottlesTilted(count, useRightTilted = false) {
    let bottlesTilted = [];

    for (let i = 0; i < count; i++) {
        const bottle = new BottleTilted(useRightTilted);
        bottlesTilted.push(bottle);
    }
    return bottlesTilted;
}


function generateCoins(count) {
    let coins = [];

    for (let i = 0; i < count; i++) {
        const coin = new Coin();
        coins.push(coin);
    }
    return coins;
}


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