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
        progressCircle.style.clip = `rect(0, ${100 - (timer / duration) * 100}px, 100px, 0)`;

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
shortBreakButton.addEventListener('click', () => resetTimer(4 * 60));
longBreakButton.addEventListener('click', () => resetTimer(30 * 60));
pauseButton.addEventListener('click', pauseTimer);


