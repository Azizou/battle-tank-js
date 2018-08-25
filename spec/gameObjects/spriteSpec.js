// var Rectangle = require('../../gameObjects/rectangle');
var Rectangle = require('../../test-tmp/gameObjects/rectangle');
var Sprite = require('../../test-tmp/gameObjects/sprite');
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
