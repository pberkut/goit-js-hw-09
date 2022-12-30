import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),

  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

// Temp value
refs.delay.value = 500;
refs.step.value = 100;
refs.amount.value = 5;

refs.form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();

  let delay = Number(refs.form.elements.delay.value);
  const step = Number(refs.form.elements.step.value);
  const amount = refs.form.elements.amount.value;

  let position = 1;

  for (position = 1; position <= amount; position += 1) {
    delay += step;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        }
        reject({ position, delay });
      }, delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        }
        reject({ position, delay });
      }, delay);
    });
  }
}
