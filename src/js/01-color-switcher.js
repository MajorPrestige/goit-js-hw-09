bodyEl = document.querySelector('body');
btnStartEl = document.querySelector('[data-start]');
btnStopEl = document.querySelector('[data-stop]');
btnStopEl.setAttribute('disabled', 'true');

btnStartEl.addEventListener('click', startSwitchColor);
btnStopEl.addEventListener('click', stopSwitchColor);

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startSwitchColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(
    () => (bodyEl.style.backgroundColor = getRandomHexColor()),
    1000
  );
  btnStartEl.setAttribute('disabled', 'true');
  btnStopEl.removeAttribute('disabled');
}

function stopSwitchColor() {
  btnStartEl.removeAttribute('disabled');
  btnStopEl.setAttribute('disabled', 'true');
  clearInterval(timerId);
}
