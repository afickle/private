var app = angular.module('customeFie', []);

app.run(['$templateCache', function($templateCache) {
	$templateCache.put('template/table/customeFields.html',
		'<div class="modal fade in modal-custom-fields" style="display:block;">'
            + '<div class="modal-dialog">'
                + '<div class="modal-content">'
                    + '<div class="modal-header">'
                        + '<button type="button" class="close" ng-click="close(false)"><span aria-hidden="true">×</span></button>'
                        + '<h4 class="modal-title">自定义字段</h4>'
                    + '</div>'
                    + '<div class="modal-body">'
                        + '<p>请选择您想要{{data.tip}}的字段信息</p>'
                        + '<div class="row">'
                            + '<label class="col-sm-4" ng-repeat="row in data">'
                                + '<input type="checkbox" class="hide" ng-model="row.display"> '
                                    + '<i class="fa"></i> '
                                    + '<span ng-bind="row.value"></span>'
                                + '</label>'
                            + '</div>'
                        + '</div>'
                        + '<div class="modal-footer text-center">'
                            + '<button class="btn btn-primary pull-center" ng-click="close(true)">确定</button> '
                            + '<button class="btn btn-default pull-center" ng-click="close(false)">取消</button>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>'
        + '</div>'
	);
}]);

app.directive('customeFields', ['$timeout', '$parse', 'modalService', function($timeout, $parse, modalService) {
	return {
		restrict: 'A',
		link: function(scope, element, attr, ctrl) {
			var event = 'click';
			element.bind(event, function(evt) {
				var getter = $parse(attr.customeFields);
				var fields = angular.copy(getter(scope));
				var setter = getter.assign;
				fields.tip = '在表单中显示';

				modalService.open({
					data: fields,
					template: 'template/table/customeFields.html'
				}).then(function(modal) {
					if (modal.result) {
						setter(scope, fields);
					}
				});
			});
		}
	};
}]);

app.directive('batchDown', ['$timeout', '$parse', 'modalService', function($timeout, $parse, modalService) {
    return {
        restrict: 'A',
        scope: {
            'batchDown': '='
        },
        link: function($scope, element, attr) {

            element.bind('click', function(evt) {
                var data = $scope.batchDown.data;
                var items = $scope.batchDown.items;
                items.tip = '导出';

                var callback = $scope.batchDown.callback;

                var key = $scope.batchDown.key || 'checked';

                var select = $scope.batchDown.select || 'id';

                var arr = [];

                for (var i in data) {
                    if (data[i][key]) arr.push(data[i][select]);
                }

                if (arr.length) {
                    ModalService.open({
                        data: items,
                        template: 'template/table/customeFields.html',
                    }).then(function(modal) {
                        if (modal.result) {
                            callback && callback(arr);
                        }
                    });
                } else {
                    callback && callback([]);
                }
            })
        }
    };
}]);