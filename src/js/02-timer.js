import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const inputEl = document.querySelector('input');
const btnEl = document.querySelector('button');
const timerDaysEl = document.querySelector('[data-days]');
const timerHoursEl = document.querySelector('[data-hours]');
const timerMinutesEl = document.querySelector('[data-minutes]');
const timerSecondsEl = document.querySelector('[data-seconds]');

btnEl.setAttribute('disabled', 'true');

const date = new Date();
let userSelectedDates = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < date) {
      Report.failure(
        'СЛАВА УКРАЇНІ!',
        'НАЖАЛЬ, ВОНИ ЩЕ НЕ ЗДОХЛИ :(',
        'ГЕРОЯМ СЛАВА!'
      );
      btnEl.setAttribute('disabled', 'true');
      return;
    }

    btnEl.removeAttribute('disabled');
    userSelectedDates = selectedDates[0];
  },
};

const timer = {
  intervalId: null,

  start(deadline) {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const diff = deadline - now;

      if (diff <= 0) {
        return this.stop();
      }

      const { days, hours, minutes, seconds } = this.convertMs(diff);

      timerDaysEl.textContent = this.pad(days);
      timerHoursEl.textContent = this.pad(hours);
      timerMinutesEl.textContent = this.pad(minutes);
      timerSecondsEl.textContent = this.pad(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  pad(value) {
    return String(value).padStart(2, 0);
  },

  convertMs(ms) {
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
  },
};

flatpickr(inputEl, options);

btnEl.addEventListener('click', () => {
  timer.start(userSelectedDates);
  btnEl.setAttribute('disabled', 'true');
  inputEl.setAttribute('disabled', 'true');
});
