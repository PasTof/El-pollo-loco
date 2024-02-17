class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    gameOverScreen = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    gameover(){
        if (this.character.gameOver) {
            let dead = new Gameover();
            this.gameOverScreen.push(dead);
        }
    }

    checkGameOver(){
        if (this.character.energy == 0) {
            this.character.gameOver = true;
            this.gameover();
        }
    }

    checkGameOverEnemie(){
        if (this.enemies.energy == 0) {
            this.enemies.gameOver = true;
            this.gameover();
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkcoin();
            this.checkbottles();
            this.checkGameOver();
            this.checkCollisionEndboss();
        }, 200);
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.character.collected_bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.collected_bottles -= 10;
            this.bottleBar.setPercentage(this.character.collected_bottles);
        }
    }

    checkCollisionEndboss(){
        this.level.throwableObjects.forEach((enemy) => {
            if (this.enemies.isColliding(enemy)) {
                this.enemies.hit(50);
                console.log('hit')
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkcoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.colletingCoin(coin)) {
                coin.y = -200;
                this.character.collected_coins += 10;
                this.coinBar.setPercentage(this.character.collected_coins);
            }
        })
    }

    checkbottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.colletingCoin(bottle)) {
                bottle.y = -200
                this.character.collected_bottles += 20;
                this.bottleBar.setPercentage(this.character.collected_bottles);
            }
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.statusBarEndboss);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectToMap(this.gameOverScreen);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

