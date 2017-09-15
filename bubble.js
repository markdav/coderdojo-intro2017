function Bubble(p, x, y) {
  this.pos = p.createVector(p.random(p.width), p.random(p.height));
  this.target = p.createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = p.createVector();
  this.r = 8;
  this.maxspeed = 10;
  this.maxforce = 1;
  this.col = p.random() > 0.5 ? "green" : "red";
  this.p=p;
}

Bubble.prototype.behaviors = function() {
  var arrive = this.arrive(this.target);
  var mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
  var flee = this.flee(mouse);

  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Bubble.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Bubble.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Bubble.prototype.show = function() {
  this.p.stroke(this.col);
  this.p.strokeWeight(this.r);
  this.p.point(this.pos.x, this.pos.y);
}

Bubble.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = this.p.map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Bubble.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return this.p.createVector(0, 0);
  }
}
