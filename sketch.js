
// Sketch 1
var sketch1_function = function (p) {
  p.setup = function () {
    var myCanvas = p.createCanvas(800, 600);
    myCanvas.parent('sketch1');
    p.noLoop();
  }

  p.draw = function () {
    p.fill(0, 255, 0)
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  }

  p.mouseMoved = function () {
    p.redraw();
  }
}
var sketch1 = new p5(sketch1_function);

var font;
var bubbles = [];

var mayo_function = function (p) {
  p.preload = function () {
    font = p.loadFont('AvenirNextLTPro-Demi.otf');
  }

  p.setup = function () {
    var myCanvas = p.createCanvas(800, 600);
    myCanvas.parent('sketch2');
    var points = font.textToPoints('Mayo!!', 100, 200, 192, {
      sampleFactor: 0.25
    });

    for (var i = 0; i < points.length; i++) {
      p.stroke(255);
      var pt = points[i];
      var bubble = new Bubble(p, pt.x, pt.y);
      bubbles.push(bubble);
    }
  }

  p.draw = function () {
    p.background(34);
    for (var i = 0; i < bubbles.length; i++) {
      var b = bubbles[i];
      b.behaviors();
      b.update();
      b.show();
    }
  }

}
var sketch2 = new p5(mayo_function);


