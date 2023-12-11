/**
 * Represents a level in the game.
 * 
 * A level has background objects, clouds, enemies, an end boss, bottles, coins, and a level end position.
 * 
 * @class
 */
class Level {
    backgroundObjects;
    clouds;
    enemies;
    endboss;
    bottles;
    coins;
    level_end_x = 6600;


    /**
     * Creates a new level.
     * 
     * @param {BackgroundObject[]} backgroundObjects - The background objects in the level.
     * @param {Cloud[]} clouds - The clouds in the level.
     * @param {Enemy[]} enemies - The enemies in the level.
     * @param {Endboss} endboss - The end boss of the level.
     * @param {Bottle[]} bottles - The bottles in the level.
     * @param {Coin[]} coins - The coins in the level.
     */
    constructor(backgroundObjects, clouds, enemies, endboss, bottles, coins) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.bottles = bottles;
        this.coins = coins;
    }
}