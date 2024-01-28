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
