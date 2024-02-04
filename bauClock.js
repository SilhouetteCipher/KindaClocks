let timeAngle;
let width;
let height;
let rectSize = 200;
function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  background(220);
}

function draw() {
  timeAngle = calculateTimeAngle();
  clockPosition = getTimeXPosition(rectSize) - rectSize / 1.3;
  background(220);
  circleTime(rectSize, rectSize, clockPosition);
}

function circleTime(rectWidth, rectHeight, clockPosition) {
  noFill();
  noStroke();
  push();
  translate(width / 2 - rectHeight / 2, height / 2 - rectHeight / 2);
  rect(width / 2, height / 2, rectWidth, rectHeight);
  for (let i = 0; i < 12; i++) {
    fill("Black");
    rect((rectWidth / 12) * i, 0, rectWidth / 24, rectHeight);
  }
  fill("orange");
  circle(clockPosition, rectHeight / 2, rectHeight / 1.3);
  pop();
}

function getTimeXPosition(rectWidth) {
  let secondsSinceMidnight = hour() * 3600 + minute() * 60 + second();
  let totalSecondsInDay = 24 * 60 * 60;
  return map(secondsSinceMidnight, 0, totalSecondsInDay, 0, rectWidth);
}
