var app = angular.module('myApp', ['comm']);

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
	vm.change = change;

	// change input focus
	function change(type) {
		if (type == 1) {
			page.focus.input2 ++;
		}
		else {
			page.focus.input1 ++;
		}
		// this one is just fill with setTimeout
		// vm.$apply();
	}
}]);