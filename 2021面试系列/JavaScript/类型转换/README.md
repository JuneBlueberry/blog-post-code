### 1.其它数据类型转布尔值

- false、undefined、null、+0、-0、NaN、""  => false
- 除了以上情况 都为true

```javascript
// 数字转布尔值
console.log(Boolean(0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(NaN)) // false

console.log(Boolean(1)) // true
console.log(Boolean(Infinity)) // true
console.log(Boolean(-Infinity)) // true
console.log(Boolean(100n)) // true
console.log(Boolean(BigInt(100))) // true

// 字符串转布尔值
console.log(Boolean("")) // false
console.log(Boolean("haha")) // true

// 其他类型转布尔值
console.log(Boolean())  //false

var divs = document.getElementsByTagName('div')
console.log(Boolean(null))  //false
console.log(Boolean(undefined)) //false

console.log(Boolean({}))  //true
console.log(Boolean({ name: 'obj' })) //true
console.log(Boolean([]))  //true
console.log(Boolean(divs))  //true
console.log(Boolean(new Date()))  //true
console.log(Boolean(/(\[|\])/g))  //true

console.log(typeof document.all)  //undefined
console.log(Boolean(document.all))  //false
```

### 2.原始类型转字符串

```javascript
console.log(String(undefined))  //'undefined'
console.log(String(null)) //'null'
console.log(String(true)) //'true'
console.log(String(false))  //'false'
console.log(String(111))  //'111'
console.log(String('111'))  //'111'
console.log(String(Symbol())) //'Symbol()'
console.log(String(NaN))  //'NaN'
console.log(String(10n))  //'10'
```


### 3.原始值转数字

```javascript
console.log(Number(undefined))  //NaN
console.log(Number(null)) //+0
console.log(Number(true)) //1
console.log(Number(false))  //0
console.log(Number(111))  //111
console.log(Number('111'))  //111
console.log(Number(Symbol())) //报错
console.log(Number(NaN))  //NaN
console.log(Number(10n))  //10
```


### 4.原始值转对象

原始值转对象的特点：
- String、Number、Boolean有两种用法，配合new使用和不配合new使用，但是ES6规范不建议使用new来创建基本类型的包装类
- 现在更加推荐用new Object()来创建或转换为一个基本类型的包装类

基本类型的包装对象的特点：
- 使用typeof检测它，结果是object，说明它是一个对象
- 使用toString()调用的时候返回的是原始值的字符串


### 5.对象转字符串/数字

对象转字符串和数字的过程比较复杂，会涉及到一个可能大家之前没有听到过的方法：toPrimitive()  
它的作用其实就是输入一个值，然后返回一个一定是基本类型的值，否则会抛出一个类型错误异常。


### 6.toString

#### 谁可以调用toString

- 除了null、undefined的其它基本数据类型还有对象都可以调用它
- 在使用一个数字调用toString()的时候会报错，除非这个数字是一个小数或者是用了一个变量来盛放这个数字然后调用(1.1.toString()或者var a = 1; a.toString();)

#### toString()的call调用

Object.prototype.toString.call()：它能够帮助我们准确的判断某个数据类型

#### toString.call()与typeof的区别

typeof的特点

- 对于原始类型来说(也就是number、string这种)，除了null都可以显示正确的类型
- null因为历史版本的原因被错误的判断为了"object"
- 对于引用类型来说(也就是object、array这种)，除了函数都会显示为"object"
- 函数会被显示为function

#### 直接调用toString()

基本数据类型调用：
- 把它的原始值换成了字符串

引用类型调用：
- 数组的toString方法是将每一项转换为字符串然后再用","连接
- 普通的对象(比如{name: 'obj'}这种)转为字符串都会变为"[object Object]"
- 函数(class)、正则会被转为源代码字符串
- 日期会被转为本地时区的日期字符串
- 原始值的包装对象调用toString会返回原始值的字符串
- 拥有Symbol.toStringTag内置属性的对象在调用时会变为对应的标签"[object Map]"


### 7.valueOf()

- toString主要是把对象转换为字符串
- valueOf主要把对象转换成一个基本数据的值

基本用法：
- 基本数据类型调用，返回调用者原本的值
- 非日期对象的其它引用类型调用valueOf()默认是返回它本身
- 而日期对象会返回一个1970 年 1 月 1 日以来的毫秒数(类似于1585370128307)。


### 8.对象转字符串

- 如果对象具有 toString 方法，则调用这个方法。如果他返回一个原始值，JavaScript 将这个值转换为字符串，并返回这个字符串结果。
- 如果对象没有 toString 方法，或者这个方法并不返回一个原始值，那么 JavaScript 会调用 valueOf 方法。如果存在这个方法，则 JavaScript 调用它。如果返回值是原始值，JavaScript 将这个值转换为字符串，并返回这个字符串的结果。
- 否则，JavaScript 无法从 toString 或者 valueOf 获得一个原始值，这时它将抛出一个类型错误异常。


### 9.对象转数字

- 转数字会先调用valueOf()后调用toString()