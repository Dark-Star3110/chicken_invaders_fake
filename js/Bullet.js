class Bullet{
    constructor(plane,img,x,y){
        this.plane=plane;
        this.img=img;
        this.width=this.img.width;
        this.height=this.img.height;
        this.x=x;
        this.y=y;
        this.speed=3;
        this.canvas=document.getElementById('my-canvas');
        this.ctx=this.canvas.getContext('2d');
    }
    draw(){
        this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
    shot(){
        // this.plane.popBullet();
       
        // this.clearBullet();
        this.y-=this.speed;
        this.draw();
        // setTimeout(() => this.shot(),1000);
    }
    clearBullet(){
        this.ctx.clearRect(this.x,this.y,this.width,this.height);
    }
}