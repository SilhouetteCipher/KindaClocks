let timeAngle;
let width;
let height;
let blurArea;
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
  let distance = width / 6; // The distance from the center of the clock to the end of the hour hand
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
  let distance = width / 4; // The distance from the center of the clock to the end of the hour hand
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
  let distance = width / 3; // The distance from the center of the clock to the end of the hour hand
  let centerX = width / 2;
  let centerY = height / 2;
  let targetX = centerX + distance * cos(handAngle); // Calculate the x coordinate
  let targetY = centerY + distance * sin(handAngle); // Calculate the y coordinate
  fill(255);
  noStroke();
  circle(targetX, targetY, 20);
}
