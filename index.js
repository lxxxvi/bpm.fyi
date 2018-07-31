document.addEventListener("DOMContentLoaded", function(){
  const click = ((document.ontouchstart !== null) ? 'click' : 'touchstart');
  const bpmButton = document.querySelector("button");
  const timestamp = document.querySelector("input");
  const bpmOutput = document.querySelector("output");
  const MILISECONDS_IN_A_MINUTE = 60000;

  const refresh = function() {
    let nextTimestamp = Date.now();
    let previousTimestamp = getPreviousTimestamp();
    let bpm = calculateBpm(previousTimestamp, nextTimestamp);

    setBpm(bpm);
    setTimestamp(nextTimestamp);
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

  bpmButton.addEventListener(click, refresh, { passive: false });
});
