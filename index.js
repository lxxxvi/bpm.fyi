document.addEventListener("DOMContentLoaded", function(){
  const MILISECONDS_IN_A_MINUTE = 60000;
  const click = ((document.ontouchstart !== null) ? 'click' : 'touchstart');

  // Elements
  const tapButton           = document.querySelector("button.tap");
  const resetButton         = document.querySelector("button.reset");
  const previousTimestamp   = document.querySelector("input.previous-timestamp");
  const bpmHistoryElements  = document.querySelectorAll('.output .history output');
  const bpmAverage          = document.querySelector('.output .average output');
  const infoElement         = document.querySelector('.output .info');

  const refresh = function() {
    let currentTimestamp = Date.now();
    let previousTimestamp = getPreviousTimestamp();
    let bpm = calculateBpm(previousTimestamp, currentTimestamp);

    updatePreviousTimestamp(currentTimestamp);
    updateHistory(bpm);
    updateAverage();
    updateInfoElement();
  }

  const calculateBpm = function(previousTimestamp, currentTimestamp) {
    let previous = parseInt(previousTimestamp) || 0;
    let current  = parseInt(currentTimestamp) || 0;

    if (previous > 0 && current > 0) {
      let milisecondsDifference = (current - previous);
      let bpm = Math.round(MILISECONDS_IN_A_MINUTE / milisecondsDifference);

      if (bpm > 10) {
        return bpm;
      }
    }

    reset();
    return '';
  }

  const getPreviousTimestamp = function() {
    return previousTimestamp.value;
  }

  const updatePreviousTimestamp = function(value) {
    previousTimestamp.value = value;
  }

  const updateHistory = function(newestBpm) {
    bpmHistoryElements.forEach(function(bpmHistoryElement) {
      let nextElement = bpmHistoryElement.nextElementSibling;

      if (nextElement != null) {
        newValue = nextElement.value;
      } else {
        newValue = newestBpm;
      }

      bpmHistoryElement.value = newValue;
    });
  }

  const bpmHistoryElementValues = function() {
    let arr = [];

    bpmHistoryElements.forEach(function(bpmHistoryElement) {
      let number = parseInt(bpmHistoryElement.value) || 0;

      if (number > 0) {
        arr.push(number);
      }
    });

    return arr;
  }

  const updateAverage = function() {
    let values = bpmHistoryElementValues();

    bpmAverage.value = avg(values);
  }

  const avg = function(numbers) {
    console.log(numbers);
    if (numbers.length < 1) {
      return '...';
    }

    let total = 0;
    for (i = 0; i < numbers.length; i += 1) {
      total = total + numbers[i];
    }

    return parseInt(total / numbers.length);
  }

  const reset = function() {
    bpmHistoryElements.forEach(resetElement);
    resetElement(bpmAverage);
    resetElement(previousTimestamp);
    updateInfoElement();
  }

  const resetElement = function(element) {
    element.value = "";
  }

  const initializeInfoElement = function() {
    infoElement.innerHTML = 'Start tapping';
  }

  const clearInfoElement = function() {
    infoElement.innerHTML = '';
  }

  const updateInfoElement = function() {
    let values = bpmHistoryElementValues();

    if (values.length < 1) {
      initializeInfoElement();
    } else {
      clearInfoElement();
    }
  }

  tapButton.addEventListener(click, refresh, { passive: false });
  resetButton.addEventListener(click, reset, { passive: false });

  reset();
});
