"use strict";

// Start Screen
const startBtn = document.querySelector(".start-btn");
const infScrollBg = document.querySelector(".infinite-scroll");

// Start Button Clicked
let initialSpeed = 20;

function speedUp() {
  const interval = setInterval(() => {
    initialSpeed -= 1;
    // console.log(initialSpeed);
    if (initialSpeed === 8) {
      clearInterval(interval);
    }
  }, 100);
}

const charRun = document.querySelector(".char-run");
const lineMotion = document.querySelector(".motion-line");

startBtn.addEventListener("click", () => {
  //   debugger;
  //   infScrollBg.classList.add("fast");
  console.log("Start Button Clicked");
  startBtn.classList.add("hide");
  setTimeout(() => {
    startBtn.style.display = "none";
  }, 500);
  speedUp();
  setInterval(() => {
    infScrollBg.style = `animation: slide ${initialSpeed}s linear infinite`;
  }, 100);
  charRun.style.left = "7rem";
  runAnim();
  setTimeout(() => {
    lineMotion.style.transform = "translateX(-100%)";
  }, 775);
});

// Run Animation

// preload run images
for (let i = 1; i <= 8; i++) {
  const img = new Image();
  img.src = `assets/sprite-run/run-${i}.png`;
}

let frame = 1;

function runAnim() {
  charRun.innerHTML = `<img src="assets/sprite-run/run-${frame}.png" alt="Character Running">`;
  frame++;
  if (frame > 8) {
    frame = 1;
  }
  // if (e.code === "Space") {
  //   clearInterval(runAnim);
  // }
}

const runYuji = setInterval(runAnim, 83.33);
// Jump Animation

// preload jump images
for (let i = 1; i <= 6; i++) {
  const img = new Image();
  img.src = `assets/sprite-jump/jump-${i}.png`;
}

let yframe = 1;

function jumpAnim() {
  clearInterval(runYuji);
  charRun.innerHTML = `<img src="assets/sprite-jump/jump-${yframe}.png" alt="Character Jumping">`;
  yframe++;
  if (yframe > 6) {
    yframe = 1;
  }
}

function jumpYuji() {
  setInterval(jumpAnim, 80);
}

window.addEventListener("keydown", (e) => {
  // debugger;
  if (e.code === "Space") {
    clearInterval(runYuji);
    jumpYuji();
    setTimeout(clearInterval(jumpYuji), 83);
    setTimeout(runYuji, 85);
  }
});

// maybe set the left position on the div #player to move the character and replace the whole div inside with the jump animation when keydown === space. create 2 divs for run and jump and toggle between them.

// do this tomorrow, ask Gabbie for advice
