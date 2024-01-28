let timeAngle;
let width = visualViewport.width;
let height = visualViewport.height;
let currentHour;
function setup() {
  createCanvas(width, height);
  currentHour = hour();
}

function draw() {
  timeAngle = calculateTimeAngle();
  background(220);
  text(
    `It's Kinda, Maybe about sort of ${currentHour} ish, Maybe`,
    width / 2,
    height / 2
  );
}
