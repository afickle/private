var obj = {
	name: 'ly',
	age: 18
};

var es5 = 'my name: ' + obj.name + ', I\'m ' + obj.age;

var es6 = `my name: ${obj.name}, I'm ${obj.age}`;

console.log(es5);

console.log(es6);