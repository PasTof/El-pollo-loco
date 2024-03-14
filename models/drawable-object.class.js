class DrawableOject {
    img;
    imageCache = {};
    imageCacheCoin = {};
    currentImage = 0;
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    percentage = 100;

    /**
    * loads the image
    * @param {string} path  
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * draws the Image inserted
    * @param {string} ctx  
    */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading Image',e);
            console.log('could not load Image,', this.img.src)
        }
        
    }

    /**
    * loads an array with images 
    * @param {Array} arr   
    */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
    * draws a frame around Character and Chicken 
    * @param {string} ctx 
    */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "0";
            ctx.strokeStyle = "transparent";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        } 
    }

    /**
    * sets the percentage 
    * @param {Number} percentage  
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * checks how high the percentage is 
    */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;} 
        }
}