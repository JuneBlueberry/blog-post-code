### 1.var、let、const

### 2.模板字符串

- 模板字符串
  const s = `this is ${name}`
- 标签模板
  let url = oneLine `
    www.taobao.com/example/index.html
    ?foo=${foo}
    &bar=${bar}
  `


### 3.Set、Map

- Set 数组去重
- Map 条件语句的优化


### 4. for of

可以遍历的对象
- 数组
- Set
- Map
- 类数组对象，如 arguments 对象、DOM NodeList 对象
- Generator 对象
- 字符串


### 5.函数的默认值

```javascript
doSomething({ foo: 'Hello', bar: 'Hey!', baz: 42 });

// bad
function doSomething(config) {
  const foo = config.foo !== undefined ? config.foo : 'Hi';
  const bar = config.bar !== undefined ? config.bar : 'Yo!';
  const baz = config.baz !== undefined ? config.baz : 13;
}

// good
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
  ...
}

// better
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
  ...
}
```

```javascript
// bad
const Button = ({className}) => {
	const classname = className || 'default-size';
	return <span className={classname}></span>
};

// good
const Button = ({className = 'default-size'}) => (
	<span className={classname}></span>
);

// better
const Button = ({className}) =>
	<span className={className}></span>
}

Button.defaultProps = {
	className: 'default-size'
}
```

```javascript
const required = () => {throw new Error('Missing parameter')};

const add = (a = required(), b = required()) => a + b;

add(1, 2) // 3
add(1); // Error: Missing parameter.
```


### 6.拓展运算符


### 7.双冒号运算符

```javascript
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);
```

如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

```javascript
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);
```


### 8.解构


### 9.数组的拓展方法

- keys
- entries
- values
- includes
- find
- findIndex


### 10.指数操作符

2**10 //1024