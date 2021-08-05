const CHANGE_SPEED =2;

class Chicken{
    constructor(x,y,img){
        this.x=x;
        this.y=y;
        this.image=img;
        this.width=img.width;
        this.height=img.height;
        this.status=true;
        this.canvas=document.getElementById('my-canvas');
        this.ctx=this.canvas.getContext('2d');
        this.health=5;
        this.speedX=CHANGE_SPEED;
        this.speedY=CHANGE_SPEED;
        this.eggs = [];
    }
    draw(){
        this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    move(){
        if(this.x < 0 || this.x + this.width > this.canvas.width){
            this.speedX = -this.speedX;
        }
        if(this.y < 0 || this.y + this.height > this.canvas.height){
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y +=this.speedY;
        // this.draw(); 
    }

    pushEgg(newEgg){
        this.eggs.push(newEgg);
    }

    reduceHealth(){
        if(this.health <= 0){
            this.status = false;
        }
        this.health--;
    }

}