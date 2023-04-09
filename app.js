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
              progressCircle.className = 'progress';
            } else {
              startTimer(4 * 60, display); // Start short break
              progressCircle.className = 'progress';
            }
        } else if (timer < 20) {
          progressCircle.className = 'progress';
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

// Fonts

const fontButtons = document.querySelectorAll('#selectFont button');
const defaultFont = localStorage.getItem('font') || 'sans-serif';

// Change font when clicked
fontButtons.forEach(button => {
  button.addEventListener('click', () => {
    const font = button.classList[0];
    document.body.style.fontFamily = font;
    localStorage.setItem('font', font);
  });
});

//Save font
document.body.style.fontFamily = defaultFont;

// Save font to localStorage when applied
applyButton.addEventListener('click', () => {
  localStorage.setItem('font', document.body.style.fontFamily);
});


// Colors
const red = "#F87070";
const blue = "#70F3F8";
const purple = "#D881F8";


const redBtn = document.querySelector(".red");
const blueBtn = document.querySelector(".blue");
const purpleBtn = document.querySelector(".purple");
const mainBtns = document.querySelectorAll(".main-button");
const pauseBtn = document.querySelector(".pause-btn");
const progress = document.querySelector(".progress");


function changeColors() {
// Change bg-color .main-buttons
  mainBtns.forEach((btn) => {
    btn.style.backgroundColor = "";
    btn.style.color = "";
    btn.addEventListener("mouseover", () => {
      btn.style.backgroundColor = this.color;
    });
    btn.addEventListener("mouseout", () => {
      btn.style.backgroundColor = "";
    });
    btn.addEventListener("mousedown", () => { //need to be fixed
      btn.style.backgroundColor = this.color;
    });
    btn.addEventListener("mouseup", () => {
      btn.style.backgroundColor = "";
    });
  });


  pauseBtn.style.color = this.color;
  // progress.style.color = this.color;
}


redBtn.addEventListener("click", function () {
  this.color = red;
  changeColors.call(this);
});

blueBtn.addEventListener("click", function () {
  this.color = blue;
  changeColors.call(this);
});

purpleBtn.addEventListener("click", function () {
  this.color = purple;
  changeColors.call(this);
});
