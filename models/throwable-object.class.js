class ThrowableObject extends MovableObject {

    hitenemy = false;

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x - 30;
        this.y = y;
        this.height = 60;
        this.width = 50
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.splashBottle) {
                this.x = this.x
            } else {
                this.x += 10
            }

        }, 25);
        this.splashBottleInterval();
    }

    splashBottleInterval(){
        setInterval(() => {
            if (this.splashBottle) {
                this.speedY = 0 
                this.playAnimationDead(this.IMAGES_SPLASH);
                setTimeout(() => {
                    this.y = 600
                }, 500);
            } else {
                this.playAnimation(this.IMAGES_THROW);
            }
        }, 90);
    }
}