 ## 2021年11周

> ### 20210315-JS判断一个对象是否为空对象 [issure](https://github.com/JuneBlueberry/blog-post-code/issues/4)

- #### 1、JSON.stringify()
将对象转成字符串进行比较
```javascript
let obj = {}
JSON.stringify(obj) === '{}'   //true
```

- #### 2、for...in 循环
```javascript
function isObj(obj){
  for (let key in obj) {
    return false
  }
  return true
}

isObj({})	//true
```

- #### 3、Object.getOwnPropertyNames()
此方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
```javascript
let obj = {}
Object.keys(obj).length === 0  //true
```

> 注意：Object.getOwnPropertyNames()不兼容IE8及以下

- #### 4、Object.keys()
Object.keys()是ES6的新方法，和第3点返回值一样
```javascript
let obj = {}
Object.getOwnPropertyNames(obj).length === 0	//true
```

> ### 20210316-用CSS画出圆，半圆，椭圆 [issure](https://github.com/JuneBlueberry/blog-post-code/issues/1)

```html
<body>
  <div class="round">圆</div>
  <div class="semicircle">半圆</div>
  <div class="oval">椭圆</div>
</body>
```

```css
.round, .semicircle, .oval {
  width: 100px; 
  height: 100px;
  border: 1px solid gray;
  margin: 10px;
}
.round {
  border-radius: 50%;
}
.semicircle {
  height: 50px;
  border-radius: 50px 50px 0 0;
}
.oval {
  height: 50px;
  border-radius: 50%;
}
```

> ### 20210317-手写一个JS深拷贝 [issure](https://github.com/JuneBlueberry/blog-post-code/issues/2)

- #### 方法1.JSON.parse() + JSON.stringify()

```javascript
function depthCopy(objs){
  return JSON.parse(JSON.stringify(objs))
}
```

- #### 方法2.遍历 + 递归

```javascript
function depthCopy(objs){
  let result = {}

  if(typeof objs === 'object'){
    for (let obj in objs) {
      result[obj] = typeof objs[obj] === 'object' ? depthCopy(objs[obj]) : objs[obj]
    }
  } else {
    result = objs
  }

  return result
}
```

> ### 20210318-实现Function.prototype.call() [issure](https://github.com/JuneBlueberry/blog-post-code/issues/3)

- #### call
call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。举个栗子 X 1
```javascript
let obj = {
  value: 1
}
function demo(){
  console.log(this.value)
}

demo.call(obj)  // 1
```

上面这个示例流程如下：
1.执行demo函数
2.执行demo函数时， call将其this指向了obj

- #### 基本版本

1.将要运行的函数设置为call()传入的this的属性
2.运行函数
3.删除函数

```javascript
Function.prototype.mycall = function(context){
  context.fn = this
  context.fn()
  delete context.fn
}

let obj = {
  value: 1
}
function demo(){
  console.log(this.value)
}

demo.mycall(obj);   // 1
```

- #### 允许传入参数

call()方法运行传入参数，从第2个参数开始会作为函数的参数传入，举个栗子 X 2

```javascript
let obj = {
  value: 1
}
function demo(s1, s2){
  console.log(this.value)
  console.log(s1, s2)
}

demo.call(obj, 'hello', 'call')  // 1, hellocall
```

实现如下：
```javascript
Function.prototype.mycall = function(context){
    
  context.fn = this

  //解析参数,此处偷懒使用了ES6的spread，也可以拼接参数然后使用eval()
  let args = arguments.slice(1)
  context.fn(...args)
  delete context.fn
}

let obj = {
  value: 1
}
function demo(s1, s2){
  console.log(this.value)
  console.log(s1, s2)
}

demo.mycall(obj, 'hello', 'world');   // 1, hellocall
```

- #### this可以为null, 函数运行有返回值

call() 的第一个参数可以为null, 此时调用函数的this指向window，同时允许函数有返回值,举个栗子 X 3

> 注意：在严格模式下，第一个参数是谁，this就指向谁，包括null和undefined，如果不传参数this就是undefined

```javascript
var value = 2
let obj = {
  value: 1
}
function demo(){
  console.log(this.value)
  return this.value
}

let result = demo.call(null)  // 2
console.log(result)           // 2
```

实现如下：
``` javascript
Function.prototype.mycall = function(context){
  let _context = context || window

  _context.fn = this

  let args = arguments.slice(1)
  let result = _context.fn(...args)
  delete _context.fn

  return result
}
  
var value = 2    //window.value = 2
let obj = {
  value: 1
}
function demo(s1, s2){
  console.log(this.value)
  return {
    value: this.value
  }
}

demo.mycall(null)     //2
let result = demo.mycall(obj);    // 1
console.log(result)   // {value: 1}
```
