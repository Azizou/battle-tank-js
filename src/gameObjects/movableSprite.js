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
