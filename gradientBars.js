let timeAngle;
let width;
let height;
let gradientHour;
let gradientMin;
let gradientSec;
let border = 50;
let gap = border / 4;
let bottomBuffer = 1.4;
let BarUnit;
let gradientColors;
function setup() {
  background(220);
  width = windowWidth;
  height = windowHeight;

  createCanvas(width, height);
  windowResized();
}

function draw() {
  background(220);
  gradientColors = [0, "black", 0.5, "white", 1, "black"];
  let secondAngle = radians(calculateSecondHandAngle()) + PI;
  let minuteAngle = radians(calculateMinuteHandAngle()) + PI;
  let hourAngle = radians(calculateHourHandAngle()) + PI;

  let barWidth = (width - 2 * border) / 3;

  let barHeight = (height + border) / bottomBuffer;
  let gradientCenterY = border + barHeight / 2;

  gradientHour = createConicGradient(
    hourAngle,
    border + barWidth / 2,
    gradientCenterY
  );
  gradientMin = createConicGradient(
    minuteAngle,
    border + barWidth + barWidth / 2,
    gradientCenterY
  );
  gradientSec = createConicGradient(
    secondAngle,
    border + 2 * barWidth + barWidth / 2,
    gradientCenterY
  );

  buildBarHour();
  buildBarMin();
  buildBarSec();
}

function windowResized() {
  width = windowWidth;
  height = windowHeight;
  resizeCanvas(windowWidth, windowHeight);
}

function buildBarHour() {
  gradientHour.colors(gradientColors);
  fillGradient(gradientHour);
  noStroke();
  rect(
    border,
    border,
    (width - 2 * border) / 3 - gap / 2,
    height / bottomBuffer
  );
}

function buildBarMin() {
  gradientMin.colors(gradientColors);
  fillGradient(gradientMin);
  noStroke();
  rect(
    border + (width - 2 * border) / 3 + gap / 2,
    border,
    (width - 2 * border) / 3 - gap,
    height / bottomBuffer
  );
}

function buildBarSec() {
  gradientSec.colors(gradientColors);
  fillGradient(gradientSec);
  noStroke();
  rect(
    border + (2 * (width - 2 * border)) / 3 + gap / 2,
    border,
    (width - 2 * border) / 3,
    height / bottomBuffer
  );
}
