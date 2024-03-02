class StatusBarEndboss extends DrawableOject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 2300;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
}