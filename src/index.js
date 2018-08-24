/* global directions SingleBullet MovableSprite */
var module = module || {};
var bullet = {
  x: 0,
  y: 0,
  radius: 5,
  color: 'black',
  // eslint-disable-next-line no-undef
  direction: directions.EAST,
  speed: 10,
  frequency: 100
};

var aiTimer = 0;
var t = Date.now();

// eslint-disable-next-line no-undef
var bullets = new Set();
var ctx;

var orangeTank = new Image();
// var greenTank = new Image();
var singleBullet = new SingleBullet(300, 300, 10, 10, 'black', 1, 1, 2);
var movingS = new MovableSprite(300, 150, 50, 50, 'images/greenTank.jpg', undefined, 10, 2, 3);
var mainTank = new MovableSprite(300, 300, 50, 50, 'images/orangeTank.jpg', undefined, 1, 10, 3);
function init() {
  orangeTank.src = 'images/orangeTank.jpg';
  // greenTank.src = 'images/greenTank.jpg';
  window.requestAnimationFrame(loop);
}

function draw() {
  ctx = document.getElementById('canvas').getContext('2d');

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // effacer le canvas
  singleBullet.draw(ctx);
  movingS.draw(ctx);
  mainTank.draw(ctx);
}

function update(dt) {
  aiTimer++;
  singleBullet.update();
  bullets.forEach(function (bullet) {
    if (bullet instanceof SingleBullet) {
      bullet.update();
    }
  });

  if (aiTimer === 16 * dt) {
    aiTimer = 0;
    movingS.direction = aiHelper(movingS, mainTank);
  }
  movingS.update();
}

function loop() {
  update(1);
  draw();
  window.requestAnimationFrame(loop);
}

// eslint-disable-next-line no-restricted-globals
addEventListener('keydown', function (event) {
  // console.log(event.key);
  var dtt;
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
    dtt = Date.now() - t;
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
      // bullets.add(Object.assign({}, bb1));
      // bullets.add(Object.assign({}, bb2));
      // bullets.add(Object.assign({}, bb3));
      t = Date.now();
    }
    break;
  default:
    break;
  }
  // console.log(player1);
});


function aiHelper(player2, player1) {
  if (!(Math.abs(player1.x - player2.x) > 50 && Math.abs(player1.y - player2.y) > 50)) {
    if (player1.x < player2.x) {
      return directions.WEST;
    }
    if (player1.x > player2.x) {
      return directions.EAST;
    }
    if (player1.y < player2.y) {
      return directions.NORTH;
    }
    return directions.SOUTH;
  }
  return undefined;
}
init();
