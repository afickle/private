function Foo() {
	this.getName = function() {
		console.log(3);
		return {
			getName: getName//这个就是第六问中涉及的构造函数的返回值问题
		}
	};//这个就是第六问中涉及到的，JS构造函数公有方法和原型链方法的优先级
	/* new Foo().getName().getName(); //3 1 */
    getName = function() { alert(1); };
    return this;
}
Foo.getName = function() { alert(2); };
Foo.prototype.getName = function() { alert(3); };
var getName = function() { alert(4); };

function getName() { alert(5); }

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();  // new (Foo.getName)();
new Foo().getName();  // (new Foo()).getName()
new new Foo().getName();  new ((new Foo()).getName)();

/*'require(["abcd"])'.replace(/require\(\[([^\]]+)/, function($0, $1) {
	console.log($0);
	console.log($1);
})*/

/*function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);*/

function User(name) {
	// 私有属性
	var name = name;
	// 公有属性
	this.name = name;
	// 私有方法
	function getName() {
		return name;
	}
}
// 公有方法
User.prototype.getName = function() {
	return this.name;
}
// 静态属性
User.name = 'liu';
// 静态方法
User.getName = function() {
	return this.name;
}
var user = new User('fickle')

// 函数声明
function fickle(type) {
	return type === 'fickle'
}

// 函数表达式
var fickle = function(type) {
	return type === 'fickle'
}

getNum() //oaoafly
var getNum = function() {
    console.log('wscat')
}
getNum() //wscat
function getNum() {
    console.log('oaoafly')
}
getNum() //wscat

// 迭代器
var add=function(x,y){
    var current=x;
    return {
        [Symbol.iterator]:function(){return this;},
        next:function(){  return current++;}
    }
}


var it=add(3,5);
console.log(it.next());  

console.log(it.next()); 

console.log(it.next()); 

//注意与下面这种写法的区别
console.log(add(3,5).next()); //3

console.log(add(3,5).next()); //3

console.log(add(3,5).next()); //3