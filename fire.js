const WIDTH = window.innerWidth;
const HEIGHT =window.innerHeight;
const PARTICLE_SIZE=7;
const PARTICLE_CHANGE_SIZE_SPEED =0.1;
const PARTICLE_CHANGE_SPEED =0.5;
const ACCELERATION= 0.12;
const DOT_CHANGE_SIZE_SPEED =0.2;
const DOT_CHANGE_ALPHA_SPEED =0.07;

const PARTICLE_MIN_SPEED = 10;
const NUMBER_PARTICLE_PER_BULLET = 25;


class particle{
    constructor(bullet,deg) {
        this.bullet=bullet;
        this.ctx=bullet.ctx;
        this.deg=deg;
        this.x=this.bullet.x;
        this.y=this.bullet.y;
        this.color=this.bullet.color;
        this.size=PARTICLE_SIZE;
        this.speed= Math.random()*4+PARTICLE_MIN_SPEED;
        this.speedX=0;
        this.speedY=0;
        this.fallSpeed=0;

        this.dots = [];
            // {x:10 , y:10 , alpha:1, size:10}
    }
    update(){
        this.speed -= PARTICLE_CHANGE_SPEED; 
        if(this.speed < 0){
            this.speed=0;
        }
        // increase fall speed
        this.fallSpeed+=ACCELERATION;
        // calculate position
        this.speedX = this.speed * Math.cos(this.deg);
        this.speedY = this.speed * Math.sin(this.deg)+this.fallSpeed;
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.size > PARTICLE_CHANGE_SIZE_SPEED){
            this.size-=PARTICLE_CHANGE_SIZE_SPEED;
        }

        if(this.size>0){
            this.dots.push({
                x:this.x ,
                y:this.y ,
                alpha:1,
                size:this.size
            });
        }
        this.dots.forEach(dot =>{
            dot.size-=DOT_CHANGE_SIZE_SPEED;
            dot.alpha-=DOT_CHANGE_ALPHA_SPEED;
        });
        this.dots =this.dots.filter(dot =>{
            return dot.size > 0;
        });

        if(this.dots.length == 0){
            this.remove();
        }
    }
    remove(){
        this.bullet.particles.splice(this.bullet.particles.indexOf(this),1);
    }
    draw(){
        this.dots.forEach(dot => {
            this.ctx.beginPath();
            this.ctx.arc(dot.x,dot.y,dot.size,0,2*Math.PI);
            this.ctx.fillStyle='rgba('+this.color+','+dot.alpha+')';
            this.ctx.fill();
            this.ctx.closePath();
        })
    }

}

class bullet{
    constructor(firework){
        this.firework=firework;
        this.ctx=firework.ctx;
        this.x=firework.x;
        this.y=firework.y;
        this.color= Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255);
        this.particles=[];
        // create one particle
        let bulletDeg = (Math.PI*2) / NUMBER_PARTICLE_PER_BULLET;
        // console.log(bulletDeg);
        for(let i=0;i<NUMBER_PARTICLE_PER_BULLET;i++){
            let newParticle = new particle(this,i*bulletDeg);
            this.particles.push(newParticle);
        }
        // let newParticle = new particle(this,1);
        // this.particles.push(newParticle);

    }
    remove(){
        this.firework.bullets.splice(this.firework.bullets.indexOf(this),1);
    }
    update(){
        if(this.particles.length==0){
            this.remove();
        }
        this.particles.forEach(particle => particle.update());
    }
    draw(){
        this.particles.forEach(particle => particle.draw());
    }
}

class fireWork{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.canvas=document.getElementById('my-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width=WIDTH;
        this.canvas.height =HEIGHT;
        this.bullets=[];
        let newBulet =new bullet(this);
        this.bullets.push(newBulet);    
    }

    loop(){
        this.bullets.forEach(bullet => bullet.update());
        this.draw();
        // console.log('cc');
        setTimeout(() => this.loop(),10000);
    }
    clearScreen(){
        this.ctx.clearRect(0,0,W,H);
    }

    draw(){
        this.clearScreen();
        this.bullets.forEach(bullet => bullet.draw());
    }
}
