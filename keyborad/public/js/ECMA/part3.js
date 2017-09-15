function add(one) {
	return function add(two) {
		return one + two;
	}
}

const a = add(1);
const b = add(2);

console.log(a);
console.log(a(1));
console.log(b);
console.log(b(1));

function demo(r) {
	var k = 1;
	return {
		getSquare : function() {
			return r * r * k;
		},
		incr : function() {
			k++;
		}
	}
}

console.log(demo(1));
console.log(demo(2));

// 第2333个能被2/3整除的数字
var solution = function(n){
return Math.floor( n / 4 ) * 2 + n + ( ( n % 4 === 0) ? 0 : 1 )
}
console.log(solution(2333));

for(var i = 1,e = 0;e < 2333;i++){
	if(i % 2 == 0 || i % 3 == 0) {
		e++;
	}
};
console.log(i-1);