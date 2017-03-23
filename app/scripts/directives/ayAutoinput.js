var app = angular.module('autoinput', []);

app.run(['$templateCache', function($templateCache) {
	$templateCache.put('template/select/oneTransclude.html',
		'<div> <h3>one-translude</h3> <div>I\'m the info of one-transclude</div> <ng-transclude>I\'m the inner element info of one-transclude</ng-transclude> </div> '
	);
}]);

app.directive('oneTransclude', function() {
	return {
		restrict: 'EA',
		transclude: true,
		templateUrl: 'template/select/oneTransclude.html'
	};
})

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

/*app.run(['$templateCache', function($templateCache) {
	$templateCache.put('template/common/autoComplete.html',
		'<p>123</p>'
	);
}]);

app.directive('ayAutoinput', function() {
	return {
		restrict: 'EA',
		scope: {
			acOptions: '='
		},
		link: function($scope, $element) {

		}
	}
})*/