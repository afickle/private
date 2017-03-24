var app = angular.module('myApp', ['ngSanitize', 'customeFie']);

app.controller('myController', ['$timeout', '$scope', function($timeout, vm) {
	var data = {};
	var page = {
		fields: [{ "key": "id", "value": "ID", "display": false }, { "key": "bcCode", "value": "商家", "display": true }, { "key": "businessSkuCode", "value": "商品编码", "display": true }, { "key": "productCode", "value": "商家商品编码", "display": true }, { "key": "barCode", "value": "商品条码", "display": true }, { "key": "barCodeOne", "value": "备用条码1", "display": false }, { "key": "barCodeTwo", "value": "备用条码2", "display": false }, { "key": "taxAmount", "value": "备用条码3", "display": false }, { "key": "skuName", "value": "商品名称", "display": true }, { "key": "skuNameEn", "value": "英文名称", "display": false }, { "key": "length", "value": "长", "display": false }, { "key": "width", "value": "宽", "display": false }, { "key": "height", "value": "高", "display": false }, { "key": "volume", "value": "体积", "display": false }, { "key": "grossWeight", "value": "毛重", "display": false }]
	};

	vm.data = data;
	vm.page = page;
	
	data.results = [
		{
			code: 1,
			name: '壹'	
		},
		{
			code: 2,
			name: '贰'	
		}
	];
}]);