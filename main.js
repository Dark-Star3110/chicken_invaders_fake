const canvas=document.getElementById('my-canvas');
const W=window.innerWidth;
const H=window.innerHeight;
canvas.width=W;
canvas.height=H;
const DISTANCE=50;
const SPACE_BULLET = 10;
const NUMBER_BULLET = 3;
const CHANGE_FAME = 20;
const TIME_CHANGE_MODE = 600;

let row = 1;
let score = 0;
let frame = 0;
let loop;
let start = true;
let count = 0;
let model = 0;



let ctx=canvas.getContext('2d');
let firework = new fireWork(0,0);
let fistTime=true;
let heart_img = new Image(40,40);
heart_img.src = 'img/heart.png';

let x=0,y=0;

let isShot =false;
// let plane_img=document.getElementById('space-ship');
let plane_img= new Image(50,50);
plane_img.src="./img/spaceship.png";
let plane = new SpaceShip(plane_img);
plane.draw();

//bullet
let bullet_img = new Image(10.5,37.5);
bullet_img.src = './img/bullet.png';
let bulletMode = 1;
let bulletX = plane.x + ((plane.width/2)-(bullet_img.width/2));
let bulletY = plane.y-bullet_img.height;
let newBullet = new Bullet(plane,bullet_img,bulletX,bulletY);
plane.pushBullet(newBullet);

// chicken
let chicken_img=['Chicken.png','Clownchicken.png','Militarychicken.png','SuperChick.png'];
let chickenList=[];

// egg
let egg_img= new Image(20,30);
egg_img.src = './img/egg.png';
let eggsList = [];

// rock
let meteor_img = new Image(80,80);
meteor_img.src = './img/meteor.png';
let newMeteor = new Rock(meteor_img);
let meteors = [newMeteor];

// item
let item_img= new Image(30,30);
let item;
let items = [];
let item_type = 1;

function randomItem(){
    return Math.floor(Math.random()*3 +1);
}

function percentLuck(){
    return Math.floor(Math.random()*101);
}

function moveGift(){
    for ( index in items){
        // shotChicken(plane.bullets[index]);
        impactGift(items[index]);
        items[index].fall();
        if(!items[index].status){
            items.splice(index,1);
        }
        // plane.bullets[index].shot();
    }
}

function impactGift(item){
    // alert(1);
    if(plane.y > item.y){
        if(plane.x + plane.width >= item.x && plane.x <= item.x + item.width
            && item.y + item.height >= plane.y){
                item.status = false;
                if(item_type === 1){
                    bulletMode = 3;
                    model = TIME_CHANGE_MODE;
                }
                if(item_type === 2){
                    plane.increaseHealth();
                }
                if(item_type === 3){
                    bulletMode = 2;
                    model = TIME_CHANGE_MODE;
                }
        }
    }
}

function moveMeteor(){
    for ( index in meteors){
        // shotChicken(plane.bullets[index]);
        impactRock(meteors[index]);
        meteors[index].fall();
        if(!meteors[index].status){
            meteors.splice(index,1);
        }
        // plane.bullets[index].shot();
    }
}


function createChicken(){
    for (let i=0;i<row;i++){
        for(let j=0;j<chicken_img.length;j++){
            let chick=new Image(80,80);
            chick.src='./img/'+chicken_img[j];
            let newChicken = new Chicken(50+j*(chick.width+DISTANCE),50+i*(chick.height+DISTANCE),chick);
            let newEgg = new Egg(newChicken,egg_img);
            newChicken.eggs.push(newEgg);
            // eggsList.push(newEgg);
            chickenList.push(newChicken);
        }
    }
}
createChicken();
// console.log(chickenList);
function drawChicken(){
    let n = chickenList.length;
    for(let i=0;i<n;i++){
        if(chickenList[i].status){
            chickenList[i].draw();
        }
    }
}
drawChicken();

function FreeChick(){
    for(let i=chickenList.length-1;i>=0;i--){
        chickenList.pop(chickenList[i]);
    }
}


