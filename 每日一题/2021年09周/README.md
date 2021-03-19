## 2021年09周

> ### 20210301-JS的数据类型

```html
简单(原始)数据类型：String、Number、Boolean、null、undefined、Symbol(ES2105引入)、BigInt(ES2020引入)
复杂数据类型：object
```

```html
基本类型(单类型)：String、Number、boolean、null、undefined、Symbol(ES2105引入), BigInt(ES2020引入)
引用类型：object。里面包含的 function、Array、Date。	
```

> ### 20210302-以下typeof分别输出什么

```javascript
typeof 123            //numer
typeof '123'          //string
typeof true           //boolean
typeof null           //object
typeof undefined      //undefined
typeof Symbol()       //symbol
typeof []             //object
typeof {}             //object
typeof console        //object
typeof console.log    //function
typeof function(){}   //function
typeof new Date()     //object
```

> ### 20210303-以下Object.prototype.toString.call()分别输出什么

```javascript
Object.prototype.toString.call(123)             // [object Number]
Object.prototype.toString.call('123')           // [object String]
Object.prototype.toString.call(true)            // [object Boolean]
Object.prototype.toString.call(null)            // [object Null]
Object.prototype.toString.call(undefined)       // [object Undefined]
Object.prototype.toString.call(Symbol())        // [object Symbol]
Object.prototype.toString.call([])              // [object Array]
Object.prototype.toString.call({})              // [object Object]
Object.prototype.toString.call(console)         // [object Object]
Object.prototype.toString.call(console.log)     // [object Function]
Object.prototype.toString.call(function(){})    // [object Function]
Object.prototype.toString.call(new Date())      // [object Date]
```