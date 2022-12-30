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

  const delay = refs.form.elements.delay.value;
  const step = refs.form.elements.step.value;
  const amount = refs.form.elements.amount.value;

  for (let i = 1; i <= amount; i += 1) {
    console.log(i);
  }
}
// createPromise(position, delay).then(result => {
//   console.log(result);
// });

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve('Ok');
      }
      reject('error');
    }, delay);
  });
}

// createPromise
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   });
