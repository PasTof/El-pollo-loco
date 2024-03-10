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
    winScreen = [];
    endboss = this.level.enemies[7];
    startscreen = new Backgroundobject('img/9_intro_outro_screens/start/startscreen_1.png', 0);
    start_sound = new Audio('audio/starting.mp3');
    animationStarted = false;
    collectCoin = new Audio('audio/coin-collected.wav');
    collectBottle = new Audio('audio/bottle_collected.wav');
    splashBottlesound = new Audio('audio/bottle_splash.wav');
    hurtSound = new Audio('audio/hurt.mp3');


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

    winGame(){
        if (this.endboss.energy == 0) {
            setTimeout(() => {
                let dead = new Won();
                this.gameOverScreen.push(dead);
                
                this.clearAllIntervals();
                setTimeout(() => {
                    location.reload();
                }, 2000); 
            }, 2000);
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
            this.enemies.isDeadAnimation();
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
            this.checkXCharacter();
            this.winGame();
        }, 90);
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
    checkXCharacter() {
        if (this.character.x >= 2000 && !this.animationStarted) {
          this.endboss.startAnimation = true;
          this.animationStarted = true;
        }
      }

    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach(element => {
                if (element.isColliding(enemy)) {
                    element.splashBottle = true;
                    this.splashBottlesound.play();
                    enemy.hit(3);
                    this.statusBarEndboss.setPercentage(enemy.energy)
                }
            });
            if (this.character.x > 2200 && !enemy.hadfirstcontact) {
                enemy.hadfirstcontact = true    
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.jumpOnChicken(enemy);
            if (this.character.isColliding(enemy)) {
                this.hurtSound.play();
                this.character.hit(5);
                this.statusBar.setPercentage(this.character.energy);              
            }
        });
    }

    jumpOnChicken(e) {
        if (this.character.isAboveChicken(e) && this.character.speedY < 0) {
            this.character.aboveChicken = true;
        }
        if (this.isCharacterAboveChicken(e) && !e.getHit) {
            this.character.jump(10)
            e.getHit = true;
        }
        if (this.isCharacterOnGroundAgain(e))
            this.character.aboveChicken = false;
    }

    isCharacterAboveChicken(e) {
        return !this.character.dead && this.character.aboveChicken == true && this.character.topPartBottomContact(e) && e instanceof Chicken
    }

    isCharacterOnGroundAgain(e) {
        return this.character.aboveChicken == true &&
            !this.character.isAboveChicken(e) &&
            !(e instanceof Endboss)
    }

    checkcoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin.play(); 
                coin.y = -200;
                this.character.collected_coins += 10;
                this.coinBar.setPercentage(this.character.collected_coins);
            }
        })
    }

    checkbottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle.play();
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
            this.addToMap(this.statusBarEndboss);
            this.ctx.translate(this.camera_x, 0);

            this.addToMap(this.character);
            this.addObjectToMap(this.level.clouds);
            this.addObjectToMap(this.level.enemies);
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

