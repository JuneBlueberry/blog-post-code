> 2021年12周

### 20210306-用CSS画出圆，半圆，椭圆

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