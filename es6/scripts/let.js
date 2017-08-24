var name1 = 'ly';

while(true) {
    var name1 = 'lcj';
    console.log(name1);
	break;
}
console.log(name1);

let name2 = 'ly';
while(true){
	let name2 = 'lcj';
	console.log(name2);
	break;
}
console.log(name2);

// 闭包？
function iter(i) {
	var b = function() {
		console.log(i)
	}
	return b;
}

var a = [];
for(var i = 0; i < 10; i++){
	a[i] = function() {
		console.log(i);
	};
}
a[6]();

var c = [];
for(var i = 0; i < 10; i++) {
	c[i] = iter(i);
}
c[6]();

var b = [];
for(let i = 0; i < 10; i++) {
	b[i] = function() {
		console.log(i)
	};
}
b[6]();

var c = [];
for(var i = 0; i < 10; i++) {
	// 闭包
	c[i] = (function(i) {
		return function() {
			console.log(i)
		}
	})(i);
}
c[6]();