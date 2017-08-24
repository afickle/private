var a = function(i) {return i + i};

var b = (i) => i + i;
console.log(b(1));

var c = function(x, y) {
	x++;
	y--;
	return x + y;
}

var d = (x, y) => {
	x++;
	y--;
	return x + y;
}
console.log(d(1,2));

var p = (...args) => {
	console.log(args);
	return args[0] + args[1];
}
console.log(p(1,2));

// this => windows
class Animal1 {
	constructor() {
		this.type = 'animal';
	}
	says(say) {
		setTimeout(function() {
			console.log(`${this.type} says ${say}`);
		}, 1000);
	}
}
var animal1 = new Animal1();
animal1.says('hi');

// a var this temp
class Animal2 {
	constructor() {
		this.type = 'animal';
	}
	says(say) {
		var _this = this;
		setTimeout(function() {
			console.log(`${_this.type} says ${say}`);
		}, 1000);
	}
}
var animal2 = new Animal2();
animal2.says('hi');

// bind this
class Animal3 {
	constructor() {
		this.type = 'animal';
	}
	says(say) {
		setTimeout(function() {
			console.log(`${this.type} says ${say}`);
		}.bind(this), 1000);
	}
}
var animal3 = new Animal3();
animal3.says('hi');

// arrow function bind this
class Animal4 {
	constructor() {
		this.type = 'animal';
	}
	says(say) {
		setTimeout(() => {
			console.log(`${this.type} says ${say}`);
		}, 1000);
	}
}
var animal4 = new Animal4();
animal4.says('hi');