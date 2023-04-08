let countdown, pause = false;
let remainingTime = 0;
let cycleCount = 0;
const timerDisplay = document.getElementById('timer');
const pauseButton = document.getElementById('pauseButton');
const pomodoroButton = document.getElementById('pomodoroButton');
const shortBreakButton = document.getElementById('shortBreakButton');
const longBreakButton = document.getElementById('longBreakButton');
const progressCircle = document.getElementById('progress');
const mainTime = document.getElementById('main-time')






function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  countdown = setInterval(function () {
      if (!pause) {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        // progressCircle.style.clip = `rect(0, ${100 - (timer / duration) * 100}px, 100px, 0)`;

        if (--timer < 0) {
            clearInterval(countdown);
            cycleCount++;
            if (cycleCount % 4 === 0) {
              startTimer(30 * 60, display); // Start long break
              progressCircle.className = 'progress long-break';
            } else {
              startTimer(4 * 60, display); // Start short break
              progressCircle.className = 'progress short-break';
            }
        } else if (timer < 20) {
          progressCircle.className = 'progress pomodoro';
        }
      }
      remainingTime = timer;
  }, 1000);
}


function pauseTimer() {
  pause = !pause;
  pauseButton.textContent = pause ? 'restart' : 'pause';
}

function resetTimer(duration) {
  clearInterval(countdown);
  pause = false;
  pauseButton.textContent = 'pause';
  startTimer(duration, timerDisplay);
}

pomodoroButton.addEventListener('click', () => resetTimer(25 * 60));
shortBreakButton.addEventListener('click', () => resetTimer(5 * 60));
longBreakButton.addEventListener('click', () => resetTimer(30 * 60));
pauseButton.addEventListener('click', pauseTimer);


// SETTINGS SECTION

// Modal window
const settingsBtn = document.getElementById("settingsBtn");
const modal = document.getElementById("settings");
const closeBtn = document.getElementById("closeBtn");


settingsBtn.onclick = function() {
  modal.style.display = "block";
}


closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Settings

const settingsModal = document.getElementById('settings');
const pomodoroInput = document.querySelector('#pomodoroTimeInput');
const shortInput = document.querySelector('#shortTimeInput');
const longInput = document.querySelector('#longTimeInput');
const applyBtn = document.querySelector('.settings__button-apply');



// Time settings and close modal when applied
applyBtn.addEventListener('click', () => {
  const pomodoroTime = parseInt(pomodoroInput.value);
  const shortBreakTime = parseInt(shortInput.value);
  const longBreakTime = parseInt(longInput.value);

  if (pomodoroTime && shortBreakTime && longBreakTime) {
    timerDisplay.textContent = `${pomodoroTime}:00`;
    settingsModal.style.display='none';
  } else {
    alert('Please enter valid input values');
  }
});

const shortBreakInput = document.getElementById('shortTimeInput');
const longBreakInput = document.getElementById('longTimeInput');

// Load saved values from localStorage
pomodoroInput.value = localStorage.getItem('pomodoroTime') || pomodoroInput.value;
shortBreakInput.value = localStorage.getItem('shortBreakTime') || shortBreakInput.value;
longBreakInput.value = localStorage.getItem('longBreakTime') || longBreakInput.value;

// Save to localStorage
const applyButton = document.querySelector('.settings__button-apply');
applyButton.addEventListener('click', () => {
  localStorage.setItem('pomodoroTime', pomodoroInput.value);
  localStorage.setItem('shortBreakTime', shortBreakInput.value);
  localStorage.setItem('longBreakTime', longBreakInput.value);
});

// Reset timer with
pomodoroButton.addEventListener('click', () => resetTimer(pomodoroInput.value * 60));
shortBreakButton.addEventListener('click', () => resetTimer(shortBreakInput.value * 60));
longBreakButton.addEventListener('click', () => resetTimer(longBreakInput.value * 60));

//
resetTimer(pomodoroInput.value * 60);