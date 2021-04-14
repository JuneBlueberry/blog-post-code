### 1.什么是高阶函数

一个函数可以接收另一个函数作为参数或者返回值为一个函数，这种函数就称之为高阶函数


### 2.数组中的高阶函数

- map
- reduce
- filter
- sort


### 3.函数的arguments为什么不是数组

因为argument是一个对象，只不过它的属性从0开始排，依次为0，1，2...最后还有callee和length属性。我们也把这样的对象称为类数组


### 4.arguments如何转化成数组

- Array.prototype.slice.call()
- Array.from
- [...]
- Array.prototype.concat.apply()


### 4.forEach中return有效果吗？如何中断forEach循环

- return 无效
- 中断方法：使用try监视代码块，在需要中断的地方抛出异常
- 官方推荐方法（替换方法）：用every和some替代forEach函数。every在碰到return false的时候，中止循环。some在碰到return ture的时候，中止循环


### 5.JS判断数组中是否包含某个值

- array.indexOf: 此方法判断数组中是否存在某个值，如果存在，则返回数组元素的下标，否则返回-1
- array.includes: 此方法判断数组中是否存在某个值，如果存在返回true，否则返回false
- array.find: 返回数组中满足条件的第一个元素的值，如果没有，返回undefined
- array.findIndex: 返回数组中满足条件的第一个元素的下标，如果没有找到，返回-1


### 6.数组扁平化

将多层级数组转化为一级数组,使其内容合并且展开

- ES的flat
- replace + split + map
- replace + Json.parse
- 递归
- Array.reduce迭代
- 循环 + [...]