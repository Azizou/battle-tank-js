(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Rectangle = require('../../src/gameObjects/rectangle');

describe('Rectangle', function () {
  var rect;
  it('should construct', function () {
    rect = new Rectangle(0, 0, 0, 0);
    expect(rect).toBeTruthy();
  });

  it('should compute corners and center point correctly', function () {
    rect = new Rectangle(1, 1, 1, 1);
    expect(rect.left).toBe(1);
    expect(rect.top).toBe(1);
    expect(rect.right).toBe(2);
    expect(rect.bottom).toBe(2);
    expect(rect.centerX).toBe(1.5);
    expect(rect.centerY).toBe(1.5);
  });

  describe('Rectangle#overlap', function () {
    var rect1;
    var rect2;
    var onOverlapCallback;
    it('should have the method overlap', function () {
      rect1 = Rectangle.ZERO;
      expect(rect1.overlap).toBeDefined();
      expect(typeof rect1.overlap).toBe('function');
    });

    it('should return true when 2 rectangles overlap', function () {
      rect1 = new Rectangle(0, 0, 1, 1);
      rect2 = new Rectangle(0.5, 0.5, 1.5, 1.5);
      expect(rect1.overlap(rect2, undefined)).toBe(true);
    });

    it('should return false when 2 rectangles do not overlap', function () {
      rect1 = new Rectangle(0, 0, 1, 1);
      rect2 = new Rectangle(1.01, 1, 1.5, 1.5);
      expect(rect1.overlap(rect2, undefined)).toBe(false);
    });

    it('should return true when 2 rectangles touches', function () {
      rect1 = new Rectangle(0, 0, 1, 1);
      rect2 = new Rectangle(1, 1, 1.5, 1.5);
      expect(rect1.overlap(rect2, undefined)).toBe(true);
    });

    it('should invoke the callback when 2 rectangles overlap', function () {
      rect1 = new Rectangle(0, 0, 1, 1);
      rect2 = new Rectangle(0.5, 0.5, 1.5, 1.5);
      onOverlapCallback = jasmine.createSpy('onOverlapCallback');
      expect(rect1.overlap(rect2, onOverlapCallback)).toBe(true);
      expect(onOverlapCallback).toHaveBeenCalled();
    });

    it('should not invoke the callback when 2 rectangles do not overlap', function () {
      rect1 = new Rectangle(0, 0, 1, 1);
      rect2 = new Rectangle(1.01, 1, 1.5, 1.5);
      onOverlapCallback = jasmine.createSpy('onOverlapCallback');
      expect(rect1.overlap(rect2, onOverlapCallback)).toBe(false);
      expect(onOverlapCallback).not.toHaveBeenCalled();
    });
  });
});

},{"../../src/gameObjects/rectangle":4}],2:[function(require,module,exports){
var Rectangle = require('../../src/gameObjects/rectangle');
var Sprite = require('../../src/gameObjects/sprite');
describe('Sprite', function () {
  var sprite;
  it('should construct', function () {
    sprite = new Sprite(0, 0, 0, 0, '../assets/rtank.png', undefined);
    expect(sprite).toBeTruthy();
  });

  it('should respond to Rectangle methods and properties', function () {
    sprite = new Sprite(1, 1, 1, 1);
    expect(sprite.left).toBe(1);
    expect(sprite.top).toBe(1);
    expect(sprite.right).toBe(2);
    expect(sprite.bottom).toBe(2);
    expect(sprite.centerX).toBe(1.5);
    expect(sprite.centerY).toBe(1.5);
  });
});

},{"../../src/gameObjects/rectangle":4,"../../src/gameObjects/sprite":5}],3:[function(require,module,exports){
require('./gameObjects/rectangleSpec');
require('./gameObjects/spriteSpec');

},{"./gameObjects/rectangleSpec":1,"./gameObjects/spriteSpec":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./rectangle":4}]},{},[3]);
