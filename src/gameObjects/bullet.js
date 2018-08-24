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
