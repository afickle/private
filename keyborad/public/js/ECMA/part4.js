// get the one appears the most and the time it appears a
var str = 'adksjdjksfnfdmnfsdfbjwe';
var strs = 'fj我最可爱ds';
function max(o) {
	var json = {};
	for(var i = 0; i < str.length; i++) {
		if (!json[str.charAt(i)]) {
			json[str.charAt(i)] = 1;
		}
		else {
			json[str.charAt(i)] ++;
		}
	};
	var max = -1;
	var index = '';
	for( var i in json) {
		if (json[i] > max) {
			max = json[i];
			index = i;
		}
	}
	console.log('max : ' + max + '\tindex : ' + index);
}
max(str);

// remove the same one in an array
function single(o) {
	var arr = {};
	var list = [];
	for (var i = 0; i < o.length; i++) {
		if (!arr[o[i]]) {
			list.push(o[i]);
			arr[o[i]] = 1;
		}
	}
	return list;
}
console.log(single(str));

// get the length of string, include chinese, one chinese equals to two charts
function getStrLen(o) {
	var json = {len:0};
	var reg = /[ \u4e00-\u9fa5]/;
	for (var i = 0; i < o.length; i++) {
		if (reg.test(o.charAt(i))) {
			json['len']++ ;
		}
	}
	return json['len'] + o.length;
}
console.log(getStrLen(strs));

