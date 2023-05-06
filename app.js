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

const red = "#F87070";
const blue = "#70F3F8";
const purple = "#D881F8";

const redBtn = document.querySelector(".red");
const blueBtn = document.querySelector(".blue");
const purpleBtn = document.querySelector(".purple");
const mainBtns = document.querySelectorAll(".main-button");

const radius = progressCircle.offsetWidth / 2; //




function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  

  if (localStorage.getItem('currentTimer') === 'saved') {
    if (localStorage.getItem('minutes') && localStorage.getItem('seconds')) {
      minutes = localStorage.getItem('minutes');
      seconds = localStorage.getItem('seconds');
      display.textContent = `${minutes}:${seconds}`;

      timer = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    }
  } else {
    localStorage.removeItem('minutes');
    localStorage.removeItem('seconds');
  }

  countdown = setInterval(function () {
    if (!pause) {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      localStorage.setItem('minutes', minutes);
      localStorage.setItem('seconds', seconds);

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
          const audio = new Audio('audio/snuffbox.mp3');
          audio.play();
          pauseTimer()
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
    localStorage.setItem('remainingTime', timer);
  }, 1000);
}

// stored 
if (localStorage.getItem('minutes') && localStorage.getItem('seconds')) {
  const minutes = localStorage.getItem('minutes');
  const seconds = localStorage.getItem('seconds');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}



function pauseTimer() {
  pause = !pause;
  pauseButton.textContent = pause ? 'start' : 'pause';
  if (!pause) {
    startTimer(remainingTime, timerDisplay);
  }
}

function resetTimer(duration) {
  clearInterval(countdown);
  pause = false;
  pauseButton.textContent = 'start';
  remainingTime = duration;
  localStorage.removeItem('remainingTime');
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

    // Save font and color settings
    const fontButtons = document.querySelectorAll('.settings__fonts-font');
    const colorButtons = document.querySelectorAll('.settings__colors-color');

    settingsModal.style.display = 'none';
  } else {
    alert('Please enter valid numbers');
  }
});


const shortBreakInput = document.getElementById('shortTimeInput');
const longBreakInput = document.getElementById('longTimeInput');


// Save to localStorage
const applyButton = document.querySelector('.settings__button-apply');
applyButton.addEventListener('click', () => {
  localStorage.setItem('pomodoroTime', pomodoroInput.value);
  localStorage.setItem('shortBreakTime', shortBreakInput.value);
  localStorage.setItem('longBreakTime', longBreakInput.value);

});

// Load saved values from localStorage
pomodoroInput.value = localStorage.getItem('pomodoroTime') || pomodoroInput.value;
shortBreakInput.value = localStorage.getItem('shortBreakTime') || shortBreakInput.value;
longBreakInput.value = localStorage.getItem('longBreakTime') || longBreakInput.value;

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

  function setActiveButton(btn) {
    const activeBtn = document.querySelector('.main-button.active');
    if (activeBtn) {
      activeBtn.classList.remove('active');
    }
    btn.classList.add('active');
    btn.style.color = '#1e213f';
    btn.style.borderRadius = '1.6em';
    btn.style.opacity = '1';
    btn.style.transition = '0.3s';
  }

  // Change bg-color .main-buttons
  mainBtns.forEach((btn) => {
    btn.style.backgroundColor = "";
    btn.style.color = "";

    btn.addEventListener('click', () => {

      mainBtns.forEach((btn) => btn.classList.remove('active'));
      btn.classList.add('active');
      btn.style.backgroundColor = this.color;
      localStorage.setItem('activeButtonId', btn.id);
      setActiveButton(btn);
      if (btn !== activeButtonId && btn.classList.contains('active')) {
        btn.classList.remove('active');
      }
    });

    btn.addEventListener("mousedown", () => {
      btn.style.backgroundColor = this.color;
    });

    btn.addEventListener("focus", () => {
      setActiveButton(btn);
    });

    btn.addEventListener("blur", () => {
      btn.classList.remove('active');
      btn.style.backgroundColor = "";
      btn.style.color = "";
    });
  });

  pauseButton.addEventListener("mouseover", () => {
    pauseButton.style.color = this.color;

  });
  pauseButton.addEventListener("mouseout", () => {
    pauseButton.style.color = "";
  });

  progressCircle.style.borderColor = this.color;
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



//To keep active until another button clicked
function removeActiveClass() {
  pomodoroButton.classList.remove('active');
  shortBreakButton.classList.remove('active');
  longBreakButton.classList.remove('active');
  mainBtns.forEach((btn) => {
    btn.classList.remove('active');
  });
}


pomodoroButton.addEventListener('click', () => {
  removeActiveClass();
  pomodoroButton.classList.add('active');
  resetTimer(pomodoroInput.value * 60);
  timer.textContent = pomodoroInput.value + ':00'
});


shortBreakButton.addEventListener('click', () => {
  removeActiveClass();
  shortBreakButton.classList.add('active');
  resetTimer(shortBreakInput.value * 60);
  timer.textContent = shortBreakInput.value + ':00'

});

longBreakButton.addEventListener('click', () => {
  removeActiveClass();
  longBreakButton.classList.add('active');
  resetTimer(longBreakInput.value * 60);
  timer.textContent = longBreakInput.value + ':00'
});



//localStorage
function loadSelectedColor() {
  const selectedColor = localStorage.getItem("selectedColor");
  if (selectedColor) {
    switch (selectedColor) {
      case red:
        redBtn.click();
        break;
      case blue:
        blueBtn.click();
        break;
      case purple:
        purpleBtn.click();
        break;
    }
  }
};

loadSelectedColor();

// Load active button from localStorage
const activeButtonId = localStorage.getItem('activeButtonId');
if (activeButtonId) {
  const activeButton = document.getElementById(activeButtonId);
  if (activeButton) {
    activeButton.click();
  }
};