function play(){
    if(!start){
        if(confirm('Do you want retry!!')){
            refresh();
        }
        return;
    }
    frame++;
    if(model <= 0){
        bulletMode = 1;
        model = 0;
    }else{
        model--;
    }
    clear();
    if(!fistTime){
        firework.loop();
    }

    // plane.pushBullet(newBullet);

    // load();
    plane.draw();
    if(frame % CHANGE_FAME === 0){
        if(bulletMode === 1){
            bulletX = plane.x + ((plane.width/2)-(bullet_img.width/2));
            bulletY = plane.y-bullet_img.height;
            let newBulet = new Bullet(plane,bullet_img,bulletX,bulletY);
            plane.pushBullet(newBulet);
        }
        if(bulletMode === 2){
            bulletX = plane.x + ((plane.width/2)-(bullet_img.width/2));
            bulletY = plane.y-bullet_img.height;
            let x0 = bulletX - SPACE_BULLET/2;
            let x1 = bulletX + SPACE_BULLET/2;
            let newBulet1 = new Bullet(plane,bullet_img,x0,bulletY);
            let newBulet2 = new Bullet(plane,bullet_img,x1,bulletY);
            plane.pushBullet(newBulet1);
            plane.pushBullet(newBulet2);
        }
        if(bulletMode === 3){
            bulletX = plane.x + ((plane.width/2)-(bullet_img.width/2));
            bulletY = plane.y-bullet_img.height;
            let x0 = bulletX - SPACE_BULLET;
            let x1 = bulletX + SPACE_BULLET;
            let newBulet1 = new Bullet(plane,bullet_img,x0,bulletY);
            let newBulet2 = new Bullet(plane,bullet_img,bulletX,bulletY);
            let newBulet3 = new Bullet(plane,bullet_img,x1,bulletY);
            plane.pushBullet(newBulet1);
            plane.pushBullet(newBulet2);
            plane.pushBullet(newBulet3);
        }
        
    }
    if(frame % 100 === 0){
        chickenList.forEach(chicken =>{
            chicken.eggs.push(new Egg(chicken,egg_img));
        } );
    }
    if(frame % 60 === 0){
        let newMeteor = new Rock(meteor_img);
        meteors.push(newMeteor);
    }
    planeShot();
    moveMeteor();
    moveGift();
    for(let i =0;i<chickenList.length;i++){
        if(chickenList[i].status){
            chickenList[i].move();
            // impactChicken(chickenList[i]);
            chickenLayEgg(chickenList[i]);
        }
    }
    drawChicken(); 
    displayInf();
    isGameOver();
    loop=requestAnimationFrame(play);
}
play();

function freeBullet(){
    for(let i=0;i<NUMBER_BULLET;i++){
        plane.popBullet();
    }
}

function planeShot(){ 
    // clear();
    for ( index in plane.bullets){
        shotChicken(plane.bullets[index]);
        plane.bullets[index].shot();
        if(plane.bullets[index].y < 0){
            plane.bullets.splice(index,1);
        }
        // plane.bullets[index].shot();
    }

    levelUp(); 
    // load();
}

function chickenLayEgg(chicken){ 
    // clear();
    for ( index in chicken.eggs){
        chicken.eggs[index].fall();
        impactEgg(chicken.eggs[index]);
        if(!chicken.eggs[index].status){
            chicken.eggs.splice(index,1);
        }
        // plane.bullets[index].shot();
    }
}
// setInterval(planeShot,1);

// window.addEventListener('mousedown',function(){
//     isShot=true;
//     let html='<audio src="./mp3/lazer.mp3" autoplay></audio>';
//     this.document.getElementById('shot').innerHTML=html;
// });
// window.addEventListener('mouseup',function(){
//     isShot=false;
//     this.document.getElementById('shot').innerHTML='';
// });

window.addEventListener('mousemove',function(event){
    x=event.offsetX;
    y=event.offsetY;
    plane.move(x,y);
    // freeBullet();
    // load();
});

