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


// function generateEnemies(count, enemyType) {
//     let enemies = [];

//     for (let i = 0; i < count; i++) {
//         let enemy;
//         switch (enemyType) {
//             case 'Chicken':
//                 enemy = new Chicken();
//                 break;
//             case 'Chick':
//                 enemy = new Chick();
//                 break;
//         }
//         enemies.push(enemy);
//     }
//     return enemies;
// }


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


const clouds = generateClouds(999);
const coins = generateCoins(12);


const bottlesStraight = generateBottlesStraight(12);
const leftTiltedBottles = generateBottlesTilted(4);
const rightTiltedBottles = generateBottlesTilted(4, true);
const bottles = [...bottlesStraight, ...leftTiltedBottles, ...rightTiltedBottles];


const chickens = generateEnemies(10, 'Chicken');
const chicks = generateEnemies(7, 'Chick');
const enemies = [...chickens, ...chicks];


const level1 = new Level(

    [
        new BackgroundObject('img/5_background/layers/air.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 8),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 8),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 9),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 9),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 10),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 10)
    ],

    clouds,

    enemies,

    [new Endboss()],

    bottles,

    coins
);