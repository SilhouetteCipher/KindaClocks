let timeAngle;
let width;
let height;
function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  background(220);
}

function draw() {
  timeAngle = calculateTimeAngle();
  clockPosition = hour() * 30;
  background(220);
  circleTime(800, 800, clockPosition);
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

function linearTime() {
  let x = hour() * 30;
}
