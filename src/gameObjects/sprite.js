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
