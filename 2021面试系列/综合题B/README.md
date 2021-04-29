### 1.盒子模型

- box-sizing:content-box/border-box
- W3C标准的盒子模型
  - withd/height = content
  - 总宽高 = content + 2 * pading + 2 * border + 2 * margin
- IE的怪异盒子模型
  - withd/height = content+padding+border
  - 总宽高 = withd/height + 2 * margin = content + 2 * pading + 2 * border + 2 * margin
- margin-top和margin-right可以叠加
  - 都为正数或者都为负数取绝对值最大
  - 一正一负相加

### 2.1px问题

- 物理像素和逻辑像素，物理像素指的是设备的像素，而逻辑像素指的是计算机里面的坐标系的一个单位，比如CSS的像素就属于逻辑像素，DPR = 物理像素/逻辑像素，IPONHE6DPR为2，设计图750 * 1334，实际的屏幕375 * 667，设计图会出现1px，对应的CSS像素0.5px
- 放大：zoom: 0.5, transtrom:scale(0.5)
- viwport+rem: 根据手机屏幕的DPR，设置viwport, 放大相应的倍数，rem
- 使用背景图片，设置border-image，兼容性好，但是修改麻烦
- box-shadow:利用阴影
- 媒体查询 + 小数像素，兼容性问题
- 媒体查询 + scanle

### 3.3倍屏怎么做

针对不同的DPR，选择不同的图片

### 4.过渡transition和动画animation的区别

- 动画不需要事件触发，过度需要
- 过渡只有一组关键帧，开始和结束，动画可以设置多个组
- 简单的可以用过渡，复杂的用动画
- 拓展：transition ，transform， translate三者的用法
  - transform：变换，参数可以是translate，scale，rotate等；
  - translate：位移，是transform的一个属性；
  - transition：过渡，是唯一有时间参数的！transform可以作为他的一个参数。
- 性能transition会每一帧在主线程和GPU线程中来回切换，故而比较消耗性能，可能会卡顿  
  transform：一般只会切换一次

### 5.fixed如何相对于某个指定元素

- 设置子元素为absolue，相对于最外层绝对定位
- 使用position:sticky

### 6.说说浏览器渲染的具体过程

- 获取HTML数据，对文件进行解析形成DOM Tree
- 解析CSS，生成Style Rules
- 将DOM Tree和Style Riles合成Render Tree
- 进入布局阶段，为每个节点计算出在屏幕上的坐标位置
- 调用GPU进行绘制，遍历Render Tree的节点，将元素都呈现出来

### 7.浏览器的事件循环

- 浏览器时多线程，包括JS引擎线程，GUI线程，事件触发线程
- JS是单线程，大部分任务都是在主线程都览器的JS引擎中执行
- 在执行一段JS代码在执行的时候，（JS引擎）V8采用的是队列的方式，同时分任务队列和延迟队列（settimeout）
- 任务队列和延迟队列都属于宏任务
- 这里有一个比较特殊的就是异步的回调，针对异步的处理
  - 将异步回到入队列，这个时候会在红任务的队尾，一旦队列过长，会使得回调迟迟不能执行，造成应用卡顿
  - 将异步回调放到当前宏任务的末尾
- 引入了微任务，每个宏任务，其内部都有一个微任务队列，当该宏任务执行完成，会检查其中的微任务队列，如果为空则直接执行下一个宏任务，如果不为空，则依次执行微任务，执行完成才去执行下一个宏任务
- 常见的微任务有MutationObserver,Promise.then, Promise 为基础开发的其他技术,V8 的垃圾回收过程

### 8.node.js的事件循环

- 两者最主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行的，而nodejs中的微任务是在不同阶段之间执行的

### 9.promise和async awiat区别

- promise 解决了回调地狱问题
  - 回调函数的延迟绑定
  - 返回值穿透 ，解决了回调嵌套问题，可以链式调用
  - 错误冒泡，讲错误一直向后传递，解决了频繁检查错误问题
