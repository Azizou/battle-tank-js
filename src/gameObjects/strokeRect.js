var Rectangle = require('./rectangle');
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

module.exports = StrokeRect;
