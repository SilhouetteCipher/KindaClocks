let timeAngle;
let width;
let height;
let currentHour;
let hourSize = height / 35;
let minSize = height / 120;
let faceSize = height / 12;
let distance = height / 4;

function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height, WEBGL);
  currentHour = hour();
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0.1, 5000); // Set an orthographic projection
}

function draw() {
  let lightAngle =
    ((hour() + minute() / 60 + second() / 3600) * TWO_PI) / 24 - HALF_PI; // Calculate the angle based on the current time
  let lightX = cos(lightAngle); // Calculate the x coordinate
  let lightY = sin(lightAngle); // Calculate the y coordinate
  background(0);
  directionalLight(255, 255, 255, lightX, lightY, 1); // Add a white light from the calculated direction
  buildClockFace(6);
  buildHourHand();
  buildMinHand();
}

function buildClockFace(size) {
  push();
  noStroke();
  sphere(faceSize, 24, 24);
  pop();
}

function buildHourHand() {
  let handAngle = calculateHourHandAngle(); // This should be the angle calculated from calculateTime
  handAngle = radians(handAngle); // Correct conversion to radians
  let centerX = 0;
  let centerY = 0;
  let targetX = centerX + 0.8 * distance * cos(handAngle); // Calculate the x coordinate
  let targetY = centerY + 0.8 * distance * sin(handAngle); // Calculate the y coordinate
  push();
  translate(targetX, targetY, 20); // Translate to the calculated position
  fill(255);
  noStroke();
  sphere(hourSize, 24, 24);
  pop();
}

function buildMinHand() {
  let handAngle = calculateMinuteHandAngle(); // This should be the angle calculated from calculateTime
  handAngle = radians(handAngle); // Correct conversion to radians
  let centerX = 0;
  let centerY = 0;
  let targetX = centerX + 0.8 * (distance / 1.5) * cos(handAngle); // Calculate the x coordinate
  let targetY = centerY + 0.8 * (distance / 1.5) * sin(handAngle); // Calculate the y coordinate
  push();
  translate(targetX, targetY, 20); // Translate to the calculated position
  fill(255);
  noStroke();
  sphere(minSize, 24, 24);
  pop();
}

function calculateHourHandAngle() {
  let currentHour = hour();
  let currentMinute = minute();
  let currentSecond = second();
  let angle = 0;
  if (currentHour >= 12) {
    currentHour = currentHour - 12;
  }
  angle = currentHour * 30 + currentMinute * 0.5 + currentSecond * 0.00833; // The hour hand moves 0.00833 degrees per second
  angle -= 90;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

function calculateMinuteHandAngle() {
  let currentMinute = minute();
  let currentSecond = second();
  let angle = currentMinute * 6 + currentSecond * 0.1; // The minute hand moves 0.1 degrees per second
  angle -= 90;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}
