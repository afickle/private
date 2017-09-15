// babel-node part2.js
// babel part2.js -o part_2.js babel转码
console.log([1,2,3].map(x => x * x))

class Calc {
	constructor() {
		console.log('Calc constructor');
	}
	add(a, b) {
		return a + b;
	}
}

var c = new Calc();
console.log(c.add(4,5));

var a = [];
var b = [];

for (var i = 0; i < 10; i++) {
	a[i] = function() {
		console.log(i);
	}
}
a[6]();   //10

// let只在代码块中有效  这句语句i只在本轮循环中有效
for (let i = 0; i < 10; i++) {
	a[i] = function() {
		console.log(i);
	}
}
a[6]();   //6

// 什么时候y=2时报错呢~~？
// function bar(x = 2, y = 2) {
function bar(x = 2, y = x) {
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
f();   //undefined

var s = 'hello';
for (var i = 0; i < s.length; i++) {
	console.log(s[i]);
}
// 控制循环的条件i，泄露成了全局变量
console.log(i);

// 跨模板常量  从constants.js中读取常量
import * as constants from './constants';
console.log(constants.A);
console.log(constants.B);
console.log(constants.C);