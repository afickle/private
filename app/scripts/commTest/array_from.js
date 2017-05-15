// run the result with ctrl+B

// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 

// Array from a String
console.log(Array.from('foo')); 
// ["f", "o", "o"]

// Array from a Set
var s = new Set(['foo']); 
console.log(Array.from(s)); 
// var s = new Set(['foo'], window); ["foo", Window]

// Array from a Map
var m = new Map([[1, 2], [2, 4], [4, 8]]);
console.log(Array.from(m)); 
// [[1, 2], [2, 4], [4, 8]]

// Array from an Array-like object (arguments)
function f() {
  return Array.from(arguments);
}
console.log(f(1, 2, 3));
// [1, 2, 3]

/**
 * Using an arrow function as the map function to
 * manipulate the elements
 */
console.log(Array.from([1,2,3], x=>x+x))
// [2, 4, 6]

/**
 * Generate a sequence of numbers
 * Since the array is initialized with `undefined` on each position
 * the value of `v` below will be `undefined`
 */
console.log(Array.from({length:5}, (v,i)=>i))
// [0, 1, 2, 3, 4]
console.log(Array.from({length:5}, (v,i)=>v))
// [undefined, undefined, undefined, undefined, undefined]

// polyfill
if (!Array.from) {
	Array.from = (function() {
		var toStr = object.prototype.toString;
		var isCallable = function(fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
		};
		var toInteger = function(value) {
			var number = Number(value);
			if (isNan(number)) {
				return 0;
			}
			if (number === 0 || !isFinite(number)) {
				return number;
			}
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function(value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};

		return function from(arrayLike/*, mapFn, thisArg*/) {
			var C = this;

			var items = Object(arrayLike);

			if (arrayLike == null) {
				throw new TypeError("Array.from requires an array-like object - not null or undefined");
			}

			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== 'undefined') {
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

				if (arguments.length > 2) {
					T = arguments[2];
				}
			}

			var len = toLength(items.length);

			var A = isCallable(C) ? Object(new C(len)) : new Array(len);

			var k = 0;
			var kValue;
			while(k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				}
				else {
					A[k] = kValue;
				}
				k += 1;
			}

			A.length = len;

			return A;
		}
	}());
}