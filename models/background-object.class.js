class Backgroundobject extends MovableObject{

    width = 720;
    height = 480;
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 480 - this.height; 
        this.x = x;
    }


}

