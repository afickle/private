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
	 * Start the timer
	 * @chainable
	 */
	start: function() {
		this.startTime = Date.now();
		return this;
	},

	getElapsedTime: function() {
		var hour = 0;
		var minute = 0;
		var seconds = parseInt((Date.now() - this.startTime) / 1000);
	}
}