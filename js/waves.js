//draw into showcase p5.js

const particles = [];
let _particle;
let size = 1000;
const noiseRatio = 800;
const frameCount = 30;
const container = document.getElementById("showcase");
const colours = [
  "rgba(255, 30, 255,0.3)",
  "rgba(72, 84, 96,1)",
  "rgba(145, 168, 191,1)",
];
let colour = "";

function newPoint() {
  let x = random(container.offsetWidth);
  let y = random(container.offsetHeight);
  if (x === container.offsetWidth / 3 || y === container.offsetHeight - 120)
    newPoint();
  return { x, y };
}

function setup() {
  if (!container) return;
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent("showcase");
  let void_origin = createVector(
    container.offsetWidth / 3,
    container.offsetHeight - 120,
    2
  );
  let void_direction = createVector(cos(0), sin(0));
  particles.push(
    new Particles(void_origin, void_direction, 8, "rgba(81, 5, 153,1)", 4)
  );

  for (let i = 1; i < size; i++) {
    const { x, y } = newPoint();
    let origin = createVector(x, y, 2);
    let angle = 0; //any value to initialize
    let direction = createVector(cos(angle), sin(angle));
    let velocity = random(0.5, 5);
    particles.push(
      new Particles(
        origin,
        direction,
        velocity,
        colours[floor(random(3))],
        random(1, 3)
      )
    );
  }

  stroke("#2f3542");
  strokeWeight(2);
  frameRate(frameCount);
}

function windowResized() {
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function mouseClicked() {
  noiseSeed(random(0, 5));
  size = 100;
}

function draw() {
  background("rgba(255, 255, 255,0.1)");
  for (let i = 0; i < particles.length; i++) {
    particles[i].init();
  }
}

class Particles {
  constructor(_position, _direction, _velocity, _colour, _size) {
    this.position = _position;
    this.direction = _direction;
    this.velocity = _velocity;
    this.singularity = 0;
    this.colour = _colour;
    this.size = _size;
  }
  init() {
    this.move();
    this.inBound();
    strokeWeight(this.size);
    stroke(`${this.colour}`);
    noFill();
    this.update();
  }
  move() {
    let backwhole =
      atan2(width / 2 - this.position.x, height / 2 - this.position.y) +
      TWO_PI +
      TWO_PI;
    let backwhole_2 =
      -atan2(width / 2 - this.position.x, height / 2 - this.position.y - 300) +
      TWO_PI +
      HALF_PI; //0-2PI
    let angle =
      noise(
        this.position.x / noiseRatio,
        this.position.y / noiseRatio,
        frameCount / noiseRatio
      ) +
      TWO_PI * 1; //0-2PI
    this.direction.x = tan(angle);
    this.direction.y = -sin(angle - backwhole);
    let vel = this.direction.copy();
    let _direction = 1;
    vel.mult(this.velocity * _direction);
    this.singularity = this.position;
    this.position.add(vel);
  }
  inBound() {
    if (
      this.position.x < 0 ||
      this.position.x > container.offsetWidth ||
      this.position.y < 0 ||
      this.position.y > container.offsetHeight
    ) {
      this.position.x = random(10, container.offsetWidth);
      this.position.y = random(10, container.offsetHeight);
    }
  }
  update() {
    // beginShape();
    point(this.position.x, this.position.y);
    // endShape();
  }
}
