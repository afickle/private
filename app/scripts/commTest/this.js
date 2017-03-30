// method one: 全局this一般指向全局对象，浏览器中的全局对象就是 window
this.document === document;

this === window;

this.a = 22;
console.log(window.a;)  // 22

// method two: 一般函数的 this 也指向 window，在 nodeJS 中为 global object
// 严格模式中，函数的 this 为 undefined
function f1() {
	return this;
}
console.log(f1());   // window

function f2() {
	'use strict';
	return this;
}
console.log(f2());   // undefined

// method three: 作为对象方法的函数的 this
// f 为对象 o 的方法。这个方法的 this 指向这个对象，在这里即对象 o
var o = {
	prop: 22,
	f: function() {
		return this.prop;
	}
};
console.log(o.f());   // 22

var p = {
	prop: 22,
};
function ff() {
	return this.prop;
}
o.f = ff;
console.log(o.f());  // 22

// method four: 函数也可以直接被调用，此时 this 绑定到全局对象
// 
function nakeNoSence(x) {
	this.x = x;
}
nakeNoSence(5);
x;  // x 已经成为一个值为 5 的全局变量

var point = {
	x: 0,
	y: 0,
	moveTo: function(x, y) {
		// fun inside
		var moveX = function(x) {
			this.x = x;
		};
		// fun inside
		var moveY = function(y) {
			this.y = y;
		};

		moveX(x);
		moveY(y);
	}
};
point.moveTo(1, 1);
console.log(point.x);  // 0
console.log(point.y);  // 0
console.log(x);        // 1 a global 
console.log(y);        // 1 a global

var point = {
	x: 0,
	y: 0,
	moveTo: function(x, y) {
		// fun inside
		var _this = this;
		var moveX = function(x) {
			_this.x = x;
		};
		// fun inside
		var moveY = function(y) {
			_this.y = y;
		};

		moveX(x);
		moveY(y);
	}
};
point.moveTo(1, 1);
console.log(point.x);  // 0
console.log(point.y);  // 0
console.log(x);        // 1 a global 
console.log(y);        // 1 a global

// method five: 对象原型链上的this
var o = {
	f: function() {
		return this.a + this.b;
	}
};
var p = Object.create(o);
p.a = 1;
p.b = 2;
console.log(p.f());  // 3

// method six: get/set 方法与 this
// get/set 方法中的 this 也会指向 get/set 方法所在的对象的
function modulus() {
    return Math.sqrt(this.re * this.re + this.im * this.im);
}
var o = {
    re: 1,
    im: -1,
    get phase() {
        return Math.atan2(this.im, this.re);
    }
};
Object.defineProperty(o, 'modulus', {
    get: modulus,
    enumerable: true,
    configurable: true
});
console.log(o.phase, o.modulus); // -0.78 1.4142

// method seven: 构造器中的 this
// new MyClass() 的时候，MyClass()中的 this 会指向一个空对象
// 这个对象的原型会指向 MyClass.prototype
// MyClass()没有返回值或者返回为基本类型时，默认将 this 返回
function MyClass() {
    this.a = 25;
}
var o = new MyClass();
console.log(o.a); //25

// 因为返回了对象，将这个对象作为返回值
function C2() {
    this.a = 26;
    return {
        a: 24
    };
}
o = new C2();
console.log(o.a); //24

// method eight: call/apply 方法与 this
function add(c, d) {
    return this.a + this.b + c + d;
}
var o = {
    a: 1,
    b: 3
};
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
function bar() {
    console.log(Object.prototype.toString.call(this));
}
bar.call(7); // "[object Number]"
bar.call(); //[object global]
bar.call("7");//[object String]
bar.call(true);//[object Boolean]
console.log(add.call(o,5,7));//16

// method nine: bind 方法与 this
// 绑定之后再调用时，仍然会按绑定时的内容走 o.g() 结果是 test
function f() {
    return this.a;
}
var g = f.bind({
    a: "test"
});
console.log(g()); // test
var o = {
    a: 37,
    f: f,
    g: g
};
console.log(o.f(), o.g()); // 37, test

/*<body>
    <!--JavaScript伪协议和内联事件对于this的指向不同-->
    <a href="#" onclick="alert(this.tagName);">click me</a> <!--弹出A-->
    <a href="javascript:alert(this.tagName);">click me</a>  <!--弹出undefined-->
    <a href="javascript:alert(this==window);">click me</a>  <!--弹出true-->
    <input id="btn" type="button" value="this demo" name="button"/>
</body>*/
/*var name = 'somebody';
var angela = {
    name: 'angela',
    say: function () {
        alert("I'm " + this.name);
    }
};
var btn = document.getElementById('btn');*/
// setTimeout等函数内this默认的指向是Window
/*angela.say();//I'm  angela
setTimeout(angela.say, 1000);  //I'm  somebody
setInterval(angela.say, 1000); //I'm  somebody*/

var obj ={
    myName: 'jeff',
    getName: function(){
        return this.myName;
    }
};
console.log(obj.getName()); //jeff
var getName2 = obj.getName;
console.log( getName2() ); //undefined
//调用getName2时是普通函数方式，this指向全局window，故而结果是undefined；

angela.say(); //I'm  angela
btn.onclick = angela.say; //I'm  button

$("#btn").click = angela.say;  // I'm  button
$("#btn").click(angela.say);   // I'm  button

