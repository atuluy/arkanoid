const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rulesContainer = document.getElementById("rules-container");

// Event Listeners

rulesBtn.addEventListener("click", () => {
  rulesContainer.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rulesContainer.classList.remove("show");
});
