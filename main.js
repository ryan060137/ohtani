const blockList = document.getElementById("block-list");
const blockTemplate = document.getElementById("block-template");
const addBlockBtn = document.getElementById("add-block");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const themeToggle = document.getElementById("theme-toggle");

let timerInterval = null;
let remainingSeconds = 0;

const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};

const setTimer = (minutes) => {
  remainingSeconds = minutes * 60;
  timerEl.textContent = formatTime(remainingSeconds);
};

const pickActiveBlock = () => {
  const first = blockList?.querySelector(".block");
  if (!first) {
    return 25;
  }
  const minutes = Number(first.querySelector(".block-minutes").value || 25);
  return Math.max(5, minutes);
};

const addBlock = (title = "", minutes = 25) => {
  const node = blockTemplate.content.cloneNode(true);
  const block = node.querySelector(".block");
  const titleInput = node.querySelector(".block-title");
  const minutesInput = node.querySelector(".block-minutes");
  const removeBtn = node.querySelector(".remove");

  titleInput.value = title;
  minutesInput.value = minutes;

  removeBtn.addEventListener("click", () => {
    block.remove();
    if (!blockList.querySelector(".block")) {
      setTimer(25);
    }
  });

  blockList.appendChild(node);
};

const startTimer = () => {
  if (timerInterval) return;
  if (remainingSeconds === 0) {
    setTimer(pickActiveBlock());
  }
  timerInterval = window.setInterval(() => {
    remainingSeconds -= 1;
    timerEl.textContent = formatTime(Math.max(remainingSeconds, 0));
    if (remainingSeconds <= 0) {
      window.clearInterval(timerInterval);
      timerInterval = null;
    }
  }, 1000);
};

const pauseTimer = () => {
  window.clearInterval(timerInterval);
  timerInterval = null;
};

const resetTimer = () => {
  pauseTimer();
  setTimer(pickActiveBlock());
};

const initTheme = () => {
  const stored = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", stored);
  themeToggle.textContent = stored === "dark" ? "Dark" : "Light";
  themeToggle.setAttribute("aria-pressed", stored === "dark");
};

const toggleTheme = () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  themeToggle.textContent = next === "dark" ? "Dark" : "Light";
  themeToggle.setAttribute("aria-pressed", next === "dark");
  localStorage.setItem("theme", next);
};

addBlockBtn.addEventListener("click", () => addBlock());
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
themeToggle.addEventListener("click", toggleTheme);

addBlock("Deep work", 50);
addBlock("Admin / email", 20);
setTimer(50);
initTheme();
