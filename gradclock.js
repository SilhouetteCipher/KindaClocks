let xGrad = 0;
let yGrad = 0;
let angleGrad = 0;
let rotateRate = 0.01;
let width = visualViewport.width;
let height = visualViewport.height;
let handAngle;

function setup() {
  createCanvas(width, height);
  noStroke();
  xGrad = width / 2;
  yGrad = height / 2;
}

function draw() {
  push();
  let angle = calculateTimeAngle();
  //angleGrad += rotateRate;
  fillGradient("conic", {
    from: [xGrad, yGrad, angle], // x, y, angle(degrees)
    steps: [color("black"), color("#3b3b3b")], // p5.color objects
  });
  rect(0, 0, width, height);
  pop();
  //drawHourMarkers();
}

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

function drawHourMarkers() {
  let handAngle = 0;
  for (let i = 0; i < 12; i++) {
    handAngle = radians(i * 30);
    let x = xGrad + cos(handAngle) * 200;
    let y = yGrad + sin(handAngle) * 200;
    fill(255, 10);
    circle(x, y, 10);
  }
}
