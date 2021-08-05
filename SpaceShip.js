class SpaceShip{
    constructor(img) {
        this.img = img;
        this.width=this.img.width;
        this.height=this.img.height;
        this.x=0;
        this.y=0;
        this.bullets=[];
        this.health = 5;
        this.status =true;
        this.canvas=document.getElementById('my-canvas');
        this.ctx=this.canvas.getContext('2d');
    }
    draw(){
        this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
    move(x,y){
        this.clear();
        this.x=x;
        this.y=y;
        this.draw();
    }

    pushBullet(newBullet){
        this.bullets.push(newBullet);
    }

    spliceBullet(index){
        this.bullets.splice(index,1);
    }

    increaseHealth(){
        this.health++;
    }

    decreaseHealth(){
        if(this.health <= 1){
            this.status = false;
        }
        this.health --;
    }

    clear(){
        this.ctx.clearRect(this.x,this.y,this.width,this.height);
    }
}