function shotChicken(bullet){
    let n =chickenList.length;
    for(let i=0;i<n;i++){
        if(chickenList[i].status && chickenList[i].y < plane.y){
            if(bullet.x >= chickenList[i].x && 
                bullet.x + bullet.width <= chickenList[i].x+chickenList[i].width 
                && bullet.y <= chickenList[i].y + chickenList[i].height 
                && bullet.y >= chickenList[i].y){
                chickenList[i].status = false;
                fistTime=false;
                firework = new fireWork(chickenList[i].x+(chickenList[i].width/2),chickenList[i].y+(chickenList[i].height/2));
                if(percentLuck() < 25){
                    item_type = randomItem();
                    if(item_type === 1){
                        item_img.src = './img/gift1.png';
                    }
                    if(item_type === 2){
                        item_img.src = './img/gift2.png';
                    }
                    if(item_type === 3){
                        item_img.src = './img/gift3.png';
                    }
                    item = new Item(item_img,chickenList[i].x+(chickenList[i].width/2),chickenList[i].y+(chickenList[i].height/2));
                    items.push(item);
                }
                score++;
                html='<audio src="./mp3/boom.mp3" autoplay></audio>';
                document.getElementById('boom').innerHTML=html;
            }
        }
    }
}

function checkAllChickenDie(){
    for(let i=0;i<chickenList.length;i++){
        if(chickenList[i].status){
            return false;
        }
    }
    return true;
}

function levelUp(){
    if(checkAllChickenDie()){
        FreeChick();
        count++;
        if(count != 500){
            return;
        }else{
            count = 0;
            row++;
            if(row==2){
                chicken_img.push('InfiniChick.png');
            }
            if(row==3){
                chicken_img.push('starChick.png');
            }
            if(row==4){
                chicken_img.push('musicChick.png');
            }
            if(row == 5){
                row=1;
                alert('win');
                refresh();
            }
            createChicken();
        }
    }
}

function impactRock(rock){
    // alert(1);
    if(plane.y > rock.y){
        if(plane.x + plane.width >= rock.x && plane.x <= rock.x + rock.width
            && rock.y + rock.height >= plane.y){
                rock.status = false;
                plane.decreaseHealth();
        }
    }
}

function impactEgg(egg){
    // alert(1);
    if(plane.y > egg.y){
        if(plane.x + plane.width >= egg.x && plane.x <= egg.x + egg.width
            && egg.y + egg.height >= plane.y){
                egg.status = false;
                plane.decreaseHealth();
        }
    }
}

function impactChicken(chicken){
    // alert(1);
    if(plane.y > chicken.y){
        if(plane.x + plane.width >= chicken.x && plane.x <= chicken.x + chicken.width
            && chicken.y + chicken.height >= plane.y){
                chicken.dx = -chicken.dx;
                chicken.dy = -chicken.dy;
                plane.decreaseHealth();
        }
    }else{
        if(plane.x + plane.width >= chicken.x && plane.x <= chicken.x + chicken.width
            && plane.y + plane.height >= chicken.y){
                chicken.dx = -chicken.dx;
                chicken.dy = -chicken.dy;
                plane.decreaseHealth();
        }
    }
}

function displayInf(){

    ctx.drawImage(heart_img,30,30,heart_img.width,heart_img.height);
    
    let healthif = `x ${plane.health}`;
    let level_inf = `Level : ${row}`;
    ctx.font = "30px Arial";
    ctx.fillStyle = 'aqua';
    ctx.fillText(healthif,80,60);
    ctx.fillStyle = 'white';
    ctx.fillText(level_inf,canvas.width/1.2,60);
}

function isGameOver(){
    if(!plane.status){
        start = false;
        let html = 'Game Over :((';
        ctx.font = "60px Arial";
        ctx.fillStyle = 'yellow';
        ctx.fillText(html,canvas.width/2.8,canvas.height/2);
    }
}

function clear(){
    ctx.clearRect(0,0,W,H);
}

function pause(){
    cancelAnimationFrame(loop);
}

function refresh(){
    location.reload();
}