- asycn Generator + co（自执行函数）语法糖，返回结果为Promise
  - 解决了then不断调用问题
  - 可以用同步的方式写代码

- 不同点
  - promise是ES6，async/await是ES7
  - async/await相对于promise来讲，写法更加优雅
  - reject状态：
    1）promise错误可以通过catch来捕捉，建议尾部捕获错误，
    2）async/await既可以用.then又可以用try-catch捕捉

### 10.requestAnimateFrame他是解决什么问题的，属于宏任务还是微任务

  请求动画帧，主要用作连续绘制动画的
- requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
- 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。
- requestAnimateFrame宏任务


### 11.js原型和原型链的理解

- 在JS中，每一个函数(除了Function.prototype.bind)都有一个protoype这个属性，这个属性指向该函数的原型对象。
- 如果对这个函数进行new操作符，这个函数就会称作构造函数，同时返回一个实例对象
- 这个实例有私有的属性，__proto__ 指向构造函数的原型
- JS每一个对象都有一个指向其原型的关系链，当试图访问属性或者方法的时候，如果自身找不到，会到自己的原型，以及自己原型的原型上找，这个链条的终点会一直指向Object，Object的原型为null

### 12.call，apply，bind是做什么用的，怎么用

- 都是函数的内部方法，改变函数内部的this
- 其中call和apply都是立即执行的，区别是call接受的一个绑定的对象和n个单独的参数，apply则是接受一个单独的this和一个数组参数
- bind则绑定this，但不会立即执行

### 13.es5如果做继承详细步骤

### class的super是做什么用的，继承不写可以吗

- 在子类里面调用super(),会调用基类的construction函数
- 如果以对象形式调用
  - 如果在普通方法里面调用，super会指向父类的原型对象，会调用父类原型上的方法，此时的this指向子类的实例
  - 如果在静态方法中调用，super会指向父类，调用父类的方法，此时的this指向的就是子类了而并非子类的实例

### 基本类型怎么判断

- typeof: 不能区分null, 不能区分具体的对象类型
- Object.prototype.toString.call()
- isArray: es6判断数组

### typeof instanceof原理是什么

- typeof原理：js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息
  - 000：对象
  - 010：浮点数
  - 100：字符串
  - 110：布尔
  - 1：整数
  - null比较特殊，所有位数都是0的，所以会被误判断成null
- instanceof: 根据原型链查找，只要左边对象上能在右边的prototype上找到

### 性能检测怎么做，线上的性能检测怎么做

Jmeter

### 怎样会形成跨域，跨域怎么解决

- 浏览器的同源策略，一种浏览器的安全机制，要求协议，域名，端口，都要一致！
- 解决方法：最好后端解决
  - jsonp，只支持get，后端要配合
  - 空iframe加form
  - 开发环境webpack，proxy代理
  - 后端服务转发
  - 服务端配置CORS(跨域资源共享)。服务端设置运行跨域
  - Nginx搭建API接口网关

### https为什么可以防止篡改信息

- http是明文传输，可以用抓包软件直接抓取到信息
- 加密类型
  - 不可逆加密：MD5， SHA
  - 可逆加密-对称加密
  - 可逆加密-非对称加密-公钥私钥：RSA
- https加密过程：使用了非对称加密，对称加密以及HASH算法
  - 浏览器将自己支持的一套加密规则发送给网站
  - 网站从中选出一组加密算法与HASH算法，并将自己的身份信息以证书的形式发回给浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息
  - 获得网站证书之后
    - 浏览器验证证书的合法性，生成一串随机数的密码
    - 并用证书中提供的公钥加密，使用约定好的HASH计算握手消息
    - 并使用生成的随机数对消息进行加密，最后将之前生成的所有信息发送给网站。
  - 网站接收浏览器发来的数据之后
    - 使用自己的私钥将信息解密取出密码，使用密码解密浏览器发来的握手消息，并验证HASH是否与浏览器发来的一致
    - 使用密码加密一段握手消息，发送给浏览器
  - 浏览器解密并计算握手消息的HASH，如果与服务端发来的HASH一致，此时握手过程结束，之后所有的通信数据将由之前浏览器生成的随机密码并利用对称加密算法进行加密

