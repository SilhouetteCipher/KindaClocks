let timeAngle;
let width;
let height;
let blurArea;
let yourMaxValue = 500;
function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
}

function draw() {
  timeAngle = calculateTimeAngle();

  background(0, 10);
  buildHourHand();
  buildMinHand();
  buildSecondHand();
  circle(width / 2, height / 2, width / 200);
  fill(0);
  circle(width / 2, height / 2, width / 400);
}

function windowResized() {
  width = windowWidth;
  height = windowHeight;

  resizeCanvas(windowWidth, windowHeight);
}

function buildHourHand() {
  let handAngle = calculateHourHandAngle(); // This should be the angle calculated from calculateTime
  handAngle = radians(handAngle); // Correct conversion to radians
  let distance = Math.min(width / 6, yourMaxValue * 0.8); // The distance from the center of the clock to the end of the hour hand
  let centerX = width / 2;
  let centerY = height / 2;
  let targetX = centerX + distance * cos(handAngle); // Calculate the x coordinate
  let targetY = centerY + distance * sin(handAngle); // Calculate the y coordinate
  fill(255);
  noStroke();
  circle(targetX, targetY, width / 60);
}

function buildMinHand() {
  let handAngle = calculateMinuteHandAngle(); // This should be the angle calculated from calculateTime
  handAngle = radians(handAngle); // Correct conversion to radians
  let distance = Math.min(width / 4, yourMaxValue);
  let centerX = width / 2;
  let centerY = height / 2;
  let targetX = centerX + distance * cos(handAngle); // Calculate the x coordinate
  let targetY = centerY + distance * sin(handAngle); // Calculate the y coordinate
  fill(255);
  noStroke();
  circle(targetX, targetY, width / 80);
}

function buildSecondHand() {
  let handAngle = calculateSecondHandAngle(); // This should be the angle calculated from calculateTime
  handAngle = radians(handAngle); // Correct conversion to radians
  let distance = Math.min(width / 3, yourMaxValue * 1.2);
  let centerX = width / 2;
  let centerY = height / 2;
  let targetX = centerX + distance * cos(handAngle); // Calculate the x coordinate
  let targetY = centerY + distance * sin(handAngle); // Calculate the y coordinate
  fill(255);
  noStroke();
  circle(targetX, targetY, 20);
}
