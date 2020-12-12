const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rulesContainer = document.getElementById("rules-container");
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
let score = 0;

// Ball Properties
const ball = {
  xPos: canvas.width / 2,
  yPos: canvas.height / 2,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Paddle Properties
const paddle = {
  xPos: canvas.width / 2 - 40, // 40 is the half of the size of the paddle
  yPos: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
};

// FUNCTIONS

// Draw Ball On Canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.xPos, ball.yPos, ball.radius, 0, Math.PI * 2, true);
  ctx.fillStyle = "#8d93ab";
  ctx.fill();
  ctx.closePath();
}

// Draw Paddle On Canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.xPos, paddle.yPos, paddle.width, paddle.height);
  ctx.fillStyle = "#8d93ab";
  ctx.fill();
  ctx.closePath();
}

// Draw Score On Canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score} `, canvas.width - 100, 30);
}

// Draw Everything
function drawAll() {
  drawBall();
  drawPaddle();
  drawScore();
}

drawAll();
// EVENT LISTENERS
rulesBtn.addEventListener("click", () => {
  rulesContainer.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rulesContainer.classList.remove("show");
});
