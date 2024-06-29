"use strict";

// Start Screen
const startBtn = document.querySelector(".start-btn");
const infScrollBg = document.querySelector(".infinite-scroll");

let initialSpeed = 60;

function speedUp() {
  const targetSpeed = 8;
  const decrement = 0.1;
  const interval = 1; // Reduce the interval for smoother animation

  const speedUpInterval = setInterval(() => {
    initialSpeed -= decrement;
    if (initialSpeed <= targetSpeed) {
      initialSpeed = targetSpeed;
      clearInterval(speedUpInterval);
    }
  }, interval);
}

const charRun = document.querySelector(".char-run");
const lineMotion = document.querySelector(".motion-line");

// Start Button
startBtn.addEventListener("click", () => {
  console.log("Start Button Clicked");
  startBtn.classList.add("hide");
  setTimeout(() => {
    startBtn.style.display = "none";
  }, 500);
  speedUp();
  const updateInterval = setInterval(() => {
    infScrollBg.style = `animation: slide ${initialSpeed}s linear infinite`;
    if (initialSpeed <= 8) {
      clearInterval(updateInterval);
    }
  }, 1);

  charRun.style.left = "7rem";
  runYuji = setInterval(runAnim, 83.33);
  setTimeout(() => {
    lineMotion.style.transform = "translateX(-100%)";
  }, 1700);

  setTimeout(() => {
    document.getElementById("obstacle1").style.display = "block";
    document.getElementById("obstacle2").style.display = "block";
    document.getElementById("obstacle3").style.display = "block";
    setInterval(checkCollisions, 100);
  }, 2000);
});

// Preload run images
for (let i = 1; i <= 8; i++) {
  const img = new Image();
  img.src = `assets/sprite-run/run-${i}.png`;
}

// Preload jump images
for (let i = 1; i <= 6; i++) {
  const img = new Image();
  img.src = `assets/sprite-jump/jump-${i}.png`;
}

let frame = 1;
let yframe = 1;
let isJumping = false;
let runYuji;
let jumpYuji;

function runAnim() {
  charRun.innerHTML = `<img src="assets/sprite-run/run-${frame}.png" alt="Character Running">`;
  frame++;
  if (frame > 8) {
    frame = 1;
  }
}

function jumpAnim() {
  charRun.innerHTML = `<img src="assets/sprite-jump/jump-${yframe}.png" alt="Character Jumping">`;
  yframe++;
  if (yframe > 6) {
    clearInterval(jumpYuji);
    yframe = 1;
    isJumping = false;
    runYuji = setInterval(runAnim, 83.33);
  }
}

function startJump() {
  if (isJumping) return;
  isJumping = true;
  clearInterval(runYuji);
  yframe = 1;
  jumpYuji = setInterval(jumpAnim, 125);
  player.style.transform = "translateY(-25rem)";
  setTimeout(() => {
    player.style.transform = "translateY(-1.05rem)";
  }, 725);
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    startJump();
  }
});

// Game Over
const gameOver = document.querySelector(".game-over");
const restartBtn = document.querySelector(".restart-btn");

function gameOverScreen() {
  gameOver.style.display = "flex";
  clearInterval(runYuji);
  clearInterval(jumpYuji);
}

restartBtn.addEventListener("click", () => {
  console.log("Restart Button Clicked");
  location.reload();
});

// player movement within container
const playerDiv = document.querySelector(".char-run");

function checkCollisions() {
  const playerRect = playerDiv.getBoundingClientRect();
  const obstacle1Rect = document
    .getElementById("obstacle1")
    .getBoundingClientRect();
  const obstacle2Rect = document
    .getElementById("obstacle2")
    .getBoundingClientRect();
  const obstacle3Rect = document
    .getElementById("obstacle3")
    .getBoundingClientRect();

  if (
    playerRect.top < obstacle1Rect.bottom &&
    playerRect.bottom > obstacle1Rect.top &&
    playerRect.right > obstacle1Rect.left &&
    playerRect.left < obstacle1Rect.right
  ) {
    console.log("Game Over");
    clearInterval(runYuji);
    clearInterval(jumpYuji);
    gameOverScreen();
  }

  if (
    playerRect.top < obstacle2Rect.bottom &&
    playerRect.bottom > obstacle2Rect.top &&
    playerRect.right > obstacle2Rect.left &&
    playerRect.left < obstacle2Rect.right
  ) {
    console.log("Game Over");
    clearInterval(runYuji);
    clearInterval(jumpYuji);
    gameOverScreen();
  }

  if (
    playerRect.top < obstacle3Rect.bottom &&
    playerRect.bottom > obstacle3Rect.top &&
    playerRect.right > obstacle3Rect.left &&
    playerRect.left < obstacle3Rect.right
  ) {
    console.log("Game Over");
    clearInterval(runYuji);
    clearInterval(jumpYuji);
    gameOverScreen();
  }
}

// Reset Button
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  console.log("Reset Button Clicked");
  location.reload();
});

// Obstacle3 should only appear when obstacle2 and obstacle1 are outside of the div container
const obstacle3 = document.getElementById("obstacle3");
const obstacle1 = document.getElementById("obstacle1");
const obstacle2 = document.getElementById("obstacle2");

function checkObstacle3() {
  const obstacle1Rect = obstacle1.getBoundingClientRect();
  const obstacle2Rect = obstacle2.getBoundingClientRect();

  if (
    obstacle1Rect.right < 0 &&
    obstacle2Rect.right < 0 &&
    obstacle3.style.display === "none"
  ) {
    obstacle3.style.display = "block";
  }
}
