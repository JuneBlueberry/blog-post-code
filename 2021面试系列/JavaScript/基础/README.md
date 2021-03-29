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

- 防抖，即短时间内大量触发同一事件，只会执行一次函数。  
- 实现原理为设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作。  
- 防抖常用于搜索框/滚动条的监听事件处理，如果不做防抖，每输入一个字/滚动屏幕，都会触发事件处理，造成性能浪费。  

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