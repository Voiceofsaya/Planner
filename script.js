// Page switching
function switchPage(page) {
  document.getElementById("plannerPage").style.display = "none";
  document.getElementById("moodBoardPage").style.display = "none";
  document.getElementById("pomodoroPage").style.display = "none";

  document.getElementById(page + "Page").style.display = "flex";
}

// Task planner
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (!taskText) return;

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    if (checkbox.checked) {
      playSound();
      fireConfetti();
    }
  });

  const span = document.createElement("span");
  span.textContent = taskText;

  li.appendChild(checkbox);
  li.appendChild(span);

  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}

function playSound() {
  const sound = document.getElementById("dingSound");
  sound.currentTime = 0;
  sound.play();
}

function fireConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Mood board
const moodQuotes = {
  "😭": "It’s okay to cry. Let it out and take one step at a time. 💗",
  "😔": "Gentle reminder: You're doing your best, and that’s enough. 🌸",
  "😠": "Take a deep breath. You got this! 💪🏼",
  "😊": "You are enough, just as you are. 💖",
  "😮‍💨": "Breathe in, breathe out. Everything will be okay. 🌿"
};

function setMood(mood) {
  const quote = moodQuotes[mood] || "Select a mood to get a quote 💬";
  document.getElementById("moodQuote").textContent = quote;
}

function updateDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("dateDisplay").textContent = now.toLocaleDateString(undefined, options);
}

updateDate();

// Pomodoro Timer
let timer;
let currentTime = 0;

function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function startPomodoro() {
  clearInterval(timer);
  const studyMins = parseInt(document.getElementById("studyDuration").value) || 25;
  currentTime = studyMins * 60;
  updateTimerDisplay();
  timer = setInterval(() => {
    currentTime--;
    updateTimerDisplay();
    if (currentTime <= 0) {
      clearInterval(timer);
      document.getElementById("bellSound").play();
      alert("Time's up! Take a break.");
    }
  }, 1000);
}

function startBreak() {
  clearInterval(timer);
  const breakMins = parseInt(document.getElementById("breakDuration").value) || 5;
  currentTime = breakMins * 60;
  updateTimerDisplay();
  timer = setInterval(() => {
    currentTime--;
    updateTimerDisplay();
    if (currentTime <= 0) {
      clearInterval(timer);
      document.getElementById("bellSound").play();
      alert("Break's over! Back to study.");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  currentTime = 0;
  updateTimerDisplay();
}
