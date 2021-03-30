### 1.JS变量提升

变量提升：声明提升到它所在作用域的顶端去执行，到我们代码所在的位置来赋值
函数提升：提升到作用域最前边，并且将声明内容一起提升到最上边。

- 所有的声明都会提升到作用域的最顶上去。
- 同一个变量只会声明一次，其他的会被忽略掉或者覆盖掉。
- 函数声明的优先级高于变量声明的优先级，并且函数声明和函数定义的部分一起被提升。


### 2.如何在ES5环境下实现let

let和var的区别：
- var声明的变量会挂到window上，而let和const不会
- var声明的变量存在变量提升，而let和const不会
- let和const声明形成块作用域，只能在块作用域里访问，不能跨块访问，也不能跨函数访问
- 同一作用域下let和const不能声明同名变量，而var可以
- 暂时性死区，let和const声明的变量不能在声明前被使用

babel的转化如下,只是修改了变量名,实际只实现了上面2，3，4点

```javascript
//源代码
for(let i = 0; i < 10; i++>){
  console.log(i)
}
console.log(i)

//babel转化后
for(var _i = 0; _i < 10; _i++>){
  console.log(_i)
}
console.log(i)
```

也可以通过自执行函数来模拟块级作用域:

```javascript
(function(){
  for(var i = 0; i < 5; i ++){
    console.log(i)  // 0 1 2 3 4
  }
})();

console.log(i)      // Uncaught ReferenceError: i is not defined
```


### 3.如何在ES5环境下实现const

通过Object.defineProperty()设置标量不可以修改

```javascript
function _const(key, value) {    
    const desc = {        
        value,        
        writable: false    
    }    
    Object.defineProperty(window, key, desc)
}
    
_const('obj', {a: 1})   //定义obj
obj.b = 2               //可以正常给obj的属性赋值
obj = {}                //无法赋值新对象
```


### 4.写一个防抖函数

防抖，即短时间内大量触发同一事件，只会执行一次函数。  
实现原理为设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作。  
防抖常用于搜索框/滚动条的监听事件处理，如果不做防抖，每输入一个字/滚动屏幕，都会触发事件处理，造成性能浪费。  

```javascript
function debounce(func, wait){
  let timeout = null
  return function(){
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, wait)
  }
}
```

### 5.写一个节流函数

节流是间隔执行，函数节流即每隔一段时间就执行一次。  
实现原理为设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器。    
和防抖的区别在于，防抖每次触发事件都重置定时器，而节流在定时器到时间后再清空定时器。  

```javascript
function throttle(func, wait){
  let flag = true   //闭包
  return function(){
    if(!flag) return
    flag = false
    setTimeout(() => {
      func.apply(this, arguments)
      flag = true
    }, wait);
  }
}
```


### 6.数组扁平化

对于[1, [1,2], [1,2,3]]这样多层嵌套的数组，我们如何将其扁平化为[1, 1, 2, 1, 2, 3]这样的一维数组呢

- 使用ES6的方法：Array.flat()
- 递归
- reduce递归


### 7.使用setTimeout实现setInterval

在setTimeout的方法里面又调用了一次setTimeout


### 8.数组中forEach和map的区别

相同点
- 都是循环遍历数组中的每一项，使用break会摆错，return也不会跳出循环
- forEach和map方法里每次执行匿名函数都支持3个参数，参数分别是item（当前每一项），index（索引值），arr（原数组） 
- 匿名函数中的this都是指向window 只能遍历数组 都不会改变原数组

不同点(map)
- map方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值
- map方法不会对空数组进行检测，若arr为空数组，则map方法返回的也是一个空数组。
- 浏览器支持：chrome、Safari1.5+、opera都支持，IE9+

不同点(forEach)
- forEach方法用来调用数组的每个元素，将元素传给回调函数 
- forEach对于空数组是不会调用回调函数的
- 无论arr是不是空数组，forEach返回的都是undefined。这个方法只是将数组中的每一项作为callback的参数执行一次。


### 9.for in和for of的区别

可以用break终止循环，不能使用return,会报错

for in
- index索引为字符串型数字，不能直接进行几何运算
- 遍历顺序有可能不是按照实际数组的内部顺序
- 使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性。
- for in更适合遍历对象，不要使用for in遍历数组。通常用for in来遍历对象的键名
- for in 可以遍历到myObject的原型方法method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery方法可以判断某属性是否是该对象的实例属性
- 可以通过ES5的Object.keys(myObject)获取对象的实例属性组成的数组，不包括原型方法和属性。

for of
- for of遍历的只是数组内的元素，而不包括数组的原型和属性


### 10.实现一个EventEmitter方法

EventEmitter的核心就是事件触发与事件监听器功能的封装  
EventEmitter 方法主要包含了 on,emit,once,remove,removeAll方法  
- on:为某个事件注册一个监听器
- emit:按照顺序执行所有监听器
- once：执行一次监听器，随后解除监听事件
- remove: 移除某个监听事件
- removeAll: 移除某个事件的所有监听

```javascript
class Event{

  constructor(){
    this.event = Object.create(null)
  }

  //给某个事件添加监听
  on(name, backcall){
    if(!this.event[name]){
      this.event[name] = []
    }
    this.event[name].push(backcall)
    return this
  }

  //按顺序执行事件中所有的监听
  emit(name, ...args){
    if(!this.event[name]){
      return this
    }
    this.event[name].forEach(element => {
      element.call(this, ...args)
    });
  }

  //移除事件中某个监听
  remove(name, backcall){
    if(!this.event[name]){
      return this
    }
    if(backcall){
      let index = this.event[name].indexOf(backcall)
      this.event[name].splice(index, 1)
    }
    return this
  }

  removeAll(name){
    if(!this.event[name]){
      return this
    }
    this.event[name] = null
    return this
  }

  once(name, backcall){
    let func = (...args) => {
      backcall.call(this, ...args)
      this.remove(name, func)
    }
    this.on(name, func)
    return this
  }
}
```