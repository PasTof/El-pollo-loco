class MovableObject extends DrawableOject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    gameOver = false;
    collected_coins = 0;
    collected_bottles = 0;
    lastHit = 0;
    splashBottle = false;
    dead = false;
    firstPass = true;
    
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this.dead) {
            return true;
        } else{
            return this.y < 150
        }
    }


    hit(e) {
        this.energy -= e;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timespassed = new Date().getTime() - this.lastHit;
        timespassed = timespassed / 1000;
        return timespassed < 1
    }

    isDead() {
        return this.energy == 0
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationDead(images) {
        if (this.currentImage < images.length) {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else {
            let path = images[images.length - 1]; // Use the last image
            this.img = this.imageCache[path];
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x - mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom 
    }

    topPartBottomContact(mo) {
        return this.y + this.height >= mo.y &&
            this.y + this.height <= mo.y + (mo.height) &&
            this.x + this.width > mo.x &&
            this.x < mo.x + mo.width;
    }

    colletingCoin(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height - 170
    }
}