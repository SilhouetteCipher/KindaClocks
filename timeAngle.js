function calculateTimeAngle() {
  let currentHour = hour();
  let currentMinute = minute();
  let angle = 0;
  if (currentHour >= 12) {
    currentHour = currentHour - 12;
  }
  angle = currentHour * 30 + currentMinute * 0.5;
  angle -= 90;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
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

function goFullscreen() {
  let fs = fullscreen();
  fullscreen(!fs);
  windowResized();
}
function windowResized() {
  width = windowWidth;
  height = windowHeight;
  hourSize = height / 35;
  minSize = height / 120;
  faceSize = height / 12;
  distance = height / 4;
  resizeCanvas(windowWidth, windowHeight);
  // Redraw your elements here based on the new window size
}
