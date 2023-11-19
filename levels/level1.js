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
        ...Array(count).fill().map((_, i) => new BackgroundObject(`img/5_background/layers/3_third_layer/${i % 2 === 0 ? '2' : '1'}.png`, -2876 + (719 * i), 0.2)),
        ...Array(count).fill().map((_, i) => new BackgroundObject(`img/5_background/layers/2_second_layer/${i % 2 === 0 ? '2' : '1'}.png`, -2876 + (719 * i), 0.3)),
        ...Array(count).fill().map((_, i) => new BackgroundObject(`img/5_background/layers/1_first_layer/${i % 2 === 0 ? '2' : '1'}.png`, -2876 + (719 * i), 0.4))
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


// for (let i = 0; i < 40; i++) {
//     let imageSuffix;
//     if (i % 2 === 0) {
//         imageSuffix = '2';
//     } else {
//         imageSuffix = '1';
//     }

//     backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', -719 + (719 * i), 0.1));
//     backgroundObjects.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${imageSuffix}.png`, -719 + (719 * i), 0.2));
//     backgroundObjects.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${imageSuffix}.png`, -719 + (719 * i), 0.3));
//     backgroundObjects.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${imageSuffix}.png`, -719 + (719 * i), 0.4));
// }


// [
//     new BackgroundObject('img/5_background/layers/air.png', -719, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 0, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719 * 2, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719 * 3, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719 * 4, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719 * 5, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719 * 6, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719 * 7, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719 * 8, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719 * 9, 0.1),
//     new BackgroundObject('img/5_background/layers/air.png', 719 * 10, 0.1),

//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 8, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 9, 0.2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 10, 0.2),

//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 8, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 9, 0.3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 10, 0.3),

//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3,  0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 8, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 9, 0.4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 10, 0.4)

// ],


// [
//     new BackgroundObject('img/5_background/layers/air.png', -719),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

//     new BackgroundObject('img/5_background/layers/air.png', 0),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

//     new BackgroundObject('img/5_background/layers/air.png', 719),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

//     new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

//     new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

//     new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

//     new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

//     new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),

//     new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),

//     new BackgroundObject('img/5_background/layers/air.png', 719 * 8),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 8),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 8),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 8),

//     new BackgroundObject('img/5_background/layers/air.png', 719 * 9),
//     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 9),
//     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 9),
//     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 9),

//     new BackgroundObject('img/5_background/layers/air.png', 719 * 10),
//     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 10),
//     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 10),
//     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 10)
// ],