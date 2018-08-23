/*global directions SingleBullet MovableSprite*/

var orangeTank = new Image();
// var greenTank = new Image();
var singleBullet = new SingleBullet(300, 300, 10, 10, 'black', 1, 1,2);
var movingS = new MovableSprite(300, 150, 50, 50, 'images/greenTank.jpg',undefined, 10,10,3);
var mainTank = new MovableSprite(300, 300, 50, 50, 'images/orangeTank.jpg',undefined, 1,10,3);
function init() {
  orangeTank.src = 'images/orangeTank.jpg';
  // greenTank.src = 'images/greenTank.jpg';
  window.requestAnimationFrame(loop);
}

var bullet = {
  x: 0,
  y: 0,
  radius: 5,
  color: 'black',
  // eslint-disable-next-line no-undef
  direction: directions.EAST,
  speed: 10,
  frequency: 100,
};

// eslint-disable-next-line no-undef
var bullets = new Set();
var ctx;

function draw() {
  ctx = document.getElementById('canvas').getContext('2d');

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // effacer le canvas
  // ctx.save();
  // ctx.translate(player1.x + player1.width / 2, player1.y + player1.height / 2);
  // ctx.rotate(getAngle(player1.direction));
  // ctx.fillRect(-player1.width / 2 - 10, -player1.height / 2 - 10, player1.width + 20, player1.height + 20);
  // ctx.drawImage(orangeTank, -player1.width / 2, -player1.height / 2, player1.width, player1.height);
  // ctx.restore();
  singleBullet.draw(ctx);
  movingS.draw(ctx);
  mainTank.draw(ctx);
  bullets.forEach(function (bullet) {
    // if (bullet.visible) {
    if (bullet instanceof SingleBullet){
      bullet.draw(ctx);
    }
    var cf = ctx.fillStyle;
    ctx.fillStyle = bullet.color;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = cf;
    // }
  });
}

var timeC = 0;
var aiTimer = 0;

function update(dt) {
  timeC++;
  aiTimer++;
  if (timeC == dt) {
    timeC = 0;
    bullets.forEach(function (bullet) {
      if (bullet.visible) {
        bullet.x += (bullet.direction === directions.EAST ? bullet.speed : (bullet.direction === directions.WEST ? -bullet.speed : 0));
        bullet.y += (bullet.direction === directions.NORTH ? -bullet.speed : (bullet.direction === directions.SOUTH ? bullet.speed : 0));

        if (bullet.x >= ctx.canvas.width || bullet.x < 0 || bullet.y >= ctx.canvas.height || bullet.y < 0) bullets.delete(bullet);
      }
    });
  }
  singleBullet.update();
  bullets.forEach(function (bullet) {
    if(bullet instanceof SingleBullet){
      bullet.update();
    }
  });

  if (aiTimer == 16 * dt) {
    aiTimer = 0;
    // movingS.direction = Math.floor(Math.random() * 4);
    movingS.direction = aiHelper(movingS, mainTank);
    // updatePlayerInfo(player2, aiHelper());
  }
  movingS.update();

}

function loop() {
  update(1);
  draw();
  window.requestAnimationFrame(loop);
}
var t = Date.now();
addEventListener('keydown', function (event) {
  // console.log(event.key);
  switch (event.key) {
  case 'w':
  case 'ArrowUp':
  case 'W':
    mainTank.direction = directions.NORTH;
    mainTank.updatePosition();
    // updatePlayerInfo(player1, directions.NORTH);
    break;
  case 's':
  case 'ArrowDown':
  case 'S':
    mainTank.direction = directions.SOUTH;
    mainTank.updatePosition();
    // updatePlayerInfo(player1, directions.SOUTH);
    break;
  case 'a':
  case 'ArrowLeft':
  case 'A':
    mainTank.direction = directions.WEST;
    mainTank.updatePosition();
    // updatePlayerInfo(player1, directions.WEST);
    break;
  case 'd':
  case 'ArrowRight':
  case 'D':
    mainTank.direction = directions.EAST;
    mainTank.updatePosition();
    // updatePlayerInfo(player1, directions.EAST);
    break;
  case ' ':
    var dtt = Date.now() - t;
    if (dtt > bullet.frequency) {
      // var bb1 = Object.assign({}, bullet);
      // var bb2 = Object.assign({}, bullet);
      // var bb3 = Object.assign({}, bullet);
      // bb1.x = player1.x + player1.width * 0.5 - (player1.direction < 2 ? 5 : 0);
      // bb2.x = player1.x + player1.width * 0.5 + (player1.direction < 2 ? 5 : 0);
      // bb3.x = player2.x + player2.width * 0.5 + (player2.direction < 2 ? 5 : 0);
      // bb1.y = player1.y + player1.height * 0.5 - (player1.direction < 2 ? 0 : 5);
      // bb2.y = player1.y + player1.height * 0.5 + (player1.direction < 2 ? 0 : 5);
      // bb3.y = player2.y + player2.height * 0.5 + (player2.direction < 2 ? 0 : 5);
      // bb1.direction = player1.direction;
      // bb2.direction = player1.direction;
      // bb3.direction = player2.direction;
      // bb1.visible = true;
      // bb2.visible = true;
      // bb3.visible = true;
      // bb1.color = 'rgb('+Math.floor(Math.random() * 256)+',' + Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256)+')';
      // bb2.color = 'rgb('+Math.floor(Math.random() * 256)+',' + Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256)+')';
      // bb3.color = 'rgb('+Math.floor(Math.random() * 256)+',' + Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256)+')';
      // bb2 = new SingleBullet(bb2.x,bb2.y,bb2.radius,bb2.radius,bb2.color,bb2.speed,5,bb2.direction);
      // bullets.add(Object.assign({}, bb1));
      // bullets.add(Object.assign({}, bb2));
      // bullets.add(Object.assign({}, bb3));
      t = Date.now();
    }
    break;
  }
  // console.log(player1);
});


function aiHelper(player2, player1) {
  if (!(Math.abs(player1.x - player2.x) > 50 && Math.abs(player1.y - player2.y) > 50)) {
    if (player1.x < player2.x) {
      return directions.WEST;
    } else if (player1.x > player2.x) {
      return directions.EAST;
    } else if (player1.y < player2.y) {
      return directions.NORTH;
    } else if (player1.y > player2.y) {
      return directions.SOUTH;
    }
  } else {
    return Math.floor(Math.random() * 4);
  }
}

// function overlap(rectA, rectB) {
//   return rectA.x < (rectB.x + rectB.width) &&
//     rectB.x < (rectA.x + rectA.width) &&
//     rectA.y < (rectB.y + rectB.height) &&
//     rectB.y < (rectA.y + rectA.height);
// }
init();
