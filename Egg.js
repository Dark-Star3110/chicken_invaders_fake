class Egg{
    constructor(chicken,image){
        this.chicken = chicken;
        this.image = image;
        this.width = this.image.width;
        this.height = this.image.height;
        this.x=this.chicken.x+((this.chicken.width/2)-(this.width/2));
        this.y=this.chicken.y+this.height;
        this.speed=3;
        this.canvas=document.getElementById('my-canvas');
        this.ctx=this.canvas.getContext('2d');
        this.status = true;
    }
    draw(){
        this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    fall(){
        if(this.y > this.canvas.height){
            this.status = false;
        }
        this.y+=this.speed;
        this.draw();
    }
    clearEgg(){
        this.ctx.clearRect(this.x,this.y,this.width,this.height);
    }
}