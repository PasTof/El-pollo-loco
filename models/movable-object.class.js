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

    /**
    * starts the Gravity  
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
    * checks if the object is above the ground  
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this.dead) {
            return true;
        } else {
            return this.y < 150
        }
    }

    /**
    * sets a hit and takes off e from energy 
    * @param {Number} e  
    */
    hit(e) {
        this.energy -= e;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * @returns true if 1 sec has passed  
    */
    isHurt() {
        let timespassed = new Date().getTime() - this.lastHit;
        timespassed = timespassed / 1000;
        return timespassed < 1
    }

    /**
    * @returns true if the energy is zero  
    */
    isDead() {
        return this.energy == 0
    }

    /**
    * shows one image after another
    * @param {Array} images   
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * shows one image after another stops at the last image
    * @param {Array} images   
    */
    playAnimationOnce(images) {
        if (this.currentImage < images.length) {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else {
            let path = images[images.length - 1]; // Use the last image
            this.img = this.imageCache[path];
        }
    }

    /**
    * moves the object right  
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    * moves the object left  
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * lets the opject jump  
    */
    jump() {
        this.speedY = 30;
    }

    /**
    * @returns true if the Object collides with mo 
    * @param {String} mo   
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x - mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
    * @returns true if the Object collides with mo from the top
    * @param {String} mo   
    */
    topPartBottomContact(mo) {
        return this.y + this.height >= mo.y &&
            this.y + this.height <= mo.y + (mo.height) &&
            this.x + this.width > mo.x &&
            this.x < mo.x + mo.width;
    }
}