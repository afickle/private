['1', '2', '3'].map(parseInt)
// [1, NaN, NaN]

for(var i = 0; i < 5; i++) {
	setTimeout(function() {
		console.log(new Date(), i);
	}, 1000)
}
console.log(new Date(), i);
/*Fri Mar 24 2017 16:18:51 GMT+0800 (中国标准时间) 5
undefined
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 5
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 5
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 5
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 5
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 5*/

// 闭包
for(var i = 0; i < 5; i++) {
	(function(j) {
		setTimeout(function() {
			console.log(new Date(), j);
		}, 1000)
	})(i);
}
console.log(new Date(), i);

// es6 let
for(let i = 0; i < 5; i++) {
	setTimeout(function() {
		console.log(new Date(), i);
	}, 1000)
}
console.log(new Date(), i);

// put output alone with loop
var output = function(i) {
	setTimeout(function() {
		console.log(new Date(), i);
	}, 1000);
};
for(var i = 0; i < 5; i++) {
	output(i);
}
console.log(new Date(), i);
// 利用 IIFE（Immediately Invoked Function Expression：声明即执行的函数表达式）
/*Fri Mar 24 2017 16:18:51 GMT+0800 (中国标准时间) 5
undefined
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 0
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 1
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 2
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 3
Fri Mar 24 2017 16:18:52 GMT+0800 (中国标准时间) 4*/

