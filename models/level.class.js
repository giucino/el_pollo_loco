class Level {
    backgroundObjects;
    clouds;
    enemies;
    endboss;
    bottles;
    coins;
    level_end_x = 6600;

    
    constructor(backgroundObjects, clouds, enemies, endboss, bottles, coins) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.bottles = bottles;
        this.coins = coins;
    }
}