### 如果做身份认证？如果做信息保护

单点登录
- CAS
  - 用户 => 应用
  - 应用重定向到认证中心
  - 认证中心返回凭证给用户
  - 用户将凭证信息给应用
  - 应用去认证中心验证有效性
  - 认证完成
- JWT
  - 原始登录需要将基本信息放到redis缓存中
  - token存储了用户的基本信息，不要存储敏感信息
- OAuth，需要授权
- OpenId,不需要授权

### vue的生命周期


### vue挂载是在哪个周期

beforeMount：在挂载开始之前被调用
mounted：挂载完成

### keep-alive怎么实现

- keep-alive缓存组件,本身本质也是一个组件，可以配合vue-router使用
- include(白名单), exclude(黑名单), max(缓存组件上限)
- 这个组件有一个属性abstract:true，同时维护一个数组用来存放缓存组件的key
- vue正常渲染render阶段开始的，但keep-alive的渲染是在patch阶段，这是构建组件树（虚拟DOM树），并将VNode转换成真正DOM节点的过程
- 这也意味这，VNode里面不会有keep-alive组件，自然也不会渲染成真是的DOM节点
- 只执行一次的钩子函数(缓存的组件不会进入$mount过程)：beforeCrate,Created,beforeMounted,mounted
- 可重复使用的钩子函数:activated,deactivated

### vue的双向绑定原理

vue2: Object.defindProperty
vue3: Proxy

### Vue和Vue3有什么区别

- 选项式API => 组合式API

### 实际有用过proxy吗

- vue小程序中状态管理
- 验证属性赋值
- 监控状态 => 做不同操作
- 设置数据缓存和超时

### taro和uniapp的最大区别



### 团队怎么做风格约束，语法约束，类型约束

### webpack如何解析less,sass

通过sass-loader,css-loader-style-loader
- sass-loader: 加载sass，将其转化为css，需要配置node-sass使用
- css-loader: 加载css，将css转换成commonjs
- style-loader: 通过style标签插入head标签中

### 如何利用webpack来优化前端性能

- 压缩代码
- 利用CND加速
- 删除死代码
- 提取公共代码


### 常见的loader

- file-loader: 将文件输出到另一个文件夹中，在代码中使用相对的URL引用
- url-loader: 和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader: 加载额外的map文件，主要用来断点调试
- img-loader： 加载并且压缩图片
- babel-loader：将ES6转换为ES5
- css-loader：加载css，支持模块化，压缩，导入等特性
- style-loader: 将CSS加载到JS中，通过DOM操作去加载CSS
- eslint-loader：通过ESLint检查JS代码


### 常见的plugin

- extrat-text-webpack-plugin: 合并样式
- define-plugin: 定义环境变量
- commons-chunk-plugin: 提取公共代码
- uglifyjs-webpack-plugin: 压缩代码
- webpack-dev-server: 服务器


### webpack开启热更新及原理

- 使用插件:HotModuleReplacementPlugin


### webpack中loader和plugin的区别

- loader主要用于转化文件的作用，目的是为了打包，运行在文件打包之前
- plugin不仅仅只是打包，他的功能更加丰富，在整个编译周期中都会起到作用

### webpack如果解决打包过大，时间过长呢

### 前端容灾方法

- loaclstorage,进行数据缓冲
- 备份一份静态数据到CDN
- 离线缓存

### gulp和webpack的区别是什么

- gulp: 基于工作流程，会配置一系列额task，然后根据顺序来处理这些task
- webpack：基于模块，更侧重模块打包，会将开发用到的所有资源看成模块，通过loader和plugin打包。


### 路由懒加载

