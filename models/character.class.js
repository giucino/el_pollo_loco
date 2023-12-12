/**
 * Represents the main character in the game.
 * 
 * A character can move around the game world and jump.
 * It can also be hurt and die.
 * 
 * @extends MovableObject
 */
class Character extends MovableObject {
    offset = {
        top: 100,
        bottom: 0,
        left: 5,
        right: 2,
    };


    height = 290;
    width = 110;
    y = 145;
    speed = 5;
    world;
    lastActivityTime;
    isMoving;
    motionIntervalId;
    animationIntervalId;
    isGameOverTriggered = false;


    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];


    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];


    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];


    IMAGES_GAME_OVER = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    /**
     * Constructor for the Character class.
     * Loads images, applies gravity, and starts the character's motion and animation.
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_GAME_OVER);
        this.applyGravity();
        this.start();
        this.isMoving = false;
        this.currentAnimation = null;
    }


    /**
     * Starts the character's motion and animation if they are not already running.
     */
    start() {
        if (!this.motionIntervalId) {
            this.characterMotion();
        }
        if (!this.animationIntervalId) {
            this.animateCharacter();
        }
    }


    /**
     * Pauses the character's motion and animation.
     */
    pause() {
        clearInterval(this.motionIntervalId);
        clearInterval(this.animationIntervalId);
        this.motionIntervalId = null;
        this.animationIntervalId = null;
    }


    /**
     * Initiates the character's motion at a rate of 60 times per second.
     */
    characterMotion() {
        this.motionIntervalId = setInterval(() => {
            this.handleCharacterMotion();
        }, 1000 / 60);
    }


    /**
     * Handles the character's motion. Pauses the walking audio, handles movement and jump,
     * updates the character's state, checks if the character is moving, and updates the camera position.
     */
    handleCharacterMotion() {
        pauseAudio('walkingAudio');
        this.handleCharacterMovement();
        this.handleCharacterJump();
        this.handleCharacterState();
        this.isMoving = this.isMovingHorizontally(this.world.keyboard);
        this.world.camera_x = -this.x + 100;
    }


    /**
     * Handles the character's movement. Moves the character to the right or left if possible,
     * and plays the walking audio.
     */
    handleCharacterMovement() {
        if (this.canMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingAudio();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingAudio();
        }
    }


    /**
     * Checks if the character can move to the left.
     * @returns {boolean} True if the left arrow key is pressed and the character's x position is greater than -438, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.KEY_LEFT && this.x > -438;
    }


    /**
     * Checks if the character can move to the right.
     * @returns {boolean} True if the right arrow key is pressed and the character's x position is less than the level's end x position, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * Plays the walking audio, updates the last activity time, and pauses the snoring audio.
     */
    playWalkingAudio() {
        playAudio('walkingAudio');
        this.lastActivityTime = new Date().getTime();
        pauseAudio('snoringAudio');
    }


    /**
     * Handles the character's jump action.
     */
    handleCharacterJump() {
        if (this.canJump()) {
            this.jump();
            playAudio('jumpingAudio');
        }
    }


    /**
     * Checks if the character can jump.
     * @returns {boolean} - Whether the character can jump.
     */
    canJump() {
        return (this.world.keyboard.KEY_SPACE || this.world.keyboard.KEY_UP) && !this.isAboveGround();
    }


    /**
     * Handles the character's state.
     */
    handleCharacterState() {
        if (this.isAboveGround() || this.isHurt()) {
            pauseAudio('walkingAudio');
        }
    }


    /**
     * Animates the character.
     */
    animateCharacter() {
        this.lastActivityTime = new Date().getTime();

        this.animationIntervalId = setInterval(() => {
            this.updateAnimationBasedOnState();
        }, 50);

        document.addEventListener('keydown', () => {
            this.lastActivityTime = new Date().getTime();
        });
    }


    /**
     * Updates the character's animation based on its state.
     */
    updateAnimationBasedOnState() {
        const currentTime = new Date().getTime();
        const inactivityDuration = (currentTime - this.lastActivityTime) / 1000;

        if (this.isGameOver()) {
            this.handleGameOverAnimation();
        } else if (this.shouldPlayIdleAnimation(inactivityDuration)) {
            this.handleIdleAnimation();
        } else if (this.isHurt()) {
            this.handleHurtAnimation();
        } else if (this.isAboveGround()) {
            this.handleJumpingAnimation();
        } else if (this.isMovingHorizontally(this.world.keyboard)) {
            this.handleWalkingAnimation();
        } else {
            this.handleStandingAnimation();
        }
    }


    /**
     * Handles the game over animation for the character.
     */
    handleGameOverAnimation() {
        this.triggerGameOver();
        this.playCharacterAnimation(this.IMAGES_GAME_OVER);
    }


    /**
    * Handles the idle animation for the character.
    */
    handleIdleAnimation() {
        this.playCharacterAnimation(this.IMAGES_IDLE);
        playAudio('snoringAudio');
    }


    /**
     * Handles the hurt animation for the character.
     */
    handleHurtAnimation() {
        this.playCharacterAnimation(this.IMAGES_HURT);
        playAudio('hurtAudio');
    }


    /**
     * Handles the jumping animation for the character.
     */
    handleJumpingAnimation() {
        this.playCharacterAnimation(this.IMAGES_JUMPING);
    }


    /**
     * Handles the walking animation for the character.
     */
    handleWalkingAnimation() {
        this.playCharacterAnimation(this.IMAGES_WALKING);
    }


    /**
     * Handles the standing animation for the character.
     */
    handleStandingAnimation() {
        this.isGameOverTriggered = false;
        this.playCharacterAnimation(this.IMAGES_STANDING);
    }


    /**
     * Plays a specific animation for the character.
     * @param {Array} animation - The animation to play.
     */
    playCharacterAnimation(animation) {
        this.currentAnimation = animation;
        this.playAnimation(animation);
    }

    /**
     * Checks if the character is idle.
     * @returns {boolean} - Whether the character is idle.
     */
    isIdle() {
        return this.currentAnimation === this.IMAGES_IDLE;
    }


    /**
     * Checks if the idle animation should be played.
     * @param {number} inactivityDuration - The duration of inactivity.
     * @returns {boolean} - Whether the idle animation should be played.
     */
    shouldPlayIdleAnimation(inactivityDuration) {
        return inactivityDuration > 5 && !this.isHurt() && !this.isAboveGround();
    }


    /**
     * Triggers the game over state for the character.
     */
    triggerGameOver() {
        if (!this.isGameOverTriggered) {
            characterIsGameOver();
            this.isGameOverTriggered = true;
        }
    }
}