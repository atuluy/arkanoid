const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rulesContainer = document.getElementById("rules-container");
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;

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

// Brick Properties
const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45, // It is going to be the position of the first brick
  offsetY: 60,
  visible: true,
};

// Create Bricks
const bricks = [];

for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// *** FUNCTIONS ***
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

// Draw Bricks On Canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.visible ? "#8d93ab" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Move Paddle On Canvas
function movePaddle() {
  paddle.xPos += paddle.dx;

  // Prevent passing through the walls
  if (paddle.xPos + paddle.width > canvas.width) {
    paddle.xPos = canvas.width - paddle.width;
  }
  if (paddle.xPos < 0) {
    paddle.xPos = 0;
  }
}

// Move Ball On Canvas
function moveBall() {
  ball.xPos += ball.dx;
  ball.yPos += ball.dy;

  // Detect Wall Collision (x-axis)
  if (ball.xPos + ball.radius > canvas.width || ball.xPos - ball.radius < 0) {
    ball.dx *= -1;
  }
  // Detect Wall Collision (y-axis)
  if (ball.yPos + ball.radius > canvas.height || ball.yPos - ball.radius < 0) {
    ball.dy *= -1;
  }
  // Detect Paddle Collision
  if (
    ball.xPos - ball.radius > paddle.xPos &&
    ball.xPos + ball.radius < paddle.xPos + paddle.width &&
    ball.yPos + ball.radius > paddle.yPos
  ) {
    ball.dy = -ball.speed;
  }
  // Detect Brick Collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.xPos - ball.radius > brick.x && // check left brick side
          ball.xPos + ball.radius < brick.x + brick.width && // check right brick side
          ball.yPos + ball.radius > brick.y && // check top brick side
          ball.yPos - ball.radius < brick.y + brick.height // check bottom brick side
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  // Lose Game If Hit The Bottom Wall
  if (ball.yPos + ball.radius > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// Increase Score
function increaseScore() {
  score++;

  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();
  }
}

// Make All Bricks Visible
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

// Keydown
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

// Keyup
function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

// Draw Everything
function drawAll() {
  // Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawScore();
  drawBall();
  drawPaddle();
  drawBricks();
}

// Update Canvas (Drawings & Animations)
function update() {
  movePaddle();
  moveBall();

  drawAll();

  requestAnimationFrame(update);
}

// Call Update
update();

// *** EVENT LISTENERS ***

// Buttons
rulesBtn.addEventListener("click", () => {
  rulesContainer.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rulesContainer.classList.remove("show");
});

// Keyboard
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
