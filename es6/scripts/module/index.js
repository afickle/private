import animal, {say, type} from './content'
let says = say();
console.log(`The ${type} says ${say} to ${animal}`);

/*module animal from 'content.js';
console.log(animal)*/

// require
/*require(['./content.js'], function(animal) {
	console.log(animal);
})*/

// CommonJs
// var animal = require('./content.js');

// es6