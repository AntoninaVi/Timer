let pause = false;
let countdown = null;
let remainingTime = 0;
let minutes = 0;
let seconds = 0;

const timerDisplay = document.getElementById('timer');
const pauseButton = document.getElementById('pauseButton');
const pomodoroButton = document.getElementById('pomodoroButton');
const shortBreakButton = document.getElementById('shortBreakButton');
const longBreakButton = document.getElementById('longBreakButton');
const progressCircle = document.getElementById('progressCircle');

const red = "#F87070";
const blue = "#70F3F8";
const purple = "#D881F8";

//buttons
const redBtn = document.querySelector(".red");
const blueBtn = document.querySelector(".blue");
const purpleBtn = document.querySelector(".purple");
const mainBtns = document.querySelectorAll(".main-button");
const activeButtonId = localStorage.getItem('activeButtonId');
const applyButton = document.querySelector('.settings__button-apply');

const shortBreakInput = document.getElementById('shortTimeInput');
const longBreakInput = document.getElementById('longTimeInput');

const radius = progressCircle.offsetWidth / 2; //

// Settings
const settingsModal = document.getElementById('settings');
const pomodoroInput = document.querySelector('#pomodoroTimeInput');
const shortInput = document.querySelector('#shortTimeInput');
const longInput = document.querySelector('#longTimeInput');
const applyBtn = document.querySelector('.settings__button-apply');

// Fonts
const fontButtons = document.querySelectorAll('#selectFont button');
const defaultFont = localStorage.getItem('font') || 'sans-serif';

let progress = 0;
let initialProgress = 0;

function startTimer(duration, display) {
  let timer = duration;
  let minutes, seconds;
  const selectedColor = localStorage.getItem("selectedColor");

  

  if (localStorage.getItem('minutes') && localStorage.getItem('seconds')) {
    minutes = parseInt(localStorage.getItem('minutes'), 10);
    seconds = parseInt(localStorage.getItem('seconds'), 10);
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timer = minutes * 60 + seconds;
  } else {
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('seconds', seconds);
  }

  if (localStorage.getItem('progress')) {
    initialProgress = parseFloat(localStorage.getItem('progress'));
  } else {
    initialProgress = 0;
  }

  countdown = setInterval(function () {
    if (!pause) {
      if (localStorage.getItem('remainingTime')) {
        timer = parseInt(localStorage.getItem('remainingTime'), 10);
        localStorage.removeItem('remainingTime');
      }

      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');

      localStorage.setItem('minutes', minutes);
      localStorage.setItem('seconds', seconds);

      display.textContent = minutes + ":" + seconds;

      // Calculate progress
      progress = initialProgress + ((duration - timer) / duration) * 320;

      progressCircle.style.background = `conic-gradient(transparent ${progress}deg, ${selectedColor} 0deg)`;
      localStorage.setItem('progress', progress);
      switch (true) {
        case (--timer < 0):
          if ((remainingTime / 60) % 30 === 0) {
            timer = 30 * 60; // long break
          } else {
            timer = 4 * 60; // short break
          }
          remainingTime = timer;
          const audio = new Audio('audio/snuffbox.mp3');
          audio.play();
          // pauseTimer();
          break;
        case (timer < 20):
          remainingTime = timer;
          break;
        default:
          remainingTime = timer;
          break;
      }
      localStorage.setItem('progress', progress);
    }
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    localStorage.setItem('remainingTime', timer);
  }, 1000);
  window.onbeforeunload = function() {
    localStorage.setItem('progress', progress.toFixed());
    localStorage.setItem('remainingTime', timer);
  };
  return countdown;
}


function pauseTimer() {

  if (countdown !== null) {
    localStorage.setItem('remainingTime', remainingTime);
    localStorage.setItem('progress', progress.toFixed());
    clearInterval(countdown);
    countdown = null;
    pauseButton.textContent = 'start';
    window.onbeforeunload = null;
  } else {
    countdown = startTimer(remainingTime, timerDisplay);
    pauseButton.textContent = 'pause';
    window.onbeforeunload = function() {
      localStorage.setItem('progress', progress.toFixed());
      localStorage.setItem('remainingTime', remainingTime);
    };
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem('remainingTime')) {
    remainingTime = parseInt(localStorage.getItem('remainingTime'), 10);
    countdown = startTimer(remainingTime, timerDisplay);
    pauseButton.textContent = 'pause';
  }
});
function resetTimer(duration) {
  clearInterval(countdown);
  pause = false;
  pauseButton.textContent = 'start';
  remainingTime = duration;
  localStorage.removeItem('remainingTime');
  localStorage.removeItem('progress');
  saveActiveButton();
}

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
  applyBtn.style.display = "block";
  overlay.style.display = "block";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
  applyBtn.style.display = "none";
  overlay.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    applyBtn.style.display = "none";
    modal.style.display = "none";
    overlay.style.display = "none";
  }
};

// Settings
// Time settings and close modal when applied
applyBtn.addEventListener('click', () => {
  const pomodoroTime = parseInt(pomodoroInput.value);
  const shortBreakTime = parseInt(shortInput.value);
  const longBreakTime = parseInt(longInput.value);
  localStorage.setItem('pomodoroTime', pomodoroInput.value);
  localStorage.setItem('shortBreakTime', shortBreakInput.value);
  localStorage.setItem('longBreakTime', longBreakInput.value);
  applyBtn.style.display = "none";
  overlay.style.display = "none";

  if (pomodoroTime && shortBreakTime && longBreakTime) {
    timerDisplay.textContent = `${pomodoroTime}:00`;

    // Save font and color settings
    const fontButtons = document.querySelectorAll('.settings__fonts-font');
    const colorButtons = document.querySelectorAll('.settings__colors-color');

    settingsModal.style.display = 'none';
  } else {
    alert('Please enter valid numbers');
  }
});


