let timeAngle;
let width = visualViewport.width;
let height = visualViewport.height;
let currentHour;
let circleDiameter;
let faceColor = 255;
let handColor = 0;
let handOpacity = 100;
let drawSecondHand = false;
let arcGradient;
function setup() {
  createCanvas(width, height);
  currentHour = hour();
}

function draw() {
  background(255);
  arcGradient = createRadialGradient(0, circleDiameter / 2);
  arcGradient.colors(0, color(50), 1, color(0));
  drawFace();
  drawTimeMarker();
}

function drawFace() {
  let hourAngle = calculateHourHandAngle();
  let minuteAngle = calculateMinuteHandAngle();
  let secondAngle = calculateSecondHandAngle();

  if (width > height) {
    circleDiameter = height - 200;
  } else {
    circleDiameter = width - 200;
  }

  push();
  noStroke();
  fill(faceColor);
  circle(width / 2, height / 2, circleDiameter);
  pop();
  // Draw the hour hand
  push();
  noStroke();
  fill(handColor, handOpacity);
  translate(width / 2, height / 2);
  rotate(radians(hourAngle));
  arc(0, 0, circleDiameter, circleDiameter, PI, 0);
  pop();

  // Draw the minute hand
  push();
  noStroke();

  fill(handColor, handOpacity);
  translate(width / 2, height / 2);
  rotate(radians(minuteAngle));
  arc(0, 0, circleDiameter, circleDiameter, PI, 0);
  pop();

  //draw the second hand
  if (drawSecondHand) {
    push();
    noStroke();
    fill(handColor, handOpacity);
    translate(width / 2, height / 2);
    rotate(radians(secondAngle));
    arc(0, 0, circleDiameter, circleDiameter, PI, 0);
    pop();
  }
}

function drawTimeMarker() {
  for (let i = 0; i < 12; i++) {
    let angle = i * 30;
    let x = width / 2 + cos(radians(angle)) * (circleDiameter / 2);
    let y = height / 2 + sin(radians(angle)) * (circleDiameter / 2);
    push();
    fill(0);
    circle(x, y, 10);
    pop();
  }
}
