let timeAngle;
let width;
let height;
let chosenFont;
function setup() {
  chosenFont = loadFont("/fonts/1.ttf");
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
}

let trail = [];
let lastTrailTime = 0;
let trailInterval = 60000 * 1; // Store the time every 1 minutes

function draw() {
  timeAngle = calculateTimeAngleHourOnly() - 90;
  background(255);
  circle(width / 2, height / 2, width / 1.2);
  let timeString = buildTimeString();
  let textSizeValue = width / 6;

  let currentTime = millis();
  if (currentTime - lastTrailTime > trailInterval) {
    trail.push({ time: timeString, angle: timeAngle });
    lastTrailTime = currentTime;

    // If trail length exceeds 20, remove the oldest entry
    if (trail.length > 20) {
      trail.shift();
    }
  }

  // Draw the current time
  push();
  textSize(textSizeValue);
  textFont(chosenFont);
  translate(width / 2, height / 2);
  rotate(radians(timeAngle));
  text(timeString, 0, 0);
  pop();

  for (let i = 0; i < trail.length; i++) {
    // Mapping such that older entries are more transparent
    // Adjust the fade range based on the length of the trail
    let fade = map(i, 0, trail.length - 1, 50, 255); // Fading from 50 (semi-transparent) to 255 (opaque)
    push();
    textSize(textSizeValue);
    translate(width / 2, height / 2);
    rotate(radians(trail[i].angle));
    fill(0, fade); // Apply the fading effect with black color
    text(trail[i].time, 0, 0);
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
