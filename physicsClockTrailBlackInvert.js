const transitionDuration = 1000; // Transition duration in milliseconds

let width;
let height;
let hourText;
let minuteText;
let clockTextSize;
let particles = [];
let textGraphics;
let colorArray = [
  "#d4b89d",
  "#3c342d",
  "#ca4343",
  "#2455a5",
  "#2c5b4b",
  "#ffb82c",
  "#d5d5d5",
];
let lastSwapTime = 0;
let swapInterval = 180 * 1000; // 3 minutes
let whiteDuration = 2 * 1000; // 2 seconds
let particleSmallSize = 10;
let particleBigSize = 40;

function setup() {
  width = windowWidth;
  height = windowHeight;
  particleBigSize = width / 42;
  particleSmallSize = width / 160;
  clockTextSize = width / 4;
  createCanvas(width, height);
  textGraphics = createGraphics(width, height);
  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  hourText = hour();
  minuteText = nf(minute(), 2);
  backgroundTimeText();
  background(0, 0.1);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

function windowResized() {
  width = windowWidth;
  height = windowHeight;
  clockTextSize = width / 4;
  particleBigSize = width / 42;
  particleSmallSize = width / 160;
  resizeCanvas(windowWidth, windowHeight);
  textGraphics.resizeCanvas(windowWidth, windowHeight);
}

function backgroundTimeText() {
  let currentTime = millis();
  if (currentTime - lastSwapTime > swapInterval) {
    textGraphics.fill(255);
    if (currentTime - lastSwapTime > swapInterval + whiteDuration) {
      textGraphics.fill(0);
      lastSwapTime = currentTime;
    }
  } else {
    textGraphics.fill(0);
  }

  textGraphics.background(255);
  textGraphics.textSize(clockTextSize);
  textGraphics.textAlign(CENTER, CENTER);
  textGraphics.textStyle(BOLD);
  textGraphics.textFont("futura");
  textGraphics.text(hourText + " : " + minuteText, width / 2, height / 2);
}

class Particle {
  constructor() {
    this.originalColor =
      colorArray[Math.floor(Math.random() * colorArray.length)];
    this.color = color(this.originalColor); // Ensure this is a p5.Color
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.stopped = false;
    this.stopDelay = 0;
    this.particleSize = random(particleSmallSize, particleBigSize);
    this.lerpFactor = 0;
    this.inTransition = false;
    this.transitionStartTime = -1;
  }

  update() {
    if (!this.stopped) {
      this.position.add(this.velocity);
      this.checkEdges();
      if (this.stopDelay > 0) {
        this.stopDelay--;
      } else if (this.stopDelay === 0 && this.isInBlackArea()) {
        this.velocity = createVector(0, 0);
        this.stopped = true;
      }

      if (this.isInBlackArea() && !this.inTransition) {
        this.inTransition = true;
        this.transitionStartTime = millis();
      }

      if (this.inTransition) {
        let elapsedTime = millis() - this.transitionStartTime;
        if (elapsedTime < transitionDuration) {
          this.lerpFactor = map(elapsedTime, 0, transitionDuration, 0, 1);
        } else {
          this.lerpFactor = 1;
          this.inTransition = false;
        }
      }
    } else {
      this.checkWhiteArea();
    }
  }

  display() {
    let dimColor = color(
      red(this.color) / 4,
      green(this.color) / 4,
      blue(this.color) / 4
    );
    this.color = lerpColor(
      dimColor,
      color(this.originalColor),
      this.lerpFactor
    );

    fill(this.color);
    noStroke();
    circle(this.position.x, this.position.y, this.particleSize);
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
      this.inTransition = false;
      this.lerpFactor = 0;
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

function resetCanvas() {
  textGraphics.clear();
}
