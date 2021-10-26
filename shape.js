class Shape {
    constructor(pos, colour, thing) {
      this.pos = pos;
      this.colour = colour;
      this.thing = thing;
    }
  
    show() {
      console.log("1");
      if (this.thing !== null) {
        stroke("white");
        line(this.pos.x, this.pos.y, this.thing.pos.x, this.thing.pos.y);
      }
      stroke('black');
    }
  }
  
  class FixedSquare extends Shape {
    show() {
      rectMode(CENTER);
  
      fill(this.colour);
      rect(this.pos.x, this.pos.y, 20, 20);
    }
  }
  
  class AniShape extends Shape {
    constructor(pos, colour, thing, value, delta) {
      super(pos, colour, thing);
      this.sequenceValue = value;
      this.sequenceDelta = delta;
    }
  
    Tick() {
      this.sequenceValue += this.sequenceDelta;
    }
  }
  
  class AniPoly extends AniShape{
    constructor(pos, colour, thing, value, delta, sideCount, spin = true){
      super(pos, colour, thing, value, delta);
      this.sideCount = sideCount;
      this.spin = spin;
      
    }
    
    show(){
      fill(this.colour);
      push();
      translate(this.pos.x, this.pos.y);
      if(this.spin == true){
       rotate(this.sequenceValue); 
      }
      polygon(0, 0, 25, this.sideCount);
      pop();
    }
  }
  
  class AniChild extends AniShape {
    constructor(pos, colour, thing, value, delta) {
      super(pos, colour, thing, value, delta);
      let distance = 0;
  
      distance = sqrt(
        pow(abs(this.pos.x - this.thing.pos.x), 2) +
          pow(abs(this.pos.y - this.thing.pos.y), 2)
      );
    }
  }
  
  class AniBall extends AniChild {
    constructor(colour, thing, value, delta) {
      super(thing.pos, colour, thing, value, delta);
    }
    show() {
      super.show();
      fill(this.colour);
      ellipse(this.pos.x, this.pos.y, 20, 20);
    }
  }
  
  class AniHighlight extends AniChild {
    constructor(colour, thing, value, delta) {
      super(thing.pos, colour, thing, value, delta);
    }
    show() {
      let x = this.pos.x + 35 * sin(this.sequenceValue/2);
      let y = this.pos.y + 35 * cos(this.sequenceValue/2);
  
      fill(this.colour);
      push();
      translate(x,y);
      rotate(-this.sequenceValue);
      polygon(0, 0, 25, 8);
      pop();
    }
  }
  
  class OrbitBall extends AniBall {
    constructor(colour, thing, value, delta, radius) {
      super(colour, thing, value, delta);
      this.bRadius = radius;
      this.colour = colour;
    }
  
    Tick() {
      super.Tick();
      let x = this.thing.pos.x + this.bRadius * cos(this.sequenceValue);
      let y = this.thing.pos.y + this.bRadius * sin(this.sequenceValue);
      this.pos = createVector(x, y);
    }
  }
  
  class VWobbleBall extends AniBall {
    constructor(colour, thing, value, delta, radius) {
      super(colour, thing, value, delta);
      this.bRadius = radius;
    }
  
    Tick() {
      super.Tick();
      let y = this.thing.pos.y + this.bRadius * sin(this.sequenceValue);
      this.pos = createVector(this.thing.pos.x, y);
    }
  }
  
  class HWobbleBall extends AniBall {
    constructor(colour, thing, value, delta, radius) {
      super(colour, thing, value, delta);
      this.bRadius = radius;
    }
  
    Tick() {
      super.Tick();
      let x = this.thing.pos.x + this.bRadius * cos(this.sequenceValue);
      this.pos = createVector(x, this.thing.pos.y);
    }
  }
  
  function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
  