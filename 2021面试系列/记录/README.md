## 技术题



## 业务题



## 综合题

### 1.你最近遇到的一个问题，怎么解决的

- iPhone和安卓键盘的适配
  安卓键盘弹出会压缩页面高度，所以需要设置min-height
  iPhone收起键盘页面会下不来，所以需要监听blur事件，设置html.scrollTop(0)或者body.scrollTop(0)