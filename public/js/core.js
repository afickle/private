I$(7,function (_p,_o,_f,_r){
var _extpro = Function.prototype;
/**
* AOP增强操作，增强操作接受一个输入参数包含以下信息
*
*  | 参数名称 | 参数类型  | 参数描述 |
*  | :--     | :--      | :-- |
*  | args    | Array    | 函数调用时实际输入参数，各增强操作中可以改变值后将影响至后续的操作 |
*  | value   | Variable | 输出结果 |
*  | stopped | Boolean  | 是否结束操作，终止后续操作 |
*
* @method external:Function#_$aop
* @param  {Function} arg0 - 前置操作，接受一个输入参数，见描述信息
* @param  {Function} arg1 - 后置操作，接受一个输入参数，见描述信息
* @return {Function}        增强后操作函数
*/
_extpro._$aop = function(_before,_after){
var _after = _after||_f,
_before = _before||_f,
_handler = this;
return function(){
var _event = {args:_r.slice.call(arguments,0)};
_before(_event);
if (!_event.stopped){
_event.value = _handler.apply(this,_event.args);
_after(_event);
}
return _event.value;
};
};
/**
* 绑定接口及参数，使其的调用对象保持一致
*
*  ```javascript
*  var scope = {a:0};
*
*  var func = function(a,b){
*      // 第一个参数 ：1
*      console.log(a);
*      // 第二个参数 ： 2
*      consoel.log(b);
*      // 当前this.a ： 0
*      console.log(this.a);
*  };
*
*  func._$bind(scope,"1")(2);
*  ```
*
* @method external:Function#_$bind
* @see    external:Function#_$bind2
* @param  {Object} arg0 - 需要保持一致的对象，null表示window对象，此参数外的其他参数作为绑定参数
* @return {Function}      返回绑定后的函数
*/
_extpro._$bind = function() {
var _args = arguments,
_object = arguments[0],
_function = this;
return function(){
// not use slice for chrome 10 beta and Array.apply for android
var _argc = _r.slice.call(_args,1);
_r.push.apply(_argc,arguments);
return _function.apply(_object||null,_argc);
};
};
/**
* 绑定接口及参数，使其的调用对象保持一致，
* 该接口与_$bind接口的差别在于绑定时参数和调用时参数的顺序不一样，
* _$bind优先传入绑定时参数，_$bind2优先传入调用时参数
*
*  ```javascript
*  var scope = {a:0};
*
*  var func = function(a,b){
*      // 第一个参数 ：2
*      console.log(a);
*      // 第二个参数 ： 1
*      consoel.log(b);
*      // 当前this.a ： 0
*      console.log(this.a);
*  };
*
*  func._$bind(scope,"1")(2);
*  ```
*
* @method external:Function#_$bind2
* @see    external:Function#_$bind
* @param  {Object} arg0 - 需要保持一致的对象，null表示window对象，此参数外的其他参数作为绑定参数
* @return {Function}      返回绑定后的事件函数
*/
_extpro._$bind2 = function() {
var _args = arguments,
_object = _r.shift.call(_args),
_function = this;
return function(){
_r.push.apply(arguments,_args);
return _function.apply(_object||null,arguments);
};
};
// for compatiable
var _extpro = String.prototype;
if (!_extpro.trim){
_extpro.trim = (function(){
var _reg = /(?:^\s+)|(?:\s+$)/g;
return function(){
return this.replace(_reg,'');
};
})();
}
if (!this.console){
this.console = {
log:_f,
error:_f
};
}
if (CMPT){
NEJ = this.NEJ||{};
// copy object properties
// only for nej compatiable
NEJ.copy = function(a,b){
a = a||{};
b = b||_o;
for(var x in b){
if (b.hasOwnProperty(x)){
a[x] = b[x];
}
}
return a;
};
// NEJ namespace
NEJ = NEJ.copy(
NEJ,{
O:_o,R:_r,F:_f,
P:function(_namespace){
if (!_namespace||!_namespace.length){
return null;
}
var _package = window;
for(var a=_namespace.split('.'),
l=a.length,i=(a[0]=='window')?1:0;i<l;
_package=_package[a[i]]=_package[a[i]]||{},i++);
return  _package;
}
}
);
return NEJ;
}
return _p;
});
I$(9,function (_p,_o,_f,_r){
/**
* 遍历对象
* @param  {Object}   对象
* @param  {Function} 迭代回调
* @param  {Object}   回调执行对象
* @return {String}   循环中断时的key值
*/
_p.__forIn = function(_obj,_callback,_this){
if (!_obj||!_callback){
return null;
}
var _keys = Object.keys(_obj);
for(var i=0,l=_keys.length,_key,_ret;i<l;i++){
_key = _keys[i];
_ret = _callback.call(
_this||null,
_obj[_key],_key,_obj
);
if (!!_ret){
return _key;
}
}
return null;
};
/**
* 遍历列表
* @param  {Array}    列表
* @param  {Function} 迭代回调
* @param  {Object}   回调执行对象
* @return {Void}
*/
_p.__forEach = function(_list,_callback,_this){
_list.forEach(_callback,_this);
};
/**
* 集合转数组
* @param  {Object} 集合
* @return {Array}  数组
*/
_p.__col2array = function(_list){
return _r.slice.call(_list,0);
};
/**
* YYYY-MM-DDTHH:mm:ss.sssZ格式时间串转时间戳
* @param  {String} 时间串
* @return {Number} 时间戳
*/
_p.__str2time = function(_str){
return Date.parse(_str);
};
return _p;
});
I$(10,function (NEJ,_p,_o,_f,_r){
var _platform  = this.navigator.platform,
_useragent = this.navigator.userAgent;
/**
* 平台判断信息
*
* ```javascript
* NEJ.define([
*     'base/platform'
* ],function(_m){
*     var _is = _m._$IS;
*     // 是否MAC系统
*     console.log(_is.mac);
*     // 是否IPhone
*     console.log(_is.iphone);
*     // ...
* });
* ```
*
* @const    module:base/platform._$IS
* @see      module:base/platform._$is
* @type     {Object}
* @property {Boolean} mac     - 是否Mac系统
* @property {Boolean} win     - 是否windows系统
* @property {Boolean} linux   - 是否linux系统
* @property {Boolean} ipad    - 是否Ipad
* @property {Boolean} iphone  - 是否IPhone
* @property {Boolean} android - 是否Android系统
* @property {Boolean} ios     - 是否IOS系统
* @property {Boolean} tablet  - 是否平板
* @property {Boolean} desktop - 是否桌面系统
*/
var _is = {
mac     : _platform,
win     : _platform,
linux   : _platform,
ipad    : _useragent,
ipod    : _useragent,
iphone  : _platform,
android : _useragent
};
_p._$IS = _is;
for(var x in _is){
_is[x] = new RegExp(x,'i').test(_is[x]);
}
_is.ios = _is.ipad||_is.iphone||_is.ipod;
_is.tablet = _is.ipad;
_is.desktop = _is.mac||_is.win||(_is.linux&&!_is.android);
/**
* 判断是否指定平台
*
* ```javascript
* NEJ.define([
*     'base/platform'
* ],function(_m){
*     // 是否MAC系统
*     console.log(_m._$is('mac'));
*     // 是否iphone
*     console.log(_m._$is('iphone'));
*     // ...
* });
* ```
*
* @method module:base/platform._$is
* @see    module:base/platform._$IS
* @param  {String} arg0 - 平台名称
* @return {Boolean}       是否指定平台
*/
_p._$is = function(_platform){
return !!_is[_platform];
};
// parse kernel information
/**
* 引擎内核信息
*
* ```javascript
* NEJ.define([
*     'base/platform'
* ],function(_m){
*     var _kernel = _m._$KERNEL;
*     // 打印平台信息
*     console.log(_kernel.engine);
*     console.log(_kernel.release);
*     console.log(_kernel.browser);
*     console.log(_kernel.version);
* });
* ```
*
* @const    module:base/platform._$KERNEL
* @type     {Object}
* @property {String} engine  - 布局引擎，trident/webkit/gecko/presto...
* @property {Number} release - 布局引擎版本
* @property {String} browser - 浏览器名称，ie/chrome/safari/opera/firefox/maxthon...
* @property {Number} version - 浏览器版本
* @property {Object} prefix  - 平台前缀，html5/css3 attribute/method/constructor
*/
var _kernel = {
engine:'unknow',
release:'unknow',
browser:'unknow',
version:'unknow',
prefix:{css:'',pro:'',clz:''}
};
_p._$KERNEL  = _kernel;
if (/msie\s+(.*?);/i.test(_useragent)||
/trident\/.+rv:([\d\.]+)/i.test(_useragent)){
_kernel.engine  = 'trident';
_kernel.browser = 'ie';
_kernel.version = RegExp.$1;
_kernel.prefix  = {css:'ms',pro:'ms',clz:'MS',evt:'MS'};
// 4.0-ie8 5.0-ie9 6.0-ie10 7.0-ie11
// adjust by document mode setting in develop toolbar
var _test = {6:'2.0',7:'3.0',8:'4.0',9:'5.0',10:'6.0',11:'7.0'};
_kernel.release = _test[document.documentMode]||
_test[parseInt(_kernel.version)];
}else if(/webkit\/?([\d.]+?)(?=\s|$)/i.test(_useragent)){
_kernel.engine  = 'webkit';
_kernel.release = RegExp.$1||'';
_kernel.prefix  = {css:'webkit',pro:'webkit',clz:'WebKit'};
}else if(/rv\:(.*?)\)\s+gecko\//i.test(_useragent)){
_kernel.engine  = 'gecko';
_kernel.release = RegExp.$1||'';
_kernel.browser = 'firefox';
_kernel.prefix  = {css:'Moz',pro:'moz',clz:'Moz'};
if (/firefox\/(.*?)(?=\s|$)/i.test(_useragent))
_kernel.version = RegExp.$1||'';
}else if(/presto\/(.*?)\s/i.test(_useragent)){
_kernel.engine  = 'presto';
_kernel.release = RegExp.$1||'';
_kernel.browser = 'opera';
_kernel.prefix  = {css:'O',pro:'o',clz:'O'};
if (/version\/(.*?)(?=\s|$)/i.test(_useragent))
_kernel.version = RegExp.$1||'';
}
if (_kernel.browser=='unknow'){
var _test = ['chrome','maxthon','safari'];
for(var i=0,l=_test.length,_name;i<l;i++){
_name = _test[i]=='safari'?'version':_test[i];
if (new RegExp(_name+'/(.*?)(?=\\s|$)','i').test(_useragent)){
_kernel.browser = _test[i];
_kernel.version = RegExp.$1.trim();
break;
}
}
}
/**
* 引擎特性支持信息
*
* ```javascript
* NEJ.define([
*     'base/platform'
* ],function(_m){
*     var _support = _m._$SUPPORT;
*     // 打印平台是否支持CSS3 3D特效
*     console.log(_support.css3d);
* });
* ```
* @const    module:base/platform._$SUPPORT
* @see      module:base/platform._$support
* @type     {Object}
* @property {Boolean} css3d  - 是否支持CSS3 3D
*/
_p._$SUPPORT = {};
/**
* 判断平台是否支持指定特性
*
* ```javascript
* NEJ.define([
*     'base/platform'
* ],function(_m){
*     // 是否支持CSS3 3D特效
*     console.log(_m._$support('css3d'));
* });
* ```
*
* @method module:base/platform._$support
* @see    module:base/platform._$SUPPORT
* @param  {String} arg0 - 特性标识
* @return {Boolean}       是否支持指定特性
*/
_p._$support = function(_feature){
return !!_p._$SUPPORT[_feature];
};
if (CMPT){
NEJ.copy(NEJ.P('nej.p'),_p);
}
return _p;
},7);
I$(8,function(_h,_m,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[1])._$KERNEL;if (_k_.engine=='trident'&&_k_.release<='4.0'){(function (){
/**
* 遍历对象
* @param  {Object}   对象
* @param  {Function} 迭代回调
* @param  {Object}   回调执行对象
* @return {String}   循环中断时的key值
*/
_h.__forIn = function(_obj,_callback,_this){
if (!_obj||!_callback){
return;
}
// iterate
var _ret;
for(var x in _obj){
if (!_obj.hasOwnProperty(x)) continue;
_ret = _callback.call(_this,_obj[x],x,_obj);
if (!!_ret){
return x;
}
}
};
/**
* 遍历列表
* @param  {Array}    列表
* @param  {Function} 迭代回调
* @param  {Object}   回调执行对象
* @return {Void}
*/
_h.__forEach = function(_list,_callback,_this){
for(var i=0,l=_list.length;i<l;i++){
_callback.call(_this,_list[i],i,_list);
}
};
/**
* 集合转数组
* @param  {Object} 集合
* @return {Array}  数组
*/
_h.__col2array = function(_list){
var _result = [];
if (!!_list&&!!_list.length){
for(var i=0,l=_list.length;i<l;i++){
_result.push(_list[i]);
}
}
return _result;
};
/**
* YYYY-MM-DDTHH:mm:ss.sssZ格式时间串转时间戳
* @param  {String} 时间串
* @return {Number} 时间戳
*/
_h.__str2time = (function(){
var _reg = /-/g;
return function(_str){
// only support YYYY/MM/DDTHH:mm:ss
return Date.parse(_str.replace(_reg,'/').split('.')[0]);
};
})();
})();};return _h;
},9,10);
I$(1,function (NEJ,_u,_p,_o,_f,_r){
/**
* 定义类，通过此api定义的类具有以下特性：
*
* * {@link external:Function#_$extend|_$extend}作为类的静态扩展方法
* * __init作为类的初始化函数
* * __super作为子类调用父类的同名函数
*
* ```javascript
* NEJ.define([
*     'base/klass'
* ],function(k,p){
*     // 定义类A
*     p.A = k._$klass();
*     var pro = A.prototype;
*     // 初始化
*     pro.__init = function(){
*          // do init
*     };
*     // 类接口
*     pro.__doSomething = function(a){
*         // TODO something
*     };
*
*     return p;
* });
* ```
*
* ```javascript
* NEJ.define([
*     'base/klass',
*     '/path/to/class/a.js'
* ],function(k,a,p){
*     // 定义类B，并继承自A
*     p.B = k._$klass();
*     var pro = B._$extend(a.A);
*     // 初始化
*     pro.__init = function(){
*         // 调用A的初始化逻辑
*         this.__super();
*         // TODO B的初始化逻辑
*     };
*     // 类接口
*     pro.__doSomething = function(a){
*         // 调用A的__doSomething接口
*         this.__super(a);
*         // TODO B的逻辑
*     };
*
*     return p;
* });
* ```
*
* @method module:base/klass._$klass
* @see    external:Function#_$extend
* @return {Function} 返回定义的类
*/
_p._$klass = (function(){
var _isNotFunction = function(){
return _o.toString.call(arguments[0])!=='[object Function]';
};
var _doFindIn = function(_method,_klass){
while(!!_klass){
var _pro = _klass.prototype,
_key = _u.__forIn(_pro,function(v){
return _method===v;
});
if (_key!=null){
return {
name:_key,
klass:_klass
};
}
_klass = _klass._$super;
}
};
return function(){
// class constructor
var _Klass = function(){
return this.__init.apply(this,arguments);
};
_Klass.prototype.__init = _f;
/**
* 子类继承父类
*
* ```javascript
* NEJ.define([
*     'base/klass'
* ],function(k,p){
*     // 定义类A
*     p.A = k._$klass();
*     var pro = A.prototype;
*     // 初始化
*     pro.__init = function(){
*          // do init
*     };
*     // 类接口
*     pro.__doSomething = function(a){
*         // TODO something
*     };
*
*     return p;
* });
* ```
*
* ```javascript
* NEJ.define([
*     'base/klass',
*     '/path/to/class/a.js'
* ],function(k,a,p){
*     // 定义类B，并继承自A
*     p.B = k._$klass();
*     var pro = B._$extend(a.A);
*     // 初始化
*     pro.__init = function(){
*         // 调用A的初始化逻辑
*         this.__super();
*         // TODO B的初始化逻辑
*     };
*     // 类接口
*     pro.__doSomething = function(a){
*         // 调用A的__doSomething接口
*         this.__super(a);
*         // TODO B的逻辑
*     };
*
*     return p;
* });
* ```
*
* @method external:Function#_$extend
* @see    module:base/klass._$klass
* @param  {Function} arg0 - 父类
* @param  {Boolean}  arg1 - 是否拷贝父类的静态方法，默认拷贝父类静态方法
* @return {Object}          扩展类的prototype对象
*/
_Klass._$extend = function(_super,_static){
if (_isNotFunction(_super)){
return;
}
// for static method
var _this = this;
if (_static!==!1){
_u.__forIn(_super,function(v,k){
if (!_isNotFunction(v)){
_this[k] = v;
}
});
}
// do inherit
this._$super = _super;
var _parent = function(){};
_parent.prototype = _super.prototype;
this.prototype = new _parent();
this.prototype.constructor = this;
// for super method call
var _stack = [],
_phash = {};
var _doUpdateCache = function(_method,_klass){
var _result = _doFindIn(_method,_klass);
if (!_result) return;
// save state
if (_stack[_stack.length-1]!=_result.name){
_stack.push(_result.name);
}
_phash[_result.name] = _result.klass._$super;
return _result.name;
};
this.prototype.__super = function(){
var _name = _stack[_stack.length-1],
_method = arguments.callee.caller;
if (!_name){
_name = _doUpdateCache(_method,this.constructor);
}else{
var _parent = _phash[_name].prototype;
// switch caller name
if (!_parent.hasOwnProperty(_method)||
_method!=_parent[_name]){
_name = _doUpdateCache(_method,this.constructor);
}else{
_phash[_name] = _phash[_name]._$super;
}
}
// call parent method
var _ret = _phash[_name].prototype[_name].apply(this,arguments);
// exit super
if (_name==_stack[_stack.length-1]){
_stack.pop();
delete _phash[_name];
}
return _ret;
};
if (CMPT){
var _pro = this.prototype;
_pro.__supInit      = _pro.__super;
_pro.__supReset     = _pro.__super;
_pro.__supDestroy   = _pro.__super;
_pro.__supInitNode  = _pro.__super;
_pro.__supDoBuild   = _pro.__super;
_pro.__supOnShow    = _pro.__super;
_pro.__supOnHide    = _pro.__super;
_pro.__supOnRefresh = _pro.__super;
this._$supro = _super.prototype;
}
return this.prototype;
};
return _Klass;
};
})();
if (CMPT){
NEJ.C = _p._$klass;
NEJ.copy(this.NEJ,NEJ);
}
return _p;
},7,8);
I$(2,function (NEJ,_h,_p,_o,_f,_r){
/*
* 查看数据是否指定类型
* @param  {Variable} 数据
* @param  {String}   类型
* @return {Boolean}  是否指定类型
*/
var _isTypeOf = function(_data,_type){
try{
_type = _type.toLowerCase();
if (_data===null) return _type=='null';
if (_data===undefined) return _type=='undefined';
return _o.toString.call(_data).toLowerCase()=='[object '+_type+']';
}catch(e){
return !1;
}
};
/**
* 判断是否函数类型
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回false
*     var is = _u._$isFunction(123);
*     // 返回true
*     var is = _u._$isFunction(function(){});
* });
* ```
*
* @method module:base/util._$isFunction
* @param  {Variable} arg0 - 待检测类型的数据
* @return {Boolean}         是否函数类型
*/
_p._$isFunction = function(_data){
return _isTypeOf(_data,'function');
};
/**
* 判断是否字符串
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回false
*     var is = _u._$isString(123);
*     // 返回true
*     var is = _u._$isString("123");
* });
* ```
*
* @method module:base/util._$isString
* @param  {Variable} arg0 - 待检测类型的数据
* @return {Boolean}         是否字符串
*/
_p._$isString = function(_data){
return _isTypeOf(_data,'string');
};
/**
* 判断是否数字
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回false
*     var is = _u._$isNumber("123");
*     // 返回true
*     var is = _u._$isNumber(123);
*     var is = _u._$isNumber(-123);
*     var is = _u._$isNumber(Number.MAX_VALUE);
* });
* ```
*
* @method module:base/util._$isNumber
* @param  {Variable} arg0 - 待检测类型的数据
* @return {Boolean}         是否数值类型
*/
_p._$isNumber = function(_data){
return _isTypeOf(_data,'number');
};
/**
* 判断是否布尔值
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回false
*     var is = _u._$isBoolean(0);
*     // 返回true
*     var is = _u._$isBoolean(false);
* });
* ```
*
* @method module:base/util._$isBoolean
* @param  {Variable} arg0 - 待检测类型的数据
* @return {Boolean}         是否布尔值
*/
_p._$isBoolean = function(_data){
return _isTypeOf(_data,'boolean');
};
/**
* 判断是否日期
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回false
*     var is = _u._$isDate(0);
*     // 返回true
*     var is = _u._$isDate(new Date());
* });
* ```
*
* @method module:base/util._$isDate
* @param  {Variable} arg0 - 待检测类型的数据
* @return {Boolean}         是否日期
*/
_p._$isDate = function(_data){
return _isTypeOf(_data,'date');
};
/**
* 判断是否数组
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回false
*     var is = _u._$isArray(0);
*     // 返回true
*     var is = _u._$isArray([1,2]);
* });
* ```
*
* @method module:base/util._$isArray
* @param  {Variable} arg0 - 待检测类型的数据
* @return {Boolean}         是否数组
*/
_p._$isArray = function(_data){
return _isTypeOf(_data,'array');
};
/**
* 判断是否对象
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回false
*     var is = _u._$isObject(function(){});
*     // 返回true
*     var is = _u._$isObject({});
*     var is = _u._$isObject({a:"a"});
* });
* ```
*
* @method module:base/util._$isObject
* @param  {Variable} arg0 - 待检测类型的数据
* @return {Boolean}         是否对象
*/
_p._$isObject = function(_data){
return _isTypeOf(_data,'object');
};
/**
* 计算字符串长度，中文算两个字符
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 字符串长度为5
*     var len = _u._$length('你i他');
* });
* ```
*
* @method module:base/util._$length
* @param  {String} arg0 - 待计算长度字符串
* @return {Number}        字符串长度
*/
_p._$length = (function(){
var _reg = /[^\x00-\xff]/g;
return function(_content){
return (''+(_content||'')).replace(_reg,'**').length;
};
})();
/**
* 遍历对象
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*       var obj = {a:{id:1,name:'a'},b:{id:2,name:'b'},...};
*
*       // 遍历对象
*       _u._$loop(obj,function(_item,_key){
*           // TODO
*       });
*
*       // 从对象里查找id为2的元素，如果有返回KEY，没有返回null
*       var key = _u._$loop(obj,function(_item){
*           return _item.id==2;
*       });
* });
* ```
*
* @method module:base/util._$loop
* @see    module:base/util._$forIn
* @param  {Object}   arg0 - 对象
* @param  {Function} arg1 - 回调，如果返回true，则中断遍历
* @param  {Object}   arg2 - 回调函数调用时this对象
* @return {String}          返回中断时的标识，没有中断则统一返回null
*/
_p._$loop = function(_obj,_callback,_this){
if (_p._$isObject(_obj)&&
_p._$isFunction(_callback)){
return _h.__forIn.apply(_h,arguments);
}
return null;
};
/**
* 线性查找指定项
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     var list = ["你","我","他"];
*     // 返回下标1
*     var index = _u._$indexOf(list,"我");
*     // 没有找到，返回-1
*     var index = _u._$indexOf(list,"他们");
*     // 如果第二个参数是过滤接口，根据接口的规则查找
*     // 以下规则排除第一个下标
*     var index = _u._$indexOf(list,function(_item,_index,_list){
*           return _item==='他';
*     });
* });
* ```
*
* @method module:base/util._$indexOf
* @param  {Array}    arg0 - 待搜索列表
* @param  {Variable} arg1 - 指定项，如果为function则表示过滤接口
* @return {Number}          给定项所在的位置索引，以0开始，没有项返回-1
*/
_p._$indexOf = function(_list,_item){
var _filter = _p._$isFunction(_item) ? _item
: function(_value){return _value===_item;},
_index  = _p._$forIn(_list,_filter);
return _index!=null?_index:-1;
};
/**
* 二分法查找指定项
*
* 验证函数输入输出说明
*
* |      | 类型          | 结果说明 |
* | :--  | :--      | :-- |
* | 输入  | Variable | 中间项元素 |
* | 输出  | Number   | < 0  目标元素在低位区间 |
* |      |          | = 0  匹配到目标元素 |
* |      |          | > 0  目标元素在高位区间 |
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 二分查找id为2的项的索引值
*     var list = [{id:1,name:'aaa'},{id:2,name:'bbbb'},...];
*     var index = _u._$binSearch(list,function(_item){
*         return _item.id-2;
*     });
* });
* ```
*
* @method module:base/util._$binSearch
* @param  {Array}    arg0 - 待查找列表
* @param  {Function} arg1 - 验证函数
* @return {Number}          找到匹配项索引，找不到返回-1
*/
_p._$binSearch = (function(){
var _docheck;
// do binary search
var _doSearch = function(_list,_low,_high){
if (_low>_high) return -1;
var _middle = Math.ceil((_low+_high)/2),
_result = _docheck(_list[_middle],_middle,_list);
if (_result==0)
return _middle;
if (_result<0)
return _doSearch(_list,_low,_middle-1);
return _doSearch(_list,_middle+1,_high);
};
return function(_list,_check){
_docheck = _check||_f;
return _doSearch(_list,0,_list.length-1);
};
})();
/**
* 逆序遍历列表，支持中断
*
* 回调函数输入输出说明
*
* |      | 类型          | 说明 |
* | :--  | :--      | :-- |
* | 输入  | Variable | 值 |
* |      | Number   | 下标 |
* |      | Array    | 列表对象 |
* | 输出  | Boolean  | 是否匹配 |
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 删除id为3的项，并退出循环
*     var list = [{id:1,name:'aaa'},{id:2,name:'bbbb'},...];
*     _u._$reverseEach(list,function(_item,_index,_list){
*         if (_item.id==3){
*             _list.splice(_index,1);
*             return !0;
*         }
*     });
* });
* ```
*
* @method module:base/util._$reverseEach
* @see    module:base/util._$forEach
* @param  {Array}    arg0 - 列表
* @param  {Function} arg1 - 回调，如果返回true，则中断遍历
* @param  {Object}   arg2 - 回调函数调用时this对象
* @return {Number}          返回遍历中断时的索引值，没有中断则返回null
*/
_p._$reverseEach = function(_list,_callback,_this){
if (!!_list&&!!_list.length&&_p._$isFunction(_callback)){
for(var i=_list.length-1;i>=0;i--){
if (!!_callback.call(_this,_list[i],i,_list)){
return i;
}
}
}
return null;
};
/**
* 正序遍历列表，不支持中断
*
* 回调函数输入输出说明
*
* |      | 类型          | 说明 |
* | :--  | :--      | :-- |
* | 输入  | Variable | 值 |
* |      | Number   | 下标 |
* |      | Array    | 列表对象 |
* | 输出  | Boolean  | 是否匹配 |
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     var list = [1,2,3];
*     _u._$forEach(list,function(_item,_index,_list){
*         // TODO somthing
*     });
* });
* ```
*
* @method module:base/util._$forEach
* @see    module:base/util._$reverseEach
* @param  {Array}    arg0 - 列表
* @param  {Function} arg1 - 回调，如果返回true，则中断遍历
* @param  {Object}   arg2 - 回调函数调用时this对象
* @return {Void}
*/
_p._$forEach = function(_list,_callback,_this){
if (!!_list&&!!_list.length&&
_p._$isFunction(_callback)){
if (!_list.forEach){
_p._$forIn.apply(_p,arguments);
}else{
_h.__forEach(_list,_callback,_this);
}
}
};
/**
* 遍历列表或对象，如果带length属性，则作为数组遍历，如果要遍历带length属性的对象用_$loop接口，支持中断退出
*
* 回调函数输入输出说明
*
* |      | 类型          | 说明 |
* | :--  | :--      | :-- |
* | 输入  | Variable | 值 |
* |      | Number   | 下标 |
* |      | Object_Array | 列表或者集合对象 |
* | 输出  | Boolean  | 是否匹配 |
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*       // 从有序列表里查找id为2的元素，如果有则返回索引，没有返回null
*       var list = [{id:1,name:'a'},{id:2,name:'b'},...];
*       var index = _u._$forIn(list,function(_item){
*           return _item.id==2;
*       });
*
*       // 从对象里查找id为2的元素，如果有返回KEY，没有返回null
*       var obj = {a:{id:1,name:'a'},b:{id:2,name:'b'},...};
*       var key = _u._$forIn(obj,function(_item){
*           return _item.id==2;
*       });
* });
* ```
*
* @method module:base/util._$forIn
* @param  {Object|Array} arg0 - 列表或者对象
* @param  {Function}     arg1 - 回调，如果返回true，则中断遍历
* @param  {Object}       arg2 - 回调函数调用时this对象
* @return {String|Number}       返回中断时的索引或者标识，没有中断则统一返回null
*/
_p._$forIn = function(_list,_callback,_this){
if (!_list||!_p._$isFunction(_callback)){
return null;
}
if (_p._$isNumber(_list.length)){
// list see as array
for(var i=0,l=_list.length;i<l;i++){
if (!!_callback.call(_this,_list[i],i,_list)){
return i;
}
}
}else if (_p._$isObject(_list)){
// list is object
return _p._$loop(_list,_callback,_this);
}
return null;
};
/**
* 编码字符串，
* 编码规则对象中r正则表达式参数提取字符串需要编码的内容，
* 然后使用编码规则对象中的映射表进行替换
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 把字符串99999根据规则9替换成t，结果：ttttt
*     var str = _u._$encode({r:/\d/g,'9':'t'},'99999');
* });
* ```
*
* @method module:base/util._$encode
* @param  {Object} arg0 - 编码规则
* @param  {String} arg1 - 待编码的字串
* @return {String}        编码后的字串
*/
_p._$encode = function(_map,_content){
_content = ''+_content;
if (!_map||!_content){
return _content||'';
}
return _content.replace(_map.r,function($1){
var _result = _map[!_map.i?$1.toLowerCase():$1];
return _result!=null?_result:$1;
});
};
/**
* 编码html代码，'<' -> '&amp;lt;'
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 编码，结果：&amp;lt;a&amp;gt;util&amp;lt;/a&amp;gt;&amp;amp;
*     var str = _u._$escape('<a>util</a>&');
* });
* ```
*
* @method module:base/util._$escape
* @see    module:base/util._$unescape
* @param  {String} arg0 - 待编码串
* @return {String}        编码后的串
*/
_p._$escape = (function(){
var _reg = /<br\/?>$/,
_map = {
r:/\<|\>|\&|\r|\n|\s|\'|\"/g,
'<':'&lt;','>':'&gt;','&':'&amp;',' ':'&nbsp;',
'"':'&quot;',"'":'&#39;','\n':'<br/>','\r':''
};
return function(_content){
_content = _p._$encode(_map,_content);
return _content.replace(_reg,'<br/><br/>');
};
})();
/**
* 反编码html代码，'&amp;lt;' -> '<'
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 反编码，结果：<&a>util</a>
*     var str = _u._$unescape('&amp;lt;&amp;amp;a&amp;gt;util&amp;lt;/a&amp;gt;');
* });
* ```
*
* @method module:base/util._$unescape
* @see    module:base/util._$escape
* @param  {String} arg0 - 待反编码串
* @return {String}        反编码后的串
*/
_p._$unescape = (function(){
var _map = {r:/\&(?:lt|gt|amp|nbsp|#39|quot)\;|\<br\/\>/gi,'&lt;':'<','&gt;':'>','&amp;':'&','&nbsp;':' ','&#39;':"'",'&quot;':'"','<br/>':'\n'};
return function(_content){
return _p._$encode(_map,_content);
};
})();
/**
* 格式化时间，yyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w
*
* 各标识说明：
*
* | 标识  | 说明 |
* | :--  | :-- |
* | yyyy | 四位年份，如2001 |
* | yy   | 两位年费，如01 |
* | MM   | 两位月份，如08 |
* | M    | 一位月份，如8 |
* | dd   | 两位日期，如09 |
* | d    | 一位日期，如9 |
* | HH   | 两位小时，如07 |
* | H    | 一位小时，如7 |
* | mm   | 两位分钟，如03 |
* | m    | 一位分钟，如3 |
* | ss   | 两位秒数，如09 |
* | s    | 一位秒数，如9 |
* | ms   | 毫秒数，如234 |
* | w    | 中文星期几，如一 |
* | ct   | 12小时制中文后缀，上午/下午 |
* | et   | 12小时制英文后缀，A.M./P.M. |
* | cM   | 中文月份，如三 |
* | eM   | 英文月份，如Mar |
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 根据格式输出时间，比如:2012-01-11,连接符可自定义
*     var str = _u._$format(new Date(),'yyyy-MM-dd');
* });
* ```
*
* @method module:base/util._$format
* @param  {Number|String|Date} arg0 - 时间
* @param  {String}             arg1 - 格式
* @return {String}                    指定格式的时间串
*/
_p._$format = (function(){
var _map = {i:!0,r:/\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g},
_12cc = ['上午','下午'],
_12ec = ['A.M.','P.M.'],
_week = ['日','一','二','三','四','五','六'],
_cmon = ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
_emon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
var _fmtnmb = function(_number){
_number = parseInt(_number)||0;
return (_number<10?'0':'')+_number;
};
var _fmtclc = function(_hour){
return _hour<12?0:1;
};
return function(_time,_format,_12time){
if (!_time||!_format)
return '';
_time = _p._$var2date(_time);
_map.yyyy = _time.getFullYear();
_map.yy   = (''+_map.yyyy).substr(2);
_map.M    = _time.getMonth()+1;
_map.MM   = _fmtnmb(_map.M);
_map.eM   = _emon[_map.M-1];
_map.cM   = _cmon[_map.M-1];
_map.d    = _time.getDate();
_map.dd   = _fmtnmb(_map.d);
_map.H    = _time.getHours();
_map.HH   = _fmtnmb(_map.H);
_map.m    = _time.getMinutes();
_map.mm   = _fmtnmb(_map.m);
_map.s    = _time.getSeconds();
_map.ss   = _fmtnmb(_map.s);
_map.ms   = _time.getMilliseconds();
_map.w    = _week[_time.getDay()];
var _cc   = _fmtclc(_map.H);
_map.ct   = _12cc[_cc];
_map.et   = _12ec[_cc];
if (!!_12time){
_map.H = _map.H%12;
}
return _p._$encode(_map,_format);
};
})();
/**
* 日期字符串转日期对象
*
* 字符串日期格式同ECMA规范定义：YYYY-MM-DDTHH:mm:ss.sssZ
*
* 各标识说明：
*
* | 标识 | 说明 |
* | :--  | :-- |
* | YYYY | 四位年份，0000-9999，如2001 |
* | -    | 年月日分隔符 |
* | MM   | 两位月份，01-12，如03 |
* | DD   | 两位日期，01-31，如07 |
* | T    | 时间起始标识 |
* | HH   | 两位小时，00-24，如05 |
* | :    | 时分秒分隔符 |
* | mm   | 两位分钟，00-59，如30 |
* | ss   | 两位秒数，00-59，如08 |
* | .    | 秒/毫秒分隔符 |
* | sss  | 三位毫秒数，000-999，如004 |
* | Z    | 时区偏移 |
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 输入YYYY-MM-DDTHH:mm:ss.sssZ格式字符串，生成日期对象
*     var date = _u._$var2date('2013-07-29T13:12:45.300');
*
*     // 输入YYYY-MM-DDTHH:mm:ss格式字符串，生成日期对象
*     var date = _u._$var2date('2013-07-29T13:12:45');
*
*     // 输入YYYY-MM-DD格式字符串，生成日期对象
*     var date = _u._$var2date('2013-07-29');
* });
* ```
*
* @method module:base/util._$var2date
* @param  {String} arg0 - 日期串
* @return {Date}          日期对象
*/
_p._$var2date = function(_time){
var _date = _time;
if (_p._$isString(_time)){
_date = new Date(
_h.__str2time(_time)
);
}
if (!_p._$isDate(_date)){
_date = new Date(_time);
}
return _date;
};
/**
* 浮点数值保留指定位数小数点
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 保留2位小数，返回3.14
*     var value = _u._$fixed(3.14159,2);
* });
* ```
*
* @method module:base/util._$fixed
* @param  {Float}  arg0 - 浮点数
* @param  {Number} arg1 - 小数位
* @return {Number}        浮点数
*/
_p._$fixed = function(_float,_fraction){
return parseFloat(new Number(_float).toFixed(_fraction));
};
/**
* 相对路径转绝对路径
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 相对路径../a/b.html转绝对路径http://a.b.com:8010/a/b.html
*     var url = _u._$absolute(
*         '../a/b.html',
*         'http://a.b.com:8010/z/'
*     );
* });
* ```
*
* @method module:base/util._$absolute
* @param  {String} arg0 - 相对路径
* @param  {String} arg1 - 绝对路径ROOT，必须以http://开始，默认为location目录
* @return {String}        绝对路径地址
*/
_p._$absolute = (function(){
var _reg0 = /([^\/:])\/.*$/,
_reg1 = /\/[^\/]+$/,
_reg2 = /[#\?]/,
_base = location.href.split(/[?#]/)[0],
_anchor = document.createElement('a');
var _isAbsolute = function(_uri){
return (_uri||'').indexOf('://')>0;
};
var _doFormat = function(_uri){
return (_uri||'').split(_reg2)[0]
.replace(_reg1,'/');
};
var _doMergeURI = function(_uri,_root){
// for /a/b/c
if (_uri.indexOf('/')==0)
return _root.replace(_reg0,'$1')+_uri;
// for a/b or ./a/b or ../a/b
return _doFormat(_root)+_uri;
};
_base = _doFormat(_base);
return function(_uri,_root){
_uri = (_uri||'').trim();
if (!_isAbsolute(_root))
_root = _base;
if (!_uri) return _root;
if (_isAbsolute(_uri))
return _uri;
_uri = _doMergeURI(_uri,_root);
_anchor.href = _uri;
_uri = _anchor.href;
return _isAbsolute(_uri) ? _uri :
_anchor.getAttribute('href',4); // ie6/7
};
})();
/**
* 从URL地址中提取源信息
*
* * http://a.b.com:8080/a/b/ -> http://a.b.com:8080
* * /a/b ->
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 提取url地址的源信息
*     // 返回http://a.b.com:8080
*     var origin = _u._$url2origin("http://a.b.com:8080/a/b/");
* });
* ```
*
* @method module:base/util._$url2origin
* @param  {String} arg0 - URL地址
* @return {String}        源信息
*/
_p._$url2origin = (function(){
var _reg = /^([\w]+?:\/\/.*?(?=\/|$))/i;
return function(_url){
if (_reg.test(_url||''))
return RegExp.$1.toLowerCase();
return '';
};
})();
/**
* key-value字符串转对象
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     var str = "abc=abc,123=123";
*     // 返回对象{abc:"abc",123:"123"}
*     var obj = _u._$string2object(_str,",");
* });
* ```
*
* @method module:base/util._$string2object
* @see    module:base/util._$object2string
* @param  {String}        arg0 - 待处理数据
* @param  {String|RegExp} arg1 - 分隔符
* @return {Object}               转换后对象
*/
_p._$string2object = function(_string,_split){
var _obj = {};
_p._$forEach(
(_string||'').split(_split),
function(_name){
var _brr = _name.split('=');
if (!_brr||!_brr.length) return;
var _key = _brr.shift();
if (!_key) return;
_obj[decodeURIComponent(_key)] =
decodeURIComponent(_brr.join('='));
}
);
return _obj;
};
/**
* key-value对象转成key=value对后用分隔符join
*
* 对象中不同类型的取值规则如下：
*
* | 类型            |  取值规则 |
* | :--       | :-- |
* | Function  |  过滤掉，不输出 |
* | Date      |  转成时间戳，getTime取值 |
* | Array     |  值用逗号分隔，如[1,2,3] -> 1,2,3 |
* | Object    |  使用JSON转成字符串 |
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回字符串 abc=abc,123=123
*     var obj = {
*         abc:"abc",
*         123:"123"
*     };
*     var str = _u._$object2string(obj);
*
*     // 返回字符串
*     // a=1871406603152186&b=1,2,3&d={"a":"a","b":"b"}&e=e&f=1&g=true
*     var obj = {
*         a:new Date,
*         b:[1,2,3],
*         c:function(){},
*         d:{a:'a',b:'b'},
*         e:'e',
*         f:1,
*         g:true
*     };
*     var str = _u._$object2string(obj,'&');
* });
* ```
*
* @method module:base/util._$object2string
* @see    module:base/util._$string2object
* @param  {Object}  arg0 - 对象
* @param  {String}  arg1 - 分隔符，默认为逗号
* @param  {Boolean} arg2 - 是否编码
* @return {String}         key-value串
*/
_p._$object2string = function(_object,_split,_encode){
if (!_object) return '';
var _arr = [];
_p._$loop(
_object,function(_value,_key){
if (_p._$isFunction(_value)){
return;
}
if (_p._$isDate(_value)){
_value = _value.getTime();
}else if(_p._$isArray(_value)){
_value = _value.join(',');
}else if(_p._$isObject(_value)){
_value = JSON.stringify(_value);
}
if (!!_encode){
_value = encodeURIComponent(_value);
}
_arr.push(encodeURIComponent(_key)+'='+_value);
}
);
return _arr.join(_split||',');
};
/**
* 查询串转对象
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回对象{abc:"abc",123:"123"}
*     var obj = _u._$query2object("abc=abc&123=123");
* });
* ```
*
* @method module:base/util._$query2object
* @see    module:base/util._$object2query
* @see    module:base/util._$string2object
* @param  {String} arg0 - 查询串
* @return {Object}        转换出来的对象
*/
_p._$query2object = function(_query){
return _p._$string2object(_query,'&');
};
/**
* 对象转查询串
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回对象123=123&abc=abc
*     var query = _u._$object2query({abc:"abc",123:"123"});
* });
* ```
*
* @method module:base/util._$object2query
* @see    module:base/util._$query2object
* @see    module:base/util._$object2string
* @param  {Object} arg0 - 对象
* @return {String}        查询串
*/
_p._$object2query = function(_object){
return _p._$object2string(_object,'&',!0);
};
/**
* 集合转数组，集合具有length属性
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 返回数组['1','2','3']
*     var map = {0:'0',1:'1',2:'2',length:3};
*     var arr = _u._$object2array(map);
*
*     // 多用于对节点集合的转换
*     var nodes = document.body.childNodes;
*     var arr = _u._$object2array(nodes);
* });
* ```
*
* @method module:base/util._$object2array
* @see    module:base/util._$array2object
* @param  {Object} arg0 - 集合，必须有length属性
* @return {Array}         数组
*/
_p._$object2array = function(_object){
return _h.__col2array(_object);
};
/**
* 数组转对象，将列表中元素按照指定KEY组成对象<br/>
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 输出结果为 {2:{id:2,name:'b'},...}
*     var arr = [{id:1,name:'a'},{id:2,name:'b'},...];
*     var obj = _u._$array2object(
*         arr,function(_item){
*             // 过滤name为a的项
*             if (_item.name=='a'){
*                 return;
*             }
*             // 组对象的KEY用每项的id
*             return _item.id;
*         }
*     );
*
*     // 默认使用每项的值组对象
*     var brr = ['a','b','c',...];
*     // 输出 {a:'a',b:'b',c:'c',...}
*     var obj = _u._$array2object(brr);
* });
* ```
*
* @method module:base/util._$array2object
* @see    module:base/util._$object2array
* @param  {Array}    arg0 - 列表
* @param  {Function} arg1 - 过滤函数，返回每一项的KEY，没有返回则过滤当前项
* @return {Object}   对象
*/
_p._$array2object = function(_list,_filter){
var _result = {};
_p._$forEach(
_list,function(_item){
var _key = _item;
if (!!_filter){
_key = _filter(_item);
}
if (_key!=null){
_result[_key] = _item;
}
}
);
return _result;
};
/**
* 格式化数字为指定位数，不足位数前面用0补足
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 2    -> 002
*     // 22   -> 022
*     // 222  -> 222
*     // 2222 -> 2222
*     var str = _u._$number2string(2,3);
* });
* ```
*
* @method module:base/util._$number2string
* @param  {Number} arg0 - 数值
* @param  {Number} arg1 - 位数，至少1位
* @return {String}        格式化后字符串
*/
_p._$number2string = function(_number,_limit){
var _len1 = (''+_number).length,
_len2 = Math.max(1,parseInt(_limit)||0),
_delta = _len2-_len1;
if (_delta>0){
_number = new Array(_delta+1).join('0')+_number;
}
return ''+_number;
};
/**
* 安全删除属性，
* 部分浏览器（如低版本IE）禁止直接delete节点上的属性
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 节点上保存的数据
*     _node.data = {a:'aaaaa',b:'bbbbb'};
*     _node.test = 'aaaaa';
*
*     // 删除单个属性
*     _u._$safeDelete(_node,'test');
*     // 批量删除
*     _u._$safeDelete(_node,['test','data']);
* });
* ```
*
* @method module:base/util._$safeDelete
* @param  {Object}       arg0 - 对象
* @param  {String|Array} arg1 - 属性
* @return {Void}
*/
_p._$safeDelete = function(_object,_name){
if (!_p._$isArray(_name)){
try{
delete _object[_name];
}catch(e){
_object[_name] = undefined;
}
}else{
_p._$forEach(
_name,function(_item){
_p._$safeDelete(_object,_item);
}
);
}
};
/**
* 随机一个字符串
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 可能返回"13d1r1dt2"
*     var seed = _u._$randString(9);
* });
* ```
*
* @method module:base/util._$randString
* @param  {String} arg0 - 字符串长度
* @return {String}        随机字符串
*/
_p._$randString = (function(){
var _chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
return function(_length){
_length = _length||10;
var _result = [];
for(var i=0,_rnum;i<_length;++i){
_rnum = Math.floor(Math.random()*_chars.length);
_result.push(_chars.charAt(_rnum));
}
return _result.join('');
};
})();
/**
* ���机生成一个给定范围的整数
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 可能返回3
*     var seed = _u._$randNumber(0,9);
* });
* ```
*
* @method module:base/util._$randNumber
* @see    module:base/util._$randNumberString
* @param  {Number} arg0 - 小区间，包含
* @param  {Number} arg1 - 大区间，不包含
* @return {Number}        随机整数
*/
_p._$randNumber = function(_min,_max){
return Math.floor(Math.random()*(_max-_min)+_min);
};
/**
* 随机生成一个全部为数字的字符串
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 可能返回123456789
*     var seed = _u._$randNumberString(9);
* });
* ```
*
* @deprecated
* @method module:base/util._$randNumberString
* @see    module:base/util._$randNumber
* @see    module:base/util._$uniqueID
* @param  {Number} arg0 - 随机字符串的长度[1,30]
* @return {String}        随机生成的字符串
*/
_p._$randNumberString = function(_length){
_length = Math.max(0,Math.min(_length||8,30));
var _min = Math.pow(10,_length-1),_max = _min*10;
return _p._$randNumber(_min,_max).toString();
};
/**
* 生成系统中的唯一标识，每次调用均生成一个新的标识
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_p){
*    // 可能返回123456789
*    var _id1 = _p._$uniqueID(),
*        _id2 = _p._$uniqueID();
*    // _id1 != _id2
* });
* ```
*
* @method module:base/util._$uniqueID
* @return {String} 唯一标识
*/
_p._$uniqueID = (function(){
var _seed = +new Date;
return function(){
return ''+(_seed++);
};
})();
/**
* 读取上下文中指定名字空间的值
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     var obj = {
*         a:{
*             b:{
*                 c:{
*                     d:'ddddd'
*                 }
*             }
*         }
*     };
*     // 输出 ddddd
*     var value = _u._$query(obj,'a.b.c.d');
*     // 输出 undefined
*     var value = _u._$query(null,'a.b.c.d');
* });
* ```
*
* @method module:base/util._$query
* @param  {Object} arg0 - 上下文
* @param  {String} arg1 - 名字空间
* @return {Varaible}      查询到的值
*/
_p._$query = function(_context,_namespace){
_context = _context||_o;
var _arr = (_namespace||'').split('.');
for(var i=0,l=_arr.length;i<l;i++){
_context = _context[_arr[i]];
if (!_context) break;
}
return _context;
};
/**
* 合并数据，同名属性右侧覆盖左侧，
* 最后一个如果是函数则用做数据过滤，
* 第一个参数作为合并数据结果集对象，如果为空则新建对象
*
* 过滤接口输入输出说明
*
* |      | 类型          | 说明 |
* | :--  | :--      | :-- |
* | 输入  | Variable | 值 |
* |      | String   | 键 |
* | 输出  | Boolean  | 是否过滤 |
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 合并多个数据至obj0中
*     var obj0 = {a:0,b:1},
*         obj1 = {a:"a",b:"b",c:"c"},
*         obj2 = {c:"c",d:"d",e:"f"},
*         ... ;
*     var obj = _u._$merge(obj0,obj1,obj2,...);
*
*     // 带过滤接口合并
*     // 阻止a属性的覆盖
*     var obj = _u._$merge(
*         obj0,obj1,obj2,...,
*         function(_value,_key){
*             return _key=='a';
*         }
*     );
* });
* ```
*
* @method module:base/util._$merge
* @see    module:base/util._$fetch
* @param  {Object}   arg0 - 原始对象
* @param  {Object}   arg1 - 待拷贝对象
* @param  {Function} arg2 - 过滤接口
* @return {Object}          拷贝后对象
*/
_p._$merge = function(){
var _last = arguments.length-1,
_filter = arguments[_last];
// check filter function for last args
if (_p._$isFunction(_filter)){
_last -= 1;
}else{
_filter = _f;
}
// args0 as result
var _result = arguments[0]||{};
// merge
for(var i=1;i<=_last;i++){
_p._$loop(arguments[i],function(v,k){
if (!_filter(v,k)){
_result[k] = v;
}
});
}
return _result;
};
/**
* 根据原始对象属性，从目标对象提取非空值
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     var obj0 = {a:0,b:1},
*         obj1 = {a:"a",b:"b",c:"c"};
*     // 根据obj0的属性,从obj1拷贝非null属性到obj0中
*     // 结果是obj0.a = "a",obj.b = "b",没有拷贝c属性;
*     var obj = _u._$fetch(obj0,obj1);
* });
* ```
*
* @method module:base/util._$fetch
* @see    module:base/util._$merge
* @param  {Object} arg0 - 原始对象
* @param  {Object} arg1 - 目标对象
* @return {Object}        合并后的对象
*/
_p._$fetch = function(_object,_config){
if (!!_config){
_p._$loop(_object,function(v,k,m){
var _value = _config[k];
if (_value!=null){
m[k] = _value;
}
});
}
return _object;
};
/**
* 判断对象自生是否包含元素
*
* ```javascript
* NEJ.define([
*     'base/util'
* ],function(_u){
*     // 判断空对象是否有属性
*     // 输出 false
*     var has = _u._$hasProperty({});
*
*     // 判断非空对象是否有属性
*     // 输出 true
*     var has = _u._$hasProperty({a:'a',b:'b',c:'c'});
*
*     // 判断空数组是否有属性
*     // 输出 false
*     var has = _u._$hasProperty([]);
*
*     // 判断非空数组是否有属性
*     // 输出 true
*     var has = _u._$hasProperty([1,2,3]);
* });
* ```
*
* @method module:base/util._$hasProperty
* @param  {Object|Array} arg0 - 对象
* @return {Boolean}             是否有元素
*/
_p._$hasProperty = function(_obj){
// for null
if (!_obj){
return !1;
}
// for object with length
if (_obj.length!=null){
return _obj.length>0;
}
// for object
var _length = 0;
_p._$loop(_obj,function(){
_length++;
return _length>0;
});
return _length>0;
};
if (CMPT){
NEJ.Q  = _p._$query;
NEJ.X  = _p._$merge;
NEJ.EX = _p._$fetch;
NEJ.copy(this.NEJ,NEJ);
NEJ.copy(NEJ.P('nej.u'),_p);
}
return _p;
},7,8);
I$(17,function (NEJ,_u,_p,_o,_f,_r){
var _cache = {};
/*
* URL地址转源信息
* http://a.b.com:8080/a/bc/ -> http://a.b.com:8080
* @param  {String} URL地址
* @return {String} 源信息
*/
_p.__url2host = (function(){
var _reg = /^([\w]+?:\/\/.*?(?=\/|$))/i;
return function(_url){
_url = _url||'';
if (_reg.test(_url))
return RegExp.$1;
return location.protocol+'//'+location.host;
};
})();
/**
* 设置NEJ配置信息
* @param  {String}   配置标识
* @param  {Variable} 配置信息
* @return {Void}
*/
_p.__set = function(_key,_value){
_cache[_key] = _value;
};
/**
* 获取NEJ配置信息
* @param  {String}   配置标识
* @return {Variable} 配置信息
*/
_p.__get = function(_key){
return _cache[_key];
};
// init
/*
* 初始化配置信息
* @param  {Object} 配置信息
* @return {Void}
*/
var _doInit = (function(){
var _conf = {
'portrait':{name:'portrait',dft:'portrait/'},
'ajax.swf':{name:'ajax',dft:'nej_proxy_flash.swf'},
'chart.swf':{name:'chart',dft:'nej_flex_chart.swf'},
'audio.swf':{name:'audio',dft:'nej_player_audio.swf'},
'video.swf':{name:'video',dft:'nej_player_video.swf'},
'clipboard.swf':{name:'clipboard',dft:'nej_clipboard.swf'},
'upload.image.swf':{name:'uploadimage',dft:'nej_upload_image.swf'}
};
var _doInitProxy = function(_list){
var _map = {};
if (!_list||!_list.length){
return _map;
}
for(var i=0,l=_list.length,_path;i<l;i++){
_path = _list[i];
if (_path.indexOf('://')>0)
_map[_p.__url2host(_path)] = _path;
}
return _map;
};
return function(_config){
// check path config
_p.__set('root',_config.root||'/res/');
var _root = _p.__get('root');
_u._$loop(_conf,function(v,k,m){
_p.__set(k,_config[v.name]||(_root+v.dft));
});
// csrf config
var _csrf = _config.p_csrf;
if (_csrf===!0){
_csrf = {
cookie:'AntiCSRF',
param:'AntiCSRF'
};
}
_csrf = _csrf || _o;
_p.__set('csrf',{
param:_csrf.param||'',
cookie:_csrf.cookie||''
});
// ajax by frame proxy
_p.__set('frames',_doInitProxy(_config.p_frame));
// ajax by flash proxy
_p.__set('flashs',_doInitProxy(_config.p_flash));
};
})();
_doInit(this.NEJ_CONF||_o);
return _p;
},7,2);
I$(16,function(_h,_m,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[1])._$KERNEL;if (_k_.engine=='trident'){(function (){
_h.__set(
'storage.swf',
(this.NEJ_CONF||_o).storage||
(_h.__get('root')+'nej_storage.swf')
);
})();}
if (_k_.engine=='trident'&&_k_.release<='3.0'){(function (){
_h.__set(
'blank.png',
(this.NEJ_CONF||_o).blank||
(_h.__get('root')+'nej_blank.gif')
);
})();};return _h;
},17,10);
I$(15,function (NEJ,_h,_p,_o,_f,_r){
/**
* 取Frame跨域Ajax代理文件，通过NEJ_CONF的p_frame配置给定域名的代理文件地址
*
* @method module:base/config._$getFrameProxy
* @see    module:base/config._$get
* @param  {String} arg0 - 请求地址或者域名
* @return {String}        代理文件地址
*/
_p._$getFrameProxy = function(_url){
var _host = _h.__url2host(_url);
return _p._$get('frames')[_host]||
(_host+'/res/nej_proxy_frame.html');
};
/**
* 取Flash跨域Ajax配置文件，通过NEJ_CONF的p_flash配置给定域名的代理文件地址
*
* @method module:base/config._$getFlashProxy
* @see    module:base/config._$get
* @param  {String} arg0 - 请求地址或者域名
* @return {String}        代理文件地址
*/
_p._$getFlashProxy = function(_url){
return _p._$get('flashs')[_h.__url2host(_url)];
};
/**
* 获取NEJ配置信息，通过NEJ_CONF配置相关信息
*
* ```javascript
*  window.NEJ_CONF = {
*      // resource root
*      // defalut value -> '/res/'
*      root : '/nej/'
*      // blank image for ie6-ie7
*      // default value -> $root+'nej_blank.gif'
*      blank : '/res/nej_blank.gif'
*      // localstorage flash
*      // default value -> $root+'nej_storage.swf'
*      storage : '/res/nej_storage.swf'
*      // audio player flash
*      // default value -> $root+'nej_player_audio.swf'
*      audio : '/res/nej_player_audio.swf'
*      // video player flash
*      // default value -> $root+'nej_player_video.swf'
*      video : '/res/nej_player_video.swf'
*      // clipboard flash
*      // default value -> $root+'nej_clipboard.swf'
*      clipboard : '/res/nej_clipboard.swf'
*      // https request proxy
*      // default value -> $root+'nej_proxy_flash.swf'
*      ajax : '/res/nej_proxy_flash.swf'
*      // portrait root
*      // default value -> $root+'portrait/'
*      portrait : '/res/portrait/'
*      // cross domain xhr request for ie6-ie9
*      // if path not start with http[s]://
*      // will use /res/nej_proxy_frame.html as default
*      p_frame:['http://c.d.com/html/nej_proxy_frame.html']
*      // flash crossdomain.xml file path
*      // default value -> http://a.b.com/crossdomain.xml
*      p_flash:['http://a.b.com/proxy/crossdomain.xml']
*      // CSRF cookie name and parameter name
*      // set p_csrf:true to use URS config {cookie:'AntiCSRF',param:'AntiCSRF'}
*      // default value -> {cookie:'',param:''}
*      p_csrf:{cookie:'AntiCSRF',param:'AntiCSRF'}
*  };
* ```
*
* 配置标识支持
*
* | 标识                          | 说明 |
* | :--              | :-- |
* | portrait         | 表情根路径 |
* | blank.png        | 空白图片文件地址 |
* | ajax.swf         | Ajax代理Flash文件地址 |
* | chart.swf        | 图标Flash文件地址 |
* | audio.swf        | 实现Audio功能的Flash文件地址 |
* | video.swf        | 实现Video功能的Flash文件地址 |
* | clipboard.swf    | 实现剪切板功能的Flash文件地址 |
* | upload.image.swf | 实现图片上传功能的Flash文件地址 |
* | storage.swf      | 实现本地存储功能的Flash文件地址 |
*
* @method module:base/config._$get
* @param  {String}   arg0 - 配置标识
* @return {Variable}        配置信息
*/
_p._$get = function(_key){
return _h.__get(_key);
};
if (CMPT){
NEJ.copy(NEJ.P('nej.c'),_p);
}
return _p;
},7,16);
I$(13,function (NEJ,_c,_p,_o,_f,_r){
var _seed = +new Date;
/**
* 找不到指定内容的错误码
*
* @const {Number} module:base/constant._$CODE_NOTFUND
*/
_p._$CODE_NOTFUND = 10000-_seed;
/**
* 需要指���的参数未指定的错误码
*
* @const {Number} module:base/constant._$CODE_NOTASGN
*/
_p._$CODE_NOTASGN = 10001-_seed;
/**
* 不支持操作的错误码
*
* @const {Number} module:base/constant._$CODE_NOTSPOT
*/
_p._$CODE_NOTSPOT = 10002-_seed;
/**
* 操作超时的错误码
*
* @const {Number} module:base/constant._$CODE_TIMEOUT
*/
_p._$CODE_TIMEOUT = 10003-_seed;
/**
* 字符串作为脚本执行异常的错误码
*
* @const {Number} module:base/constant._$CODE_ERREVAL
*/
_p._$CODE_ERREVAL = 10004-_seed;
/**
* 回调执行异常的错误码
*
* @const {Number} module:base/constant._$CODE_ERRCABK
*/
_p._$CODE_ERRCABK = 10005-_seed;
/**
* 服务器返回异常的错误码
*
* @const {Number} module:base/constant._$CODE_ERRSERV
*/
_p._$CODE_ERRSERV = 10006-_seed;
/**
* 异常终止的错误码
*
* @const {Number} module:base/constant._$CODE_ERRABRT
*/
_p._$CODE_ERRABRT = 10007-_seed;
/**
* 请求头content-type统一名称
*
* @const {Number} module:base/constant._$HEAD_CT
*/
_p._$HEAD_CT      = 'Content-Type';
/**
* 文本请求头content-type值
*
* @const {String} module:base/constant._$HEAD_CT_PLAN
*/
_p._$HEAD_CT_PLAN = 'text/plain';
/**
* 文件请求头content-type值
*
* @const {String} module:base/constant._$HEAD_CT_FILE
*/
_p._$HEAD_CT_FILE = 'multipart/form-data';
/**
* 表单请求头content-type值
*
* @const {String} module:base/constant._$HEAD_CT_FORM
*/
_p._$HEAD_CT_FORM = 'application/x-www-form-urlencoded';
/**
* 空图片BASE64编码地址，低版本浏览器使用图片地址
*
* @const {String} module:base/constant._$BLANK_IMAGE
*/
_p._$BLANK_IMAGE  = _c._$get('blank.png')||'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
if (CMPT){
NEJ.copy(NEJ.P('nej.g'),_p);
}
return _p;
},7,15);
I$(11,function (_u,_p){
var _cache = {};
/**
* 添加可链式调用的接口
*
* 添加可链式接口
* ```javascript
* NEJ.define([
*     'base/chain'
* ],function(_l){
*     var _map = {};
*
*      _map._$api1 = function(){
*          // TODO
*      }
*
*      _map._$api2 = function(){
*          // TODO
*      }
*
*     _l._$merge(_map);
* });
* ```
*
* 使用链式调用接口
* ```javascript
* NEJ.define([
*     '/path/to/api.js',
*     'util/chain/chainable'
* ],function(_x,$){
*     // 使用链式调用api
*     $('body > p')._$api1()._$api2();
* });
* ```
*
* @method module:base/chain._$merge
* @param  {Object} arg0 - 接口集合
* @return {Void}
*/
_p._$merge = function(_map){
_u._$merge(_cache,_map);
};
/**
* 导出链式接口列表
*
* @method module:base/chain._$dump
* @return {Object} 链式接口列表
*/
_p._$dump = function(){
return _cache;
};
/**
* 清除链式列表
*
* @method module:base/chain._$clear
* @return {Void}
*/
_p._$clear = function(){
_cache = {};
};
return _p;
},2);
I$(18,function (_u,_m,_p,_o,_f,_r){
/**
* 从DocumentFragment中取指定ID的节点
* @param  {Document} 文档对象
* @param  {String}   节点标识
* @return {Node}     指定标识的节点
*/
_p.__getElementById = function(_fragment,_id){
if (!!_fragment.getElementById){
return _fragment.getElementById(''+_id);
}
try{
return _fragment.querySelector('#'+_id);
}catch(e){
return null;
}
};
/**
* 取节点的子节点列表
* @param  {Node}  节点ID或者对象
* @return {Array} 子节点列表
*/
_p.__getChildren = function(_element){
return _u._$object2array(_element.children);
};
/**
* 根据类名取节点列表
* @param  {Node}   节点ID或者对象
* @param  {String} 类名
* @return {Array}  节点列表
*/
_p.__getElementsByClassName = function(_element,_class){
return _u._$object2array(_element.getElementsByClassName(_class));
};
/**
* 取下一个兄弟节点
* @param  {Node}  节点对象
* @return {Node}  节点
*/
_p.__nextSibling = function(_element){
return _element.nextElementSibling;
};
/**
* 取上一个兄弟节点
* @param  {Node}  节点对象
* @return {Node}  节点
*/
_p.__previousSibling = function(_element){
return _element.previousElementSibling;
};
/**
* 设置、获取数据
* @param {Node}     节点
* @param {String}   标识
* @param {Variable} 值
*/
_p.__dataset = function(_element,_name,_value){
_element.dataset = _element.dataset||{};
if (_value!==undefined){
_element.dataset[_name] = _value;
}
return _element.dataset[_name];
};
/**
* 取节点属性值
* @param  {Node}   节点
* @param  {String} 属性名
* @return {String} 属性值
*/
_p.__getAttribute = function(_element,_name){
return _element.getAttribute(_name);
};
/**
* 将dom节点转为xml串
* @param  {Node}   节点
* @return {String} XML代码
*/
_p.__serializeDOM2XML = function(_dom){
return new XMLSerializer().serializeToString(_dom)||'';
};
/**
* 将xml转为dom节点
* @param  {String} XML代码
* @return {Node}   节点
*/
_p.__parseDOMFromXML = function(_xml){
var _root = new DOMParser()
.parseFromString(_xml,'text/xml')
.documentElement;
return _root.nodeName=='parsererror'?null:_root;
};
/**
* 节点占全屏
* @param  {Node}   节点
* @param  {Object} 视窗模型
* @return {Void}
*/
_p.__fullScreen = function(){
// use css fixed position
};
/**
* 为节点增加用于盖select/flash等控件的层
* @param  {Node} 节点
* @return {Void}
*/
_p.__mask = function(){
// do nothing
};
/**
* 去除用于盖select/flash等控件的层
* @param  {Node} 节点
* @return {Void}
*/
_p.__unmask = function(){
// do nothing
};
// variables
var _ospt = _m._$SUPPORT,
_opfx = _m._$KERNEL.prefix;
/**
* 指定名称是否在配置表中
* @param  {String}  名称
* @param  {Object}  配置表
* @return {Boolean} 是否命中
*/
_p.__isMatchedName = (function(){
var _reg = /^([a-z]+?)[A-Z]/;
return function(_name,_map){
return !!(_map[_name]||(_reg.test(_name)&&_map[RegExp.$1]));
};
})();
/**
* 样式名称做前缀增强
* @param  {String}  名称
* @return {Boolean} 是否需要前缀增强
*/
_p.__isNeedPrefixed = (function(){
var _pmap = _u._$array2object([
'animation','transform','transition',
'appearance','userSelect','box','flex','column'
]);
return function(_name){
return _p.__isMatchedName(_name,_pmap);
};
})();
/**
* 格式化样式属性名称
* border-width -> borderWidth
* @param  {String} 样式样式名
* @return {String} 格式化后样式名
*/
_p.__fmtStyleName = (function(){
var _reg = /-([a-z])/g;
return function(_name){
_name = _name||'';
return _name.replace(_reg,function($1,$2){
return $2.toUpperCase();
});
};
})();
/**
* 针对样式名称做格式化及前缀增强
* @param  {String} 样式名
* @return {String} 增强后的样式名
*/
_p.__getStyleName = (function(){
var _reg = /^[a-z]/,
_prefix = _opfx.css||'';
return function(_name){
_name = _p.__fmtStyleName(_name);
if (!_p.__isNeedPrefixed(_name)){
return _name;
}
// add prefix
// userSelect -> webkitUserSelect
return _prefix+_name.replace(_reg,function($1){
return $1.toUpperCase();
});
};
})();
/**
* 取样式值
* @param  {String|Node} 节点
* @param  {String}      样式名称
* @return {Variable}    样式值
*/
_p.__getStyleValue = function(_element,_name){
var _current = window.getComputedStyle(_element,null);
return _current[_p.__getStyleName(_name)]||'';
};
/**
* 设置样式
* @param  {String|Node} 节点
* @param  {String}      样式名称
* @param  {String}      样式值
* @return {Void}
*/
_p.__setStyleValue = function(_element,_name,_value){
_element.style[_p.__getStyleName(_name)] = _value;
};
/**
* 取样式变换矩阵对象
* @param  {String}    变换信息
* @return {CSSMatrix} 变换矩阵对象
*/
_p.__getCSSMatrix = (function(){
var _reg0 = /\((.*?)\)/,
_reg1 = /\s*,\s*/,
_klss = ['CSSMatrix',_opfx.clz+'CSSMatrix'],
_list = ['m11','m12','m21','m22','m41','m42'];
// matrix(1,2,3,4,5,6)
// -> {m11:1,m12:2,m21:3,m22:4,m41:5,m42:6}
var _doParse = function(_matrix){
var _obj = {};
if (_reg0.test(_matrix||'')){
// 11,12,21,22,41,42
_u._$forEach(
RegExp.$1.split(_reg1),
function(_value,_index){
_obj[_list[_index]] = _value;
}
);
}
return _obj;
};
return function(_matrix){
var _mtrx;
_u._$forIn(_klss,function(_name){
if (!!this[_name]){
_mtrx = new this[_name](_matrix||'');
return !0;
}
});
return !_mtrx?_doParse(_matrix):_mtrx;
};
})();
/**
* 注入样式
* @param  {Node}   样式节点
* @param  {String} 样式内容
* @return {Void}
*/
_p.__injectCSSText = function(_style,_css){
_style.textContent = _css;
};
/**
* 对样式进行预处理
* @param  {String} 待处理样式内容
* @return {String} 处理后样式内容
*/
_p.__processCSSText = (function(){
var _reg0 = /\$<(.*?)>/gi,
_reg1 = /\{(.*?)\}/g,
_pfx = '-'+_opfx.css.toLowerCase()+'-',
_2dmap = {
scale:'scale({x|1},{y|1})',
rotate:'rotate({a})',
translate:'translate({x},{y})',
matrix:'matrix({m11},{m12},{m21},{m22},{m41},{m42})'
},
_3dmap  = {
scale:'scale3d({x|1},{y|1},{z|1})',
rotate:'rotate3d({x},{y},{z},{a})',
translate:'translate3d({x},{y},{z})',
matrix:'matrix3d({m11},{m12},{m13},{m14},{m21},{m22},{m23},{m24},{m31},{m32},{m33|1},{m34},{m41},{m42},{m43},{m44|1})'
};
// merge template and data
var _getTransformValue = function(_tpl,_map){
_map = _map||_o;
return _tpl.replace(_reg1,function($1,$2){
var _arr = $2.split('|');
return _map[_arr[0]]||_arr[1]||'0';
});
};
// process transform value
_p.__processTransformValue = function(_name,_data){
var _tpl = (!_ospt.css3d?_2dmap:_3dmap)[_name.trim()];
if (!!_tpl){
return _getTransformValue(_tpl,_data);
}
return '';
};
return function(_css){
if (!_css.replace){
return _css;
}
return _css.replace(_reg0,function($1,$2){
// prefix for css3
if ($2==='vendor'){
return _pfx;
}
// parse 3D value
var _arr = ($2||'').split('|');
return _p.__processTransformValue(
_arr[0],_u._$query2object(_arr[1])
)||$1;
});
};
})();
/**
* 追加CSS规则
* @param  {Node}    样式节点
* @param  {String}  单条样式规则
* @return {CSSRule} 样式规则对象
*/
_p.__appendCSSText = function(_element,_css){
var _sheet = _element.sheet,
_length = _sheet.cssRules.length;
_sheet.insertRule(_css,_length);
return _sheet.cssRules[_length];
};
/**
* 取待验证的样式列表
* @param  {String} 样式，多个以空格分隔
* @return {Array}  样式列表
*/
_p.__getClassList = (function(){
var _reg = /\s+/;
return function(_class){
_class = (_class||'').trim();
return !!_class?_class.split(_reg):null;
};
})();
/**
* 操作样式
* @param  {Node}   节点
* @param  {String} 操作
* @param  {String} 样式
* @return {Void}
*/
_p.__processClassName = function(_element,_type,_class){
if (_type=='replace'){
_p.__processClassName(
_element,'remove',_class
);
_p.__processClassName(
_element,'add',arguments[3]
);
return;
}
_u._$forEach(
_p.__getClassList(_class),
function(_clazz){
_element.classList[_type](_clazz);
}
);
};
/**
* 检测节点是否包含指定样式，多个样式用空格分隔，检测时包含其中之一即表示包含
* @param  {Node}    节点ID或者对象
* @param  {String}  样式串
* @return {Boolean} 是否含指定样式
*/
_p.__hasClassName = function(_element,_class){
var _list = _element.classList;
if (!_list||!_list.length){
return !1;
}
return _u._$indexOf(
_p.__getClassList(_class),
function(_clazz){
return _list.contains(_clazz);
}
)>=0;
};
// for init
(function(){
if (!_ospt.css3d){
var _matrix = _p.__getCSSMatrix();
_ospt.css3d = !!_matrix&&_matrix.m41!=null;
}
})();
return _p;
},2,10);
I$(14,function(_h,_m,_u,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[1])._$KERNEL;if (_k_.engine=='trident'){(function (){
/**
* 取节点的子节点列表
* @param  {Node} _element 节点ID或者对象
* @return {Array}         子节点列表
*/
_h.__getChildren = _h.__getChildren._$aop(
function(_event){
var _element = _event.args[0];
if (!!_element.children) return;
// hack children
_event.stopped = !0;
var _result = [];
_u._$forEach(
_element.childNodes,
function(_node){
if (_node.nodeType==1){
_result.push(_node);
}
}
);
_event.value = _result;
}
);
})();}
if (_k_.engine=='trident'&&_k_.release<='6.0'){(function (){
/**
* 设置、获取数据
* @param {Node}     节点
* @param {String}   标识
* @param {Variable} 值
*/
_h.__dataset = (function(){
var _dataset = {},
_tag = 'data-',
_reg = /\-(.{1})/gi;
// init element dataset
var _init = function(_element){
var _id = _element.id;
if (!!_dataset[_id]) return;
var _map = {};
_u._$forEach(
_element.attributes,
function(_node){
var _key  = _node.nodeName;
if (_key.indexOf(_tag)!=0) return;
_key = _key.replace(_tag,'')
.replace(_reg,function($1,$2){
return $2.toUpperCase();
});
_map[_key] = _node.nodeValue||'';
}
);
_dataset[_id] = _map;
};
return function(_element,_key,_value){
_init(_element);
var _set = _dataset[_element.id];
if (_value!==undefined){
_set[_key] = _value;
}
return _set[_key];
};
})();
})();}
if (_k_.engine=='trident'&&_k_.release<='5.0'){(function (){
// cache background image
try{document.execCommand('BackgroundImageCache',!1,!0);}catch(e){}
/**
* 注入样式
* @param  {Node}   样式节点
* @param  {String} 样式内容
* @return {Void}
*/
_h.__injectCSSText = (function(){
var _max = 30;
return _h.__injectCSSText._$aop(function(_event){
var _element = _event.args[0];
if (!_element.styleSheet) return;
_event.stopped = !0;
var _css = _event.args[1];
// ie9- has 31 style/link limitation
var _list = document.styleSheets;
if (_list.length>_max){
// bad performance
_element = _list[_max];
_css = _element.cssText + _css;
}else{
_element = _element.styleSheet;
}
_element.cssText = _css;
});
})();
/**
* 取待验证的样式正则表达式
* @param  {String} 样式，多个以空格分隔
* @return {RegExp} 正则表达式
*/
_h.__getClassRegExp = (function(){
var _reg = /\s+/g;
return function(_class){
_class = (_class||'').trim().replace(_reg,'|');
return !_class?null:new RegExp('(\\s|^)(?:'+_class+')(?=\\s|$)','g');
};
})();
/**
* 操作样式
* @param  {Node}   节点
* @param  {String} 操作
* @param  {String} 样式
* @return {Void}
*/
_h.__processClassName = function(_element,_type,_class){
_class = _class||'';
var _name = _element.className||'',
_xreg = _h.__getClassRegExp(
_class+' '+(arguments[3]||'')
);
// remove all calss
var _result = _name;
if (!!_xreg){
_result = _result.replace(_xreg,'');
}
// parse added class
switch(_type){
case 'remove':
_class = '';
break;
case 'replace':
_class = arguments[3]||'';
break;
}
// generate class result
_result = (_result+' '+_class).trim();
if (_name!=_result){
_element.className = _result;
}
};
/**
* 检测节点是否包含指定样式，多个样式用空格分隔，检测时包含其中之一即表示包含
* @param  {Node}    节点ID或者对象
* @param  {String}  样式串
* @return {Boolean} 是否含指定样式
*/
_h.__hasClassName = function(_element,_class){
var _xreg = _h.__getClassRegExp(_class);
if (!!_xreg){
return _xreg.test(_element.className||'');
}
return !1;
};
})();}
if (_k_.engine=='trident'&&_k_.release<='4.0'){(function (){
/**
* 根据类名取节点列表
* @param  {Node}   节点ID或者对象
* @param  {String} 类名
* @return {Array}  节点列表
*/
_h.__getElementsByClassName = function(_element,_class){
var _result = [],
_regexp = new RegExp('(\\s|^)(?:'+_class.replace(/\s+/g,'|')+')(?=\\s|$)');
_u._$forEach(
_element.getElementsByTagName('*'),
function(_node){
if (_regexp.test(_node.className)){
_result.push(_node);
}
}
);
return _result;
};
/**
* 取下一个兄弟节点
* @param  {Node}  节点对象
* @return {Node}  节点
*/
_h.__nextSibling = function(_element){
while(_element=_element.nextSibling){
if (_element.nodeType==1){
return _element;
}
}
};
/**
* 取上一个兄弟节点
* @param  {Node}  节点对象
* @return {Node}  节点
*/
_h.__previousSibling = function(_element){
while(_element=_element.previousSibling){
if (_element.nodeType==1){
return _element;
}
}
};
/**
* 将dom节点转为xml串
* @param  {Node}   节点
* @return {String} XML代码
*/
_h.__serializeDOM2XML = function(_dom){
return ('xml' in _dom)?_dom.xml:_dom.outerHTML;
};
/**
* 将xml转为dom节点
* @param  {String} XML代码
* @return {Node}   节点
*/
_h.__parseDOMFromXML = (function(){
// http://blogs.msdn.com/b/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
var _msxml = [
'Msxml2.DOMDocument.6.0',
'Msxml2.DOMDocument.3.0'
];
var _getParser = function(){
try{
for(var i=0,l=_msxml.length;i<l;i++){
return new ActiveXObject(_msxml[i]);
}
}catch(ex){
return null;
}
};
return function(_xml){
var _parser = _getParser();
if (!!_parser&&
_parser.loadXML(_xml)&&
!_parser.parseError.errorCode){
return _parser.documentElement;
}
return null;
};
})();
/**
* 取样式值
* @param  {String|Node} 节点
* @param  {String}      样式名称
* @return {Variable}    样式值
*/
_h.__getStyleValue = (function(){
var _reg0 = /opacity\s*=\s*([\d]+)/i;
var _fmap = {
// get opacity from filter:alpha(opacity=50)
opacity:function(_style){
var _result = 0;
if (_reg0.test(_style.filter||'')){
_result = parseFloat(RegExp.$1)/100;
}
return _result;
}
};
return function(_element,_name){
var _current = _element.currentStyle,
_func = _fmap[_name];
if (!!_func){
return _func(_current);
}
return _current[_h.__getStyleName(_name)]||'';
};
})();
/**
* 设置样式
* @param  {String|Node} 节点
* @param  {String}      样式名称
* @param  {String}      样式值
* @return {Void}
*/
_h.__setStyleValue = (function(){
var _fmap = {
// opacity -> filter:alpha(opacity=50)
opacity:function(_element,_value){
_element.style.filter = 'alpha(opacity='+_value*100+')';
}
};
return function(_element,_name,_value){
var _func = _fmap[_name];
if (!!_func){
_func(_element,_value);
}else{
_element.style[_h.__getStyleName(_name)] = _value;
}
};
})();
/**
* 追加CSS规则
* @param  {Node}    样式节点
* @param  {String}  单条样式规则
* @return {CSSRule} 样式规则对象
*/
_h.__appendCSSText = function(_element,_css){
var _sheet = _element.styleSheet,
_length = _sheet.rules.length,
_arr = _css.split(/[\{\}]/);
_sheet.addRule(_arr[0],_arr[1],_length);
return _sheet.rules[_length];
};
})();}
if (_k_.engine=='trident'&&_k_.release<='3.0'){(function (){
/**
* 取节点属性值
* @param  {Node}   节点
* @param  {String} 属性名
* @return {String} 属性值
*/
_h.__getAttribute =
_h.__getAttribute._$aop(null,function(_event){
// fix ie7 maxlength default value 2147483647
var _args = _event.args;
if (_args[1]=='maxlength'&&
_event.value==2147483647){
_event.value = null;
}
});
})();}
if (_k_.engine=='trident'&&_k_.release<='2.0'){(function (){
/**
* 节点占全屏
* @param  {Node}   节点
* @param  {Object} 视窗模型
* @return {Void}
*/
_h.__fullScreen = function(_element,_viewport){
var _style = _element.style;
_style.width = _viewport.scrollWidth+'px';
_style.height = _viewport.scrollHeight+'px';
};
/**
* 为节点增加用于盖select/flash等控件的层
* @param  {Node} 节点
* @return {Void}
*/
_h.__mask = (function(){
var _cache = {};
// remove mask
_h.__unmask = function(_element){
var _id = _element.id,
_mask = _cache[_id];
if (!!_mask){
delete _cache[_id];
_mask.parentNode.removeChild(_mask);
}
};
// append mask
return function(_element){
var _id = _element.id,
_mask = _cache[_id];
// create mask
if (!_mask){
_mask = document.createElement('iframe');
_mask.style.position = 'absolute';
_cache[_id] = _mask;
}
// sync mask size
var _style1 = _mask.style,
_style0 = _element.style;
_style1.top = (parseInt(_style0.top)||0)+'px';
_style1.left = (parseInt(_style0.left)||0)+'px';
_style1.width = _element.offsetWidth+'px';
_style1.height = _element.offsetHeight+'px';
_element.insertAdjacentElement('beforeBegin',_mask);
return _mask;
};
})();
})();}
if (_k_.engine=='gecko'){(function (){
if (!_m._$SUPPORT.css3d){
_m._$SUPPORT.css3d = 'MozPerspective' in document.body.style;
}
if (!('insertAdjacentElement' in document.body)){
HTMLElement.prototype.insertAdjacentElement = function(_where,_element){
if (!_where||!_element) return;
switch(_where){
case 'beforeEnd'  :
this.appendChild(_element);
return;
case 'beforeBegin':
this.parentNode.insertBefore(_element,this);
return;
case 'afterBegin' :
!this.firstChild
?this.appendChild(_element)
:this.insertBefore(_element,this.firstChild);
return;
case 'afterEnd'   :
!this.nextSibling
?this.parentNode.appendChild(_element)
:this.parentNode.insertBefore(_element,this.nextSibling);
return;
}
};
}
if (!('innerText' in document.body)){
HTMLElement.prototype['__defineGetter__']("innerText",function(){return this.textContent;});
HTMLElement.prototype['__defineSetter__']("innerText",function(_content){this.textContent = _content;});
}
})();};return _h;
},18,10,2);
I$(4,function (NEJ,_g,_u,_v,_x,_h,_p,_o,_f,_r){
// variables
var _y = {},     // chainable methods
_cspol,      // css text pool
_empol = {}, // elements without id property, eg. document,window
_dirty = {}, // temporary element with id
_fragment = document.createDocumentFragment(); // node in memory
// init
if (!document.head){
document.head = document.getElementsByTagName('head')[0]||document.body;
}
/**
* 为节点设置一个唯一的标识
*
* 结构举例
* ```html
*    <div id="abc">aaaaa</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 如果有id，返回原来的id,否则返回auto-id-12345678(8位随机字符串)
*       var _id = _e._$id(_node||"abc");
*   });
* ```
*
* @method module:base/element._$id
* @param  {String|Node} arg0 - 节点标识或者对象
* @return {String}             节点标识
*/
/**
* @method CHAINABLE._$id
* @see module:base/element._$id
*/
_p._$id =
_y._$id = function(_element){
_element = _p._$get(_element);
if (!_element) return;
var _id = !!_element.id ? _element.id
: 'auto-id-'+_u._$uniqueID();
if (!('id' in _element)){
_empol[_id] = _element;
}
_element.id = _id;
// check if element can be getted
if (!_p._$get(_id)){
_dirty[_id] = _element;
}
return _id;
};
/**
* 根据标识取节点对象，包括在内存中的节点
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 先根据id从内存中取，再从页面取
*       var _node = _e._$get("abc");
*   });
* ```
*
* @method module:base/element._$get
* @param  {String|Node} arg0 - 节点标识或者对象
* @return {Node}               节点对象
*/
_p._$get = function(_element){
// for document/window
var _node = _empol[''+_element];
if (!!_node){
return _node;
}
// element is node
if (!_u._$isString(_element)&&
!_u._$isNumber(_element)){
return _element;
}
// element is id
// check node in page first
var _node = document.getElementById(_element);
if (!_node){
_node = _h.__getElementById(_fragment,_element);
}
// remove dirty element
if (!!_node){
delete _dirty[_element];
}
return _node||_dirty[_element];
};
/**
* 取节点的子节点列表
*
* 结构举例
* ```html
*   <div id="abc">
*       <p>1</p>
*       <p><span>2</span></p>
*       <p>3</p>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 取直接的3个子节点(p标签)
*       var _childs = _e._$getChildren('abc');
*
*       // 使用类名过滤，去带a或者b样式类的子节点
*       var _childs = _e._$getChildren('abc','a b');
*   });
* ```
*
* @method module:base/element._$getChildren
* @param  {String|Node} arg0 - 节点标识或者对象
* @param  {String}      arg1 - 样式标识
* @return {Array}              子节点列表
*/
/**
* @method CHAINABLE._$getChildren
* @see module:base/element._$getChildren
*/
_p._$getChildren =
_y._$getChildren = function(_element,_clazz){
_element = _p._$get(_element);
if (!_element) return null;
var _list = _h.__getChildren(_element);
if (!!_clazz){
_u._$reverseEach(
_list,function(_node,_index,_list){
if (!_p._$hasClassName(_node,_clazz)){
_list.splice(_index,1);
}
}
);
}
return _list;
};
/**
* 根据类名取节点列表
*
* 结构举例
* ```html
*   <div id="abc">
*     <p class="item">1</p>
*     <div><p class="item">2</p></div>
*     <p class="item">3</p>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 获取abc节点下样式带有"item"的节点列表,如果没有父节点，返回null
*       var _list = _e._$getByClassName('abc','item');
*   });
* ```
*
* @method module:base/element._$getByClassName
* @param  {String|Node} arg0 - 节点标识或者对象
* @param  {String}      arg1 - 类名
* @return {Array}              节点列表
*/
/**
* @method CHAINABLE._$getByClassName
* @see module:base/element._$getByClassName
*/
_p._$getByClassName =
_y._$getByClassName = function(_element,_class){
_element = _p._$get(_element);
return !_element ? null :
_h.__getElementsByClassName(
_element,_class.trim()
);
};
/**
* 根据从兄弟节点中搜索符合条件的节点
*
* 结构举例
* ```html
*   <div>
*     <p class="item" id="a1">1</p>
*     <p class="item" id="a2">2</p>
*     <p class="item" id="a3">3</p>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 取a2的后一个兄弟节点a3
*       var _node = _e._$getSibling('a2');
*
*       // 取a2的前一个兄弟节点a1
*       var _node = _e._$getSibling('a2',{backward:true});
*
*       // 过滤搜索，从a2向后搜索找id为a4的节点
*       var _node = _e._$getSibling('a2',function(_element){
*           return _element.id=='a4'
*       });
*
*       // 过滤搜索，从a2向前搜索找id为a0的节点
*       var _node = _e._$getSibling('a2',{
*           backward:true,
*           filter:function(_element){
*               return _element.id=='a0'
*           }
*       });
*   });
* ```
*
* @method   module:base/element._$getSibling
* @param    {String|Node}     arg0     - 节点标识或者对象
* @param    {Function|Object} arg1     - 如果是函数则表示过滤器，否则为配置信息
* @property {Boolean}         backward - 是否后向搜索，默认前向搜索
* @property {Function}        filter   - 节点过滤器，返回true表示需要返回的节点，找到第一个即返回
* @return   {Node}                       符合条件的节点
*/
/**
* @method CHAINABLE._$getSibling
* @see module:base/element._$getSibling
*/
_p._$getSibling =
_y._$getSibling = (function(){
var _doFilter = function(){
return !0;
};
return function(_element,_filter){
_element = _p._$get(_element);
if (!_element){
return null;
}
var _conf = {
backward:!1,
filter:_doFilter
};
if (_u._$isFunction(_filter)){
_conf.filter = _filter;
}else{
_conf = _u._$fetch(_conf,_filter);
}
var _next = _conf.backward
? _h.__previousSibling
: _h.__nextSibling;
while(_element=_next(_element)){
if (_conf.filter(_element)){
break;
}
}
return _element;
};
})();
/**
* 取节点所在的滚动容器，
* 从当前节点开始往上遍历，直到出现滚动条的节点
*
* 结构举例
* ```html
*   <div id="efg">
*     <div id="abc">123</div>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 加入efg节点出现滚动条，则这里找到的是efg节点
*       var _sbody = _e._$getScrollViewPort('abc');
*
*       // 不带任何参数取页面滚动条所在节点
*       var _sbody = _e._$getScrollViewPort();
*   });
* ```
*
* @method module:base/element._$getScrollViewPort
* @param  {String|Node} arg0 - 节点标识或者对象
* @return {Node}               视窗节点
*/
_p._$getScrollViewPort = function(_element){
_element = _p._$get(_element);
if (!!_element){
_element = _element.parentNode;
while(!!_element){
if (_element.scrollHeight>
_element.clientHeight){
break;
}
_element = _element.parentNode;
}
if (!!_element){
return _element;
}
}
var _tmp1 = document.body.scrollHeight,
_tmp2 = document.documentElement.scrollHeight;
return _tmp2>=_tmp1?document.documentElement:document.body;
};
/**
* 盒模型结构
*
* @typedef  {Object} module:base/element~BoxModel
* @property {Number} scrollTop    - 滚动垂直偏移
* @property {Number} scrollLeft   - 滚动水平偏移
* @property {Number} clientWidth  - 页面可视宽度
* @property {Number} clientHeight - 页面可视高度
* @property {Number} scrollWidth  - 页面滚动宽度
* @property {Number} scrollHeight - 页面滚动高度
*/
/**
* 取页面盒信息，返回盒信息内容：
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 返回信息见说明
*       var _box = _e._$getPageBox();
*   });
* ```
*
* @method module:base/element._$getPageBox
* @param  {Document} arg0 - 文档对象
* @return {module:base/element~BoxModel} 盒信息
*/
_p._$getPageBox = (function(){
// get min value but not zero
var _getClientBox = function(_list){
var _result = 0;
_u._$forEach(
_list,function(_size){
if (!_size) return;
if (!_result){
_result = _size;
}else{
_result = Math.min(_result,_size);
}
}
);
return _result;
};
var _farr = [
{
main:'scroll',
sub:['Top','Left'],
func:function(_key,_body0,_body1){
return Math.max(
_body0['scroll'+_key],
_body1['scroll'+_key]
);
}
},
{
main:'client',
sub:['Width','Height'],
func:function(_key,_body0,_body1){
return _getClientBox([
_body0['client'+_key],
_body0['offset'+_key],
_body1['client'+_key],
_body1['offset'+_key]
]);
}
},
{
main:'scroll',
sub:['Width','Height'],
func:function(_key,_body0,_body1,_result){
return Math.max(
_result['client'+_key],
_body0['scroll'+_key],
_body1['scroll'+_key]
);
}
}
];
return function(_document){
var _result = {},
_doc   = _document||document,
_body0 = _doc.body,
_body1 = _doc.documentElement;
_u._$forEach(
_farr,function(_item){
var _main = _item.main;
_u._$forEach(
_item.sub,function(_key){
_result[_main+_key] = _item.func(
_key,_body0,_body1,_result
);
}
);
}
);
return _result;
};
})();
/**
* 按比例将给定大小缩放至限制区域内
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 限制区域大小 100*10
*       var _limit = {width:100,height:10};
*
*       // 给定200*10的大小，由于宽度超出，缩放后为{width:100,height:5}
*       var _box = _e._$getMaxBox({width:200,height:10},_limit);
*
*       // 给定100*20的大小，由于高度超出，缩放后为{width:50,height:10}
*       var _box = _e._$getMaxBox({width:100,height:20},_limit);
*
*       // 给定 50*5，没有超出限制，返回{width:50,height:5}
*       var _box = _e._$getMaxBox({width:50,height:5},_limit);
*   });
* ```
*
* @method   module:base/element._$getMaxBox
* @param    {module:base/element~SizeModel} arg0 - 原始大小
* @param    {module:base/element~SizeModel} arg1 - 最大限制大小
* @return   {module:base/element~SizeModel}        按比例计算出的最大值信息
*/
_p._$getMaxBox = function(_org,_max){
var _result = _u._$merge({},_org),
_mrto = _max.width/_max.height,
_orto = _org.width/_org.height;
// height overflow
if (_mrto>_orto&&
_org.height>_max.height){
_result.height = _max.height;
_result.width = _result.height*_orto;
}
// width overflow
if (_mrto<_orto&&
_org.width>_max.width){
_result.width = _max.width;
_result.height = _result.width/_orto;
}
return _result;
};
/**
* 滚动到指定节点
*
* 结构举例
* ```html
*   <div id="a" style="padding:5px 0 0 10px;"></div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 滚动到页面上a这节点的位置
*       _e._$scrollTo('a');
*   });
* ```
*
* @method module:base/element._$scrollTo
* @param  {Node|String} arg0 - 节点
* @return {Void}
*/
/**
* @method CHAINABLE._$scrollTo
* @see module:base/element._$scrollTo
*/
_p._$scrollTo =
_y._$scrollTo = function(_element){
var _offset = _p._$offset(_element);
window.scrollTo(_offset.x,_offset.y);
};
/**
* 大小信息对象
* @typedef  {Object} module:base/element~SizeModel
* @property {Number} width  - 宽度
* @property {Number} height - 高度
*/
/**
* 位置信息对象
* @typedef  {Object} module:base/element~PositionModel
* @property {Number} top  - 垂直位置
* @property {Number} left - 水平位置
*/
/**
* 计算在容器中对齐时的位置信息
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 容器大小
*       var _box = {width:100,height:40};
*
*       // 默认居中对齐返回 {top:15,left:40}
*       var _pos = _e._$align(_box,{width:20,height:10});
*
*       // 左下对齐返回 {top:30,left:0}
*       var _pos = _e._$align(_box,{width:20,height:10},'left bottom');
*   });
* ```
*
* @method module:base/element._$align
* @param  {module:base/element~SizeModel} arg0 - 容器大小
* @param  {module:base/element~SizeModel} arg1 - 原始大小
* @param  {String} arg2 - 对齐方式，水平+空格+垂直，如left top，默认为 center middle，
*                         水平：left/center/right，
*                         垂直：top/middle/bottom
* @return {module:base/element~PositionModel} 位置信息
*/
_p._$align = (function(){
var _reg = /\s+/;
var _fmap = {
left:function(){
return 0;
},
center:function(_box,_org){
return (_box.width-_org.width)/2;
},
right:function(_box,_org){
return _box.width-_org.width;
},
top:function(){
return 0;
},
middle:function(_box,_org){
return (_box.height-_org.height)/2;
},
bottom:function(_box,_org){
return _box.height-_org.height;
}
};
return function(_box,_org,_align){
var _result = {},
_arr  = (_align||'').split(_reg),
_top  = _fmap[_arr[1]]||_fmap.middle,
_left = _fmap[_arr[0]]||_fmap.center;
_result.top = _top(_box,_org);
_result.left = _left(_box,_org);
return _result;
};
})();
/**
* 计算两个节点之间的偏移量
*
* 结构举例
* ```html
*   <div id="a" style="position:relative;padding:5px 0 0 10px;">
*     <span id="b">123</span>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 计算节点b到节点a(外层需要定位属性)的距离，如果没有指定节点，默认计算的根节点
*       // _result : {x:10,y:5}
*       var _result = _e._$offset('b','a');
*   });
* ```
*
* @method module:base/element._$offset
* @param  {String|Node} arg0 - 起始节点
* @param  {String|Node} arg1 - 结束节点，没有该参数则计算到根节点
* @return {Object}             偏移量，如{x:234,y:987}
*/
/**
* @method CHAINABLE._$offset
* @see module:base/element._$offset
*/
_p._$offset =
_y._$offset = (function(){
var _isRoot = function(_element){
return _element==document.body||
_element==document.documentElement;
};
return function(_from,_to){
_from = _p._$get(_from);
if (!_from){
return null;
}
_to = _p._$get(_to)||null;
var _node = _from,
_result = {x:0,y:0},
_isroot,_delta,_border;
while(!!_node&&_node!=_to){
_isroot = _isRoot(_node)||_node==_from;
_delta = _isroot?0:_node.scrollLeft;
_border = parseInt(_p._$getStyle(_node,'borderLeftWidth'))||0;
_result.x += _node.offsetLeft+_border-_delta;
_delta = _isroot?0:_node.scrollTop;
_border = parseInt(_p._$getStyle(_node,'borderTopWidth'))||0;
_result.y += _node.offsetTop+_border-_delta;
_node = _node.offsetParent;
}
return _result;
};
})();
/**
* 节点占全屏
*
* @method module:base/element._$fullScreen
* @param  {Node} arg0 - 节点
* @return {Void}
*/
/**
* @method CHAINABLE._$fullScreen
* @see module:base/element._$fullScreen
*/
_p._$fullScreen =
_y._$fullScreen = function(_element){
_element = _p._$get(_element);
if (!!_element){
_h.__fullScreen(
_element,
_p._$getPageBox()
);
}
};
/**
* 为节点增加用于盖select/flash等控件的层
*
* @method module:base/element._$mask
* @see    module:base/element._$unmask
* @param  {Node} arg0 - 节点
* @return {Node}        盖层节点
*/
/**
* @method CHAINABLE._$mask
* @see module:base/element._$mask
*/
_p._$mask =
_y._$mask = function(_element){
_element = _p._$get(_element);
if (!!_element){
_p._$id(_element);
return _h.__mask(_element);
}
return null;
};
/**
* 为节点移除用于盖select/flash等控件的层
*
* @method module:base/element._$unmask
* @see    module:base/element._$mask
* @param  {Node} arg0 - 节点
* @return {Node}        盖层节点
*/
/**
* @method CHAINABLE._$unmask
* @see module:base/element._$unmask
*/
_p._$unmask =
_y._$unmask = function(_element){
_element = _p._$get(_element);
if (!!_element){
_p._$id(_element);
return _h.__unmask(_element);
}
return null;
};
/**
* 创建节点，使用该接口创建的结构后续可通过_$get接口根据ID取到节点
*
* 结构举例
* ```javascript
*   <div id="abc">1</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 创建一个节点，挂到body上
*       _e._$create("div","m-body",document.body);
*
*       // 创建一个节点挂到id是abc的节点上
*       // 结果：<div id="abc">1<p class="m-list"></p></div>
*       _e._$create("p","m-list","abc");
*
*       // 创建一个节点放在内存中
*       var _node = _e._$create('div');
*       _node.innerHTML = '<p id="a">aaaaaa</p><p id="b">bbbbbb</p>';
*       // 后续可以通过id取id为a的节点
*       var _pa = _e._$get('a');
*   });
* ```
*
* @method module:base/element._$create
* @param  {String}      arg0 - 标签
* @param  {String}      arg1 - 样式
* @param  {String|Node} arg2 - 父节点标识或者对象
* @return {Node}               节点
*/
_p._$create = (function(){
var _map = {
a:{href:'#',hideFocus:!0},
style:{type:'text/css'},
link:{type:'text/css',rel:'stylesheet'},
iframe:{frameBorder:0},
script:{defer:!0,type:'text/javascript'}
};
return function(_tag,_class,_parent){
var _element = document.createElement(_tag),
_config = _map[_tag.toLowerCase()];
_u._$merge(_element,_config);
if (!!_class) _element.className = _class;
_parent = _p._$get(_parent);
if (!!_parent){
_parent.appendChild(_element);
}else{
// append to documentfragment for get by id
if (!_config){
_fragment.appendChild(_element);
}
}
return _element;
};
})();
/**
* 创建可交互框架
*
* 结构举例
* ```html
*   <div id="frameCnt"></div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*      var _xFrame = _e._$createXFrame({
*          src:'http://www.baidu.com',
*          name:'百度',
*          parent:'frameCnt',
*          visible:false,
*          onload:function(){
*              // 加载frame成功后，name设置成功，为百度
*              // 加载frame成功后，显示效果正确，display:none
*          }
*      });
*   });
* ```
*
* @method   module:base/element._$createXFrame
* @param    {Object}               arg0    - 可选配置参数
* @property {String}               src     - 框架地址
* @property {String}               name    - 框架名称
* @property {String|Node|Function} parent  - 父节点或者框架加入父容器的执行函数
* @property {Boolean}              visible - 是否可见
* @property {Function}             onload  - 框架载入回调
* @return {Node}                             框架节点
*/
_p._$createXFrame = (function(){
var _getFrameSrc = function(){
if (location.hostname==document.domain){
return 'about:blank';
}
return 'javascript:(function(){document.open();document.domain="'+document.domain+'";document.close();})();';
};
var _getFrameWithName = function(_name){
_name = _name.trim();
if (!_name){
return _p._$create('iframe');
}
// pass name to frame
var _iframe;
try{
_iframe = document.createElement(
'<iframe name="'+_name+'"></iframe>');
_iframe.frameBorder = 0;
}catch(e){
_iframe = _p._$create('iframe');
_iframe.name = _name;
}
return _iframe;
};
return function(_options){
_options = _options||_o;
var _iframe = _getFrameWithName(_options.name||'');
if (!_options.visible){
_iframe.style.display = 'none';
}
if (_u._$isFunction(_options.onload)){
_v._$addEvent(_iframe,'load',function(_event){
if (!_iframe.src) return;
_v._$clearEvent(_iframe,'load');
_options.onload(_event);
});
}
// will trigger onload
var _parent = _options.parent;
if (_u._$isFunction(_parent)){
try{_parent(_iframe);}catch(e){}
}else{
(_p._$get(_parent)||document.body).appendChild(_iframe);
}
// ensure trigger onload async
var _src = _options.src||_getFrameSrc();
window.setTimeout(function(){
_iframe.src = _src;
},0);
return _iframe;
};
})();
/**
* 删除节点
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 移除节点前先清理节点上的事件
*       _e._$remove('abc',false);
*       // 移除节点前不清理节点上的事件
*       _e._$remove('abc',true);
*   });
* ```
*
* @method module:base/element._$remove
* @see    module:base/element._$removeByEC
* @param  {String|Node} arg0 - 节点标识或者对象
* @param  {Boolean}     arg1 - 是否禁止事件清理
* @return {Void}
*/
/**
* @method CHAINABLE._$remove
* @see module:base/element._$remove
*/
_p._$remove =
_y._$remove = (function(){
var _fmap = {
img:function(_node){
_node.src = _g._$BLANK_IMAGE;
},
iframe:function(_node){
_node.src = 'about:blank';
}
};
var _doClear = function(_node,_tag){
if (!_tag){
var _xtag = (_node.tagName||'').toLowerCase(),
_func = _fmap[_xtag];
if (!!_func){
_func(_node);
}
return;
}
if (!!_node.getElementsByTagName){
_u._$forEach(
_node.getElementsByTagName(_tag),
_doClear
);
}
};
return function(_element){
_element = _p._$get(_element);
if (!!_element){
// clear events
if (!arguments[1]){
_v._$clearEvent(_element);
}
// clear elements
_doClear(_element);
_doClear(_element,'img');
_doClear(_element,'iframe');
// remove node
if (!!_element.parentNode){
_element.parentNode.removeChild(_element);
}
}
};
})();
/**
* 节点移至内存
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 先生成一个节点加到body下
*       var _node = _e._$create('div','js-div',document.body);
*       // 把节点移动到内存中
*       _e._$removeByEC(_node);
*       // 从body上没有取到节点,结果为[]
*       _e._$getByClassName(document.body,'js-div');
*   });
* ```
*
* @method module:base/element._$removeByEC
* @see    module:base/element._$remove
* @param  {String|Node} arg0 - 节点标识或者对象
* @return {Void}
*/
/**
* @method CHAINABLE._$removeByEC
* @see module:base/element._$removeByEC
*/
_p._$removeByEC =
_y._$removeByEC = function(_element){
_element = _p._$get(_element);
if (!!_element){
try{
_fragment.appendChild(_element);
}catch(ex){
// ignore
console.error(ex);
}
}
};
/**
* 清除所有子节点
*
* 结构举例
* ```html
*   <ul id="abc">
*     <li>aaaaaaaaaaaaa</li>
*     <li>bbbbbbbbbbbbb</li>
*     <li>ccccccccccccc</li>
*   </ul>
*
*   <table id="efg">
*     <tr><td>1111</td><td>1111</td></tr>
*     <tr><td>2222</td><td>2222</td></tr>
*     <tr><td>3333</td><td>3333</td></tr>
*   </table>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 清除ul下的子节点
*       _e._$clearChildren('abc');
*
*       // 清除table下的子节点
*       _e._$clearChildren('efg');
*   });
* ```
*
* @method module:base/element._$clearChildren
* @see    module:base/element._$remove
* @param  {String|Node} arg0 - 容器节点
* @return {Void}
*/
/**
* @method CHAINABLE._$clearChildren
* @see module:base/element._$clearChildren
*/
_p._$clearChildren =
_y._$clearChildren = function(_element){
_element = _p._$get(_element);
if (!!_element){
_u._$reverseEach(
_element.childNodes,
function(_node){
_p._$remove(_node);
}
);
}
};
/**
* 内联元素增加定位封装
*
* 结构举例
* ```html
*   <input type="text" id="abc"/>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 包装定位的span
*       _e._$wrapInline('abc');
*   });
* ```
*
* 生成结构如下
* ```html
*   <span style="position:relative;zoom:1">
*     <input type="text" id="abc"/>
*     <!-- 此api返回以下这个节点 -->
*     <span style="position:absolute;top:0;left:0;"></span>
*   </span>
* ```
*
* 应用举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 返回容器的样式名称
*       // 通过这个样式名称可以取到一个绝对定位的样式名 class+'-show'
*       var _node = _e._$wrapInline('abc',{
*           tag:'label',
*           clazz:'js-xxx'
*       });
*       // 可以在返回的节点里添加想要显示的结构
*       _node.innerHTML = '<span>aaa</span><span>aaa</span>';
*   });
* ```
*
* @method   module:base/element._$wrapInline
* @param    {String|Node}  arg0  - 内联节点
* @param    {Object}       arg1  - 绝对定位节点配置信息
* @property {String}       tag   - 标记名称，默认span
* @property {String}       nid   - 节点识别样式名，这个会被添加到样式中作为标识
* @property {String}       clazz - 样式名称
* @return   {Node}                 绝对定位的节点
*/
/**
* @method CHAINABLE._$wrapInline
* @see module:base/element._$wrapInline
*/
_p._$wrapInline =
_y._$wrapInline = (function(){
var _clazz,
_reg0 = /\s+/;
var _doInitStyle = function(){
if (!!_clazz) return;
_clazz = _p._$pushCSSText('.#<uispace>{position:relative;zoom:1;}.#<uispace>-show{position:absolute;top:0;left:100%;cursor:text;white-space:nowrap;overflow:hidden;}');
_p._$dumpCSSText();
};
return function(_element,_options){
_element = _p._$get(_element);
if (!_element){
return null;
}
// init style
_doInitStyle();
_options = _options||_o;
// check relative parent
var _parent = _element.parentNode;
if (!_p._$hasClassName(_parent,_clazz)){
// build wrapper box
_parent = _p._$create('span',_clazz);
_element.insertAdjacentElement('beforeBegin',_parent);
_parent.appendChild(_element);
}
// check absolute node
var _nid = _options.nid||'',
_node = _p._$getByClassName(
_parent,_nid||
(_clazz+'-show')
)[0];
if (!_node){
var _klass = ((_options.clazz||'')+' '+_nid).trim();
_klass = _clazz+'-show'+(!_klass?'':' ')+_klass;
_node = _p._$create(_options.tag||'span',_klass);
_parent.appendChild(_node);
}
// append class to parent node
var _klass = _options.clazz;
if (!!_klass){
_klass = (_klass||'').trim().split(_reg0)[0]+'-parent';
_p._$addClassName(_parent,_klass);
}
return _node;
};
})();
/**
* 设置或者获取指定标识的数据
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 设置值操作
*       // <div id="abc" data-img="http://a.b.com/a.png">123</div>
*       // 返回value值: http://a.b.com/a.png
*       var _src = _e._$dataset('abc','img','http://a.b.com/a.png');
*       // 取值操作
*       var _src = _e._$dataset('abc','img');
*
*       // 批量设置
*       var _map = _e._$dataset('abc',{
*           a:'aaaaa',
*           b:'bbbbbbbb',
*           c:'ccccccccc'
*       });
*
*       // 批量取值
*       // 返回：{a:'aaaaa',b:'bbbbbbbb',c:'ccccccccc'}
*       var _map = _e._$dataset('abc',['a','b','c']);
*   });
* ```
*
* @method module:base/element._$dataset
* @see    module:base/element._$attr
* @param  {String}              arg0 - 数据标识
* @param  {String|Object|Array} arg1 - 属性名
* @return {String|Object}              数据值
*/
/**
* @method CHAINABLE._$dataset
* @see module:base/element._$dataset
*/
_p._$dataset =
_y._$dataset = function(_element,_key,_value){
// check element
var _id = _p._$id(_element);
if (!_id){
return null;
}
// check single key-value
if (_u._$isString(_key)){
return _h.__dataset(
_p._$get(_element),
_key,_value
);
}
// check map set
// ignore argument _value
if (_u._$isObject(_key)){
var _ret = {};
_u._$forIn(_key,function(_v,_k){
_ret[_k] = _p._$dataset(_id,_k,_v);
});
return _ret;
}
// check array get
// ignore argument _value
if (_u._$isArray(_key)){
var _ret = {};
_u._$forEach(_key,function(_k){
_ret[_k] = _p._$dataset(_id,_k);
});
return _ret;
}
return null;
};
/**
* 取某个节点的属性值
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 设置成 <div id="abc" data-img="http://a.b.com/a.png">123</div>
*       // 返回value值: http://a.b.com/a.png
*       var _src = _e._$attr('abc','data-img','http://a.b.com/a.png');
*
*       // 如果设置了img的值返回data-img，否则放回空字符串
*       var _src = _e._$attr('abc','data-img');
*   });
* ```
*
* @method module:base/element._$attr
* @see    module:base/element._$dataset
* @param  {String|Node} arg0 - 节点标识或者对象
* @param  {String}      arg1 - 属性名称
* @param  {String}      arg2 - 属性值，如果没有设置此参数则表示取值
* @return {String}             属性值
*/
/**
* @method CHAINABLE._$attr
* @see module:base/element._$attr
*/
_p._$attr =
_y._$attr = function(_element,_name,_value){
_element = _p._$get(_element);
if (!_element){
return '';
}
if (_value!==undefined&&!!_element.setAttribute){
_element.setAttribute(_name,_value);
}
return _h.__getAttribute(_element,_name);
};
/**
* html代码转节点对象，
* 如果转换出来的节点数量超过[包含]2个，
* 则最外面增加一个容器节点，即返回的始终是一个节点
*
* 结构举例
* ```html
*   <div id="abc">
*     <span>123</span>
*   </div>
* ```
*
* 代码举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       var _node = _e._$html2node('<div>1</div><div><span>2</span></div>');
*   });
* ```
*
* 返回结果
* ```html
*   <div> <!-- 返回此节点 -->
*     <div>1</div>
*     <div><span>2</span></div>
*   </div>
* ```
*
* @method module:base/element._$html2node
* @param  {String} arg0 - 代码
* @return {Node}          节点
*/
_p._$html2node = (function(){
var _reg = /<(.*?)(?=\s|>)/i, // first tag name
_tmap = {li:'ul',tr:'tbody',td:'tr',th:'tr',option:'select'};
return function(_html){
var _tag;
if (_reg.test(_html)){
_tag = _tmap[(RegExp.$1||'').toLowerCase()]||'';
}
var _div = _p._$create(_tag||'div');
_div.innerHTML = _html;
var _list = _p._$getChildren(_div);
return _list.length>1?_div:_list[0];
};
})();
/**
* 将dom节点转为xml串
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_p){
*       // 生成<div id="abc">123</div>字符串
*       var _xml = _p._$dom2xml('abc'));
*   });
* ```
*
* @see    module:base/element._$xml2dom
* @method module:base/element._$dom2xml
* @param  {String|Node} arg0 - 节点
* @return {String}             XML代码
*/
/**
* @method CHAINABLE._$dom2xml
* @see module:base/element._$dom2xml
*/
_p._$dom2xml =
_y._$dom2xml = function(_element){
_element = _p._$get(_element);
return !_element?'':_h.__serializeDOM2XML(_element);
};
/**
* 将xml转为dom节点
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 生成<div id="abc">123</div>节点
*       var _node = _e._$xml2dom('<div id="abc">123</div>');
*   });
* ```
*
* @method module:base/element._$xml2dom
* @see    module:base/element._$dom2xml
* @param  {String} arg0 - xml文本
* @return {Node}          DOM节点
*/
_p._$xml2dom = function(_xml){
_xml = (_xml||'').trim();
return !_xml?null:_h.__parseDOMFromXML(_xml);
};
/**
* dom节点转对象，多用于XML DOM转数据对象
*
* 结构举例
* ```html
*   <div id="abc">123</div>
*
*   <div id="efg">
*     <p>aaaa</p>
*     <span>bbbb</span>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_p){
*       // 返回对象{div:'123'}
*       var _obj = _p._$dom2object('abc');
*
*       // 返回对象{div:{p:'aaaa',span:'bbbb'}}
*       var _obj = _p._$dom2object('efg');
*   });
* ```
*
* @method module:base/element._$dom2object
* @see    module:base/element._$xml2object
* @param  {String|Node} arg0 - 节点
* @return {Object}             转换完成的对象
*/
/**
* @method CHAINABLE._$dom2object
* @see module:base/element._$dom2object
*/
_p._$dom2object =
_y._$dom2object = function(_dom,_obj){
_obj = _obj||{};
_dom = _p._$get(_dom);
if (!_dom) return _obj;
var _name = _dom.tagName.toLowerCase(),
_list = _p._$getChildren(_dom);
if (!_list||!_list.length){
_obj[_name] = _dom.textContent||_dom.text||'';
return _obj;
}
var _tmp = {};
_obj[_name] = _tmp;
_u._$forEach(
_list,function(_node){
_p._$dom2object(_node,_tmp);
}
);
return _obj;
};
/**
* XML转对象
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 返回 {user:{id:'1',username:'aaa',password:'123456'}}
*       var _obj = _e._$xml2object('\
*           <?xml version="1.0" encoding="utf-8" ?>\
*           <user>\
*             <id>1</id>\
*             <username>aaa</username>\
*             <password>123456</password>\
*           </user>\
*       ');
*   });
* ```
*
* @method module:base/element._$xml2object
* @see    module:base/element._$dom2object
* @param  {String} arg0 - xml代码
* @return {Object}        对象
*/
_p._$xml2object = function(_xml){
try{
return _p._$dom2object(_p._$xml2dom(_xml));
}catch(ex){
return null;
}
};
/**
* 文本转指定类型的数据
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 转成dom节点
*       var _dom = _e._$text2type('<div id="abc">123</div>',"xml");
*       // 转成json字符串
*       var _json = _e._$text2type('{"a":"aaaaaaaaaaaaa"}',"json");
*       // 原样返回
*       var _text = _e._$text2type('<div id="abc">123</div>');
*   });
* ```
*
* @method module:base/element._$text2type
* @param  {String} arg0 - 文本内容
* @param  {String} arg1 - 类型，如xml/json/text
* @return {Variable}      指定类型的数据
*/
_p._$text2type = (function(){
var _fmap = {
xml:function(_text){
return _p._$xml2dom(_text);
},
json:function(_text){
try{
return JSON.parse(_text);
}catch(ex){
return null;
}
},
dft:function(_text){
return _text;
}
};
return function(_text,_type){
_type = (_type||'').toLowerCase();
return (_fmap[_type]||_fmap.dft)(_text||'');
};
})();
/**
* 批量设置节点样式
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       _e._$style('abc',{color:'red',width:'100px'});
*   });
* ```
*
* 输出结果
* ```html
*   <div id="abc" style="color:red;width:100px;">123</div>
* ```
*
* @method module:base/element._$style
* @see    module:base/element._$setStyle
* @param  {String|Node} arg0 - 节点
* @param  {Object}      arg1 - 样式信息{color:'red',width:'100px'}
* @return {Void}
*/
/**
* @method CHAINABLE._$style
* @see module:base/element._$style
*/
_p._$style =
_y._$style = function(_element,_map){
_element = _p._$get(_element);
if (!!_element){
_u._$loop(_map,function(_value,_name){
_p._$setStyle(_element,_name,_value);
});
}
};
/**
* 设置单个样式
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       _e._$setStyle('abc','color','red');
*   });
* ```
*
* 输出结果
* ```html
*   <div id="abc" style="color:red;">123</div>
* ```
*
* @method module:base/element._$setStyle
* @see    module:base/element._$getStyle
* @param  {String|Node} arg0 - 节点
* @param  {String}      arg1 - 样式名称
* @param  {String}      arg2 - 样式值
* @return {Void}
*/
/**
* @method CHAINABLE._$setStyle
* @see module:base/element._$setStyle
*/
_p._$setStyle =
_y._$setStyle = function(_element,_name,_value){
_element = _p._$get(_element);
if (!!_element){
_h.__setStyleValue(
_element,_name,
_h.__processCSSText(_value)
);
}
};
/**
* 取样式值
*
* 结构举例
* ```html
*   <div id="abc" style="color:red;">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 返回节点的颜色值red（高版本浏览器返回rgb值），如果没有返回空字符串
*       var _value = _e._$getStyle('abc','color');
*   });
* ```
*
* @method module:base/element._$getStyle
* @see    module:base/element._$setStyle
* @param  {String|Node} arg0 - 节点
* @param  {String}      arg1 - 样式名称
* @return {String}             样式值
*/
/**
* @method CHAINABLE._$getStyle
* @see module:base/element._$getStyle
*/
_p._$getStyle =
_y._$getStyle = function(_element,_name){
_element = _p._$get(_element);
return !_element ? '' :
_h.__getStyleValue(
_element,_name
);
};
/**
* 页面注入脚本
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 注入脚本，全局执行环境
*       _e._$addScript('\
*           document.getElementById("abc").style.color = "green"\
*       ');
*   });
* ```
*
* 输出结果
* ```html
*   <div id="abc" style="color:green;">123</div>
* ```
*
* @method module:base/element._$addScript
* @param  {String} arg0 - 脚本内容
* @return {Void}
*/
_p._$addScript = function(_script){
try{
_script = _script.trim();
if (!!_script){
return (new Function(_script))();
}
}catch(ex){
// ignore
console.error(ex.message);
console.error(ex.stack);
}
};
/**
* 注入页面内联样式，
* 样式支持前缀标记$&lt;vendor&gt; ，
* 如下样式值支持3D/2D切换，优先选用3D，格式：$&lt;NAME|VALUE&gt;
*
* * NAME支持：scale/rotate/translate/matrix
* * VALUE格式：x=1&y=2&z=3&a=30
*
*
* 范例如$&lt;scale|a=30&gt;，各名称支持的参数列表
*
* | 名称              | 参数 |
* | :--        | :-- |
* | scale      | x,y,z |
* | rotate     | x,y,z,a |
* | translate  | x,y,z |
* | matrix     | m11,m12,m13,m14,m21,m22,m23,m24,m31,m32,m33,m34,m41,m42,m43,m44 |
*
*
* 结构举例
* ```html
*   <html>
*    <head>
*        <title>test</title>
*    </head>
*   </html>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 注入样式
*       _e._$addStyle('body{font-size:20px}');
*
*       // 注入样式支持变量
*       _e._$addStyle('\
*           .a{$<vendor>transform-origin:0 0;}\
*           .b{$<vendor>transform:$<translate|x=0&y=1&z=1>}\
*       ');
*   });
* ```
*
* 输出结果
* ```html
*   <html>
*    <head>
*        <title>test</title>
*        <style>body{font-size:20px;}</style>
*        <style>
*           .a{-webkit-transform-origin:0 0;}\
*           .b{-webkit-transform:translate3d(0,1,1);}\
*        </style>
*    </head>
*   </html>
* ```
*
* @method module:base/element._$addStyle
* @param  {String} arg0 - 样式内容
* @return {Node}          样式节点
*/
_p._$addStyle = (function(){
var _reg = /[\s\r\n]+/gi;
return function(_css){
_css = (_css||'').replace(_reg,' ').trim();
var _node = null;
if (!!_css){
_node = _p._$create('style');
document.head.appendChild(_node);
_h.__injectCSSText(
_node,_h.__processCSSText(_css)
);
}
return _node;
};
})();
/**
* 缓存待激活样式
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 设置样式到缓存中，自动生成样式名，返回自动生成的类名#<class>
*       var _class = _e._$pushCSSText('.#<uispace>{width:300px;}');
*
*       // 把缓存中的样式内联到页面
*       _e._$dumpCSSText();
*   });
* ```
*
* @method module:base/element._$pushCSSText
* @see    module:base/element._$dumpCSSText
* @param  {String} arg0 - 样式
* @return {String}        样式标识
*/
_p._$pushCSSText = (function(){
var _reg = /#<(.*?)>/g,
_seed = +new Date;
return function(_css,_data){
if (!_cspol){
_cspol = [];
}
var _class = 'auto-'+_u._$uniqueID(),
_dmap = _u._$merge({uispace:_class},_data);
_cspol.push(
_css.replace(_reg,function($1,$2){
return _dmap[$2]||$1;
})
);
return _class;
};
})();
/**
* 激活缓存中的样式
*
* 结构举例
* ```html
*   <div id="abc" class="item">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 设置样式.item{width:300px;}到缓存中
*       _e._$pushCSSText('.item{width:300px;}');
*
*       // 把缓存中的样式内联到页面
*       _e._$dumpCSSText();
*   });
* ```
*
* @method module:base/element._$dumpCSSText
* @see    module:base/element._$pushCSSText
* @return {Void}
*/
_p._$dumpCSSText = function(){
if (!!_cspol){
_p._$addStyle(_cspol.join(' '));
_cspol = null;
}
};
/**
* 追加CSS规则
*
* 结构举例
* ```html
*   <style id="abc"></style>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 设置样式.item{width:300px;}到缓存中
*       _e._$appendCSSText('node-id','.item{width:300px;}');
*   });
* ```
*
* @method module:base/element._$appendCSSText
* @see    module:base/element._$addStyle
* @param  {Node}   arg0 - 样式节点
* @param  {String} arg1 - 单条样式规则
* @return {CSSRule}       样式规则对象
*/
/**
* @method CHAINABLE._$appendCSSText
* @see module:base/element._$appendCSSText
*/
_p._$appendCSSText =
_y._$appendCSSText = function(_element,_css){
_element = _p._$get(_element);
return !_element ? null :
_h.__appendCSSText(
_element,
_h.__processCSSText(_css)
);
};
/**
* 新增样式类，多个样式用空格分开
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 添加样式 fc01 fc03
*       _e._$addClassName('abc','fc01 fc03');
*   });
* ```
*
* 输出结果
* ```html
*   <div id="abc" class="fc01 fc03">123</div>
* ```
*
* @method module:base/element._$addClassName
* @see    module:base/element._$delClassName
* @see    module:base/element._$replaceClassName
* @param  {String|Node} arg0 - 要操作的节点标识或者节点对象
* @param  {String}      arg1 - 要新增的样式类名称
* @return {Void}
*/
/**
* @method CHAINABLE._$addClassName
* @see module:base/element._$addClassName
*/
_p._$addClassName =
_y._$addClassName = function(_element,_class){
_element = _p._$get(_element);
if (!!_element){
_h.__processClassName(
_element,'add',_class
);
}
};
/**
* 删除样式类，多个样式用空格分开
*
* 结构举例
* ```html
*   <div id="abc" class="fc01 fc03">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 删除fc02 fc03样式名
*       _e._$delClassName('abc','fc02 fc03');
*   });
* ```
*
* 输出结果
* ```html
*   <div id="abc" class="fc01">123</div>
* ```
*
* @method module:base/element._$delClassName
* @see    module:base/element._$addClassName
* @see    module:base/element._$replaceClassName
* @param  {String|Node} arg0 - 要操作的节点标识或者节点对象
* @param  {String}      arg1 - 要删除的样式类名称
* @return {Void}
*/
/**
* @method CHAINABLE._$delClassName
* @see module:base/element._$delClassName
*/
_p._$delClassName =
_y._$delClassName = function(_element,_class){
_element = _p._$get(_element);
if (!!_element){
_h.__processClassName(
_element,'remove',_class
);
}
};
/**
* 替换节点的样式类名称，多个样式用空格分隔，
* 操作过程为先删除待删样式，再添加待添样式，因此不需要删除样式存在才添加样式
*
* 结构举例
* ```html
*   <div id="abc" class="fc01 fc03">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 替换fc02为fc05
*       // 这里不需要fc02存在
*       _e._$replaceClassName('abc','fc02','fc05');
*   });
* ```
*
* 输出结果
* ```html
*   <div id="abc" class="fc01 fc03 fc05">123</div>
* ```
*
* @method module:base/element._$replaceClassName
* @see    module:base/element._$addClassName
* @see    module:base/element._$delClassName
* @param  {String|Node} arg0 - 要操作的节点标识或者节点对象
* @param  {String}      arg1 - 要删除的样式类名称
* @param  {String}      arg2 - 要新增的样式类名称
* @return {Void}
*/
/**
* @method CHAINABLE._$replaceClassName
* @see module:base/element._$replaceClassName
*/
_p._$replaceClassName =
_y._$replaceClassName = function(_element,_del,_add){
_element = _p._$get(_element);
if (!!_element){
_h.__processClassName(
_element,'replace',
_del,_add
);
}
};
/**
* 检测节点是否包含指定样式，多个样式用空格分隔，检测时包含其中之一即表示包含
*
* 结构举例
* ```html
*   <div id="abc" class="fc01 fc03">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 如果有fc01样式返回true，否则返回false
*       _e._$hasClassName('abc',"fc01");
*   });
* ```
*
* @method module:base/element._$hasClassName
* @param  {String|Node} arg0 - 节点标识或者对象
* @param  {String}      arg1 - 样式串
* @return {Boolean}            是否含指定样式
*/
/**
* @method CHAINABLE._$hasClassName
* @see module:base/element._$hasClassName
*/
_p._$hasClassName =
_y._$hasClassName = function(_element,_class){
_element = _p._$get(_element);
if (!!_element){
return _h.__hasClassName(_element,_class);
}
return !1;
};
/**
* 取样式变换矩阵对象
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 生成下面矩阵的对象
*       // |a:1,b:0,c:0,d:1,e:0:f:0|
*       // |m11:1,m12:0,m13:0,m14:0|
*       // |m21:0,m22:1,m23:0,m24:0|
*       // |m31:0,m32:0,m33:1,m34:0|
*       // |m41:0,m42:0,m43:0,m44:1|
*       var _matrix = _e._$matrix("matrix(1,0,0,1,0,0)");
*   });
* ```
*
* @method module:base/element._$matrix
* @param  {String} arg0 - 变化信息
* @return {CSSMatrix}     变换矩阵对象
*/
_p._$matrix = function(_matrix){
_matrix = (_matrix||'').trim();
return _h.__getCSSMatrix(_matrix);
};
/**
* 设置3D变换，对于不支持3D的系统自动切换为2D变换
*
* 结构举例
* ```html
*   <div id="abc"></div>
* ```
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/element'
*   ],function(_e){
*       // 进行css3d变换，对应css样式为-webkit-transform:rotate3d( 2, 1, 1, -75deg);
*       _e._$css3d('abc','rotate',{x:2,y:1,z:1,a:'-75deg'});
*   });
* ```
*
* @method module:base/element._$css3d
* @see    module:base/element._$addStyle
* @param  {String|Node} arg0 - 节点标识或者对象
* @param  {String}      arg1 - 变换类型，matrix/translate/scale/rotate
* @param  {Object}      arg2 - 变换���，{x:1,y:2,z:3,a:'30deg'}
* @return {Void}
*/
/**
* @method CHAINABLE._$css3d
* @see module:base/element._$css3d
*/
_p._$css3d =
_y._$css3d = function(_element,_name,_map){
_element = _p._$get(_element);
if (!!_element){
var _value = _h.__processTransformValue(_name,_map);
if (!!_value){
_p._$setStyle(_element,'transform',_value);
}
}
};
// for chainable
_x._$merge(_y);
if (CMPT){
NEJ.copy(NEJ.P('nej.e'),_p);
}
return _p;
},7,13,2,3,11,14);
I$(19,function (_u,_m,_p,_o,_f,_r){
/**
* 验证事件信息
* @param  {Node}     节点
* @param  {String}   事件类型
* @param  {Function} 处理函数
* @return {Object}   验证后事件信息 type/handler
*/
_p.__checkEvent = (function(){
// need change event name
var _tmap = {
touchstart:'mousedown',
touchmove:'mousemove',
touchend:'mouseup'
},
// need prefix
_pfix = _m._$KERNEL.prefix,
_emap = {
transitionend:'TransitionEnd',
animationend:'AnimationEnd',
animationstart:'AnimationStart',
animationiteration:'AnimationIteration',
visibilitychange:'visibilitychange'
};
var _fmap = {
enter:function(_element,_type,_handler){
var _result = {
type:'keypress'
};
if (!!_handler){
_result.handler = function(_event){
if (_event.keyCode===13){
_handler.call(_element,_event);
}
};
}
return _result;
}
};
var _doPrefix = function(_name){
return (_pfix.evt||_pfix.pro)+_name;
};
return function(_element,_type,_handler){
var _result = {
type:_type,
handler:_handler
};
if (!(('on'+_type) in _element)){
// check name convert
var _name = _tmap[_type];
if (!!_name){
_result.type = _name;
return _result;
}
// check prefix complete
var _name = _emap[_type];
if (!!_name){
_result.type = _doPrefix(_name);
return _result;
}
// check event update
var _func = _fmap[_type];
if (!!_func){
return _func.apply(null,arguments);
}
}
return _result;
};
})();
/**
* 添加事件
* @param  {Node}     节点
* @param  {String}   事件
* @param  {Function} 处理函数
* @param  {Boolean}  是否捕捉阶段
* @return {Void}
*/
_p.__addEvent = function(){
var _args = arguments;
if (DEBUG){
if (!(('on'+_args[1]) in _args[0])){
console.log('not support event['+_args[1]+'] for '+_args[0]);
}
}
_args[0].addEventListener(
_args[1],_args[2],_args[3]
);
};
/**
* 删除事件
* @param  {Node}     节点
* @param  {String}   事件
* @param  {Function} 处理函数
* @param  {Boolean}  是否捕捉阶段
* @return {Void}
*/
_p.__delEvent = function(){
var _args = arguments;
_args[0].removeEventListener(
_args[1],_args[2],_args[3]
);
};
/**
* 触发对象的某个事件
* @param  {String|Node} 节点ID或者对象
* @param  {String}      鼠标事件类型
* @return {Void}
*/
_p.__dispatchEvent = function(_element,_type,_options){
var _event = document.createEvent('Event');
_event.initEvent(_type,!0,!0);
_u._$merge(_event,_options);
_element.dispatchEvent(_event);
};
return _p;
},2,10);
I$(12,function(_h,_u,_p_,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[2])._$KERNEL;if (_k_.engine=='trident'&&_k_.release>='6.0'){(function (){
/**
* 验证事件信息
* @param  {Node}     节点
* @param  {String}   事件类型
* @param  {Function} 处理函数
* @return {Object}   验证后事件信息 type/handler
*/
_h.__checkEvent = (function(){
var _emap = {
touchcancel:'MSPointerCancel',
touchstart:'MSPointerDown',
touchmove:'MSPointerMove',
touchend:'MSPointerUp'
};
return _h.__checkEvent._$aop(function(_event){
var _args = _event.args;
// check event convert
var _name = _emap[_args[1]];
if (!!_name){
_event.stopped = !0;
_event.value = {
type:_name,
handler:_args[2]
};
}
});
})();
})();}
if (_k_.engine=='trident'&&_k_.release=='5.0'){(function (){
/**
* 验证事件信息
* @param  {Node}     节点
* @param  {String}   事件类型
* @param  {Function} 处理函数
* @return {Object}   验证后事件信息 type/handler
*/
_h.__checkEvent = (function(){
var _vmap = {};
var _fmap = {
input:function(_element,_type,_handler){
// for check type only
if (!_handler){
return {type:_type};
}
// fix input backspace/delete/ctrl+x bug
return {
type:_type,
handler:function(_event){
var _id = _element.id;
_vmap[_id] = _element.value;
_handler.call(_element,_event);
},
link:[[
document,'selectionchange',
function(_event){
var _id = _element.id;
if (_element!=document.activeElement){
delete _vmap[_id];
return;
}
if (_vmap[_id]!==_element.value){
_vmap[_id] = _element.value;
_handler.call(_element,_event);
}
}
]]
};
}
};
return _h.__checkEvent._$aop(function(_event){
var _args = _event.args;
// check event update
var _func = _fmap[_args[1]];
if (!!_func){
_event.stopped = !0;
_event.value = _func.apply(null,_args);
}
});
})();
})();}
if (_k_.engine=='trident'&&_k_.release>='5.0'){(function (){
// must use attach/detach for event
var _attached = {
'propertychange':1
};
/**
* 添加事件
* @param  {Node}     节点
* @param  {String}   事件
* @param  {Function} 处理函数
* @param  {Boolean}  是否捕捉阶段
* @return {Void}
*/
_h.__addEvent =
_h.__addEvent._$aop(function(_event){
var _args = _event.args;
if (_attached[_args[1]]!=null&&!!_args[0].attachEvent){
_event.stopped = !0;
_args[0].attachEvent('on'+_args[1],_args[2]);
}
});
/**
* 删除事件
* @param  {Node}     节点
* @param  {String}   事件
* @param  {Function} 处理函数
* @param  {Boolean}  是否捕捉阶段
* @return {Void}
*/
_h.__delEvent =
_h.__delEvent._$aop(function(_event){
var _args = _event.args,
_alias = _attached[_args[1]];
if (_attached[_args[1]]!=null&&!!_args[0].detachEvent){
_event.stopped = !0;
_args[0].detachEvent('on'+_args[1],_args[2]);
}
});
})();}
if (_k_.engine=='trident'&&_k_.release<='4.0'){(function (){
/**
* 验证事件信息
* @param  {Node}     节点
* @param  {String}   事件类型
* @param  {Function} 处理函数
* @return {Object}   验证后事件信息 type/handler
*/
_h.__checkEvent = (function(){
var _lmap = {};
var _fmap = {
input:function(_element,_type,_handler){
var _result = {
type:'propertychange'
};
if (!!_handler){
_result.handler = function(_event){
// for input.value or textarea.value
if (('value' in _element)&&
_event.propertyName=='value'){
var _id = _element.id;
// lock cycle trigger
if (!!_lmap[_id]){
return;
}
_lmap[_id] = !0;
_handler.call(_element,_event);
delete _lmap[_id];
}
};
}
return _result;
},
load:function(_element,_type,_handler){
var _result = {
type:'readystatechange'
};
if (!!_handler){
_result.handler = function(_event){
if (_element.readyState=='loaded'||
_element.readyState=='complete'){
_handler.call(_element,_event);
}
};
}
return _result;
}
};
return _h.__checkEvent._$aop(function(_event){
var _args = _event.args;
// check event update
var _func = _fmap[_args[1]];
if (!!_func){
_event.stopped = !0;
_event.value = _func.apply(null,_args);
}
// use element for this in handler
if (!!_args[2]){
_args[2] = _args[2]._$bind(_args[0]);
}
});
})();
/**
* 添加事件
* @param  {Node}     节点
* @param  {String}   事件
* @param  {Function} 处理函数
* @param  {Boolean}  是否捕捉阶段
* @return {Void}
*/
_h.__addEvent = function(){
var _args = arguments;
if (DEBUG){
if (!(('on'+_args[1]) in _args[0])){
console.log('not support event['+_args[1]+'] for '+_args[0]);
}
}
_args[0].attachEvent('on'+_args[1],_args[2]);
};
/**
* 删除事件
* @param  {Node}     节点
* @param  {String}   事件
* @param  {Function} 处理函数
* @param  {Boolean}  是否捕捉阶段
* @return {Void}
*/
_h.__delEvent = function(){
var _args = arguments;
_args[0].detachEvent('on'+_args[1],_args[2]);
};
/**
* 触发对象的某个事件
* @param  {String|Node} 节点ID或者对象
* @param  {String}      鼠标事件类型
* @return {Void}
*/
_h.__dispatchEvent = (function(){
var _omap = {
propertychange:{propertyName:'value'}
};
return function(_element,_type,_options){
var _event = document.createEventObject();
try{
_u._$merge(_event,_omap[_type],_options);
_element.fireEvent('on'+_type,_event);
}catch(ex){
// ignore unrecognized event name
console.error(ex.message);
console.error(ex.stack);
}
};
})();
})();}
if (_k_.engine=='gecko'){(function (){
/**
* 验证事件信息
* @param  {Node}     节点
* @param  {String}   事件类型
* @param  {Function} 处理函数
* @return {Object}   验证后事件信息 type/handler
*/
_h.__checkEvent = (function(){
var _nreg = /^(?:transitionend|animationend|animationstart|animationiteration)$/i;
var _fmap = {
mousewheel:function(_element,_type,_handler){
var _result = {
type:'MozMousePixelScroll'
};
if (!!_handler){
_result.handler = function(_event){
var _delta = _event.detail;
_event.wheelDelta = -_delta;
_event.wheelDeltaY = -_delta;
_event.wheelDeltaX = 0;
_handler.call(_element,_event);
};
}
return _result;
}
};
return _h.__checkEvent._$aop(function(_event){
var _args = _event.args;
// check animation event
if (_nreg.test(_args[1])){
_event.stopped = !0;
_event.value = {
type:_args[1],
handler:_args[2]
};
}
// check event update
var _func = _fmap[_args[1]];
if (!!_func){
_event.stopped = !0;
_event.value = _func.apply(null,_args);
}
});
})();
})();};return _h;
},19,2,10);
I$(3,function (NEJ,_e,_u,_x,_h,_p,_o,_f,_r){
// {id:{type:[{type:'click',func:function,sfun:function,capt:true},...]}}
// id   - element id
// type - event name, no on prefix
// func - event after wrapper
// capt - capture flag
// sfun - event before wrapper
// link - events link to this event [[element,type,handler,capture],...]
var _xcache = {},
_y = {}; // chainable methods
/*
* 取事件类型列表
* @param  {String} 事件类型
* @return {Array}  事件列表
*/
var _getTypeList = (function(){
var _reg = /[\s,;]+/;
return function(_type){
var _type = (_type||'').trim().toLowerCase();
return !_type?null:_type.split(_reg);
};
})();
/*
* 取鼠标相对于BODY的偏移
* @param  {Event}  事件对象
* @param  {String} 类型，X/Y
* @param  {String} 滚动偏移名称，Left/Top
* @return {Void}
*/
var _getClientOffset = function(_event,_type,_name){
var _key1 = 'page'+_type;
return _event[_key1]!=null?_event[_key1]:(
_event['client'+_type]+
_e._$getPageBox()['scroll'+_name]
);
};
/*
* 取鼠标相对于页面的偏移
* @param  {Event}  事件对象
* @param  {String} 类型，X/Y
* @param  {String} 滚动偏移名称，Left/Top
* @return {Void}
*/
var _getPageOffset = function(_event,_type,_name){
var _key3 = 'scroll'+_name;
_node = _p._$getElement(_event),
_xret = _getClientOffset(_event,_type,_name);
while(!!_node&&
_node!=document.body&&
_node!=document.documentElement){
_xret += _node[_key3]||0;
_node = _node.parentNode;
}
return _xret;
};
/*
* 格式化添加删除事件接口参数
* @param  {String|Node} 节点ID或者对象
* @param  {String}      事件类型，不带on前缀，不区分大小写，多个事件用空格分隔
* @param  {Function}    事件处理函数
* @param  {Boolean}     是否捕获阶段事件，IE低版本浏览器忽略此参数
* return  {Object}      格式化后参数
*/
var _doFormatArgs = function(_element,_type,_handler,_capture){
var _result = {};
// check element
_element = _e._$get(_element);
if (!_element){
return null;
}
_e._$id(_element);
_result.element = _element;
// check event handler
if (!_u._$isFunction(_handler)){
return null;
}
_result.handler = _handler;
// check type
var _type = _getTypeList(_type);
if (!_type){
return null;
}
// save info
_result.type = _type;
_result.capture = !!_capture;
return _result;
};
/**
* 节点添加事件，
* 支持添加自定义事件，
* 对于自定义事件的实现逻辑由其他模块负责实现
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 添加系统预定义事件
*       _v._$addEvent(
*           'abc','mouseover',function(_event){
*               // TODO something
*           },false
*       );
*
*       // 添加自定义事件，回车事件
*       _v._$addEvent(
*           'abc','enter',function(_event){
*               // TODO something
*           },false
*       );
*
*       // 添加多个事件，用空格分隔
*       _v._$addEvent(
*           'abc','mouseover click mousedown',
*           function(_event){
*               // TODO something
*           },false
*       );
*   });
* ```
*
* 带自定义事件的类构造或者对象
* ```javascript
* NEJ.define([
*     'base/klass',
*     'base/event',
*     'util/event',
*     'util/event/event'
* ],function(_k,_v,_t0,_t1,_p){
*     // 定义类
*     _p._$$Klass = _k._$klass();
*     var _pro = _p._$$Klass._$extend(_t0._$$EventTarget);
*
*     // TODO
*
*     // 添加自定义事件支持
*     // 对节点的事件同样支持此自定义事件
*     _t1._$$CustomEvent._$allocate({
*         element:_p._$$Klass,
*         event:['ok','fail']
*     });
*
*     // 使用事件接口添加/删除/调度事件
*     var _handler = function(_event){
*         // TODO
*     };
*     _v._$addEvent(_p._$$Klass,'ok',_handler);
*     _v._$delEvent(_p._$$Klass,'ok',_handler);
* });
* ```
*
* @method module:base/event._$addEvent
* @see    module:base/event._$delEvent
* @param  {String|Node|Object} arg0 - 节点或者类构造或者对象
* @param  {String}      arg1 - 事件类型，不带on前缀，不区分大小写，多个事件用空格分隔
* @param  {Function}    arg2 - 事件处理函数
* @param  {Boolean}     arg3 - 是否捕获阶段事件，IE低版本浏览器忽略此参数
* @return {Void}
*/
/**
* @method CHAINABLE._$addEvent
* @see module:base/event._$addEvent
*/
_p._$addEvent =
_y._$addEvent = (function(){
// cache event
// type/handler/link
var _doCacheEvent = function(_type,_source,_real){
var _id = _e._$id(_source.element),
_cch_id = _xcache[_id]||{},
_cch_tp = _cch_id[_type]||[];
_cch_tp.push({
type:_real.type||_type,
func:_real.handler||_source.handler,
sfun:_source.handler,
capt:_source.capture,
link:_real.link
});
_cch_id[_type] = _cch_tp;
_xcache[_id] = _cch_id;
};
return function(){
var _args = _doFormatArgs.apply(null,arguments);
if (!_args) return;
_u._$forEach(
_args.type,function(_name){
var _argc = _h.__checkEvent(
_args.element,
_name,_args.handler
);
// add event
_h.__addEvent(
_args.element,_argc.type,
_argc.handler,_args.capture
);
// add event link
_u._$forIn(
_argc.link,function(_item){
_item[3] = !!_item[3];
_h.__addEvent.apply(_h,_item);
_item[0] = _e._$id(_item[0]);
}
);
// cache event
_doCacheEvent(_name,_args,_argc);
}
);
};
})();
/**
* 节点删除事件，输入参数必须保证与添加接口_$addEvent输入参数完全一致
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 事件回调业务逻辑
*       var _doCallback = function(_event){
*           // TODO something
*           alert('0');
*       };
*
*       // 添加事件
*       _v._$addEvent('abc','mouseover',_doCallback,false);
*       // 删除事件，这里参数必须保持完全一致
*       _v._$delEvent('abc','mouseover',_doCallback,false);
*
*       // 比如以下方式虽然回调的业务逻辑一致，但是无法删除之前添加的事件
*       _v._$delEvent(
*           'abc',"mouseover",function(_event){
*               // TODO something
*               alert('0');
*           },false
*       );
*
*       // 删除多个事件
*       _v._$delEvent(
*           'abc','mouseover click mouseup',
*           _doCallback,false
*       );
*   });
* ```
*
* @method module:base/event._$delEvent
* @see    module:base/event._$addEvent
* @param  {String|Node} arg0 - 节点ID或者对象
* @param  {String}      arg1 - 事件类型，不带on前缀，不区分大小写，多个事件用空格分隔
* @param  {Function}    arg2 - 事件处理函数
* @param  {Boolean}     arg3 - 是否捕获阶段事件
* @return {Void}
*/
/**
* @method CHAINABLE._$delEvent
* @see module:base/event._$delEvent
*/
_p._$delEvent =
_y._$delEvent = (function(){
var _unCacheEvent = function(_type,_conf){
var _id = _e._$id(_conf.element),
_cch_id = _xcache[_id]||_o,
_cch_tp = _cch_id[_type],
_index = _u._$indexOf(
_cch_tp,function(_item){
// check handler and capture
return _item.sfun===_conf.handler&&
_item.capt===_conf.capture;
}
);
// check result
var _result = null;
if (_index>=0){
var _item = _cch_tp.splice(_index,1)[0];
_result = [[
_conf.element,_item.type,
_item.func,_conf.capture
]];
if (!!_item.link){
_result.push.apply(_result,_item.link);
}
// clear cache
if (!_cch_tp.length){
delete _cch_id[_type];
}
if (!_u._$hasProperty(_cch_id)){
delete _xcache[_id];
}
}
return _result;
};
return function(){
var _args = _doFormatArgs.apply(null,arguments);
if (!_args) return;
_u._$forEach(
_args.type,function(_name){
_u._$forEach(
_unCacheEvent(_name,_args),
function(_item){
_h.__delEvent.apply(_h,_item);
}
);
}
);
};
})();
/**
* 清除节点事件
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 添加事件
*       _v._$addEvent(
*           'abc','mouseover',function(_event){
*               // TODO something
*           }
*       );
*       _v._$addEvent(
*           'abc','mouseover',function(_event){
*               // TODO something
*           },true
*       );
*       _v._$addEvent(
*           'abc','custom',function(_event){
*               // TODO something
*           }
*       );
*
*       // 清除节点所有事件，包括两个mouseover事件和一个custom事件
*       _v._$clearEvent('abc');
*
*       // 清除节点指定类型事件，只清除两个mouseover事件
*       _v._$clearEvent('abc','mouseover');
*
*       // 清除多个事件，用空格分隔
*       _v._$clearEvent('abc','mouseover custom');
*   });
* ```
*
* @method module:base/event._$clearEvent
* @see    module:base/event._$delEvent
* @param  {String|Node} arg0 - 节点ID或者对象
* @param  {String}      arg1 - 事件类型，不带on前缀，不区分大小写，多个事件用空格分隔
* @return {Void}
*/
/**
* @method CHAINABLE._$clearEvent
* @see module:base/event._$clearEvent
*/
_p._$clearEvent =
_y._$clearEvent = (function(){
var _doClearEvent = function(_id,_name,_list){
_u._$reverseEach(
_list,function(_item){
_p._$delEvent(
_id,_name,_item.sfun,_item.capt
);
}
);
};
return function(_element,_type){
var _id = _e._$id(_element);
if (!_id) return;
var _cch_id = _xcache[_id];
if (!!_cch_id){
_type = _getTypeList(_type);
if (!!_type){
// clear event by type
_u._$forEach(
_type,function(_name){
_doClearEvent(_id,_name,_cch_id[_name]);
}
);
}else{
// clear all event
_u._$loop(
_cch_id,function(_value,_name){
_p._$clearEvent(_element,_name);
}
);
}
}
};
})();
/**
* 触发对象的某个事件，注：对于IE浏览器该接口节点事件有以下限制
*
* * 捕获阶段支持需要浏览器IE9+
* * 节点上自定义事件支持需要浏览器IE9+
*
*
* 结构举例
* ```html
*   <div id="abc">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 注册鼠标事件
*       _v._$addEvent(
*           'abc','click',function(_event){
*               // 获取鼠标事件触发的垂直位置
*               var _y = _v._$pageY(_event);
*           }
*       );
*       // 触发鼠标事件
*       _v._$dispatchEvent('abc','click');
*
*       // 注册自定义事件
*       _v._$addEvent(
*           'abc','ok',function(_event){
*               // TODO something
*           }
*       );
*       // 触发自定义事件
*       _v._$dispatchEvent('abc','ok');
*   });
* ```
*
* @method module:base/event._$dispatchEvent
* @param  {String|Node} arg0 - 节点ID或者对象
* @param  {String}      arg1 - 鼠标事件类型，不区分大小写，多个事件用空格分隔
* @param  {Object}      arg2 - 传递的参数信息
* @return {Void}
*/
/**
* @method CHAINABLE._$dispatchEvent
* @see module:base/event._$dispatchEvent
*/
_p._$dispatchEvent =
_y._$dispatchEvent = function(_element,_type,_options){
var _element = _e._$get(_element);
if (!!_element){
_u._$forEach(
_getTypeList(_type),function(_name){
var _result = _h.__checkEvent(
_element,_name
);
_h.__dispatchEvent(
_element,_result.type,_options
);
}
);
}
};
/**
* 获取触发事件的节点，可以传入过滤接口来遍历父节点找到符合条件的节点
*
* 结构举例
* ```html
*   <div id="a">
*     <p>
*       <span id="b">123</span>
*       <span link="a">123</span>
*       <span class="a link">123</span>
*       <span data-link="a">123</span>
*       <label>aaaaa</label>
*     </p>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 取事件触发节点
*       _v._$addEvent(
*           'b','click',function(_event){
*               // id为b的节点
*               var _node = _v._$getElement(_event);
*               // TODO something
*           }
*       );
*
*       // 事件触发，取id是a的节点
*       _v._$addEvent(
*           'b','click',function(_event){
*               // id为a的节点
*               var _node = _v._$getElement(
*                   _event,function(_element){
*                       return _element.id=='a';
*                   }
*               );
*               // TODO something
*
*               // class含link或者属性含link或者data-link的节点
*               var _node = _v._$getElement(_event,'link');
*
*               // 仅匹配class即 class="link xx xxx"
*               var _node = _v._$getElement(_event,'c:link');
*
*               // 仅匹配dataset即 data-link="aaaa"
*               var _node = _v._$getElement(_event,'d:link');
*
*               // 仅匹配attributer即 link="aaa"
*               var _node = _v._$getElement(_event,'a:link');
*
*               // 仅匹配tag即 <label>
*               var _node = _v._$getElement(_event,'t:label');
*           }
*       );
*   });
* ```
*
* @method module:base/event._$getElement
* @param  {Event}    arg0 - 事件对象
* @param  {Function} arg1 - 过滤接口
* @return {Node}            符合条件的节点
*/
_p._$getElement = (function(){
// element filter
var _exmap;
var _doFilter = function(_name,_element){
var _arr = _name.split(':');
if (_arr.length>1){
if (!_exmap){
_exmap = {
a:_e._$attr,
d:_e._$dataset,
c:_e._$hasClassName,
t:function(n,v){return (n.tagName||'').toLowerCase()===v;}
};
}
var _check = _exmap[_arr[0]];
if (!!_check){
return !!_check(_element,_arr[1]);
}
_name = _arr[1];
}
return !!_e._$attr(_element,_name)||
!!_e._$dataset(_element,_name)||
_e._$hasClassName(_element,_name);
};
return function(_event){
if (!_event) return null;
var _element = _event.target||
_event.srcElement,
_filter = arguments[1];
if (!_filter){
return _element;
}
if (_u._$isString(_filter)){
_filter = _doFilter._$bind(null,_filter);
}
if (_u._$isFunction(_filter)){
while(_element){
if (!!_filter(_element)){
return _element;
}
_element = _element.parentNode;
}
return null;
}
return _element;
};
})();
/**
* 阻止事件，包括默认事件和传递事件
*
* 结构举例
* ```html
*   <div id="a">
*     <a href="xxx.html" id="b">123</a>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 事件回调中阻止事件冒泡
*       _v._$addEvent(
*           'b','click',function(_event){
*               // 阻止事件继续传播
*               // 阻止链接打开的默认事件
*               _v._$stop(_event);
*           }
*       );
*
*       // a节点上的点击事件不会触发
*       _v._$addEvent(
*           'a','click',function(_event){
*               alert(0);
*               // TODO something
*           }
*       );
*   });
* ```
*
* @method module:base/event._$stop
* @see    module:base/event._$stopBubble
* @see    module:base/event._$stopDefault
* @param  {Event} arg0 - 要阻止的事件对象
* @return {Void}
*/
_p._$stop = function(_event){
_p._$stopBubble(_event);
_p._$stopDefault(_event);
};
/**
* 阻止事件的冒泡传递
*
* 结构举例
* ```html
*   <div id="a">
*     <a href="xxx.html" id="b">123</a>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 事件回调中阻止事件冒泡
*       _v._$addEvent(
*           'b','click',function(_event){
*               // 阻止事件继续传播
*               // 链接仍然会被打开
*               _v._$stopBubble(_event);
*           }
*       );
*
*       // a节点上的点击事件不会触发
*       _v._$addEvent(
*           'a','click',function(_event){
*               alert(0);
*               // TODO something
*           }
*       );
*   });
* ```
*
* @see    module:base/event._$stop}
* @method module:base/event._$stopBubble
* @param  {Event} arg0 - 要阻止的事件对象
* @return {Void}
*/
_p._$stopBubble = function(_event){
if (!!_event){
!!_event.stopPropagation
? _event.stopPropagation()
: _event.cancelBubble = !0;
}
};
/**
* 阻止标签的默认事件
*
* 结构举例
* ```html
*   <div id="a">
*     <a href="xxx.html" id="b">123</a>
*   </div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 事件回调中阻止链接默认事件
*       _v._$addEvent(
*           'b','click',function(_event){
*               // 阻止链接打开页面的默认行为
*               _v._$stopDefault(_event);
*           }
*       );
*
*       // a节点上的点击事件仍然会触发
*       _v._$addEvent(
*           'a','click',function(_event){
*               alert(0);
*               // TODO something
*           }
*       );
*   });
* ```
*
* @method module:base/event._$stopDefault
* @see    module:base/event._$stop
* @param  {Event} arg0 - 要阻止的事件对象
* @return {Void}
*/
_p._$stopDefault = function(_event) {
if (!!_event){
!!_event.preventDefault
? _event.preventDefault()
: _event.returnValue = !1;
}
};
/**
* 取事件相对于页面的位置
*
* 结构举例
* ```html
*   <div id="abc" style="width:100%;height:100%;">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 回调中取鼠标位置
*       _v._$addEvent(
*           'abc','click',function(_event){
*               // 获取鼠标事件触发的水平、垂直位置
*               var _pos = _v._$page(_event);
*           }
*       );
*   });
* ```
*
* @method module:base/event._$page
* @see    module:base/event._$pageX
* @see    module:base/event._$pageY
* @param  {Event}  arg0 - 事件对象
* @return {Object}        位置信息，{x:10,y:10}
*/
_p._$page = function(_event){
return {
x:_p._$pageX(_event),
y:_p._$pageY(_event)
};
};
/**
* 取事件相对于页面左侧的位置，累加所有内部滚动高度
*
* 结构举例
* ```html
*   <div id="abc" style="width:100%;height:100%;">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 回调中取鼠标位置
*       _p._$addEvent(
*           'abc','click',function(_event){
*               // 获取鼠标事件触发的水平位置
*               var _x = _v._$pageX(_event);
*           }
*       );
*   });
* ```
*
* @method module:base/event._$pageX
* @see    module:base/event._$clientX
* @param  {Event}  arg0 - 事件对象
* @return {Number}        水平位置
*/
_p._$pageX = function(_event){
return _getPageOffset(_event,'X','Left');
};
/**
* 取事件相对于页面顶部的位置，累加所有内部滚动高度
*
* 结构举例
* ```html
*   <div id="abc" style="width:100%;height:100%;">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 回调中取鼠标位置
*       _v._$addEvent(
*           'abc','click',function(_event){
*               // 获取鼠标事件触发的垂直位置
*               var _y = _v._$pageY(_event);
*           }
*       );
*   });
* ```
*
* @method module:base/event._$pageY
* @see    module:base/event._$clientY
* @param  {Event}  arg0 - 事件对象
* @return {Number}        垂直位置
*/
_p._$pageY = function(_event){
return _getPageOffset(_event,'Y','Top');
};
/**
* 取事件相对于页面左侧的位置，仅累加页面滚动高度
*
* 结构举例
* ```html
*   <div id="abc" style="width:100%;height:100%;">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 回调中取鼠标位置
*       _p._$addEvent(
*           'abc','click',function(_event){
*               // 获取鼠标事件触发的水平位置
*               var _x = _v._$clientX(_event);
*           }
*       );
*   });
* ```
*
* @method module:base/event._$clientX
* @see    module:base/event._$pageX
* @param  {Event}  arg0 - 事件对象
* @return {Number}        水平位置
*/
_p._$clientX = function(_event){
return _getClientOffset(_event,'X','Left');
};
/**
* 取事件相对于页面顶部的位置，仅累加页面滚动高度
*
* 结构举例
* ```html
*   <div id="abc" style="width:100%;height:100%;">123</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'base/event'
*   ],function(_v){
*       // 回调中取鼠标位置
*       _v._$addEvent(
*           'abc','click',function(_event){
*               // 获取鼠标事件触发的垂直位置
*               var _y = _v._$pageY(_event);
*           }
*       );
*   });
* ```
*
* @method module:base/event._$clientY
* @see    module:base/event._$pageY
* @param  {Event}  arg0 - 事件对象
* @return {Number}        垂直位置
*/
_p._$clientY = function(_event){
return _getClientOffset(_event,'Y','Top');
};
// for chainable method
_x._$merge(_y);
if (CMPT){
NEJ.copy(NEJ.P('nej.v'),_p);
}
return _p;
},7,4,2,11,12);
I$(20,function (NEJ,_k,_v,_u,_p,_o,_f,_r){
var _pro;
/**
* 控件基类，主要实现以下功能：
* * 对事件驱动编程模型的支持
* * 对控件通用行为及业务逻辑的抽象
*
* ```javascript
*   NEJ.define([
*       'base/klass',
*       'util/event'
*   ],function(_k,_t,_p,_o,_f,_r){
*       // 自定义一个控件及使用、回收的流程
*       var _pro;
*
*       // 第一步
*       // 定义控件类，从父类继承
*       _p._$$Widget = _k._$klass();
*       _pro = _p._$$Widget._$extend(_t._$$EventTarget);
*
*       // 第二步
*       // 重写控件初始化业务逻辑
*       _pro.__init = function(_options){
*           // _options - 配置参数信息
*           //            初始化时一般不对该参数做处理
*           // 调用父类初始化业务逻辑
*           this.__super(_options);
*           // TODO something
*       };
*
*       // 第三步
*       // 重写控件重置业务逻辑
*       _pro.__reset = function(_options){
*           // _options - 配置参数信息
*           //            此处重置控件配置信息
*           // 调用父类重置业务逻辑
*           this.__super(_options);
*           // TODO something
*       };
*
*       // 第四步
*       // 重写控件回收业务逻辑
*       _pro.__destroy = function __destroy(){
*           // 调用父类回收业务逻辑
*           this.__super();
*           // TODO something
*       };
*
*       // 第五步
*       // 使用控件
*       var _widget = _p._$$Widget._$allocate({
*           a:'aaaaaaaaaaa',
*           b:'bbbbbbbbbbbbb',
*           c:'ccccccccccccccc'
*       });
*
*       // 第六步
*       // 回收控件
*       _widget = _widget._$recycle();
*       // 也可以使用以下方式回收，建议使用上面的回收方式
*       _widget = _p._$$Widget._$recycle(_widget);
*   });
* ```
*
* @class module:util/event._$$EventTarget
* @param {Object} config - 配置参数，根据控件实际情况提供配置参数支持
*/
/**
* 控件回收前触发事件，控件在具体实现时如需触发回收前的事件
*
* ```javascript
*   // 重写控件回收业务逻辑触发onbeforerecycle事件
*   _pro.__destroy = function(){
*       this._$dispatchEvent('onbeforerecycle');
*       // 调用父类回收业务逻辑
*       this.__super();
*       // TODO something
*   };
*
*   // 监测onbeforerecycle事件
*   var _widget = _p._$$Widget._$allocate({
*       onbeforerecycle:function(_event){
*           // TODO something
*       }
*   });
* ```
*
* @event module:util/event._$$EventTarget#onbeforerecycle
* @param {Object} event - 事件触发信息
*/
/**
* 控件回收后触发事件，控件在具体实现时如需触发回收后的事件
*
* ```javascript
*   // 重写控件回收业务逻辑触发onbeforerecycle事件
*   _pro.__destroy = function(){
*       // 调用父类回收业务逻辑
*       this.__super();
*       // TODO something
*       this._$dispatchEvent('onaftercycle');
*   };
*
*   // 监测onaftercycle事件
*   var _widget = _p._$$Widget._$allocate({
*       onaftercycle:function(_event){
*           // TODO something
*       }
*   });
* ```
*
* @event module:util/event._$$EventTarget#onaftercycle
* @param {Object} event - 事件触发信息
*/
_p._$$EventTarget = _k._$klass();
_pro = _p._$$EventTarget.prototype;
/**
* 控件分配，NEJ框架提供的所有控件统一使用分配和回收机制，
* 分配空间时会优先考虑使用前面回收的同种控件，只有在没有可用控件的情况下才会实例化新的控件
*
* ```javascript
*   // 分配一个控件
*   var _widget = _p._$$Widget._$allocate({
*       conf0:'aaaaaaa',
*       conf1:'bbbbbbbbbbbbb',
*       onxxx:function(){
*           // TODO something
*       }
*   });
* ```
*
* @method module:util/event._$$EventTarget._$allocate
* @see    module:util/event._$$EventTarget._$getInstance
* @see    module:util/event._$$EventTarget._$getInstanceWithReset
* @param  {Object}  arg0 - 配置参数，根据控件实际情况提供配置参数支持
* @return {module:util/event._$$EventTarget} 控件实例
*/
_p._$$EventTarget._$allocate = function(_options){
_options = _options||{};
var _instance = !!this.__pool
&&this.__pool.shift();
if (!_instance){
_instance = new this(_options);
this.__inst__ = (this.__inst__||0)+1;
}
// reset instance, flag first
_instance.__reset(_options);
return _instance;
};
/**
* 控件回收，NEJ框架提供的所有控件统一使用分配和回收机制，
* 如果提供的实例非当前类的实例则自动调整为输入实例的类来回收此实例
*
* ```javascript
*   // 回收前面分配的实例有两种方式
*   // 如果不能确定实例的构造类，则可以直接使用实例的回收接口
*   _widget._$recycle();
*   // 如果可以确定实例的构造类，则可以使用构造类的静态回收接口
*   _p._$$Widget._$recycle(_widget);
*   // 如果回收多个实例则使用构造类的静态回收接口
*   _p._$$Widget._$recycle([_widget0,_widget1]);
* ```
*
* @method module:util/event._$$EventTarget._$recycle
* @param  {module:util/event._$$EventTarget|module:util/event._$$EventTarget[]} arg0 - 待回收实例或者实例列表
* @return {Void}
*/
_p._$$EventTarget._$recycle = (function(){
var _doRecycle = function(_item,_index,_list){
_item._$recycle();
_list.splice(_index,1);
};
return function(_instance){
if (!_instance) return null;
if (!_u._$isArray(_instance)){
// instance is not instanceof class
if (!(_instance instanceof this)){
// use constructor recycle instance
var _class = _instance.constructor;
if (!!_class._$recycle){
_class._$recycle(_instance);
}
return null;
}
// delete singleton instance
if (_instance==this.__instance){
delete this.__instance;
}
if (_instance==this.__inctanse){
delete this.__inctanse;
}
// do recycle
_instance.__destroy();
// recycle instance
if (!this.__pool){
this.__pool = [];
}
if (_u._$indexOf(this.__pool,_instance)<0){
this.__pool.push(_instance);
}
return null;
}
// recycle instance array
_u._$reverseEach(_instance,_doRecycle,this);
};
})();
/**
* 取控件实例（单例），如果控件指明了为单例模式，
* 则项目中使用该控件时统一使用此接口获取控件实例，使用方式同_$allocate
*
* ```javascript
*   // 取控件单例，确保在第一次取单例时输入所有配置参数
*   var _widget = _p._$$Widget._$getInstance({
*       conf0:'aaaaaaa',
*       conf1:'bbbbbbbbbbbbb',
*       onxxx:function(){
*           // TODO something
*       }
*   });
*
*   // 后续取单例忽略配置参数
*   var _widget1 = _p._$$Widget._$getInstance({
*       conf0:'bbbbb'  // <-- 如果单例已生成，则这里的配置信息不会生效
*   });
*
*   // 等价于如下调用
*   var _widget2 = _p._$$Widget._$getInstance();
* ```
*
* @method module:util/event._$$EventTarget._$getInstance
* @see    module:util/event._$$EventTarget._$getInstanceWithReset
* @see    module:util/event._$$EventTarget._$allocate
* @param  {Object}  arg0 - 配置参数，根据控件实际情况提供配置参数支持
* @return {module:util/event._$$EventTarget} 控件实例
*/
_p._$$EventTarget._$getInstance = function(_options){
if (!this.__instance){
this.__instance = this._$allocate(_options);
}
return this.__instance;
};
/**
* 取控件实例（单例），如果控件指明了为单例模式，
* 则项目中使用该控件时统一使用此接口获取控件实例，使用方式同_$getInstance，
* 该接口同_$getInstance接口的主要区别在于输入的配置参数是否在每次调用接口时都重置
*
* ```javascript
*   // 取控件单例，确保在第一次取单例时输入所有配置参数
*   var _widget = _p._$$Widget._$getInstanceWithReset({
*       conf0:'aaaaaaa',
*       conf1:'bbbbbbbbbbbbb',
*       onxxx:function(){
*           // TODO something
*       }
*   });
*
*   // 后续取单例使用新的配置参数
*   var _widget1 = _p._$$Widget._$getInstanceWithReset({
*       conf0:'bbbbb'  // <-- 如果单例已生成，则重置这里的配置信息
*   });
* ```
*
* @method module:util/event._$$EventTarget._$getInstanceWithReset
* @see    module:util/event._$$EventTarget._$getInstance
* @see    module:util/event._$$EventTarget._$allocate
* @param  {Object}  arg0 - 配置参数，根据控件实际情况提供配置参数支持
* @param  {Boolean} arg1 - 是否需要先清理已有实例
* @return {module:util/event._$$EventTarget} 控件实例
*/
_p._$$EventTarget._$getInstanceWithReset = function(_options,_clear){
// clear instance
if (!!_clear&&!!this.__inctanse){
this.__inctanse._$recycle();
delete this.__inctanse;
}
// allocate instance
if (!this.__inctanse){
this.__inctanse = this._$allocate(_options);
}else{
this.__inctanse.__reset(_options);
}
return this.__inctanse;
};
/**
* 控件初始化，
* 子类可重写此接口业务逻辑，
* 子类可通过调用__super接口调用父类的初始化业务逻辑
*
* ```javascript
*   // 子类控件初始化业务逻辑
*   _pro.__init = function(){
*       // 调用父类控件初始化
*       this.__super();
*       // TODO something
*   };
* ```
*
* @protected
* @method module:util/event._$$EventTarget#__init
* @return {Void}
*/
_pro.__init = function(){
this.__events = {};
this.__events_dom = {};
this.id = _u._$uniqueID();
};
/**
* 控件重置，此接口用来接收控件配置参数的处理，
* 控件基类已处理以下业务逻辑：
*
* * 缓存通过配置参数输入的回调事��
*
* 子类重写此接口业务逻辑来处理具体控件对配置参数的处理，
* 子类通过调用__super接口调用父类的重置业务逻辑
*
* ```javascript
*   // 子类控件重置业务逻辑
*   _pro.__reset = function(_options){
*       // 调用父类控件重置逻辑
*       this.__super(_options);
*       // TODO something
*   };
* ```
*
* @protected
* @method module:util/event._$$EventTarget#__reset
* @param  {Object} arg0 - 配置参数，根据控件实际情况提供配置参数支持
* @return {Void}
*/
_pro.__reset = function(_options){
this._$batEvent(_options);
};
/**
* 控件销毁，当控件在回收时会调用此接口，基类已处理以下业务逻辑：
*
* * 通过配置参数输入的事件回调的清理
* * 通过__doInitDomEvent接口添加的DOM事件的清理
*
* 一般情况下控件还需回收通过重置接口__reset产生的数据，
* 子类可重写此接口业务逻辑来触发onbeforerecycle和onafterrecycle事件，
* 子类可通过调用__super接口调用父类的销毁业务逻辑
*
* ```javascript
*   // 子类重写控件销毁逻辑
*   _pro.__destroy = function(){
*       // 触发回收之前事件
*       this._$dispatchEvent('onbeforerecycle');
*       // 调用父类清理逻辑，如果有触发回收之后事件则以下业务逻辑需在触发回收之后事件后面调用
*       //this.__super();
*       // 清理本控件的数据
*       delete this.__conf0;
*       this.__widget2 = this.__widget2._$recycle();
*       // 触发回收之后事件，确保在onafterrecycle事件被清理前触发
*       this._$dispatchEvent('onafterrecycle');
*       this.__super();
*   };
* ```
*
* @protected
* @method module:util/event._$$EventTarget#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this._$clearEvent();
this.__doClearDomEvent();
};
/**
* 初始化事件，
* 重置接口__reset中需要通过_$addEvent接口添加的事件，
* 使用此接口添加可以在回收时自动被清理
*
* ```javascript
*   // 子类重置接口添加节点事件
*   _pro.__reset = function(_options){
*       this.__super(_options);
*       // 添加DOM事件或者自定义事件
*       this.__doInitDomEvent([
*           [document,'click',this.__onDocClick._$bind(this)],
*           [window,'ok',this.__onWindowOK._$bind(this)]
*       ]);
*   };
* ```
*
* @protected
* @method module:util/event._$$EventTarget#__doInitDomEvent
* @see    module:util/event._$$EventTarget#__doClearDomEvent
* @param  {Array} arg0 - 待添加的事件配置列表
* @return {Void}
*/
_pro.__doInitDomEvent = (function(){
var _doAttach = function(_args){
if (!_args||_args.length<3) return;
this.__events_dom['de-'+_u._$uniqueID()] = _args;
_v._$addEvent.apply(_v,_args);
};
return function(_list){
_u._$forEach(_list,_doAttach,this);
};
})();
/**
* 清除DOM事件，_$recycle接口会自动调用来清理这种DOM事件
*
* ```javascript
*   // 子类重置接口清理节点事件
*   _pro.__destroy = function(_options){
*       this.__doClearDomEvent();
*       this.__super(_options);
*   };
* ```
*
* @protected
* @method module:util/event._$$EventTarget#__doClearDomEvent
* @see    module:util/event._$$EventTarget#__doInitDomEvent
* @return {Void}
*/
_pro.__doClearDomEvent = (function(){
var _doRemoveEvent = function(_args,_key,_map){
delete _map[_key];
_v._$delEvent.apply(_v,_args);
};
return function(){
_u._$loop(this.__events_dom,_doRemoveEvent);
};
})();
/**
* 清理所有组合的控件
*
* ```javascript
*   // 子类重置接口清理组件
*   _pro.__destroy = function(_options){
*       this.__doClearComponent(function(_inst){
*           // 不回收_p._$$Widget2控件实例
*           return _inst instanceof _p._$$Widget2;
*       });
*       this.__super(_options);
*   };
* ```
*
* @protected
* @method module:util/event._$$EventTarget#__doClearComponent
* @param  {Function} arg0 - 过滤接口，返回true表示不清理该控件
* @return {Void}
*/
_pro.__doClearComponent = function(_filter){
_filter = _filter||_f;
_u._$loop(this,function(_inst,_key,_map){
if (!!_inst&&!!_inst._$recycle&&!_filter(_inst)){
delete _map[_key];
_inst._$recycle();
}
});
};
/**
* 回收控件，通过实例的构造类来回收当前实例
*
* ```javascript
*   // 通过实例的接口回收当前实例
*   _widget._$recycle();
* ```
*
* @method module:util/event._$$EventTarget#_$recycle
* @see    module:util/event._$$EventTarget#_$allocate
* @return {Void}
*/
_pro._$recycle = function(){
this.constructor._$recycle(this);
};
/**
* 判断是否有注册事件回调
*
* ```javascript
*   // 分配实例
*   var _widget = _p._$$Widget._$allocate({
*       onok:function(){
*           // TODO
*       }
*   });
*   // 判断控件实例是否注册有onok事件回调
*   _widget._$hasEvent('onok');
* ```
*
* @method module:util/event._$$EventTarget#_$hasEvent
* @param  {String} arg0 - 事件类型
* @return {Boolean}       是否注册了事件回调
*/
_pro._$hasEvent = function(_type){
var _type = (_type||'').toLowerCase(),
_event = this.__events[_type];
return !!_event&&_event!==_f;
};
/**
* 删除单个事件回调
*
* ```javascript
*   var _handler = function(){
*       // TODO
*   };
*   // 分配实例
*   var _widget = _p._$$Widget._$allocate({
*       onok:_handler
*   });
*   // 删除onok事件回调
*   _widget._$delEvent('onok',_handler);
* ```
*
* @method module:util/event._$$EventTarget#_$delEvent
* @param  {String}   arg0 - 事件类型
* @param  {Function} arg1 - 事件处理函数
* @return {Void}
*/
_pro._$delEvent = function(_type,_event){
var _type = (_type||'').toLowerCase(),
_events = this.__events[_type];
if (!_u._$isArray(_events)){
if (_events==_event){
delete this.__events[_type];
}
return;
}
// batch remove
_u._$reverseEach(
_events,function(_func,_index,_list){
if (_func==_event){
_list.splice(_index,1);
}
}
);
if (!_events.length){
delete this.__events[_type];
}
};
/**
* 重置事件，覆盖原有事件
*
* ```javascript
*   // 分配实例
*   var _widget = _p._$$Widget._$allocate();
*   // 设置控件事件回调
*   _widget._$setEvent('onok',function(){
*       // TODO something
*   });
*   _widget._$setEvent('oncancel',function(){
*       // TODO something
*   });
* ```
*
* @method module:util/event._$$EventTarget#_$setEvent
* @param  {String}   arg0 - 事件类型，大小写不敏感
* @param  {Function} arg1 - 事件处理函数
* @return {Void}
*/
_pro._$setEvent = function(_type,_event){
if (!!_type&&_u._$isFunction(_event)){
this.__events[_type.toLowerCase()] = _event;
}
};
/**
* 批量添加事件
*
* ```javascript
*   // 分配实例
*   var _widget = _p._$$Widget._$allocate();
*   // 批量设置控件事件回调
*   _widget._$batEvent({
*       onok:function(){
*           // TODO something
*       },
*       oncancel:function(){
*           // TODO something
*       }
*   });
* ```
*
* @method module:util/event._$$EventTarget#_$batEvent
* @see    module:util/event._$$EventTarget#_$setEvent
* @param  {Object} arg0 - 事件集合,{type:function}
* @return {Void}
*/
_pro._$batEvent = (function(){
var _doSetEvent = function(_event,_type){
this._$setEvent(_type,_event);
};
return function(_events){
_u._$loop(_events,_doSetEvent,this);
};
})();
/**
* 清除事件，没有指定类型则清除所有事件
*
* ```javascript
*   // 分配实例
*   var _widget = _p._$$Widget._$allocate({
*       onok:function(){
*           // TODO something
*       }
*   });
*   // 清除onok事件回调
*   _widget._$clearEvent('onok');
*   // 清除所有时间回调
*   _widget._$clearEvent();
* ```
*
* @method module:util/event._$$EventTarget#_$clearEvent
* @param  {String} arg0 - 事件类型
* @return {Void}
*/
_pro._$clearEvent = (function(){
var _doClearEvent = function(_event,_type){
this._$clearEvent(_type);
};
return function(_type){
var _type = (_type||'').toLowerCase();
if (!!_type){
delete this.__events[_type];
}else{
_u._$loop(this.__events,_doClearEvent,this);
}
};
})();
/**
* 追加事件，通过此接口可以对同一个事件添加多个回调函数
*
* ```javascript
*   // 分配实例
*   var _widget = _p._$$Widget._$allocate({
*       onok:function(){
*           // TODO something
*       }
*   });
*   // 追加事件回调
*   _widget._$addEvent({
*       onok:function(){
*           // TODO something
*       }
*   });
* ```
*
* @method module:util/event._$$EventTarget#_$addEvent
* @param  {String}   arg0 - 事件类型
* @param  {Function} arg1 - 事件处理函数
* @return {Void}
*/
_pro._$addEvent = function(_type,_event){
// check type and event
if (!_type||!_u._$isFunction(_event)){
return;
}
// cache event
_type = _type.toLowerCase();
var _events = this.__events[_type];
if (!_events){
this.__events[_type] = _event;
return;
}
if (!_u._$isArray(_events)){
this.__events[_type] = [_events];
}
this.__events[_type].push(_event);
};
/**
* 调用事件，一般在控件实现的具体业务逻辑中使用
*
* ```javascript
*   // 分配实例
*   var _widget = _p._$$Widget._$allocate({
*       onok:function(){
*           // TODO something
*       }
*   });
*   // 触发控件onok事件
*   _widget._$dispatchEvent('onok');
*
*   // 在控件实现的业务逻辑中使用
*   _pro.__doSomething = function(){
*       // TODO something
*       // 触发onok事件
*       this._$dispatchEvent('onok');
*   };
* ```
*
* @method module:util/event._$$EventTarget#_$dispatchEvent
* @param  {String}   arg0 - 事件类型，不区分大小写
* @param  {Variable} arg1 - 事件可接受参数，具体看调用时的业务逻辑
* @return {Void}
*/
_pro._$dispatchEvent = function(_type){
var _type = (_type||'').toLowerCase(),
_event = this.__events[_type];
if (!_event) return;
var _args = _r.slice.call(arguments,1);
// single event
if (!_u._$isArray(_event)){
_event.apply(this,_args);
return;
}
// event list
_u._$forEach(
_event,function(_handler){
if (DEBUG){
_handler.apply(this,_args);
}else{
try{
_handler.apply(this,_args);
}catch(ex){
// ignore
console.error(ex.message);
console.error(ex.stack);
}
}
},this
);
};
if (CMPT){
_p._$$Event = _p._$$EventTarget;
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,3,2);
/*
* TrimPath Template. Release 1.1.2.
* Copyright (C) 2004 - 2007 TrimPath.
*
* TrimPath Template is licensed under the GNU General Public License
* and the Apache License, Version 2.0, as follows:
*
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 2
* of the License, or (at your option) any later version.
*
* This program is distributed WITHOUT ANY WARRANTY; without even the
* implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
* See the GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/*
* ------------------------------------------
* JST模板引擎实现文件
* 实现原理参考trimpath项目 (GPL & APL)
* http://code.google.com/p/trimpath/
* @version  1.0
* @author   genify(caijf@corp.netease.com)
* ------------------------------------------
*/
(function(){
/**
* TrimPath模版引擎名字空间
* @namespace TrimPath
*/
// init TrimPath
if (typeof TrimPath==='undefined'){
TrimPath = {};
if (typeof exports!=='undefined')
TrimPath = exports;
}
// variable declaration
var _tcache = {}, // jst string cache
_stack  = [], // loop statement stack
_rspc   = /\s+/g,
_seed   = +new Date,
_trim,_config,_vars;
/*
* 解析表达式中变量信息，如
* a.b(c,d) || d('aaaa',f,g) && !!test() || 'eeee'
* @param  {String} 内容
* @return {Void}
*/
var _doParseVars = (function(){
var _reg0 = /^\s*[\[\{'"].*?[\]\}'"]\s*$/,
_reg1 = /[\&\|\<\>\+\-\*\/\%\,\(\)\[\]\?\:\!\=\;]/,
// keyword extend later
_reg2 = /^(?:defined|null|undefined|true|false|instanceof|new|this|typeof|\$v|[\d]+)$/i,
// statement extend later
// new XX
_reg3 = /^new\s+/,
_reg4 = /['"]/;
var _doParseSimple = function(_value){
if (_reg0.test(_value)) return;
_value = _value.split('.')[0].trim();
if (!_value||_reg4.test(_value)) return;
_value = _value.replace(_reg3,'');
//console.log('-->'+_value+'<--');
try{
if (_reg2.test(_value))
return;
_vars[_value] = 1;
//console.log('=====>'+_value+'<====');
}catch(e){
// ignore
}
};
return function(_content){
_content = _content||'';
// for string/array
if (!_content||_reg0.test(_content))
return;
var _arr = _content.split(_reg1);
for(var i=0,l=_arr.length;i<l;i++)
_doParseSimple(_arr[i]);
};
})();
/*
* 解析{for x in b}字符串的前缀
* @param  {Array}  按空格拆分的值,['for','x','in','b']
* @return {String} 解析后的前缀值
*/
var _doParsePrefixFor = function(_part){
if (_part[2]!='in')
throw 'bad for loop statement: '+_part.join(' ');
_stack.push(_part[1]);
// b is array or has [1,2,4],{a:'aaa',b:'bbb'}
_doParseVars(_part[3]);
return 'var __HASH__'+_part[1]+' = '+_part[3]+','+
_part[1]+','+_part[1]+'_count=0;'+
'if (!!__HASH__'+_part[1]+')'+
'for(var '+_part[1]+'_key in __HASH__'+_part[1]+'){'+
_part[1]+' = __HASH__'+_part[1]+'['+_part[1]+'_key];'+
'if (typeof('+_part[1]+')=="function") continue;'+
_part[1]+'_count++;';
};
/*
* 解析{forelse}字符串的前缀
* @return {String} 解析后的前缀值
*/
var _doParsePrefixForElse = function(){
var _part = _stack[_stack.length-1];
return '}; if(!__HASH__'+_part+'||!'+_part+'_count){';
};
/*
* 解析{/for}字符串的前缀
* @return {String} 解析后的前缀值
*/
var _doParsePrefixForEnd = function(){
_stack.pop();
return '};';
};
/*
* 解析{list seq as x}或者{list 1..100 as x}字符串的前缀
* @param  {Array}  按空格拆分的值,['list','seq','as','x']
* @return {String} 解析后的前缀值
*/
var _doParsePrefixList = function(_part){
if (_part[2]!='as')
throw 'bad for list loop statement: '+_part.join(' ');
var _seq = _part[1].split('..');
if (_seq.length>1){
// {list 1..100 as x}
_doParseVars(_seq[0]);
_doParseVars(_seq[1]);
return 'for(var '+_part[3]+','+_part[3]+'_index=0,'+
_part[3]+'_beg='+_seq[0]+','+_part[3]+'_end='+_seq[1]+','+
_part[3]+'_length=parseInt('+_part[3]+'_end-'+_part[3]+'_beg+1);'+
_part[3]+'_index<'+_part[3]+'_length;'+_part[3]+'_index++){'+
_part[3]+' = '+_part[3]+'_beg+'+_part[3]+'_index;';
}else{
// {list seq as x}
// seq is array [1,2,4]
_doParseVars(_part[1]);
return 'for(var __LIST__'+_part[3]+' = '+_part[1]+','+
_part[3]+','+_part[3]+'_index=0,'+
_part[3]+'_length=__LIST__'+_part[3]+'.length;'+
_part[3]+'_index<'+_part[3]+'_length;'+_part[3]+'_index++){'+
_part[3]+' = __LIST__'+_part[3]+'['+_part[3]+'_index];';
}
};
/*
* 解析{macro macroName(arg1,arg2,...argN)}字符串的前缀
* @param  {Array}  按空格拆分的值,['macro','macroName(arg1,arg2,...argN)']
* @return {String} 解析后的前缀值
*/
var _doParsePrefixMacro = function(_part){
if (!_part||!_part.length) return;
_part.shift(); // remove macro key word
var _name = _part[0].split('(')[0];
return 'var '+_name+' = function'+_part.join('').replace(_name,'')+'{var __OUT=[];';
};
/*
* 解析{include "text-template-id"}字符串前缀
* @param  {Array}  按空格拆分的值,['include','"text-template-id"']
* @return {String} 解析后的前缀值
*/
var _doParsePrefixInline = function(_part){
if (!_part[1])
throw 'bad include statement: '+_part.join(' ');
return 'if (typeof inline == "function"){__OUT.push(inline(';
};
/**
* 解析IF语句前缀，{if customer != null && customer.balance > 1000 || test(customer)}
* @param  {String}  返回值
* @param  {Array}   按空格拆分的值
* @return {String}  解析后的前缀值
*/
var _doParsePrefixCondition = function(_prefix,_part){
_doParseVars(_part.slice(1).join(' '));
return _prefix;
};
// parse prefix condition
var _doParsePrefixConditionIF = function(_part){
return _doParsePrefixCondition('if(',_part);
};
var _doParsePrefixConditionELSEIF = function(_part){
return _doParsePrefixCondition('}else if(',_part);
};
var _doParsePrefixConditionVAR = function(_part){
return _doParsePrefixCondition('var ',_part);
};
// jst configuration
_config = {
blk : /^\{(cdata|minify|eval)/i,
tag : 'forelse|for|list|if|elseif|else|var|macro|break|notrim|trim|include',
// {pmin : min param number,
//  pdft : param default value,
//  pfix : statement prefix,
//  sfix : statement suffix}
def : {
'if'     : {pfix:_doParsePrefixConditionIF,sfix:'){',pmin:1},
'else'   : {pfix:'}else{'},
'elseif' : {pfix:_doParsePrefixConditionELSEIF,sfix:'){',pdft:'true'},
'/if'    : {pfix:'}'},
'for'    : {pfix:_doParsePrefixFor,pmin:3},
'forelse': {pfix:_doParsePrefixForElse},
'/for'   : {pfix:_doParsePrefixForEnd},
'list'   : {pfix:_doParsePrefixList,pmin:3},
'/list'  : {pfix:'};'},
'break'  : {pfix:'break;'},
'var'    : {pfix:_doParsePrefixConditionVAR,sfix:';'},
'macro'  : {pfix:_doParsePrefixMacro},
'/macro' : {pfix:'return __OUT.join("");};'},
'trim'   : {pfix:function(){_trim = !0;}},
'/trim'  : {pfix:function(){_trim = null;}},
'inline' : {pfix:_doParsePrefixInline,pmin:1,sfix:'));}'}
},
ext : {
'seed'   : function(_prefix){return (_prefix||'')+''+_seed;},
'default': function(_value,_default){return _value||_default;}
}
};
/*
* 解析语句，如{if customer != null && customer.balance > 1000}
* @param  {String} 待解析语句
* @param  {Array}  内容输出
* @return {Void}
*/
var _doParseStatement = (function(){
var _rbrc = /\\([\{\}])/g;
return function(_content,_out){
_content = _content.replace(_rbrc,'$1');
//console.log('++++>'+_content);
var _part = _content.slice(1, -1).split(_rspc),
_conf = _config.def[_part[0]];
if (!_conf){_doParseSectionText(_content,_out);return;}
if (!!_conf.pmin&&_conf.pmin>=_part.length)
throw 'Statement needs more parameters:'+_content;
// parse prefix
_out.push((!!_conf.pfix&&
typeof(_conf.pfix)!='string')
?_conf.pfix(_part):(_conf.pfix||''));
// parse params and suffix
if (!!_conf.sfix){
if (_part.length<=1) {
if (!!_conf.pdft) _out.push(_conf.pdft);
}else{
for(var i=1,l=_part.length;i<l;i++){
if (i>1) _out.push(' ');
_out.push(_part[i]);
}
}
_out.push(_conf.sfix);
}
};
})();
/*
* 解析表达式，如['firstName','default:"John Doe"','capitalize']
* @param  {Array}  表达式内容
* @param  {Number} 表达式索引
* @param  {Array}  内容输出
* @return {Void}
*/
var _doParseExpression = function(_exps,_out){
// foo|a:x|b:y1,y2|c:z1,z2 -> c(b(a(foo,x),y1,y2),z1,z2)
if (!_exps||!_exps.length) return;
if (_exps.length==1){
var _var = _exps.pop();
_doParseVars(_var);
// fix error for ${}
_out.push(_var==''?'""':_var);
return;
}
var _exp = _exps.pop().split(':');
_out.push('__MDF[\''+_exp.shift()+'\'](');
_doParseExpression(_exps,_out);
if (_exp.length>0){
var _args = _exp.join(':');
_doParseVars(_args);
_out.push(','+_args);
}
_out.push(')');
};
/*
* 解析内容，内容中可能包含换行
* @param  {String} 待解析语句
* @param  {Array}  内容输出
* @return {Void}
*/
var _doParseSectionText = function(_content,_out){
if (!_content) return;
var _lines = _content.split('\n');
if (!_lines||!_lines.length) return;
for(var i=0,l=_lines.length,_line;i<l;i++){
_line = _lines[i];
if (!!_trim){
_line = _line.trim();
if (!_line) continue;
}
_doParseSectionTextLine(_line,_out);
if (!!_trim&&i<l-1) _out.push('__OUT.push(\'\\n\');');
}
};
/*
* 解析内容，内容中可能包含${a}或者${%a%}取值语句
* @param  {String} 待解析语句
* @param  {Array}  内容输出
* @return {Void}
*/
var _doParseSectionTextLine = (function(){
var _raor = /\|\|/g,
_rvor = /#@@#/g;
return function(_content,_out){
// defined used variable
var _prvmrkend = '}',_prvexpend = -1,
_length = _content.length,
_begin,_end,_begexp,_endexp,_exparr;
while((_prvexpend+_prvmrkend.length)<_length){
_begin = '${'; _end = '}';
_begexp = _content.indexOf(_begin,_prvexpend+_prvmrkend.length);
if (_begexp<0) break;
// parse ${% customer.firstName %} syntax
if (_content.charAt(_begexp+2)=='%'){
_begin = '${%'; _end = '%}';
}
_endexp = _content.indexOf(_end,_begexp+_begin.length);
if (_endexp<0) break;
_doParseText(_content.substring(_prvexpend+_prvmrkend.length,_begexp),_out);
// parse expression: 'firstName|default:"John Doe"|capitalize'.split('|')
_exparr = _content.substring(_begexp+_begin.length,_endexp).replace(_raor,'#@@#').split('|');
for(var i=0,l=_exparr.length;i<l;_exparr[i]=_exparr[i].replace(_rvor,'||'),i++);
_out.push('__OUT.push('); _doParseExpression(_exparr,_out); _out.push(');');
_prvmrkend = _end; _prvexpend = _endexp;
}
_doParseText(_content.substring(_prvexpend+_prvmrkend.length),_out);
};
})();
/*
* 解析纯文本内容，不包含需要解析的内容
* @param  {String} 待解析内容
* @param  {Array}  内容输出
* @return {Void}
*/
var _doParseText = (function(){
var _map = {r:/\n|\\|\'/g,'\n':'\\n','\\':'\\\\','\'':'\\\''};
var _doEncode = function(_content){
return (_content||'').replace(_map.r,function($1){
return _map[$1]||$1;
});
};
return function(_content,_out){
if (!_content) return;
_out.push('__OUT.push(\''+_doEncode(_content)+'\');');
};
})();
/*
* 解析模板为执行函数
* @param  {String}   模板内容
* @return {Function} 模板执行函数
*/
var _doParseTemplate = (function(){
var _rtab = /\t/g,
_rnln = /\n/g,
_rlne = /\r\n?/g;
var _doSearchEnd = function(_content,_begin){
var _index = _content.indexOf("}",_begin+1);
// for {for x in \{a:'aaa',b:'bbbb'\}}
while(_content.charAt(_index-1)=='\\'){
_index = _content.indexOf("}",_index+1);
}
return _index;
};
var _doParseVarMap = function(){
var _arr = [],
_arg = arguments[0];
for(var x in _arg){
x = (x||'').trim();
if (!x) continue;
_arr.push(x+'=$v(\''+x+'\')');
}
return _arr.length>0?('var '+_arr.join(',')+';'):'';
};
return function(_content){
_vars = {};
_content = _content.replace(_rlne,'\n').replace(_rtab,'    ');
var _ftxt = ['if(!__CTX) return \'\';',''];
_ftxt.push('function $v(__NAME){var v = __CTX[__NAME];return v==null?window[__NAME]:v;};');
_ftxt.push('var defined=function(__NAME){return __CTX[__NAME]!=null;},');
_ftxt.push('__OUT=[];');
// defiend used variables
var _prvend = -1,_length = _content.length;
var _stmtbeg,_stmtend,_statement,
_blockrx,_blktmp,_blkend,_blkmrk,_blktxt;
// search content
while((_prvend+1)<_length){
// search statement begin
_stmtbeg = _prvend;
_stmtbeg = _content.indexOf("{",_stmtbeg+1);
while(_stmtbeg>=0){
_stmtend = _doSearchEnd(_content,_stmtbeg);
_statement = _content.substring(_stmtbeg,_stmtend);
_blockrx = _statement.match(_config.blk);
// minify/eval/cdata implementation
if (!!_blockrx){
_blktmp = _blockrx[1].length+1;
_blkend = _content.indexOf('}',_stmtbeg+_blktmp);
if (_blkend>=0){
// gen block end marker
_blkmrk = _blkend-_stmtbeg-_blktmp<=0
? ('{/'+_blockrx[1]+'}')
: _statement.substr(_blktmp+1);
_blktmp = _content.indexOf(_blkmrk,_blkend+1);
// parse block content
if (_blktmp>=0){
_doParseSectionText(_content.substring(_prvend+1,_stmtbeg),_ftxt);
// get block text and parse
_blktxt = _content.substring(_blkend+1,_blktmp);
switch(_blockrx[1]){
case 'cdata' : _doParseText(_blktxt,_ftxt); break;
case 'minify': _doParseText(_blktxt.replace(_rnln,' ').replace(_rspc,' '),_ftxt); break;
case 'eval'  : if (!!_blktxt) _ftxt.push('__OUT.push((function(){'+_blktxt+'})());'); break;
}
_stmtbeg = _prvend = _blktmp+_blkmrk.length-1;
}
}
}else if(_content.charAt(_stmtbeg-1)!='$'&&
_content.charAt(_stmtbeg-1)!='\\'&&
_statement.substr(_statement.charAt(1)=='/'?2:1)
.search(_config.tag)==0){
// break when result is a statement
break;
}
_stmtbeg = _content.indexOf("{",_stmtbeg+1);
}
if (_stmtbeg<0) break;
_stmtend = _doSearchEnd(_content,_stmtbeg);
if (_stmtend<0) break;
// parse content
_doParseSectionText(_content.substring(_prvend+1,_stmtbeg),_ftxt);
_doParseStatement(_content.substring(_stmtbeg,_stmtend+1),_ftxt);
_prvend = _stmtend;
}
_doParseSectionText(_content.substring(_prvend+1),_ftxt);
_ftxt.push(';return __OUT.join("");');
_ftxt[1] = _doParseVarMap(_vars);
_vars = null;
//console.log(_ftxt.join(''));
return new Function('__CTX','__MDF',_ftxt.join(''));
};
})();
// interface
/**
* 取模板随机数种子
*
* 代码举例
* ```javascript
* NEJ.define([
*     'util/template/trimpath.nej'
* ],function(){
*     // 模版统一随机标识
*     var _seed = TrimPath.seed();
* });
* ```
*
* @method TrimPath.seed
* @return {String} 随机数种子
*/
TrimPath.seed = function(){
return _seed;
};
/**
* 根据模板的序列号合并模板数据
*
* 代码举例
* ```javascript
* NEJ.define([
*     'util/template/trimpath'
* ],function(){
*     // 模版合并数据
*     var _html = TrimPath.merge(
*         _jst_id,{
*             a:'aaaaaa',
*             b:'bbbbbbbbbb',
*             c:'cccccccccccc'
*         }
*     );
* });
* ```
*
* @method TrimPath.merge
* @param  {String} arg0 - 模板序列号
* @param  {Object} arg1 - 模板数据
* @param  {Object} arg2 - 扩展接口
* @return {String}        合并数据后的内容
*/
TrimPath.merge = (function(){
var _fcache = {};
// for test
TrimPath.dump = function(){
return {
func:_fcache,
text:_tcache
};
};
return function(_sn,_data,_extend){
try{
_data = _data||{};
if (!_fcache[_sn]&&!_tcache[_sn])
return '';
if (!_fcache[_sn]){
_fcache[_sn] = _doParseTemplate(_tcache[_sn]);
delete _tcache[_sn];
}
if (!!_extend){
for(var x in _config.ext)
if (!_extend[x])
_extend[x] = _config.ext[x];
}
return _fcache[_sn](_data,_extend||_config.ext);
}catch(ex){
return ex.message||'';
}
};
})();
/**
* 添加JST模板，JST模板可以是节点的值
*
* 代码举例
* ```javascript
* NEJ.define([
*     'util/template/trimpath'
* ],function(){
*     // 解析缓存模版
*     var _jst_id = TrimPath.merge(
*         '<div>\
*              <p>${a}</p>\
*              <p>${b}</p>\
*              <p>${c}</p>\
*          </div>'
*     );
* });
* ```
*
* @method TrimPath.parse
* @param  {String}  arg0 - JST模板内容
* @param  {Boolean} arg1 - 是否保留节点
* @return {String}         JST模板在缓存中的标识
*/
TrimPath.parse = (function(){
var _xeed = +new Date;
return function(_content,_sn){
if (!_content) return '';
_sn = _sn||('ck_'+(_xeed++));
_tcache[_sn] = _content;
return _sn;
};
})();
})();
I$(29,function (NEJ,_u,_e,_x,_t,_p,_o,_f,_r){
var _ext = {};
/**
* 取模板随机数种子
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/jst'
* ],function(_p){
*     // 返回一个标识符
*     var _seed = _p._$seed();
* });
* ```
*
* @method module:util/template/jst._$seed
* @return {String} 随机数种子
*/
_p._$seed = TrimPath.seed;
/**
* 根据模板的序列号合并模板数据
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/jst'
* ],function(_p){
*     // 添加模版
*     var _html_seed =  _p._$add('<div>${name}</div>');
*     // 生成结构<div>jack</div>
*     var _html = _p._$get(_html_seed,{name:'jack'});
* });
* ```
*
* @method module:util/template/jst._$get
* @see    module:util/template/jst._$add
* @param  {String} arg0 - 模板序列号
* @param  {Object} arg1 - 模板数据
* @param  {Object} arg2 - 扩展接口
* @return {String}        合并数据后的内容
*/
_p._$get = (function(){
var _doInline = function(_id){
return !_p._$getTextTemplate?'':
_p._$getTextTemplate(_id);
};
return function(_sn,_data,_extend){
_data = _data||{};
_data.inline = _doInline;
_extend = _u._$merge({},_ext,_extend);
_extend.rand = _u._$uniqueID;
_extend.format = _u._$format;
_extend.escape = _u._$escape;
_extend.inline = _doInline;
return TrimPath.merge(_sn,_data,_extend);
};
})();
/**
* 添加JST模板，JST模板可以是节点的值
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/jst'
* ],function(_p){
*     // 添加模版缓存
*     var _html_seed =  _p._$add('<div>${name}</div>');
* });
* ```
*
* @method module:util/template/jst._$add
* @see    module:util/template/jst._$get
* @param  {String}  arg0 - JST模板内容或者节点ID
* @param  {Boolean} arg1 - 是否保留节点
* @return {String}         JST模板在缓存中的序列号
*/
_p._$add = function(_content,_keep){
if (!_content) return '';
var _sn,_element = _e._$get(_content);
if (!!_element){
_sn = _element.id;
_content = _element.value||_element.innerText;
if (!_keep) _e._$remove(_element);
}
return TrimPath.parse(_content,_sn);
};
/**
* 整合模板后输出至指定容器节点
*
* 结构举例
* ```html
* <div id="box">aaa</div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/jst'
* ],function(_p){
*     // 添加模版缓存
*     var _html_seed =  _p._$add('<div>${name}</div>');
*     // 把结构塞到box中，生成<div id="box"><div>jack</div></div>
*     _p._$render('box',_html_seed,{name:'jack'});
* });
* ```
*
* @method module:util/template/jst._$render
* @param  {String|Node} arg0 - 容器节点
* @param  {String}      arg1 - 模板序列号
* @param  {Object}      arg2 - 模板数据
* @param  {Object}      arg3 - 扩展接口
* @return {Void}
*/
/**
* @method CHAINABLE._$render
* @see module:util/template/jst._$render
*/
_p._$render = function(_parent,_sn,_data,_extend){
_parent = _e._$get(_parent);
if (!!_parent){
_parent.innerHTML =
_p._$get(_sn,_data,_extend);
}
};
/**
* 注册JST扩展方法
*
* 结构举例
* ```html
* <textarea name="jst" id="abc">
*   <div>
*     <p>${name|a|b}</p>
*   </div>
* </textarea>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/jst'
* ],function(_p){
*     // 注册扩展方法 a和b
*     _p._$extend({
*         a:function(){},
*         b:function(){}
*     });
*     // 模板整合数据
*     _p._$render(
*         'box','abc',{name:'jack'}
*     );
* });
* ```
*
* @method module:util/template/jst._$extend
* @param  {Object} arg0 - 扩展方法
* @return {Void}
*/
_p._$extend = function(_map){
_u._$merge(_ext,_map);
};
// for chainable method
_x._$merge({_$render:_p._$render});
if (CMPT){
var _z = NEJ.P('nej.e');
_z._$addHtmlTemplate     = _p._$add;
_z._$getHtmlTemplate     = _p._$get;
_z._$getHtmlTemplateSeed = _p._$seed;
_z._$renderHtmlTemplate  = _p._$render;
_z._$registJSTExt        = _p._$extend;
}
return _p;
},7,2,4,11,33);
I$(30,function (NEJ,_k,_e,_v,_u,_t,_p,_o,_f,_r){
var _pro;
/**
* 自定义事件封装对象，封装的事件支持通过事件相关接口进行添加、删除等操作
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'base/event'
*     'util/event'
* ],function(_v,_t){
*     // 支持自定义事件
*     _t._$$CustomEvent._$allocate({
*         element:window,
*         event:'ok'
*     });
*
*     // 添加自定义事件
*     _v._$addEvent(window,'ok',function(){alert(0);});
*     _v._$addEvent(window,'ok',function(){alert(1);});
*
*     // 删除自定义事件
*     _v._$delEvent(window,'ok',function(){alert(0);});
*     _v._$clearEvent(window,'ok');
*
*     // 触发自定义事件
*     window.onok({a:'aaaaa'});
*     _v._$dispatchEvent(window,'ok',{a:'aaaaa'});
* });
* ```
*
* @class    module:util/event/event._$$CustomEvent
* @extends  module:util/event._$$EventTarget
*
* @param    {Object}       config  - 可选配置参数
* @property {String|Node}  element - 事件关联节点ID或者对象，默认为window对象
* @property {String|Array} event   - 事件名称或者名称列表
*/
/**
* 初始化时触发事件
*
* @event module:util/event/event._$$CustomEvent#oninit
* @param {Object} event - 事件信息
*/
/**
* 事件调度前触发事件
*
* @event    module:util/event/event._$$CustomEvent#ondispatch
* @param    {Object} event - 事件信息
* @property {String} type  - 事件类型
*/
/**
* 添加事件时触发事件
*
* @event    module:util/event/event._$$CustomEvent#oneventadd
* @param    {Object}   event    - 事件信息
* @property {String}   type     - 事件类型
* @property {Function} listener - 事件执行函数
*/
_p._$$CustomEvent = _k._$klass();
_pro = _p._$$CustomEvent._$extend(_t._$$EventTarget);
/**
* 控件初始化
*
* @protected
* @method module:util/event/event._$$CustomEvent#__init
* @return {Void}
*/
_pro.__init = function(){
// onxxx - event entry handler
//   xxx - event callback handler list
this.__cache = {};
this.__super();
};
/**
* 控件重置
*
* @protected
* @method module:util/event/event._$$CustomEvent#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__element = _e._$get(_options.element)||window;
// init event
this.__doEventInit(_options.event);
this.__doEventAPIEnhance();
this._$dispatchEvent('oninit');
};
/**
* 销毁控件
*
* @protected
* @method module:util/event/event._$$CustomEvent#__destroy
* @return {Void}
*/
_pro.__destroy = (function(){
var _doClear = function(_value,_key,_map){
if (!_u._$isArray(_value)){
_u._$safeDelete(this.__element,_key);
}
delete _map[_key];
};
return function(){
this.__super();
// clear cache
_u._$loop(
this.__cache,_doClear,this
);
delete this.__element;
};
})();
/**
* 判断是否需要代理事件
*
* @protected
* @method module:util/event/event._$$CustomEvent#__isDelegate
* @param  {String|Node} arg0 - 节点
* @param  {String}      arg1 - 事件
* @return {Boolean}            是否需要代理事件
*/
_pro.__isDelegate = function(_element,_type){
_element = _e._$get(_element);
return _element===this.__element&&
(!_type||!!this.__cache['on'+_type]);
};
/**
* 初始化事件
*
* @protected
* @method module:util/event/event._$$CustomEvent#__doEventInit
* @param  {String} arg0 - 事件名称
* @return {Void}
*/
_pro.__doEventInit = function(_event){
if (_u._$isString(_event)){
var _name = 'on'+_event;
if (!this.__cache[_name]){
this.__cache[_name] =
this.__doEventDispatch.
_$bind(this,_event);
}
this.__doEventBind(_event);
return;
}
if (_u._$isArray(_event)){
_u._$forEach(
_event,this.__doEventInit,this
);
}
};
/**
* 绑定事件
*
* @protected
* @method module:util/event/event._$$CustomEvent#__doEventBind
* @param  {String} arg0 - 事件名称
* @return {Void}
*/
_pro.__doEventBind = function(_type){
var _event = 'on'+_type,
_handler = this.__element[_event],
_handler1 = this.__cache[_event];
if (_handler!=_handler1){
this.__doEventDelete(_type);
if (!!_handler&&_handler!=_f){
this.__doEventAdd(_type,_handler);
}
this.__element[_event] = _handler1;
}
};
/**
* 添加事件
*
* protected
* @method module:util/event/event._$$CustomEvent#__doEventAdd
* @param  {String}   arg0 - 事件名称
* @param  {Function} arg1 - 事件回调
* @return {Void}
*/
_pro.__doEventAdd = function(_type,_handler,_front){
var _list = this.__cache[_type];
if (!_list){
_list = [];
this.__cache[_type] = _list;
}
if (_u._$isFunction(_handler)){
!_front ? _list.push(_handler)
: _list.unshift(_handler);
}
};
/**
* 删除事件
*
* protected
* @method module:util/event/event._$$CustomEvent#__doEventDelete
* @param  {String}   arg0 - 事件名称
* @param  {Function} arg1 - 事件回调
* @return {Void}
*/
_pro.__doEventDelete = function(_type,_handler){
var _list = this.__cache[_type];
if (!_list||!_list.length) return;
// clear all event handler
if (!_handler){
delete this.__cache[_type];
return;
}
// delete one event handler
_u._$reverseEach(
_list,function(_value,_index,_xlist){
if (_handler===_value){
_xlist.splice(_index,1);
return !0;
}
}
);
};
/**
* 事件调度
*
* protected
* @method module:util/event/event._$$CustomEvent#__doEventDispatch
* @param  {String} arg0 - 事件名称
* @param  {Object} arg1 - 事件对象
* @return {Void}
*/
_pro.__doEventDispatch = function(_type,_event){
_event = _event||{noargs:!0};
if (_event==_o){
_event = {};
}
_event.type = _type;
this._$dispatchEvent('ondispatch',_event);
if (!!_event.stopped) return;
_u._$forEach(
this.__cache[_type],function(_handler){
if (DEBUG){
_handler(_event);
}else{
try{
_handler(_event);
}catch(ex){
// ignore
console.error(ex.message);
console.error(ex.stack);
}
}
}
);
};
/**
* 增强事件操作API
*
* protected
* @method module:util/event/event._$$CustomEvent#__doEventAPIEnhance
* @return {Void}
*/
_pro.__doEventAPIEnhance = (function(){
var _doAddEvent = function(_event){
var _args = _event.args,
_type = _args[1].toLowerCase();
if (this.__isDelegate(_args[0],_type)){
_event.stopped = !0;
this.__doEventBind(_type);
this.__doEventAdd(_type,_args[2],_args[3]);
this._$dispatchEvent('oneventadd',{
type:_type,
listener:_args[2]
});
}
};
var _doDelEvent = function(_event){
var _args = _event.args,
_type = _args[1].toLowerCase();
if (this.__isDelegate(_args[0],_type)){
_event.stopped = !0;
this.__doEventDelete(_type,_args[2]);
}
};
var _doClearEvent = function(_event){
var _args = _event.args,
_type = (_args[1]||'').toLowerCase();
if (this.__isDelegate(_args[0])){
if (!!_type){
this.__doEventDelete(_type);
return;
}
_u._$loop(
this.__cache,function(_value,_key){
if (_u._$isArray(_value)){
this.__doEventDelete(_key);
}
},this
);
}
};
var _doDispatchEvent = function(_event){
var _args = _event.args,
_type = _args[1].toLowerCase();
if (this.__isDelegate(_args[0],_type)){
_event.stopped = !0;
_args[0]['on'+_type].apply(_args[0],_args.slice(2));
}
};
return function(){
// void multi-enhance
if (!!this.__enhanced){
return;
}
// enhance event api
this.__enhanced = true;
_v._$addEvent = _v._$addEvent._$aop(_doAddEvent._$bind(this));
_v._$delEvent = _v._$delEvent._$aop(_doDelEvent._$bind(this));
_v._$clearEvent = _v._$clearEvent._$aop(_doClearEvent._$bind(this));
_v._$dispatchEvent = _v._$dispatchEvent._$aop(_doDispatchEvent._$bind(this));
if (CMPT){
NEJ.copy(NEJ.P('nej.v'),_v);
}
};
})();
if (CMPT){
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,4,3,2,20);
I$(38,function (NEJ,_k,_g,_v,_u,_t,_p,_o,_f,_r){
var _pro,
_timeout = 60000;
/**
* 资源加载器
*
* @class    module:util/ajax/loader/loader._$$LoaderAbstract
* @extends  module:util/event._$$EventTarget
*
* @param    {Object} config  - 可选配置参数
* @property {String} version - 版本信息
* @property {Number} timeout - 超时时间，0表示禁止超时监测
*/
/**
* 资源载入失败回调
*
* @event    module:util/ajax/loader/loader._$$LoaderAbstract#onerror
* @param    {Object} event   - 错误信息
* @property {Number} code    - 错误码
* @property {String} message - 错误信息
*/
/**
* 资源载入成功回调
*
* @event  module:util/ajax/loader/loader._$$LoaderAbstract#onload
* @param  {Variable} event - 请求返回数据
*/
/**
* 资源加载中回调
*
* @event  module:util/ajax/loader/loader._$$LoaderAbstract#onloading
*/
_p._$$LoaderAbstract = _k._$klass();
_pro = _p._$$LoaderAbstract._$extend(_t._$$EventTarget);
/**
* 控件初始化
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__init
* @return {Void}
*/
_pro.__init = function(){
this.__super();
this.__qopt = {
onerror:this.__onQueueError._$bind(this),
onload:this.__onQueueLoaded._$bind(this)
};
if (!this.constructor.__cache){
// url : {request:script,timer:2,bind:[instance1,instance2 ... ]}
// key : {error:0,loaded:0,total:0,bind:[instance1,instance2 ... ]}
this.constructor.__cache = {loaded:{}};
}
};
/**
* 控件重置
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__version = _options.version;
this.__timeout = _options.timeout;
this.__qopt.version = this.__version;
this.__qopt.timeout = this.__timeout;
};
/**
* 删除加载信息
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__delLoadData
* @param  {String} arg0 - 标识
* @return {Object}        加载信息
*/
_pro.__delLoadData = function(_key){
delete this.constructor.__cache[_key];
};
/**
* 取加载信息
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__getLoadData
* @param  {String} arg0 - 标识
* @return {Object}        加载信息
*/
_pro.__getLoadData = function(_key){
return this.constructor.__cache[_key];
};
/**
* 设置加载信息
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__setLoadData
* @param  {String} arg0 - 标识
* @param  {Object} arg1 - 加载信息
* @return {Void}
*/
_pro.__setLoadData = function(_key,_data){
this.constructor.__cache[_key] = _data;
};
/**
* 取资源载入控件，子类实现具体逻辑
*
* @abstract
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__getRequest
* @return {Script|Link} 控件
*/
_pro.__getRequest = _f;
/**
* 清理控件
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__doClearRequest
* @param  {Script|Link} arg0 - 控件
* @return {Void}
*/
_pro.__doClearRequest = function(_request){
_v._$clearEvent(_request);
};
/**
* 资源载入
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__doRequest
* @param  {Script|Link} arg0 - 控件
* @return {Void}
*/
_pro.__doRequest = function(_request){
_request.src = this.__url;
document.head.appendChild(_request);
};
/**
* 执行清理任务
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__doClear
* @return {Void}
*/
_pro.__doClear = function(){
var _cache = this.__getLoadData(this.__url);
if (!_cache) return;
window.clearTimeout(_cache.timer);
this.__doClearRequest(_cache.request);
delete _cache.bind;
delete _cache.timer;
delete _cache.request;
this.__delLoadData(this.__url);
this.__getLoadData('loaded')[this.__url] = !0;
};
/**
* 执行回调
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__doCallback
* @param  {String} arg0 - 回调名称
* @return {Void}
*/
_pro.__doCallback = function(_name){
var _cache = this.__getLoadData(this.__url);
if (!_cache) return;
var _list = _cache.bind;
this.__doClear();
if (!!_list&&_list.length>0){
var _instance;
while(_list.length){
_instance = _list.shift();
try{
_instance._$dispatchEvent(_name,arguments[1]);
}catch(ex){
// ignore
if (DEBUG) throw ex;
console.error(ex.message);
console.error(ex.stack);
}
_instance._$recycle();
}
}
};
/**
* 资源载入异常事件
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__onError
* @param  {Object} arg0 - 错误信息
* @return {Void}
*/
_pro.__onError = function(_error){
this.__doCallback('onerror',_error);
};
/**
* 资源载入成功事件
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__onLoaded
* @return {Void}
*/
_pro.__onLoaded = function(){
this.__doCallback('onload');
};
/**
* 载入队列资源
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__doLoadQueue
* @param  {String} arg0 - 资源地址
* @return {Void}
*/
_pro.__doLoadQueue = function(_url){
this.constructor._$allocate(this.__qopt)._$load(_url);
};
/**
* 检查队列状况
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__onQueueCheck
* @return {Void}
*/
_pro.__onQueueCheck = function(_error){
var _cache = this.__getLoadData(this.__key);
if (!_cache) return;
if (!!_error)
_cache.error++;
_cache.loaded ++;
if (_cache.loaded<_cache.total) return;
this.__delLoadData(this.__key);
this._$dispatchEvent(_cache.error>0?'onerror':'onload');
};
/**
* 队列载入资源异常事件
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__onQueueError
* @param  {Object} arg0 - 错误信息
* @return {Void}
*/
_pro.__onQueueError = function(_error){
this.__onQueueCheck(!0);
};
/**
* 队列载入资源成功事件
*
* @protected
* @method module:util/ajax/loader/loader._$$LoaderAbstract#__onQueueLoaded
* @return {Void}
*/
_pro.__onQueueLoaded = function(){
this.__onQueueCheck();
};
/**
* 载入资源
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/loader/html',
*     'util/ajax/loader/style',
*     'util/ajax/loader/script'
* ],function(_t0,_t1,_t2){
*     // 载入指定html,10秒超时
*     var _loader = _t0._$$LoaderHtml._$allocate({
*         timeout:10000,
*         onload:function(){
*             // 载入资源成功的回调
*         }
*     });
*     // 绝对路径或者当前页面的相对路径
*     _loader._$load('../../../html/util/formTest.html');
*
*     // 载入指定script,20秒超时
*     var _loader = _t2._$$LoaderScript._$allocate({
*         timeout:20000,
*         onload:function(){
*             // 载入资源成功的回调
*         }
*     });
*     // 绝对路径或者当前页面的相对路径
*     _loader._$load('../../../javascript/log.js');
*
*     // 载入指定style,30秒超时
*     var _loader = _t1._$$LoaderStyle._$allocate({
*         timeout:30000,
*         onload:function(){
*             // 载入资源成功的回调
*         }
*     });
*     // 绝对路径或者当前页面的相对路径
*     _loader._$load('../../../base/qunit.css');
* });
* ```
*
* @method module:util/ajax/loader/loader._$$LoaderAbstract#_$load
* @param  {String} arg0 - 资源地址
* @return {Void}
*/
_pro._$load = function(_url){
_url = _u._$absolute(_url);
if (!_url){
this._$dispatchEvent('onerror',{
code:_g._$CODE_NOTASGN,
message:'请指定要载入的资源地址！'
});
return;
};
this.__url = _url;
if (!!this.__version){
this.__url += (this.__url.indexOf('?')<0?'?':'&')+this.__version;
}
if (this.__getLoadData('loaded')[this.__url]){
try{
this._$dispatchEvent('onload');
}catch(ex){
// ignore
if (DEBUG) throw ex;
console.error(ex.message);
console.error(ex.stack);
}
this._$recycle();
return;
}
var _cache = this.__getLoadData(this.__url),_request;
if (!!_cache){
_cache.bind.unshift(this);
_cache.timer = window.clearTimeout(_cache.timer);
}else{
_request = this.__getRequest();
_cache = {request:_request,bind:[this]};
this.__setLoadData(this.__url,_cache);
_v._$addEvent(
_request,'load',
this.__onLoaded._$bind(this)
);
_v._$addEvent(
_request,'error',
this.__onError._$bind(this,{
code:_g._$CODE_ERRSERV,
message:'无法加载指定资源文件['+this.__url+']！'
})
);
}
if (this.__timeout!=0){
_cache.timer = window.setTimeout(
this.__onError._$bind(this,{
code:_g._$CODE_TIMEOUT,
message:'指定资源文件['+this.__url+']载入超时！'
}),
this.__timeout||_timeout
);
}
if (!!_request){
this.__doRequest(_request);
}
this._$dispatchEvent('onloading');
};
/**
* 队列载入资源
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/loader/html.js'
* ],function(_t){
*     var _loader = _t._$$LoaderHtml._$allocate({
*         onload:function(){
*             // 载入队列资源成功的回调
*         }
*     });
*     // 路径列表，可以是绝对路径也可以是当前页面的相对路径
*     var _list = [
*         '../../../html/util/formTest.html',
*         '../../../html/util/cacheTest.html'
*     ];
*     _loader._$queue(_list);
* });
* ```
*
* @method module:util/ajax/loader/loader._$$LoaderAbstract#_$queue
* @param  {Array} arg0 - 资源地址队列
* @return {Void}
*/
_pro._$queue = function(_list){
if (!_list||!_list.length){
this._$dispatchEvent('onerror',{
code:_g._$CODE_NOTASGN,
message:'请指定要载入的资源队列！'
});
return;
}
this.__key = _u._$uniqueID();
var _cache = {error:0,loaded:0,total:_list.length};
this.__setLoadData(this.__key,_cache);
_u._$forEach(
_list,function(v,i){
if (!v){
_cache.total--;
return;
}
this.__doLoadQueue(v);
},this
);
this._$dispatchEvent('onloading');
};
return _p;
},7,1,13,3,2,20);
I$(43,function (NEJ,_u,_p,_o,_f,_r){
/**
* 设置或者获取cookie
*
* * 没有输入第二个参数则表示返回已有cookie
* * 如果cookie值为空字符串则表示删除cookie
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'util/cookie'
*   ],function(_j){
*       // 设置cookie的name=abc
*       var _cookie = _j._$cookie('name','abc');
*       _j._$cookie('name',{value:'abc'});
*
*       // 设置路径，domain(如果domain不同域，cookie设置不会成功),设置过期时间1天;
*       var _cookie = _j._$cookie('name',{
*           value:'abc',
*           path:'/a/',
*           domain:'www.163.com',
*           expires:1
*       });
*
*       // 删除cookie
*       _j._$cookie('name','');
*       _j._$cookie('name',{expires:-1});
*   });
* ```
*
* @method   module:util/cache/cookie._$cookie
* @param    {String}        arg0    - cookie名称
* @param    {String|Object} arg1    - cookie值，如果有其他配置信息输入对象，已处理属性包括
* @property {String}        value   - cookie值
* @property {String}        path    - 路径
* @property {String}        domain  - 域名，当前域或者当前域的父域
* @property {Number}        expires - 过期时间偏移，单位天，负值表示删除cookie
* @return   {String}                  cookie值
*/
_p._$cookie = (function(){
var _date = new Date(),
_crut = +_date,   // current time milliseconds
_days = 86400000; // milliseconds of one day
var _getcookie = function(_name){
var _cookie = document.cookie,
_search = '\\b'+_name+'=',
_index1 = _cookie.search(_search);
if (_index1<0) return '';
_index1 += _search.length-2;
var _index2 = _cookie.indexOf(';',_index1);
if (_index2<0) _index2 = _cookie.length;
return _cookie.substring(_index1,_index2)||'';
};
return function(_name,_data){
if (_data===undefined){
return _getcookie(_name);
}
if (_u._$isString(_data)){
if (!!_data){
document.cookie = _name+'='+_data+';';
return _data;
}
_data = {expires:-100};
}
_data = _data||_o;
var _cookie = _name+'='+(_data.value||'')+';';
delete _data.value;
if (_data.expires!==undefined){
_date.setTime(_crut+_data.expires*_days);
_data.expires = _date.toGMTString();
}
_cookie += _u._$object2string(_data,';');
document.cookie = _cookie;
};
})();
if (CMPT){
NEJ.copy(NEJ.P('nej.j'),_p);
}
return _p;
},7,2);
/*! JSON v3.2.5 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
;(function(){var o=!0,w=null;
(function(B){function v(a){if("bug-string-char-index"==a)return"a"!="a"[0];var f,c="json"==a;if(c||"json-stringify"==a||"json-parse"==a){if("json-stringify"==a||c){var d=k.stringify,b="function"==typeof d&&l;if(b){(f=function(){return 1}).toJSON=f;try{b="0"===d(0)&&"0"===d(new Number)&&'""'==d(new String)&&d(m)===r&&d(r)===r&&d()===r&&"1"===d(f)&&"[1]"==d([f])&&"[null]"==d([r])&&"null"==d(w)&&"[null,null,null]"==d([r,m,w])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==d({a:[f,o,!1,w,"\x00\u0008\n\u000c\r\t"]})&&
"1"===d(w,f)&&"[\n 1,\n 2\n]"==d([1,2],w,1)&&'"-271821-04-20T00:00:00.000Z"'==d(new Date(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==d(new Date(864E13))&&'"-000001-01-01T00:00:00.000Z"'==d(new Date(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==d(new Date(-1))}catch(n){b=!1}}if(!c)return b}if("json-parse"==a||c){a=k.parse;if("function"==typeof a)try{if(0===a("0")&&!a(!1)){f=a('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');var e=5==f.a.length&&1===f.a[0];if(e){try{e=!a('"\t"')}catch(g){}if(e)try{e=
1!==a("01")}catch(i){}}}}catch(O){e=!1}if(!c)return e}return b&&e}}var m={}.toString,p,C,r,D=typeof define==="function"&&define.amd,k="object"==typeof exports&&exports;k||D?"object"==typeof JSON&&JSON?k?(k.stringify=JSON.stringify,k.parse=JSON.parse):k=JSON:D&&(k=B.JSON={}):k=B.JSON||(B.JSON={});var l=new Date(-3509827334573292);try{l=-109252==l.getUTCFullYear()&&0===l.getUTCMonth()&&1===l.getUTCDate()&&10==l.getUTCHours()&&37==l.getUTCMinutes()&&6==l.getUTCSeconds()&&708==l.getUTCMilliseconds()}catch(P){}if(!v("json")){var s=
v("bug-string-char-index");if(!l)var t=Math.floor,J=[0,31,59,90,120,151,181,212,243,273,304,334],z=function(a,f){return J[f]+365*(a-1970)+t((a-1969+(f=+(f>1)))/4)-t((a-1901+f)/100)+t((a-1601+f)/400)};if(!(p={}.hasOwnProperty))p=function(a){var f={},c;if((f.__proto__=w,f.__proto__={toString:1},f).toString!=m)p=function(a){var f=this.__proto__,a=a in(this.__proto__=w,this);this.__proto__=f;return a};else{c=f.constructor;p=function(a){var f=(this.constructor||c).prototype;return a in this&&!(a in f&&
this[a]===f[a])}}f=w;return p.call(this,a)};var K={"boolean":1,number:1,string:1,undefined:1};C=function(a,f){var c=0,b,h,n;(b=function(){this.valueOf=0}).prototype.valueOf=0;h=new b;for(n in h)p.call(h,n)&&c++;b=h=w;if(c)c=c==2?function(a,f){var c={},b=m.call(a)=="[object Function]",d;for(d in a)!(b&&d=="prototype")&&!p.call(c,d)&&(c[d]=1)&&p.call(a,d)&&f(d)}:function(a,f){var c=m.call(a)=="[object Function]",b,d;for(b in a)!(c&&b=="prototype")&&p.call(a,b)&&!(d=b==="constructor")&&f(b);(d||p.call(a,
b="constructor"))&&f(b)};else{h=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];c=function(a,f){var c=m.call(a)=="[object Function]",b,d;if(d=!c)if(d=typeof a.constructor!="function"){d=typeof a.hasOwnProperty;d=d=="object"?!!a.hasOwnProperty:!K[d]}d=d?a.hasOwnProperty:p;for(b in a)!(c&&b=="prototype")&&d.call(a,b)&&f(b);for(c=h.length;b=h[--c];d.call(a,b)&&f(b));}}c(a,f)};if(!v("json-stringify")){var L={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",
10:"\\n",13:"\\r",9:"\\t"},u=function(a,f){return("000000"+(f||0)).slice(-a)},G=function(a){var f='"',b=0,d=a.length,h=d>10&&s,n;for(h&&(n=a.split(""));b<d;b++){var e=a.charCodeAt(b);switch(e){case 8:case 9:case 10:case 12:case 13:case 34:case 92:f=f+L[e];break;default:if(e<32){f=f+("\\u00"+u(2,e.toString(16)));break}f=f+(h?n[b]:s?a.charAt(b):a[b])}}return f+'"'},E=function(a,b,c,d,h,n,e){var g=b[a],i,j,k,l,q,s,v,x,y;try{g=b[a]}catch(A){}if(typeof g=="object"&&g){i=m.call(g);if(i=="[object Date]"&&
!p.call(g,"toJSON"))if(g>-1/0&&g<1/0){if(z){k=t(g/864E5);for(i=t(k/365.2425)+1970-1;z(i+1,0)<=k;i++);for(j=t((k-z(i,0))/30.42);z(i,j+1)<=k;j++);k=1+k-z(i,j);l=(g%864E5+864E5)%864E5;q=t(l/36E5)%24;s=t(l/6E4)%60;v=t(l/1E3)%60;l=l%1E3}else{i=g.getUTCFullYear();j=g.getUTCMonth();k=g.getUTCDate();q=g.getUTCHours();s=g.getUTCMinutes();v=g.getUTCSeconds();l=g.getUTCMilliseconds()}g=(i<=0||i>=1E4?(i<0?"-":"+")+u(6,i<0?-i:i):u(4,i))+"-"+u(2,j+1)+"-"+u(2,k)+"T"+u(2,q)+":"+u(2,s)+":"+u(2,v)+"."+u(3,l)+"Z"}else g=
w;else if(typeof g.toJSON=="function"&&(i!="[object Number]"&&i!="[object String]"&&i!="[object Array]"||p.call(g,"toJSON")))g=g.toJSON(a)}c&&(g=c.call(b,a,g));if(g===w)return"null";i=m.call(g);if(i=="[object Boolean]")return""+g;if(i=="[object Number]")return g>-1/0&&g<1/0?""+g:"null";if(i=="[object String]")return G(""+g);if(typeof g=="object"){for(a=e.length;a--;)if(e[a]===g)throw TypeError();e.push(g);x=[];b=n;n=n+h;if(i=="[object Array]"){j=0;for(a=g.length;j<a;y||(y=o),j++){i=E(j,g,c,d,h,n,
e);x.push(i===r?"null":i)}a=y?h?"[\n"+n+x.join(",\n"+n)+"\n"+b+"]":"["+x.join(",")+"]":"[]"}else{C(d||g,function(a){var b=E(a,g,c,d,h,n,e);b!==r&&x.push(G(a)+":"+(h?" ":"")+b);y||(y=o)});a=y?h?"{\n"+n+x.join(",\n"+n)+"\n"+b+"}":"{"+x.join(",")+"}":"{}"}e.pop();return a}};k.stringify=function(a,b,c){var d,h,j;if(typeof b=="function"||typeof b=="object"&&b)if(m.call(b)=="[object Function]")h=b;else if(m.call(b)=="[object Array]"){j={};for(var e=0,g=b.length,i;e<g;i=b[e++],(m.call(i)=="[object String]"||
m.call(i)=="[object Number]")&&(j[i]=1));}if(c)if(m.call(c)=="[object Number]"){if((c=c-c%1)>0){d="";for(c>10&&(c=10);d.length<c;d=d+" ");}}else m.call(c)=="[object String]"&&(d=c.length<=10?c:c.slice(0,10));return E("",(i={},i[""]=a,i),h,j,d,"",[])}}if(!v("json-parse")){var M=String.fromCharCode,N={92:"\\",34:'"',47:"/",98:"\u0008",116:"\t",110:"\n",102:"\u000c",114:"\r"},b,A,j=function(){b=A=w;throw SyntaxError();},q=function(){for(var a=A,f=a.length,c,d,h,k,e;b<f;){e=a.charCodeAt(b);switch(e){case 9:case 10:case 13:case 32:b++;
break;case 123:case 125:case 91:case 93:case 58:case 44:c=s?a.charAt(b):a[b];b++;return c;case 34:c="@";for(b++;b<f;){e=a.charCodeAt(b);if(e<32)j();else if(e==92){e=a.charCodeAt(++b);switch(e){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:c=c+N[e];b++;break;case 117:d=++b;for(h=b+4;b<h;b++){e=a.charCodeAt(b);e>=48&&e<=57||e>=97&&e<=102||e>=65&&e<=70||j()}c=c+M("0x"+a.slice(d,b));break;default:j()}}else{if(e==34)break;e=a.charCodeAt(b);for(d=b;e>=32&&e!=92&&e!=34;)e=a.charCodeAt(++b);
c=c+a.slice(d,b)}}if(a.charCodeAt(b)==34){b++;return c}j();default:d=b;if(e==45){k=o;e=a.charCodeAt(++b)}if(e>=48&&e<=57){for(e==48&&(e=a.charCodeAt(b+1),e>=48&&e<=57)&&j();b<f&&(e=a.charCodeAt(b),e>=48&&e<=57);b++);if(a.charCodeAt(b)==46){for(h=++b;h<f&&(e=a.charCodeAt(h),e>=48&&e<=57);h++);h==b&&j();b=h}e=a.charCodeAt(b);if(e==101||e==69){e=a.charCodeAt(++b);(e==43||e==45)&&b++;for(h=b;h<f&&(e=a.charCodeAt(h),e>=48&&e<=57);h++);h==b&&j();b=h}return+a.slice(d,b)}k&&j();if(a.slice(b,b+4)=="true"){b=
b+4;return o}if(a.slice(b,b+5)=="false"){b=b+5;return false}if(a.slice(b,b+4)=="null"){b=b+4;return w}j()}}return"$"},F=function(a){var b,c;a=="$"&&j();if(typeof a=="string"){if((s?a.charAt(0):a[0])=="@")return a.slice(1);if(a=="["){for(b=[];;c||(c=o)){a=q();if(a=="]")break;if(c)if(a==","){a=q();a=="]"&&j()}else j();a==","&&j();b.push(F(a))}return b}if(a=="{"){for(b={};;c||(c=o)){a=q();if(a=="}")break;if(c)if(a==","){a=q();a=="}"&&j()}else j();(a==","||typeof a!="string"||(s?a.charAt(0):a[0])!="@"||
q()!=":")&&j();b[a.slice(1)]=F(q())}return b}j()}return a},I=function(a,b,c){c=H(a,b,c);c===r?delete a[b]:a[b]=c},H=function(a,b,c){var d=a[b],h;if(typeof d=="object"&&d)if(m.call(d)=="[object Array]")for(h=d.length;h--;)I(d,h,c);else C(d,function(a){I(d,a,c)});return c.call(a,b,d)};k.parse=function(a,f){var c,d;b=0;A=""+a;c=F(q());q()!="$"&&j();b=A=w;return f&&m.call(f)=="[object Function]"?H((d={},d[""]=c,d),"",f):c}}}D&&define(function(){return k})})(this);return JSON;
}());
I$(45,function(_m,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[0])._$KERNEL;if (_k_.engine=='trident'&&_k_.release=='2.0'){(function (){
// eval for big string
JSON.parse = (function(){
// check save json string
// http://www.ietf.org/rfc/rfc4627.txt
var _isSafeJSON = function(_content){
return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
_content.replace(/"(\\.|[^"\\])*"/g,'')
));
};
return JSON.parse._$aop(function(_event){
var _str = _event.args[0]||'';
if (_str.length>=500000){  // &&_isSafeJSON(_str)
_event.stopped = !0;
_event.value = eval('('+_str+')');
}
});
})();
})();};return JSON;
},10,46);
I$(44,function (){return JSON;},45);
I$(41,function (_k,_u,_e,_c,_g,_t,_j,JSON,_p,_o,_f,_r){
var _pro;
/**
* Ajax代理对象
*
* @class   module:util/ajax/proxy/proxy._$$ProxyAbstract
* @extends module:util/event._$$EventTarget
*
* @param    {Object}  config  - 构造配置参数
* @property {String}  url     - 请求地址
* @property {Boolean} sync    - 是否同步请求
* @property {String}  type    - 返回数据格式,text/json/xml
* @property {String}  method  - 请求方式,GET/POST
* @property {Number}  timeout - 超时时间,0表示禁止超时监测
* @property {Object}  headers - 头信息
*/
/**
* 载入回调
*
* @event module:util/ajax/proxy/proxy._$$ProxyAbstract#onload
* @param {Object} event - 服务器返回数据信息
*/
/**
* 异常回调
*
* @event    module:util/ajax/proxy/proxy._$$ProxyAbstract#onerror
* @param    {Object}   event   - 错误信息
* @property {Number}   code    - 错误代码
* @property {String}   message - 错误描述
* @property {Variable} data    - 出错时携带数据
*/
/**
* [hr]
* 请求之前对数据处理回调
* @event    module:util/ajax/proxy/proxy._$$ProxyAbstract#onbeforerequest
* @param    {Object} event   - 请求信息
* @property {Object} request - 请求参数，数据信息 url/sync/cookie/type/method/timeout
* @property {Object} headers - 请求头信息
*/
_p._$$ProxyAbstract = _k._$klass();
_pro = _p._$$ProxyAbstract._$extend(_t._$$EventTarget);
/**
* 控件重置
*
* @protected
* @method module:util/ajax/proxy/proxy._$$ProxyAbstract#__reset
* @param  {Object} arg0 - 配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
// reset request information
this.__request = _u._$fetch({
url:'',
sync:!1,
cookie:!1,
type:'text',
method:'GET',
timeout:60000
},_options);
// for csrf attack
var _csrf = _c._$get('csrf');
if (!!_csrf.cookie&&!!_csrf.param){
var _query = encodeURIComponent(_csrf.param)+'='+
encodeURIComponent(_j._$cookie(_csrf.cookie)||''),
_split = this.__request.url.indexOf('?')<0?'?':'&';
this.__request.url += _split+_query;
}
// reset headers
this.__headers = _options.headers||{};
var _content = this.__headers[_g._$HEAD_CT];
if (_content==null){
this.__headers[_g._$HEAD_CT] = _g._$HEAD_CT_FORM;
}
};
/**
* 回收控件
*
* @protected
* @method module:util/ajax/proxy/proxy._$$ProxyAbstract#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
delete this.__rkey;
delete this.__request;
delete this.__headers;
};
/**
* 请求载入回调
*
* @protected
* @method   module:util/ajax/proxy/proxy._$$ProxyAbstract#__onLoadRequest
* @param    {Object} arg0   - 数据信息
* @property {Number} status - 请求状态
* @property {String} result - 请求结果，纯文本形式
* @return   {Void}
*/
_pro.__onLoadRequest = function(_event){
var _status = _event.status;
// timeout error
if (_status==-1){
this._$dispatchEvent('onerror',{
code:_g._$CODE_TIMEOUT,
message:'请求['+this.__request.url+']超时！'
});
return;
}
// check status
if ((''+_status).indexOf('2')!=0){
this._$dispatchEvent('onerror',{
data:_status,
result:_event.result,
code:_g._$CODE_ERRSERV,
message:'服务器返回异常状态['+_status+']!'
});
return;
}
// onload
this._$dispatchEvent(
'onload',_e._$text2type(
_event.result,
this.__request.type
)
);
};
/**
* 往服务器发送请求，子类实现具体业务逻辑
*
* @abstract
* @method module:util/ajax/proxy/proxy._$$ProxyAbstract#__doSendRequest
* @param  {Object} arg0 - 请求信息
* @return {Void}
*/
_pro.__doSendRequest = _f;
/**
* 取头信息，子类实现具体业务逻辑
*
* @abstract
* @method module:util/ajax/proxy/proxy._$$ProxyAbstract#__getResponseHeader
* @param  {String} arg0 - 要取的头信息名称
* @return {String}        头信息结果或集合
*/
_pro.__getResponseHeader = _f;
/**
* 发送请求
*
* @method module:util/ajax/proxy/proxy._$$ProxyAbstract#_$send
* @param  {Variable} arg0 - 要发送的数据
* @return {Void}
*/
_pro._$send = function(_data){
var _url = this.__request.url;
if (!_url){
this._$dispatchEvent('onerror',{
code:_g._$CODE_NOTASGN,
message:'没有输入请求地址！'
});
return;
}
try{
this.__request.data = _data==null?null:_data;
var _event = {
request:this.__request,
headers:this.__headers
};
// adjust param before request
try{
this._$dispatchEvent('onbeforerequest',_event);
}catch(ex){
// ignore exception
console.error(ex.message);
console.error(ex.stack);
}
this.__doSendRequest(_event);
}catch(e){
this._$dispatchEvent('onerror',{
code:_g._$CODE_ERRSERV,
message:'请求['+_url+']失败:'+e.message+'！'
});
}
};
/**
* 中断请求，子类实现具体业务逻辑
*
* @abstract
* @method module:util/ajax/proxy/proxy._$$ProxyAbstract#_$abort
* @return {Void}
*/
_pro._$abort = _f;
/**
* 取头信息
*
* @method module:util/ajax/proxy/proxy._$$ProxyAbstract#_$header
* @param  {String|Array}  arg0 - 要取的头信息名称
* @return {String|Object}        头信息结果或集合
*/
_pro._$header = function(_key){
if (!_u._$isArray(_key)){
return this.__getResponseHeader(_key)||'';
}
var _result = {};
_u._$forEach(
_key,function(_value){
_result[_value] = this._$header(_value);
},this
);
return _result;
};
return _p;
},1,2,4,15,13,20,43,44);
I$(47,function (_p,_o,_f,_r){
/**
* 取XHR对象
* @return {XMLHttpRequest} XHR对象
*/
_p.__getXMLHttpRequest = function(){
return new XMLHttpRequest();
};
return _p;
});
I$(42,function(_h,_u,_p_,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[2])._$KERNEL;if (_k_.engine=='trident'&&_k_.release<='2.0'){(function (){
/**
* 取XHR对象
* @return {XMLHttpRequest} XHR对象
*/
_h.__getXMLHttpRequest = (function(){
// http://blogs.msdn.com/b/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
var _msxml = [
'Msxml2.XMLHTTP.6.0',
'Msxml2.XMLHTTP.3.0',
'Msxml2.XMLHTTP.4.0',
'Msxml2.XMLHTTP.5.0',
'MSXML2.XMLHTTP',
'Microsoft.XMLHTTP'
];
return function(){
var _xhr = null;
_u._$forIn(
_msxml,function(_name){
try{
_xhr = new ActiveXObject(_name);
return !0;
}catch(e){
// ignore exception
}
}
);
return _xhr;
};
})();
})();};return _h;
},47,2,10);
I$(39,function (_t,_u,_k,_g,_h,_p,_o,_f,_r){
var _pro;
/**
* Ajax代理对象
*
* @class   module:util/ajax/proxy/xhr._$$ProxyXHR
* @extends module:util/ajax/proxy/proxy._$$ProxyAbstract
*
* @param   {Object} config - 构造配置参数
*/
_p._$$ProxyXHR = _k._$klass();
_pro = _p._$$ProxyXHR._$extend(_t._$$ProxyAbstract);
/**
* 控件销毁
*
* @protected
* @method module:util/ajax/proxy/xhr._$$ProxyXHR#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
// clear timeout
window.clearTimeout(this.__timer);
delete this.__timer;
// clear request
try{
this.__xhr.onreadystatechange = _f;
this.__xhr.abort();
}catch(e){
// ignore
}
delete this.__xhr;
};
/**
* 往服务器发送请求
*
* @protected
* @method module:util/ajax/proxy/xhr._$$ProxyXHR#__doSendRequest
* @param  {Object} arg0 - 请求信息
* @return {Void}
*/
_pro.__doSendRequest = (function(){
// set header
var _doSetHeader = function(_value,_key){
this.__xhr.setRequestHeader(_key,_value);
};
// split input.file for multiple files
var _doSplitMultFiles = function(_form){
var _result = [];
_u._$reverseEach(
_form.getElementsByTagName('input'),
function(_input){
if (_input.type!='file'){
return;
}
// remove file without name
if (!_input.name){
_input.parentNode.removeChild(_input);
return;
}
// for multiple file per-input
if (_input.files.length>1){
_u._$forEach(_input.files,function(_file){
_result.push({name:_input.name,file:_file});
});
_input.parentNode.removeChild(_input);
}
}
);
return _result.length>0?_result:null;
};
return function(_options){
var _request = _options.request,
_headers = _options.headers;
this.__xhr = _h.__getXMLHttpRequest();
// add event listener
// upload progress
if (_headers[_g._$HEAD_CT]===_g._$HEAD_CT_FILE){
delete _headers[_g._$HEAD_CT];
this.__xhr.upload.onprogress =
this.__onStateChange._$bind(this,1);
if (_request.data.tagName==='FORM'){
var _files = _doSplitMultFiles(_request.data);
_request.data = new FormData(_request.data);
_u._$forEach(_files,function(_ret){
var _file = _ret.file;
_request.data.append(
_ret.name||_file.name||
('file-'+_u._$uniqueID()),_file
);
});
}
}
// state change
this.__xhr.onreadystatechange =
this.__onStateChange._$bind(this,2);
// timeout
if (_request.timeout!==0){
this.__timer = window.setTimeout(
this.__onStateChange._$bind(this,3),
_request.timeout
);
}
// prepare and send request
this.__xhr.open(
_request.method,
_request.url,
!_request.sync
);
_u._$loop(_headers,_doSetHeader,this);
// support credential
if (!!this.__request.cookie&&
('withCredentials' in this.__xhr)){
this.__xhr.withCredentials = !0;
}
this.__xhr.send(_request.data);
};
})();
/**
* 请求状态变化事件
*
* @protected
* @method module:util/ajax/proxy/xhr._$$ProxyXHR#__onStateChange
* @param  {Number} arg0 - 状态变化类型
* @return {Void}
*/
_pro.__onStateChange = function(_type){
switch(_type){
// upload progress
case 1 :
this._$dispatchEvent('onuploading',arguments[1]);
break;
// state change
case 2 :
if (this.__xhr.readyState==4){
this.__onLoadRequest({
status:this.__xhr.status,
result:this.__xhr.responseText||''
});
}
break;
// timeout
case 3:
this.__onLoadRequest({status:-1});
break;
}
};
/**
* 取头信息
*
* @protected
* @method module:util/ajax/proxy/xhr._$$ProxyXHR#__getResponseHeader
* @param  {String} arg0 - 要取的头信息名称
* @return {String}        头信息结果或集合
*/
_pro.__getResponseHeader = function(_key){
return !this.__xhr?'':this.__xhr.getResponseHeader(_key);
};
/**
* 中断请求
*
* @method module:util/ajax/proxy/xhr._$$ProxyXHR#_$abort
* @return {Void}
*/
_pro._$abort = function(){
this.__onLoadRequest({status:0});
};
return _p;
},41,2,1,13,42);
I$(57,function (_m,_p,_o,_f,_r){
var _this = this,
_prefix = _m._$KERNEL.prefix.pro,
_fps = _m._$is('desktop')?80:(_m._$is('ios')?50:30);
/**
* 请求动画
* @param  {Function} 动画回调
* @return {String}   动画标识
*/
_p.__requestAnimationFrame = (function(){
var _handler = _m._$is('android')?null:(
_this.requestAnimationFrame||
_this[_prefix+'RequestAnimationFrame']
);
return function(){
if (!_handler){
_handler = function(_callback){
return window.setTimeout(
function(){
try{_callback(+new Date);}catch(ex){}
},1000/_fps
);
};
}
return _handler.apply(this,arguments);
};
})();
/**
* 取消动画
* @param  {String} 动画标识
* @return {Void}
*/
_p.__cancelAnimationFrame = (function(){
var _handler = _m._$is('android')?null:(
_this.cancelAnimationFrame||
_this[_prefix+'CancelAnimationFrame']
);
return function(){
if (!_handler){
_handler = function(_id){
window.clearTimeout(_id);
};
}
return _handler.apply(this,arguments);
};
})();
return _p;
},10);
I$(56,function (_h,_m){
return _h;
},57,10);
I$(53,function (_m,_h,_p,_o,_f,_r){
/**
* 请求动画
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/timer/animation'
* ],function(_p){
*     // 桌面端一秒钟调用12.5次，ios端没秒调用20次，否则调用33次
*     var _id  = _p.requestAnimationFrame(
*         function(_time){
*             console.log(_time);
*         }
*     );
* });
* ```
*
* @method module:util/timer/animation.requestAnimationFrame
* @param  {Function} arg0 - 动画回调
* @return {String}          动画标识
*/
_p.requestAnimationFrame = function(){
_h.__requestAnimationFrame.apply(null,arguments);
};
/**
* 取消动画
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/timer/animation'
* ],function(_p){
*     var _id  = _p.requestAnimationFrame(
*         function(_time){
*             console.log(_time);
*         }
*     );
*     // 停止掉时钟
*     _p.cancelAnimationFrame(_id);
* });
* ```
*
* @method module:util/timer/animation.cancelAnimationFrame
* @param  {String} arg0 - 动画标识
* @return {Void}
*/
_p.cancelAnimationFrame = function(){
_h.__cancelAnimationFrame.apply(null,arguments);
};
if (CMPT){
if (!this.requestAnimationFrame){
this.requestAnimationFrame = _p.requestAnimationFrame;
}
if (!this.cancelAnimationFrame){
this.cancelAnimationFrame = _p.cancelAnimationFrame;
}
}
return _p;
},10,56);
I$(58,function (_m,_p,_o,_f,_r){
/**
* 判断是否需要对Flash事件做代理，
* 主要fix flash上的鼠标事件没法响应到DOM节点上的问题
* @return {Boolean} 是否做代理
*/
_p.__canFlashEventBubble = function(_wmode){
return (_wmode||'').toLowerCase()!='transparent';
};
return _p;
},10);
I$(54,function(_h,_m,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[1])._$KERNEL;if (_k_.engine=='trident'){(function (){
/**
* 判断是否需要对Flash事件做代理，
* 主要fix flash上的鼠标事件没法响应到DOM节点上的问题
* @return {Boolean} 是否做代理
*/
_h.__canFlashEventBubble = function(_wmode){
return !0;
};
})();}
if (_k_.engine=='webkit'){(function (){
/**
* 判断是否需要对Flash事件做代理，
* 主要fix flash上的鼠标事件没法响应到DOM节点上的问题
* @return {Boolean} 是否做代理
*/
_h.__canFlashEventBubble = function(_wmode){
return !0;
};
})();};return _h;
},58,10);
I$(55,"{var hide  = defined(\"hidden\")&&!!hidden} {var param = defined(\"params\")&&params||NEJ.O} {var width = !hide?width:\"1px\",height = !hide?height:\"1px\"} {if hide}<div style=\"position:absolute;top:0;left:0;width:1px;height:1px;z-index:10000;overflow:hidden;\">{/if} <object classid = \"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\"         codebase = \"http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab\"         width = \"${width|default:\"100px\"}\"         height = \"${height|default:\"100px\"}\" id=\"${id}\">     <param value=\"${src}\" name=\"movie\">     {for x in param}     <param value=\"${x}\" name=\"${x_key}\"/>     {/for}     <embed src=\"${src}\" name=\"${id}\"            width=\"${width|default:\"100px\"}\"            height=\"${height|default:\"100px\"}\"            pluginspage=\"http://www.adobe.com/go/getflashplayer\"            type=\"application/x-shockwave-flash\"            {for x in param}${x_key}=\"${x}\" {/for}></embed> </object> {if hide}</div>{/if}");
I$(52,function (NEJ,_e,_v,_u,_t0,_t1,_h,_html,_p,_o,_f,_r){
var _seed_html = _t0._$add(_html);
/**
* 页面嵌入flash，NEJ嵌入Flash如果需要同JS交互的遵循以下规则
*
*  1. Flash对象提供JS可访问接口 inited （返回Boolean值）
*  2. 如果Flash未初始化完成inited返回为false
*  3. 如果Flash初始化完成inited返回为true
*  4. inited返回true表示Flash已完成所有初始化，此时JS可调用Flash的API
*
* Flash事件规则
*
*  1. JS中使用window.onflashevent监听flash中的事件（此步骤NEJ已封装）
*  2. Flash通过flashvars参数输入当前flash的ID，如 &lt;param name="flashvars" value="id=ab&a=b"/&gt;
*  3. Flash在需要触发事件时调用window.onflashevent回调函数，并输入一个Object作为参数,Object信息包括
*     type   [String] - 鼠标事件类型，如click/mouseover/mouseout/play/pause...
*     target [String] - 触发事件的flash标识，通过flashvars参数输入的id参数，做了encodeURIComponent，如a%23b
*     ...
*
* 结构举例
* ```html
* <div id='flash'></div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/flash/flash'
* ],function(_e){
*     // 生成flash对象，可以设置宽高，地址，父节点，flash参数在params中设置
*     // flash需要提供inited接口，返回falsh已经准备好的状态
*     _e._$flash({
*         src:'../../qunit/res/FlexChart.swf',
*         hidden:false,
*         parent:'flash',
*         width:900,
*         height:600,
*         params:{
*             flashvars:'',
*             wmode:'transparent',
*             allowscriptaccess:'always'
*         },
*         onready:function(_flash){
*             // 返回准备好的flash对象
*             // 如果没有传入flash对象则表示无法识别到flash
*         },
*         oncustom:function(_event){
*             // 自定义事件需Flash同JS预先协定好自定义事件名称，如这里的oncustom
*             // Flash中通过调用JS的window.onflashevent({id:2222,type:'custom',...})调入此回调
*         }
*     });
* });
* ```
*
* @method   module:util/flash/flash._$flash
* @param    {Object}      arg0    - 可选配置参数
* @property {String}      src     - Flash文件地址，必须指定地址
* @property {Boolean}     hidden  - Flash是否不可见
* @property {Number}      width   - Flash显示宽度，设为不可见时可以不设此参数
* @property {Number}      height  - Flash显示高度，设为不可见时可以不设此参数
* @property {String|Node} parent  - 容器节点，默认为document.body
* @property {Object}      params  - 设置参数，object标签中的param标签参数
* @property {String|Node} target  - 触发事件的源节点
* @property {Function}    onready - Flash初始化完毕触发事件，输入可交互的Flash对象
* @return   {Void}
*/
_p._$flash = (function(){
var _cache = {},_title,
_reg0 = /^(?:mouse.*|(?:dbl)?click)$/i;
// flash event
window.onflashevent = function(_event){
var _id = decodeURIComponent(_event.target),
_type = _event.type.toLowerCase();
// check mouse event bubble
var _target = _cache[_id+'-tgt'];
if (!!_target&&_reg0.test(_type)){
_doMouseEventBubble(
_target,_event
);
}
// check id-type handler
var _handler = _cache[_id+'-on'+_type];
if (!!_handler){
var _result = '';
try{
_result = _handler(_event);
}catch(e){
// ignore
}
return _result;
}
};
// append flash element
var _doInitDOM = function(_options){
// bugfix for ie title with flash
_title = document.title;
var _parent = _e._$get(_options.parent)||document.body,
_html = _t0._$get(_seed_html,_options);
_parent.insertAdjacentHTML(
!_options.hidden?'beforeEnd':'afterBegin',_html
);
};
// listen flash mouse event
var _doMouseEventBubble = function(_id,_event){
var _type = _event.type.toLowerCase();
_t1.requestAnimationFrame(function(){
_v._$dispatchEvent(_id,_type);
});
};
// check flash init state
var _doCheckFlashInit = function(_flash){
return !!_flash&&!!_flash.inited&&!!_flash.inited();
};
var _doCheckFlash = function(_id){
var _arr = [document.embeds[_id],
_e._$get(_id),document[_id],window[_id]],
_index = _u._$forIn(_arr,_doCheckFlashInit),
_flash = _arr[_index],
_ctkey = _id+'-count';
_cache[_ctkey]++;
if (!!_flash||_cache[_ctkey]>100){
if (!!_title){
document.title = _title;
_title = null;
}
_cache[_id](_flash);
delete _cache[_id];
delete _cache[_ctkey];
return;
}
window.setTimeout(_doCheckFlash._$bind(null,_id),300);
};
// init flash event
var _doInitFlashEvent = function(_options){
// init flash vars
var _id = _options.id,
_params = _options.params;
if (!_params){
_params = {};
_options.params = _params;
}
var _vars = _params.flashvars||'';
_vars += (!_vars?'':'&')+('id='+_id);
// delegate mouse event bubble
if (!_options.hidden&&(!!_options.target||
_h.__canFlashEventBubble(_params.wmode))){
var _tid = _e._$id(_options.target)||
_e._$id(_options.parent);
_cache[_id+'-tgt'] = _tid;
}
_params.flashvars = _vars;
// check event callback
_u._$loop(_options,function(_value,_key){
if (_u._$isFunction(_value)&&_key!='onready'){
_cache[_id+'-'+_key] = _value;
}
});
};
return function(_options){
_options = NEJ.X({},_options);
if (!_options.src) return;
var _id = '_'+_u._$uniqueID();
_options.id = _id;
// delegate event
_doInitFlashEvent(_options);
// append flash
_doInitDOM(_options);
// check flash ready
if (!_options.onready) return;
_cache[_id] = _options.onready;
_cache[_id+'-count'] = 0;
_doCheckFlash(_id);
};
})();
if (CMPT){
NEJ.copy(NEJ.P('nej.e'),_p);
}
return _p;
},7,4,3,2,29,53,54,55);
I$(49,function (_t,_k,_c,_u,_e,_p,_o,_f,_r){
var _pro,
_cache = {},
_seed = _u._$uniqueID();
/*
* 代理请求正常回调
* @param  {String} 请求标识
* @param  {String} 返回数据
* @return {Void}
*/
this['ld'+_seed] = function(_key,_text){
var _proxy = _cache[_key];
if (!_proxy) return;
delete _cache[_key];
_proxy.__onLoadRequest({
status:200,
result:_text
});
};
/*
* 代理请求异常回调
* @param  {String} 请求标识
* @param  {Number} 请求状态
* @return {Void}
*/
this['er'+_seed] = function(_key,_status){
var _proxy = _cache[_key];
if (!_proxy) return;
delete _cache[_key];
_proxy.__onLoadRequest({
status:_status||0
});
};
/**
* Flash代理方式Ajax请求对象
*
* @class   module:util/ajax/proxy/flash._$$ProxyFlash
* @extends module:util/ajax/proxy/proxy._$$ProxyAbstract
*
* @param   {Object}  config - 构造配置参数
*/
_p._$$ProxyFlash = _k._$klass();
_pro = _p._$$ProxyFlash._$extend(_t._$$ProxyAbstract);
/**
* 往服务器发送请求
*
* @protected
* @method module:util/ajax/proxy/flash._$$ProxyFlash#__doSendRequest
* @param  {Object} arg0 - 请求信息
* @return {Void}
*/
_pro.__doSendRequest = function(_options){
var _flash = _cache.flash;
// callback list
if (_u._$isArray(_flash)){
_flash.push(
this.__doSendRequest.
_$bind(this,_options)
);
return;
}
// build flash proxy
if (!_flash){
_cache.flash = [
this.__doSendRequest.
_$bind(this,_options)
];
_e._$flash({
hidden:!0,
src:_c._$get('ajax.swf'),
onready:function(_flash){
if (!_flash) return;
var _list = _cache.flash;
_cache.flash = _flash;
_u._$reverseEach(
_list,function(_handler,_index,_list){
try{
_handler();
}catch(ex){
// ignore
}
}
);
}
});
return;
}
// send request by flash
this.__rkey = _u._$uniqueID();
_cache[this.__rkey] = this;
var _data = _u._$fetch({
url:'',
data:null,
method:'GET'
},_options.request);
_data.key = this.__rkey;
_data.headers  = _options.headers;
_data.onerror  = 'cb.er'+_seed;
_data.onloaded = 'cb.ld'+_seed;
var _policy = _c._$getFlashProxy(_data.url);
if (!!_policy){
_data.policyURL = _policy;
}
_flash.request(_data);
};
/**
* 中断请求
*
* @method module:util/ajax/proxy/flash._$$ProxyFlash#_$abort
* @return {Void}
*/
_pro._$abort = function(){
delete _cache[this.__rkey];
this.__onLoadRequest({status:0});
};
return _p;
},41,1,15,2,52);
I$(61,function (_p,_o,_f,_r){
/**
* 格式化源信息
* @param  {String} 源
* @return {String} 格式化后源
*/
_p.__formatOrigin = (function(){
var _reg = /^([\w]+?:\/\/.*?(?=\/|$))/i;
return function(_origin){
_origin = _origin||'';
if (_reg.test(_origin)){
return RegExp.$1;
}
return '*';
};
})();
/**
* 解析消息传递数据
* @param  {Variable} 数据
* @return {Variable} 数据
*/
_p.__formatPassData = function(_data){
return _data;
};
/**
* 跨文档发送数据
* @param  {Window} 窗体对象
* @param  {Object} 发送配置
* @return {Void}
*/
_p.__postMessage = function(_window,_options){
if (!_window.postMessage){
return;
}
_options = _options||_o;
_window.postMessage(
_p.__formatPassData(_options.data),
_p.__formatOrigin(_options.origin)
);
};
return _p;
});
I$(60,function(_h,_u,_v,_p_,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[3])._$KERNEL;if (_k_.engine=='trident'&&'4.0'<=_k_.release&&_k_.release<='5.0'){(function (){
/**
* 解析消息传递数据
* @param  {Variable} 数据
* @return {Variable} 数据
*/
_h.__formatPassData = function(_data){
// ie8-9 only support string data
return JSON.stringify(_data);
};
})();}
if (_k_.engine=='trident'&&_k_.release<='3.0'){(function (_t){
var _key = 'MSG|',
_queue = [];
/*
* 检测window.name变化情况
* @return {Void}
*/
var _doCheckWindowName = function(){
// check name
var _name = unescape(window.name||'').trim();
if (!_name||_name.indexOf(_key)!=0) return;
window.name = '';
// check result
var _result = _u._$string2object(_name.replace(_key,''),'|'),
_origin = (_result.origin||'').toLowerCase();
// check origin
if (!!_origin&&_origin!='*'&&
location.href.toLowerCase().indexOf(_origin)!=0){
return;
}
// dispatch onmessage event
_v._$dispatchEvent(window,'message',{
data:JSON.parse(_result.data||'null'),
source:window.frames[_result.self]||_result.self,
origin:_h.__formatOrigin(_result.ref||document.referrer)
});
};
/*
* 检测window.name设置队列
* @return {Void}
*/
var _doCheckNameQueue = (function(){
var _checklist;
// set window.name
var _doSetWindowName = function(_map,_index,_list){
if (_u._$indexOf(_checklist,_map.w)<0){
_checklist.push(_map.w);
_list.splice(_index,1);
_map.w.name = _map.d;
}
};
return function(){
_checklist = [];
_u._$reverseEach(_queue,_doSetWindowName);
_checklist = null;
};
})();
/**
* 跨文档发送数据
* @param  {Window} 窗体对象
* @param  {Object} 发送配置
* @return {Void}
*/
_h.__postMessage = (function(){
// serialize send data
var _doSerialize = function(_data){
var _result = {};
_data = _data||_o;
_result.origin = _data.origin||'';
_result.ref  = location.href;
_result.self = _data.source;
_result.data = JSON.stringify(_data.data);
return _key+_u._$object2string(_result,'|',!0);
};
// function body
return function(_window,_options){
_queue.unshift({
w:_window,
d:escape(_doSerialize(_options))
});
};
})();
// init window onmessage event
_t._$$CustomEvent._$allocate({
element:window,
event:'message'
});
setInterval(_doCheckNameQueue,100);
setInterval(_doCheckWindowName,20);
})(I$(30),I$(44));};return _h;
},61,2,3,10,30,44);
I$(59,function (NEJ,_u,_e,_h,_p,_o,_f,_r){
/**
* 发送跨文档的消息
*
* 结构举例
* ```html
* <!-- 注意需要通过source进行双向交互的frame节点必须设置id属性作为标识 -->
* <iframe id="targetFrame" src="http://a.b.com/a.html"></iframe>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'base/event'
*     'util/ajax/message'
* ],function(_v,_j){
*     // top页面代码
*     // 发送消息至 http://c.d.com 的页面
*     _j._$postMessage('targetFrame',{
*         data:'hello c.d.com',
*         origin:'http://c.d.com'
*     });
*
*     // http://a.b.com/a.html页面代码
*     // 添加消息监测事件
*     _v._$addEvent(
*         window,'message',function(_event){
*             // 因为top页面发送消息到 http://c.d.com
*             // 所以在http://a.b.com页面不会收到任何消息
*         }
*     );
*
*     // top页面代码
*     // 发送消息至 http://a.b.com 的页面
*     _j._$postMessage('targetFrame',{
*         data:'hello a.b.com'
*     });
*
*     // http://a.b.com/a.html页面代码
*     // 添加消息监测事件
*     _v._$addEvent(
*         window,'message',function(_event){
*             // 必须先验证消息来源_event.origin是否你允许的域
*              if (!_isAllow(_event.origin))
*                 return;
*
*             // 处理_event.data中的消息内容
*             // TODO something
*
*             // 回复消息，使用_event.source
*             _j._$postMessage(_event.source,{
*                 data:'hello!',
*                 origin:_event.origin
*             });
*         }
*     );
* });
* ```
*
* @method module:util/ajax/message._$postMessage
* @param  {String|Window} arg0   - window对象或者Frame的name，或者字符串如_top、_parent、_self
* @param  {Object}        arg1   - 消息配置
* @property {Variable}      data   - 消息内容
* @property {String}        origin - 目标Origin，只有指定的页面可以收到消息，如http://a.b.com
* @property {String}        source - 当前窗体标识，除非你非常确定当前窗体的标识是什么，否则请采用自动识别
* @return {Void}
*/
_p._$postMessage = (function(){
var _self = window.name||'_parent',
_wmap = {
'_top'   : window.top,
'_self'  : window,
'_parent': window.parent
};
return function(_target,_options){
if (_u._$isString(_target)){
_target = _wmap[_target]||
window.frames[_target]||
(_e._$get(_target)||_o).contentWindow;
if (!_target) return;
}
// check data
var _data = _u._$fetch({
data:null,
origin:'*',
source:_self
},_options);
// send message
_h.__postMessage(_target,_data);
};
})();
if (CMPT){
NEJ.copy(NEJ.P('nej.j'),_p);
}
return _p;
},7,2,4,60);
I$(50,function (_t,_u,_k,_v,_c,_e,_j,_p,_o,_f,_r){
var _pro,
_cache = {};
/**
* Frame代理方式Ajax请求对象
*
* @class   module:util/ajax/proxy/frame._$$ProxyFrame
* @extends module:util/ajax/proxy/proxy._$$ProxyAbstract
*
* @param   {Object}  config - 构造配置参数
*/
_p._$$ProxyFrame = _k._$klass();
_pro = _p._$$ProxyFrame._$extend(_t._$$ProxyAbstract);
/**
* 控件初始化
*
* @protected
* @method module:util/ajax/proxy/frame._$$ProxyFrame#__init
* @return {Void}
*/
_pro.__init = (function(){
var _flag = 'NEJ-AJAX-DATA:',
_init = !1;
// receive message
var _doReceiveMessage = function(_event){
var _data = _event.data;
if (_data.indexOf(_flag)!=0) return;
_data = JSON.parse(_data.replace(_flag,''));
var _proxy = _cache[_data.key];
if (!_proxy) return;
delete _cache[_data.key];
_data.result = decodeURIComponent(_data.result||'');
_proxy.__onLoadRequest(_data);
};
// init message listener
var _doInitMessage = function(){
if (!_init){
_init = !0;
_v._$addEvent(
window,'message',
_doReceiveMessage
);
}
};
return function(){
this.__super();
_doInitMessage();
};
})();
/**
* 往服务器发送请求
*
* @protected
* @method module:util/ajax/proxy/frame._$$ProxyFrame#__doSendRequest
* @param  {Object} arg0 - 请求信息
* @return {Void}
*/
_pro.__doSendRequest = function(_options){
var _request = _options.request,
_proxy = _c._$getFrameProxy(_request.url),
_frame = _cache[_proxy];
// callback list
if (_u._$isArray(_frame)){
_frame.push(
this.__doSendRequest.
_$bind(this,_options)
);
return;
}
// build frame proxy
if (!_frame){
_cache[_proxy] = [
this.__doSendRequest.
_$bind(this,_options)
];
_e._$createXFrame({
src:_proxy,visible:!1,
onload:function(_event){
var _list = _cache[_proxy];
_cache[_proxy] = _v.
_$getElement(_event).contentWindow;
_u._$reverseEach(
_list,function(_handler){
try{
_handler();
}catch(ex){
// ignore
}
}
);
}
});
return;
}
// send message to frame
this.__rkey = _u._$uniqueID();
_cache[this.__rkey] = this;
var _data = _u._$fetch({
url:'',data:null,
timeout:0,method:'GET'
},_request);
_data.key = this.__rkey;
_data.headers = _options.headers;
_j._$postMessage(_cache[_proxy],{data:_data});
};
/**
* 中断请求
*
* @method module:util/ajax/proxy/frame._$$ProxyFrame#_$abort
* @return {Void}
*/
_pro._$abort = function(){
delete _cache[this.__rkey];
this.__onLoadRequest({status:0});
};
return _p;
},41,2,1,3,15,4,59);
I$(51,function (_t,_k,_u,_v,_e,_g,_j0,_j1,_p,_o,_f,_r){
var _pro,
_cache = {},
_xflag = 'NEJ-UPLOAD-RESULT:';
/**
* 文件上传代理
*
* @class   module:util/ajax/proxy/upload._$$ProxyUpload
* @extends module:util/ajax/proxy/proxy._$$ProxyAbstract
*
* @param   {Object}  config - 构造配置参数
*/
_p._$$ProxyUpload = _k._$klass();
_pro = _p._$$ProxyUpload._$extend(_t._$$ProxyAbstract);
/**
* 控件初始化
*
* @protected
* @method module:util/ajax/proxy/upload._$$ProxyUpload#__init
* @return {Void}
*/
_pro.__init = (function(){
var _init = !1;
// receive message callback
var _doReceiveMessage = function(_event){
var _data = _event.data;
if (_data.indexOf(_xflag)!=0) return;
_data = JSON.parse(_data.replace(_xflag,''));
var _proxy = _cache[_data.key];
if (!_proxy) return;
delete _cache[_data.key];
_proxy.__onLoadRequest(
decodeURIComponent(_data.result)
);
};
// init message listener
var _doInitMessage = function(){
if (!_init){
_init = !0;
_v._$addEvent(
window,'message',
_doReceiveMessage
);
}
};
return function(){
this.__super();
_doInitMessage();
};
})();
/**
* 控件销毁
*
* @protected
* @method module:util/ajax/proxy/upload._$$ProxyUpload#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
_e._$remove(this.__frame);
delete this.__frame;
window.clearTimeout(this.__timer);
delete this.__timer;
};
/**
* 请求载入回调
*
* @protected
* @method module:util/ajax/proxy/upload._$$ProxyUpload#__onLoadRequest
* @param  {String} arg0 - 数据信息
* @return {Void}
*/
_pro.__onLoadRequest = function(_text){
var _json;
try{
_json = JSON.parse(_text);
this._$dispatchEvent('onload',_json);
}catch(ex){
this._$dispatchEvent('onerror',{
code:_g._$CODE_ERREVAL,
message:_text
});
}
};
/**
* 往服务器发送请求
*
* @protected
* @method module:util/ajax/proxy/upload._$$ProxyUpload#__doSendRequest
* @param  {Object} arg0 - 请求信息
* @return {Void}
*/
_pro.__doSendRequest = (function(){
// same domain upload result check
var _doCheckResult = function(){
var _body,_text;
try{
var _body = this.__frame.contentWindow.document.body,
_text = (_body.innerText||_body.textContent||'').trim();
// check result for same domain with upload proxy html
if (_text.indexOf(_xflag)>=0||
_body.innerHTML.indexOf(_xflag)>=0){
// use post message path
return;
}
}catch(ex){
// ignore if not same domain
return;
}
this.__onLoadRequest(_text);
};
// check upload progress
var _doProgress = function(_url,_mode,_cookie){
_j0._$request(_url,{
type:'json',
method:'POST',
cookie:_cookie,
mode:parseInt(_mode)||0,
onload:function(_data){
if (!this.__timer) return;
this._$dispatchEvent('onuploading',_data);
this.__timer = window.setTimeout(
_doProgress._$bind(
this,_url,_mode,_cookie
),1000
);
}._$bind(this),
onerror:function(_error){
if (!this.__timer) return;
this.__timer = window.setTimeout(
_doProgress._$bind(
this,_url,_mode,_cookie
),1000
);
}._$bind(this)
});
};
return function(_options){
var _request = _options.request,
_headers = _options.headers,
_form = _request.data,
_name = _u._$uniqueID();
_cache[_name]  = this;
_form.target   = _name;
_form.method   = 'POST';
_form.enctype  = _g._$HEAD_CT_FILE;
_form.encoding = _g._$HEAD_CT_FILE;
var _url = _form.action||'',
_sep = _url.indexOf('?')<=0?'?':'&';
_form.action = _url+_sep+'_proxy_=form';
this.__frame = _e._$createXFrame({
name:_name,
onload:function(_event){
var _frame = _v._$getElement(_event);
_v._$addEvent(
_frame,'load',
_doCheckResult._$bind(this)
);
_form.submit();
var _qurl = (_form.nej_query||_o).value;
if (!_qurl) return;
var _mode = (_form.nej_mode||_o).value,
_cookie = (_form.nej_cookie||_o).value==='true';
this.__timer = window.setTimeout(
_doProgress._$bind(
this,_qurl,_mode,_cookie
),100
);
}._$bind(this)
});
};
})();
/**
* 中断请求
*
* @method module:util/ajax/proxy/upload._$$ProxyUpload#_$abort
* @return {Void}
*/
_pro._$abort = function(){
this._$dispatchEvent('onerror',{
code:_g._$CODE_ERRABRT,
message:'客户端终止文件上传'
});
};
return _p;
},41,1,2,3,4,13,32,59);
I$(48,function (_t0,_t1,_t2,_t3,_p,_o,_f,_r){
/**
* 根据模式返回代理实例，模式说明
* 0 - 自动模式，高版本使用HTML5的CORS协议，低版本采用Frame代理方式
* 1 - 高版本使用HTML5的CORS协议，普通请求低版本采用Flash代理方式
* 2 - 全部使用Frame代理方式
* 3 - 全部使用Flash代理方式
* @param  {Number}   模式
* @param  {Boolean}  是否文件上传
* @param  {Object}   构造配置参数
* @return {_$$ProxyAbstract} 代理实例
*/
_p.__getProxyByMode = function(_mode,_upload,_options){
var _map = !!_upload
? {2:_t3._$$ProxyUpload}
: {2:_t2._$$ProxyFrame,3:_t1._$$ProxyFlash};
return (_map[_mode]||_t0._$$ProxyXHR)._$allocate(_options);
};
return _p;
},39,49,50,51);
I$(40,function(_h,_p_,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[1])._$KERNEL;if (_k_.engine=='trident'&&_k_.release<='5.0'){(function (){
/**
* 根据模式返回代理实例，模式说明
* 0 - 自动模式，高版本使用HTML5的CORS协议，低版本采用Frame代理方式
* 1 - 高版本使用HTML5的CORS协议，普通请求低版本采用Flash代理方式
* 2 - 全部使用Frame代理方式
* 3 - 全部使用Flash代理方式
* @param  {Number}  模式
* @param  {Boolean} 是否文件上传
* @param  {Object}  构造配置参数
* @return {_$$ProxyAbstract} 代理实例
*/
_h.__getProxyByMode = (function(){
var _pmap = {0:2,1:3};
return _h.__getProxyByMode._$aop(function(_event){
var _args = _event.args,
_mode = _args[0]||0;
_args[0] = !!_args[1] ? 2 :
_pmap[_mode]||_mode;
});
})();
})();};return _h;
},48,10);
I$(32,function (NEJ,_g,_u,_e,_t,_h,_p,_o,_f,_r){
/**
* 载入回调
*
* @callback module:util/ajax/xdr.onload
* @param    {Variable|Object} event - 请求返回数据，根据请求时type指定格式返回，
*                                     如果请求时指���了result参数，则此处输入为包含额外信息的对象，
*                                     数据结果从此对象的data属性中取，如{headers:{'x-res-0':'12345', ...},data:{a:'aaa', ...}}
*/
/**
* 出错回调
*
* @callback module:util/ajax/xdr.onerror
* @param    {Object}   event   - 错误信息
* @property {Number}   code    - 错误代码
* @property {String}   message - 错误描述
* @property {Variable} data    - 出错时携带数据
*/
/**
* 请求之前对数据处理回调
*
* @callback module:util/ajax/xdr.onbeforerequest
* @param    {Object} event   - 请求信息
* @property {Object} request - 请求参数，数据信息 url/sync/cookie/type/method/timeout
* @property {Object} headers - 请求头信息
*/
/**
* 上传进度回调
*
* @callback module:util/ajax/xdr.onuploading
* @param    {Object} event  - 进度信息
* @property {Number} loaded - 载入数量
* @property {Number} total  - 总量
*/
// sn:{req:proxy,onload:function(){},onerror:function(){}}
var _xcache = {},
_doFilter = _f;
/**
* 中断请求
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/xdr'
* ],function(_j){
*     var _id = _j._$request(
*         'http://123.163.com/xhr/',{
*             type:'json',
*             method:'POST',
*             data:{name:'ABC'},
*             timeout:60000,
*             onload:function(_data){
*                 // TODO
*             },
*             onerror:function(_error){
*                 // TODO
*             }
*         }
*     );
*     // 1秒后中断掉这个请求
*     window.setTimeout(
*         function(){
*             _j._$abort(_id);
*         },1000
*     );
* });
* ```
*
* @method module:util/ajax/xdr._$abort
* @param  {String} arg0 - 请求标识
* @return {Void}
*/
_p._$abort = function(_sn){
var _cache = _xcache[_sn];
if (!!_cache){
_cache.req._$abort();
}
};
/**
* 全局请求过滤器，过滤器中可以通过设置输入事件对象的stopped值阻止继续回调
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/xdr'
* ],function(_j){
*     _j._$filter(function(_event){
*         // _event.type     请求过滤类型
*         // _event.result   请求结果
*         // _event.stopped  是否阻止后续逻辑
*
*         // 过滤掉404的异常，如果type是onload不做处理
*         if (_event.type == 'onerror'){
*             if (_event.result.data == 404){
*                 _event.stopped = false;
*             }
*         }
*     });
*     _j._$request('xxxx',{
*         type:'json',
*         method:'POST',
*         data:{name:'abc'},
*         timeout:3000,
*         onload:function(_data){
*             // TODO
*         },
*         onerror:function(_error){
*             // TODO
*         }
*     });
* });
* ```
*
* @method module:util/ajax/xdr._$filter
* @param  {Function} arg0 - 过滤器
* @return {Void}
*/
_p._$filter = function(_filter){
_doFilter = _filter||_f;
};
/**
* 发送ajax请求
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/xdr'
* ],function(_p){
*     var _id = _p._$request(
*         'http://a.b.com/api',{
*             sync:true,
*             type:'json',
*             data:'hello',
*             query:'a=1&b=2',
*             method:'post',
*             timeout:3000,
*             mode:0||1||2||3,
*             onload:function(_data){
*                 // 正常回调处理
*             },
*             onerror:function(_error){
*                 // 异常处理
*             },
*             onbeforerequest:function(_data){
*                 // 请求发送前，对请求数据处理
*             }
*         }
*     );
* });
* ```
*
* @method   module:util/ajax/xdr._$request
* @param    {String}   arg0    - 请求地址
* @param    {Object}   arg1    - 配置参数
* @property {Boolean}  sync    - 是否同步请求
* @property {String}   type    - 返回数据格式,text/json/xml
* @property {Variable} data    - 要���送的数据
* @property {Variable} query   - 查询参数,字符串格式a=b&c=d,对象格式{a:'b',c:'d'}
* @property {String}   method  - 请求方式,GET/POST
* @property {Number}   timeout - 超时时间,0 禁止超时监测
* @property {Object}   headers - 头信息表
* @property {Boolean}  cookie  - 跨域请求是否带cookie，仅对CORS方式有效
* @property {Number}   mode    - 请求模式,针对跨域请求采用的请求方式
*
* * 0 - 自动模式，高版本使用HTML5的CORS协议，低版本采用Frame代理方式
* * 1 - 高版本使用HTML5的CORS协议，低版本采用Flash代理方式
* * 2 - 全部使用Frame代理方式
* * 3 - 全部使用Flash代理方式
*
* @property {Object}   result  - onload回调输入时需包含的额外信息，已处理额外数据
*
* * headers - 服务器返回头信息，如{headers:'x-res-0'}或者{headers:['x-res-0','x-res-1']}
*
* @property {module:util/ajax/xdr.onload}          onload  - 数据载入回调
* @property {module:util/ajax/xdr.onerror}         onerror - 请求异常回调
* @property {module:util/ajax/xdr.onbeforerequest} onbeforerequest - 请求之前回调
*
* @return   {String} 分配给请求的ID
*/
_p._$request = (function(){
var _location = (location.protocol+'//'
+location.host).toLowerCase();
// check cross-domain request
var _isXDomain = function(_url){
var _origin = _u._$url2origin(_url);
return !!_origin&&_origin!=_location;
};
// check file upload
var _isUpload = function(_headers){
return (_headers||_o)[_g._$HEAD_CT]==_g._$HEAD_CT_FILE;
};
// get ajax proxy
var _getProxy = function(_options){
var _upload = _isUpload(_options.headers);
if (!_isXDomain(_options.url)&&!_upload)
return _t._$$ProxyXHR._$allocate(_options);
return _h.__getProxyByMode(_options.mode,_upload,_options);
};
// parse ext result
var _doParseExtData = function(_cache,_result){
var _data = {
data:_result
};
// parse ext headers
var _keys = _cache.result.headers;
if (!!_keys){
_data.headers = _cache.req._$header(_keys);
}
// TODO parse other ext data
return _data;
};
// clear cache
var _doClear = function(_sn){
var _cache = _xcache[_sn];
if (!_cache) return;
if (!!_cache.req)
_cache.req._$recycle();
delete _xcache[_sn];
};
// do callback
var _doCallback = function(_sn,_type){
var _cache = _xcache[_sn];
if (!_cache) return;
var _data = arguments[2];
if (_type=='onload'&&!!_cache.result){
_data = _doParseExtData(_cache,_data);
}
_doClear(_sn);
var _event = {
type:_type,
result:_data
};
_doFilter(_event);
if (!_event.stopped){
(_cache[_type]||_f)(_event.result);
}
};
// onload callback
var _onLoad = function(_sn,_data){
_doCallback(_sn,'onload',_data);
};
// onerror callback
var _onError = function(_sn,_error){
_doCallback(_sn,'onerror',_error);
};
// check data for get method
var _doMergeURL = function(_url,_data){
var _sep = _url.indexOf('?')<0?'?':'&',
_data = _data||'';
if (_u._$isObject(_data))
_data = _u._$object2query(_data);
if (!!_data) _url += _sep+_data;
return _url;
};
// function body
return function(_url,_options){
_options = _options||{};
// cache request callback
var _sn = _u._$uniqueID(),
_cache = {
result:_options.result,
onload:_options.onload||_f,
onerror:_options.onerror||_f
};
_xcache[_sn] = _cache;
_options.onload = _onLoad._$bind(null,_sn);
_options.onerror = _onError._$bind(null,_sn);
// append request query
if (!!_options.query){
_url = _doMergeURL(_url,_options.query);
}
// append request data for get
var _method = _options.method||'';
if ((!_method||/get/i.test(_method))&&!!_options.data){
_url = _doMergeURL(_url,_options.data);
_options.data = null;
}
_options.url = _url;
_cache.req = _getProxy(_options);
_cache.req._$send(_options.data);
return _sn;
};
})();
/**
* 文件上传
*
* 结构举例
* ```html
* <form id="upload" name="upload" action="http://123.163.com:3000/xhr/uploadCallback">
*    <input type="text" id="progress" />
*    <input type="hidden" name="nej_mode" value="2" />
*    <input type="hidden" name="nej_query" value="http://123.163.com:3000/xhr/progress" />
* </form>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/xdr'
* ],function(_j){
*     _j._$upload('upload',{
*         mode:2,
*         cookie:true,
*         onuploading:function(_data){
*             // 后台处理http://123.163.com:3000/xhr/progress，返回一个json对象
*             // 前台会去轮询此接口获取进度
*             if(!!_data.total&&_data.progress){
*                 _progress.value = _data.progress;
*             }
*         },
*         onload:function(_url){
*             // 此前会把进度轮询终止掉。如果要显示进度100%，可在此设置一次
*             // 后台处理http://123.163.com:3000/xhr/uploadCallback，返回url
*             // 文件上传完成的回调,url为返回的地址
*         }
*     });
* });
* ```
*
* @method   module:util/ajax/xdr._$upload
* @see      module:util/ajax/xdr._$request
* @param    {HTMLFormElement}  arg0    - 表单对象，待上传的文件及目标地址信息封装在此对象中
* @param    {Object}           arg1    - 可选配置参数
* @property {String}           type    - 返回数据格式
* @property {Variable}         query   - 查询参数
* @property {Number}           mode    - 跨域类型，0/2，见_$request接口说明
* @property {Object}           headers - 头信息
* @property {Boolean}          cookie  - 跨域请求是否带cookie，仅对CORS方式有效
*
* @property {module:util/ajax/xdr.onload}          onload  - 数据载入回调
* @property {module:util/ajax/xdr.onerror}         onerror - 请求异常回调
* @property {module:util/ajax/xdr.onuploading}     onuploading     - 上传进度回调
* @property {module:util/ajax/xdr.onbeforerequest} onbeforerequest - 请求之前回调
*
* @return   {String}                     分配给请求的ID
*/
_p._$upload = function(_form,_options){
_form = _e._$get(_form);
if (!_form){
return '';
}
// init param
var _option = _u._$fetch({
mode:0,
type:'json',
query:null,
cookie:!1,
headers:{},
onload:null,
onerror:null,
onuploading:null,
onbeforerequest:null
},_options);
_option.data = _form;
_option.method = 'POST';
_option.timeout = 0;
_option.headers[_g._$HEAD_CT] =
_g._$HEAD_CT_FILE;
return _p._$request(_form.action,_option);
};
if (CMPT){
NEJ.copy(NEJ.P('nej.j'),_p);
}
return _p;
},7,13,2,4,39,40);
I$(34,function (_t,_k,_e,_j,_p,_o,_f,_r){
var _pro;
/**
* 文本资源加载器
*
* @class   module:util/ajax/loader/text._$$LoaderText
* @extends module:util/ajax/loader/loader._$$LoaderAbstract
*
* @param   {Object} config - 可选配置参数
*/
_p._$$LoaderText = _k._$klass();
_pro = _p._$$LoaderText._$extend(_t._$$LoaderAbstract);
/**
* 取资源载入控件
*
* @protected
* @method module:util/ajax/loader/style._$$LoaderText#__getRequest
* @return {Node} 控件节点
*/
_pro.__getRequest = function(){
return null;
};
/**
* 资源载入
*
* @protected
* @method module:util/ajax/loader/style._$$LoaderText#__doRequest
* @param  {Node} 控件节点
* @return {Void}
*/
_pro.__doRequest = function(){
_j._$request(this.__url,{
method:'GET',
type:'text',
onload:this.__onLoaded._$bind(this),
onerror:this.__onError._$bind(this)
});
};
/**
* 资源载入成功事件
*
* @protected
* @method module:util/ajax/loader/style._$$LoaderText#__onLoaded
* @return {Void}
*/
_pro.__onLoaded = function(_text){
this.__doCallback('onload',{
url:this.__url,
content:_text
});
};
return _p;
},38,1,4,32);
I$(63,function (_e,_p,_o,_f,_r){
/**
* 删除IFrame节点，保留历史
* @param  {Node} iframe节点
* @return {Void}
*/
_p.__removeIFrameKeepHistory = function(_iframe){
_e._$remove(_iframe);
};
return _p;
},4);
I$(62,function(_h,_e,_m,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[2])._$KERNEL;if (_k_.engine=='trident'&&_k_.release<='2.0'){(function (){
/**
* 删除IFrame节点，保留历史
* @param  {Node} iframe节点
* @return {Void}
*/
_h.__removeIFrameKeepHistory = function(_iframe){
_e._$setStyle(_iframe,'display','none');
try{_iframe.contentWindow.document.body.innerHTML = '&nbsp;';}catch(ex){}
};
})();};return _h;
},63,4,10);
I$(35,function (_t,_k,_e,_h,_p,_o,_f,_r){
var _pro;
/**
* HTML资源加载器
*
* @class   module:util/ajax/loader/html._$$LoaderHtml
* @extends module:util/ajax/loader/loader._$$LoaderAbstract
*
* @param   {Object} config - 可选配置参数
*/
_p._$$LoaderHtml = _k._$klass();
_pro = _p._$$LoaderHtml._$extend(_t._$$LoaderAbstract);
/**
* 取资源载入控件
*
* @protected
* @method module:util/ajax/loader/html._$$LoaderHtml#__getRequest
* @return {Node} IFrame节点
*/
_pro.__getRequest = function(){
var _iframe = _e._$create('iframe');
_iframe.width = 0;
_iframe.height = 0;
_iframe.style.display = 'none';
return _iframe;
};
/**
* 资源载入
*
* @protected
* @method module:util/ajax/loader/html._$$LoaderHtml#__doRequest
* @param  {Node} arg0 - 控件节点
* @return {Void}
*/
_pro.__doRequest = function(_request){
try{
// append first for history bug
document.body.appendChild(_request);
_request.src = this.__url;
}catch(ex){
console.log(_request);
console.error(ex);
}
};
/**
* 资源载入异常事件
*
* @protected
* @method module:util/ajax/loader/html._$$LoaderHtml#__onError
* @param  {Object} arg0 - 错误信息
* @return {Void}
*/
_pro.__onError = function(_error){
var _iframe = (
this.__getLoadData(this.__url)||_o
).request;
this.__doCallback('onerror',_error);
_h.__removeIFrameKeepHistory(_iframe);
};
/**
* 资源载入成功事件
*
* @protected
* @method module:util/ajax/loader/html._$$LoaderHtml#__onLoaded
* @return {Void}
*/
_pro.__onLoaded = function(){
var _body = null,
_iframe = (this.__getLoadData(this.__url)||_o).request;
try{
if (_iframe.src!=this.__url) return;
_body = _iframe.contentWindow.document.body;
}catch(ex){
// ignore
}
this.__doCallback('onload',_body);
_h.__removeIFrameKeepHistory(_iframe);
};
return _p;
},38,1,4,62);
I$(36,function (_t,_k,_e,_p,_o,_f,_r){
var _pro;
/**
* 样式加载器
*
* @class   module:util/ajax/loader/style._$$LoaderStyle
* @extends module:util/ajax/loader/loader._$$LoaderAbstract
*
* @param   {Object} config - 可选配置参数
*/
_p._$$LoaderStyle = _k._$klass();
_pro = _p._$$LoaderStyle._$extend(_t._$$LoaderAbstract);
/**
* 取资源载入控件
*
* @protected
* @method module:util/ajax/loader/style._$$LoaderStyle#__getRequest
* @return {Node} 控件节点
*/
_pro.__getRequest = function(){
return _e._$create('link');
};
/**
* 资源载入
*
* @protected
* @method module:util/ajax/loader/style._$$LoaderStyle#__doRequest
* @param  {Node} 控件节点
* @return {Void}
*/
_pro.__doRequest = function(_request){
_request.href = this.__url;
document.head.appendChild(_request);
};
return _p;
},38,1,4);
I$(37,function (_t,_k,_e,_p,_o,_f,_r){
var _pro;
/**
* 脚本加载器
*
* @class    module:util/ajax/loader/script._$$LoaderScript
* @extends  module:util/ajax/loader/loader._$$LoaderAbstract
*
* @param    {Object} config   - 可选配置参数
* @property {Boolean} async   - 异步载入并立刻执行，默认为!0
* @property {String}  charset - 脚本编码
*/
_p._$$LoaderScript = _k._$klass();
_pro = _p._$$LoaderScript._$extend(_t._$$LoaderAbstract);
/**
* 控件重置
*
* @protected
* @method module:util/ajax/loader/script._$$LoaderScript#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__async = _options.async;
this.__charset = _options.charset;
this.__qopt.async = !1;
this.__qopt.charset = this.__charset;
};
/**
* 取资源载入控件
*
* @protected
* @method module:util/ajax/loader/script._$$LoaderScript#__getRequest
* @return {Script} 控件
*/
_pro.__getRequest = function(){
var _request = _e._$create('script');
if (this.__async!=null){
_request.async = !!this.__async;
}
if (this.__charset!=null){
_request.charset = this.__charset;
}
return _request;
};
/**
* 删除控件
*
* @protected
* @method module:util/ajax/loader/script._$$LoaderScript#__doClearRequest
* @param  {Node} arg0 - 控件节点
* @return {Void}
*/
_pro.__doClearRequest = function(_request){
_e._$remove(_request);
};
return _p;
},38,1,4);
I$(31,function (NEJ,_t0,_t1,_t2,_t3,_p,_o,_f,_r){
/**
* 载入完成回调函数
*
* @callback module:util/ajax/tag.onload
* @param    {Variable} event - 请求返回数据
*/
/**
* 载入出错回调函数
*
* @callback module:util/ajax/tag.onerror
* @param    {Object} event   - 错误信息
* @property {Number} code    - 错误码
* @property {String} message - 错误信息
*/
/**
* 载入脚本文件
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/tag'
* ],function(_j){
*     _j._$loadScript('../../../javascript/log.js',{
*         onload:function(){
*             // 载入成功的回调方法
*         },
*         onerror:function(_error){
*             // 抛出异常回调
*         }
*     });
* });
* ```
*
* @method   module:util/ajax/tag._$loadScript
* @see      module:util/ajax/tag._$queueScript
* @param    {String}  arg0    - 请求地址
* @param    {Object}  arg1    - 可选配置参数
* @property {Boolean} async   - 异步载入并立刻执行，默认为!0
* @property {Number}  timeout - 超时时间,0表示禁止超时监测
* @property {String}  version - 版本信息
* @property {String}  charset - 脚本编码
* @property {module:util/ajax/tag.onload}  onload  - 载入回调
* @property {module:util/ajax/tag.onerror} onerror - 异常回调
* @return   {Void}
*/
_p._$loadScript = function(_url,_options){
_t3._$$LoaderScript._$allocate(_options)._$load(_url);
};
/**
* 载入队列脚本并依次执行
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/tag'
* ],function(_j){
*     _j._$queueScript([
*         '../../../javascript/log.js',
*         'http://123.163.com/a.js'
*     ],{
*         onload:function(){
*            // 载入成功的回调方法
*         },
*         onerror:function(_error){
*            // 异常回调方法
*         }
*     });
* });
* ```
*
* @method   module:util/ajax/tag._$queueScript
* @see      module:util/ajax/tag._$loadScript
* @param    {Array}  arg0    - 脚本队列
* @param    {Object} arg1    - 可选配置参数
* @property {String} version - 版本信息
* @property {String} charset - 脚本编码
* @property {Number} timeout - 每个脚本超时时间,0表示禁止超时监测
* @property {module:util/ajax/tag.onload}  onload  - 载入回调
* @property {module:util/ajax/tag.onerror} onerror - 异常回调
* @return   {Void}
*/
_p._$queueScript = function(_list,_options){
_t3._$$LoaderScript._$allocate(_options)._$queue(_list);
};
/**
* 载入样式文件
* ```javascript
* NEJ.define([
*     'util/ajax/tag'
* ],function(_j){
*     _j._$loadStyle('http://123.163.com/a.css',{
*         onload:function(){
*             // 载入成功的回调方法
*         },
*         onerror:function(_error){
*             // 异常回调方法
*         }
*     });
* });
* ```
*
* @method   module:util/ajax/tag._$loadStyle
* @see      module:util/ajax/tag._$queueStyle
* @param    {String} arg0    - 样式文件地址
* @param    {Object} arg1    - 可选配置参数
* @property {Number} timeout - 超时时间,0表示禁止超时监测
* @property {String} version - 版本信息
* @property {module:util/ajax/tag.onload}  onload  - 载入回调
* @property {module:util/ajax/tag.onerror} onerror - 异常回调
* @return   {Void}
*/
_p._$loadStyle = function(_url,_options){
_t2._$$LoaderStyle._$allocate(_options)._$load(_url);
};
/**
* 载入样式队列
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/tag'
* ],function(_j){
*     _j._$queueStyle([
*         'http://123.163.com/a.css',
*         'http://123.163.com/b.css'
*     ],{
*         onload:function(){
*             // 载入成功的回调方法
*         },
*         onerror:function(_error){
*             // 异常回调方法
*         }
*     });
* });
* ```
*
* @method   module:util/ajax/tag._$queueStyle
* @see      module:util/ajax/tag._$loadStyle
* @param    {Array}  arg0    - 样式队列
* @param    {Object} arg1    - 可选配置参数
* @property {Number} timeout - 超时时间,0表示禁止超时监测
* @property {String} version - 版本信息
* @property {module:util/ajax/tag.onload}  onload  - 载入回调
* @property {module:util/ajax/tag.onerror} onerror - 异常回调
* @return   {Void}
*/
_p._$queueStyle = function(_list,_options){
_t2._$$LoaderStyle._$allocate(_options)._$queue(_list);
};
/**
* 载入HTML文件
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/tag'
* ],function(_j){
*     _j._$loadHtml('http://123.163.com/a.html',{
*         onload:function(){
*             // 载入成功的回调方法
*         },
*         onerror:function(_error){
*             // 异常回调方法
*         }
*     });
* });
* ```
*
* @method   module:util/ajax/tag._$loadHtml
* @param    {String} arg0    - 文件地址
* @param    {Object} arg1    - 可选配置参数
* @property {String} version - 版本信息
* @property {module:util/ajax/tag.onload}  onload  - 载入回调
* @property {module:util/ajax/tag.onerror} onerror - 异常回调
* @return   {Void}
*/
_p._$loadHtml = function(_url,_options){
_t1._$$LoaderHtml._$allocate(_options)._$load(_url);
};
/**
* 载入HTML文件
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/ajax/tag'
* ],function(_j){
*     _j._$loadText('http://123.163.com/a.txt',{
*         onload:function(){
*             // 载入成功的回调方法
*         },
*         onerror:function(_error){
*             // 异常回调方法
*         }
*     });
* });
* ```
*
* @method   module:util/ajax/tag._$loadText
* @param    {String} arg0    - 文件地址
* @param    {Object} arg1    - 可选配置参数
* @property {String} version - 版本信息
* @property {module:util/ajax/tag.onload}  onload  - 载入回调
* @property {module:util/ajax/tag.onerror} onerror - 异常回调
* @return {Void}
*/
_p._$loadText = function(_url,_options){
_t0._$$LoaderText._$allocate(_options)._$load(_url);
};
if (CMPT){
NEJ.copy(NEJ.P('nej.j'),_p);
}
return _p;
},7,34,35,36,37);
I$(21,function (NEJ,_u,_v,_e,_y,_t,_j0,_j1,_x,_p,_o,_f,_r){
var _cache = {}, // template cache
_skey  = (+new Date)+'-';
/**
* 解析模板集合
*
* 结构举例
* ```html
* <textarea name="jst" id="jst-box">
*     <div>${name}</div>
* </textarea>
* <textarea name="txt" id="txt-box">
*     <div>pure text</div>
* </textarea>
* <textarea name="ntp" id="ntp-box">
*     <div>ntp</div>
* </textarea>
* <textarea name="js" id="js-box" data-src='/nej-baseline/src/define.js'></textarea>
* <textarea name="css" id="css-box" data-src='/nej-baseline/qunit/base/qunit.css'></textarea>
* <textarea name="html" id="html-box" data-src='/nej-baseline/qunit/html/ui/audioTest.html'></textarea>
* <textarea name="res" id="res-box" data-src='http://pagead2.googlesyndication.com/simgad/15167196758298977737'></textarea>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/tpl'
* ],function(_p){
*     // 调用_$add接口缓存模版，id为key
*     // 要用的时候通过_$get(key,{数据})合并模版后返回字符串
*     _p._$parseTemplate('jst-box');
*     // 生成结果：<div>jack</div>
*     _p._$getTextTemplate('jst-box').trim();
*
*     // 通过_$addTextTemplate接口缓存纯文本,id为key
*     _p._$parseTemplate('txt-box');
*     // 要用的时候通过_e._$getTextTemplate(key)取到纯文本
*     _p._$getTextTemplate('txt-box')
*
*
*     // 通过_$addNodeTemplate接口缓存节点，第一次如果是字符串，缓存字符串，id为key
*     _p._$parseTemplate('ntp-box');
*     // 要用的时候通过_$getNodeTemplate('ntp-box')取出节点，
*     // 如果缓存中是字符串,取的时候要重新转换成节点，然后重新缓存一边，下次直接是取节点
*     _p._$getNodeTemplate('ntp-box');
*
*     // 加载id为js-box的textarea节点data-src指定的js文件
*     _p._$parseTemplate('js-box');
*
*     // 加载id为css-box的textarea节点data-src指定的css文件
*     _p._$parseTemplate('css-box');
*
*     // 加载id为html-box的textarea节点data-src指定的html文件
*     _p._$parseTemplate('html-box');
*
*     // 加载id为res-box的textarea节点data-src指定的纯文本文件
*     _p._$parseTemplate('res-box');
* });
* ```
*
* @method   module:util/template/tpl._$parseTemplate
* @param    {String|Node} arg0 - 模板集合节点
* @param    {Object}      arg1 - 可选配置参数
* @property {String}      root - 根路径，相对规则
* @return   {Void}
*/
/**
* @method CHAINABLE._$parseTemplate
* @see module:util/template/tpl._$parseTemplate
*/
_p._$parseTemplate = (function(){
var _count = 0;
var _doCheckReady = function(){
if (_count>0) return;
_count = 0;
_v._$dispatchEvent(document,'templateready');
_v._$clearEvent(document,'templateready');
};
var _doParseSrc = function(_textarea,_options){
var _src = _e._$dataset(_textarea,'src');
if (!_src) return;
_options = _options||_o;
var _root = _options.root;
if (!_root){
_root = _textarea.ownerDocument.location.href;
}else{
_root = _u._$absolute(_root);
}
_src = _src.split(',');
_u._$forEach(_src,function(_value,_index,_list){
_list[_index] = _u._$absolute(_value,_root);
});
return _src;
};
var _doAddStyle = function(_textarea,_options){
if (!_textarea) return;
var _src = _doParseSrc(_textarea,_options);
if (!!_src){
_j0._$queueStyle(_src,{
version:_e._$dataset(_textarea,'version')
});
}
_e._$addStyle(_textarea.value);
};
var _onAddScript = function(_value){
_count--;
_e._$addScript(_value);
_doCheckReady();
};
var _doAddScript = function(_textarea,_options){
if (!_textarea) return;
var _src = _doParseSrc(_textarea,_options),
_val = _textarea.value;
if (!!_src){
_count++;
var _options = {
version:_e._$dataset(_textarea,'version'),
onload:_onAddScript._$bind(null,_val)
};
window.setTimeout(
_j0._$queueScript._$bind(
_j0,_src,_options
),0
);
return;
}
_e._$addScript(_val);
};
var _onAddHtml = function(_body){
_count--;
_p._$parseTemplate(_body);
_doCheckReady();
};
var _doAddHtml = function(_textarea,_options){
if (!_textarea) return;
var _src = _doParseSrc(_textarea,_options)[0];
if (!!_src){
_count++;
var _options = {
version:_e._$dataset(_textarea,'version'),
onload:_onAddHtml
};
window.setTimeout(
_j0._$loadHtml._$bind(
_j0,_src,_options
),0
);
}
};
var _onAddTextResource = function(_id,_text){
_count--;
_p._$addTextTemplate(_id,_text||'');
_doCheckReady();
};
var _doAddTextResource = function(_textarea,_options){
if (!_textarea||!_textarea.id) return;
var _id = _textarea.id,
_src = _doParseSrc(_textarea,_options)[0];
if (!!_src){
_count++;
var _url = _src+(_src.indexOf('?')<0?'?':'&')+
(_e._$dataset(_textarea,'version')||''),
_options = {
type:'text',
method:'GET',
onload:_onAddTextResource._$bind(null,_id)
};
window.setTimeout(
_j1._$request._$bind(
_j1,_url,_options
),0
);
}
};
var _doAddTemplate = function(_node,_options){
var _type = _node.name.toLowerCase();
switch(_type){
case 'jst':
_y._$add(_node,!0);
return;
case 'txt':
_p._$addTextTemplate(_node.id,_node.value||'');
return;
case 'ntp':
_p._$addNodeTemplate(_node.value||'',_node.id);
return;
case 'js':
_doAddScript(_node,_options);
return;
case 'css':
_doAddStyle(_node,_options);
return;
case 'html':
_doAddHtml(_node,_options);
return;
case 'res':
_doAddTextResource(_node,_options);
return;
}
};
/**
* 模版准备完毕触发事件，包括所有外联模版载入完成
*
* 结构举例
* ```html
* <div id="template-box">
*   <textarea name="jst">
*     jst tempalte here
*   </textarea>
*   <!-- text template with id="txt-id-1" in widget.html -->
*   <textarea name="html" data-src="./widget.html"></textarea>
* </div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'base/event'
*     'util/template/tpl'
* ],function(_v,_e){
*     // 解析模版集合
*     _e._$parseTemplate('template-box');
*
*     // 在templateready事件中使用外联模版可以保证正确性
*     _v._$addEvent(
*         document,'templateready',
*         function(_event){
*             var _text = _e._$getTextTemplate('txt-id-1');
*             // TODO
*         }
*     );
* });
* ```
*
* @event    external:document.ontemplateready
* @param    {Object} event - 事件信息
*/
_t._$$CustomEvent._$allocate({
element:document,
event:'templateready',
oneventadd:_doCheckReady
});
return function(_element,_options){
_element = _e._$get(_element);
if (!!_element){
var _list = _element.tagName=='TEXTAREA' ? [_element]
: _u._$object2array(
_element.getElementsByTagName('textarea')
);
_u._$forEach(_list,function(_node){
_doAddTemplate(_node,_options);
});
_e._$remove(_element,!0);
}
_doCheckReady();
};
})();
/**
* 添加文本模板
*
* 脚本举例
* ```javascript
* // 通过_e._$addTextTemplate接口缓存纯文本,id为key
* _e._$addTextTemplate('txt-box','i am content');
* // 要用的时候通过_e._$getTextTemplate(key)取到纯文本
* _e._$getTextTemplate('txt-box')
* ```
*
* @method module:util/template/tpl._$addTextTemplate
* @see    module:util/template/tpl._$getTextTemplate
* @param  {String} arg0 - 模板键值
* @param  {String} arg1 - 模板内容
* @return {Void}
*/
_p._$addTextTemplate = function(_key,_value){
_cache[_key] = _value||'';
};
/**
* 取文本模板
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/tpl'
* ],function(_p){
*     // 通过_$addTextTemplate接口缓存纯文本,id为key
*     _p._$addTextTemplate('txt-box','i am content');
*     // 要用的时候通过_$getTextTemplate(key)取到纯文本
*     _p._$getTextTemplate('txt-box')
* });
* ```
*
* @method module:util/template/tpl._$getTextTemplate
* @see    module:util/template/tpl._$addTextTemplate
* @param  {String} arg0 - 模板键值
* @return {String}        模板内容
*/
_p._$getTextTemplate = function(_key){
return _cache[_key]||'';
};
/**
* 添加节点模板
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/tpl'
* ],function(_p){
*     // 通过_$addNodeTemplate接口缓存节点，第一次如果是字符串，缓存字符串，id为key
*     _p._$addNodeTemplate(node,'ntp-box');
*     // 要用的时候通过_$getNodeTemplate('ntp-box')取出节点，
*     // 如果缓存中是字符串,取的时候要重新转换成节点，然后重新缓存一边，下次直接是取节点
*     _p._$getNodeTemplate('ntp-box');
* });
* ```
*
* @method module:util/template/tpl._$addNodeTemplate
* @see    module:util/template/tpl._$getNodeTemplate
* @param  {String|Node} arg0 - 模板
* @param  {String}      arg1 - 模板序列号
* @return {String}             模板序列号
*/
/**
* @method CHAINABLE._$addNodeTemplate
* @see module:util/template/tpl._$addNodeTemplate
*/
_p._$addNodeTemplate = function(_element,_key){
_key = _key||_u._$uniqueID();
_element = _e._$get(_element)||_element;
_p._$addTextTemplate(_skey+_key,_element);
if (!_u._$isString(_element)){
_e._$removeByEC(_element);
}
return _key;
};
/**
* 取节点模板
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/tpl'
* ],function(_p){
*     // 通过_$addNodeTemplate接口缓存节点，第一次如果是字符串，缓存字符串，id为key
*     _p._$addNodeTemplate('txt-box');
*     // 要用的时候通过_$getNodeTemplate('ntp-box')取出节点，
*     // 如果缓存中是字符串,取的时候要重新转换成节点，然后重新缓存一边，下次直接是取节点
*     _p._$getNodeTemplate('ntp-box');
* });
* ```
*
* @method module:util/template/tpl._$getNodeTemplate
* @see    module:util/template/tpl._$addNodeTemplate
* @param  {String} arg0 - 模板序列号
* @return {Node}          节点模板
*/
_p._$getNodeTemplate = function(_key){
if (!_key) return null;
_key = _skey+_key;
var _value = _p._$getTextTemplate(_key);
if (!_value) return null;
var _node;
if (_u._$isString(_value)){
_value = _e._$html2node(_value);
// bugfix: https://connect.microsoft.com/IE/feedback/details/811408
var _list = _value.getElementsByTagName('textarea');
if (_value.tagName!='TEXTAREA'&&
(!_list||!_list.length)){
_p._$addTextTemplate(_key,_value);
}else{
_node = _value;
}
}
// clone node and push to memory
if (!_node){
_node = _value.cloneNode(!0);
}
_e._$removeByEC(_node);
return _node;
};
/**
* 取ITEM模板列表
*
* 结构举例
* ```html
* <div id="item-box"></div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'base/klass',
*     'ui/item/item',
*     'util/template/tpl'
* ],function(_k,_i,_t,_p){
*     var _pro;
*     var _html_key = _t._$addNodeTemplate('<div>123</div>');
*
*     _p._$$MyItem = _k._$klass();
*     _pro = _p._$$MyItem._$extend(_i._$$Item);
*
*     _pro.__reset = function(_options){
*         this.__data = _options.data;
*         this.__super(_options);
*     }
*
*     _pro.__doRefresh = function(){
*         this.__body.innerText = this.__data.name;
*     };
*
*     _pro.__initXGui = function(){
*         this.__seed_html = _html_key;
*     };
*
*     return _p;
* });
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     '/path/to/my/item.js',
*     'util/template/tpl'
* ],function(_t,_p){
*     // _$getItemTemplate接口生成item列表
*     // 返回一个item的列表，可以循环调用_$recycle()，来销毁
*     var _items = _p._$getItemTemplate(
*         [{name:'jack'},{name:'sean'}],
*         _t._$$MyItem,{parent:'item-box'}
*     );
* });
* ```
*
* @method   module:util/template/tpl._$getItemTemplate
* @param    {Array}   arg0   - 数据列表
* @param    {module:ui/item/item._$$Item} arg1   - 列表项构造函数
* @param    {Object}  arg2   - 可选配置参数，其他参数参见item指定的构造函数的配置参数
* @property {Number}  offset - 起始指针【包含】，默认0
* @property {Number}  limit  - 分配数据长度或者数量，默认为列表长度
* @return   {Array}            ITEM模板列表
*/
_p._$getItemTemplate = (function(){
var _doFilter = function(_value,_key){
return _key=='offset'||_key=='limit';
};
return function(_list,_item,_options){
var _arr = [];
if (!_list||!_list.length||!_item){
return _arr;
}
_options = _options||_o;
var _len = _list.length,
_beg = parseInt(_options.offset)||0,
_end = Math.min(_len,_beg+(
parseInt(_options.limit)||_len)),
_opt = {total:_list.length,range:[_beg,_end]};
_u._$merge(_opt,_options,_doFilter);
for(var i=_beg,_instance;i<_end;i++){
_opt.index = i;
_opt.data = _list[i];
_instance = _item._$allocate(_opt);
var _id = _instance._$getId();
_cache[_id] = _instance;
_instance._$recycle =
_instance._$recycle._$aop(
function(_id,_instance){
delete _cache[_id];
delete _instance._$recycle;
}._$bind(null,_id,_instance));
_arr.push(_instance);
}
return _arr;
};
})();
/**
* 根据ID取列表项对象
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/template/tpl'
* ],function(_p){
*     // 通过id拿某一项item
*     // id是生成item的时候，'itm'+日期字符串生成,存在于_instance.__id变量中
*     var _item = _p._$getItemById('itm-123');
* });
* ```
*
* @method module:util/template/tpl._$getItemById
* @param  {String} arg0 - 列表项
* @return {module:ui/item/item._$$Item} 列表项实例
*/
_p._$getItemById = function(_id){
return _cache[_id];
};
/**
* 解析UI模板集合
*
* @method module:util/template/tpl._$parseUITemplate
* @param  {String} html - 待解析字符串
* @param  {Object} map  - 模版id的对应map
* @return {Object} 模版id的map
*/
_p._$parseUITemplate = (function(){
var _reg = /#<(.+?)>/;
return function(_html,_map){ // {abc:'eeee'} // #<abc>
_map = _map||{};
var _element = _e._$html2node(_html);
_u._$forIn(
_element.getElementsByTagName('textarea'),
function(_textarea){
_textarea.id = (_textarea.id||'').replace(
_reg,function($1,$2){
var _id = _map[$2];
if (!_id){
_id = 'tpl-'+_u._$uniqueID();
_map[$2] = _id;
}
return _id;
}
);
}
);
_p._$parseTemplate(_element);
return _map;
};
})();
// for chainable method
_x._$merge({
_$parseTemplate:_p._$parseTemplate,
_$addNodeTemplate:_p._$addNodeTemplate
});
if (CMPT){
NEJ.copy(NEJ.P('nej.e'),_p);
}
return _p;
},7,2,3,4,29,30,31,32,11);
!function(win, doc, undefined) {
// __nes命名空间__
var nes = function(node, context){return all(node, context);},
locals = {}; //存放local属性...被global坑死了
// 常用属性local化
var ap = Array.prototype,
op = Object.prototype,
sp = String.prototype,
fp = Function.prototype,
slice = ap.slice,
body = doc.body,
testNode = doc.createElement("div"),
// 1. Helper(助手函数)
// =================================
// 将类数组(如Nodelist、Argument)变为数组
toArray = function(arr) {
return slice.call(arr);
},
// 够用的短小类型判断
typeOf = function(o) {
return o == null ? String(o) : op.toString.call(o).slice(8, -1).toLowerCase();
},
// 够用的简单对象扩展
extend = function(o1, o2, override) {
for (var i in o2) {
if (o1[i] == null || override) o1[i] = o2[i];
}
},
// 最简单先进先出缓存队列, max设置最大缓存长度, 为了不必要重复parse
// nes会多次用到这个方法创建cache
createCache = function(max) {
var keys = [],
cache = {};
return {
set: function(key, value) {
if (keys.length > this.length) {
delete cache[keys.shift()];
}
cache[key] = value;
keys.push(key);
return value;
},
get: function(key) {
if (key === undefined) return cache;
return cache[key];
},
length: max,
len: function() {
return keys.length;
}
};
},
// 让setter型函数fn支持object型的参数
// 即支持`set(name:value)`
// 也支持`set({name1:value1,name2:value2})`
autoSet = function(fn) {
return function(key, value) {
if (typeOf(key) == "object") {
for (var i in key) {
fn.call(this, i, key[i]);
}
} else {
fn.call(this, key, value);
}
return this;
};
},
assert = function(fn) {
try {
return fn();
} catch (e) {
return false;
} finally {
testNode = document.createElement("div");
}
};
// Fixed: toArray 低于IE8的 Nodelist无法使用slice获得array
try {
slice.call(doc.getElementsByTagName("body"));
} catch (e) {
toArray = function(arr) {
var result = [],
len = arr.length;
for (var i = 0; i < len; i++) {
result.push(arr[i]);
}
return result;
};
}
// 扩展ES5 Native支持的函数，坑爹的远古浏览器
//es5 trim
var trimReg = /^\s+|\s+$/g;
sp.trim = sp.trim ||
function() {
return this.replace(trimReg, "");
};
//es5 bind
fp.bind = fp.bind ||
function(context, args) {
args = slice.call(arguments, 1);
var fn = this;
return function() {
return fn.apply(context, args.concat(slice.call(arguments)));
};
};
//es5 Array indexOf
ap.indexOf = ap.indexOf ||
function(a) {
for (var i = 0, len = this.length; i < len; i++) {
if (a === this[i]) return i;
}
return -1;
};
// Parser 相关
var
//抽离出字匹配数目
ignoredRef = /\(\?\!|\(\?\:/,
extractRefNum = function(regStr) {
var left = 0,
right = 0,
len = regStr.length,
ignored = regStr.split(ignoredRef).length - 1; //忽略非捕获匹配
for (; len--;) {
var letter = regStr.charAt(len);
if (len === 0 || regStr.charAt(len - 1) !== "\\") { //不包括转义括号
if (letter === "(") left++;
if (letter === ")") right++;
}
}
if (left !== right) throw regStr + "中的括号不匹配";
else return left - ignored;
},
//前向引用 如\1 \12 等在TRUNK合并时要做处理
refIndexReg = /\\(\d+)/g,
extractRefIndex = function(regStr, curIndex) {
return regStr;
// .replace(refIndexReg, function(a, b) {
//   return "\\" + (parseInt(b, 10) + curIndex);
// });
},
// // 生成默认的action，这个会将匹配到的参数推入一个同名的数组内
// createAction = function(name) {
//   return function(all) {
//     var parsed = this.parsed,
//       current = parsed[name] || (parsed[name] = [])
//       current.push(slice.call(arguments))
//   }
// },
// Object.keys 规则排序时的调用方法
keys = Object.keys ||
function(obj) {
var result = [];
for (var prop in obj) {
if (obj.hasOwnProperty(prop)) result.push(prop);
}
return result;
},
// 将规则中的reg中的macro替换掉
cleanRule = function(rule) {
var reg = rule.reg;
//如果已经是regexp了就转为string
if (typeOf(reg) === "regexp") reg = reg.toString().slice(1, -1);
//将macro替换
rule.regexp = reg.replace(replaceReg, function(a, b) {
if (b in macros) return macros[b];
else throw new Error('can"t replace undefined macros:' + b);
});
return rule;
}, cleanRules = function(rules) {
for (var i in rules) {
if (rules.hasOwnProperty(i)) cleanRule(rules[i]);
}
return rules;
};
// ##2. Parser
//
// 为何要抽象成一个类? 其实这里只用到了一个实例
// 事实上这个简单Parser还帮我实现了命令行参数解析，
// zen-coding的实现等等, 它可以帮助实现基于正则式的
// 字符串解析
function Parser(opts) {
opts = opts || {};
if (opts.macros) this._macros = opts.macros;
this._links = {}; //symbol link map
this._rules = {}; //symbol def
this.TRUNK = null;
this.cache = createCache(opts.maxCache || 200);
this.cache.set("", [[] ]); //输入空字符串返回空数组
}
extend(Parser.prototype, {
// ### 解析输入字符串input、返回action定义的data数据
parse: function(input) {
// 清理input数据、因为parsed数据最终会被缓存，
// 我们要尽量让相同的选择器只对应一份parsed数据
input = clean(input);
// 先检查缓存中是否有数据
if (parsed = this.cache.get(input)) return parsed;
// 如果没有: 初始化参数
var parsed = this.parsed = [
[null]
];
var remain = this.input = input;
var TRUNK = this.TRUNK;
var prevRemain;
// 将remain进行this._process这里每匹配一个字符串都会进行一次reduce
while (prevRemain != (remain = remain.replace(TRUNK, this._process.bind(this)))) {
prevRemain = remain;
}
// 如果没有被解析完 证明选择器字符串有不能被解析的部分
if (remain !== '') this.error(remain);
// 返回数据并推入cache
return this.cache.set(input, parsed);
},
// ###添加新规则 :
// 在nes中你可以想象成添加一个与Id、className、pesudo等价简单选择符
on: function(rules) {
if (typeOf(rules) === "string") { //当不是hash传入时
var tmp = {};
tmp[rules] = arguments[1];
rules = tmp;
}
// 可以同时接受object型或者key, value对的参数
for (var i in rules) {
var rule = rules[i];
if (typeOf(rule) !== "object") {
rule = {
regexp: rule
};
}
var reg = rule.regexp;
if (typeOf(reg) === "regexp") {
rule.regexp = reg.toString().slice(1, -1);
}
// 初始化order
if (rule.order === undefined) rule.order = 1;
this._rules[i] = rule;
}
// 每进行一次新规则监听，都重新组装一次
this.setup();
return this;
},
// ###__删除规则__ :
// 删除对应规则, 即nes的规则都是在运行时可删可增的
off: function(name) {
if (typeOf(name) === "array") {
for (var i = name.length; i--;) {
this.off(name[i]);
}
} else {
if (this._rules[name]) {
delete this._rules[name];
}
}
return this;
},
// 获得当前解析位置所在的datum，你只需要在这个datum中塞数据即可
current: function() {
var data = this.parsed;
var piece = data[data.length - 1],
len = piece.length;
return piece[len - 1] || (piece[len - 1] = {
tag: "*"
});
},
error: function(info) {
throw Error("输入  " + this.input + "  含有未识别语句:" + info || "");
},
clone: function(parser) {
return new Parser().on(this._rules);
},
// __`this.parser`__的依赖方法，
// 即遍历links检查是否有子匹配满足关系，
// 有则推入对应的action数组,
// 注意由于其是是replace方法的调用，每次都要返回""完成
// reduce操作
_process: function() {
var links = this._links,
rules = this._rules,
args = slice.call(arguments);
for (var i in links) {
var link = links[i],
retain = link[1],
index = parseInt(link[0]);
if (args[index] && (rule = rules[i])) {
rule.action.apply(this, args.slice(index, index + retain));
return "";
}
}
return "";
},
// 组装
setup: function() {
cleanRules(this._rules);
var curIndex = 1,
//当前下标
splits = [],
rules = this._rules,
links = this._links,
ruleNames = keys(rules).sort(function(a, b) {
return rules[a].order >= rules[b].order;
}),
len = ruleNames.length;
for (; len--;) {
var i = ruleNames[len],
rule = rules[i],
retain = extractRefNum(rule.regexp) + 1; // 1就是那个all
if (rule.filter && !filters[i]) {
filters[i] = rule.filter;
} //将filter转移到filters下
links[i] = [curIndex, retain]; //分别是rule名，参数数量
var regexp = extractRefIndex(rule.regexp, curIndex - 1);
curIndex += retain;
splits.push(regexp);
}
this.TRUNK = new RegExp("^(?:(" + splits.join(")|(") + "))");
return this;
}
});
// ### parse的规则定义部分开始
// 一些用到的正则式，但是又不属于parser的规则组成
var
replaceReg = /\{\{([^\}]*)\}\}/g,
//替换rule中的macro
nthValueReg = /^(?:(\d+)|([+-]?\d*)?n([+-]\d+)?)$/,
// nth伪类的value规则
posPesudoReg = /^(nth)[\w-]*(-of-type|-child)/,
//判断需要pos
// 第一个cache 用来装载nth伪类中的参数解析后的数据
// 如nth-child、nth-of-type等8个伪类
nthCache = createCache(100),
// 提取nthValue中的有用信息 比如an + b 我们需要提取出a以及,b并对额外情况如缺少a参数或b参数
// 或者有a、b小于0这些情况作统一处理，返回find适合使用的数据
extractNthValue = function(param) {
var step, start, res;
//如果无参数 当成是获取第一个元素
if (!param || !(param = param.replace(/\s+/g, ""))) {
return {
start: 1,
step: 0
};
}
if (res = nthCache.get(param)) return res;
// 对even odd等转化为标准的a，b组合(即step与start)
if (param == "even") {
start = 2;
step = 2;
} else if (param == "odd") {
step = 2;
start = 1;
} else {
res = param.match(nthValueReg);
// 对错误的nth参数抛出错误
if (!res) step = null; // 无论其他参数，如果step为null，则永远为false
else {
if (res[1]) {
step = 0;
start = parseInt(res[1]);
} else {
if (res[2] == "-") res[2] = "-1";
step = res[2] ? parseInt(res[2]) : 1;
start = res[3] ? parseInt(res[3]) : 0;
}
}
}
if (start < 1) {
if (step < 1) {
step = null; //标志false
} else {
start = -(-start) % step + step;
}
}
return nthCache.set(param, {
start: start,
step: step
});
};
// ### parse Rule 相关
// 了解bison等解析器生成的同学可以把这部分看成是词法与语法定义的杂糅
// 很混乱也很不标准，但对于选择器这种最简单的DSL其实够用，并且有了奇效
// 整个Parser根据rules动态产生(即可在使用时发生改变)
// 具体的流程是下面的rules对象定义了一组语法(词法?)rule——如attribute，
// 你可以把每个rule中的reg想象成一个token(word?),这些token可能会有{{word}}这种占位符
// 占位符首先会被macros中对应的macro替换，然后这些token会被组装成一个大版的Regexp，即上面的
// Trunk变量,这个过程没什么特殊，一般比较优秀的选择器都是基于这个方法。 在nes中,最终的Trunk可能是
// 这样的:
//
// `/(\s*,\s*)|(#([\w\u4e00-\u9fbf-]+))|(\*|\w+)|(\.([\w\u4e00-\u9fbf-]+))|
// (:([\w\u4e00-\u9fbf-]+)(?:\(([^\(\)]*|(?:\([^\)]+\)|[^\(\)]*)+)\))?)|
// (\[([\w\u4e00-\u9fbf-]+)(?:([*^$|~!]?=)['"]?((?:[\w\u4e00-\u9fbf-]||\s)+)['"]?)?\])|(::([\w\u4e00-\u9fbf-]+))
// |([>\s+~&%](?!=))|(\s*\{\s*(\d*),(\-?\d*)\s*\}\s*)/g`
//
// 看到上面那长串，你大概理解了将regexp按词法分开这样做的第一个原因 : __维护__.
// 第二个原因就是: __效率__  一次大型正则的调用时间要远低于多次小型正则的匹配(前提它们做同样规模的匹配)
var
// 一些macro
macros = {
split: "\\s*,\\s*",
// 分隔符
operator: "[*^$|~!]?=",
// 属性操作符 如= 、!=
combo: "[>\\s+~](?!=)",
// 连接符 如 > ~
word: "[\\\\\\w\\u00A1-\\uFFFF-]"
},
// 语法规则定义
rules = {
split: {
// 分隔符 如 ，
reg: "{{split}}",
action: function(all) {
this.parsed.push([null]);
},
order: 0
},
// id 如 #home
id: {
reg: "#({{word}}+)",
action: function(all, id) {
this.current().id = id;
}
},
// 节点类型选择符 如 div
tag: {
reg: "\\*|[a-zA-Z-]\\w*",
// 单纯的添加到
action: function(tag) {
this.current().tag = tag.toLowerCase();
}
},
// 类选择符 如 .m-home
classList: {
reg: "\\.({{word}}+)",
action: function(all, className) {
var current = this.current(),
classList = current.classList || (current.classList = []);
classList.push(className);
}
},
// 伪类选择符 如 :nth-child(3n+4)
pesudos: {
reg: ":({{word}}+)" + //伪类名
"(?:\\(" + //括号开始
"([^\\(\\)]*" + //第一种无括号
"|(?:" + //有括号(即伪类中仍有伪类并且是带括号的)
"\\([^\\)]+\\)" + //括号部分
"|[^\\(\\)]*" + ")+)" + //关闭有括号
"\\))?",
// 关闭最外圈括号
action: function(all, name, param) {
var current = this.current(),
pesudos = current.pesudos || (current.pesudos = []),
name = name.toLowerCase(),
res = {
name: name
};
if (param) param = param.trim();
if (posPesudoReg.test(name)) {
// parse 的成本是很小的 尽量在find前把信息准备好
// 这里我们会把nth-child(an+b) 的 a 与 b 在不同输入下标准化
param = extractNthValue(param);
}
if (param) res.param = param;
pesudos.push(res);
}
},
// 属性选择符  如  [class=hahaha]
//
// 这里以属性选择符为例，说明下reg与action的关系
//
attributes: {
reg: "\\[\\s*({{word}}+)(?:({{operator}})[\'\"]?([^\'\"\\[]+)[\'\"]?)?\\s*\\]",
action: function(all, key, operator, value) {
var current = this.current(),
attributes = current.attributes || (current.attributes = []);
var res = {};
attributes.push({
key: key,
operator: operator,
value: value
});
}
},
// 伪元素可以实现么？ 占位
combo: {
reg: "\\s*({{combo}})\\s*",
action: function(all, combo) {
var data = this.parsed,
cur = data[data.length - 1];
this.current().combo = combo;
cur.push(null);
},
order: 0
}
};
var cleanReg = new RegExp("\\s*(,|" + macros.combo + "|" + macros.operator + ")\\s*", "g");
clean = function(sl) {
return sl.trim().replace(/\s+/g, " ").replace(cleanReg, "$1");
};
// ### parser生成
// 初始化parser实例
var parser = new Parser();
parser.on(rules); //生成规则
// 为了兼容前面版本，仍然提供这个parse函数, 也为了与find想对应
function parse(sl) {
return parser.parse(sl);
}
//   3. Finder
// ================
//   Util
// -------------------------
// 将nodelist转变为array
//  DOM related Util
// --------------------
var root = doc.documentElement || doc;
var attrMap = {
'for': "htmlFor",
"href": function(node) {
return "href" in node ? node.getAttribute("href", 2) : node.getAttribute("href");
},
"type": function(node) {
return "type" in node ? node.getAttribute("type") : node.type;
}
};
var checkTagName = assert(function() {
testNode.appendChild(doc.createComment(""));
// 有些版本的getElementsByTagName("*")会返回注释节点
return !testNode.getElementsByTagName("*").length ||
// 低版本ie下input name 或者 id为length时 length返回异常
typeof doc.getElementsByTagName("input").length !== "number";
});
//form __sizzle__line200 判断getAttribute是否可信
var checkAttributes = assert(function() {
testNode.innerHTML = "<select></select>";
var type = typeOf(testNode.lastChild.getAttribute("multiple"));
// IE8 returns a string for some attributes even when not present
return type !== "boolean" && type !== "string";
});
// 将nth类方法的判断部分统一抽离出来,
// 其中type代表是否是nth-type-of类型的判断,下面类似
function checkNth(node, type) {
return type? node.nodeName === type : node.nodeType === 1;
}
// 获得父节点node的顺数第n(从1开始)个子节点
function nthChild(node, type) {
var node = node.firstChild;
return (!node || checkNth(node, type)) ? node : nthNext(node, type);
};
// 获得父节点node的倒数第n(从1开始)个子节点
function nthLastChild(node,type) {
var node = node.lastChild;
return (!node || checkNth(node, type))? node:nthPrev(node, type);
};
// 获得节点node的第n(从1开始)个前置兄弟节点
function nthPrev(node, type) {
while (node = node.previousSibling) {
if (checkNth(node, type)) return node;
}
return node;
};
// 获得节点node的倒数第n(从1开始)个前置兄弟节点
function nthNext(node, type) {
while (node = node.nextSibling) {
if (checkNth(node, type)) return node;
}
return node;
};
// 获得节点node的key属性的值, 修改自from sizzle...蛋疼啊各浏览器的属性获取
function getAttribute(node, key) {
var map = attrMap[key];
if (map) return typeof map === "function" ? map(node) : node[map];
if (checkAttributes) {
return node.getAttribute(key);
}
var attrNode = node.getAttributeNode(key);
// 对于selected checked 当返回为bool值时  将其标准化为 selected = "selected"
// 方便后续处理
// 很多时候null可以作为标志位，nes中大部分特殊flag都用null标示
return typeof node[key] === "boolean"
? node[key] ? key : null
: (attrNode && attrNode.specified ?attrNode.value : null);
};
// __数组去重__
function distinct(array) {
for (var i = array.length; i--;) {
var n = array[i];
// 先排除 即 如果它是清白的 后面就没有等值元素
array.splice(i, 1, null);
if (~array.indexOf(n)) {
array.splice(i, 1); //不清白
} else {
array.splice(i, 1, n); //不清白
}
}
return array;
}
// 从sizzle抄袭的 document sorter
// 将匹配元素集按文档顺序排列好 这很重要!
var sortor = (doc.compareDocumentPosition) ?
function(a, b) {
if (!a.compareDocumentPosition || !b.compareDocumentPosition) return 0;
return a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
} : ('sourceIndex' in doc) ?
function(a, b) {
if (!a.sourceIndex || !b.sourceIndex) return 0;
return a.sourceIndex - b.sourceIndex;
} : function(a, b) {
var i = 0,
ap = [a],
bp = [b],
aup = a.parentNode,
bup = b.parentNode,
cur = aup;
if (a === doc) {
return -1;
} else if (b === doc) {
return 1;
} else if (!aup && !bup) {
return 0;
} else if (!bup) {
return -1;
} else if (!aup) {
return 1;
} else if (aup === bup) {
return siblingCheck(a, b);
}
while (cur) {
ap.unshift(cur);
cur = cur.parentNode;
}
cur = bup;
while (cur) {
bp.unshift(cur);
cur = cur.parentNode;
}
while (ap[i] === bp[i]) {
i++;
}
return siblingCheck(ap[i], bp[i]);
};
function siblingCheck(a, b) {
if (a && b) {
var cur = a.nextSibling;
while (cur) {
if (cur === b) {
return -1;
}
cur = cur.nextSibling;
}
}
return a ? 1 : -1;
};
function uniqueSort(nodeList) {
return distinct(nodeList.sort(sortor));
};
// ### nth position Cache 部分
// 对于nth类型的查找，有时候一次节点查找会遍历到多次相同节点，
// 由于一次节点查找时，由于js的单线程，节点不可能发生改变，介于此，我们将
// nth类的node的节点位置缓存起来，在本次查找结束后再清空
// 获得node的唯一标示
var getUid = (function(token) {
var _uid = 0;
return function(node) {
return node._uid || (node._uid = token + _uid++);
};
})("nes_" + (+new Date).toString(36));
// 创建nth相关的Filter，由于都类似，就统一通过工厂函数生成了
// 参数有两个
//    1. isNext: 代表遍历顺序是向前还是向后
//    2. isType: 代表是否是要指定nodeName
function createNthFilter(isNext, isType) {
var next, prev, cacheKey, getStart;
if (isNext) {
cacheKey = isType ? "type" : "child";
// if(typeof isType === "function") cacheKey = "match"
next = nthNext;
prev = nthPrev;
getStart = nthChild;
} else {
// Fixed:!!! 这里cache是首次生成的cache被写死了，即使后面clear了也没有用,
// 即永远无法被释放
cacheKey = "last" + (isType ? "type" : "child");
// if(typeof isType === "function") cacheKey = "last-match"
prev = nthNext;
next = nthPrev;
getStart = nthLastChild;
}
// 实际返回函数, param即pesudo的action定义的参数形如
// `{step:1, start:1}` 所有的类似even、odd或者其他形如n、-3n-11都会标准化
// 成这种形势
return function(node, param) {
var cache = nthPositionCache[cacheKey];
if (node === root) return false; // 如果是html直接返回false 坑爹啊
var _uid = getUid(node),
parent = node.parentNode,
traverse = param.step > 0 ? next : prev,
step = param.step,
start = param.start,
type = isType && node.nodeName;
//Fixed
if (step === null) return false; //means always false
if (!cache[_uid]) {
var startNode = getStart(parent, type),
index = 0;
do {
cache[getUid(startNode)] = ++index;
nthPositionCache.length++;
} while (startNode = next(startNode, type));
}
var position = cache[_uid];
if (step === 0) return position === start;
return ((position - start) / step >= 0) && ((position - start) % step === 0);
};
}
//
var nthPositionCache = {length: 1 };
function clearNthPositionCache() {
if (nthPositionCache.length) {
nthPositionCache = {
child: {},
lastchild: {},
type: {},
lasttype: {},
length: 0
};
}
}
// 初始化positioncache
clearNthPositionCache();
// 这里的几个finders是第一轮获取目标节点集的依赖方法
// 我没有对byClassName做细致优化，比如用XPath的方式
// form sizzle line 147
var finders = {
byId: function(id) {
var node = doc.getElementById(id);
return node ? [node] : [];
},
byClassName: doc.getElementsByClassName ? function(classList, node) {
classList = classList.join(" ");
return toArray((node || doc).getElementsByClassName(classList));
} : null,
byTagName: checkTagName ? function(tagName, node) {
var results = (node || doc).getElementsByTagName(tagName);
return toArray(results);
} : function(tagName, node) {
var results = (node || doc).getElementsByTagName(tagName);
var elem, tmp = [],
i = 0;
for (;
(elem = results[i]); i++) {
if (elem.nodeType === 1) tmp.push(elem);
}
return tmp;
}
};
// ### filter:
// Action中塞入的数据会统一先这里处理，可能是直接处理如id、class等简单的.
// 也可能是分发处理，甚至是多重的分发，如那些复杂的attribute或者是pesudo
// 这里简化到过滤单个节点 逻辑清晰 ,但可能性能会降低，因为有些属性会重复获取
var filters = {
id: function(node, id) {
return node.id === id;
},
classList: function(node, classList) {
var len = classList.length,
className = " " + node.className + " ";
for (; len--;) {
if (className.indexOf(" " + classList[len] + " ") === -1) {
return false;
}
}
return true;
},
tag: function(node, tag) {
if (tag == "*") return true;
return node.tagName.toLowerCase() === tag;
},
// pesudos会分发到ExpandsFilter中pesudo中去处理
pesudos: function(node, pesudos) {
var len = pesudos.length,
pesudoFilters = expandFilters["pesudos"];
for (; len--;) {
var pesudo = pesudos[len],
name = pesudo.name,
filter = pesudoFilters[name];
if (!filter) throw Error("不支持的伪类:" + name);
if (!filter(node, pesudo.param)) return false;
}
return true;
},
// attributes会分发到ExpandsFilter中的operator去处理
attributes: function(node, attributes) {
var len = attributes.length,
operatorFilters = expandFilters["operators"];
for (; len--;) {
var attribute = attributes[len],
operator = attribute["operator"],
filter = operatorFilters[operator],
nodeValue = getAttribute(node, attribute.key);
if (nodeValue === null) {
if (operator !== "!=") return false;
continue;
}
if (!operator) continue;
if (!filter) throw Error("不支持的操作符:" + operator);
if (!filter(attribute.value, nodeValue + "")) return false;
}
return true;
}
};
// expandFilters
// -------------------------
// 原生可扩展的方法
var expandFilters = {
// __扩展连接符__:
// 选择符filter 与其他filter不同 node 同样是当前节点 区别是
// 如果成功返回成功的上游节点(可能是父节点 可能是兄弟节点等等)
// 其中 match(node) 返回 这个上游节点是否匹配剩余选择符(内部仍是一个递归)
combos: {
">": function(node, match) {
var parent = node.parentNode;
if (match(parent)) return parent;
},
"~": function(node, match) {
var prev = nthPrev(node);
while (prev) {
if (match(prev)) return prev;
prev = nthPrev(prev);
}
},
" ": function(node, match) {
var parent = node.parentNode;
while (parent) {
var pass = match(parent);
if (pass) return parent;
if (pass === null) return null;
parent = parent.parentNode;
}
return null;
},
"+": function(node, match) {
var prev = nthPrev(node);
if (prev && match(prev)) return prev;
}
},
// __扩展操作符__ :
operators: {
"^=": function(value, nodeValue) {
if (nodeValue == null) return false;
return nodeValue.indexOf(value) === 0;
},
"=": function(value, nodeValue) {
return nodeValue === value;
},
"~=": function(value, nodeValue) {
if (nodeValue == null) return false;
return ~ (" " + nodeValue + " ").indexOf(value);
},
"$=": function(value, nodeValue) { //以value结尾
return nodeValue.substr(nodeValue.length - value.length) === value;
},
"|=": function(value, nodeValue) { // 连接符
return ~ ("-" + nodeValue + "-").indexOf("-" + value + "-");
},
"*=": function(value, nodeValue) { //出现在nodeValue的任意位置
return ~ (nodeValue).indexOf(value);
},
"!=": function(value, nodeValue) {
return nodeValue !== value;
}
},
// __扩展伪类__:
pesudos: {
//TODO:这里如果出自 SELECtorAPI 标注下处处
"not": function(node, sl) {
return !matches(node, sl);
},
"matches": function(node, sl) {
return matches(node, sl);
},
// child pesudo 统一由工厂函数生成
"nth-child": createNthFilter(true, false),
"nth-last-child": createNthFilter(false, false),
"nth-of-type": createNthFilter(true, true),
"nth-last-of-type": createNthFilter(false, true),
"first-child": function(node) {
return !nthPrev(node);
},
"last-child": function(node) {
return !nthNext(node);
},
"last-of-type": function(node) {
return !nthNext(node, node.nodeName);
},
"first-of-type": function(node) {
return !nthPrev(node, node.nodeName);
},
"only-child": function(node) {
return !nthPrev(node) && !nthNext(node);
},
"only-of-type": function(node) {
return !nthPrev(node, node.nodeName) && !nthNext(node, node.nodeName);
},
//找出有具体text内容的节点
"contains": function(node, param) {
return ~ (node.innerText || node.textContent || '').indexOf(param);
},
"checked": function(node) {
return !!node.checked || !! node.selected;
},
"selected": function(node) {
return node.selected;
},
"enabled": function(node) {
return node.disabled === false;
},
"disabled": function(node) {
return node.disabled === true;
},
"empty": function(node) {
var nodeType;
node = node.firstChild;
while (node) {
if (node.nodeName > "@" || (nodeType = node.nodeType) === 3 || nodeType === 4) {
return false;
}
node = node.nextSibling;
}
return true;
},
"focus": function(node) {
return node === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !! (node.type || node.href || ~node.tabIndex);
},
"target": function(node, param) {
var id = node.id || node.name;
if (!id) return false;
return ("#" + id) === location.hash;
}
}
};
// 这里主要是整合之前的ExpandsFilter中的mathch, 单层数据
function matchDatum(node, datum, ignored) {
var subFilter;
for (var i in datum) {
if (ignored !== i && (subFilter = filters[i]) && !subFilter(node, datum[i])) {
return false;
}
}
return true;
};
// 这个全局cache的引入是为了避免多次传入参数。
// 当然全局的缺点也很明显，维护会不方便, 不利于测试
var matchesCache = null; //保存那些matches函数
function matchData(node, data, ignored) { // 稍后再看存入step
var len = data.length,
datum = data[len - 1];
// 首先要满足自身
if (!matchDatum(node, datum, ignored)) return false;
else {
if (len == 1) return true;
var nextDatum = data[len - 2],
getNext = expandFilters.combos[nextDatum.combo],
match = matchesCache[len - 2],
next = getNext(node, match);
if (next) return true;
else return false;
}
};
//动态产生供FilterOneNode使用的match
function createMatch(data) {
return function(node) {
if (node == root || node == null || node == doc) return null; //null 相当于休止符
return matchData(node, data);
};
};
function createMatches(data) {
var matches = [];
for (var i = 0, len = data.length; i < len; i++) {
matches.push(createMatch(data.slice(0, i + 1)));
}
return matches;
};
// 过滤主函数filter
// -----------------------------------
// 自底向上过滤非匹配节点
function filter(results, data, ignored) {
if (!data.length) return results;
//这里是为了缓存match匹配函数
var preMatchesCache = matchesCache;
matchesCache = createMatches(data);
for (var i = results.length; i--;) {
if (!matchData(results[i], data, ignored)) {
results.splice(i, 1);
}
}
// Fixed: 因为一次filter可能会有字filter调用，比如matches、not、include
matchesCache = preMatchesCache; // warning :以后写全局变量一定当心
return results;
}
// 获得第一次目标节点集
function getTargets(data, context) {
var results, ignored, lastPiece = data[data.length - 1];
if (lastPiece.id) {
results = finders.byId(lastPiece.id);
ignored = "id";
} else if (lastPiece.classList && lastPiece.classList.length && finders.byClassName) {
results = finders.byClassName(lastPiece.classList, context);
ignored = "classList";
} else {
results = finders.byTagName(lastPiece.tag || "*", context);
ignored = "tag";
}
if (!results.length) return results;
return filter(results, data, ignored);
}
// API : find (private)
// -------------
// 根据parse后的数据进行节点查找
// options:
//    1. parsed.data  parse数据为一数组
//    2. node         context节点
// 事实上没有data这个单词，我这里算是自定了这个单词
//     datas : [data,data]
//     data : [datum, datum]
//     datum: {tag:"*"....etc}
function find(datas, context) {
if (!datas[0][0]) return [];
var results = [],
notNullResult = 0;
for (var i = 0, len = datas.length; i < len; i++) {
var data = datas[i],
dlen = data.length,
last = data[dlen - 1],
result = getTargets(data, context);
if (result && result.length) {notNullResult++;};
if (!results) results = result;
else results =results.concat(result);
}
clearNthPositionCache();//清理
if (notNullResult > 1) uniqueSort(results);
return results;
}
// API : 测试用get相当于all (private)
// -------------------------------------
// 为了测试时避免原生querySelector的影响
//
function get(sl, context) {
var data = parse(sl);
var result = find(data, context || doc);
return result;
}
// API
// ----------------------------------------------------------------------
var supportQuerySelector = !! doc.querySelector;
// API1——__one__:对应标准的querySelector方法
function one(sl, context) {
var node;
if (supportQuerySelector && !nes.debug) {
try {
node = (context || doc).querySelector(sl);
} catch (e) {
node = get(sl, context)[0];
}
} else {
node = get(sl, context)[0];
}
return node;
}
// API2——__all__
// -------------------------------
// 对应标准的querySelectorAll方法
function all(sl, context) {
var nodeList;
if (supportQuerySelector && !nes.debug) {
try {
nodeList = toArray((context || doc).querySelectorAll(sl));
} catch (e) {
nodeList = get(sl, context);
}
} else {
nodeList = get(sl, context);
}
return nodeList;
}
// API 3:
// ----------------------------------------------------------------------
// 对应标准的matches方法
// nes的matches功能稍强，它支持用分隔符链接符组合的复杂选择器
// 即与all、one函数的支持是一样的
//
// 注: 由于:not与:matches依赖于这个函数 ,所以同样支持复杂选择器
function matches(node, sl) {
if (!node || node.nodeType !== 1) return false;
var datas = parse(sl),
len = datas.length;
if (!datas[len - 1][0]) return false;
for (; len--;) {
if (matchOneData(node, datas[len])) return true;
}
return false;
}
// matches 单步调用方法
function matchOneData(node, data) {
var len = data.length;
if (!matchDatum(node, data[len - 1])) {
return false;
} else {
return filter([node], data.slice(0)).length === 1;
}
}
// ASSEMBLE
// =========================
// 组装分为几个步骤
//
// 1. 生成pesudo 、 operator、combo 等expand方法
// ----------------------------------------------------------------------
// 具体扩展方法的使用请参见 [nes的github](https://github.com/leeluolee/nes)
// 统一由工厂函数createExpand
;
(function createExpand(host, beforeAssign) {
for (var i in host) {
nes[i] = (function(i) {
var container = host[i];
// autoSet代表了这三个函数除了key、value参数
// 也支持字面量的参数输入
return autoSet(function(key, value) {
// Warning: 直接覆盖，如果存在的话
container[key] = value;
if (i in beforeAssign) {
beforeAssign[i](key, value);
}
});
})(i);
}
// 有些扩展如combos、operators由于为了避免冲突
// 关键字都写入了正则式中，这种情况下需要将新的正则式
// 填入相关正则，并进行parser的setup
})(expandFilters, {
"operators": function(key) {
var befores = macros.operator.split("]");
befores.splice(1, 0, key.charAt(0) + "]");
macros.operator = befores.join("");
parser.setup();
},
"combos": function(key) {
var befores = macros.combo.split("]");
befores.splice(1, 0, key + "]");
macros.combo = befores.join("");
parser.setup();
}
});
// 2. 暴露API
// -------------------------------------
//
// 直接设置其为true 来强制不适用原生querySelector Api
nes.debug = false;
nes._nthCache = nthCache;
// parser , 抽离的parser部分
// ---------------------------
// 它可以:
//
//    1. parser.parse 解析内部规则定义的字符串匹配
//    2. parser.on    添加新规则
//    3. parser.clone 复制此parser，这个作用会在后面的zen-coding的demo中体现
//    4. parser.off   删除规则
//    5. parser.cache 缓存控制
nes.parser = parser;
//解析, 这个将被移除，使用parser.parse来代替
nes.parse = parse;
//查找parser解析后的data代表的节点 __private__
nes._find = find;
//测试时排除原生querySelector的影响 __deprecated__! 使用nes.debug来控制
nes._get = get;
//        *主要API*
// -------------------------
nes.one = one;
nes.all = all;
nes.matches = matches;
// 内建扩展 api 这三个已经内建:
//
// 1. `pesudos`
// 2. `operators`
// 3. `combos`
nes._uniqueSort = uniqueSort;
nes._cleanSelector = clean;
nes._getUid = getUid;
//          5.Exports
// ----------------------------------------------------------------------
// 暴露API:  amd || commonjs  || global
// 支持commonjs
if (typeof exports === 'object') {
module.exports = nes;
// 支持amd
} else if (typeof define === 'function' && define.amd) {
/* */define(function() {
return nes;
});
} else {
// 直接暴露到全局
win.nes = nes;
}
//        6. extension
//-------------------------------------------------------------
// 很多人不看extend文件夹， 所以这部分也作为Demo实例
/**
* nth Math 的调用方法
* @param  {[type]} first [description]
* @return {[type]}
*/
function nthMatch(first) {
return function(node, param) {
var tmp = param.split(/\s+of\s+/);
if(tmp.length<2) throw Error("no 'of' keyword in nth-match\"s selector");
var params = extractNthValue(tmp[0]),
sl = tmp[1],
testNode = node.parentNode[first? "firstChild":"lastChild"],
next = first? "nextSibling" : "previousSibling",
step = params.step,
start = params.start,
position = 0;
if(!matches(node, sl)) return false;
if (step === null) return false; //means always false
do {
if (testNode.nodeType === 1 && nes.matches(testNode, sl)) position++;
if (testNode === node) break;
} while (testNode = testNode[next]);
if (step === 0) return position === start;
return ((position - start) / step >= 0) && ((position - start) % step === 0);
};
}
nes.pesudos({
// 例如 :nth-match(3 of li.active) 第三个满足这个li.active的节点
"nth-match": nthMatch(true),
"nth-last-match": nthMatch(false),
"local-link": function(_node, param){
if(param) param = parseInt(param);
}
});
}(window, document, undefined);
I$(22,function (NEJ,_t0,_p,_o,_f,_r){
/**
* 节点选择器
*
* 结构示例
* ```html
* <ul class="w-tab">
*   <li class="itm">Tab-0</li>
*   <li class="itm">Tab-1</li>
*   <li class="itm">Tab-2</li>
*   <li class="itm js-selected">Tab-3</li>
*   <li class="itm">Tab-4</li>
*   <li class="itm">Tab-5</li>
* </ul>
* ```
*
* 脚本示例
* ```javascript
* NEJ.define([
*     'util/query/query',
*     'util/tab/tab'
* ],function(_e,_t){
*     // 使用选择器接口来取列表
*     _t._$$Tab._$allocate({
*         list:_e._$all('.w-tab > li'),
*         onchange:function(_event){
*                // TODO
*         }
*     });
* });
* ```
*
* @method module:util/query/query._$all
* @param  {String} arg0 - 选择器
* @param  {Node}   arg1 - 用于匹配的根节点，默认为document
* @return {Array}         符合规则的节点列表
*/
_p._$all = function(){
try{
return nes.all.apply(nes,arguments);
}catch(e){
return null;
}
};
/**
* 节点选择器
*
* 结构示例
* ```html
* <ul class="w-tab">
*   <li class="itm">Tab-0</li>
*   <li class="itm">Tab-1</li>
*   <li class="itm">Tab-2</li>
*   <li class="itm js-selected">Tab-3</li>
*   <li class="itm">Tab-4</li>
*   <li class="itm">Tab-5</li>
* </ul>
* ```
*
* 脚本示例
* ```javascript
* NEJ.define([
*     'util/query/query'
* ],function(_t){
*     // 使用选择器接口来取选中的节点
*     var _node = _t._$one('.w-tab > li.js-selected');
* });
* ```
*
* @method module:util/query/query._$one
* @param  {String} arg0 - 选择器
* @param  {Node}   arg1 - 用于匹配的根节点，默认为document
* @return {Node}          符合规则的节点
*/
_p._$one = function(){
try{
return nes.one.apply(nes,arguments);
}catch(e){
return null;
}
};
// for test only
_p._$g = nes._get;
if (CMPT){
NEJ.copy(NEJ.P('nej.e'),_p);
}
return _p;
},7,64);
/**
@author	leeluolee
@version	0.2.15-alpha
@homepage	http://regularjs.github.io
*/
;(function(){
'use strict';
/**
* Require the given path.
*
* @param {String} path
* @return {Object} exports
* @api public
*/
function require(path, parent, orig) {
var resolved = require.resolve(path);
// lookup failed
if (null == resolved) {
throwError()
return
}
var module = require.modules[resolved];
// perform real require()
// by invoking the module's
// registered function
if (!module._resolving && !module.exports) {
var mod = {};
mod.exports = {};
mod.client = mod.component = true;
module._resolving = true;
module.call(this, mod.exports, require.relative(resolved), mod);
delete module._resolving;
module.exports = mod.exports;
}
function throwError () {
orig = orig || path;
parent = parent || 'root';
var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
err.path = orig;
err.parent = parent;
err.require = true;
throw err;
}
return module.exports;
}
/**
* Registered modules.
*/
require.modules = {};
/**
* Registered aliases.
*/
require.aliases = {};
/**
* Resolve `path`.
*
* Lookup:
*
*   - PATH/index.js
*   - PATH.js
*   - PATH
*
* @param {String} path
* @return {String} path or null
* @api private
*/
require.exts = [
'',
'.js',
'.json',
'/index.js',
'/index.json'
];
require.resolve = function(path) {
if (path.charAt(0) === '/') path = path.slice(1);
for (var i = 0; i < 5; i++) {
var fullPath = path + require.exts[i];
if (require.modules.hasOwnProperty(fullPath)) return fullPath;
if (require.aliases.hasOwnProperty(fullPath)) return require.aliases[fullPath];
}
};
/**
* Normalize `path` relative to the current path.
*
* @param {String} curr
* @param {String} path
* @return {String}
* @api private
*/
require.normalize = function(curr, path) {
var segs = [];
if ('.' != path.charAt(0)) return path;
curr = curr.split('/');
path = path.split('/');
for (var i = 0; i < path.length; ++i) {
if ('..' === path[i]) {
curr.pop();
} else if ('.' != path[i] && '' != path[i]) {
segs.push(path[i]);
}
}
return curr.concat(segs).join('/');
};
/**
* Register module at `path` with callback `definition`.
*
* @param {String} path
* @param {Function} definition
* @api private
*/
require.register = function(path, definition) {
require.modules[path] = definition;
};
/**
* Alias a module definition.
*
* @param {String} from
* @param {String} to
* @api private
*/
require.alias = function(from, to) {
if (!require.modules.hasOwnProperty(from)) {
throwError()
return
}
require.aliases[to] = from;
function throwError () {
throw new Error('Failed to alias "' + from + '", it does not exist');
}
};
/**
* Return a require function relative to the `parent` path.
*
* @param {String} parent
* @return {Function}
* @api private
*/
require.relative = function(parent) {
var p = require.normalize(parent, '..');
/**
* The relative require() itself.
*/
function localRequire(path) {
var resolved = localRequire.resolve(path);
return require(resolved, parent, path);
}
/**
* Resolve relative to the parent.
*/
localRequire.resolve = function(path) {
var c = path.charAt(0);
if ('/' === c) return path.slice(1);
if ('.' === c) return require.normalize(p, path);
// resolve deps by returning
// the dep in the nearest "deps"
// directory
var segs = parent.split('/');
var i = segs.length;
while (i--) {
if (segs[i] === 'deps') {
break;
}
}
path = segs.slice(0, i + 2).join('/') + '/deps/' + path;
return path;
};
/**
* Check if module is defined at `path`.
*/
localRequire.exists = function(path) {
return require.modules.hasOwnProperty(localRequire.resolve(path));
};
return localRequire;
};
require.register("regularjs/src/Regular.js", function(exports, require, module){
var Lexer = require("./parser/Lexer.js");
var Parser = require("./parser/Parser.js");
var dom = require("./dom.js");
var config = require("./config.js");
var Group = require('./group.js');
var _ = require('./util');
var extend = require('./helper/extend.js');
var Event = require('./helper/event.js');
var combine = require('./helper/combine.js');
var Watcher = require('./helper/watcher.js');
var parse = require('./helper/parse.js');
var doc = typeof document==='undefined'? {} : document;
var env = require('./env.js');
/**
* `Regular` is regularjs's NameSpace and BaseClass. Every Component is inherited from it
*
* @class Regular
* @module Regular
* @constructor
* @param {Object} options specification of the component
*/
var Regular = function(options){
var prevRunning = env.isRunning;
env.isRunning = true;
var node, template;
options = options || {};
options.data = options.data || {};
options.computed = options.computed || {};
if(this.data) _.extend(options.data, this.data);
if(this.computed) _.extend(options.computed, this.computed);
_.extend(this, options, true);
if(this.$parent){
this.$parent._append(this);
}
this._children = [];
this.$refs = {};
template = this.template;
// template is a string (len < 40). we will find it container first
if((typeof template === 'string' && template.length < 40) && (node = dom.find(template))) {
template = node.innerHTML;
}
// if template is a xml
if(template && template.nodeType) template = template.innerHTML;
if(typeof template === 'string') this.template = new Parser(template).parse();
this.computed = handleComputed(this.computed);
this.$context = this.$context || this;
this.$root = this.$root || this;
// if have events
if(this.events){
this.$on(this.events);
this.events = null;
}
this.config && this.config(this.data);
// handle computed
if(template){
this.group = this.$compile(this.template, {namespace: options.namespace});
combine.node(this);
}
if(this.$root === this) this.$update();
this.$ready = true;
if(this.$context === this) this.$emit("$init");
if( this.init ) this.init(this.data);
// @TODO: remove, maybe , there is no need to update after init;
// if(this.$root === this) this.$update();
env.isRunning = prevRunning;
// children is not required;
}
var walkers = require('./walkers.js');
walkers.Regular = Regular;
// description
// -------------------------
// 1. Regular and derived Class use same filter
_.extend(Regular, {
// private data stuff
_directives: { __regexp__:[] },
_plugins: {},
_exprCache:{},
_running: false,
_config: config,
_protoInheritCache: ['use', 'directive'] ,
__after__: function(supr, o) {
var template;
this.__after__ = supr.__after__;
if(o.name) Regular.component(o.name, this);
if(template = o.template){
var node, name;
if( typeof template === 'string' && template.length < 20 && ( node = dom.find( template )) ){
template = node.innerHTML;
if(name = dom.attr(node, 'name')) Regular.component(name, this);
}
if(template.nodeType) template = template.innerHTML;
if(typeof template === 'string'){
this.prototype.template = new Parser(template).parse();
}
}
if(o.computed) this.prototype.computed = handleComputed(o.computed);
// inherit directive and other config from supr
Regular._inheritConfig(this, supr);
},
/**
* Define a directive
*
* @method directive
* @return {Object} Copy of ...
*/
directive: function(name, cfg){
if(_.typeOf(name) === "object"){
for(var k in name){
if(name.hasOwnProperty(k)) this.directive(k, name[k]);
}
return this;
}
var type = _.typeOf(name);
var directives = this._directives, directive;
if(cfg == null){
if( type === "string" && (directive = directives[name]) ) return directive;
else{
var regexp = directives.__regexp__;
for(var i = 0, len = regexp.length; i < len ; i++){
directive = regexp[i];
var test = directive.regexp.test(name);
if(test) return directive;
}
}
return undefined;
}
if(typeof cfg === 'function') cfg = { link: cfg }
if(type === 'string') directives[name] = cfg;
else if(type === 'regexp'){
cfg.regexp = name;
directives.__regexp__.push(cfg)
}
return this
},
plugin: function(name, fn){
var plugins = this._plugins;
if(fn == null) return plugins[name];
plugins[name] = fn;
return this;
},
use: function(fn){
if(typeof fn === "string") fn = Regular.plugin(fn);
if(typeof fn !== "function") return this;
fn(this, Regular);
return this;
},
// config the Regularjs's global
config: function(name, value){
var needGenLexer = false;
if(typeof name === "object"){
for(var i in name){
// if you config
if( i ==="END" || i==='BEGIN' )  needGenLexer = true;
config[i] = name[i];
}
}
if(needGenLexer) Lexer.setup();
},
expression: parse.expression,
parse: parse.parse,
Parser: Parser,
Lexer: Lexer,
_addProtoInheritCache: function(name){
if( Array.isArray( name ) ){
return name.forEach(Regular._addProtoInheritCache);
}
var cacheKey = "_" + name + "s"
Regular._protoInheritCache.push(name)
Regular[cacheKey] = {};
Regular[name] = function(key, cfg){
var cache = this[cacheKey];
if(typeof key === "object"){
for(var i in key){
if(key.hasOwnProperty(i)) this[name](i, key[i]);
}
return this;
}
if(cfg == null) return cache[key];
cache[key] = cfg;
return this;
}
},
_inheritConfig: function(self, supr){
// prototype inherit some Regular property
// so every Component will have own container to serve directive, filter etc..
var defs = Regular._protoInheritCache;
var keys = _.slice(defs);
keys.forEach(function(key){
self[key] = supr[key];
var cacheKey = '_' + key + 's';
if(supr[cacheKey]) self[cacheKey] = _.createObject(supr[cacheKey]);
})
return self;
}
});
extend(Regular);
Regular._addProtoInheritCache(["filter", "component"])
Event.mixTo(Regular);
Watcher.mixTo(Regular);
Regular.implement({
init: function(){},
config: function(){},
destroy: function(){
// destroy event wont propgation;
if(this.$context === this) this.$emit("$destroy");
this.group && this.group.destroy(true);
this.group = null;
this.parentNode = null;
this._watchers = null;
this._children = [];
var parent = this.$parent;
if(parent){
var index = parent._children.indexOf(this);
parent._children.splice(index,1);
}
this.$parent = null;
this.$root = null;
this._handles = null;
this.$refs = null;
},
/**
* compile a block ast ; return a group;
* @param  {Array} parsed ast
* @param  {[type]} record
* @return {[type]}
*/
$compile: function(ast, options){
options = options || {};
if(typeof ast === 'string'){
ast = new Parser(ast).parse()
}
var preNs = this.__ns__,
record = options.record,
records;
if(options.namespace) this.__ns__ = options.namespace;
if(record) this._record();
var group = this._walk(ast, options);
if(record){
records = this._release();
var self = this;
if(records.length){
// auto destroy all wather;
group.ondestroy = function(){ self.$unwatch(records); }
}
}
if(options.namespace) this.__ns__ = preNs;
return group;
},
/**
* create two-way binding with another component;
* *warn*:
*   expr1 and expr2 must can operate set&get, for example: the 'a.b' or 'a[b + 1]' is set-able, but 'a.b + 1' is not,
*   beacuse Regular dont know how to inverse set through the expression;
*
*   if before $bind, two component's state is not sync, the component(passed param) will sync with the called component;
*
* *example: *
*
* ```javascript
* // in this example, we need to link two pager component
* var pager = new Pager({}) // pager compoennt
* var pager2 = new Pager({}) // another pager component
* pager.$bind(pager2, 'current'); // two way bind throw two component
* pager.$bind(pager2, 'total');   //
* // or just
* pager.$bind(pager2, {"current": "current", "total": "total"})
* ```
*
* @param  {Regular} component the
* @param  {String|Expression} expr1     required, self expr1 to operate binding
* @param  {String|Expression} expr2     optional, other component's expr to bind with, if not passed, the expr2 will use the expr1;
* @return          this;
*/
$bind: function(component, expr1, expr2){
var type = _.typeOf(expr1);
if( expr1.type === 'expression' || type === 'string' ){
this._bind(component, expr1, expr2)
}else if( type === "array" ){ // multiply same path binding through array
for(var i = 0, len = expr1.length; i < len; i++){
this._bind(component, expr1[i]);
}
}else if(type === "object"){
for(var i in expr1) if(expr1.hasOwnProperty(i)){
this._bind(component, i, expr1[i]);
}
}
// digest
component.$update();
return this;
},
/**
* unbind one component( see $bind also)
*
* unbind will unbind all relation between two component
*
* @param  {Regular} component [description]
* @return {This}    this
*/
$unbind: function(){
// todo
},
$get: function(expr){
return parse.expression(expr).get(this);
},
$inject: function(node, position){
var fragment = combine.node(this);
if(typeof node === 'string') node = dom.find(node);
if(!node) throw 'injected node is not found';
if(!fragment) return;
dom.inject(fragment, node, position);
this.$emit("$inject", node);
this.parentNode = Array.isArray(fragment)? fragment[0].parentNode: fragment.parentNode;
return this;
},
// private bind logic
_bind: function(component, expr1, expr2){
var self = this;
// basic binding
if(!component || !(component instanceof Regular)) throw "$bind() should pass Regular component as first argument";
if(!expr1) throw "$bind() should  pass as least one expression to bind";
if(!expr2) expr2 = expr1;
expr1 = parse.expression( expr1 );
expr2 = parse.expression( expr2 );
// set is need to operate setting ;
if(expr2.set){
var wid1 = this.$watch( expr1, function(value){
component.$update(expr2, value)
});
component.$on('$destroy', function(){
self.$unwatch(wid1)
})
}
if(expr1.set){
var wid2 = component.$watch(expr2, function(value){
self.$update(expr1, value)
});
// when brother destroy, we unlink this watcher
this.$on('$destroy', component.$unwatch.bind(component,wid2))
}
// sync the component's state to called's state
expr2.set(component, expr1.get(this));
},
_walk: function(ast, arg1){
if( _.typeOf(ast) === 'array' ){
var res = [];
for(var i = 0, len = ast.length; i < len; i++){
res.push( this._walk(ast[i], arg1) );
}
return new Group(res);
}
if(typeof ast === 'string') return doc.createTextNode(ast)
return walkers[ast.type || "default"].call(this, ast, arg1);
},
_append: function(component){
this._children.push(component);
component.$root = this.$root;
component.$parent = this;
},
_handleEvent: function(elem, type, value, attrs){
var Component = this.constructor,
fire = typeof value !== "function"? _.handleEvent.call( this, value, type ) : value,
handler = Component.event(type), destroy;
if ( handler ) {
destroy = handler.call(this, elem, fire, attrs);
} else {
dom.on(elem, type, fire);
}
return handler ? destroy : function() {
dom.off(elem, type, fire);
}
},
// find filter
_f_: function(name){
var Component = this.constructor;
var filter = Component.filter(name);
if(typeof filter !== 'function') throw 'filter ' + name + 'is undefined';
return filter;
},
// simple accessor get
_sg_:function(path, defaults){
var computed = this.computed,
computedProperty = computed[path];
if(computedProperty){
if(computedProperty.get)  return computedProperty.get(this);
else _.log("the computed '" + path + "' don't define the get function,  get data."+path + " altnately", "error")
}
return defaults;
},
// simple accessor set
_ss_:function(path, value, data, op){
var computed = this.computed,
op = op || "=",
computedProperty = computed[path],
prev;
if(op!== '='){
prev = computedProperty? computedProperty.get(this): data[path];
switch(op){
case "+=":
value = prev + value;
break;
case "-=":
value = prev - value;
break;
case "*=":
value = prev * value;
break;
case "/=":
value = prev / value;
break;
case "%=":
value = prev % value;
break;
}
}
if(computedProperty) {
if(computedProperty.set) return computedProperty.set(this, value);
else _.log("the computed '" + path + "' don't define the set function,  assign data."+path + " altnately", "error" )
}
data[path] = value;
return value;
}
});
Regular.prototype.inject = Regular.prototype.$inject;
module.exports = Regular;
var handleComputed = (function(){
// wrap the computed getter;
function wrapGet(get){
return function(context){
var ctx = context.$context;
return get.call(ctx, ctx.data );
}
}
// wrap the computed setter;
function wrapSet(set){
return function(context, value){
var ctx = context.$context;
set.call( ctx, value, ctx.data );
return value;
}
}
return function(computed){
if(!computed) return;
var parsedComputed = {}, handle, pair, type;
for(var i in computed){
handle = computed[i]
type = typeof handle;
if(handle.type === 'expression'){
parsedComputed[i] = handle;
continue;
}
if( type === "string" ){
parsedComputed[i] = parse.expression(handle)
}else{
pair = parsedComputed[i] = {type: 'expression'};
if(type === "function" ){
pair.get = wrapGet(handle);
}else{
if(handle.get) pair.get = wrapGet(handle.get);
if(handle.set) pair.set = wrapSet(handle.set);
}
}
}
return parsedComputed;
}
})();
});
require.register("regularjs/src/util.js", function(exports, require, module){
require('./helper/shim.js');
var _  = module.exports;
var entities = require('./helper/entities.js');
var slice = [].slice;
var o2str = ({}).toString;
var win = typeof window !=='undefined'? window: global;
_.noop = function(){};
_.uid = (function(){
var _uid=0;
return function(){
return _uid++;
}
})();
_.varName = '_d_';
_.setName = '_p_';
_.ctxName = '_c_';
_.rWord = /^[\$\w]+$/;
_.rSimpleAccessor = /^[\$\w]+(\.[\$\w]+)*$/;
_.nextTick = typeof setImmediate === 'function'?
setImmediate.bind(win) :
function(callback) {
setTimeout(callback, 0)
}
var prefix =  "var " + _.ctxName + "=context.$context||context;" + "var " + _.varName + "=context.data;";
_.host = "data";
_.slice = function(obj, start, end){
var res = [];
for(var i = start || 0, len = end || obj.length; i < len; i++){
var item = obj[i];
res.push(item)
}
return res;
}
_.typeOf = function (o) {
return o == null ? String(o) : ({}).toString.call(o).slice(8, -1).toLowerCase();
}
_.extend = function( o1, o2, override ){
if(_.typeOf(override) === 'array'){
for(var i = 0, len = override.length; i < len; i++ ){
var key = override[i];
o1[key] = o2[key];
}
}else{
for(var i in o2){
if( typeof o1[i] === "undefined" || override === true ){
o1[i] = o2[i]
}
}
}
return o1;
}
_.makePredicate = function makePredicate(words, prefix) {
if (typeof words === "string") {
words = words.split(" ");
}
var f = "",
cats = [];
out: for (var i = 0; i < words.length; ++i) {
for (var j = 0; j < cats.length; ++j){
if (cats[j][0].length === words[i].length) {
cats[j].push(words[i]);
continue out;
}
}
cats.push([words[i]]);
}
function compareTo(arr) {
if (arr.length === 1) return f += "return str === '" + arr[0] + "';";
f += "switch(str){";
for (var i = 0; i < arr.length; ++i){
f += "case '" + arr[i] + "':";
}
f += "return true}return false;";
}
// When there are more than three length categories, an outer
// switch first dispatches on the lengths, to save on comparisons.
if (cats.length > 3) {
cats.sort(function(a, b) {
return b.length - a.length;
});
f += "switch(str.length){";
for (var i = 0; i < cats.length; ++i) {
var cat = cats[i];
f += "case " + cat[0].length + ":";
compareTo(cat);
}
f += "}";
// Otherwise, simply generate a flat `switch` statement.
} else {
compareTo(words);
}
return new Function("str", f);
}
_.trackErrorPos = (function (){
// linebreak
var lb = /\r\n|[\n\r\u2028\u2029]/g;
function findLine(lines, pos){
var tmpLen = 0;
for(var i = 0,len = lines.length; i < len; i++){
var lineLen = (lines[i] || "").length;
if(tmpLen + lineLen > pos) return {num: i, line: lines[i], start: pos - tmpLen};
// 1 is for the linebreak
tmpLen = tmpLen + lineLen + 1;
}
}
return function(input, pos){
if(pos > input.length-1) pos = input.length-1;
lb.lastIndex = 0;
var lines = input.split(lb);
var line = findLine(lines,pos);
var len = line.line.length;
var min = line.start - 10;
if(min < 0) min = 0;
var max = line.start + 10;
if(max > len) max = len;
var remain = line.line.slice(min, max);
var prefix = (line.num+1) + "> " + (min > 0? "..." : "")
var postfix = max < len ? "...": "";
return prefix + remain + postfix + "\n" + new Array(line.start + prefix.length + 1).join(" ") + "^";
}
})();
var ignoredRef = /\((\?\!|\?\:|\?\=)/g;
_.findSubCapture = function (regStr) {
var left = 0,
right = 0,
len = regStr.length,
ignored = regStr.match(ignoredRef); // ignored uncapture
if(ignored) ignored = ignored.length
else ignored = 0;
for (; len--;) {
var letter = regStr.charAt(len);
if (len === 0 || regStr.charAt(len - 1) !== "\\" ) {
if (letter === "(") left++;
if (letter === ")") right++;
}
}
if (left !== right) throw "RegExp: "+ regStr + "'s bracket is not marched";
else return left - ignored;
};
_.escapeRegExp = function( str){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
return str.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match){
return '\\' + match;
});
};
var rEntity = new RegExp("&(" + Object.keys(entities).join('|') + ');', 'gi');
_.convertEntity = function(chr){
return ("" + chr).replace(rEntity, function(all, capture){
return String.fromCharCode(entities[capture])
});
}
// simple get accessor
_.createObject = function(o, props){
function Foo() {}
Foo.prototype = o;
var res = new Foo;
if(props) _.extend(res, props);
return res;
}
_.createProto = function(fn, o){
function Foo() { this.constructor = fn;}
Foo.prototype = o;
return (fn.prototype = new Foo());
}
/**
clone
*/
_.clone = function clone(obj){
var type = _.typeOf(obj);
if(type === 'array'){
var cloned = [];
for(var i=0,len = obj.length; i< len;i++){
cloned[i] = obj[i]
}
return cloned;
}
if(type === 'object'){
var cloned = {};
for(var i in obj) if(obj.hasOwnProperty(i)){
cloned[i] = obj[i];
}
return cloned;
}
return obj;
}
_.equals = function(now, old){
var type = _.typeOf(now);
if(type === 'array'){
var splices = ld(now, old||[]);
return splices;
}
if(type === 'number' && typeof old === 'number'&& isNaN(now) && isNaN(old)) return true
return now === old;
}
//Levenshtein_distance
//=================================================
//1. http://en.wikipedia.org/wiki/Levenshtein_distance
//2. github.com:polymer/observe-js
var ld = (function(){
function equals(a,b){
return a === b;
}
function ld(array1, array2){
var n = array1.length;
var m = array2.length;
var matrix = [];
for(var i = 0; i <= n; i++){
matrix.push([i]);
}
for(var j=1;j<=m;j++){
matrix[0][j]=j;
}
for(var i = 1; i <= n; i++){
for(var j = 1; j <= m; j++){
if(equals(array1[i-1], array2[j-1])){
matrix[i][j] = matrix[i-1][j-1];
}else{
matrix[i][j] = Math.min(
matrix[i-1][j]+1, //delete
matrix[i][j-1]+1//add
)
}
}
}
return matrix;
}
function whole(arr2, arr1) {
var matrix = ld(arr1, arr2)
var n = arr1.length;
var i = n;
var m = arr2.length;
var j = m;
var edits = [];
var current = matrix[i][j];
while(i>0 || j>0){
// the last line
if (i === 0) {
edits.unshift(3);
j--;
continue;
}
// the last col
if (j === 0) {
edits.unshift(2);
i--;
continue;
}
var northWest = matrix[i - 1][j - 1];
var west = matrix[i - 1][j];
var north = matrix[i][j - 1];
var min = Math.min(north, west, northWest);
if (min === west) {
edits.unshift(2); //delete
i--;
current = west;
} else if (min === northWest ) {
if (northWest === current) {
edits.unshift(0); //no change
} else {
edits.unshift(1); //update
current = northWest;
}
i--;
j--;
} else {
edits.unshift(3); //add
j--;
current = north;
}
}
var LEAVE = 0;
var ADD = 3;
var DELELE = 2;
var UPDATE = 1;
var n = 0;m=0;
var steps = [];
var step = {index: null, add:0, removed:[]};
for(var i=0;i<edits.length;i++){
if(edits[i] > 0 ){ // NOT LEAVE
if(step.index === null){
step.index = m;
}
} else { //LEAVE
if(step.index != null){
steps.push(step)
step = {index: null, add:0, removed:[]};
}
}
switch(edits[i]){
case LEAVE:
n++;
m++;
break;
case ADD:
step.add++;
m++;
break;
case DELELE:
step.removed.push(arr1[n])
n++;
break;
case UPDATE:
step.add++;
step.removed.push(arr1[n])
n++;
m++;
break;
}
}
if(step.index != null){
steps.push(step)
}
return steps
}
return whole;
})();
_.throttle = function throttle(func, wait){
var wait = wait || 100;
var context, args, result;
var timeout = null;
var previous = 0;
var later = function() {
previous = +new Date;
timeout = null;
result = func.apply(context, args);
context = args = null;
};
return function() {
var now = + new Date;
var remaining = wait - (now - previous);
context = this;
args = arguments;
if (remaining <= 0 || remaining > wait) {
clearTimeout(timeout);
timeout = null;
previous = now;
result = func.apply(context, args);
context = args = null;
} else if (!timeout) {
timeout = setTimeout(later, remaining);
}
return result;
};
};
// hogan escape
// ==============
_.escape = (function(){
var rAmp = /&/g,
rLt = /</g,
rGt = />/g,
rApos = /\'/g,
rQuot = /\"/g,
hChars = /[&<>\"\']/;
return function(str) {
return hChars.test(str) ?
str
.replace(rAmp, '&amp;')
.replace(rLt, '&lt;')
.replace(rGt, '&gt;')
.replace(rApos, '&#39;')
.replace(rQuot, '&quot;') :
str;
}
})();
_.cache = function(max){
max = max || 1000;
var keys = [],
cache = {};
return {
set: function(key, value) {
if (keys.length > this.max) {
cache[keys.shift()] = undefined;
}
//
if(cache[key] === undefined){
keys.push(key);
}
cache[key] = value;
return value;
},
get: function(key) {
if (key === undefined) return cache;
return cache[key];
},
max: max,
len:function(){
return keys.length;
}
};
}
// setup the raw Expression
_.touchExpression = function(expr){
if(expr.type === 'expression'){
if(!expr.get){
expr.get = new Function("context", prefix + "return (" + expr.body + ")");
expr.body = null;
if(expr.setbody){
expr.set = function(ctx, value){
if(expr.setbody){
expr.set = new Function('context', _.setName ,  prefix + expr.setbody);
expr.setbody = null;
}
return expr.set(ctx, value);
}
}
}
}
return expr;
}
// handle the same logic on component's `on-*` and element's `on-*`
// return the fire object
_.handleEvent = function(value, type ){
var self = this, evaluate;
if(value.type === 'expression'){ // if is expression, go evaluated way
evaluate = value.get;
}
if(evaluate){
return function fire(obj){
self.data.$event = obj;
var res = evaluate(self);
if(res === false && obj && obj.preventDefault) obj.preventDefault();
delete self.data.$event;
self.$update();
}
}else{
return function fire(){
var args = slice.call(arguments)
args.unshift(value);
self.$emit.apply(self.$context, args);
self.$update();
}
}
}
// only call once
_.once = function(fn){
var time = 0;
return function(){
if( time++ === 0) fn.apply(this, arguments);
}
}
_.log = function(msg, type){
if(typeof console !== "undefined")  console[type || "log"](msg);
}
//http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
_.isVoidTag = _.makePredicate("area base br col embed hr img input keygen link menuitem meta param source track wbr r-content");
_.isBooleanAttr = _.makePredicate('selected checked disabled readOnly required open autofocus controls autoplay compact loop defer multiple');
_.isFalse - function(){return false}
_.isTrue - function(){return true}
_.assert = function(test, msg){
if(!test) throw msg;
}
_.defineProperty = function(){
}
});
require.register("regularjs/src/walkers.js", function(exports, require, module){
var node = require("./parser/node.js");
var dom = require("./dom.js");
var animate = require("./helper/animate.js");
var Group = require('./group.js');
var _ = require('./util');
var combine = require('./helper/combine.js');
var walkers = module.exports = {};
walkers.list = function(ast){
var Regular = walkers.Regular;
var placeholder = document.createComment("Regular list"),
namespace = this.__ns__;
// proxy Component to implement list item, so the behaviar is similar with angular;
var Section =  Regular.extend( {
template: ast.body,
$context: this.$context,
// proxy the event to $context
$on: this.$context.$on.bind(this.$context),
$off: this.$context.$off.bind(this.$context),
$emit: this.$context.$emit.bind(this.$context)
});
Regular._inheritConfig(Section, this.constructor);
// var fragment = dom.fragment();
// fragment.appendChild(placeholder);
var self = this;
var group = new Group();
group.push(placeholder);
var indexName = ast.variable + '_index';
var variable = ast.variable;
// group.push(placeholder);
function update(newValue, splices){
newValue = newValue || [];
if(!splices || !splices.length) return;
var cur = placeholder;
var m = 0, len = newValue.length,
mIndex = splices[0].index;
for(var i = 0; i < splices.length; i++){ //init
var splice = splices[i];
var index = splice.index; // beacuse we use a comment for placeholder
for(var k = m; k < index; k++){ // no change
var sect = group.get( k + 1 );
sect.data[indexName] = k;
}
for(var j = 0, jlen = splice.removed.length; j< jlen; j++){ //removed
var removed = group.children.splice( index + 1, 1)[0];
removed.destroy(true);
}
for(var o = index; o < index + splice.add; o++){ //add
// prototype inherit
var item = newValue[o];
var data = _.createObject(self.data);
data[indexName] = o;
data[variable] = item;
//@TODO
var section = new Section({data: data, $parent: self , namespace: namespace});
// autolink
var insert =  combine.last(group.get(o));
// animate.inject(combine.node(section),insert,'after')
if(insert.parentNode){
animate.inject(combine.node(section),insert, 'after');
}
// insert.parentNode.insertBefore(combine.node(section), insert.nextSibling);
group.children.splice( o + 1 , 0, section);
}
m = index + splice.add - splice.removed.length;
m  = m < 0? 0 : m;
}
if(m < len){
for(var i = m; i < len; i++){
var pair = group.get(i + 1);
pair.data[indexName] = i;
}
}
}
this.$watch(ast.sequence, update, { init: true });
return group;
}
walkers.template = function(ast){
var content = ast.content, compiled;
var placeholder = document.createComment('template');
var compiled, namespace = this.__ns__;
// var fragment = dom.fragment();
// fragment.appendChild(placeholder);
var group = new Group();
group.push(placeholder);
if(content){
var self = this;
this.$watch(content, function(value){
if( compiled = group.get(1)){
compiled.destroy(true);
group.children.pop();
}
group.push( compiled =  self.$compile(value, {record: true, namespace: namespace}) );
if(placeholder.parentNode) animate.inject(combine.node(compiled), placeholder, 'before')
}, {
init: true
});
}
return group;
};
// how to resolve this problem
var ii = 0;
walkers['if'] = function(ast, options){
var self = this, consequent, alternate;
if(options && options.element){ // attribute inteplation
var update = function(nvalue){
if(!!nvalue){
if(alternate) combine.destroy(alternate)
if(ast.consequent) consequent = self.$compile(ast.consequent, {record: true, element: options.element });
}else{
if(consequent) combine.destroy(consequent)
if(ast.alternate) alternate = self.$compile(ast.alternate, {record: true, element: options.element});
}
}
this.$watch(ast.test, update, { force: true });
return {
destroy: function(){
if(consequent) combine.destroy(consequent);
else if(alternate) combine.destroy(alternate);
}
}
}
var test, consequent, alternate, node;
var placeholder = document.createComment("Regular if" + ii++);
var group = new Group();
group.push(placeholder);
var preValue = null, namespace= this.__ns__;
var update = function (nvalue, old){
var value = !!nvalue;
if(value === preValue) return;
preValue = value;
if(group.children[1]){
group.children[1].destroy(true);
group.children.pop();
}
if(value){ //true
if(ast.consequent && ast.consequent.length){
consequent = self.$compile( ast.consequent , {record:true, namespace: namespace })
// placeholder.parentNode && placeholder.parentNode.insertBefore( node, placeholder );
group.push(consequent);
if(placeholder.parentNode){
animate.inject(combine.node(consequent), placeholder, 'before');
}
}
}else{ //false
if(ast.alternate && ast.alternate.length){
alternate = self.$compile(ast.alternate, {record:true, namespace: namespace});
group.push(alternate);
if(placeholder.parentNode){
animate.inject(combine.node(alternate), placeholder, 'before');
}
}
}
}
this.$watch(ast.test, update, {force: true, init: true});
return group;
}
walkers.expression = function(ast){
var node = document.createTextNode("");
this.$watch(ast, function(newval){
dom.text(node, "" + (newval == null? "": "" + newval) );
})
return node;
}
walkers.text = function(ast){
var node = document.createTextNode(_.convertEntity(ast.text));
return node;
}
var eventReg = /^on-(.+)$/
/**
* walkers element (contains component)
*/
walkers.element = function(ast){
var attrs = ast.attrs,
component, self = this,
Constructor=this.constructor,
children = ast.children,
namespace = this.__ns__, ref, group,
Component = Constructor.component(ast.tag);
if(ast.tag === 'svg') var namespace = "svg";
if(children && children.length){
group = this.$compile(children, {namespace: namespace });
}
if(Component){
var data = {},events;
for(var i = 0, len = attrs.length; i < len; i++){
var attr = attrs[i];
var value = attr.value||"";
_.touchExpression(value);
var name = attr.name;
var etest = name.match(eventReg);
// bind event proxy
if(etest){
events = events || {};
events[etest[1]] = _.handleEvent.call(this, value, etest[1]);
continue;
}
if(value.type !== 'expression'){
data[attr.name] = value;
}else{
data[attr.name] = value.get(self);
}
if( attr.name === 'ref'  && value != null){
ref = value.type === 'expression'? value.get(self): value;
}
}
var $body;
if(ast.children) $body = this.$compile(ast.children);
var component = new Component({data: data, events: events, $body: $body, $parent: this, namespace: namespace});
if(ref &&  self.$context.$refs) self.$context.$refs[ref] = component;
for(var i = 0, len = attrs.length; i < len; i++){
var attr = attrs[i];
var value = attr.value||"";
if(value.type === 'expression' && attr.name.indexOf('on-')===-1){
this.$watch(value, component.$update.bind(component, attr.name))
if(value.set) component.$watch(attr.name, self.$update.bind(self, value))
}
}
if(ref){
component.$on('destroy', function(){
if(self.$context.$refs) self.$context.$refs[ref] = null;
})
}
return component;
}else if(ast.tag === 'r-content' && this.$body){
return this.$body;
}
var element = dom.create(ast.tag, namespace, attrs);
// context element
var child;
if(group && !_.isVoidTag(ast.tag)){
dom.inject( combine.node(group) , element)
}
// sort before
attrs.sort(function(a1, a2){
var d1 = Constructor.directive(a1.name),
d2 = Constructor.directive(a2.name);
if(d1 && d2) return (d2.priority || 1) - (d1.priority || 1);
if(d1) return 1;
if(d2) return -1;
if(a2.name === "type") return 1;
return -1;
})
// may distinct with if else
var destroies = walkAttributes.call(this, attrs, element, destroies);
var res  = {
type: "element",
group: group,
node: function(){
return element;
},
last: function(){
return element;
},
destroy: function(first){
if( first ){
animate.remove( element, group? group.destroy.bind( group ): _.noop );
}else if(group) {
group.destroy();
}
// destroy ref
if( destroies.length ) {
destroies.forEach(function( destroy ){
if( destroy ){
if( typeof destroy.destroy === 'function' ){
destroy.destroy()
}else{
destroy();
}
}
})
}
}
}
return res;
}
function walkAttributes(attrs, element){
var bindings = []
for(var i = 0, len = attrs.length; i < len; i++){
var binding = this._walk(attrs[i], {element: element, fromElement: true, attrs: attrs})
if(binding) bindings.push(binding);
}
return bindings;
}
walkers.attribute = function(ast ,options){
var attr = ast;
var Component = this.constructor;
var self = this;
var element = options.element;
var name = attr.name,
value = attr.value || "", directive = Component.directive(name);
_.touchExpression(value);
if(directive && directive.link){
var binding = directive.link.call(self, element, value, name, options.attrs);
if(typeof binding === 'function') binding = {destroy: binding};
return binding;
}else{
if( name === 'ref'  && value != null && options.fromElement){
var ref = value.type === 'expression'? value.get(self): value;
var refs = this.$context.$refs;
if(refs){
refs[ref] = element
return {
destroy: function(){
refs[ref] = null;
}
}
}
}
if(value.type === 'expression' ){
this.$watch(value, function(nvalue, old){
dom.attr(element, name, nvalue);
}, {init: true});
}else{
if(_.isBooleanAttr(name)){
dom.attr(element, name, true);
}else{
dom.attr(element, name, value);
}
}
if(!options.fromElement){
return {
destroy: function(){
dom.attr(element, name, null);
}
}
}
}
}
});
require.register("regularjs/src/env.js", function(exports, require, module){
// some fixture test;
// ---------------
var _ = require('./util');
exports.svg = (function(){
return typeof document !== "undefined" && document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1" );
})();
exports.transition = (function(){
})();
// whether have component in initializing
exports.exprCache = _.cache(100);
exports.isRunning = false;
});
require.register("regularjs/src/index.js", function(exports, require, module){
module.exports = require("./Regular.js");
require("./directive/base.js");
require("./directive/animation.js");
require("./module/timeout.js");
module.exports.dom = require("./dom.js");
module.exports.util = require("./util.js");
module.exports.env = require("./env.js");
});
require.register("regularjs/src/dom.js", function(exports, require, module){
// thanks for angular && mootools for some concise&cross-platform  implemention
// =====================================
// The MIT License
// Copyright (c) 2010-2014 Google, Inc. http://angularjs.org
// ---
// license: MIT-style license. http://mootools.net
var dom = module.exports;
var env = require("./env.js");
var _ = require("./util");
var tNode = document.createElement('div')
var addEvent, removeEvent;
var noop = function(){}
var namespaces = {
html: "http://www.w3.org/1999/xhtml",
svg: "http://www.w3.org/2000/svg"
}
dom.body = document.body;
dom.doc = document;
// camelCase
function camelCase(str){
return ("" + str).replace(/-\D/g, function(match){
return match.charAt(1).toUpperCase();
});
}
dom.tNode = tNode;
if(tNode.addEventListener){
addEvent = function(node, type, fn) {
node.addEventListener(type, fn, false);
}
removeEvent = function(node, type, fn) {
node.removeEventListener(type, fn, false)
}
}else{
addEvent = function(node, type, fn) {
node.attachEvent('on' + type, fn);
}
removeEvent = function(node, type, fn) {
node.detachEvent('on' + type, fn);
}
}
dom.msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
if (isNaN(dom.msie)) {
dom.msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
}
dom.find = function(sl){
if(document.querySelector) {
try{
return document.querySelector(sl);
}catch(e){
}
}
if(sl.indexOf('#')!==-1) return document.getElementById( sl.slice(1) );
}
dom.inject = function(node, refer, position){
position = position || 'bottom';
if(Array.isArray(node)){
var tmp = node;
node = dom.fragment();
for(var i = 0,len = tmp.length; i < len ;i++){
node.appendChild(tmp[i]);
}
}
var firstChild, next;
switch(position){
case 'bottom':
refer.appendChild( node );
break;
case 'top':
if( firstChild = refer.firstChild ){
refer.insertBefore( node, refer.firstChild );
}else{
refer.appendChild( node );
}
break;
case 'after':
if( next = refer.nextSibling ){
next.parentNode.insertBefore( node, next );
}else{
refer.parentNode.appendChild( node );
}
break;
case 'before':
refer.parentNode.insertBefore( node, refer );
}
}
dom.id = function(id){
return document.getElementById(id);
}
// createElement
dom.create = function(type, ns, attrs){
if(ns === 'svg'){
if(!env.svg) throw Error('the env need svg support')
ns = namespaces.svg;
}
return !ns? document.createElement(type): document.createElementNS(ns, type);
}
// documentFragment
dom.fragment = function(){
return document.createDocumentFragment();
}
var specialAttr = {
'class': function(node, value){
('className' in node && (node.namespaceURI === namespaces.html || !node.namespaceURI)) ?
node.className = (value || '') : node.setAttribute('class', value);
},
'for': function(node, value){
('htmlFor' in node) ? node.htmlFor = value : node.setAttribute('for', value);
},
'style': function(node, value){
(node.style) ? node.style.cssText = value : node.setAttribute('style', value);
},
'value': function(node, value){
node.value = (value != null) ? value : '';
}
}
// attribute Setter & Getter
dom.attr = function(node, name, value){
if (_.isBooleanAttr(name)) {
if (typeof value !== 'undefined') {
if (!!value) {
node[name] = true;
node.setAttribute(name, name);
// lt ie7 . the javascript checked setting is in valid
//http://bytes.com/topic/javascript/insights/799167-browser-quirk-dynamically-appended-checked-checkbox-does-not-appear-checked-ie
if(dom.msie && dom.msie <=7 ) node.defaultChecked = true
} else {
node[name] = false;
node.removeAttribute(name);
}
} else {
return (node[name] ||
(node.attributes.getNamedItem(name)|| noop).specified) ? name : undefined;
}
} else if (typeof (value) !== 'undefined') {
// if in specialAttr;
if(specialAttr[name]) specialAttr[name](node, value);
else if(value === null) node.removeAttribute(name)
else node.setAttribute(name, value);
} else if (node.getAttribute) {
// the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
// some elements (e.g. Document) don't have get attribute, so return undefined
var ret = node.getAttribute(name, 2);
// normalize non-existing attributes to undefined (as jQuery)
return ret === null ? undefined : ret;
}
}
dom.on = function(node, type, handler){
var types = type.split(' ');
handler.real = function(ev){
handler.call(node, new Event(ev));
}
types.forEach(function(type){
type = fixEventName(node, type);
addEvent(node, type, handler.real);
});
}
dom.off = function(node, type, handler){
var types = type.split(' ');
handler = handler.real || handler;
types.forEach(function(type){
type = fixEventName(node, type);
removeEvent(node, type, handler);
})
}
dom.text = (function (){
var map = {};
if (dom.msie && dom.msie < 9) {
map[1] = 'innerText';
map[3] = 'nodeValue';
} else {
map[1] = map[3] = 'textContent';
}
return function (node, value) {
var textProp = map[node.nodeType];
if (value == null) {
return textProp ? node[textProp] : '';
}
node[textProp] = value;
}
})();
dom.html = function( node, html ){
if(typeof html === "undefined"){
return node.innerHTML;
}else{
node.innerHTML = html;
}
}
dom.replace = function(node, replaced){
if(replaced.parentNode) replaced.parentNode.replaceChild(node, replaced);
}
dom.remove = function(node){
if(node.parentNode) node.parentNode.removeChild(node);
}
// css Settle & Getter from angular
// =================================
// it isnt computed style
dom.css = function(node, name, value){
if( _.typeOf(name) === "object" ){
for(var i in name){
if( name.hasOwnProperty(i) ){
dom.css( node, i, name[i] );
}
}
return;
}
if ( typeof value !== "undefined" ) {
name = camelCase(name);
if(name) node.style[name] = value;
} else {
var val;
if (dom.msie <= 8) {
// this is some IE specific weirdness that jQuery 1.6.4 does not sure why
val = node.currentStyle && node.currentStyle[name];
if (val === '') val = 'auto';
}
val = val || node.style[name];
if (dom.msie <= 8) {
val = val === '' ? undefined : val;
}
return  val;
}
}
dom.addClass = function(node, className){
var current = node.className || "";
if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
node.className = current? ( current + " " + className ) : className;
}
}
dom.delClass = function(node, className){
var current = node.className || "";
node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
}
dom.hasClass = function(node, className){
var current = node.className || "";
return (" " + current + " ").indexOf(" " + className + " ") !== -1;
}
// simple Event wrap
//http://stackoverflow.com/questions/11068196/ie8-ie7-onchange-event-is-emited-only-after-repeated-selection
function fixEventName(elem, name){
return (name === 'change'  &&  dom.msie < 9 &&
(elem && elem.tagName && elem.tagName.toLowerCase()==='input' &&
(elem.type === 'checkbox' || elem.type === 'radio')
)
)? 'click': name;
}
var rMouseEvent = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/
var doc = document;
doc = (!doc.compatMode || doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
function Event(ev){
ev = ev || window.event;
if(ev._fixed) return ev;
this.event = ev;
this.target = ev.target || ev.srcElement;
var type = this.type = ev.type;
var button = this.button = ev.button;
// if is mouse event patch pageX
if(rMouseEvent.test(type)){ //fix pageX
this.pageX = (ev.pageX != null) ? ev.pageX : ev.clientX + doc.scrollLeft;
this.pageY = (ev.pageX != null) ? ev.pageY : ev.clientY + doc.scrollTop;
if (type === 'mouseover' || type === 'mouseout'){// fix relatedTarget
var related = ev.relatedTarget || ev[(type === 'mouseover' ? 'from' : 'to') + 'Element'];
while (related && related.nodeType === 3) related = related.parentNode;
this.relatedTarget = related;
}
}
// if is mousescroll
if (type === 'DOMMouseScroll' || type === 'mousewheel'){
// ff ev.detail: 3    other ev.wheelDelta: -120
this.wheelDelta = (ev.wheelDelta) ? ev.wheelDelta / 120 : -(ev.detail || 0) / 3;
}
// fix which
this.which = ev.which || ev.keyCode;
if( !this.which && button !== undefined){
// http://api.jquery.com/event.which/ use which
this.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
}
this._fixed = true;
}
_.extend(Event.prototype, {
immediateStop: _.isFalse,
stop: function(){
this.preventDefault().stopPropagation();
},
preventDefault: function(){
if (this.event.preventDefault) this.event.preventDefault();
else this.event.returnValue = false;
return this;
},
stopPropagation: function(){
if (this.event.stopPropagation) this.event.stopPropagation();
else this.event.cancelBubble = true;
return this;
},
stopImmediatePropagation: function(){
if(this.event.stopImmediatePropagation) this.event.stopImmediatePropagation();
}
})
dom.nextFrame = (function(){
var request = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame||
function(callback){
setTimeout(callback, 16)
}
var cancel = window.cancelAnimationFrame ||
window.webkitCancelAnimationFrame ||
window.mozCancelAnimationFrame ||
window.webkitCancelRequestAnimationFrame ||
function(tid){
clearTimeout(tid)
}
return function(callback){
var id = request(callback);
return function(){ cancel(id); }
}
})();
// 3ks for angular's raf  service
var k;
dom.nextReflow = function(callback){
dom.nextFrame(function(){
k = document.body.offsetWidth;
callback();
})
}
});
require.register("regularjs/src/group.js", function(exports, require, module){
var _ = require('./util');
var combine = require('./helper/combine')
function Group(list){
this.children = list || [];
}
_.extend(Group.prototype, {
destroy: function(first){
combine.destroy(this.children, first);
if(this.ondestroy) this.ondestroy();
this.children = null;
},
get: function(i){
return this.children[i]
},
push: function(item){
this.children.push( item );
}
})
module.exports = Group;
});
require.register("regularjs/src/config.js", function(exports, require, module){
module.exports = {
'BEGIN': '{{',
'END': '}}'
}
});
require.register("regularjs/src/parser/Lexer.js", function(exports, require, module){
var _ = require("../util.js");
var config = require("../config.js");
// some custom tag  will conflict with the Lexer progress
var conflictTag = {"}": "{", "]": "["}, map1, map2;
// some macro for lexer
var macro = {
'NAME': /(?:[:_A-Za-z][-\.:_0-9A-Za-z]*)/,
'IDENT': /[\$_A-Za-z][_0-9A-Za-z\$]*/,
'SPACE': /[\r\n\f ]/
}
var test = /a|(b)/.exec("a");
var testSubCapure = test && test[1] === undefined?
function(str){ return str !== undefined }
:function(str){return !!str};
function wrapHander(handler){
return function(all){
return {type: handler, value: all }
}
}
function Lexer(input, opts){
if(conflictTag[config.END]){
this.markStart = conflictTag[config.END];
this.markEnd = config.END;
}
this.input = (input||"").trim();
this.opts = opts || {};
this.map = this.opts.mode !== 2?  map1: map2;
this.states = ["INIT"];
if(this.opts.state) this.states.push( this.opts.state );
}
var lo = Lexer.prototype
lo.lex = function(str){
str = (str || this.input).trim();
var tokens = [], split, test,mlen, token, state;
this.input = str,
this.marks = 0;
// init the pos index
this.index=0;
var i = 0;
while(str){
i++
state = this.state();
split = this.map[state]
test = split.TRUNK.exec(str);
if(!test){
this.error('Unrecoginized Token');
}
mlen = test[0].length;
str = str.slice(mlen)
token = this._process.call(this, test, split, str)
if(token) tokens.push(token)
this.index += mlen;
// if(state == 'TAG' || state == 'JST') str = this.skipspace(str);
}
tokens.push({type: 'EOF'});
return tokens;
}
lo.error = function(msg){
throw "Parse Error: " + msg +  ':\n' + _.trackErrorPos(this.input, this.index);
}
lo._process = function(args, split,str){
// console.log(args.join(","), this.state())
var links = split.links, marched = false, token;
for(var len = links.length, i=0;i<len ;i++){
var link = links[i],
handler = link[2],
index = link[0];
// if(args[6] === '>' && index === 6) console.log('haha')
if(testSubCapure(args[index])) {
marched = true;
if(handler){
token = handler.apply(this, args.slice(index, index + link[1]))
if(token)  token.pos = this.index;
}
break;
}
}
if(!marched){ // in ie lt8 . sub capture is "" but ont
switch(str.charAt(0)){
case "<":
this.enter("TAG");
break;
default:
this.enter("JST");
break;
}
}
return token;
}
lo.enter = function(state){
this.states.push(state)
return this;
}
lo.state = function(){
var states = this.states;
return states[states.length-1];
}
lo.leave = function(state){
var states = this.states;
if(!state || states[states.length-1] === state) states.pop()
}
Lexer.setup = function(){
macro.END = config.END;
macro.BEGIN = config.BEGIN;
//
map1 = genMap([
// INIT
rules.ENTER_JST,
rules.ENTER_TAG,
rules.TEXT,
//TAG
rules.TAG_NAME,
rules.TAG_OPEN,
rules.TAG_CLOSE,
rules.TAG_PUNCHOR,
rules.TAG_ENTER_JST,
rules.TAG_UNQ_VALUE,
rules.TAG_STRING,
rules.TAG_SPACE,
rules.TAG_COMMENT,
// JST
rules.JST_OPEN,
rules.JST_CLOSE,
rules.JST_COMMENT,
rules.JST_EXPR_OPEN,
rules.JST_IDENT,
rules.JST_SPACE,
rules.JST_LEAVE,
rules.JST_NUMBER,
rules.JST_PUNCHOR,
rules.JST_STRING,
rules.JST_COMMENT
])
// ignored the tag-relative token
map2 = genMap([
// INIT no < restrict
rules.ENTER_JST2,
rules.TEXT,
// JST
rules.JST_COMMENT,
rules.JST_OPEN,
rules.JST_CLOSE,
rules.JST_EXPR_OPEN,
rules.JST_IDENT,
rules.JST_SPACE,
rules.JST_LEAVE,
rules.JST_NUMBER,
rules.JST_PUNCHOR,
rules.JST_STRING,
rules.JST_COMMENT
])
}
function genMap(rules){
var rule, map = {}, sign;
for(var i = 0, len = rules.length; i < len ; i++){
rule = rules[i];
sign = rule[2] || 'INIT';
( map[sign] || (map[sign] = {rules:[], links:[]}) ).rules.push(rule);
}
return setup(map);
}
function setup(map){
var split, rules, trunks, handler, reg, retain, rule;
function replaceFn(all, one){
return typeof macro[one] === 'string'?
_.escapeRegExp(macro[one])
: String(macro[one]).slice(1,-1);
}
for(var i in map){
split = map[i];
split.curIndex = 1;
rules = split.rules;
trunks = [];
for(var j = 0,len = rules.length; j<len; j++){
rule = rules[j];
reg = rule[0];
handler = rule[1];
if(typeof handler === 'string'){
handler = wrapHander(handler);
}
if(_.typeOf(reg) === 'regexp') reg = reg.toString().slice(1, -1);
reg = reg.replace(/\{(\w+)\}/g, replaceFn)
retain = _.findSubCapture(reg) + 1;
split.links.push([split.curIndex, retain, handler]);
split.curIndex += retain;
trunks.push(reg);
}
split.TRUNK = new RegExp("^(?:(" + trunks.join(")|(") + "))")
}
return map;
}
var rules = {
// 1. INIT
// ---------------
// mode1's JST ENTER RULE
ENTER_JST: [/[^\x00<]*?(?={BEGIN})/, function(all){
this.enter('JST');
if(all) return {type: 'TEXT', value: all}
}],
// mode2's JST ENTER RULE
ENTER_JST2: [/[^\x00]*?(?={BEGIN})/, function(all){
this.enter('JST');
if(all) return {type: 'TEXT', value: all}
}],
ENTER_TAG: [/[^\x00<>]*?(?=<)/, function(all){
this.enter('TAG');
if(all) return {type: 'TEXT', value: all}
}],
TEXT: [/[^\x00]+/, 'TEXT'],
// 2. TAG
// --------------------
TAG_NAME: [/{NAME}/, 'NAME', 'TAG'],
TAG_UNQ_VALUE: [/[^\{}&"'=><`\r\n\f ]+/, 'UNQ', 'TAG'],
TAG_OPEN: [/<({NAME})\s*/, function(all, one){
return {type: 'TAG_OPEN', value: one}
}, 'TAG'],
TAG_CLOSE: [/<\/({NAME})[\r\n\f ]*>/, function(all, one){
this.leave();
return {type: 'TAG_CLOSE', value: one }
}, 'TAG'],
// mode2's JST ENTER RULE
TAG_ENTER_JST: [/(?={BEGIN})/, function(){
this.enter('JST');
}, 'TAG'],
TAG_PUNCHOR: [/[\>\/=&]/, function(all){
if(all === '>') this.leave();
return {type: all, value: all }
}, 'TAG'],
TAG_STRING:  [ /'([^']*)'|"([^"]*)"/, function(all, one, two){ //"'
var value = one || two || "";
return {type: 'STRING', value: value}
}, 'TAG'],
TAG_SPACE: [/{SPACE}+/, null, 'TAG'],
TAG_COMMENT: [/<\!--([^\x00]*?)--\>/, null ,'TAG'],
// 3. JST
// -------------------
JST_OPEN: ['{BEGIN}#{SPACE}*({IDENT})', function(all, name){
return {
type: 'OPEN',
value: name
}
}, 'JST'],
JST_LEAVE: [/{END}/, function(){
this.firstEnterStart = false;
if(!this.markEnd || !this.marks ){
this.leave('JST');
return {type: 'END'}
}else{
this.marks--;
return {type: this.markEnd, value: this.markEnd}
}
}, 'JST'],
JST_CLOSE: [/{BEGIN}\s*\/({IDENT})\s*{END}/, function(all, one){
this.leave('JST');
return {
type: 'CLOSE',
value: one
}
}, 'JST'],
JST_COMMENT: [/{BEGIN}\!([^\x00]*?)\!{END}/, function(){
this.leave();
}, 'JST'],
JST_EXPR_OPEN: ['{BEGIN}',function(all, one){
if(all === this.markStart){
if(this.firstEnterStart){
this.marks++
this.firstEnterStart = false;
return { type: this.markStart, value: this.markStart };
}else{
this.firstEnterStart = true;
}
}
return {
type: 'EXPR_OPEN',
escape: false
}
}, 'JST'],
JST_IDENT: ['{IDENT}', 'IDENT', 'JST'],
JST_SPACE: [/[ \r\n\f]+/, null, 'JST'],
JST_PUNCHOR: [/[=!]?==|[-=><+*\/%\!]?\=|\|\||&&|\@\(|\.\.|[<\>\[\]\(\)\-\|\{}\+\*\/%?:\.!,]/, function(all){
return { type: all, value: all }
},'JST'],
JST_STRING:  [ /'([^']*)'|"([^"]*)"/, function(all, one, two){ //"'
return {type: 'STRING', value: one || two || ""}
}, 'JST'],
JST_NUMBER: [/(?:[0-9]*\.[0-9]+|[0-9]+)(e\d+)?/, function(all){
return {type: 'NUMBER', value: parseFloat(all, 10)};
}, 'JST']
}
// setup when first config
Lexer.setup();
module.exports = Lexer;
});
require.register("regularjs/src/parser/node.js", function(exports, require, module){
module.exports = {
element: function(name, attrs, children){
return {
type: 'element',
tag: name,
attrs: attrs,
children: children
}
},
attribute: function(name, value){
return {
type: 'attribute',
name: name,
value: value
}
},
"if": function(test, consequent, alternate){
return {
type: 'if',
test: test,
consequent: consequent,
alternate: alternate
}
},
list: function(sequence, variable, body){
return {
type: 'list',
sequence: sequence,
variable: variable,
body: body
}
},
expression: function( body, setbody, constant ){
return {
type: "expression",
body: body,
constant: constant || false,
setbody: setbody || false
}
},
text: function(text){
return {
type: "text",
text: text
}
},
template: function(template){
return {
type: 'template',
content: template
}
}
}
});
require.register("regularjs/src/parser/Parser.js", function(exports, require, module){
var _ = require("../util.js");
var config = require("../config.js");
var node = require("./node.js");
var Lexer = require("./Lexer.js");
var varName = _.varName;
var ctxName = _.ctxName;
var isPath = _.makePredicate("STRING IDENT NUMBER");
var isKeyWord = _.makePredicate("true false undefined null this Array Date JSON Math NaN RegExp decodeURI decodeURIComponent encodeURI encodeURIComponent parseFloat parseInt Object");
function Parser(input, opts){
opts = opts || {};
this.input = input;
this.tokens = new Lexer(input, opts).lex();
this.pos = 0;
this.noComputed =  opts.noComputed;
this.length = this.tokens.length;
}
var op = Parser.prototype;
op.parse = function(){
this.pos = 0;
var res= this.program();
if(this.ll().type === 'TAG_CLOSE'){
this.error("You may got a unclosed Tag")
}
return res;
}
op.ll =  function(k){
k = k || 1;
if(k < 0) k = k + 1;
var pos = this.pos + k - 1;
if(pos > this.length - 1){
return this.tokens[this.length-1];
}
return this.tokens[pos];
}
// lookahead
op.la = function(k){
return (this.ll(k) || '').type;
}
op.match = function(type, value){
var ll;
if(!(ll = this.eat(type, value))){
ll  = this.ll();
this.error('expect [' + type + (value == null? '':':'+ value) + ']" -> got "[' + ll.type + (value==null? '':':'+ll.value) + ']', ll.pos)
}else{
return ll;
}
}
op.error = function(msg, pos){
msg =  "Parse Error: " + msg +  ':\n' + _.trackErrorPos(this.input, typeof pos === 'number'? pos: this.ll().pos||0);
throw new Error(msg);
}
op.next = function(k){
k = k || 1;
this.pos += k;
}
op.eat = function(type, value){
var ll = this.ll();
if(typeof type !== 'string'){
for(var len = type.length ; len--;){
if(ll.type === type[len]) {
this.next();
return ll;
}
}
}else{
if( ll.type === type && (typeof value === 'undefined' || ll.value === value) ){
this.next();
return ll;
}
}
return false;
}
// program
//  :EOF
//  | (statement)* EOF
op.program = function(){
var statements = [],  ll = this.ll();
while(ll.type !== 'EOF' && ll.type !=='TAG_CLOSE'){
statements.push(this.statement());
ll = this.ll();
}
// if(ll.type === 'TAG_CLOSE') this.error("You may have unmatched Tag")
return statements;
}
// statement
//  : xml
//  | jst
//  | text
op.statement = function(){
var ll = this.ll();
switch(ll.type){
case 'NAME':
case 'TEXT':
var text = ll.value;
this.next();
while(ll = this.eat(['NAME', 'TEXT'])){
text += ll.value;
}
return node.text(text);
case 'TAG_OPEN':
return this.xml();
case 'OPEN':
return this.directive();
case 'EXPR_OPEN':
return this.interplation();
case 'PART_OPEN':
return this.template();
default:
this.error('Unexpected token: '+ this.la())
}
}
// xml
// stag statement* TAG_CLOSE?(if self-closed tag)
op.xml = function(){
var name, attrs, children, selfClosed;
name = this.match('TAG_OPEN').value;
attrs = this.attrs();
selfClosed = this.eat('/')
this.match('>');
if( !selfClosed && !_.isVoidTag(name) ){
children = this.program();
if(!this.eat('TAG_CLOSE', name)) this.error('expect </'+name+'> got'+ 'no matched closeTag')
}
return node.element(name, attrs, children);
}
// xentity
//  -rule(wrap attribute)
//  -attribute
//
// __example__
//  name = 1 |
//  ng-hide |
//  on-click={{}} |
//  {{#if name}}on-click={{xx}}{{#else}}on-tap={{}}{{/if}}
op.xentity = function(ll){
var name = ll.value, value;
if(ll.type === 'NAME'){
if( this.eat("=") ) value = this.attvalue();
return node.attribute( name, value );
}else{
if( name !== 'if') this.error("current version. ONLY RULE #if #else #elseif is valid in tag, the rule #" + name + ' is invalid');
return this['if'](true);
}
}
// stag     ::=    '<' Name (S attr)* S? '>'
// attr    ::=     Name Eq attvalue
op.attrs = function(isAttribute){
var eat
if(!isAttribute){
eat = ["NAME", "OPEN"]
}else{
eat = ["NAME"]
}
var attrs = [], ll;
while (ll = this.eat(eat)){
attrs.push(this.xentity( ll ))
}
return attrs;
}
// attvalue
//  : STRING
//  | NAME
op.attvalue = function(){
var ll = this.ll();
switch(ll.type){
case "NAME":
case "UNQ":
case "STRING":
this.next();
var value = ll.value;
if(~value.indexOf(config.BEGIN) && ~value.indexOf(config.END)){
var constant = true;
var parsed = new Parser(value, { mode: 2 }).parse();
if(parsed.length === 1 && parsed[0].type === 'expression') return parsed[0];
var body = [];
parsed.forEach(function(item){
if(!item.constant) constant=false;
body.push(item.body || "'" + item.text + "'");
});
body = "[" + body.join(",") + "].join('')";
value = node.expression(body, null, constant);
}
return value;
case "EXPR_OPEN":
return this.interplation();
default:
this.error('Unexpected token: '+ this.la())
}
}
// {{#}}
op.directive = function(){
var name = this.ll().value;
this.next();
if(typeof this[name] === 'function'){
return this[name]()
}else{
this.error('Undefined directive['+ name +']');
}
}
// {{}}
op.interplation = function(){
this.match('EXPR_OPEN');
var res = this.expression(true);
this.match('END');
return res;
}
// {{~}}
op.include = function(){
var content = this.expression();
this.match('END');
return node.template(content);
}
// {{#if}}
op["if"] = function(tag){
var test = this.expression();
var consequent = [], alternate=[];
var container = consequent;
var statement = !tag? "statement" : "attrs";
this.match('END');
var ll, close;
while( ! (close = this.eat('CLOSE')) ){
ll = this.ll();
if( ll.type === 'OPEN' ){
switch( ll.value ){
case 'else':
container = alternate;
this.next();
this.match( 'END' );
break;
case 'elseif':
this.next();
alternate.push( this["if"](tag) );
return node['if']( test, consequent, alternate );
default:
container.push( this[statement](true) );
}
}else{
container.push(this[statement](true));
}
}
// if statement not matched
if(close.value !== "if") this.error('Unmatched if directive')
return node["if"](test, consequent, alternate);
}
// @mark   mustache syntax have natrure dis, canot with expression
// {{#list}}
op.list = function(){
// sequence can be a list or hash
var sequence = this.expression(), variable, ll;
var consequent = [], alternate=[];
var container = consequent;
this.match('IDENT', 'as');
variable = this.match('IDENT').value;
this.match('END');
while( !(ll = this.eat('CLOSE')) ){
if(this.eat('OPEN', 'else')){
container =  alternate;
this.match('END');
}else{
container.push(this.statement());
}
}
if(ll.value !== 'list') this.error('expect ' + '{{/list}} got ' + '{{/' + ll.value + '}}', ll.pos );
return node.list(sequence, variable, consequent, alternate);
}
op.expression = function(){
var expression;
if(this.eat('@(')){ //once bind
expression = this.expr();
expression.once = true;
this.match(')')
}else{
expression = this.expr();
}
return expression;
}
op.expr = function(){
this.depend = [];
var buffer = this.filter()
var body = buffer.get || buffer;
var setbody = buffer.set;
return node.expression(body, setbody, !this.depend.length);
}
// filter
// assign ('|' filtername[':' args]) *
op.filter = function(){
var left = this.assign();
var ll = this.eat('|');
var buffer, attr;
if(ll){
buffer = [
"(function(){",
"var ", attr = "_f_", "=", left.get, ";"]
do{
buffer.push(attr + " = "+ctxName+"._f_('" + this.match('IDENT').value+ "')(" + attr) ;
if(this.eat(':')){
buffer.push(", "+ this.arguments("|").join(",") + ");")
}else{
buffer.push(');');
}
}while(ll = this.eat('|'));
buffer.push("return " + attr + "})()");
return this.getset(buffer.join(""));
}
return left;
}
// assign
// left-hand-expr = condition
op.assign = function(){
var left = this.condition(), ll;
if(ll = this.eat(['=', '+=', '-=', '*=', '/=', '%='])){
if(!left.set) this.error('invalid lefthand expression in assignment expression');
return this.getset( left.set.replace("_p_", this.condition().get).replace("'='", "'"+ll.type+"'"), left.set);
// return this.getset('(' + left.get + ll.type  + this.condition().get + ')', left.set);
}
return left;
}
// or
// or ? assign : assign
op.condition = function(){
var test = this.or();
if(this.eat('?')){
return this.getset([test.get + "?",
this.assign().get,
this.match(":").type,
this.assign().get].join(""));
}
return test;
}
// and
// and && or
op.or = function(){
var left = this.and();
if(this.eat('||')){
return this.getset(left.get + '||' + this.or().get);
}
return left;
}
// equal
// equal && and
op.and = function(){
var left = this.equal();
if(this.eat('&&')){
return this.getset(left.get + '&&' + this.and().get);
}
return left;
}
// relation
//
// equal == relation
// equal != relation
// equal === relation
// equal !== relation
op.equal = function(){
var left = this.relation(), ll;
// @perf;
if( ll = this.eat(['==','!=', '===', '!=='])){
return this.getset(left.get + ll.type + this.equal().get);
}
return left
}
// relation < additive
// relation > additive
// relation <= additive
// relation >= additive
// relation in additive
op.relation = function(){
var left = this.additive(), ll;
// @perf
if(ll = (this.eat(['<', '>', '>=', '<=']) || this.eat('IDENT', 'in') )){
return this.getset(left.get + ll.value + this.relation().get);
}
return left
}
// additive :
// multive
// additive + multive
// additive - multive
op.additive = function(){
var left = this.multive() ,ll;
if(ll= this.eat(['+','-']) ){
return this.getset(left.get + ll.value + this.additive().get);
}
return left
}
// multive :
// unary
// multive * unary
// multive / unary
// multive % unary
op.multive = function(){
var left = this.range() ,ll;
if( ll = this.eat(['*', '/' ,'%']) ){
return this.getset(left.get + ll.type + this.multive().get);
}
return left;
}
op.range = function(){
var left = this.unary(), ll, right;
if(ll = this.eat('..')){
right = this.unary();
var body =
"(function(start,end){var res = [],step=end>start?1:-1; for(var i = start; end>start?i <= end: i>=end; i=i+step){res.push(i); } return res })("+left.get+","+right.get+")"
return this.getset(body);
}
return left;
}
// lefthand
// + unary
// - unary
// ~ unary
// ! unary
op.unary = function(){
var ll;
if(ll = this.eat(['+','-','~', '!'])){
return this.getset('(' + ll.type + this.unary().get + ')') ;
}else{
return this.member()
}
}
// call[lefthand] :
// member args
// member [ expression ]
// member . ident
op.member = function(base, last, pathes){
var ll, path;
var onlySimpleAccessor = false;
if(!base){ //first
path = this.primary();
var type = typeof path;
if(type === 'string'){
pathes = [];
pathes.push( path );
last = path;
base = ctxName + "._sg_('" + path + "', " + varName + "['" + path + "'])";
onlySimpleAccessor = true;
}else{ //Primative Type
if(path.get === 'this'){
base = ctxName;
pathes = ['this'];
}else{
pathes = null;
base = path.get;
}
}
}else{ // not first enter
if(typeof last === 'string' && isPath( last) ){ // is valid path
pathes.push(last);
}else{
if(pathes && pathes.length) this.depend.push(pathes);
pathes = null;
}
}
if(ll = this.eat(['[', '.', '('])){
switch(ll.type){
case '.':
// member(object, property, computed)
var tmpName = this.match('IDENT').value;
base += "['" + tmpName + "']";
return this.member( base, tmpName, pathes );
case '[':
// member(object, property, computed)
path = this.assign();
base += "[" + path.get + "]";
this.match(']')
return this.member(base, path, pathes);
case '(':
// call(callee, args)
var args = this.arguments().join(',');
base =  base+"(" + args +")";
this.match(')')
return this.member(base, null, pathes);
}
}
if( pathes && pathes.length ) this.depend.push( pathes );
var res =  {get: base};
if(last){
if(onlySimpleAccessor) res.set = ctxName + "._ss_('" + path + "'," + _.setName + "," + _.varName + ", '=')";
else res.set = base + '=' + _.setName;
}
return res;
}
/**
*
*/
op.arguments = function(end){
end = end || ')'
var args = [];
do{
if(this.la() !== end){
args.push(this.assign().get)
}
}while( this.eat(','));
return args
}
// primary :
// this
// ident
// literal
// array
// object
// ( expression )
op.primary = function(){
var ll = this.ll();
switch(ll.type){
case "{":
return this.object();
case "[":
return this.array();
case "(":
return this.paren();
// literal or ident
case 'STRING':
this.next();
return this.getset("'" + ll.value + "'")
case 'NUMBER':
this.next();
return this.getset(""+ll.value);
case "IDENT":
this.next();
if(isKeyWord(ll.value)){
return this.getset( ll.value );
}
return ll.value;
default:
this.error('Unexpected Token: ' + ll.type);
}
}
// object
//  {propAssign [, propAssign] * [,]}
// propAssign
//  prop : assign
// prop
//  STRING
//  IDENT
//  NUMBER
op.object = function(){
var code = [this.match('{').type];
var ll = this.eat( ['STRING', 'IDENT', 'NUMBER'] );
while(ll){
code.push("'" + ll.value + "'" + this.match(':').type);
var get = this.assign().get;
code.push(get);
ll = null;
if(this.eat(",") && (ll = this.eat(['STRING', 'IDENT', 'NUMBER'])) ) code.push(",");
}
code.push(this.match('}').type);
return {get: code.join("")}
}
// array
// [ assign[,assign]*]
op.array = function(){
var code = [this.match('[').type], item;
if( this.eat("]") ){
code.push("]");
} else {
while(item = this.assign()){
code.push(item.get);
if(this.eat(',')) code.push(",");
else break;
}
code.push(this.match(']').type);
}
return {get: code.join("")};
}
// '(' expression ')'
op.paren = function(){
this.match('(');
var res = this.filter()
res.get = '(' + res.get + ')';
this.match(')');
return res;
}
op.getset = function(get, set){
return {
get: get,
set: set
}
}
module.exports = Parser;
});
require.register("regularjs/src/helper/extend.js", function(exports, require, module){
// (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
// klass: a classical JS OOP façade
// https://github.com/ded/klass
// License MIT (c) Dustin Diaz 2014
// inspired by backbone's extend and klass
var _ = require("../util.js"),
fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/,
isFn = function(o){return typeof o === "function"};
function wrap(k, fn, supro) {
return function () {
var tmp = this.supr;
this.supr = supro[k];
var ret = fn.apply(this, arguments);
this.supr = tmp;
return ret;
}
}
function process( what, o, supro ) {
for ( var k in o ) {
if (o.hasOwnProperty(k)) {
what[k] = isFn( o[k] ) && isFn( supro[k] ) &&
fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
}
}
}
module.exports = function extend(o){
o = o || {};
var supr = this, proto,
supro = supr && supr.prototype || {};
if(typeof o === 'function'){
proto = o.prototype;
o.implement = implement;
o.extend = extend;
return o;
}
function fn() {
supr.apply(this, arguments);
}
proto = _.createProto(fn, supro);
function implement(o){
process(proto, o, supro);
return this;
}
fn.implement = implement
fn.implement(o)
if(supr.__after__) supr.__after__.call(fn, supr, o);
fn.extend = extend;
return fn;
}
});
require.register("regularjs/src/helper/shim.js", function(exports, require, module){
// shim for es5
var slice = [].slice;
var tstr = ({}).toString;
function extend(o1, o2 ){
for(var i in o2) if( o1[i] === undefined){
o1[i] = o2[i]
}
}
// String proto ;
extend(String.prototype, {
trim: function(){
return this.replace(/^\s+|\s+$/g, '');
}
});
// Array proto;
extend(Array.prototype, {
indexOf: function(obj, from){
from = from || 0;
for (var i = from, len = this.length; i < len; i++) {
if (this[i] === obj) return i;
}
return -1;
},
forEach: function(callback, context){
for (var i = 0, len = this.length; i < len; i++) {
callback.call(context, this[i], i, this);
}
},
filter: function(callback, context){
var res = [];
for (var i = 0, length = this.length; i < length; i++) {
var pass = callback.call(context, this[i], i, this);
if(pass) res.push(this[i]);
}
return res;
},
map: function(callback, context){
var res = [];
for (var i = 0, length = this.length; i < length; i++) {
res.push(callback.call(context, this[i], i, this));
}
return res;
}
});
// Function proto;
extend(Function.prototype, {
bind: function(context){
var fn = this;
var preArgs = slice.call(arguments, 1);
return function(){
var args = preArgs.concat(slice.call(arguments));
return fn.apply(context, args);
}
}
})
// Object
extend(Object, {
keys: function(obj){
var keys = [];
for(var i in obj) if(obj.hasOwnProperty(i)){
keys.push(i);
}
return keys;
}
})
// Date
extend(Date, {
now: function(){
return +new Date;
}
})
// Array
extend(Array, {
isArray: function(arr){
return tstr.call(arr) === "[object Array]";
}
})
});
require.register("regularjs/src/helper/parse.js", function(exports, require, module){
var exprCache = require('../env').exprCache;
var _ = require("../util");
var Parser = require("../parser/Parser.js");
module.exports = {
expression: function(expr, simple){
// @TODO cache
if( typeof expr === 'string' && ( expr = expr.trim() ) ){
expr = exprCache.get( expr ) || exprCache.set( expr, new Parser( expr, { state: 'JST', mode: 2 } ).expression() )
}
if(expr) return _.touchExpression( expr );
},
parse: function(template){
return new Parser(template).parse();
}
}
});
require.register("regularjs/src/helper/watcher.js", function(exports, require, module){
var _ = require('../util.js');
var parseExpression = require('./parse.js').expression;
function Watcher(){}
var methods = {
$watch: function(expr, fn, options){
var get, once, test, rlen; //records length
if(!this._watchers) this._watchers = [];
options = options || {};
if(options === true){
options = { deep: true }
}
var uid = _.uid('w_');
if(Array.isArray(expr)){
var tests = [];
for(var i = 0,len = expr.length; i < len; i++){
tests.push(parseExpression(expr[i]).get)
}
var prev = [];
test = function(context){
var equal = true;
for(var i =0, len = tests.length; i < len; i++){
var splice = tests[i](context);
if(!_.equals(splice, prev[i])){
equal = false;
prev[i] = _.clone(splice);
}
}
return equal? false: prev;
}
}else{
expr = this.$expression? this.$expression(expr) : parseExpression(expr);
get = expr.get;
once = expr.once || expr.constant;
}
var watcher = {
id: uid,
get: get,
fn: fn,
once: once,
force: options.force,
test: test,
deep: options.deep
}
this._watchers.push( watcher );
rlen = this._records && this._records.length;
if(rlen) this._records[rlen-1].push(uid)
// init state.
if(options.init === true){
this.$phase = 'digest';
this._checkSingleWatch( watcher, this._watchers.length-1 );
this.$phase = null;
}
return uid;
},
$unwatch: function(uid){
if(!this._watchers) this._watchers = [];
if(Array.isArray(uid)){
for(var i =0, len = uid.length; i < len; i++){
this.$unwatch(uid[i]);
}
}else{
var watchers = this._watchers, watcher, wlen;
if(!uid || !watchers || !(wlen = watchers.length)) return;
for(;wlen--;){
watcher = watchers[wlen];
if(watcher && watcher.id === uid ){
watchers.splice(wlen, 1);
}
}
}
},
/**
* the whole digest loop ,just like angular, it just a dirty-check loop;
* @param  {String} path  now regular process a pure dirty-check loop, but in parse phase,
*                  Regular's parser extract the dependencies, in future maybe it will change to dirty-check combine with path-aware update;
* @return {Void}
*/
$digest: function(){
if(this.$phase === 'digest') return;
this.$phase = 'digest';
var dirty = false, n =0;
while(dirty = this._digest()){
if((++n) > 20){ // max loop
throw 'there may a circular dependencies reaches'
}
}
if( n > 0 && this.$emit) this.$emit("$update");
this.$phase = null;
},
// private digest logic
_digest: function(){
// if(this.context) return this.context.$digest();
// if(this.$emit) this.$emit('digest');
var watchers = this._watchers;
var dirty = false, children, watcher, watcherDirty;
if(watchers && watchers.length){
for(var i = 0, len = watchers.length;i < len; i++){
watcher = watchers[i];
watcherDirty = this._checkSingleWatch(watcher, i);
if(watcherDirty) dirty = true;
}
}
// check children's dirty.
children = this._children;
if(children && children.length){
for(var m = 0, mlen = children.length; m < mlen; m++){
if(children[m]._digest()) dirty = true;
}
}
return dirty;
},
// check a single one watcher
_checkSingleWatch: function(watcher, i){
var dirty = false;
if(!watcher) return;
if(watcher.test) { //multi
var result = watcher.test(this);
if(result){
dirty = true;
watcher.fn.apply(this, result)
}
}else{
var now = watcher.get(this);
var last = watcher.last;
var eq = true;
if(_.typeOf( now ) === 'object' && watcher.deep){
if(!watcher.last){
eq = false;
}else{
for(var j in now){
if(watcher.last[j] !== now[j]){
eq = false;
break;
}
}
if(eq !== false){
for(var n in last){
if(last[n] !== now[n]){
eq = false;
break;
}
}
}
}
}else{
eq = _.equals(now, watcher.last);
}
if(eq === false || watcher.force){ // in some case. if undefined, we must force digest.
eq = false;
watcher.force = null;
dirty = true;
watcher.fn.call(this, now, watcher.last);
if(typeof now !== 'object'|| watcher.deep){
watcher.last = _.clone(now);
}else{
watcher.last = now;
}
}else{ // if eq == true
if( _.typeOf(eq) === 'array' && eq.length ){
watcher.last = _.clone(now);
watcher.fn.call(this, now, eq);
dirty = true;
}else{
eq = true;
}
}
// @TODO
if(dirty && watcher.once) this._watchers.splice(i, 1);
return dirty;
}
},
/**
* **tips**: whatever param you passed in $update, after the function called, dirty-check(digest) phase will enter;
*
* @param  {Function|String|Expression} path
* @param  {Whatever} value optional, when path is Function, the value is ignored
* @return {this}     this
*/
$update: function(path, value){
if(path != null){
var type = _.typeOf(path);
if( type === 'string' || path.type === 'expression' ){
path = parseExpression(path);
path.set(this, value);
}else if(type === 'function'){
path.call(this, this.data);
}else{
for(var i in path) {
if(path.hasOwnProperty(i)){
this.data[i] = path[i];
}
}
}
}
if(this.$root) this.$root.$digest()
},
// auto collect watchers for logic-control.
_record: function(){
if(!this._records) this._records = [];
this._records.push([]);
},
_release: function(){
return this._records.pop();
}
}
_.extend(Watcher.prototype, methods)
Watcher.mixTo = function(obj){
obj = typeof obj === "function" ? obj.prototype : obj;
return _.extend(obj, methods)
}
module.exports = Watcher;
});
require.register("regularjs/src/helper/event.js", function(exports, require, module){
// simplest event emitter 60 lines
// ===============================
var slice = [].slice, _ = require("../util.js");
var buildin = ['$inject', "$init", "$destroy", "$update"];
var API = {
$on: function(event, fn) {
if(typeof event === "object"){
for (var i in event) {
this.$on(i, event[i]);
}
}else{
// @patch: for list
var context = this;
var handles = context._handles || (context._handles = {}),
calls = handles[event] || (handles[event] = []);
calls.push(fn);
}
return this;
},
$off: function(event, fn) {
var context = this;
if(!context._handles) return;
if(!event) this._handles = {};
var handles = context._handles,
calls;
if (calls = handles[event]) {
if (!fn) {
handles[event] = [];
return context;
}
for (var i = 0, len = calls.length; i < len; i++) {
if (fn === calls[i]) {
calls.splice(i, 1);
return context;
}
}
}
return context;
},
// bubble event
$emit: function(event){
// @patch: for list
var context = this;
var handles = context._handles, calls, args, type;
if(!event) return;
var args = slice.call(arguments, 1);
var type = event;
if(!handles) return context;
// @deprecated 0.3.0
// will be removed when completely remove the old events('destroy' 'init') support
/*@remove 0.4.0*/
var isBuildin = ~buildin.indexOf(type);
if(calls = handles[type.slice(1)]){
for (var j = 0, len = calls.length; j < len; j++) {
calls[j].apply(context, args)
}
}
/*/remove*/
if (!(calls = handles[type])) return context;
for (var i = 0, len = calls.length; i < len; i++) {
calls[i].apply(context, args)
}
// if(calls.length) context.$update();
return context;
},
// capture  event
$broadcast: function(){
}
}
// container class
function Event() {
if (arguments.length) this.$on.apply(this, arguments);
}
_.extend(Event.prototype, API)
Event.mixTo = function(obj){
obj = typeof obj === "function" ? obj.prototype : obj;
_.extend(obj, API)
}
module.exports = Event;
});
require.register("regularjs/src/helper/animate.js", function(exports, require, module){
var _ = require("../util");
var dom  = require("../dom.js");
var animate = {};
var env = require("../env.js");
var
transitionEnd = 'transitionend',
animationEnd = 'animationend',
transitionProperty = 'transition',
animationProperty = 'animation';
if(!('ontransitionend' in window)){
if('onwebkittransitionend' in window) {
// Chrome/Saf (+ Mobile Saf)/Android
transitionEnd += ' webkitTransitionEnd';
transitionProperty = 'webkitTransition'
} else if('onotransitionend' in dom.tNode || navigator.appName === 'Opera') {
// Opera
transitionEnd += ' oTransitionEnd';
transitionProperty = 'oTransition';
}
}
if(!('onanimationend' in window)){
if ('onwebkitanimationend' in window){
// Chrome/Saf (+ Mobile Saf)/Android
animationEnd += ' webkitAnimationEnd';
animationProperty = 'webkitAnimation';
}else if ('onoanimationend' in dom.tNode){
// Opera
animationEnd += ' oAnimationEnd';
animationProperty = 'oAnimation';
}
}
/**
* inject node with animation
* @param  {[type]} node      [description]
* @param  {[type]} refer     [description]
* @param  {[type]} direction [description]
* @return {[type]}           [description]
*/
animate.inject = function( node, refer ,direction, callback ){
callback = callback || _.noop;
if( Array.isArray(node) ){
var fragment = dom.fragment();
var count=0;
for(var i = 0,len = node.length;i < len; i++ ){
fragment.appendChild(node[i]);
}
dom.inject(fragment, refer, direction);
var enterCallback = function (){
count++;
if( count === len ) callback();
}
if(len === count) callback();
for( i = 0; i < len; i++ ){
if(node[i].onenter){
node[i].onenter(enterCallback);
}else{
enterCallback();
}
}
}else{
dom.inject( node, refer, direction );
if(node.onenter){
node.onenter(callback)
}else{
callback();
}
// if( node.nodeType === 1 && callback !== false ){
//   return startClassAnimate( node, 'r-enter', callback , 2);
// }
// ignored else
}
}
/**
* remove node with animation
* @param  {[type]}   node     [description]
* @param  {Function} callback [description]
* @return {[type]}            [description]
*/
animate.remove = function(node, callback){
callback = callback || _.noop;
if(node.onleave){
node.onleave(function(){
dom.remove(node);
})
}else{
dom.remove(node)
callback && callback();
}
}
animate.startClassAnimate = function ( node, className,  callback, mode ){
var activeClassName, timeout, tid, onceAnim;
if( (!animationEnd && !transitionEnd) || env.isRunning ){
return callback();
}
onceAnim = _.once(function onAnimateEnd(){
if(tid) clearTimeout(tid);
if(mode === 2) {
dom.delClass(node, activeClassName);
}
if(mode !== 3){ // mode hold the class
dom.delClass(node, className);
}
dom.off(node, animationEnd, onceAnim)
dom.off(node, transitionEnd, onceAnim)
callback();
});
if(mode === 2){ // auto removed
dom.addClass( node, className );
activeClassName = className.split(/\s+/).map(function(name){
return name + '-active';
}).join(" ");
dom.nextReflow(function(){
dom.addClass( node, activeClassName );
timeout = getMaxTimeout( node );
tid = setTimeout( onceAnim, timeout );
});
}else{
dom.nextReflow(function(){
dom.addClass( node, className );
timeout = getMaxTimeout( node );
tid = setTimeout( onceAnim, timeout );
});
}
dom.on( node, animationEnd, onceAnim )
dom.on( node, transitionEnd, onceAnim )
return onceAnim;
}
animate.startStyleAnimate = function(node, styles, callback){
var timeout, onceAnim, tid;
dom.nextReflow(function(){
dom.css( node, styles );
timeout = getMaxTimeout( node );
tid = setTimeout( onceAnim, timeout );
});
onceAnim = _.once(function onAnimateEnd(){
if(tid) clearTimeout(tid);
dom.off(node, animationEnd, onceAnim)
dom.off(node, transitionEnd, onceAnim)
callback();
});
dom.on( node, animationEnd, onceAnim )
dom.on( node, transitionEnd, onceAnim )
return onceAnim;
}
/**
* get maxtimeout
* @param  {Node} node
* @return {[type]}   [description]
*/
function getMaxTimeout(node){
var timeout = 0,
tDuration = 0,
tDelay = 0,
aDuration = 0,
aDelay = 0,
ratio = 5 / 3,
styles ;
if(window.getComputedStyle){
styles = window.getComputedStyle(node),
tDuration = getMaxTime( styles[transitionProperty + 'Duration']) || tDuration;
tDelay = getMaxTime( styles[transitionProperty + 'Delay']) || tDelay;
aDuration = getMaxTime( styles[animationProperty + 'Duration']) || aDuration;
aDelay = getMaxTime( styles[animationProperty + 'Delay']) || aDelay;
timeout = Math.max( tDuration+tDelay, aDuration + aDelay );
}
return timeout * 1000 * ratio;
}
function getMaxTime(str){
var maxTimeout = 0, time;
if(!str) return 0;
str.split(",").forEach(function(str){
time = parseFloat(str);
if( time > maxTimeout ) maxTimeout = time;
});
return maxTimeout;
}
module.exports = animate;
});
require.register("regularjs/src/helper/combine.js", function(exports, require, module){
// some nested  operation in ast
// --------------------------------
var dom = require("../dom.js");
var combine = module.exports = {
// get the initial dom in object
node: function(item){
var children,node;
if(item.element) return item.element;
if(typeof item.node === "function") return item.node();
if(typeof item.nodeType === "number") return item;
if(item.group) return combine.node(item.group)
if(children = item.children){
if(children.length === 1){
return combine.node(children[0]);
}
var nodes = [];
for(var i = 0, len = children.length; i < len; i++ ){
node = combine.node(children[i]);
if(Array.isArray(node)){
nodes.push.apply(nodes, node)
}else{
nodes.push(node)
}
}
return nodes;
}
},
// get the last dom in object(for insertion operation)
last: function(item){
var children = item.children;
if(typeof item.last === "function") return item.last();
if(typeof item.nodeType === "number") return item;
if(children && children.length) return combine.last(children[children.length - 1]);
if(item.group) return combine.last(item.group);
},
destroy: function(item, first){
if(!item) return;
if(Array.isArray(item)){
for(var i = 0, len = item.length; i < len; i++ ){
combine.destroy(item[i], first);
}
}
var children = item.children;
if(typeof item.destroy === "function") return item.destroy(first);
if(typeof item.nodeType === "number" && first)  dom.remove(item);
if(children && children.length){
combine.destroy(children, true);
item.children = null;
}
}
}
});
require.register("regularjs/src/helper/entities.js", function(exports, require, module){
// http://stackoverflow.com/questions/1354064/how-to-convert-characters-to-html-entities-using-plain-javascript
var entities = {
'quot':34,
'amp':38,
'apos':39,
'lt':60,
'gt':62,
'nbsp':160,
'iexcl':161,
'cent':162,
'pound':163,
'curren':164,
'yen':165,
'brvbar':166,
'sect':167,
'uml':168,
'copy':169,
'ordf':170,
'laquo':171,
'not':172,
'shy':173,
'reg':174,
'macr':175,
'deg':176,
'plusmn':177,
'sup2':178,
'sup3':179,
'acute':180,
'micro':181,
'para':182,
'middot':183,
'cedil':184,
'sup1':185,
'ordm':186,
'raquo':187,
'frac14':188,
'frac12':189,
'frac34':190,
'iquest':191,
'Agrave':192,
'Aacute':193,
'Acirc':194,
'Atilde':195,
'Auml':196,
'Aring':197,
'AElig':198,
'Ccedil':199,
'Egrave':200,
'Eacute':201,
'Ecirc':202,
'Euml':203,
'Igrave':204,
'Iacute':205,
'Icirc':206,
'Iuml':207,
'ETH':208,
'Ntilde':209,
'Ograve':210,
'Oacute':211,
'Ocirc':212,
'Otilde':213,
'Ouml':214,
'times':215,
'Oslash':216,
'Ugrave':217,
'Uacute':218,
'Ucirc':219,
'Uuml':220,
'Yacute':221,
'THORN':222,
'szlig':223,
'agrave':224,
'aacute':225,
'acirc':226,
'atilde':227,
'auml':228,
'aring':229,
'aelig':230,
'ccedil':231,
'egrave':232,
'eacute':233,
'ecirc':234,
'euml':235,
'igrave':236,
'iacute':237,
'icirc':238,
'iuml':239,
'eth':240,
'ntilde':241,
'ograve':242,
'oacute':243,
'ocirc':244,
'otilde':245,
'ouml':246,
'divide':247,
'oslash':248,
'ugrave':249,
'uacute':250,
'ucirc':251,
'uuml':252,
'yacute':253,
'thorn':254,
'yuml':255,
'fnof':402,
'Alpha':913,
'Beta':914,
'Gamma':915,
'Delta':916,
'Epsilon':917,
'Zeta':918,
'Eta':919,
'Theta':920,
'Iota':921,
'Kappa':922,
'Lambda':923,
'Mu':924,
'Nu':925,
'Xi':926,
'Omicron':927,
'Pi':928,
'Rho':929,
'Sigma':931,
'Tau':932,
'Upsilon':933,
'Phi':934,
'Chi':935,
'Psi':936,
'Omega':937,
'alpha':945,
'beta':946,
'gamma':947,
'delta':948,
'epsilon':949,
'zeta':950,
'eta':951,
'theta':952,
'iota':953,
'kappa':954,
'lambda':955,
'mu':956,
'nu':957,
'xi':958,
'omicron':959,
'pi':960,
'rho':961,
'sigmaf':962,
'sigma':963,
'tau':964,
'upsilon':965,
'phi':966,
'chi':967,
'psi':968,
'omega':969,
'thetasym':977,
'upsih':978,
'piv':982,
'bull':8226,
'hellip':8230,
'prime':8242,
'Prime':8243,
'oline':8254,
'frasl':8260,
'weierp':8472,
'image':8465,
'real':8476,
'trade':8482,
'alefsym':8501,
'larr':8592,
'uarr':8593,
'rarr':8594,
'darr':8595,
'harr':8596,
'crarr':8629,
'lArr':8656,
'uArr':8657,
'rArr':8658,
'dArr':8659,
'hArr':8660,
'forall':8704,
'part':8706,
'exist':8707,
'empty':8709,
'nabla':8711,
'isin':8712,
'notin':8713,
'ni':8715,
'prod':8719,
'sum':8721,
'minus':8722,
'lowast':8727,
'radic':8730,
'prop':8733,
'infin':8734,
'ang':8736,
'and':8743,
'or':8744,
'cap':8745,
'cup':8746,
'int':8747,
'there4':8756,
'sim':8764,
'cong':8773,
'asymp':8776,
'ne':8800,
'equiv':8801,
'le':8804,
'ge':8805,
'sub':8834,
'sup':8835,
'nsub':8836,
'sube':8838,
'supe':8839,
'oplus':8853,
'otimes':8855,
'perp':8869,
'sdot':8901,
'lceil':8968,
'rceil':8969,
'lfloor':8970,
'rfloor':8971,
'lang':9001,
'rang':9002,
'loz':9674,
'spades':9824,
'clubs':9827,
'hearts':9829,
'diams':9830,
'OElig':338,
'oelig':339,
'Scaron':352,
'scaron':353,
'Yuml':376,
'circ':710,
'tilde':732,
'ensp':8194,
'emsp':8195,
'thinsp':8201,
'zwnj':8204,
'zwj':8205,
'lrm':8206,
'rlm':8207,
'ndash':8211,
'mdash':8212,
'lsquo':8216,
'rsquo':8217,
'sbquo':8218,
'ldquo':8220,
'rdquo':8221,
'bdquo':8222,
'dagger':8224,
'Dagger':8225,
'permil':8240,
'lsaquo':8249,
'rsaquo':8250,
'euro':8364
}
module.exports  = entities;
});
require.register("regularjs/src/directive/base.js", function(exports, require, module){
// Regular
var _ = require("../util.js");
var dom = require("../dom.js");
var animate = require("../helper/animate.js");
var Regular = require("../Regular.js");
require("./event.js");
require("./form.js");
// **warn**: class inteplation will override this directive
Regular.directive('r-class', function(elem, value){
this.$watch(value, function(nvalue){
var className = ' '+ elem.className.replace(/\s+/g, ' ') +' ';
for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
className = className.replace(' ' + i + ' ',' ');
if(nvalue[i] === true){
className += i+' ';
}
}
elem.className = className.trim();
},true);
});
// **warn**: style inteplation will override this directive
Regular.directive('r-style', function(elem, value){
this.$watch(value, function(nvalue){
for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
dom.css(elem, i, nvalue[i]);
}
},true);
});
// when expression is evaluate to true, the elem will add display:none
// Example: <div r-hide={{items.length > 0}}></div>
Regular.directive('r-hide', function(elem, value){
var preBool = null, compelete;
this.$watch(value, function(nvalue){
var bool = !!nvalue;
if(bool === preBool) return;
preBool = bool;
if(bool){
if(elem.onleave){
compelete = elem.onleave(function(){
elem.style.display = "none"
compelete = null;
})
}else{
elem.style.display = "none"
}
}else{
if(compelete) compelete();
elem.style.display = "";
if(elem.onenter){
elem.onenter();
}
}
});
});
// unescaped inteplation. xss is not be protect
Regular.directive('r-html', function(elem, value){
this.$watch(value, function(nvalue){
nvalue = nvalue || "";
dom.html(elem, nvalue)
}, {force: true});
});
});
require.register("regularjs/src/directive/form.js", function(exports, require, module){
// Regular
var _ = require("../util.js");
var dom = require("../dom.js");
var Regular = require("../Regular.js");
var modelHandlers = {
"text": initText,
"select": initSelect,
"checkbox": initCheckBox,
"radio": initRadio
}
// @TODO
// two-way binding with r-model
// works on input, textarea, checkbox, radio, select
Regular.directive("r-model", function(elem, value){
var tag = elem.tagName.toLowerCase();
var sign = tag;
if(sign === "input") sign = elem.type || "text";
else if(sign === "textarea") sign = "text";
if(typeof value === "string") value = Regular.expression(value);
if( modelHandlers[sign] ) return modelHandlers[sign].call(this, elem, value);
else if(tag === "input"){
return modelHandlers.text.call(this, elem, value);
}
});
// binding <select>
function initSelect( elem, parsed){
var self = this;
var inProgress = false;
this.$watch(parsed, function(newValue){
if(inProgress) return;
var children = _.slice(elem.getElementsByTagName('option'))
children.forEach(function(node, index){
if(node.value == newValue){
elem.selectedIndex = index;
}
})
});
function handler(){
parsed.set(self, this.value);
inProgress = true;
self.$update();
inProgress = false;
}
dom.on(elem, "change", handler);
if(parsed.get(self) === undefined && elem.value){
parsed.set(self, elem.value);
}
return function destroy(){
dom.off(elem, "change", handler);
}
}
// input,textarea binding
function initText(elem, parsed){
var inProgress = false;
var self = this;
this.$watch(parsed, function(newValue){
if(inProgress){ return; }
if(elem.value !== newValue) elem.value = newValue == null? "": "" + newValue;
});
// @TODO to fixed event
var handler = function handler(ev){
var that = this;
if(ev.type==='cut' || ev.type==='paste'){
_.nextTick(function(){
var value = that.value
parsed.set(self, value);
inProgress = true;
self.$update();
})
}else{
var value = that.value
parsed.set(self, value);
inProgress = true;
self.$update();
}
inProgress = false;
};
if(dom.msie !== 9 && "oninput" in dom.tNode ){
elem.addEventListener("input", handler );
}else{
dom.on(elem, "paste", handler)
dom.on(elem, "keyup", handler)
dom.on(elem, "cut", handler)
dom.on(elem, "change", handler)
}
if(parsed.get(self) === undefined && elem.value){
parsed.set(self, elem.value);
}
return function destroy(){
if(dom.msie !== 9 && "oninput" in dom.tNode ){
elem.removeEventListener("input", handler );
}else{
dom.off(elem, "paste", handler)
dom.off(elem, "keyup", handler)
dom.off(elem, "cut", handler)
dom.off(elem, "change", handler)
}
}
}
// input:checkbox  binding
function initCheckBox(elem, parsed){
var inProgress = false;
var self = this;
this.$watch(parsed, function(newValue){
if(inProgress) return;
dom.attr(elem, 'checked', !!newValue);
});
var handler = function handler(){
var value = this.checked;
parsed.set(self, value);
inProgress= true;
self.$update();
inProgress = false;
}
if(parsed.set) dom.on(elem, "change", handler)
if(parsed.get(self) === undefined){
parsed.set(self, !!elem.checked);
}
return function destroy(){
if(parsed.set) dom.off(elem, "change", handler)
}
}
// input:radio binding
function initRadio(elem, parsed){
var self = this;
var inProgress = false;
this.$watch(parsed, function( newValue ){
if(inProgress) return;
if(newValue == elem.value) elem.checked = true;
else elem.checked = false;
});
var handler = function handler(){
var value = this.value;
parsed.set(self, value);
inProgress= true;
self.$update();
inProgress = false;
}
if(parsed.set) dom.on(elem, "change", handler)
// beacuse only after compile(init), the dom structrue is exsit.
if(parsed.get(self) === undefined){
if(elem.checked) parsed.set(self, elem.value);
}
return function destroy(){
if(parsed.set) dom.off(elem, "change", handler)
}
}
});
require.register("regularjs/src/directive/animation.js", function(exports, require, module){
var // packages
_ = require("../util.js"),
animate = require("../helper/animate.js"),
dom = require("../dom.js"),
Regular = require("../Regular.js");
var // variables
rClassName = /^[-\w]+(\s[-\w]+)*$/,
rCommaSep = /[\r\n\f ]*,[\r\n\f ]*(?=\w+\:)/, //  dont split comma in  Expression
rStyles = /^\{.*\}$/, //  for Simpilfy
rSpace = /\s+/, //  for Simpilfy
WHEN_COMMAND = "when",
EVENT_COMMAND = "on",
THEN_COMMAND = "then";
/**
* Animation Plugin
* @param {Component} Component
*/
function createSeed(type){
var steps = [], current = 0, callback = _.noop;
var key;
var out = {
type: type,
start: function(cb){
key = _.uid();
if(typeof cb === "function") callback = cb;
if(current> 0 ){
current = 0 ;
}else{
out.step();
}
return out.compelete;
},
compelete: function(){
key = null;
callback && callback();
callback = _.noop;
current = 0;
},
step: function(){
if(steps[current]) steps[current ]( out.done.bind(out, key) );
},
done: function(pkey){
if(pkey !== key) return; // means the loop is down
if( current < steps.length - 1 ) {
current++;
out.step();
}else{
out.compelete();
}
},
push: function(step){
steps.push(step)
}
}
return out;
}
Regular._addProtoInheritCache("animation")
// builtin animation
Regular.animation({
"wait": function( step ){
var timeout = parseInt( step.param ) || 0
return function(done){
// _.log("delay " + timeout)
setTimeout( done, timeout );
}
},
"class": function(step){
var tmp = step.param.split(","),
className = tmp[0] || "",
mode = parseInt(tmp[1]) || 1;
return function(done){
// _.log(className)
animate.startClassAnimate( step.element, className , done, mode );
}
},
"call": function(step){
var fn = Regular.expression(step.param).get, self = this;
return function(done){
// _.log(step.param, 'call')
fn(self);
self.$update();
done()
}
},
"emit": function(step){
var param = step.param;
var self = this;
return function(done){
self.$emit(param, step);
done();
}
},
// style: left {{10}}pxkk,
style: function(step){
var styles = {},
param = step.param,
pairs = param.split(","), valid;
pairs.forEach(function(pair){
pair = pair.trim();
if(pair){
var tmp = pair.split( rSpace ),
name = tmp.shift(),
value = tmp.join(" ");
if( !name || !value ) throw "invalid style in command: style";
styles[name] = value;
valid = true;
}
})
return function(done){
if(valid){
animate.startStyleAnimate(step.element, styles, done);
}else{
done();
}
}
}
})
// hancdle the r-animation directive
// el : the element to process
// value: the directive value
function processAnimate( element, value ){
value = value.trim();
var composites = value.split(";"),
composite, context = this, seeds = [], seed, destroies = [], destroy,
command, param , current = 0, tmp, animator, self = this;
function reset( type ){
seed && seeds.push( seed )
seed = createSeed( type );
}
function whenCallback(start, value){
if( !!value ) start()
}
function animationDestroy(element){
return function(){
element.onenter = undefined;
element.onleave = undefined;
}
}
for( var i = 0, len = composites.length; i < len; i++ ){
composite = composites[i];
tmp = composite.split(":");
command = tmp[0] && tmp[0].trim();
param = tmp[1] && tmp[1].trim();
if( !command ) continue;
if( command === WHEN_COMMAND ){
reset("when");
this.$watch(param, whenCallback.bind( this, seed.start ) );
continue;
}
if( command === EVENT_COMMAND){
reset(param);
if(param === "leave"){
element.onleave = seed.start;
}else if(param === "enter"){
element.onenter = seed.start;
}else{
destroy = this._handleEvent( element, param, seed.start );
}
destroies.push( destroy? destroy : animationDestroy(element) );
destroy = null;
continue
}
var animator =  Regular.animation(command)
if( animator && seed ){
seed.push(
animator.call(this,{
element: element,
done: seed.done,
param: param
})
)
}else{
throw "you need start with `on` or `event` in r-animation";
}
}
if(destroies.length){
return function(){
destroies.forEach(function(destroy){
destroy();
})
}
}
}
Regular.directive( "r-animation", processAnimate)
});
require.register("regularjs/src/directive/event.js", function(exports, require, module){
/**
* event directive  bundle
*
*/
var _ = require("../util.js");
var dom = require("../dom.js");
var Regular = require("../Regular.js");
Regular._addProtoInheritCache("event");
Regular.event( "enter" , function(elem, fire) {
function update( ev ) {
if ( ev.which === 13 ) {
ev.preventDefault();
fire(ev);
}
}
dom.on( elem, "keypress", update );
return function() {
dom.off( elem, "keypress", update );
}
})
Regular.directive( /^on-\w+$/, function( elem, value, name , attrs) {
if ( !name || !value ) return;
var type = name.split("-")[1];
return this._handleEvent( elem, type, value, attrs );
});
// TODO.
/**
- $('dx').delegate()
*/
Regular.directive( /^delegate-\w+$/, function( elem, value, name, attrs ) {
var root = this.$root;
var _delegates = root._delegates || ( root._delegates = {} );
if ( !name || !value ) return;
var type = name.split("-")[1];
var fire = _.handleEvent.call(this, value, type);
function delegateEvent(ev){
matchParent(ev, _delegates[type]);
}
if( !_delegates[type] ){
_delegates[type] = [];
root.$on( "$inject", function( newParent ){
var preParent = this.parentNode;
if( preParent ){
dom.off(preParent, type, delegateEvent);
}
dom.on(newParent, type, delegateEvent);
})
root.$on("$destroy", function(){
if(root.parentNode) dom.off(root.parentNode, type, delegateEvent)
root._delegates[type] = null;
})
}
var delegate = {
element: elem,
fire: fire
}
_delegates[type].push( delegate );
return function(){
var delegates = _delegates[type];
if(!delegates || !delegates.length) return;
for( var i = 0, len = delegates.length; i < len; i++ ){
if( delegates[i] === delegate ) delegates.splice(i, 1);
}
}
});
function matchParent(ev , delegates){
var target = ev.target;
while(target && target !== dom.doc){
for( var i = 0, len = delegates.length; i < len; i++ ){
if(delegates[i].element === target){
delegates[i].fire(ev);
}
}
target = target.parentNode;
}
}
});
require.register("regularjs/src/module/timeout.js", function(exports, require, module){
var Regular = require("../Regular.js");
/**
* Timeout Module
* @param {Component} Component
*/
function TimeoutModule(Component){
Component.implement({
/**
* just like setTimeout, but will enter digest automately
* @param  {Function} fn
* @param  {Number}   delay
* @return {Number}   timeoutid
*/
$timeout: function(fn, delay){
delay = delay || 0;
return setTimeout(function(){
fn.call(this);
this.$update(); //enter digest
}.bind(this), delay);
},
/**
* just like setInterval, but will enter digest automately
* @param  {Function} fn
* @param  {Number}   interval
* @return {Number}   intervalid
*/
$interval: function(fn, interval){
interval = interval || 1000/60;
return setInterval(function(){
fn.call(this);
this.$update(); //enter digest
}.bind(this), interval);
}
});
}
Regular.plugin('timeout', TimeoutModule);
});
require.alias("regularjs/src/index.js", "regularjs/index.js");
if (typeof exports == 'object') {
module.exports = require('regularjs');
} else if (typeof define == 'function' && define.amd) {
define(function(){ return require('regularjs'); });
} else {
window['Regular'] = require('regularjs');
}})();
I$(72,function (NEJ,_e,_p,_o,_f,_r){
/**
* 关联file的label点击事件
* @return {Void}
*/
_p.__handleFileLabelClick = function(){
//do nothing
};
return _p;
});
I$(71,function(_v,_h,_p_,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[2])._$KERNEL;if (_k_.engine=='gecko'){(function (){
/**
* 关联file的label点击事件
* @return {Void}
*/
_h.__handleFileLabelClick = (function(){
var _doLabelClick = function(_event){
_v._$stop(_event);
_v._$getElement(_event,'t:label').control.click();
};
return function(_label){
_v._$addEvent(
_label,'click',_doLabelClick
);
};
})();
})();};return _h;
},3,72,10);
I$(69,function (NEJ,_e,_v,_u,_h,_x,_p,_o,_f,_r){
var _cache = {},// {id:{lab:'label',pid:'parent'}}
_class = _e._$pushCSSText('.#<uispace>{position:absolute;width:0;height:0;overflow:hidden;}');
/**
* 文件选择按钮封装
*
* 结构举例
* ```html
* <p>
*   <!-- 必须为LABEL标签 -->
*   <label id="abc">选择文件</label>
* </p>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/file/select'
* ],function(_e){
*     // 绑定文件选择按钮
*     var _id = _e._$bind('abc',{
*         multiple:true,
*         onchange:function(_event){
*             // _event.form
*             // _event.id
*             // 如果要删除某个文件选择节点必须使用以下接口
*             _e._$remove(_event.id);
*         }
*     });
* });
* ```
*
* @method   module:util/file/select._$bind
* @param    {String|Node} arg0     - 绑定选择文件的节点，必须为label节点，且未设置for属性
* @param    {Object}      arg1     - 配置参数
* @property {String|Node} form     - 文件选择控件所在的表单，默认全新生成一个
* @property {String|Node} parent   - 如果新生成form表单则可以指定表单容器节点，默认为document.body
* @property {String}      name     - 单个文件选择支持指定提交时文件名称
* @property {String}      clazz    - 表单样式名称，可用于控制表单位置
* @property {Boolean}     multiple - 是否允许多选，默认单选
* @property {String}      accept   - 文件类型过滤，如image/*或者.png，多个类型用逗号分隔
* @property {Object}      param    - 参数集合，以input.hidden的形式放置在form中提交
* @property {Function}    onchange - 文件选择变化触发回调，{form:form,id:'xxx'}，
*                                    form - 文件选择控件封装表单对象，
*                                    id   - 当前变化的文件选择控件的ID
*/
/**
* @method CHAINABLE._$bind
* @see module:util/file/select._$bind
*/
_p._$bind = (function(){
// init cache
var _doInitCache = function(_id){
var _cch = _cache[_id];
if (!_cch){
_cch = {};
_cache[_id] = _cch;
}
return _cch;
};
// init param
var _doInitParam = function(_form,_param){
if (!_param) return;
var _arr = [];
_u._$loop(_param,function(_value,_key){
_arr.push('<input type="hidden" name="'+_key+'" value="'+_value+'">');
});
_form.insertAdjacentHTML('afterBegin',_arr.join(''));
};
// build parent
var _doBuildParent = function(_id,_form,_clazz,_param,_fbox){
var _parent,
_cch = _cache[_id],
_cls = _class+' '+(_clazz||'');
_form = _e._$get(_form);
if (!!_form){
_parent = _e._$create('div',_cls);
_form.appendChild(_parent);
_e._$dataset(_form,'id',_id);
_doInitParam(_form,_param);
}else{
_parent = _e._$create('form',_cls);
_e._$dataset(_parent,'id',_id);
_doInitParam(_parent,_param);
(_fbox||document.body).appendChild(_parent);
}
_cch.pid = _e._$id(_parent);
};
var _doAppendFile = function(_id,_cch){
var _accept = _cch.accept||'';
if (!!_accept){
_accept = 'accept="'+_accept+'"';
}
var _multiple = '';
if (!!_cch.multiple){
_multiple = 'multiple="true"';
}
var _cch = _cache[_id],
_fid = _id+"-"+_cch.nmb,
_file = _e._$html2node('<input type="file" '+_multiple+' '+_accept+' contenteditable="false" id="'+_fid+'"/>');
_cch.nmb++;
_e._$get(_cch.pid).appendChild(_file);
_v._$addEvent(_file,'change',_onFileChange);
return _fid;
};
// file select
var _onFileChange = function(_event){
var _element = _v._$getElement(_event),
_id = _element.id,
_arr = _id.split('-'),
_cch = _cache[_arr[0]];
if (!_element.value) return;
if (_cch.multiple){
_e._$get(_cch.lab).htmlFor =
_doAppendFile(_arr[0],_cch);
}
if (!_element.name){
var _sufix = '';//!_cch.multiple?'':('-'+(_cch.nmb-2));
_element.name = _cch.name+_sufix;
}
_cch.onchange({
id:_id,
form:_element.form,
target:_e._$get(_cch.lab)
});
};
return function(_element,_options){
_element = _e._$get(_element);
if (!_element||
_element.tagName!='LABEL') return;
_e._$dumpCSSText();
var _id = _u._$uniqueID(),
_cch = _doInitCache(_id);
_options = _options||_o;
_doBuildParent(
_id,
_options.form,
_options.clazz,
_options.param,
_e._$get(_options.parent)
);
_cch.nmb = 0;
_cch.name = _options.name||'file';
_cch.lab = _e._$id(_element);
_cch.accept = _options.accept||'';
_cch.multiple = !!_options.multiple;
_cch.onchange = _options.onchange||_f;
_element.htmlFor =
_doAppendFile(_id,_cch);
_h.__handleFileLabelClick(_element);
return _id;
};
})();
/**
* 根据ID取选中文件的form表单
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/file/select'
* ],function(_e){
*     // 取文件绑定的表单节点
*     var _form = _e._$get(_id);
* });
* ```
*
* @method module:util/file/select._$get
* @see    module:util/file/select._$file
* @param  {String} arg0 - 标识
* @return {Node}          表单节点
*/
_p._$get = function(_id){
var _conf = _cache[_id];
if (!_conf) return;
var _form = _e._$get(_conf.pid);
if (!_form) return;
if (_form.tagName!='FORM'){
_form = _form.parentNode;
}
return _form;
};
/**
* 根据ID删除选中文件的form表单
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/file/select'
* ],function(_e){
*     // 解绑文件选择按钮
*     _e._$unbind(_id);
* });
* ```
*
* @method module:util/file/select._$unbind
* @see    module:util/file/select._$file
* @param  {String} arg0 - 标识
* @return {Void}
*/
_p._$unbind = function(_id){
var _conf = _cache[_id];
if (!!_conf){
_e._$remove(_conf.pid);
delete _cache[_id];
}
};
// for chainable method
_x._$merge({_$bind:_p._$bind});
if (CMPT){
var _x = NEJ.P('nej.e');
_x._$file = _p._$bind;
_x._$getFileForm = _p._$get;
_x._$removeFileForm = _p._$unbind;
}
return _p;
},7,4,3,2,71,11);
I$(73,function (_k,_e,_u,_t,_p,_o,_f,_r,_pro){
/**
* 延时加载控件基类
*
* @class   module:util/lazy/loading._$$LazyLoading
* @extends module:util/event._$$EventTarget
*
* @config   {Object}      config - 配置信息
* @property {Node|String} parent - 滚动条所在容器，默认为根结点
* @property {String}      attr   - 属性标识名称，多个值用逗号分隔，如src则表示需要用到的信息在data-src上
*/
/**
* 资源检测触发事件
*
* @event    module:util/lazy/loading._$$LazyLoading#oncheck
* @param    {Object}  event   - 事件信息
* @property {Node}    target  - 资源节点
* @property {Object}  config  - 滚动容器信息，scrollTop/clientHeight...
* @property {Number}  value   - 操作标识，-1 - 移除，0 - 不做处理， 1 - 追加到页面
*/
/**
* 资源从页面移除触发事件
*
* @event    module:util/lazy/loading._$$LazyLoading#onremove
* @param    {Object}  event   - 事件信息
* @property {Node}    target  - 资源节点
* @property {Object}  config  - attr属性指定的配置信息
* @property {Boolean} stopped - 是否阻止后续逻辑
*/
/**
* 资源追加到页面触发事件
*
* @event    module:util/lazy/loading._$$LazyLoading#onappend
* @param    {Object}  event   - 事件信息
* @property {Node}    target  - 资源节点
* @property {Object}  config  - attr属性指定的配置信息
* @property {Boolean} stopped - 是否阻止后续逻辑
*/
_p._$$LazyLoading = _k._$klass();
_pro = _p._$$LazyLoading._$extend(_t._$$EventTarget);
/**
* 控件重置
*
* @protected
* @method module:util/lazy/loading._$$LazyLoading#__reset
* @param  {Object} arg0 - 配置信息
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__name = _options.attr||'';
this.__parent = _e._$get(_options.parent);
this.__doInitDomEvent([[
this.__parent||window,'scroll',
this.__doCheckScrollPosition._$bind(this)
]]);
this._$refresh();
};
/**
* 控件销毁
*
* @protected
* @method module:util/lazy/loading._$$LazyLoading#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
delete this.__parent;
this.__super();
};
/**
* 取滚动视图
*
* @protected
* @method module:util/lazy/loading._$$LazyLoading#__getScrollViewPort
* @return {Object} 滚动视图信息
*/
_pro.__getScrollViewPort = function(){
return this.__parent||_e._$getPageBox();
};
/**
* 取配置信息
*
* @protected
* @method module:util/lazy/loading._$$LazyLoading#__getSettingInfo
* @param  {Node} arg0 - 节点
* @return {Object}      配置信息
*/
_pro.__getSettingInfo = function(_node){
var _ret = {};
_u._$forEach(
this.__name.split(','),function(_name){
_ret[_name] = _e._$dataset(_node,_name);
}
);
return _ret;
};
/**
* 滚动检测
*
* @protected
* @method module:util/lazy/loading._$$LazyLoading#__doCheckScrollPosition
* @return {Void}
*/
_pro.__doCheckScrollPosition = (function(){
var _nmap = {
'-1':'onremove',
'1':'onappend'
};
return function(_event){
var _list = this.__getResourceList(
this.__parent||document
);
var _pbox = this.__getScrollViewPort();
_u._$forEach(
_list,function(_node){
// check node
var _eobj = {
target:_node,
config:_pbox
};
this._$dispatchEvent('oncheck',_eobj);
// check action result
var _ret = _eobj.value;
if (_ret==null){
_ret = this.__doCheckResource(_node,_pbox);
}
var _name = _nmap[_ret];
if (!_name){
return;
}
// check action
var _eobj = {
target:_node,
config:this.__getSettingInfo(_node)
};
this._$dispatchEvent(_name,_eobj);
if (!!_eobj.stopped){
return;
}
// do action
if (_ret==-1){
this.__doRemoveResource(_node);
}else{
this.__doAppendResource(
_node,_eobj.config
);
}
},this
);
};
})();
/**
* 取待验证资源列表，子类实现具体逻辑
*
* @abstract
* @method module:util/lazy/loading._$$LazyLoading#__getResourceList
* @param  {Node} arg0 - 滚动条所在容器节点
* @return {Void}
*/
_pro.__getResourceList = _f;
/**
* 验证资源是否需要做处理，子类实现具体逻辑
*
* @abstract
* @method module:util/lazy/loading._$$LazyLoading#__getResourceList
* @param  {Node}   arg0 - 资源节点
* @param  {Object} arg1 - 滚动容器节点
* @return {Number}        操作标识，-1 - 移除，0 - 不做处理， 1 - 追加到页面
*/
_pro.__doCheckResource = _f;
/**
* 移除资源，子类实现具体逻辑
*
* @abstract
* @method module:util/lazy/loading._$$LazyLoading#__doRemoveResource
* @param  {Node} arg0 - 资源节点
* @return {Void}
*/
_pro.__doRemoveResource = _f;
/**
* 添加资源，子类实现具体逻辑
*
* @abstract
* @method module:util/lazy/loading._$$LazyLoading#__doAppendResource
* @param  {Node}   arg0 - 资源节点
* @param  {Object} arg1 - 配置信息
* @return {Void}
*/
_pro.__doAppendResource = _f;
/**
* 强制刷新检测资源
*
* @method module:util/lazy/loading._$$LazyLoading#_$refresh
* @return {Void}
*/
_pro._$refresh = function(){
this.__doCheckScrollPosition();
};
},1,4,2,20);
I$(70,function (_k,_g,_e,_t,_p,_o,_f,_r,_pro){
/**
* 延时加载图片
*
* @class   module:util/lazy/image._$$LazyImage
* @extends module:util/lazy/loading._$$LazyLoading
*
* @param    {Object} config - 配置信息
* @property {String} holder - 图片占位地址，默认为空白图片
*
*/
_p._$$LazyImage = _k._$klass();
_pro = _p._$$LazyImage._$extend(_t._$$LazyLoading);
/**
* 控件重置
*
* @protected
* @method module:util/lazy/image._$$LazyImage#__reset
* @param  {Object} arg0 - 配置信息
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__holder = _options.holder||_g._$BLANK_IMAGE;
};
/**
* 取待验证资源列表
*
* @protected
* @method module:util/lazy/image._$$LazyImage#__getResourceList
* @param  {Node} arg0 - 滚动条所在容器节点
* @return {Void}
*/
_pro.__getResourceList = function(_parent){
//        console.log(+new Date);
return _parent.getElementsByTagName('img');
};
/**
* 验证资源是否需要做处理
*
* @protected
* @method module:util/lazy/image._$$LazyImage#__getResourceList
* @param  {Node}   arg0 - 资源节点
* @param  {Object} arg1 - 滚动容器节点
* @return {Number}        操作标识，-1 - 移除，0 - 不做处理， 1 - 追加到页面
*/
_pro.__doCheckResource = function(_target,_parent){
var _ch = _parent.clientHeight,
_top = _e._$offset(_target,_parent).y-_parent.scrollTop,
_bottom = _top+_target.offsetHeight,
_config = this.__getSettingInfo(_target),
// not src
// src is blank image
// src not equal to data-src
_holded = !_target.src||
_target.src.indexOf(this.__holder)>=0||
_target.src.indexOf(_config.src)<0;
// check resource append
if (_holded&&0<=_bottom&&_top<=_ch){
return 1;
}
// check resource remove
if (!_holded&&(_bottom<0||_top>_ch)){
return -1;
}
// do nothing
return 0;
};
/**
* 移除资源
*
* @protected
* @method module:util/lazy/image._$$LazyImage#__doRemoveResource
* @param  {Node} arg0 - 资源节点
* @return {Void}
*/
_pro.__doRemoveResource = function(_node){
_node.src = this.__holder;
};
/**
* 添加资源
*
* @protected
* @method module:util/lazy/image._$$LazyImage#__doAppendResource
* @param  {Node}   arg0 - 资源节点
* @param  {Object} arg1 - 配置信息
* @return {Void}
*/
_pro.__doAppendResource = function(_node,_conf){
_node.src = _conf.src||this.__holder;
};
},1,13,4,73);
I$(66,function (e, s, j,  v, lz){
// Regular中的dom帮助函数
var dom = Regular.dom;
var directives = {
'r-tooltip': function(elem, value){
console.log('do some directive logic');
},
'r-lazyimg': function(elem,value){
// 图片懒加载指令
// value为懒加载滚动容器id
this.data.lazy = lz._$$LazyImage._$allocate({
parent:value || elem.id || 'scrollBox',
attr:'src',
onremove:function(event){
event.stopped = 1;
}
});
}
}
var events = {
// 使用nej的mouseenter
'mouseenter': function(elem, fire, attrs){
v._$addEvent(elem, 'mouseenter', fire)
return function(){
v._$delEvent(elem, 'mouseenter', fire)
}
},
// 使用nej的mouseleave
'mouseleave': function(elem, fire, attrs){
v._$addEvent(elem, 'mouseleave', fire)
return function(){
v._$delEvent(elem, 'mouseleave', fire)
}
},
// on-upload 的custom event实现
// 注意 on-upload 必须绑定在 label上
'upload': function(elem, fire, attrs){
// 我们需要另外一个属性以提取参数
var param = attrs.filter(function(attr){
return attr.name === 'upload-param';
})[0];
var form;
// 处理上传
function onUpload(json){
if(json && json.code === 200){ //success
fire({type: 'upload', data: json.data});
}else{
fire({type: 'error', message: json.message});
}
bindSelectFile();
}
// 处理进度条
function onProgress(json){
if(json && typeof json.total === 'number' && typeof json.progress === 'number'){
fire({ type: 'progress' , data: json.progress / json.total });
}
}
// 处理选择file
function onFileChange(ev){
if(typeof FileReader === 'function'){
var files = nes.one('input', ev.form ).files,
file = files[0];
var reader = new FileReader(file);
reader.readAsDataURL(file); //读取文件
reader.addEventListener('load', function(){
fire({type: 'preview', data: this.result})
})
}
s._$unbind(ev.id);
ev.form.setAttribute('action', 'http://uploadURL')
j._$upload(ev.form, {
onload: onUpload,
onerror: onUpload,
onuploading: onProgress
})
}
var id;
function bindSelectFile(){
id = s._$bind(elem, {
parent: elem.parentNode,
name: 'img',
multiple: false,
accept:'image/*',
onchange: onFileChange
});
}
// 使用select动态生成input:file.
// 由于必须要在文档中，所以必须在inject之后进行bind
if(this.$root === this){
this.$on('inject', bindSelectFile);
}else{
bindSelectFile();
}
if(param) expression = Regular.expression(param.value);
return function destroy(){
if(id) s._$unbind(id);
// TODO: remove form 根据id
}
}
}
return {
events: events,
directives: directives
};
},4,69,32,3,70,65);
I$(75,function (_ut, _c) {
var clientInfo = {};
var _paramObj;
clientInfo._$initDeviceInfo = function(){
_paramObj = _ut._$query2object( document.URL.split('?')[1]||'' );
this.isApp = this.__isApp();
this.network = this.__getNetwork();
this.platform = this.__getPlatform();
this.deviceUdID = this.__getDeviceUdID();
};
/**
* App 是否高于或者等于函数参数版本
* @return {Boolean} true: 大于等于，false: 小于
*/
clientInfo._$isAppVerEqOver = function(ver){
var result = this.__compareVersion(this._$getAppVersion(), ver);
return result >= 0;
};
/**
* 比较版本
* @return {Number} v1 > v2: 1, v1=v2: 0, v1<v2: -1
* @private
*/
clientInfo.__compareVersion = function(v1, v2){
var _v1List = (v1||'').split('.'),
_v2List = (v2||'').split('.'),
maxLen	= Math.max(_v1List.length, _v2List.length),
tmpV1, tmpV2;
for (var i = 0; i < maxLen; i++) {
tmpV1 = parseInt(_v1List[i]||"", 10)||0;
tmpV2 = parseInt(_v2List[i]||"", 10)||0;
if (tmpV1 != tmpV2) {
return tmpV1 - tmpV2 > 0 ? 1 : -1;
}
}
return 0;
};
clientInfo._$getAppVersion = function(){
var r = /(kaolaApp\/|kaolaAppSpring\/)[\d\.]+/,
UA = window.navigator.userAgent;
if (!this.__isApp()) {
return '';
}
var resarray = r.exec(UA);
if (!resarray || !resarray.length) {
return '';
}
return resarray[0].split('/')[1]||'';
};
clientInfo.__isApp = function(){
var UA = window.navigator.userAgent,
reg = /kaolaApp/,
regSp = /kaolaAppSpring/;
return !!window.__isKaolaApp||reg.test(UA)||regSp.test(UA);
};
clientInfo.__getNetwork = function(){
//如果在APP中，则根据APP的网络类型判断
if (this.__isApp && _paramObj.network) {
return _paramObj.network;
}
//不在APP中，则尝试使用浏览器的网络类型数据判断
//只能获取到wifi，cellular 两种类型
var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if (connection) {
return connection.type;
}
//如果无法获得具体信息，则默认为cellular
return 'cellular';
};
//app平台类型，识别不出来则默认为0    android=1,ios=2
clientInfo.__getPlatform = function(){
if (this.__isApp && _paramObj.platform) {
return +_paramObj.platform;
}
// UA
var _userAgent = navigator.userAgent;
// IOS
var _isIOS = !!_userAgent.match(/(iPhone|iPod|iPad)/i);
// AOS
var _isAOS = !!_userAgent.match(/Android/i);
if (_isIOS) { return 2; }
if (_isAOS) { return 1; }
return 0;
};
//当前设备识别号， app中时以device id为准， 其它时候以浏览器指纹为准
// 浏览器指纹可能会为空， 所以最好是页面初始化完成2s后再获取
clientInfo.__getDeviceUdID = function(){
if (this.__isApp && _paramObj.deviceUdID) {
return _paramObj.deviceUdID;
}
var fgprint = _c._$cookie('JSESSIONID-WKL-8IO');
return fgprint||'';
};
clientInfo._$initDeviceInfo();
return clientInfo;
},2,43);
I$(74,function (_ut, clientinfo) {
var _ = {},
noop = function(){},
_userAgent = navigator.userAgent,
// IOS
_isIOS = !!_userAgent.match(/(iPhone|iPod|iPad)/i),
// AOS
_isAOS = !!_userAgent.match(/Android/i),
_searchPram = location.search.replace('?',''),
_urlObj = _ut._$query2object(_searchPram);
// 类型判断， 同typeof
_.typeOf = function (o) {
return o == null ? String(o) : ({}).toString.call(o).slice(8, -1).toLowerCase();
}
_.findInList = function(id, list, ident){
ident = ident || "id";
var len = list.length;
for(; len--;){
if(list[len][ident] == id) return len
}
return -1;
}
// 下载app公用方法，如果有打点参数需要监控下载渠道以及下载量。
_.download = function(){
var appChannel = '',
camName = '',
sid = '';
if(!!window.sessionStorage.getItem('appChannel')){
appChannel = window.sessionStorage.getItem('appChannel');
}
if(!!window.sessionStorage.getItem('camName')){
camName = window.sessionStorage.getItem('camName');
}
if(!!window.sessionStorage.getItem('sid')){
sid = window.sessionStorage.getItem('sid');
}
// 如果需要加统计，sid必须要有，否则页��空白
if(!!sid){
window.location.href = 'http://pr.da.netease.com/receiver/?action=ad&camName=' + camName + '&target=http%3A%2F%2Fwww.kaola.com%2Fmobile%2Fdownload.html%3FappChannel%3D' + appChannel + '&sid='+sid;
}else{
if(this.isInWeixinApp()){
window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kaola';
}else{
window.location.href = 'http://www.kaola.com/mobile/download.html';
}
}
}
_.merge = function(obj1, obj2){
var
type1 = _.typeOf(obj1),
type2 = _.typeOf(obj2),
len;
if(type1 !== type2) return obj2;
switch(type2){
case 'object':
for(var i in obj2){
if(obj2.hasOwnProperty(i)){
obj1[i] = _.merge(obj1[i], obj2[i]);
}
}
break;
case "array":
for(var i = 0, len = obj2.length; i < len; i++ ){
obj1[i] = _.merge(obj1[i], obj2[i]);
}
obj1.length = obj2.length;
break;
default:
return obj2;
}
return obj1;
}  // meregeList
_.mergeList = function(list, list2, ident){
ident = ident || "id";
var len = list.length;
for(; len--;){
for(var i = 0, len1 = list2.length; i < len1; i++){
if(list2[i][ident] != null&&list2[i][ident] === list[len][ident]){
list.splice(len, 1, _.merge(list2[i],list[len]));
break;
}
}
}
}
// 深度clone
_.clone = function(obj){
var type = _.typeOf(obj);
switch(type){
case "object":
var cloned = {};
for(var i in obj){
cloned[i] = _.clone(obj[i])
}
return cloned;
case 'array':
return obj.map(_.clone);
default:
return obj;
}
return obj;
}
_.extend = function(o1, o2 ,override){
for( var i in o2 ) if( o1[i] == undefined || override){
o1[i] = o2[i]
}
return o1;
}
_.initSelect = function(_select,_list,_value,_text){
_select.options.length = 0;
_value = _value||'value';
_text = _text||'text';
for(var i=0,l=_list.length;i<l;i++){
if(typeof _list[i]==='string'){
var option = new Option(_list[i],_list[i]);
} else{
var option = new Option(_list[i][_text],_list[i][_value]);
}
_select.options.add(option);
}
}
// 利用一个webp图片能否显示来检测当前浏览器环境是否支持webp
// 返回true 支持，否则不支持
// added by hzliuxinqi 2015-8-11
_._$supportWebp = (function(){
var __supportwebp = false;
(function(){
var webp = new Image();
webp.onload = webp.onerror = function() {
__supportwebp = webp.height === 2;
webp.onload = webp.onerror = null;
webp = null;
};
//高度为2的一个webp图片
webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
})();
return function(){ return __supportwebp; };
})();
// 获取nos压缩处理后图像的链接
_.imgThumbnailUrl = function(url, width, height, quality, isclip){
try{
var suffix = 'imageView',
_width = width||0,
_height = height || 0,
_quality = quality || 85,
_isclip = isclip || false;
if (!url) { return url; };
//已经有处理标记的不再处理
if (url.indexOf(suffix) !== -1 && url.indexOf('thumbnail') !== -1) {
return url;
}
//png 图片不处理
if (url.indexOf('.png') !== -1) {
return url;
};
//2g,3g网络下将图片质量调整到60
var _network = clientinfo.network || '4g';  //默认值4g
if (!quality) {
//没有指明质量时才按网络情况处理
if (['2g','3g'].indexOf(_network) !== -1) {
_quality = 60;
};
};
//2g 网络下图片宽度减少75%
if (_network=='2g') {
_width = Math.ceil(_width*0.75);
};
//检查当前环境是否支持webp， 如果支持且没有webp参数，则可以增加
var needWebp = this._$supportWebp() && url.indexOf('type=webp')<0;
var _platform = clientinfo.platform || 0, _webpTail = '';
if (_platform===1 || needWebp) {
_webpTail = '&type=webp';
// 在支持webp的情况下，将压缩率提高10
if (_quality > 70) {
_quality -= 10;
}
};
if(!!_isclip){
var params = suffix+'&thumbnail='+_width+'y'+_height+'&quality='+_quality + _webpTail;
}else{
var params = suffix+'&thumbnail='+_width+'x'+_height+'&quality='+_quality + _webpTail;
}
if (url.indexOf('?') !==-1) {
return url+'&'+ params;
}else{
return url+'?'+ params;
}
}catch(e){
return url;
}
}
// 函数执行频度控制， added by hzliuxinqi refer from underscore
/**
* 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
*
* @param  {function}   func      传入函数
* @param  {number}     wait      表示时间窗口的间隔
* @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
*                                如果想忽略结尾边界上的调用，传入{trailing: false}
* @return {function}             返回客户调用函数
*/
_.throttle = function(func, wait, options) {
var context, args, result;
var timeout = null;
// 上次执行时间点
var previous = 0;
if (!options) options = {};
// 延迟执行函数
var later = function() {
// 若设定了开始边界不执行选项，上次执行时间始终为0
previous = options.leading === false ? 0 : (+new Date);
timeout = null;
result = func.apply(context, args);
if (!timeout) context = args = null;
};
return function() {
var now = (+new Date);
// 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
if (!previous && options.leading === false) previous = now;
// 延迟执行时间间隔
var remaining = wait - (now - previous);
context = this;
args = arguments;
// 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
// remaining大于时间窗口wait，表示客户端系统时间被调整过
if (remaining <= 0 || remaining > wait) {
clearTimeout(timeout);
timeout = null;
previous = now;
result = func.apply(context, args);
if (!timeout) context = args = null;
//如果延迟执行不存在，且没有设定结尾边界不执行选项
} else if (!timeout && options.trailing !== false) {
timeout = setTimeout(later, remaining);
}
return result;
};
};
/**
* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
*
* @param  {function} func        传入函数
* @param  {number}   wait        表示时间窗口的间隔
* @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
* @return {function}             返回客户调用函数
*/
_.debounce = function(func, wait, immediate) {
var timeout, args, context, timestamp, result;
var later = function() {
// 据上一次触发时间间隔
var last = (+new Date) - timestamp;
// 上次被包装函数被调用时间间隔last小于设定时间间隔wait
if (last < wait && last > 0) {
timeout = setTimeout(later, wait - last);
} else {
timeout = null;
// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
if (!immediate) {
result = func.apply(context, args);
if (!timeout) context = args = null;
}
}
};
return function() {
context = this;
args = arguments;
timestamp = (+new Date);
var callNow = immediate && !timeout;
// 如果延时不存在，重新设定延时
if (!timeout) timeout = setTimeout(later, wait);
if (callNow) {
result = func.apply(context, args);
context = args = null;
}
return result;
};
};
//提供在浏览器下一帧渲染时回调的入口
//added by hzliuxinqi 2015-08-25
_.nextFrame = (function(){
var vendors = ['ms', 'moz', 'webkit', 'o'];
var w = {};
w.__requestAnimationFrame = window.requestAnimationFrame;
for(var x = 0; x < vendors.length && !w.__requestAnimationFrame; ++x) {
w.__requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
}
if (!w.__requestAnimationFrame)
w.__requestAnimationFrame = function(callback) {
var id = window.setTimeout(function() { callback(); }, 16);
return id;
};
return function(callback){
w.__requestAnimationFrame.apply(window, arguments);
};
})();
/**
* 判别网页是否跑在旧版本的app中
* _aosVersion	低于安卓版本号,aos的版本号是,1,2,3,4这样的版本号
* _iosVersion	低于ios版本号  ios是1.3为10300
*/
_.isOldApp = function(_aosVersion,_iosVersion){
_aosVersion = _aosVersion||10;
_iosVersion =_iosVersion||10300;
if(_urlObj.apiVersion&&
((parseInt(_urlObj.version||'1')<_aosVersion&&_isAOS)||
(parseInt(_urlObj.version||'10')<_iosVersion&&_isIOS))){
return true;
} else{
return false;
}
};
_.isAOSAPP = function(){
var reg = /kaolaApp/,
regSp = /kaolaAppSpring/;
return (reg.test(_userAgent)||regSp.test(_userAgent))&&_isAOS;
};
/**
* 通过jsBridge 调用native方法
* @param  {String}  method   调用的Native方法名称
* @param  {Object}  args   调用的Native方法的参数
* @param  {Function} callback   exec回调 参数flag=1调用成功，0调用失败
* @param  {Function} nativeSucCb   native成功回调
* @param  {Function} nativeErrCb   native失败回调
* hzmating 20150625
*/
_.exec = function(_option){
var method = _option.method,
args = _option.args||{},
callback = _option.callback||function(res){},
nativeSucCb = _option.nativeSucCb||function(res){},
nativeErrCb = _option.nativeErrCb||function(res){};
if(!method){
callback(-1);
return;
}
if(window.WeixinJSBridge){
WeixinJSBridge.invoke(method,args,nativeSucCb,nativeErrCb);
callback(1);
}else{
callback(0);
}
};
/**
* wap登录相关 使用前请在页面底部加<@footerWidget/>
* add by hzmating
* @return {[type]} [description]
*/
_.isLogin = function(cb){
return !!window.__isKaolaLogin || !!nej.j._$cookie("NTES_SESS");
};
_.toLogin = function(targetUrl){
window.location.href = "/login.html?target="+window.encodeURIComponent(targetUrl || window.location.href);
};
//先判断登录，若未登录，则去登陆；若已登录，则执行参数中的方法；
_.afterLogin = function(cb,cxt){
_.isLogin() ? cb.call(cxt) : _.toLogin();
};
/**
* 判断是否是在kaola APP中 使用前请在页面底部加<@footerWidget/>
* add by hzmating
* @return {Boolean} [true:是;false:否]
*/
_.isKaolaApp = function(){
var UA = window.navigator.userAgent,
reg = /kaolaApp/,
regSp = /kaolaAppSpring/;
return reg.test(UA)||regSp.test(UA);
};
/**
* 判断页面是否在易信内部浏览器中打开
* add by hzzourong
* 20160120
*/
_.isInYixinApp = function(){
var UA = window.navigator.userAgent,
reg = /YiXin/i;
return reg.test(UA);
};
/**
* 判断页面是否在微信内部浏览器中打开
* add by hzzourong
* 20160120
*/
_.isInWeixinApp = function(){
var UA = window.navigator.userAgent,
reg = /MicroMessenger/i;
return reg.test(UA);
};
/**
* 判断app版本是否大于等于x.x 使用前请在页面底部加<@footerWidget/>
* add by hzmating
* @return {Number} [1:是;-1:否,0:非APP]
*/
_.isGteKaolaVer = (function(){
var isApp , curVer, isLowerVer = false;
if(_.isKaolaApp()){
var UA = window.navigator.userAgent;
var index = UA.indexOf("kaolaApp/");
var spIndex = UA.indexOf("kaolaAppSpring/");
isApp = true;
if(index<0 && spIndex<0){
isLowerVer = true;
}else{
if(index>=0){
curVer = +UA.slice(index+9,index+12);
}else{
curVer = +UA.slice(spIndex+15,spIndex+18);
}
}
}else{
isApp = false;
}
return function(testVer){
return isApp ? isLowerVer ? -1 : curVer>=testVer ? 1 : -1 : 0;
};
})();
/**
* 获取url的search中的参数值  param具体参数的key；all若为true，返回整个urlObj对象
* add by hzmating
* 20150920
*/
_.getUrlParam = function(param,all){
if(!!all){
return _urlObj;
}else{
return _urlObj[param];
}
};
/**
* 在url中插入需要的参数,返回结果
* add by hzjiangren
* 20160112
*/
_.insertParamIntoUrl = function(url, insertstr){
if(!url || !insertstr){
return url||'';
}
var splitAry = url.split('#'), before = splitAry[0];
splitAry[0] = (before.indexOf('?')>=0)?(before+'&'+insertstr):(before+'?'+insertstr);
return (splitAry.length > 1)?splitAry.join('#'):splitAry[0];
}
return _;
},2,75);
I$(67,function (_u, _, _p){
// common filter
_p.format = function(date, format){
return _u._$format(date, format || "yyyy-MM-dd");
};
_p.formathm = function(date, format){
date = parseInt(date);
format = format || "HH:mm";
return _u._$format(new Date(date),format);
};
_p.escape = _u._$escape;
/**
* by hzwuyuedong
* 字符串截取， 中英文都算一个len
*/
_p.cutstr = function(str, len) {
var temp,
icount = 0,
patrn = /[^\x00-\xff]/,
strre = "";
for (var i = 0; i < str.length; i++) {
if (icount < len - 1) {
temp = str.substr(i, 1);
if (patrn.exec(temp) == null) {
icount = icount + 1
} else {
icount = icount + 2
}
strre += temp
} else {
break;
}
}
return strre + "..."
};
_p.concatObjValue = function(_object, _str){
var _join = [];
_u._$forIn(_object,function(_item,_index,_this){
_join.push(_item);
});
return _join.join(_str);
};
/**
* by hzwuyuedong
* 浮点数值保留指定位数小数点
*/
_p.fixed = function(_data, _len){
var _num= parseFloat(_data, 10), _tmp;
if(_len == null){
_len = 2;
}
if(_u._$isNumber(_num)){
_tmp = _u._$fixed(_num, 2);
var _s = _tmp.toString();
var _rs = _s.indexOf('.');
if (_rs < 0) {
_rs = _s.length;
_s += '.';
}
while (_s.length <= _rs + _len) {
_s += '0';
}
return _s;
}else{
return '';
}
};
// 默认输出 luzhongfang 2015-6-15
_p.default = function(val, dft){
return !!val?val:dft;
}
// 获取nos压缩处理后图像的链接 hzliuxinqi 2015-4-27
_p.thumbnail = function(url, width, height, quality, isclip){
if (!url) { return null; };
return _.imgThumbnailUrl(url, width, height, quality, isclip);
}
return _p;
},2,74);
I$(78,"<div class=\"progress progress-fix animated\" r-hide='!progress' style='display:none'    r-animation= 'on: leave;  wait: 200;class: fadeOut'>   <div class=\"progress-bar progress-bar-striped active\"      role=\"progressbar\"      style=\" background-color: {{currentColor}};width: {{percent||0}}% ;\">   </div> </div>");
I$(76,function (tpl, R){
var config ={
COLOR_SUCCESS:'#5cb85c',
COLOR_INFO:'#5bc0de',
COLOR_DANGER:'#d9534f',
COLOR_WARNING:'#f0ad4e'
};
// @TODO: move to another file
// mix color1 with color2 : from mcss
function mix(c1, c2, weight){
var p = weight/100,
a = 0,
w = p * 2 -1,
w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0,
w2 = 1 - w1,
channels = [
parseInt(c1[0] * w1 + c2[0] * w2),
parseInt(c1[1] * w1 + c2[1] * w2),
parseInt(c1[2] * w1 + c2[2] * w2)
];
return channels
}
function rgb(hash){
hash = hash.charAt(0) === '#'? hash.slice(1) : hash
var channels;
if (hash.length === 6) {
channels = [
parseInt(hash.substr(0, 2), 16),
parseInt(hash.substr(2, 2), 16),
parseInt(hash.substr(4, 2), 16)
];
}else {
var r = hash.substr(0, 1);
var g = hash.substr(1, 1);
var b = hash.substr(2, 1);
channels = [
parseInt(r + r, 16),
parseInt(g + g, 16),
parseInt(b + b, 16)
];
}
return channels;
}
var color = {
ERROR: rgb(config.COLOR_DANGER),
COMPLETE: rgb(config.COLOR_SUCCESS)
}
var Progress = Regular.extend({
template: tpl,
// 默认属性
data: {
startColor: rgb(config.COLOR_INFO),
endColor: color.COMPLETE,
percent:0
},
// 计算属性
computed: {
currentColor: function(data){
var channels = mix(data.startColor, data.endColor, 100 - data.percent);
return "rgb(" + channels[0] + "," + channels[1] + "," +channels[2] + ")";
}
},
// 初始化后的函数
init: function(){
// 证明不是内嵌组件
if(this.$root == this) this.$inject(document.body);
},
// 移动到某个百分比
move: function(percent){
clearTimeout(this.timer);
if(percent === 1000) this.end(true)
else this.$update('percent', percent);
},
// 开始
start: function(){
if(this.timer) clearTimeout(this.timer);
this.data.progress = true;
this.data.percent = 2;
this.data.endColor = color.COMPLETE;
this.$update();
this._startTimer();
},
// 结束
end: function(error){
clearTimeout(this.timer);
this.data.progress = false;
this.data.percent = 100;
this.data.endColor = !error? color.COMPLETE: color.ERROR;
this.$update()
},
// 开始定时器
_startTimer: function(){
var data = this.data;
this.timer = this.$timeout(function(){
data.percent = data.percent + (100 - data.percent) * (Math.random() * .2);
this._startTimer();
}, Math.random() * 1000 + 2000);
}
// 使用timeout模块
}).use('timeout');
// 单例, 直接初始化
return new Progress();
/**
* 使用:
*    progress.start() 开始进度条
*    progress.end(isError) 结束进度条
*    progress.move() 移动到某个进度条位置，最大100
*/
},78,65);
I$(77,function (NEJ,_v,_u,_g,_j,_t,_p,_o,_f,_r){
/**
* 使用REST进行数据交互接口
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'base/event',
*     'util/ajax/rest'
* ],function(_v,_j){
*     // 通用错误处理，所有请求异常均会调用此回调处理
*     _v._$addEvent(
*         window,'resterror',function(_error){
*             // _error.code
*             // _error.message
*             // _error.data
*             // 通过设置_error.stopped阻止事件回调到请求的onerror中
*         }
*     );
*
*     var url = "http://a.b.com/rest/list";
*     var opt = {
*          param:{brand:'nokia',model:'9'},
*          data:'123',
*          method:'post',
*          onload:function(_data){
*              // 请求正常回调
*          },
*          onerror:function(_error){
*              // _error.code
*              // _error.message
*              // _error.data
*              // 如果window的resterror回调中stopped了事件则不会进入此回调
*          },
*          onbeforerequest:function(_event){
*              // _event.request
*              // _event.headers
*          }
*     }
*     _j._$request(url,opt);
* });
* ```
*
* @method module:util/ajax/rest._$request
* @param    {String}  arg0 - 请求地址
* @param    {Object}  arg1 - 可选配置参数
* @property {Boolean}  sync    - 是否同步请求
* @property {Variable} data    - 要发送的数据
* @property {Object}   param   - 请求参数,包括模板地址里使用的参数
* @property {String}   method  - 请求方式,GET/POST/PUT/DELETE
* @property {Number}   timeout - 超时时间,0 禁止超时监测
* @property {Object}   headers - 头信息
* @property {Object}   result  - onload回调输入时需包含的额外信息
*
* @property {module:util/ajax/xdr.onload} onload   - 请求载入成功回调
* @property {module:util/ajax/xdr.onerror} onerror - 请求载入失败回调
* @property {module:util/ajax/xdr.onbeforerequest} onbeforerequest - 发起请求之前回调
*
* @return   {Void}
*/
_p._$request = (function(){
var _cache = {},  // request cache - sn:{s:funciton(){},f:function(){}}
_reg0 = /\{(.*?)\}/gi,
_reg1 = /^get|delete|head$/i,
_jsn = /json/i,
_xml = /xml/i;
// clear request
var _doClear = function(_key){
var _request = _cache[_key];
if (!_request) return;
delete _request.s;
delete _request.f;
delete _cache[_key];
};
// request callback
var _doCallback = function(_key,_type){
var _request = _cache[_key];
if (!_request) return;
var _callback = _request[_type],
_args = _r.slice.call(arguments,2);
try{
(_callback||_f).apply(null,_args);
}catch(ex){
// ignore
if (DEBUG) throw ex;
console.error(ex.message);
console.error(ex);
}
_doClear(_key);
};
// request success
var _onLoad = function(_key,_data){
_doCallback(_key,'s',_data);
};
// request error
var _onError = function(_key,_error){
_error = _error||{};
// status 204 is ok
if (_error.code==_g._$CODE_ERRSERV&&
_error.data==204){
_onLoad(_key,null);
return;
}
// do error filter
// set error attr stopped=!0 will stop request error callback
_v._$dispatchEvent(
window,'resterror',_error
);
if (!!_error.stopped){
_doClear(_key);
return;
}
// do request fail callback
_doCallback(_key,'f',_error);
};
// check default headers
var _doCheckWithDefault = function(_headers,_key,_default){
var _value = _headers[_key]||
_headers[_key.toLowerCase()];
if (!_value){
_value = _default;
_headers[_key] = _value;
}
return _value;
};
// pre convert array
var _doCheckData = function(_data,_key,_map){
if (_u._$isArray(_data)){
_map[_key] = JSON.stringify(_data);
}
};
return function(_url,_options){
_options = _u._$merge({},_options);
var _exist = {},
_param = _options.param||_o;
// parse uri template
_url = _url.replace(_reg0,function($1,$2){
var _value = _param[$2];
if (_value!=null) _exist[$2] = !0;
return encodeURIComponent(_value||'')||$1;
});
// parse remain param
var _data = _options.data||{};
_u._$loop(
_param,function(_value,_key){
if (!_exist[_key]){
_data[_key] = _value;
}
}
);
// parse headers
var _type = 'text',
_headers = _options.headers||{},
_accept  = _doCheckWithDefault(_headers,'Accept','application/json'),
_content = _doCheckWithDefault(_headers,'Content-Type','application/json');
// response data format
if (_jsn.test(_accept)){
_type = 'json';
}else if(_xml.test(_accept)){
_type = 'xml';
}
// do request
var _key = _u._$uniqueID();
_cache[_key] = {
s:_options.onload||_f,
f:_options.onerror||_f
};
// add params to url with GET/HEAD/DELETE method
_options.method = _options.method||'GET';
if (_reg1.test(_options.method.trim())){
_u._$forIn(_data,_doCheckData);
_options.query = _data;
_data = null;
}else if (_jsn.test(_content)){
_data = JSON.stringify(_data);
}
_options.type    = _type;
_options.data    = _data;
_options.headers = _headers;
_options.onload  = _onLoad._$bind(null,_key);
_options.onerror = _onError._$bind(null,_key);
_j._$request(_url,_options);
};
})();
/**
* 通用载入出错回调函数，所有REST请求的异常均会进入此事件的回调逻辑中
*
* @event    external:window.onresterror
* @param    {Object}   event   - 错误信息
* @property {Number}   code    - 错误代码
* @property {String}   message - 错误描述
* @property {Variable} data    - 出错时携带数据
* @property {Boolean}  stopped - 是否阻止单个请求中的onerror回调
*/
_t._$$CustomEvent._$allocate({
element:window,
event:'resterror'
});
if (CMPT){
NEJ.P('nej.j')._$requestByREST = _p._$request;
}
return _p;
},7,3,2,13,32,30);
I$(68,function ( progress ,t, rest, xdr) {
var noop = function(){};
/**
* 平台request, 避免后续需要统一处理
* opt:  其他参数如 $request
*   - progress:  是否使用进度条提示(假)
*   - norest:  是否 不使用REST接口
*/
var request = function(url, opt){
opt = opt || {};
var olderror = opt.onerror || noop,
oldload = opt.onload || noop;
if(opt.progress){
progress.start();
opt.onload = function(json){
// for retcode
json.code = json.code || json.retcode;
if(json && json.code>=200 && json.code < 400 ){
progress.end();
oldload.apply(this, arguments);
}else{
progress.end(true)
olderror.apply(this, arguments);
}
}
opt.onerror = function(json){
progress.end(true)
olderror.apply(this, arguments);
}
}
if(!opt.type){
opt.type='json';
}
if(!opt.method||(opt.method&&opt.method.toLowerCase()=='get')){
if(!opt.query){
opt.query ={};
}
opt.query.t= +new Date;
}
if(opt.norest){
if(typeof opt.data=='object'){
opt.data = t._$object2query(opt.data);
}
xdr._$request(url, opt)
}else{
// rest get请求默认给data加time参数，解决缓存问题
if(!opt.data){
opt.data = {};
}
opt.data.t= +new Date;
rest._$request(url, opt)
}
}
return request;
},76,2,77,32);
I$(23,function (x, directive,filters,request){
var slice = Regular.util.slice,
msie = Regular.dom.msie,
noop = function(){},
config = {BEGIN: "{{", END: "}}"};
if(Regular.config){
Regular.config(config);
}
// 一些基础帮助函数
var util = function(){
var rEvent = /^on-(\w+)$/,
rExpression = new RegExp("^" + config.BEGIN + "(.*)" + config.END + "$");
// 获得元素的所有属性
function getAttrs( element ){
var attrs = element.attributes, len = attrs && attrs.length,
attr, passedAttr = [];
if(len){
for( var i = 0; i < len; i++ ){
if(!msie || msie > 8 || attrs[i].specified){
attr = attrs[i]
passedAttr.push(attr);
}
}
}
return passedAttr;
}
function getEventName(str){
var matched = rEvent.exec(str);
return matched && matched[1];
}
function getExpression(str){
var matched = rExpression.exec(str) ;
return matched && matched[1] && Regular.expression(matched[1]);
}
return {
getAttrs: getAttrs,
getEventName: getEventName,
getExpression: getExpression
}
}();
// 由Hub去承载初始化���立的全部component的责任;
var Hub = Regular.extend({
scope: Regular,
init: function initHub(){
var scope = this.scope;
this._initComponents(scope._components);
// @TODO: 是否开发指令的全局启动？
// this._initDirective(scope._directives);
},
// 初始化所有Components
_initComponents: function(components){
var Component;
for( var i in components ){
Component = components[i];
if( Component){
this._initComponent(i, Component);
}
}
},
/**
* 使用nes找到带有directive的节点,
* 并初始化
*/
_initDirectives: function(directives){
var directive;
for( var i in directives ){
directive = directives[i];
if( directive){
this._initDirective(i, directive);
}
}
},
// 初始化单个指令
_initDirective: function(name, directive){
var container = this.container || document.body;
var nodes = nes.all("[" + name +"]") ;
nodes.forEach(this._singleDirective.bind(this, "r-" + name ,  directive, "name"))
},
// 初始化Component
_initComponent: function(name, Component){
var container =  this.container || document.body;
var nodes = slice( container.getElementsByTagName(name) );
nodes.forEach(this._initTag.bind(this, Component));
},
// 初始化单个标签
_initTag: function(Component, node){
var attrs = util.getAttrs(node);
var data = {}, events = {},
watchers = {}, context = this, id;
attrs.forEach(function(attr){
var value = attr.value,
name = attr.name, expression, eventName;
if(name === 'id') id=name;
eventName = util.getEventName(name);
expression = util.getExpression(value);
if( !eventName ){ // data
if( !expression ){
data[name] = value
}else{
watchers[name] = expression;
data[name] = expression.get(context);
}
}else{ //event bind
events[eventName] = Regular.util.handleEvent.call(context, expression || value, eventName);
}
})
var component = new Component({data: data, events: events, $parent: this});
if(id) this[id] = component;
component.$bind(this, watchers);
component.$inject(node, 'after');
node.parentNode.removeChild(node);
}
});
/**
* 重写Regular.dom.find. 使得可以使用选择器
* @param  {String} sl 选择器
* @return {[type]}    [description]
*/
Regular.dom.find = function(sl){
return nes.one(sl);
}
// BaseComponent与Hub没有任何关系， 它是整个工程的基础Regular组件(基类)，
// 主要是作为容器使用, 你可以通过扩展BaseComponent来达到工程范围内的组件能力
// 具体: http://regularjs.github.io/guide/zh/core/use.html
//
var BaseComponent = Regular.extend({
// TODO
$request: function(_url,_options){
var self = this;
var olderror = _options.onerror || noop,
oldload = _options.onload || noop;
self.$update('loading', true);
function oncomplete(){
self.$update('loading', false);
}
_options.onload = oldload._$aop(null, oncomplete).bind(this);
_options.onerror = olderror._$aop(null, oncomplete).bind(this);
request(_url,_options);
}
})// 扩展指令和事件
.directive(directive.directives||{})
.event(directive.events||{})
.filter(filters || {});
/**
* 启动BaseComponent下的所有注册component
* @return {[type]} [description]
*/
BaseComponent.boot = function(data){
new Hub({
scope: BaseComponent,
data: data || window.__data__ || {}
})
}
return BaseComponent;
},65,66,67,68);
I$(82,function (_p,_o,_f,_r){
/**
* 节点hover行为
* @param  {Node}   节点
* @param  {String} 样式，默认为js-hover
* @return {Void}
*/
_p.__hoverElement = function(){
// use css :hover
};
/**
* 移除节点hover行为
* @param  {String} 节点ID
* @return {Void}
*/
_p.__unhoverElement = function(_id){
// use css :hover
};
return _p;
});
I$(81,function(_h,_v,_p_,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[2])._$KERNEL;if (_k_.engine=='trident'&&_k_.release<='2.0'){(function (){
var _cache = {};
// enter element
var _doEnter = function(_event){
var _element = _event.srcElement,
_class = _cache[_element.id],
_name = _element.className;
if (_name.indexOf(_class)<0){
_element.className += ' '+_class;
}
};
// leave element
var _doLeave = function(_event){
var _element = _event.srcElement,
_class = _cache[_element.id],
_name = _element.className||'';
if (_name.indexOf(_class)>=0){
_element.className = _name.replace(_class,'').trim();
}
};
/**
* 节点hover行为
* @param  {Node}   节点
* @param  {String} 样式，默认为js-hover
* @return {Void}
*/
_h.__hoverElement = function(_element,_class){
var _id = _element.id;
if (!!_cache[_id]) return;
// hover element
_cache[_id] = _class;
_v._$addEvent(
_id,'mouseenter',_doEnter
);
_v._$addEvent(
_id,'mouseleave',_doLeave
);
};
/**
* 移除节点hover行为
* @param  {String} 节点ID
* @return {Void}
*/
_h.__unhoverElement = function(_id){
if (!_cache[_id]) return;
delete _cache[_id];
_v._$delEvent(
_id,'mouseenter',_doEnter
);
_v._$delEvent(
_id,'mouseleave',_doLeave
);
};
})();};return _h;
},82,3,10);
I$(79,function (NEJ,_e,_x,_u,_h,_p,_o,_f,_r){
/**
* 节点hover行为，高版本浏览器用:hover样式处理
*
* 样式举例
* ```css
*    .page .element:hover,
*    .page .element.js-hover{background:#f00;}
* ```
*
* 结构举例
* ```html
*    <!-- 使用data-hover指定hover效果的样式名称 -->
*    <div id="abc" data-hover="js-hover">aaaaa</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'util/hover/hover'
*   ],function(_e){
*       // 如果hover效果的样式名已经通过data-hover指定
*       _e._$hover('abc');
*
*       // 如果hover效果的样式名没有通过data-hover指定
*       _e._$hover('abc','js-hover');
*   });
* ```
*
* @method module:util/hover/hover._$hover
* @param  {String|Node} arg0 - 节点
* @param  {String}      arg1 - 样式，默认为js-hover
* @return {Void}
*/
/**
* @method CHAINABLE._$hover
* @see module:util/hover/hover._$hover
*/
_p._$hover = function(_element,_clazz){
if (!_u._$isArray(_element)){
_element = _e._$get(_element);
if (!!_element){
_e._$id(_element);
_h.__hoverElement(
_element,_clazz||
_e._$dataset(_element,'hover')||
'js-hover'
);
}
return;
}
// batch hover
_u._$forEach(
_element,function(_node){
_p._$hover(_node,_clazz);
}
);
};
/**
* 低版本移除节点hover行为，高版本不做处理
*
* 样式举例
* ```css
*    .page .element:hover,
*    .page .element.js-hover{background:#f00;}
* ```
*
* 结构举例
* ```html
*    <!-- 使用data-hover指定hover效果的样式名称 -->
*    <div id="abc" data-hover="js-hover">aaaaa</div>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'util/hover/hover'
*   ],function(_e){
*       // 如果hover效果的样式名已经通过data-hover指定
*       _e._$hover('abc');
*
*       // 移除_$hover接口添加的效果
*       _e._$unhover('abc');
*   });
* ```
*
* @method module:util/hover/hover._$unhover
* @param  {String|Node} arg0 - 节点
* @return {Void}
*/
/**
* @method CHAINABLE._$unhover
* @see module:util/hover/hover._$unhover
*/
_p._$unhover = function(_element){
if (!_u._$isArray(_element)){
var _id = _e._$id(_element);
if (!!_id){
_h.__unhoverElement(_id);
}
return;
}
// batch unhover
_u._$forEach(
_element,function(_node){
_p._$unhover(_node);
}
);
};
// for chainable method
_x._$merge(_p);
if (CMPT){
NEJ.copy(NEJ.P('nej.e'),_p);
}
return _p;
},7,4,11,2,81);
I$(80,function () {
var config = {};
if(DEBUG){
window.URL = config.URL = '';
} else{
window.URL = config.URL = 'http://m.kaola.com';
}
return config;
},7);
I$(24,function (_k,_u,_t,_e,_v,_h,config,request,_p,_o,_f,_r,_pro){
/**
* 顶栏功能控件封装
*
* @class   _$$FrmTopBar
* @extends _$$EventTarget
*/
_p._$$FrmTopBar = _k._$klass();
_pro = _p._$$FrmTopBar._$extend(_t._$$EventTarget);
/**
* 控件初始化
* @param  {Object} 配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__body = _options.parent;
this.__noBack = _options.noback;
this.__getNodes();
this.__addEvent();
};
_pro.__getNodes = function() {
this.__menu = _e._$get('menu');
this.__topbar = _e._$get('topbar-box');
};
_pro._$setTitle = (function(){
var titleNode = _e._$get('toptitle');
if(!titleNode){
return;
}
var title = titleNode.innerText;
return function(newTitle){
if(newTitle){
titleNode.innerText = newTitle;
} else{
titleNode.innerText = title;
}
}
})()
_pro.__addEvent = function() {
if(!this.__noBack)
_v._$addEvent('backbtn','click',this.__onBackBtnClick._$bind(this));
_v._$addEvent(this.__menu,'click',this.__onMenuClick._$bind(this));
};
/**
* 在获取到当前页面用户的登陆情况后， 显示出相应的状态元素来
* @param  {Object} profile 后端返回的profile对象
* @return {Void}         无返回值
* @public
*/
_pro._$refreshBar = function(profile){
function isYixin(){
return navigator.userAgent.match(/yixin/i);
}
function isNewsApp(){
return navigator.userAgent.match(/NewsApp/i);
}
function isYixinUser(){
return profile && profile.account &&
profile.account.match(/@yixin\.163\.com$/i);
}
var topbarBox = document.querySelector('#topbar-box');
if (!topbarBox) { return; }
var yx = document.querySelector('#leftNavYixin');
var wapLogined = document.querySelector('#leftNav1');
var wapNotLogin = document.querySelector('#leftNav2');
wapLogined && wapLogined.classList.add('f-dn');
wapNotLogin && wapNotLogin.classList.add('f-dn');
if (isYixin()) {
// if (isYixinUser()) {
//     yx && yx.classList.remove('f-dn');
// }else{
if (profile && profile.account) {
if (wapLogined) {
wapLogined.classList.remove('f-dn');
wapLogined.querySelector('.name').innerHTML=profile.account;
}
}else{
wapNotLogin && wapNotLogin.classList.remove('f-dn');
}
// }
}else if(isNewsApp() && window.sessionStorage.getItem('news_kaola_ActId') == '7190'){
// 如果是在新闻客户端的钱包点开的h5页面，显示定制footer
_e._$delClassName('leftNavNewsApp', 'f-dn');
_e._$delClassName('moneypacket', 'f-dn');
_e._$addClassName('copyright', 'f-dn');
_e._$addClassName('pcView', 'f-dn');
_e._$addClassName('leftNav1', 'f-dn');
_e._$addClassName('leftNav2', 'f-dn');
}else{
if (profile && profile.account) {
if (wapLogined) {
wapLogined.classList.remove('f-dn');
wapLogined.querySelector('.name').innerHTML=profile.account;
}
}else{
wapNotLogin && wapNotLogin.classList.remove('f-dn');
}
var gotoWeb = document.querySelector('#pcView');
gotoWeb && gotoWeb.classList.remove('f-dn');
}
this.__setUrls();
};
_pro.__setUrls = function(){
this.__loginNode = _e._$get('loginLink');
this.__regisNode = _e._$get('regisLink');
this.__logoutNode = _e._$get('logoutLink');
if(!!this.__logoutNode)
this.__logoutNode.href += '?url='+encodeURIComponent(location.href);
if(!!this.__loginNode)
this.__loginNode.href += '?target='+encodeURIComponent(location.href);
if(!!this.__regisNode)
this.__regisNode.href += '?product=kaola&url=http%3A%2F%2Fglobal.163.com%2Furs%2Fredirect.html%3Ftarget%3D'+encodeURIComponent(encodeURIComponent(location.href))+'&loginurl=http%3A%2F%2Fglobal.163.com%2Furs%2Fredirect.html%3Ftarget%3D'+ encodeURIComponent(encodeURIComponent(location.href));
};
_pro.__onMenuClick = function(){
if(_e._$hasClassName(this.__topbar,'j-navopen')){
_e._$delClassName(this.__topbar,'j-navopen');
} else{
_e._$addClassName(this.__topbar,'j-navopen');
}
};
_pro.__onBackBtnClick = function(){
history.back();
};
return _p;
},1,2,20,4,3,79,80,68);
I$(83,"<div class=\"m-toast {{!h5Interactive ? '' : 'f-noevents'}}\" r-hide={{isHide}} on-touchmove={{this.preventMove($event)}}> \t<table  border=0  cellpadding=0  cellspacing=0  width=100%  height=100%> \t<tr><td  width=100%  align=center  valign=center> \t {{#list messages as msg}} \t  <div class='toast box animated {{msg.type}} {{msg.toastClass||\"\"}}' r-animation=\"on:enter;class:show toastFadeIn,3;\"> \t\t  {{msg.message}} \t  </div>   \t  {{/list}} \t</td></tr> \t</table> </div> ");
I$(25,function (tpl, R, _ ){
var Toast = Regular.extend({
template: tpl,
//默认时间
duration: 1300,
singleMsg: false,
isNativeToast: true,
nativeToastInteractive: false,
// icon对应
iconMap: {
"error": "remove-circle",
"success": "ok-sign",
"warning": "warning-sign",
"info": "info-sign",
"loading": "info-sign",
},
preventMove: function(evt){
evt.preventDefault();
},
config: function(data){
_.extend(data, {
messages: [],
position: 'right',
isHide:true,
h5Interactive: false
})
},
// 初始化后的函数
init: function(){
// 证明不是内嵌组件
if(this.$root == this) this.$inject(document.body);
},
/**
* 增加一个提醒，添加到队伍前方
* @param  {String|Object} message 消息或消息对象
*      -type: error, info ,warning, success, 默认为info
*      -title: 信息标题，默认为空
*      -message: toast的内容
*      -duration: 信息停留时间，-1 为无限. 默认1.3秒
*      -singleMsg: 是否允许同时显示多条消息， true为同时只允许显示一条消息，默认值为false
*      -isNativeToast: 是否调用native的toast方法，boolean值，默认为true
*      -nativeToastInteractive: 是否允许后面界面交互，boolean值，默认为false
* @return {Function}              不等待定时器，删除掉此提醒
*/
toast: function(message){
if(typeof message === "string"){
message = {
message: message
}
}
_.extend(message,{
type: 'info',
duration: this.duration,
singleMsg: this.singleMsg
})
if (message.singleMsg
&& (!this.data.isHide || this.data.messages.length>0) ) { return; };
this.$update(function(data){
data.isHide = false;
data.h5Interactive = message.h5Interactive;
})
setTimeout(function(){
this.$update(function(data){
data.messages.unshift(message)
})
}._$bind(this),10);
var clearFn = this.clear.bind(this, message);
setTimeout(clearFn,message.duration==-1? 1300: message.duration);
return clearFn;
},
/**
* 与notify一致，但是会清理所有消息，用于唯一的消息提醒
* @param  {String|Object} message 消息或消息对象
* @return {Function}              不等待定时器，删除掉此提醒
*/
show: function(message){
//app2.3的版本调用native的toast方法
if(_.isGteKaolaVer(2.3)==1){
if(message &&　!!message.isNativeToast){
_.exec({method:"toast",args:{
'message':message.message,
'duration': (message.duration||1300)/1000,
'interactive':message.nativeToastInteractive||false
}});
return;
}
}
if (message && !message.singleMsg) {
this.clearTotal();
};
return this.toast(message);
},
/**
* 与notify一致，但是会清理所有消息，用于唯一的消息提醒
* @param  {String|Object} message 消息或消息对象
* @return {Function}              不等待定时器，删除掉此提醒
*/
showError: function(message,options){
options = _.extend(options||{}, {
type: 'error'
})
return this.show(message, options);
},
clear: function(message){
var messages = this.data.messages,
len = messages.length;
for( ;len--; ){
if(message === messages[len]){
messages[len].toastClass = 'toastFadeOut';
this.__clearIndex = len;
}
}
this.$update();
setTimeout(
function(){
this.data.messages.splice(this.__clearIndex, 1);
this.$update(function(){
this.data.isHide = true; //动画触发，动画时间为 5秒
//alert(this.data.messages.length)
}._$bind(this))
this.__clearIndex = undefined;
}._$bind(this), 500 );
},
clearTotal: function(){
this.$update("messages", []);
}
// 使用timeout模块
}).use('timeout');
// 单例, 直接初始化
var toast = new Toast({});
return toast;
/**
* 使用:
*    notify.notify(msg) 开始进度条
*    notify.show(msg)   显示信息
*    notify.showError(msg) 显示错误 , show的简便接口
*/
},83,65,74);
I$(26,function (_k,_u,_t,_e,_,_v,_p,_o,_f,_r,_pro){
/**
* 顶栏功能控件封装
*
* @class   _$$ActionManage
* @extends _$$EventTarget
*  <a data-gatype="xinchonghui" data-gaop="libao" data-gatag="activitymain"></a>
*/
_p._$$ActionManage = _k._$klass();
_pro = _p._$$ActionManage._$extend(_t._$$EventTarget);
/**
* 控件初始化
* @param  {Object} 配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
_v._$addEvent(document, 'click', this.__onGACheck._$bind(this));
};
/**
* 登录
* @return {Void}
*/
_pro.__onGACheck = function(_event){
var _elm = _v._$getElement(_event,'d:gatype');
var _gaType = _e._$dataset(_elm,'gatype');
var _gaOP = _e._$dataset(_elm,'gaop');
var _gaTag = _e._$dataset(_elm,'gatag');
if(_gaType){
_gaq.push(['_trackEvent', _gaType, _gaOP, _gaTag]);
}
};
return _p;
},1,2,20,4,74,3);
I$(27,function (_k, _t, _ut, _, request) {
var _$$Userinfo = _k._$klass(),
pro = _$$Userinfo._$extend(_t._$$EventTarget);
pro.__init = function(){
this.__super();
};
pro.__reset = function(){
this.__super();
this.__userprofileFetched = false;
this.__getUserInfo(function(profile){
this.__userprofileFetched = true;
this.__userprofile = profile;
this._$dispatchEvent('login', profile);
}._$bind(this));
};
// profile:{
// 			account:"",
// 			nickname:""
// 		}
pro._$getProfile = function(callback){
var fireCallback = function(){
callback(this.__userprofile);
setTimeout(function(){
this._$delEvent('login', fireCallback);
}._$bind(this), 100);
}._$bind(this);
if (this.__userprofileFetched) {
fireCallback();
return;
}
//如果还没有获取到，则订阅事件, 待获取到了再调用
this._$addEvent('login', fireCallback);
};
/**
* 刷新页面登陆信息
* @param  {Function} callback [刷新完成回调函数]，可选
* @param {Object} opts 参数对象,可选
* @property {String} token 客户端给的token
* @property {String} ursId 客户端给的ursId
* @return {void}            无
* @public
*/
pro._$refresh = function(callback, opts){
this.__userprofileFetched = false;
this.__getUserInfo(function(profile){
this.__userprofileFetched = true;
this.__userprofile = profile;
callback(profile);
}._$bind(this), opts);
};
pro.__getUserInfo = function(callback, opts){
var _paramObj = _ut._$query2object( document.URL.split('?')[1]||'' );
var _data = _.extend({}, opts||{});
_data = _.extend(_data, _paramObj);
request('/user/ajax/getUserProfile.html', {
query: _data,
method: 'GET',
norest: true,
type: 'json',
onload: function(dt){
if (dt && dt.code==200 && dt.body && dt.body.profile) {
//已登陆
callback(dt.body.profile);
}else{
//未登陆
callback();
}
},
onerror: function(dt){
//当成未登录处理
callback();
}
});
};
//返回userinfo 单例
return (function(){
var userinfo;
return function(){
if (!userinfo){
userinfo = _$$Userinfo._$allocate();
}
return userinfo;
};
})();
},1,20,2,74,68);
;(function() {
//如果不是考拉iOS App则直接返回
var UA = window.navigator.userAgent,
reg = /kaolaApp/,
regSp = /kaolaAppSpring/,
isIOS = !!UA.match(/(iPhone|iPod|iPad)/i);
isKaolaApp = reg.test(UA)||regSp.test(UA);
if (!isIOS || !isKaolaApp) { return; }
if(window.jsonRPC) {
return;
}
var bridgeReadyEventTriggered = false;
var jsonRPCData = 'rpcdata';
var jsonRPCCall = 'rpccall';
var CustomProtocolScheme = 'jsonrpc';
var jsonRPCTag = 'jsonrpc';
var jsonRPCResultTag = 'result';
var jsonRPCErrorTag = 'error';
var jsonRPCIdTag = 'id';
var jsonRPCVer = '2.0';
var _current_id = 0;
var _callbacks = {};
var jsonRPC = {};
var nativeReady = false;
function CommandQueue() {
this.backQueue = [];
this.queue = [];
}
CommandQueue.prototype.dequeue = function() {
if(this.queue.length <= 0 && this.backQueue.length > 0) {
this.queue = this.backQueue.reverse();
this.backQueue = [];
}
return this.queue.pop();
};
CommandQueue.prototype.enqueue = function(item) {
if(this.length === 0) {
this.queue.push(item);
} else {
this.backQueue.push(item);
}
};
Object.defineProperty(CommandQueue.prototype, "length",
{get: function() {return this.queue.length + this.backQueue.length; }});
var commandQueue = new CommandQueue();
function nativeExec() {
if(commandQueue.length > 0) {
nativeReady = false;
window.location = CustomProtocolScheme + '://' + jsonRPCCall + '/' + _current_id;
return true;
} else {
return false;
}
}
function doCall(request, success_cb, error_cb) {
if (jsonRPCIdTag in request && typeof success_cb !== 'undefined') {
_callbacks[request.id] = { success_cb: success_cb, error_cb: error_cb };
}
commandQueue.enqueue(request);
if(nativeReady) {
nativeExec();
}
}
function doClose() {
delete window.jsonRPC;
delete window.jsbridge;
delete window.YixinJSBridge
}
jsonRPC.call = function(method, params, success_cb, error_cb) {
var request = {
jsonrpc : jsonRPCVer,
method  : method,
params  : typeof params === 'string' ? JSON.parse(params) : params,
id      : _current_id++
};
doCall(request, success_cb, error_cb);
};
jsonRPC.notify = function(method, params) {
var request = {
jsonrpc : jsonRPCVer,
method  : method,
params  : typeof params === 'string' ? JSON.parse(params) : params,
};
doCall(request, null, null);
};
jsonRPC.close = function() {
doClose();
};
jsonRPC.onMessage = function(message) {
var response = message;
if(typeof response === 'object'
&& jsonRPCTag in response
&& response.jsonrpc === jsonRPCVer) {
if(jsonRPCResultTag in response && _callbacks[response.id]) {
var success_cb = _callbacks[response.id].success_cb;
delete _callbacks[response.id];
success_cb(response.result);
return;
} else if(jsonRPCErrorTag in response && _callbacks[response.id]) {
var error_cb = _callbacks[response.id].error_cb;
delete _callbacks[response.id];
error_cb(response.error);
return;
}
}
};
jsonRPC.nativeFetchCommand = function() {
var command = commandQueue.dequeue();
return JSON.stringify(command);
};
jsonRPC.echo = function(message) {
alert(message);
};
jsonRPC.nativeEvent = {};
jsonRPC.nativeEvent.trigger = function(type, detail) {
var ev = document.createEvent('Event');
ev.initEvent(type, true, true);
ev.detail = detail;
document.dispatchEvent(ev);
};
var nativeEvent = {};
jsonRPC.nativeEvent.on = function(type, cb) {
document.addEventListener(type, cb, false);
if(!nativeEvent[type]) {
nativeEvent[type] = 1;
}
};
jsonRPC.nativeEvent.once = function(type, cb) {
document.addEventListener(type, function(e) {
cb(e);
document.removeEventListener(type);
}, false);
};
jsonRPC.nativeEvent.off = function(type) {
document.removeEventListener(type);
delete nativeEvent[type];
};
jsonRPC.nativeEvent.offAll = function() {
for(var key in nativeEvent) {
jsonRPC.nativeEvent.off(key);
}
nativeEvent = {};
};
jsonRPC.nativeEvent.respondsToEvent = function(type) {
return nativeEvent[type] === 1;
};
var debugChannel = 'anonymous';
jsonRPC.setDebugChannel = function(channel) {
debugChannel = channel;
};
jsonRPC.ready = function(isTestMode) {
if (bridgeReadyEventTriggered) {
return;
}
// if(isTestMode) {
//     var element = document.createElement('script');
//     element.setAttribute('src',"http://123.58.182.34:8181/target/target-script-min.js#" + debugChannel);
//     document.getElementsByTagName("body")[0].appendChild(element);
// }
window.addEventListener("hashchange", function() {
jsonRPC.call('onHashChange');
}, false);
jsonRPC.nativeEvent.on('NativeReady', function(e) {
nativeReady = false;
if(!nativeExec()) {
nativeReady = true;
}
});
jsonRPC.nativeEvent.trigger('NativeReady');
jsonRPC.nativeEvent.trigger('WeixinJSBridgeReady');
bridgeReadyEventTriggered = true;
console.log('trg WeixinJSBridgeReady ready');
};
window.WeixinJSBridge = {};
window.WeixinJSBridge = jsonRPC;
window.jsonRPC = jsonRPC;
window.WeixinJSBridge.invoke = jsonRPC.call;
window.WeixinJSBridge.call = jsonRPC.notify;
window.WeixinJSBridge.on = jsonRPC.nativeEvent.on;
window.WeixinJSBridge.off = jsonRPC.nativeEvent.off;
window.WeixinJSBridge.emit = jsonRPC.nativeEvent.trigger;
})();
I$(28,function (_k, _t, _ut, _, request, jsbridge_ios) {
var _$$AppBridge = _k._$klass(),
pro = _$$AppBridge._$extend(_t._$$EventTarget);
pro.__init = function() {
this.__super();
if (!_.isKaolaApp()){ return; }
/*启动jsbridge, 参数决定决定是否测试模式
setTimeout 为后续事件订阅行为留下操作时间
仅仅在考拉iOS App上调用 ready， Android还是走��有逻辑
*/
if ( !!window.navigator.userAgent.match(/(iPhone|iPod|iPad)/i)
&& jsonRPC
&& jsonRPC.ready
) {
setTimeout(function(){
jsonRPC.ready(false);
}, 0);
}
this.__jsbridgeReady = false;
this.__initjsBridgeEvents();
};
pro.__reset = function() {
this.__super();
//几种分享渠道
this.CHANNELS = {
"weixinMessage":"weixin_appmessage",
"weixinTimeline":"weixin_timeline",
"YixinMsg":"yixin_appmessage",
"YixinTimeline":"yixin_timeline",
"weibo":"weibo_app",
};
};
/**
* jsBridge初始化事件处理
* 1. 设置一个客户端分享事件反馈动作
*     默认的分享事件会触发两个事件，外部可以订阅这两个事件：
*     ondefaultMenuShareResult：分享结果事件
*     ondefaultMenuShareChannel：分享时选择分享渠道事件
* 2. 设置一个全局函数，返回当前页面可能的图片，让iOS预先下载
* 3. 设置一个全局函数，返回当前页面可能的图片，让iOS预先下载需要分享的大图URL列表，App可以决定是否提前下载
* @return {void} 无返回值
* @private
*/
pro.__initjsBridgeEvents = function() {
var self = this;
try{
NRUM.mark('jsbridge_listen');
}catch(e){}
function onBridgeReady() {
if (self.__jsbridgeReady) { return; } //如果已经ready，不再重复执行ready动作
var NJ = window.WeixinJSBridge;
self.__jsbridgeReady = !!NJ;
if (!self.__jsbridgeReady) { return; } //有些执行环境可能没有这个对象
self.__NJ = NJ;
self.__onJsbridgeReady();
self._$dispatchEvent('onready');
try{
NRUM.measure('jsbridge_ready_time','jsbridge_listen');
}catch(e){}
//客户端右上角的分享按钮点击，会触发kaola_appmessage 消息，通知到页面
NJ.on('kaola_appmessage', function() {
self._$openShare(window.shareConfig, function(res){
self._$dispatchEvent('ondefaultMenuShareResult', res);
}, function(res){
self._$dispatchEvent('ondefaultMenuShareChannel', res);
});
});
}
if (!!window.WeixinJSBridge && !!window.WeixinJSBridge.on) {
setTimeout( onBridgeReady, 0 ); //使回调函数异步执行，给后边的事件订阅保留操作时间。
}else{
document.addEventListener('WeixinJSBridgeReady', onBridgeReady);
}
};
//jsbridge 初始化完成后第一个执行的函数
pro.__onJsbridgeReady = function(){
//部分客户端存在导航后右上角按钮消失的情况，比如android，需要显示调用启用才显示
// this._$toggleShareBtn(true);
};
/**
* 调用App分享接口
* share_type有以下值，分别需要传的值如下：
* 0: 图文链接（img_url, link, desc, title, wbpost）
* 1：纯大图（imgOnlyUrlList） App2.3 新增
* 2：图片+二维码-模板1（imgOnlyUrlList, link, share_textlist）App2.4 新增
* 3：图片+二维码-模板2（imgOnlyUrlList, link, share_textlist）App2.4 新增
*
* @param  {Object} shareConfig           分享数据对象
*     @property {String} img_url 分享图文链接时的主图
*     @property {String} link 分享图文的链接
*     @property {String} desc 分享文案
*     @property {String} title 分享标题
*     @property {String} wbpost 微博分享文案
*     @property {String} share_channel 分享渠道，可选渠道见 this.CHANNELS
*     @property {Boolean} hide_result_hint 默认为true，false时App不显示分享成功失败toast提示
*     @property {Array} imgOnlyUrlList 当只分享图片，或者图文+二维码 时，需要传图
*     @property {Number} share_type 分享类型，默认为0， 可选值： 0:图文链接，1：纯大图，2： 图片+二维码-模板1，3：图片+二维码-模板2
*     @property {Array} share_textlist 图文+二维码时用于生成图片的文本列表，最多两个
*     @property {Boolean} needWeixinLogin  控制jsbridge 字段weixin_link 微信分享链接，当分享到微信时，如果此字段true，则用于替代link字段，否则以link字段为准
*     @property {Array} channel_config 分享渠道配置，当有传值时，客户端按要求显示分享渠道以及分享方式，例子：
*                                      [ {share_channel: 'weixin_appmessage', share_type: 0}, {share_channel: 'weixin_timeline', share_type: 1} ]
*                                      此配置仅显示微信的分享渠道，而且好友消息使用图文链接，朋友圈使用纯大图分享方式；
* @param  {Function} resultCallback       分享后的回调
*     @param {Object}
*            @property {Boolean} result 分享成功与否
*            @property {String} channel 分享渠道，App2.4 新增
*
* @param  {Function} selectChannelCallback 分享弹框起来后，用户点击分享渠道即将跳转时的回调
*     @param {Object}
*            @property {String} channel 分享渠道，App2.4 新增
* @return {Void}                       无返回值
* @public
*/
pro._$openShare = function(shareConfig, resultCallback, selectChannelCallback){
this.__afterReady(function(){
var channel = '',method,
_shareConfig = shareConfig||{};
//设置一个全局函数用于App 的分享渠道点击回调
window.NTShareChannelClick = function(result){
//分享渠道点击回调
channel = result && result.share_channel;
selectChannelCallback && selectChannelCallback({channel: channel});
};
if(!!_shareConfig.share_channel){
method = 'sendShareAppMessage';
}else{
method = 'shareKaolaAppMessage';
}
if (!!_shareConfig.needWeixinLogin) {
_shareConfig.weixin_link = 'http://m.kaola.com/share/wxpub_auth.html?target=' + encodeURIComponent(_shareConfig.link);
}
this.__NJ.invoke(method, _shareConfig, function(res) {
//分享结果回调
var _result = res && res.share_result && res.share_result !== 'false';
var _channel = res.share_channel || channel;
resultCallback && resultCallback({result: _result, channel: _channel});
if (window.NTShareChannelClick) {
window.NTShareChannelClick = undefined;
}
});
}, this);
};
/**
* 获取用户的位置信息，前提是手机系统已经给App授权，可以访问用户位置信息
* @param {Function} callback 获取到位置后的回调函数
*       @param {Object} 回调函数返回值，如果无权限则null
*              @property {String} province_code 省代号
*              @property {String} city_code 城市代号
*              @property {String} region_code 地区代号，可能没有
*              @property {String} province_name 省名
*              @property {String} city_name 市名
*              @property {String} region_name 区名，可能没有
*              @property {String} longitude GPS经度
*              @property {String} latitude GPS纬度
* @return {void} 无
*/
pro._$getLocation = function(callback){
this.__afterReady(function(){
this.__NJ.invoke('getLocation', {}, function(res){
callback && callback(res);
});
}, this);
};
/**
* 显示或者隐藏App右上角的分享按钮，如果不调用此方法，默认会显示按钮
* @param  {Boolean} isShow 是否显示，true:显示，false:不显示
* @return {[type]}         [description]
*/
pro._$toggleShareBtn = function(isShow){
var _isShow = !!isShow;
this.__afterReady(function(){
this.__NJ.invoke('shareKaolaAppTopBtn', {isShow: _isShow}, function(res){
});
}, this);
};
/**
* 使用App的上传图片功能，完成后App将图片地址列表返回
* 注意： iOS App 此功能无效，请使用js直接上传
* @param  {Function} callback 回调
*     @param {Object}  回调参数
*            @property {Object} body
*                 @property {Array} imageUrlList 图片URL数组
*            @property {Number} code 成功200，其它情况失败
*            @property {String} msg 后端给出的消息
* @return {void}            无返回
*/
pro._$uploadFile = function(callback){
this.__afterReady(function(){
this.__NJ.invoke('kaolaUploadFile', {},function(res){
callback && callback(res);
});
}, this);
};
/**
* 调用App 的订单确认浮层完成下单
* App2.0 时增加的接口
* 2015-12-31：增加 closeFormOnSuccess及结果回调
* @param  {Object}   orderInfo 必选，订单信息对象
*      @property {Array} goods 商品信息列表
*           @property {Number} goodsId 商品ID
*           @property {String} innerSource 订单来源，一般直接'OTHER'
*           @property {String} selected 是否选中，'1'/'0'
*           @property {String} skuId skuId
*           @property {Number} tempBuyAmount 购买数量
*           @property {Number} tempCurrentPrice 购买价格
*           @property {String} tempGoodsActivityType 参加的活动，一般情况可以不传
*      @property {String} type 扩展字段，按后端要求传，比如抢购时可以传入token
*      @property {String} s 扩展字段，按后端要求传
* @param  {Function} callback  用户操作完成后的回调 App 2.4 后增加，之前版本没有
*      @param {Object} res 返回对象
*          @property {Boolean} pay_result 支付结果，是否成功支付
* @return {void}             无
* @public
*/
pro._$openOrderConfirm = function(orderInfo, callback){
var _orderInfo = orderInfo || {};
this.__afterReady(function(){
this.__NJ.invoke('openOrderConfirm', _orderInfo, function(res) {
//回调函数
//res.pay_result:  支付结果，
//Boolean 类型， true/false，
//如果用户中断、取消、支付失败，则false， 成功则为true;
callback && callback(res);
});
}, this);
};
/**
* iOS 中检查系统是否禁止了App的推送，仅iOS有效
* @param  {Function} callback 回调
*     @property {Object} res 返回对象
*         @property {Boolean} result true:已经禁用，false:未禁用
* @return {Void}            无返回
* @public
*/
pro._$isSystemNoticeForbidden = function(callback){
this.__afterReady(function(){
this.__NJ.invoke('isForbiddenSystemNotice', {}, function(res) {
callback && callback(res);
});
}, this);
};
/**
* 点击签到后向客户���发送签到的状态
* 在考拉豆页面有应用
* @param  {Object} config 配置对象
*     @property {Boolean} result 是否已经签到 true/false
* @return {void}        无
* @public
*/
pro._$setSignStatus = function(config){
this.__afterReady(function(){
this.__NJ.invoke('setSignStatus', config||{result:false}, function(res) {});
}, this);
}
/**
* 向客户端发送用户总考拉豆的数量
* 在考拉豆页面有应用
* @param  {Object} config 配置对象
*     @property {Number} totalPointsCount 考拉豆数
* @return {void}        无
* @public
*/
pro._$sendTotalPointsCount = function(config){
this.__afterReady(function(){
this.__NJ.invoke('sendTotalPointsCount', config||{totalPointsCount:0}, function(res) {});
}, this);
}
/**
* H5页面调用App的toast, App 2.3 增加
* @param  {Object} msg 提示消息配置
*     @property {String} message 必填，消息文本
*     @property {Boolean} interactive 必填，是否允许后边界面操作，默认false
*     @property {Number} duration 必填，显示时长，默认1s, 单位为s
* @return {void}     无
* @public
*/
pro._$toast = function(msg){
var _msg = _.extend({
message: "",
interactive: false,
duration: 1
}, msg, true);
this.__afterReady(function(){
this.__NJ.invoke('toast', msg, function(res) {});
}, this);
};
/**
* h5页面调起APP的加入购物车浮层, App 2.3 增加
* @param  {Object} goodsInfo 商品配置信息
*     @property {Number} goodsId 商品ID
*     @property {Boolean} isMultiSkuId 是否为多SKU商品，从商品的skuIdList.length>1判断
*     @property {String} skuId skuId
*     @property {String} innerSource 来源，默认'OTHER'
*     @property {Number} tempBuyAmount 加入数量
*     @property {String} s 扩展，默认'2'
*     @property {Object} configs 扩展，用于传递额外信息给服务端
* @param {Function} callback 操作完成后的回调
*     @param {Object} res 回调函数参数
*         @property {Number} result 1/0, 1：成功 0：失败
*         @property {String} skuId skuId, 成功必传
*         @property {Number} goodsId 商品ID，成功必传
* @return {Void}           无
* @public
*/
pro._$openAddCart = function(goodsInfo, callback){
this.__afterReady(function(){
this.__NJ.invoke('openAddCart', goodsInfo, function(res) {
callback && callback(res);
});
}, this);
};
/**
* h5页面调起显示暖心卡界面, App 2.3 新增
* 不需要参数，也没有返回数据, native检测到需要显示，就会直接显示出来
* @return {void} 无
*/
pro._$openSweetCart = function(){
this.__afterReady(function(){
this.__NJ.invoke('openAddCart', {}, function(res) {});
}, this);
};
/**
* h5页面主动关闭当前webview , App 2.4 增加
* 不需要参数，也不需要返回回调或数据
* @return {void} 无
*/
pro._$closeWebviewWindow = function(){
this.__afterReady(function(){
this.__NJ.invoke('closeWebviewWindow', {}, function(res) {});
}, this);
};
/**
* h5页面主动调用App登陆窗口， App 2.4 新增
* App登陆完成后执行回调函数，并将token以参数的方式返回
* @param  {Function} callback 登陆或者取消回调
*     @param {Object} res 登陆回调返回
*         @property {String} token 成功必传，没有则失败
*         @property {String} ursId 成功必传
* @return {[type]}            [description]
*/
pro._$openLoginForm = function(callback){
this.__afterReady(function(){
this.__NJ.invoke('openLoginForm', {}, function(res) {
//res.token 登陆成功必传
callback && callback(res);
});
}, this);
};
/**
* h5页面App的查看大图功能，App 2.5新增
* @param  {Object} cfg 配置对象
*      @property {Array} urls 字符串数组，必传字段，表示需要用于预览的图片列表
*      @property {String} current 打开预览后，默认需要显示的那张图片，此图片必须存在于列表中
* @return {Void}     无返回值
*/
pro._$previewImage = function(cfg){
var _cfg = _.extend(cfg, {urls:[], current:''});
if (!_cfg.urls.length) { return; }
this.__afterReady(function(){
this.__NJ.invoke('previewimage', _cfg, function(res) {});
}, this);
};
/**
* 调用App 的截图功能，提供html让App渲染并截图分享 App 2.5新增
* @param  {Object}   cfg      配置数据
*     @property {String} contentHtml html内容文本
*     @property {Boolean} useContentOnly 可选，决定是否直接使用contentHtml 字段，不从当前页面获取头信息等，默认false
*     @property {Number} html_height 需要截图的内容区域高度
*     @property {String} link 需要分享的链接
*     @property {Array} share_textlist 大图生成时需要的文案列表
*     @property {Number} share_type 表示两种分享模板,2： 图片+二维码-模板1，3：图片+二维码-模板2
*     @property {Array} share_channels 分享渠道列表，如果有传值则会按列表显示给定的分享渠道，比如：['weixin_appmessage','weixin_timeline']
* @param  {Function} callback 回调，参数告知是否分享完成
* @return {Void}            无返回
*/
pro._$captureWebInfo = function(cfg, callback){
var _cfg = _.extend(cfg, {
contentHtml: "",
html_height:0,
link:"",
share_textlist: [],
share_type: 2,
useContentOnly: false
});
if (_cfg.useContentOnly) {
_cfg.html = _cfg.contentHtml;
}else{
_cfg.html = this.__buildPageHtml(_cfg.contentHtml);
}
_cfg.contentHtml = "";
// alert(JSON.stringify(_cfg));
this.__afterReady(function(){
this.__NJ.invoke('captureHtmlScreenshot', _cfg, function(res) {
callback(res && res.share_result);
});
}, this);
};
/**
* 构建一份内容为contentHtml 的 html文档，保留当前页面的css，去掉js；
* @return {String} 构件的html文本
* @private
*/
pro.__buildPageHtml = function(contentHtml){
var doctype = '<!DOCTYPE html>';
var headNodes = '', hcNodes = document.head.children;
for (var i = 0; i < hcNodes.length; i++) {
if (hcNodes[i].tagName.toUpperCase() !== 'SCRIPT'){
headNodes += hcNodes[i].outerHTML;
}
}
headNodes = '<head>' + headNodes + '</head>';
return doctype + '<html>' + headNodes + '<body>' + contentHtml + '</body></html>';
};
/**
* 设定右上角按钮功能, App 2.5 新增
* @param {Object} options 菜单配置信息
*     @property {Number} actionType 动作类型，必须传，
*         0:分享功能， 1：文字链接（文字使用actionName 字段，链接使用actionURL）
*     @property {String} actionName 文字链接时设定文字文案
*     @property {String} actionURL 文字链接时设定文字点击后的URL
* @return {void} 无
*/
pro._$setActionMenu = function(options){
var _opts = _.extend(options||{}, {
actionType: 0,
actionName: '',
actionURL: ''
});
this.__afterReady(function(){
this.__NJ.invoke('setActionMenu', _opts, function() {});
}, this);
};
/**
* 通过jsBridge 调用native方法
* @param  {String}  method   调用的Native方法名称
* @param  {Object}  args   调用的Native方法的参数
* @param {Number} timeout 超时毫秒数，超时未返回则自动生成超时失败回调
* @param  {Function} nativeSucCb   native成功回调
* @param  {Function} nativeErrCb   native失败回调
*/
pro._$invoke = function(option) {
this.__afterReady(function(){
var method = option.method,
args = option.args || {},
nativeSucCb = option.nativeSucCb || function(res) {},
nativeErrCb = option.nativeErrCb || function(res) {},
_timeout = option.timeout||1000000,
_timer;
_timer = setTimeout(function(){
_timer = undefined;
nativeErrCb({timeout: !0});
}, _timeout);
this.__NJ.invoke(method, args, function(res){
if (_timer === undefined) {
return;
}
clearTimeout(_timer);
nativeSucCb(res);
}, function(res){
if (_timer === undefined) {
return;
}
clearTimeout(_timer);
nativeErrCb(res);
});
}, this);
};
/**
* 如果jsbridge 已经就绪，直接调用回调函数，否则待就绪后再回调
* @param  {Function} callback 回调
* @return {Void}            无返回值
*/
pro.__afterReady = function(callback, context){
if (this.__jsbridgeReady) {
callback.apply(context);
}else{
var onready = function(){
callback.apply(context);
setTimeout(function(){
this._$delEvent('onready', onready);
}._$bind(this), 100)
};
this._$addEvent('onready', onready);
}
}
//返回userinfo 单例
return (function() {
var appBridge;
return function() {
if (!appBridge) {
appBridge = _$$AppBridge._$allocate();
}
return appBridge;
};
})();
},1,20,2,74,68,84);
I$(5,function (_e,ut,_ut,e, e2,BaseComponent,Topbar,Toast,_am, userinfo, getappbridge, _p,_o,_f,_r,_pro) {
_p._$$Module = NEJ.C();
_pro = _p._$$Module._$extend(ut._$$EventTarget);
_pro.__init = function(_options) {
this.__initDownloadParam();
this.__initNewsTabLink();
this.__super(_options);
this.__duplicateInitDetect();
this.__initUserinfo();
this.__initTopBar(_options||{});
this.__appbridge = getappbridge();
this._$seedAfterPageInit();
_am._$$ActionManage._$allocate();
};
_pro.__initUserinfo = function(){
this.__userinfo = userinfo();
this.__userinfo._$addEvent('login', function(profile){
this._$dispatchEvent('login', profile);
}._$bind(this));
};
_pro.__initTopBar = function(_options){
this.__topbar = Topbar._$$FrmTopBar._$allocate({noback:_options.noback});
this._$addEvent('login', function(profile){
this.__topbar._$refreshBar(profile);
});
//订阅用户异步登陆事件，登陆后刷新底部状态
document.addEventListener('asyncLogin', function(){
this.__userinfo._$getProfile(function(profile){
this.__topbar._$refreshBar(profile);
}._$bind(this));
}._$bind(this));
};
// 如果是在新闻app中，出现定制的topbar，需要给第一个tab设置url，根据localStorage中的actId来设置
_pro.__initNewsTabLink = function(){
if(!!_e._$get('newsH5Page')){
var elm = _e._$get('newsH5Page'),
data = _ut._$query2object(location.search.slice(1)),
activityId = data['newsappActId'];
if(!!activityId){  // 如果url中带有actId，则覆盖localStorage中的参数
elm.href = 'http://m.kaola.com/activity/h5/' + activityId + '.html';
window.sessionStorage.setItem('news_kaola_ActId', activityId);
}else{
activityId = window.sessionStorage.getItem('news_kaola_ActId');
if(!activityId){
elm.href = 'http://m.kaola.com/';
}else{
elm.href = 'http://m.kaola.com/activity/h5/' + activityId + '.html';
}
}
}
};
_pro.__initDownloadParam = function(){
var data = _ut._$query2object(location.search.slice(1)),
appChannel = data['appChannel'],
camName = data['camName'],
sid = data['sid'];
try{
if(!!appChannel){
window.sessionStorage && window.sessionStorage.setItem('appChannel', appChannel);
}
if(!!camName){
window.sessionStorage && window.sessionStorage.setItem('camName', camName);
}
if(!!sid){
window.sessionStorage && window.sessionStorage.setItem('sid', sid);
}
}catch(e){
}
};
_pro._$setTitle = function(title){
this.__topbar && this.__topbar._$setTitle && this.__topbar._$setTitle(title);
};
/**
* added by hzliuxinqi 2015-7-10
* 页面初始化完成后执行，主要用于部分不需要在页面显示后第一时间需要处理的操作，比如
*   回到顶部，app下载条等
* 也可以用来避免iOS平台第三方浏览器唤醒app时，当前页面的部分js被终止执行的问题。
* 此函数通过setTimeout 的方式来执行，一般不会被iOS的墓碑机制给cancel
* 函数具体执行内容需要子类实现
*/
_pro._$afterPageInit = _f;
_pro._$seedAfterPageInit = function(){
var delay = 500; //延迟500ms开始执行
if (this._$afterPageInit && this._$afterPageInit != _f) {
setTimeout(this._$afterPageInit._$bind(this), delay);
}
};
/**
* 检查是否被重复初始化，将问题在测试环境暴露出来
* @return {Boolean}     true: 有重复初始化，false:无
*/
_pro.__duplicateInitDetect = (function(){
var initCount = 0;
return function(){
initCount++;
if (initCount > 1) {
console.log('%c出错了：顶部栏被重复初始化', ' background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;font-weight:bold;');
alert('Error: Topbar duplicate inited');
}
return initCount>1;
};
})();
return _p._$$Module;
},4,20,2,21,22,23,24,25,26,27,28);
I$(85,function (Toast, u, _c,_p, _o, _f, _r) {
"use strict";
// UA
var _userAgent = navigator.userAgent;
// IOS
var _isIOS = !!_userAgent.match(/(iPhone|iPod|iPad)/i);
// AOS
var _isAOS = !!_userAgent.match(/Android/i);
// WinPhone
var _isWphone = !!_userAgent.match(/Windows Phone/i);
// PC
var _isPC = !_isIOS && !_isAOS && !_isWphone;
// 是否网易新闻
var _isNewsApp = !!_userAgent.match(/NewsApp/i);
// download link
var _downloadLink;
if(_isAOS){
_downloadLink = 'http://haitao.nos.netease.com/kaola_a8280d874e124daf8216fa76396edd86.apk';
}else{
_downloadLink = 'https://itunes.apple.com/us/app/kao-la-hai-gou-wang-yi-qi/id965789238?l=zh&ls=1&mt=8';
}
//    var _toastTimeout;
// platform
var _platform = {
'IOS': _isIOS,
'AOS': _isAOS,
'WinPhone': _isWphone,
'PC': _isPC
};
var _$$App = {
// 移动应用唤醒schema
schemaUrl: 'kaola://www.kaola.com',
// App 下载地址
appUrl: _downloadLink,
// 唤醒App
__openApp: function(openUrl, appUrl, action, callback) {
//检查app是否开启了
function checkOpen(cb){
var _clickTime = +(new Date());
function download(elsTime) {
if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
cb(1);
} else {
cb(0);
}
}
var _count = 0, intHandle;
intHandle = setInterval(function(){
_count++;
var elsTime = +(new Date()) - _clickTime;
if (_count>=100 || elsTime > 3000 ) {
clearInterval(intHandle);
download(elsTime);
}
}, 20);
}
//try open app
var ifr = document.createElement('iframe');
ifr.src = openUrl;
ifr.style.display = 'none';
if (callback || action=="download") {
checkOpen(function(opened){
// alert('opened: '+ opened );
callback && callback(opened);
if (action=="download" && !opened) {
window.location.href = appUrl;
}
});
}
document.body.appendChild(ifr);
setTimeout(function() {
document.body.removeChild(ifr);
}, 2000);
},
// 微信内部唤醒App 相关操作
_$inWeiXin: function() {
//微信直接跳转到应用宝， 应用宝网站会检查是否已经安装，如已安装，则会自动打开app
//否则停留在下载页
location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kaola';
},
// 当前所在环境
_$platform: (function() {
for (var _pf in _platform) {
if (_platform[_pf]) {
return _pf;
}
}
})(),
//增加浏览器判断， 只在白名单内部的浏览器，才执行唤醒app操作
_$browserSupport: function(){
var ua = navigator.userAgent.toLowerCase();
// 自动唤醒功能不作用于社交工具
if (ua.match(/micromessenger/i) || ua.match(/yixin/i) || ua.match(/weibo/i)) {
return false;
}
if (this._$platform==='IOS' ) {
if (/(iphone|ipod|ipad).* os [1-7]{1}_/.test(ua)) {
return false;
}
if (/lofter-iphone [1-4]\./.test(ua)) {
return false;
}
return true;
}else if (this._$platform==='AOS' ){
//test code for app developers
// return true;
//网易新闻
if (/newsapp/.test(ua)){
return true;
}
//网易云阅读 4.8.0 之后支持打开
var yuedu = ua.match(/pris\/[0-9\.]+/);
if (yuedu && yuedu.length>0){
var yueduLow = [4,8,0],
tmpList = yuedu[0].split('/'),
result;
if (tmpList && tmpList.length==2) {
var vList = tmpList[1].split('.');
if (vList && vList.length){
var yueduCurr = vList.map(function(el){
return parseInt(el, 10);
});
result = true;
for (var i = 0; i < yueduLow.length; i++) {
result = (yueduLow[i])<=(yueduCurr[i]||0) && result;
}
}else{
result = false;
}
}else{
result = false;
}
return result;
}
}
return false;
},
/**
* 为唤醒APP的操作增加CPS跟踪参数
* 参数描述见：http://jira.hz.netease.com/browse/KJ-10301
* @param  {String} url kaola开头的URL
* @return {String}     增加参数后的URL
*/
_$addCpsTrackData: function(url){
var unionID = _c._$cookie('unionID'),
mid = _c._$cookie('mid'),
euid = _c._$cookie('euid'),
cpsTrackingId = _c._$cookie('cpsTrackingId'),
trackTime = _c._$cookie('trackTime'),
trackData = {}, _url = url;
if (unionID) { trackData.unionID = unionID; }
if (mid) { trackData.mid = mid; }
if (euid) { trackData.euid = euid; }
if (cpsTrackingId) { trackData.cpsTrackingId = cpsTrackingId; }
if (trackTime) { trackData.trackTime = trackTime; }
if (Object.keys(trackData).length > 0) {
var str = encodeURIComponent( JSON.stringify(trackData) );
_url += ((_url.indexOf('?')>=0)?'&':'?') +('track_data='+str)
}
return _url;
},
/**
* 判断是否应该禁止app唤醒， 主要给市场推广用，返利网那边过来的用户
* 都不自动唤起app
* 后端会设置 showWapBanner cookie，值为 '0_0'  类似的值，第三位为'0'，表示不需要唤起
* @return {Boolean} true，表示需要禁止， false表示不禁止
*/
_$shouldForbidCallApp: function(){
var cpsck = _c._$cookie('showWapBanner');
if (cpsck && cpsck[2]==='0') {
return true;
}
return false;
},
/**
* 为分享商品增加CPS跟踪参数, 如果链接带有sharer 参数，则将其值传给app
* @param  {String} url kaola开头的URL
* @return {String}     增加参数后的URL
*/
_$addCPSShareParam: function(url){
var _url = url;
var urlparams = u._$query2object(location.search.slice(1));
if (urlparams && urlparams.sharer) {
var str = encodeURIComponent( urlparams.sharer );
_url += ((_url.indexOf('?')>=0)?'&':'?') +('sharer='+str)
}
return _url;
},
_$fixStaticSuffix: function(url){
var _url = url;
return _url.replace('.shtml', '.html');
},
_$openAppInNewsApp : function(openUrl, downLoadUrl, cb){
var openScheme;
if (_isIOS) {
openScheme = 'openapp://intent/' + openUrl;
}
window.__newsapp_openapp_done = function(){
//app opened
cb && cb(1);
};
window.__newsapp_openapp_failed = function(){
// alert(': open app failed' + downLoadUrl);
cb && cb(0);
if (downLoadUrl) {
location.href = downLoadUrl;
}
};
location.href = openScheme;
},
/**
* 获取页面中的浏览器指纹信息
*/
_$getFingerprint : function(){
return _c._$cookie('JSESSIONID-WKL-8IO');
},
/**
*唤醒App对应页面
* @param  {Object}
* @property {String} openUrl 具体页面，比如商品详情页： kaola://www.kaola.com/product/2342342.html
* @property {String} DownloadUrl 下载页面地址
* @property {String} action 操作类型：download（会尝试open，失败后再下载）, open（尝试open，失败后不下载），默认为download
* @property {Boolean} force 是否强制尝试打开APP，默认情况下会根据黑名单，白名单过滤，微信，易信等社交app中不会自动打开，如果设置为true，则忽略黑白名单
* @property {Function} callback open或者download动作的回调函数，回调函数有一个参数（Number）， app被唤醒则为1，否则为0
* 调用 app._$open({openUrl:'kaola://www.kaola.com/product/34324.html'}) 或 app._$open();
*/
_$open: function(_options) {
var _openUrl = _options.openUrl||this.schemaUrl,
_appUrl = _options.DownloadUrl||this.appUrl,
_action = _options.action||'download',
_force = !!_options.force,
_callback = _options.callback || null;
// 如果在新闻客户端钱包进入的h5，禁止唤起考拉app
if(window.sessionStorage.getItem('news_kaola_ActId') == '7190'){
return;
}
//如果从返利网过来的，页面打开时不自动唤醒
if ( _options.autocall && this._$shouldForbidCallApp() ) { return; }
//为ios客户端做首页打开兼容处理，ios首页只能用kaola://打开
if (_isIOS) {
if (!!_openUrl.toLowerCase().match(/^kaola\:\/\/(www|m)\.kaola\.com\/?$/)) {
_openUrl = 'kaola://';
}
}
//增加打开app时的cps跟踪参数
_openUrl = this._$addCpsTrackData(_openUrl);
//增加商品详情页分享cps参数
_openUrl = this._$addCPSShareParam(_openUrl);
//调整静态化后缀为.html 防止页面出错
_openUrl = this._$fixStaticSuffix(_openUrl);
if (!_isIOS && !_isAOS && _action=='download') {
Toast.show("抱歉，网易考拉海购暂不支持您的机型");
return;
}
/*app下载链接和打开链接初始化*/
if (!_isIOS && !_isAOS) {
_openUrl = this.appUrl;
_appUrl = this.appUrl;
}
/* 为_openUrl 增加指纹信息*/
var fg = this._$getFingerprint();
if (_openUrl && fg) {
fg=encodeURIComponent(fg);
if (_openUrl.indexOf('?')<0) {
_openUrl += '?fingerprint='+fg;
}else{
_openUrl = _openUrl.replace('?', '?fingerprint='+fg+'&');
}
}
/*非 PC WinPhone 唤醒App*/
if (_action=='download') {
if (_isNewsApp && _isIOS) {
this._$openAppInNewsApp(_openUrl, _appUrl, _callback);
return;
}
if (_isIOS || _isAOS ) {
if (_userAgent.match(/MicroMessenger/i)) {
this._$inWeiXin();
} else {
// 唤醒App
this.__openApp(_openUrl, _appUrl, _action, _callback);
}
} else {
// PC WinPhone 跳转
document.location = _appUrl;
}
}else{
if (_isNewsApp && _isIOS) {
this._$openAppInNewsApp(_openUrl, null, _callback);
return;
}
if (!this._$browserSupport() && !_force) {
_callback&&_callback(0);
return;
}
if (_isIOS || _isAOS ){
this.__openApp(_openUrl, _appUrl, _action, _callback);
}else{
_callback&&_callback(0);
}
}
}
};
return _$$App;
},25,2,43);
I$(90,function (_v,_e,_u,_x,_t){
var fragmentRE = /^\s*<(\w+|!)[^>]*>/,
// local vals
_slice = [].slice,
_doc = document,
_de = "documentElement",
_docElem = _doc[_de],
_testNode = _doc.createElement('div'),
// assert
_textHandle = _testNode.textContent == null? 'innerText' : 'textContent' ,
_extend = function(_name, _value, _options) {
_options = _options || {};
if (this[_name] == null || _options.override) this[_name] = _value;
return this;
},
_bubbleUp = function(_sl, _node, _container) {
while (_node && _node !== _container) {
if (nes.matches(_node, _sl)){
return _node;
}
_node = _node.parentNode;
}
},
/**
* 根据返回类型决定返回this，还是别的什么
* @param  {Mix} _result
* @param  {String} _methodName 当前方法名
* @return {Mix}
*/
_ischainableRet = function(_result, _methodName, _node){
return (_result === _node || _result === "undefined" || _result === this ||
_result === _e || _result === _v);// 这两个是为了兼容nej
},
_isAcceptedNode = function(_node){
if(!_node) return false;
var _type = _node.nodeType;
return _type === 1 || _type === 9 || //  element document
_type === 11|| _node.window === _node; // framement window
},
// 安全的添加原型, 本作用域内
_safeProtoExtend = function(Type){
var _proto = Type.prototype,
_list = {};
return {
extend:function(_name, _fn){
_list[_name] = _proto[_name];//先保存之前的
_proto[_name] = _fn;
return this;
},
reset: function(){
for(var _i in _list) if(_list.hasOwnProperty(_i)){
if(_list[_i] === undefined){
delete _proto[_i];
}else{
_proto[_i] = _list[_i];
}
}
}
};
},
_fn = _safeProtoExtend(Function);
// 安全扩展函数原型
// 1. autoSet, 自动转换set({name:value})为多重set(name, value)
_fn.extend("autoSet", function(){
var _fn = this;
return function(_key, _value) {
if (_u._$isObject(_key)){
var _args = _slice.call(arguments, 1);
for(var _i in _key){
_fn.apply(this, [_i, _key[_i]].concat(_args));
}
return this;
}else{
return _fn.apply(this, arguments);
}
};
// 2. splitProcess, 自动在首参数为数组时，拆分为多步，
}).extend("splitProcess", function(_isGetter){
var _fn = this;
return function(_params){
if(_u._$isArray(_params)){
var _args = _slice.call(arguments, 1),
_len = _params.length,
_ret;
if(_isGetter) _ret = {}; //当时getter函数需要返回值
for(var _i = 0 ; _i < _len ;_i++){
var _param = _params[_i],
_tmpRet = _fn.apply(this, [_param].concat(_args));
if(_isGetter && typeof _param === "string") _ret[_param] = _tmpRet;
}
return _isGetter? _ret : this;
}else{
return _fn.apply(this, arguments);
}
};
});
_extend = _extend.autoSet();
/**
*    将输入的选择器指定节点或节点和节点数组包装成_$$NodeList对象，NodeList是一个类似jQuery的对象
*    可以进行链式操作，拥有大部分nej.e下的接口，并扩展了一部分jQuery的常用方法。
*
*    一个脑残的例子告诉你链式调用可以做什么
*    ```javascript
*    // 获得某个节点集, 设置样式
*    $("#chainable li:nth-child(odd)")._$style({
*        "background": "#cca",
*        "cursor": "pointer"
*    })
*    // 然后抛弃他们 找他们的下一个位置条件满足是4倍数的兄弟节点并设置样式
*    ._$next(":nth-child(2n)")._$style({
*        "background": "#a19",
*        "cursor": "help"
*    })
*    // 过滤出其中是4倍数的行,并绑定事件
*    ._$filter(":nth-child(4n)")._$click(function(_e) {
*        $(this)._$style("background", "#111");
*    // 并给他们中的第一行设置边框
*    })._$get(1, true)._$style("border", "3px solid #222")
*    // 找到父节点div并且有chainable的id并且设置样式
*    ._$parent("div#chainable")._$style({
*        width: "800px",
*        left: "300px",
*        position:"absolute"
*    // 绑定事件以及代理事件
*    })._$on({
*        "click" :function(){
*            var div = document.createElement("div")
*            div.innerHTML = "haha插入一行"
*            //每次点击插入一行
*            $(this)._$insert(div, "bottom");
*        },
*        "mouseover li:nth-child(odd)":function(_e){
*            this._isLight = !this._isLight;
*            // 每次点击改变背景色
*            $(this)._$style("background-color", this._isLight? "#cca":"#331")
*        }
*    // 获得样式值
*    })._$style(["width", "left"])
*    // 到这里链式结束返回{"width":"80px", "left":"30px"}
*    ```
*
*    nej.$ 支持的选择器与nes选择器一致，具体请参考 https://github.com/leeluolee/nes
*
*    结构举例
*    ```html
*      <ul>
*          <li><a href=""></a></li>
*          <li><a href=""></a></li>
*          <li><a href=""></a></li>
*          <li><a href=""></a></li>
*      </ul>
*    ```
*
*    ```javascript
*      var $ = NEJ.P('nej.$');
*      $('ul > li:nth-child(2n+1) >a')
*       .addClassName('odd')
*       ._$on('click', _callback) //将所有的奇数li节点下的a标签加上className，并进行事件绑定
*    ```
*
*    $接受的参数与jQuery的一致 ，非常灵活
*    ```javascript
*    // 获得"body"节点， 很明显此时节点集只有一个元素
*    $("body")
*
*    // 找到有class1并且有rel属性的节点集，这时可能会有很多个节点
*    $("body li.class1[rel]")
*    // 会过滤出childNodes的节点，其他Array Like也是类似
*    $(document.body.childNodes)
*
*    // 有时候你不确定输入的是什么参数， 安全的再包一次吧，无副作用
*    $body = $("body")
*    $body2 = $($body2)
*    ```
*
*    @method CHAINABLE.$
*    @param  {String|Array|_$$NodeList|Node} _selector 可以是选择器、节点、节点数组或另一个_$$NodeList实例
*    @param  {String|Node|_$$NodeList} _context  代表从这个根节点下查找节点，特别是页面上节点还不存在时，需要传入这个参数
*    @return {_$$NodeList}           返回_$$NodeList实例
*/
var $ = function(_selector, _context){
// dump nej methods implement
$._$implement(_x._$dump(), {"statics": true});
_x._$clear();
if (typeof _selector === 'string' && _selector.trim().indexOf("<") == 0) {
var container = document.createElement('div');
container.innerHTML = _selector;
var res = $(container.childNodes);
return res;
}
return new _$$NodeList(_selector, _context);
};
function _$$NodeList(_selector, _context){
this.length = 0;
this._signs = {};//标示是否有了当前节点
this._context = _context || _doc;
if(!_selector) return ;
if(typeof _selector === "string"){
// if(/\^<[-\w]+/.test(_selector)) return $.fragment(_selector);
if(_context && _context instanceof _$$NodeList) _context = _context[0];
if(typeof _context == 'string') _context = $(_context)[0];
this._$add(_t._$all(_selector, _context));
}else if(_selector instanceof _$$NodeList || _isAcceptedNode(_selector) ||
_selector.length){ // _$$NodeList 或者 是单节点、或者是类数组(如childNodes)
this._$add(_selector);
}
}
// 扩展接口
$._$extend = _extend._$bind($);
$._$extend({
_$signal: "_uid",//会绑定在节点上的唯一标示
_$instances:{},// 缓存对象
_$handlers:[], // 保存原始handler方法
_$fragment: function(){
},
/**
* 扩展链式化接口，你可以通过两种方式，一是迁移已有的静态接口(比如NEJ的大部分接口都是这样迁移过来的)，而是直接进行_$$NodeList的原型扩展
*
* Example:
* ```javascript
* // 1. 直接扩展
* $._$implement("_$hello", function(){
*     // 遍历容器内的所有节点
*     this._$forEach(function(_node, _index){
*         _node.hello = "Hello World"
*     })
* })
* $("li:nth-child(2n)")._$hello() // 所有偶数行都被加上了 hello属性
* // 2. 直接利用静态方法进行扩展(常用语迁移), 上面扩展等价于
* $._$implement("_$hello", function(_node){
*    _node.hello = "Hello World"
* }, {static: true})
* // 3. 创建jQuey的wrap 方法
* // 创建wrap方法
* $._$implement("_$wrap", function(_selector){
*     var $content = $(_selector)
*     $content._$after2(this)._$insert(this);
* })
* $("#list")._$wrap(document.createElement("div"))
* ```
*
* 需要注意的是，当静态接口的迁移时，有如下约定(同时也是NEJ原接口在链式调用的表现约定)
*
* * 当返回值为: this 、 传入节点 、 nej.v 、 nej.e 、 undefined (即不返回)时, 视为setter操作,可以进行链式调用, 如上例:
* * 当返回值为其他类型时: 视为getter操作, 返回节点列表中 第一个元素 的返回值，这个也是jQuery的链式接口的表现
*
*
* @method CHAINABLE._$implement
* @param  {Object} _definition 要扩展的接口集合 (注意不要使用字符串作为键值)
* @param  {Object} _options 参数  目前只有两个选项{statics: 代表是否是静态接口迁移, override: 是否覆盖原同名方法}
* @return {this}
*/
_$implement: function(_name, _fn, _options){
_options = _options || {};
_extend.call(_$$NodeList.prototype, _name, _options.statics? this._transport(_fn): _fn);
}.autoSet(),
_transport: function(_fn){
return function(){
// if(!this.length) throw Error("内部节点集为空")
var _args = _slice.call(arguments);
_args.unshift(this[0]);
var _ret = _fn.apply(this,_args);
// 当返回_e、_v、this、_node、undefined(无返回值)都视为链式
if(!_ischainableRet.call(this, _ret)) return _ret;
this._$forEach(function(_node, _index){
if(_index === 0) return;
_args[0] = _node;
_fn.apply(this ,_args);
});
return this;
};
},
_merge: function(_list1, _list2 , _filter){
var _i = _list1.length || 0,
_j = 0;
for( ;_list2[_j] !== undefined;){
var _tmp = _list2[_j++];
if(!_filter || _filter.call(_list1, _tmp)){
_list1[_i++] = _tmp;
}
}
_list1.length = _i;
return _list1;
},
_toArray: function(_list){
return $._merge([], _list);
},
// ** fork form jQuery **
_contains: _docElem.contains ? function( _a, _b ) {
return _a === _b || (_a.nodeType == 9? _a[_de]: _a).contains(_b);
}: _docElem.compareDocumentPosition ?
function( _a, _b ) {
// more info : https://gist.github.com/4601579
return _b && !!( _a.compareDocumentPosition( _b ) & 16 );
}: function( _a, _b ) {
// fallback
while ( (_b = _b.parentNode) ) {
if ( _b === _a ) return true;
}
return false;
},
_$cloneNode:function(_node, _withContent){
_withContent = !!_withContent;
var _clone = _node.cloneNode(_withContent),
_ce, _be;
if(_withContent){
_be = nes.all("*", _node);
_be.push(_node);
_ce = nes.all("*", _clone);
_ce.push(_clone);
}else{
_be = [_node];
_ce = [_clone];
}
for (_i = _ce.length; _i--;){
_definitions.fixture.clone(_ce[_i], _be[_i]);
}
return _clone;
},
_delegateHandlers : {},// for delegate
_cleanSelector : nes._cleanSelector,
_$uniqueSort : nes._uniqueSort,
_$matches : nes.matches,
_$fn: _$$NodeList.prototype,
_$uid : nes._getUid
});
// proto function 扩展
// ================================
var _rclickEvents = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/,
_rkeyEvents = /^key(?:)/,
_definitions ={
// for insert
// 这里统一视为_node2为插入点
"insertor":{
"top":function(_node, _node2){
_node.insertBefore(_node2, _node.firstChild);
},
"bottom": function(_node, _node2){
_node.appendChild(_node2);
},
"before":function(_node, _node2){
var _parent = _node.parentNode;
if(_parent) _parent.insertBefore(_node2, _node);
},
"after":function(_node, _node2){
var _parent = _node.parentNode;
if(_parent) _parent.insertBefore(_node2, _node.nextSibling);
}
},
fixProps :{
// 确保表单元素属性被正确设置 IE lt9
input: 'checked',
option: 'selected',
textarea: 'value',
// clone时 , IE某些版本不会正确设置text
script:"text"
},
fixture:{
// dest src attribute fixed
"clone": function(_dest, _src){
var _nodeName, _attr;
if (_dest.nodeType !== 1) {
return;
}
// lt ie9 才有
if (_dest.clearAttributes) {
_dest.clearAttributes();
_dest.mergeAttributes(_src);
}
// 判断是否有需要处理属性的节点
_nodeName = _dest.nodeName.toLowerCase();
if(_prop = _definitions.fixProps[_nodeName]){
_dest[_prop] = _src[_prop];
}
//移除节点标示
_dest.removeAttribute($._$signal);
// 移除ID:  TODO? 是否允许有重复ID?
_dest.removeAttribute("id");
},
//patch event
"event":function(_e){
var _type = _e.type;
var _button = _e.button;
_e.__fixed = true; //标示被fix过
_e.target = _e.target || _e.srcElement || document; //for ie
_e.metaKey = !!_e.metaKey; //低版本ie会返回undefined 应该返回
if(_e.target.nodeType === 3) _e.target = _e.target.parentNode;
if(_rclickEvents.test(_type)){ //如果是鼠标事件 则初始化page相关
_e.pageX = _v._$pageX(_e);
_e.pageY = _v._$pageY(_e);
if (_type === 'mouseover' || _type === 'mouseout'){//如果是鼠标事件中的mouseover与mouseout
var related = _e.relatedTarget || _e[(_type == 'mouseover' ? 'from' : 'to') + 'Element'];
while (related && related.nodeType == 3) related = related.parentNode;
_e.relatedTarget = related;
}
}
_e.which = _e.charCode != null ? _e.charCode : _e.keyCode;
if( !_e.which && _button !== undefined){
// http://api.jquery.com/event.which/ use which
_e.which = ( _button & 1 ? 1 : ( _button & 2 ? 3 : ( _button & 4 ? 2 : 0 ) ) );
}
if(!_e.preventDefault) _e.preventDefault = function(){
this.returnValue = false;
return this;
};
if(!_e.stopPropagation) _e.stopPropagation = function(){
this.cancelBubble = true;
return this;
};
}
}
},
// for traverse
_traverse = function(_direct){
var _$matches = $._$matches;
return function(_selector, _all){
var _ret = $([]);
if(typeof _selector === "boolean"){
_all = _selector;
_selector = null;
}
this._$forEach(function(_node){
var _tmp = _node[_direct];
while (_tmp) {
if(_tmp.nodeType ===1 && (!_selector || _$matches(_tmp, _selector))){
_ret._$add(_tmp);
if(!_all) break;
}
_tmp = _tmp[_direct];
}
});
return _ret;
};
};
$._$implement({
/**
* 获取节点样式或者设置节点样式, 这个接口的表现与jQuery的css方法一致, 根据参数不同有不同的表现
* 比如:
* ```javascript
* $('li')._$style(name) //相当于_$getStyle 返回样式值
* $('li')._$style([name1,name2...]) //相当于多重_$getStyle 返回一个Object(如{"height:20px, width:30px..."})
* $('li')._$style(name, value) // 相当于setStyle 返回this
* $('li')._$style(obj) //相当于多重版setStyle(即原_$style) 返回this
* ```
* @method CHAINABLE._$style
* @param  {String|Object|Array} _key  可以是String(单取值或设置)，一个对象(多重赋值)，一个数组(多重取值)
* @param  {String} _value 样式值
* @return {_$$Nodelist|String|Object} setter操作返回_$$NodeList，单重取值返回String，多重取值返回样式属性为键的Object，表现与jQuery的css接口一致
*/
_$style: function(_key, _value){
if(!_key) throw Error("缺少css样式名");
if(_value === undefined){
return _e._$getStyle(this[0], _key);
}
return this._$forEach(function(_node){
_e._$setStyle(_node, _key, _value);
});
}.splitProcess(true).autoSet(),
/**
* 获取节点属性或者设置节点属性, 这个接口的表现与jQuery的attr一致, 同_$style接口，根据参数不同有不同的表现
* 比如:
* ```javascript
* $('li')._$attr(name): 相当于_$attr 返回属性值
* $('li')._$attr([name1, name2]) 同style描述 返回{titile:"xxx",rel:"xxx", href:"xxx"}
* $('li')._$attr(name, value): 相当于_$attr 返回this
* $('li')._$attr(obj): 相当于多重版的_$attr 返回this
* ```
*
* @method CHAINABLE._$attr
* @param  {String|Object|Array} _key  可以是String(单取值或设置)，一个对象(多重赋值)，一个数组(多重取值)
* @param  {String} _value 属性值
* @return {_$$Nodelist|String|Object} setter操作返回_$$NodeList，单重取值返回String，多重取值返回样式属性为键的Object，表现与jQuery的css接口一致
*/
_$attr: function(_key, _value){
if(!_key) throw Error("缺少属性名");
if(_value === undefined){
return _e._$attr(this[0], _key);
}
return this._$forEach(function(_node){
_e._$attr(_node, _key, _value);
});
}.splitProcess(true).autoSet(),
/**
* 类似于ES5的Array#forEach, 一个遍历函数, 即遍历_$$NodeList的所有节点集
* 比如:
* ```javascript
* // 将1,4,7...class含有strong的li元素分别加上阶梯型的高度
* $("li.strong:nth-child(3n+1)")._$forEach(function(_node, _index){
*     _node.style.height = "" + (_index+1)*10 + "px";
*     // 这里的this指向实例
* })
* ```
* 注意callback中传入的节点是裸节点，而不是包装后的_$$NodeList
*
* @method CHAINABLE._$forEach
* @param  {Function} _fn 遍历回掉，接受两个参数，当前遍历到的节点和节点下标
* @return {_$$NodeList}
*/
_$forEach: function(_fn){
_u._$forEach(this, _fn);
return this;
},
/**
* 类似于ES5的Array#filter, 一个过滤, 即过滤_$$NodeList的所有节点集并筛选符合的节点
* 比如:
* ```javascript
* // 返回节点集中的匹配选择器.strong:nth-child(3n)的节点
* $("li")._$filter(".strong:nth-child(3n)")
* // 相当于  ===>
* $("li")._$filter(function(_node){
*     return $(_node)._$matches(".strong:nth-child(3n)");
* });
* ```
* 注意callback中传入的节点是裸节点，而不是包装后的_$$NodeList
*
* @method CHAINABLE._$filter
* @param  {Function|String} _fn 遍历函数，接受两个参数，当前遍历到的节点和节点下标。同时也接受一个Selector，筛选出节点集中满足选择器的节点
* @return {_$$NodeList}
*/
_$filter: function(_fn){
var _ret = [],
_isSelctor = typeof _fn === "string";
this._$forEach(function(_node, _index){
var _test = _isSelctor ? $._$matches(_node, _fn):_fn.call(this, _node, _index);
if(_test) _ret.push(_node);
});
return $(_ret);
},
/**
* 相当于ES5的Array#map, 当返回值全部是节点类型时，返回$NodeListchainable, 否则返回标准结果数组(此时chainable不能)
*
* example:
* ```javascript
* // 此时返回Array : ["li", "li", "li".........]
* $("li")._$map(function(_node){
*     return _node.tagName.toLowerCase()
* });
* // 此时返回 $NodeList: 即所有节点的下一个兄弟节点
* $("li")._$map(function(_node){
*     return _node.nextSibling
* });
* ```
* 注意callback中传入的节点是裸节点，而不是包装后的_$$NodeList
*
* @method CHAINABLE._$map
* @param  {Function} _fn 遍历callback，接受两个参数，当前遍历到的节点和节点下标
* @return {_$$NodeList}
*/
_$map:function(_fn){
var _ret = [],
_isNotAllNode = false;
this._$forEach(function(_node, _index){
var _res = _fn.call(this, _node, _index);
if(!_isAcceptedNode(_res)) _isNotAllNode = true;
_ret.push(_res);
});
return _isNotAllNode ? _ret : $([])._$add(_ret);
},
/**
* NodeList中的节点是不保证按文档顺序的(如果是用选择器，则保证是有序的), 你可以手动排序
*
* @method CHAINABLE._$sort
* @return {_$$NodeList}
*/
_$sort:function(){
var _array = this._$get();
$._$uniqueSort(_array);
return $(_array);
},
/**
* 向内部节点集填入元素, 会处理好重复以及过滤的逻辑。这个也是$接口依赖的方法。
* ```javascript
* var $body = $("body")
* $body._$add($("tbody")) //==> 添加tbody
* $body._$add($("tbody")) //==> 什么都不会发生 因为重复了
* $body._$add(document.body.childNodes) //==> 添加所有的body下的子节点,过滤掉不符合的
* ```
*
* @method CHAINABLE._$add
* @param  {Node|Array|_$$NodeList} _node 要添加的节点或节点集
* @return {_$$NodeList}      返回this
*/
_$add:function(_node){
if(!_node) return;
// TODO: 把window 排除在外
if(_node.tagName || typeof _node.length !== "number" || _node === window ) _node = [_node];
$._merge(this, _node, function(_nodum){
if(!_isAcceptedNode(_nodum)) return false;
var _uid = $._$uid(_nodum);
if(this._signs[_uid]){
return false;
}else{
this._signs[_uid] = 1;
return true;
}
});
return this;
},
_$get:function(_index, wrap){
if(typeof _index !== "number") return $._toArray(this);
return wrap ? $(this[_index]) : this[_index];
},
_$last: function(wrap){
return wrap? $(this[this.length-1]) : this[this.length-1];
},
_$first: function(wrap){
return wrap? $(this[0]) : this[0];
},
/**
* 判断包装节点是否满足某个选择器，即Selector API的matches方法。如果节点集内不止一个节点，则只判断第一个节点
* Exmaple:
* ```javascript
*  $("body tbody td:nth-child(4n)")._$matches("body tbody td:nth-child(2n)")
*  //返回 true... 这个是当然的, 4倍数的节点当然满足偶数条件
* ```
*
*
* @method CHAINABLE._$matches
* @param  {String} _selector 供测试的选择器
* @return {Boolean}          是否通过测试
*/
_$matches: function(_selector){
return $._$matches(this[0],_selector);
},
/**
* 查找 所有节点 的第一个(或所有)满足关系的 父节点 集, 并返回$NodeList
*
* Example:
* ```javascript
* $("tr")._$parent()
* //=> ['tbody', 'thead'],两个是因为节点集中的tr元素可能在tbody或thead中
* $("tr")._$parent("tbody")
* //=> ['tbody'] 必须满足tbody
* $("tr")._$parent(true)
* // =>['tbody', 'thead', 'div', 'body' ....] //会向上查找所有父节点
* $("tr")._$parent("tbody, body",true)
* // =>['body', 'tbody'] //会向上查找所有父节点,但是必须满足选择器
* ```
* @method CHAINABLE._$parent
* @param  {String} _selector 选择器
* @param  {Boolean} _all     是否获取所有层级的父节点
* @return {[type]}
* @type {[type]}
*/
_$parent: _traverse("parentNode"),
/**
* 与_$parent类似,查找 所有��点 的第一个(或所有根据_all参数)满足关系的 前序兄弟节点 (previousSibling)集, 并返回$NodeList
* ```javascript
* $("td")._$prev("th[scope=row]", true)
* // 返回所有在td之前的th元素, 它们的scope属性为 row
* $("td")._$prev("th[scope=row]")
* // 只返回直接相邻的前节点，如果不满足选择器则返回空节点集
* ```
* @method CHAINABLE._$prev
* @param  {String} _selector 选择器
* @param  {Boolean} _all     是否获取所有前序节点
* @return {[type]}
*/
_$prev: _traverse("previousSibling"),
/**
* 与_$prev类似,查找 所有节点 的第一个(或所有根据_all参数)满足关系的 向后兄弟节点 (nextSibling)集, 并返回$NodeList
* @method CHAINABLE._$next
* @param  {String} _selector 选择器
* @param  {Boolean} _all     是否获取所有后序节点
* @return {[type]}
*/
_$next: _traverse("nextSibling"),
/**
* 查找到 本节点集中 所有节点 的满足选择器关系的 直接子节点 (或 任意层级子节点 )集, 并返回$NodeList
* ```javascript
* $("body, table")._$children();
* // => 相当于 合并body与table的直接子节点
* $("body, table")._$children("div, thead");
* // => 只要他们子节点中的div 与 thead元素
* $("body, table")._$children(true);
* // => 这里会获取所有body下的所有层级的子节点(table也在body中)
* $("body, table")._$children("td:not(:last-child, :nth-child(2n))",true);
* // => 返回所有层级的td元素并且满足选择器 td:not(:last-child, :nth-child(2n))
* ```
*
* @method CHAINABLE._$children
* @param  {String} _selector 选择器
* @param  {Boolean} _all     是否获取所有层级的节点
* @return {[type]}
*/
_$children: function(_selector, _all){
var _ret = $([]);
if(typeof _selector === "boolean"){
_all = _selector;
_selector = null;
}
this._$forEach(function(_node){
var _backed = _all? _t._$all(_selector || "*", _node)
: _selector? $(_node.childNodes)._$filter(_selector)
: $(_node.childNodes);
_ret._$add(_backed);
});
return _ret;
},
/**
* 满足选择器条件的同级节点，但不包含本身
* Example
* ```javascript
* $("script")._$siblings("title,h2"); // => 返回script的同级节点中的
* ```
*
*
* @method CHAINABLE._$siblings
* @param  {String} _selector
* @return {_$$NodeList}    这些同级节点会被包装为一个_$$NodeList
*/
_$siblings: function(_selector){ // sibling 默认就是取所有
return this._$prev(_selector, true)._$add(this._$next(_selector, true));
},
/**
* 这个insert 拥有jQuery的四个接口的功能(before, after, prepend , append) ，分别用_direct参数控制
*
* Example:
* ```javascript
* //将`a.next`插到`#home`的内部的最上方
* $('#home')._$insert('a.next', 'up');
* //将a.next插入到`#home`节点后面
* $('#home')._$insert('a.next', 'after');
* ```
*
* @method CHAINABLE._$insert
* @param  {String|Node|_$$NodeList} _selector 代表被插入的节点，可以是选择器、节点或是另外一个_$$NodeList对象
* @param  {String} _direct   插入位置，可以是节点内的底部、顶部(bottom, top)，或节点同层的前后位置(before, after)，默认为bottom
* @return {_$$NodeList}    返回this
*/
_$insert: function(_selector, _direct){
_direct = (_direct && _direct.toLowerCase()) || "bottom";
if(!_definitions.insertor[_direct]) _direct = "bottom";
var _content = $(_selector)[0], //将被插入的节点
_insertor = _definitions.insertor[_direct];
if(!_content) throw Error("The Element to be inserted is not exist");
return this._$forEach(function(_node, _index){
_insertor(_node, _index === 0? _content
: $._$cloneNode(_content, true));//如果是多个节点则cloneNode
});
},
/**
* 这个_$insert2 拥有jQuery的四个接口的功能(insertBefore, insertAfter, prependTo , appendTo) ，分别用_direct参数控制。其实就是_$insert接口的相反版，
* 你做的是将被插入节点插入到某个节点的指定位置。
*
* Example:
* ```javascript
* //将`#home`插到`a.next`的内部的最上方
* $('#home')._$insert2('a.next', 'up');
* //将`#home`插入到`a.next`节点后面
* $('#home')._$insert2('a.next', 'after');
* ```
*
* @method CHAINABLE._$insert2
* @param  {String|Node|_$$NodeList} _selector 代表参考节点，可以是选择器、节点或是另外一个_$$NodeList对象
* @param  {String} _direct   插入位置，可以是节点内的底部、顶部(bottom, top)，或节点同层的前后位置(before, after)，默认为bottom
* @return {_$$NodeList}    返回this
*/
_$insert2: function(_selector, _direct){
$(_selector)._$insert(this, _direct);
return this;
},
/**
* 克隆节点集内部的 所有节点, 并返回clone的目标节点集 $NodeList 实例
*
* Example:
* ```javascript
* $('.m-template')._$clone(true)._$insert2('body');//将`.m-template`节点clone一份插入到`body`的内部下方
* ```
*
* @method CHAINABLE._$clone
* @param  {Boolean} _withContent 是否要克隆子节点
* @return {_$$NodeList}
*/
_$clone: function(_withContent){
return this._$map(function(_node){
return $._$cloneNode(_node, _withContent);
});
},
/**
* 获得节点集中的 第一个元素的innerText 或者 设置所有元素的innerText
*
* Example:
* ```javascript
* $("title,h2")._$text("haha")
* // 同时设置title与h2的text内容为haha
* $("title,h2")._$text()
* // 获得title(第一个元素)的innerText
* ```
*
*
* @method CHAINABLE._$text
* @param  {content} _content 要插入的内容 , 不传入则认为是getter操作
* @return {_$$NodeList|String} setter操作返回_$$NodeList getter操作返回String
*/
_$text: function(_content){
if(_content === undefined){
if(!this[0]) throw Error("内部节点为空，无法完成get操作");
return this[0][_textHandle];
}
return this._$forEach(function(_node){
_node[_textHandle] = _content;
});
},
/**
* 获得节点集中的 第一个元素的innerHTML 或者设置所有元素的innerHTML(与_$text接口类似)
*
* Example:
* ```javascript
* $("title,h2")._$html("haha")
* // 同时设置title与h2的innerHTML为haha
* $("title,h2")._$html()
* // 获得title(第一个元素)的innerHTML
* ```
*
*
* @method CHAINABLE._$html
* @param  {content} _content 要插入的内容 不传入则认为是getter操作
* @return {_$$NodeList|String} setter操作返回_$$NodeList getter操作返回String
*/
_$html: function(_content){
if(_content === undefined){
if(!this[0]) throw Error("内部节点为空，无法完成get操作");
return this[0].innerHTML;
}
return this._$forEach(function(_node){
_node.innerHTML = _content;
});
return this;
},
/**
* 获得节点集中的 第一个元素的value 或者设置所有元素的value(与_$text接口类似)
*
* Example:
* ```javascript
* $("input,textarea")._$val()
* // 获取第一个满足'input,textarea'选择器元素的value值
* $("title,h2")._$html("haha")
* // 获得title(第一个元素)的innerHTML
* ```
*
*
* @method CHAINABLE._$html
* @param  {content} _content 要插入的内容
* @return {_$$NodeList|String} setter操作返回_$$NodeList getter操作返回String
*/
_$val:function(_content){
if(_content === undefined){
if(!this[0]) throw Error("内部节点为空，无法完成get操作");
return this[0].value;
}
return this._$forEach(function(_node){
_node.value = _content;
});
return this;
},
// 事件相关
// ==============
// 私有方法  注册事件代理
_delegate:function(_event, _selector, _handler){
_selector = $._cleanSelector(_selector);
return this._$forEach(function(_node){
var _uid = $._$uid(_node),
_handlers = $._delegateHandlers[_uid] || ($._delegateHandlers[_uid] = {}),
_events = _handlers[_event] || (_handlers[_event] = {}),
_selectors = _events[_selector] || (_events[_selector] = []);
var _realCb = function(_e) {//正式回调
var _trigger;
if (_trigger = _bubbleUp(_selector, _e.target || _e.srcElement , _node)) {
_handler.apply(_trigger, arguments);
}
};
// 保存引用 以可以正确off
_realCb._raw = _handler;
_selectors.push(_realCb);
// 假如不存在对应的容器，则先创建
_v._$addEvent(_node, _event, _realCb);
// Fix: 我们保存原始_handler为了 nej的 delEvent可以正确解绑
// 省去再存储一份handler列表的开销
});
},
// 私有方法 解绑事件代理
_undelegate:function(_event, _selector, _handler){
_selector = $._cleanSelector(_selector);
return this._$forEach(function(_node){
var _uid = $._$uid(_node);
var _handlers, _events, _selectors;
if (!(_handlers = $._delegateHandlers[_uid]) ||
!(_events = _handlers[_event]) || !(_selectors = _events[_selector])){
return;
}
for(var _len = _selectors.length;_len--;){
var _fn = _selectors[_len];
//如果没有传入_handler或者 函数匹配了
if(!_handler || _fn._raw === _handler){
_v._$delEvent(_node, _event, _fn);
_selectors.splice(_len,1);
}
}
// 如果被删光了
if(!_selectors.length) delete _events[_selector];
});
return this;
},
/**
* 绑定事件，可以使用事件代理, 与jQuery的on类似
*
* __Example:__
* ```javascript
* // 1. 普通事件绑定
* $("body")._$on("click", function(_e){
*     alert("单个事件绑定"+_e.type)
* })
* // 2. 多个普通类型绑定到同一个handler
* $("body")._$on(["click", "mouseover"], function(_e){
*     alert("多个type绑定"+_e.type)
* })
* // 3. 单个代理事件绑定 这里等同于_$on("click", "tr:nth-child(2n)", handler)
* $("body")._$on("click tr:nth-child(2n)", function(_e){
*     // this 对象指向当前`触发`事件的tr:nth-child(2n)
*     _e.preventDefault()
*     alert("单个代理事件绑定"+_e.type)
* })
* // 4. 多个事件绑定(同回调), 这里分别是普通事件dblclick与代理事件click tr:nth-child(2n)
* $("body")._$on(["dblclick", "click tr:nth-child(2n)"], function(_e){
*     _e.preventDefault()
*     alert("多个事件类型绑定"+_e.type)
* })
* // 5. 多重事件绑定,
* $("body")._$on({
*     "dblclick":function(_e){
*         alert("多重事件绑定之普通版"+_e.type)
*     },
*     "click tr:nth-child(2n)":function(_e){
*         alert("多重事件绑定之代理版"+_e.type)
*     }
* })
* ```
*
* @method CHAINABLE._$on
* @param  {String|Array|Object} _event     事件名，_event支持多种参数类型会有不同的结果
*                             如果_event参数中不包含空格, 则视为简单事件绑定如，click,
*                             如果_event参数中包含空格,则会被split, 左边视为event参数，右边视为_selector参数如'click .next',
*                             如果_event是个Ojbect,则会视为多重绑定,如{'click .next': callback1, 'mouseover': callback2}
*                             如果_event是个Array, 则会对多个_event进行同一个函数的绑定, 如['click','mouseover']
* @param  {String} _selector  如果传入则代表是一个事件代理,可忽略
* @param  {Function} _handler 回掉函数
* @return {_$$NodeList}
*/
_$on:function(_event, _selector, _handler){
if(_event === undefined) throw Error("缺少事件名参数");
if(typeof _selector === "function"){
_handler = _selector;
_selector = null;
};
var _index = _event.indexOf(" ");
if(~_index){//有空格分隔 如"click div.m-model"
_selector = _event.slice(_index + 1);
_event = _event.slice(0, _index);
}
if(!_handler) throw Error("缺少回调函数");
// 创建一个realHandler
else {
var _raw = _handler;
var _handler = function(_e){
_definitions.fixture.event(_e);
_raw.apply(this, arguments);
};
_raw.real = _handler;//
}
if(_selector){ // on ("click", "li.clas1", handler)或 on("click", "li.class1")
return this._delegate(_event,_selector, _handler);
}
// on("click", handler)
return this._$forEach(function(_node){
_v._$addEvent(_node, _event, _handler);
});
}.splitProcess().autoSet(),
/**
* 为 节点集内的每一个节点 解除事件回调, 类似jQuery的off方法
* __Example__
* ```javascript
* // 1. 普通事件解绑
* $("body")._$off("click", handler)
* // 2. 多个普通类型事件解绑(同一个handler)
* $("body")._$off(["click", "mouseover"], handler)
* // 3. 普通事件清除(即不传入handler) __同时会把节点上click类型的代理事件清除!__
* $("body")._$off("click")
* // 4. 多个普通事件清除 同时会把节点上相应类型的代理事件清除!
* $("body")._$off(["click","mouseover"])
* // 5. 单个代理事件的解绑
* $("body")._$off("click","tr:nth-child(2n)", handler)
* // 或
* $("body")._$off("click tr:nth-child(2n)", handler)
* // 6. 多个代理事件的解绑(同一个handler)
* $("body")._$off(["dblclick td[title]", "click tr:nth-child(2n)"], handler)
* // 7. 代理事件的清除
* $("body")._$off("dblclick","td[title]");
* $("body")._$off("dblclick td[title]");
* $("body")._$off(["dblclick td[title]", "click tr:nth-child(2n)"])
* // 8. 多重事件解绑
* $("body")._$off({
*     "dblclick td":handler1,
*     "click tr":handler2
* });
* // 9. 所有事件清除
* $("body")._$off() //慎重
* ```
*
*
* @method CHAINABLE._$off
* @param  {String|Array|Object} _event 与_$on方法一样，解绑也会根据参数不同可以有很大的灵活度
*                                      如果_event参数中不包含空格, 则视为简单事件解绑如，click,
*                                      如果_event参数中包含空格,则会被split, 左边视为event参数，右边视为_selector参数如'click .next',
*                                      如果_event是个Ojbect,则会视为多重解绑, 如{'click .next': callback1, 'mouseover': callback2}
*                                      如果_event是个Array, 则会对多个_event进行同一个函数的解绑, 如['click','mouseover']
*                                      需要注意_$off与_$on不同的是_event也可以是个空值，代表会解决节点下的所有事件
* @param  {[type]} _selector [description] 如果传入_selector参数，则会进行事件代理的事件解绑, 可忽略
* @param  {[type]} _handler  [description] 要解绑对应回调，可忽略
* @return {_$$NodeList}
*/
_$off:function(_event, _selector, _handler){
if(typeof _selector === "function"){
_handler = _selector;
_selector = null;
}
var _index;
if(_event && ~(_index = _event.indexOf(" "))){//有空格分隔 如"click hello"
_selector = _event.slice(_index + 1);
_event = _event.slice(0, _index);
}
if(_handler) _handler = _handler.real || _handler;
if(_selector){ // off("click", ".class")   off("click", ".class", handler)
return this._undelegate(_event, _selector, _handler);
}
return this._$forEach(function(_node){
var _uid = $._$uid(_node),
_handlers = $._delegateHandlers[_uid],
_events;
if(!_event){ // off()
if(_handlers){
delete $._delegateHandlers[_uid]; // 删除所有
}
_v._$clearEvent(_node, _event);
}else{
if(_handlers) _events = _handlers[_event];
if(!_handler){ // off("click")
if(_events){
delete _handlers[_event];
}
_v._$clearEvent(_node, _event);
}else{ // off("click", handler)
// 这里不对delegate做清理是因为 这样不会对delegate发生影响
_v._$delEvent(_node, _event, _handler);
}
}
});
}.splitProcess().autoSet(),
/**
* 触发每个节点的对应事件, 同nej.v._$dispatchEvent，区别是参数类型自由度高一点
*                                      如果_event参数为String, 则视为简单事件触发如，click,
*                                      如果_event是个Ojbect,则会视为多重触发, 如{'click': param1, 'mouseover': param2}
*                                      如果_event是个Array, 则会对多个_event进行触发(公用一个options), 如['click','mouseover']
* Example:
* ```javascript
* //触发一个事件
* _$trigger("click", params)
* //一次触发多个事件(如果有参数，他们共用这个参数)
* _$trigger(["click", "mouseover"], params)
* // 触发多个事件有不同参数
* _$trigger({
*     "click": params1,
*     "dblclick": params2
* })
* ```
*
* @method CHAINABLE._$trigger
* @param  {String|Array|Object} _event   可以传入多种参数类型
* @param  {Whatever} _options 同_$dispatchEvent的_options
* @return {_$$NodeList}
*/
_$trigger:function(_event, _options){
if(typeof _event !== 'string') throw Error("事件类型参数错误");
this._$forEach(function(_node){
_v._$dispatchEvent(_node, _event, _options);
});
return this;
}.splitProcess().autoSet(),
// http://stackoverflow.com/questions/6599071/array-like-objects-in-javascript
// 让这个对象看起来像数组
splice: function(){ throw Error("don't use the NodeList#splice");}
});
// @ remove 无法被混淆的方法
// // 无奈 添加 _$before // _$before2   _$bottom _$bottom2等方法
// _u._$forIn(_definitions.insertor, function(_value, _key){
//     $._$implement("_$" + _key, function(){
//        var _args = _slice.call(arguments);
//        _args.push(_key)
//        return this._$insert.apply(this, _args)
//     })
//     $._$implement("_$" + _key+"2", function(){
//        var _args = _slice.call(arguments);
//        _args.push(_key)
//        return this._$insert2.apply(this, _args)
//     })
// })
// // 添加类似 _$click的事件
// // ================================
// // TODO: 检查是否有遗漏的方法
//    @
// var _beAttached = "click dbclick blur change focus focusin focusout keydown keypress keyup mousedown mouseover mouseup mousemove mouseout scroll select submit".split(" ");
// @ remove 无法被混淆 移除
// _u._$forEach(_beAttached, function(_eventName){
//     $._$implement("_$"+_eventName, function(){
//         var _type = typeof arguments[0];
//         var _args = _slice.call(arguments);
//         _args.unshift(_eventName);
//         // click("li", handler)   或者  click(handler)
//         if((_type == "function") || (_type === "string" && typeof arguments[1] === "function")){
//             this._$on.apply(this, _args);
//         }else{
//         // click(options) 或者 click()
//             this._$trigger.apply(this, _args);
//         }
//         return this;
//     }.autoSet())
// });
// 把原型还回去, WARN:千万注意
_fn.reset();
if (CMPT){
nej.$ = $;
}
return $;
},3,4,2,11,22);
I$(87,function (_l){
return _l;
},90);
I$(95,function (_v,_e,_p,_o,_f,_r){
/**
* 节点focus行为
* @param  {String|Node} 节点
* @param  {Number}      模式
* @param  {String}      样式
* @return {Void}
*/
_p.__focusElement = (function(){
// do blur check
var _onBlur = function(_clazz,_event){
var _element = _v._$getElement(_event);
if (!_element.value)
_e._$delClassName(_element,_clazz);
};
// do focus
var _onFocus = function(_clazz,_event){
_e._$addClassName(
_v._$getElement(_event),_clazz);
};
return function(_element,_mode,_clazz){
if (_mode==1){
_v._$addEvent(
_element,'blur',
_onBlur._$bind(null,_clazz)
);
}
if (_mode==1||_mode==-1){
_v._$addEvent(
_element,'focus',
_onFocus._$bind(null,_clazz)
);
}
// other do nothing, use css :focus
};
})();
return _p;
},3,4);
I$(94,function(_h,_v,_e,_p_,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[3])._$KERNEL;if (_k_.engine=='trident'&&_k_.release<='3.0'){(function (){
/**
* 节点focus行为
* @param  {String|Node} 节点
* @param  {Number}      模式
* @param  {String}      样式
* @return {Void}
*/
_h.__focusElement = (function(){
// remove classname onblur
var _onBlur = function(_clazz,_event){
_e._$delClassName(
_v._$getElement(_event),_clazz
);
};
return _h.__focusElement._$aop(
function(_event){
// patch ie6-7 :focus
var _args = _event.args;
if (_args[1]!=1){
_v._$addEvent(
_args[0],'blur',
_onBlur._$bind(null,_args[2])
);
_args[1] = -1;
}
}
);
})();
})();};return _h;
},95,3,4,10);
I$(91,function (NEJ,_u,_e,_h,_x,_p,_o,_f,_r){
/**
* 节点focus行为，提供两种模式支持
*
* * 0 - 聚焦添加效果，失焦去除效果，高版本使用:focus样式处理
* * 1 - 聚焦添加效果，失焦时只有在当前输入框没有内容时去除效果
*
* 样式举例
* ```css
*   input:focus,input.js-focus{border:1px solid #f00;}
*   input{color:#aaa;background:#eee;}
*   .js-focus-0{color:#000;background-color:#fff;}
* ```
*
* 结构举例
* ```html
*   <form>
*     <!-- 可以使用data-focus指定聚焦时样式名称 -->
*     <!-- 可以使用data-mode指定聚焦模式 -->
*     <!-- 通过data-focus/data-mode指定的参数优先级高于接口调用时输入参数 -->
*     <input id="xxx" type="text" data-focus="js-focus-0" data-mode="1"/>
*     <!-- 节点没有指定参数 -->
*     <input id="yyy" type="text"/>
*   </form>
* ```
*
* 脚本举例
* ```javascript
*   NEJ.define([
*       'util/focus/focus'
*   ],function(_e){
*       // 参数已在节点data-属性中指定
*       _e._$focus('xxx');
*
*       // 参数没有指定，通过输入传递，仅指定样式名称
*       _e._$focus('yyy','js-focus-1');
*
*       // 参数没有指定，通过输入传递，仅指定聚焦模式
*       _e._$focus('yyy',1);
*
*       // 参数没有指定，通过输入传递，同时指定样式名称和聚焦模式
*       _e._$focus('yyy',{clazz:'js-focus-2',mode:1});
*   });
* ```
*
* @method   module:util/focus/focus._$focus
* @param    {String|Node} arg0  - 节点
* @param    {Object}      arg1  - 配置参数
* @property {Number}      mode  - 模式选择，默认为0
* @property {String}      clazz - 聚焦样式，默认js-focus
* @return   {Void}
*/
/**
* @method CHAINABLE._$focus
* @see module:util/focus/focus._$focus
*/
_p._$focus = function(_element,_options){
_element = _e._$get(_element);
if (!!_element){
var _mode = 0,
_clazz = 'js-focus';
// check param
if (_u._$isNumber(_options)){
_mode = _options;
}else if(_u._$isString(_options)){
_clazz = _options;
}else if(_u._$isObject(_options)){
_mode = _options.mode||_mode;
_clazz = _options.clazz||_clazz;
}
// check data- attribute
var _value = parseInt(
_e._$dataset(_element,'mode')
);
if (!isNaN(_value)){
_mode = _value;
}
_value = _e._$dataset(_element,'focus');
if (!!_value){
_clazz = _value;
}
// do focus
_h.__focusElement(_element,_mode,_clazz);
}
};
// for chainable method
_x._$merge(_p);
if (CMPT){
NEJ.copy(NEJ.P('nej.e'),_p);
}
return _p;
},7,2,4,94,11);
I$(97,function (_p){
/**
* 取字符串长度
* @param  {String} 字符串
* @return {Number} 字符串长度
*/
_p.__length = (function(){
var _reg = /(\r\n|\r|\n)/g;
return function(_content){
return (_content||'').replace(_reg,'**').length;
};
})();
return _p;
},10);
I$(96,function(_h,_p_){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[1])._$KERNEL;if (_k_.engine=='trident'){(function (){
/**
* 取字符串长度
* @param  {String} 字符串
* @return {Number} 字符串长度
*/
_h.__length = function(){
return (_event.args[0]||'').length;
};
})();};return _h;
},97,10);
I$(92,function (NEJ,_e,_v,_u,_x,_h,_p,_o,_f,_r){
/**
* 输入框计数器，使用属性设置输入的总长度限制，
* 以下两个属性只能同时设置一个，maxlength优先级高于data-max-length
*
* | 属性名 | 描述 |
* | :---   | :--- |
* | data-max-length | 输入长度必须小于此设置，一个中文算两个字符，适用于text/textarea |
* | maxlength       | 输入长度必须小于此设置，一个中文算一个字符，适用于text/textarea |
*
* 结构举例：
* ```html
* <input type="text" id="input-id-0" maxlength="100"/>
* <input type="text" id="input-id-1" data-max-length="100"/>
* <textarea id="textarea-id-0" maxlength="100"></textarea>
* <textarea id="textarea-id-1" data-max-length="100"></textarea>
* ```
*
* 脚本举例：
* ```javascript
* NEJ.define([
*     'util/counter/counter'
* ],function(_e){
*     // 使用属性
*     _e._$counter('input-id-0',{
*         onchange:function(_event){
*                // 自定义提示内容
*                _event.value = '还可输入'+_event.delta+'字';
*         }
*     });
* });
* ```
*
* @method   module:util/counter/counter._$counter
* @param    {String|Node} arg0    - 输入节点
* @param    {Object}      arg1    - 配置参数
* @property {String}      nid     - 显示提示信息节点标识
* @property {Number}      max     - 最大字数限制，优先级大于标签上配置的属性，一个中文算一个字符，默认100个字符
* @property {String}      clazz   - 计数器显示样式
* @property {Function}   onchange - 字数变化触发回调，{input:'xx',length:2,delta:98}
* @return   {Void}
*/
/**
* @method CHAINABLE._$counter
* @see module:util/counter/counter._$counter
*/
_p._$counter = (function(){
var _reg0 = /[\r\n]/gi,
_cache = {}; // {id:{max:123,id:'xxx',onchange:function,onlength:function}}
// calculate string length
var _doLength = function(_str){
return _h.__length(_str);
};
// input change
var _onChange = function(_id){
var _conf  = _cache[_id],
_node1 = _e._$get(_id),
_node2 = _e._$get(_conf.xid);
if (!_node1||!_conf) return;
var _event = {
input:_node1.value
};
_event.length = _conf.onlength(_event.input);
_event.delta = _conf.max-_event.length;
_conf.onchange(_event);
_node2.innerHTML = _event.value||('剩余'+Math.max(0,_event.delta)+'个字');
};
return function(_element,_options){
var _id = _e._$id(_element);
if (!_id||!!_cache[_id]) return;
// check config
var _conf = _u._$merge({},_options);
_conf.onchange = _conf.onchange||_f;
_conf.onlength = _doLength;
if (!_conf.max){
var _max1 = parseInt(_e._$attr(_id,'maxlength')),
_max2 = parseInt(_e._$dataset(_id,'maxLength'));
_conf.max = _max1||_max2||100;
if (!_max1&&!!_max2) _conf.onlength = _u._$length;
}
_cache[_id] = _conf;
// add listener
_v._$addEvent(_id,'input',_onChange._$bind(null,_id));
// init left counter show
var _node = _e._$wrapInline(_id,{
nid:_conf.nid||'js-counter',
clazz:_conf.clazz
});
_conf.xid = _e._$id(_node);
_onChange(_id);
};
})();
// for chainable method
_x._$merge(_p);
if (CMPT){
NEJ.copy(NEJ.P('nej.e'),_p);
}
return _p;
},7,4,3,2,11,96);
I$(99,function (_p,_o,_f,_r){
/**
* 节点占位符行为，高版本浏览器用样式处理
* @param  {String|Node} 节点
* @param  {String}      样式
* @return {Void}
*/
_p.__setPlaceholder = function(_element,_clazz){
// do nothing
};
return _p;
});
I$(98,function(_e,_v,_u,_h,_p_,_p,_o,_f,_r){var _k_ = (CMPT?NEJ.P("nej.p"):arguments[4])._$KERNEL;if (_k_.engine=='trident'&&_k_.release<='5.0'){(function (){
/**
* 节点占位符行为，高版本浏览器用样式处理
* @param  {String|Node} _element 节点
* @param  {String}      _clazz   样式
* @return {Void}
*/
_h.__setPlaceholder = (function(){
// placeholder flag
var _cache = {},
_ropt = {
nid:'j-holder-'+_u._$uniqueID()
};
// input foucs hide placeholder
var _onFocus = function(_id){
var _input = _e._$get(_id);
_cache[_id] = 2;
if (!!_input.value) return;
_e._$setStyle(
_e._$wrapInline(_input,_ropt),
'display','none'
);
};
// input blur check placeholder show
var _onBlur = function(_id){
var _input = _e._$get(_id);
_cache[_id] = 1;
if (!!_input.value) return;
_e._$setStyle(
_e._$wrapInline(_input,_ropt),
'display',''
);
};
// input value change
var _onInput = function(_id){
var _input = _e._$get(_id);
if (_cache[_id]==2) return;
_e._$setStyle(
_e._$wrapInline(_input,_ropt),
'display',!_input.value?'':'none'
);
};
// wrapper input control
var _doWrapInput = function(_input,_clazz){
var _id = _e._$id(_input),
_label = _e._$wrapInline(_input,{
tag:'label',
clazz:_clazz,
nid:_ropt.nid
});
_label.htmlFor = _id;
var _text = _e._$attr(_input,'placeholder')||'';
_label.innerText = _text=='null'?'':_text;
var _height = _input.offsetHeight+'px';
_e._$style(_label,{
left:0,
// width:_input.offsetWidth+'px',
// height:_height,lineHeight:_height,
display:!_input.value?'':'none'
});
};
return function(_input,_clazz){
// has been placeholded
if (_cache[_input.id]!=null)
return;
_doWrapInput(_input,_clazz);
var _id = _input.id;
_cache[_id] = 1;
// listen blur and focus event
_v._$addEvent(_input,'blur',_onBlur._$bind(null,_id));
_v._$addEvent(_input,'focus',_onFocus._$bind(null,_id));
_v._$addEvent(_input,'input',_onInput._$bind(null,_id));
};
})();
})();};return _h;
},4,3,2,99,10);
I$(93,function (NEJ,_e,_x,_h,_p,_o,_f,_r){
/**
* 输入框占位行为，高版本用placeholder属性和样式处理
*
* 样式设置占位符文字效果
* ```css
* input:-moz-placeholder{color:#aaa;font-style:italic;}
* input::-ms-input-placeholder{color:#aaa;font-style:italic;}
* input::-webkit-input-placeholder{color:#aaa;font-style:italic;}
* .js-placeholder{color:#aaa;font-style:italic;}
* ```
*
* 结构举例
* ```html
* <!-- 使用data-holder属性指定占位文字效果样式名称 -->
* <input id="abc" type="text" placeholder="text content" data-holder="js-placeholder"/>
* <textarea id="abc" placeholder="text content" data-holder="js-placeholder"></textarea>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/placeholder/placeholder'
* ],function(_e){
*     // 如果hover效果的样式名已经通过data-holder指定
*     _e._$placeholder('abc');
*     // 如果样式名没有通过data-holder指定，则可以通过参数输入
*     // 当节点有data-holder指定样式名称，同时参数也输入样式名称，则优先使用data-holder指定的样式名
*     _e._$placeholder('abc','js-placeholder');
* });
* ```
*
* @method module:util/placeholder/placeholder._$placeholder
* @param  {String|Node} arg0 - 输入控件，如input、textarea
* @param  {String}      arg1 - 占位样式名称，默认为js-placeholder
* @return {Void}
*/
/**
* @method CHAINABLE._$placeholder
* @see module:util/placeholder/placeholder._$placeholder
*/
_p._$placeholder = function(_element,_clazz){
_element = _e._$get(_element);
_h.__setPlaceholder(_element,
_e._$dataset(_element,'holder')
||_clazz||'js-placeholder');
};
// for chainable method
_x._$merge(_p);
if (CMPT){
NEJ.copy(NEJ.P('nej.e'),_p);
}
return _p;
},7,4,11,98);
I$(88,function (NEJ,_k,_e,_v,_u,_t,_t2,_t0,_t1,_p,_o,_f,_r,_pro){
/**
* WEB表单验证封装对象，HTML代码中支持以下属性配置：
*
* | 名称 | 类型 | 说明 |
* | :--- | :--- | :--- |
* | data-focus-mode | 0/1                   | 聚焦模式，仅在form节点上设置，见_$focus |
* | data-focus      | true/false            | 聚焦时检测提示信息，对于需验证的表单控件默认已支持此属性 |
* | data-auto-focus | true/false            | 自动聚焦项，多个表单项设置了该属性仅第一项有效 |
* | data-counter    | true/false            | 是否需要显示计数信息，必须同时设置data-max-length或者maxlength |
* | data-ignore     | true/false            | 临时忽略失去焦点验证，可动态控制验证触发时机 |
* | data-message    | String                | 验证出错提示信息，多个提示信息可以通过配置或者回调事件定制提示内容 |
* | data-tip        | String                | 默认提示信息，正常输入状态时的提示信息 |
* | data-required   | true/false            | 必填项，对于checkbox/radio的required表示必须选中 |
* | data-type       | url/email/date/number | 输入内容预订类型格式匹配 |
* | data-time       | String                | 格式：HH:mm:ss.ms，对于data-type为date类型的字段，取出日期值时设定时间为此值 |
* | data-pattern    | RegExp                | 正则匹配表达式，字符串格式 |
* | data-min        | String/Number         | 输入值必须大于此设置，适用于number/date型 |
* | data-max        | String/Number         | 输入值必须小于此设置，适用于number/date型 |
* | data-format     | String                | 规范date类型的格式，用/或者-来连接日期，用：来连接时间，至少应该有MM/dd/yyyy，默认值为yyyy-MM-dd，适用于date型(yyyy:年，MM:月，dd:日，HH:小时，mm:分钟,ss:秒) |
* | data-max-length | Number                | 输入长度必须小于此设置，一个中文算两个字符，适用于text/textarea |
* | data-min-length | Number                | 输入长度必须大于此设置，一个中文算两个字符，适用于text/textarea |
* | maxlength       | Number                | 输入长度必须小于此设置，一个中文算一个字符，适用于text/textarea |
* | minlength       | Number                | 输入长度必须大于此设置，一个中文算一个字符，适用于text/textarea |
*
* 结构举例
* ```html
* <!-- form节点添加data-focus-mode属性 -->
* <form id="webForm" data-focus-mode="1">
*   <!-- 必须设置值 -->
*   <input name="n00" type="text" data-auto-focus="true" data-required="true" data-message="必须输入xxx！" data-tip="这是对xxx的说明！"/>
*   <select name="n01" data-required="true" data-message="必须选择xxx！">
*     <option>please select city</option>
*     <option value="0">Hangzhou</option>
*     <option value="1">Shanghai</option>
*   </select>
*   <input type="checkbox" data-required="true" data-message="必须同意xxx！"/>
*   <input type="radio" data-required="true" data-message="必须选中xxx！"/>
*   <!-- 输入URL地址、Email地址、日期、数字 -->
*   <input name="n10" type="text" data-type="url" data-message="URL地址不合法！"/>
*   <input name="n11" type="text" data-type="email" data-message="Email地址不合法！"/>
*   <input name="n12" type="text" data-type="date" data-format="yyyy-MM-dd HH:mm:ss" data-message="日期格式不正确！"/>
*   <input name="n12" type="text" data-type="number" data-message="只能输入数字！"/>
*   <!-- 正则匹配输入信息，注意pattern值必须符合正则表达式规则 -->
*   <input name="n20" type="text" data-pattern="^[\\d]+$" data-message="输入内容必须符合xxx！"/>
*   <!-- 限制输入长度 -->
*   <input name="n30" type="text" maxlength="100" data-message="长度超过限制！"/>
*   <textarea name="n31" maxlength="100" data-message="长度超过限制！"></textarea>
*   <input name="n32" type="text" data-max-length="100" data-message="长度超过限制！"/>
*   <textarea name="n33" data-max-length="100" data-message="长度超过限制！"></textarea>
*   <input name="n34" type="text" minlength="100" data-message="长度必须达到xxx！"/>
*   <textarea name="n35" minlength="100" data-message="长度必须达到xxx！"></textarea>
*   <input name="n36" type="text" data-min-length="100" data-message="长度必须达到xxx！"/>
*   <textarea name="n37" data-min-length="100" data-message="长度必须达到xxx！"></textarea>
*   <!-- 限制最小值/最大值 -->
*   <input name="n40" type="text" data-type="number" data-min="10"/>
*   <input name="n41" type="text" data-type="number" data-max="100"/>
*   <input name="n42" type="text" data-type="number" data-min="10" data-max="100"/>
*   <input name="n43" type="text" data-type="date" data-min="2010-08-10"/>
*   <input name="n44" type="text" data-type="date" data-max="now"/>
*   <input name="n45" type="text" data-type="date" data-min="now" data-max="2050-10-10"/>
* </form>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/form/form'
* ],function(_t){
*     // 分配表单验证控件实例
*     var _form = _t._$$WebForm._$allocate({
*         form:'webForm',
*         message:{
*             'password-1':'必须输入密码！',
*             'password100':'密码强度不够',
*             'password101':'两次密码不一致',
*             'pass':'<span class="pass">ok</span>'
*         }
*     });
*
*     // 验证表单后提交
*     if (_form._$checkValidity()){
*         _form._$submit();
*     }
*
*     // 或者在验证完表单的配置项后再做表单的其他项验证
*     if (_form._$checkValidity()){
*         // TODO other form check
*         // 验证过程可以调用一下接口显示错误信息
*         // _form._$showMsgError('n30','invalid message！');
*         // 验证过程可以调用一下接口显示通过信息
*         // _form._$showMsgPass('n31','ok！');
*         _form._$submit();
*         // 使用ajax请求的话可以通过_form._$data()获取表单信息
*         doAjaxRequest('/api/form',_form._$data());
*     }
*
*     // 通过回调自定义提示信息示例代码：
*     var _form = _t._$$WebForm._$allocate({
*         form:'webForm',
*         oninvalid:function(_event){
*             // check _event.target and _event.code
*             if (_event.target.name=='password'&&_event.code==-1){
*                 // 通过设置_event.value设置提示信息
*                 _event.value = '必须输入密码！';
*             }
*             // TODO other check
*         },
*         onvalid:function(_event){
*             // 自定义验证通过提示信息，对应的节点信息_event.target
*             _event.value = '<span class="pass">pass</span>'
*         }
*     });
*
*     // 通过回调自定义验证规则示例代码：
*     var _form = _t._$$WebForm._$allocate({
*         form:'webForm',
*         oncheck:function(_event){
*             // check _event.target
*             if (_event.target.name=='password'){
*                 // 通过_event.value返回验证结果
*                 // 验证结果必须大于0的值（保留所有小于0的返回值）
*                 // 也可以返回对象，_event.value = {a:'aaaa',b:'bbbb'};
*                 // 这里的a，b可以在oninvalid时输入的_event中取到
*                 _event.value = doCheckPassword(_event.target.value); // 100
*             }
*             // TODO other check
*         },
*         oninvalid:function(_event){
*             // check _event.target and _event.code
*             if (_event.target.name=='password'&&_event.code==100){
*                 // 通过设置_event.value设置提示信息
*                 _event.value = '密码强度太弱！';
*             }
*             // TODO other check
*         }
*     });
* });
* ```
*
* @class    module:util/form/form._$$WebForm
* @extends  module:util/event._$$EventTarget
*
* @param    {Object}      config  - 配置参数
* @property {String|Node} form    - 表单节点
* @property {String}      invalid - 验证未通过时添加在表单元素上的样式名称，默认为js-invalid
* @property {String}      holder  - 如果有placeholder，则可以指定样式名称，默认为js-placeholder
* @property {String}      focus   - 如果有聚焦效果，则可以通过指定该样式名称，默认为js-focus
* @property {String}      tip     - 提示信息效果样式名称，默认为js-tip
* @property {String}      pass    - 提示信息效果样式名称，默认为js-pass
* @property {String}      error   - 提示信息效果样式名称，默认为js-error
* @property {Object}      type    - 类型验证扩展，主要扩展data-type值的验证规则，{type:regexp,type:function}
* @property {Object}      attr    - 验证属性扩展，主要扩展自定义data-xxx的验证规则，{xxx:function}
* @property {Object}      message - 提示信息内容，{key:value}，
*                                   错误信息key规则：节点名称+错误代码，
*                                   如 'username-1':'必须输入用户名！'
*                                   表示username输入框没有输入内容时错误提示信息为'必须输入用户名！'，
*                                   默认错误信息key规则：节点名称+'-error'，如username-error，
*                                   提示信息key规则：节点名称+'-tip'，如username-tip，
*                                   成功信息key规则：节点名称+'-pass'，如username-pass，
*                                   默认成功信息key：pass
*/
/**
* 对于无法通过配置验证的控件会回调外界辅助验证
*
* @event    module:util/form/form._$$WebForm#oncheck
* @param    {Object} event  - 验证基本信息
* @property {Node}   target - 当前验证节点
* @property {Node}   form   - 表单对象
* @property {Number} value  - 验证返回结果
*/
/**
* 验证未通过触发事件，错误类型对照表
*
* | 错误码 | 说明 |
* | :---   | :--- |
* | -1     | 必填项未填值 |
* | -2     | 类型不匹配，如email, url类型 |
* | -3     | 值不符合提供的规则 |
* | -4     | 超过最大长度限制 |
* | -5     | 未达到最小长度 |
* | -6     | 未达到给定范围的最小值 |
* | -7     | 超出给定范围的最大值 |
*
* @event    module:util/form/form._$$WebForm#oninvalid
* @param    {Object} event  - 验证基本信息
* @property {Node}   target - 当前验证节点
* @property {Number} code   - 错误标识
*/
/**
* 通过验证提示信息
*
* @event    module:util/form/form._$$WebForm#onvalid
* @param    {Object} event  - 验证基本信息
* @property {Node}   target - 当前验证节点
*/
/**
* 回车触发事件
*
* @event   module:util/form/form._$$WebForm#onenter
* @param   {Event} event 事件信息
*/
_p._$$WebForm = _k._$klass();
_pro = _p._$$WebForm._$extend(_t._$$EventTarget);
/**
* 控件初始化
*
* @protected
* @method module:util/form/form._$$WebForm#__init
* @return {Void}
*/
_pro.__init = function(){
this.__super();
this.__wopt = {
tp:{nid:'js-nej-tp'},
ok:{nid:'js-nej-ok'},
er:{nid:'js-nej-er'}
};
};
/**
* 控件重置
*
* @protected
* @method module:util/form/form._$$WebForm#__reset
* @param  {Object} arg0 - 配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__form = document.forms[_options.form]||
_e._$get(_options.form);
this.__doInitDomEvent([[
this.__form,'enter',
this._$dispatchEvent._$bind(this,'onenter')
]]);
this.__message = _options.message||{};
this.__message.pass = this.__message.pass||'&nbsp;';
// focus options
var _mode = this.__dataset(
this.__form,'focusMode',1);
if (!isNaN(_mode)){
this.__fopt = {
mode:_mode,
clazz:_options.focus
};
}
// save class name
this.__holder = _options.holder;
this.__wopt.tp.clazz = 'js-mhd '+(_options.tip||'js-tip');
this.__wopt.ok.clazz = 'js-mhd '+(_options.pass||'js-pass');
this.__wopt.er.clazz = 'js-mhd '+(_options.error||'js-error');
this.__invalid = _options.invalid||'js-invalid';
// init valid rule
this.__doInitValidRule(_options);
// refresh validate node
this._$refresh();
// auto focus node
if (!!this.__fnode){
this.__fnode.focus();
}
};
/**
* 控件销毁
*
* @protected
* @method module:util/form/form._$$WebForm#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
this._$reset();
delete this.__message;
delete this.__fnode;
delete this.__vinfo;
delete this.__xattr;
delete this.__form;
delete this.__treg;
delete this.__vfun;
};
/**
* 取节点自定义数据值
*
* @protected
* @method module:util/form/form._$$WebForm#__dataset
* @param  {String} arg0 - 自定义属性名
* @param  {Number} arg1 - 类型，0-字符，1-数值，2-布尔，3-日期
* @return {String}        值
*/
_pro.__dataset = function(_node,_attr,_type){
var _value = _e._$dataset(_node,_attr);
switch(_type){
case 1: return parseInt(_value,10);
case 2: return (_value||'').toLowerCase()=='true';
case 3: return this.__doParseDate(_value);
}
return _value;
};
/**
* 根据类型转数值
*
* @protected
* @method module:util/form/form._$$WebForm#__number
* @param  {String} arg0 - 值
* @param  {String} arg1 - 类型
* @return {Number}        数值
*/
_pro.__number = function(_value,_type,_time){
if (_type=='date'){
return this.__doParseDate(_value,_time);
}
return parseInt(_value,10);
};
/**
* 判断节点是否需要验证
*
* @protected
* @method module:util/form/form._$$WebForm#__isValidElement
* @param  {Node}    arg0 - 节点
* @return {Boolean}        是��需要验证
*/
_pro.__isValidElement = (function(){
var _reg1 = /^button|submit|reset|image|hidden|file$/i;
return function(_node){
// with name attr
// not button
_node = this._$get(_node)||_node;
var _type = _node.type;
return !!_node.name&&
!_reg1.test(_node.type||'');
};
})();
/**
* 判断节点是否需要验证
*
* @protected
* @method module:util/form/form._$$WebForm#__isValidElement
* @param  {Node}    arg0 - 节点
* @return {Boolean}        是否需要验证
*/
_pro.__isValueElement = (function(){
var _reg1 = /^hidden$/i;
return function(_node){
if (this.__isValidElement(_node))
return !0;
_node = this._$get(_node)||_node;
var _type = _node.type||'';
return _reg1.test(_type);
};
})();
/**
* 解析日期值
*
* @protected
* @method module:util/form/form._$$WebForm#__doParseDate
* @param  {String} arg0 - 日期字符串
* @return {Number}        日期毫秒数
*/
_pro.__doParseDate = (function(){
var _reg0 = /[:\.]/;
return function(_value,_time){
if ((_value||'').toLowerCase()=='now')
return +new Date;
var _date = _u._$var2date(_value);
if (!!_date){
// HH:mm:ss.ms
var _arr = (_time||'').split(_reg0);
_date.setHours(
parseInt(_arr[0],10)||0,
parseInt(_arr[1],10)||0,
parseInt(_arr[2],10)||0,
parseInt(_arr[3],10)||0
);
}
return +_date;
};
})();
/**
* 解析字符类型规则属性
*
* @protected
* @method module:util/form/form._$$WebForm#__doCheckString
* @param  {String} arg0 - 规则标识
* @param  {String} arg1 - 规则属性
* @return {Void}
*/
_pro.__doCheckString = function(_id,_name){
var _rule = this.__vfun[_name],
_value = this.__dataset(_id,_name);
if (!_value||!_rule) return;
this.__doPushValidRule(_id,_rule);
this.__doSaveValidInfo(_id,_name,_value);
};
/**
* 解析正则类型规则属性
*
* @protected
* @method module:util/form/form._$$WebForm#__doCheckPattern
* @param  {String} arg0 - 规则标识
* @param  {String} arg1 - 规则属性
* @return {Void}
*/
_pro.__doCheckPattern = function(_id,_name){
try{
var _pattern = this.__dataset(_id,_name);
if (!_pattern) return;
var _value = new RegExp(_pattern);
this.__doSaveValidInfo(_id,_name,_value);
this.__doPushValidRule(_id,this.__vfun[_name]);
}catch(e){
// ignore exception
}
};
/**
* 解析布尔类型规则属性
*
* @protected
* @method module:util/form/form._$$WebForm#__doCheckBoolean
* @param  {String} arg0 - 规则标识
* @param  {String} arg1 - 规则属性
* @return {Void}
*/
_pro.__doCheckBoolean = function(_id,_name){
var _rule = this.__vfun[_name];
if (!!_rule&&this.__dataset(_id,_name,2)){
this.__doPushValidRule(_id,_rule);
}
};
/**
* 解析数值类型规则属性
*
* @protected
* @method module:util/form/form._$$WebForm#__doCheckNumber
* @param  {String} arg0 - 规则标识
* @param  {String} arg1 - 规则属性
* @param  {String} arg2 - 规则值
* @return {Void}
*/
_pro.__doCheckNumber = function(_id,_name,_value){
_value = parseInt(_value,10);
if (isNaN(_value)) return;
this.__doSaveValidInfo(_id,_name,_value);
this.__doPushValidRule(_id,this.__vfun[_name]);
};
/**
* 解析dataset中数值类型规则属性
*
* @protected
* @method module:util/form/form._$$WebForm#__doCheckDSNumber
* @param  {String} arg0 - 规则标识
* @param  {String} arg1 - 规则属性
* @return {Void}
*/
_pro.__doCheckDSNumber = function(_id,_name){
this.__doCheckNumber(_id,_name,this.__dataset(_id,_name));
};
/**
* 解析属性中数值类型规则属性
*
* @protected
* @method module:util/form/form._$$WebForm#__doCheckATNumber
* @param  {String} arg0 - 规则标识
* @param  {String} arg1 - 规则属性
* @return {Void}
*/
_pro.__doCheckATNumber = function(_id,_name){
this.__doCheckNumber(_id,_name,_e._$attr(_id,_name));
};
/**
* 解析dataset中数值类型规则属性
*
* @protected
* @method module:util/form/form._$$WebForm#__doCheckTPNumber
* @param  {String} arg0 - 规则标识
* @param  {String} arg1 - 规则属性
* @return {Void}
*/
_pro.__doCheckTPNumber = function(_id,_name,_type){
var _value = this.__number(
this.__dataset(_id,_name),
this.__dataset(_id,'type'));
this.__doCheckNumber(_id,_name,_value);
};
/**
* 验证扩展属性
*
* @protected
* @method module:util/form/form._$$WebForm#__doCheckCustomAttr
* @param  {String} arg0 - 规则标识
* @return {Void}
*/
_pro.__doCheckCustomAttr = function(_id){
_u._$loop(
this.__xattr,function(v,_name){
var _value = _e._$dataset(_id,_name);
if (_value!=null){
this.__doSaveValidInfo(_id,_name,_value);
this.__doPushValidRule(_id,this.__vfun[_name]);
}
},this
);
};
/**
* 准备表单元素验证信息
*
* @protected
* @method module:util/form/form._$$WebForm#__doPrepareElement
* @param  {Node} arg0 - 表单元素节点
* @return {Void}
*/
_pro.__doPrepareElement = (function(){
var _reg0 = /^input|textarea$/i,
_reg1 = /[:\.]/;
// onfocus
var _onFocus = function(_event){
this._$showTip(_v._$getElement(_event));
};
// onblur
var _onBlur = function(_event){
var _node = _v._$getElement(_event);
if (!this.__dataset(_node,'ignore',2)){
this.__doCheckValidity(_node);
}
};
return function(_node){
// check auto focus node
if (this.__dataset(
_node,'autoFocus',2))
this.__fnode = _node;
// check placeholder
var _holder = _e._$attr(_node,'placeholder');
if (!!_holder&&_holder!='null')
_t1._$placeholder(_node,this.__holder);
// check focus
if (!!this.__fopt&&
_reg0.test(_node.tagName))
_t2._$focus(_node,this.__fopt);
// check validate condition
var _id = _e._$id(_node);
// type check
// pattern check
// required check
// max length
// min length
// cn max length
// cn min length
// min value check
// max value check
this.__doCheckBoolean(_id,'required');
this.__doCheckString(_id,'type');
this.__doCheckPattern(_id,'pattern');
this.__doCheckATNumber(_id,'maxlength');
this.__doCheckATNumber(_id,'minlength');
this.__doCheckDSNumber(_id,'maxLength');
this.__doCheckDSNumber(_id,'minLength');
this.__doCheckTPNumber(_id,'min');
this.__doCheckTPNumber(_id,'max');
this.__doCheckCustomAttr(_id);
// check date time
var _time = _e._$dataset(_id,'time');
if (!!_time){
this.__doSaveValidInfo(_id,'time',_time);
}
// save message content
var _name = _node.name;
this.__message[_name+'-tip'] = this.__dataset(_node,'tip');
this.__message[_name+'-error'] = this.__dataset(_node,'message');
this._$showTip(_node);
// node counter
var _info = this.__vinfo[_id],
_data = (_info||_o).data||_o,
_need = this.__dataset(_node,'counter',2);
if (_need&&(_data.maxlength||_data.maxLength)){
_t0._$counter(_id,{nid:this.__wopt.tp.nid,clazz:'js-counter'});
}
// node need validate
if (!!_info&&_reg0.test(_node.tagName)){
this.__doInitDomEvent([
[_node,'focus',_onFocus._$bind(this)],
[_node,'blur',_onBlur._$bind(this)]
]);
}else if(this.__dataset(_node,'focus',2)){
this.__doInitDomEvent([
[_node,'focus',_onFocus._$bind(this)],
]);
}
};
})();
/**
* 初始化验证规则
*
* @protected
* @method module:util/form/form._$$WebForm#__doInitValidRule
* @param  {Object} arg0 - 配置信息
* @return {Void}
*/
_pro.__doInitValidRule = (function(){
// type regexp map
var _rmap = {
number:/^[\d]+$/i,
// xxx://xx.xx.xx/a/b
url:/^[a-z]+:\/\/(?:[\w-]+\.)+[a-z]{2,6}.*$/i,
// xxx@xx.xx.xxx
email:/^[\w-\.]+@(?:[\w-]+\.)+[a-z]{2,6}$/i,
// xx-x-xx or xxxx-xx-x
date:function(v,node){
var format = this.__dataset(node,'format')||'yyyy-MM-dd';
return !v||(!isNaN(this.__doParseDate(v)) && _u._$format(this.__doParseDate(v),format) == v);
}
};
// validate function map
var _vfun = {
// value require for text
// checked require for checkbox or radio
required:function(_node){
var _type = _node.type,
_novalue = !_node.value,
_nocheck = (_type=='checkbox'||
_type=='radio')&&!_node.checked;
if (_nocheck||_novalue) return -1;
},
// type supported in _regmap
type:function(_node,_options){
var _reg = this.__treg[_options.type],
_val = _node.value.trim(),
_tested = !!_reg.test&&!_reg.test(_val),
_funced = _u._$isFunction(_reg)&&!_reg.call(this,_val,_node);
if (_tested||_funced) return -2;
},
// pattern check
pattern:function(_node,_options){
if (!_options.pattern.test(_node.value))
return -3;
},
// maxlength check
maxlength:function(_node,_options){
if (_node.value.length>_options.maxlength)
return -4;
},
// minlength check
minlength:function(_node,_options){
if (_node.value.length<_options.minlength)
return -5;
},
// data-max-length check
maxLength:function(_node,_options){
if (_u._$length(_node.value)>_options.maxLength)
return -4;
},
// data-min-length check
minLength:function(_node,_options){
if (_u._$length(_node.value)<_options.minLength)
return -5;
},
// min value check
min:function(_node,_options){
var _number = this.__number(
_node.value,
_options.type,
_options.time
);
if (isNaN(_number)||
_number<_options.min)
return -6;
},
// max value check
max:function(_node,_options){
var _number = this.__number(
_node.value,
_options.type,
_options.time
);
if (isNaN(_number)||
_number>_options.max)
return -7;
}
};
// merge extend
var _doMerge = function(_smap,_new,_key,_dmap){
var _old = _smap[_key];
if (_u._$isFunction(_new)&&
_u._$isFunction(_old)){
_smap[_key] = _old._$aop(_new);
return;
}
_smap[_key] = _new;
};
return function(_options){
this.__treg = NEJ.X({},_rmap);
_u._$loop(
_options.type,
_doMerge._$bind(null,this.__treg)
);
this.__vfun = NEJ.X({},_vfun);
this.__xattr = _options.attr;
_u._$loop(
this.__xattr,
_doMerge._$bind(null,this.__vfun)
);
};
})();
/**
* 添加验证规则
*
* @protected
* @method module:util/form/form._$$WebForm#__doPushValidRule
* @param  {String}   arg0 - 规则标识
* @param  {Function} arg1 - 验证规则
* @return {Void}
*/
_pro.__doPushValidRule = function(_id,_valid){
if (!_u._$isFunction(_valid)) return;
var _info = this.__vinfo[_id];
if (!_info||!_info.func){
_info = _info||{};
_info.func = [];
this.__vinfo[_id] = _info;
}
_info.func.push(_valid);
};
/**
* 缓存验证信息
*
* @protected
* @method module:util/form/form._$$WebForm#__doSaveValidInfo
* @param  {String}   arg0 - 验证标识
* @param  {String}   arg1 - 信息标识
* @param  {Variable} arg2 - 信息内容
* @return {Void}
*/
_pro.__doSaveValidInfo = function(_id,_name,_value){
if (!_name) return;
var _info = this.__vinfo[_id];
if (!_info||!_info.data){
_info = _info||{};
_info.data = {};
this.__vinfo[_id] = _info;
}
_info.data[_name] = _value;
};
/**
* 验证节点
*
* @protected
* @method module:util/form/form._$$WebForm#__doCheckValidity
* @param  {String|Node} arg0 - 节点
* @return {Boolean}            是否通过验证
*/
_pro.__doCheckValidity = function(_node){
// check node validate
_node = this._$get(_node)||_node;
if (!_node){
return !0;
}
// check validate information
var _info = this.__vinfo[_e._$id(_node)];
if (!_info&&this.__isValidElement(_node)){
this.__doPrepareElement(_node);
_info = this.__vinfo[_e._$id(_node)];
}
if (!_info){
return !0;
}
var _result;
// check condition
_u._$forIn(_info.func,
function(_func){
_result = _func.call(this,_node,_info.data);
return _result!=null;
},this);
// check custom validate
if (_result==null){
var _event = {target:_node,form:this.__form};
this._$dispatchEvent('oncheck',_event);
_result = _event.value;
}
// dispatch validate event
var _event = {target:_node,form:this.__form};
if (_result!=null){
// merge oncheck result
if (_u._$isObject(_result)){
_u._$merge(_event,_result);
}else{
_event.code = _result;
}
this._$dispatchEvent('oninvalid',_event);
if (!_event.stopped){
this._$showMsgError(
_node,_event.value||
this.__message[_node.name+_result]
);
}
}else{
this._$dispatchEvent('onvalid',_event);
if (!_event.stopped){
this._$showMsgPass(_node,_event.value);
}
}
return _result==null;
};
/**
* 显示信息
*
* @protected
* @method module:util/form/form._$$WebForm#__doShowMessage
* @param  {String|Node} arg0 - 表单元素节点
* @param  {String}      arg1 - 显示信息
* @param  {String}      arg2 - 信息类型
* @return {Void}
*/
_pro.__doShowMessage = (function(){
var _kmap = {tp:'tip',ok:'pass',er:'error'};
var _getVisible = function(_type1,_type2){
return _type1==_type2?'block':'none';
};
var _getHolder = function(_node,_type,_message){
var _holder = _getHolderNode.call(this,_node,_type);
if (!_holder&&!!_message)
_holder = _e._$wrapInline(_node,this.__wopt[_type]);
return _holder;
};
var _getHolderNode = function(_node,_type){
// try get node with id = xxx-tip or xxx-pass or xxx-error
var _holder = _e._$get(_node.name+'-'+_kmap[_type]);
if (!_holder)
_holder = _e._$getByClassName(_node.parentNode,this.__wopt[_type].nid)[0];
return _holder;
};
return function(_node,_message,_type){
_node = this._$get(_node)||_node;
if (!_node) return;
_type=='er' ? _e._$addClassName(_node,this.__invalid)
: _e._$delClassName(_node,this.__invalid);
// set message content
var _holder = _getHolder.call(this,_node,_type,_message);
if (!!_holder&&!!_message) _holder.innerHTML = _message;
// show message node
_u._$loop(this.__wopt,
function(_value,_key){
_e._$setStyle(
_getHolderNode.call(this,_node,_key),
'display',_getVisible(_type,_key)
);
},this);
};
})();
/**
* 显示提示信息
*
* @method module:util/form/form._$$WebForm#_$showTip
* @param  {String|Node} arg0 - 表单元素节点或者名称
* @param  {String}      arg1 - 显示信息
* @return {Void}
*/
_pro._$showTip = function(_node,_message){
this.__doShowMessage(
_node,_message||
this.__message[_node.name+'-tip'],'tp'
);
};
/**
* 显示验证通过信息
*
* @method module:util/form/form._$$WebForm#_$showMsgPass
* @param  {String|Node} arg0 - 表单元素节点或者名称
* @param  {String}      arg1 - 显示信息
* @return {Void}
*/
_pro._$showMsgPass = function(_node,_message){
this.__doShowMessage(
_node,_message||
this.__message[_node.name+'-pass']||
this.__message.pass,'ok'
);
};
/**
* 显示错误信息
*
* @method module:util/form/form._$$WebForm#_$showMsgError
* @param  {String|Node} arg0 - 表单元素节点或者名称
* @param  {String}      arg1 - 显示信息
* @return {Void}
*/
_pro._$showMsgError = function(_node,_message){
this.__doShowMessage(_node,_message||
this.__message[_node.name+'-error'],'er');
};
/**
* 设置表单控件值
*
* @method module:util/form/form._$$WebForm#_$setValue
* @param  {String} arg0 - 表单控件名称
* @param  {String} arg1 - 值
* @return {Void}
*/
_pro._$setValue = (function(){
var _reg0 = /^(?:radio|checkbox)$/i;
// get value
var _getValue = function(_value){
return _value==null?'':_value;
};
// set select value
var _doSetSelect = function(_value,_node){
// for multiple select
if (!!_node.multiple){
var _map;
if (!_u._$isArray(_value)){
_map[_value] = _value;
}else{
_map = _u._$array2object(_value);
}
_u._$forEach(
_node.options,function(_option){
_option.selected = _map[_option.value]!=null;
}
);
}else{
_node.value = _getValue(_value);
}
};
// set node value
var _doSetValue = function(_value,_node){
if (_reg0.test(_node.type||'')){
// radio/checkbox
_node.checked = _value==_node.value;
}else if(_node.tagName=='SELECT'){
// for select node
_doSetSelect(_value,_node);
}else{
// other
_node.value = _getValue(_value);
}
};
return function(_name,_value){
var _node = this._$get(_name);
if (!_node) return;
if(_node.tagName=='SELECT'||!_node.length){
// for node
_doSetValue(_value,_node);
}else{
// for node list
_u._$forEach(
_node,
_doSetValue._$bind(null,_value)
);
}
};
})();
/**
* 取指定名称的表单控件对象
*
* @method module:util/form/form._$$WebForm#_$get
* @param  {String} arg0 - 控件名称
* @return {Node}          表单控件对象
*/
_pro._$get = function(_name){
return this.__form.elements[_name];
};
/**
* 取当前表单节点
*
* @method module:util/form/form._$$WebForm#_$form
* @return {Node} 当前封装的表单节点
*/
_pro._$form = function(){
return this.__form;
};
/**
* 取表单数据
*
* @method module:util/form/form._$$WebForm#_$data
* @return {Object} 数据集合
*/
_pro._$data = (function(){
var _reg0 = /^radio|checkbox$/i,
_reg1 = /^number|date$/;
var _doDumpValue = function(_node){
if (_node.tagName=='SELECT'&&!!_node.multiple){
var _ret = [];
_u._$forEach(
_node.options,function(_option){
if (_option.selected){
_ret.push(_option.value);
}
}
);
return _ret.length>0?_ret:'';
}
return _node.value;
};
var _doParseValue = function(_map,_node){
var _name = _node.name,
_value = _doDumpValue(_node),
_info = _map[_name],
_type = this.__dataset(_node,'type'),
_time = _e._$dataset(_node,'time');
// parse value
if (_reg1.test(_type)){
if (_u._$isArray(_value)){
_u._$forEach(
_value,function(v,i,l){
l[i] = this.__number(
v,_type,_time
);
},this
);
}else{
_value = this.__number(
_value,_type,_time
);
}
}
// checkbox and radio
if (_reg0.test(_node.type)&&!_node.checked){
_value = this.__dataset(_node,'value');
if (!_value) return;
}
// if name exist
if (!!_info){
if (!_u._$isArray(_info)){
_info = [_info];
_map[_name] = _info;
}
_info.push(_value);
}else{
_map[_name] = _value;
}
};
return function(){
var _result = {};
_u._$forEach(
this.__form.elements,
function(_node){
if (this.__isValueElement(_node)){
_doParseValue.call(this,_result,_node);
}
},this);
return _result;
};
})();
/**
* 重置表单
*
* @method module:util/form/form._$$WebForm#_$reset
* @return {Void}
*/
_pro._$reset = (function(){
var _doShowTip = function(_node){
if (this.__isValidElement(_node)){
this._$showTip(_node);
}
};
return function(){
this.__form.reset();
_u._$forEach(
this.__form.elements,
_doShowTip,this
);
};
})();
/**
* 提交表单
*
* @method module:util/form/form._$$WebForm#_$submit
* @return {Void}
*/
_pro._$submit = function(){
this.__form.submit();
};
/**
* 刷新验证信息
*
* @method module:util/form/form._$$WebForm#_$refresh
* @return {Void}
*/
_pro._$refresh = (function(){
var _doPrepareElement = function(_node){
if (this.__isValidElement(_node)){
this.__doPrepareElement(_node);
}
};
return function(){
// id:{func:[],data:{}}
// func  - validate function list
// data  - validate information
this.__vinfo = {};
_u._$forEach(
this.__form.elements,
_doPrepareElement,this
);
};
})();
/**
* 验证表单或者表单控件
*
* @method module:util/form/form._$$WebForm#_$checkValidity
* @param  {String|Node} arg0 - 表单控件，没有输入表示验证整个表单
* @return {Boolean}            表单是否通过验证
*/
_pro._$checkValidity = function(_node){
_node = this._$get(_node)||_node;
// check single form element
if (!!_node){
return this.__doCheckValidity(_node);
}
// check all form elements
var _result = !0;
_u._$forEach(
this.__form.elements,
function(_node){
var _pass = this._$checkValidity(_node);
_result = _result&&_pass;
},this);
return _result;
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,4,3,2,20,91,92,93);
I$(111,function (R, request, toast, _) {
/**
* 脚本举例
* ```javascript
* define([
*     'base/klass'
*     ,'pro/components/coupon/coupon'
*     ,'pro/widget/module'
* ],function(_k,coupon,Module,_p,_o,_f,_r,_pro){
*     _p._$$TestModule = _k._$klass();
*     _pro = _p._$$LoginModule._$extend(Module);
*
*     _pro.__init = function(_options) {
*        //在需要调用优惠券时，新建coupon对象
*        this.__coupon = new coupon({data:{}});
*
*        //注册getCouponResult事件，在获取优惠券请求后触发(除了未登录情况)
*        this.__coupon.$on('getCouponResult', function(status, data){
*            //不同结果展示逻辑
*        }._$bind(this));
*     }
*
* ```
*
* 新建coupon对象时，可传入data里的参数
* @property  {String}      ajaxUrl     - 自定义获取优惠券接口(所有优惠券领取接口返回格式应统一)
* @property  {Boolean}     isBindLink  - 是否自动绑定'http://*.kaola.com/app/coupon/code.html'
*                                        链接点击事件，领取优惠券
*
* 可供外部调用方法
* @function  getCoupon   获取优惠券
*
* @function  getLsdata   获取data里的lsdata
* @function  setLsdata   设置data里的lsdata
*
*/
var Coupon = Regular.extend({
/**
* ajaxUrl   string    自定义领取优惠券接口(接口返回格式统一)
* lsdata    object    需要存放在localStorage里的数据
* argus     object    渲染自定义template的数据
*/
config: function(data) {
var lsUsable = this.getLsUsable();
_.extend(data,{
ajaxUrl:'/coupon/get.html'
,lsUsable: lsUsable   //浏览器是否支持localStorage
,lsdata:{}            //登录跳转时，存放在localStorage里的数据
,argus:{}             //渲染自定义template的数据
,isBindLink:true      //是否通过全局事件代理来绑定点击领取功能，暂时只支持H5活动页
});
},
// statusMap:{'461':-2, '200':1, }
init: function() {
if(!!this.data.isBindLink) {
nej.v._$addEvent(document.body, 'click', this._filterClick._$bind(this));
}
var lsdata = JSON.parse(this.lsGetItem("kaola_coupon"));
if(!!lsdata) {
this.lsRemoveItem("kaola_coupon");
this.setLsdata(lsdata);
}
//通过url来获取，登录返回后直接领取优惠券的逻辑
//当url中带有scouponId时，发送优惠券请求，并且使用window.history.replaceState来替换url
if(location.href.indexOf('scouponId=') > 0) {
var couponId = location.href.split('scouponId=')[1].split('&')[0];
this.sendAjax(true, couponId);
//替换url，避免用户刷新页面导致再次执行领取逻辑
try{
var reg = new RegExp(('[&|?]scouponId='+couponId),'ig');
var changeUrl = location.href.split('/').pop().replace(reg, '');
window.history.replaceState({},null,changeUrl);
}catch(e){
}
}
},
_filterClick: function(e) {
try{
var target = nej.v._$getElement(e),
hreftext = target.href || target.parentNode.href || '';
if(hreftext.indexOf('http://www.kaola.com/app/coupon') == 0 ) {
nej.v._$stop(e);
var couponId = hreftext.split('/').pop().split('.')[0];
this.getCoupon(couponId);
}
}catch(e){
}
},
//触发获取优惠券逻辑，可供外部调用
getCoupon: function(couponId) {
if(!couponId) return;
this.sendAjax(false, couponId);
},
//获取优惠券请求
sendAjax: function(fromInit, couponId) {
if(!couponId) return;
var param = {schemeId: couponId};
//使用默认请求时，需要区分couponId的类型
//TODO优化  之后使用redeemCode/get作为默认领取链接
if(this.data.ajaxUrl == '/coupon/get.html'){
if(isNaN(couponId)){
this.data.ajaxUrl = '/coupon/redeemCode/get.html';
}
}
if(this.data.ajaxUrl == '/coupon/redeemCode/get.html'){
param = {redeemCode: couponId}
}
try{
request(this.data.ajaxUrl,{
method:'POST',
norest:true,
type:'json',
data:param,
onload: function(_data){
//兼容以前的方案号请求,需要添加对应status
if(!_data.body){
_data.body = {};
}
if(this.data.ajaxUrl == '/coupon/redeemCode/get.html'){
if(_data.body.status == undefined){
var status = -1;
switch(_data.code) {
case 461:   //未登录
status = -2;
break;
case -22:     //已领取
status = 0;
break;
case 200:     //领取成功
status = 1;
break;
default:
status = -1;
break;
}
_data.body.status = status;
}
}
if(_data.body.status == -2){  //未登录
if(!!fromInit) return;  //页面初始化时发送的请求，不登录不做跳转
//存放优惠码到localStorage
this.data.lsdata.couponId = couponId;
//kaola_coupon 在 localStorage 中有且只会存在一个
this.lsSetItem("kaola_coupon", JSON.stringify(this.data.lsdata));
var jumpUrl = location.href + (location.href.indexOf('?')>0 ? '&' : '?') + 'scouponId=' + couponId;
location.href="http://m.kaola.com/login.html?target="+encodeURIComponent(jumpUrl);
return;
}
if(!!this._handles && !!this._handles['getCouponResult']){
this.$emit('getCouponResult', _data.body.status, _data.body, _data);
return;
}
//如果没有getCouponResult方法时，默认通过toast来实现提示
switch(_data.body.status) {
case -1:
toast.show(_data.msg||'领取失败');
break;
case 0:
toast.show(_data.msg||'已领取');
break;
case 1:
toast.show('领取成功');
break;
default:
toast.show(_data.msg||'领取失败');
break;
}
}._$bind(this)
});
}catch(e){
console.log(e);
}
},
//获取data.lsdata
getLsdata: function() {
return this.data.lsdata;
},
//设置data.lsdata
setLsdata: function(lsdata) {
this.data.lsdata = lsdata;
},
//设置与template相关的数据内容argus,可供外部调用
setArgus: function(argus) {
this.data.argus = argus;
this.$update();
},
getArgus: function() {
return this.data.argus;
},
// 手机浏览器开启了隐私设置时，
// 遇到对cookie和localStorage的操作时会报错，js将不会再执行
// 判断localStorage是否可用
getLsUsable: function() {
try{
localStorage.getItem("test");
return true;
}catch(e){
return false;
}
},
//localStorage操作
lsGetItem: function(key) {
if(!this.data.lsUsable)  return null;
return localStorage.getItem(key)
},
lsSetItem: function(key, value) {
if(!this.data.lsUsable)  return;
localStorage.setItem(key, value);
},
lsRemoveItem: function(key) {
if(!this.data.lsUsable)  return;
localStorage.removeItem(key);
}
});
return Coupon;
},65,68,25,74);
I$(142,function (NEJ,_k,_e,_u,_t,_t0,_p,_o,_f,_r){
var _pro;
/**
* UI控件基类，框架及项目中所有涉及UI的控件均继承此类
*
* 脚本举例
* ```javascript
* // 分配控件实例
* NEJ.define([
*     'ui/base'
* ],function(_i,_p,_o,_f,_r){
*     var ctrl = _i._$allocate({
*         clazz:'xxx',
*         parent:document.body
*     });
*     ctrl._$appendTo(document.body);
*     // 如果在分配时传入了parent则这步可省略
*     ctrl._$appendTo(function(_body){
*         // 如果需要自定义body插入的位置可以输入函数，返回父容器节点
*         _parent.insertAdjacentElement('afterBegin',_body);
*         return _parent;
*     });
* });
* ```
*
* @class     module:ui/base._$$Abstract
* @extends   module:util/event._$$EventTarget
* @param     {Object}               arg0   - 可选配置参数
* @property  {String}               clazz  - 控件样式
* @property  {String|Node|Function} parent -  控件所在容器节点或者追加控件节点执行函数
*/
_p._$$Abstract = _k._$klass();
_pro = _p._$$Abstract._$extend(_t._$$EventTarget);
/**
* 初始化
*
* @protected
* @method module:ui/base._$$Abstract#__init
* @return {Void}
*/
_pro.__init = function(){
this.__super();
_e._$dumpCSSText();
this.__initXGui();
this.__initNode();
};
/**
* 控件重置
*
* @protected
* @method module:ui/base._$$Abstract#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__doInitClass(_options.clazz);
this._$appendTo(_options.parent);
};
/**
* 控件销毁
*
* @protected
* @method module:ui/base._$$Abstract#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
// clear parent
this.__doDelParentClass();
delete this.__parent;
// clear body
_e._$removeByEC(this.__body);
_e._$delClassName(
this.__body,
this.__class
);
delete this.__class;
};
/**
* 初始化外观信息，子类实现具体逻辑
*
* @abstract
* @method module:ui/base._$$Abstract#__initXGui
* @return {Void}
*/
_pro.__initXGui = _f;
/**
* 初始化节点，子类重写具体逻辑
*
* @protected
* @method module:ui/base._$$Abstract#__initNode
* @return {Void}
*/
_pro.__initNode = function(){
if (!this.__seed_html){
this.__initNodeTemplate();
}
this.__body = _t0._$getNodeTemplate(this.__seed_html);
if (!this.__body){
this.__body = _e._$create('div',this.__seed_css);
}
_e._$addClassName(this.__body,this.__seed_css);
};
/**
* 动态构建控件节点模板，子类实现具体逻辑
*
* @abstract
* @method module:ui/base._$$Abstract#__initNodeTemplate
* @return {Void}
*/
_pro.__initNodeTemplate = _f;
/**
* 添加节点样式
*
* @protected
* @method module:ui/base._$$Abstract#__doInitClass
* @param  {String} arg0 - 样式名称
* @return {Void}
*/
_pro.__doInitClass = function(_clazz){
this.__class = _clazz||'';
_e._$addClassName(this.__body,this.__class);
};
/**
* 父节点增加辅助样式
*
* @protected
* @method module:ui/base._$$Abstract#__doAddParentClass
* @return {Void}
*/
_pro.__doAddParentClass = function(){
if (!!this.__seed_css){
var _arr = this.__seed_css.split(/\s+/);
_e._$addClassName(
this.__parent,
_arr.pop()+'-parent'
);
}
};
/**
* 父节点删除辅助样式
*
* @protected
* @method module:ui/base._$$Abstract#__doDelParentClass
* @return {Void}
*/
_pro.__doDelParentClass = function(){
if (!!this.__seed_css){
var _arr = this.__seed_css.split(/\s+/);
_e._$delClassName(
this.__parent,
_arr.pop()+'-parent'
);
}
};
/**
* 取当前控件节点
*
* 脚本举例
* ```javascript
* // _mask是一个继承了此基类的实例化对象
* // 获取当前控件的节点
*   _mask._$getBody();
* ```
*
* @method module:ui/base._$$Abstract#_$getBody
* @return {Node} 控件节点
*/
_pro._$getBody = function(){
return this.__body;
};
/**
* 控件节点追加至容器
*
* 脚本举例
* ```javascript
* // _mask是一个继承了此基类的实例化对象
* _mask._$appendTo(document.body);
* // 还可以传方法
* _mask._$appendTo(function(_body){
*    // 根据情况插入节点
*    var _parent = document.body;
*    _parent.insertAdjacentElement('afterBegin',_body);
*    return _parent;
* });
* ```
*
* @method module:ui/base._$$Abstract#_$appendTo
* @param  {String|Node|Function} arg0 - 控件所在容器节点
* @return {Void}
*/
_pro._$appendTo = function(_parent){
if (!this.__body) return;
this.__doDelParentClass();
if (_u._$isFunction(_parent)){
this.__parent = _parent(this.__body);
}else{
this.__parent = _e._$get(_parent);
if (!!this.__parent){
this.__parent.appendChild(this.__body);
}
}
this.__doAddParentClass();
};
/**
* 显示控件
*
* 脚本举例
* ```javascript
* // _mask是一个继承了此基类的实例化对象
* _mask._$show();
* ```
*
* @method module:ui/base._$$Abstract#_$show
* @return {Void}
*/
_pro._$show = function(){
if (!this.__parent||!this.__body||
this.__body.parentNode==this.__parent){
return;
}
this.__parent.appendChild(this.__body);
};
/**
* 隐藏控件
*
* 脚本举例
* ```javascript
* // _mask是一个继承了此基类的实例化对象
* _mask._$hide();
* ```
*
* @method module:ui/base._$$Abstract#_$hide
* @return {Void}
*/
_pro._$hide = function(){
_e._$removeByEC(this.__body);
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ui'),_p);
}
return _p;
},7,1,4,2,20,21);
I$(145,".#<uispace>{position:fixed;_position:absolute;z-index:100;top:0;bottom:0;left:0;right:0;width:100%;height:100%;background-image:url(#<blankimage>);}");
I$(143,function (NEJ,_k,_g,_e,_u,_i,_css,_p,_o,_f,_r){
var _pro,
_seed_css = _e._$pushCSSText(_css,{blankimage:_g._$BLANK_IMAGE});
/**
* 盖层控件
*
* 页面结构举例
* ```html
* <style type="text/css">
*     .box{position:relative;}
* </style>
* <div id="mask-box" class="box"></div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'ui/maks/mask'
* ],function(_i0,_p,_o,_f,_r){
*     var _mask = _i0._$$Mask._$allocate({
*         parent:document.body,
*         content:'<div style="width:100px;height:100px;margin:0 auto;margin-top:150px;">搞一点盖层的内容</div>'
*     });
* });
* ```
*
* @class     module:ui/maks/mask._$$Mask
* @extends   module:ui/base._$$Abstract
* @param     {Object}      arg0    - 可选配置参数
* @property  {String|Node} content - 内容节点或者HTML代码
*/
_p._$$Mask = _k._$klass();
_pro = _p._$$Mask._$extend(_i._$$Abstract);
/**
* 控件重置
*
* @protected
* @method module:ui/maks/mask._$$Mask#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
var _content = _options.content||'&nbsp;';
_u._$isString(_content)
? this.__body.innerHTML = _content
: this.__body.appendChild(_content);
};
/**
* 控件销毁
*
* @protected
* @method module:ui/maks/mask._$$Mask#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
this.__body.innerHTML = '&nbsp;';
};
/**
* 初始化外观
*
* @protected
* @method module:ui/maks/mask._$$Mask#__initXGui
* @return {Void}
*/
_pro.__initXGui = function(){
this.__seed_css = _seed_css;
};
/**
* 显示盖层
*
* ```javascript
* // 先隐藏盖层
* _mask._$hide();
* // 显示盖层
* _mask._$show();
* ```
*
* @method module:ui/maks/mask._$$Mask#_$show
* @return {Void}
*/
_pro._$show = function(){
_e._$fullScreen(this.__body);
this.__super();
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ui'),_p);
}
return _p;
},7,1,13,4,2,142,145);
I$(146,".#<uispace>{ \twidth:290px; \tborder:1px solid #ccc;border-radius:3px; \tposition:fixed; \ttop:50%; \tmargin-top:-62px; \tleft:50%; \tmargin-left:-145px; \tbackground:#fff; \tz-index: 1000; }  .#<uispace> .cnt{padding:10px;line-height:20px;border-bottom:1px solid #ccc} .#<uispace> .close{border-right:1px solid #ccc;margin-left:-1px} .#<uispace> .btns li{width:50%;float:left;height:40px;height:40px;line-height:40px;text-align:center;} .#<uispace> .btns{color:#007aff} ");
I$(147,"<div class=\"m-downloadwin\"> \t<div class=\"cnt f-tac j-flag\">加入购物车成功，请前往电脑版或手机客<br/>户端购物车查看</div> \t<ul class=\"btns f-cb\"> \t\t<li class=\"close j-flag\">关闭</li> \t\t<li class=\"j-flag\">下载客户端</li> \t</ul> </div>  ");
I$(113,function (_k,_v,_e,_ut,_i,_i1,_css,_html,_e1,_t2,_,app,_p,_o,_f,_r,_pro){
var _seed_css = _e._$pushCSSText(_css),
_seed_html = _e1._$addNodeTemplate(_html);
_p._$$DownloadWindow = _k._$klass();
_pro = _p._$$DownloadWindow._$extend(_i._$$Abstract);
_pro.__reset = function(_options){
this.__super(_options);
this.__cnt.innerHTML = _options.cnt||this.__cnt.innerHTML;
this.__mask = _i1._$$Mask._$allocate({parent:document.body,clazz:'m-layermsk'})
};
_pro.__initXGui = function(){
this.__seed_html = _seed_html;
this.__seed_css = _seed_css;
}
_pro.__initNode = function() {
this.__super();
var _list = _e._$getByClassName(this.__body,'j-flag');
this.__cnt = _list[0];
this.__close = _list[1];
this.__dldbtn = _list[2];
if(_.isOldApp(10,10300)){
this.__inOldApp = true;
}
if(this.__inOldApp){
this.__dldbtn.innerText = '确定';
_e._$addClassName(this.__close,'f-dn');
this.__dldbtn.style.width='100%';
}
_v._$addEvent(this.__close,'click',this.__onCloseClick._$bind(this));
_v._$addEvent(this.__dldbtn,'click',this.__onDownloadBtnClick._$bind(this));
};
_pro.__onCloseClick = function(){
this._$hide();
this.__mask._$recycle();
}
_pro.__onDownloadBtnClick = function(){
if(this.__inOldApp){
this.__onCloseClick();
} else{
var pageLink = 'kaola://'+location.host+location.pathname;
app._$open({
openUrl: pageLink,
DownloadUrl: 'http://www.kaola.com/mobile/download.html'
});
}
}
return _p._$$DownloadWindow
},1,3,4,2,142,143,146,147,21,29,74,85);
I$(141,"{{#if _imgUrl}} <a class=\"m-app-banner {{_type}} {{_hideClass}}\" on-click={{this.download()}} target=\"_blank\" style=\"margin:{{_margin}};\" data-gatype=\"下载banner点击\" data-gaop=\"{{_platform}}\" data-gatag=\"{{_pageUrl}}\"> \t<img src=\"{{_imgUrl||''}}\" alt=\"网易考拉海购应用下载\" data-src=\"{{_imgUrl||''}}\" ref='banimg'> \t{{#if _type !== ''}} \t<span class=\"closewrap\" on-click={{this.close($event)}}> \t\t<span class=\"close u-close-solid\" ></span> \t</span> \t \t{{/if}} </a> {{/if}}");
I$(110,function (tpl, R, request, u, app, _c, _) {
var Appbanner = Regular.extend({
template: tpl,
config: function(data){
this.data._hideClass = '';
this.data._margin = data.margin||'';
this.data._type = data.type || '';
//如果需要显示，再检查页面url是否带有显示控制
var urlparams = u._$query2object(location.search.slice(1));
if (urlparams && urlparams.noklappbanner==='1') {
this.shown(1); //设置不需要显示标记
}
if (this._$shouldForbidShowBanner()) {  //后端要求不显示appbanner
this.shown(1); //���置不需要显示标记
}
this.data._urlparams = urlparams;
//读取sessionStorage, 决定是否显示banner
this.data._needShow = !!this.shown()? false : true;
// 如果是在网易新闻客户端钱包中，不显示banner
if(window.sessionStorage.getItem('news_kaola_ActId') == '7190'){
this.data._needShow = false;
}
//获取平台信息
var os = app._$platform;
this.data._platform = os=='AOS'? 'Android': (os=='IOS'?'iOS':os);
this.data._pageUrl = location.origin+location.pathname;
},
init : function(){
if (!this.data._needShow) { return; }
// 如果ajax获取数据有错，则不会显示banner条
request('/ad/footer.html',{
method:'GET',
norest:true,
type:'json',
onload: function(obj){
if ( obj && u._$isObject(obj) && obj.code===200 ) {
if (obj.body && obj.body.footerAd &&
!!obj.body.footerAd.siteUrl &&
!!obj.body.footerAd.imageUrl) {
this.data._goUrl = obj.body.footerAd.siteUrl;
this.data._imgUrl = obj.body.footerAd.imageUrl;
this.addUrlsuffix();
//隐藏状态，图片显示出来时需要触发显示事件
if (this.data._hideClass==='' && this.data._imgUrl) {
this.$emit('appbannerloaded', true);
}
this.$update();
// 图片加载完成后触发load事件
this.$refs.banimg.onload = this.$refs.banimg.onerror = function(){
this.$emit('load');
}._$bind(this);
}
}
}._$bind(this)
});
},
download: function(){
_.download();
},
close : function(evt){
evt.stopPropagation();
evt.preventDefault();
this.shown(1);
this.hide();
},
hide: function(){
this.$emit('appbannerloaded',false);
this.data._hideClass = 'hide';
this.$update();
},
show: function(){
var appBannerHide = this.shown();
if(appBannerHide){
return;
}
this.data._hideClass = '';
this.$emit('appbannerloaded', !!this.data._imgUrl);  //已经决定显示，只要有图就显示出来
this.$update();
},
// 是否已经显示并被关闭过
shown : function(val){
var key = "NTES_KAOLA_APP_BANNER";
if (!key) { return null; }
try{
if (arguments.length>0) {
//set
return sessionStorage.setItem(key, val);
}else{
//get
return sessionStorage.getItem(key);
}
}catch(e){
//用户存储空间满或者隐私模式时，会抛出 quotaExceededError
//此处忽略即可
}
},
/**
* 为下载url增加参数，用于统计需求
* 参数为 url的path+'-'+title
*/
addUrlsuffix : function(){
var suff= location.pathname + '_' + document.title, data = this.data;
data._goUrl = this.addParam2Url(data._goUrl, 'from', suff);
//如果存在渠道参数，则将渠道参数也带进来
if (data._urlparams && data._urlparams.appChannel) {
data._goUrl = this.addParam2Url(data._goUrl, 'appChannel', data._urlparams.appChannel);
}
},
addParam2Url : function(url, name, val){
var _url = url, _pstr = name+'='+encodeURIComponent(val);
if (!_url) {
return _url;
}
if (url.indexOf('?')<0) {
return _url+'?'+_pstr;
}else{
return _url.replace('?', '?'+_pstr+'&');
}
},
/**
* 判断是否应该禁止显示appbanner
* 后端会设置 showWapBanner cookie，值为 '0_0'  类似的值，第1位为'0'，表示不需要显示banner
* @return {Boolean} true，表示需要禁止， false表示不禁止
*/
_$shouldForbidShowBanner: function(){
var cpsck = _c._$cookie('showWapBanner');
if (cpsck && cpsck[0]==='0') {
return true;
}
return false;
}
});
return Appbanner;
},141,65,68,2,85,43,74);
I$(126,function (NEJ,_k,_t,_t0,_p,_o,_f,_r){
// variable declaration
var _pro;
/**
* 动画基类
*
* @class   module:util/animation/animation._$$Animation
* @extends module:util/event._$$EventTarget
*
* @param    {Object} config - 可选配置参数
* @property {Object} to     - 动画结束信息
* @property {Object} from   - 动画初始信息
* @property {Number} delay  - 延时时间，单位毫秒，默认0
*/
/**
* 动画结束回调事件
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/animation/bounce'
* ],function(_t){
*     var _bounce = _t._$$AnimBounce._$allocate({
*         from: {
*             offset: 100,
*             velocity: 100
*         },
*         acceleration:100,
*         onstop: function(){
*             // 动画停止后回收控件
*             _bounce = nej.ut._$$AnimBounce._$recycle(_bounce);
*         }
*     });
* });
* ```
*
* @event module:util/animation/animation._$$Animation#onstop
*/
/**
* 动画过程回调事件
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/animation/bounce'
* ],function(_t){
*     var _bounce = _t._$$AnimBounce._$allocate({
*         from: {
*             offset: 100,
*             velocity: 100
*         },
*         acceleration:100,
*         onupdate: function(_event){
*             // 坐标
*             console.log(_event.offset + 'px');
*             // 初速度
*             console.log(_event.velocity);
*         }
*     });
* });
* ```
*
* @event    module:util/animation/animation._$$Animation#onupdate
* @param    {Object} event    - 可选配置参数
* @property {Number} offset   - 偏移量
* @property {Number} velocity - 初速度(px/s)
*/
_p._$$Animation = _k._$klass();
_pro = _p._$$Animation._$extend(_t._$$EventTarget);
/**
* 控件重置
*
* @protected
* @method   module:util/animation/animation._$$Animation#__reset
* @param    {Object} arg0 - 可选配置参数
* @property {Number} to   - 结束坐标
* @property {Number} from - 起始坐标
* @return   {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__end = _options.to||_o;
this.__begin = _options.from||{};
this.__delay = Math.max(
0,parseInt(_options.delay)||0
);
};
/**
* 控件销毁
*
* @protected
* @method module:util/animation/animation._$$Animation#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
this._$stop();
if (!!this.__dtime){
window.clearTimeout(this.__dtime);
delete this.__dtime;
}
delete this.__end;
delete this.__begin;
};
/**
* 动画帧逻辑
*
* @protected
* @method module:util/animation/animation._$$Animation#__onAnimationFrame
* @param  {Number} arg0 - 时间值
* @return {Void}
*/
_pro.__onAnimationFrame = function(_time){
if (!this.__begin) return;
if ((''+_time).indexOf('.')>=0){
_time = +new Date;
}
if (this.__doAnimationFrame(_time)){
this._$stop();
return;
}
this.__timer = _t0.requestAnimationFrame(
this.__onAnimationFrame._$bind(this)
);
};
/**
* 动画帧回调，子类实现具体算法
*
* @abstract
* @method module:util/animation/animation._$$Animation#__doAnimationFrame
* @param  {Number}  arg0 - 时间值
* @return {Boolean}        是否停止动画
*/
_pro.__doAnimationFrame = _f;
/**
* 注册动画监听事件
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/animation/bounce'
* ],function(_t){
*     var _bounce = _t._$$AnimBounce._$allocate({
*         from: {
*             offset: 100,
*             velocity: 100
*         },
*         acceleration:100,
*         onupdate: function(_event){
*             // 坐标
*             console.log(_event.offset + 'px');
*             // 初速度
*             console.log(_event.velocity);
*         }
*     });
*     // 进行弹性动画
*     _bounce._$play();
* });
* ```
*
* @method module:util/animation/animation._$$Animation#_$play
* @return {Void}
*/
_pro._$play = (function(){
var _doPlayAnim = function(){
this.__dtime = window.clearTimeout(this.__dtime);
this.__begin.time = +new Date;
this.__timer = _t0.requestAnimationFrame(
this.__onAnimationFrame._$bind(this)
);
};
return function(){
this.__dtime = window.setTimeout(
_doPlayAnim._$bind(this),
this.__delay
);
};
})();
/**
* 取消动画监听事件
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/animation/bounce'
* ],function(_t){
*     var _bounce = _t._$$AnimBounce._$allocate({
*         from: {
*             offset: 100,
*             velocity: 100
*         },
*         acceleration:100,
*         onupdate: function(_event){
*             // 坐标
*             console.log(_event.offset + 'px');
*             // 初速度
*             console.log(_event.velocity);
*         }
*     });
*     // 进行动画
*     _bounce._$play();
*     // 停止动画,触发onstop
*     _bounce._$stop();
* });
* ```
*
* @method module:util/animation/animation._$$Animation#_$stop
* @return {Void}
*/
_pro._$stop = function(){
this.__timer = _t0.cancelAnimationFrame(this.__timer);
this._$dispatchEvent('onstop');
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,20,53);
I$(125,function (NEJ,_k,_u,_t0,_p,_o,_f,_r){
// variable declaration
var _pro;
/**
* 贝塞尔曲线算法
*
* 初始信息包括
*
* * offset  [Number]  偏移量
*
* 结束信息包括
*
* * offset  [Number]  偏移量
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/animation/bezier'
* ],function(_t){
*     var _easein = nej.ut._$$AnimBezier._$allocate({
*         from: {
*             offset: 100
*         },
*         to:{
*             offset: 0
*         },
*         timing:'easein',
*         onupdate:function(_event){
*             // 坐标
*             console.log(_event.offset + 'px');
*             // 更新节点位置
*         },
*         onstop:function(){
*             // 动画停止后回收控件
*             this._$recycle();
*         }
*     });
*     // 进行弹性动画
*     _easein._$play();
* });
* ```
*
* @class    module:util/animation/bezier._$$AnimBezier
* @extends  module:util/animation/animation._$$Animation
*
* @param    {Object} config   - 可选配置参数
* @property {Number} duration - 持续时间，单位毫秒，默认为200ms
* @property {String} timing   - 时间函数，默认为ease，ease/easein/easeout/easeinout/linear/cubic-bezier(x1,y1,x2,y2)
*/
_p._$$AnimBezier = _k._$klass();
_pro = _p._$$AnimBezier._$extend(_t0._$$Animation);
/**
* 控件重置
*
* @protected
* @method module:util/animation/bezier._$$AnimBezier#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__duration = _options.duration||200;
this.__epsilon  = 1/(200*this.__duration);
this.__doParseTiming(_options.timing);
this.__doCalPolynomialCoefficients();
};
/**
* 控件销毁
*
* @protected
* @method module:util/animation/bezier._$$AnimBezier#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
delete this.__pointer;
delete this.__coefficient;
};
/**
* 解析时间动画为坐标信息
*
* @protected
* @method module:util/animation/bezier._$$AnimBezier#__doParseTiming
* @param  {String} arg0 - 时间动画
* @return {Void}
*/
_pro.__doParseTiming = (function(){
var _reg0 = /^cubic\-bezier\((.*?)\)$/i,
_reg1 = /\s*,\s*/i,
_pointers = {
linear:[0,0,1,1]
,ease:[0.25,0.1,0.25,1.0]
,easein:[0.42,0,1,1]
,easeout:[0,0,0.58,1]
,easeinout:[0,0,0.58,1]
};
var _doParseFloat = function(_value,_index,_list){
_list[_index] = parseFloat(_value);
};
return function(_timing){
_timing = (_timing||'').toLowerCase();
this.__pointer = _pointers[_timing];
if (_reg0.test(_timing)){
this.__pointer = RegExp.$1.split(_reg1);
_u._$forEach(this.__pointer,_doParseFloat);
}
if (!!this.__pointer) return;
this.__pointer = _pointers.ease;
};
})();
/**
* 计算贝塞尔曲线多项式系数
*
* @protected
* @method module:util/animation/bezier._$$AnimBezier#__doCalPolynomialCoefficients
* @return {Void}
*/
_pro.__doCalPolynomialCoefficients = function(){
var _pt = this.__pointer,
_cx = 3*_pt[0],
_bx = 3*(_pt[2]-_pt[0])-_cx,
_ax = 1-_cx-_bx,
_cy = 3*_pt[1],
_by = 3*(_pt[3]-_pt[1])-_cy,
_ay = 1-_cy-_by;
this.__coefficient = {
ax:_ax, ay:_ay,
bx:_bx, by:_by,
cx:_cx, cy:_cy
};
};
/**
* 计算目标接近率
*
* @protected
* @method module:util/animation/bezier._$$AnimBezier#__doCalCubicBezierAtTime
* @param  {Number} arg0 - 当前时间
* @return {Float}         终点接近率
*/
_pro.__doCalCubicBezierAtTime = (function(){
var _doSampleCurveX = function(_time,_coef){
return ((_coef.ax*_time+_coef.bx)*_time+_coef.cx)*_time;
};
var _doSampleCurveY = function(_time,_coef){
return ((_coef.ay*_time+_coef.by)*_time+_coef.cy)*_time;
};
var _doSampleCurveDerivativeX = function(_time,_coef){
return (3*_coef.ax*_time+2*_coef.bx)*_time+_coef.cx;
};
var _doSolveCurveX = function(_time,_epsilon,_coef){
var t0,t1,t2,x2,d2,i;
// First try a few iterations of Newton's method -- normally very fast.
for(t2=_time,i=0;i<8;i++){
x2 = _doSampleCurveX(t2,_coef)-_time;
if (Math.abs(x2)<_epsilon)
return t2;
d2 = _doSampleCurveDerivativeX(t2,_coef);
if (Math.abs(d2)<1e-6)
break;
t2 = t2-x2/d2;
}
// Fall back to the bisection method for reliability.
t0 = 0; t1 = 1; t2 = _time;
if (t2<t0) return t0;
if (t2>t1) return t1;
while(t0<t1) {
x2 = _doSampleCurveX(t2,_coef);
if (Math.abs(x2-_time)<_epsilon)
return t2;
if (_time>x2)
t0 = t2;
else
t1 = t2;
t2 = (t1-t0)*0.5+t0;
}
// Failure.
return t2;
};
return function(_delta){
return _doSampleCurveY(
_doSolveCurveX(_delta/this.__duration,
this.__epsilon,this.__coefficient),this.__coefficient);
};
})();
/**
* 动画帧回调
*
* @protected
* @method module:util/animation/bezier._$$AnimBezier#__doAnimationFrame
* @param  {Number} arg0 - 时间值
* @return {Boolean}       是否停止
*/
_pro.__doAnimationFrame = function(_time){
var _delta   = _time-this.__begin.time,
_percent = this.__doCalCubicBezierAtTime(_delta),
_offset  = _u._$fixed(this.__begin.offset*(1-_percent)+
this.__end.offset*_percent,2),
_stop = !1;
// offset out of begin and end range
if (_delta>=this.__duration){
_offset = this.__end.offset;
_stop = !0;
}
this._$dispatchEvent('onupdate',{
offset:1*_offset
});
return _stop;
};
/**
* 取消动画监听事件
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/animation/bezier'
* ],function(_t){
*     var _easein = nej.ut._$$AnimBezier._$allocate({
*         from: {
*             offset: 100
*         },
*         to:{
*             offset: 0
*         },
*         timing:'easein',
*         onupdate: function(_event){
*             // 坐标
*             console.log(_event.offset + 'px');
*         }
*     });
*     // 进行弹性动画
*     _easein._$play();
*     // 结束动画
*     _easein._$stop();
* });
* ```
* @method module:util/animation/bezier._$$AnimBezier#_$stop
* @return {Void}
*/
_pro._$stop = function(){
this._$dispatchEvent('onupdate',{
offset:this.__end.offset
});
this.__super();
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,2,126);
I$(124,function (NEJ,_k,_u,_t0,_p,_o,_f,_r){
// variable declaration
var _pro;
/**
* 先快后慢动画
*
* 结构举例
* ```html
* <div id='id-bounce1'></div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'pro/widget/util/timing'
* ],function(_t){
*     // 创建动画实例
*     var _easeout  = _t._$$Timing._$allocate({
*         timing: 'easeout',
*         from:{
*             offset:100
*         },
*         to:{
*             offset:200
*         },
*         duration:1000,
*         onupdate:function(_event){
*             _box.style.left = _event.offset + 'px';
*         },
*         onstop:function(){
*             this._$recycle();
*         }
*     });
*     // 开始动画
*     _easeout._$play();
* });
* ```
*
* @class   module:util/animation/easeout._$$Timing
* @extends module:util/animation/bezier._$$AnimBezier
*
* @param   {Object} config 可选配置参数
*/
_p._$$Timing = _k._$klass();
_pro = _p._$$Timing._$extend(_t0._$$AnimBezier);
/**
* 控件重置
*
* @protected
* @method module:util/animation/easeout._$$Timing#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
_options = _u._$merge({},_options);
this.__super(_options);
this.__polyfillRAF();
};
/**
* 重置父类的动画帧逻辑
*
* @protected
* @method module:util/animation/animation._$$Animation#__onAnimationFrame
* @param  {Number} arg0 - 时间值
* @return {Void}
*/
_pro.__onAnimationFrame = function(_time){
if (!this.__begin) return;
if ((''+_time).indexOf('.')>=0){
_time = +new Date;
}
if (this.__doAnimationFrame(_time)){
this._$stop();
return;
}
this.__timer = this.__requestAnimationFrame(
this.__onAnimationFrame._$bind(this)
);
};
_pro._$play = (function(){
var _doPlayAnim = function(){
this.__dtime = window.clearTimeout(this.__dtime);
this.__begin.time = +new Date;
this.__timer = this.__requestAnimationFrame(
this.__onAnimationFrame._$bind(this)
);
};
return function(){
this.__dtime = window.setTimeout(
_doPlayAnim._$bind(this),
this.__delay
);
};
})();
_pro._$stop = function(){
this.__timer = this.__cancelAnimationFrame(this.__timer);
this._$dispatchEvent('onstop');
};
_pro.__polyfillRAF = function(){
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
var w = {};
w.__requestAnimationFrame = window.requestAnimationFrame;
w.__cancelAnimationFrame = window.cancelAnimationFrame;
for(var x = 0; x < vendors.length && !w.__requestAnimationFrame; ++x) {
w.__requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
w.__cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
|| window[vendors[x]+'CancelRequestAnimationFrame'];
}
if (!w.__requestAnimationFrame)
w.__requestAnimationFrame = function(callback) {
var currTime = new Date().getTime();
var timeToCall = Math.max(0, 16 - (currTime - lastTime));
var id = window.setTimeout(function() { callback(currTime + timeToCall); },
timeToCall);
lastTime = currTime + timeToCall;
return id;
};
if (!w.__cancelAnimationFrame)
w.__cancelAnimationFrame = function(id) {
clearTimeout(id);
};
this.__requestAnimationFrame = function(callback){
w.__requestAnimationFrame.apply(window, arguments);
}
this.__cancelAnimationFrame = function(id){
w.__cancelAnimationFrame.apply(window, arguments);
}
};
return _p;
},7,1,2,125);
I$(115,function (_k, _ut, $, _t, _ani) {
var _p = {}, _pro;
_p._$$Slider = _k._$klass();
_pro = _p._$$Slider._$extend(_t._$$EventTarget);
/**
* 重置控件
* @String/Node box : 滚动列表对象或者选择器 如：滚动元素为li的外层ul
@object config : {
@Number width : 一次滚动宽度，默认为box里面第一个一级子元素宽度[如果子元素宽度不均匀则滚动效果会错乱]
@Number size : 列表长度，默认为box里面所有一级子元素个数[如果size不等于一级子元素个数，则不支持循环滚动]
@Boolean loop : 是否支持循环滚动 默认 true
@Boolean auto : 是否自动滚动,支持自动滚动时必须支持循环滚动，否则设置无效,默认为true
@Number slideInterval : 自动轮播一次时间间隔,默认为：3000ms
@function callback : 可选参数，每次切换一幅图后的回调
}
*/
_pro.__reset = function(config) {
this.box = $(config.box);
this.config = config||{};
this.width = this.config.width||this.box._$children()._$get(0).scrollWidth||document.body.clientWidth;//一次滚动的宽度
this.size = this.config.size||this.box._$children().length;
this.loop = (this.config.loop===undefined)||this.config.loop;//默认能循环滚动
this.auto = (this.config.auto===undefined)||this.config.auto;//默认自动滚动
this.slideInterval = this.config.slideInterval||3000;//轮播间隔
this.scrollTime = this.config.scrollTime||300;//滚动时长
this.minleft = -this.width*(this.size-1);//最小left值，注意是负数[不循环情况下的值]
this.maxleft =0;//最大lfet值[不循环情况下的值]
this.nowLeft = 0;//初始位置信息[不循环情况下的值]
this.pointX = null;//记录一个x坐标
this.pointY = null;//记录一个y坐标
this.moveLeft = false;//记录向哪边滑动
this.index = 0;
this.busy = false;
this.__touching = false; //用户是否正在进行触摸操作
this.__action = '';
this.point0 = {x:0,y:0};
this.timer;
this.init();
};
_pro.init = function(){
this.bind_event();
this.init_loop();
this.auto_scroll();
};
_pro.bind_event = function(){
var self = this;
self.box[0].parentNode.addEventListener('touchstart',function(e){
self.__touching = !0;
self.__touStartTime= +new Date();
if(e.touches.length==1 && !self.busy){
self.pointX = e.touches[0].screenX;
self.pointY = e.touches[0].screenY;
self.point0 = {x:self.pointX, y:self.pointY };
self.__action = '';
}
});
self.box[0].parentNode.addEventListener('touchmove',function(e){
if(e.touches.length==1 && !self.busy){
if ( self.move(e.touches[0].screenX,e.touches[0].screenY) ){//这里根据返回值是否阻止默认touch事件,左右滑动时需要阻止
e.preventDefault();
}
}
});
self.box[0].parentNode.addEventListener('touchend',function(e){
self.__touching = !1;
!self.busy && self.__action==='LR' && self.move_end();
self.__action = '';
});
self.box[0].parentNode.addEventListener('touchcancel',function(e){
self.__touching = !1;
self.__action = '';
});
var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange  ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function(evt){
setTimeout(function(){
self.width = self.box._$children()._$get(0).scrollWidth;
self.nowLeft = -(self.index||0) * self.width;
self.box[0].setAttribute('style',self.get_style(2));
self.minleft = -self.width*(self.size-1);
}, 200);
});
};
/*
初始化循环滚动,当一次性需要滚动多个子元素时，暂不支持循环滚动效果,
如果想实现一次性滚动多个子元素效果，可以通过页面结构实现
循环滚动思路：复制首尾节点到尾首
*/
_pro.init_loop = function(){
if(this.box._$children().length == this.size && this.loop){//暂时只支持size和子节点数相等情况的循环
this.nowLeft = -this.width;//设置初始位置信息
this.minleft = -this.width*this.size;//最小left值
this.maxleft = -this.width;
this.box._$insert(this.box._$children()._$get(this.size-1,true)._$clone(true), 'top')
._$insert(this.box._$children()._$get(1,true)._$clone(true), 'bottom');
this.box[0].setAttribute('style',this.get_style(2));
// this.box._$style('width',this.width*(this.size+2));
}else{
this.loop = false;
// this.box._$style('width',this.width*this.size);
}
};
/**
* 判断是否需要自动滚动， 在控件没有显示在可见区域时，不自动滚动
* @return {Bollean} ture 需要滚动， false不需要
*/
_pro.shouldAutoScroll = (function(){
function getWinH(){
var winH;
if(window.innerHeight) { // all except IE
winH = window.innerHeight;
}else if (window.document.body) { // other
winH = window.document.body.clientHeight;
}
return winH || 0;
};
function isInViewport(node,_winH){
var rect = node.getBoundingClientRect();
if (rect.bottom >= 0 && rect.top <= _winH) {
return true;
}
return false;
}
return function(){
return isInViewport(this.box[0], getWinH());
}
})();
_pro.auto_scroll = function(){//自动滚动
var self = this;
if(!self.loop || !self.auto)return;
clearTimeout(self.timer);
self.timer = setTimeout(function(){
//仅仅在用户没有手工拖动时自动轮播到下一张
//用户手工拖动时则直接跳过自动轮播，重新设置定时器
if (self.__touching) {
self.auto_scroll();
}else{
if (self.shouldAutoScroll()) {
self.go_index(self.index+1, null, true);
}else{
self.auto_scroll();
}
}
},self.slideInterval);
};
_pro.go_index = function(ind, touched, auto){//滚动到指定索引页面
var self = this;
if(self.busy)return;
clearTimeout(self.timer);
self.busy = true;
if(self.loop){//如果循环
ind = ind<0?-1:ind;
ind = ind>self.size?self.size:ind;
}else{
ind = ind<0?0:ind;
ind = ind>=self.size?(self.size-1):ind;
}
if(!self.loop && (self.nowLeft == -(self.width*ind))){
self.complete(ind);
}else if(self.loop && (self.nowLeft == -self.width*(ind+1))){
self.complete(ind);
}else{
var fromLeft = self.nowLeft;
if(ind == -1 || ind == self.size){//循环滚动边界
self.index = ind==-1?(self.size-1):0;
self.nowLeft = ind==-1?0:-self.width*(self.size+1);
}else{
self.index = ind;
self.nowLeft = -(self.width*(self.index+(self.loop?1:0)));
}
var _newScrollTime = 0;
if (touched && self.__touStartTime) {
try{
var moveTime = (+new Date())-self.__touStartTime;
_newScrollTime = 0.9*Math.abs(fromLeft-self.nowLeft) * moveTime /(self.width - Math.abs(fromLeft-self.nowLeft)+1) ;
_newScrollTime = (self.width - Math.abs(fromLeft-self.nowLeft)+1)<30 ? 300 : _newScrollTime;
_newScrollTime = _newScrollTime < 150 ? 150 : _newScrollTime;
_newScrollTime = _newScrollTime > self.scrollTime*1.5 ? self.scrollTime*1.5 : _newScrollTime;
}catch(e){
_newScrollTime = 0;
}
}
var timingFunc = !!auto ? 'cubic-bezier(.67,.17,.52,.97)':'easeout';
var _easeout = _ani._$$Timing._$allocate({
timing: timingFunc,
from: {
offset: fromLeft
},
to: {
offset: self.nowLeft
},
duration: _newScrollTime||self.scrollTime,
onupdate: function(_evt){
self.nowLeft = _evt.offset;
self.box[0].setAttribute('style',self.get_style(2));
},
onstop: function(){
_easeout._$recycle();
self.complete(ind);
}
});
_easeout._$play();
}
};
_pro.complete = function(ind){//动画完成回调
var self = this;
self.busy = false;
self.config.callback && self.config.callback(self.index);
if(ind==-1){
self.nowLeft = self.minleft;
}else if(ind==self.size){
self.nowLeft = self.maxleft;
}
self.box[0].setAttribute('style',self.get_style(2));
self.auto_scroll();
};
_pro.next = function(){//下一页滚动
if(!this.busy){
this.go_index(this.index+1);
}
};
_pro.prev = function(){//上一页滚动
if(!this.busy){
this.go_index(this.index-1);
}
};
_pro.move = function(pointX,pointY){//滑动屏幕处理函数
// this.log('action: '+ this.__action);
var changeX = pointX - (this.pointX===null?pointX:this.pointX),
changeY = pointY - (this.pointY===null?pointY:this.pointY),
marginleft = this.nowLeft, return_value = false;
if (this.__action==='UD') {
return false;
}else{
return_value = true;
}
this.nowLeft = marginleft+changeX;
this.moveLeft = changeX<0;
if ( !this.__action ){ //滑动屏幕角度范围：45度
var dx = Math.abs(pointX - this.point0.x),
dy = Math.abs(pointY - this.point0.y);
if (dx>5 || dy>5) {
if (  dx > dy ) {
this.__action = 'LR';
return_value = true;
}else{
this.__action = 'UD';
return false;
}
}else{
//ios safari 如果此时阻止默认行为会导致后续上下滚动存在问题
return false
}
}
this.pointX = pointX;
this.pointY = pointY;
this.box[0].setAttribute('style',this.get_style(2));
return return_value;
};
_pro.move_end = function(){
var changeX = this.nowLeft%this.width,ind;
if(this.nowLeft<this.minleft){//手指向左滑动
ind = this.index +1;
}else if(this.nowLeft>this.maxleft){//手指向右滑动
ind = this.index-1;
}else if(changeX!==0){
if(this.moveLeft){//手指向左滑动
ind = this.index+1;
}else{//手指向右滑动
ind = this.index-1;
}
}else{
ind = this.index;
}
this.pointX = this.pointY = null;
this.go_index(ind, true);
};
/*
获取动画样式，要兼容更多浏览器，可以扩展该方法
@int fig : 1 动画 2  没动画
*/
_pro.get_style = function(fig){
var x = this.nowLeft ,
time = fig==1?this.scrollTime:0;
return '-webkit-transition:'+'-webkit-transform '+time+'ms;'+
'-webkit-transform:'+'translate3d('+x+'px,0,0);'+
'-webkit-backface-visibility;'+'hidden;'+
'transition:'+'transform '+time+'ms ease-out;'+
'transform:'+'translate3d('+x+'px,0,0);';
};
return _p._$$Slider;
},1,2,87,20,124);
I$(127,"<div class=\"m-gotop-wrap {{_status||''}} {{iconup}} {{_inapp?'inapp':''}}\" on-click={{this.gotop()}}> <div class=\"ic-gotop\"> \t<i class=\"up\"></i> \t<p class=\"desc\">顶部</p> </div> </div>");
I$(116,function (tpl, R, _q, _,_a) {
var Gotop = Regular.extend({
template: tpl,
init: function(){
this.data._status = '';
this.data._inapp = this.__isinApp();
var debounceScroll =  _.debounce(this.windowScroll._$bind(this), 150, false);
_q(window)._$on('scroll',debounceScroll);
debounceScroll();
this.$emit('show', !!this.data._status?1:0);
},
windowScroll: function(){
//因为已经定义了body，html的高度为100%， body滚动时会可以整个滚出vieport
var bodyrect = document.body.getBoundingClientRect();
if ( bodyrect.bottom<0 && !this.data._status) {
this.data._status = 'show';
this.$emit('show', 1);
this.$update();
}else if(bodyrect.bottom>=0  && this.data._status){
this.data._status = '';
this.$emit('show', 0);
this.$update();
}
},
/**
* 返回gotop当前是否已经显示，
* true: 已显示
* false: 未显示
*/
isShown : function(){
return this.data._status==='show';
},
//有banner时把icon往上往65像素
$iconUp:function(){
this.data.iconup ='iconup';
this.$update();
},
$iconDown:function(){
this.data.iconup ='';
this.$update();
},
gotop: function(){
var _easeout  = _a._$$Timing._$allocate({
timing: 'easeout',
from:{
offset:200
},
to:{
offset:0
},
duration:200,
onupdate:function(_event){
window.scrollTo(0,_event.offset);
},
onstop:function(){
_easeout._$recycle();
}
});
// 开始动画
window.scrollTo(0,200);
_easeout._$play();
},
__isinApp: function(){
return window.__isKaolaApp===1;
}
});
//为gotop创建方法, 将对象的创建工作延迟到插入时才执行
Gotop._$create = (function(){
var gotop;
return function(node){
if (!gotop) {
gotop = new Gotop();
};
gotop.$inject(node);
return gotop;
}
})();
return Gotop;
},127,65,87,74,124);
I$(128,"{{#if _fold}} <div class=\"m-activitynav-btn\"  on-touchstart={{this.prevDefault($event)}} on-touchend={{this.toggleFold()}} on-click={{this.prevDefault($event)}} style=\"{{this.getRgbaBG(0)}}\"> \t<p class=\"tit\" r-html={{this.getParseName(_itemlist[0][0].config.enteryName)}}></p> \t<div class=\"arr\"/> </div> {{#else}} <div class=\"m-activitynav\" on-touchmove={{this.prevDefault($event)}} on-touchstart={{this.prevDefault($event)}} on-click={{this.prevDefault($event)}}> \t<div class=\"mask {{_contentShow? 'show':''}}\" on-touchend={{this.toggleFold()}} /> \t<div class=\"conts {{_contentShow? 'show':''}}\" style=\"{{this.getRgbaBG(1)}}; {{!!_itemlist[0][0].config.title?'':'padding-top:30px;'}}\"> \t\t<div class=\"close\" on-touchend={{this.toggleFold()}}> \t\t\t<div class=\"sk\"></div> \t\t\t<div class=\"rect\"></div> \t\t\t<div class=\"arr\"></div> \t\t</div> \t\t{{#if !!_itemlist[0][0].config.title}} \t\t<div class=\"titwrap\"> \t\t\t<div class=\"tit\">{{_itemlist[0][0].config.title}}</div> \t\t</div> \t\t{{/if}} \t\t<div class=\"itemswrap\" ref=\"items\" style=\"max-height: {{_maxHeight}}px\"> \t\t<div class=\"items\"> \t\t\t{{#list _itemlist as item}} \t\t\t<div class=\"linewrap\"> \t\t\t<ul class=\"line line-{{item[0].config.showType}}\"> \t\t\t\t{{#list item as ad}} \t\t\t\t<li class=\"item\"> \t\t\t\t\t<a class=\"u-img-wrapper\"  on-click={{this.prevDefault($event)}} on-tap={{this.gotolink(ad.siteUrl, $event, ad.listIdx)}}> \t\t\t\t\t\t<img src=\"{{ad.imageUrl|thumbnail:600/ad.config.showType}}\"> \t\t\t\t\t</a> \t\t\t\t</li> \t\t\t\t{{/list}} \t\t\t</ul> \t\t\t</div> \t\t\t{{/list}} \t\t</div> \t\t</div> \t\t<div class=\"action\"> \t\t\t<a class=\"go\" on-click={{this.prevDefault($event)}}  on-touchend={{this.gotolink(_itemlist[0][0].config.actionUrl, $event, 9999)}}>{{_itemlist[0][0].config.actionName||''}}</a> \t\t</div> \t</div> </div> {{/if}}");
I$(129,function (){
var rAF = window.requestAnimationFrame	||
window.webkitRequestAnimationFrame	||
window.mozRequestAnimationFrame		||
window.oRequestAnimationFrame		||
window.msRequestAnimationFrame		||
function (callback) { window.setTimeout(callback, 1000 / 60); };
var utils = (function () {
var me = {};
var _elementStyle = document.createElement('div').style;
var _vendor = (function () {
var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
transform,
i = 0,
l = vendors.length;
for ( ; i < l; i++ ) {
transform = vendors[i] + 'ransform';
if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
}
return false;
})();
function _prefixStyle (style) {
if ( _vendor === false ) return false;
if ( _vendor === '' ) return style;
return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
me.getTime = Date.now || function getTime () { return new Date().getTime(); };
me.extend = function (target, obj) {
for ( var i in obj ) {
target[i] = obj[i];
}
};
me.addEvent = function (el, type, fn, capture) {
el.addEventListener(type, fn, !!capture);
};
me.removeEvent = function (el, type, fn, capture) {
el.removeEventListener(type, fn, !!capture);
};
me.prefixPointerEvent = function (pointerEvent) {
return window.MSPointerEvent ?
'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10):
pointerEvent;
};
me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
var distance = current - start,
speed = Math.abs(distance) / time,
destination,
duration;
deceleration = deceleration === undefined ? 0.0006 : deceleration;
destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
duration = speed / deceleration;
if ( destination < lowerMargin ) {
destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
distance = Math.abs(destination - current);
duration = distance / speed;
} else if ( destination > 0 ) {
destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
distance = Math.abs(current) + destination;
duration = distance / speed;
}
return {
destination: Math.round(destination),
duration: duration
};
};
var _transform = _prefixStyle('transform');
me.extend(me, {
hasTransform: _transform !== false,
hasPerspective: _prefixStyle('perspective') in _elementStyle,
hasTouch: 'ontouchstart' in window,
hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
hasTransition: _prefixStyle('transition') in _elementStyle
});
// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));
me.extend(me.style = {}, {
transform: _transform,
transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
transitionDuration: _prefixStyle('transitionDuration'),
transitionDelay: _prefixStyle('transitionDelay'),
transformOrigin: _prefixStyle('transformOrigin')
});
me.hasClass = function (e, c) {
var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
return re.test(e.className);
};
me.addClass = function (e, c) {
if ( me.hasClass(e, c) ) {
return;
}
var newclass = e.className.split(' ');
newclass.push(c);
e.className = newclass.join(' ');
};
me.removeClass = function (e, c) {
if ( !me.hasClass(e, c) ) {
return;
}
var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
e.className = e.className.replace(re, ' ');
};
me.offset = function (el) {
var left = -el.offsetLeft,
top = -el.offsetTop;
// jshint -W084
while (el = el.offsetParent) {
left -= el.offsetLeft;
top -= el.offsetTop;
}
// jshint +W084
return {
left: left,
top: top
};
};
me.preventDefaultException = function (el, exceptions) {
for ( var i in exceptions ) {
if ( exceptions[i].test(el[i]) ) {
return true;
}
}
return false;
};
me.extend(me.eventType = {}, {
touchstart: 1,
touchmove: 1,
touchend: 1,
mousedown: 2,
mousemove: 2,
mouseup: 2,
pointerdown: 3,
pointermove: 3,
pointerup: 3,
MSPointerDown: 3,
MSPointerMove: 3,
MSPointerUp: 3
});
me.extend(me.ease = {}, {
quadratic: {
style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
fn: function (k) {
return k * ( 2 - k );
}
},
circular: {
style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
fn: function (k) {
return Math.sqrt( 1 - ( --k * k ) );
}
},
back: {
style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
fn: function (k) {
var b = 4;
return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
}
},
bounce: {
style: '',
fn: function (k) {
if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
return 7.5625 * k * k;
} else if ( k < ( 2 / 2.75 ) ) {
return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
} else if ( k < ( 2.5 / 2.75 ) ) {
return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
} else {
return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
}
}
},
elastic: {
style: '',
fn: function (k) {
var f = 0.22,
e = 0.4;
if ( k === 0 ) { return 0; }
if ( k == 1 ) { return 1; }
return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
}
}
});
me.tap = function (e, eventName) {
var ev = document.createEvent('Event');
ev.initEvent(eventName, true, true);
ev.pageX = e.pageX;
ev.pageY = e.pageY;
e.target.dispatchEvent(ev);
};
me.click = function (e) {
var target = e.target,
ev;
if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
ev = document.createEvent('MouseEvents');
ev.initMouseEvent('click', true, true, e.view, 1,
target.screenX, target.screenY, target.clientX, target.clientY,
e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
0, null);
ev._constructed = true;
target.dispatchEvent(ev);
}
};
return me;
})();
function IScroll (el, options) {
this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
this.scroller = this.wrapper.children[0];
this.scrollerStyle = this.scroller.style;		// cache style for better performance
this.options = {
resizeScrollbars: true,
mouseWheelSpeed: 20,
snapThreshold: 0.334,
// INSERT POINT: OPTIONS
startX: 0,
startY: 0,
scrollY: true,
directionLockThreshold: 5,
momentum: true,
bounce: true,
bounceTime: 600,
bounceEasing: '',
preventDefault: true,
preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
HWCompositing: true,
useTransition: true,
useTransform: true
};
for ( var i in options ) {
this.options[i] = options[i];
}
// Normalize options
this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';
this.options.useTransition = utils.hasTransition && this.options.useTransition;
this.options.useTransform = utils.hasTransform && this.options.useTransform;
this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
// If you want eventPassthrough I have to lock one of the axes
this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;
// With eventPassthrough we also need lockDirection mechanism
this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;
this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
if ( this.options.tap === true ) {
this.options.tap = 'tap';
}
if ( this.options.shrinkScrollbars == 'scale' ) {
this.options.useTransition = false;
}
this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
// INSERT POINT: NORMALIZATION
// Some defaults
this.x = 0;
this.y = 0;
this.directionX = 0;
this.directionY = 0;
this._events = {};
// INSERT POINT: DEFAULTS
this._init();
this.refresh();
this.scrollTo(this.options.startX, this.options.startY);
this.enable();
}
IScroll.prototype = {
version: '5.1.3',
_init: function () {
this._initEvents();
if ( this.options.scrollbars || this.options.indicators ) {
this._initIndicators();
}
if ( this.options.mouseWheel ) {
this._initWheel();
}
if ( this.options.snap ) {
this._initSnap();
}
if ( this.options.keyBindings ) {
this._initKeys();
}
// INSERT POINT: _init
},
destroy: function () {
this._initEvents(true);
this._execEvent('destroy');
},
_transitionEnd: function (e) {
if ( e.target != this.scroller || !this.isInTransition ) {
return;
}
this._transitionTime();
if ( !this.resetPosition(this.options.bounceTime) ) {
this.isInTransition = false;
this._execEvent('scrollEnd');
}
},
_start: function (e) {
// React to left mouse button only
if ( utils.eventType[e.type] != 1 ) {
if ( e.button !== 0 ) {
return;
}
}
if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
return;
}
if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
e.preventDefault();
}
var point = e.touches ? e.touches[0] : e,
pos;
this.initiated	= utils.eventType[e.type];
this.moved		= false;
this.distX		= 0;
this.distY		= 0;
this.directionX = 0;
this.directionY = 0;
this.directionLocked = 0;
this._transitionTime();
this.startTime = utils.getTime();
if ( this.options.useTransition && this.isInTransition ) {
this.isInTransition = false;
pos = this.getComputedPosition();
this._translate(Math.round(pos.x), Math.round(pos.y));
this._execEvent('scrollEnd');
} else if ( !this.options.useTransition && this.isAnimating ) {
this.isAnimating = false;
this._execEvent('scrollEnd');
}
this.startX    = this.x;
this.startY    = this.y;
this.absStartX = this.x;
this.absStartY = this.y;
this.pointX    = point.pageX;
this.pointY    = point.pageY;
this._execEvent('beforeScrollStart');
},
_move: function (e) {
if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
return;
}
if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
e.preventDefault();
}
var point		= e.touches ? e.touches[0] : e,
deltaX		= point.pageX - this.pointX,
deltaY		= point.pageY - this.pointY,
timestamp	= utils.getTime(),
newX, newY,
absDistX, absDistY;
this.pointX		= point.pageX;
this.pointY		= point.pageY;
this.distX		+= deltaX;
this.distY		+= deltaY;
absDistX		= Math.abs(this.distX);
absDistY		= Math.abs(this.distY);
// We need to move at least 10 pixels for the scrolling to initiate
if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
return;
}
// If you are scrolling in one direction lock the other
if ( !this.directionLocked && !this.options.freeScroll ) {
if ( absDistX > absDistY + this.options.directionLockThreshold ) {
this.directionLocked = 'h';		// lock horizontally
} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
this.directionLocked = 'v';		// lock vertically
} else {
this.directionLocked = 'n';		// no lock
}
}
if ( this.directionLocked == 'h' ) {
if ( this.options.eventPassthrough == 'vertical' ) {
e.preventDefault();
} else if ( this.options.eventPassthrough == 'horizontal' ) {
this.initiated = false;
return;
}
deltaY = 0;
} else if ( this.directionLocked == 'v' ) {
if ( this.options.eventPassthrough == 'horizontal' ) {
e.preventDefault();
} else if ( this.options.eventPassthrough == 'vertical' ) {
this.initiated = false;
return;
}
deltaX = 0;
}
deltaX = this.hasHorizontalScroll ? deltaX : 0;
deltaY = this.hasVerticalScroll ? deltaY : 0;
newX = this.x + deltaX;
newY = this.y + deltaY;
// Slow down if outside of the boundaries
if ( newX > 0 || newX < this.maxScrollX ) {
newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
}
if ( newY > 0 || newY < this.maxScrollY ) {
newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
}
this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
if ( !this.moved ) {
this._execEvent('scrollStart');
}
this.moved = true;
this._translate(newX, newY);
/* REPLACE START: _move */
if ( timestamp - this.startTime > 300 ) {
this.startTime = timestamp;
this.startX = this.x;
this.startY = this.y;
}
/* REPLACE END: _move */
},
_end: function (e) {
if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
return;
}
if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
e.preventDefault();
}
var point = e.changedTouches ? e.changedTouches[0] : e,
momentumX,
momentumY,
duration = utils.getTime() - this.startTime,
newX = Math.round(this.x),
newY = Math.round(this.y),
distanceX = Math.abs(newX - this.startX),
distanceY = Math.abs(newY - this.startY),
time = 0,
easing = '';
this.isInTransition = 0;
this.initiated = 0;
this.endTime = utils.getTime();
// reset if we are outside of the boundaries
if ( this.resetPosition(this.options.bounceTime) ) {
return;
}
this.scrollTo(newX, newY);	// ensures that the last position is rounded
// we scrolled less than 10 pixels
if ( !this.moved ) {
if ( this.options.tap ) {
utils.tap(e, this.options.tap);
}
if ( this.options.click ) {
utils.click(e);
}
this._execEvent('scrollCancel');
return;
}
if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
this._execEvent('flick');
return;
}
// start momentum animation if needed
if ( this.options.momentum && duration < 300 ) {
momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
newX = momentumX.destination;
newY = momentumY.destination;
time = Math.max(momentumX.duration, momentumY.duration);
this.isInTransition = 1;
}
if ( this.options.snap ) {
var snap = this._nearestSnap(newX, newY);
this.currentPage = snap;
time = this.options.snapSpeed || Math.max(
Math.max(
Math.min(Math.abs(newX - snap.x), 1000),
Math.min(Math.abs(newY - snap.y), 1000)
), 300);
newX = snap.x;
newY = snap.y;
this.directionX = 0;
this.directionY = 0;
easing = this.options.bounceEasing;
}
// INSERT POINT: _end
if ( newX != this.x || newY != this.y ) {
// change easing function when scroller goes out of the boundaries
if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
easing = utils.ease.quadratic;
}
this.scrollTo(newX, newY, time, easing);
return;
}
this._execEvent('scrollEnd');
},
_resize: function () {
var that = this;
clearTimeout(this.resizeTimeout);
this.resizeTimeout = setTimeout(function () {
that.refresh();
}, this.options.resizePolling);
},
resetPosition: function (time) {
var x = this.x,
y = this.y;
time = time || 0;
if ( !this.hasHorizontalScroll || this.x > 0 ) {
x = 0;
} else if ( this.x < this.maxScrollX ) {
x = this.maxScrollX;
}
if ( !this.hasVerticalScroll || this.y > 0 ) {
y = 0;
} else if ( this.y < this.maxScrollY ) {
y = this.maxScrollY;
}
if ( x == this.x && y == this.y ) {
return false;
}
this.scrollTo(x, y, time, this.options.bounceEasing);
return true;
},
disable: function () {
this.enabled = false;
},
enable: function () {
this.enabled = true;
},
refresh: function () {
var rf = this.wrapper.offsetHeight;		// Force reflow
this.wrapperWidth	= this.wrapper.clientWidth;
this.wrapperHeight	= this.wrapper.clientHeight;
/* REPLACE START: refresh */
this.scrollerWidth	= this.scroller.offsetWidth;
this.scrollerHeight	= this.scroller.offsetHeight;
this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;
/* REPLACE END: refresh */
this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;
if ( !this.hasHorizontalScroll ) {
this.maxScrollX = 0;
this.scrollerWidth = this.wrapperWidth;
}
if ( !this.hasVerticalScroll ) {
this.maxScrollY = 0;
this.scrollerHeight = this.wrapperHeight;
}
this.endTime = 0;
this.directionX = 0;
this.directionY = 0;
this.wrapperOffset = utils.offset(this.wrapper);
this._execEvent('refresh');
this.resetPosition();
// INSERT POINT: _refresh
},
on: function (type, fn) {
if ( !this._events[type] ) {
this._events[type] = [];
}
this._events[type].push(fn);
},
off: function (type, fn) {
if ( !this._events[type] ) {
return;
}
var index = this._events[type].indexOf(fn);
if ( index > -1 ) {
this._events[type].splice(index, 1);
}
},
_execEvent: function (type) {
if ( !this._events[type] ) {
return;
}
var i = 0,
l = this._events[type].length;
if ( !l ) {
return;
}
for ( ; i < l; i++ ) {
this._events[type][i].apply(this, [].slice.call(arguments, 1));
}
},
scrollBy: function (x, y, time, easing) {
x = this.x + x;
y = this.y + y;
time = time || 0;
this.scrollTo(x, y, time, easing);
},
scrollTo: function (x, y, time, easing) {
easing = easing || utils.ease.circular;
this.isInTransition = this.options.useTransition && time > 0;
if ( !time || (this.options.useTransition && easing.style) ) {
this._transitionTimingFunction(easing.style);
this._transitionTime(time);
this._translate(x, y);
} else {
this._animate(x, y, time, easing.fn);
}
},
scrollToElement: function (el, time, offsetX, offsetY, easing) {
el = el.nodeType ? el : this.scroller.querySelector(el);
if ( !el ) {
return;
}
var pos = utils.offset(el);
pos.left -= this.wrapperOffset.left;
pos.top  -= this.wrapperOffset.top;
// if offsetX/Y are true we center the element to the screen
if ( offsetX === true ) {
offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
}
if ( offsetY === true ) {
offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
}
pos.left -= offsetX || 0;
pos.top  -= offsetY || 0;
pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;
time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;
this.scrollTo(pos.left, pos.top, time, easing);
},
_transitionTime: function (time) {
time = time || 0;
this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';
if ( !time && utils.isBadAndroid ) {
this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
}
if ( this.indicators ) {
for ( var i = this.indicators.length; i--; ) {
this.indicators[i].transitionTime(time);
}
}
// INSERT POINT: _transitionTime
},
_transitionTimingFunction: function (easing) {
this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
if ( this.indicators ) {
for ( var i = this.indicators.length; i--; ) {
this.indicators[i].transitionTimingFunction(easing);
}
}
// INSERT POINT: _transitionTimingFunction
},
_translate: function (x, y) {
if ( this.options.useTransform ) {
/* REPLACE START: _translate */
this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
/* REPLACE END: _translate */
} else {
x = Math.round(x);
y = Math.round(y);
this.scrollerStyle.left = x + 'px';
this.scrollerStyle.top = y + 'px';
}
this.x = x;
this.y = y;
if ( this.indicators ) {
for ( var i = this.indicators.length; i--; ) {
this.indicators[i].updatePosition();
}
}
// INSERT POINT: _translate
},
_initEvents: function (remove) {
var eventType = remove ? utils.removeEvent : utils.addEvent,
target = this.options.bindToWrapper ? this.wrapper : window;
eventType(window, 'orientationchange', this);
eventType(window, 'resize', this);
if ( this.options.click ) {
eventType(this.wrapper, 'click', this, true);
}
if ( !this.options.disableMouse ) {
eventType(this.wrapper, 'mousedown', this);
eventType(target, 'mousemove', this);
eventType(target, 'mousecancel', this);
eventType(target, 'mouseup', this);
}
if ( utils.hasPointer && !this.options.disablePointer ) {
eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
eventType(target, utils.prefixPointerEvent('pointermove'), this);
eventType(target, utils.prefixPointerEvent('pointercancel'), this);
eventType(target, utils.prefixPointerEvent('pointerup'), this);
}
if ( utils.hasTouch && !this.options.disableTouch ) {
eventType(this.wrapper, 'touchstart', this);
eventType(target, 'touchmove', this);
eventType(target, 'touchcancel', this);
eventType(target, 'touchend', this);
}
eventType(this.scroller, 'transitionend', this);
eventType(this.scroller, 'webkitTransitionEnd', this);
eventType(this.scroller, 'oTransitionEnd', this);
eventType(this.scroller, 'MSTransitionEnd', this);
},
getComputedPosition: function () {
var matrix = window.getComputedStyle(this.scroller, null),
x, y;
if ( this.options.useTransform ) {
matrix = matrix[utils.style.transform].split(')')[0].split(', ');
x = +(matrix[12] || matrix[4]);
y = +(matrix[13] || matrix[5]);
} else {
x = +matrix.left.replace(/[^-\d.]/g, '');
y = +matrix.top.replace(/[^-\d.]/g, '');
}
return { x: x, y: y };
},
_initIndicators: function () {
var interactive = this.options.interactiveScrollbars,
customStyle = typeof this.options.scrollbars != 'string',
indicators = [],
indicator;
var that = this;
this.indicators = [];
if ( this.options.scrollbars ) {
// Vertical scrollbar
if ( this.options.scrollY ) {
indicator = {
el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
interactive: interactive,
defaultScrollbars: true,
customStyle: customStyle,
resize: this.options.resizeScrollbars,
shrink: this.options.shrinkScrollbars,
fade: this.options.fadeScrollbars,
listenX: false
};
this.wrapper.appendChild(indicator.el);
indicators.push(indicator);
}
// Horizontal scrollbar
if ( this.options.scrollX ) {
indicator = {
el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
interactive: interactive,
defaultScrollbars: true,
customStyle: customStyle,
resize: this.options.resizeScrollbars,
shrink: this.options.shrinkScrollbars,
fade: this.options.fadeScrollbars,
listenY: false
};
this.wrapper.appendChild(indicator.el);
indicators.push(indicator);
}
}
if ( this.options.indicators ) {
// TODO: check concat compatibility
indicators = indicators.concat(this.options.indicators);
}
for ( var i = indicators.length; i--; ) {
this.indicators.push( new Indicator(this, indicators[i]) );
}
// TODO: check if we can use array.map (wide compatibility and performance issues)
function _indicatorsMap (fn) {
for ( var i = that.indicators.length; i--; ) {
fn.call(that.indicators[i]);
}
}
if ( this.options.fadeScrollbars ) {
this.on('scrollEnd', function () {
_indicatorsMap(function () {
this.fade();
});
});
this.on('scrollCancel', function () {
_indicatorsMap(function () {
this.fade();
});
});
this.on('scrollStart', function () {
_indicatorsMap(function () {
this.fade(1);
});
});
this.on('beforeScrollStart', function () {
_indicatorsMap(function () {
this.fade(1, true);
});
});
}
this.on('refresh', function () {
_indicatorsMap(function () {
this.refresh();
});
});
this.on('destroy', function () {
_indicatorsMap(function () {
this.destroy();
});
delete this.indicators;
});
},
_initWheel: function () {
utils.addEvent(this.wrapper, 'wheel', this);
utils.addEvent(this.wrapper, 'mousewheel', this);
utils.addEvent(this.wrapper, 'DOMMouseScroll', this);
this.on('destroy', function () {
utils.removeEvent(this.wrapper, 'wheel', this);
utils.removeEvent(this.wrapper, 'mousewheel', this);
utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
});
},
_wheel: function (e) {
if ( !this.enabled ) {
return;
}
e.preventDefault();
e.stopPropagation();
var wheelDeltaX, wheelDeltaY,
newX, newY,
that = this;
if ( this.wheelTimeout === undefined ) {
that._execEvent('scrollStart');
}
// Execute the scrollEnd event after 400ms the wheel stopped scrolling
clearTimeout(this.wheelTimeout);
this.wheelTimeout = setTimeout(function () {
that._execEvent('scrollEnd');
that.wheelTimeout = undefined;
}, 400);
if ( 'deltaX' in e ) {
if (e.deltaMode === 1) {
wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
} else {
wheelDeltaX = -e.deltaX;
wheelDeltaY = -e.deltaY;
}
} else if ( 'wheelDeltaX' in e ) {
wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
} else if ( 'wheelDelta' in e ) {
wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
} else if ( 'detail' in e ) {
wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
} else {
return;
}
wheelDeltaX *= this.options.invertWheelDirection;
wheelDeltaY *= this.options.invertWheelDirection;
if ( !this.hasVerticalScroll ) {
wheelDeltaX = wheelDeltaY;
wheelDeltaY = 0;
}
if ( this.options.snap ) {
newX = this.currentPage.pageX;
newY = this.currentPage.pageY;
if ( wheelDeltaX > 0 ) {
newX--;
} else if ( wheelDeltaX < 0 ) {
newX++;
}
if ( wheelDeltaY > 0 ) {
newY--;
} else if ( wheelDeltaY < 0 ) {
newY++;
}
this.goToPage(newX, newY);
return;
}
newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);
if ( newX > 0 ) {
newX = 0;
} else if ( newX < this.maxScrollX ) {
newX = this.maxScrollX;
}
if ( newY > 0 ) {
newY = 0;
} else if ( newY < this.maxScrollY ) {
newY = this.maxScrollY;
}
this.scrollTo(newX, newY, 0);
// INSERT POINT: _wheel
},
_initSnap: function () {
this.currentPage = {};
if ( typeof this.options.snap == 'string' ) {
this.options.snap = this.scroller.querySelectorAll(this.options.snap);
}
this.on('refresh', function () {
var i = 0, l,
m = 0, n,
cx, cy,
x = 0, y,
stepX = this.options.snapStepX || this.wrapperWidth,
stepY = this.options.snapStepY || this.wrapperHeight,
el;
this.pages = [];
if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
return;
}
if ( this.options.snap === true ) {
cx = Math.round( stepX / 2 );
cy = Math.round( stepY / 2 );
while ( x > -this.scrollerWidth ) {
this.pages[i] = [];
l = 0;
y = 0;
while ( y > -this.scrollerHeight ) {
this.pages[i][l] = {
x: Math.max(x, this.maxScrollX),
y: Math.max(y, this.maxScrollY),
width: stepX,
height: stepY,
cx: x - cx,
cy: y - cy
};
y -= stepY;
l++;
}
x -= stepX;
i++;
}
} else {
el = this.options.snap;
l = el.length;
n = -1;
for ( ; i < l; i++ ) {
if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
m = 0;
n++;
}
if ( !this.pages[m] ) {
this.pages[m] = [];
}
x = Math.max(-el[i].offsetLeft, this.maxScrollX);
y = Math.max(-el[i].offsetTop, this.maxScrollY);
cx = x - Math.round(el[i].offsetWidth / 2);
cy = y - Math.round(el[i].offsetHeight / 2);
this.pages[m][n] = {
x: x,
y: y,
width: el[i].offsetWidth,
height: el[i].offsetHeight,
cx: cx,
cy: cy
};
if ( x > this.maxScrollX ) {
m++;
}
}
}
this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
// Update snap threshold if needed
if ( this.options.snapThreshold % 1 === 0 ) {
this.snapThresholdX = this.options.snapThreshold;
this.snapThresholdY = this.options.snapThreshold;
} else {
this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
}
});
this.on('flick', function () {
var time = this.options.snapSpeed || Math.max(
Math.max(
Math.min(Math.abs(this.x - this.startX), 1000),
Math.min(Math.abs(this.y - this.startY), 1000)
), 300);
this.goToPage(
this.currentPage.pageX + this.directionX,
this.currentPage.pageY + this.directionY,
time
);
});
},
_nearestSnap: function (x, y) {
if ( !this.pages.length ) {
return { x: 0, y: 0, pageX: 0, pageY: 0 };
}
var i = 0,
l = this.pages.length,
m = 0;
// Check if we exceeded the snap threshold
if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
Math.abs(y - this.absStartY) < this.snapThresholdY ) {
return this.currentPage;
}
if ( x > 0 ) {
x = 0;
} else if ( x < this.maxScrollX ) {
x = this.maxScrollX;
}
if ( y > 0 ) {
y = 0;
} else if ( y < this.maxScrollY ) {
y = this.maxScrollY;
}
for ( ; i < l; i++ ) {
if ( x >= this.pages[i][0].cx ) {
x = this.pages[i][0].x;
break;
}
}
l = this.pages[i].length;
for ( ; m < l; m++ ) {
if ( y >= this.pages[0][m].cy ) {
y = this.pages[0][m].y;
break;
}
}
if ( i == this.currentPage.pageX ) {
i += this.directionX;
if ( i < 0 ) {
i = 0;
} else if ( i >= this.pages.length ) {
i = this.pages.length - 1;
}
x = this.pages[i][0].x;
}
if ( m == this.currentPage.pageY ) {
m += this.directionY;
if ( m < 0 ) {
m = 0;
} else if ( m >= this.pages[0].length ) {
m = this.pages[0].length - 1;
}
y = this.pages[0][m].y;
}
return {
x: x,
y: y,
pageX: i,
pageY: m
};
},
goToPage: function (x, y, time, easing) {
easing = easing || this.options.bounceEasing;
if ( x >= this.pages.length ) {
x = this.pages.length - 1;
} else if ( x < 0 ) {
x = 0;
}
if ( y >= this.pages[x].length ) {
y = this.pages[x].length - 1;
} else if ( y < 0 ) {
y = 0;
}
var posX = this.pages[x][y].x,
posY = this.pages[x][y].y;
time = time === undefined ? this.options.snapSpeed || Math.max(
Math.max(
Math.min(Math.abs(posX - this.x), 1000),
Math.min(Math.abs(posY - this.y), 1000)
), 300) : time;
this.currentPage = {
x: posX,
y: posY,
pageX: x,
pageY: y
};
this.scrollTo(posX, posY, time, easing);
},
next: function (time, easing) {
var x = this.currentPage.pageX,
y = this.currentPage.pageY;
x++;
if ( x >= this.pages.length && this.hasVerticalScroll ) {
x = 0;
y++;
}
this.goToPage(x, y, time, easing);
},
prev: function (time, easing) {
var x = this.currentPage.pageX,
y = this.currentPage.pageY;
x--;
if ( x < 0 && this.hasVerticalScroll ) {
x = 0;
y--;
}
this.goToPage(x, y, time, easing);
},
_initKeys: function (e) {
// default key bindings
var keys = {
pageUp: 33,
pageDown: 34,
end: 35,
home: 36,
left: 37,
up: 38,
right: 39,
down: 40
};
var i;
// if you give me characters I give you keycode
if ( typeof this.options.keyBindings == 'object' ) {
for ( i in this.options.keyBindings ) {
if ( typeof this.options.keyBindings[i] == 'string' ) {
this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
}
}
} else {
this.options.keyBindings = {};
}
for ( i in keys ) {
this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
}
utils.addEvent(window, 'keydown', this);
this.on('destroy', function () {
utils.removeEvent(window, 'keydown', this);
});
},
_key: function (e) {
if ( !this.enabled ) {
return;
}
var snap = this.options.snap,	// we are using this alot, better to cache it
newX = snap ? this.currentPage.pageX : this.x,
newY = snap ? this.currentPage.pageY : this.y,
now = utils.getTime(),
prevTime = this.keyTime || 0,
acceleration = 0.250,
pos;
if ( this.options.useTransition && this.isInTransition ) {
pos = this.getComputedPosition();
this._translate(Math.round(pos.x), Math.round(pos.y));
this.isInTransition = false;
}
this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;
switch ( e.keyCode ) {
case this.options.keyBindings.pageUp:
if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
newX += snap ? 1 : this.wrapperWidth;
} else {
newY += snap ? 1 : this.wrapperHeight;
}
break;
case this.options.keyBindings.pageDown:
if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
newX -= snap ? 1 : this.wrapperWidth;
} else {
newY -= snap ? 1 : this.wrapperHeight;
}
break;
case this.options.keyBindings.end:
newX = snap ? this.pages.length-1 : this.maxScrollX;
newY = snap ? this.pages[0].length-1 : this.maxScrollY;
break;
case this.options.keyBindings.home:
newX = 0;
newY = 0;
break;
case this.options.keyBindings.left:
newX += snap ? -1 : 5 + this.keyAcceleration>>0;
break;
case this.options.keyBindings.up:
newY += snap ? 1 : 5 + this.keyAcceleration>>0;
break;
case this.options.keyBindings.right:
newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
break;
case this.options.keyBindings.down:
newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
break;
default:
return;
}
if ( snap ) {
this.goToPage(newX, newY);
return;
}
if ( newX > 0 ) {
newX = 0;
this.keyAcceleration = 0;
} else if ( newX < this.maxScrollX ) {
newX = this.maxScrollX;
this.keyAcceleration = 0;
}
if ( newY > 0 ) {
newY = 0;
this.keyAcceleration = 0;
} else if ( newY < this.maxScrollY ) {
newY = this.maxScrollY;
this.keyAcceleration = 0;
}
this.scrollTo(newX, newY, 0);
this.keyTime = now;
},
_animate: function (destX, destY, duration, easingFn) {
var that = this,
startX = this.x,
startY = this.y,
startTime = utils.getTime(),
destTime = startTime + duration;
function step () {
var now = utils.getTime(),
newX, newY,
easing;
if ( now >= destTime ) {
that.isAnimating = false;
that._translate(destX, destY);
if ( !that.resetPosition(that.options.bounceTime) ) {
that._execEvent('scrollEnd');
}
return;
}
now = ( now - startTime ) / duration;
easing = easingFn(now);
newX = ( destX - startX ) * easing + startX;
newY = ( destY - startY ) * easing + startY;
that._translate(newX, newY);
if ( that.isAnimating ) {
rAF(step);
}
}
this.isAnimating = true;
step();
},
handleEvent: function (e) {
switch ( e.type ) {
case 'touchstart':
case 'pointerdown':
case 'MSPointerDown':
case 'mousedown':
this._start(e);
break;
case 'touchmove':
case 'pointermove':
case 'MSPointerMove':
case 'mousemove':
this._move(e);
break;
case 'touchend':
case 'pointerup':
case 'MSPointerUp':
case 'mouseup':
case 'touchcancel':
case 'pointercancel':
case 'MSPointerCancel':
case 'mousecancel':
this._end(e);
break;
case 'orientationchange':
case 'resize':
this._resize();
break;
case 'transitionend':
case 'webkitTransitionEnd':
case 'oTransitionEnd':
case 'MSTransitionEnd':
this._transitionEnd(e);
break;
case 'wheel':
case 'DOMMouseScroll':
case 'mousewheel':
this._wheel(e);
break;
case 'keydown':
this._key(e);
break;
case 'click':
if ( !e._constructed ) {
e.preventDefault();
e.stopPropagation();
}
break;
}
}
};
function createDefaultScrollbar (direction, interactive, type) {
var scrollbar = document.createElement('div'),
indicator = document.createElement('div');
if ( type === true ) {
scrollbar.style.cssText = 'position:absolute;z-index:9999';
indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
}
indicator.className = 'iScrollIndicator';
if ( direction == 'h' ) {
if ( type === true ) {
scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
indicator.style.height = '100%';
}
scrollbar.className = 'iScrollHorizontalScrollbar';
} else {
if ( type === true ) {
scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
indicator.style.width = '100%';
}
scrollbar.className = 'iScrollVerticalScrollbar';
}
scrollbar.style.cssText += ';overflow:hidden';
if ( !interactive ) {
scrollbar.style.pointerEvents = 'none';
}
scrollbar.appendChild(indicator);
return scrollbar;
}
function Indicator (scroller, options) {
this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
this.wrapperStyle = this.wrapper.style;
this.indicator = this.wrapper.children[0];
this.indicatorStyle = this.indicator.style;
this.scroller = scroller;
this.options = {
listenX: true,
listenY: true,
interactive: false,
resize: true,
defaultScrollbars: false,
shrink: false,
fade: false,
speedRatioX: 0,
speedRatioY: 0
};
for ( var i in options ) {
this.options[i] = options[i];
}
this.sizeRatioX = 1;
this.sizeRatioY = 1;
this.maxPosX = 0;
this.maxPosY = 0;
if ( this.options.interactive ) {
if ( !this.options.disableTouch ) {
utils.addEvent(this.indicator, 'touchstart', this);
utils.addEvent(window, 'touchend', this);
}
if ( !this.options.disablePointer ) {
utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
}
if ( !this.options.disableMouse ) {
utils.addEvent(this.indicator, 'mousedown', this);
utils.addEvent(window, 'mouseup', this);
}
}
if ( this.options.fade ) {
this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
this.wrapperStyle.opacity = '0';
}
}
Indicator.prototype = {
handleEvent: function (e) {
switch ( e.type ) {
case 'touchstart':
case 'pointerdown':
case 'MSPointerDown':
case 'mousedown':
this._start(e);
break;
case 'touchmove':
case 'pointermove':
case 'MSPointerMove':
case 'mousemove':
this._move(e);
break;
case 'touchend':
case 'pointerup':
case 'MSPointerUp':
case 'mouseup':
case 'touchcancel':
case 'pointercancel':
case 'MSPointerCancel':
case 'mousecancel':
this._end(e);
break;
}
},
destroy: function () {
if ( this.options.interactive ) {
utils.removeEvent(this.indicator, 'touchstart', this);
utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
utils.removeEvent(this.indicator, 'mousedown', this);
utils.removeEvent(window, 'touchmove', this);
utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
utils.removeEvent(window, 'mousemove', this);
utils.removeEvent(window, 'touchend', this);
utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
utils.removeEvent(window, 'mouseup', this);
}
if ( this.options.defaultScrollbars ) {
this.wrapper.parentNode.removeChild(this.wrapper);
}
},
_start: function (e) {
var point = e.touches ? e.touches[0] : e;
e.preventDefault();
e.stopPropagation();
this.transitionTime();
this.initiated = true;
this.moved = false;
this.lastPointX	= point.pageX;
this.lastPointY	= point.pageY;
this.startTime	= utils.getTime();
if ( !this.options.disableTouch ) {
utils.addEvent(window, 'touchmove', this);
}
if ( !this.options.disablePointer ) {
utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
}
if ( !this.options.disableMouse ) {
utils.addEvent(window, 'mousemove', this);
}
this.scroller._execEvent('beforeScrollStart');
},
_move: function (e) {
var point = e.touches ? e.touches[0] : e,
deltaX, deltaY,
newX, newY,
timestamp = utils.getTime();
if ( !this.moved ) {
this.scroller._execEvent('scrollStart');
}
this.moved = true;
deltaX = point.pageX - this.lastPointX;
this.lastPointX = point.pageX;
deltaY = point.pageY - this.lastPointY;
this.lastPointY = point.pageY;
newX = this.x + deltaX;
newY = this.y + deltaY;
this._pos(newX, newY);
// INSERT POINT: indicator._move
e.preventDefault();
e.stopPropagation();
},
_end: function (e) {
if ( !this.initiated ) {
return;
}
this.initiated = false;
e.preventDefault();
e.stopPropagation();
utils.removeEvent(window, 'touchmove', this);
utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
utils.removeEvent(window, 'mousemove', this);
if ( this.scroller.options.snap ) {
var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
var time = this.options.snapSpeed || Math.max(
Math.max(
Math.min(Math.abs(this.scroller.x - snap.x), 1000),
Math.min(Math.abs(this.scroller.y - snap.y), 1000)
), 300);
if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
this.scroller.directionX = 0;
this.scroller.directionY = 0;
this.scroller.currentPage = snap;
this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
}
}
if ( this.moved ) {
this.scroller._execEvent('scrollEnd');
}
},
transitionTime: function (time) {
time = time || 0;
this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';
if ( !time && utils.isBadAndroid ) {
this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
}
},
transitionTimingFunction: function (easing) {
this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
},
refresh: function () {
this.transitionTime();
if ( this.options.listenX && !this.options.listenY ) {
this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
} else if ( this.options.listenY && !this.options.listenX ) {
this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
} else {
this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
}
if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
utils.addClass(this.wrapper, 'iScrollBothScrollbars');
utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');
if ( this.options.defaultScrollbars && this.options.customStyle ) {
if ( this.options.listenX ) {
this.wrapper.style.right = '8px';
} else {
this.wrapper.style.bottom = '8px';
}
}
} else {
utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
utils.addClass(this.wrapper, 'iScrollLoneScrollbar');
if ( this.options.defaultScrollbars && this.options.customStyle ) {
if ( this.options.listenX ) {
this.wrapper.style.right = '2px';
} else {
this.wrapper.style.bottom = '2px';
}
}
}
var r = this.wrapper.offsetHeight;	// force refresh
if ( this.options.listenX ) {
this.wrapperWidth = this.wrapper.clientWidth;
if ( this.options.resize ) {
this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
this.indicatorStyle.width = this.indicatorWidth + 'px';
} else {
this.indicatorWidth = this.indicator.clientWidth;
}
this.maxPosX = this.wrapperWidth - this.indicatorWidth;
if ( this.options.shrink == 'clip' ) {
this.minBoundaryX = -this.indicatorWidth + 8;
this.maxBoundaryX = this.wrapperWidth - 8;
} else {
this.minBoundaryX = 0;
this.maxBoundaryX = this.maxPosX;
}
this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
}
if ( this.options.listenY ) {
this.wrapperHeight = this.wrapper.clientHeight;
if ( this.options.resize ) {
this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
this.indicatorStyle.height = this.indicatorHeight + 'px';
} else {
this.indicatorHeight = this.indicator.clientHeight;
}
this.maxPosY = this.wrapperHeight - this.indicatorHeight;
if ( this.options.shrink == 'clip' ) {
this.minBoundaryY = -this.indicatorHeight + 8;
this.maxBoundaryY = this.wrapperHeight - 8;
} else {
this.minBoundaryY = 0;
this.maxBoundaryY = this.maxPosY;
}
this.maxPosY = this.wrapperHeight - this.indicatorHeight;
this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
}
this.updatePosition();
},
updatePosition: function () {
var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
if ( !this.options.ignoreBoundaries ) {
if ( x < this.minBoundaryX ) {
if ( this.options.shrink == 'scale' ) {
this.width = Math.max(this.indicatorWidth + x, 8);
this.indicatorStyle.width = this.width + 'px';
}
x = this.minBoundaryX;
} else if ( x > this.maxBoundaryX ) {
if ( this.options.shrink == 'scale' ) {
this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
this.indicatorStyle.width = this.width + 'px';
x = this.maxPosX + this.indicatorWidth - this.width;
} else {
x = this.maxBoundaryX;
}
} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
this.width = this.indicatorWidth;
this.indicatorStyle.width = this.width + 'px';
}
if ( y < this.minBoundaryY ) {
if ( this.options.shrink == 'scale' ) {
this.height = Math.max(this.indicatorHeight + y * 3, 8);
this.indicatorStyle.height = this.height + 'px';
}
y = this.minBoundaryY;
} else if ( y > this.maxBoundaryY ) {
if ( this.options.shrink == 'scale' ) {
this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
this.indicatorStyle.height = this.height + 'px';
y = this.maxPosY + this.indicatorHeight - this.height;
} else {
y = this.maxBoundaryY;
}
} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
this.height = this.indicatorHeight;
this.indicatorStyle.height = this.height + 'px';
}
}
this.x = x;
this.y = y;
if ( this.scroller.options.useTransform ) {
this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
} else {
this.indicatorStyle.left = x + 'px';
this.indicatorStyle.top = y + 'px';
}
},
_pos: function (x, y) {
if ( x < 0 ) {
x = 0;
} else if ( x > this.maxPosX ) {
x = this.maxPosX;
}
if ( y < 0 ) {
y = 0;
} else if ( y > this.maxPosY ) {
y = this.maxPosY;
}
x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;
this.scroller.scrollTo(x, y);
},
fade: function (val, hold) {
if ( hold && !this.visible ) {
return;
}
clearTimeout(this.fadeTimeout);
this.fadeTimeout = null;
var time = val ? 250 : 500,
delay = val ? 0 : 300;
val = val ? '1' : '0';
this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';
this.fadeTimeout = setTimeout((function (val) {
this.wrapperStyle.opacity = val;
this.visible = +val;
}).bind(this, val), delay);
}
};
IScroll.utils = utils;
return IScroll;
});
I$(117,function (tpl, R, IScroll, _){
var Nav = R.extend({
template: tpl,
config: function(data){
this.data._fold = true;
this.prepareData();
this.listenViewportChange();
this.setMaxItemsHeight();
},
init: function(){
},
prepareData: function(){
var rawList = this.data.rawList, lastShowType=-1,
_itemlist = [], _lines = [];
function addItemlist(_lines){
var _showType = _lines[0].config.showType,
newLines = [];
for (var i = 0; i < _lines.length; i++) {
if ( (i)%_showType===0) {
if (newLines.length) {
_itemlist.push(newLines);
}
newLines = [_lines[i]];
}else{
newLines.push(_lines[i]);
}
}
if (newLines.length) {
_itemlist.push(newLines);
newLines = null;
}
}
if (!rawList || !rawList.length) { return; }
for (var j = 0; j < rawList.length; j++) {
rawList[j].listIdx = j;
};
for (var i = 0; i < rawList.length; i++) {
if (rawList[i].config.showType !== lastShowType){
lastShowType = rawList[i].config.showType;
if (_lines.length) {
addItemlist(_lines);
}
_lines = [rawList[i]];
}else{
_lines.push(rawList[i]);
}
}
if (_lines.length) {
addItemlist(_lines);
_lines = null;
}
this.data._itemlist = _itemlist;
},
// noAni 为true时，则立即隐藏，无动画
toggleFold: function(evt, noAni){
if (!this.data._fold) {
//当前显示， 需要折叠
if (!this.data._contentShow) { return; } //显示阶段还没有完成，屏蔽点击
this.__iscroll && this.__iscroll.destroy();
this.__iscroll = null;
this.data._contentShow = false;
if (!noAni) {
setTimeout(function(){
this.data._fold = !this.data._fold;
this.$update();
}._$bind(this), 450);
}else{
this.data._fold = !this.data._fold;
}
this.$update();
}else{
//当前折叠，需要显示
this.data._fold = !this.data._fold;
this.$update();
setTimeout(function(){
this.data._contentShow = true;
this.$update();
}._$bind(this), 50);
//iscroll在部分机型上存在问题，会导致多余的tap，所以延迟初始化
setTimeout(function(){
if (this.$refs.items && !this.__iscroll) {
this.__iscroll = new IScroll(this.$refs.items, {tap: true});
}
}._$bind(this), 550);
}
},
prevDefault: function(evt){
evt.preventDefault();
},
listenViewportChange: function(){
var self = this;
var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange  ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function(evt){
setTimeout(function(){
self.setMaxItemsHeight(evt);
}, 100);
});
},
setMaxItemsHeight: function(evt){
var paddingAndMargin = 160;
var h = document.body.clientHeight - paddingAndMargin;
this.$update('_maxHeight', h);
this.__iscroll && this.__iscroll.refresh();
},
getRgbaBG: function(type){
var _itemlist = this.data._itemlist;
if (!_itemlist || !_itemlist.length) {
return '';
}
if (type===0 && _itemlist[0][0].config.enteryBgColor) {
return 'background-color: rgba('+ this.hexToRgb(_itemlist[0][0].config.enteryBgColor) + ', 0.86);'
}else if(type===1 && _itemlist[0][0].config.titleBgColor){
return 'background-color: rgba('+ this.hexToRgb(_itemlist[0][0].config.titleBgColor) + ', 0.86);'
}else{
return '';
}
},
hexToRgb: function (hex) {
var bigint = parseInt(hex.slice(1), 16);
var r = (bigint >> 16) & 255;
var g = (bigint >> 8) & 255;
var b = bigint & 255;
return r + "," + g + "," + b;
},
getParseName: function(str){
return (str+'').replace('-','<br>');
},
gotolink: function(url, evt, idx){
if (this.data._lastclick) {
if ( (+new Date()) - this.data._lastclick < 1000 ) {
return;
}
}
this.data._lastclick = +new Date();
//控制1000ms内只能点击一次
if (url) {
this.toggleFold(null, true); //先折叠，再跳转
var _newUrl  = url, _newUrlParam = 'zname=navigation&zposition='+idx+'&zlocation=navigation';
if (url.indexOf('?') > 0) {
_newUrl = _newUrl.replace('?', '?'+ _newUrlParam + '&');
}else if(url.indexOf('#') > 0){
_newUrl = _newUrl.replace('#', '?'+ _newUrlParam + '#');
}else{
_newUrl = _newUrl + '?' + _newUrlParam;
}
location.href= _newUrl ;
}
}
});
return Nav;
},128,23,129,74);
I$(135,function () {
var _ = {},
cache = {},
startX, startY, startTime, endTime;
var Id = function(elm) {
var id = elm.id;
if (!id) {
id = Math.round(Math.random() * 10000000)
elm.id = id;
}
return id;
}
var log = (function(){
var result = document.getElementById('result');
return function(_log){
if(!result){
return;
}
result.innerHTML += _log+'<br/>';
}
})()
/**
* 鼠标和touch事件的兼容
*/
function getTouch(e) {
var touch;
if (!e.changedTouches) {
touch = e;
} else {
touch = e.changedTouches[0]
};
return touch;
}
/**
* 鼠标和touch事件的兼容
*/
function getTarget(e) {
var elm = e.currentTarget;
while(!elm.id){
elm = elm.parentNode;
}
return elm;
}
/**
* 总体的封装函数，把事件缓存在cache中
*/
var touchEvent = function(elm, callback) {
var id = Id(elm);
if (!cache[id]['touchstart']) {
var touchStart = function(e) {
var touchobj = getTouch(e);
startX = touchobj.pageX,
startY = touchobj.pageY;
startTime = +new Date;
e.preventDefault();
}
cache[id]['touchstart'] = callback;
elm.addEventListener('touchstart', touchStart, false);
elm.addEventListener('mousedown', touchStart, false);
}
if (!cache[id]['touchend']) {
var touchEnd = function(e) {
var touchobj = getTouch(e),
distX = touchobj.pageX - startX,
distY = touchobj.pageY - startY,
endTime = +new Date;
e.preventDefault();
if ((endTime - startTime) / 1000 < 300) {
if ((Math.abs(distX)) <10&& (Math.abs(distY)<10)) {
try{
var event = document.createEvent('Event');
event.initEvent('click',false,true);
e.target.dispatchEvent(event);
} catch(e){
console.log(e.message);
}
} else{
if (distX > 0) { //right
cache[id]['swiperight'] &&
cache[id]['swiperight']({
target:e.target,
pagX: touchobj.pageX,
pagY: touchobj.pageY,
distX: distX,
distY: distY,
type: 'swiperight'
})
} else { //left
cache[id]['swipeleft'] &&
cache[id]['swipeleft']({
target:e.target,
pagX: touchobj.pageX,
pagY: touchobj.pageY,
distX: distX,
distY: distY,
type: 'swipeleft'
})
}
if (distY < 0) { //up
cache[id]['swipeup'] &&
cache[id]['swipeup']({
target:e.target,
pagX: touchobj.pageX,
pagY: touchobj.pageY,
distX: distX,
distY: distY,
type: 'swipeup'
})
} else { //down
cache[id]['swipedown'] &&
cache[id]['swipedown']({
target:e.target,
pagX: touchobj.pageX,
pagY: touchobj.pageY,
distX: distX,
distY: distY,
type: 'swipedown'
})
}
}
} else {
cache[id]['move'] &&
cache[id]['move']({
target:e.target,
pagX: touchobj.pageX,
pagY: touchobj.pageY,
distX: distX,
distY: distY,
type: 'moved'
})
}
startX = null;
startY = null;
startTime = null;
}
cache[id]['touchend'] = callback;
elm.addEventListener('touchend', touchEnd, false);
elm.addEventListener('mouseup', touchEnd, false);
};
var touchMove = function(e) { //move allback
if(!startTime){
return;
}
var touchobj = getTouch(e);
var elm = getTarget(e);
var id = Id(elm);
cache[id]['touchmove'] &&
cache[id]['touchmove']({
target:e.target,
pagX: touchobj.pageX,
pagY: touchobj.pageY,
distX: touchobj.pageX - startX,
distY: touchobj.pageY - startY,
type: 'move'
})
}
if (!cache[id]['touchmove'] ) {
cache[id]['touchmove'] = callback;
elm.addEventListener('touchmove', touchMove, false);
elm.addEventListener('mousemove', touchMove, false);
}
};
/**
* 监听swipeLeft事件
*/
_.swipeLeft = function(elm, callback) {
var _id = Id(elm);
cache[_id] = cache[_id] || {};
cache[_id]['swipeleft'] = callback;
touchEvent(elm, callback);
};
/**
* 监听swipe事件
*/
_.swipe = function(elm, callback) {
var _id = Id(elm);
cache[_id] = cache[_id] || {};
cache[_id]['swipeleft'] = callback;
cache[_id]['swiperight'] = callback;
cache[_id]['swipedown'] = callback;
cache[_id]['swipeup'] = callback;
touchEvent(elm, callback);
};
/**
* 监听swipeRight事件
*/
_.swipeRight = function(elm, callback) {
var _id = Id(elm);
cache[_id] = cache[_id] || {};
cache[_id]['swiperight'] = callback;
touchEvent(elm, callback);
};
/**
* 监听swipeUp事件
*/
_.swipeUp = function(elm, callback) {
var _id = Id(elm);
cache[_id] = cache[_id] || {};
cache[_id]['swipeup'] = callback;
touchEvent(elm, callback);
};
/**
* 监听swipeDown事件
*/
_.swipeDown = function(elm, callback) {
var _id = Id(elm);
cache[_id] = cache[_id] || {};
cache[_id]['swipedown'] = callback;
touchEvent(elm, callback);
};
return _;
});
I$(136,function (NEJ,_k,_u,_t0,_p,_o,_f,_r){
// variable declaration
var _pro;
/**
* 先慢后快再慢动画
*
* 结构举例
* ```html
* <div id='id-bounce1'></div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/animation/easeinout'
* ],function(_t){
*     // 创建动画实例
*     var _easeinout  = _t._$$AnimEaseInOut._$allocate({
*         from:{
*             offset:100
*         },
*         to:{
*             offset:200
*         },
*         duration:1000,
*         onupdate:function(_event){
*             _box.style.left = _event.offset + 'px';
*         },
*         onstop:function(){
*             this._$recycle();
*         }
*     });
*     // 开始动画
*     _easeinout._$play();
* });
* ```
*
* @class   module:util/animation/easeinout._$$AnimEaseInOut
* @extends module:util/animation/bezier._$$AnimBezier
*
* @param   {Object} config 可选配置参数
*/
_p._$$AnimEaseInOut = _k._$klass();
_pro = _p._$$AnimEaseInOut._$extend(_t0._$$AnimBezier);
/**
* 控件重置
*
* @protected
* @method module:util/animation/easeinout._$$AnimEaseInOut#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
_options = _u._$merge({},_options);
_options.timing = 'easeinout';
this.__super(_options);
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,2,125);
I$(132,function (_k, _ut, _v, _e, _t, _, _t1, _p, _o, _f, _r, _pro) {
var _getParentElement = function(_elm, _tagName) {
while (_elm.tagName != _tagName) {
_elm = _elm.parentNode;
}
return _elm;
}
/**
* 全局状态控件
* @class   {p._$$Swipe}
* @extends {nej.ui._$$Abstract}
* swipe._$allocate({box:this.__slide,width:320,onchange:_f})
* <div class="m-slidebox" >
<ul class="m-slide" id="slide">
<li><img src="http://n.sinaimg.cn/default/20150213/okId-avxeafs1115937.jpg"/></li>
<li><img src="http://d1.sina.com.cn/201502/11/594763_WAPjd.jpg"/></li>
<li><img src="http://n.sinaimg.cn/default/20150213/z2Gw-chmifpx7943074.jpg"/></li>
<li><img src="http://n.sinaimg.cn/default/20150213/okId-avxeafs1115937.jpg"/></li>
<li><img src="http://d1.sina.com.cn/201502/11/594763_WAPjd.jpg"/></li>
<li><img src="http://n.sinaimg.cn/default/20150213/z2Gw-chmifpx7943074.jpg"/></li>
</ul>
</div>
*/
_p._$$Swipe = _k._$klass();
_pro = _p._$$Swipe._$extend(_t._$$EventTarget);
/**
* 重置控件
* @param  {[type]} options [description]
*
*/
_pro.__reset = function(options) {
this.__super(options);
this.__box = options.box;
this.__width = options.width || document.body.clientWidth;
this.__children = _e._$getChildren(this.__box);
this.__tagName = this.__children[0].tagName;
_.swipe(this.__box.parentNode, this.__onSwipe._$bind(this))
};
/**
* 拖动回调
*/
_pro.__onSwipe = function(_event) {
var index = _ut._$indexOf(this.__children, _getParentElement(_event.target, this.__tagName)),
newImgIndex = index;
if (_event.type === 'move') {
console.log(_event.distX);
var left = parseInt(this.__box.style.left) || 0;
this.__box.style.left = -index * this.__width + _event.distX + 'px';
} else {
var toOffset;
if (_event.type == 'swipeleft') {
console.log('from:' + _event.distX + ',to:' + (this.__width - Math.abs(_event.distX)));
if (index == this.__children.length-1) { //右侧边界
toOffset = 0
} else {
toOffset = -this.__width;
newImgIndex++;
}
} else if (_event.type == 'swiperight') {
console.log('from:' + _event.distX + ',to:' + (this.__width - Math.abs(_event.distX)));
if (index == 0) {//左侧边界
toOffset = 0
} else {
toOffset = this.__width;
newImgIndex--;
}
}
var _easeinout = _t1._$$AnimEaseInOut._$allocate({
from: {
offset: _event.distX
},
to: {
offset: toOffset
},
duration: 200,
onupdate: function(_event) {
console.log(_event.offset);
this.__box.style.left = -(index * this.__width) + _event.offset + 'px';
}._$bind(this),
onstop: function() {
_easeinout._$recycle();
this._$dispatchEvent('onchange',newImgIndex);
}._$bind(this)
});
// 开始动画
_easeinout._$play();
}
};
/**
* 控件销毁
*
*/
_pro.__destroy = function() {
this.__super();
};
return _p._$$Swipe;
},1,2,3,4,20,135,136);
I$(133,function (NEJ,_k,_v,_u,_e,_t,_p,_o,_f,_r){
var _pro;
/**
* 标签切换控件封装
*
* 结构举例
*
* ```html
*   <div id="box">
*       <a>1</a>
*       <a>2</a>
*       <a class="js-disabled">3</a>
*       <a>4</a>
*   </div>
* ```
*
* 脚本举例
*
* ```javascript
* NEJ.define([
*     'util/tab/tab'
* ],function(_t){
*     // 实例化控件
*     var _tab = _t._$$Tab._$allocate({
*         list:_e._$getChildren('box'),
*         index:1,
*         onchange:function(_event){
*             // TODO
*         }
*     });
*     // 使用控件
*     _tab._$go(2);
* });
* ```
*
* @class   module:util/tab/tab._$$Tab
* @extends module:util/event._$$EventTarget
*
* @param    {Object}  config   - 可选配置参数
* @property {Array}   list     - 标签项列表
* @property {Number}  index    - 初始选中项索引值，默认为0
* @property {String}  event    - 触发选择事件名称，默认为click
* @property {Boolean} inverse  - 是否反过程，true表示选中时删除选中样式，否则选中时添加样式
* @property {String}  disabled - 选项禁用样式，默认为js-disabled
* @property {String}  selected - 选中样式名，默认为js-selected
*/
/**
* 标签切换事件，输入{last:1,index:5}
*
* ```javascript
* NEJ.define([
*     'util/tab/tab'
* ],function(_t){
*     // 实例化控件
*     var _tab = _t._$$Tab._$allocate({
*         list:_e._$getChildren(_e._$get('box')),
*         index:1,
*         onchange:function(_event){
*             // _event.last   上一次的tab索引
*             // _event.index  需要切换到的tab索引
*             // _event.list   节点列表
*             // _event.data   节点上通过data-value设置的内容
*             // TODO
*         }
*     });
* });
* ```
*
* @event    module:util/tab/tab._$$Tab#onchange
* @param    {Object}  event   - tab信息
* @property {Number}  last    - 上一次的tab索引
* @property {Number}  index   - 需要切换到的tab索引
* @property {Array}   list    - 节点列表
* @property {String}  data    - 节点上通过data-value设置的内容
* @property {Boolean} stopped - 是否阻止触发节点的默认事件，回调过程中如果设置为false则后续继续触发节点的默认事件
*/
_p._$$Tab = _k._$klass();
_pro = _p._$$Tab._$extend(_t._$$EventTarget);
/**
* 控件重置
*
* @protected
* @method module:util/tab/tab._$$Tab#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__name = _options.event||'click';
this.__selected = _options.selected||'js-selected';
this.__disabled = _options.disabled||'js-disabled';
this.__inversed = !!_options.inverse;
this.__doTabListCheck(_options.list);
this._$go(_options.index||0);
};
/**
* 控件回收
*
* @protected
* @method module:util/tab/tab._$$Tab#__destroy
* @return {Void}
*/
_pro.__destroy = (function(){
var _doResetSelect = function(_node){
this.__doTabItemSelect(_node,!1);
};
return function(){
this.__super();
_u._$forEach(
this.__list,
_doResetSelect,this
);
delete this.__list;
delete this.__name;
delete this.__index;
delete this.__disabled;
delete this.__selected;
delete this.__inversed;
};
})();
/**
* 初始化标签列表
*
* @protected
* @method module:util/tab/tab._$$Tab#__doTabListCheck
* @param  {Array} arg0 - 标签节点列表
* @return {Void}
*/
_pro.__doTabListCheck = (function(){
var _doInitDomEvent = function(_item){
if (!_item) return;
this.__list.push(_item);
var _index = this.__list.length-1,
_handler = this.__cblist[_index];
if (!_handler){
_handler = this._$go._$bind(this,_index);
this.__cblist[_index] = _handler;
}
this.__doInitDomEvent([[_item,this.__name,_handler]]);
};
return function(_list){
this.__list = [];
if (!this.__cblist) this.__cblist = [];
_u._$forEach(_list,_doInitDomEvent,this);
};
})();
/**
* 设置标签选中状态
*
* @protected
* @method module:util/tab/tab._$$Tab#__doTabItemSelect
* @param  {Node}    arg0 - 标签节点
* @param  {Boolean} arg1 - 是否选中
* @return {Void}
*/
_pro.__doTabItemSelect = function(_element,_selected){
!!_selected&&!this.__inversed
? _e._$addClassName(_element,this.__selected)
: _e._$delClassName(_element,this.__selected);
};
/**
* 切换到指定索引位置
*
* ```javascript
*   // 切换到索引为2的位置，如果当前索引为2则不触发回调
*   _tab._$go(2);
*   // 切换索引为2，如果当前索引为2也触发onchange回调
*   _tab._$go(2,true);
* ```
*
* @method module:util/tab/tab._$$Tab#_$go
* @param  {Number}  arg0 - 索引值
* @param  {Boolean} arg1 - 是否强行触发onchange事件
* @return {Void}
*/
_pro._$go = function(_index,_force){
var _element = this.__list[_index];
if (_force!=!0&&(_index==this.__index||!_element||
_e._$hasClassName(_element,this.__disabled))){
_v._$stopDefault(arguments[1]);
}
var _event = {
stopped:!0,
index:_index,
last:this.__index,
list:this._$getList(),
data:_e._$dataset(_element,'value')
};
this.__index = _index;
_element = this.__list[_event.last];
if (!!_element){
this.__doTabItemSelect(_element,!1);
}
_element = this.__list[this.__index];
this.__doTabItemSelect(_element,!0);
this._$dispatchEvent('onchange',_event);
if (_event.stopped){
_v._$stopDefault(arguments[1]);
}
};
/**
* 取当前选中项索引
*
* ```javascript
*   // 获取当前选中的索引
*   var index = _tab._$getIndex();
* ```
*
* @method module:util/tab/tab._$$Tab#_$getIndex
* @return {Number} 当前选中项索引
*/
_pro._$getIndex = function(){
return this.__index;
};
/**
* 取Tab控件关联的节点列表
*
* ```javascript
*   // 获取关联的节点列表
*   _tab._$getList();
* ```
*
* @method module:util/tab/tab._$$Tab#_$getList
* @return {Array} 关联的节点列表
*/
_pro._$getList = function(){
return this.__list;
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,3,2,4,20);
I$(134,function (_k, _q, _t, _,_p,_o,_f,_r,_pro) {
_p._$$Sticky = _k._$klass();
_pro = _p._$$Sticky._$extend(_t._$$EventTarget);
_pro.__reset = function(options){
this.__super(options);
if (!options.node) { return; };
this.__node = options.node; //内容节点
this.__anchor = this.__node.parentNode.parentNode; //最外层的包围节点， position sticky 应用的节点
this.__anchorHost = this.__anchor.parentNode;  //sticky 节点的包围节点
this.__stickyNode = _q(this.__node.parentNode); //position fixed 应用的节点
this.__cssStickySupport = this.__checkStickySupport();
this.__nodeHeight = this.__node.clientHeight;
this.__fixedClass = options.fixedClass;
this.__top = parseInt(options.top, 10)||0;
this.__zIndex = parseInt(options.zIndex)||1;
this.__setStickyCss(); //如果支持css sticky，则设置使用css功能
this.__isfixed = false;
this.__onscrollCb = _.throttle(function(){
_.nextFrame(this._$sticky._$bind(this));
}._$bind(this), 50, {leading: false});
this.__initCss = this.__getInitCss();
this.__fixedCss = this.__getFixedCss();
this.__addEvent();
};
_pro.__getInitCss = function(){
if (this.__stickyNode.length!==0) {
var node = this.__stickyNode[0];
return 'position:'+node.style.position+';'+
'top:'+node.style.top+'px;'+
'z-index:'+node.style.zIndex+';';
};
return '';
}
_pro.__getFixedCss = function(){
return 'position:fixed;'+
'top:'+this.__top+'px;'+
'z-index:'+this.__zIndex+';';
}
_pro.__setFixedCss = function(cssStr){
if (this.__cssStickySupport) { return; } // 如果原生支持sticky，则不需要设置fixed了
if (this.__stickyNode.length!==0) {
this.__stickyNode[0].style.cssText = cssStr;
}
};
_pro.__checkStickySupport = function(){
if (window.CSS && window.CSS.supports) {
return window.CSS.supports('(position: sticky) or (position: -webkit-sticky)')
};
//使用其它方式检测
var div = document.createElement('div');
div.style.position = 'sticky';
if (div.style.position==='sticky') {
return true;
}
div.style.position = '-webkit-sticky';
if (div.style.position==='-webkit-sticky') {
return true;
}
div = null;
return false;
};
_pro.__setStickyCss = function(){
if (this.__cssStickySupport) {
this.__anchor.style.cssText =
'position:-webkit-sticky;position:sticky;'+
'top:'+this.__top+'px;'+
'z-index:'+this.__zIndex+';';
}
};
_pro.__addEvent = function(){
_q(window)._$on('scroll', this.__onscrollCb)._$trigger('scroll');
};
_pro._$sticky = function(evt){
//锚点元素相对于可显示区域左上角的位置
var anchorRect = this.__anchor.getBoundingClientRect(),
hostRect = this.__anchorHost.getBoundingClientRect();
if (anchorRect.top<=this.__top && !this.__isfixed && hostRect.bottom>this.__nodeHeight ) {
this.__setFixedCss(this.__fixedCss);
this.__fixedClass && this.__stickyNode._$addClassName(this.__fixedClass);
this.__isfixed = true;
this._$dispatchEvent('onsticky', true);
}else if ( (anchorRect.top > this.__top || hostRect.bottom <= this.__nodeHeight)  &&
this.__isfixed) {
this.__setFixedCss(this.__initCss.replace(/position:[^;]*/, 'position:static'));
setTimeout(function(){
this.__setFixedCss(this.__initCss);
}._$bind(this), 30)
this.__fixedClass && this.__stickyNode._$delClassName(this.__fixedClass);
this.__isfixed = false;
this._$dispatchEvent('onsticky', false);
};
};
_pro.__destory = function(){
_q(window)._$off('scroll', this.__onscrollCb);
this.__node = null;
this.__anchor = null;
this.__fixedClass = null;
this.__top = null;
this.__onscrollCb = null;
}
return _p;
},1,87,20,74);
I$(130,function (_k,_ut,_v,_e, _t,swipe, _q, tab, _s,_p,_o,_f,_r,_pro) {
_p._$$StickyTab = _k._$klass();
_pro = _p._$$StickyTab._$extend(_t._$$EventTarget);
_pro.__reset = function(_options){
this.__tabNode = _options.tab;
var selectedbg = _e._$dataset(this.__tabNode,'selectedbg')||'';
var unselectedbg = _e._$dataset(this.__tabNode,'unselectedbg')||'';
if(selectedbg!=''||unselectedbg!=''){   //通过样式添加控制高亮色
if(selectedbg.indexOf('#')==-1&&selectedbg){
selectedbg = '#'+selectedbg;
}
if(unselectedbg.indexOf('#')==-1&&unselectedbg){
unselectedbg = '#'+unselectedbg;
}else if(!unselectedbg){
unselectedbg = 'transparent';
}
var cssText =['.#<uispace> .tab{background-color:'+ unselectedbg +'}']
cssText.push('.#<uispace> .curr{background-color:'+ selectedbg +'}')
this.__seed_css = _e._$pushCSSText(cssText.join(''));
_e._$dumpCSSText()
//setTimeout(_e._$addClassName(this.__tabNode,this.__seed_css),500);//这���的定时器是为了app里的一个小黑块的bug
_e._$addClassName(this.__tabNode,this.__seed_css)
}
this.__tab = tab._$$Tab._$allocate({
list:_e._$getChildren( this.__tabNode),
index:0,
event: _options.event||'click',
selected: _options.selected,
onchange: _options.onchange || function(_event){
// _event.last   上一次的tab索引
// _event.index  需要切换到的tab索引
// _event.list   节点列表
// _event.data   节点上通过data-value设置的内容
}
});
this.__sticky = _s._$$Sticky._$allocate({
node: this.__tabNode,
fixedClass: _options.fixedClass||'',
zIndex: parseInt(_options.zIndex,10)||1,
top: _options.top,
onsticky: _options.onsticky
});
}
_pro.__destory = function(){
this.__tab._$recycle();
this.__sticky._$recycle();
this.__tab = null;
this.__sticky = null;
}
return _p;
},1,2,3,4,20,132,87,133,134);
I$(137,"<div class=\"m-dropdown {{_show}}\" on-touchmove={{this.forbidTouchmove($event)}} on-click={{this.maskClicked($event)}}>     <span class=\"select-btn\" on-click={{this.hide(1, $event)}}><span class=\"ic\"></span></span>     <div class=\"tit\">切换楼层</div>     <ul class=\"floors\">         {{#list tabs as tab}}             <li style=\"color:{{tab.isSelected?tab.selectedColor:tab.unSelectedColor}};\" on-click={{this.tabClick(tab_index,tab, $event)}}>{{tab.name}}</li>         {{/list}}     </ul> </div> ");
I$(131,function (tpl, R, _v) {
var Dropdown = R.extend({
template: tpl,
config: function(data){
data._show = '';
},
init: function(){
},
tabClick: function(idx, tab, evt){
if(evt && evt.stopPropagation){
evt.stopPropagation();
}else if(evt){
window.event.cancelBubble = true;
}
this.tabSelect(idx);
this.$emit('tabselect', idx, tab);
this.hide();
},
tabSelect: function(idx){
for (var i = 0; i < this.data.tabs.length; i++) {
if (i==idx){
this.data.tabs[i].isSelected  = true;
}else{
this.data.tabs[i].isSelected = false;
}
}
},
hide : function(ani, evt){
if ((+new Date()) - this.data._showTime < 500) {
return;
}
if(evt && evt.stopPropagation){
evt.stopPropagation();
}else if(evt){
window.event.cancelBubble = true;
}
if (ani) {
this.$update({_show: 'show'});
setTimeout(function(){
this.$update({_show: ''});
}._$bind(this), 300);
}else{
this.$update({_show: ''});
}
},
show : function(){
this.data._showTime = +new Date();
this.$update({_show: 'show'});
setTimeout(function(){
this.$update({_show: 'show mask'});
}._$bind(this), 34);
},
toggleShow : function(idx){
if (typeof idx == 'number') {
this.tabSelect(idx);
}
if (this.data._show) {
this.hide();
}else{
this.show();
}
},
forbidTouchmove : function(evt){
evt.preventDefault();
},
maskClicked : function(evt){
var reg =  new RegExp('(\\s|^)'+ 'm\\-dropdown' +'(\\s|$)');
if (reg.test(evt.target.className)) {
this.hide(1, evt);
}
}
});
return Dropdown;
},137,23,3);
I$(118,function (_k,_t,_v, _ut, _, _q, tab, _eo, Dropdown, IScroll) {
var _$$Navtab = _k._$klass(),
_pro = _$$Navtab._$extend(_t._$$EventTarget);
_pro.__reset = function(options){
this.__super(options);
this.__tabbar = options.tabbar;
this.__fixbar = _q(this.__tabbar.parentNode);
this.__anchor = this.__fixbar._$parent('.m-nav-wrap',true);
this.__dropdownBtn = this.__fixbar._$children('.select-btn',true);
// this.__dropdownList = this.__fixbar._$children('.change-floor', true);
var tabsCount = _q(this.__tabbar)._$children('span', true).length,
tabType = this.__tabbar.parentNode.getAttribute('data-type');
if (tabsCount>0){
var _tab = tab._$$StickyTab._$allocate({
tab: this.__tabbar,
index:0,
zIndex: 1000,
top: 0,
fixedClass: 'nav-fixed',
event: tabsCount>5?'tap':'click',
onchange: this.__tabchange._$bind(this),
onsticky: function(isFixed){
this.__isTabFixed = isFixed;
}._$bind(this)
});
}
tabType==='lift' && this.__bindLiftScroll(this.__tabbar);
//初始化tab横向滚动
if (tabsCount>5) {
this.__iscroll = new IScroll(this.__tabbar.parentNode,
{tap: true,scrollX: true, scrollY: false});
}
this.__addEvent();
};
_pro.__addEvent = function(){
var tabsList = this.__tabbar.querySelectorAll('.tab'),
tabreg = new RegExp('(\\s|^)'+ 'curr' +'(\\s|$)');
if (this.__dropdownBtn.length) {
// this.__dropdownBtn._$on('touchstart,touchend,touchmove', function(evt){
//     evt.stopPropagation();
// });
this.__dropdownBtn._$on('tap', function(){
if (!this.__dropdown) {
var tabs=[];
for (var i = 0; i < tabsList.length; i++) {
tabs.push({
selectedColor: tabsList[i].getAttribute('data-actClr')||'#D22147',
unSelectedColor: tabsList[i].getAttribute('data-norClr')||'#333',
name: tabsList[i].innerText,
isSelected: tabreg.test(tabsList[i].className)
});
}
this.__dropdown = new Dropdown({data:{tabs: tabs}});
this.__dropdown.$inject(document.body);
}
if (!this.__isTabFixed){
this.__anchor._$scrollTo();
}
var idx = 0;
for (var j = 0; j < tabsList.length; j++) {
if (tabreg.test(tabsList[j].className)) {
idx = j;
break;
}
}
this.__dropdown.toggleShow(idx);
this.__dropdown.$on('tabselect', function(idx, tab){
if (tabsList[idx]){
_q(tabsList[idx])._$trigger('tap');
}
this.__dropdown.$off('tabselect');
}._$bind(this));
}._$bind(this));
}
};
_pro.__tabchange = function(_evt){
//点击tab时，先将tab滚动到顶部
var tabNode = _evt.list[0].parentNode;
if (!this.__isTabFixed && (typeof _evt.last === 'number') ){
this.__anchor._$scrollTo();
}
// 变换选中与未选中背景颜色
this.__switchTabStyle(_evt.list, _evt.list[_evt.index], _evt.index);
var tabType = tabNode.parentNode.getAttribute('data-type')||'lift';
tabType==='lift' && this.__liftTabChange(_evt, tabNode);
tabType==='switch' && this.__switchTabChange(_evt, tabNode);
};
_pro.__switchTabStyle = (function(){
var switcher = function(_tabs, _currTab, _index){
// 变换选中与未选中背景颜色
var currClr = _currTab.style.color,
currActClr = _currTab.getAttribute('data-actClr'),
currClass = 'curr',
currReg = new RegExp( '(\\s|^)'+ currClass +'(\\s|$)' );
if ( currReg.test(_currTab.className) ) {
return;
}
for (var i = _tabs.length - 1; i >= 0; i--) {
var norClr = _tabs[i].getAttribute('data-norclr');
if (_currTab != _tabs[i]) {
_tabs[i].style.color = norClr;
if (currReg.test(_tabs[i].className)) {
_tabs[i].className = _tabs[i].className.replace(currReg, ' ');
}
}
}
//移到可视范围内
_currTab.style.color = currActClr;
_currTab.className += ' '+currClass;
this.__scrolltoTabPosition(_currTab);
this._$dispatchEvent('cbTabChange',_index);
};
return _.throttle(switcher, 100, {leading: false});
})();
_pro.__scrolltoTabPosition = (function(){
var scroller = function(_currTab){
if (this.__iscroll) {
this.__iscroll.scrollToElement(_currTab,120,true,true);
}
};
return _.debounce(scroller, 150, false);
})();
_pro.__getRelBlocks = function(tabItem){
var rel = tabItem.getAttribute('data-blocks');
return document.querySelectorAll('.m-block[data-navid="'+rel+'"]');
};
_pro.__bindLiftScroll = function(_tabbar){
_tabbar = _q(_tabbar);
var tabs = _tabbar._$children('span', true),
liftObjs = [],
self = this,
tabbarHeight = _tabbar[0].getBoundingClientRect().height;
tabs._$forEach(function(tab){
var relBlks = self.__getRelBlocks(tab), navid = tab.getAttribute('data-blocks');
if (relBlks && relBlks.length > 0 && navid) {
liftObjs.push({
tab: tab, blk: relBlks[0] , blkTop: relBlks[0].getBoundingClientRect().top
});
}
});
//将tabs按照实际blk的顺序排序
liftObjs.sort(function(a,b){return a.blkTop-b.blkTop;});
var throttledScroll = _.throttle(function(){
if (!!self.__isLiftScrolling) {return;}
var currTab,currIndex;
for(var i=0; i<liftObjs.length; i++){
//有时候会出现0.5像素的情况，scrollTo会忽略，所以此处也需要做兼容处理（+1误差）
if (liftObjs[i].blk.getBoundingClientRect().top <= tabbarHeight+1) {
currTab = liftObjs[i].tab;
currIndex = i;
}else{
break;
}
}
!!currTab && self.__switchTabStyle(tabs, currTab, currIndex);
!currTab && self.__switchTabStyle(tabs, tabs[0], 0);  //页面处于顶部的情况
}, 100, {leading: false});
window.addEventListener('scroll', throttledScroll);
_v._$dispatchEvent(window, 'scroll');
};
_pro.__liftTabChange = function(_evt, _tabNode){
var selBlks = this.__getRelBlocks(_evt.list[_evt.index]),
self = this;
if (!selBlks || selBlks.length===0) { return; }
if (typeof _evt.last==='number') {
this.__isLiftScrolling = true;
this.__scrollToTab(selBlks[0], _tabNode, true, function(){
setTimeout(function(){
self.__isLiftScrolling = false;
}, 200);
});
}
};
_pro.__switchTabChange = function(_evt, _tabNode){
//switch and hide floor
var selBlks = this.__getRelBlocks(_evt.list[_evt.index]),
navid = _evt.list[_evt.index].getAttribute('data-blocks');
if (_evt.last===_evt.index) {
this.__scrollToTab(selBlks[0], _tabNode, false);
return;
}
_q(document.querySelectorAll('.m-block.show[data-navid]'))._$delClassName('show');
Array.prototype.forEach.call(selBlks,function(node){
_q(node)._$addClassName('show');
});
if (_ut._$isNumber(_evt.last)) {
this.__scrollToTab(selBlks[0], _tabNode, false);
}
};
_pro.__scrollToTab = function(_selBlk, _tabNode, _animation, callback){
var tabBottom = (parseInt(_tabNode.style.top,10)||0) + _tabNode.getBoundingClientRect().height,
selBlkTop = _selBlk.getBoundingClientRect().top,
newScrollTop = selBlkTop - tabBottom + document.body.scrollTop;
if (_animation) {
var fromTop = document.body.scrollTop;
if ( fromTop + 200 < newScrollTop ) {
fromTop = newScrollTop - 200;
}else if( fromTop - 200 > newScrollTop ){
fromTop = newScrollTop + 200;
}
var _easeout = _eo._$$Timing._$allocate({
timing: 'easeout',
from: {
offset: fromTop
},
to: {
offset: newScrollTop
},
duration: 200,
onupdate: function(_event) {
window.scrollTo(0, _event.offset);
},
onstop: function() {
_easeout._$recycle();
callback && callback();
}
});
window.scrollTo(0, fromTop);
_easeout._$play();
}else{
window.scrollTo(0, newScrollTop);
callback && callback();
}
};
_pro.__destory = function(){
};
return _$$Navtab;
},1,20,3,2,74,87,130,124,131,129);
I$(119,function (_k, _t, _ut, _q, request, _, toast){
var _p={}, _pro;
_p._$$Polls = _k._$klass();
_pro = _p._$$Polls._$extend(_t._$$EventTarget);
_pro.__init = function(){
this.__working = false;
this.__LSKEY = 'KLPLKS';
this.__ACTID = window.__klActivityShowId;
this.__initPollStatus();
var opblks = _q('.m-qa-select,.m-qa-pk');
opblks._$on('click', '.j-btn', this.__onPollOptClick._$bind(this));
};
_pro.__onPollOptClick = function(evt){
var tgt = _q(evt.target), opt;
if (!tgt._$hasClassName('j-btn')) {
opt = tgt._$parent('.j-btn', true);
}else{
opt = tgt;
}
var blk=opt._$parent('.m-qa-pk, .m-qa-select', true),
locateId = blk._$parent('.m-block',true)._$attr('data-block'),
optIdx=opt._$attr('data-idx'),
pollType= blk._$hasClassName('m-qa-pk')?'pk':'poll',
pollAction = pollType==='pk'?'支持':'投票';
if (blk._$hasClassName('selected') || this.__working) { return; }
//控制三秒内只能点击一次
this.__working = true;
setTimeout(function(){
this.__working = false;
}._$bind(this), 3000);
toast.show(pollAction+'成功！');
this.__pageUpdate(opt, blk, optIdx, 1);  //默认投票成功， 失败后也不恢复票数，刷新后才恢复
this.__savePoll2Server(this.__getOptionKey(locateId), optIdx);
this.__savePoll2LS(locateId, optIdx);
};
_pro.__initPollStatus = function(){
var savedResults = this.__getPollResults(),
actId = this.__ACTID;
var currPagePolls = savedResults[actId];
if (!currPagePolls) { return; }
var locateIds = Object.keys(currPagePolls);
locateIds.forEach(function(locateId){
var optIdx = currPagePolls[locateId];
var opt = _q('.m-block[data-block="'+locateId+'"] .j-btn[data-idx="'+optIdx+'"]');
if (!opt || !optIdx) { return; }
var blk = opt._$parent('.m-qa-pk, .m-qa-select', true);
this.__pageUpdate(opt, blk, optIdx, 0);
}._$bind(this));
};
//{"actId":{"locateId": "idx"} }
_pro.__savePoll2LS = function(locateId, optIdx){
var savedResults = this.__getPollResults();
actId = this.__ACTID;
if (!savedResults[actId]) {
savedResults[actId] = {};
}
savedResults[actId][locateId] = optIdx;
try{
localStorage.setItem(this.__LSKEY, JSON.stringify(savedResults) );
}catch(e){
}
};
_pro.__getPollResults = function(){
try{
return JSON.parse(localStorage.getItem(this.__LSKEY)||'{}');
}catch(e){
return {};
}
};
_pro.__getOptionKey = function(locateId){
var actId = this.__ACTID;
return actId + '_' + locateId;
};
_pro.__pageUpdate = function(opt, blk, optIdx, num){
var pollnodes, totalpoll=0, pollCount=0;
blk._$addClassName('selected');
opt._$addClassName('my');
if (blk._$hasClassName('m-qa-pk')) {
blk._$addClassName('selected-'+(optIdx==='0'?'l':'r'));
//还需要更新数量
var rpoll = 0;
pollnodes = blk._$children('.text .num',true);
pollnodes._$forEach(function(node, idx){
var poll = parseFloat(node.getAttribute('data-poll'))||0;
if (node.getAttribute('data-idx')===optIdx) {
poll += num;
node.innerText = poll;
node.setAttribute('data-poll', poll);
}
totalpoll+= poll;
if (idx===1) {
rpoll = poll;
}
});
setTimeout(function(){
blk._$children('.bar i', true)
._$style('width', Math.round((rpoll/totalpoll)*1000)/10 + '%' );
}, 20);
}else if(blk._$hasClassName('m-qa-select')){
//需要重新计算百分比
pollnodes = blk._$children('dd', true);
pollnodes._$forEach(function(node,idx){
var poll = parseFloat(node.getAttribute('data-poll'))||0;
if (node.getAttribute('data-idx')===optIdx) {
poll+= num;
node.setAttribute('data-poll', poll);
}
totalpoll+= poll;
pollCount += (poll<=0? 0:1);
});
var accuPct = 0;
setTimeout(function(){
pollnodes._$forEach(function(node, idx){
var poll = parseFloat(node.getAttribute('data-poll'))||0,
percent = 0;
if (poll>0) {
pollCount--;
if (pollCount===0) {
percent = 100 - accuPct;
}else{
percent = Math.floor(poll*100/totalpoll);
accuPct += percent;
}
}
node.querySelector('.rect').style.width = percent+'%';
node.querySelector('.ct').innerText = percent+'%';
});
}, 20);
blk[0].querySelector('.count b').innerText = totalpoll;
}
};
_pro.__savePoll2Server = function(key, optIdx){
var _paramObj = _ut._$query2object( document.URL.split('?')[1]||'' );
var data = {
pollKey: key,
optionIndex: optIdx,
};
_.extend(data, _paramObj);
request('/activity/h5/poll.html', {
data:data,
method: 'POST',
norest: true,
type: 'json',
onload: function(dt){
if (dt && dt.code==200) {
//成功
}else{
toast.clear();
setTimeout(function(){
toast.show('网络连接错误');
}, 1000);
}
},
onerror: function(dt){
toast.clear();
setTimeout(function(){
toast.show('网络连接错误');
}, 1000);
}
});
};
return _p._$$Polls;
},1,20,2,87,68,74,25);
I$(120,function (_k, _t, _e, _u, _, clientinfo){
var _p={}, _pro;
_p._$$LazyImg = _k._$klass();
_pro = _p._$$LazyImg._$extend(_t._$$LazyImage);
/**
* 控件重置
*
* @protected
* @method module:pro/widget/util/lazyimg._$$LazyImg#__reset
* @param  {Object} arg0 - 配置信息
* @return {Void}
*/
_pro.__reset = function(_options){
this.__lazyClass = _options.lazyClass||'';  //j-lazy
this.__loadingClass = _options.loadingClass || ''; //loading
this.__loaddedClass = _options.loaddedClass || ''; // loaded
this.__LoadErrorClass = _options.loadErrorClass || ''; // image load error
this.__fadeIn = !!_options.fadeIn; //是否启用淡入，默认不启用
this.__container = _options.container||document;
this.__tolerance = _options.tolerance || 10;//容差，防止左右混排时出现问题
this.__preloadDist = _options.preloadDist || 0; //屏幕下方未显示出来的图片，需提前加载的距离，单位为屏幕高度，可以0.5表示预加载屏幕高度的0.5倍距离
//如果设置为auto，则由程序自动根据网络状况来判断
this.__super(_options);
this.__fadeInClassInit = 'u-lazyimg-preload';
this.__fadeInClassLoad = 'u-lazyimg-loaded';
if (this.__lazyClass) {
this.__lazyClassReg = new RegExp('(\\s|^)'+this.__lazyClass+'(\\s|$)');
}
if (this.__loadingClass) {
this.__loadingClassReg = new RegExp('(\\s|^)'+this.__loadingClass+'(\\s|$)');
}
if (this.__fadeIn) {
this.__fadeInInitReg = new RegExp('(\\s|^)'+this.__fadeInClassInit+'(\\s|$)');
}
if (this.__lazyClass ||
this.__loadingClass ||
this.__LoadErrorClass ||
this.__loaddedClass ||
this.__fadeIn) {
this._$addEvent('onappend',this.__appendImg._$bind(this));
}
this.__onImgLoadHandle = this.__onImgLoad._$bind(this);
};
/**
* 取待验证资源列表
*
* @protected
* @method module:pro/widget/util/lazyimg._$$LazyImg#__getResourceList
* @param  {Node} arg0 - 内容所在容器节点
* @return {NodeList} 需要处理的图片列表
*/
_pro.__getResourceList = function(_parent){
//在图片超过300张时，耗时超过3ms，改为缓存图片，减少查找消耗
if (!this.__nodeList) {
this.__nodeList = this.__container.querySelectorAll('img'+ (this.__lazyClass?'.'+this.__lazyClass:''));
}
return this.__nodeList;
};
_pro.__doCheckScrollPosition = function (evt) {
this.__throtteScroll(evt);
};
// 为__doCheckScrollPosition 函数做一次 70毫秒(4 frames)的运行间隔控制，在事件触发间隔超过70毫秒
// 后才触发，如果scroll 事件的触发间隔小于70毫秒，则__doCheckScrollPosition 只会在scroll
// 事件都结束后，才运行一次
// 用于处理移动浏览器滚动时异步加载占用资源过多，导致滑动卡顿的问题；
_pro.__throtteScroll = (function(){
// 如果是ios，则leading=true, 因为iOS大部分时候scroll事件要到滚动停止后才触发
var leading = !!navigator.userAgent.match(/(iPhone|iPod|iPad)/i);
return _.throttle(function(evt){
var self = this;
_.nextFrame(function(){
self.__doCheckScroll(evt);
});
}, 160, {leading: leading});
})();
//remove事件已经取消
_pro.__doCheckScroll = (function(){
var _nmap = {
'-1':'onremove',
'1':'onappend'
};
return function(_event){
var _list = this.__getResourceList();
//批量检查图片位置
var _nodeStats = this.__batchCheckImg(_list);
if (!_nodeStats || !_nodeStats.nodes) { return; }
//将插入图片工作放到下一帧
_.nextFrame(
function(){
Array.prototype.forEach.call(_nodeStats.nodes, function(_node, _idx){
// check node
var _eobj = {
target:_node,
config:''
};
this._$dispatchEvent('oncheck',_eobj);
// check action result
var _ret = _eobj.value;
if (!_ret){
_ret = _nodeStats.results[ _idx ];
}
var _name = _nmap[_ret];
if (!_name){
return;
}
// check action
_eobj = {
target:_node,
config:this.__getSettingInfo(_node)
};
this._$dispatchEvent(_name,_eobj);
if (!!_eobj.stopped){
return;
}
// do action
if (_ret==-1){
this.__doRemoveResource(_node);
}else{
this.__doAppendResource(
_node,_eobj.config
);
}
}, this
);
}._$bind(this)
);
};
})();
_pro.__getWinHeight = function(){
var winH;
if(window.innerHeight) { // all except IE
winH = window.innerHeight;
}else if (window.document.body) { // other
winH = window.document.body.clientHeight;
}
return winH || 0;
};
/**
* 判断元素是否处于需要加载的范围内
* @param  {Node} _node 需要检查的节点
* @param  {Number} _winH 需要加载的区域高度（默认为可见区域高度）
* @return {Boolean}       true 范围内，否则范围外
*/
_pro.__isInViewport = function(_node, _winH){
var rect = _node.getBoundingClientRect();
if (rect.bottom >= 0 && rect.top <= _winH) {
return true;
}
return false;
};
/**
* 获取预加载距离
* @return {Number} 预加载距离倍数，不包括可见区域
*/
_pro.__getPreloadDist = (function(){
//获取网络类型， wifi, 4g, 3g, 2g, cellular
function getConnectionType(){
return clientinfo.network;
}
//网络类型对应的自动预加载倍率
var preloadCfg = {
'wifi': 3,
'cellular': 1,
'4g': 2,
'3g': 1,
'2g': 1
};
return function(){
if (this.__preloadDist === 'auto') {
var netType = getConnectionType(),
dist = preloadCfg[netType];
if (typeof dist === 'number') {
return dist;
}
}else if(typeof this.__preloadDist === 'number'){
//按用户设置的倍率返回
return this.__preloadDist;
}
return 1;
};
})();
// 一次性找出需要处理的图片
_pro.__batchCheckImg = function(_list){
if (!_list || _list.length===0) { return; }
var winH = this.__getWinHeight();
//如果定义了预加载距离，则加上预加载距离
winH += this.__getPreloadDist()*winH;
//大于50张图片时，使用二分法查找到一个出现在viewport 的元素，然后分别向前后查找相邻出现的元素
var len = _list.length, anchor=-1 , i;
// 优先检查第一个元素是否在显示范围内
if (this.__isInViewport(_list[0], winH)) {
anchor = 0;
}
if ( len > 30 && anchor===-1) {
var action, rect, fromIdx=0, toIdx=len-1, deadloop = 0;
do{
i = Math.floor((toIdx+fromIdx)/2);
rect = _list[i].getBoundingClientRect();
//是否在viewPort中
if (rect.bottom >= 0 && rect.top <= winH) {
anchor = i; //找到
break;
}
if (rect.top < 0) {
fromIdx = i;
}else{
toIdx = i;
}
if (toIdx - fromIdx <= 1) { anchor=i; break; }
//可能的死循环检测，deadloop超过1000则认为是死循环，强制结束
deadloop++;
if (deadloop > 1000) { break; }
}while(1);
}
//分别向两边查找可见图片
var arrLeft = [], arrRight = [], tlrLeft=this.__tolerance, tlrRight=this.__tolerance, arrToCheck;
if (anchor>=0) {
// 向前
for (i = anchor; i >=0; i--) {
if (this.__isInViewport(_list[i], winH)) {
arrLeft.push(_list[i]);
}else{
tlrLeft--;
if (tlrLeft===0) {
break;
}
}
}
// 向后
for (i = anchor+1; i < len; i++) {
if (this.__isInViewport(_list[i], winH)) {
arrRight.push(_list[i]);
}else{
tlrRight--;
if (tlrRight===0) {
break;
}
}
}
arrToCheck = arrLeft.reverse().concat(arrRight);
}else{
// 少于50张、或者没有找到时直接返回
arrToCheck = _list;
}
var arrCheckResults = [];
for (i = 0; i < arrToCheck.length; i++) {
arrCheckResults.push(this.__doCheckResource(arrToCheck[i], winH, anchor>=0? true:false));
}
return {
nodes: arrToCheck,
results: arrCheckResults
};
};
_pro.__doCheckResource = function(_target, _winH, _inViewPort){
var _config = this.__getSettingInfo(_target),
// not src
// src is blank image
// src not equal to data-src
_holded =  !_target.src||
_target.src.indexOf(this.__holder)>=0||
_target.src.indexOf(_config.src)<0;
//如果图片没有定义data-src属性，说明不需要异步加载
if (!_config.src){
return 0;
}
// check resource append
if (!_inViewPort) {
_inViewPort = this.__isInViewport(_target, _winH);
}
if (_holded && _inViewPort){
return 1;
}
// do nothing
return 0;
};
_pro.__getSettingInfo = function(_node){
var _ret = {};
this.__name.split(',').forEach(function(_name){
_ret[_name] = _node.getAttribute('data-'+_name);
});
_ret.src = this.__getWebpSrc(_ret.src);
return _ret;
};
// 去除lazy class 标记， 下次检查将不再涉及到此img节点
_pro.__appendImg = function(evt){
var cls = evt.target.className;
if (this.__lazyClassReg) {
cls = cls.replace(this.__lazyClassReg, ' ');
}
if (this.__loadingClass && !this.__loadingClassReg.test(cls)) {
cls = cls+' '+this.__loadingClass;
}
if (this.__fadeIn && !this.__fadeInInitReg.test(cls)) {
cls = cls + ' ' + this.__fadeInClassInit;
}
evt.target.className = cls;
if (this.__loadingClass || this.__loaddedClass || this.__fadeIn) {
evt.target.addEventListener('load', this.__onImgLoadHandle, false);
}
if (this.__LoadErrorClass) {
evt.target.addEventListener('error', this.__onImgLoadHandle, false);
}
};
// 图片加载事件， 在图像加载完成后，去掉图像的 loading class 标记
_pro.__onImgLoad = function(evt){
//去除加载中类, 添加加载完成类
var cls = evt.target.className;
if (this.__loadingClassReg) {
cls = cls.replace(this.__loadingClassReg, ' ');
}
if(evt.type=='load' && this.__loaddedClass){
cls = cls + ' ' + this.__loaddedClass;
}
if (this.__fadeIn) {
cls = cls.replace(this.__fadeInInitReg, ' '+this.__fadeInClassLoad+' ');
}
//如果图片加载出错，增加加载错误类
if (this.__LoadErrorClass && evt.type==='error') {
cls = cls + ' ' + this.__LoadErrorClass;
}
evt.target.className = cls;
evt.target.removeEventListener('load', this.__onImgLoadHandle, false);
evt.target.removeEventListener('error', this.__onImgLoadHandle, false);
};
/**
* 添加资源, 如果当前环境支持webp，则会添加webp参数
*
* @protected
* @method module:util/lazy/image._$$LazyImage#__doAppendResource
* @param  {Node}   arg0 - 资源节点
* @param  {Object} arg1 - 配置信息
* @return {Void}
*/
_pro.__doAppendResource = function(_node,_conf){
_node.src = _conf.src||this.__holder;
};
_pro.__getWebpSrc = function(src){
var webpCp = 10; //webp 图片可以提高压缩比10
if (_._$supportWebp() && src) {
if (src.indexOf('imageView')>0 &&
src.indexOf('thumbnail=')>0 &&
src.indexOf('type=webp')<0 ) {
src = src.replace('thumbnail=', 'type=webp&thumbnail=');
//webp 图片可以提高压缩比10
var re = src.match(/[\?&]+quality=[0-9]+/);
if ( re && re.length===1 ) {
var qu = parseInt(re[0].split('=')[1], 10);
if (typeof qu === 'number' && qu-webpCp > 0) {
src = src.replace(/([\?&]+quality=)[0-9]+/, '$1'+(qu-webpCp));
}
}
}
}
return src;
};
//强制刷新, 比如通过js向页面插入了图片，需要调用此操作，以发现新的图片需要处理
_pro._$refresh = function(){
this.__nodeList = null;
this.__doCheckScrollPosition();
};
return _p;
},1,70,4,2,74,75);
I$(139,"<div class=\"u-loginWin\" r-class='{\"show\": show == true}'> \t<div class=\"m-topnav\" id=\"topbar-box\"> \t\t<div class=\"m-topnavbar\" id=\"auto-id-1454071688247\"> \t\t\t<span id=\"backbtn\" class=\"u-icn18 backbtn\" on-click={{this.show(false)}}></span> \t\t\t<span class=\"tit\" id=\"toptitle\">登录</span> \t\t</div> \t</div> \t<div class=\"body\"> \t<div class=\"logo\"> \t\t<img src=\"http://haitao.nos.netease.com/b0a8ba76352b4d6d92d1c2df308d3819.jpg?imageView&thumbnail=300x0&quality=100\"> \t</div> \t<p class=\"tip\">{{text}}</p> \t<div class=\"form-login\"> \t\t<form ref=loginform action=\"https://reg.163.com/logins.jsp\" autocomplete=\"off\" method=\"post\" {{#if loginType==1}}target=\"loginIframeAgent\"{{#else}}target=\"_self\"{{/if}}> \t\t\t<div class=\"fitm\"> \t\t\t    <div class=\"u-suggest\"> \t\t\t    \t<input ref=username r-model={{username}} class=\"u-ipt\" type=\"text\" name=\"username\" autocomplete=\"off\" data-required=\"true\" placeholder=\"网易邮箱\"/><i ref=namedel class=\"u-icn6\" style=\"display:none;\" on-click={{this.namedelete($event)}}>&nbsp;</i> \t\t\t    </div> \t\t\t</div> \t\t\t<div class=\"fitm\"> \t\t\t\t<input ref=pwd class=\"u-ipt\" type=\"password\" name=\"password\" autocomplete=\"off\" data-required=\"true\" placeholder=\"密码\"/> \t\t\t</div> \t\t\t<div class=\"fitm fitm-1\"> \t\t\t  <a class=\"submit u-btn u-btn-1 s-fc5\" href=\"javascript: void(0);\" on-click={{this.login()}}>登录</a> \t\t\t</div> \t\t\t{{#if loginType==1}} \t\t\t<input type=\"hidden\" value=\"http://global.163.com/urs/redirect.html?target=http%3A%2F%2Fm.kaola.com%2Fagent%2FloginAgent.htm%3Ffrom%3DiframeLogin\" name=\"url\" /> \t\t\t<input type=\"hidden\" value=\"http://m.kaola.com/agent/loginAgent.htm\" name=\"url2\" /> \t\t\t<input type=\"hidden\" name=\"append\" value=\"1\"/> \t\t\t{{#else}} \t\t\t<input type=\"hidden\" value=\"http://global.163.com/urs/redirect.html?target={{encodeURIComponent(backUrl)}}\" name=\"url\" /> \t\t\t{{#if backUrl2}} \t\t\t<input type=\"hidden\" value=\"http://global.163.com/urs/redirect.html?target={{encodeURIComponent(backUrl2)}}\" name=\"url2\" /> \t\t\t{{/if}} \t\t\t<input type=\"hidden\" name=\"noRedirect\" value=\"1\"/> \t\t\t{{/if}} \t\t\t<input type=\"hidden\" value=\"1\" name=\"savelogin\" /> \t\t\t<input type=\"hidden\" value=\"kaola\" name=\"product\" /> \t\t\t<input type=\"hidden\" value=\"kaola.com,163.com\" name=\"domains\" /> \t\t</form> \t\t<div class=\"fitm fitm-2\"> \t\t\t<a class=\"forgot f-fl\" href=\"http://reg.163.com/getpasswd/RetakePassword.jsp\">忘记密码?</a><span class=\"f-fr\">没有网易邮箱？<a class=\"regis\" href=\"http://reg.163.com/reg/regClient.jsp?product=kaola&url={{loginredirect}}&loginurl={{loginredirect}}\">快速注册&gt;</a></span> \t\t</div> \t</div> \t<div class=\"thirdpart\"> \t\t<p class=\"tit\"><span class=\"txt\">或从以下方式登录</span></p> \t\t<div class=\"lnk\"> \t\t\t<a class=\"u-icn4\" href=\"http://reg.163.com/outerLogin/oauth2/connect.do?product=kaola&url2={{encodeURIComponent(backUrl2)}}&domains=global.163.com&target=3&url={{loginredirect}}\">&nbsp;</a> \t\t\t<a class=\"u-icn4 u-icn4-1\" href=\"http://reg.163.com/outerLogin/oauth2/connect.do?product=kaola&url2={{encodeURIComponent(backUrl2)}}&domains=global.163.com&target=1&url={{loginredirect}}\">&nbsp;</a> \t\t\t<a class=\"u-icn4 u-icn4-2\" href=\"http://reg.163.com/outerLogin/oauth2/aliPayFastLogin.do?product=kaola&redirect_error=http%3A%2F%2Fglobal.163.com%2Furs%2Fredirect.html%3Ftarget%3Dhttp%253A%252F%252Fm.kaola.com%252Flogin.html&redirect_url={{loginredirect}}\">&nbsp;</a> \t\t</div> \t</div> \t</div> </div> {{#if loginType==1 && !!show}} <iframe id=\"loginIframeAgent\" name=\"loginIframeAgent\" frameborder=\"0\" width=\"0\" height=\"0\" src=\"\" ></iframe> {{/if}}");
I$(138,function (_, _ut, BaseComponent, tpl, toast, getUserinfo){
var LoginWin = BaseComponent.extend({
template: tpl,
data:{
loginType: 2,	//默认2是刷新跳转URL,1是登录成功后调用方法
backUrl:'',
backUrl2:location.href,
show:false,
username:'',
text:'网易考拉海购是网易旗下产品，您可以直接使用网易邮箱账号登录：'
},
errorText: {
"412" : "您尝试的次数已经太多，请过一段时间再试。",
"414" : "您的IP登录失败次数过多，请稍后再试。",
"415" : "您今天登录错误次数已经太多，请明天再试。",
"416" : "您的IP今天登录过于频繁，请稍后再试。",
"417" : "您的IP今天登录次数过多，请明天再试。",
"418" : "您今天登录次数过多，请明天再试。",
"419" : "您的���录操作过于频繁，请稍候再试。",
"422" : "帐号被锁定，请您解锁后再登录！",
"424" : "该靓号服务已到期，请您续费！",
"500" : "系统繁忙，请您稍后再试！",
"503" : "系统维护，请您稍后再试！",
"425" : "账号不存在！", //外域帐号并且在激活有效期以内，但尚未激活
"426" : "账号不存在！", //外域帐号并且已经过了激活有效期限！
"420" : "账号不存在！", //用户名不存在
"460" : "登录密码错误！", //密码不正确
"x" : "系统繁忙，请您稍后再试！" //未定义的错误
},
config: function(data){
this.supr(data);
data.backUrl = data.backUrl||location.href;
data.loginredirect = encodeURIComponent('http://global.163.com/urs/redirect.html?target='+encodeURIComponent(data.backUrl));
this.$watch('username', function(newstr, oldstr){
if(newstr){
this.$refs.namedel.style.display = '';
}else{
this.$refs.namedel.style.display = 'none';
}
}._$bind(this))
},
init: function(){
//初始化页面
//绑定方法请求回调
window.loginCallback = this.loginCb._$bind(this);
setTimeout(this.show._$bind(this,true),100)
},
reset: function(data){
_.extend(this.data, data)
},
loginCb: function(errCode, userId, jumpUrl){
if(errCode > 0){
toast.show(this.errorText[errCode] || this.errorText.x);
return;
}
var userinfo = getUserinfo();
//登陆成功，刷新profile, 确认是否登陆成功
userinfo._$refresh(function(profile){
if (!profile || !profile.account) {
//没有登陆成功
return;
}
//确认登陆成功
this.show(false, 1);
this.$emit('logincallback', profile);
}._$bind(this));
},
login: function(){
var username = this.$refs.username, pwd = this.$refs.pwd;
if(!username.value || !pwd.value){
return;
}
this.$refs.loginform.submit();
},
usernamefocus: function(type){
if(!!type){
this.$refs.namedel.style.display = '';
}else{
setTimeout(function(){
this.$refs.namedel.style.display = 'none';
}._$bind(this),100)
}
},
namedelete: function(event){
this.data.username = '';
},
show: function(type, flag){
this.data.show = !!type;
this.$update();
this.$emit('hide', true);
if(!type && !flag){
//如果不是通过登陆成功关闭的浮层，说明没登陆
//返回登陆失败回调
this.$emit('logincallback', false);
}
}
})
return LoginWin;
},74,2,23,139,25,27);
I$(121,function (userinfo, clientinfo, appbridge, LoginWin){
var _ = {};
/**
* 登陆状态获取的异步方式
* @param  {Function} cb 回调函数，返回参数true/false
* @return {void}     无返回值
* @public
*/
_.isLogin = function(cb){
if (window.__isPageCached===1) {
userinfo()._$getProfile(function(profile){
cb(profile && profile.account);
});
}else{
cb(!!window.__isKaolaLogin || !!nej.j._$cookie("NTES_SESS"));
}
};
/**
* 跳转到登陆页，或者弹出登录浮层
* 登陆分四种情况：
* A： App中， 且App版本大于等于2.4.0， 直接使用App原生的登陆窗口， 登陆后*不*刷新页面，可以回调
* B： App中， 且App版本低于2.4.0， 直接使用App原生的登陆窗口， 登陆后*会*刷新页面，无回调
* C：wap环境，使用网易账号登陆， 则弹出登录浮层，登陆后*不*刷新页面，可以回调
* D：wap环境，使用第三方账号登陆，弹出登录浮层后跳到第三方页面，登陆完成后*会*刷新返回页面，无回调
* @param  {String}   targetUrl     可选参数，表示登陆完成后跳回的目的页面
* @param  {Function} callback      可选参数，登陆登陆成功、或者用户中断登陆
*       @param {Boolean}  第一个参数，返回是否登陆成功
*       @param {Object}  第二个参数，返回用户profile信息（包括用户名）
* @param  {Boolean}   addAfterlogin 可选参数，用于刷新页面返回后再次出发流程继续，实用性有限，一般情况下请勿使用
* @return {void}                 无
* @public
*/
_.toLogin = function(targetUrl, callback, addAfterlogin){
var bridge = appbridge(),
user = userinfo();
var _target = targetUrl || window.location.href;
if (addAfterlogin && _target.indexOf('afterlogininvoke=1')<0 ) {
if (_target.indexOf('?') > 0) {
_target = _target.replace('?', '?afterlogininvoke=1&');
}else if(_target.indexOf('#') > 0){
_target = _target.replace('#', '?afterlogininvoke=1#');
}else{
_target += '?afterlogininvoke=1';
}
}
if ( !clientinfo.isApp ){
//非App中的情况
// window.location.href = "/login.html?target="+window.encodeURIComponent(_target);
this.showLoginWin(function(profile){
if (!profile) {
callback(false);
return;
}
//确认登陆成功
callback(true, profile);
});
return;
}
if ( !clientinfo._$isAppVerEqOver('2.4') ) {
//App中， 低于2.4版本的情况
window.location.href = "/login.html?target="+window.encodeURIComponent(_target);
return;
}
//App 2.4 上采用App的登陆接口， 其它还是采用老的接口
bridge._$openLoginForm(function(res){
if (!res || !res.token || !res.ursId) {
callback(false);
return;
}
//App 端已经登陆成功，待页面换Cookie
user._$refresh(function(profile){
if (!profile || !profile.account) {
//App 端用户取消或者中断了登陆，没有登陆成功
callback(false);
return;
}
//登陆成功
callback(true, profile);
}, {ursToken: res.token, ursId: res.ursId});
});
};
/**
* 异步判断用户是否登陆，如果没有登陆则直接跳登陆页，否则直接调用回调函数
* @param  {Function} cb  回调，无参数
* @return {void}       无
*/
_.afterLogin = function(cb){
this.isLogin(function(ok){
if (ok){
cb();
}else{
this.toLogin('', function(loginOk){
if (loginOk) { cb(); }
});
}
}._$bind(this));
};
/**
* 当前页面是否支持不刷新登陆
* @return {Boolean} true:支持，false: 不支持
*/
_.isInPageLoginAvailable = function(){
// App 中，且App版本低于2.4 时， 不支持无刷新登陆
if ( clientinfo.isApp && !clientinfo._$isAppVerEqOver('2.4') ){
return false;
}
return true;
};
_.afterLoginRefresh = function(cb){
function ls(val){
var lsname = 'afterlogininvoke';
try{
if (val != undefined) {
return sessionStorage.setItem(lsname, val);
}else{
return sessionStorage.getItem(lsname);
}
}catch(e){
return null;
}
};
var lsLbl = ls();
ls('');
if (_.isInPageLoginAvailable()) { return; }
//检查之前设定的标记, 如果设定了，则开始回调
var queryLbl = location.href.match(/(\&|\?)afterlogininvoke=1/);
if (lsLbl==='1' && queryLbl) {
var user = userinfo();
user._$getProfile(function(profile){
if (profile && profile.account){ cb(); }
});
return;
}else{
ls('1');
}
};
/**
* 显示wap登陆弹窗
* @param  {Function} callback 回调，用于返回登陆状态
* @return {void}            无
* @private
*/
_.showLoginWin = function(callback) {
if (this.__loginWin) {
this.__loginWin.show(true);
} else {
this.__loginWin = new LoginWin({
data: {
loginType: 1
}
})
this.__loginWin.$inject(document.body);
this.__loginWin.$on('logincallback', function(ok) {
callback(ok);
this.__dispatchLoginEvt();
}._$bind(this))
}
};
/**
* 在document上触发异步登陆成功消息，通知其他界面更新
* @return {void} 无
* @private
*/
_.__dispatchLoginEvt = function(){
var event = document.createEvent('Event');
event.initEvent('asyncLogin', false, true);
document.dispatchEvent(event);
};
return _;
},27,75,28,138);
I$(122,function (_k,_t,_c){
var CountDown =_k._$klass(),
_pro = CountDown._$extend(_t._$$EventTarget);
_pro.__reset = function(options){
this.__super(options);
this.__totalTime = options.totalTime||0;
this.__interval = options.interval || 1000; //默认每秒钟触发一次
this.__id = (options.id || (+new Date()) )+'';
this.__name = options.name||'n'; //同一个name下只允许存在一个计时器，之前的会被清空
this.__lsKey = 'klcountdown';
this.__startTime = this.__getStartTime();
this.__addEvents();
};
_pro.__addEvents = function(){
if (this.__totalTime <= this.__interval) {
this.__lasttick = true;
this.__tocounter = setTimeout(this.__tick._$bind(this), this.__totalTime);
}else{
this.__counter = setInterval(this.__tick._$bind(this), this.__interval);
}
};
_pro.__tick = function(){
var leftTime = this.__startTime+this.__totalTime - (+new Date());
if (leftTime >= this.__interval) {
this.__onUpdate(leftTime);
}else if (leftTime <=0){
!!this.__counter && clearInterval(this.__counter);
this.__onStop();
}else{
clearInterval(this.__counter);
this.__tocounter = setTimeout(this.__tick._$bind(this), leftTime);
}
};
_pro.__onUpdate = function(leftTime){
this._$dispatchEvent('onupdate', this.__getTimeObj(leftTime));
};
_pro.__onStop = function(){
this._$dispatchEvent('onstop', this.__getTimeObj(0));
};
_pro.__getStartTime = function(){
var now=+new Date(), cached = this.__getOrSaveTimeCache();
if (cached && cached.start) {
return parseFloat(cached.start)||0;
}
return now;
};
_pro.__getOrSaveTimeCache = function(){
var timeCache = this.__getTimeCache()||{};
if (timeCache && timeCache[this.__id]) {
return timeCache[this.__id];
} //同一个id仅记录最初的
var st = +new Date();
timeCache[this.__id] = {
start: st,
end: st+this.__totalTime,
name: this.__name
};
timeCache = this.__purgeOutdate(timeCache);
this.__LS(this.__lsKey, timeCache);
};
_pro.__getTimeCache = function(){
var history = this.__LS(this.__lsKey);
if (!history) { return; }
try{
history = JSON.parse(history);
}catch(e){
return;
}
if (typeof history==='object') {
return history;
}else{
return;
}
};
_pro.__purgeOutdate = function(tc){
var now = +new Date(), newtc={};
for(var key in tc){
if (tc.hasOwnProperty(key)) {
if (tc[key].end > now){
if (this.__name != tc[key].name) {
newtc[key] = tc[key];
}else{
//相同name的只保留当前计时器
if (this.__id === key) {
newtc[key] = tc[key];
}
}
}
}
}
tc = null;
return newtc;
};
_pro.__LS = function(key, val){
var obj;
if (window.localStorage && localStorage.getItem){
try{
if (arguments.length===1) {
return localStorage.getItem(key);
}else if(arguments.length>=2){
return localStorage.setItem(key, JSON.stringify(val));
}
}catch(e){
return '';
}
}else{
if (arguments.length===1) {
return _c._$cookie(key);
}else if (arguments.length>=2){
return _c._$cookie(key, JSON.stringify(val));
}
}
};
// 根据毫秒数计算剩余时间对象
_pro.__getTimeObj = (function(){
//转化为两位数字
var fillZ = function( N ){
return (N < 10 ? "0" : "" )+N;
};
var onemin = 60000, onehour = 60*onemin, oneday = 24*onehour;
return function(num, returnObj){
var time = +num > 0 ? +num : 0;
var d = parseInt(time / oneday, 10),
h = parseInt(time % oneday / onehour, 10),
m = parseInt(time % oneday % onehour / onemin, 10),
s = parseInt(time % oneday % onehour % onemin / 1000, 10),
ms = parseInt(time % oneday % onehour % onemin % 1000, 10);
//优化临界点显示
if (d === 1 && h === 0) {
d = 0;
h = 24;
}
var info = [fillZ(d),fillZ(h),fillZ(m),fillZ(s)];
return {
d : d, h : h, m: m, s : s, ms:ms,
dd : fillZ(d), hh: fillZ(h), mm : fillZ(m), ss : fillZ(s)
};
};
})();
_pro.__destory = function(){
this.__super();
!!this.__counter && clearInterval(this.__counter);
!!this.__tocounter && clearTimeout(this.__tocounter);
};
return CountDown;
},1,20,43);
I$(140,"<div class=\"m-mask m-bigimagemask2\" on-click={{this.hideBigImg()}} on-touchmove=\"{{this.onMaskTouchMove($event)}}\"> \t<div class=\"m-bigimagewrap\" style=\"height:{{docHeight}}px\"> \t\t<img src=\"{{imgUrl}}\"> \t</div> </div>");
I$(123,function (_ut,BaseComponent,tpl){
var ImageShow =  BaseComponent.extend({
template: tpl,
config: function(data){
_ut.extend({})
},
init: function(){
this.supr();
},
hideBigImg: function(){
this.destroy();
},
onMaskTouchMove: function(event){
event.preventDefault();
}
})
return ImageShow;
},74,23,140);
I$(109,function (_k, _t , _ut,_v,_e, _, Slider, _q, request, toast, gotop, Nav, navtab, Polls, lazy, login, clientinfo, _countdown, ImageShow, _p,_o,_f,_r,_pro) {
_p._$$Tpl = _k._$klass();
_pro = _p._$$Tpl._$extend(_t._$$EventTarget);
_pro.__init = function(_options) {
this.__supInit(_options);
this.__setLazyload();
//初始化倒计时模块
this.__initCountdown();
// tab初始化
this.__tabs = _q('.js-navbox');
this.__tabs._$forEach(function(_node, index){
navtab._$allocate({
tabbar: _node,
cbTabChange: this.__cbTabChange._$bind(this)
});
}._$bind(this));
// 我的收藏按钮
this.__myFavorite = _e._$get('myFavorites');
this.__setAdImgOfItemBlock();
this.__setBrandDescToggle();
this.__addEvent();
//初始化跳转链接
var outDateJumpUrl = _e._$get('outdatejumpurl');
if(outDateJumpUrl){
var redCount = Number(_.getUrlParam('redCount')||0);
if(redCount > 2){
outDateJumpUrl.href = '/index.html';
}else{
redCount++;
outDateJumpUrl.href = _.insertParamIntoUrl(outDateJumpUrl.href, ('redCount='+redCount))
}
}
Polls._$allocate(); //初始化投票区块
setTimeout(function(){
this.__removeParamFromCouponUrl();
//存在全局导航时，屏蔽返回顶部
if (window.__kaolaNavEnt && window.__kaolaNavEnt.length) {
var actnav = new Nav({data: {rawList: __kaolaNavEnt}});
actnav.$inject(document.body);
}else{
//go top 初始化
gotop._$create(document.body);
}
// 初始化图片轮播
this.__slides = _q('.m-slide');
this.__slides._$forEach(function(_node, _index){
var dots = _node.parentNode.querySelectorAll('.imgpagebox li');
Slider._$allocate({
box: _node,
loop: true,
auto: true,
width: document.body.clientWidth,
scrollTime: 300,
slideInterval: 3000,
callback: function(idx){
for (var i = dots.length - 1; i >= 0; i--) {
if (dots[i].className === 'active' && i!==idx){
dots[i].className='';
}
if (dots[i].className !== 'active' && i===idx){
dots[i].className='active';
}
};
}
});
});
//初始化品牌墙轮播， 多于一屏幕的才初始化
this.__brandWalls = _q('.m-brand-wall .slide-scroll');
this.__brandWalls._$forEach(function(_node, _index){
var dots = _node.parentNode.querySelectorAll('.imgpagebox li');
Slider._$allocate({
box: _node,
loop: false,
auto: false,
width: document.body.clientWidth,
scrollTime: 300,
// slideInterval: 3000,
callback: function(idx){
for (var i = dots.length - 1; i >= 0; i--) {
if (dots[i].className === 'active' && i!==idx){
dots[i].className='';
}
if (dots[i].className !== 'active' && i===idx){
dots[i].className='active';
}
};
}
});
});
this.__sendStatics();
//初始化点赞状态
this.__initLikeStatus();
}._$bind(this), 300);
//低版本隐藏查看更多
this.__hideMore();
};
_pro.__cbTabChange = function(_index){
this._$dispatchEvent('cbTabChange',_index);
};
_pro.__initCountdown = function(){
var _countNodes = _e._$getByClassName(document.body,'j-countdownbox');
if (!_countNodes) return;  //无需倒计时
this.__countdown = {};
_countNodes.forEach(function(_item,_index){
var _leftTime = Number(_e._$dataset(_item,'left'))||0,
_endType = _e._$dataset(_item,'end');
if(_leftTime <= 0){
toast.show('该倒计时已过期!');
return;
};
var _childNodes = _e._$getByClassName(_item,'item-1');
this.__countdown[_index] = _countdown._$allocate({
totalTime: _leftTime,
interval: 1000,
name: 'bd' + _index,
onupdate: this.__cbUpdateCountdown._$bind(this,_childNodes),
onstop: this.__cbStopCountdown._$bind(this,_endType)
});
}._$bind(this));
};
_pro.__cbUpdateCountdown = function(_childNodes,_leftTimeObj){
var _str = _leftTimeObj.dd + _leftTimeObj.hh + _leftTimeObj.mm + _leftTimeObj.ss;
_str.split('').forEach(function(_num,_index){
_childNodes[_index].innerText = _num;
})
};
_pro.__cbStopCountdown = function(_endType){
if(_endType === 'refresh') location.reload();
};
_pro.__hideMore = function(){
var isHighVer = _.isGteKaolaVer(2.4)==1;
if(!isHighVer){
var more = document.querySelector('.m-worth-last .more');
if (more) {
more.style.display = "none";
}
}
};
_pro.__addEvent = function(){
//屏幕旋转后，重新计算图片高度
var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange  ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function(evt){
setTimeout(function(){
this.__setAdImgOfItemBlock();
}._$bind(this), 200);
}._$bind(this));
// 页面事件代理
_v._$addEvent('box','click',this.__onBoxClick._$bind(this));
_q('.m-share .icon')._$on('click', this.__onShareBtnClick._$bind(this));
_q('.j-sendCard img')._$on('click', this.__onWarmCardShareBtnClick._$bind(this));//暖心卡“发送贺卡”
};
_pro.__initLikeStatus = function(){
var _likeBtns = _e._$getByClassName(document.body,'js-likeBtn');
if(!!_likeBtns && _likeBtns.length > 0){
var _ids = [],_elems = {};
_likeBtns.forEach(function(item){
_ids.push(item.dataset.gid||0);
_elems[item.dataset.gid] = item;
})
_ids = _ids.join(',');
this.__doInitLikeStatus(_ids,_elems);
}
};
_pro.__doInitLikeStatus = function(_ids,_elems){
var _options = {
activityShowId:__klActivityShowId||0,
goodsIds:_ids,
deviceUdid:clientinfo.deviceUdID||''
};
request('/activity/discovery/is_favor.html',{
data:_options,
method:'POST',
type:'json',
norest:true,
onload: this.__cbInitLikeStatus._$bind(this,_elems),
onerror: function(){}
})
};
_pro.__cbInitLikeStatus = function(_elems,_cbdata){
if(!!_cbdata && !!_cbdata.success){
var _result = _cbdata.data||[];
_result.forEach(function(item){
if(!!item){
_e._$addClassName(_elems[item],'u-favorbtn2-1');
}
});
}
};
_pro.__onBoxClick = function(_event){
var _target = _v._$getElement(_event);
var gid,msg;
gid = _e._$dataset(_target,'gid');
if(_e._$hasClassName(_target,'js-favor') && !_e._$hasClassName(_target,'z-favored')){
login.afterLogin(function(){
this.__doFavorite({goodsId:gid},_target);
}._$bind(this));
}else if(_e._$hasClassName(_target,'js-likeBtn') && !_e._$hasClassName(_target,'u-favorbtn2-1')){  //有点赞功能但是未点过赞
var _options = {
activityShowId:__klActivityShowId||0,
goodsId:gid||0,
deviceUdid:clientinfo.deviceUdID||''
};
this.__onLikeBtnClick(_options,_target);
}else if(_e._$hasClassName(_target,'j-showBigImage')){
var _imgUrl = _target.src;
if(!_imgUrl) return;
this.__imageShow = new ImageShow({
data:{
imgUrl:_imgUrl
}
});
this.__imageShow.$inject(document.body);
}else if(_e._$hasClassName(_target,'j-videoPoster')){
this.__onVideoPlay(_target);
}
};
_pro.__onLikeBtnClick = function(options,elem){
if(!options.goodsId) return;
request('/activity/discovery/favor.html',{
data:options,
method:'POST',
type:'json',
norest:true,
onload: this.__cbLikeBtnClick._$bind(this,elem),
onerror: this.__errorLikeBtnClick._$bind(this)
})
};
_pro.__cbLikeBtnClick = function(_elem,_cbdata){
if(!!_cbdata && !!_cbdata.success){
_e._$addClassName(_elem,'u-favorbtn2-1');
_elem.innerText = Number(_elem.innerText)+1;
}
toast.show(_cbdata.message||'操作失败');
};
_pro.__errorLikeBtnClick = function(){
toast.show('点赞失败！请稍后再试！');
};
_pro.__doFavorite = function(obj,node){
var self=this;
obj = obj || {};
obj.status = 1;
request('/activity/h5/goods/favor.html',{
data:obj,
method:'POST',
type:'json',
norest:true,
onload:function(_json){
// 未登录提示
if(_json.retcode==461){
login.toLogin();
return;
}
// 491：已收藏过
if(_json.retcode==200 || _json.retcode==491){
var msg = _json.retcode==200?'收藏成功':'已收藏，可在“我的收藏”里查看';
toast.show({message:msg,singleMsg:true});
if(!!node){
node.innerText = '已收藏';
_e._$addClassName(node,'z-favored');
}
if(!!self.__myFavorite && _json.retcode==200){
self._$plus();
}
}else{
toast.show({message:_json.retdesc || '请求出错，请稍后再试！',singleMsg:true});
}
},
onerror:function(err){
toast.show({message:err || '请求出错，请稍后再试！',singleMsg:true});
}
});
};
// 收藏+1
_pro._$plus = function(){
_e._$addClassName(this.__myFavorite,'z-plus');
setTimeout(function(){
_e._$addClassName(this.__myFavorite,'z-hide');
_e._$delClassName(this.__myFavorite,'z-plus');
setTimeout(function(){
_e._$delClassName(this.__myFavorite,'z-hide');
}._$bind(this),1500);
}._$bind(this),1500);
};
_pro.__onVideoPlay = function(_target){
var _videoElem = _e._$getByClassName(_target.parentNode,'j-videoElem');
if(!_videoElem) return;
_target.style.display = 'none';
_videoElem[0].play();
};
_pro.__setLazyload = function(){
function classReg(cls){
return new RegExp( '(\\s|^)'+ cls +'(\\s|$)' );
}
var reg = classReg('m-img-block-loading'),
regPar = classReg('m-block'),
itemImgReg = classReg('u-item-img'),
noLazy = classReg('j-ignorlazy');
function findParent(node){
var _node = node;
while(_node && _node.tagName.toLowerCase()!='body'){
if (regPar.test(_node.className)){
return _node;
}
_node = _node.parentNode;
}
return null;
}
function onimgload(evt){
var par = findParent( evt.target );
if (par && reg.test(par.className) ) {
par.className = par.className.replace(reg, ' ');
};
evt.target.onload = evt.target.onerror = null;
}
lazy._$$LazyImg._$allocate({
attr:'src',
tolerance: 5,
preloadDist:'auto',
fadeIn: true,
container: document.querySelector('#box'),
onremove: function(evt){
evt.stopped = true;
},
oncheck:function(event){
if(noLazy.test(event.target)){
event.value =2;
}
},
onappend: function(evt){
if ( itemImgReg.test(evt.target.className) ) { return; };
evt.target.onload = evt.target.onerror = onimgload;
}
});
};
_pro.__removeParamFromCouponUrl = function(){
var list = document.querySelectorAll('a[href^="http://www.kaola.com/app/coupon/"]'),
url, cReg = /https?:\/\/(www|m)\.kaola\.com\/app\/coupon\/[^\/]+\.html\?/,
tmp;
if (list && list.length) {
for (var i = list.length - 1; i >= 0; i--) {
tmp = null;
url = list[i].getAttribute('href');
if (cReg.test(url)) {
tmp = url.split('?');
if (tmp && tmp.length) {
list[i].setAttribute('href', tmp[0]);
};
};
};
};
};
//设置一排二商品区块中图片区块的高度
_pro.__setAdImgOfItemBlock = function(){
var itemBlocks = document.querySelectorAll('.m-avg2item-lst');
Array.prototype.forEach.call(itemBlocks, function(item){
var it = item.querySelector('.m-2avg-item'),
ads = item.querySelectorAll('.m-2avg-img .ad'),
h,i,allPics;
if (it) {
if (ads && ads.length) {
h=it.getBoundingClientRect().height;
}
}else{
if (ads && ads.length) {
// 如果全部都是图片，那就按图片区显示, 现在应该不存在这种情况
h= ads[0].getBoundingClientRect().width * (parseFloat(ads[0].getAttribute('data-imgh'))||0)/(parseFloat(ads[0].getAttribute('data-imgw'))||1);
allPics = true;
}
}
for (i = 0; i < ads.length; i++) {
if (allPics) {
ads[i].parentNode.style.height = h+'px';
}
ads[i].parentNode.style.height = h+'px';
}
});
};
/**
* 设定品牌头图区域描述文字的是否需要显示折叠展开按钮
* 文字超出两行时才显示按钮
* @return {void} 无返回
*/
_pro.__setBrandDescToggle = function(){
var brandDescs = document.querySelectorAll('.m-brand-head .descwrap');
if (!brandDescs || !brandDescs.length) { return; };
var currDesc, openReg = new RegExp( '(\\s|^)'+ 'open' +'(\\s|$)' ),
foldReg = new RegExp( '(\\s|^)'+ 'fold' +'(\\s|$)' );
function brandDescTg(e){
if (openReg.test(this.className)) {
this.className = this.className.replace('open', 'fold');
}else if(foldReg.test(this.className)){
this.className = this.className.replace('fold', 'open');
}
}
for (var i = brandDescs.length - 1; i >= 0; i--) {
currDesc = brandDescs[i].querySelector('.desc');
if (currDesc.clientHeight < currDesc.scrollHeight) {
brandDescs[i].className += ' open';
brandDescs[i].addEventListener('click',brandDescTg);
}
};
};
_pro.__onShareBtnClick = function(evt){
// 低于1.4的弹出升级提示
if (_.isOldApp(12,10400)) {
toast.show('您的App版本太低，赶快升级吧');
}else if(!!window.WeixinJSBridge){
var shareConfig = _.extend(window.newShareConfig||{}, window.shareConfig);
WeixinJSBridge.invoke('shareKaolaAppMessage', shareConfig||null, function(res) {
if(res.share_result){
// 分享成功执行代码
}else{
// 分享失败执行代码
}
});
}
};
_pro.__onWarmCardShareBtnClick = function(evt){
// 低于1.4的弹出升级提示
if (_.isOldApp(12,10400)) {
toast.show('您的App版本太低，赶快升级吧');
}else if(!!window.WeixinJSBridge){
var shareConfig = _.extend({}, window.shareConfig),
warmcardUrl = evt.target.parentNode.getAttribute('data-warmcard');
shareConfig.imgOnlyUrlList = [warmcardUrl];
WeixinJSBridge.invoke('shareKaolaAppMessage', shareConfig, function(res) {
});
}
};
/**
* 配合静态化改造，增加的活动页面统计接口，将页面访问信息发送到后端
* @return {void} 无返回值
*/
_pro.__sendStatics = function(){
function sendRequest(){
var _paramObj = _ut._$query2object( document.URL.split('?')[1]||'' );
var _data = _.extend({
activityRefer: document.referrer,
activityShowId: window.__klActivityShowId||''
}, _paramObj);
request('/stat/activity.html',{
data: _data,
method:'POST',
type:'json',
norest:true,
onload:function(_json){
},
onerror:function(err){
}
});
}
//if (window.__isPageCached) {
sendRequest(); //调度到页面渲染之后执行
//}
};
return _p;
},1,20,2,3,4,74,115,87,68,25,116,117,118,119,120,121,75,122,123);
I$(103,"<div class=\"m-dialog {{custClass}}\" on-touchmove={{this.preventMove($event)}} ref=dialog> \t{{#if !!confirm}} \t<div class=\"confirm {{_aniClass}}\"> \t\t{{#if !!confirm.title}} \t\t<div class=\"title {{confirm.titleClass||''}}\" r-html=\"{{confirm.title}}\"></div> \t\t{{/if}} \t\t<div class=\"txt {{confirm.textClass||''}}\" r-html=\"{{confirm.text}}\"></div> \t\t<div class=\"btns {{confirm.btns.length===1?'btns-1':'btns-2'}}\"> \t\t\t{{#list confirm.btns as btn}} \t\t\t<span class=\"btn\" on-click={{this.btnClick(btn.action, $event)}}>{{btn.text}}</span> \t\t\t{{/list}} \t\t</div> \t</div> \t{{#else}} \t<div class=\"content  {{_aniClass}}\"> \t\t{{#include content}} \t</div> \t{{/if}} </div>");
I$(100,function (tpl, _, Base){
"use strict";
var Dialog = Base.extend({
template: tpl,
config: function(data){
data._aniClass = '';
},
init : function(){
this.show();
this.$emit('init');
},
show: function(){
setTimeout(function(){
this.data._aniClass = 'show';
this.$update();
}._$bind(this), 0);
},
hide: function(){
this.data._aniClass = '';
this.$update();
},
remove: function(){
this.hide();
setTimeout(function(){
this.destroy();
}._$bind(this), 200);
},
preventMove: function(evt){
evt.preventDefault();
},
btnClick: function(action,evt){
switch(action){
case 'close':
this.$emit('close', evt);
this.remove();
break;
default:
this.$emit(action, evt);
}
}
});
//////////////////
//部分用于简化调用的静态方法 //
//////////////////
/**
* Dialog 的静态方法，可以不用new，直接调用生成提示框
* @param  {Object} opts confirm参数对象
*     @property {String} text 提示文字，可以是html
*     @property {String} textClass 提示文字新加入的类
*     @property {Array} btns 按钮数组，与Dialog默认参数一致
* @return {Object} 返回生成的Dialog实例
*/
Dialog._$confirm = function(opts){
var confirm = _.extend(opts, {
text: '',
textClass: '',
btns: []
});
var dia = new Dialog({data:{
confirm: confirm
}});
dia.$inject(document.body);
return dia;
};
/**
* Dialog 的静态方法，可以直接调用，用于弹出只有一个按钮的提示框
* @param  {Object|String} opts 提示参数
*      如果为String: 第二个参数可以传入标题，
*                    第三个参数可以穿入按钮文字，否则按钮文字为“确定”，
*                    点击后触发btn1事件，并关闭提示
*      如果为Object：实例：{
text: '提示文字',
btnTexts: ['确定按钮']
}
则可以定制文字以及按钮文字，点击按钮同样触发btn1事件，关闭弹框
* @return {Object}      创建的Dialog 实例
*/
Dialog._$alert = function(opts){
if (typeof opts === 'string') {
opts = { text: opts,
title: arguments[1]||'',
btnTexts: [arguments[2]||'确定'] };
}
var _opts = _.extend(opts, {
text: '',
btnTexts: ['确定']
});
_opts.btns = [
{
text: _opts.btnTexts[0],
action: 'btn1'
}
];
var dia = Dialog._$confirm(_opts);
dia.$on('btn1', function(){ this.remove()});
return dia;
};
/**
* Dialog 的静态方法，可以直接调用，用于弹出有二个按钮的提示框
* @param  {Object|String} opts 提示参数
*      如果为String: 第二个参数可以传入标题，
*                    第三个参数传入左边按钮文字，否则为“取消”，
*                    第四个参数传入右边按钮文字，否则为“确定”，
*                    点击后分别触发btn1（左）或btn2（右）事件，并关闭
*      如果为Object：实例：{
text: '提示文字',
btnTexts: ['取消','确定按钮']
}
则可以定制文字以及按钮文字，点击按钮同样触发btn1（左）或btn2（右）事件，关闭弹框
* @return {Object}      创建的Dialog 实例
*/
Dialog._$prompt = function(opts){
if (typeof opts === 'string') {
opts = { text: opts,
title: arguments[1]||'',
btnTexts: [arguments[2]||'取消', arguments[3]||'确定'] };
}
var _opts = _.extend(opts, {
text: '',
btnTexts: ['取消','确定']
});
_opts.btns = [
{
text: _opts.btnTexts[0],
action: 'btn1'
},{
text: _opts.btnTexts[1],
action: 'btn2'
}
];
var dia = Dialog._$confirm(_opts);
dia.$on('btn1', function(){ this.remove()});
dia.$on('btn2', function(){ this.remove()});
return dia;
};
return Dialog;
},103,74,23);
I$(166,"<div class=\"m-mz-seckill\"> \t<div class=\"hd\"> \t\t<div class=\"border\"> \t\t\t<div class=\"left\"></div> \t\t\t<div class=\"center\"></div> \t\t\t<div class=\"right\"></div> \t\t</div> \t\t<p class=\"dates\">11.27-11.29</p> \t\t<p class=\"desc\">每天3场，每场15台</p> \t</div> \t<div class=\"timeline\"> \t\t<span class=\"line\"></span> \t\t<span class=\"dot dot1 {{dots[0].status||''}}\"></span> \t\t<span class=\"dot dot2 {{dots[1].status||''}}\"></span> \t\t<span class=\"dot dot3 {{dots[2].status||''}}\"></span> \t\t<span class=\"text dot1-text {{texts[0].status}}\">{{texts[0].text}}</span> \t\t<span class=\"text dot2-text {{texts[1].status}}\">{{texts[1].text}}</span> \t\t<span class=\"text dot3-text {{texts[2].status}}\">{{texts[2].text}}</span> \t</div> \t<p class=\"msg\">{{desc}}</p> \t{{#if countdownText}} \t<p class=\"countdown\"> \t\t距离下一场还剩 <span class=\"time\">{{countdownText}}</span> \t</p> \t{{/if}} \t<div class=\"go {{btn.status}}\" on-click={{this.buyBtnClick()}}> \t\t{{btn.text}} \t</div> </div>");
I$(164,function (tpl, base, toast, _, _ut, request, Dialog) {
var MzTimer = base.extend({
template: tpl,
config: function(data){
this.data.info = window.__seckillInfo;
this.data.timePoints = window.__seckillPoints;
this.data.dots = [{status:''},{status:''},{status:''}];
this.data.texts = [{status:'',text:'10:00'},{status:'',text:'15:00'},{status:'',text:'21:00'}];
this.data.desc = '活动尚未开始！';
this.data.countdownText = '';
this.data.btn = {
status: 'disable',
text: '敬请期待...'
}
this.fixPageLoadTime();
if (!!this.data.timePoints && this.data.timePoints.length>=3) {
this.tick();
setTimeout(this.tick.bind(this), 500);
}
},
init: function(){
//APP 中时版本太低提示
if(_.isGteKaolaVer(2.0)!=1 && window.__isKaolaApp===1){
this.showVerTooLowDiaolog();
}
},
//处理可能的后退情况, 未从服务器重新加载内容
fixPageLoadTime: function(){
var newPageLoadTime = window.pageLoadTime;
try {
if(sessionStorage.getItem('mzServerTime') === window.serverTime+'' ){
newPageLoadTime = parseFloat(sessionStorage.getItem('mzPageLoadTime'));
}else{
sessionStorage.setItem('mzServerTime', window.serverTime);
sessionStorage.setItem('mzPageLoadTime', window.pageLoadTime);
}
}catch (e) {
}
window.pageLoadTime = newPageLoadTime;
},
now: function(){
return ((+new Date()) - window.pageLoadTime)+window.serverTime;
},
getCurrStage: function(){
var now = this.now(), timePoints = this.data.timePoints;
if (!this.data.info.isDacuStart || timePoints.length < 3) { return -1; }
if (now < timePoints[0].startTime) { return 0; }
if (now > timePoints[timePoints.length-1].startTime) {
return timePoints.length-3;
}
for (var i = 0; i < timePoints.length; i=i+3) {
if (timePoints[i].startTime<= now &&
timePoints[i+2].startTime+1800000 > now){
return i;
}
if (now < timePoints[i].startTime) {
return i;
}
}
return 0;
},
/* -1 已经结束， 0 进行中， 1 待开始*/
setPointsStatus: function(){
var now = this.now(), timePoints = this.data.timePoints;
for (var i = 0; i < timePoints.length; i++) {
if (timePoints[i].startTime+1800000 < now){
timePoints[i].status = -1;
}else if (timePoints[i].startTime+1800000 > now &&
timePoints[i].startTime < now) {
timePoints[i].status = 0;
}else{
timePoints[i].status = 1;
}
}
},
setTimeline: function(stage){
var timePoints = this.data.timePoints,
data = this.data,
i, tp, time;
for (i = 0; i < 3; i++) {
tp = timePoints[i+stage];
time = _ut._$format(new Date(tp.startTime), 'HH:mm');
if (tp.status === -1) {
data.dots[i].status = '';
data.texts[i].status = '';
data.texts[i].text = time+' 已结束';
}else if(tp.status === 0){
data.dots[i].status = 'active';
data.texts[i].status = 'active';
data.texts[i].text = time+' 进行中';
}else{
data.dots[i].status = '';
data.texts[i].status = '';
data.texts[i].text = time;
}
}
},
setBuyBtnAndCountdown: function(){
var timePoints = this.data.timePoints,
data = this.data,
i;
data.btn.status = 'disable';
data.btn.text = '敬请期待...';
data.countdownText = '';
if (data.info.isDacuStart) {
data.btn.text = '立即抢购';
}
var tpCurr, tpNext;
for (i = 0; i < timePoints.length; i++) {
tpCurr = timePoints[i];
tpNext=timePoints[i+1]||{};
if ( (tpCurr.status===-1 && tpNext.status===1) ||
i===0 && tpCurr.status===1) {
var leftTime = (tpCurr.status!==1 ? tpNext.startTime : tpCurr.startTime) - this.now();
leftTime = leftTime<0 ? 0:leftTime;
var timeObj = this.getTimeObj(leftTime);
data.countdownText = timeObj.hh+':'+timeObj.mm+':'+timeObj.ss;
}
if (tpCurr.status===0) {
data.btn.status = '';
data.currTimepoint = tpCurr;
}
}
if (data.info.soldout || !data.info.obtained || data.info.seckilled ) {
data.btn.status = 'disable';
}
if (!_.isLogin()) {
data.btn.status = '';
data.btn.text = '立即登录';
}
if (_.isLogin() && !data.info.obtained) {
data.btn.status = '';
data.btn.text = '立即去凑单';
}
if (window.__isKaolaApp!==1) {
this.data.desc = '请在考拉海购手机客户端进行秒杀！';
data.btn.status = '';
data.btn.text = '下载客户端';
}
},
setDescText : function(){
var timePoints = this.data.timePoints,
data = this.data;
if (!data.info.isDacuStart) {
data.desc = '活动尚未开始!';
return;
}
if (!_.isLogin()) {
data.desc = '请先登录查看是否有抢购机会';
return;
}
if(data.info.obtained){
if (data.info.seckilled) {
data.desc = '啊哦！您已抢过1台，把机会留给别人吧！';
}else{
data.desc = '恭喜！您已获得1元抢购机会！';
if (data.info.soldout) {
data.desc = '本场已抢光！';
}
}
}else if(!data.info.obtained){
data.desc = '您再买'+data.info.balance+'元，就能参加1元抢购了！';
}
if (window.__isKaolaApp!==1) {
this.data.desc = '请在考拉海购手机客户端进行秒杀！';
}
},
tick: function(){
var timePoints = this.data.timePoints,
stage = this.getCurrStage(),
data = this.data,
i, tp, time;
if (stage < 0) { return; }
this.setPointsStatus();
this.setTimeline(stage);
this.setBuyBtnAndCountdown();
this.setDescText();
this.$update();
setTimeout(this.tick.bind(this), 500);
},
// 根据毫秒数计算剩余时间对象
getTimeObj : (function(){
//转化为两位数字
var fillZ = function( N ){
return (N < 10 ? "0" : "" )+N;
};
var onemin = 60000, onehour = 60*onemin, oneday = 24*onehour;
return function(num, returnObj){
var time = +num > 0 ? +num : 0;
var d = parseInt(time / oneday, 10),
h = parseInt(time % oneday / onehour, 10),
m = parseInt(time % oneday % onehour / onemin, 10),
s = parseInt(time % oneday % onehour % onemin / 1000, 10),
ms = parseInt(time % oneday % onehour % onemin % 1000, 10);
//优化临界点显示
if (d === 1 && h === 0) {
d = 0;
h = 24;
}
var info = [fillZ(d),fillZ(h),fillZ(m),fillZ(s)];
return {
d : d, h : h, m: m, s : s, ms:ms,
dd : fillZ(d), hh: fillZ(h), mm : fillZ(m), ss : fillZ(s)
};
};
})(),
buyBtnClick: function(){
//可能的几种行为： 禁用， 下载app, , 登陆， 去凑单， 购买
var btn = this.data.btn,
info = this.data.info;
if (btn.status === 'disable') { return; }
if (window.__isKaolaApp!==1) {
if (navigator.userAgent.match(/MicroMessenger/i)) {
location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kaola';
}else{
location.href = 'http://www.kaola.com/mobile/download.html';
}
return;
}
if (!_.isLogin()) {
_.toLogin();
return;
}
if (!info.obtained) {
location.href = this.data.buyurl;
return;
}
// 条件都满足，可以直接购买了
this.bookOrder();
},
bookOrder: function(){
var goods = this.data.currTimepoint;
//检查客户端版本
if(_.isGteKaolaVer(2.0)==1){
_.exec({method:"openOrderConfirm",args:{
goods: [{
goodsId: goods.goodsId,
innerSource: "OTHER",
selected:"1",
skuId: goods.skuId,
tempBuyAmount:1,
tempCurrentPrice: 1,
tempGoodsActivityType:""
}],
type: '',
s: "2"
}});
//随机刷新一下页面，更新是否抢光
// setTimeout(function(){
// 	location.reload();
// }, (5+Math.random()*5)*1000 );
}else{
this.showVerTooLowDiaolog();
}
},
showVerTooLowDiaolog: function(){
var btns = [{text:'我知道了',action:'close'}];
if (window.__isKaolaApp!==1) {
btns.push({text:'下载APP',action:'app'});
}
var dia = new Dialog({data:{
confirm: {
text: '抱歉，本活动只支持在最新版手机APP中购买哦，立即去更新或下载网易考拉海购APP吧',
btns: btns}
}});
if (window.__isKaolaApp!==1) {
dia.$on('app', function(evt){
dia.$off('app');
dia.$off('close');
dia.remove();
location.href = 'http://www.kaola.com/mobile/download.html';
});
dia.$on('close', function(evt){
dia.$off('app');
dia.$off('close');
});
}
dia.$inject(document.body);
}
});
return MzTimer;
},166,23,25,74,2,68,100);
I$(174,function (k,ut,v,e,$,Module, toast,p,_o,_f,_r,pro) {
p._$$Timer = k._$klass();
pro = p._$$Timer._$extend(Module);
var STARTMSG = '距疯抢开始还有',ENDMSG = '距疯抢结束还有';
var ACTSTART = 1447171200000; //11.11 00:00:00
var ACTEND = 1447430400000; // 11.14 00:00:00
function formatLeft(diff){
var dd = parseInt(diff / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
var hh = parseInt(diff / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
var mm = parseInt(diff / 1000 / 60 % 60, 10);//计算剩余的分钟数
var ss = parseInt(diff / 1000 % 60, 10);//计算剩余的秒数
dd = checkTime(dd);
hh = checkTime(hh);
mm = checkTime(mm);
ss = checkTime(ss);
return dd+hh+mm+ss;
}
//  补全0
function checkTime(t){
return t<10?"0"+t:""+t;
}
pro.__init = function(_options) {
this.__supInit(_options);
this.__timerNode = e._$get('timerBox');
if(this.__timerNode){
this.__txtNode = e._$get('clocktxt');
this.__numArr = e._$getByClassName(this.__timerNode,'j-num');
this.__serverTime = window.serverTime || (+ new Date());
this.__initClock();
}
};
// 初始化倒计时
pro.__initClock = function(){
var comparetime = this.__serverTime;
if(comparetime >= ACTEND){
this.__txtNode.innerText = '活动已结束';
this.__setEndTime();
}
if(comparetime < ACTEND && comparetime >= ACTSTART){
this.__txtNode.innerText = ENDMSG;
this.__setTimer(1);
}
if(comparetime < ACTSTART){
this.__txtNode.innerText = STARTMSG;
this.__setTimer(2);
}
};
// 设置倒计时
pro.__setTimer = function(type){
var compare = type==1?ACTEND:ACTSTART;
this.__timer = null;
this.__timer = setInterval(function(){
this.__serverTime += 1000;
if(this.__serverTime > compare){
clearInterval(this.__timer);
this.__initClock();
}else{
this.__refreshTime(compare-this.__serverTime);
}
}._$bind(this),1000);
};
//  活动结束设置
pro.__refreshTime = function(diff){
var str = formatLeft(diff);
for(var i=0;i<8;i++){
this.__numArr[i].innerText = str[i] || '0';
}
};
//  活动结束设置
pro.__setEndTime = function(){
$(this.__numArr)._$text('*');
};
return p;
},1,2,3,4,87,5,25);
I$(175,function (request, timing, util, toast, coupon){
function Savelist(opt){
this.listarea = opt.listarea;
if (!this.listarea) { return; }
this.list = this.listarea.querySelector('.slider .info ul');
if (!this.list) { return; }
setTimeout(function(){
this.getData(this.dataProcess._$bind(this));
}._$bind(this), 0);
this.bindEvents();
this.couponUtil = new coupon({data:{isBindLink:false}})
}
var pro = Savelist.prototype;
pro.bindEvents = function(){
var btn = this.listarea.querySelector('.sharebtn');
if (btn) {
btn.addEventListener('click', function(evt){
if (!this.couponId) {
return;
}
if (util.isOldApp(12,10400)) {
toast.show('您的App版本太低，赶快升级吧');
}else if(!!window.WeixinJSBridge){
if (window.shareConfig) {
var txt;
if (this.buyCount>0)
txt = "我在网易考拉全球狂欢节买了"+this.buyCount+"件商品！越买越省！太赚啦";
else
txt = "别人赚翻了你却还在围观！快来网易考拉全球狂欢节扫货吧";
var cfg = {
img_url: 'http://haitao.nos.netease.com/fe911b6bb3ca4769a9f242b4d5479c22.jpg?imageView&thumbnail=100x0&',
link: document.URL.split('?')[0] + '?from=appshare',
desc: txt,
title: document.title,
wbpost: txt + '  '+ document.URL.split('?')[0] + '?from=appshare' +" @网易考拉海购"
};
WeixinJSBridge.invoke('shareKaolaAppMessage', cfg, function(res) {
if(res && (res.share_result+''!='false') ){
//开始获取优惠券
setTimeout(function(){
this.couponUtil.getCoupon(this.couponId);
}._$bind(this), 1600);
}else{
// alert('not share');
}
}._$bind(this));
}
}
}._$bind(this));
}
var loginbtn = this.listarea.querySelector('.login');
if (loginbtn) {
loginbtn.addEventListener('click', function(){
util.toLogin();
});
}
}
pro.getData = function(cb){
request('/activity/save_money/getSaveMoneyRankList.html', {
method:'GET',
norest:true,
type:'json',
onload: function(dt){
if (dt && dt.code==200) {
cb(0, dt);
}else{
cb(1, dt);
}
},
onerror: function(er){
cb(1,er);
}
});
}
pro.dataProcess = function(hasErr, data){
if (hasErr) {
this.listarea.parentNode.removeChild(this.listarea);
return;
}
this.rankList = data.rankList||[];
if (this.rankList.length) {
//将第一项插入到最后的位置，以便于循环滚动
this.rankList.push(this.rankList[0]);
}
this.buyCount = data.currentUserBuyCount;
this.saveAmount = data.currentUserSave;
this.couponId = data.couponid;
this.updatePage();
}
pro.updatePage = function(){
var html = this.bulidLines(this.rankList);
this.list.innerHTML = html;
if (util.isLogin()) {
var count = this.listarea.querySelector('.count');
if (count) {
count.innerHTML = this.buyCount||0;
}
var num = this.listarea.querySelector('.num');
if (num && this.saveAmount) {
//整数部分处理
var result = '', saveAmount = ''+ Math.floor(this.saveAmount);
if (saveAmount.length > 3) {
for (var i = 1; i <= saveAmount.length; i++) {
result = saveAmount[saveAmount.length-i] + result;
if (i%3===0 && i!==saveAmount.length) {
result = ',' + result;
}
}
}else{
result = saveAmount;
}
//小数部分
tail = (''+this.saveAmount).split('.')[1];
result += !!tail ? '.'+tail : '';
num.innerHTML = result||0;
}else{
var my = document.querySelector('.my');
if (my) {
my.innerHTML = '您在考拉双11上还没有下过单，先去逛逛吧';
}
}
// if (this.couponId) {
// 	var cplink = document.createElement('a');
// 	cplink.href = 'http://www.kaola.com/app/coupon/'+this.couponId+'.html';
// 	cplink.style.cssText = 'display:none;';
// 	this.listarea.appendChild(cplink);
// 	this.cplink = cplink;
// }
}else{
// 未登录
}
if (this.rankList.length>2) {
//启动滚动动画
this.startScroll();
}
}
pro.bulidLines = function(list){
var style = '';
if (document.body.clientWidth <350) {
style = "line-height:14px;padding-top:4px;";
}
if (!list || !list.length) { return '<li class="f-els-1">暂无数据</li>'; }
var line, lines=[];
for (var i = 0; i < list.length; i++) {
line = list[i];
lines.push('<li class="f-els-1" style="'+style+'">用户 '+ line.accountId + ' '+ line.paySuccessTime + '，'+(style?'<br>':'')+'小考拉为他省了' + (line.savedMoneyAmount||0) +'元</li>');
};
return lines.join('');
}
pro.startScroll = function(){
var currIdx = 0, total = this.rankList.length, lineHeight=35,self=this;
function translate(){
if (currIdx>0 && currIdx%(total-1)===0) {
currIdx = 0;
}
self.doScroll(currIdx*lineHeight, (currIdx+1)*lineHeight);
setTimeout(translate, 3800);
currIdx++;
}
setTimeout(translate, 3000);
}
pro.doScroll = function(from, to){
var easeinout = timing._$$Timing._$allocate({
timing: 'cubic-bezier(0.86, 0, 0.07, 1)',
from: {
offset: from
},
to: {
offset: to
},
duration: 800,
onupdate: function(_evt){
var transform = "translateY(-"+ _evt.offset +"px) translateZ(0);";
this.list.setAttribute('style', "-webkit-transform:"+transform+
"-ms-transform:"+transform+
"transform:"+transform+
"-webkit-transition: -webkit-transform 0 0 ease;"+
"transition: transform 0 0 ease;");
}._$bind(this),
onstop: function(){
easeinout._$recycle();
}
});
easeinout._$play();
}
return Savelist;
},68,124,74,25,111);
I$(182,"<div class=\"imgbox f-pr\"> \t<img class=\"u-img\" src=\"http://haitao.nos.netease.com/c6b113d0ad5b41618995e2039491aef9.jpg\"> \t<p class=\"textbox\"> \t\t{{text200}} \t</p> \t<p class=\"btnbox\"> \t\t<a class=\"u-wbtn {{pd200==1 ? 'f-pdl8' : ''}} {{enable200 == 0 ? 'u-wbtn-1' : ''}}\" {{#if enable200 == 1}}on-click={{this.getcoupon(200)}}{{/if}}>{{btn200}}</a> \t</p> </div> <div class=\"imgbox f-pr\"> \t<img class=\"u-img\" src=\"http://haitao.nos.netease.com/c3840785af5646f28121e4d1fd705ee8.jpg\"> \t<p class=\"textbox\"> \t\t{{text399}} \t</p> \t<p class=\"btnbox\"> \t\t<a class=\"u-wbtn {{pd399==1 ? 'f-pdl8' : ''}} {{enable399 == 0 ? 'u-wbtn-1' : ''}}\" {{#if enable399 == 1}}on-click={{this.getcoupon(399)}}{{/if}}>{{btn399}}</a> \t</p> </div>");
I$(180,function (_v, _e, _, tpl, BaseComponent, Request, toast){
var ChristCoupon = BaseComponent.extend({
name: 'christcoupon',
template: tpl,
init: function(){
this.supr();
this.initCoupon();
},
initCoupon: function(){
var self = this;
Request('/christmas/retcoupon/detail.html', {
method: 'GET',
onload: function(json){
if(json.code == 200){
self.showCoupon(json.body);
}else if(json.code == 461){
self.data.text200 = '请先登录查看是否有领券资格';
self.data.btn200 = '立即登录';
self.data.enable200 = 1;
self.data.text399 = '请先登录查看是否有领券资格';
self.data.btn399 = '立即登录';
self.data.enable399 = 1;
}
self.$update();
},
onerror: function(json){
toast.show('获取优惠券信息失败！');
}
})
},
showCoupon: function(obj){
// 200元券判断
if(!!obj.retCouponDetail.rec200Coupon){
this.data.text200 = '您已领取了该优惠券，快去买买买！';
this.data.btn200 = '已领取';
this.data.enable200 = 0;
}else{
if(!!obj.retCouponDetail.canRec200Coupon){
if(!!obj.retCouponDetail.hasCoupon200){
this.data.text200 = '恭喜！您已足满领取200返200优惠券资格！';
this.data.btn200 = '立即领券！';
this.data.pd200 = 1;
this.data.enable200 = 1;
}else{
this.data.text200 = '抱歉！您来晚拉！';
this.data.btn200 = '立即领券！';
this.data.pd200 = 1;
this.data.enable200 = 0;
}
}else{
this.data.text200 = '您再买'+(obj.retCouponDetail.difference200||200)+'元，就能领取优惠券了，快去凑单吧！';
this.data.btn200 = '立即领券！';
this.data.pd200 = 1;
this.data.enable200 = 0;
}
}
// 399元券判断
if(!!obj.retCouponDetail.rec399Coupon){
this.data.text399 = '您已领取了该优惠券，快去买买买！';
this.data.btn399 = '已领取';
this.data.enable399 = 0;
}else{
if(!!obj.retCouponDetail.canRec399Coupon){
if(!!obj.retCouponDetail.hasCoupon399){
this.data.text399 = '恭喜！您已足满领取399返399优惠券资格！';
this.data.btn399 = '立即领券！';
this.data.pd399 = 1;
this.data.enable399 = 1;
}else{
this.data.text399 = '抱歉！您来晚拉！';
this.data.btn399 = '立即领券！';
this.data.pd399 = 1;
this.data.enable399 = 0;
}
}else{
this.data.text399 = '您再买'+(obj.retCouponDetail.difference399||399)+'元，就能领取优惠券了，快去凑单吧！';
this.data.btn399 = '立即领券！';
this.data.pd399 = 1;
this.data.enable399 = 0;
}
}
},
getcoupon: function(tag){
var url = '/christmas/' + tag + '/retcoupon.html',
self = this;
Request(url, {
method: 'GET',
onload: function(json){
if(json.code == 200){
toast.show('领券成功！请到我的优惠券中查询');
if(tag == 200){
self.data.text200 = '您已领取了该优惠券，快去买买买！';
self.data.btn200 = '已领取';
self.data.pd200 = 0;
self.data.enable200 = 0;
}else if(tag == 399){
self.data.text399 = '您已领取了该优惠券，快去买买买！';
self.data.btn399 = '已领取';
self.data.pd399 = 0;
self.data.enable399 = 0;
}
self.$update();
}else if(json.code == 461){
_.toLogin();
}else{
if(!!json.msg){
toast.show(json.msg);
}else{
toast.show('领取失败！');
}
}
},
onerror: function(json){
toast.show('领取失败！');
}
})
}
})
return ChristCoupon;
},3,4,74,182,23,68,25);
I$(192,"<div class=\"prdlist f-front\" ref=frontbox> \t{{#list frontlist as item}} \t<li class=\"item f-cb\" on-click={{this.onPrdClick(item)}}> \t\t<img class=\"u-img f-fl\" src=\"{{item.imageUrl}}\"> \t\t<div class=\"textinfo f-fl\"> \t\t\t<p class=\"title f-els-1\">{{item.title}}</p> \t\t\t<p> \t\t\t\t<span class=\"price\">¥<i class=\"num\">{{item.actualCurrentPrice}}</i></span> \t\t\t\t<span class=\"count\">已售<i class=\"num\">{{item.sales}}</i>件</span> \t\t\t</p> \t\t</div> \t</li> \t{{/list}} </div> <div class=\"prdlist f-back\" ref=backbox> \t{{#list backlist as item}} \t<li class=\"item f-cb\" on-click={{this.onPrdClick(item)}}> \t\t<img class=\"u-img f-fl\" src=\"{{item.imageUrl}}\"> \t\t<div class=\"textinfo f-fl\"> \t\t\t<p class=\"title f-els-1\">{{item.title}}</p> \t\t\t<p> \t\t\t\t<span class=\"price\">¥<i class=\"num\">{{item.actualCurrentPrice}}</i></span> \t\t\t\t<span class=\"count\">已售<i class=\"num\">{{item.sales}}</i>件</span> \t\t\t</p> \t\t</div> \t</li> \t{{/list}} </div>");
I$(190,function (_v, _e, _, tpl, BaseComponent, Request, toast){
var ReportBox = BaseComponent.extend({
name: 'reportbox',
template: tpl,
config: function(data){
_.extend(data, {
frontlist: [],
backlist: [],
count: -1,    // 记录已经取到商品在列表中的位置
isShowFront: 1   // 1: frontlist朝上      0: backlist朝上
})
},
init: function(){
this.supr();
this.getList();
},
getList: function(){
var self = this;
Request('/hotsale/goods_list.html', {
method: 'get',
onload: function(json){
if(json.code == 200){
self.data.list = json.body.goodsList;
self.initList();
self.$update();
self.setLeftTime();
}else{
toast.show(json.msg);
}
},
onerror: function(json){
toast.show(json.msg);
}
})
},
initList: function(){
if(this.data.list.length == 1){
this.data.frontlist.push(this.data.list[0]);
this.data.frontlist.push(this.data.list[0]);
this.data.backlist.push(this.data.list[0]);
this.data.backlist.push(this.data.list[0]);
this.data.count = 0;
}else if(this.data.list.length == 2){
this.data.frontlist.push(this.data.list[0]);
this.data.frontlist.push(this.data.list[1]);
this.data.backlist.push(this.data.list[0]);
this.data.backlist.push(this.data.list[1]);
this.data.count = 1;
}else if(this.data.list.length == 3){
this.data.frontlist.push(this.data.list[0]);
this.data.frontlist.push(this.data.list[1]);
this.data.backlist.push(this.data.list[2]);
this.data.backlist.push(this.data.list[0]);
this.data.count = 0;
}else{
this.data.frontlist.push(this.data.list[0]);
this.data.frontlist.push(this.data.list[1]);
this.data.backlist.push(this.data.list[2]);
this.data.backlist.push(this.data.list[3]);
this.data.count = 3;
}
},
getNextPrds: function(){
var len = this.data.list.length,
self = this,
list = [];
if(len == 1){
list.push(this.data.list[0]);
list.push(this.data.list[0]);
this.data.count = 0;
}else if(this.data.count == len-1){
list.push(this.data.list[0]);
list.push(this.data.list[1]);
this.data.count = 1;
}else if(this.data.count == len-2){
list.push(this.data.list[len-1]);
list.push(this.data.list[0]);
this.data.count = 0;
}else{
list.push(this.data.list[this.data.count+1]);
list.push(this.data.list[this.data.count+2]);
this.data.count += 2;
}
// 设置处于背面的商品信息-- 因为动画，等待一秒钟后处理
var tag = window.setTimeout(function(){
if(!!self.data.isShowFront){
self.data.backlist = list;
}else{
self.data.frontlist = list;
}
}, 1000);
},
change: function(){
if(!_e._$hasClassName(this.$refs.frontbox, 'f-rotateout')){
// 播报前后样式
_e._$delClassName(this.$refs.backbox, 'f-front');
_e._$delClassName(this.$refs.frontbox, 'f-back');
_e._$addClassName(this.$refs.backbox, 'f-back');
_e._$addClassName(this.$refs.frontbox, 'f-front');
// 动画样式
_e._$delClassName(this.$refs.frontbox, 'f-rotatein');
_e._$delClassName(this.$refs.backbox, 'f-rotateout');
_e._$addClassName(this.$refs.frontbox, 'f-rotateout');
_e._$addClassName(this.$refs.backbox, 'f-rotatein');
this.data.isShowFront = 0;
}else{
// 播报前后样式
_e._$delClassName(this.$refs.frontbox, 'f-front');
_e._$delClassName(this.$refs.backbox, 'f-back');
_e._$addClassName(this.$refs.frontbox, 'f-back');
_e._$addClassName(this.$refs.backbox, 'f-front');
// 动画样式
_e._$delClassName(this.$refs.frontbox, 'f-rotateout');
_e._$delClassName(this.$refs.backbox, 'f-rotatein');
_e._$addClassName(this.$refs.frontbox, 'f-rotatein');
_e._$addClassName(this.$refs.backbox, 'f-rotateout');
this.data.isShowFront = 1;
}
this.getNextPrds();
},
setLeftTime: function(){
var self = this;
this.leftseconds = 5;
this.tag = window.setInterval(function(){
if(self.leftseconds == 1){
self.leftseconds = 5;
self.change();
}else{
self.leftseconds -= 1;
}
self.$emit('setTime', self.leftseconds);
self.$update();
}, 1000);
},
onPrdClick: function(item){
window.location.href = '/product/' + item.goodsId + '.html';
}
})
return ReportBox;
},3,4,74,192,23,68,25);
I$(196,"<ul ref=\"parent\" class=\"prdbox\"> {{#list list as item}} <li class=\"item f-cb\">    <div class=\"animatebox j-flag\"> \t\t<div class=\"animateitem f-frontitm{{item_index}} f-front f-front{{item_index}}\" ref=frontbox> \t\t\t<div class=\"category f-fl {{item.titclass}}\">{{item.category}}</div> \t\t\t<div class=\"f-fl proinfo\" on-click={{this.onPrdClick(item.frontobj)}}> \t\t\t\t<img class=\"f-fl u-wimg\" src=\"{{item.frontobj.img||'/res/images/124x124.png'}}\" /> \t\t\t\t<div class=\"f-fl textinfo\"> \t\t\t\t\t<p class=\"title f-els-1\">{{item.frontobj.shortTitle}}</p> \t\t\t\t\t<p> \t\t\t\t\t\t<span class=\"price\">¥<i class=\"num\">{{item.frontobj.price}}</i></span> \t\t\t\t\t\t<span class=\"salenum\">已售{{item.frontobj.saleNum}}件</span> \t\t\t\t\t</p> \t\t\t\t\t<p class=\"reason f-els-1\"> \t\t\t\t\t\t<span class=\"name\">上榜理由</span> \t\t\t\t\t\t<span>{{item.frontobj.reason}}</span> \t\t\t\t\t</p> \t\t\t\t</div> \t\t\t</div> \t\t</div> \t\t<div class=\"animateitem f-backitm{{item_index}} f-back f-back{{item_index}}\" ref=backbox> \t\t\t<div class=\"category f-fl {{item.titclass}}\">{{item.category}}</div> \t\t\t<div class=\"f-fl proinfo\" on-click={{this.onPrdClick(item.backobj)}}> \t\t\t\t<img class=\"f-fl u-wimg\" src=\"{{item.backobj.img||'/res/images/124x124.png'}}\" /> \t\t\t\t<div class=\"f-fl textinfo\"> \t\t\t\t\t<p class=\"title f-els-1\">{{item.backobj.shortTitle}}</p> \t\t\t\t\t<p> \t\t\t\t\t\t<span class=\"price\">¥<i class=\"num\">{{item.backobj.price}}</i></span> \t\t\t\t\t\t<span class=\"salenum\">已售{{item.backobj.saleNum}}件</span> \t\t\t\t\t</p> \t\t\t\t\t<p class=\"reason f-els-1\"> \t\t\t\t\t\t<span class=\"name\">上榜理由</span> \t\t\t\t\t\t<span>{{item.backobj.reason}}</span> \t\t\t\t\t</p> \t\t\t\t</div> \t\t\t</div> \t\t</div> \t</div> </li> {{/list}} </ul>");
I$(194,function (_v, _e, _, tpl, BaseComponent, Request, toast){
var ReportBox = BaseComponent.extend({
name: 'reportbox',
template: tpl,
config: function(data){
_.extend(data, {
count: -1,    // 记录已经取到商品在列表中的位置
isShowFront: 1   // 1: frontlist朝上      0: backlist朝上
})
for(var i=0,l=data.list.length;i<l;i++){
var item = data.list[i];
if(item.data.length == 1){
item.frontobj = item.data[0];
item.backobj = item.data[0];
item.count = 0;
}else{
item.frontobj = item.data[0];
item.backobj = item.data[1];
item.count = 1;
}
}
},
init: function(){
this.supr();
this.setLeftTime();
},
getNextPrds: function(){
for(var i=0,l=this.data.list.length;i<l;i++){
var item = this.data.list[i];
var len = item.data.length,
self = this,
obj = {};
if(len == 1){
obj = item.data[0];
item.count = 0;
}else if(item.count == len-1){
obj = item.data[0];
item.count = 0;
}else{
obj = item.data[item.count+1];
item.count += 1;
}
// 设置处于背面的商品信息-- 因为动画，等待一秒钟后处理
var tag = window.setTimeout(this.setBackItem._$bind(this,item,obj), 1000);
}
},
setBackItem:function(item,obj){
if(this.data.isShowFront){
item.backobj = obj;
}else{
item.frontobj = obj;
}
},
change: function(){
// 				if(!_e._$hasClassName(this.$refs.frontbox, 'f-rotateout')){
//	          		// 播报前后样式
//	          		_e._$delClassName(this.$refs.backbox, 'f-front');
//	          		_e._$delClassName(this.$refs.frontbox, 'f-back');
//	          		_e._$addClassName(this.$refs.backbox, 'f-back');
//	          		_e._$addClassName(this.$refs.frontbox, 'f-front');
// 					// 动画样式
// 					_e._$delClassName(this.$refs.frontbox, 'f-rotatein');
//	          		_e._$delClassName(this.$refs.backbox, 'f-rotateout');
//	 				_e._$addClassName(this.$refs.frontbox, 'f-rotateout');
//	          		_e._$addClassName(this.$refs.backbox, 'f-rotatein');
//
//	          		this.data.isShowFront = 0;
// 				}else{
//	          		// 播报前后样式
//	          		_e._$delClassName(this.$refs.frontbox, 'f-front');
//	          		_e._$delClassName(this.$refs.backbox, 'f-back');
//	          		_e._$addClassName(this.$refs.frontbox, 'f-back');
//	          		_e._$addClassName(this.$refs.backbox, 'f-front');
// 					// 动画样式
// 					_e._$delClassName(this.$refs.frontbox, 'f-rotateout');
//	          		_e._$delClassName(this.$refs.backbox, 'f-rotatein');
//	          		_e._$addClassName(this.$refs.frontbox, 'f-rotatein');
//	          		_e._$addClassName(this.$refs.backbox, 'f-rotateout');
//
//	          		this.data.isShowFront = 1;
// 				}
if(_e._$hasClassName(this.$refs['parent'],'m-rotatein')){
_e._$delClassName(this.$refs['parent'],'m-rotatein');
this.data.isShowFront = 1;
} else{
_e._$addClassName(this.$refs['parent'],'m-rotatein');
this.data.isShowFront = 0;
}
this.getNextPrds();
},
setLeftTime: function(){
var self = this;
this.leftseconds = 5;
this.tag = window.setInterval(function(){
if(self.leftseconds == 1){
self.leftseconds = 5;
self.change();
}else{
self.leftseconds -= 1;
}
self.$emit('setTime', self.leftseconds);
self.$update();
}, 1000);
},
onPrdClick: function(item){
window.location.href = '/product/' + item.goodsId + '.html';
}
})
return ReportBox;
},3,4,74,196,23,68,25);
I$(201,"<div class=\"m-wmodal\"> \t<img class=\"u-wimg\" src=\"/res/images/activity/201512/timemachine/success.png\" /> \t<p class=\"result\">恭喜，领券成功</p> \t<p class=\"remind\">请在个人中心我的优惠券中查看</p> \t<a class=\"u-wbtn\" on-click={{this.confirm()}}>确定</a> \t<div on-click={{this.confirm()}} class=\"u-close\"></div> </div>");
I$(203,"<div class=\"m-layermsk {{layermskClass||''}}\" on-touchmove={{this.preventMove($event)}}> \t<div class=\"m-window {{extendClass||''}}\" on-click={{this.close($event)}}> \t\t<div class=\"{{winbodyClass||'winbody'}}\"> \t\t\t{{#include this.content}} \t\t</div> \t</div> </div>");
I$(202,function (_, _e, _v, BaseComponent, tpl, p){
var Modal = BaseComponent.extend({
template: tpl,
init: function(){
this.supr();
},
// 点击遮罩
close: function(_event){
var elm = _v._$getElement(_event);
if(_e._$hasClassName(elm, 'm-window')){
this.hide();
};
},
// 关闭弹窗方法
hide: function(){
this.$emit("hide", this.data);
this.destroy();
},
preventMove: function(evt){
evt.preventDefault();
}
});
Modal.directive('animate', function(ele) {
var animate = this.data.animate;
if ( animate ) {
_e._$addClassName(ele, 'animated');
_e._$addClassName(ele, animate);
}
});
return Modal;
},74,4,3,23,203);
I$(198,function (_, _e, _v, tpl, Modal, p){
var OKModal = Modal.extend({
content: tpl,
init: function(){
this.supr();
},
confirm: function(){
this.$emit('confirm', this.data);
this.destroy();
},
// 弹层关闭
close: function(){
this.$emit('confirm', this.data);
this.destroy();
}
});
return OKModal;
},74,4,3,201,202);
I$(204,"<div class=\"m-wmodal\"> \t<img class=\"u-wimg u-wimg-1\" src=\"/res/images/activity/201512/timemachine/fail.png\" /> \t<p class=\"result result-1\">啊哦，您已领过该券，不能再领~</p> \t<a class=\"u-wbtn\" on-click={{this.confirm()}}>确定</a> \t<div on-click={{this.confirm()}} class=\"u-close\"></div> </div>");
I$(199,function (_, _e, _v, tpl, Modal, p){
var OKModal = Modal.extend({
content: tpl,
config: function(data){
},
init: function(){
this.supr();
},
confirm: function(){
this.$emit('confirm', this.data);
this.destroy();
},
// 弹层关闭
close: function(){
this.$emit('confirm', this.data);
this.destroy();
}
});
return OKModal;
},74,4,3,204,202);
I$(208,"<div class=\"m-exchangewin\"> \t<div class=\"txt\"> \t\t<p class=\"title\">消耗{{count}}考拉豆，确定兑换？</p> \t    <p class=\"desc\">该券只能在购买本商品时使用</p> \t</div> \t<div class=\"btns\"> \t\t<div class=\"u-favorbtn\" on-click=close>取消</div> \t\t<div class=\"u-favorbtn\" on-click=ok>确定</div> \t</div> </div>");
I$(215,"<ul ref=\"parent\" class=\"reportbox\"> \t{{#list showList as item}} \t<li class=\"item\"> \t\t<div class=\"animatebox\"> \t\t\t<div class=\"animateitem f-frontitm{{item_index}} f-front f-cb\"> \t\t\t\t<img on-click={{this.onPrdClick(item.frontobj)}} class=\"u-wimg f-fl\" src=\"{{item.frontobj.imageUrl||'/res/images/124x124.png'}}\" /> \t\t\t\t<div on-click={{this.onPrdClick(item.frontobj)}} class=\"infobox f-fl\"> \t\t\t\t\t<p class=\"title f-els-2\">{{item.frontobj.title}}</p> \t\t\t\t\t<p> \t\t\t\t\t\t<span class=\"price\">¥<i class=\"num\">{{item.frontobj.actualCurrentPrice}}</i></span> \t\t\t\t\t\t<span class=\"salenum\">已售<i class=\"total\">{{item.frontobj.sales}}</i>件</span> \t\t\t\t\t</p> \t\t\t\t</div> \t\t\t\t<div on-click={{this.onCatgClick(item.flink)}} class=\"{{item.ftitclass}} brandbox f-fr f-pr\" > \t\t\t\t\t{{item.fcategory}} \t\t\t\t\t<span class=\"icon\"></span> \t\t\t\t</div> \t\t\t</div> \t\t\t<div class=\"animateitem f-frontitm{{item_index}} f-back f-cb\"> \t\t\t\t<img on-click={{this.onPrdClick(item.backobj)}} class=\"u-wimg f-fl\" src=\"{{item.backobj.imageUrl||'/res/images/124x124.png'}}\" /> \t\t\t\t<div on-click={{this.onPrdClick(item.backobj)}} class=\"infobox f-fl\"> \t\t\t\t\t<p class=\"title f-els-2\">{{item.backobj.title}}</p> \t\t\t\t\t<p> \t\t\t\t\t\t<span class=\"price\">¥<i class=\"num\">{{item.backobj.actualCurrentPrice}}</i></span> \t\t\t\t\t\t<span class=\"salenum\">已售<i class=\"total\">{{item.backobj.sales}}</i>件</span> \t\t\t\t\t</p> \t\t\t\t</div> \t\t\t\t<div on-click={{this.onCatgClick(item.blink)}} class=\"{{item.btitclass}} brandbox f-fr f-pr\"> \t\t\t\t\t{{item.bcategory}} \t\t\t\t\t<span class=\"icon\"></span> \t\t\t\t</div> \t\t\t</div> \t\t</div> \t</li> \t{{/list}} </ul>");
I$(213,function (_v, _e, _, tpl, BaseComponent, Request, toast){
var ReportBox = BaseComponent.extend({
name: 'reportbox',
template: tpl,
config: function(data){
_.extend(data, {
frontList: [],
backList: [],
showList: [],
isShowFront: 1   // 1: frontlist朝上      0: backlist朝上
})
for(var i=0,len=data.list.length; i<len; i++){
if(!!data.list[i].listTag){
data.frontList.push(data.list[i]);
}else{
data.backList.push(data.list[i]);
}
}
// 初始化showList
if(data.frontList.length > data.backList.length){
var len11 = data.backList.length;
}else{
var len11 = data.frontList.length;
}
for(var j=0,len1=len11; j<len1; j++){
var item = {
frontobj: data.frontList[j].data[0],
backobj: data.backList[j].data[0],
ftitclass: data.frontList[j].titclass,
fcategory: data.frontList[j].category,
btitclass: data.backList[j].titclass,
bcategory: data.backList[j].category,
blink: data.backList[j].link,
flink: data.frontList[j].link
};
data.showList.push(item);
}
},
init: function(){
this.supr();
this.setLeftTime();
},
getNextPrds: function(){
var obj = {};
if(!!this.data.isShowFront){  // 如果是正面(front)朝上，替换背面商品(back)
for(var i=0,len=this.data.showList.length; i<len; i++){
var catgPrdList = this.data.backList[i].data,
prdId = this.data.showList[i].backobj.goodsId;
for(var j=0,len1=catgPrdList.length; j<len1; j++){
if(prdId == catgPrdList[j].goodsId){
if(j < len1-1){
obj = catgPrdList[j+1];
}else{
obj = catgPrdList[0];
}
}
}
// 设置处于背面的商品信息-- 因为动画，等待一秒钟后处理
var tag = window.setTimeout(this.setBackItem._$bind(this,this.data.showList[i],obj), 1000);
}
}else{  // 如果是背面朝上，替换正面商品
for(var i=0,len=this.data.showList.length; i<len; i++){
var catgPrdList = this.data.frontList[i].data,
prdId = this.data.showList[i].frontobj.goodsId;
for(var j=0,len1=catgPrdList.length; j<len1; j++){
if(prdId == catgPrdList[j].goodsId){
if(j < len1-1){
obj = catgPrdList[j+1];
}else{
obj = catgPrdList[0];
}
}
}
// 设置处于背面的商品信息-- 因为动画，等待一秒钟后处理
var tag = window.setTimeout(this.setBackItem._$bind(this,this.data.showList[i],obj), 1000);
}
}
},
setBackItem:function(item,obj){
if(this.data.isShowFront){
item.backobj = obj;
}else{
item.frontobj = obj;
}
},
change: function(){
if(_e._$hasClassName(this.$refs['parent'],'m-rotatein')){
_e._$delClassName(this.$refs['parent'],'m-rotatein');
this.data.isShowFront = 1;
} else{
_e._$addClassName(this.$refs['parent'],'m-rotatein');
this.data.isShowFront = 0;
}
this.getNextPrds();
},
setLeftTime: function(){
var self = this;
this.leftseconds = 5;
this.tag = window.setInterval(function(){
if(self.leftseconds == 1){
self.leftseconds = 5;
self.change();
}else{
self.leftseconds -= 1;
}
self.$emit('setTime', self.leftseconds);
self.$update();
}, 1000);
},
onPrdClick: function(item){
window.location.href = '/product/' + item.goodsId + '.html';
},
onCatgClick: function(link){
window.location.href = link;
}
})
return ReportBox;
},3,4,74,215,23,68,25);
!function(a,b){"function"==typeof define&&(define.amd||define.cmd)?define(function(){return b(a)}):b(a,!0)}(this,function(a,b){function c(b,c,d){a.WeixinJSBridge?WeixinJSBridge.invoke(b,e(c),function(a){g(b,a,d)}):j(b,d)}function d(b,c,d){a.WeixinJSBridge?WeixinJSBridge.on(b,function(a){d&&d.trigger&&d.trigger(a),g(b,a,c)}):d?j(b,d):j(b,c)}function e(a){return a=a||{},a.appId=E.appId,a.verifyAppId=E.appId,a.verifySignType="sha1",a.verifyTimestamp=E.timestamp+"",a.verifyNonceStr=E.nonceStr,a.verifySignature=E.signature,a}function f(a){return{timeStamp:a.timestamp+"",nonceStr:a.nonceStr,"package":a.package,paySign:a.paySign,signType:a.signType||"SHA1"}}function g(a,b,c){var d,e,f;switch(delete b.err_code,delete b.err_desc,delete b.err_detail,d=b.errMsg,d||(d=b.err_msg,delete b.err_msg,d=h(a,d),b.errMsg=d),c=c||{},c._complete&&(c._complete(b),delete c._complete),d=b.errMsg||"",E.debug&&!c.isInnerInvoke&&alert(JSON.stringify(b)),e=d.indexOf(":"),f=d.substring(e+1)){case"ok":c.success&&c.success(b);break;case"cancel":c.cancel&&c.cancel(b);break;default:c.fail&&c.fail(b)}c.complete&&c.complete(b)}function h(a,b){var e,f,c=a,d=p[c];return d&&(c=d),e="ok",b&&(f=b.indexOf(":"),e=b.substring(f+1),"confirm"==e&&(e="ok"),"failed"==e&&(e="fail"),-1!=e.indexOf("failed_")&&(e=e.substring(7)),-1!=e.indexOf("fail_")&&(e=e.substring(5)),e=e.replace(/_/g," "),e=e.toLowerCase(),("access denied"==e||"no permission to execute"==e)&&(e="permission denied"),"config"==c&&"function not exist"==e&&(e="ok"),""==e&&(e="fail")),b=c+":"+e}function i(a){var b,c,d,e;if(a){for(b=0,c=a.length;c>b;++b)d=a[b],e=o[d],e&&(a[b]=e);return a}}function j(a,b){if(!(!E.debug||b&&b.isInnerInvoke)){var c=p[a];c&&(a=c),b&&b._complete&&delete b._complete,console.log('"'+a+'",',b||"")}}function k(){0!=D.preVerifyState&&(u||v||E.debug||"6.0.2">z||D.systemType<0||A||(A=!0,D.appId=E.appId,D.initTime=C.initEndTime-C.initStartTime,D.preVerifyTime=C.preVerifyEndTime-C.preVerifyStartTime,H.getNetworkType({isInnerInvoke:!0,success:function(a){var b,c;D.networkType=a.networkType,b="http://open.weixin.qq.com/sdk/report?v="+D.version+"&o="+D.preVerifyState+"&s="+D.systemType+"&c="+D.clientVersion+"&a="+D.appId+"&n="+D.networkType+"&i="+D.initTime+"&p="+D.preVerifyTime+"&u="+D.url,c=new Image,c.src=b}})))}function l(){return(new Date).getTime()}function m(b){w&&(a.WeixinJSBridge?b():q.addEventListener&&q.addEventListener("WeixinJSBridgeReady",b,!1))}function n(){H.invoke||(H.invoke=function(b,c,d){a.WeixinJSBridge&&WeixinJSBridge.invoke(b,e(c),d)},H.on=function(b,c){a.WeixinJSBridge&&WeixinJSBridge.on(b,c)})}var o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H;if(!a.jWeixin)return o={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest"},p=function(){var b,a={};for(b in o)a[o[b]]=b;return a}(),q=a.document,r=q.title,s=navigator.userAgent.toLowerCase(),t=navigator.platform.toLowerCase(),u=!(!t.match("mac")&&!t.match("win")),v=-1!=s.indexOf("wxdebugger"),w=-1!=s.indexOf("micromessenger"),x=-1!=s.indexOf("android"),y=-1!=s.indexOf("iphone")||-1!=s.indexOf("ipad"),z=function(){var a=s.match(/micromessenger\/(\d+\.\d+\.\d+)/)||s.match(/micromessenger\/(\d+\.\d+)/);return a?a[1]:""}(),A=!1,B=!1,C={initStartTime:l(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},D={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",preVerifyState:1,systemType:y?1:x?2:-1,clientVersion:z,url:encodeURIComponent(location.href)},E={},F={_completes:[]},G={state:0,data:{}},m(function(){C.initEndTime=l()}),H={config:function(a){E=a,j("config",a);var b=E.check===!1?!1:!0;m(function(){var a,d,e;if(b)c(o.config,{verifyJsApiList:i(E.jsApiList)},function(){F._complete=function(a){C.preVerifyEndTime=l(),G.state=1,G.data=a},F.success=function(){D.preVerifyState=0},F.fail=function(a){F._fail?F._fail(a):G.state=-1};var a=F._completes;return a.push(function(){k()}),F.complete=function(){for(var c=0,d=a.length;d>c;++c)a[c]();F._completes=[]},F}()),C.preVerifyStartTime=l();else{for(G.state=1,a=F._completes,d=0,e=a.length;e>d;++d)a[d]();F._completes=[]}}),E.beta&&n()},ready:function(a){0!=G.state?a():(F._completes.push(a),!w&&E.debug&&a())},error:function(a){"6.0.2">z||B||(B=!0,-1==G.state?a(G.data):F._fail=a)},checkJsApi:function(a){var b=function(a){var c,d,b=a.checkResult;for(c in b)d=p[c],d&&(b[d]=b[c],delete b[c]);return a};c("checkJsApi",{jsApiList:i(a.jsApiList)},function(){return a._complete=function(a){if(x){var c=a.checkResult;c&&(a.checkResult=JSON.parse(c))}a=b(a)},a}())},onMenuShareTimeline:function(a){d(o.onMenuShareTimeline,{complete:function(){c("shareTimeline",{title:a.title||r,desc:a.title||r,img_url:a.imgUrl||"",link:a.link||location.href,type:a.type||"link",data_url:a.dataUrl||""},a)}},a)},onMenuShareAppMessage:function(a){d(o.onMenuShareAppMessage,{complete:function(){c("sendAppMessage",{title:a.title||r,desc:a.desc||"",link:a.link||location.href,img_url:a.imgUrl||"",type:a.type||"link",data_url:a.dataUrl||""},a)}},a)},onMenuShareQQ:function(a){d(o.onMenuShareQQ,{complete:function(){c("shareQQ",{title:a.title||r,desc:a.desc||"",img_url:a.imgUrl||"",link:a.link||location.href},a)}},a)},onMenuShareWeibo:function(a){d(o.onMenuShareWeibo,{complete:function(){c("shareWeiboApp",{title:a.title||r,desc:a.desc||"",img_url:a.imgUrl||"",link:a.link||location.href},a)}},a)},onMenuShareQZone:function(a){d(o.onMenuShareQZone,{complete:function(){c("shareQZone",{title:a.title||r,desc:a.desc||"",img_url:a.imgUrl||"",link:a.link||location.href},a)}},a)},startRecord:function(a){c("startRecord",{},a)},stopRecord:function(a){c("stopRecord",{},a)},onVoiceRecordEnd:function(a){d("onVoiceRecordEnd",a)},playVoice:function(a){c("playVoice",{localId:a.localId},a)},pauseVoice:function(a){c("pauseVoice",{localId:a.localId},a)},stopVoice:function(a){c("stopVoice",{localId:a.localId},a)},onVoicePlayEnd:function(a){d("onVoicePlayEnd",a)},uploadVoice:function(a){c("uploadVoice",{localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},downloadVoice:function(a){c("downloadVoice",{serverId:a.serverId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},translateVoice:function(a){c("translateVoice",{localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},chooseImage:function(a){c("chooseImage",{scene:"1|2",count:a.count||9,sizeType:a.sizeType||["original","compressed"],sourceType:a.sourceType||["album","camera"]},function(){return a._complete=function(a){if(x){var b=a.localIds;b&&(a.localIds=JSON.parse(b))}},a}())},previewImage:function(a){c(o.previewImage,{current:a.current,urls:a.urls},a)},uploadImage:function(a){c("uploadImage",{localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},downloadImage:function(a){c("downloadImage",{serverId:a.serverId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},getNetworkType:function(a){var b=function(a){var c,d,e,b=a.errMsg;if(a.errMsg="getNetworkType:ok",c=a.subtype,delete a.subtype,c)a.networkType=c;else switch(d=b.indexOf(":"),e=b.substring(d+1)){case"wifi":case"edge":case"wwan":a.networkType=e;break;default:a.errMsg="getNetworkType:fail"}return a};c("getNetworkType",{},function(){return a._complete=function(a){a=b(a)},a}())},openLocation:function(a){c("openLocation",{latitude:a.latitude,longitude:a.longitude,name:a.name||"",address:a.address||"",scale:a.scale||28,infoUrl:a.infoUrl||""},a)},getLocation:function(a){a=a||{},c(o.getLocation,{type:a.type||"wgs84"},function(){return a._complete=function(a){delete a.type},a}())},hideOptionMenu:function(a){c("hideOptionMenu",{},a)},showOptionMenu:function(a){c("showOptionMenu",{},a)},closeWindow:function(a){a=a||{},c("closeWindow",{},a)},hideMenuItems:function(a){c("hideMenuItems",{menuList:a.menuList},a)},showMenuItems:function(a){c("showMenuItems",{menuList:a.menuList},a)},hideAllNonBaseMenuItem:function(a){c("hideAllNonBaseMenuItem",{},a)},showAllNonBaseMenuItem:function(a){c("showAllNonBaseMenuItem",{},a)},scanQRCode:function(a){a=a||{},c("scanQRCode",{needResult:a.needResult||0,scanType:a.scanType||["qrCode","barCode"]},function(){return a._complete=function(a){var b,c;y&&(b=a.resultStr,b&&(c=JSON.parse(b),a.resultStr=c&&c.scan_code&&c.scan_code.scan_result))},a}())},openProductSpecificView:function(a){c(o.openProductSpecificView,{pid:a.productId,view_type:a.viewType||0,ext_info:a.extInfo},a)},addCard:function(a){var e,f,g,h,b=a.cardList,d=[];for(e=0,f=b.length;f>e;++e)g=b[e],h={card_id:g.cardId,card_ext:g.cardExt},d.push(h);c(o.addCard,{card_list:d},function(){return a._complete=function(a){var c,d,e,b=a.card_list;if(b){for(b=JSON.parse(b),c=0,d=b.length;d>c;++c)e=b[c],e.cardId=e.card_id,e.cardExt=e.card_ext,e.isSuccess=e.is_succ?!0:!1,delete e.card_id,delete e.card_ext,delete e.is_succ;a.cardList=b,delete a.card_list}},a}())},chooseCard:function(a){c("chooseCard",{app_id:E.appId,location_id:a.shopId||"",sign_type:a.signType||"SHA1",card_id:a.cardId||"",card_type:a.cardType||"",card_sign:a.cardSign,time_stamp:a.timestamp+"",nonce_str:a.nonceStr},function(){return a._complete=function(a){a.cardList=a.choose_card_info,delete a.choose_card_info},a}())},openCard:function(a){var e,f,g,h,b=a.cardList,d=[];for(e=0,f=b.length;f>e;++e)g=b[e],h={card_id:g.cardId,code:g.code},d.push(h);c(o.openCard,{card_list:d},a)},chooseWXPay:function(a){c(o.chooseWXPay,f(a),a)}},b&&(a.wx=a.jWeixin=H),H});
I$(219,"<div class=\"body\">     <ul class=\"m-cards clearfix\">         {{#list cards as item}}             <li r-class=\"{'card':item_index != 4,'blank':item_index==4, 'turnover':item.turnover, 'shuffle':item.shuffle}\" cardIndex={{item_index}} on-click={{this.reqPlay(item, item_index)}}>                 {{#if item_index != 4}}                 <div class=\"front\">                     <img src=\"{{item.imgUrl}}\" width=\"100%\" alt=\"翻牌奖品图\" />                 </div>                 <div class=\"back\"></div>                 {{/if}}             </li>         {{/list}}         <li r-class=\"{'btn':true, 'disabled1':StateServ.hasShuffle() || StateServ.hasSharedAct() || StateServ.outOfTimes()}\" on-click={{this.onBtnClick()}}>             <div class=\"table\">                 <div class=\"cell\">                     {{#if StateServ.notLogin()}}                         <span class=\"btntxt\">开始<br/>翻牌</span>                     {{#elseif StateServ.notPlayToday()}}                         <span class=\"btntxt\">开始<br/>翻牌</span>                         <p class=\"s-fs-12 s-fw-normal\">还有{{leftCount}}次机会</p>                     {{#elseif StateServ.hasShuffle() }}                         <p>赐我<br />好运</p>                         <p class=\"s-fs-12 s-fw-normal\">你还有{{leftCount}}次机会</p>                     {{#elseif StateServ.canPlayAgain()}}                         <span class=\"btntxt\">                             分享给<br />小伙伴                         </span>                         <p class=\"s-fs-12 s-fw-normal\">再得1次机会</p>                     {{#elseif StateServ.hasSharedAct()}}                         <p>赐我<br />好运</p>                         <p class=\"s-fs-12 s-fw-normal\">你还有{{leftCount}}次机会</p>                     {{#elseif StateServ.outOfTimes()}}                         明天再<br/>来吧！                     {{/if}}                 </div>             </div>         </li>     </ul>      {{#if !shared && !StateServ.notLogin() }}         <div class=\"u-sharebtn10 s-fs-16 s-fc-f\" on-click=\"{{this.shareAct(true)}}\">             分享给小伙伴<br>             <span class=\"s-fs-12\">再得1次翻牌机会</span>         </div>     {{#else}}          <div class=\"u-sharebtn11 s-fs-16 s-fc-f\" on-click={{this.shareAct(true)}}>             分享给小伙伴<br>         </div>     {{/if}} </div> <broadcast list={{broadcastList}}></broadcast>");
I$(228,"<div class=\"m-modal s-fs-14 s-fc-3\">     {{#include message}}     <a class=\"u-btn10\" on-click={{this.confirm()}}>{{btntxt}}</a>     <div on-click={{this.hide()}} class=\"u-close10\"></div> </div>");
I$(220,function (_, _e, _v, tpl, Modal, p){
var OKModal = Modal.extend({
content: tpl,
config: function(data){
},
init: function(){
this.supr();
},
confirm: function(){
this.$emit('confirm', this.data);
this.destroy();
},
hide:function(evt) {
this.destroy();
},
// 弹层关闭
close: function(){
//@override parent method
}
});
return OKModal;
},74,4,3,228,202);
I$(229,"<div class=\"m-modal s-fs-14 s-fc-3\" animate>     <h3 class=\"s-fw-bold\">恭喜！翻到如下奖品</h3>     {{#if GIFTTYPE.COUPON_10.indexOf(gift.type) != -1}}         <div class=\"coupon10\"></div>     {{#elseif GIFTTYPE.KAOLAPOINT.indexOf(gift.type) != -1}}         <div class=\"kaolapoint\">             <span class=\"pointicon\"></span><br/>             <span class=\"s-fc-red\">{{gift.price}}</span>考拉豆         </div>     {{#elseif GIFTTYPE.COUPON_300.indexOf(gift.type) != -1}}         <div class=\"coupon300\"></div>     {{#elseif GIFTTYPE.GOODS_COUPON.indexOf(gift.type) != -1}}         <div class=\"couponwrap\">             <div class=\"couponbg s-fs-26 s-fc-f f-tal\">                 <span class=\"s-fs-12\">￥</span>{{gift.price}}             </div>         </div>         <p class=\"s-fs-12 s-fc-9 f-tal ruletip1\">             使用此券可以抵用如下商品，<br/>             此券7天内有效         </p>         <div class=\"goodsImg\">             <img src=\"{{gift.goodsImg}}\" alt=\"商品图片\" width=\"85px\" height=\"85px\" />             <div class=\"goodsPrice s-fs-12 s-fc-0\">                 券后<br/>￥<span class=\"price\">{{gift.goodsPrice}}</span>             </div>         </div>         <p class=\"title f-ellipsis\">{{gift.shortTitle}}</p>         <a href=\"/product/{{gift.goodsId}}.html\" class=\"link\">立即��买&gt;</a>     {{#elseif GIFTTYPE.GOODS_FREE.indexOf(gift.type) != -1}}         <div class=\"goodsImg\">             <img src=\"{{gift.goodsImg}}\" alt=\"商品图片\" width=\"85px\" height=\"85px\" />             <div class=\"freeprice s-fs-14 s-fc-0\">                 免费             </div>         </div>         <input type=\"tel\" class=\"numinput\" placeholder=\"请输入手机号\" r-model={{mobile}} />         <p class=\"ruletip3 s-fc-9 s-fs-12\">客服会在24小时内联系你</p>     {{/if}}     <a class=\"u-btn10\" on-click={{this.confirm()}}>         {{#if GIFTTYPE.GOODS_FREE.indexOf(gift.type) != -1}}             确定         {{#else}}             {{btntxt}}         {{/if}}     </a>     {{#if GIFTTYPE.GOODS_FREE.indexOf(gift.type) == -1 }}         <div on-click={{this.hide()}} class=\"u-close10\"></div>     {{/if}} </div>");
I$(221,function (_, _e, _v, tpl, Modal, p){
var OKModal = Modal.extend({
content: tpl,
config: function(data){
},
init: function(){
this.supr();
},
confirm: function(){
this.$emit('confirm', this.data);
// this.destroy();
},
hide:function(evt) {
this.destroy();
},
// 弹层关闭
close: function(){
//@override parent method
}
});
return OKModal;
},74,4,3,229,202);
I$(230,"<div class=\"m-modal s-fs-14 s-fc-3\">     {{#include message}}     <a class=\"u-btn10\" href={{url}}>{{btntxt}}</a> </div>");
I$(222,function (_, _e, _v, tpl, Modal, p){
var OKModal = Modal.extend({
content: tpl,
config: function(data){
},
init: function(){
this.supr();
},
confirm: function(){
this.$emit('confirm', this.data);
this.destroy();
},
hide:function(evt) {
this.destroy();
},
// 弹层关闭
close: function(){
//@override parent method
}
});
return OKModal;
},74,4,3,230,202);
I$(231,"<div class=\"m-broadcast\">     <h2 class=\"s-fs-16 s-fw-bold f-tac\">实时播报</h2>     <div class=\"wrap\">         <ul scroll class=\"s-fs-12 scrollview\">         {{#list list as item}}             <li class=\"item f-tac\"><span class=\"txt\"><span class=\"account f-ellipsis f-tar\">{{item.accountId}}</span>刚刚中了<span class=\"desc f-ellipsis f-tal\">{{item.giftDesc}}</span></span></li>         {{/list}}          </ul>     </div> </div>");
I$(223,function (_, _e, _v, tpl, BaseComponent){
var RealPlayer = BaseComponent.extend({
name:'broadcast',
template:tpl,
config: function(data){
data.list = data.list || [];
this.supr(data);
}
});
RealPlayer.directive('scroll', function(ele) {
this.$watch('list.length', function(val) {
if ( val > 6 ) {
ele.addEventListener('transitionend', function() {
_e._$delClassName(ele, 'scroll');
var list = this.data.list;
list.push(list.splice(0, 1)[0]);
this.$update();
}._$bind(this));
setInterval(function() {
_e._$addClassName(ele, 'scroll');
}, 4000);
}
});
});
return RealPlayer;
},74,4,3,231,23);
I$(225,function (_e, _v, toast, _) {
var STATE = {
USER_NOTLOGIN:0,    // 未登录
HAS_NOTPLAY_TODAY:1,// 登陆今日还没有玩
SHUFFLE_DONE:2,     // 洗牌完成
CAN_PLAY_AGAIN:3,   // 分享可再得一次机会
HAS_SHARE_ACT:4,    // 已经分享，显示赐我好运， 再来一次
HAS_PLAY_TWICE:5    // 今日两次机会用完， 运气不错哦
};
var StateServ = {
state:2, // 初始状态为2, 表示已经洗过牌
init:function(json) {
var state = 0,
page  = json.body.turnCardMainPage,
code  = json.code;
if ( !page.isLogin ) {
state = STATE.USER_NOTLOGIN;
} else if ( page.userSurplusChanceCount >= 1 && !page.isShuffleTheCards && !page.userTodayReceiveCardList ) {
// 今天没玩过剩余次数大于等于1，并且没有洗过牌，则可以洗牌
state = STATE.HAS_NOTPLAY_TODAY;
} else if ( page.userSurplusChanceCount >= 1 && page.isShuffleTheCards && !page.userTodayReceiveCardList ) {
// 今天没玩过剩余次数大于等于1, 但是已经洗过牌,则不用洗牌，并且只展示已经翻开的牌
state = STATE.SHUFFLE_DONE;
} else if ( page.userSurplusChanceCount >= 1 && page.userTodayReceiveCardList ) {
// 今日剩余次数大于等于1，并且已经玩过一次；证明已经分享过，则可再玩一次；
state = STATE.HAS_SHARE_ACT;
} else if ( page.userSurplusChanceCount < 1 && !page.isUserShareTurnCardActivity ) {
// 剩余次数是0， 但是还没分享过， 则可以分享再玩一次
state = STATE.CAN_PLAY_AGAIN;
} else if ( page.userSurplusChanceCount < 1 && page.isUserShareTurnCardActivity ) {
// 分享过了， 剩余次数还是0， 则证明已经领过两次了， 不能再领
state = STATE.HAS_PLAY_TWICE;
}
this.state = state;
},
getState:function() {
return this.state;
},
notLogin:function() {
return this.state == STATE.USER_NOTLOGIN;
},
notPlayToday:function() {
return this.state == STATE.HAS_NOTPLAY_TODAY;
},
hasShuffle:function() {
return this.state == STATE.SHUFFLE_DONE;
},
hasSharedAct:function() {
return this.state == STATE.HAS_SHARE_ACT;
},
canPlayAgain:function() {
return this.state == STATE.CAN_PLAY_AGAIN;
},
outOfTimes:function() {
return this.state == STATE.HAS_PLAY_TWICE;
},
notShuffleYet:function() {
return this.state < STATE.SHUFFLE_DONE;
},
hasPlayed:function() {
return this.canPlayAgain() || this.outOfTimes();
},
update:function(leftCount) {
var state = this.state;
if ( state == STATE.HAS_NOTPLAY_TODAY ) {
//登陆今日还没有玩 -> 洗牌完成
this.state = STATE.SHUFFLE_DONE;
} else if ( state == STATE.SHUFFLE_DONE ) {
// 洗牌完成 -> 分享可再得一次机会
if ( leftCount > 0 ) {
this.state = STATE.HAS_SHARE_ACT;
} else {
this.state = STATE.CAN_PLAY_AGAIN;
}
} else if ( state == STATE.CAN_PLAY_AGAIN ) {
// 分享可再得一次机会 -> 已经分享，显示赐我好运， 再来一次
this.state = STATE.HAS_SHARE_ACT;
} else if ( state == STATE.HAS_SHARE_ACT ) {
// 已经分享，显示赐我好运， 再来一次 -> 今日两次机会用完， 运气不错哦
this.state = STATE.HAS_PLAY_TWICE;
}
}
};
return StateServ;
},4,3,25,74);
I$(232,function (R, request, toast, _) {
/**
* 脚本举例
* ```javascript
* define([
*     'base/klass'
*     ,'pro/components/wxApi/wxApi'
*     ,'pro/widget/module'
* ],function(_k,WxApi,Module,_p,_o,_f,_r,_pro){
*     _p._$$TestModule = _k._$klass();
*     _pro = _p._$$TestModule._$extend(Module);
*
*     _pro.__init = function(_options) {
*        //在需要时，新建WxApi对象
*        this.__wxApi = new WxApi({data:{}});
*
*        //注册isWxReady事件，后台返回wx.config中所需信息之后触发
*        this.__wxApi.$on('apiIsReady', function(status, data){
*            //此处可以进行调用wxapi
*        }._$bind(this));
*     }
*
* ```
*
* 新建wxApi对象时，可传入data里的参数
* @property  {String}      URL     - 可以传url覆盖默认URL地址
* @property  {String}      shareTitle     - 分享标题
* @property  {String}      shareContent    - 分享内容
* @property  {String}      shareImgUrl    - 分享图片
* @property  {String}      shareUrl    - 分享链接
* @property  {String}      URL         - 请求获取微信配置信息，可以传的url覆盖默认URL地址
* @property  {Boolean}     isDebug      - 是否开启debug模式，当为true时微信会自动alert出返回值
* @property  {function}     successCallback      - 分享回调方法
* @property  {array}     jsApiList      - 需要支持的wxApi ,不要用双引号（https://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html附录2）
*
* 可供外部调用方法
* @function  isApiReady    返回微信接口是否成功
* @function  apiIsReady    微信接口可调用之后触发的事件
*
*/
var WxApi = Regular.extend({
/**
* ajaxUrl   string    自定义领取优惠券接口(接口返回格式统一)
* argus     object    渲染自定义template的数据
*/
data:{
url:"/wxConfig.html",
isDebug:true,
isReady:false,
shareTitle:"",
shareContent:"",
shareImgUrl:"",
shareUrl:"",
onlyShowShareMenu: false,
successCallback:null,
cancelCallback: null,
jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','showMenuItems']
},
config: function(data) {
//_.extend(data,{
//});
},
init: function() {
var me=this;
request(this.data.url,{
data:{url:location.href},
method:'get',
type:'json',
//norest:true,
onload:function(_json){
me.__initWxConfig(_json);
},
onerror:function(_json){
}
})
},
__initWxConfig:function(data){
var  self = this;
if(!data.body){
return;
}
wx.config({
// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
// 参数信息会通过log打出，仅在pc端时才会打印。
debug: this.data.isDebug,
appId: data.body.appId, // 必填，公众号的唯一标识
timestamp: data.body.timestamp, // 必填，生成签名的时间戳
nonceStr: data.body.nonceStr, // 必填，生成签名的随机串
signature: data.body.signature,// 必填，签名
// 必填，需要使用的JS接口列表，所有
// JS接口列表见https://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
jsApiList:this.data.jsApiList
});
//wx.checkJsApi({ //当开启调试模式时，会执行这个方法，检测jsApiList中的参数
//    jsApiList:this.data.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
//    success: function (res) {
//        // 以键值对的形式返回，可用的api值true，不可用为false
//        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//    },
//    error:function(_json){
//        alert(_json);
//    }
//});
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
// 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
// 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
wx.ready(function(){
//如果设置了仅仅显示分享按钮，才禁用其它按钮
if (this.data.onlyShowShareMenu) {
wx.hideOptionMenu();
}
wx.showMenuItems({
menuList: ["menuItem:share:appMessage","menuItem:share:timeline"] // 要显示的菜单项，所有menu项见附录3
});
this.addShareEvents();
this.data.isReady=true;
this.$emit('apiIsReady');
}.bind(this));
},
isApiReady:function(){
return this.data.isReady;
},
addShareEvents: function(){
var shareData=this.data, self = this;
wx.onMenuShareTimeline({
title: shareData.timeLineTitle?shareData.timeLineTitle:shareData.shareTitle, // 分享标题
link: shareData.shareUrl, // 分享链接
imgUrl:shareData.shareImgUrl, // 分享图标
success: function () {
// 校验用户是否登录
shareData.successCallback && shareData.successCallback();
self.$emit('shareResult', {result: true,channel: 'timeline'});
},
cancel: function () {
// 用户取消分享后执行的回调函数
shareData.cancelCallback && shareData.cancelCallback();
self.$emit('shareResult', {result: false,channel: 'timeline'});
}
});
wx.onMenuShareAppMessage({
title: shareData.shareTitle, // 分享标题
desc: shareData.shareContent, // 分享描述
link:shareData.shareUrl, // 分享链接
imgUrl: shareData.shareImgUrl, // 分享图标
type: '', // 分享类型,music、video或link，不填默认为link
dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
success: function () {
// 校验用户是否登录
shareData.successCallback && shareData.successCallback();
self.$emit('shareResult', {result: true,channel: 'appMessage'});
},
cancel: function () {
// 用户取消分享后执行的回调函数
shareData.cancelCallback && shareData.cancelCallback();
self.$emit('shareResult', {result: false,channel: 'appMessage'});
}
});
},
/**
* 更新页面分享数据, 不合要求的数据将被忽略
* @return {void} 无返回
*/
setShareData: function(newData){
var data = this.data;
var dataSegments = ["shareTitle","shareContent","timeLineTitle","shareImgUrl","shareUrl"];
for (var i = 0; i < dataSegments.length; i++) {
if (newData[ dataSegments[i] ] != undefined){
data[ dataSegments[i] ] = newData[ dataSegments[i] ];
}
};
this.addShareEvents();
}
});
return WxApi;
},65,68,25,74,184);
I$(233,function (_k, _ut, _t, _) {
var _pro;
var _$$YxShareApi = _k._$klass();
_pro = _$$YxShareApi._$extend(_t._$$EventTarget);
_pro.__reset = function(opts) {
this.__super(opts);
var UA = navigator.userAgent.toLowerCase();
if (!UA.match(/yixin/i)) {
return;
} // 不在易信内，则返回
this.__shareData = {};
this.__jsbridgeReady = false;
document.addEventListener('YixinJSBridgeReady', function() {
this.__NJ = YixinJSBridge;
if (!this.__NJ) { return; }
this.__jsbridgeReady = true;
this.__initShareEvents();
this._$dispatchEvent('onready');
}._$bind(this));
};
_pro.__init = function() {
this.__super();
};
/**
* 设置分享数据，这里的格式应该是易信分享的标准数据格式, 不合要求的数据将被忽略
*  {
*      "imgUrl": "图⽚链接",
*      "tImgUrl": "分享到朋友圈的图⽚",
*      "fImgUrl": "分享给好友的图⽚",
*      "wImgUrl": "分享到微博的图⽚",
*      "timeLineLink": "分享到朋友圈的链接",
*      "sendFriendLink": "分享给好友的链接",
*      "weiboLink": "分享到微博的连接",
*      "tTitle": "分享到朋友圈的标题",
*      "tContent": "分享到朋友圈的描述",
*      "fTitle": "分享给好友的标题",
*      "fContent": "分享给好友的描述",
*      "wContent": "分享到微博的内容"
*  }
* @param  {Object} data 见上方的数据描述
* @return {void}      无
*/
_pro._$setShareData = function(data){
if (data && data.imgUrl) {
this.__shareData = _.extend({}, data);
//为易信分享做fallback处理
window.shareData = data;
}
};
_pro.__initShareEvents = function() {
this.__NJ.on('menu:share:appmessage', function(argv) {
this.__NJ.invoke('sendAppMessage', {
"img_url": this.__shareData.imgUrl,
"link": this.__shareData.sendFriendLink,
"desc": this.__shareData.fContent,
"title": this.__shareData.fTitle
}, function(res) {
this._$dispatchEvent('onshareChannelClick', {channel: 'appmessage'});
}._$bind(this));
}._$bind(this));
this.__NJ.on('menu:share:timeline', function(argv) {
this.__NJ.invoke('shareTimeline', {
"img_url": this.__shareData.imgUrl,
"link": this.__shareData.timeLineLink,
"desc": this.__shareData.tContent,
"title": this.__shareData.tTitle
}, function(res) {
this._$dispatchEvent('onshareChannelClick', {channel: 'timeline'});
}._$bind(this));
}._$bind(this));
//一个坑，微博分享仅仅支持 400x400及以下的图片
//this.__NJ.on('menu:share:weibo', function(argv) {
//    this.__NJ.invoke('shareWeibo', {
//        "content": this.__shareData.wContent,
//        "url": this.__shareData.weiboLink,
//        'img_url': this.__shareData.wImgUrl
//    }, function(res) {
//        this._$dispatchEvent('onshareChannelClick', {channel: 'weibo'});
//    }._$bind(this));
//}._$bind(this));
};
/**
* 如果jsbridge 已经就绪，直接调用回调函数，否则待就绪后再回调
* @param  {Function} callback 回调
* @return {Void}            无返回值
*/
_pro.__afterReady = function(callback, context) {
if (this.__jsbridgeReady) {
callback.apply(context);
} else {
var onready = function() {
callback.apply(context);
setTimeout(function(){
this._$delEvent('onready', onready);
}._$bind(this), 100)
};
this._$addEvent('onready', onready);
}
};
//返回YxShareApi 单例
return (function() {
var yxShareApi;
return function() {
if (!yxShareApi) {
yxShareApi = _$$YxShareApi._$allocate();
}
return yxShareApi;
};
})();
},1,2,20,74);
I$(227,function (_k, _ut, _t, _, WxApi, getYixinShare) {
var _pro;
var _$$ShareApi = _k._$klass();
_pro = _$$ShareApi._$extend(_t._$$EventTarget);
_pro.__reset = function(opts) {
this.__super(opts);
var UA = navigator.userAgent.toLowerCase();
if (!UA.match(/yixin|micromessenger/i)) {
return;
} // 不在易信，微信内，则返回
this.__platform = UA.match(/yixin|micromessenger/i)[0];
var shareData = this.__getDefaultShareData();
if (this.__platform === 'micromessenger') {
this.__wx = new WxApi({
data: {
isDebug: false,
shareTitle: "",
shareContent: "",
timeLineTitle: "",
shareImgUrl: "",
shareUrl: ""
}
});
this.__setWeixinShareData(shareData);
}else if (this.__platform === 'yixin') {
this.__yx = getYixinShare();
this.__setYixinShareData(shareData);
}
};
_pro.__init = function() {
this.__super();
};
/**
* 获取页面的默认分享数据
* @return {Object} 分享数据对象
*         @property {String} img_url 分享图片链接
*         @property {String} Link 分享页面链接
*         @property {String} desc 分享正文
*         @property {String} title 分享标题
*         @property {String} wbpost 分享微博正文
*/
_pro.__getDefaultShareData = function(){
var _url = document.URL,
_desc = '今天在传说中最靠谱的网易考拉海购发现了一件不错的东东!',
_shareData = window.shareConfig;
if (_shareData && _shareData.img_url) {
return _shareData;
}
//如果没有配置数据，则使用默认数据
return {
img_url: "http://haitao.nos.netease.com/87299fe51d0a4d43a6befd89c8ff1cc5.jpg?imageView&thumbnail=400x0",
link: _url,
desc: _desc,
title: document.title,
wbpost: _desc + ' ' + _url +" @网易考拉海购"
};
};
/**
* 打开分享
* @param  {Object} shareData             分享数据，与App的分享数据结构一致
* @param  {Function} resultCallback        分享结果回调
*                                          易信里边仅有selectChannelCallback 回调
*                                          微信里边仅有resultCallback回调
* @param  {Function} selectChannelCallback 分享时点击分享渠道回调
* @return {Void}                       无返回
*/
_pro._$openShare = function(shareData, resultCallback, selectChannelCallback){
shareData = shareData||{};
if (this.__platform === 'micromessenger') {
this.__openWeixinShare(shareData, resultCallback, selectChannelCallback);
}else if (this.__platform === 'yixin') {
this.__openYixinShare(shareData, resultCallback, selectChannelCallback);
}
};
_pro.__openYixinShare = function(shareData, resultCallback, selectChannelCallback){
this.__setYixinShareData(shareData);
this.__yx._$delEvent('onshareChannelClick');
if (selectChannelCallback) {
this.__yx._$addEvent('onshareChannelClick', function(res){
//res {channel: appmessage/timeline/weibo}
var _res = res||{};
_res.shareApp = 'yixin';
selectChannelCallback(_res);
});
}
};
_pro.__setYixinShareData = function(shareData){
this.__yx._$setShareData({
imgUrl: shareData.img_url,
tImgUrl: shareData.img_url,
fImgUrl: shareData.img_url,
wImgUrl: shareData.img_url,
timeLineLink: shareData.link,
sendFriendLink: shareData.link,
weiboLink: shareData.link,
tTitle: shareData.timeLineTitle || shareData.title,
tContent: shareData.desc,
fTitle: shareData.title,
fContent: shareData.desc,
wContent: shareData.wbpost
});
};
_pro.__openWeixinShare = function(shareData, resultCallback, selectChannelCallback){
this.__setWeixinShareData(shareData);
this.__wx.$off('shareResult');
if (resultCallback) {
this.__wx.$on('shareResult', function(res){
//res: {result: true/false, channel: appmessage/timeline}
var _res = res||{};
_res.shareApp = 'weixin';
resultCallback(_res);
});
}
};
_pro.__setWeixinShareData = function(shareData){
this.__wx.setShareData({
shareTitle: shareData.title,
shareContent: shareData.desc,
timeLineTitle: shareData.timeLineTitle || shareData.desc,
shareImgUrl: shareData.img_url,
shareUrl: shareData.link
});
}
//返回ShareApi 单例
return (function() {
var shareApi;
return function() {
if (!shareApi) {
shareApi = _$$ShareApi._$allocate();
}
return shareApi;
};
})();
},1,2,20,74,232,233);
I$(224,function (_e, _v, toast, _, StateServ, _j, getShare) {
var ShareServ = {
timerId:null,
share:function(gift, callback) {
if ( window.__isKaolaApp ) {
this.shareActInKaola(gift, callback);
} else {
this.shareAct(gift, callback);
}
},
shareAct:function(gift, callback) {
/**
* 如果未登录，则分享不调用接口
* 如果登陆， 在kaolapp外，调用分享接口，并且10s后给用户加一次机会
* 在考拉app内部， 调用分享接口， 2min后会给用户加一次机会， 如果有回调到callback， 那么立刻同步加一次机会；
* 是考虑到用户分享到微信， 留在微信不回来的情况
*/
var ua   = navigator.userAgent,
mask = _e._$get('mask');
_v._$addEvent(mask, 'click', function() {
_e._$addClassName(mask, 'f-dn');
});
var shareObj = this.__prepare(gift);
if (ua.match(/MicroMessenger/i) || ua.match(/YiXin/i)) {
_e._$delClassName(mask, 'f-dn');
var share = getShare();
share._$openShare(shareObj);
document.title = shareObj.desc;
} else {
toast.show({message:'亲爱哒，只能在微信、考拉、易信内分享哦~', singleMsg:true});
return;
}
this.__reqShare();
if ( StateServ.notLogin() ) {
return;
} else {
if ( this.timerId ) { return; }
this.timerId = setTimeout(function() {
callback && callback();
}, 10000);
}
},
__reqShare:function(isAsync) {
// 如果在微信， isAsync是false， 立刻加机会,
// 如果是考拉， 是true， 2min后加
var url = '/turncard/share.html',
opts= {
data:{
isAsync:isAsync || false
},
onload:function(json) {}
};
_j._$request(url,opts);
},
__cancalShare:function(isAsync) {
// 如果跳转到其他app,但是没分享， 又回来， 则调用cancelShare
var url = '/turncard/cancelshare.html',
opts= {
data:{
isAsync:false
},
onload:function(json) {}
};
_j._$request(url,opts);
},
init:function(gift) {
// this.__prepare(gift);
},
__prepare:function(gift) {
var shareObj = {
title:'考拉翻牌100%中奖',
desc:'我在考拉翻牌拿到了神秘大奖，100%中奖，一起来玩吧'
}
if ( gift && gift.desc ) {
shareObj.desc = gift.desc;
}
shareObj.link= 'http://m.kaola.com/activity/h5/6982.html';
shareObj.wbpost = shareObj.desc + shareObj.link +" @网易考拉海购";
shareObj.img_url = 'http://haitao.nos.netease.com/b88d0a37d4974002a88fd565f9248631.jpg';
return shareObj;
},
isRefreshNeeded:function() {
var _now = new Date().getTime();
return window.__isKaolaApp && this.timerId && ( ( _now - this.timerId ) > 2 * 60 * 1000 );
},
shareActInKaola:function(gift, callback) {
if ( StateServ.notLogin() ) {
// 未登录
_.toLogin();
return;
}
var shareObj = this.__prepare(gift);
if (_.isOldApp(12,10400)) {
toast.show('您的App版本太低，赶快升级吧');
} else if ( !!window.WeixinJSBridge ) {
this.__reqShare(true);
WeixinJSBridge.invoke('shareKaolaAppMessage', shareObj, function(res) {
//  ios 的兼容 ios返回字符串false， 安卓返回false
if(!res.share_result || res.share_result === 'false' ) {
// 分享失败
this.__cancalShare();
} else {
// success
this.__reqShare(false);
callback && callback();
}
this.timerId = null;
}._$bind(this));
var _now = new Date().getTime();
this.timerId = _now;
}
}
}
return ShareServ;
},4,3,25,74,225,32,227);
I$(226,function (_e, _v, toast, _, _u) {
var Util = {
parseQrCode:function() {
var query = window.location.search.split(''),
qrcode= '';
if ( query.length ) {
query[0] = '';
var param = _u._$query2object(query.join(''));
if ( param.qrcode ) {
qrcode = param.qrcode;
}
}
return qrcode;
}
};
return Util;
},4,3,25,74,2);
I$(217,function (_e,_v, BaseComponent, _tpl, toast, _, NotifyWin, SuccessWin, OverDueWin, BroadCast, ShareServ, StateServ, Util, getShare) {
var App = BaseComponent.extend({
template:_tpl,
config:function(data) {
data.GIFTTYPE = {
COUPON_10:[1],   // 10元无门槛券
KAOLAPOINT:[2,3,4],  // 考拉豆
COUPON_300:[5],  // 300组合券
GOODS_COUPON:[6,7],// 商品特价券
GOODS_FREE:[8]   // 免费实物
}
data.StateServ = StateServ;
data.lastGift  = null; // 最近一次获得到的奖品；
data.shared    = false;
var cards = this.initCards();
this.parseCardList(cards);
this.onPageLoad();
this.supr(data);
},
init:function() {
getShare();
},
removeMask:function() {
var mask = _e._$get('loadMask');
_e._$addClassName(mask, 'hide');
setTimeout(function() {
mask.parentNode.removeChild(mask)
}, 450);
},
initCards:function() {
// @undone : 替换图片地址为nos地址
var cards= [],
card = { "imgUrl":"http://haitao.nos.netease.com/98cae1b346194f959ebe0ec4ca77c9d1.png" };
for ( var i = 0; i < 8; i++ ) {
cards.push(JSON.parse(JSON.stringify(card)));
}
return cards;
},
onPageLoad:function() {
var qrcode = Util.parseQrCode(),
param  = qrcode ? {"qrcode":qrcode }: {};
if ( qrcode ) {
window._dapush && window._dapush('_trackEvent', 'fanpai', 'share_pc','weixin', {userAccount:window.userId,userId:window.userId});
}
var url = '/turncard/enter.html',
opts= {
data:param,
type:'json',
onload:function(json) {
var data = this.data,
page = json.body.turnCardMainPage,
code = json.code;
if ( page && page.gotoUrlWhenActivityFinished ) {
var actHome = page.gotoUrlWhenActivityFinished;
new OverDueWin({
data:{
btntxt:'去主会场逛逛吧!',
message:'<p class="message">啊哦~活动过期啦~</p>',
url:actHome
}
}).$inject(_e._$get('modal'));
return;
}
if ( code == 200  ) {
/**
* userSurplusChanceCount:用户剩余的机会次数
* isUserShareTurnCardActivity:是否分享过
* userTodayReceiveCardList:今日已经领取的card
* isHasPrizeSurplus:商品是否全部领完
* isShuffleTheCards:是否洗过牌
*/
data.runout = !page.isHasPrizeSurplus;
data.shared = page.isUserShareTurnCardActivity;
data.leftCount = page.userSurplusChanceCount;
data.broadcastList = page.realTimePlay || [];
StateServ.init(json);
if ( page.isShuffleTheCards ) {
this.parseTurnedCardList(page.userTodayReceiveCardList || []);
} else {
// 没有洗过牌, 则取返回的奖品list，否则，无需再次洗牌，都展示背面
this.parseCardList(page.cardList);
}
} else {
toast.show({message:'玩的人太多，请稍后再试',singleMsg:true});
}
setTimeout(function() {
this.removeMask();
}._$bind(this), 500);
}._$bind(this)
};
this.$request(url, opts);
},
parseCardList:function(cards) {
// 1. 插入中间的空元素占位置
cards.splice(4,0,{});
// 2. 初始化card状态信息
cards.map(function(card) {
card.shuffle = false;
card.turnover= StateServ.notShuffleYet();
});
this.data.cards = cards;
},
parseTurnedCardList:function(turnedCards) {
var cards = this.data.cards,
last  = null,
poslist= [];
turnedCards.map(function(item) {
var pos    = item.position || 0,
card   = cards[pos];
card.turnover = true;
poslist.push(pos);
_.extend(card, item, true);
last = card;
});
this.data.lastGift = last;
this.$update();
},
onBtnClick:function() {
if ( StateServ.notLogin() ) {
_.toLogin();
} else if ( this.data.runout ) {
var message = '<p class="s-fw-bold message">抱歉~今天的奖品送<br/>完了~<br/><span class="s-fs-12">活动时间：1.15~1.17</span></p><span class="kaola10"></span>';
this.showFailWin(message, '我知道了');
} else if ( StateServ.notPlayToday() ) {
// 洗牌
window._dapush && window._dapush('_trackEvent', 'fanpai', 'click_app','start_btn', {userAccount:window.userId,userId:window.userId});
this.reqShuffle();
} else if ( StateServ.hasShuffle() || StateServ.hasSharedAct() ) {
toast.show({message:'选择你要的牌',singleMsg:true});
} else if ( StateServ.canPlayAgain() ) {
// 分享给小伙伴再得1次机会 ， 进入分享流程
this.shareAct(true);
} else if ( StateServ.outOfTimes() ) {
// 2次机会用尽
this.showFailWin('<p class="s-fw-bold message f-tal">今天的翻牌机会已经<br/>用完了！明天再来吧~</p><p class="ruletip s-fs-12">2016.1.15-2016.1.17<br/>每天<span class="s-fc-red">&nbsp;1&nbsp;</span>次翻牌机会<br/>分享给好友再翻<span class="s-fc-red">1</span>次</p>', '分享给小伙伴');
}
},
reqShuffle:function() {
var url = '/turncard/shuffle.html',
opts= {
data:{},
type:'json',
onload:function(json) {
if ( json.code == 200 && json.body.canShuffle ) {
this.shuffle();
}
}._$bind(this)
};
this.$request(url, opts);
},
shuffle:function() {
var cards = this.data.cards;
cards.map(function(card) {
card.turnover = false;
});
setTimeout(function() {
cards.map(function(card) {
card.shuffle = true;
});
this.$update();
}._$bind(this), 1000);
setTimeout(function() {
this.updateState();
}._$bind(this), 2000);
},
reqPlay:function(card, pos) {
if ( pos == 4 ) { return; }
if ( ShareServ.isRefreshNeeded() ) {
window.location.href = window.location.href;
return;
}
var data = this.data;
if ( card.turnover && data.GIFTTYPE.GOODS_COUPON.indexOf(card.type) != -1 ) {
window.location.href = '/product/' + card.goodsId + '.html';
return;
}
if ( card.turnover || StateServ.notShuffleYet() ) {
return;
}
if ( data.runout ) {
var message = '<p class="s-fw-bold message">抱歉~今天的奖品送<br/>完了~<br/><span class="s-fs-12">活动时间：1.15~1.17</span></p><span class="kaola10"></span>';
this.showFailWin(message, '我知道了');
return;
}
if ( !data.leftCount && data.shared ) {
var _content = '<p class="s-fw-bold message f-tal">今天的翻牌机会已经<br/>用完了！明天再来吧~</p><p class="ruletip s-fs-12">2016.1.15-2016.1.17<br/>每天<span class="s-fc-red">&nbsp;1&nbsp;</span>次翻牌机会<br/>分享给好友再翻<span class="s-fc-red">1</span>次</p>';
this.showFailWin(_content, '分享给小伙伴');
return;
}
var url = '/turncard/luckdraw.html',
opts= {
data:{
position:pos
},
onload:function(json) {
var rst = json.body ? json.body.luckDraw : {};
if ( json.code == 200 && rst && rst.code == 200 ) {
_.extend(card, rst.card, true);
this.turnover(card);
setTimeout(function() {
this.showGiftWin(rst.card || {});
if ( this.data.leftCount > 0 ) {
this.data.leftCount--;
}
this.updateState();
}._$bind(this), 1000);
} else if ( rst.code == 1003 && StateServ.outOfTimes() ) {
// 今天的翻牌机会已经用完了！
this.data.leftCount = 0;
this.showFailWin('<p class="s-fw-bold message f-tal">今天的翻牌机会已经<br/>用完了！明天再来吧~</p><p class="ruletip s-fs-12">2016.1.15-2016.1.17<br/>每天<span class="s-fc-red">&nbsp;1&nbsp;</span>次翻牌机会<br/>分享给好友再翻<span class="s-fc-red">1</span>次</p>', '分享给小伙伴');
} else if ( rst.code == 1003 ) {
// 啊哦，暂时不能翻牌~  分享再得1次翻牌机会！
this.data.leftCount = 0;
this.showFailWin('<p class="message f-tal">啊哦，暂时不能翻牌~ <br/>分享再得<span class="s-fc-red">1</span>次翻牌机会!</p>', '分享再翻1次');
} else {
toast.show({message:'玩的人太多，请稍后再试',singleMsg:true});
}
}._$bind(this)
};
this.$request(url, opts);
},
showFailWin:function(msg, btntxt) {
this.notify(msg, btntxt);
},
notify:function(msg, btntxt) {
var win = new NotifyWin({
data:{
message:msg,
btntxt:btntxt
}
}).$inject(_e._$get('modal'));
if ( btntxt != '我知道了' ) {
win.$on('confirm', function() {
this.shareAct();
}._$bind(this));
}
},
showGiftWin:function(gift) {
var data  = this.data,
modal = new SuccessWin({
data:{
gift:gift,
GIFTTYPE:data.GIFTTYPE,
btntxt:data.shared ? '立即炫耀':'分享再翻1次'
}
}).$inject(_e._$get('modal'));
if ( data.GIFTTYPE.GOODS_FREE.indexOf(gift.type) != -1 ) {
modal.$on('confirm', function(obj) {
var mobile = obj.mobile;
if ( !/^[1][3578][0-9]{9}$/.test(mobile) ) {
toast.show({message:'请正确填入11位手机号',singleMsg:true});
} else {
this.sendMobileNum(mobile, function() {
var data   = this.data,
msg    = '<p class="s-fw-bold message">快来炫一下超级大奖吧！</p><span class="kaola11"></span>',
btntxt = data.shared ? '立即炫耀':'分享再翻1次'
this.notify(msg, btntxt);
modal.destroy();
}._$bind(this));
}
}._$bind(this));
} else {
modal.$on('confirm', function() {
this.shareAct();
modal.destroy();
}._$bind(this));
}
this.data.lastGift = gift;
},
turnover:function(card) {
card.shuffle = false;
setTimeout(function() {
card.turnover = true;
this.$update();
}._$bind(this), 300);
},
sendMobileNum:function(mobile, callback) {
var url  = '/turncard/mobile.html',
opts = {
data:{
mobile:mobile
},
onload:function(json) {
if ( json.code == 200 ) {
callback && callback();
} else {
toast.show({message:'网络错误， 请重试~',singleMsg:true});
}
}
};
this.$request(url, opts);
},
updateState:function() {
if ( StateServ.canPlayAgain() ) {
this.data.shared = true;
}
StateServ.update(this.data.leftCount);
this.$update();
},
updateLeftCount:function() {
var leftCount = this.data.leftCount;
if ( leftCount < 2 && !this.data.shared ) {
toast.show('获得1次翻牌机会');
this.data.leftCount++;
if ( StateServ.canPlayAgain() ) {
this.updateState();
}
this.$update();
}
this.data.shared = true;
},
shareAct:function(fromBtmShareBtn) {
var gift = this.data.lastGift;
window._dapush && window._dapush('_trackEvent', 'fanpai', 'share_app',fromBtmShareBtn?'home':'window', {userAccount:window.userId,userId:window.userId});
ShareServ.share(gift, function() {
this.updateLeftCount();
}._$bind(this));
}
});
App.directive('cardIndex', function(ele, value) {
var index = this.$get(value) || 0;
if ( index < 4 ) {
_e._$addClassName(ele, 'card-'+ (index + 1));
} else if ( index > 4 ) {
_e._$addClassName(ele, 'card-'+ index);
}
});
return App;
},4,3,23,219,25,74,220,221,222,223,224,225,226,227);
I$(241,function (_k, _t , _ut,_v,_e, _, Slider, _q, request, toast, gotop, Nav, navtab, lazy, appbridge, login, _p,_o,_f,_r,_pro) {
_p._$$Tpl = _k._$klass();
_pro = _p._$$Tpl._$extend(_t._$$EventTarget);
_pro.__init = function(_options) {
this.__supInit(_options);
this.__setLazyload();
// tab初始化
this.__tabs = _q('.js-navbox');
this.__tabs._$forEach(function(_node, index){
navtab._$allocate({tabbar: _node});
}._$bind(this));
// 我的收藏按钮
this.__myFavorite = _e._$get('myFavorites');
this.__setAdImgOfItemBlock();
this.__setBrandDescToggle();
this.__appbridge = appbridge();
this.__appbridge._$addEvent('ondefaultMenuShareResult', function(res){
alert('defaultMenuShareResult:'+JSON.stringify(res));
});
this.__appbridge._$addEvent('ondefaultMenuShareChannel', function(res){
alert('defaultMenuShareChannel:'+JSON.stringify(res));
});
this.__addEvent();
setTimeout(function(){
this.__removeParamFromCouponUrl();
//存在全局导航时，屏蔽返回顶部
if (window.__kaolaNavEnt && window.__kaolaNavEnt.length) {
var actnav = new Nav({data: {rawList: __kaolaNavEnt}});
actnav.$inject(document.body);
}else{
//go top 初始化
gotop._$create(document.body);
}
// 初始化图片轮播
this.__slides = _q('.m-slide');
this.__slides._$forEach(function(_node, _index){
var dots = _node.parentNode.querySelectorAll('.imgpagebox li');
Slider._$allocate({
box: _node,
loop: true,
auto: true,
width: document.body.clientWidth,
scrollTime: 300,
slideInterval: 3000,
callback: function(idx){
for (var i = dots.length - 1; i >= 0; i--) {
if (dots[i].className === 'active' && i!==idx){
dots[i].className='';
}
if (dots[i].className !== 'active' && i===idx){
dots[i].className='active';
}
};
}
});
});
//初始化品牌墙轮播， 多于一屏幕的才初始化
this.__brandWalls = _q('.m-brand-wall .slide-scroll');
this.__brandWalls._$forEach(function(_node, _index){
var dots = _node.parentNode.querySelectorAll('.imgpagebox li');
Slider._$allocate({
box: _node,
loop: false,
auto: false,
width: document.body.clientWidth,
scrollTime: 300,
// slideInterval: 3000,
callback: function(idx){
for (var i = dots.length - 1; i >= 0; i--) {
if (dots[i].className === 'active' && i!==idx){
dots[i].className='';
}
if (dots[i].className !== 'active' && i===idx){
dots[i].className='active';
}
};
}
});
});
}._$bind(this), 300);
};
_pro.__addEvent = function(){
//屏幕旋转后，重新计算图片高度
var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange  ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function(evt){
setTimeout(function(){
this.__setAdImgOfItemBlock();
}._$bind(this), 200);
}._$bind(this));
// 页面事件代理
_v._$addEvent('box','click',this.__onBoxClick._$bind(this));
var opblks = _q('.m-qa-select,.m-qa-pk');
opblks._$on('click', 'dd,.btn', this.__onPollOptClick);
_q('.m-share .icon')._$on('click', this.__onShareBtnClick._$bind(this));
_q('.j-sendCard img')._$on('click', this.__onWarmCardShareBtnClick._$bind(this));//暖心卡“发送贺卡”
_q('button#login')._$on('click', this.__loginTestBtnClick._$bind(this));//暖心卡“发送贺卡”
_q('button#submitorder')._$on('click', this.__submitTestBtnClick._$bind(this));//暖心卡“发送贺卡”
_q('button#closewebview')._$on('click', this.__closeWebviewClick._$bind(this));//暖心卡“发送贺卡”
_q('button#shareopt')._$on('click', this.__shareOptClick._$bind(this));//暖心卡“发送贺卡”
};
_pro.__onBoxClick = function(_event){
var _target = _v._$getElement(_event);
var gid,msg;
gid = _e._$dataset(_target,'gid');
if(_e._$hasClassName(_target,'js-favor') && !_e._$hasClassName(_target,'z-favored')){
if(!isLogin){
location.href='/login.html?target='+encodeURIComponent(location.href);
} else{
this.__doFavorite({goodsId:gid},_target);
}
}
};
_pro.__doFavorite = function(obj,node){
var self=this;
obj = obj || {};
obj.status = 1;
request('/activity/h5/goods/favor.html',{
data:obj,
method:'POST',
type:'json',
norest:true,
onload:function(_json){
// 未登录提示
if(_json.retcode==461){
alert('没有登陆成功');
return;
}
// 491：已收藏过
if(_json.retcode==200 || _json.retcode==491){
alert('已经用收藏功能确认登陆好了');
}else{
toast.show({message:_json.retdesc || '请求出错，请稍后再试！',singleMsg:true});
}
},
onerror:function(err){
toast.show({message:err || '请求出错，请稍后再试！',singleMsg:true});
}
});
};
// 收藏+1
_pro._$plus = function(){
_e._$addClassName(this.__myFavorite,'z-plus');
setTimeout(function(){
_e._$addClassName(this.__myFavorite,'z-hide');
_e._$delClassName(this.__myFavorite,'z-plus');
setTimeout(function(){
_e._$delClassName(this.__myFavorite,'z-hide');
}._$bind(this),1500);
}._$bind(this),1500);
};
_pro.__setLazyload = function(){
function classReg(cls){
return new RegExp( '(\\s|^)'+ cls +'(\\s|$)' );
}
var reg = classReg('m-img-block-loading'),
regPar = classReg('m-block'),
itemImgReg = classReg('u-item-img'),
noLazy = classReg('j-ignorlazy');
function findParent(node){
var _node = node;
while(_node && _node.tagName.toLowerCase()!='body'){
if (regPar.test(_node.className)){
return _node;
}
_node = _node.parentNode;
}
return null;
}
function onimgload(evt){
var par = findParent( evt.target );
if (par && reg.test(par.className) ) {
par.className = par.className.replace(reg, ' ');
};
evt.target.onload = evt.target.onerror = null;
}
lazy._$$LazyImg._$allocate({
attr:'src',
tolerance: 5,
preloadDist:'auto',
fadeIn: true,
container: document.querySelector('#box'),
onremove: function(evt){
evt.stopped = true;
},
oncheck:function(event){
if(noLazy.test(event.target)){
event.value =2;
}
},
onappend: function(evt){
if ( itemImgReg.test(evt.target.className) ) { return; };
evt.target.onload = evt.target.onerror = onimgload;
}
});
};
_pro.__removeParamFromCouponUrl = function(){
var list = document.querySelectorAll('a[href^="http://www.kaola.com/app/coupon/"]'),
url, cReg = /https?:\/\/(www|m)\.kaola\.com\/app\/coupon\/[^\/]+\.html\?/,
tmp;
if (list && list.length) {
for (var i = list.length - 1; i >= 0; i--) {
tmp = null;
url = list[i].getAttribute('href');
if (cReg.test(url)) {
tmp = url.split('?');
if (tmp && tmp.length) {
list[i].setAttribute('href', tmp[0]);
};
};
};
};
};
//设置一排二商品区块中图片区块的高度
_pro.__setAdImgOfItemBlock = function(){
var itemBlocks = document.querySelectorAll('.m-avg2item-lst');
Array.prototype.forEach.call(itemBlocks, function(item){
var it = item.querySelector('.m-2avg-item'),
ads = item.querySelectorAll('.m-2avg-img .ad'),
h,i,allPics;
if (it) {
if (ads && ads.length) {
h=it.getBoundingClientRect().height;
}
}else{
if (ads && ads.length) {
// 如果全部都是图片，那就按图片区显示, 现在应该不存在这种情况
h= ads[0].getBoundingClientRect().width * (parseFloat(ads[0].getAttribute('data-imgh'))||0)/(parseFloat(ads[0].getAttribute('data-imgw'))||1);
allPics = true;
}
}
for (i = 0; i < ads.length; i++) {
if (allPics) {
ads[i].parentNode.style.height = h+'px';
}
ads[i].parentNode.style.height = h+'px';
}
});
};
/**
* 设定品牌头图区域描述文字的是否需要显示折叠展开按钮
* 文字超出两行时才显示按钮
* @return {void} 无返回
*/
_pro.__setBrandDescToggle = function(){
var brandDescs = document.querySelectorAll('.m-brand-head .descwrap');
if (!brandDescs || !brandDescs.length) { return; };
var currDesc, openReg = new RegExp( '(\\s|^)'+ 'open' +'(\\s|$)' ),
foldReg = new RegExp( '(\\s|^)'+ 'fold' +'(\\s|$)' );
function brandDescTg(e){
if (openReg.test(this.className)) {
this.className = this.className.replace('open', 'fold');
}else if(foldReg.test(this.className)){
this.className = this.className.replace('fold', 'open');
}
}
for (var i = brandDescs.length - 1; i >= 0; i--) {
currDesc = brandDescs[i].querySelector('.desc');
if (currDesc.clientHeight < currDesc.scrollHeight) {
brandDescs[i].className += ' open';
brandDescs[i].addEventListener('click',brandDescTg);
}
};
};
_pro.__onShareBtnClick = function(evt){
// 低于1.4的弹出升级提示
if (_.isOldApp(12,10400)) {
toast.show('您的App版本太低，赶快升级吧');
}else if(!!window.WeixinJSBridge){
WeixinJSBridge.invoke('shareKaolaAppMessage', window.shareConfig||null, function(res) {
if(res.share_result){
// 分享成功执行代码
}else{
// 分享失败执行代码
}
});
}
};
_pro.__onWarmCardShareBtnClick = function(evt){
// 低于1.4的弹出升级提示
if (_.isOldApp(12,10400)) {
toast.show('您的App版本太低，赶快升级吧');
}else if(!!window.WeixinJSBridge){
var shareConfig = _.extend({}, window.shareConfig),
warmcardUrl = evt.target.parentNode.getAttribute('data-warmcard');
shareConfig.imgOnlyUrlList = [warmcardUrl];
WeixinJSBridge.invoke('shareKaolaAppMessage', shareConfig, function(res) {
});
}
};
_pro.__onPollOptClick = function(evt){
var opt = _q(this),
blk=opt._$parent('.m-qa-pk, .m-qa-select', true),
locateId = blk._$parent('.m-block',true)._$attr('data-block'),
optIdx=opt._$attr('data-idx'),
pollnodes, totalpoll=0, pollCount=0,
pollType= blk._$hasClassName('m-qa-pk')?'pk':'poll',
pollAction = pollType==='pk'?'支持':'投票';
if (blk._$hasClassName('selected') || blk._$hasClassName('js-working')) { return; }
//控制三秒内只能点击一次
blk._$addClassName('js-working');
setTimeout(function(){
blk._$delClassName('js-working');
}, 3000);
toast.show(pollAction+'成功！');
pageUpdate();  //默认投票成功， 失败后也不恢复票数，刷新后才恢复
request('/activity/h5/poll.html', {
data:{
pollKey: __klActivityShowId+'_'+locateId,
optionIndex: optIdx
},
method: 'POST',
norest: true,
type: 'json',
onload: function(dt){
if (dt && dt.code==200) {
//成功
}else{
toast.clear();
setTimeout(function(){
toast.show('网络连接错误');
}, 1000);
}
},
onerror: function(dt){
// toast.show(pollAction+'失败,' + (dt && dt.msg)||' 请重试');
toast.clear();
setTimeout(function(){
toast.show('网络连接错误');
}, 1000);
}
});
function pageUpdate(){
blk._$addClassName('selected');
opt._$addClassName('my');
if (blk._$hasClassName('m-qa-pk')) {
blk._$addClassName('selected-'+(optIdx==='0'?'l':'r'));
//还需要更新数量
var rpoll = 0;
pollnodes = blk._$children('.text .num',true);
pollnodes._$forEach(function(node, idx){
var poll = parseFloat(node.getAttribute('data-poll'))||0;
if (node.getAttribute('data-idx')===optIdx) {
poll++;
node.innerText = poll;
node.setAttribute('data-poll', poll);
}
totalpoll+= poll;
if (idx===1) {
rpoll = poll;
}
});
setTimeout(function(){
blk._$children('.bar i', true)
._$style('width', Math.round((rpoll/totalpoll)*1000)/10 + '%' );
}, 20);
}else if(blk._$hasClassName('m-qa-select')){
//需要重新计算百分比
pollnodes = blk._$children('dd', true);
pollnodes._$forEach(function(node,idx){
var poll = parseFloat(node.getAttribute('data-poll'))||0;
if (node.getAttribute('data-idx')===optIdx) {
poll++;
node.setAttribute('data-poll', poll);
}
totalpoll+= poll;
pollCount += (poll<=0? 0:1);
});
var accuPct = 0;
setTimeout(function(){
pollnodes._$forEach(function(node, idx){
var poll = parseFloat(node.getAttribute('data-poll'))||0,
percent = 0;
if (poll>0) {
pollCount--;
if (pollCount===0) {
percent = 100 - accuPct;
}else{
percent = Math.floor(poll*100/totalpoll);
accuPct += percent;
}
}
node.querySelector('.rect').style.width = percent+'%';
node.querySelector('.ct').innerText = percent+'%';
});
}, 20);
blk[0].querySelector('.count b').innerText = totalpoll;
}
}
};
_pro.__loginTestBtnClick = function(evt){
evt.preventDefault();
var self = this;
var bridge = this.__appbridge;
login.toLogin('', function(ok, profile){
alert('logged status:' + ok);
if (profile && profile.account) {
document.querySelector('#username').value = profile.account;
};
if (ok) {
//如果ok，则尝试去收藏一个商品
self.__doFavorite({goodsId: 5021}, null);
}
});
};
_pro.__submitTestBtnClick = function(evt){
evt.preventDefault();
var bridge = this.__appbridge;
var info = {
goods:[{
goodsId: parseFloat(document.querySelector('#goodsId').value)||0,
innerSource: "DETAIL",
selected: '1',
skuId: document.querySelector('#skuId').value,
tempBuyAmount: parseFloat(document.querySelector('#qty').value)||0,
tempCurrentPrice: parseFloat(document.querySelector('#price').value)||0,
tempGoodsActivityType: null
}],
type: '',
s:'2'
};
bridge._$openOrderConfirm(info, function(res){
alert('pay_result: '+ (res.pay_result ? '支付成功': '支付失败或取消'));
});
};
_pro.__closeWebviewClick = function(evt){
evt.preventDefault();
var bridge = this.__appbridge;
bridge._$closeWebviewWindow();
};
_pro.__shareOptClick = function(evt){
evt.preventDefault();
var bridge = this.__appbridge;
var opt = parseInt(document.querySelector('#shareselect').value, 10),
optUrl = document.querySelector('#shareurl').value;
var shareConfig = {
img_url: "http://haitao.nosdn2.127.net/ii8mxeca52_800_800.jpg?imageView&thumbnail=400x0&quality=85",
link: optUrl,
desc: "分享测试，看看点击了哪个分享渠道",
title: document.title,
wbpost: "分享测试，看看点击了哪个分享渠道 " +" @网易考拉海购"
};
if (opt ===1) {
var rnd = Math.floor(Math.random()*2);
// shareConfig.share_type = (rnd==1) ? 1 : null;
shareConfig.imgOnlyUrlList = ['http://haitao.nosdn2.127.net/ii8mxeca52_800_800.jpg','http://haitao.nosdn4.127.net/testief1495s10001.jpg'];
}else if(opt===2){
shareConfig.share_type = 2;
shareConfig.imgOnlyUrlList = ['http://haitao.nosdn4.127.net/testief1495s10001.jpg'];
shareConfig.share_textlist = ['图+二维码模板1 的第一行文字','图+二维码模板1 的第二行文字，的第二行文字3，的第二行文字4，的第二行文字5'];
}else if(opt===3){
shareConfig.share_type = 3;
shareConfig.imgOnlyUrlList = ['http://haitao.nos.netease.com/testi5hkl6gf10007.jpg'];
shareConfig.share_textlist = ['图+二维码模板2 的第一行文字','图+二维码模板2 的第二行文字，的第二行文字3，的第二行文字4，的第二行文字5'];
}
bridge._$openShare(shareConfig, function(res){
alert('分享结果回调：'+ JSON.stringify(res));
}, function(res){
alert('分享渠道选择回调：' + JSON.stringify(res));
});
};
return _p;
},1,20,2,3,4,74,115,87,68,25,116,117,118,120,28,121);
I$(248,"<div class=\"m-wmodal\"> \t<p class=\"result\">{{text}}</p> \t<a class=\"u-wbtn\" on-click={{this.confirm()}}>{{btntext}}</a> \t{{#if !!sharebtn}} \t<a class=\"u-wsharebtn\" on-click={{this.share()}}>{{sharebtn}}</a> \t{{/if}} \t<div on-click={{this.hide()}} class=\"u-wclose\"></div> </div>");
I$(245,function (_, _e, _v, tpl, Modal, p){
var OKModal = Modal.extend({
content: tpl,
config: function(data){
_.extend(data, {
text: data.text || '哎呀，慢了一步，这个新年礼被抢了！请重新收礼',
btntext: data.okbtn || '我知道了'
});
},
init: function(){
this.supr();
},
confirm: function(){
this.$emit('confirm', this.data);
this.destroy();
},
share: function(){
this.$emit('share', this.data);
this.destroy();
}
});
return OKModal;
},74,4,3,248,202);
I$(247,"<div class=\"m-sharemodal f-tac\" on-click={{this.hide()}}> \t<img class=\"u-wimg\"{{#if !!imgWidth}} width=\"{{imgWidth}}\"{{/if}} src=\"{{imgUrl||'http://haitao.nos.netease.com/23ef418845c64f36bebfee6d8d8425a1.png'}}\"> </div>");
I$(244,function (_, _e, _v, tpl, Modal, p){
var ShareModal = Modal.extend({
content: tpl,
config: function(data){
_.extend(data, {
winbodyClass: 'winbodytop',
// imgUrl：顶部透明分享图，如果不传显示默认的分享图片
imgUrl: data.imgUrl || 'http://haitao.nos.netease.com/23ef418845c64f36bebfee6d8d8425a1.png'
});
},
init: function(){
this.supr();
}
});
return ShareModal;
},74,4,3,247,202);
I$(262,function (_k,_e,_u,_t,tm,_p,_o,_f,_r,pro) {
_p._$$SeckillWidget = _k._$klass();
pro = _p._$$SeckillWidget._$extend(_t._$$EventTarget);
pro.__reset = function(_options){
this.__super(_options);
this.__options = _options||{};
this.__dateTabs = _e._$getChildren(_options.dateTabWrap);
this.__timeTabs = _e._$getChildren(_options.timeTabWrap);
this.__listWrap = _options.listWrap;
this.__noScroll = true;
this.__currDateIndex = _options.currDateIndex;
this.__currTimeIndex = _options.currTimeIndex;
this.__doTabClick(this.__dateTabs,0);
this.__doTabClick(this.__timeTabs,1);
this.__onTabChange(_options.currDateIndex,_options.currTimeIndex);
if(_options.currDateIndex > 0){
this._$dispatchEvent('onTabChange',_options.currDateIndex);
}
this.__doInitDomEvent([[this.__listWrap.parentNode,'touchstart',this.__onListScroll._$bind(this)]]);
};
pro.__doTabClick = function(_list,_type){
var _doEvent = function(_item,_index){
if(!_item) return;
var _handler = function(){
this.__cbTabClick(_index,_type);
}._$bind(this);
this.__doInitDomEvent([[_item,'touchstart',_handler]]);
}
_u._$forEach(_list,_doEvent,this);
};
pro.__cbTabClick = function(_index,_type){
this.__noScroll = true;
if(_type == 1){  //选择时间tab
if(_index == this.__currTimeIndex) return;
this.__onTabChange(this.__currDateIndex||0,_index);
}else{  //选择日期tab
if(_index == this.__currDateIndex) return;
if(_index == this.__options.currDateIndex){ //如果是当天有正在进行的秒杀，则定位到指定的时间场次
this.__onTabChange(_index,this.__options.currTimeIndex);
}else{
this.__onTabChange(_index,0);
}
this._$dispatchEvent('onTabChange',_index);
}
};
pro.__onTabChange = function(_dateIndex,_timeIndex){
var _currDateClassName = this.__options.currDateClassName,
_currTimeClassName = this.__options.currTimeClassName;
_e._$delClassName(this.__dateTabs[this.__currDateIndex],_currDateClassName);
_e._$delClassName(this.__timeTabs[this.__currTimeIndex],_currTimeClassName);
_e._$addClassName(this.__dateTabs[_dateIndex],_currDateClassName);
_e._$addClassName(this.__timeTabs[_timeIndex],_currTimeClassName);
this.__currDateIndex = _dateIndex;
this.__currTimeIndex = _timeIndex;
if(!!this.__noScroll) this.__onSwitchList(_dateIndex,_timeIndex);
};
pro.__onSwitchList = function(_dateIndex,_timeIndex){
var _list = _e._$getChildren(this.__listWrap),
_items = _e._$getByClassName(_list[_dateIndex],'m-avg2item-lst'),
_newScrollLeft = _items[_timeIndex].offsetLeft;
this.__doSwitchList(_newScrollLeft,true);
};
pro.__doSwitchList = function(_newScrollLeft,_animation){
var _fromLeft = this.__newScrollLeft||0;
if(_fromLeft == _newScrollLeft){
this.__noScroll = false;
return;
}
if(!!_animation){
var _easeout = tm._$$Timing._$allocate({
timing: 'linear',
from: {
offset: _fromLeft
},
to: {
offset: _newScrollLeft
},
duration: 300,
onupdate: function(_event) {
this.__listWrap.parentNode.scrollLeft = _event.offset;
}._$bind(this),
onstop: function() {
_easeout._$recycle();
}
});
_easeout._$play();
this.__newScrollLeft = _newScrollLeft;
setTimeout(function(){
this.__noScroll = false;
}._$bind(this),400)
}
};
pro.__onListScroll = function(){
if(!!this.__noScroll) return;
var _node = this.__listWrap.parentNode,
_scrollLeft = _node.scrollLeft,
_count = Math.ceil(_scrollLeft/this.__options.itemWidth),  //根据商品的个数算出对应的日期和时间的索引值
_dateIndex = Math.floor(_count/9),
_timeIndex = Math.floor(_count%9/3);
this.__onTabChange(_dateIndex,_timeIndex);
this._$dispatchEvent('onTabChange',_dateIndex);
};
pro.__destory = function(){
};
return _p;
},1,4,2,20,124);
I$(275,"<div class=\"m-wordgift-modal {{class}}\"> \t{{#if isAllText}} \t\t<div class=\"m-modal-rule\" r-html={{content}}></div> \t{{#else}} \t\t{{#if couponUrl}} \t\t<p class=\"u-modal-img\"> \t\t\t<img class=\"u-coupon-img\" src=\"{{couponUrl}}\" alt=\"\"> \t\t\t<img class=\"u-star\" src=\"{{starurl}}\" alt=\"\"> \t\t</p> \t\t{{/if}} \t\t<div class=\"m-text-box\"> \t\t\t{{#if title}} \t\t\t\t<h3 class=\"u-modal-title\">{{title}}</h3> \t\t\t{{/if}} \t\t\t{{#if text}} \t\t\t\t<p class=\"u-modal-text\">{{text}}</p> \t\t\t{{/if}} \t\t\t{{#if word}} \t\t\t\t<div class=\"m-star-img-word\"> \t\t\t\t\t<span class=\"u-box-wrap\"> \t\t\t\t\t\t <span class=\"u-star-box\"> \t\t\t\t\t\t\t<img class=\"u-star\" src=\"{{starurl}}\" alt=\"\"> \t\t\t\t\t\t </span> \t\t\t\t\t</span> \t\t\t\t\t<p class=\"u-star-word\"> \t\t\t\t\t\t<span>我的口令：</span> \t\t\t\t\t\t<span class=\"u-word\">{{word}}</span> \t\t\t\t\t</p> \t\t\t\t</div> \t\t\t{{/if}} \t\t\t{{#if btntext}} \t\t\t\t<p class=\"u-modal-btn\"> \t\t\t\t\t<a class=\"u-wordgift-btn\" href=\"javascript:;\" on-click={{this.confirm()}}>{{btntext}}</a> \t\t\t\t</p> \t\t\t{{/if}} \t\t\t{{#if orText && orbtntext}} \t\t\t\t<div class=\"m-modal-or\"> \t\t\t\t\t<p class=\"u-or-line\"><span>or</span></p> \t\t\t\t\t{{#if orText}} \t\t\t\t\t<p class=\"u-or-text\">{{orText}}</p> \t\t\t\t\t{{/if}} \t\t\t\t\t{{#if orbtntext}} \t\t\t\t\t<p class=\"u-or-btn\"> \t\t\t\t\t\t<a  class=\"u-wordgift-btn\" href=\"javascript:;\" on-click={{this.orconfirm()}}>{{orbtntext}}</a> \t\t\t\t\t</p> \t\t\t\t\t{{/if}} \t\t\t\t</div> \t\t\t{{/if}} \t\t</div> \t{{/if}} \t<a class=\"u-close-btn\" href=\"javascript:;\" on-click={{this.hide()}}></a> </div>");
I$(273,function (_, _e, _v, tpl, Modal, p){
var Modal = Modal.extend({
content: tpl,
config: function(data){
_.extend(data, {
isAllText: false,
content: '',
text: '',
btntext: '',
title: '',
couponUrl: '',
starurl: '',
orText: '',
orbtntext: '',
class: ''
});
},
init: function(){
this.supr();
},
confirm: function(){
this.$emit('confirm', this.data);
this.destroy();
},
orconfirm: function(){
this.$emit('orconfirm', this.data);
this.destroy();
}
});
return Modal;
},74,4,3,275,202);
I$(274,"<h3>活动规则</h3> <ol> \t<li>1、用户在微博获取明星口令，从APP入口进入兑换口令落地页，输入口令，即可获得优惠券。</li> \t<li>2、每个账号只可以兑换一次口令红包，兑换成功后优惠券将由系统自动发放到【我的考拉-我的优惠券】。</li> \t<li>3、用户如果无明星口令，可以通过分享活动赚取明星口令，用户分享成功，返回APP，会随机获得一个明星口令。</li> \t<li>4、用户可以多次分享明星红包，分享成功后每次随机分配一个明星口令，但每个账户一共只能兑换一个红包。</li> </ol>");
I$(271,function (_k, _ut, _v, _e, _, Module, toast, request, _t, lz, Modal, getshare, commonModal, gotop, ruleTpl,  _p, _o, _f, _r, _pro) {
var pro;
_p._$$Module = _k._$klass();
pro = _p._$$Module._$extend(Module);
pro.__init = function (_options) {
this.__super(_options);
this.__lazyImageInit();
this._share = getshare();
this._share._$openShare(this.__getShareData({name: this.__getDefaultStar()}));
gotop._$create(document.body);
};
pro.__getDefaultStar = function(){
try{
return starName;
}catch(e){
return '陈学冬'
}
};
pro.__onExchangeBtnClick = function (type) {
var word = this.J_word_input.value.trim();
if(!word){
toast.show('请先输入口令~');
return;
}
var data = {
word: word
};
if(type == 'wx'){
data.star = this.J_star_input.value;
}
request('/wordGift/exchange.html', {
method: 'post',
data: data,
norest: true,
onload: function (json) {
if(json){
//成功
if (json.code == 0) {
this.__getGiftSuccessModal(json.body, type);
//密令不正确
}else if(json.code == -929){
toast.show('请输入正确的口令~');
//未登录
}else if(json.code == -925){
location.href = '/login.html?target='+encodeURIComponent(location.href.replace(location.hash, ''));
//领过了
}else if(json.code == -927){
this.__alert( '只能领取一个明星红包哦~');
//抢完了
}else if(json.code == -928){
this.__alert('慢了一步，' + (json.body.wordGift.name || 'YY') + '的红包都被抢完啦~~');
}else{
toast.show('兑换失败！');
}
}else{
toast.show('兑换失败！');
}
}._$bind(this),
onerror: function () {
toast.show('兑换失败！');
}
});
};
pro.__getGiftSuccessModal = function(data, type){
var self = this, tplData = {},
confirm = function(){},
orconfirm = function(){},
wordGift = data.wordGift;
var imgurl = {
"10": 'http://haitao.nos.netease.com/78d560c11aa842f2bb3b45ec0182ca27.png',
"15": 'http://haitao.nos.netease.com/e7fa3432061f4ce8ae24efb1308bf990.png'
};
if(type == 'app'){
tplData = {
text: '赶紧分享明星口令造福好友吧！',
btntext: '立即分享',
title: '恭喜获得'+ wordGift.name +'的红包',
couponUrl: imgurl[wordGift.couponAmount],
starurl: wordGift.imageUrl + '?imageView&thumbnail=150x150',
orText: '拿了红包好兴奋，要先去考拉买买买！',
orbtntext: '先去考拉买买买'
};
confirm = function(modal){
var ShareData = self.__getShareData(wordGift);
if(self.__isNoAPPwx()){
return;
}
self.__APP2weixinShare(ShareData);
};
orconfirm = function(modal){
location.href = desUrl;
}
}else if(type == 'wx'){
tplData = {
text: '红包将放入您登录的考拉账户' + data.account + '中',
btntext: '先去考拉买买买',
title: '骚年好手法 点中个大红包',
couponUrl: imgurl[wordGift.couponAmount],
starurl: wordGift.imageUrl + '?imageView&thumbnail=150x150',
orText: '好福利不独享，立即告诉朋友们！',
orbtntext: '分享给好友'
};
confirm = function(modal){
location.href = desUrl;
};
orconfirm = function(modal){
if(self.__isNoAPPwx()){
return;
}
modal.hide();
self.__onWxShare(wordGift);
};
}
var modal = this.__modal(tplData);
modal.$on('confirm', function(){
confirm(modal);
});
modal.$on('orconfirm', function(){
orconfirm(modal);
});
};
pro.__onRuleBtnClick = function () {
var data = {
isAllText: true,
content: ruleTpl
};
this.__modal(data);
};
pro.__isNoAPPwx = function(){
if(!this.__isInWeixin() && !_.isKaolaApp()){
toast.show('请在微信或考拉APP内分享');
return true;
}
return false;
};
pro.__onShareNow = function () {
if(this.__isNoAPPwx()){
return;
}
var self = this;
var data = {};
request('/wordGift/share.html', {
method: 'get',
onload: function (json) {
if(json && json.code == 0){
var wordGift = json.body.wordGift;
if(_.isKaolaApp()){
this.__APP2weixinShare(this.__getShareData(wordGift), function(){
self.__shareSuccessModal(wordGift, function(){
self.J_word_input.value = wordGift.word;
setTimeout(function(){
document.body.scrollTop = 0;
}, 100);
});
});
}else{
this.__onWxShare(wordGift);
}
}else{
toast.show('请重新���享！');
}
}._$bind(this),
onerror: function () {
toast.show('请检查网络！');
}
});
};
pro.__APP2weixinShare = function (shareData, shareSuccessCallback) {
shareData = shareData || {};
// 低于1.4的弹出升级提示
if (_.isOldApp(12,10400)) {
toast.show('您的App版本太低，赶快升级吧');
}else if(!!window.WeixinJSBridge){
WeixinJSBridge.invoke('shareKaolaAppMessage', shareData, function(res) {
if(res.share_result){
//  ios 的兼容
if(res.share_result === 'false'){
}
typeof shareSuccessCallback == 'function' && shareSuccessCallback(res);
}else{
}
});
}else{
}
};
pro.__isInWeixin = function(){
return navigator.userAgent.match(/MicroMessenger/i);
};
pro.__onWxShare = function(data){
if(this.__isInWeixin()){
this.__sharelead();
this._share._$openShare(this.__getShareData(data));
}
};
pro.__getShareData = function(data){
var shareImg = 'http://haitao.nos.netease.com/5df72d1bbad1408ebf242c7bbfc95202.jpg',
shareLink = location.origin + '/wordGift.html?star=' + encodeURI(encodeURI(data.name)),
shareTitle = '网易考拉海购 – 明星口令红包限时抢',
shareContent = '天了噜，'+data.name+'居然给我发压岁钱了！（内附抢红包攻略）快来试试吧！';
return {
img_url: shareImg,
link: shareLink,
desc: shareContent,
title: shareTitle,
wbpost: shareContent + '>' + shareLink +   '@网易考拉海购'
}
};
pro.__alert = function(title, text){
var data  = {
title: title || '',
text: text || '更多活动进行中~赶紧去买买买',
btntext: '先去买买买',
class: 'm-alert'
};
var alert = this.__modal(data);
alert.$on('confirm', function(){
location.href = desUrl;
});
};
pro.__modal = function(data){
var modal = new Modal({
data: data
});
modal.$inject(document.body);
return modal;
};
pro.__shareSuccessModal = function(json, callback){
var data  = {
title: '分享成功',
text: json.name + '叫你回家换红包啦！ ',
btntext: '立即兑换',
word: json.word,
starurl: json.imageUrl,
class: 'm-share-success'
};
var modal = this.__modal(data);
modal.$on('confirm', function(){
typeof callback == "function" && callback();
});
};
pro.__sharelead = function(){
var html = '<div ref="box" class="m-layermsk">' +
'<img style="margin-top: 36px;" class="f-w100p" src="http://haitao.nos.netease.com/9d36e13e1d4b4b5981d37e3ed2b95310.png" alt="">' +
'</div>';
var CommonModal = new commonModal({template:html});
_v._$addEvent(CommonModal.$refs.box, 'click', function(){
CommonModal.hide();
});
CommonModal.$inject(document.body);
return CommonModal;
};
pro.__lazyImageInit = function(){
lz._$$LazyImage._$allocate({
attr:'src',
oncheck: function(evt){
var target = evt.target;
var lzsrc = target.getAttribute('data-src');
if ( !lzsrc ) {
evt.value = 0;  //没有lazyload属性的不处理
return;
}
var src = target.getAttribute('src');
if (!src || src!==lzsrc) {
evt.value = 1; //lazyload 还没有处理过，需处理
_e._$addClassName(target, 'f-w100p');
}else{
evt.value = 0;
}
},
onremove:function(event){
event.stopped = true;
}
});
};
return _p._$$Module;
},1,2,3,4,74,5,25,68,135,70,273,227,202,116,274);
I$(163,"{{#if total > 1}}<ul class=\"m-pagination f-cb\" r-hide=\"!total\"><li on-click={{ this.nav(current-1)}} class='pageprv {{current==1? \"disabled\": \"\"}}'><a  href='#' >上一页</a></li>{{#if total - 5 > show * 2}} <li  on-click={{ this.nav(1)}} class={{current==1? 'active': ''}}><a href=\"#\">1</a></li><li>{{#if begin > 2}}<a>...</a>{{/if}}</li>{{#list begin..end as i}}<li on-click={{ this.nav(i)}} class={{current==i? 'active': ''}}><a href=\"#\">{{i}}</a></li> {{/list}}{{#if (end < total-1)}}<li><a>...</a></li> {{/if}}<li on-click={{ this.nav(total)}} class={{current==total? 'active': ''}}><a href=\"#\">{{total}}</a></li> {{#else}}{{#list 1..total as i}} <li on-click={{ this.nav(i)}} class={{current==i? 'active': ''}}><a href=\"#\">{{i}}</a></li> {{/list}}{{/if}}<li on-click={{ this.nav(current + 1)}} class='pagenxt {{current==total? \"disabled\": \"\"}}'><a  href='#' >下一页</a></li></ul>{{/if}}  ");
I$(162,function (tpl, BaseComponent){
// <pager total=3 current=1></pager>
var Pager = BaseComponent.extend({
name: "pager",
template: tpl,
// is called before compile. 一般用来处理数据
config: function(data){
var count =  5;
var show = data.show = Math.floor( count/2 );
data.current = parseInt(data.current || 1);
data.total = parseInt(data.total || 1);
this.$watch(['current', 'total'], function( current, total ){
data.begin = current - show;
data.end = current + show;
if(data.begin < 2) data.begin = 2;
if(data.end > data.total-1) data.end = data.total-1;
if(current-data.begin <= 1) data.end = data.end + show + data.begin- current;
if(data.end - current <= 1) data.begin = data.begin-show-current+ data.end;
});
},
nav: function(page){
var data = this.data;
if(page < 1) return;
if(page > data.total) return;
if(page === data.current) return;
data.current = page;
this.$emit('nav', page);
}
});
return Pager;
},163,23);
I$(160,function (_,_ut, BaseComponent){
// ###data
//  - pager
//    * total: 列表总数
//    * list : 列表数组
// ###example
// <div>
//  {{#list list as item}}
//
//  {{/item}}
// </div>
var ListComponent = BaseComponent.extend({
// 配置链接
// @子类必须提供
// dwr: {beanName:'xxx',method:'yyy'},
// 任意一个监听列表发生改变时，判断更新列表
// @子类修改
watchedAttr: ['current'],
config: function(data){
_.extend(data, {
total: 1,
current: 1,
limit: 10,
list: []
});
this.$watch(this.watchedAttr, function(){
if(this.shouldUpdateList()){
this.__getList();
}
})
},
init: function(){
//if(!this.url) throw 'ListModule未指定url';
// 需要自定义复杂的更新策略, $emit('updatelist')事件即可
this.$on('updatelist', this.__getList.bind(this));
},
// @子类修改
shouldUpdateList: function(data){
return true;
},
getExtraParam:function(){
return this.data.condition;
},
refresh:function(_data){
this.data.current = 1;
this.data.condition = _data;
this.$emit('updatelist');
},
getListParam: function(){
var data = this.data;
return _.extend({
limit: data.limit,
offset: data.limit * (data.current-1)
}, this.getExtraParam(data));
},
// update loading
__getList: function(){
var data = this.data;
var option = {
progress: true,
data: this.getListParam(),
onload: function(json){
var result = json.body,
list = result.list||[];
_.mergeList(list, data.list,data.key||'id')
data.total = result.total;
data.list = list;
},
onerror: function(json){
// @TODO: remove
}
};
this.$request(this.url,option)
}
})
return ListComponent;
},74,2,23,162);
I$(303,"<div class=\"list\" ref=\"list\"> \t{{#if !!title}} \t<h2 class=\"u-tit\"><i class=\"u-icn3\">&nbsp;</i>{{title}}</h2> \t{{/if}}  \t{{#if list.length>0}}   \t\t{{#list list as saleGoods}}   \t\t{{#if saleGoods.tuanGoods.isShow!=0}} \t\t<div class=\"m-onsale f-cb\"> \t\t    <a href=\"/product/{{saleGoods.tuanGoodsId}}.html\" title=\"{{saleGoods.tuanGoods.title}}\" class=\"{{saleGoods_index==0?'first':''}}\"> \t\t    \t<div class=\"pic\"> \t\t    \t\t<img src=\"{{_lazyload?null:saleGoods.imageUrl|thumbnail:200}}\" data-src=\"{{!_lazyload?null:saleGoods.imageUrl|thumbnail:200}}\" alt=\"{{saleGoods.tuanGoods.title}}\" title=\"{{saleGoods.tuanGoods.title}}\"/> \t\t    \t\t{{#if saleGoods.tuanGoods.actualStorageStatus==0}}<span class=\"u-slodout\">&nbsp;</span>{{/if}} \t\t    \t</div> \t\t\t\t<div class=\"proinfo\"> \t\t\t\t    <div class=\"u-brand\"> \t\t\t\t      \t<img src=\"{{saleGoods.tuanGoods.originCountryFlag}}\" width=\"15px\"/><span>{{saleGoods.tuanGoods.goodsSource}}</span> \t\t\t\t    </div> \t\t\t\t    <h3 class=\"tit\"><strong>{{saleGoods.tuanGoods.shortTitle}}</strong> {{saleGoods.tuanGoods.introduce}}</h3> \t\t\t\t    <p class=\"curprice\"><strong><span class=\"symbol\">¥</span><span r-html={{saleGoods.tuanGoods.actualCurrentPrice|fixed:2|formatPrice}}></span></strong>{{#if (saleGoods.tuanDiscount>0&&saleGoods.tuanDiscount<10)}}<span class=\"u-icn15\"><strong class=\"num\">{{saleGoods.tuanDiscount|fixed:1}}</strong>折</span>{{/if}}</p>  \t\t\t\t    <p class=\"marprice\">国内参考价：<span class=\"symbol\">¥</span><del>{{saleGoods.tuanGoods.marketPrice|fixed:2}}</del></p> \t\t\t\t</div> \t\t\t</a> \t\t</div> \t\t{{/if}}   \t\t{{/list}}   \t\t{{#if loading}}   \t\t\t<div class=\"m-loading f-tac\"><img src=\"/res/images/loading.gif\"/></div>   \t\t{{/if}}   \t{{#else}}   \t\t{{#if loading}}   \t\t<div class=\"m-loading f-tac\"><img src=\"/res/images/loading.gif\"/></div>   \t\t{{#else}}   \t\t<div class=\"m-emtpy f-tac\">    \t\t\t没有内容   \t\t</div>   \t\t{{/if}} \t{{/if}} </div> {{#if hasMore===false}} <div class=\"nomore-data\">已显示全部内容</div> {{/if}}");
I$(305,"<div class=\"m-notify m-notify-{{position}}\">   {{#list messages as msg}}   <div class=\"notify notify-{{msg.type||'info'}}\" r-animation='on: enter; class: animated fadeInX; on: leave; class: animated bounceOut fast; '>     <div class=\"glyphicon glyphicon-{{this.iconMap[msg.type]}}\"></div>     <span class=\"notify_close\" on-click={{this.clear(msg)}}>×</span>     <h4 class=\"notify_title\" r-hide={{!msg.title}}>{{msg.title}}</h4>     <p class=\"notify_message\">{{msg.message}}</p>   </div>   {{/list}} </div>");
I$(304,function (tpl, R, _ ){
var Notify = Regular.extend({
template: tpl,
//默认时间
duration: 3000,
// icon对应
iconMap: {
"error": "remove-circle",
"success": "ok-sign",
"warning": "warning-sign",
"info": "info-sign",
"loading": "info-sign",
},
config: function(data){
_.extend(data, {
messages: [],
position: 'right'
})
},
// 初始化后的函数
init: function(){
// 证明不是内嵌组件
if(this.$root == this) this.$inject(document.body);
},
/**
* 增加一个提醒，添加到队伍前方
* @param  {String|Object} message 消息或消息对象
*      -type: error, info ,warning, success, 默认为info
*      -title: 信息标题，默认为空
*      -message: notify的内容
*      -duration: 信息停留时间，-1 为无限. 默认2秒
* @return {Function}              不等待定时器，删除掉此提醒
*/
notify: function(message){
if(typeof message === "string"){
message = {
message: message
}
}
_.extend(message,{
type: 'info',
duration: this.duration
})
this.$update(function(data){
data.messages.unshift(message)
})
var clearFn = this.clear.bind(this, message);
this.$timeout(clearFn, message.duration==-1? 1000*3600 * 1000: message.duration );
return clearFn;
},
/**
* 与notify一致，但是会清理所有消息，用于唯一的消息提醒
* @param  {String|Object} message 消息或消息对象
* @return {Function}              不等待定时器，删除掉此提醒
*/
show: function(message){
this.clearTotal();
return this.notify(message);
},
/**
* 与notify一致，但是会清理所有消息，用于唯一的消息提醒
* @param  {String|Object} message 消息或消息对象
* @return {Function}              不等待定时器，删除掉此提醒
*/
showError: function(message,options){
options = _.extend(options||{}, {
type: 'error'
})
return this.show(message, options);
},
clear: function(message){
var messages = this.data.messages,
len = messages.length;
for( ;len--; ){
if(message === messages[len]) messages.splice(len, 1);
}
this.$update();
},
clearTotal: function(){
this.$update("messages", []);
}
// 使用timeout模块
}).use('timeout');
// 单例, 直接初始化
var notify = new Notify({});
notify.Notify = Notify;
return notify;
/**
* 使用:
*    notify.notify(msg) 开始进度条
*    notify.show(msg)   显示信息
*    notify.showError(msg) 显示错误 , show的简便接口
*/
},305,65,74);
I$(301,function (_u, _v, tpl, _, ListComponent, notify, config) {
var List = ListComponent.extend({
template: tpl,
url: '/home.html',
config: function(data) {
_.extend(data, {
total: 1,
current: 1,
scrollCurrent: 1,
limit: 20,
list: []
});
data.firstPageLoaded = !!data.list.length;
data._lazyload = !!data.lazyload || false;
this.$watch(this.watchedAttr, function() {
if (this.shouldUpdateList()) this.__getList();
});
_v._$addEvent(window, 'scroll', this.__onScrollCheck._$bind(this));
},
xdrOption: function() {
return {
method: "get"
};
},
__onScrollCheck: function() {
if (this.__loading) { return; };
var rect = this.$refs.list.getBoundingClientRect();
var offsetTop = rect.top + rect.height - window.innerHeight;
if (offsetTop <= 240 && !this.__loading && this.data.hasMore) {
// this.__loading = true;
// var data = this.data;
this.$update('loading', true);
this.data.current += 1;
this.$update();
// this.$request(this.url, {
//     query: this.getListParam(),
//     norest: true,
//     type: 'json',
//     onload: function(json) {
//         if (json && json.code===1) {
//             var result = json.body,
//                 list = result.globalPick.data;
//             [].push.apply(data.list, list);
//             this.__loading = false;
//             data.hasMore = result.hasMore;
//         }else{
//             //error  出错后不再重试加载
//         }
//         this.$update('loading', false);
//     }._$bind(this),
//     // test
//     onerror: function(json) {
//         this.$update('loading', false);
//     }
// });
}
},
init: function() {
this.supr();
if (this.data._lazyload) {
this.$on('$inject', function(){
_v._$dispatchEvent(window, 'scroll');
});
};
},
// update loading
__getList: function() {
var data = this.data;
this.__loading = true;
var option = {
query: this.getListParam(),
norest: true,
type: 'json',
onload: function(json) {
if (json && json.code===1 && json.body) {
var result = json.body,
list = result.globalPick.data;
[].push.apply(data.list, list);
this.__loading = false;
data.hasMore = result.hasMore;
}else{
//error  出错后不再重试加载
}
this.$update('loading', false);
}._$bind(this),
onerror: function(json) {
this.$update('loading', false);
}
};
this.$request(this.url, option);
},
shouldUpdateList : function(){
//如果首次给了数据，则首次初始化时不从服务器加载
if (this.data.firstPageLoaded) {
this.data.firstPageLoaded = false;
return false;
};
if (this.data.hasMore===false) { return false; };
return true;
}
});
List.filter('formatPrice', function(str){
if (!str) { return str; };
var parts = str.split('.');
if (parts.length==2) {
return '<span class="int">'+parts[0]+'</span>.<span class="dec">'+parts[1]+'</span>';
};
return str;
});
return List;
},2,3,303,74,160,304,80);
I$(329,"<div class=\"m-onsalegood-list\"> {{#if goodslist.length}} \t{{#list goodslist as goods}} \t{{#if goods_index < _waterLevel}} \t<a class=\"m-onsalegood\" href=\"/product/{{goods.goodsId}}.html\"> \t\t<div class=\"imgwrap u-img-wrapper\"> \t\t\t{{#if imgLazyload}} \t\t\t<img data-src=\"{{goods.imageUrl|thumbnail:250}}\" class=\"mainimg\"> \t\t\t{{#else}} \t\t\t<img src=\"{{goods.imageUrl|thumbnail:250}}\" class=\"mainimg u-lazyimg-loaded\"> \t\t\t{{/if}} \t\t\t{{#if goods.cornerLabel}} \t\t\t\t<span class=\"mustbuy\">{{goods.cornerLabel}}</span> \t\t\t{{/if}} \t\t\t{{#if goods.activityGoodsStore <= goods.activityGoodsSellCount}} \t\t\t\t<span class=\"soldout\"><i>已抢完</i></span> \t\t\t{{/if}} \t\t</div> \t\t<div class=\"right\"> \t\t\t<p class=\"tit f-els-2\">{{goods.title}}</p> \t\t\t<p class=\"price\"> \t\t\t\t<span class=\"lbl red\">抢购价</span><i class=\"sym red\">¥</i><span class=\"actprice red {{(goods.miaoshaPrice+'').length>5?'actprice-long':''}}\">{{goods.miaoshaPrice}}</span><span class=\"lbl\">市场价</span><span class=\"mktprice\">¥{{goods.marketPrice}}</span> \t\t\t</p> \t\t\t<div class=\"actions\"> \t\t\t{{#if goods._goodsStatus===1}} \t\t\t\t{{#if goods.startTimeMs <= serverTime + 900000}} \t\t\t\t<span class=\"btn toproduct\">去看看</span> \t\t\t\t{{#else}} \t\t\t\t<span class=\"btn regphone\" on-click={{this.regForNotice(goods, tabInfo.id,$event)}}>开抢提醒</span> \t\t\t\t{{/if}} \t\t\t\t<div class=\"wrap\"><span class=\"desc tostart f-els-2\">{{goods.startTimeMs|format:'H'}}点开抢 限量 {{goods.activityGoodsStore}}件</span></div> \t\t\t{{#elseif goods._goodsStatus===0}} \t\t\t\t{{#if goods.activityGoodsStore > goods.activityGoodsSellCount}} \t\t\t\t\t<span class=\"btn buynow\">马上抢</span> \t\t\t\t\t<div class=\"wrap\"><span class=\"progress\">{{#if goods.activityGoodsSellCount === 0}}限量{{#else}}仅剩{{/if}}<span class=\"num\">{{goods.activityGoodsStore - goods.activityGoodsSellCount}}</span>件<i class=\"percent\" style=\"width: {{(1-goods.activityGoodsSellCount/goods.activityGoodsStore)*100}}%;\"></i></span></div> \t\t\t\t{{#else}} \t\t\t\t\t<span class=\"btn toproduct\">去看看</span> \t\t\t\t\t<div class=\"wrap\"><span class=\"desc notice f-els-2\">原价仍有优惠哦 !</span></div> \t\t\t\t{{/if}} \t\t\t{{#elseif goods._goodsStatus===2}} \t\t\t\t<span class=\"btn regphone\" on-click={{this.regForNotice(goods, tabInfo.id,$event)}}>开抢提醒</span> \t\t\t\t<div class=\"wrap\"><span class=\"desc tomorrow f-els-2\">明日{{goods.startTimeMs|format:'H'}}点开抢 限量 {{goods.activityGoodsStore}}件</span></div> \t\t\t{{/if}} \t\t\t</div> \t\t</div> \t</a> \t{{/if}} \t{{/list}} \t{{#if _hasMore2Show}} \t\t<div class=\"m-searching f-tac\" ref=\"loading\"><img src=\"/res/images/loading.gif\"/><div class=\"text f-tac\">正在加载中</div></div> \t{{/if}}\t {{#else}} \t<p class=\"nogoods\">暂无商品</p>\t {{/if}}\t {{#if _switchingTab}} \t<div class=\"u-switchingtab\"></div> {{/if}} </div>");
I$(331,"<section class=\"m-regphone\">     <div class=\"cont txt\">         <div class=\"title\">设置开抢通知</div>     \t<p>请留下你的手机号码，商品开抢前，考拉会第一时间通知您！</p>         <input id=\"phonenum\" name=\"phoneNum\" type=\"text\" placeholder=\"请输入接收通知的手机号\" class=\"phonenum\" value=\"\" r-model={{phoneNum}}/>     </div>     <div class=\"btns btns-2\">         <span class=\"btn\" on-click={{this.btnClick('close', $event)}}>取消</span>         <span class=\"btn\" on-click={{this.$emit('confirm', this.data)}}>确定</span>     </div> </section>");
I$(330,function (_,_ut,_v,_e, BaseComponent,tpl,Toast,request,Dialog){
var Regphone = BaseComponent.extend({
config:function(data){
data = _.extend(data, {
phoneNum: "",
goodsId: "",
tabId: ""
});
},
init: function(){
this.show(this.data);
},
show: function(){
if (this.__dia) {
this.__dia.show();
}else{
var dia = new Dialog({data:{
content: tpl,
phoneNum: this.data.phoneNum
}});
dia.$on('confirm', this.__confirmCheck._$bind(this));
dia.$inject(document.body);
this.__dia = dia;
}
},
remove: function(){
var dia = this.__dia;
this.__dia = null;
dia.$off('app');
dia.$off('close');
dia.remove();
},
__confirmCheck : function(diaData){
var _phonenum = diaData.phoneNum;
var regExpPhone = /(^1[3|4|5|7|8|]\d{9}$)|(^1[3|4|5|7|8|][0-9]{1}[*]{4}[0-9]{4}$)/;
if(this.isSending) return;
this.isSending =  true;
var _hasError = false,
_errorMap = {};
if(!_phonenum){
Toast.show('请输入手机号！');
_hasError = true;
}else if(!regExpPhone.test(_phonenum)){
Toast.show('手机号格式错误！');
_hasError = true;
}
if(_hasError){
this.isSending = false;
return;
}
// if (this.data.phoneNum === _phonenum) {
//     this.remove();
//     return;
// }
this.__doPostVerify({
phoneNum: diaData.phoneNum,
goodsId: this.data.goodsId,
tabId: this.data.tabId||''
});
},
__doPostVerify : function(data){
request('/activity/onsale/seckillNotify.html', {
type:'json',
method:'POST',
norest: true,
data: data,
onload: function(_data){
// 正常回调处理
if(_data.code==200){
// 成功
Toast.show(_data.desc||'设置成功！');
}else{
//失败
Toast.show(_data.desc||'设置失败！');
}
this.data.phoneNum = data.phoneNum;
this.$emit('updated', this.data.phoneNum);
this.isSending = false;
this.remove();
}._$bind(this),
onerror:function(_error){
// 异常处理
Toast.show('设置失败，请刷新页面重试！');
this.isSending = false;
// this.remove();
}._$bind(this),
onbeforerequest:function(_data){
// 请求发送前，对请求数据处理
}
});
}
});
return Regphone;
},74,2,3,4,23,331,25,68,100);
I$(324,function (_,_ut,_v,_e, BaseComponent,tpl,toast,request, Regphone){
var Goodslist1x1 = BaseComponent.extend({
template: tpl,
config:function(data){
data.limit = data.limit||10; //默认每页加载10条
this.setInitData(data);
data._goodslistCache = {};
data._goodslistCache[data.tabInfo.id] = {list:data.goodslist, hasMore: data.hasMore};
},
init: function(){
this.setScrollEvent();
},
/*
初始化数据:
listType:必填项，列表显示类型，如果填写了则以此为准，否则以商品startTime决定
serverTime:必填项，
goodslist:必填项，
hasMore:必填项，列表是否还有更多数据需要从服务器加载
tabInfo：所属标签页
ignoreWaterLevel：是否忽略水位线控制，默认有
imgLazyload：是否启用图片懒加载
*/
setInitData : function(params){
var data = this.data;
//listType: 0：抢购中，1：即将开抢，2：明日预告
data.listType = params.listType;
data.serverTime = params.serverTime || 0;
data.goodslist = params.goodslist||[];
data.hasMore = !!params.hasMore;
data.tabInfo = params.tab||{};
data.ignoreWaterLevel = !!params.ignoreWaterLevel;
data.imgLazyload = !!params.imgLazyload;
this.setGoodsStatus();
data._waterLevel = Math.min(data.goodslist.length, data.limit); //当前显示到列表的第几条，从1开始计数
if (data.ignoreWaterLevel) {
data._waterLevel = Number.MAX_VALUE;
}
if (data.goodslist.length > data._waterLevel || data.hasMore) {
data._hasMore2Show = true;
}else{
data._hasMore2Show = false;
}
data._loading = false;
data._switchingTab = false;
},
/**
* 设定列表中商品的状态，应该以何种方式显示，已开抢，即将开始，明日预告等
*/
setGoodsStatus : function(){
var data = this.data, status, goods;
if (data.listType !== undefined) {
status = data.listType;
}
var serverDate = (new Date(data.serverTime)).getDate();
for (var i = 0; i < data.goodslist.length; i++) {
goods = data.goodslist[i];
if (typeof status === 'number') {
goods._goodsStatus = status;
}else{
if (goods.startTimeMs <= data.serverTime) {
goods._goodsStatus = 0;
}else{
if ( (new Date(goods.startTimeMs)).getDate() === serverDate ) {
goods._goodsStatus = 1;
}else{
goods._goodsStatus = 2;
}
}
}
}
},
/**
* 对外提供的切换tab方法，列表数据会根据tab变化而重新获取
* @param  {Object} viewInfo tab, listType 信息
* @return {Void}          无返回
*/
switch2Tab: function(viewInfo){
var _view = _.extend(viewInfo, {
listType: 1,
tab: {}
});
//先检查本地是否有缓存，否则从服务器获取
var cache = this.data._goodslistCache, data = this.data;
if (cache[_view.tab.id]) {
this.updateList({
listType: _view.listType,
serverTime: data.serverTime,
imgLazyload: data.imgLazyload,
goodslist: cache[_view.tab.id].list,
hasMore: cache[_view.tab.id].hasMore,
ignoreWaterLevel: data.ignoreWaterLevel,
tab: _view.tab
});
}else{
data._switchingTab = true;
this.getGoodsFromServer({
tabId: _view.tab.id==='tomorrow'? '': _view.tab.id,
showTomorrow: _view.tab.id==='tomorrow'? 'yes': '' ,
limit: data.limit,
offset: 0
}, function(info){
var hasMore=false, goodslist=[];
this._switchingTab = false;
if (!info) {
//没有取到数据，可能服务器错误等，直接当作数据已经取完了
//��置加载失败状态
}else{
hasMore = !!info.hasMore;
goodslist = info.goodsList;
this.data._goodslistCache[_view.tab.id] = {list: goodslist, hasMore: hasMore};
}
this.updateList({
listType: _view.listType,
serverTime: data.serverTime,
imgLazyload: data.imgLazyload,
goodslist: goodslist,
hasMore: hasMore,
ignoreWaterLevel: data.ignoreWaterLevel,
tab: _view.tab
});
}._$bind(this));
this.$update();
}
},
updateList: function(param){
this.setInitData(param);
this.$update();
},
setScrollEvent: function(){
var self = this;
this.__deShowMoreData = _.debounce(function(){ self.showMoreData(); }, 100, false);
window.addEventListener('scroll', this.__deShowMoreData);
},
showMoreData: function(){
// 检查加载中标识是否显示在窗口中
if (!this.$refs.loading ||
!this.data._hasMore2Show ||
this.data._loading) return;
var rect = this.$refs.loading.getBoundingClientRect(),
winHeight = (document.documentElement || document.body).clientHeight;
if (rect.top < winHeight*1.5) {
this.moveWaterLevel();
}
},
moveWaterLevel: function(){
var data = this.data;
if (data.goodslist.length > data._waterLevel+data.limit) {
data._waterLevel += data.limit;
this.setHasMore2Show();
}else if(data.goodslist.length > data._waterLevel){
data._waterLevel = data.goodslist.length;
this.setHasMore2Show();
this.getMoreData();
}else{
this.setHasMore2Show();
this.getMoreData();
}
this.$update();
},
setHasMore2Show: function(){
//检查是否需要显示加载中
var data = this.data;
if (data._waterLevel < data.goodslist.length || data.hasMore) {
data._hasMore2Show = true;
}else{
data._hasMore2Show = false;
}
},
getMoreData: function(){
if (!this.data.hasMore || this.data._loading) { return; }
var tab = this.data.tabInfo, data = this.data;
this.getGoodsFromServer({
tabId: tab.id==='tomorrow'? '': tab.id,
showTomorrow: tab.id==='tomorrow'? 'yes': '' ,
limit: data.limit,
offset: data.goodslist.length
}, function(info){
var data = this.data;
if (!info) {
//没有取到数据，可能服务器错误等，直接当作数据已经取完了
data.hasMore = false;
}else{
data.hasMore = !!info.hasMore;
data.goodslist.push.apply(data.goodslist, info.goodsList);
this.setGoodsStatus();
}
//获取到数据后需要将显示的数据向前移动一个limit
this.moveWaterLevel();
}._$bind(this));
},
getGoodsFromServer: function(params, cb){
var tab = this.data.tabInfo, data = this.data;
data._loading = true;
request('/activity/onsale/goodsList.html', {
method:'POST',
data: params,
norest:true,
type:'json',
onload: function(dt){
if (dt && dt.code==200) {
cb(dt.body);
}else{
cb();
toast.show('数据加载错误');
}
data._loading = false;
},
onerror: function(er){
cb();
toast.show('数据加载错误');
data._loading = false;
}
});
},
regForNotice: function(goods, tabId, evt){
evt.preventDefault();
evt.stopPropagation();
//打开订阅弹框, tabId没有的情况下以商品的tabId为准
var reg = new Regphone({data:{
phoneNum: window.phoneNum,
goodsId: goods.goodsId,
tabId: (tabId==='tomorrow'?'':tabId)||goods.tabId
}});
reg.$on('updated', function(num){
// window.phoneNum = num;
});
},
updateServerTime : function( newServerTime ){
this.data.serverTime = newServerTime;
this.$update();
},
destroy: function(){
window.removeEventListener('scroll', this.__deShowMoreData);
this.supr();
}
});
return Goodslist1x1;
},74,2,3,4,23,329,25,68,330);
I$(334,"{{#if _fold}} <div class=\"m-keywords-btn\" on-touchend={{this.toggleFold()}} on-touchstart={{this.prevDefault($event)}} on-click={{this.prevDefault($event)}} > \t<p class=\"tit\">查看<br>全部</p> \t<div class=\"arr\"/> </div> {{#else}} <div class=\"m-keywords\"> \t<div class=\"mask {{_contentShow? 'show':''}}\" on-touchstart={{this.prevDefault($event)}} on-touchmove={{this.prevDefault($event)}} on-click={{this.prevDefault($event)}} on-touchend={{this.toggleFold()}} /> \t<div class=\"conts {{_contentShow? 'show':''}}\" on-touchmove={{this.prevDefault($event)}}>\t\t \t\t<span class=\"folder\" on-touchstart={{this.prevDefault($event)}} on-touchend={{this.toggleFold()}} on-click={{this.prevDefault($event)}} /> \t\t<div class=\"scrollwrap\" ref=scrollwrap style=\"max-height: {{_maxHeight}}px;\"> \t\t\t<div class=\"scroller\"> \t\t\t{{#list keywordList as kw}} \t\t\t\t<a href=\"{{kw.link}}\" on-tap={{this.gotolink(kw.link, $event, kw_index)}} class=\"entry f-els-1 {{kw.isCurrent?'curr':''}}\">{{kw.keyword}}</a> \t\t\t{{/list}}\t\t\t \t\t\t</div> \t\t</div> \t</div> </div> {{/if}}");
I$(327,function (tpl, R, _, IScroll){
var Nav = R.extend({
template: tpl,
config: function(data){
this.data._fold = true;
this.listenViewportChange();
this.setMaxItemsHeight();
},
init: function(){
},
// noAni 为true时，则立即隐藏，无动画
toggleFold: function(evt, noAni){
if (!this.data._fold) {
//当前显示， 需要折叠
if (!this.data._contentShow) { return; } //显示阶段还没有完成，屏蔽点击
this.__iscroll && this.__iscroll.destroy();
this.__iscroll = null;
this.data._contentShow = false;
if (!noAni) {
setTimeout(function(){
this.data._fold = !this.data._fold;
this.$update();
}._$bind(this), 450);
}else{
this.data._fold = !this.data._fold;
}
this.$update();
}else{
//当前折叠，需要显示
this.data._fold = !this.data._fold;
this.$update();
setTimeout(function(){
this.data._contentShow = true;
this.$update();
}._$bind(this), 50);
//iscroll在部分机型上存在问题，会导致多余的tap，所以延迟初始化
setTimeout(function(){
if (this.$refs.scrollwrap && !this.__iscroll) {
this.__iscroll = new IScroll(this.$refs.scrollwrap, {tap: true});
}
}._$bind(this), 550);
}
},
prevDefault: function(evt){
evt.preventDefault();
},
listenViewportChange: function(){
var self = this;
var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange  ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function(evt){
setTimeout(function(){
self.setMaxItemsHeight(evt);
}, 100);
});
},
setMaxItemsHeight: function(evt){
var winH = document.body.clientHeight;
var h = winH>300 ? 300:winH;
//将最大高度调整为底部刚好露出半行的高度
h -= 30; //minus padding
var lineCount = Math.floor(h/38);
h = Math.round((lineCount-0.5)*38);
this.$update('_maxHeight', h);
this.__iscroll && this.__iscroll.refresh();
},
gotolink: function(url, evt, idx){
if (evt.target.classList.contains('curr')) {
this.toggleFold(null, true);
return;
}
if (this.data._lastclick) {
if ( (+new Date()) - this.data._lastclick < 1000 ) {
return;
}
}
this.data._lastclick = +new Date();
//控制1000ms内只能点击一次
if (url) {
this.toggleFold(null, true); //先折叠，再跳转
// var _newUrl  = url, _newUrlParam = 'zname=navigation&zposition='+idx+'&zlocation=navigation';
// if (url.indexOf('?') > 0) {
// 	_newUrl = _newUrl.replace('?', '?'+ _newUrlParam + '&');
// }else if(url.indexOf('#') > 0){
// 	_newUrl = _newUrl.replace('#', '?'+ _newUrlParam + '#');
// }else{
// 	_newUrl = _newUrl + '?' + _newUrlParam;
// }
location.href= url ;
}
}
});
return Nav;
},334,23,74,129);
I$(294,"<div class=\"{{modalClass||'m-okmodal'}}\"> \t<div class=\"close\" on-click={{this.hide()}}>X</div> \t<div class=\"content\"> \t\t<p class=\"text\">{{text}}</p> \t\t<a class=\"u-wbtn\" on-click={{this.confirm()}}>{{btnText}}</a> \t</div> </div>");
I$(293,function (_, _e, _v, tpl, Modal, p){
var OKModal = Modal.extend({
content: tpl,
config: function(data){
data.text = data.text || 'sorry,您不符合本次活动规则哦！';
data.btnText = data.btnText || '我知道啦';
},
init: function(){
this.supr();
},
confirm: function(){
this.$emit('confirm', this.data);
this.destroy();
}
});
return OKModal;
},74,4,3,294,202);
I$(291,function (_k,_e,_t,_,getappbridge,toast,ShareTipModal,DldAPPModal,onWxShare,_p,_o,_f,_r,pro) {
_p._$$Share = _k._$klass();
pro = _p._$$Share._$extend(_t._$$EventTarget);
pro.__reset = function(_options){
this.__super(_options);
};
pro.__init = function() {
this.__super();
this.__appbridge = getappbridge();
};
pro.__isInWeixin = function(){
return navigator.userAgent.match(/micromessenger/i);
};
pro.__isInYixin = function(){
return navigator.userAgent.match(/yixin/i);
};
pro.__isWeibo = function(){
return navigator.userAgent.match(/weibo/i);
};
pro._$shareBtnClick = function(shareConfig,tipImgObj){
var _shareConfig = shareConfig || window.shareConfig;
var _tipImgObj = tipImgObj||{};
if(this.__isInWeixin() || this.__isInYixin() || this.__isWeibo()){
this.__onWxShare = onWxShare();
this.__onWxShare._$openShare(shareConfig,function(res){
//res: {result: true/false, channel: appmessage/timeline, shareApp:'weixin'}
this._$dispatchEvent('cbWxShare',res);
}._$bind(this));
this.__wxShare = new ShareTipModal({
data:{
imgUrl:_tipImgObj.imgUrl||'',
imgWidth:_tipImgObj.imgWidth
}
})
this.__wxShare.$inject(document.body);
}else if(_.isKaolaApp()){  //如果在APP内部，则打开底部浮层
this.__appbridge._$openShare(shareConfig,function(res){
//res: {result: true/false, channel: weixin_appmessage/weixin_timeline/yixin_appmessage/yixin_timeline/weibo_app}
this._$dispatchEvent('cbAppShare',res);
}._$bind(this));
}else{
toast.show('请去考拉app内分享');
}
};
return _p;
},1,4,20,74,28,25,244,293,227);
I$(347,function (_k,_e,_t,_p,_o,_f,_r,pro) {
/**
*
* 页面结构举例和脚本举例请参考该目录下/demo/index.html
*
* @class     module:widget/marquee._$$Marquee
* @extends   module:util/event._$$EventTarget
* @param     {Object}  options  - 可选配置参数
* @property  		{Node}   		listWrap  	- 包含滚动数据容器的节点
* @property  		{NodeArray}  	list 	  	- 滚动的数据节点，默认为listWrap的子节点
* @property  		{Number}  		moveItemNum - 一次滚动数据条数，默认为1条
* @property  		{Number}  		showItemNum - 列表一次显示数据条数，默认显示5条
* @property  		{String}  		direction 	- 滚动方向，包括向上、向下、向左、向右四个值，分别为up,down,left,right,默认为up
* @property  		{Number}  		interval 	- 滚动间隔时间，单位是毫秒，默认为1200
* @property  		{Number}  		animationTime 	- 滚动动画执行时间，单位是毫秒，默认为400
* @property  		{Boolean}  		isLoop 			- 动画是否循环，true：循环，false：不循环
*/
_p._$$Marquee = _k._$klass();
pro = _p._$$Marquee._$extend(_t._$$EventTarget);
pro.__init = function(){
this.__super();
this.__showTimes = 0;  //滚动次数
this.__moveDistance = 0;  //滚动的距离
};
pro.__reset = function(_options){
this.__super(_options);
this.__options = _options||{};
this.__listWrap = _options.listWrap||'';
this.__list = _options.list||this.__listWrap.children||[];
this.__moveItemNum = _options.moveItemNum||1;
this.__showItemNum = _options.showItemNum||5;
this.__direction = _options.direction||'up';
this.__intervalTime = _options.interval||1200;
this.__animationTime = _options.animationTime||400;
this.__isLoop = _options.isLoop;
this.__totalTimes = Math.ceil((this.__list.length-this.__showItemNum)/this.__moveItemNum);
if(!!this.__isLoop) this.__initList();
this.__initAnimationStyle();
this.__setInterval();
this.__listWrap.addEventListener('webkitTransitionEnd',function(){
this._$dispatchEvent('onfliped');
}._$bind(this));
};
pro.__initList = function(){
var _fragment = document.createDocumentFragment();
for(var i=0;i<this.__showItemNum;i++){
_fragment.appendChild(this.__list[i]);
}
this.__listWrap.appendChild(_fragment);
};
pro.__initAnimationStyle = function(){
if(!this.__listWrap || this.__list.length <= this.__showItemNum) return;
var _cssText = '-webkit-transition:' + this.__animationTime/1000 + 's linear transform;transition:' + this.__animationTime/1000 + 's linear transform;';
this.__listWrap.style.cssText = _cssText;
};
pro.__setInterval = function(){
if(!this.__listWrap || this.__list.length <= this.__showItemNum) return;
this.__interval = window.setInterval(function(){
this.__onMove();
}._$bind(this),this.__intervalTime);
};
pro.__onMove = function(){
var _moveDistance;
if(this.__showTimes == this.__totalTimes){
if(!!this.__isLoop){
this.__showTimes = 0;
this.__moveDistance = 0;
this.__doMove(0,0);
return;
}else{    //不循环，滚到底后停止滚动
window.clearInterval(this.__interval);
return;
}
}
if(this.__direction == 'up' || this.__direction == 'down'){
if(this.__moveItemNum > 1){
var _moveItemNum = 0;
if(this.__showTimes == this.__totalTimes){
var _lastItemNum = (this.__list.length-this.__showItemNum)%this.__moveItemNum;
}
_moveItemNum = !!_lastItemNum ? _lastItemNum : this.__moveItemNum;
for(var i=0;i<_moveItemNum;i++){
this.__moveDistance += this.__list[this.__showTimes*this.__moveItemNum+i].clientHeight;
}
}else{
this.__moveDistance += this.__list[this.__showTimes].clientHeight;
}
this.__showTimes ++;
_moveDistance = this.__direction == 'up' ? -this.__moveDistance : this.__moveDistance;
this.__doMove(0,_moveDistance);
}else if(this.__direction == 'left' || this.__direction == 'right'){
if(this.__moveItemNum > 1){
var _moveItemNum = 0;
if(this.__showTimes == this.__totalTimes){
var _lastItemNum = (this.__list.length-this.__showItemNum)%this.__moveItemNum;
}
_moveItemNum = !!_lastItemNum ? _lastItemNum : this.__moveItemNum;
for(var i=0;i<_moveItemNum;i++){
this.__moveDistance += this.__list[this.__showTimes*this.__moveItemNum+i].clientWidth;
}
}else{
this.__moveDistance += this.__list[this.__showTimes].clientWidth;
}
this.__showTimes ++;
_moveDistance = this.__direction == 'left' ? -this.__moveDistance : this.__moveDistance;
this.__doMove(_moveDistance,0);
}
};
pro.__doMove = function(xDistance,yDistance){
this.__listWrap.style.transform = 'translate('+ xDistance +'px,'+ yDistance +'px)';
this.__listWrap.style.webkitTransform = 'translate('+ xDistance +'px,'+ yDistance +'px)';
};
return _p;
},1,4,20);
I$(354,"<div class=\"n-modal\"> \t<div class=\"title\">啊哦~活动过期啦~</div> \t<div class=\"content\"> \t\t<div class=\"klpic\"> \t\t\t<img width=\"88\" src=\"http://haitao.nos.netease.com/37d6fe10f9fa4268bd87c2e71b4709c1.jpg\" /> \t\t</div> \t</div> \t<div> \t\t<a class=\"b-btn2 b-btn2-1 f-db\" href=\"http://m.kaola.com/\">去考拉买买买</a> \t</div> </div>");
I$(350,function (tpl,Modal){
var EndModal = Modal.extend({
content: tpl,
init: function(){
this.supr();
},
close: function(){},
});
return EndModal;
},354,202);
I$(369,"<dl class=\"m-itemlist-col2 f-cb {{customClass||''}}\" > {{#list list as goods}} \t{{#if (goods.isShow||1)==1}} \t\t<dd>              <article class=\"m-itemcol2\"> \t\t\t\t<a href=\"/product/{{goods.goodsId}}.html\" class=\"imgwrap\"> \t\t\t\t\t<img src=\"{{this.imgThumbnailUrl(goods.imageUrl, 400)}}\" class=\"u-item-img\" /> \t\t\t\t\t{{#if goods.showColorCard===1}} \t\t\t\t\t<div class=\"color-card\"></div> \t\t\t\t\t{{/if}} \t\t\t\t\t{{#if !goods.actualStorageStatus}} \t\t\t\t\t<i class=\"logo-soldout\"><span class=\"txt\">售完</span></i> \t\t\t\t\t{{#elseif goods.onlineStatus==0}} \t\t\t\t\t<i class=\"logo-soldout\"><span class=\"txt\">下架</span></i> \t\t\t\t\t{{/if}} \t\t\t\t</a> \t\t\t\t<div class=\"txtwrap\"> \t\t\t\t\t<p class=\"tit\"><a href=\"/product/{{goods.goodsId}}.html\">{{#if goods.memberCount>0}}<span class=\"mem-lbl\">{{goods.memberCount}}{{goods.memberUnitName || '件'}}装<span class=\"sep\">|</span></span>{{/if}}{{goods.title}}</a></p> \t\t\t\t\t<p class=\"mkt-price\">国内价¥<del>{{goods.marketPrice|numFixed:2}}</del></p> \t\t\t        {{#if  goods.memberCount>0 && goods.isShowDiscountCost!==false}} \t\t\t\t\t\t<p class=\"act-price\"><span class=\"symbol\">{{this.getActPriceLabel(goods)}}¥</span><span class=\"bold\">{{goods.actualCurrentPriceForApp|numFixed:2}}</span><span class=\"member-lbl member-lbl-1\">单{{goods.memberUnitName || '件'}}¥{{Math.ceil(this.getUnitPrice(goods))}}</span></p> \t\t\t\t\t{{#else}} \t\t\t\t\t\t<p class=\"act-price\">{{this.getActPriceLabel(goods)}}¥<span class=\"bold\">{{goods.actualCurrentPriceForApp|numFixed:2}}</span>{{#if type==1}}{{#if (goods.actualCurrentPriceForApp/(goods.marketPrice)) > 0.049 && (goods.actualCurrentPriceForApp/(goods.marketPrice)) < 0.99}}<span class=\"pmo-lbl pmo-lbl-1\">{{@(Math.ceil(goods.actualCurrentPriceForApp/(goods.marketPrice)*100)/10|suffix:1)}}折</span>{{/if}} \t\t\t\t\t\t\t{{#elseif type==0}} \t\t\t\t\t\t\t<span class=\"pmo-lbl\">立省{{(goods.marketPrice-goods.actualCurrentPriceForApp)|numFixed:1}}元</span> \t\t\t\t\t\t\t{{#elseif type==2}} \t\t\t\t\t\t\t<span class=\"pmo-lbl\">HOT</span> \t\t\t\t\t\t\t{{#elseif type==3}} \t\t\t\t\t\t\t<span class=\"pmo-lbl\">NEW</span> \t\t\t\t\t\t\t{{#elseif type==4}} \t\t\t\t\t\t\t<span class=\"pmo-lbl\">{{@(value)}}</span> \t\t\t\t\t\t\t{{/if}} \t\t\t\t\t\t</p> \t\t\t\t\t{{/if}} \t\t\t\t</div> \t\t\t\t<div class=\"u-itemlbl-wrap\"> \t\t\t\t{{#if (goods.isAppOnlyPrice||0)==1}}<span class=\"lbl lbl-app\"><span>手机专享</span></span>{{/if}} \t\t\t\t{{#if !!goods.zhengdanPromotionTitle}} \t\t\t\t\t<span class=\"lbl lbl-ord {{this.getOrdLblClass(goods)}}\"><span r-html={{this.getOrdLblText(goods)}}></span></span> \t\t\t\t{{/if}} \t\t\t\t</div> \t\t\t\t{{#if goods._actionCfg && goods._actionCfg.buttonText}} \t\t\t\t\t<a href=\"/product/{{goods.goodsId}}.html\" class=\"action-{{goods._actionCfg.actType===1?'to':'go'}} {{(!goods.actualStorageStatus||goods.onlineStatus==0)?'soldout':''}}\" >{{goods._actionCfg.buttonText}}</a> \t\t\t\t{{/if}} \t\t\t</article>          </dd> \t{{/if}} {{/list}} </dl>");
I$(368,function (_,_ut,tpl, BaseComponent){
// <GoodsList list={{list}}></GoodsList>
var GoodsList = BaseComponent.extend({
name: "goodslist",
template: tpl,
getUnitPrice:function(goods){
var nowPrice;
if((goods.isAppOnlyPrice) && goods.isAppOnlyPrice==1){
nowPrice=goods.actualCurrentPriceForApp;
} else{
nowPrice=goods.actualCurrentPrice;
}
return _ut._$fixed(nowPrice/goods.memberCount,2);
},
imgThumbnailUrl:function(url,width){
return _.imgThumbnailUrl(url,width);
},
getActPriceLabel: function(goods){
if (goods._priceCfg && !!goods._priceCfg.actPriceLabel) {
return goods._priceCfg.actPriceLabel;
}
return '售价';
},
getOrdLbl: function(goods){
var val='' ;
if (!!goods.zhengdanPromotionTitle &&
(typeof goods.zhengdanPromotionTitle === 'string') &&
goods.zhengdanPromotionTitle.split('-').length===2) {
val = goods.zhengdanPromotionTitle.split('-')[0];
}
return val;
},
getOrdLblText : function(goods){
var txt = this.getOrdLbl(goods);
if (txt==='N元任选') {
if (goods.zhengdanRules && goods.zhengdanRules.length) {
return goods.zhengdanRules[0].replace('选','<br>选');
}
}
return txt;
},
getOrdLblClass: function(goods){
if (this.getOrdLbl(goods)==='N元任选') {
if (goods.zhengdanRules && goods.zhengdanRules.length) {
if (goods.zhengdanRules[0].length <=6) {
return 'l';
}else{
return 'xl';
}
}
}
}
});
GoodsList.filter('numFixed',function(num,fixed){
var numStr = num+'';
if(numStr.indexOf('.')!=-1){
return _ut._$fixed(num,fixed)
} else{
return num;
}
});
GoodsList.filter('fixed',function(num,fixed){
return _ut._$fixed(num,fixed)
});
GoodsList.filter('suffix',function(num,fixed){
var num = _ut._$fixed(num,fixed);
var numStr = num+'';
if(numStr.indexOf('.')==-1){
return numStr +='.0';
}
return numStr;
});
return GoodsList;
},74,2,369,23);
I$(361,function (NEJ,_k,_u,_t0,_p,_o,_f,_r){
// variable declaration
var _pro;
/**
* 先快后慢动画
*
* 结构举例
* ```html
* <div id='id-bounce1'></div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/animation/easeout'
* ],function(_t){
*     // 创建动画实例
*     var _easeout  = _t._$$AnimEaseOut._$allocate({
*         from:{
*             offset:100
*         },
*         to:{
*             offset:200
*         },
*         duration:1000,
*         onupdate:function(_event){
*             _box.style.left = _event.offset + 'px';
*         },
*         onstop:function(){
*             this._$recycle();
*         }
*     });
*     // 开始动画
*     _easeout._$play();
* });
* ```
*
* @class   module:util/animation/easeout._$$AnimEaseOut
* @extends module:util/animation/bezier._$$AnimBezier
*
* @param   {Object} config 可选配置参数
*/
_p._$$AnimEaseOut = _k._$klass();
_pro = _p._$$AnimEaseOut._$extend(_t0._$$AnimBezier);
/**
* 控件重置
*
* @protected
* @method module:util/animation/easeout._$$AnimEaseOut#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
_options = _u._$merge({},_options);
_options.timing = 'easeout';
this.__super(_options);
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,2,125);
I$(404,function (k,ut,v,e,tab,lz,_,toast,Module,gotop,List,p) {
// CategoryModule类
p._$$CategoryModule = k._$klass();
pro = p._$$CategoryModule._$extend(Module);
pro.__init = function(options) {
this.__supInit(options);
this.__listCache = {}; //用于缓存品牌列表数据
this.__setComponent();  //设置本页的列表控件
// 初始化左侧导航tab
this.__tab = tab._$$Tab._$allocate({
list:e._$getChildren('tablist'),
index:0,
selected:'z-crt',
event:'click',
onchange:function(obj){
var cid = e._$dataset(obj.list[obj.index],'cid');
if(!!this.__blist){
this.__blist.$update('cid',cid);
}else{
this.__newComponentIns(cid);
}
}._$bind(this)
});
gotop._$create(document.body);
};
// 获取列表组建实例
pro.__newComponentIns = function(cid){
this.__blist = new this.__BrandList({
data:{
cid:cid
}
});
this.__blist.$inject('#box');
};
// 创建每个分类下的列表组件
pro.__setComponent = function(){
var that = this;
this.__BrandList = List.extend({
template: '#ctlist',
url:'/category/',
watchedAttr:['cid'],
config: function(data){
_.extend(data, {imguri: '',siteuri:'', list: [],nodata:false});
this.$watch(this.watchedAttr, function(){
if(this.shouldUpdateList(data)){
this.__getList();
}
})
},
shouldUpdateList: function(){
var cid = this.data.cid;
var item = that.__listCache[cid];
var tmp;
if(!!item){
tmp = item.topBanner;
this.data.imguri = tmp?tmp.imageUrl:'';
this.data.siteuri = tmp?tmp.siteUrl:'';
this.data.list = item.categoryItemList || [];
this.data.typeList = item.typeList || null;
this.data.nodata = this.data.list.length>0?false:true;
// fix imglazy
setTimeout(function(){
e._$get('main').scrollTop = 1;
e._$get('main').scrollTop = 0;
},0);
return false;
}
return true;
},
__getList: function(){
var data = this.data;
data.imguri = '';
data.siteuri = '';
data.list = [];
data.nodata = false;
var option = {
progress: true,
onload: function(json){
var result,cobj,list,banner;
if(json && json.code == 200){
result = json.body;
cobj = result.categoryMoudle||{};
list = cobj.categoryItemList || [];
data.typeList = cobj.typeList || null;
// for fakedata,do not delete
// result = window.bd;
// for(var i=0,l=list.length;i<l;i++){
//   list.push(list[i])
// }
if(cobj.topBanner){
data.imguri = cobj.topBanner.imageUrl;
data.siteuri = cobj.topBanner.siteUrl;
}else{
data.imguri = '';
data.siteuri = '';
}
if(!that.__listCache[data.cid]){
// 缓存列表数据
that.__listCache[data.cid] = cobj;
}
_.mergeList(list, data.list, data.key||'id');
data.list = list;
data.nodata = data.list.length>0?false:true;
// fix imglazy
setTimeout(function(){
e._$get('main').scrollTop = 1;
e._$get('main').scrollTop = 0;
},0);
}else{
toast.show(json.msg || '数据请求失败！');
}
},
onerror: function(json){
toast.show("数据请求失败！");
}
};
this.$request(this.url+data.cid+'.html',option)
}
});
};
return p;
},1,2,3,4,133,70,74,25,5,116,160);
I$(407,function (k,ut,v,e,lz,_,gotop,Module,p) {
// ProductModule类
p._$$ProductModule = k._$klass();
pro = p._$$ProductModule._$extend(Module);
pro.__init = function(options) {
this.__supInit(options);
gotop._$create(document.body);
lz._$$LazyImage._$allocate({
// parent:document,
attr:'src',
oncheck: function(evt){
var lzsrc = evt.target.getAttribute('data-src');
if ( !lzsrc ) {
evt.value = 0;  //没有lazyload属性的不处理
return;
}
var src = evt.target.getAttribute('src');
if (!src || src!==lzsrc) {
// evt.value = 1; //lazyload 还没有处理过，需处理
}else{
evt.value = 0;
}
},
onremove:function(event){
event.stopped = 1;
}
});
};
return p;
},1,2,3,4,70,74,116,5);
I$(440,"<section ref=\"commandmask\" class=\"m-commandmask\" r-hide=\"{{hide}}\" on-click=\"{{this.hideMask($event)}}\" on-touchmove=\"{{this.touchMoveEvent($event)}}\"></section> <!-- <section ref=\"commandbox\" class=\"m-commandbox\" r-animation=\"when:!hide;style:height 136px,width 240px,margin-left -120px,margin-top -68px;when:hide;style:height 0,width 0,margin-left 0,margin-top 0;\"> --> <section ref=\"commandbox\" class=\"m-commandbox\" r-hide=\"{{hide}}\">     <div class=\"title\">输入口令抱团享优惠</div>     <div class=\"checkcode\"><input ref=\"code\" type=\"text\" minLength=\"4\" value=\"\" placeholder=\"请输入口令\" r-model=\"{{this.data.code}}\"></div>     <div class=\"check\" on-click=\"{{this.confirmCheck($event)}}\">确定</div> </section> <section ref=\"hint\" class=\"m-comhint\" r-hide=\"{{hideHint}}\" r-class=\"{'sucHint':hintStatus==='success'}\">{{hintMsg}}</section>  ");
I$(437,function (_,_ut,BaseComponent,tpl){
var recommandbox = BaseComponent.extend({
template: tpl,
// watchedAttr: ['couponId','address'],
config: function(data){
// _.extend(data,{
//  address:'',
//  couponId:window['couponId']
// });
this.data.stopCheck = false;
},
init: function (data) {
this.$watch("hide",function(hide){
if(hide == false){
this.$refs.code.focus();
}
});
},
confirmCheck:function(data){
//触发屏幕滚动，避免4s ios7浮层滞留问题
setTimeout(function(){
window.scrollBy(-1,0);
}, 0);
if(!this.data.code || this.data.code.trim()==""){
this.data.code = "";
this.__showHint("输入口令为空");
return false;
}
if(this.data.stopCheck){
return false;
}
this.data.stopCheck = true;
var params = {"goodsId":this.data.goodsId||"","activityGoodsId":this.data.activityGoodsId||"","code":this.data.code.trim()||""};
this.$request('/tuan/participate.html',{
norest:true,
data:_ut._$object2query(params),
onload:this.__checkResult._$bind(this),
onerror:this.__checkResultError._$bind(this),
type:'json',
method:'POST'
});
},
hideMask:function(){
setTimeout(function(){
window.scrollBy(-1,0);
}, 0);
this.data.hide = true;
},
touchMoveEvent:function(event){
//禁止遮罩层滑动
event.preventDefault();
return false;
},
__showHint:function(msg,status,isList,goodsId,activityGoodsId){//status == "success",红色框
this.data.hideHint = false;
this.data.hintMsg = msg;
this.data.hintStatus = status;
clearTimeout(this.data.hintTimer);
this.data.hintTimer = setTimeout(function(){
this.__hideHint();
this.data.stopCheck = false;
if(isList){
if(status==200 || status==201 || status==413 || status==414 || status==495){
this.$update({hide:true});
window.location.href = "/tuans/"+goodsId+".html?activityGoodsId="+activityGoodsId;
}
}else{
if(status==200){
window.location.reload();
}
}
}._$bind(this),1000);
this.$update();
},
__hideHint:function(){
this.$update({hintMsg:"",hideHint:true,hintStatus:""});
},
__checkResult:function(_json){
if(!_json){
this.__showHint("内部错误！");
return;
}
var code = _json.code || -1;
var body = _json.body || {};
if(code==200 || code==201 || code==413 || code==414 || code==495){
this.__showHint(code==200?"参团成功！":_json.msg,code,!!this.data.isList,body.goodsId,body.activityGoodsId);
}else{
this.__showHint(_json.msg || "内部错误！");
// var url = '/fail/error.html'+'?errorMsg='+encodeURIComponent(_json.msg||"");
}
},
__checkResultError:function(){
}
});
return recommandbox;
},74,2,23,440);
I$(435,"<div class=\"m-aboutmodal\"> \t<span class=\"close\" on-click={{this.hide()}}>x</span> \t<div class=\"title\">组团流程</div> \t<div class=\"content\" ref=tips> \t\t<div> \t\t\t<div class=\"pic\"><img width=\"247\" src=\"http://haitao.nos.netease.com/cfefe939593d428d93e1a8cfd942a026.png\"></div>\t \t\t\t<div class=\"txt\"> \t\t\t\t<p><strong>组团失败：</strong>开团24小时内未邀请到足够好友参团，则组团失败。</p> \t\t\t\t<p><strong>退款说明：</strong>组团失败，小考拉将为您实时关闭订单、自动退款。根据支付宝和网易宝的交易规则，退款将在1-7个工作日内原路退至您的支付账户。</p> \t\t\t\t<p><strong>*备注：</strong>商品数量有限，开团后请尽快邀请好友参团哟，若商品售罄，也会导致组团失败~</p> \t\t\t\t<p>组团成功或失败时，尚未支付的订单将自动关单~</p> \t\t\t\t<p>同一用户对同一商品的团购次数有限，如超出次数，开团或参团时将收到相关提醒~</p> \t\t\t</div> \t\t</div> \t</div> </div>");
I$(432,function (tpl, Modal, IScroll){
var AboutModal = Modal.extend({
content: tpl,
init: function(){
this.supr();
setTimeout(function(){
this.__iscroll = new IScroll(this.$refs.tips,{tap:true});
}._$bind(this),50)
}
});
return AboutModal;
},435,202,129);
I$(261,"<div class=\"m-botsharewin\"> \t{{#if !!common}} \t<div class=\"title\">{{common.title||''}}</div> \t<div class=\"desc\">{{common.desc||''}}</div> \t{{#else}} \t<div class=\"content\"> \t{{#include content}} \t</div> \t{{/if}} \t<ul class=\"btns\"> \t\t{{#list shareTypes as item}} \t\t<li><span class=\"{{item.icnClassName}}\" on-click={{this.onShare(item.channel)}}></span><br /><i>{{item.name}}</i></li> \t\t{{/list}} \t</ul> \t<div class=\"u-favorbtn\" on-click={{this.hide()}}>{{quitText || '取消'}}</div> </div>  ");
I$(259,function (tpl,Modal,getappbridge,_){
var ShareModal = Modal.extend({
content: tpl,
config: function(data){
_.extend(data, {
winbodyClass:'winbodybot',
shareTypes:[{
channel:'weixin_appmessage',
name:'微信好友',
icnClassName:'u-icn20'
},{
channel:'weixin_timeline',
name:'微信朋友圈',
icnClassName:'u-icn20 u-icn20-1'
},{
channel:'yixin_appmessage',
name:'易信好友',
icnClassName:'u-icn20 u-icn20-3'
},{
channel:'yixin_timeline',
name:'易信朋友圈',
icnClassName:'u-icn20 u-icn20-4'
}]
});
},
init: function(){
this.supr();
this.__appbridge = getappbridge();
},
onShare: function(channel){
var self = this;
this.$emit("onShare", channel);
var config = this.data.shareConfig || window.shareConfig || {};
config.share_channel = channel;
//如果是易信朋友圈分享，需要把title改成desc，因为易信的内容只显示title并不显示desc;
if(channel=='yixin_timeline'){
config.title=config.desc;
}
this.__appbridge._$openShare(config,function(res){
self.$emit("shared", res);
});
// _.exec({
// 	method:"sendShareAppMessage",
// 	args:config,
// 	nativeSucCb:function(res){
// 		self.$emit("shared", res);
// 	},
// 	nativeErrCb:function(){
// 		self.$emit("shared", res);
// 	}
// });
}
});
return ShareModal;
},261,202,28,74);
I$(461,function (NEJ,_k,_e,_v,_t,_p,_o,_f,_r,_pro){
/**
* 选择助手控件
*
* 结构举例
* ```html
*  <!-- 搜索祖先节点，找到设置了tabindex大于1000的节点来响应键盘上下事件，找不到为document -->
*  <div id="xxx" tabindex="1005">
*    <p>aaaaaaaaaaaaaa</p>
*    <p>bbbbbbbbbbbbbb</p>
*    <p>cccccccccccccc</p>
*    <p>dddddddddddddd</p>
*    <p>eeeeeeeeeeeeee</p>
*    <p>ffffffffffffff</p>
*    <p>gggggggggggggg</p>
*  </div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/helper/select'
* ],function(_t){
*     var _helper = _t._$$SelectHelper._$allocate({
*          parent:'xxx',
*          loopable:!0,
*          onchange:function(_event){
*              // _event.last
*              // _event.target
*              console.log('selection change -> '+_event.target.innerText);
*          },
*          onselect:function(_event){
*              // _event.target
*              console.log('select -> '+_event.target.innerText);
*          }
*     });
* });
* ```
* @class    module:util/helper/select._$$SelectHelper
* @extends  module:util/event._$$EventTarget
* @param    {Object}      config   - 可选配置参数
* @property {String|Node} parent   - 容器节点，从该容器开始往上遍历找到设置了tabindex大于1000的节点来响应键盘上下事件，找不到为document
* @property {String}      clazz    - 用于标识可选择的节点，不传则为body下的子节点
* @property {String}      selected - 选中节点样式标识，默认为js-selected
* @property {String}      hover    - 鼠标移入样式标识，默认同selected，如果hover样式和selected不一样，确保selected样式优先级高于hover
* @property {Boolean}     loopable - 是否允许循环选择
*/
/**
* 选择项变化触发事件
* @event    module:util/helper/select._$$SelectHelper#onchange
* @param    {Object} event  - 选择信息
* @property {Node}   target - 当前选中项
* @property {Node}   last   - 上次选中项
*/
/**
* 选中某项触发事件，用户敲回车或者鼠标单击选项时触发此事件
* @event    module:util/helper/select._$$SelectHelper#onselect
* @param    {Object} event  - 选择信息
* @property {Node}   target - 当前选中项
*/
_p._$$SelectHelper = _k._$klass();
_pro = _p._$$SelectHelper._$extend(_t._$$EventTarget);
/**
* 控件重置
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__reset
* @param  {Object} arg0 - 配置信息
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
this.__loop = !!_options.loopable;
this.__parent = _e._$get(_options.parent);
this.__selected = _options.selected||'js-selected';
this.__hovered = _options.hover||this.__selected;
this.__nopt = {};
if (!!_options.clazz){
this.__nopt.filter =
_e._$hasClassName.
_$bind2(_e,_options.clazz);
this.__clazz = _options.clazz;
}
// init event
this.__kbody = this.__getKeyBoardParent(
this.__parent
);
this.__doInitDomEvent([[
this.__kbody,'keydown',
this.__doCheckKBAction._$bind(this),!0
],[
this.__kbody,'enter',
this.__doCheckKBEnter._$bind(this)
],[
this.__parent,'click',
this.__onCheckClick._$bind(this)
],[
this.__parent,'mouseover',
this.__onCheckHover._$bind(this)
],[
this.__parent,'mouseleave',
this.__onCheckLeave._$bind(this)
]]);
};
/**
* 控件销毁
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
delete this.__selected;
delete this.__hovered;
delete this.__parent;
delete this.__kbody;
delete this.__clazz;
delete this.__nopt;
delete this.__loop;
};
/**
* 判断节点是否选项节点
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__isItemElement
* @param  {Node} ar0 - 节点
* @return {Boolean}    是否选项
*/
_pro.__isItemElement = function(_element){
if (!!this.__clazz){
return _e._$hasClassName(
_element,this.__clazz
);
}
return _element.parentNode==this.__parent;
};
/**
* 取键盘检测节点
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__getKeyBoardParent
* @return {Node} 节点
*/
_pro.__getKeyBoardParent = (function(){
var _max = 1000;
return function(_element){
while(!!_element&&(parseInt(_element.tabIndex)||0)<=_max){
_element = _element.parentNode;
}
return _element||document;
};
})();
/**
* 根据样式取项节点
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__getItemElement
* @return {Node} 节点
*/
_pro.__getItemElement = function(_class){
var _list = _e._$getByClassName(
this.__parent,_class
);
return !_list?null:_list[0];
};
/**
* 同步选中状态
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__doSyncSelection
* @return {Void}
*/
_pro.__doSyncSelection = function(_event,_class){
// update state
_e._$delClassName(_event.last,_class);
_e._$addClassName(_event.target,_class);
// trigger onselectionchange
if (_class==this.__selected&&
_event.last!=_event.target){
this.__doScrollToView(_event.target);
this._$dispatchEvent(
'onchange',_event
);
}
};
/**
* 节点滚动至可视区域
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__doScrollToView
* @return {Void}
*/
_pro.__doScrollToView = function(_element){
var _parent = _e._$getScrollViewPort(_element),
_offset = _e._$offset(_element,_parent);
// item out of top
if (_offset.y-_parent.scrollTop<0){
_parent.scrollTop = _offset.y;
return;
}
// item out of bottom
var _delta = _offset.y+
_element.offsetHeight-_parent.clientHeight;
if (_delta>_parent.scrollTop){
_parent.scrollTop = _delta;
}
};
/**
* 解析选择状态
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__doParseSelection
* @return {Object} 状态信息
*/
_pro.__doParseSelection = function(_event,_class){
var _element = _v._$getElement(
_event,this.__isItemElement._$bind(this)
);
return !_element?null:{
last:this.__getItemElement(_class),
target:_element
};
};
/**
* 触发键盘选择实践
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__doCheckKBAction
* @param  {Event} arg0 - 事件对象
* @return {Void}
*/
_pro.__doCheckKBAction = function(_event){
var _code = _event.keyCode;
// only for up and down
if (_code!=38&&_code!=40) return;
_v._$stop(_event);
var _eopt = {
last:this._$getSelectedNode()
};
// calculate last and target
this.__nopt.backward = _code==38;
var _list = !this.__clazz
? _e._$getChildren(this.__parent)
: _e._$getByClassName(this.__parent,this.__clazz),
_next = this.__nopt.backward
? _list[_list.length-1]
: _list[0];
if (!_eopt.last){
_eopt.target = this.__getItemElement(
this.__hovered
)||_next;
}else{
_eopt.target = _e._$getSibling(
_eopt.last,this.__nopt
);
}
// check loop selection
if (!_eopt.target){
if (!this.__loop||_list.length<=1){
return;
}
_eopt.target = _next;
}
this.__doSyncSelection(_eopt,this.__selected);
};
/**
* 回车事件
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__doCheckKBEnter
* @return {Void}
*/
_pro.__doCheckKBEnter = function(_event){
_v._$stop(_event);
this._$dispatchEvent('onselect',{
target:this._$getSelectedNode()
});
};
/**
* 点击事件
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__onCheckClick
* @return {Void}
*/
_pro.__onCheckClick = function(_event){
var _eopt = this.__doParseSelection(
_event,this.__selected
);
if (!_eopt) return;
this.__doSyncSelection(
_eopt,this.__selected
);
this._$dispatchEvent('onselect',{
target:_eopt.target
});
};
/**
* 鼠标移入事件
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__onCheckHover
* @return {Void}
*/
_pro.__onCheckHover = function(_event){
var _eopt = this.__doParseSelection(
_event,this.__hovered
);
if (!_eopt) return;
this.__doSyncSelection(
_eopt,this.__hovered
);
if (!!this.__kbody.focus){
this.__kbody.focus();
}
};
/**
* 鼠标移出事件
*
* @protected
* @method module:util/helper/select._$$SelectHelper#__onCheckLeave
* @return {Void}
*/
_pro.__onCheckLeave = function(_event){
if (this.__hovered==this.__selected){
return;
}
_e._$delClassName(
this.__getItemElement(this.__hovered),
this.__hovered
);
};
/**
* 取当前选中的节点
*
* @method module:util/helper/select._$$SelectHelper#_$getSelectedNode
* @return {Node} 当前选中节点
*/
_pro._$getSelectedNode = function(){
return this.__getItemElement(this.__selected);
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,4,3,20);
I$(459,function (NEJ,_k,_e,_t0,_t1,_p,_o,_f,_r){
var _pro;
/**
* 建议提示控件
*
* 样式举例
* ```css
* .box{position:relative;width:100px;}
* .xuanzhong{background:pink;}
* #suggest-input{height:24px;line-height:24px;}
* #card0{position:absolute;top:40px;left:0;width:100%;height:auto;background:#ccc;}
* ```
*
* 结构举例
* ```html
* <div class="box" tabindex="10005">
*   <input id="suggest-input" type="text" />
*   <div id="suggest-list"></div>
* </div>
* ```
*
* 脚本举例
* ```javascript
* NEJ.define([
*     'util/suggest/suggest'
* ],function(_t){
*     var _suggest = _t._$$Suggest._$allocate({
*         input:'suggest-input',
*         body:'suggest-list',
*         selected:'xuanzhong',
*         onchange:function(_value){
*             var _arr = [];
*             for(var i = 1; i < 10;i++){
*                 // 选项中设置data-value来触发选项变化时自动同步到输入框中
*                 // 默认选中第一项，只需在第一项加选中样式即可
*                 _arr.push('<p '+(i==1?'xuanzhong':'')+' data-value="'+i+'">'+i+'</p>');
*             }
*             // 输入框改变，改变select的列表内容
*             this._$update(_arr.join(''));
*         },
*         onselect:function(_value){
*             // 选择一个值的回调
*         }
*     });
* });
* ```
* @class    module:util/suggest/suggest._$$Suggest
* @extends  module:util/event._$$EventTarget
* @param    {Object}      config   - 可选配置参数
* @property {Node|String} input    - 输入框
* @property {Node|String} body     - 提示卡片节点
* @property {Boolean}     autofill - 选择时是否自动填充
* @property {String}      clazz    - 可选节点样式标识，默认为所有子节点
* @property {String}      selected - 提示项选中样式，默认为js-selected
*/
/**
* 输入内容变化触发事件
* @event  module:util/suggest/suggest._$$Suggest#onchange
* @param  {String} event - 输入框去前后空格后的内容
*/
/**
* 选中建议项触发事件
* @event  module:util/suggest/suggest._$$Suggest#onselect
* @param  {String} event - 节点的data-value值，没有则取节点的value
*/
_p._$$Suggest = _k._$klass();
_pro = _p._$$Suggest._$extend(_t0._$$EventTarget);
/**
* 控件初始化
*
* @protected
* @method module:util/suggest/suggest._$$Suggest#__init
* @return {Void}
*/
_pro.__init = function(){
this.__sopt = {
loopable:!0,
onselect:this.__onSelect._$bind(this),
onchange:this.__onSelectionChange._$bind(this)
};
this.__super();
};
/**
* 控件重置
*
* @protected
* @method module:util/suggest/suggest._$$Suggest#__reset
* @param  {Object} arg0 - 可选配置参数
* @return {Void}
*/
_pro.__reset = function(_options){
this.__super(_options);
// init node
this.__auto  = !!_options.autofill;
this.__input = _e._$get(_options.input);
this.__sopt.clazz = _options.clazz;
this.__sopt.parent = _e._$get(_options.body);
this.__sopt.selected = _options.selected||'js-selected';
// init event
this.__doInitDomEvent([[
this.__input,'input',
this.__onInput._$bind(this)
],[
this.__input,'focus',
this.__onInput._$bind(this)
],[
this.__input,'blur',
this.__onBlur._$bind(this)
]]);
// init helper
this._$visibile(!1);
this.__helper = _t1._$$SelectHelper._$allocate(this.__sopt);
};
/**
* 控件销毁
*
* @protected
* @method module:util/suggest/suggest._$$Suggest#__destroy
* @return {Void}
*/
_pro.__destroy = function(){
this.__super();
if (!!this.__helper){
this.__helper._$recycle();
delete this.__helper;
}
delete this.__xxx;
delete this.__input;
delete this.__sopt.parent;
};
/**
* 输入框失去焦点事件
* @return {Void}
*/
_pro.__onBlur = function(){
this.__onSelect({
target:this.__helper._$getSelectedNode()
});
};
/**
* 输入内容变化触发事件
*
* @protected
* @method module:util/suggest/suggest._$$Suggest#__onInput
* @return {Void}
*/
_pro.__onInput = function(){
var _value = this.__input.value.trim();
if (!_value){
this._$visibile(!1);
}else if(!this.__xxx){
this._$dispatchEvent('onchange',_value);
}
};
/**
* 更新输入框内容
*
* @protected
* @method module:util/suggest/suggest._$$Suggest#__doUpdateValue
* @param  {Object} arg0 - 值信息
* @return {Void}
*/
_pro.__doUpdateValue = function(_value){
// lock onchange for input value setting
if (!!this.__xxx){
return;
}
this.__xxx = !0;
if (!!_value&&_value!=this.__input.value){
this.__input.value = _value;
}
this.__xxx = !1;
};
/**
* 建议项选中事件
*
* @protected
* @method module:util/suggest/suggest._$$Suggest#__onSelect
* @param  {Object} arg0 - 事件信息
* @return {Void}
*/
_pro.__onSelect = function(_event){
var _value = _e._$dataset(_event.target,'value')||'';
this.__doUpdateValue(_value);
_value = _value||this.__input.value;
this._$update('');
this._$dispatchEvent('onselect',_value);
};
/**
* 建议卡片选择变化事件
*
* @protected
* @method module:util/suggest/suggest._$$Suggest#__onSelectionChange
* @param  {Object} Object 事件信息
* @return {Void}
*/
_pro.__onSelectionChange = function(_event){
if (this.__auto){
this.__doUpdateValue(
_e._$dataset(_event.target,'value')||''
);
}
};
/**
* 设置列表，用于切换列表选择卡片是否可见，不建议使用
*
* 脚本举例
* ```javascript
* // _list是节点列表
* _suggest._$setList(_list);
* ```
*
* @deprecated
* @method module:util/suggest/suggest._$$Suggest#_$setList
* @see    module:util/suggest/suggest._$$Suggest#_$visibile
* @param  {Array} arg0 - 建议项节点列表
* @return {Void}
*/
_pro._$setList = function(_list){
this._$visibile(!!_list&&_list.length>0);
};
/**
* 更新建议列表的可见性
*
* 脚本举例
* ```javascript
* // 设置选择列表可见
* _suggest._$visibile(true);
* // 设置选择列表不可见
* _suggest._$visibile(false);
* ```
*
* @method module:util/suggest/suggest._$$Suggest#_$visibile
* @param  {Boolean} arg0 - 是否可见
* @return {Void}
*/
_pro._$visibile = function(_visible){
var _visible = !_visible?'hidden':'visible';
this.__sopt.parent.style.visibility = _visible;
};
/**
* 更新可选列表
*
* 脚本举例
* ```javascript
* // 更新选择列表内容
* var _arr = [];
* for(var i=0;i<10;i++){
*     _arr.push('<div>'+i+'</div>');
* }
* _suggest._$update(_arr.join(''));
* ```
*
* @method module:util/suggest/suggest._$$Suggest#_$update
* @param  {String} arg0 - 列表HTML代码
* @return {Void}
*/
_pro._$update = function(_html){
this.__sopt.parent.innerHTML = _html||'&nbsp;';
this._$visibile(!!_html);
};
if (CMPT){
NEJ.copy(NEJ.P('nej.ut'),_p);
}
return _p;
},7,1,4,20,461);
I$(253,"<section class=\"m-layermsk\" style=\"\" r-hide={{hideMask}} on-touchmove=\"{{this.onMaskTouchMove($event)}}\"></section> <section id=\"j-winhint\" class=\"m-win m-win-oldaccout\" r-hide={{hideMask}} on-touchmove=\"{{this.onMaskTouchMove($event)}}\">     <div class=\"cont\">     \t<h3><i class=\"w-icon4 w-icon4-1\"></i>该优惠券仅限新用户领取</h3>     \t<p>{{errorDesc}}</p>     \t<a class=\"u-btn u-btn-1\" href=\"javascript:void(0);\" on-click=\"{{this.onOkBtnClick($event)}}\">我知道啦</a>     </div> </section>");
I$(250,function (_k,_ut,_v,_e,_q,_,BaseComponent,tpl,Toast){
var oldAccountWin = BaseComponent.extend({
template: tpl,
config: function(data){
_.extend(data, {
inviter: '',                 // 邀请者参数
errorDesc: '你是小考拉的老朋友啦！快打开网易考拉海购app享受更多福利吧！'
});
},
init: function (data) {
},
onMaskTouchMove : function(evt){
evt.preventDefault();
return false;
},
onOkBtnClick: function(evt){
window._dapush && window._dapush('_trackEvent', 'renlaren3', 'failed', 'confirm');
this.inviter = this.data.inviter;
this.$update({hideMask:true});
window.location.href = "/logout.html?url="+encodeURIComponent("http://m.kaola.com/one_invite_one/gift/obtain.html?inviter="+encodeURIComponent(this.inviter));
}
});
return oldAccountWin;
},1,2,3,4,87,74,23,253,25);
I$(252,"<section id=\"j-layermsk\" class=\"m-layermsk\" r-hide={{hideMask}} on-click=\"{{hideMask=true}}\" on-touchmove=\"{{this.onMaskTouchMove($event)}}\"></section> <section id=\"j-winphone\" class=\"m-win m-win-phone m-win-phone-2\" r-hide={{hideMask}} on-touchmove=\"{{this.onMaskTouchMove($event)}}\">     <i id=\"j-closebtn1\" class=\"w-icon w-icon-1\" on-click=\"{{hideMask=true}}\"></i>     <div class=\"m-form m-form-phonenum\">     \t<p class=\"tit\">现金红包将会发放到您的以下账号：<br/><strong>{{account}}</strong></p>     \t<form id=\"phoneBoundform\" action=\"\" autocomplete=\"off\" method=\"post\"> \t\t\t<div class=\"fitm\"> \t\t\t\t<input id=\"password\" class=\"u-ipt\" type=\"password\" name=\"password\" autocomplete=\"off\" data-required=\"true\" placeholder=\"请输入账号密码\"/> \t\t\t</div> \t\t\t<div class=\"fitm fitm-1\"> \t\t\t  \t<a id=\"submit2\" class=\"u-btn u-btn-1\" href=\"javascript:void(0);\" on-click=\"{{this.onSaveBtnClick($event)}}\">确认</a> \t\t\t</div> \t\t\t<input type=\"hidden\" value=\"{{account}}\" name=\"username\" id=\"username\" /> \t\t</form>     </div> </section>");
I$(249,function (_k,_ut,_v,_e,_q,_,BaseComponent,tpl,Toast,f,JSON,request){
var regExpPhone = /^1\d{10}$/;
var phoneBoundWin = BaseComponent.extend({
template: tpl,
config: function(data){
_.extend(data, {
account:''                 // 已经绑定的帐号
});
},
init: function (data) {
},
onMaskTouchMove : function(evt){
evt.preventDefault();
return false;
},
onSaveBtnClick : function(evt){
_v._$stop(evt);
this.form = f._$$WebForm._$allocate({form: _e._$get('phoneBoundform')});
this.password = _e._$get("password");
this.saveBtn = _e._$get("submit2");
//this.inviter = this.data.inviter;
this.inviter = 'qatest@163.com';
this.wrap = document.querySelector(".g-bd");
var _password = this.password.value.trim();
if(this.isLoading) return;
this.isLoading =  true;
var _hasError = false;
if(!_password){
Toast.show('请输入账号密码！');
_hasError = true;
}
if(_hasError){
this.isLoading = false;
return;
}
// dwr sending
this.doPostSaveDWR(this.form._$data());
},
doPostSaveDWR: function(data){
request('/one_invite_one/phone/check.html', {   //  ?' +_ut._$object2query(data)
type:'json',
method:'POST',
norest: true,
data: data,
onload: function(_data){
// 正常回调处理
//var _data = {"code":-30,"body":{"account": "test@163.com"}};
if(_data.code==200){
// 成功：密码输入正确，跳转到结果页面，如果检查到是已经领取过的手机号，则到结果页面显示"已领取"，否则显示“领取成功”
window.location.href = "/one_invite_one/result.html?account="+encodeURIComponent(_data.body.account)+'&hasObtained=true';
}else{
// 失败：账号或密码错误
Toast.show(_data.msg||'账号或密码错误！');
}
this.isLoading = false;
}._$bind(this),
onerror:function(_error){
// 异常处理
Toast.show('账号或密码错误，请刷新页面重试！');
this.isLoading = false;
}._$bind(this),
onbeforerequest:function(_data){
// 请求发送前，对请求数据处理
}
});
}
});
return phoneBoundWin;
},1,2,3,4,87,74,23,252,25,88,44,68);
I$(476,"<section id=\"j-layermsk\" class=\"m-layermsk\" r-hide={{hideMask}} on-click=\"{{hideMask=true}}\" on-touchmove=\"{{this.onMaskTouchMove($event)}}\"></section> <section id=\"j-winphone\" class=\"m-win m-win-phone\" r-hide={{hideMask}} on-touchmove=\"{{this.onMaskTouchMove($event)}}\">     <i id=\"j-closebtn1\" class=\"w-icon w-icon-1\" on-click=\"{{hideMask=true}}\"></i>     <div class=\"m-form m-form-phonenum\">     \t<p class=\"tit\">请输入您的手机号：</p>     \t<form id=\"phonenumform\" action=\"\" autocomplete=\"off\" method=\"post\"> \t\t\t<div class=\"fitm\"> \t\t\t\t<input id=\"phonenum\" class=\"u-ipt\" type=\"text\" name=\"phoneNum\" maxlength=\"11\" autocomplete=\"off\" data-required=\"true\" placeholder=\"请输入手机号\"/> \t\t\t</div> \t\t\t<div class=\"fitm fitm-1\"> \t\t\t  \t<a id=\"submit2\" class=\"u-btn u-btn-1\" href=\"javascript:void(0);\" on-click=\"{{this.onSaveBtnClick($event)}}\">确认</a> \t\t\t</div> \t\t</form>     </div> </section>");
I$(474,function (_k,_ut,_v,_e,_q,_,BaseComponent,tpl,Toast,f,JSON,request,oldAccount){
var regExpPhone = /^1\d{10}$/;
var phonenumWin = BaseComponent.extend({
template: tpl,
config: function(data){
_.extend(data, {
inviter:''                 // 邀请者参数
});
},
init: function (data) {
},
onMaskTouchMove : function(evt){
evt.preventDefault();
return false;
},
onSaveBtnClick : function(evt){
_v._$stop(evt);
// 统计
window._dapush && window._dapush('_trackEvent', 'renlaren2', 'phone', 'wap');
this.form = f._$$WebForm._$allocate({form: _e._$get('phonenumform')});
this.phonenum = _e._$get("phonenum");
this.saveBtn = _e._$get("submit2");
this.inviter = this.data.inviter;
this.wrap = document.querySelector(".g-bd");
var _phonenum = this.phonenum.value.trim();
if(this.isLoading) return;
this.isLoading =  true;
var _hasError = false;
if(!_phonenum){
Toast.show('请输入手机号码！');
_hasError = true;
}else if(!regExpPhone.test(_phonenum)){
Toast.show('手机号码格式错误！');
_hasError = true;
}
if(_hasError){
this.isLoading = false;
return;
}
// dwr sending
this.doPostSaveDWR(this.form._$data());
},
doPostSaveDWR: function(data){
request('/one_invite_one/phone/check.html', {   //  ?' +_ut._$object2query(data)
type:'json',
method:'POST',
norest: true,
data: data,
onload: function(_data){
// 正常回调处理
//var _data = {"code":-30,"body":{"account": "test@163.com"}};
if(_data.code==200){
// 跳转到考拉验证页面
window.location.href = "/one_invite_one/phone/verifyCode.html?account="+encodeURIComponent(_data.body.account)+'&inviter='+encodeURIComponent(this.inviter)+'&phoneNum='+this.phonenum.value.trim();
}else if (_data.code==-26){
// 跳转到URS注册页面
window.location.href = "/one_invite_one/register.html?inviter="+encodeURIComponent(this.inviter)+"&phoneNum="+this.phonenum.value.trim();
}else if (_data.code==-29){
// 如果检查到是已经领取过的手机号，到结果页面 显示"已领取"
window.location.href = "/one_invite_one/result.html?account="+encodeURIComponent(_data.body.account)+'&hasObtained=true';
}else if (_data.code==-30){
// 账号有过支付行为-> 弹窗提示
if(!this.oldAccount){
this.oldAccount = new oldAccount({data:{hideMask:false}});
this.oldAccount.$inject(this.wrap,"bottom");
}else{
this.oldAccount.$update({hideMask:false});
}
// 打开新弹层时，关闭手机弹层本身
//this.$update({hideMask:true});
}else{
//失败
Toast.show(_data.msg||'领取失败');
}
this.isLoading = false;
}._$bind(this),
onerror:function(_error){
// 异常处理
Toast.show('领取失败，请刷新页面重试！');
this.isLoading = false;
}._$bind(this),
onbeforerequest:function(_data){
// 请求发送前，对请求数据处理
}
});
}
});
return phonenumWin;
},1,2,3,4,87,74,23,476,25,88,44,68,250);
I$(254,function (_k, _ut, _v, _e, _t, request,_p, _o, _f, _r, _pro) {
/**
* 全局状态控件
* @class   {p._$$AddressCascade}
* @extends {nej.ui._$$Abstract}
*/
_p._$$AddressCascade = _k._$klass();
_pro = _p._$$AddressCascade._$extend(_t._$$EventTarget);
/**
* 重置控件
* @param  {[type]} options [description]
*
*/
_pro.__reset = function(options) {
options.parent = options.parent || document.body;
this.__super(options);
this.__province = options.province;
this.__city = options.city;
this.__district = options.district;
this.__doInitDomEvent([
[this.__province,'change',this.__onProvinceChange._$bind(this)],
[this.__city,'change',this.__onCityChange._$bind(this)]
]);
this.__isEditAddr = !!options.isEditAddr;
if(this.__isEditAddr){
this.__provinceCode = options.provindeCode;
this.__cityCode = options.cityCode;
this.__districtCode = options.districtCode;
this.__initEditSelect();
}else{
this.__initProvince();
}
};
_pro.__initSelect = function(_select,_list,_defaultSelectedIndex){
_select.options.length=1;
for(var i=0,l=_list.length;i<l;i++){
var option = new Option(_list[i].name,_list[i].code);
_select.options.add(option);
}
_select.selectedIndex = _defaultSelectedIndex||0;
};
_pro.__initEditSelect = function(){
var provinceLoad = function(_json){
if(_json.code==200){
this.__provinceList = _json.body.list;
this.__initSelect(this.__province,this.__provinceList);
this.__province.value = this.__provinceCode;
get(2,this.__provinceCode);
}
}._$bind(this)
var cityLoad = function(_json){
if(_json.code==200){
var _cityList = _json.body.list;
this.__initSelect(this.__city,_cityList);
this.__city.value = this.__cityCode;
get(3,this.__cityCode);
}
}._$bind(this)
var districtLoad = function(_json){
if(_json.code==200){
var _districtList = _json.body.list;
this.__initSelect(this.__district,_districtList);
this.__district.value = this.__districtCode;
}
}._$bind(this)
var get = function(level,code){
var param = {level:level};
if(!!code){
param.code = code;
}
request('/geography/get.html',{
method:'POST',
norest:true,
type:'json',
data:_ut._$object2query(param),
onload:[provinceLoad,cityLoad,districtLoad][level-1]
})
}
get(1);
};
_pro.__initProvince = function(){
request('/geography/get.html',{
method:'POST',
norest:true,
type:'json',
data:_ut._$object2query({level:1}),
onload:this.__cbProvinceLoad._$bind(this)
})
}
_pro.__cbProvinceLoad = function(_json){
if(_json.code==200){
this.__provinceList = _json.body.list;
this.__initSelect(this.__province,this.__provinceList);
}
}
_pro.__onProvinceChange = function(){
var _code = this.__province.value;
request('/geography/get.html',{
method:'POST',
norest:true,
type:'json',
data:_ut._$object2query({level:2,code:_code}),
onload:this.__cbCityLoad._$bind(this)
})
};
_pro.__cbCityLoad = function(_json){
if(_json.code==200){
var _cityList = _json.body.list;
this.__initSelect(this.__city,_cityList,1);
this.__onCityChange()
}
};
_pro.__onCityChange = function(){
var _code = this.__city.value;
request('/geography/get.html',{
method:'POST',
norest:true,
type:'json',
data:_ut._$object2query({level:3,code:_code}),
onload:this.__cbDistrictLoad._$bind(this)
})
};
_pro.__cbDistrictLoad = function(_json){
if(_json.code==200){
var _districtList = _json.body.list;
this.__initSelect(this.__district,_districtList);
}
};
// 验证省市区是否选择完整，返回错误提示信息
_pro._$validateAddress = function(){
var errorMsg = '';
if(this.__province.value==-1){
errorMsg = _e._$dataset(this.__province,'message');
}else if(this.__city.value==-1){
errorMsg = _e._$dataset(this.__city,'message');
}else if(this.__district.value==-1){
if(this.__district.options.length > 1){
errorMsg = _e._$dataset(this.__district,'message');
}
}
return errorMsg;
};
/**
* 控件销毁
*
*/
_pro.__destroy = function() {
this.__super();
};
return _p._$$AddressCascade;
},1,2,3,4,20,68);
I$(530,"<section class=\"m-mask {{_aniClass}}\" on-touchmove={{this.touchmove($event)}} r-hide={{hideDialog}}></section> <section class=\"m-certiDialog {{_aniClass}}\" on-touchmove={{this.touchmove($event)}} r-hide={{hideDialog}} > \t<article r-hide={{hideMain}}> \t\t<div class=\"title\">本订单商品需对收货人身份信息进行<br>认证，认证成功才可正常清关哦</div> \t\t<div class=\"userInfo\"> \t\t\t<div class=\"name\"> \t\t\t\t<p>收货人<input type=\"text\" maxlength=30 placeholder=\"请输入收货人姓名\" r-model={{name}}></p> \t\t\t\t<p class=\"errMsg\">收货人姓名必须与身份证姓名一致！</p> \t\t\t</div> \t\t\t<div class=\"idCard\"> \t\t\t\t<p>身份证<input type=\"tel\" maxlength=18 placeholder=\"填写后我们将加密处理\" r-model={{idCard}}></p> \t\t\t\t<p class=\"errMsg\" ref=\"idCard\"></p> \t\t\t</div> \t\t</div> \t\t<div class=\"operate f-cb\"> \t\t\t<p class=\"cancle f-fl\" on-click={{this.cancle($event)}}>取消</p> \t\t\t<p class=\"submit f-fl\" on-click={{this.submit($event)}}>提交认证</p> \t\t</div> \t</article> \t<article r-hide={{hidePrompt}}> \t\t<div class=\"promptText\" r-html={{promptText}}></div> \t\t<div class=\"operate f-cb\"> \t\t\t<p class=\"f-fl\" on-click={{this.validAfterPay($event)}}>付款后认证</p> \t\t\t<p class=\"retry f-fl\" on-click={{this.retry($event)}}>重试</p> \t\t</div> \t</article> \t<article r-hide={{hideNoChance}}> \t\t<div class=\"noChanceText\" r-html={{noChanceText}}></div> \t\t<div class=\"operate f-cb\"> \t\t\t<p class=\"validAfterPay f-fl\" on-click={{this.validAfterPay($event)}} r-html={{noChanceBtn}}></p> \t\t</div> \t</article> \t<article r-hide={{hideAfterPay}}> \t\t<div class=\"noChanceText\" r-html={{afterPayText}}></div> \t\t<div class=\"operate f-cb\"> \t\t\t<p class=\"validAfterPay f-fl\" on-click={{this.afterPay($event)}} r-html={{afterPayBtn}}></p> \t\t</div> \t</article> </section> ");
I$(528,function (_,_ut, BaseComponent,tpl,toast){
var CertiDialog = BaseComponent.extend({
template: tpl,
config: function(data){
this.switchInterFace("main");
},
hideDialog: function(){
this.data._aniClass = "";
this.$update();
setTimeout(function(){
this.data.hideDialog = true;
this.$update();
}._$bind(this), 200);
},
showDialog: function(name){
this.data.name = name||"";
this.data._aniClass = "show";
this.$update();
setTimeout(function(){
this.data.hideDialog = false;
this.$update();
}._$bind(this), 200);
},
switchInterFace: function(interFace){
this.hideAll();
switch(interFace){
case "main": this.data.hideMain = false;break;
case "prompt": this.data.hidePrompt = false;break;
case "noChance": this.data.hideNoChance = false;break;
case "afterPay": this.data.hideAfterPay = false;break;
}
},
hideAll:function(){
this.data.hideMain = true;
this.data.hidePrompt = true;
this.data.hideNoChance = true;
this.data.hideAfterPay = true;
},
touchmove: function(evt){
evt.preventDefault();
return false;
},
//取消
cancle: function(){
this.resetData();
this.hideDialog();
this.$update();
},
resetData: function(isRetry){
if(!isRetry){
this.data.name = "";
}
this.data.idCard = "";
this.data.nameErrMsg = "";
this.data.idCardErrMsg = "";
this.switchInterFace("main");
},
//重试
retry: function(){
this.resetData(true);
},
//付款后认证
validAfterPay: function(){
this.resetData();
this.hideDialog();
if(this.data.source==2){
return;
}
this.$emit("validAfterPay",this.data.id||"");
},
//付款后操作
afterPay: function(){
this.resetData(true);
},
//提交
submit: function(){
if(this.validate()){
var data = {
fullName:this.data.name.trim(),
idNum:this.data.idCard.trim(),
source:this.data.source
};
if(!!this.data.id){
data.id = this.data.id;
}
if(!!this.data.gorderId){
data.gorderId = this.data.gorderId;
}
this.$request("/authIdentitiy.html",{
norest: true,
data: _ut._$object2query(data),
type:'json',
method:'POST',
onload: this.__validLoad._$bind(this),
onerror: this.__validError._$bind(this)
});
}
},
__validLoad: function(_json){
if(_json.code==200){
this.hideDialog();
if(this.data.source==1){//付款前
this.$emit("validSuccess",{
id:this.data.id,
name:this.data.name.trim(),
idNum:this.data.idCard.trim()
});
toast.show("认证成功，请提交订单");
}else{//付款后
toast.show("认证成功");
setTimeout(function(){
window.location.reload();
}, 2000);
}
this.resetData();
}else{
if(this.data.source==1){//付款前
if(_json.code==2){
this.data.promptText = "姓名与身份证不一致，您可直接提交订单并选择付款后认证";
this.switchInterFace("prompt");
}else if(_json.code==601){
this.data.noChanceText = "今日认证次数已用完，您可付款后，在我的订单补充认证";
this.data.noChanceBtn = "付款后认证";
this.switchInterFace("noChance");
}else if(_json.code==208){
this.data.noChanceText = "20日8点前公安系统维护，无法认证，您可以选择付款后进行实名认证！";
this.data.noChanceBtn = "付款后认证";
this.switchInterFace("noChance");
}else{
this.data.promptText = _json.msg||"认证服务超时，您可直接提交订单并选择付款后认证";
this.switchInterFace("prompt");
}
}else{//付款后
if(_json.code==2){
this.data.afterPayText = "姓名与身份证不一致，将可能导致您的商品无法通关，请重新填写";
this.data.afterPayBtn = "重试";
this.switchInterFace("afterPay");
}else if(_json.code==601){
this.data.noChanceText = "认证错误次数过多，请次日0：00后再试";
this.data.noChanceBtn = "好";
this.switchInterFace("noChance");
}else if(_json.code==208){
this.data.noChanceText = "20日8点前公安系统维护，无法认证";
this.data.noChanceBtn = "好";
this.switchInterFace("noChance");
}else{
this.data.afterPayText = _json.msg||"认证服务超时，请重试";
this.data.afterPayBtn = "重试";
this.switchInterFace("afterPay");
}
}
}
this.$update();
},
__validError: function(){
if(this.data.source==1){//付款前
this.data.promptText = "认证服务超时，您可直接提交订单并选择付款后认证";
this.switchInterFace("prompt");
this.$update();
}else{//付款后
this.data.afterPayText = "认证服务超时，您可直接提交订单并选择付款后认证";
this.data.afterPayBtn = "重试";
this.switchInterFace("afterPay");
this.$update();
}
},
validate: function(){
var testIdNum = /(^[0-9A-Za-z*]{15}$)|(^[0-9A-Za-z*]{18}$)/;
if(!this.data.name || this.data.name.trim()==""){
// this.data.nameErrMsg = "请填写收货人姓名";
toast.show("请填写收货人姓名");
return false;
}
if(!this.data.idCard || this.data.idCard.trim()==""){
// this.data.idCardErrMsg = "请填写身份证信息";
toast.show("请填写身份证信息");
return false;
}
if(!testIdNum.test(this.data.idCard)){
// this.data.idCardErrMsg = "身份证号码格式有误，请重试";
toast.show("身份证号码格式有误，请重试");
return false;
}
return true;
}
})
return CertiDialog;
},74,2,23,530,25);
I$(322,function (_k, _t, _u, toast, _c) {
var _$$NewsAppLoginModule = _k._$klass(),
pro = _$$NewsAppLoginModule._$extend(_t._$$EventTarget);
pro.__reset = function(opts){
this.__super();
var ua = navigator.userAgent.toLowerCase();
var vers = /newsapp\/(\d+)/.exec(ua);
// 因登陆信息获取功能仅仅在4.0以上版本支持，忽略低版本
if (vers && vers.length===2 && parseFloat(vers[1])>=4 ) {
this._$isNewsApp = true;
}else{
this._$isNewsApp = false;
}
this.__userinfoScheme = 'userinfo://';
this.__loginScheme = 'login://';
};
//获取登陆信息， 如果用户已经登陆，则callback会带有一个参数
//其中info是一个字典，格式{name:"用户名",nickname:"昵称",head:"头像url",loginType:"netease"}，
//如果没有头像或是没有昵称则没有对应的key/value
//loginType字段仅在v4.0+版本客户端中支持，可能值为："netease"、"sina"、"qq"
pro._$getUserInfo = function(callback){
if (!this._$isNewsApp) { return; };
var cbName = "__newsapp_userinfo_done";
if ( !window[cbName] || !_u._$isFunction(window[cbName]) ) {
window[cbName] = function(info){
if (!!info && !!info.name) {
// 如果已经登陆了，则调用login来强制设置、更新客户端cookie
this._$login(function(LoginInfo){
_u._$isFunction(callback) && callback(LoginInfo);
}._$bind(this), true);
}else{
//如果没有登陆，则直接返回空结果
_u._$isFunction(callback) && callback();
}
window[cbName] = null;
}._$bind(this);
//通知app进行回调
location.href = this.__userinfoScheme;
// this.__createIframe(this.__userinfoScheme);
};
};
//调用网易新闻app的原生登陆界面，用户登陆后执行回调，回调参数见_$getUserInfo函数说明
//onlynetease 参数如果为true，则会屏蔽第三方登陆入口
pro._$login = function(callback, onlynetease){
if (!this._$isNewsApp) { return; };
var cbDone = "__newsapp_login_done";
// console.log('set log cb');
window[cbDone] = function (info) {
// console.log('login callback'+JSON.stringify(info));
if (!!info && !!info.name) {
//删除原有session cookie
_c._$cookie('NTES_SESS','');
_c._$cookie('S_INFO', '');
//通知服务端设置kaola.com 的 cookie
this.__createIframe(callback, info);
}else{
callback();
}
}._$bind(this);
//通知app进行回调
// this.__createIframe(this.__loginScheme+(!!onlynetease?'onlynetease':''));
// alert(this.__loginScheme+'onlynetease' );
location.href = this.__loginScheme + (!!onlynetease?'onlynetease':'');
};
pro.__createIframe = function(callback, info){
var ifr = document.createElement('iframe');
ifr.src = 'http://global.163.com/urs/crossdomain.html';
ifr.style.display = 'none';
document.body.appendChild(ifr);
ifr.onload = this.__ifrLoaded._$bind(this, callback, info);
setTimeout(function() {
document.body.removeChild(ifr);
}, 20000)
};
// 考拉cookie设置完成，触发事件
pro.__ifrLoaded = function(callback, info){
// 第三方登录的时候这个cookie写不进去
var sinfo = _c._$cookie('S_INFO');
if (sinfo) {
window.__isKaolaLogin = 1;
callback(info);
}else{
window.__isKaolaLogin = 0;
callback();
}
};
pro.__destroy = function() {
this.__super();
};
return _$$NewsAppLoginModule._$allocate();
},1,20,2,25,43);
I$(579,"<div class=\"m-coupmodal\"> \t<div class=\"close\" on-click={{this.hide()}}>X</div> \t<div class=\"b-coupbanner b-coupbanner-1\"> \t\t<h1 class=\"tit\">好手气，抢到了膨胀红包</h1> \t\t<div class=\"amount\"><span>{{amount||0}}</span></div> \t</div> \t<p class=\"txt\">别急着用！给好友派发膨胀红包，好友领取之后，你的红包将无限变大~</p> \t<div class=\"btns f-cb\"> \t\t<div class=\"b-btn b-btn-2\" on-click={{this.onShare()}}><span class=\"icn\"></span>分享让红包变大</div> \t\t<div class=\"b-btn3\" on-click={{this.onShow()}}>查看我的红包</div> \t</div> \t<div class=\"pic\"><img width=\"100%\" src=\"http://haitao.nos.netease.com/6cbc04f507b643359d935135f2a669e8.png\" /></div> </div>");
I$(577,function (_, tpl, Modal){
var couponModal = Modal.extend({
content: tpl,
config: function(data){
_.extend(data,{});
},
init: function(){
this.supr();
},
close: function(){
},
onShow: function(){
window._dapush && window._dapush("_trackEvent","合体红包","查看红包","抢到红包");
setTimeout(function(){
location.href = '/newyear/before/seedredenvelope.html';
},500)
},
onShare: function(){
window._dapush && window._dapush("_trackEvent","合体红包","分享","抢到红包");
this.$emit('onShare');
}
});
return couponModal;
},74,579,202);
I$(376,"<div class=\"filter\" on-touchstart={{this.onFilterClick($event)}}>筛选</div> <ul class=\"type f-cb\"> \t<li on-touchstart={{this.onTypeChange($event,0)}}><a href=\"javascript:void(0);\" {{#if sortType==0}}class=\"current {{desc==1?'down':''}}\"{{/if}}>人气 </a></li> \t<li on-touchstart={{this.onTypeChange($event,4)}}><a href=\"javascript:void(0);\" {{#if sortType==4}}class=\"current \"{{/if}}>价格 {{#if sortType==4}}<span class=\"{{desc==1?'u-arrowdown':'u-arrowup'}}\"></span>{{#else}}<span class=\"u-arrow\"></span>{{/if}}</a></li> \t<li on-touchstart={{this.onTypeChange($event,2)}} ref=\"filter\"><a href=\"javascript:void(0);\" {{#if sortType==2}}class=\"current {{desc==1?'down':''}}\"{{/if}}>销量 </a></li> </ul> {{#if show}} <div ref=\"brandCard\" {{#if show}}class=\"m-brandCard cardshow\" {{#else}}class=\"m-brandCard\"{{/if}} style=\"height:{{height}};top:{{top||0}}px\"   on-click={{this.hideBrandCard()}}> <ul> \t<li {{#if !brandId}}class=\"current\"{{/if}}><span class=\"u-brandchecked check\">&nbsp;</span><span  on-tap={{this.onBrandClick($event)}} class=\"allbrand\">{{allText||'全部品牌'}}</span></li> \t{{#list list as item}} \t\t<li {{#if brandId==item.id}}class=\"current\"{{/if}} on-tap={{this.onBrandClick($event,item)}}>{{item.name}}<span class=\"u-brandchecked check\">&nbsp;</span></li> \t{{/list}} </ul> </div> <div class=\"m-brandcardmask \"  on-touchstart={{this.hideBrandCard($event)}} ref=\"brandMask\" {{#if show}}style=\"display:block;top:{{(top+1)||0}}px\"{{#else}}style=\"display:none\"{{/if}}> \t<div class=\"mask\"  ></div> </div> {{/if}} ");
I$(373,function (_,_ut,_v,_e, BaseComponent,tpl,toast,IScroll){
var SearchBar = BaseComponent.extend({
template: tpl,
data:{
sortType:0,
desc:0,
brandId:'',
list:[],
height:0
},
onFilterClick: function (_event) {
_v._$stop(_event);
var target = this.$refs['filter'].parentNode.parentNode;
_e._$addClassName(this.parentNode,'m-searchbar-1');
var y = target.clientHeight +1;
this.data.height = (document.body.clientHeight-y-120)+'px';
this.data.top = y;
this.data.show = !this.data.show;
if(!this.data.show){
this.hideBrandCard();
} else{
setTimeout(function(){
this.__maskScroll = new IScroll(this.$refs.brandMask,{hScroll:false,vScroll:false});
this.__iscroll = new IScroll(this.$refs.brandCard,{tap:true});
}._$bind(this),50)
}
},
hideBrandCard:function(_event){
if(_event){
_v._$stop(_event.event);
}
this.data.show = false;
this.data.height = '0';
this.$emit('resetbarcard');
if(!!this.__iscroll){
this.__iscroll.destroy();
this.__maskScroll.destroy();
}
},
destroy:function(){
if(!!this.__iscroll){
this.__iscroll.destroy();
this.__maskScroll.destroy();
}
this.supr();
},
onTypeChange: function (_event,sortType) {
_v._$stop(_event);
if(sortType==4){
if(this.data.sortType==4){
this.data.desc = (!this.data.desc?1:0);
} else{
this.data.desc = 0;
}
this.data.sortType = sortType;
} else{
if(this.data.sortType==sortType){
return
} else{
this.data.sortType = sortType;
this.data.desc = 1;
}
}
this.hideBrandCard();
this.$emit('typechange',{sortType:this.data.sortType,desc:this.data.desc,changeContent:this.data.sortType});
},
resetFilterData:function(){
this.data.sortType=0;
this.data.type=0;
this.data.desc=0;
},
onBrandClick:function(event,item){
_v._$stop(event.event);
var target  = event.target;
var offset = _e._$offset(target);
var brandCard = this.$refs['brandCard'];
//alert(offset.y+this.__iscroll.y);
if((offset.y+this.__iscroll.y)> parseInt(this.data.height)){
this.hideBrandCard();
return;
}
var id,name;
if(item){
if(item.id!=this.data.brandId){
if(item){
id = this.data.brandId = item.id;
name = item.name;
}
} else{
this.hideBrandCard();
return;
}
} else{
id = this.data.brandId ='';
name='全部';
}
this.$emit('typechange',{sortType:this.data.sortType,desc:this.data.desc,brandId:id,brandName:name,changeContent:''});
this.hideBrandCard();
}
});
//单例
return SearchBar;
},74,2,3,4,23,376,25,129);
I$(281,function (){
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&ha(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==ka?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ia.length;){if(c=ia[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return qa++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:ta?M:ua?P:sa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Aa&&d-e===0,g=b&(Ca|Da)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=na(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=ma(j.x)>ma(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===Aa||f.eventType===Ca)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Da&&(i>za||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=ma(l.x)>ma(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:la(a.pointers[c].clientX),clientY:la(a.pointers[c].clientY)},c++;return{timeStamp:na(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:la(a[0].clientX),y:la(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:la(c/b),y:la(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ea:ma(a)>=ma(b)?0>a?Fa:Ga:0>b?Ha:Ia}function H(a,b,c){c||(c=Ma);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Ma);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Na)+I(a[1],a[0],Na)}function K(a,b){return H(b[0],b[1],Na)/H(a[0],a[1],Na)}function L(){this.evEl=Pa,this.evWin=Qa,this.allow=!0,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Ta,this.evWin=Ua,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=Wa,this.evWin=Xa,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ca|Da)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=Za,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Aa|Ba)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Aa)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ca|Da)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a)}function S(a,b){this.manager=a,this.set(b)}function T(a){if(p(a,db))return db;var b=p(a,eb),c=p(a,fb);return b&&c?db:b||c?b?eb:fb:p(a,cb)?cb:bb}function U(a){this.options=ha({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=gb,this.simultaneous={},this.requireFail=[]}function V(a){return a&lb?"cancel":a&jb?"end":a&ib?"move":a&hb?"start":""}function W(a){return a==Ia?"down":a==Ha?"up":a==Fa?"left":a==Ga?"right":""}function X(a,b){var c=b.manager;return c?c.get(a):a}function Y(){U.apply(this,arguments)}function Z(){Y.apply(this,arguments),this.pX=null,this.pY=null}function $(){Y.apply(this,arguments)}function _(){U.apply(this,arguments),this._timer=null,this._input=null}function aa(){Y.apply(this,arguments)}function ba(){Y.apply(this,arguments)}function ca(){U.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function da(a,b){return b=b||{},b.recognizers=l(b.recognizers,da.defaults.preset),new ea(a,b)}function ea(a,b){this.options=ha({},da.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=y(this),this.touchAction=new S(this,this.options.touchAction),fa(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function fa(a,b){var c=a.element;c.style&&g(a.options.cssProps,function(a,d){c.style[u(c.style,d)]=b?a:""})}function ga(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ha,ia=["","webkit","Moz","MS","ms","o"],ja=b.createElement("div"),ka="function",la=Math.round,ma=Math.abs,na=Date.now;ha="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var oa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),pa=h(function(a,b){return oa(a,b,!0)},"merge","Use `assign`."),qa=1,ra=/mobile|tablet|ip(ad|hone|od)|android/i,sa="ontouchstart"in a,ta=u(a,"PointerEvent")!==d,ua=sa&&ra.test(navigator.userAgent),va="touch",wa="pen",xa="mouse",ya="kinect",za=25,Aa=1,Ba=2,Ca=4,Da=8,Ea=1,Fa=2,Ga=4,Ha=8,Ia=16,Ja=Fa|Ga,Ka=Ha|Ia,La=Ja|Ka,Ma=["x","y"],Na=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Oa={mousedown:Aa,mousemove:Ba,mouseup:Ca},Pa="mousedown",Qa="mousemove mouseup";i(L,x,{handler:function(a){var b=Oa[a.type];b&Aa&&0===a.button&&(this.pressed=!0),b&Ba&&1!==a.which&&(b=Ca),this.pressed&&this.allow&&(b&Ca&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:xa,srcEvent:a}))}});var Ra={pointerdown:Aa,pointermove:Ba,pointerup:Ca,pointercancel:Da,pointerout:Da},Sa={2:va,3:wa,4:xa,5:ya},Ta="pointerdown",Ua="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Ta="MSPointerDown",Ua="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Ra[d],f=Sa[a.pointerType]||a.pointerType,g=f==va,h=r(b,a.pointerId,"pointerId");e&Aa&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ca|Da)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Va={touchstart:Aa,touchmove:Ba,touchend:Ca,touchcancel:Da},Wa="touchstart",Xa="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Va[a.type];if(b===Aa&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ca|Da)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:va,srcEvent:a})}}});var Ya={touchstart:Aa,touchmove:Ba,touchend:Ca,touchcancel:Da},Za="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=Ya[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:va,srcEvent:a})}}),i(R,x,{handler:function(a,b,c){var d=c.pointerType==va,e=c.pointerType==xa;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ca|Da)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var $a=u(ja.style,"touchAction"),_a=$a!==d,ab="compute",bb="auto",cb="manipulation",db="none",eb="pan-x",fb="pan-y";S.prototype={set:function(a){a==ab&&(a=this.compute()),_a&&this.manager.element.style&&(this.manager.element.style[$a]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),T(a.join(" "))},preventDefaults:function(a){if(!_a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,db),f=p(d,fb),g=p(d,eb);if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}if(!g||!f)return e||f&&c&Ja||g&&c&Ka?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var gb=1,hb=2,ib=4,jb=8,kb=jb,lb=16,mb=32;U.prototype={defaults:{},set:function(a){return ha(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=X(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=X(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=X(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=X(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;jb>d&&b(c.options.event+V(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=jb&&b(c.options.event+V(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=mb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(mb|gb)))return!1;a++}return!0},recognize:function(a){var b=ha({},a);return k(this.options.enable,[this,b])?(this.state&(kb|lb|mb)&&(this.state=gb),this.state=this.process(b),void(this.state&(hb|ib|jb|lb)&&this.tryEmit(b))):(this.reset(),void(this.state=mb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(Y,U,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(hb|ib),e=this.attrTest(a);return d&&(c&Da||!e)?b|lb:d||e?c&Ca?b|jb:b&hb?b|ib:hb:mb}}),i(Z,Y,{defaults:{event:"pan",threshold:10,pointers:1,direction:La},getTouchAction:function(){var a=this.options.direction,b=[];return a&Ja&&b.push(fb),a&Ka&&b.push(eb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Ja?(e=0===f?Ea:0>f?Fa:Ga,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ea:0>g?Ha:Ia,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Y.prototype.attrTest.call(this,a)&&(this.state&hb||!(this.state&hb)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=W(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i($,Y,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[db]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&hb)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(_,U,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[bb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ca|Da)&&!f)this.reset();else if(a.eventType&Aa)this.reset(),this._timer=e(function(){this.state=kb,this.tryEmit()},b.time,this);else if(a.eventType&Ca)return kb;return mb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===kb&&(a&&a.eventType&Ca?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=na(),this.manager.emit(this.options.event,this._input)))}}),i(aa,Y,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[db]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&hb)}}),i(ba,Y,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Ja|Ka,pointers:1},getTouchAction:function(){return Z.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Ja|Ka)?b=a.overallVelocity:c&Ja?b=a.overallVelocityX:c&Ka&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&ma(b)>this.options.velocity&&a.eventType&Ca},emit:function(a){var b=W(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ca,U,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[cb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Aa&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ca)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=kb,this.tryEmit()},b.interval,this),hb):kb}return mb},failTimeout:function(){return this._timer=e(function(){this.state=mb},this.options.interval,this),mb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==kb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),da.VERSION="2.0.6",da.defaults={domEvents:!1,touchAction:ab,enable:!0,inputTarget:null,inputClass:null,preset:[[aa,{enable:!1}],[$,{enable:!1},["rotate"]],[ba,{direction:Ja}],[Z,{direction:Ja},["swipe"]],[ca],[ca,{event:"doubletap",taps:2},["tap"]],[_]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var nb=1,ob=2;ea.prototype={set:function(a){return ha(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?ob:nb},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&kb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===ob||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(hb|ib|jb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof U)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&ga(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&fa(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},ha(da,{INPUT_START:Aa,INPUT_MOVE:Ba,INPUT_END:Ca,INPUT_CANCEL:Da,STATE_POSSIBLE:gb,STATE_BEGAN:hb,STATE_CHANGED:ib,STATE_ENDED:jb,STATE_RECOGNIZED:kb,STATE_CANCELLED:lb,STATE_FAILED:mb,DIRECTION_NONE:Ea,DIRECTION_LEFT:Fa,DIRECTION_RIGHT:Ga,DIRECTION_UP:Ha,DIRECTION_DOWN:Ia,DIRECTION_HORIZONTAL:Ja,DIRECTION_VERTICAL:Ka,DIRECTION_ALL:La,Manager:ea,Input:x,TouchAction:S,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:U,AttrRecognizer:Y,Tap:ca,Pan:Z,Swipe:ba,Pinch:$,Rotate:aa,Press:_,on:m,off:n,each:g,merge:pa,extend:oa,assign:ha,inherit:i,bindFn:j,prefixed:u});var pb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};pb.Hammer=da,"function"==typeof define&&define.amd?define(function(){return da}):"undefined"!=typeof module&&module.exports?module.exports=da:a[c]=da}(window,document,"Hammer");
return Hammer;
});
I$(609,"<section class=\"m-mask\" r-hide={{hideMask}} on-click=\"{{hideMask=true}}\" on-touchmove=\"{{this.onMaskTouchMove($event)}}\"></section> <section class=\"m-ruledetail\" r-hide={{hideMask}} on-touchmove=\"{{this.onRuleTouchMove($event)}}\">   <div class=\"title\">活动规则</div>   <span class=\"closeBtn\" on-click=\"{{hideMask=true}}\"></span>   <div class=\"contentWrap\" ref=\"contentWrap\">   <div class=\"content\">     <p>活动时间：</p>     <div>12月9日10:00—12月16日10:00</div>     <!-- <p class=\"rewards\">揭榜时间：</p>     <div>11月10日16:00</div> -->     <p class=\"rewards\">活动规则</p>     <ul>       <li><b>1.&nbsp;</b>上传一张本人最时尚的照片，送10元无门槛优惠券；</li>       <li><b>2.&nbsp;</b>助威数满10个，送20元无门槛优惠券；</li>       <li><b>3.&nbsp;</b>活动结束后，助威数最多的前10名用户中：</li>       <li><b>a)&nbsp;</b>助威数最高的用户可以获得日本双人行名额；</li>       <li><b>b)&nbsp;</b>除助威数最高的用户之外，第2-10名皆可获得价值1000元的考拉购物基金。</li>       <!-- <li><b>人气奖：</b>助威数最多的前10名人气宝宝送价值1000元的考拉福袋；</li>       <li><b>幸运奖：</b>抽取20名，获得200元的考拉福袋；</li> -->       <!-- <dl>         <dd><b>一等奖1名：</b>获得全年尿不湿(24包)；</dd>         <dd><b>二等奖3名：</b>获得半年尿不湿(12包)；</dd>         <dd><b>三等奖6名：</b>获得4包尿不湿。</dd>       </dl> -->     </ul>     <!-- <p class=\"prize\">实物奖品说明</p>     <ul>       <li><b>人气奖：</b>助威数最多的前10名设计师宝宝送价值1000元的考拉福袋；</li>       <li><b>幸运奖：</b>抽取20名，获得200元的考拉福袋；</li>     </ul> -->     <!-- <p class=\"rewards\">福袋奖品说明</p>     <div>活动结束后：助威数最多的前五名，获得1000元的考拉福袋；助威数最多的第六到十名，获得500元考拉福袋。</div>     <p class=\"rewards\">晒什么送什么奖品说明</p>     <div>小考拉将从所有参与者选出5名脑洞最大的最佳创意炫富，获得网易考拉创意大富翁称号，奖品为所晒物品！（创意炫富奖品举例：你画一个手表出来，小考拉送你一个真实的手表！）<br><b>温馨提示：晒什么送什么奖品总价值上限为5000元；</b></div> -->     <p class=\"intro\">活动说明</p>     <ul>       <li><b>1.&nbsp;</b>用户需要下载网易考拉海购APP，在晒图页面上传本人照片；</li>       <li><b>2.&nbsp;</b>为了保证图片质量，上传的照片如果不符合要求，将会被清除；</li>       <li><b>3.&nbsp;</b>用户中途更换照片，助威数将清零；</li>       <li><b>4.&nbsp;</b>优惠券由系统自动派发，请在我的考拉—我的优惠券查看；</li>       <li><b>5.&nbsp;</b>优惠券不可与其他优惠券叠加使用；</li>       <li><b>6.&nbsp;</b>优惠券有效期：2015年12月12日00:00:00-2015年12月31日23:59:59，逾期作废；</li>       <li><b>7.&nbsp;</b>考拉消费基金将以优惠券形式发放；</li>       <li><b>8.&nbsp;</b>通过任何不正当行为的刷票，考拉有权直接取消所有奖品；</li>       <li><b>9.&nbsp;</b>活动结束后，考拉会对助威数进行统计并揭晓中奖名单，并在10个工作日内联系获奖用户安排奖品发放；</li>       <li><b>10.&nbsp;</b>日本具体行程有可能微调，以最后确定行程为准。</li>     </ul>   </div>   </div> </section>");
I$(605,function (_,_ut, BaseComponent,tpl,toast,iscroll){
var rule = BaseComponent.extend({
template: tpl,
config: function(data){
// _.extend(data,{
//  address:'',
//  couponId:window['couponId']
// });
},
init: function (data) {
// this.$watch("hideMask",function(newValue){
//   if(newValue == false){
//     this.forbidBodyScroll();
//   }else{
//     this.allowBodyScroll();
//   }
// }._$bind(this));
// this.forbidBodyScroll();
setTimeout(function(){
this.__iscroll = new iscroll(this.$refs.contentWrap, {tap: true});
}._$bind(this), 0);
},
// allowBodyScroll : function(){
//   document.body.style.overflow = "auto";
// },
// forbidBodyScroll : function(){
//   document.body.style.overflow = "hidden";
// },
onMaskTouchMove : function(evt){
evt.preventDefault();
// evt.stopPropagation();
// evt.event.stopPropagation();
return false;
},
onRuleTouchMove : function(evt){
// evt.stopPropagation();
// evt.event.stopPropagation();
}
});
return rule;
},74,2,23,609,25,129);
I$(610,"<section class=\"m-mask\" r-hide={{hideMask}} on-click=\"{{hideMask=true}}\" on-touchmove=\"{{this.onMaskTouchMove($event)}}\"></section> <section class=\"m-oldversion\" r-hide={{hideMask}} on-touchmove=\"{{this.onMaskTouchMove($event)}}\"> \t<div r-hide={{!isApp}}>   \t\t<div class=\"title\">啊哦，您当前版本过低！</div>   \t\t<div class=\"refer\">去应用市场更新最新网易考拉海购，参加晒娃赢全年尿不湿吧！</div>   \t\t<div class=\"btn\" on-click={{this.iKnow($event)}}>我知道啦</div>   \t\t<span class=\"closeBtn\" on-click=\"{{hideMask=true}}\"></span> \t</div> \t<div r-hide={{isApp}}>   \t\t<div class=\"titleNotApp\">下载网易考拉海购APP参加</div>   \t\t<div class=\"actName\"><b>晒娃赢全年尿不湿</b>吧！</div>   \t\t<div class=\"downloadBtn\" on-click={{this.downloadApp($event)}}>立即去下载</div>       <div class=\"mainPage\" r-hide={{!isIndex}}>         <a href=\"http://m.kaola.com/activity/h5/3830.html\">去主会场逛逛&nbsp;&gt;</a>       </div>       <span class=\"closeBtn\" on-click=\"{{hideMask=true}}\"></span> \t</div> </section>");
I$(606,function (_,_ut, BaseComponent,tpl,toast){
var oldVersion = BaseComponent.extend({
template: tpl,
config: function(data){
// _.extend(data,{
//  address:'',
//  couponId:window['couponId']
// });
},
init: function (data) {
},
onMaskTouchMove : function(evt){
evt.preventDefault();
return false;
},
iKnow : function(){
this.data.hideMask = true;
window['_gaq'].push(['_trackEvent', '晒娃落地页', '我知道了']);
},
downloadApp : function(){
window['_gaq'].push(['_trackEvent', '晒娃落地页', '去下载']);
if(!!window.navigator.userAgent.match(/(iPhone|iPod|iPad)/i)){
window.location.href = "http://www.kaola.com/mobile/download.html";
}else{
window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.kaola";
}
}
});
return oldVersion;
},74,2,23,610,25);
I$(608,"<section class=\"m-mask m-bigimageMask\" r-hide={{hideMask}} on-click={{this.hideBigImg($event)}} on-touchmove=\"{{this.onMaskTouchMove($event)}}\"> \t<img class=\"m-bigimage\" src=\"{{imgUrl}}\" style=\"{{imgStyle}}\" r-hide={{hideMask}} on-touchstart={{this.moveStart($event)}} on-touchmove={{this.imgMove($event)}} on-touchend={{this.moveEnd($event)}} > </section>  ");
I$(604,function (_,_ut, BaseComponent,tpl,toast){
var bigImage = BaseComponent.extend({
template: tpl,
config: function(data){
this.data.hideMask = true;
},
/**
* 配置放大图片的参数
* @param  {String} imgUrl 图片url
* @param  {String|Number} imgWidth 图片宽
* @param  {String|Number} imgHeight 图片高
* @param  {Object} imageView nos配置 默认{width:640,height:0,quality:90}
* @param  {Bealoon} allowHorizontal 是否允许横向拖动，默认false
* @return {Null}
*/
configImage:function(options){
// if(!options.imgUrl){return;}
var imgWidth = document.body.clientWidth,
imgHeight = Math.round(imgWidth*(+options.imgHeight||1)/(+options.imgWidth||1)),
left = "0px",
marginTop = -imgHeight/2 + "px",
width = imgWidth + "px",
height = imgHeight + "px";
//是否允许横向滚动
this.data.allowHorizontal = options.allowHorizontal || false;
//拼接大图url
this.makeBigImgUrl(options);
//重置图片宿主样式
this.resetImgHost(left,marginTop,width,height);
//显示蒙层，触发大图相关事件
this.$update({hideMask:false,bigImage:true});
},
makeBigImgUrl: function(options){
var imgViewStr = "";
if(options.imgUrl.indexOf("haitao.nos")!=-1){
if(options.imageView){
imgViewStr = "?imageView&thumbnail="
+ (options.imageView.width+"" || this.data.defImgViewW) + "x"
+ (options.imageView.height || this.data.defImgViewH) + "&quality="
+ (options.imageView.quality || this.data.defImgViewQ) + "&";
}else{
imgViewStr = "?imageView&thumbnail="+this.data.defImgViewW+"x"+this.data.defImgViewH+"&quality="+this.data.defImgViewQ+"&";
}
}
this.data.imgUrl = options.imgUrl.split("?")[0]+imgViewStr;
},
resetImgHost: function(l,mt,w,h){
this.getImgHost().setAttribute("style","left:"+l+";margin-top:"+mt+";width:"+w+";height:"+h+";");
},
//获取宿主img节点
getImgHost: function(){
if(!this.imgHost){
this.imgHost = document.querySelector(".m-bigimage");
}
return this.imgHost;
},
init: function () {
//nos默认配置
this.defaultNos();
//监听浏览器后退事件
this.historyEvent();
//放大时添加浏览记录
this.initBigImage();
},
defaultNos: function(){
this.data.defImgViewW = 640;//nos配置 默认宽
this.data.defImgViewH = 0;//nos配置 默认高自适应
this.data.defImgViewQ = 90;//nos配置 默认质量
},
historyEvent: function(){
window.addEventListener('popstate', function(e){
this.$update({hideMask:true,bigImage:false});
}._$bind(this), false);
},
initBigImage: function(){
this.$watch("bigImage",function(newValue){
if(newValue===true){
window.history.pushState({},"","");
}
});
},
hideBigImg : function(){
window.history.back();
},
onMaskTouchMove : function(evt){
evt.preventDefault();
return false;
},
//图片拖动
moveStart : function(evt){
if(this.data.allowHorizontal){
this.data.imgStartX = evt.event.touches[0].pageX;
this.data.imgStartL = +(evt.target.style.left || "0px").slice(0,-2);
}
this.data.imgStartY = evt.event.touches[0].pageY;
this.data.imgStartMT = +(evt.target.style.marginTop || "0px").slice(0,-2);
},
imgMove : function(evt){
if(this.data.allowHorizontal){
evt.target.style.left = this.data.imgStartL + evt.event.touches[0].pageX - this.data.imgStartX + "px";
}
evt.target.style.marginTop = this.data.imgStartMT + evt.event.touches[0].pageY - this.data.imgStartY + "px";
},
moveEnd : function(evt){
}
});
return bigImage;
},74,2,23,608,25);
I$(618,"<section class=\"m-mask\" r-hide={{hideMask}} on-click=\"{{hideMask=true}}\" on-touchmove=\"{{this.onMaskTouchMove($event)}}\"></section> <section class=\"m-reupload\" r-hide={{hideMask}} on-touchmove=\"{{this.onMaskTouchMove($event)}}\"> \t<div class=\"title\">&nbsp;&nbsp;确定要重新上传吗？</div>   \t<div class=\"refer\">重新上传后将删除原照片并将助威数清零哦！</div>   \t<div class=\"btnWrap f-cb\">   \t\t<span class=\"confirm f-fl\" on-click={{this.reUpload($event)}}>确定</span>       \t<span class=\"cancle f-fr\" on-click=\"{{hideMask=true}}\">取消</span>       </div>   \t<span class=\"closeBtn\" on-click={{hideMask=true}}></span> </section>");
I$(614,function (_,_ut,_,BaseComponent,tpl,toast){
var reUpload = BaseComponent.extend({
template: tpl,
config: function(data){
// _.extend(data,{
//  address:'',
//  couponId:window['couponId']
// });
},
init: function (data) {
},
reUpload: function(){
this.data.hideMask = true;
this.data.cb();
// _.exec({method:"uploadBabyInfo"});
},
onMaskTouchMove : function(evt){
evt.preventDefault();
return false;
}
});
return reUpload;
},74,2,74,23,618,25);
I$(672,"{{#if showArr.length}} <ul class=\"j-marquee-wrap {{className||''}}\" ref=\"box\">   {{#list showArr as item}}   <li class=\"j-marquee-item f-toe {{item.className||''}}\">{{#include this.content}}</li>   {{/list}} </ul> {{#else}} <div class=\"j-marquee-empty \">   暂无数据 </div> {{/if}} ");
I$(669,function (_t, _, BaseComponent, body) {
/**
* 控件基类，主要实现以下功能：
* * 根据总的信息集合 完成信息展示及轮播滚动
*
*  设计思路：
*  根据设定要展示信息的条数showLength及要单次滚动的条数offset维护一个长度为showLength+offset的showArr列表
*  showArr每次变化会触发一次滚动动画 showArr属性与队列一致  进offset个 出offset个 总长度不变 定时更新showArr便会有信息滚动的效果
*
* ```html
*    <div id="marquee" style="position:relative;"></div>
* ```
* ```javascript
*   NEJ.define([
*      'pro/components/lottery/marquee'
*   ],function(Marquee){
*       // 定义控件类
*      self.marquee = new Marquee({
*           array: [1,2,3,4,5],
*           content: "{item}",
*           data: {
*               scale: 10,                          // 单条滚动距离
*               showLength: 2,                      // 可视条数
*               offset: 1                           // 单次滚动条数
*           }
*       }).$inject(document.getElementById("marquee"));
* ```
* 效果如下
* ```html
*    <div id="marquee" style="position:relative;">
*      <ul>
*          <li>1</li>
*          <li>2</li>
*          <li>3</li>
*      </ul>
*   *    </div>
* ```
* 用户现在会看到1和2 -> 3滚动上来 -> 1被顶上去 滚动距离10px
*/
return BaseComponent.extend({
name: 'marquee',
template: body,
config: function (data) {
_.extend(data, {
_index: 0,                                          // 标记目标数组
scale: 20,                                          // 单次滚动距离
unit: 'px',                                         // 单次滚动距离单位
showArr: [],                                        // 滚动内容集合
className: '',                                      // 滚动区域自定义class
showLength: 5,                                      // 单次可视条数
offset: 2,                                          // 单次滚动条数
time: 3000,                                         // 单次滚动时间间隔
duration: 800                                       // 单次滚动动画持续时间
});
// 避免脏检查源数组(可能会有几千条 触发脏检查会影响组价效率) 单独赋值
if (!this.content) throw new Error('必须有滚动节点结构！');
if (!Array.isArray(this.array)) throw new Error('必须有源数据！');
this._copy = _.clone(this.array);
// 设置滚动数据
var data = this.data;
// 需要加载的条数 为showLength+offset
data.length = data.showLength + data.offset;
// 数据简单验证
if (data.offset < 1) throw new Error('请至少滚动1条！');
if (data.duration >= data.time) throw new Error('动画持续时间请小于滚动间隔时间！');
if (this.array.length < data.length) {
this.noScroll = true;
console.log('marquee：列表长度小于展示条数，已停止滚动效果！');
return false;
}
// showArr展示集合初始化
for (var i = 0; i < data.length; i++) {
data._index++;
data.showArr[i] = this.array[i];
}
// 触发滚动效果
this.$watch('showArr', function (now, old) {
if (this.noScroll) return;
var data = this.data, _box = this.$refs.box;
// 设置动画
_box.style.top = 0;
var _EaseInOut = _t._$$AnimEaseInOut._$allocate({
from: {offset: 0},
to: {offset: data.offset * data.scale},
duration: data.duration,
onupdate: function (_event) {
_box.style.top = -_event.offset + data.unit;
},
onstop: function () {
this._$recycle();
}
});
// 开始动画
_EaseInOut._$play();
});
},
init: function () {
// 开始滚动
if (!this.noScroll) setInterval(this.setShowArr._$bind(this), this.data.time);
},
// 重置滚动源数组
resetArray: function () {
this.array = _.clone(this._copy);
},
// 滚动过程中 插入最新一条数据
addItem: function (item) {
this.array.splice(this.data._index, 0, item);
},
// 更行滚动内容
setShowArr: function () {
var data = this.data;
data.showArr.splice(0, data.offset);
for (var i = 0; i < data.offset; i++) {
if (data._index - this.array.length >= 0) {
data._index = 0;
this.$emit('top');
}
data.showArr.push(this.array[data._index]);
data._index++;
}
this.$emit('roll', data._index);
this.$update();
}
});
},136,74,23,672);
I$(670,function (e) {
/**
* 控件基类，主要实现以下功能：
* * 根据用户配置 完成大转盘元素位置属性计算
*   结构举例
*   根据已知列数行数生成 (列数+行数-2)×2个单元格 并返回中间空白区域 btn
*
* ```html
*    <div id="turnplateCnt" style="position:relative;width:454px;height:334px"></div>
* ```
*   width: 454, height: 334, row:3, column:4  控件会计算好各元素的位置及样式信息 并生成绝对定位元素填充给定长宽且顺序如下
*   \----454px-----\   -
*    1 | 2 | 3 | 4     |
*   ----------------  334px
*   10 |  btn  | 5     |
*   ________________   |
*    9 | 8 | 7 | 6     _
* ```javascript
*   NEJ.define([
*      'lib/base/event',
*      'pro/components/lottery/turnplate'
*   ],function(v, Turnplate){
*       // 第一步
*       // 定义控件类
*       var turnplate = new Turnplate({
*           row: 3,                                             // 行数
*           column: 4,                                          // 列数
*           margin: 2,                                          // 间隙
*           width: 454,                                         // 容器宽度
*           height: 334                                         // 容器高度
*       });
*       // 设置动画效果
*       turnplate.$setAnimate({
*           speed: 2,                                           // 抽奖转动速度(默认为5) 越大越慢
*           noReset: true,                                      // 后续抽奖不从第一个开始
*           endCycle: 3,                                        // 转动圈数
*           slow: 4                                             // 停止转动前 转动到第slow个开始减速(默认值为3)
*       });
*       // 使用绝对定位生成的位置信息
*       turnplate.$setBox(data.prizes).$inject(turnplateCnt);
*
*       // 第二步
*       // 自定义中间btn
*       turnplate.btn.innerHTML = '开始游戏';
*
*       // 第三步
*       // 开始游戏
*       v._$addEvent(turnplate.btn, 'click', function (_event) {
*          v._$stop(_event);
*          self.turnplate.$play({
*              index: 1,                                       // 起始位置
*              EndIndex: 6                                     // 停住的位置
*           });
*        }, false);
* ```
*  当用户点击开始按钮 转盘将开始转动 并停留在位置6
*
*    1 | 2 | 3 | 4
*   ----------------
*   10 |  btn  | 5
*   ________________
*    9 | 8 | 7 |[6]
*
*/
function Turnplate(config) {
this.time = 0;                                                          // 标记抽奖次数
this.length = 0;                                                        // 标记奖品数
this.config = config;                                                   // 配置
this.lastIndex = 0;                                                     // 标记上次抽奖停止位置
this.animate = {};                                                      // 转动效果配置
this.posArr = [];                                                       // 奖池位置数据 供使用者自己渲染新的模型
this.container = document.createDocumentFragment();                     // 标记容器
this._setPosArr();
this._bindEvent(this);
}
var tp = Turnplate.prototype;
// 自定义事件
tp._bindEvent = function (context) {
if (!context) return;
// Handles custom event
context.$on = function (event, fn) {
if (typeof event === 'object') {
var _on = arguments.callee;
for (var key in event) {
if (event.hasOwnProperty(key)) _on(key, event[key]);
}
} else {
var _handles = context._handles || (context._handles = {}),
_calls = _handles[event] || (_handles[event] = []);
_calls.push(fn);
}
return context;
};
// Relieve custom event
context.$off = function (event, fn) {
if (!context._handles) return;
if (!event) context._handles = {};
var _handles = context._handles, _calls;
if (_calls = _handles[event]) {
if (!fn) {
_handles[event] = [];
return context;
}
for (var i = 0, l = _calls.length; i < l; i++) {
if (fn === _calls[i]) {
_calls.splice(i, 1);
return context;
}
}
}
return context;
};
// Trigger custom events
context.$emit = function (event) {
var handles = context._handles, calls, args, type;
if (!event) return;
if (typeof event === "object") {
type = event.type;
args = event.data || [];
} else {
args = Array.prototype.slice.call(arguments);
type = event;
}
if (!handles || !(calls = handles[type])) return context;
for (var i = 0, len = calls.length; i < len; i++) {
calls[i].apply(context, args)
}
return context;
}
};
// 设定抽奖区域位置信息
tp._setPosArr = function () {
/* 基本属性计算
---------------------------------------------------------------------- */
var config = this.config;
var row = config.row;                                                   // 行数
var column = config.column;                                             // 列数
var margin = config.margin || 1;                                        // 奖品间隙
// 为保证中间有btn区域 行数和列数不能小于3
if (!row || !column || row < 3 || column < 3) {
console.log('行数和列数必须不小于3!');
return;
}
var cntWidth = config.width;                                            // 容器总宽度
var cntHeight = config.height;                                          // 容器总高度
// 容器总的长度必须大于0
if (!cntWidth || !cntHeight || cntWidth < 0 || cntHeight < 0) {
console.log('宽度和高度必须不小于0!');
return;
}
// 横向共有(列数-1)个间隙
var boxWidth = cntWidth - margin * (column - 1);                        // 容器去除间隙宽度
// 纵向共有(列数-1)个间隙
var boxHeight = cntHeight - margin * (row - 1);                         // 容器去除间隙高度
// 保证长度为整数 先去除除不尽的部分(1像素的偏差可以接受  避免很长的小数位出现)
var pieceWidth = (boxWidth - boxWidth % column) / column;               // 单个奖品区域宽度
// 保证宽度为整数 先去除除不尽的部分(1像素的偏差可以接受  避免很长的小数位出现)
var pieceHeight = (boxHeight - boxHeight % row ) / row;                 // 单个奖品区域高度
/* 奖品位置属性设定
---------------------------------------------------------------------- */
// 储存位置信息的二维数组
var transit = [];
for (var i = 0; i < row; i++) {
// 载入第一行
transit[i] = [];
for (var j = 0; j < column; j++) {
// 奖品样式属性赋值
var piece = {};
piece.x = j * pieceWidth + j * margin;
piece.y = i * pieceHeight + i * margin;
piece.width = pieceWidth;
piece.height = pieceHeight;
// 进入中间btn区域 继续循环
if (i > 0 & i < row - 1 & j > 0 & j < column - 1) continue;
// 存入奖品位置
transit[i][j] = piece;
}
}
/**
* 此时transit数组储存的位置信息
*    一 | 二 | 三 | 四
*   ----------------
*    五 |   btn   | 六
*   ________________
*    七 | 八 | 九 | 十
*/
// 先把最后一行的元素倒序
for (var i = 0; i < row; i++) {
if (i == row - 1) transit[i].reverse()
}
/**
* 此时transit数组储存的位置信息
*    一 | 二 | 三 | 四
*   ----------------
*    五 |   btn   | 六
*   ________________
*    十 | 九 | 八 | 七
*/
// 记录微信信息的一维数组 (从0~length-1)
var array = [];
// 第一行可以直接拿来用
array = array.concat(transit[0]);
/**
* 此时array数组储存 (元素对应transit的位置属性)
* [一,二,三,四]
*/
// 除掉最后一排 夹在中间的行 开始入队 顺时针 先存右侧
for (var i = 1; i < row - 1; i++) {
array = array.concat(transit[i][column - 1])
}
/**
* 此时array数组储存 (元素对应transit的位置属性)
* [一,二,三,四,六]
*/
// 加入最后一行
array = array.concat(transit[row - 1]);
/**
* 此时array数组储存 (元素对应transit的位置属性)
* [一,二,三,四,六,七,八,九,十]
*/
// 除掉最后一排 夹在中间的行 开始入队 顺时针 轮到左侧数据
for (var i = row - 2; i > 0; i--) {
array = array.concat(transit[i][0])
}
/**
* 此时array数组储存 (元素对应transit的位置属性)
* [一,二,三,四,六,七,八,九,十,五]
*/
// 奖品的个数就是现在数组的长度
this.length = array.length;
// 中间自定义区域 放到数组的最后位置上
var btn = {};
var btnWidth = (column - 2) * pieceWidth + (column - 3) * margin;
var btnHeight = (row - 2) * pieceHeight + (row - 3) * margin;
btn.x = pieceWidth + margin;
btn.y = pieceHeight + margin;
btn.width = btnWidth;
btn.height = btnHeight;
array.push(btn);
/**
* 此时array数组储存 (元素对应transit的位置属性)
* [一,二,三,四,六,七,八,九,十,五,btn]
* * 这时的顺序已经为顺时针的排序了
* 拿着array存的位置 对照奖品信息组依次赋值 便可得到
*    1 | 2 | 3 | 4
*   ----------------
*   10 |  btn  | 5
*   ________________
*    9 | 8 | 7 | 6
*/
// 位置对象集合
this.posArr = array;
};
/**
* 抽奖区域渲染 调用此方法生成绝对定位 顺时针排序奖池 使用者也可通过this.posArr自行渲染
* prizes: [{imgUrl:'xxx'},{imgUrl:'xxx',href:'http://xxx'},{text:'xxx'}]
* prizes元素说明 渲染图片 {imgUrl:'xxx'}  带链接图片 {imgUrl:'xxx',href:'http://xxx'}
*               渲染文字 {text:'xxx'}    带链接文字 {text:'xxx',href:'http://xxx'}
*/
tp.$setBox = function (prizes) {
prizes = prizes || [];
/* 奖品信息 */
// 标记奖品位置
var index = 0;
var array = this.posArr;
for (var i = 0, l = this.length; i < l; i++) {
index++;
var div = document.createElement('div'), convert = '', prize = prizes[i], pos = array[i];
// 中奖内容
if (prize) {
if (prize.imgUrl)  convert += '<img src="' + prize.imgUrl + '"/>';
if (prize.text) convert += prize.text;
if (prize.href) convert = '<a href="' + prize.href + '" target="_blank">' + convert + '</a>';
}
// 中奖光圈
convert += '<div class="j-turnplate-halo j-turnplate-halo' + index + '"></div>';
div.innerHTML = convert;
div.className = 'j-turnplate-prize j-turnplate-prize' + index;
// 设定绝对定位样式
div.style.cssText = 'width:' + pos.width + 'px;height:' + pos.height + 'px;line-height:' + pos.height + 'px;top:' + pos.y + 'px;left:' + pos.x + 'px;';
this.container.appendChild(div);
}
/* 抽奖按钮 */
var btn = this.btn = document.createElement('div'), btnObj = array[this.length];
btn.className = 'j-turnplate-btn';
btn.style.cssText = 'width:' + btnObj.width + 'px;height:' + btnObj.height + 'px;top:' + btnObj.y + 'px;left:' + btnObj.x + 'px;';
this.container.appendChild(btn);
return this;
};
// 设置动画效果
tp.$setAnimate = function (config) {
config = config || {};
if (!config.endCycle || config.endCycle < 2) {
console.log('大转盘至少转动2圈!');
return;
}
this.animate.slow = config.slow || 3;                                   // 减速位标识
this.animate.quick = config.quick || 0;                                 // 加速位标识
this.animate.speed = config.speed || 5;                                 // 抽奖转动速度(默认为5) 越大越慢
this.animate.noReset = !!config.noReset;                                // 后续抽奖不从第一个开始
this.animate.endCycle = config.endCycle;                                // 转动圈数
return this;
};
// 节点插入
tp.$inject = function (elem) {
if (!elem) return;
var node = e._$get(elem);
node.innerHTML = '';
node.appendChild(this.container);
return this;
};
// 启动
tp.$play = function (info) {
var self = this;
if (!self.animate.endCycle || !info.EndIndex) {
console.log('必须有转动圈数和结束位置，至少转动2圈!');
return;
}
// 缓存转动光圈节点
if (!self.haloNodeArr) self.haloNodeArr = nes('.j-turnplate-halo');
// 获取配置信息
var index = info.index || 1,                                            // 起始位置
arr_length = self.length,                                           // 跑马灯个数
EndIndex = info.EndIndex,                                           // 结束位置
quick = self.animate.quick,                                         // 加速位标识
slow = self.animate.slow;                                           // 减速位标识
self.$emit('start');
// 开始前准备
var run = 0,                                                            // 转动次数
cycle = 0,                                                          // 当前圈数
flag = false,                                                       // 结束转动标志
speed = self.animate.speed * 40,                                    // 转动速度
prevIndex = self.lastIndex || arr_length,                           // 前一位置
timer = setInterval(play, speed);                                   // 起始速度
// 增加抽奖次数
self.time++;
// 验证加速位是否过界
slow = (EndIndex - slow) <= 0 ? (EndIndex - slow + arr_length) : (EndIndex - slow);
if (!self.config.noReset) e._$delClassName(nes(".j-turnplate-halo" + prevIndex)[0], 'j-turnplate-current');
// 跑马灯
function play() {
run++;
//转满1圈index归1
if (index > arr_length) {
index = 1;
cycle++;
}
if (flag == false) {
// 加速
if (quick == run) {
clearInterval(timer);
timer = setInterval(play, speed / 4);
}
// 减速并触发结束
if (cycle == self.animate.endCycle - 1 && index == slow) {
clearInterval(timer);
flag = true;
timer = setInterval(play, speed * 2.5);
}
}
// 为当前光圈加选中样式 及 上一光圈节点去除选中样式
e._$addClassName(self.haloNodeArr[index - 1], 'j-turnplate-current');
if (index > 1) prevIndex = index - 1;
else prevIndex = arr_length;
e._$delClassName(self.haloNodeArr[prevIndex - 1], 'j-turnplate-current');
// 转动结束
if (flag == true && index == EndIndex) {
quick = 0;
self.lastIndex = EndIndex;
clearInterval(timer);
self.$emit('end');
}
index++;
}
};
return Turnplate;
},4);
I$(673,"<section class=\"m-mask\" r-hide={{hideMask}} on-click={{hideMask=true}} on-touchmove={{this.preventMove($event)}}></section> <div class=\"m-lotteryModal\" r-hide={{hideMask}}>   <div class=\"close\" on-click=\"{{hideMask=true}}\">×</div>   <div class=\"tipCnt\">     {{#if showTip}}     {{#if isError}}     <div class=\"tip\">       <img src=\"http://haitao.nos.netease.com/b0c2ef0ceb1840be81e623192d4f8592.jpg\" style=\"width: 9.3rem;height:6.35rem;\"/>       {{#if tip}}       <p>{{tip}}</p>       {{#else}}       <p class=\"bold\">您的考拉豆暂时不足</p>       <p class=\"small\">攒足考拉豆再玩转盘吧</p>       {{/if}}     </div>     <div class=\"btns\">       <a href=\"javascript:;\" class=\"btn\" on-click=\"{{hideMask=true}}\" style=\"width: 15.05rem;\">         <span>确定</span>       </a>     </div>     {{#else}}     <div class=\"tip\" style=\"margin-top: 3rem;\">       <p class=\"bold\">确认花费<span>{{consume}}</span>考拉豆</p>       <p class=\"bold\">开始玩转盘</p>     </div>     <div class=\"btns\">       <a href=\"javascript:;\" class=\"btn btn-cancel\" on-click=\"{{hideMask=true}}\" r-html=\"{{txtCC || '取消'}}\"></a>       <a href=\"javascript:;\" class=\"btn\" on-click=\"{{this.confirm()}}\">         <span r-html=\"{{txtOk || '确定'}}\"></span>       </a>     </div>     {{/if}}     {{#else}}     <div class=\"tip\">       {{#if result.luckyType==1}}       <p class=\"bold\">恭喜您，抽中了</p>       <img src=\"http://haitao.nos.netease.com/5fdde38af88542bdb9f54adebaf874a4.jpg\" style=\"width: 12.8rem;height:7.4rem;\"/>       <p class=\"bold\">{{result.awardName}}</p>       {{#elseif result.luckyType==2}}       <p class=\"bold\">恭喜您，抽中了</p>       <div class=\"coupon\">         <img src=\"http://haitao.nos.netease.com/9a5cbed2ffe648c98750258b81ff091a.jpg\" style=\"width: 14rem;height:7.4rem;\"/>         <div class=\"info\">           <div class=\"name\">             <span class=\"small\">&yen;</span>{{result.couponAmount}}           </div>           <div class=\"type\">             <p>{{couponName[result.couponType]}}</p>             <p>优惠券</p>           </div>         </div>       </div>       <p class=\"bold\">{{result.awardName}}</p>       <a href=\"http://m.kaola.com/coupon.html\" target=\"_blank\">查看我的优惠券 &gt;</a>       {{#elseif result.luckyType==3}}       <p class=\"bold\">恭喜您获得1次</p>       <p class=\"bold\">低价购的机会</p>       <div class=\"gift\">         <a href=\"http://m.kaola.com/product/{{result.goodsId}}.html\">           <img src=\"{{result.imgUrl}}?imageView&thumbnail=200x200&quality=85\"/>         </a>         <div class=\"price\">           <div class=\"tip\">             <p>券后价</p>             <p>               <span>&yen;</span>               <span class=\"big\">{{result.discountPrice}}</span>             </p>           </div>         </div>         <div class=\"name f-toe\">{{result.awardName}}</div>       </div>       <p class=\"small\">我们送您一张该商品的单品优惠</p>       <p class=\"small\">券，保证您可以低价购得该商品</p>       {{#elseif result.luckyType==4}}       <img src=\"http://haitao.nos.netease.com/87c6c8625463414d95f02a639e3d79d7.jpg\" style=\"width: 12.8rem;height:8.5rem;\"/>       <p class=\"bold\">{{_loseTip[_loseCount]}}</p>       {{/if}}     </div>     <div class=\"btns\">       {{#if result.luckyType==3}}       <a href=\"javascript:;\" class=\"btn btn-cancel\" on-click=\"{{this.confirm()}}\">         <span r-html=\"{{txtOk || '继续抽奖'}}\"></span>       </a>       <a href=\"http://m.kaola.com/product/{{result.goodsId}}.html\" class=\"btn\">去购买</a>       {{#else}}       <a href=\"javascript:;\" class=\"btn\" on-click=\"{{this.confirm()}}\">         <span r-html=\"{{txtOk || '继续抽奖'}}\"></span>       </a>       <a href=\"javascript:;\" class=\"btn btn-cancel\" on-click=\"{{hideMask=true}}\" r-html=\"{{txtCC || '不玩了'}}\"></a>       {{/if}}     </div>     {{/if}}   </div> </div>");
I$(671,function (_, BaseComponent, body) {
// 未中奖计数
var loseCount = 0;
// 未中奖文案提示
var loseTip = ['阿噢~差一点就中奖啦！', '要不换个姿势再试试？', '距离大奖只剩一点点了!', '我就不信中不了奖', '曾经，我离大奖咫尺之遥……'];
return BaseComponent.extend({
template: body,
config: function (data) {
_.extend(data, {
consume: 0,                                             // 标记消耗考拉豆
showTip: true,                                          // 标记是否是开始游戏前的提示
isError: false,                                         // 标记能否开始游戏（考拉豆不足 或 网络原因）
tip: '',                                                // 开始前的提示语
couponName: {1: '满减', 2: '无门槛'},                    // 优惠券类型名称枚举
result: {},                                             // 抽奖结果对象
_loseTip: loseTip,                                      // 抽奖失败提示语集合
_loseCount: loseCount                                   // 抽奖失败标记位（轮流提示失败语句）
});
this.supr(data);
this.onok = this.onok || this.data.onok;
loseCount++;
if (this.data.result.luckyType != 4 || loseCount == loseTip.length) loseCount = 0;
},
init: function () {
this.$watch('hideMask', function (val) {
if (val) {
this.$emit("close", this.data);
this.destroy();
}
})
},
preventMove: function (event) {
event.preventDefault();
},
confirm: function () {
this.$emit("confirm", this.data);
this.destroy();
this.onok();
},
close: function () {
this.$emit("close", this.data);
this.destroy();
}
});
},74,23,673);
I$(667,function (_k, e, v, _t, _, request, toast, Marquee, Turnplate, Modal) {
var pro;
var _$$TurnplateModule = _k._$klass();
pro = _$$TurnplateModule._$extend(_t._$$EventTarget);
// 开始游戏按钮
var startBtn;
// 请求地址宏
var _url_ = {
SCROLL: '/point/turnplate/scroll.html',                 // 侧边中奖信息滚动
SYNC: '/point/get_user_point.html',                     // 同步考拉豆
PLAY: '/point/do_turnplate.html'                        // 抽奖
};
pro.__init = function (_options) {
var self = this, size = parseFloat(document.documentElement.style.fontSize);
self.__supInit(_options);
// 配置基本数据
self.data = {};
_.extend(self.data, {
active: 0,                                          // 标示 规则/中奖纪录 tab状态
consume: window['consume'],                         // 抽奖一次消耗积分数
availablePoints: window['availablePoints'],         // 当前可用积分
prizes: window['turnplateList'],                    // 奖品信息集合
lotteryInfo: {}                                     // 抽中奖品信息 lotteryType:1,积分 2,优惠券 3,实物 4,无奖励
});
self.__getNodes();
self.sync();
/* 组件实例化
---------------------------------------------------------------------- */
// 奖池盒数据
var margin = 0.5 * size, width = 31 * size, height = 22.9 * size;
// 大转盘模块
self.turnplate = new Turnplate({
row: 3,                                             // 行数
column: 3,                                          // 列数
margin: margin,                                     // 间隙
width: width,                                       // 容器宽度
height: height                                      // 容器高度
});
// 大转盘-设置动画效果
self.turnplate.$setAnimate({
speed: 2,                                           // 抽奖转动速度(默认为5) 越大越慢
noReset: true,                                      // 后续抽奖不从第一个开始
endCycle: 3,                                        // 转动圈数
slow: 4                                             // 停止转动前 转动到第slow个开始减速(默认值为3)
});
// 大转盘-使用绝对定位生成的位置信息
self.turnplate.$setBox(self.data.prizes).$inject(self.turnplateCnt);
// 大转盘-开始按钮
startBtn = self.turnplate.btn;
// 页面有响应范围 把算好的px单位转换成rem
setTimeout(function () {
var posArr = self.turnplate.posArr, l = posArr.length;
// 逐个奖品单位换算
e._$getByClassName(self.turnplateCnt, 'j-turnplate-prize').forEach(function (elem, index) {
elem.style.top = posArr[index].y / size + 'rem';
elem.style.left = posArr[index].x / size + 'rem';
elem.style.width = posArr[index].width / size + 'rem';
elem.style.height = posArr[index].height / size + 'rem';
});
// 开始按钮单位换算
startBtn.style.top = posArr[l - 1].y / size + 'rem';
startBtn.style.left = posArr[l - 1].x / size + 'rem';
startBtn.style.width = posArr[l - 1].width / size + 'rem';
startBtn.style.height = posArr[l - 1].height / size + 'rem';
}, 0);
// 中奖名单模块
request(_url_.SCROLL, {
method: 'POST',
type: 'json',
norest: true,
onload: function (json) {
if (json.retcode == 200) {
self.marqueeCnt.innerHTML = '';
self.marquee = new Marquee({
array: json.data || [],
content: "{{item.text||(item.province+'用户'+item.accountID+'抽中 '+item.awardName)}}",
data: {
scale: 3,                           // 单条滚动距离
unit: 'rem',                        // 单条滚动距离单位
showLength: 1,                      // 可视条数
offset: 1                           // 单次滚动条数
}
}).$inject(self.marqueeCnt);
// 用户自己的中奖信息只出现一次 全部展示完成后 重置源数组
self.marquee.$on('top', function () {
self.marquee.resetArray();
})
} else {
e._$get('marquee-tip').innerHTML = '获取中奖列表失败！'
}
},
onerror: function (json) {
e._$get('marquee-tip').innerHTML = '获取中奖列表失败！'
}
});
/* 抽奖和中奖信息联动
---------------------------------------------------------------------- */
// 大转盘启动按钮设置
startBtn.innerHTML = '<div class="btn"></div>';
// 用户点击按钮 未松手前 加入按下按钮状态
v._$addEvent(startBtn, 'touchstart', function (_event) {
v._$stop(_event);
e._$addClassName(startBtn, 'pushBtn');
});
// 用户点击按钮 松手后 判断游戏状态
v._$addEvent(startBtn, 'touchend', function (_event) {
v._$stop(_event);
// 大转盘埋点 备注：点击抽奖行动点时
!!window._dapush && window._dapush("_trackEvent", "考拉豆抽奖页", "抽奖", "点击", {
"userAccount": window.accountName || '',
"userId": window.accountName || ''
});
// 抽奖券弹窗确认
var modal = new Modal({
data: {
consume: self.data.consume,
isError: (self.data.availablePoints - self.data.consume < 0),
onok: function () {
self.play.call(self);
}
}
}).$inject(document.body, 'bottom');
// 去掉按钮 按下状态
modal.$on('$destroy', function () {
e._$delClassName(startBtn, 'pushBtn');
});
}, false);
// 抽奖
self.turnplate.$on('start', function () {
e._$addClassName(startBtn, 'disabled');
});
// 出奖
self.turnplate.$on('end', function () {
self.sync();
// 大转盘埋点 备注：展示抽奖结果时
!!window._dapush && window._dapush("_trackEvent", "考拉豆抽奖页", "抽奖", "结果", {
"userAccount": window.accountName || '',
"userId": window.accountName || ''
});
// 抽奖后奖品弹窗确认
setTimeout(function () {
e._$delClassName(startBtn, 'disabled');
var lotteryInfo = self.data.lotteryInfo;
var modal = new Modal({
data: {
showTip: false,
result: lotteryInfo,
onok: function () {
self.play.call(self);
}
}
}).$inject(document.body);
// wap只滚动一条 且会被弹窗挡住，为使用户看到自己中奖的滚动 在弹窗关闭后 插入
modal.$on('$destroy', function () {
// 中奖信息滚动 插入用户中奖信息
if (self.marquee && lotteryInfo.luckyType != 4) self.marquee.addItem({
text: '恭喜您，抽中了 ' + lotteryInfo['awardName'],
className: 'congrats'
});
});
}, 500);
});
};
// 获取节点
pro.__getNodes = function () {
this.marqueeCnt = e._$getByClassName(document, 'j-marquee-container')[0];
this.turnplateCnt = e._$getByClassName(document, 'j-turnplate-container')[0];
};
// 开始抽奖
pro.play = function () {
var self = this, index = self.turnplate.lastIndex || 1;
// 防止用户多次点击
if (e._$hasClassName(startBtn, 'disabled')) return;
e._$addClassName(startBtn, 'disabled');
request(_url_.PLAY, {
method: 'POST',
type: 'json',
data: {turnplateToken: window['turnplateToken']},
norest: true,
onload: function (json) {
if (json.code == 200) {
// 出奖
toast.show('-' + self.data.consume);
var data = json.data;
self.turnplate.$play({
index: index,                           // 起始位置
EndIndex: data.position                 // 停住的位置
});
self.data.lotteryInfo = json.data
} else if (json.code == 508) {
// 抽奖配置发生改变后 提醒用户刷新页面
self.showError('小编增加了更多奖品，请关闭窗口后再抽', true);
} else self.showError(json.message || '网络错误');
},
onerror: function (json) {
self.showError('抱歉，网络不给力~重新试试!');
}
});
};
// 出错信息提示
pro.showError = function (msg, reload) {
var modal = new Modal({
data: {
tip: msg,                                       // 弹窗提示内容
isError: true                                   // 是错误提示弹窗
}
}).$inject(document.body);
e._$delClassName(startBtn, 'disabled');
modal.$on('$destroy', function () {
if (reload) window.location.reload();
})
};
// 同步考拉豆数量
pro.sync = function () {
request(_url_.SYNC, {
method: 'post',
onload: function (_json) {
this.data.availablePoints = _json.data;
e._$get('availablePoints').innerHTML = _json.data;
}._$bind(this)
});
};
return _$$TurnplateModule;
},1,4,3,20,74,68,25,669,670,671);