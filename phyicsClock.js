let timeAngle;
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
let swapInterval = 180 * 1000; // 60 seconds
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
  background(255);
  hourText = hour();
  minuteText = nf(minute(), 2);
  backgroundTimeText();
  //image(textGraphics, 0, 0);
  background(0);
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
  particleBigSize = width / 42;
  particleSmallSize = width / 160;
  resizeCanvas(windowWidth, windowHeight);
  textGraphics.resizeCanvas(windowWidth, windowHeight);
}

function backgroundTimeText() {
  let currentTime = millis();

  // Check if it's time to make the text white
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
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.stopped = false;
    this.stopDelay = 0;
    this.particleSize = random(particleSmallSize, particleBigSize);
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
    fill(this.color);
    noStroke();
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

function resetCanvas() {
  textGraphics.clear();
}
