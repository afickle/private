window.raf = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function Timer() {
  this.start();
  return this;
};

Timer.prototype = {
  /**
   * Starts the timer
   * @chainable
   */
  start: function() {
    this.startTime = Date.now();
    return this;
  },

  /**
   * Returns an object of the elapsed time
   * @return {Object} { hours, minutes, seconds }
   */
  getElapsedTime: function() {
    var hours = 0;
    var minutes = 0;
    var seconds = parseInt((Date.now() - this.startTime) / 1000);

    // check if the elapsed time in seconds is more than a minute
    // and convert the raw seconds to minutes & seconds
    if (seconds > 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;
    }

    // check if the elapsed time in minutes is more than an hour
    // and convert the raw seconds to hours, minutes & seconds
    if (minutes > 60) {
      hours = Math.floor(seconds / 3600);
      minutes = seconds - hours * 60;
      seconds = seconds - minutes * 3600;
    }

    return {
      hours: pad(hours, 2),
      minutes: pad(minutes, 2),
      seconds: pad(seconds, 2)
    };
  }
};

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

var timer = new Timer();
var output = document.getElementById('time');

(function update() {
  var time = timer.getElapsedTime();
  output.textContent = time.hours + ':' + time.minutes + ':' + time.seconds;
  raf(update);
})();