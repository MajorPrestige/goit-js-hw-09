import { Notify } from 'notiflix/build/notiflix-notify-aio';

firstDelayEl = document.querySelector('[name="delay"]');
delayStepEl = document.querySelector('[name="step"]');
amountEl = document.querySelector('[name="amount"]');
formEl = document.querySelector('form');

let firstDelay = null;
let delayStep = null;
let amount = null;

firstDelayEl.addEventListener('blur', () => {
  firstDelay = Number(firstDelayEl.value);
});

delayStepEl.addEventListener('blur', () => {
  delayStep = Number(delayStepEl.value);
});

amountEl.addEventListener('blur', () => {
  amount = Number(amountEl.value);
});

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += delayStep;
  }
});
