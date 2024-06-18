"use strict";

// Start Screen
const startBtn = document.querySelector(".start-btn");
const infScrollBg = document.querySelector(".infinite-scroll");

// Start Button Clicked
let initialSpeed = 20;

function speedUp() {
  const interval = setInterval(() => {
    initialSpeed -= 1;
    console.log(initialSpeed);
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
  setInterval(() => {
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
  }, 550);
});

// Run Animation

// preload run images
for (let i = 1; i <= 8; i++) {
  const img = new Image();
  img.src = `assets/sprite-run/run-${i}.png`;
}

function runAnim() {
  let frame = 1;
  setInterval(() => {
    charRun.innerHTML = `<img src="assets/sprite-run/run-${frame}.png" alt="Character Running">`;
    frame++;
    if (frame > 8) {
      frame = 1;
    }
  }, 83.33); //set to 83ms for 12fps run animation.
}

// Jump Animation

// preload jump images
for (let i = 1; i <= 6; i++) {
  const img = new Image();
  img.src = `assets/sprite-jump/jump-${i}.png`;
}

function jumpAnim() {
  let frame = 1;
  setInterval(() => {
    charRun.innerHTML = `<img src="assets/sprite-jump/jump-${frame}.png" alt="Character Jumping">`;
    frame++;
    if (frame > 6) {
      frame = 1;
    }
  }, 125); //set to 83ms for 12fps jump animation.
}

// spacebar for jump
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    clearInterval(runAnim);
    jumpAnim();
    clearInterval(jumpAnim);
    runAnim();
  }
});

// another thing I can do is set the left position on the div #player to move the character and replace the whole div inside with the jump animation when keydown === space. create 2 divs for run and jump and toggle between them.

// do this tomorrow, ask Gabbie for advice
