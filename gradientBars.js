let timeAngle;
let width;
let height;
let gradientHour;
let gradientMin;
let gradientSec;
let border = 50;
let bottomBuffer = 1.2;
let BarUnit;
function setup() {
  background(220);
  width = windowWidth;
  height = windowHeight;

  createCanvas(width, height);
  gradientHour = createConicGradient(0, (width - 2 * border) / 3, height / 2);
  gradientMin = createConicGradient(0, 2 * BarUnit - 4 * border, height / 2);
  gradientSec = createConicGradient(0, 3 * BarUnit - 4 * border, height / 2);
  windowResized();
}

function draw() {
  background(220);
  let timeSec = second() / 60;
  buildBarHour();
  buildBarMin();
  buildBarSec(timeSec);
}

function windowResized() {
  width = windowWidth;
  height = windowHeight;
  resizeCanvas(windowWidth, windowHeight);
}

function buildBarHour(timeHour) {
  gradientHour.colors(0.3, "black", 0.5, "grey");
  fillGradient(gradientHour);
  noStroke();
  rect(border, border, (width - 2 * border) / 3, height / bottomBuffer);
}

function buildBarMin(timeMin) {
  gradientMin.colors(0.3, "black", 0.5, "grey");
  fillGradient(gradientMin);
  noStroke();
  rect(
    border + (width - 2 * border) / 3,
    border,
    (width - 2 * border) / 3,
    height / bottomBuffer
  );
}

function buildBarSec(timeSec) {
  gradientSec.colors(0.3, "black", 0.5, "grey");
  fillGradient(gradientSec);
  noStroke();
  rect(
    border + (2 * (width - 2 * border)) / 3,
    border,
    (width - 2 * border) / 3,
    height / bottomBuffer
  );
}
