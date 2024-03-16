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
    gameEndScreen = [];
    winScreen = [];
    endboss = level.enemies[7];
    startscreen = new Backgroundobject('img/9_intro_outro_screens/start/startscreen_1.png', 0);
    start_sound = new Audio('audio/starting.mp3');
    animationStarted = false;
    collectCoin = new Audio('audio/coin-collected.wav');
    collectBottle = new Audio('audio/bottle_collected.wav');
    splashBottlesound = new Audio('audio/bottle_splash.wav');
    hurtSound = new Audio('audio/hurt.mp3');
    currentTimeBottle = new Date().getTime();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    /**
    * starts the game  
    */
    startGame() {
        if (this.keyboard.ENTER) {
            for (let i = 0; i < this.level.enemies.length - 1; i++) {
                const enemies = this.level.enemies[i];
                enemies.startWalking = true
            }
        }
    }

    /**
    * sets the character  
    */
    setWorld() {
        this.character.world = this;
    }

    /**
    * starts the gameOver screen and starts a new game  
    */
    gameover() {
        if (this.character.gameOver) {
            let dead = new Gameover();
            this.gameEndScreen.push(dead);
            this.clearAllIntervals();
            
        }
    }

    /**
    * starts the win screen and starts a new game
    */
    winGame() {
        if (this.endboss.energy == 0) {
            setTimeout(() => {
                let dead = new Won();
                this.gameEndScreen.push(dead);

                this.clearAllIntervals();
                
            }, 1000);
        }
    }

    /**
    * checks if the Character is game Over  
    */
    checkGameOver() {
        if (this.character.energy == 0) {
            this.character.gameOver = true;
            setTimeout(() => {
                this.gameover();
                 
            }, 1000);


        }
    }

    /**
    * checks if the Endboss is game Over  
    */
    checkGameOverEnemie() {
        if (this.enemies.energy == 0) {
            this.enemies.gameOver = true;
            this.enemies.isDeadAnimation();
        }
    }

    /**
    * starts an intervall with all the functions needed for playing the game 
    */
    run() {
        setInterval(() => {
            this.startGame();
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

    /**
    * throws a bottle when Character has one  
    */
    checkThrowObjects() {
        if (this.timePassedCheckThrow() && this.keyboard.D && this.character.collected_bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.collected_bottles -= 10;
            this.bottleBar.setPercentage(this.character.collected_bottles);
            this.character.currentTime = new Date().getTime();
            this.currentTimeBottle = new Date().getTime();
            this.timepassedthrow = this.currentTimeBottle;
        }
    }

    /**
    * checks how much time has passed since the last throw  
    */
    timePassedCheckThrow() {
        let timepassedthrow = new Date().getTime() - this.currentTimeBottle;
        timepassedthrow = timepassedthrow / 1000;
        return timepassedthrow > 2 ? true : false;
    }

    /**
    * checks the x of the character to start the boss animation 
    */
    checkXCharacter() {
        if (this.character.x >= 1800 && !this.animationStarted) {
            this.endboss.startAnimation = true;
            this.animationStarted = true;
        }
    }

    /**
    * checks if a bottle hits a enemy 
    */
    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach(element => {
                if (element.isColliding(enemy)) {
                    element.splashBottle = true;
                    if (!this.keyboard.M) {
                        this.splashBottlesound.play();
                    }
                    enemy.hit(3);
                    this.statusBarEndboss.setPercentage(enemy.energy)
                }
            });
            if (this.character.x > 2200 && !enemy.hadfirstcontact) {
                enemy.hadfirstcontact = true
            }
        });
    }

    /**
    * checks if a enemie hits the Character 
    */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.jumpOnChicken(enemy);
            if (this.character.isColliding(enemy)) {
                if (!this.keyboard.M) {
                    this.hurtSound.play();
                }
                this.character.hit(10);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
    * checks if the character hits a chicken from above
    * @param {String} e 
    */
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

    /**
    * @returns true if the is above the chicken 
    * @param {String} e 
    */
    isCharacterAboveChicken(e) {
        return !this.character.dead && this.character.aboveChicken == true && this.character.topPartBottomContact(e) && e instanceof Chicken
    }

    /**
    * @returns true if the character is back on ground 
    */
    isCharacterOnGroundAgain(e) {
        return this.character.aboveChicken == true &&
            !this.character.isAboveChicken(e) &&
            !(e instanceof Endboss)
    }

    /**
    * checks if the coin got collected 
    */
    checkcoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                if (!this.keyboard.M) {
                    this.collectCoin.play();
                }
                coin.y = -200;
                this.character.collected_coins += 10;
                this.coinBar.setPercentage(this.character.collected_coins);
            }
        })
    }
    /**
    * checks if the bottle got collected 
    */
    checkbottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (!this.keyboard.M) {
                    this.collectBottle.play();
                }
                bottle.y = -200
                this.character.collected_bottles += 20;
                this.bottleBar.setPercentage(this.character.collected_bottles);
            }
        })
    }
    /**
    * draws all the images  
    */
    draw() {
        if (!this.keyboard.ENTER) {
            this.addToMap(this.startscreen);
        } else {
            this.drawCanvas();
            this.drawBars();
            this.drawMovableObjects();
            this.drawEndScreen();
        }
        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    };
    /**
    * sets the canvas  
    */
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
    }
    /**
    * draws the endscreen 
    */
    drawEndScreen() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectToMap(this.gameEndScreen);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
    * draws all the bars 
    */
    drawBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
    * draws all the Movable Objects 
    */
    drawMovableObjects() {
        this.addToMap(this.character);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.throwableObjects);
    }
    /**
    * adds more objects to The map 
    * @param {Array} objects 
    */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
    /**
    * Adds one Object to the map
    * @param {Object} mo 
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * flips the Image
    * @param {Object} mo  
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * flips the Image back
    * @param {Object} mo  
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
    * clears all the intervalls  
    */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}

