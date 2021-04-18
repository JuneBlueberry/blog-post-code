### 0.怎么理解MVVM

MVVM是Model-View-ViewModel缩写，也就是把MVC中的Controller演变成ViewModel。
Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，
数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。


### 1.简单说一下Vue2.x响应式数据原理

数据劫持 + 发布者-订阅者
Vue在初始化数据时，会使用Object.defineProperty重新定义data中的所有属性
当页面使用对应属性时，首先会进行依赖收集(收集当前组件的watcher)如果属性发生变化会通知相关依赖进行更新操作(发布订阅)。


### 2.Vue3.x响应式数据原理

- 响应式原理
Vue3.x改用Proxy替代Object.defineProperty
Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。
- Proxy只会代理对象的第一层，Vue3是怎样处理这个问题的
判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测。
- 监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？
判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行trigger


### 3.nextTick知道吗，实现原理是什么

在下次 DOM 更新循环结束之后执行延迟回调,nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用

Promise
MutationObserver
setImmediate
如果以上都不行则采用setTimeout


### 4.说一下Vue的生命周期

beforeCreate
created
beforeMounte
mounted
beforeUpdate
updated
beforeDestory
destoryed


### 5.你的接口请求一般放在哪个生命周期中？

接口请求一般放在mounted中，但需要注意的是服务端渲染时不支持mounted，需要放到created中。


### 6.Computed和Watch的区别

- Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。
- Watch没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开deep：true选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用unWatch手动注销哦。


### 7.说一下v-if和v-show的区别

- v-if不会渲染DOM元素
- v-show操作的是样式(display)，切换当前DOM的显示和隐藏。


### 8.组件中的data为什么是一个函数

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。


### 9.Vue模版编译原理知道吗，能简单说一下吗

简单说，Vue的编译过程就是将template转化为render函数的过程。会经历以下阶段

- 将模板字符串生成AST树(解析器)
- 对AST数进行静态节点标记，为后面的虚拟DOM做优化(优化器)
- 使用element ASTs生产render函数，codegen(代码生成器)

- 首先解析模版，生成AST语法树(一种用JavaScript对象的形式来描述整个模板)。使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。
- Vue的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的DOM也不会变化。那么优化过程就是深度遍历AST树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。
- 编译的最后一步是将优化后的AST树转换为可执行的代码
  createElement(标签名,属性对象,children)


### 10.Vue2.x和Vue3.x渲染器的diff算法分别说一下

简单来说，diff算法有以下过程

- 同级比较，再比较子节点
- 先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除)
- 比较都有子节点的情况(核心diff)
- 递归比较子节点

### 11.SSR了解吗

SSR也就是服务端渲染，也就是将Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端。

SSR有着更好的SEO、并且首屏加载速度更快等优点。
不过它也有一些缺点，比如我们的开发条件会受到限制，服务器端渲染只支持beforeCreate和created两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境。还有就是服务器会有更大的负载需求。


### 12.keep-alive了解吗

- keep-alive可以实现组件缓存,当组件切换时不会对当前的组件进行卸载
- 常用的两个属性include/exclude，允许组件有条件的进行缓存。
- 两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。
- keep-alive的中还运用了LRU(Least Recently Used)算法。


### 13.Vue中组件生命周期调用顺序说一下

组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。
组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

- 加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted

- 子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated

- 父组件更新过程
父beforeUpdate->父updated

- 销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed


# 14.hash路由和history路由实现原理说一下

location.hash的值实际就是URL中#后面的东西。
history实际采用了HTML5中提供的API来实现，主要有history.pushState()和history.replaceState()。


### 15.vue的事件绑定

- 原生事件通过 addEventListener 绑定给真实的元素
- 组件事件绑定是通过Vue自定义的$on实现的。


### 16.Vue2.x组件通信有哪些方式

- props、$on/$emit(通过事件传值) => 父子
- Bus：用一个空的VUE实例(全局要唯一) => 父子，兄弟，隔代
- $parent / $children 与 refs => 父子
  ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例  
  $parent / $children：访问父 / 子实例
- vuex => 父子，兄弟，隔代
- $attrs/$listeners => 父子，隔代
  $attrs：父组件绑定的非props属性  
  $listeners：父组件绑定的非原生事件
- provide/inject：允许祖先组件先子组件注入依赖 => 父子,隔代
  provide：父组件提供变量值  
  inject：子组件提供变量名
