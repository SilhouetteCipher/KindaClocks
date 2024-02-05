let timeAngle;
let width;
let height;
function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
}

function draw() {
  timeAngle = calculateTimeAngle();
  background(220);
  text(timeAngle, width / 2, height / 2);
}

function windowResized() {
  width = windowWidth;
  height = windowHeight;
  rectSize = width / 2.5;
  resizeCanvas(windowWidth, windowHeight);
}
