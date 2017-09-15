// ctrl + B 运行控制台查看结果
// 以指定的原型创建对象，并且可以（可选）的设置对象的属性
// 支持低版本IE
if(typeof Object.create !== 'function') {
	Object.create = function(o) {
		function F() {};
		F.prototype = o;
		return new F();
	};
}

function Poker(style, title, value) {  
    this.Style = style;  
    this.Title = title;  
    this.Value = value;  
}  

var pokerA = Object.create(new Poker("club", "A", 14));  

console.log(Poker.constructor); //function Function() { [native code] } 

console.log(Poker.constructor.prototype); //function Empty() {}  

console.log(new Poker().constructor.prototype);

console.log(Poker.prototype);

console.log(Poker.prototype == new Poker().constructor.prototype);

console.log(Poker.constructor.prototype == new Poker().constructor.prototype);

console.log(Poker.prototype ==pokerA.constructor.prototype);

console.log(Poker.constructor.prototype == new Poker().constructor.prototype);

// 对指定的对象的一个属性设置丰富的值控制
function setPockerState(poker, proValue) {
	if(arguments[0] instanceof Poker) {
		Object.defineProperty(arguments[0],
		"State",
		{
			value: proValue,
			writable: true,
			enumberable: false,
			configurable: true	
		})
	}
}
setPockerState(pokerA, 5);
console.log(pokerA.State);