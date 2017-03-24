/**
 * create an array without loop with elements which every equals to subscript
 * @param  {int} length [the length of array]
 * @param  {array} arr    [an enpty array]
 * @return {array}        [return the result array]
 */
function create_array(length, arr) {
	// body...
	arr = arr || [];
	if (arr.length < length) {
		arr.push(arr.length);
		return create_array(length, arr);
	}
	else {
		return arr;
	}
}
create_array(100, []);

// es6
let a  = new Array(100)
a.fill(1)
console.log(a.map((data, i, arr)=>i))