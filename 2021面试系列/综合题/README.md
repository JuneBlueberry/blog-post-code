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