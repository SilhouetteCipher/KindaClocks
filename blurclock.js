let timeAngle;
let width = visualViewport.width;
let height = visualViewport.height;
let currentHour;
let handColor = 255;
function setup() {
  createCanvas(width, height);
  currentHour = hour();
  background(0);
}

function draw() {
  background(0);

  noStroke();
  fill(0);
  buildClockFace();

  drawHourHand();
  drawMinHand();
  filter(BLUR, 50);
}

//draw the hour hand
function drawHourHand() {
  let hourAngle = calculateHourHandAngle();
  push();
  noStroke();
  fill(handColor);
  translate(width / 2, height / 2);
  rotate(radians(hourAngle));
  rect(0, 0, circleDiameter / 2.7, circleDiameter / 15);
  pop();
}

function drawMinHand() {
  let minAngle = calculateMinuteHandAngle();
  push();
  noStroke();
  fill(handColor);
  translate(width / 2, height / 2);
  rotate(radians(minAngle));
  rect(0, 0, circleDiameter / 2.2, circleDiameter / 18);
  pop();
}
