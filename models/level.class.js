class Level {
    backgroundObjects;
    clouds;
    enemies;
    bottles;
    coin;
    level_end_x = 5800;

    constructor(backgroundObjects, clouds, enemies, bottles, coin) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.bottles = bottles;
        this.coin = coin;
    }
}