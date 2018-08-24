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
