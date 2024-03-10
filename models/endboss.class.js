class Endboss extends MovableObject {

    height = 500;
    y = -35;
    width = 300;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    offset = {
        top: -40,
        left: -60,
        right: -60,
        bottom: -30
    };

    hadfirstcontact = false;
    timeStamp = 0;
    startAnimation = false;
    startedAnimation = false;
    dieOnce = true;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.x = 2500;
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();

    }

    animate() {
        setInterval(() => {
            if (this.canStartAnimation()) {
                if (this.startAnimation == true) {
                  this.setParametersForStartingAnimation();
                }
                if (this.canStartAlertAnimation()) {
                  this.playAnimation(this.IMAGES_ALERT);
                }
                if (this.canStartAttackAnimation()) {
                  this.playAnimation(this.IMAGES_ATTACK)
                  this.jumpOnRightPicture();
                }
                if (this.canStartWalkingAnimation()) {
                  this.playAnimation(this.IMAGES_WALKING)
                  this.x -= 20;
                }
                if (this.isHurt()) {
                  this.playAnimation(this.IMAGES_HURT);
                }
                if (this.isDead()) {
                  this.playAnimationDead(this.IMAGES_DEAD);
                  
                }
              }
        }, 90);
    }

  //     /**
  //  * important parameters for playing the dying animation
  //  */
  // endbossDead() {
  //   this.firstPass = true
  //   this.currentImage = 0;
  // }


  // /**
  //  * if the Endboss dies, it has to play an animation one time
  //  */
  // isDeadAnimation() {
  //     this.playAnimationDead(this.IMAGES_DEAD);
  // }

  /**
   * 1 jump on the attack animation at the G18 picture
   */
  jumpOnRightPicture() {
    if (this.img == this.imageCache['img/4_enemie_boss_chicken/3_attack/G18.png']) {
      this.x -= 110;
    }
  }


  /**
   * @returns true if the endboss is playing the attack animation
   */
  canStartAttackAnimation() {
    return this.calcTime() >= 6 && this.isnotHurtandDead();
  }


  /**
   * @returns true if the endboss is playing the alert animation
   */
  canStartAlertAnimation() {
    return this.calcTime() < 3 && this.isnotHurtandDead();
  }


  /**
   * @returns true if the endboss have to walk
   */
  canStartWalkingAnimation() {
    return this.calcTime() >= 3 && this.calcTime() < 6 && this.isnotHurtandDead();
  }


  /**
   * important parameters for starting the endboss animation
   */
  setParametersForStartingAnimation() {
    this.timeStamp = Math.round(new Date().getTime() / 1000)
    this.startAnimation = false;
    this.startedAnimation = true;
  }

  /**
   * Die Endboss Animation erst starten wenn der Character eine bestimmte x-Koordinate erreicht hat
   * @returns ob die Animation starten kann und ob diese schon gestartet ist
   */
  canStartAnimation() {
    return this.startAnimation == true || this.startedAnimation == true;
  }


  /**
   * @returns true if the endboss is not hurt or dead
   */
  isnotHurtandDead() {
    return !this.isHurt() && !this.isDead()
  }


  /**
   * defines sequences of the end boss animation
   * @returns the time between 0 and 9
   */
  calcTime() {
    let setTime = Math.round(new Date().getTime() / 1000);
    return -((this.timeStamp - setTime) % 10)
  }

    // youwon() {
    //     location.reload();
    // }
}