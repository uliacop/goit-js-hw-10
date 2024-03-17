import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < currentDate) {
      iziToast.error({ message: 'Please choose a date in the future' });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addNewFormat(value) {
  return value < 10 ? '0' + value : value;
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  input.disabled = true;
  const endDate = new Date(userSelectedDate).getTime();

  const countdownInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const remainingTime = endDate - currentDate;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      startBtn.disabled = true;
      input.disabled = false;
    } else {
      const time = convertMs(remainingTime);
      days.textContent = addNewFormat(time.days);
      hours.textContent = addNewFormat(time.hours);
      minutes.textContent = addNewFormat(time.minutes);
      seconds.textContent = addNewFormat(time.seconds);
    }
  }, 1000);
});
