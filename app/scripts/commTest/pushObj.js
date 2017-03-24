var obj = {
	length: 0,

	addElem: function addElem(elem) {
		[].push.call(this, elem);
	}
};

obj.addElem({});
obj.addElem({});

console.log(obj.length);