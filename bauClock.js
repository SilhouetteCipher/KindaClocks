let timeAngle;
let width;
let height;
let rectSize = 800;
let bgColour = "#c3b4a7";
let circleColour = "#cb3c1d";

function setup() {
  width = windowWidth;
  height = windowHeight;
  rectSize = width / 2.5;
  createCanvas(width, height);
  background(220);
}

function draw() {
  timeAngle = calculateTimeAngle();
  clockPosition = getTimeXPosition(rectSize);
  background(bgColour);
  circleTime(rectSize, rectSize, clockPosition);
  drawMask(rectSize, rectSize);
  fill("white");
}

function circleTime(rectWidth, rectHeight, clockPosition) {
  noFill();
  noStroke();
  push();
  translate(width / 2 - rectWidth / 2, height / 2 - rectHeight / 2);
  for (let i = 0; i < 12; i++) {
    fill("Black");
    rect((rectWidth / 12) * i, 0, rectWidth / 24, rectHeight);
  }
  fill(circleColour);
  // Subtract half the diameter from the x-coordinate
  circle(
    clockPosition - rectHeight / 1.3 / 2,
    rectHeight / 2,
    rectHeight / 1.3
  );
  // fill("Black");
  // rect(
  //   0,
  //   rectHeight - rectHeight + rectHeight / 1.04,
  //   rectWidth - rectWidth / 24,
  //   rectHeight / 24
  // );
  pop();
}

function getTimeXPosition(rectWidth) {
  let secondsSinceMidnight = hour() * 3600 + minute() * 60 + second();
  let totalSecondsInDay = 12 * 60 * 60; // Change to 12 hours
  return map(
    secondsSinceMidnight % totalSecondsInDay,
    0,
    totalSecondsInDay,
    0,
    rectWidth
  );
}

function drawMask(rectWidth, rectHeight) {
  fill(bgColour);
  noStroke();
  rect(0, -1, width, (height - rectHeight) / 2 + 1); // Top rectangle
  rect(0, (height + rectHeight) / 2 - 1, width, (height - rectHeight) / 2 + 2); // Bottom rectangle
  rect(
    -1,
    (height - rectHeight) / 2 - 1,
    (width - rectWidth) / 2 + 1,
    rectHeight + 2
  ); // Left rectangle
  rect(
    (width + rectWidth) / 2 - 1,
    (height - rectHeight) / 2 - 1,
    (width - rectWidth) / 2 + 2,
    rectHeight + 2
  ); // Right rectangle
}

function windowResized() {
  width = windowWidth;
  height = windowHeight;
  rectSize = width / 2.5;
  resizeCanvas(windowWidth, windowHeight);
}
