var app = angular.module('myApp', ['autoinput']);

app.controller('myController', ['$timeout', '$scope', function($timeout, vm) {
	var data = {};
	var page = {
		focus: {
			input1: 1,
			input2: 0
		}
	};

	vm.data = data;
	vm.page = page;
	
}]);