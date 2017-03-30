window.onload = function() {
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d'),
		mouseX = 0,
		mouseY = 0,
		width = 300,
		height = 300,
		color = 'hotpink',
		mousedown = false;

	canvas.width = width;
	canvas.height = height;

	function draw() {
		if (mousedown) {
			c.fillStyle = color;
			c.beginPath();
			c.arc(mouseX, mouseY, 10, 0, Math.PI * 2, true);
			c.fill();
		}
	}

	canvas.addEventListener('mousemove', function(ev) {
		if (ev.offsetX) {
			mouseX = ev.offsetX;
			mouseY = ev.offsetY;
		}
		else {
			mouseX = ev.pageX - ev.target.offsetLeft;
			mouseY = ev.pageY - ev.target.offsetTop;
		}
		draw();
	}, false);

	canvas.addEventListener('mousedown', function(ev) {
		mousedown = true;
	}, false);

	canvas.addEventListener('mouseup', function(ev) {
		mousedown = true;
	}, false);

	var link = document.createElement('a');
	link.innerHTML = 'download image';

	link.addEventListener('click', function(ev) {
		link.href = canvas.toDataURL();
		link.download = "test.png";
	}, false);

	document.body.appendChild(link);
}