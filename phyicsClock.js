let timeAngle;
let width;
let height;
let hourText;
let minuteText;
let clockTextSize;
let particles = [];
let textGraphics;

function setup() {
  width = windowWidth;
  height = windowHeight;
  clockTextSize = width / 4;
  createCanvas(width, height);
  textGraphics = createGraphics(width, height);
  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(255);
  hourText = hour();
  minuteText = nf(minute(), 2);
  backgroundTimeText();
  image(textGraphics, 0, 0);
  background(255);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
    particles[i].checkBlackArea();
  }
}

function windowResized() {
  width = windowWidth;
  height = windowHeight;
  clockTextSize = width / 4;
  resizeCanvas(windowWidth, windowHeight);
  textGraphics.resizeCanvas(windowWidth, windowHeight);
}

function backgroundTimeText() {
  textGraphics.background(255);
  textGraphics.textSize(clockTextSize);
  textGraphics.textAlign(CENTER, CENTER);
  textGraphics.textStyle(BOLD);

  textGraphics.textFont("futura");
  textGraphics.fill(0);
  textGraphics.text(hourText + " : " + minuteText, width / 2, height / 2);
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.stopped = false;
    this.stopDelay = 0;
    this.particleSize = random(10, 20);
  }

  update() {
    if (!this.stopped) {
      this.position.add(this.velocity);
      this.checkEdges();
      this.checkBlackArea();
      if (this.stopDelay > 0) {
        this.stopDelay--;
      } else if (this.stopDelay === 0 && this.isInBlackArea()) {
        this.velocity = createVector(0, 0);
        this.stopped = true;
      }
    } else {
      this.checkWhiteArea();
    }
  }

  display() {
    circle(this.position.x, this.position.y, this.particleSize);
  }

  checkBlackArea() {
    if (this.isInBlackArea()) {
      this.stopDelay = floor(random(0, 80)); // delay between 1 to 3 seconds at 60 fps
    }
  }

  isInBlackArea() {
    let pixel = textGraphics.get(this.position.x, this.position.y);
    return red(pixel) === 0 && green(pixel) === 0 && blue(pixel) === 0;
  }

  checkWhiteArea() {
    let pixel = textGraphics.get(this.position.x, this.position.y);
    if (red(pixel) > 0 || green(pixel) > 0 || blue(pixel) > 0) {
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.stopped = false;
    }
  }

  checkEdges() {
    if (this.position.x >= width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width - 1;
    }
    if (this.position.y >= height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height - 1;
    }
  }
}
