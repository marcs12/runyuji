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
    if (initialSpeed === 5) {
      clearInterval(interval);
    }
  }, 100);
}

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
});

// Run Animation
