// create obj push like array push
var obj = {
	length: 0,

	addElem: function addElem(elem) {
		[].push.call(this, elem);
	}
};

obj.addElem({'id': 1});
obj.addElem({'id': 2});

console.log(obj.length);

// Bonus: use '===' to test if original string was a palindrome
var str = '12345';
Array.prototype.map.call(str, function(x) {
  	return x;
}).reverse().join(''); 
// '54321'

var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.lastIndexOf(element);
while (idx != -1) {
  	indices.push(idx);
  	idx = (idx > 0 ? array.lastIndexOf(element, idx - 1) : -1);
}
console.log(indices);
// [4, 2, 0]

var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.indexOf(element);
while (idx != -1) {
  	indices.push(idx);
  	idx = array.indexOf(element, idx + 1);
}
console.log(indices);
// [0, 2, 4]

function f(n) { g(n - 1); }
function g(n) {
  	console.log('before: ' + g.arguments[0]);
  	if (n > 0) { 
  		f(n); 
  	}
  	console.log('after: ' + g.arguments[0]);
}
f(2);
console.log('returned: ' + g.arguments);
// before: 1
// before: 0
// after: 0
// after: 1
// returned: null

