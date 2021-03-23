### HTML5的新特性

- 标签：新增语义化标签（aside / figure / section / header / footer / nav等），增加多媒体标签video和audio，使得样式和结构更加分离
- 属性：增强表单，主要是增强了input的type属性；meta增加charset以设置字符集；script增加async以异步加载脚本
- 存储：增加localStorage、sessionStorage和indexedDB，引入了application cache对web和应用进行缓存
- API：增加拖放API、地理定位、SVG绘图、canvas绘图、Web Worker、WebSocket


### doctype的作用是什么？

声明文档类型，告知浏览器用什么文档标准解析这个文档：

怪异模式：浏览器使用自己的模式解析文档，不加doctype时默认为怪异模式
标准模式：浏览器以W3C的标准解析文档


### 几种前端储存以及它们之间的区别

- cookies： HTML5之前本地储存的主要方式，大小只有4k，HTTP请求头会自动带上cookie，兼容性好
- localStorage：HTML5新特性，持久性存储，即使页面关闭也不会被清除，以键值对的方式存储，大小为5M
- sessionStorage：HTML5新特性，操作及大小同localStorage，和localStorage的区别在于sessionStorage在选项卡(页面)被关闭时即清除，且不同选项卡之间的sessionStorage不互通
- IndexedDB： NoSQL型数据库，类比MongoDB，使用键值对进行储存，异步操作数据库，支持事务，储存空间可以在250MB以上，但是IndexedDB受同源策略限制
- Web SQL：是在浏览器上模拟的关系型数据库，开发者可以通过SQL语句来操作Web SQL，是HTML5以外一套独立的规范，兼容性差


### href和src有什么区别

- href（hyperReference）即超文本引用：当浏览器遇到href时，会并行的地下载资源，不会阻塞页面解析，例如我们使用<link>引入CSS，浏览器会并行地下载CSS而不阻塞页面解析. 因此我们在引入CSS时建议使用<link>而不是@import

```html
<link href="style.css" rel="stylesheet" />
```

复制代码src（resource）即资源，当浏览器遇到src时，会暂停页面解析，直到该资源下载或执行完毕，这也是script标签之所以放底部的原因

```html
<script src="script.js"></script>
```

### meta有哪些属性，作用是什么

meta标签用于描述网页的元信息，如网站作者、描述、关键词，meta通过name=xxx和content=xxx的形式来定义信息，常用设置如下：

```html
<!-- charset：定义HTML文档的字符集 -->
<meta charset="UTF-8" >
<!-- http-equiv：可用于模拟http请求头，可设置过期时间、缓存、刷新 -->
<meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT">
<!-- viewport：视口，用于控制页面宽高及缩放比例 -->
<meta 
    name="viewport" 
    content="width=device-width, initial-scale=1, maximum-scale=1"
>
```


### viewport有哪些参数，作用是什么

- width/height，宽高，默认宽度980px
- initial-scale，初始缩放比例，1~10
- maximum-scale/minimum-scale，允许用户缩放的最大/小比例
- user-scalable，用户是否可以缩放 (yes/no)


### http-equive属性的作用和参数

- expires，指定过期时间
- progma，设置no-cache可以禁止缓存
- refresh，定时刷新
- set-cookie，可以设置cookie
- X-UA-Compatible，使用浏览器版本
- apple-mobile-web-app-status-bar-style，针对WebApp全屏模式，隐藏状态栏/设置状态栏颜色


### 标准模式与兼容模式各有什么区别？

标准模式的渲染方式和 JS 引擎的解析方式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示
，模拟老式浏览器的行为以防止站点无法工作。


### SGML 、 HTML 、XML 和 XHTML 的区别？

- SGML 是标准通用标记语言，是一种定义电子文档结构和描述其内容的国际标准语言，是所有电子文档标记语言的起源。
- HTML 是超文本标记语言，主要是用于规定怎么显示网页。
- XML 是可扩展标记语言是未来网页语言的发展方向，XML 和 HTML 的最大区别就在于 XML 的标签是可以自己创建的，数量无限多，
而 HTML 的标签都是固定的而且数量有限。
- XHTML 也是现在基本上所有网页都在用的标记语言，他其实和 HTML 没什么本质的区别，标签都一样，用法也都一样，就是比 HTML 
更严格，比如标签必须都用小写，标签都必须有闭合标签等。


### 行内元素和块级元素

- 行内元素： a b span img strong sub sup button input label select textarea
- 块级元素： div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p 


### 空元素定义

标签内没有内容的 HTML 标签被称为空元素。空元素是在开始标签中关闭的。
常见的空元素有：br hr img input link meta


### 页面导入样式时，使用 link 和 @import 有什么区别？

- 从属关系区别。 @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网站图标等。
- 加载顺序区别。加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载。
- 兼容性区别。@import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容性问题。
- DOM 可控性区别。可以通过 JS 操作 DOM ，插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用 @import 的方式插入样式。


