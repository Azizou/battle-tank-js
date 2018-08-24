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
