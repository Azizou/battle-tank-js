(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Rectangle = require('../../test-tmp/gameObjects/rectangle');

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

},{"../../test-tmp/gameObjects/rectangle":4}],2:[function(require,module,exports){
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

},{"../../test-tmp/gameObjects/rectangle":4,"../../test-tmp/gameObjects/sprite":5}],3:[function(require,module,exports){
require('./gameObjects/rectangleSpec');
require('./gameObjects/spriteSpec');

},{"./gameObjects/rectangleSpec":1,"./gameObjects/spriteSpec":2}],4:[function(require,module,exports){

var __cov_kO0gcwxuIiMcjkZsjJUl3g = (Function('return this'))();
if (!__cov_kO0gcwxuIiMcjkZsjJUl3g.$$cov_1535201918722$$) { __cov_kO0gcwxuIiMcjkZsjJUl3g.$$cov_1535201918722$$ = {}; }
__cov_kO0gcwxuIiMcjkZsjJUl3g = __cov_kO0gcwxuIiMcjkZsjJUl3g.$$cov_1535201918722$$;
if (!(__cov_kO0gcwxuIiMcjkZsjJUl3g['/home/azizou/Projects/gameEngine/battleCity/src/gameObjects/rectangle.js'])) {
   __cov_kO0gcwxuIiMcjkZsjJUl3g['/home/azizou/Projects/gameEngine/battleCity/src/gameObjects/rectangle.js'] = {"path":"/home/azizou/Projects/gameEngine/battleCity/src/gameObjects/rectangle.js","s":{"1":1,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0},"b":{"1":[0,0],"2":[0,0,0,0],"3":[0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"Rectangle","line":1,"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":31}}},"2":{"name":"overlap","line":19,"loc":{"start":{"line":19,"column":30},"end":{"line":19,"column":70}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":12,"column":1}},"2":{"start":{"line":2,"column":2},"end":{"line":2,"column":13}},"3":{"start":{"line":3,"column":2},"end":{"line":3,"column":13}},"4":{"start":{"line":4,"column":2},"end":{"line":4,"column":13}},"5":{"start":{"line":5,"column":2},"end":{"line":5,"column":13}},"6":{"start":{"line":6,"column":2},"end":{"line":6,"column":15}},"7":{"start":{"line":7,"column":2},"end":{"line":7,"column":16}},"8":{"start":{"line":8,"column":2},"end":{"line":8,"column":21}},"9":{"start":{"line":9,"column":2},"end":{"line":9,"column":22}},"10":{"start":{"line":10,"column":2},"end":{"line":10,"column":29}},"11":{"start":{"line":11,"column":2},"end":{"line":11,"column":29}},"12":{"start":{"line":19,"column":0},"end":{"line":31,"column":2}},"13":{"start":{"line":20,"column":2},"end":{"line":29,"column":3}},"14":{"start":{"line":25,"column":4},"end":{"line":27,"column":5}},"15":{"start":{"line":26,"column":6},"end":{"line":26,"column":17}},"16":{"start":{"line":28,"column":4},"end":{"line":28,"column":16}},"17":{"start":{"line":30,"column":2},"end":{"line":30,"column":15}},"18":{"start":{"line":33,"column":0},"end":{"line":33,"column":43}},"19":{"start":{"line":35,"column":0},"end":{"line":35,"column":27}}},"branchMap":{"1":{"line":20,"type":"if","locations":[{"start":{"line":20,"column":2},"end":{"line":20,"column":2}},{"start":{"line":20,"column":2},"end":{"line":20,"column":2}}]},"2":{"line":20,"type":"binary-expr","locations":[{"start":{"line":20,"column":6},"end":{"line":20,"column":47}},{"start":{"line":21,"column":7},"end":{"line":21,"column":41}},{"start":{"line":22,"column":7},"end":{"line":22,"column":48}},{"start":{"line":23,"column":7},"end":{"line":23,"column":41}}]},"3":{"line":25,"type":"if","locations":[{"start":{"line":25,"column":4},"end":{"line":25,"column":4}},{"start":{"line":25,"column":4},"end":{"line":25,"column":4}}]}}};
}
__cov_kO0gcwxuIiMcjkZsjJUl3g = __cov_kO0gcwxuIiMcjkZsjJUl3g['/home/azizou/Projects/gameEngine/battleCity/src/gameObjects/rectangle.js'];
function Rectangle(x,y,w,h){__cov_kO0gcwxuIiMcjkZsjJUl3g.f['1']++;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['2']++;this.w=w;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['3']++;this.h=h;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['4']++;this.x=x;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['5']++;this.y=y;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['6']++;this.top=y;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['7']++;this.left=x;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['8']++;this.right=x+w;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['9']++;this.bottom=y+h;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['10']++;this.centerX=x+w*0.5;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['11']++;this.centerY=y+h*0.5;}__cov_kO0gcwxuIiMcjkZsjJUl3g.s['12']++;Rectangle.prototype.overlap=function overlap(anotherRect,callback){__cov_kO0gcwxuIiMcjkZsjJUl3g.f['2']++;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['13']++;if((__cov_kO0gcwxuIiMcjkZsjJUl3g.b['2'][0]++,this.x<=anotherRect.x+anotherRect.w)&&(__cov_kO0gcwxuIiMcjkZsjJUl3g.b['2'][1]++,anotherRect.x<=this.x+this.w)&&(__cov_kO0gcwxuIiMcjkZsjJUl3g.b['2'][2]++,this.y<=anotherRect.y+anotherRect.h)&&(__cov_kO0gcwxuIiMcjkZsjJUl3g.b['2'][3]++,anotherRect.y<=this.y+this.h)){__cov_kO0gcwxuIiMcjkZsjJUl3g.b['1'][0]++;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['14']++;if(typeof callback==='function'){__cov_kO0gcwxuIiMcjkZsjJUl3g.b['3'][0]++;__cov_kO0gcwxuIiMcjkZsjJUl3g.s['15']++;callback();}else{__cov_kO0gcwxuIiMcjkZsjJUl3g.b['3'][1]++;}__cov_kO0gcwxuIiMcjkZsjJUl3g.s['16']++;return true;}else{__cov_kO0gcwxuIiMcjkZsjJUl3g.b['1'][1]++;}__cov_kO0gcwxuIiMcjkZsjJUl3g.s['17']++;return false;};__cov_kO0gcwxuIiMcjkZsjJUl3g.s['18']++;Rectangle.ZERO=new Rectangle(0,0,0,0);__cov_kO0gcwxuIiMcjkZsjJUl3g.s['19']++;module.exports=Rectangle;

},{}],5:[function(require,module,exports){

var __cov_stKkFB6r1G8W$B$OIFv7vw = (Function('return this'))();
if (!__cov_stKkFB6r1G8W$B$OIFv7vw.$$cov_1535201918722$$) { __cov_stKkFB6r1G8W$B$OIFv7vw.$$cov_1535201918722$$ = {}; }
__cov_stKkFB6r1G8W$B$OIFv7vw = __cov_stKkFB6r1G8W$B$OIFv7vw.$$cov_1535201918722$$;
if (!(__cov_stKkFB6r1G8W$B$OIFv7vw['/home/azizou/Projects/gameEngine/battleCity/src/gameObjects/sprite.js'])) {
   __cov_stKkFB6r1G8W$B$OIFv7vw['/home/azizou/Projects/gameEngine/battleCity/src/gameObjects/sprite.js'] = {"path":"/home/azizou/Projects/gameEngine/battleCity/src/gameObjects/sprite.js","s":{"1":0,"2":0,"3":0,"4":1,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"Sprite","line":6,"loc":{"start":{"line":6,"column":0},"end":{"line":6,"column":55}}},"2":{"name":"loadImage","line":15,"loc":{"start":{"line":15,"column":29},"end":{"line":15,"column":50}}},"3":{"name":"onload","line":17,"loc":{"start":{"line":17,"column":22},"end":{"line":17,"column":48}}},"4":{"name":"draw","line":26,"loc":{"start":{"line":26,"column":24},"end":{"line":26,"column":46}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":39}},"2":{"start":{"line":3,"column":0},"end":{"line":3,"column":54}},"3":{"start":{"line":4,"column":0},"end":{"line":4,"column":38}},"4":{"start":{"line":6,"column":0},"end":{"line":12,"column":1}},"5":{"start":{"line":7,"column":2},"end":{"line":7,"column":35}},"6":{"start":{"line":8,"column":2},"end":{"line":8,"column":23}},"7":{"start":{"line":9,"column":2},"end":{"line":9,"column":20}},"8":{"start":{"line":10,"column":2},"end":{"line":10,"column":39}},"9":{"start":{"line":11,"column":2},"end":{"line":11,"column":19}},"10":{"start":{"line":15,"column":0},"end":{"line":24,"column":2}},"11":{"start":{"line":16,"column":2},"end":{"line":16,"column":27}},"12":{"start":{"line":17,"column":2},"end":{"line":22,"column":4}},"13":{"start":{"line":18,"column":4},"end":{"line":18,"column":22}},"14":{"start":{"line":19,"column":4},"end":{"line":21,"column":5}},"15":{"start":{"line":20,"column":6},"end":{"line":20,"column":47}},"16":{"start":{"line":23,"column":2},"end":{"line":23,"column":28}},"17":{"start":{"line":26,"column":0},"end":{"line":28,"column":2}},"18":{"start":{"line":27,"column":2},"end":{"line":27,"column":63}},"19":{"start":{"line":30,"column":0},"end":{"line":30,"column":24}}},"branchMap":{"1":{"line":19,"type":"if","locations":[{"start":{"line":19,"column":4},"end":{"line":19,"column":4}},{"start":{"line":19,"column":4},"end":{"line":19,"column":4}}]}}};
}
__cov_stKkFB6r1G8W$B$OIFv7vw = __cov_stKkFB6r1G8W$B$OIFv7vw['/home/azizou/Projects/gameEngine/battleCity/src/gameObjects/sprite.js'];
__cov_stKkFB6r1G8W$B$OIFv7vw.s['1']++;var Rectangle=require('./rectangle');__cov_stKkFB6r1G8W$B$OIFv7vw.s['2']++;Sprite.prototype=Object.create(Rectangle.prototype);__cov_stKkFB6r1G8W$B$OIFv7vw.s['3']++;Sprite.prototype.constructor=Sprite;function Sprite(x,y,w,h,imagePath,onLoadCallback){__cov_stKkFB6r1G8W$B$OIFv7vw.f['1']++;__cov_stKkFB6r1G8W$B$OIFv7vw.s['5']++;Rectangle.call(this,x,y,w,h);__cov_stKkFB6r1G8W$B$OIFv7vw.s['6']++;this.src=imagePath;__cov_stKkFB6r1G8W$B$OIFv7vw.s['7']++;this.ready=true;__cov_stKkFB6r1G8W$B$OIFv7vw.s['8']++;this.onLoadCallback=onLoadCallback;__cov_stKkFB6r1G8W$B$OIFv7vw.s['9']++;this.loadImage();}__cov_stKkFB6r1G8W$B$OIFv7vw.s['10']++;Sprite.prototype.loadImage=function loadImage(){__cov_stKkFB6r1G8W$B$OIFv7vw.f['2']++;__cov_stKkFB6r1G8W$B$OIFv7vw.s['11']++;this.image=new Image();__cov_stKkFB6r1G8W$B$OIFv7vw.s['12']++;this.image.onload=function onload(response){__cov_stKkFB6r1G8W$B$OIFv7vw.f['3']++;__cov_stKkFB6r1G8W$B$OIFv7vw.s['13']++;this.ready=true;__cov_stKkFB6r1G8W$B$OIFv7vw.s['14']++;if(typeof this.onLoadCallback==='function'){__cov_stKkFB6r1G8W$B$OIFv7vw.b['1'][0]++;__cov_stKkFB6r1G8W$B$OIFv7vw.s['15']++;this.onLoadCallback.call(null,response);}else{__cov_stKkFB6r1G8W$B$OIFv7vw.b['1'][1]++;}};__cov_stKkFB6r1G8W$B$OIFv7vw.s['16']++;this.image.src=this.src;};__cov_stKkFB6r1G8W$B$OIFv7vw.s['17']++;Sprite.prototype.draw=function draw(render){__cov_stKkFB6r1G8W$B$OIFv7vw.f['4']++;__cov_stKkFB6r1G8W$B$OIFv7vw.s['18']++;render.drawImage(this.image,this.x,this.y,this.w,this.h);};__cov_stKkFB6r1G8W$B$OIFv7vw.s['19']++;module.exports=Sprite;

},{"./rectangle":4}]},{},[3]);
