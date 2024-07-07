"use strict";

// Start Screen
const startBtn = document.querySelector(".start-btn");
const infScrollBg = document.querySelector(".infinite-scroll");

//Audio Files
const jumpSound = new Audio("/assets/jump-sfx.mp3");
const bgSound = new Audio("/assets/theme-music.mp3");
const gameOverSound = new Audio("/assets/end-screen-sfx.mp3");
const startSound = new Audio("/assets/start-sfx.mp3");
const pointSound = new Audio("/assets/point-sound.mp3");

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
const points1 = document.querySelector(".finger-points");
const points2 = document.querySelector(".finger-points-2");

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

  bgSound.play();
  startSound.play();

  function randomAppear() {
    setTimeout(() => {
      let randomTime = Math.floor(Math.random() * 10000);
      setTimeout(() => {
        points1.style.display = "block";
      }, randomTime);
    }, 2000);
    setTimeout(() => {
      let randomTime = Math.floor(Math.random() * 10000);
      setTimeout(() => {
        points2.style.display = "block";
      }, randomTime);
    }, 4000);
  }

  randomAppear();

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
    jumpSound.play();
  }
});

// Game Over
const gameOver = document.querySelector(".game-over");
const restartBtn = document.querySelector(".restart-btn");

function gameOverScreen() {
  gameOver.style.display = "flex";
  clearInterval(runYuji);
  clearInterval(jumpYuji);
  document.getElementById("obstacle1").style.display = "none";
  document.getElementById("obstacle2").style.display = "none";
  document.getElementById("obstacle3").style.display = "none";
  document.getElementById("final-score").innerHTML = score;
  bgSound.pause();
  gameOverSound.play();
}

restartBtn.addEventListener("click", () => {
  console.log("Restart Button Clicked");
  location.reload();
});

// player movement within container
const playerDiv = document.querySelector(".char-run");

let score = 0;
const scoreDisplay = document.getElementById("score");

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

function updateScore() {
  const playerRect = playerDiv.getBoundingClientRect();
  const points1Rect = points1.getBoundingClientRect();
  const points2Rect = points2.getBoundingClientRect();

  if (
    playerRect.top < points1Rect.bottom &&
    playerRect.bottom > points1Rect.top &&
    playerRect.right > points1Rect.left &&
    playerRect.left < points1Rect.right
  ) {
    score++;
    points1.style.display = "none";
    pointSound.play();
    console.log("scored a point");
    scoreDisplay.innerHTML = `Score: ${score}`;
    setTimeout(() => {
      points1.style.display = "block";
    }, 1500);
  }

  if (
    playerRect.top < points2Rect.bottom &&
    playerRect.bottom > points2Rect.top &&
    playerRect.right > points2Rect.left &&
    playerRect.left < points2Rect.right
  ) {
    score++;
    points2.style.display = "none";
    pointSound.play();
    console.log("scored a point");
    scoreDisplay.innerHTML = `Score: ${score}`;
    setTimeout(() => {
      points2.style.display = "block";
    }, 1500);
  }
}

//update the score counter everytime a point is scored
setInterval(updateScore, 100);

// Reset Button
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  console.log("Reset Button Clicked");
  location.reload();
});
