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
