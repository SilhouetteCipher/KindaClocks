let timeAngle;
let width;
let height;
let lines = [];
let angle = 0;
function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
}

function draw() {
  timeAngle = calculateTimeAngle();
  background(0);
  buildLinesForCircle();
  angle = calculateTimeAngle();
  timeCirclehand();
}

function buildLinesForCircle() {
  let maxRadius = 400; // Maximum radius of the circle
  let spacing = 8; // Spacing between points
  let centerX = width / 2; // X coordinate of the circle's center
  let centerY = height / 2; // Y coordinate of the circle's center

  for (let y = centerY - maxRadius; y <= centerY + maxRadius; y += spacing) {
    let dy = centerY - y; // Distance in the y direction from the center
    let dx = sqrt(maxRadius * maxRadius - dy * dy); // Distance in the x direction from the center, calculated using the Pythagorean theorem
    dx = round(dx / spacing) * spacing; // Round dx to the nearest multiple of spacing
    for (let x = centerX - dx; x <= centerX + dx; x += spacing) {
      point(x, y); // Draw the point
      //strokeWeight(20);
      push(); // Save the current transformation matrix
      translate(x, y); // Move the origin to (x, y)

      let calculateTimeAngle = timeAngle; // This should be the angle calculated from calculateTime
      let distance = 500; // Distance from the center
      let targetX = centerX + distance * cos(calculateTimeAngle); // Calculate the x coordinate
      let targetY = centerY + distance * sin(calculateTimeAngle); // Calculate the y coordinate
      let angle = atan2(targetY - y, targetX - x); // Calculate the angle from the current point to the target point
      rotate(angle); // Rotate the coordinate system by the calculated angle
      strokeWeight(1);
      stroke(255, 60);
      line(0, 0, 20, 0); // Draw the line
      line(0, 0, -20, 0); // Draw the line
      pop(); // Restore the transformation matrix
    }
  }
}

function timeCirclehand() {
  angleMode(DEGREES);
  let timeAngle = angle; // The angle, in radians
  let distance = 500; // The distance from the center of the canvas
  let centerX = width / 2; // X coordinate of the canvas's center
  let centerY = height / 2; // Y coordinate of the canvas's center

  let circleX = centerX + distance * cos(timeAngle); // X coordinate of the circle's center
  let circleY = centerY + distance * sin(timeAngle); // Y coordinate of the circle's center
  fill(255, 50);
  ellipse(circleX, circleY, 5, 5); // Draw the circle
}
function calculateTimeAngle() {
  let currentHour = hour();
  let currentMinute = minute();
  let currentSecond = second();
  let angle = 0;
  if (currentHour >= 12) {
    currentHour = currentHour - 12;
  }
  angle = currentHour * 30 + currentMinute * 0.5 + currentSecond * (0.5 / 60);
  angle -= 90;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}
