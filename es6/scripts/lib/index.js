'use strict';

var _content = require('./content');

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var says = (0, _content.say)();
console.log('The ' + _content.type + ' says ' + _content.say + ' to ' + _content2.default);

/*module animal from 'content.js';
console.log(animal)*/

// require
/*require(['./content.js'], function(animal) {
	console.log(animal);
})*/

// CommonJs
// var animal = require('./content.js');

// es6