import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  // Interface Watchface
  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let endTime = null;

refs.btn.addEventListener('click', onStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const currentTime = Date.now();
    const isPastDate = selectedDates[0] < currentTime;

    if (isPastDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      init();
      clearInterval(intervalId);
      return;
    }

    refs.btn.disabled = false;
    endTime = selectedDates[0];

    updateWatchface(countDeltaTime());
  },
};

flatpickr(refs.input, options);

init();

function init() {
  refs.btn.disabled = true;
  updateWatchface(0);
}

function onStartBtn() {
  intervalId = setInterval(onTick, 1000);
}

function onTick() {
  const deltaTime = countDeltaTime();
  const isEndTimer = deltaTime < 0;

  if (isEndTimer) {
    clearInterval(intervalId);
    Notiflix.Notify.success('Greeting, it is finish.');
    return;
  }

  updateWatchface(deltaTime);
}

function countDeltaTime() {
  const currentTime = Date.now();
  return endTime - currentTime;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateWatchface(deltaTime) {
  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  refs.days.textContent = addLeadingZero(days, 3);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value, digit = 2) {
  return String(value).padStart(digit, '0');
}
