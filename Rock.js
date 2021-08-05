class Rock{
    constructor(img){
        this.img = img;
        this.width = this.img.width;
        this.height = this.img.height;
        this.canvas=document.getElementById('my-canvas');
        this.ctx=this.canvas.getContext('2d');
        this.x = Math.floor(Math.random()*this.canvas.width);
        this.y = 0;
        this.speed = 3;
        this.status = true;
    }
    draw(){
        this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
    fall(){
        if(this.y > this.canvas.height){
            this.status = false;
        }
        this.y+=this.speed;
        this.draw();
    }
}