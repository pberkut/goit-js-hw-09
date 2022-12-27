import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');

const refs = {
  btn: document.querySelector('[data-start]'),

  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let deltaTime = null;
let intervalId = null;
let endTime = null;

refs.btn.addEventListener('click', onStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentTime = Date.now();
    const isPastDate = selectedDates[0] < currentTime;
    console.log(isPastDate);
    if (isPastDate) {
      alert('Please choose a date in the future');
      init();
      return;
    }
    refs.btn.disabled = false;
    endTime = selectedDates[0];
  },
};

const flatpickr = flatpickr(inputRef, options);
// init();

function init() {
  refs.btn.disabled = true;
}

function onStartBtn() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();

    deltaTime = endTime - currentTime;

    if (deltaTime < 0) {
      clearInterval(intervalId);
      return;
    }
    onTick(deltaTime);
  }, 1000);
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

function onTick(deltaTime) {
  const time = convertMs(deltaTime);
  console.log(time);
  updateClockFace(time);
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days, 3);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value, digit = 2) {
  return String(value).padStart(digit, '0');
}
