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
        this.animateCharacter();
        this.characterMotion();
        this.isMoving = false;
    }


    characterMotion() {
        setInterval(() => {
            walkingAudio.pause();
            if (this.canMoveRight()) {
                this.moveRight();
                this.otherDirection = false;
                walkingAudio.play();
            }
            if (this.canMoveLeft()) {
                this.moveLeft();
                this.otherDirection = true;
                walkingAudio.play();
            }
            if (this.canJump()) {
                this.jump();
                jumpingAudio.play();
            }
            if (this.isAboveGround() || this.isHurt()) {
                walkingAudio.pause();
            }
            this.isMoving = this.isMovingHorizontally(this.world.keyboard);

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }


    animateCharacter() {
        this.lastActivityTime = new Date().getTime();

        setInterval(() => {
            const currentTime = new Date().getTime();
            const inactivityDuration = (currentTime - this.lastActivityTime) / 1000;

            if (inactivityDuration > 5) {
                this.playAnimation(this.IMAGES_IDLE);
                // snoringAudio.play();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                // hurtAudio.play();
            } else if (this.isGameOver()) {
                this.playAnimation(this.IMAGES_GAME_OVER);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.isMovingHorizontally(this.world.keyboard)) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_STANDING);
                snoringAudio.pause();
            }
        }, 50);
        document.addEventListener('keydown', () => {
            this.lastActivityTime = new Date().getTime();
        });
    }


    canJump() {
        return (this.world.keyboard.KEY_SPACE || this.world.keyboard.KEY_UP) && !this.isAboveGround();
    }


    canMoveLeft() {
        return this.world.keyboard.KEY_LEFT && this.x > -438;
    }


    canMoveRight() {
        return this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x;
    }
}