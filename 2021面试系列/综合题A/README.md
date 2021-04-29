### 1.什么是事件传播?

- 捕获阶段–事件从 window 开始，然后向下到每个元素，直到到达⽬标元素。
- ⽬标阶段–事件已达到⽬标元素。
- 冒泡阶段–事件从⽬标元素冒泡，然后上升到每个元素，直到到达 window 。


### 2.event.preventDefault() 和 event.stopPropagation()⽅法之间有什么区别？

- event.preventDefault() ⽅法可防⽌元素的默认⾏为。
  如果在表单元素中使⽤，它将阻⽌其提交。如果在锚元素中使⽤，它将阻⽌其导航。如果在上下⽂菜单中使⽤，它将阻⽌其显⽰或显⽰
- event.stopPropagation() 方法⽤于阻⽌捕获和冒泡阶段中当前事件的进⼀步传播


### 3.如何知道是否在元素中使⽤了 event.preventDefault() ⽅法？

我们可以在事件对象中使⽤ event.defaultPrevented 属性。 它返回⼀个布尔值⽤来表明是否在
特定元素中调⽤了 event.preventDefault()


### 4.1px的处理方法

- 像素
  - CSS像素：虚拟像素，CSS规范里面的像素，CSS里面的长度有2中，一种相对(px,rem,em,vw,vh)，一种绝对(pt)
  - 物理像素：设备能控制的最小单位，指屏幕上的一个个的点，固定的大小
  - 逻辑像素：计算机系统里面的一个点，没有固定大小，越小屏幕越清晰，操作系统会转化为物理系统
  - DPR：物理像素/逻辑像素的比值，比如IPhone6的DPR就是2，就是屏幕上的1个逻辑像素=2个物理像素

- 这也是为什么设计图为750X1334，但是我们设置像素为375X667，那如果我们设计图上1px，实际我们对应CSS像素就是0.5px,1px问题就是这个
- 解决方案
  - 利用css的缩放(zoom,transfrom:scale)
  - 使用sass或者less对公共的代码封装，使用媒体查询media对不同的DPR屏幕做不同的缩放
  - 使用图片：兼容性最好，灵活行最差，不能改变颜色、长度
  - 使用 viewport 和 rem，js 动态改变 viewport 中 scale 缩放，缺点在于不适用于已有的项目，例如：使用 vh 和 vw 布局的
  - 用 css 渐变linear-gradient或者box-shadow
  - 用postcss-write-svg插件


### 5.Object.defindProperty是否可以监听数组和对象


### 6.Webpack


### 7.Promise的原理

Promise的原理是发布订阅模式

- Promise本身类似一个容器，里面保存着未来才会结束的事件
- Promise的特点就是本身的状态不收外界影响，且是单向的，只能从pending => fulfulled, pending => rejected，然后状态修改时会执行相应缓存中的任务
- Promise会有执行器，这个执行器是立即执行的
- 执行器接受两个回调函数，一个resolve成功回调，reject失败回调
- 每个Promise的实例都有一个then方法，这个方法接受2个回调，一个成功，一个失败
- promsie的实例调用then的时候，会根据当前的状态调用传过来的不同回调函数，并且把当前保存的对应值传递到这个函数当中
- promise实例中的then方法是可以多次调用的，而且如果调用时当前状态是pending，会将传入的回调函数保存起来，当状态确定的时候会依次调用这些函数(发布订阅)


### 8.zoom和scale更深层次的差异

- zoom早期是IE专用的，可以解决浮动等问题，现在主流浏览器都支持，但是并非标准，而scale是标准
- zoom是从左上角开始缩放，scale是中间缩放
- zoom的缩放改变了元素占据的空间大小；而scale的缩放占据的原始尺寸不变，页面布局不会发生变化
- 算法不一样，zoom会锐利，scale会模糊
- 对文字的缩放规则不一致。zoom缩放依然受限于最小12像素中文大小限制；而scale就是纯粹的对图形进行比例控制，文字50%原来尺寸
- zoom和scale会叠加