var app = angular.module('commSev', []);

app.factory('ay', ['$http', '$q'], function($http, $q) {
	function get(url, data) {
		return $http.get(url + '?' + 
			(angular.isString(data) ? data : serialize(data))
		);
	}

	function post(url, data, conv) {
		return http('POST', url, data, conv);
	}

	function http(type, url, data, conv) {
		conv = !!conv;
		var req = {
			method: type,
			url: url
		};
		req.data = conv ? data : serialize(data);
		if (!conv) {
			req.headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};
		}

		return $http(req);
	}

	// TODO input[type=file] 需要处理
	function serialize(obj) {
		var arr = [];
		for(var i in obj) {
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]))
		}
		return arr.join('&');
	}

	return {
		'get': get,
		'post': post
	}
})