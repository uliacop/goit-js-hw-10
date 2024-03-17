import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const delayInput = form.elements.delay;
  const stateInput = form.elements.state;
  const delay = delayInput.value;
  const state = stateInput.value;
  delayInput.value = '';
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      showMessage('fulfilled', delay);
    })
    .catch(delay => {
      showMessage('rejected', delay);
    });
  stateInput.forEach(radio => (radio.checked = false));
}

function showMessage(type, delay) {
  if (type === 'fulfilled') {
    iziToast.success({
      title: 'Success',
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight',
    });
  } else {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight',
    });
  }
}
