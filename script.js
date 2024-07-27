let startTime = 0;
let intervalId;
let lapTimes = [];

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const timeDisplay = document.getElementById('time');
const lapTimesList = document.querySelector('#lap-times ul');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
  startTime = Date.now();
  intervalId = setInterval(updateTime, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  lapButton.disabled = false;
}

function pauseTimer() {
  clearInterval(intervalId);
  startButton.disabled = false;
  pauseButton.disabled = true;
  lapButton.disabled = true;
}

function resetTimer() {
  clearInterval(intervalId);
  startTime = 0;
  timeDisplay.textContent = '00:00:00';
  lapTimes = [];
  lapTimesList.innerHTML = ''; // Clear lap times list

  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
}

function recordLap() {
  let elapsedTime = Date.now() - startTime;
  let minutes = Math.floor(elapsedTime / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);
  let milliseconds = Math.floor(elapsedTime % 1000);

  lapTimes.push(`${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`);

  let lapItem = document.createElement('li');
  lapItem.textContent = lapTimes[lapTimes.length - 1];
  lapTimesList.appendChild(lapItem);
}

function updateTime() {
  let elapsedTime = Date.now() - startTime;
  let minutes = Math.floor(elapsedTime / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);
  let milliseconds = Math.floor(elapsedTime % 1000);

  timeDisplay.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
  return ('0' + num).slice(-2);
}