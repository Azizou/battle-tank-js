var btank = new Image();
var rtank = new Image();
var orangeTank = new Image();
var greenTank = new Image();
var ibullet = new Image();
var background = new Image();
function init(){
//  btank.src = 'images/btank.png';
  orangeTank.src = 'images/orangeTank.jpg';
  greenTank.src = 'images/greenTank.jpg';
//  btank.src = 'images/rtank.png';
//  background.src = 'images/background.png';
  window.requestAnimationFrame(loop);
}
var directions = {NORTH:0, SOUTH:1,EAST:2,WEST:3}

var bullet = { x:0, y:0, radius: 5, color:'black', direction:directions.EAST, speed:10, frequency:100};
var bullets = new Set();

var player1 = { x:200, y:200, width: 50, height: 60, direction: directions.NORTH, color:'black', step:10}
var player2 = { x:400, y:300, width: 50, height: 60, direction: directions.EAST, color:'black', step:10}
var ctx;
function draw() {
  ctx = document.getElementById('canvas').getContext('2d');

  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); // effacer le canvas
  ctx.save()
  ctx.translate(player1.x + player1.width/2, player1.y + player1.height/2)
  ctx.rotate(getAngle(player1.direction))
  ctx.drawImage(orangeTank,-player1.width/2,-player1.height/2,player1.width,player1.height);
  ctx.restore();
  ctx.save()
  ctx.translate(player2.x + player2.width/2, player2.y + player2.height/2)
  ctx.rotate(getAngle(player2.direction))
  ctx.drawImage(greenTank,-player2.width/2,-player2.height/2,player2.width,player2.height);
  ctx.restore();
  bullets.forEach(bullet => {
    if(bullet.visible){
      var cf = ctx.fillStyle;
      ctx.fillStyle = bullet.color;
      ctx.beginPath();
      ctx.arc(bullet.x,bullet.y,bullet.radius,0,2*Math.PI);
      ctx.fill();
      ctx.fillStyle = cf;  
    }
  });

}

function getAngle(direction){
  let res = 0;
  switch(direction){
    case directions.NORTH: res = 0;break;
    case directions.SOUTH: res = Math.PI;break;
    case directions.EAST: res = Math.PI/2;break;
    case directions.WEST: res = -Math.PI/2;break;
  }
  return res;
}

var timeC = 0;
var aiTimer = 0;
function update(dt){
    timeC++;
  aiTimer++;
    if(timeC == dt){
        timeC = 0;
        bullets.forEach(bullet => {
        if(bullet.visible){
            bullet.x += (bullet.direction === directions.EAST ? bullet.speed : (bullet.direction === directions.WEST ? -bullet.speed : 0));  
            bullet.y += (bullet.direction === directions.NORTH ? -bullet.speed : (bullet.direction === directions.SOUTH ? bullet.speed : 0));

          if(bullet.x >= ctx.canvas.width || bullet.x < 0 || bullet.y >= ctx.canvas.height || bullet.y < 0) bullets.delete(bullet);
        }
        });
    }
  
  if(aiTimer == 3*dt){
    aiTimer=0;
        updatePlayerInfo(player2, aiHelper());    
  }
}

function loop(){
    update(1);
    draw();
    window.requestAnimationFrame(loop);
}
var t = Date.now();
addEventListener('keydown', (event) => {
    console.log(event.key);
    switch(event.key){
      case 'w':
      case 'ArrowUp':
      case 'W': updatePlayerInfo(player1, directions.NORTH);
        break;
      case 's':
      case 'ArrowDown':
      case 'S': updatePlayerInfo(player1, directions.SOUTH);
        break;
      case 'a':
      case 'ArrowLeft':
      case 'A': updatePlayerInfo(player1, directions.WEST);
        break;
      case 'd':
      case 'ArrowRight':
      case 'D': updatePlayerInfo(player1, directions.EAST);
        break;
      case ' ': 
        var dtt = Date.now() - t;
        if(dtt > bullet.frequency){
          let bb1 = Object.assign({},bullet);
          let bb2 = Object.assign({},bullet);
          let bb3 = Object.assign({},bullet);
          bb1.x = player1.x + player1.width*0.5 - (player1.direction <2 ?  5 : 0);
          bb2.x = player1.x + player1.width*0.5 + (player1.direction <2 ?  5 : 0);
          bb3.x = player2.x + player2.width*0.5 + (player2.direction <2 ?  5 : 0);
          bb1.y = player1.y + player1.height*0.5 - (player1.direction <2 ?  0 : 5); 
          bb2.y = player1.y + player1.height*0.5 + (player1.direction <2 ?  0 : 5);
          bb3.y = player2.y + player2.height*0.5 + (player2.direction <2 ?  0 : 5);
          bb1.direction = player1.direction;
          bb2.direction = player1.direction;
          bb3.direction = player2.direction;
          bb1.visible = true;
          bb2.visible = true;
          bb3.visible = true;
          bb1.color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
          bb2.color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
          bb3.color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
          bullets.add(Object.assign({},bb1));
          bullets.add(Object.assign({},bb2));
          bullets.add(Object.assign({},bb3));
          console.log(bullets);
          t = Date.now();
        }
        break;
    }
    console.log(player1);
});

function updatePlayerInfo(player, direction){
  player.direction = direction;
  player.x += (direction === directions.EAST ? player.step : (direction === directions.WEST ? -player.step : 0));  
  player.y += (direction === directions.NORTH ? -player.step : (direction === directions.SOUTH ? player.step : 0)); 
}

function aiHelper(){
  if( !(Math.abs(player1.x - player2.x) > 50 && Math.abs(player1.y - player2.y) > 50) ){
    if(player1.x < player2.x){
      return directions.WEST;
    }  
    else if(player1.x > player2.x){
      return directions.EAST;
    }  
    else if(player1.y < player2.y){
      return  directions.NORTH;
    } else  if(player1.y > player2.y){
      return  directions.SOUTH;
    }
  }
  else {
    return  Math.floor(Math.random()*4);
  }
}
init();