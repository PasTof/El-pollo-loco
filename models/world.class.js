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
    startscreen = new Backgroundobject('img/9_intro_outro_screens/start/startscreen_1.png', 0);
    start_sound = new Audio('audio/starting.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.run();
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }

    gameover() {
        if (this.character.gameOver) {
            let dead = new Gameover();
            this.gameOverScreen.push(dead);
            this.clearAllIntervals();
            setTimeout(() => {
                location.reload();
            }, 4000);
        }
    }

    checkGameOver() {
        if (this.character.energy == 0) {
            this.character.gameOver = true;
            setTimeout(() => {
                this.gameover();
            }, 1000);

        }
    }

    checkGameOverEnemie() {
        if (this.enemies.energy == 0) {
            this.enemies.gameOver = true;
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkcoin();
            this.checkbottles();
            this.checkGameOver();
            this.checkCollisionEnemy();
        }, 120);
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.character.collected_bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.collected_bottles -= 10;
            this.bottleBar.setPercentage(this.character.collected_bottles);
            this.character.currentTime = new Date().getTime();
        }
    }

    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach(element => {
                if (element.isColliding(enemy)) {
                    element.splashBottle = true;
                    enemy.hit(3);
                    this.statusBarEndboss.setPercentage(enemy.energy)
                }
            });
            if (this.character.colletingCoin(enemy)) {
                enemy.hit(100);
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
            if (this.character.isColliding(coin)) {
                coin.y = -200;
                this.character.collected_coins += 10;
                this.coinBar.setPercentage(this.character.collected_coins);
            }
        })
    }

    checkbottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.y = -200
                this.character.collected_bottles += 20;
                this.bottleBar.setPercentage(this.character.collected_bottles);
            }
        })
    }

    draw() {
        if (!this.keyboard.ENTER) {
            this.addToMap(this.startscreen);
        } else {
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


        }
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

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}

