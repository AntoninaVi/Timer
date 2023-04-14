let countdown, pause = false;
let remainingTime = 0;
let cycleCount = 0;
const timerDisplay = document.getElementById('timer');
const pauseButton = document.getElementById('pauseButton');
const pomodoroButton = document.getElementById('pomodoroButton');
const shortBreakButton = document.getElementById('shortBreakButton');
const longBreakButton = document.getElementById('longBreakButton');
const progressCircle = document.getElementById('progressCircle');
const mainTime = document.getElementById('main-time')





const radius = progressCircle.offsetWidth / 2; //

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  countdown = setInterval(function () {
    if (!pause) {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      // Calculate
      const progress = (duration - timer) / duration;
      const angle = (1 - timer) * 360;

      const x = Math.sin(angle * Math.PI / 180) * radius;
      const y = Math.cos(angle * Math.PI / 180) * radius;
      const clipPath = `circle(${progress * 100}% at ${radius + x}px ${radius + y}px)`;

      progressCircle.style.clipPath = clipPath;
      progressCircle.style.borderRadius = `${progressCircle.offsetHeight / 2}px`;


      switch (true) {
        case (--timer < 0):
          clearInterval(countdown);
          cycleCount++;
          if (cycleCount % 4 === 0) {
            startTimer(30 * 60, display); // long break
          } else {
            startTimer(4 * 60, display); // short break
          }
          remainingTime = timer;
          break;
        case (timer < 20):
          remainingTime = timer;
          break;
        default:
          remainingTime = timer;
          break;
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

const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

settingsBtn.onclick = function () {
  modal.style.display = "block";
  applyBtn.style.display = "block"
  overlay.style.display = "block";
}


closeBtn.onclick = function () {
  modal.style.display = "none";
  applyBtn.style.display = "none";
  overlay.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    applyBtn.style.display = "none";
    modal.style.display = "none";
    overlay.style.display = "none";
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
  applyBtn.style.display = "none";
  overlay.style.display = "none";

  if (pomodoroTime && shortBreakTime && longBreakTime) {
    timerDisplay.textContent = `${pomodoroTime}:00`;
    settingsModal.style.display = 'none';
  } else {
    alert('Please enter valid characters');
    applyBtn.style.display = "block";
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

// Reset timer
pomodoroButton.addEventListener('click', () => resetTimer(pomodoroInput.value * 60));
shortBreakButton.addEventListener('click', () => resetTimer(shortBreakInput.value * 60));
longBreakButton.addEventListener('click', () => resetTimer(longBreakInput.value * 60));

//
resetTimer(pomodoroInput.value * 60);

// Fonts
const fontButtons = document.querySelectorAll('#selectFont button');
const defaultFont = localStorage.getItem('font') || 'sans-serif';

// Apply default font body 
document.body.style.fontFamily = defaultFont;

// Change font when clicked
fontButtons.forEach(button => {
  button.addEventListener('click', () => {
    const font = button.classList[0];
    document.body.style.fontFamily = font;
    localStorage.setItem('font', font);
  });
});

// Save font to localStorage when applied
applyButton.addEventListener('click', () => {
  localStorage.setItem('font', document.body.style.fontFamily);
});

const fontElements = document.querySelectorAll(".settings__fonts-font")

fontElements.forEach(function (fontElement) {
  fontElement.addEventListener('click', function () {
    fontElements.forEach(function (font) {
      font.classList.remove('selected');
    })
    this.classList.add('selected')
  })
})

// Colors
const red = "#F87070";
const blue = "#70F3F8";
const purple = "#D881F8";


const redBtn = document.querySelector(".red");
const blueBtn = document.querySelector(".blue");
const purpleBtn = document.querySelector(".purple");
const mainBtns = document.querySelectorAll(".main-button");
const pauseBtn = document.querySelector(".pause-btn");



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
    btn.addEventListener("mousedown", () => {
      btn.style.backgroundColor = this.color;
    });
    // btn.addEventListener("mouseup", () => {
    //   btn.style.backgroundColor = "";
    // });
    btn.addEventListener("focus", () => {
      btn.style.backgroundColor = this.color;
    });
    btn.addEventListener("blur", () => {
      btn.style.backgroundColor = "";
    });
  });

  pauseBtn.addEventListener("mouseover", () => {
    pauseBtn.style.color = this.color;
  });
  pauseBtn.addEventListener("mouseout", () => {
    pauseBtn.style.color = "";
  });

  pauseBtn.addEventListener("mousedown", () => {
    pauseBtn.style.color = this.color;
  });
  pauseBtn.addEventListener("focus", () => {
    pauseBtn.style.color = this.color;
  });


  progressCircle.style.borderColor = this.color;
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


//Check symbol
const colorElements = document.querySelectorAll('.settings__colors-color');

colorElements.forEach(function (colorElement) {
  colorElement.addEventListener('click', function () {
    colorElements.forEach(function (color) {
      color.classList.remove('selected');
    });
    this.classList.add('selected');
  });
});

