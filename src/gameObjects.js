/* global directions */

var module = module || {};

// A simplre rectangle class
var Rectangle = (function Rectangle() {
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
   * @param {Rectangle} anotherRect the other rectangular object that might overlap the current one
   * @param {function} callback
   */
  Rectangle.prototype.overlap = function overlap(anotherRect, callback) {
    if (this.x <= (anotherRect.x + anotherRect.w)
      && anotherRect.x <= (this.x + this.w)
      && this.y <= (anotherRect.y + anotherRect.h)
      && anotherRect.y <= (this.y + this.h)) {
      if (typeof callback === 'function') {
        callback();
      }
      return true;
    }
    return false;
  };

  Rectangle.ZERO = new Rectangle(0, 0, 0, 0);

  return Rectangle;
}());

var FillRect = (function FillRect() {
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
  return FillRect;
}());

// eslint-disable-next-line no-unused-vars
var StrokeRect = (function StrokeRect() {
  function StrokeRect(x, y, w, h, color) {
    Rectangle.call(this, x, y, w, h);
    this.color = color;
  }
  StrokeRect.prototype = Object.create(Rectangle.prototype);
  StrokeRect.prototype.constructor = StrokeRect;

  StrokeRect.prototype.draw = function draw(renderer) {
    var sStyle = renderer.strokeStyle;
    var ctx = renderer;
    ctx.strokeStyle = this.color;
    renderer.strokeStyle(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = sStyle;
  };

  return StrokeRect;
}());

var MovableObject = (function MovableObject() {
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
  return MovableObject;
}());

// eslint-disable-next-line no-unused-vars
var Sprite = (function Sprite() {
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

  // Sprite.prototype.overlap = function (anotherSprite, callback) {
  //   return Rectangle.overlap(this, anotherSprite, callback);
  // };
  return Sprite;
}());

// eslint-disable-next-line no-unused-vars
var MovableSprite = (function MovableSprite() {
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

  return MovableSprite;
}());

// eslint-disable-next-line no-unused-vars
var Bullet = (function Bullet() {
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

  return Bullet;
}());

// eslint-disable-next-line no-unused-vars
var SingleBullet = (function SingleBullet() {
  function SingleBullet(x, y, w, h, color, speed, step, direction) {
    Bullet.call(this, x, y, w, h, color, speed, step, direction);
  }
  SingleBullet.prototype = Object.create(Bullet.prototype);
  SingleBullet.prototype.constructor = SingleBullet;

  return SingleBullet;
}());

// eslint-disable-next-line no-unused-vars
var DualShotBullet = (function DualShotBullet() {
  function DualShotBullet(x, y, w, h, color, speed, step, direction, offset) {
    // Bullet.call(this, x, y, w, h, color, speed, step, direction);
    var x1; var x2; var y1; var y2;
    switch (this.direction) {
    case directions.EAST:
      x1 = x;
      x2 = x;
      y1 = y - offset;
      y2 = y + offset;
      break;
    case directions.WEST:
      x1 = x;
      x2 = x;
      y1 = y + offset;
      y2 = y - offset;
      break;
    case directions.NORTH:
      x1 = x - offset;
      x2 = x + offset;
      y1 = y;
      y2 = y;
      break;
    case directions.SOUTH:
      x1 = x + offset;
      x2 = x - offset;
      y1 = y;
      y2 = y;
      break;
    default:
      break;
    }
    this.bullet1 = new Bullet(x1, y1, w, h, color, speed, step, direction);
    this.bullet2 = new Bullet(x2, y2, w, h, color, speed, step, direction);
  }

  DualShotBullet.prototype = Object.create(Bullet.prototype);
  DualShotBullet.prototype.constructor = DualShotBullet;

  DualShotBullet.prototype.draw = function draw(renderer) {
    this.bullet1.draw(renderer);
    this.bullet2.draw(renderer);
  };

  DualShotBullet.prototype.update = function update() {
    this.bullet1.update();
    this.bullet2.update();
  };

  return DualShotBullet;
}());

module.exports = {
  Rectangle: Rectangle,
  Sprite: Sprite
};
