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
