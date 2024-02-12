let timeAngle;
let width;
let height;
function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
}

let trail = [];
let lastTrailTime = 0;
let trailInterval = 60000 * 1; // Store the time every 5 minutes

function draw() {
  timeAngle = calculateTimeAngleHourOnly() - 90;
  background(220);
  let timeString = buildTimeString(); // Call the function to get the time string
  let textSizeValue = width / 5; // Estimate the full height of the text
  push();
  textSize(textSizeValue);
  translate(width / 2, height / 2); // Adjust the y-coordinate
  rotate(radians(timeAngle));
  text(timeString, 0, 0); // Draw the text at the new origin
  pop();
  circle(width / 2, height / 2, 4);

  // Draw the trail
  for (let i = 0; i < trail.length; i++) {
    push();
    textSize(textSizeValue);
    translate(width / 2, height / 2); // Adjust the y-coordinate
    rotate(radians(trail[i].angle - 90)); // Subtract 90 degrees to start from the 12 o'clock position
    fill(220, (0.5 * (trail.length - i)) / trail.length); // Decrease the opacity for older times
    text(trail[i].time, 0, 0); // Draw the time at the stored position
    pop();
  }

  // Draw the trail
  for (let i = 0; i < trail.length; i++) {
    push();
    textSize(textSizeValue);
    translate(width / 2, height / 2 + estimatedTextHeight / 2); // Adjust the y-coordinate
    rotate(radians(trail[i].angle));
    fill(220, (0.5 * (trail.length - i)) / trail.length); // Decrease the opacity for older times
    text(trail[i].time, 0, 0); // Draw the time at the stored position
    pop();
  }
}

function windowResized() {
  width = windowWidth;
  height = windowHeight;
  rectSize = width / 2.5;
  resizeCanvas(windowWidth, windowHeight);
}

function buildTimeString() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds();
  return `${hours}:${minutes}`;
}

function calculateTimeAngleHourOnly() {
  let now = new Date();
  let minutes = now.getMinutes(); // Get the current minute (0-59)
  let seconds = now.getSeconds(); // Get the current second (0-59)
  let totalSeconds = minutes * 60 + seconds; // Total seconds past the hour
  let angle = map(totalSeconds, 0, 3600, 0, 360); // Map the total seconds to an angle
  return angle;
}
