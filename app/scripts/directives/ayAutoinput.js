var app = angular.module('autoinput', []);
// without ng-translude
app.run(['$templateCache', function($templateCache) {
	$templateCache.put('template/select/noneTransclude.html',
		'<div> <h3>none-translude</h3> <div>I\'m the info of none-transclude</div> </div> '
	);
}]);

app.directive('noneTransclude', function() {
	return {
		restrict: 'EA',
		transclude: false,
		templateUrl: 'template/select/noneTransclude.html'
	};
})

// one-transclude with ng-transclude
app.run(['$templateCache', function($templateCache) {
	$templateCache.put('template/select/oneTransclude.html',
		'<div> <h3>one-translude-inner</h3> <div>I\'m the inner info of one-transclude</div> <ng-transclude>I\'m the inner element info of one-transclude</ng-transclude> </div> '
	);
}]);

app.directive('oneTransclude', function() {
	return {
		restrict: 'EA',
		transclude: true,
		templateUrl: 'template/select/oneTransclude.html'
	};
})

// multi-transclude with ng-transclude
app.run(['$templateCache', function($templateCache) {
	$templateCache.put('template/select/multiTransclude.html',
		'<div> <div ng-transclude="title"></div> <div>ignore me please, I\'m just improve inner 1</div> <div ng-transclude="body"></div> <div>ignore me please, I\'m just improve inner 2</div> <div ng-transclude="footer"></div> </div> <div>ignore me please, I\'m just improve inner 3</div> </div> '
	);
}]);

app.directive('multiTransclude', function() {
	return {
		restrict: 'EA',
		transclude: {
			'title': 'multiTranscludeTitle',
			'body': 'multiTranscludeBody',
			'footer': 'multiTranscludeFooter'
		},
		templateUrl: 'template/select/multiTransclude.html'
	};
})


app.run(['$templateCache', function($templateCache) {
	$templateCache.put('template/common/autoComplete.html',
					'<span class="ay-trigger" ng-transclude></span>'
                    + '<div ng-show="isShow && data.results.length" class="ay-container">'
                        + '<ul class="ay-menu">'
                            + '<li class="ay-menu-item" ng-repeat="result in data.results" id="{{result.id}}" role="option" ng-class="$index == selected_index ? \'ay-state-focus\': \'\'">'
                                + '<a href ng-click="select($index)" ng-bind-html="result.label"></a>'
                            + '</li>'
                        + '</ul>'
                    + '</div>'
	);
}]);

app.factory('debounce', function($timeout) {
    return function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            $timeout.cancel(timeout);
            timeout = $timeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    };
})

app.directive('ayAutoinput', function($timeout, $q, $document, $parse, debounce) {
	return {
		restrict: 'A',

		scope: {
			'ayAutoinput': '=',
            'autoRow': '='
		},

		transclude: true,

		templateUrl: 'template/common/autoComplete.html',

		link: function($scope, element, attrs, required) {
			var input = element.find('.ay-trigger input');

			var options = $scope.ayAutoinput;

			var row = $scope.autoRow;

			var require_verify = !!options.verify;

			var suggest = $scope.suggest = debounce(suggest_, 200);
			
			var verify_setter = $parse(options.verify).assign;

			$scope.result = [];

			$scope.isShow = false;

			$scope.select = select;

			$scope.selected_index = 0;

			input.attr('ayAutoinput', 'off');

			input.bind('focus', function() {
				attach();
				suggest(this.value);
			})

			.bind('blur', function() {
				suggest(this.value);
			})

			.bind('keypress', function(e) {
				var keyCode = window.event ? e.keyCode : e.which;
				if (keyCode == 13) {
					select_default(this.value);
					e.preventDefault();
				}
			})

			.bind('keydown', function(e) {
				var keyCode = window.event ? e.keyCode : e.which;
				if (keyCode == 40) {
					// down
					select_move(1);
					e.preventDefault();
				}
				else if(keyCode == 38) {
					select_move(-1);
					e.preventDefault();
				}
			})

			function suggest_(key) {
				console.log(key)
				$scope.selected_index = 0;
				$scope.waiting = true;

				if (typeof(key) === 'string' && key.length > 0) {
					$q.when(options.suggest(key), 
						function suggest_succeeded(suggestions) {
							if (suggestions && suggestions.length > 0) {
								$scope.result = [].concat(suggestions);
							}
							else {
								$scope.result = [];
							}
						},
						function suggest_failed(err) {

						}
					).finally(function suggest_finally() {
						$scope.waiting = false;
					});
				}
				else {
					$scope.waiting = false;
					$scope.result = [];
					$scope.$apply();
				}
			}

			function verify() {
				var cur = input.val();
				var results = $scope.results;
				var key = options.key || 'name';
				var ret = false;
				for(var i in results) {
					if (results[i][key] == cur) {
						ret = true;
						break;
					}
				}

				if (angular.isFunction(options.verify)) {
					if (row) {
						options.verify(ret, row);
					}
					else {
						options.verify(ret);
					}
				}
			}

			function guess() {
				var cur = input.val();
				var results = $scope.results;
				var key = options.code || 'code';
				var ret;
				for(var i in results) {
					if (results[i][key] == cur) {
						ret = results[i];
					}
				}
				if (ret) {
					if (angular.isFunction(options.select)) {
						options.select(ret);
					}
				}
			}

			function attach() {
				$scope.isShow = true;
			}

			function detch() {
				if (require_verify) {
					verify();
				}

				guess();

				$timeout(function() {
					$scope.isShow = false;
				}, 1);
			}

			function select_default() {
				select($scope.selected_index);
				input.blur();
			}

			function select_move(offset) {
				var count = $scope.results ? $scope.results.length : 9;
				var pt = $scope.selected_index + offset;
				if (pt >=0 && pt < count) {
					$scope.selected_index = pt;
					$scope.$apply();
				}
			}

			function select(i) {
				var results = $scope.results;
				selected = $scope.results[i];

				if (angular.isFunction(options.select)) {
					console.log(row)
					if (row) {
						options.select(selected, row);
					}
					else {
						options.selected(selected);
					}
				}
				detch();
			}
		}
	}
})