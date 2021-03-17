> 2021年11周

### 20210316-用CSS画出圆，半圆，椭圆

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

### 20210317-手写一个JS深拷贝

- 1.JSON.parse() + JSON.stringify()

```javascript
function depthCopy(objs){
  return JSON.parse(JSON.stringify(objs))
}
```

- 2.遍历 + 递归
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