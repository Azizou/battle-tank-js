(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var FillRect = require('./fillRect');
var MovableObject = require('./movableObject');
var directions = require('../globals');


Bullet.prototype = Object.create(FillRect.prototype);
Object.assign(Bullet.prototype, MovableObject.prototype);
Bullet.prototype.constructor = Bullet;

function Bullet(x, y, w, h, color, speed, step, direction) {
  // eslint-disable-next-line no-param-reassign
  if (direction === undefined) direction = directions.EAST;
  FillRect.call(this, x, y, w, h, color);
  MovableObject.call(this, x, y, speed, direction, step, step);
}

Bullet.prototype.destroy = function destroy() {
  this.dead = true;
};

Bullet.prototype.draw = function draw(renderer) {
  if (!this.dead) {
    FillRect.prototype.draw.call(this, renderer);
  }
};

module.exports = Bullet;

},{"../globals":7,"./fillRect":2,"./movableObject":3}],2:[function(require,module,exports){
var Rectangle = require('./rectangle');

function FillRect(x, y, w, h, color) {
  Rectangle.call(this, x, y, w, h);
  this.color = color;
}
FillRect.prototype = Object.create(Rectangle.prototype);
FillRect.prototype.constructor = FillRect;

FillRect.prototype.draw = function draw(renderer) {
  var rStyle = renderer.fillStyle;
  renderer.fillStyle = this.color;
  renderer.fillRect(this.x, this.y, this.w, this.h);
  renderer.fillStyle = rStyle;
};

module.exports = FillRect;

},{"./rectangle":5}],3:[function(require,module,exports){
var directions = require('../globals');
function MovableObject(x, y, dt, direction, stepX, stepY) {
  this.x = x;
  this.y = y;
  this.dt = dt;
  this.direction = direction;
  this.stepX = stepX;
  this.stepY = stepY;
  this.thicker = 0;
}

MovableObject.prototype.update = function update() {
  this.thicker += 1;
  if (this.thicker === this.dt) {
    this.thicker = 0;
    this.updatePosition();
  }
};

MovableObject.prototype.getAngle = function getAngle(direction) {
  var res = 0;
  switch (direction) {
  case directions.NORTH:
    res = 0;
    break;
  case directions.SOUTH:
    res = Math.PI;
    break;
  case directions.EAST:
    res = Math.PI / 2;
    break;
  case directions.WEST:
    res = -Math.PI / 2;
    break;
  default:
    break;
  }
  return res;
};

MovableObject.prototype.updatePosition = function updatePosition() {
  switch (this.direction) {
  case directions.EAST:
    this.x += this.stepX;
    break;
  case directions.WEST:
    this.x -= this.stepX;
    break;
  case directions.NORTH:
    this.y -= this.stepY;
    break;
  case directions.SOUTH:
    this.y += this.stepY;
    break;
  default:
    break;
  }
};

module.exports = MovableObject;

},{"../globals":7}],4:[function(require,module,exports){
var Sprite = require('./sprite');
var MovableObject = require('./movableObject');

MovableSprite.prototype = Object.create(Sprite.prototype);
Object.assign(MovableSprite.prototype, MovableObject.prototype);
MovableSprite.prototype.constructor = MovableSprite;

function MovableSprite(x, y, w, h, imagePath, onLoadCallback, speed, step, direction) {
  Sprite.call(this, x, y, w, h, imagePath, onLoadCallback);
  MovableObject.call(this, x, y, speed, direction, step, step);
}

MovableSprite.prototype.draw = function draw(renderer) {
  renderer.save();
  renderer.translate(this.x + this.w / 2, this.y + this.h / 2);
  renderer.rotate(this.getAngle(this.direction));
  renderer.drawImage(this.image, -this.w / 2, -this.h / 2, this.w, this.h);
  renderer.restore();
};

module.exports = MovableSprite;

},{"./movableObject":3,"./sprite":6}],5:[function(require,module,exports){
function Rectangle(x, y, w, h) {
  this.w = w;
  this.h = h;
  this.x = x;
  this.y = y;
  this.top = y;
  this.left = x;
  this.right = x + w;
  this.bottom = y + h;
  this.centerX = x + w * 0.5;
  this.centerY = y + h * 0.5;
}

/**
     * @param {Rectangle} anotherRect the other rectangular object
     * that might overlap the current one
     * @param {function} callback
     */
Rectangle.prototype.overlap = function overlap(anotherRect, callback) {
  if (this.x <= (anotherRect.x + anotherRect.w)
    && anotherRect.x <= (this.x + this.w)
    && this.y <= (anotherRect.y + anotherRect.h)
    && anotherRect.y <= (this.y + this.h)
  ) {
    if (typeof callback === 'function') {
      callback();
    }
    return true;
  }
  return false;
};

Rectangle.ZERO = new Rectangle(0, 0, 0, 0);

module.exports = Rectangle;

},{}],6:[function(require,module,exports){
var Rectangle = require('./rectangle');

Sprite.prototype = Object.create(Rectangle.prototype);
Sprite.prototype.constructor = Sprite;

function Sprite(x, y, w, h, imagePath, onLoadCallback) {
  Rectangle.call(this, x, y, w, h);
  this.src = imagePath;
  this.ready = true;
  this.onLoadCallback = onLoadCallback;
  this.loadImage();
}


Sprite.prototype.loadImage = function loadImage() {
  this.image = new Image();
  this.image.onload = function onload(response) {
    this.ready = true;
    if (typeof this.onLoadCallback === 'function') {
      this.onLoadCallback.call(null, response);
    }
  };
  this.image.src = this.src;
};

Sprite.prototype.draw = function draw(render) {
  render.drawImage(this.image, this.x, this.y, this.w, this.h);
};

module.exports = Sprite;

},{"./rectangle":5}],7:[function(require,module,exports){
// eslint-disable-next-line no-unused-vars
var directions = {
  NORTH: 0,
  SOUTH: 1,
  EAST: 2,
  WEST: 3
};

module.exports = directions;

},{}],8:[function(require,module,exports){
var Bullet = require('./gameObjects/bullet');
var MovableSprite = require('./gameObjects/movableSprite');
var directions = require('./globals');
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

var ctx;

var orangeTank = new Image();
// var greenTank = new Image();
var singleBullet = new Bullet(300, 300, 10, 10, 'black', 1, 1, 2);
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

},{"./gameObjects/bullet":1,"./gameObjects/movableSprite":4,"./globals":7}]},{},[8]);
