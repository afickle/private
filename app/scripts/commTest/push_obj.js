var obj = {
	length: 0,

	addElem: function addElem(elem) {
		[].push.call(this, elem);
	}
};

obj.addElem({'id': 1});
obj.addElem({'id': 2});

console.log(obj.length);