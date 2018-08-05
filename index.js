document.addEventListener("DOMContentLoaded", function(){
  const click = ((document.ontouchstart !== null) ? 'click' : 'touchstart');
  const bpmButton = document.querySelector("button.tap");
  const timestamp = document.querySelector("input");
  const bpmOutput = document.querySelector("output");
  const bpmHistoryElements = document.querySelectorAll('.input-output .history output');
  const bpmAverage = document.querySelector('.input-output .average output');
  const MILISECONDS_IN_A_MINUTE = 60000;

  const refresh = function() {
    let nextTimestamp = Date.now();
    let previousTimestamp = getPreviousTimestamp();
    let bpm = calculateBpm(previousTimestamp, nextTimestamp);

    setBpm(bpm);
    setTimestamp(nextTimestamp);
    updateHistory(bpm);
    updateAverage();
  }

  const calculateBpm = function(previousTimestamp, nextTimestamp) {
    let previous = parseInt(previousTimestamp) || 0;
    let next     = parseInt(nextTimestamp) || 0;

    if (previous > 0 && next > 0) {
      let milisecondsDifference = (next - previous);

      return Math.round(MILISECONDS_IN_A_MINUTE / milisecondsDifference);
    }

    return '...';
  }

  const setBpm = function(value) {
    bpmOutput.value = value;
  }

  const getPreviousTimestamp = function() {
    return timestamp.value;
  }

  const setTimestamp = function(value) {
    timestamp.value = value;
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

  const updateAverage = function() {
    let arr = [];

    bpmHistoryElements.forEach(function(bpmHistoryElement) {
      let number = parseInt(bpmHistoryElement.value) || 0;

      if (number > 0) {
        arr.push(number);
      }
    });

    bpmAverage.value = parseInt(avg(arr));
  }

  const avg = function(numbers) {
    let total = 0;
    for (i = 0; i < numbers.length; i += 1) {
      total = total + numbers[i];
    }

    return total / numbers.length;
  }

  bpmButton.addEventListener(click, refresh, { passive: false });
});
