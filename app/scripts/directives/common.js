var app = angular.module('commDir', []);

app.directive('onKeyenter', function() {
    return function(scope, element, attr) {
        element.bind("keyup", function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if(keycode==13){
                scope.$apply(attrs.onKeyenter);
            }
        });
    };
});

app.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind('keyup', function(e) {
			var keycode = window.event ? e.keyCode : e.which;
			if(keycode === 13) {
                scope.$apply(function (){
                	// if with setTimeout. there will be delayed
                	// so there must be a $scope.$apply() to triggle
                	// setTimeout(function(){
                    	scope.$eval(attrs.ngEnter);
                    // }, 0);
                });
                element.blur();
                event.preventDefault();
            }
		});
	};
});

app.directive('ayAutofocus', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		scope: {
			'ayAutofocus': '='	
		},
		link: function($scope, $element) {
			$scope.$watch('ayAutofocus', function(newVal, oldVal) {
				// watch ayAutofocus's change
				if (newVal) {
					$timeout(function() {
						$element[0].focus();
					});
				}
			})
		}
	}
}]);	

app.directive('lyReadyfocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    scope: {
    	'ayAutofocus': '='
    },
    link: function($scope, $element) {

    }
  }
}]);

app.directive('ngBack', ['$window', function($window) {
	return {
		restrict: 'A',
		link: function($scope, $element, attrs) {
			$element.on('click', function() {
				$window.history.back();
			});
		}
	};
}]);