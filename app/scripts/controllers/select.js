var app = angular.module('myApp', ['autoinput', 'ngSanitize', 'commSev']);

app.controller('myController', ['$timeout', '$scope', 'ay', function($timeout, vm, ay) {
	var data = {};
	var page = {
		verify: {
			input1: 1,
			input2: 0
		}
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

	vm.ac_options = {
		suggest: suggestData,
        key:'value',
        select: function(item) {
            data.select1 = item.value;
        },
        verify:function(r) {
            page.verify.select1 = r;
        }
	}

	function suggestData(key) {
		return ay.get('account/updatePassword').then(function(resp) {
            return formatSuggest(resp.returnVal);
        })
        return formatSuggest(data.results);
    }

    //预查询数据排列方式
    function formatSuggest(data) {
        if (!data) return [];
        var obj = [];

        for (var i in data) {
            obj.push({ code: data[i].code, value: data[i].name, label: data[i].code + '  (' + data[i].name + ')', raw: data[i] })
        }
        return obj;
    }
}]);