class Character extends MovableObject {
    offset = {
        top: 120,
        bottom: -10,
        left: 20,
        right: 20,
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


    start() {
        if (!this.motionIntervalId) {
            this.characterMotion();
        }
        if (!this.animationIntervalId) {
            this.animateCharacter();
        }
    }


    pause() {
        clearInterval(this.motionIntervalId);
        clearInterval(this.animationIntervalId);
        this.motionIntervalId = null;
        this.animationIntervalId = null;
    }


    characterMotion() {
        this.motionIntervalId = setInterval(() => {
            this.handleCharacterMotion();
        }, 1000 / 60);
    }


    handleCharacterMotion() {
        pauseAudio('walkingAudio');
        this.handleCharacterMovement();
        this.handleCharacterJump();
        this.handleCharacterState();
        this.isMoving = this.isMovingHorizontally(this.world.keyboard);
        this.world.camera_x = -this.x + 100;
    }


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


    canMoveLeft() {
        return this.world.keyboard.KEY_LEFT && this.x > -438;
    }


    canMoveRight() {
        return this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x;
    }


    playWalkingAudio() {
        playAudio('walkingAudio');
        this.lastActivityTime = new Date().getTime();
        pauseAudio('snoringAudio');
    }


    handleCharacterJump() {
        if (this.canJump()) {
            this.jump();
            playAudio('jumpingAudio');
            console.log('Jumping...');
        }
    }


    canJump() {
        return (this.world.keyboard.KEY_SPACE || this.world.keyboard.KEY_UP) && !this.isAboveGround();
    }


    handleCharacterState() {
        if (this.isAboveGround() || this.isHurt()) {
            pauseAudio('walkingAudio');
        }
    }


    animateCharacter() {
        this.lastActivityTime = new Date().getTime();

        this.animationIntervalId = setInterval(() => {
            this.updateAnimationBasedOnState();
        }, 50);

        document.addEventListener('keydown', () => {
            this.lastActivityTime = new Date().getTime();
        });
    }


    updateAnimationBasedOnState() {
        const currentTime = new Date().getTime();
        const inactivityDuration = (currentTime - this.lastActivityTime) / 1000;

        if (this.isGameOver()) {
            this.handleGameOverAnimation();
        } else if (this.shouldPlayIdleAnimation(inactivityDuration)) {
            console.log('Idle...');
            this.handleIdleAnimation();
        } else if (this.isHurt()) {
            console.log('Hurt...');
            this.handleHurtAnimation();
        } else if (this.isAboveGround()) {
            console.log('Above ground...');
            this.handleJumpingAnimation();
        } else if (this.isMovingHorizontally(this.world.keyboard)) {
            console.log('moving...');
            this.handleWalkingAnimation();
        } else {
            console.log('standing...');
            this.handleStandingAnimation();
        }
    }


    handleGameOverAnimation() {
        this.triggerGameOver();
        this.playCharacterAnimation(this.IMAGES_GAME_OVER);
    }
    

    handleIdleAnimation() {
        this.playCharacterAnimation(this.IMAGES_IDLE);
        playAudio('snoringAudio');
    }


    handleHurtAnimation() {
        this.playCharacterAnimation(this.IMAGES_HURT);
        playAudio('hurtAudio');
    }    


    handleJumpingAnimation() {
        this.playCharacterAnimation(this.IMAGES_JUMPING);
    }


    handleWalkingAnimation() {
        this.playCharacterAnimation(this.IMAGES_WALKING);
    }


    handleStandingAnimation() {
        this.isGameOverTriggered = false;
        this.playCharacterAnimation(this.IMAGES_STANDING);
    }
    

    playCharacterAnimation(animation) {
        this.currentAnimation = animation;
        this.playAnimation(animation);
    }


    isIdle() {
        return this.currentAnimation === this.IMAGES_IDLE;
    }


    shouldPlayIdleAnimation(inactivityDuration) {
        return inactivityDuration > 5 && !this.isHurt() && !this.isAboveGround();
    }


    triggerGameOver() {
        if (!this.isGameOverTriggered) {
            characterIsGameOver();
            this.isGameOverTriggered = true;
        }
    }
}