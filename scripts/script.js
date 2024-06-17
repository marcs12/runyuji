"use strict";

// Start Screen
const startBtn = document.querySelector(".start-btn");
const infScrollBg = document.querySelector(".infinite-scroll");

// Start Button Clicked

startBtn.addEventListener("click", () => {
  infScrollBg.classList.add("fast");
  console.log("Start Button Clicked");
  startBtn.classList.add("hide");
  if (infScrollBg.classList.contains("fast")) {
    setInterval(() => {
      startBtn.style.display = "none";
    }, 500);
  }
});