### b 与 strong 的区别和 i 与 em 的区别？

页面显示效果来看，被 <b> 和 <strong> 包围的文字将会被加粗，而被 <i> 和 <em> 包围的文字将以斜体的形式呈现。

但是 <b> <i> 是自然样式标签，分别表示无意义的加粗，无意义的斜体，表现样式为 { font-weight: bolder}，仅仅表示「这
 里应该用粗体显示」或者「这里应该用斜体显示」，此两个标签在 HTML4.01 中并不被推荐使用。

 而 <em> 和 <strong> 是语义样式标签。 <em> 表示一般的强调文本，而 <strong> 表示比 <em> 语义更强的强调文本。


 ### 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

 SessionStorage， LocalStorage， Cookie 这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。区别在于前两者属于 HTML5 WebStorage，创建它们的目的便于客户端存储数据。而 cookie 是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）。cookie 数据始终在同源（协议、主机、端口相同）的 http 请求中携带（即使不需要），会在浏览器和服务器间来回传递。
 
 
- 存储大小：
   	cookie 数据大小不能超过4 k 。
   	sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

- 有期时间：
   	localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。
   	sessionStorage  数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。
   	cookie          设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。
  
- 作用域：
     sessionStorage  只在同源的同窗口（或标签页）中共享数据，也就是只在当前会话中共享。
     localStorage    在所有同源窗口中都是共享的。
     cookie          在所有同源窗口中都是共享的。

  
### iframe 有那些缺点？

- iframe 会阻塞主页面的 onload 事件。window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 src 可以避免这种阻塞情况。
- 搜索引擎的检索程序无法解读这种页面，不利于网页的 SEO 。
- iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
- 浏览器的后退按钮失效。
- 小型的移动设备无法完全显示框架。


### Label 的作用是什么？是怎么用的？

label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```html
 <label for="Name">Number:</label>
 <input type="text" name="Name" id="Name"/>
```


### HTML5 的 form 的 autocomplete(自动完成)功能是什么？

自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。

autocomplete 属性适用于 <form>，以及下面的 <input> 类型：text, search, url, telephone, email, password, datepickers, range 以及 color。


### 如何在页面上实现一个圆形的可点击区域

- 纯 html 实现，使用 <area> 来给 <img> 图像标记热点区域的方式，<map> 标签用来定义一个客户端图像映射，<area> 标签用来定义图像映射中的区域，area 元素永远嵌套在 map 元素内部，我们可以将 area 区域设置为圆形，从而实现可点击的圆形区域。
- 纯 css 实现，使用 border-radius ，当 border-radius 的长度等于宽高相等的元素值的一半时，即可实现一个圆形的点击区域。
- 纯 js 实现，判断一个点在不在圆上的简单算法，通过监听文档的点击事件，获取每次点击时鼠标的位置，判断该位置是否在我们规定的圆形区域内。


### 实现不使用 border 画出 1 px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。

```html
<div style="height:1px;overflow:hidden;background:red"></div>
```


### title 与 h1 的区别？

title 属性没有明确意义只表示是个标题，h1 则表示层次明确的标题，对页面信息的抓取也有很大的影响。


### <img> 的 title 和 alt 有什么区别？

title 通常当鼠标滑动到元素上的时候显示

alt 是 <img> 的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。可提图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析


### 网页验证码是干嘛的，是为了解决什么安全问题？

- 区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水
- 有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试


### 渐进增强和优雅降级的定义

- 渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级：一开始就根据高版本浏览器构建完整的功能，然后再针对低版本浏览器进行兼容。


### 对 web 标准: 可用性、可访问性、可维护性的理解

- 可用性（Usability）：产品是否容易上手，用户能否完成任务，效率如何，以及这过程中用户的主观感受可好，是从用户的角度来看产品的质量。可用性好意味着产品质量高，是企业的核心竞争力
- 可访问性（Accessibility）：Web 内容对于残障用户的可阅读和可理解性
- 可维护性（Maintainability）：一般包含两个层次，一是当系统出现问题时，快速定位并解决问题的成本，成本低则可维护性好。二是代码是否容易被人理解，是否容易修改和增强功能。


### IE 各版本和 Chrome 可以并行下载多少个资源？

- IE6 2 个并发
- iE7 升级之后的 6 个并发，之后版本也是 6 个
- Firefox，chrome 也是6个


### Flash、Ajax 各自的优缺点，在使用中如何取舍？

Flash：
- Flash 适合处理多媒体、矢量图形、访问机器
- 对 CSS、处理文本上不足，不容易被搜索

Ajax：
- Ajax 对 CSS、文本支持很好，支持搜索
- 多媒体、矢量图形、机器访问不足

共同点：
- 与服务器的无刷新传递消息
- 可以检测用户离线和在线状态
- 操作 DOM


### 怎么重构页面？

- 编写 CSS
- 让页面结构更合理化，提升用户体验
- 实现良好的页面效果和提升性能