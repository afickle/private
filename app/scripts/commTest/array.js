arr.forEach(function callback(currentValue, index, array) {
    /*function logArrayElements(element, index, array) {
  		console.log('a[' + index + '] = ' + element);
	}
	[2, 5, , 9].forEach(logArrayElements);
	// a[0] = 2 a[1] = 5 a[3] = 9*/
}[, thisArg]);

var a = [1, 2, 3];
a.unshift(4, 5);
console.log(a);

arr.toString()

arr.toLocaleString();
arr.toLocaleString(locales);
arr.toLocaleString(locales, options);

array.splice(start)
array.splice(start, deleteCount)
array.splice(start, deleteCount, item1, item2, ...)

arr.sort()
arr.sort(compareFunction)

arr.some(callback(currentValue, index, array), thisArg])

arr.slice()
arr.slice(begin)
arr.slice(begin, end)

arr.shift()

arr.reverse()

arr.reduceRight(callback(previousValue, currentValue, index, array), initialValue])

arr.reduce(callback(accumulator, currentValue, index, array), [initialValue])