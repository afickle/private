// timestamp(1498388061025);

var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i);
    };
}
a[6](); // 10
a[0](); // 10

var b = [];
for (let i = 0; i < 10; i++) {
    b[i] = function() {
        console.log(i);
    };
}
b[6](); // 6
b[0](); // 0

for (let i = 0; i < 2; i++) {
    let i = 'abc';
    console.log(i); // abc 2 times
}

for (var i = 0; i < 2; i++) {
    var i = 'abc';
    console.log(i); // abc just for once
}

console.log(foo);
var foo = 'foo';
console.log(foo);

var temp = 123;
if (true) {
    temp = 'abc'; // ReferenceError => temporal dead zone
    let temp;
}

// 将对象彻底冻结
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key, i) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    });
};

// 在所有情况下，都取到顶层对象
// 方法一
(typeof window !== 'undefined' ? window : (typeof process === 'object' &&
    typeof require === 'function' &&
    typeof global === 'object') ? global : this);

// 方法二
var getGlobal = function() {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('unable to locate global object');
};

// 测试一个字符由两个字节还是由四个字节组成
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

var total = 30;
var msg = passthru `The total is ${total} (${total*1.05} with tax)`;
// mothod 1
function passthru(literals) {
    var result = '';
    var i = 0;
    while (i < literals.length) {
        result += literals[i++];
        if (i < arguments.length) {
            result += arguments[i];
        }
    }
    return result;
}
msg // The total is 30 (31.5 with tax)
// mothod 1
function passthru(literals, ...values) {
    var output = "";
    for (var index = 0; index < values.length; index++) {
        output += literals[index] + values[index];
    }
    output += literals[index]
    return output;
}

// y修饰符对match方法，只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配
'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]

const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;
tokenize(TOKEN_Y, '3 + 4') // [ '3', '+', '4' ]
tokenize(TOKEN_G, '3 + 4') // [ '3', '+', '4' ]
tokenize(TOKEN_Y, '3x + 4') // [ '3' ]
tokenize(TOKEN_G, '3x + 4') // [ '3', '+', '4' ]
function tokenize(TOKEN_REGEX, str) {
    let result = [];
    let match;
    console.log(match)
    while (match = TOKEN_REGEX.exec(str)) {
        result.push(match[1]);
    }
    return result;
}

var arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

// Array.of方法可以用下面的代码模拟实现
function ArrayOf() {
    return [].slice.call(arguments);
}

// 将3号位复制到0号位
[].copyWithin.call({ length: 5, 3: 1 }, 0, 3) // {0: 1, 3: 1, length: 5}

var x = 1;

function foo(x, y = function() { x = 2; }) {
    var x = 3;
    y();
    console.log(x);
}
foo() // 3
x // 1

var x = 1;

function foo(x, y = function() { x = 2; }) {
    x = 3;
    y();
    console.log(x);
}
foo() // 2
x // 1

// 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误
function throwIfMissing() {
    throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
}
foo()

// ES5
new(Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);

// 把函数包在一个无参数的立即执行函数里面
const doSomething = (function() {
    'use strict';
    return function(value = 42) {
        return value;
    };
}());