// Load saved values from localStorage
pomodoroInput.value = localStorage.getItem('pomodoroTime') || pomodoroInput.value;
shortBreakInput.value = localStorage.getItem('shortBreakTime') || shortBreakInput.value;
longBreakInput.value = localStorage.getItem('longBreakTime') || longBreakInput.value;

resetTimer(pomodoroInput.value * 60);

// Fonts
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

const fontElements = document.querySelectorAll(".settings__fonts-font");

fontElements.forEach(fontElement => {
  if (fontElement.classList.contains(defaultFont)) {
    fontElement.classList.add('selected');
  }
});

fontElements.forEach(fontElement => {
  fontElement.addEventListener('click', function () {
    fontElements.forEach(font => {
      font.classList.remove('selected');
    });
    this.classList.add('selected');
    localStorage.setItem('font', this.classList[1]);
  });
});

// Colors
function changeColors() {
  let activeButton = null;
  const selectedColor = localStorage.getItem("selectedColor");
  const activeButtonElement = document.getElementById(activeButtonId);

  // Change bg-color .main-buttons
  mainBtns.forEach((btn) => {
    btn.style.backgroundColor = "";
    btn.style.color = "";

    btn.addEventListener('click', () => {
      if (activeButton) {
        activeButton.classList.remove('active');
        activeButton.style.backgroundColor = '';
      }
      activeButton = btn;
      btn.classList.add('active');
      btn.style.backgroundColor = selectedColor;
      localStorage.setItem('activeButtonId', btn.id);
    });
    if (btn === activeButtonElement) {
      activeButton = btn;
      btn.classList.add('active');
      btn.style.backgroundColor = this.color;
    }
  });
  pauseButton.addEventListener("mouseover", () => {
    pauseButton.style.color = this.color;
  });

  pauseButton.addEventListener("mouseout", () => {
    pauseButton.style.color = "";
  });

  progressCircle.style.borderColor = this.color;
}

function saveActiveButton() {
  const activeButton = document.querySelector('.main-button.active');
  if (activeButton) {
    const activeButtonId = activeButton.id;
    localStorage.setItem('activeButtonId', activeButtonId);
  }
}

redBtn.addEventListener("click", function () {
  this.color = red;
  localStorage.setItem("selectedColor", red);
  changeColors.call(this);
});

blueBtn.addEventListener("click", function () {
  this.color = blue;
  localStorage.setItem("selectedColor", blue);
  changeColors.call(this);
});

purpleBtn.addEventListener("click", function () {
  this.color = purple;
  localStorage.setItem("selectedColor", purple);
  changeColors.call(this);
});

//Check-symbol
const colorElements = document.querySelectorAll('.settings__colors-color');
colorElements.forEach(function (colorElement) {
  colorElement.addEventListener('click', function () {
    colorElements.forEach(function (color) {
      color.classList.remove('selected');
    });
    this.classList.add('selected');
  });
});

pomodoroButton.addEventListener('click', () => {
  resetTimer(pomodoroInput.value * 60);
  timerDisplay.textContent = `${pomodoroInput.value.padStart(2, '0')}:00`;
  localStorage.removeItem('minutes');
  localStorage.removeItem('seconds');

});

shortBreakButton.addEventListener('click', () => {
  resetTimer(shortBreakInput.value * 60);
  timerDisplay.textContent = `${shortBreakInput.value.padStart(2, '0')}:00`;
  localStorage.removeItem('minutes');
  localStorage.removeItem('seconds');

});

longBreakButton.addEventListener('click', () => {
  resetTimer(longBreakInput.value * 60);
  timerDisplay.textContent = `${longBreakInput.value.padStart(2, '0')}:00`;
  localStorage.removeItem('minutes');
  localStorage.removeItem('seconds');

});

//localStorage
function loadSelectedColor() {
  const selectedColor = localStorage.getItem('selectedColor');
  if (selectedColor) {
    switch (selectedColor) {
      case red:
        if (!redBtn.classList.contains('active')) {
          redBtn.click();
        }
        break;
      case blue:
        if (!blueBtn.classList.contains('active')) {
          blueBtn.click();
        }
        break;
      case purple:
        if (!purpleBtn.classList.contains('active')) {
          purpleBtn.click();
        }
        break;
    }
  } else {
    localStorage.setItem('selectedColor', blue);
    if (!blueBtn.classList.contains('active')) {
      blueBtn.click();
    }
  }
  const activeButtonId = localStorage.getItem('activeButtonId');
  if (!activeButtonId || !document.getElementById(activeButtonId)) {
    pomodoroButton.click(); // default active button
  } else {
    const activeButton = document.getElementById(activeButtonId);
    if (activeButton && !activeButton.classList.contains('active')) {
      activeButton.click();
    }
  }
}
loadSelectedColor();

// Load active button from localStorage
if (activeButtonId) {
  const activeButton = document.getElementById(activeButtonId);
  if (activeButton && !activeButton.classList.contains('active')) {
    activeButton.click();
  }
}


