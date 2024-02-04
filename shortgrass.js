let width;
let height;
let points = [];
let handAngle = 0;
let minAngle = 0;
let numOfPoints = 360;
let lineWidth = 1;

function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  //buildPointsOnCircle();
}

function draw() {
  background(0);
  handAngle = calculateHourHandAngle();
  minAngle = calculateMinuteHandAngle();
  drawGrass();
}

// function buildPointsOnCircle() {
//   let radius = width / 5;
//   let centerX = width / 2;
//   let centerY = height / 2;
//   let points = [];
//   for (let i = 0; i < 360; i++) {
//     let angle = radians(i); // Convert the angle to radians
//     let x = centerX + radius * cos(angle);
//     let y = centerY + radius * sin(angle);
//     points.push(createVector(x, y));
//     circle(x, y, 10);
//   }
// }

function drawGrass() {
  let radius = width / 4;
  let centerX = width / 2;
  let centerY = height / 2;
  let points = [];
  stroke(255, 60);
  strokeWeight(lineWidth);
  for (let i = 0; i < numOfPoints; i++) {
    let angle = radians(i * (360 / numOfPoints)); // Calculate the angle between each point
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    points.push(createVector(x, y));
  }

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let x = point.x;
    let y = point.y;
    let handAngle = radians(calculateHourHandAngle());
    let targetX = centerX + radius * cos(handAngle); // Calculate the x coordinate
    let targetY = centerY + radius * sin(handAngle); // Calculate the y coordinate

    // Calculate a point along the line
    let fraction = 0.4; // Change this to adjust the length of the lines
    let shortX = x + fraction * (targetX - x);
    let shortY = y + fraction * (targetY - y);

    line(x, y, shortX, shortY);
  }

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let x = point.x;
    let y = point.y;
    let minAngle = radians(calculateMinuteHandAngle());
    let targetX = centerX + radius * cos(minAngle); // Calculate the x coordinate
    let targetY = centerY + radius * sin(minAngle); // Calculate the y coordinate

    // Calculate a point along the line
    let fraction = 0.6; // Change this to adjust the length of the lines
    let shortX = x + fraction * (targetX - x);
    let shortY = y + fraction * (targetY - y);

    line(x, y, shortX, shortY);
  }

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let x = point.x;
    let y = point.y;
    let secAngle = radians(calculateSecondHandAngle());
    let targetX = centerX + radius * cos(secAngle); // Calculate the x coordinate
    let targetY = centerY + radius * sin(secAngle); // Calculate the y coordinate

    // Calculate a point along the line
    let fraction = 0.9; // Change this to adjust the length of the lines
    let shortX = x + fraction * (targetX - x);
    let shortY = y + fraction * (targetY - y);

    line(x, y, shortX, shortY);
  }
}

function calculateHourHandAngle() {
  let now = new Date();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let currentSecond = now.getSeconds();
  let currentMillis = now.getMilliseconds();
  let angle = 0;
  if (currentHour >= 12) {
    currentHour = currentHour - 12;
  }
  angle =
    currentHour * 30 +
    currentMinute * 0.5 +
    (currentSecond + currentMillis / 1000) * 0.00833; // The hour hand moves 0.00833 degrees per second
  angle -= 90;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

function calculateMinuteHandAngle() {
  let now = new Date();
  let currentMinute = now.getMinutes();
  let currentSecond = now.getSeconds();
  let currentMillis = now.getMilliseconds();
  let angle = (currentMinute + (currentSecond + currentMillis / 1000) / 60) * 6; // The minute hand moves 6 degrees per minute
  angle -= 90; // Adjust the angle so that 0 degrees is at the top of the clock
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

function calculateSecondHandAngle() {
  let now = new Date();
  let currentSecond = now.getSeconds();
  let currentMillis = now.getMilliseconds();
  let angle = (currentSecond + currentMillis / 1000) * 6; // The second hand moves 6 degrees per second
  angle -= 90; // Adjust the angle so that 0 degrees is at the top of the clock
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}
