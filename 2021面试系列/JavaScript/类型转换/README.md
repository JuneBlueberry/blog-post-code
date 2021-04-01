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
console.log(Number(false))  //-1
console.log(Number(111))  //111
console.log(Number('111'))  //111
console.log(Number(Symbol())) //报错
console.log(Number(NaN))  //NaN
console.log(Number(10n))  //10
```