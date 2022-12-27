const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const INTERVAL_TIMER = 1000;
let timerId = null;

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_TIMER);
}

function onStopClick() {
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
