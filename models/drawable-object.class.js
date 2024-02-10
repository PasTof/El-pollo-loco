class DrawableOject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 300;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "0";
            ctx.strokeStyle = "transparent";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}