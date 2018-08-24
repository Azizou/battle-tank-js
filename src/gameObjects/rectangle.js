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
