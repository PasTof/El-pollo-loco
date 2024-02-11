class CoinandBottle extends MovableObject {

    constructor(img) {
        super().loadImage(img);
        this.coinOrBottle(img);
    }

    coinOrBottle(img){
        if (img == 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png' || 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png') {
            this.x = 120 + Math.random() * 1500; 
            this.y = 350;
            this.height = 90;
            this.width = 70;
        }
        if (img == 'img/8_coin/coin_1.png'){
            this.x = 120 + Math.random() * 1500; 
            this.y = 50 + Math.random() * 200;
            this.height = 150;
            this.width = 100;
        }
    }
}