'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// babel-node part2.js
console.log([1, 2, 3].map(function (x) {
	return x * x;
}));

var Calc = function () {
	function Calc() {
		_classCallCheck(this, Calc);

		console.log('Calc constructor');
	}

	_createClass(Calc, [{
		key: 'add',
		value: function add(a, b) {
			return a + b;
		}
	}]);

	return Calc;
}();

var c = new Calc();
console.log(c.add(4, 5));

var a = [];
var b = [];

for (var i = 0; i < 10; i++) {
	a[i] = function () {
		console.log(i);
	};
}
a[6](); //10

// let只在代码块中有效  这句语句i只在本轮循环中有效

var _loop = function _loop(_i) {
	a[_i] = function () {
		console.log(_i);
	};
};

for (var _i = 0; _i < 10; _i++) {
	_loop(_i);
}
a[6](); //6

// 什么时候y=2时报错呢~~？
// function bar(x = 2, y = 2) {
function bar() {
	var x = arguments.length <= 0 || arguments[0] === undefined ? 2 : arguments[0];
	var y = arguments.length <= 1 || arguments[1] === undefined ? x : arguments[1];

	return [x, y];
}
console.log(bar());

var tem = new Date();
function f() {
	console.log(tem);
	if (false) {
		// 重新声明变量，内层变量会覆盖外层变量
		var tem = "hello world !";
	}
}
f(); //undefined

var s = 'hello';
for (var i = 0; i < s.length; i++) {
	console.log(s[i]);
}
// 控制循环的条件i，泄露成了全局变量
console.log(i);

// 跨模板常量  从constants.js中读取常量

console.log(constants.A);
console.log(constants.B);
console.log(constants.C);
