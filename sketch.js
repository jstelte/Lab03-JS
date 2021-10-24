let shape;
let shapes;

function setup() {
  createCanvas(1000, 700);
  frameRate(30);
  shapes = [];
  shapes.push(new FixedSquare(createVector(450, 500), "red", null));
  shapes.push(new FixedSquare(createVector(550, 500), "red", shapes[0]));
  AddOrbits();
  AddWobbleBalls();
  AddBlockOrbit();
  AddHBalls();
  AddTopRow();
  shapes.push(
    new AniPoly(createVector(100, 300), "tomato", null, 3, 0.1, 3, true)
  );
  shapes.push(
    new AniPoly(createVector(135, 300), "tomato", null, 3, -0.1, 3, true)
  );
  shapes.push(
    new AniPoly(createVector(170, 300), "tomato", null, 3, 0.1, 3, true)
  );
  AddHighlight();
}

function draw() {
  background(220);
  for (let i = 0; i < shapes.length; i++) {
    if (Check(shapes[i])) {
      shapes[i].Tick();
    }
    shapes[i].show();
  }
}

function AddOrbits() {
  local = [];
  local.push(new OrbitBall("yellow", shapes[1], 1, 0.05, 50));
  local.push(new OrbitBall("pink", local[0], 1, 0.075, 50));
  local.push(new OrbitBall("blue", local[1], 1, 0.1, 50));
  local.push(new OrbitBall("green", local[2], 1, 0.125, 50));
  shapes = shapes.concat(local);

  local = [];

  local.push(new OrbitBall("yellow", shapes[0], PI, -0.1, 50));
  local.push(new OrbitBall("pink", local[0], PI, -0.15, 50));
  local.push(new OrbitBall("blue", local[1], PI, -0.2, 50));
  local.push(new OrbitBall("green", local[2], PI, -0.25, 50));
  shapes = shapes.concat(local);
}

function AddTopRow() {
  localA = [];
  localB = [];

  for (let i = 50; i < 1000; i += 50) {
    localA.push(new FixedSquare(createVector(i, 100), "cyan", null));
  }
  shapes = shapes.concat(localA);
  let so = 0;
  for (let l = 0; l < localA.length; l++) {
    localB.push(
      new VWobbleBall("purple", localA[l], (so += 0.7), 0.1, 50, false)
    );
  }
  shapes = shapes.concat(localB);
}

function AddWobbleBalls() {
  local = [];
  local.push(new FixedSquare(createVector(200, 500), "cyan", null));
  local.push(new VWobbleBall("red", local[0], 1, 0.1, 100));
  local.push(new HWobbleBall("red", local[1], 1, 0.15, 100));
  local.push(new OrbitBall("blue", local[2], 1, 0.2, 25));
  shapes = shapes.concat(local);
}

function AddBlockOrbit() {
  local = [];
  local.push(new FixedSquare(createVector(800, 500), "cyan", null));
  local.push(new OrbitBall("yellow", local[0], 0, 0.1, 30));
  local.push(new OrbitBall("yellow", local[0], PI / 2, 0.1, 30));
  local.push(new OrbitBall("yellow", local[0], PI, 0.1, 30));
  local.push(new OrbitBall("yellow", local[0], (3 * PI) / 2, 0.1, 30));
  local.push(new OrbitBall("yellow", local[0], 0, -0.05, 60));
  local.push(new OrbitBall("yellow", local[0], PI / 2, -0.05, 60));
  local.push(new OrbitBall("yellow", local[0], 3 * PI, -0.05, 60));
  local.push(new OrbitBall("yellow", local[0], (3 * PI) / 2, -0.05, 60));
  local.push(new OrbitBall("yellow", local[0], 0, 0.025, 90));
  local.push(new OrbitBall("yellow", local[0], PI / 2, 0.025, 90));
  local.push(new OrbitBall("yellow", local[0], PI, 0.025, 90));
  local.push(new OrbitBall("yellow", local[0], (3 * PI) / 2, 0.025, 90));
  shapes = shapes.concat(local);
}

function AddHBalls() {
  local = [];
  local.push(new FixedSquare(createVector(500, 200), "red", null));
  for (let i = 1; i < 20; i++) {
    local.push(new HWobbleBall("orange", local[i - 1], 1, 0.1, 25));
  }

  shapes = shapes.concat(local);
}

function AddHighlight() {
  local = [];
  local.push(new FixedSquare(createVector(800, 300), "coral", null));
  local.push(new AniHighlight("yellow", local[0], 30, -0.2));

  shapes = shapes.concat(local);
}

function Check(thing) {
  return AniShape.prototype.isPrototypeOf(thing);
}
