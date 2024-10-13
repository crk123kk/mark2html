###### 原文
>[博客原文](https://www.cnblogs.com/shcrk/p/9338423.html)

###### 大纲
>1、什么是vue指令
    2、向指令中传入参数
    3、指令中带入修饰符
    4、指令的缩写
    5、常见的vue指令
    5.1、v-model双向绑定数据
    5.2、v-for循环
    5.3、v-if 元素的存在与否
    5.4、v-else 搭配v-if使用
    5.5、v-else-if搭配v-if使用
    5.6、v-bind 属性绑定
    5.7、v-style 通过v-bind实现style的绑定
    5.8、v-class 通过v-bind实现class的绑定
    5.9、v-on 事件绑定
    5.10、v-text 读取文本
    5.11、v-html 读取html标签
    5.12、v-once 只渲染一次
    5.13、v-pre 把标签内部的元素原位输出
    5.14、v-show 是否显示

###### 1、什么是vue指令
>指令 (Directives) 是带有 v- 前缀的特殊属性。指令属性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
```
<p v-if="seen">现在你看到我了</p>

<!--
    这里，v-if 指令将根据表达式 seen 的值的真假来插入/移除 <p> 元素。
-->
```
###### 2、向指令中传入参数
> 一些指令能够接收一个“参数”，在指令名称之后以冒号表示。
例如，v-bind 指令可以用于响应式地更新 HTML 属性：
```
<a v-bind:href="url">...</a>
<!--
    在这里 href 是参数，告知 v-bind 指令将该元素的 href 属性与表达式 url 的值绑定。
-->
```
>另一个例子是 v-on 指令，它用于监听 DOM 事件：
```
<a v-on:click="doSomething">...</a>

<!--
    在这里参数是监听的事件名。
-->
```
###### 3、指令中带入修饰符
>修饰符 (Modifiers) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
```
<form v-on:submit.prevent="onSubmit">...</form>
```
###### 4、指令的缩写
>v- 前缀作为一种视觉提示，用来识别模板中 Vue 特定的特性。当你在使用 Vue.js 为现有标签添加动态行为 (dynamic behavior) 时，v- 前缀很有帮助，然而，对于一些频繁用到的指令来说，就会感到使用繁琐。同时，在构建由 Vue.js 管理所有模板的单页面应用程序 (SPA - single page application) 时，v- 前缀也变得没那么重要了。因此，Vue.js 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写：
```
<!--
    v-bind 缩写
-->
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!--
    v-on 缩写
-->

<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```
>它们看起来可能与普通的 HTML 略有不同，但 : 与 @ 对于特性名来说都是合法字符，在所有支持 Vue.js 的浏览器都能被正确地解析。而且，它们不会出现在最终渲染的标记中。缩写语法是完全可选的，但随着你更深入地了解它们的作用，你会庆幸拥有它们。

###### 5、常见的vue指令
######  5.1、v-model双向绑定数据
```
<input type="text" v-model="msg"/>
{{msg}} <!--取数据-->
```
###### 5.2、v-for循环
>我们用 v-for 指令根据一组数组的选项列表进行渲染。v-for 指令需要使用 item in items 形式的特殊语法，items 是源数据数组并且 item 是数组元素迭代的别名。
```
<ul>
    <li v-for="item of items" v-bind:key="item.age">
        <span>{{item.name}}</span>
        <span>{{item.age}}</span>
    </li>
</ul>
```
```
items: [
    {'name': 'xiaohong1', 'age': 12},
    {'name': 'xiaohong2', 'age': 12},
    {'name': 'xiaohong3', 'age': 12},
    {'name': 'xiaohong4', 'age': 12}
]
```

###### 5.3、v-if 元素的存在与否
> 控制元素的存在与否，当传入v-if的值是true的时候则v-if绑定的DOM存在（切记这里说的是存在与否而不是显示与否）
```
<div>
    <span class="title">存在或不存在：v-if</span><br>
    <span v-if="condition">存在</span><br>
    <span v-if="!condition">不存在</span><br>
</div>
```
###### 5.4、v-else 搭配v-if使用
>使用 v-else 指令来表示 v-if 的“else 块”
    v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。
```
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```
###### 5.5、v-else-if搭配v-if使用
>2.1.0 新增
v-else-if，顾名思义，充当 v-if 的“else-if 块”，可以连续使用：
类似于 v-else，v-else-if 也必须紧跟在带 v-if 或者 v-else-if 的元素之后。
```
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```
###### 5.6、v-bind 属性绑定
>通过v-bind可以动态绑定标签上的属性的值，如input的value/name等属性的值。
```
<input v-bind:value="name">
```
######5.7、v-style 通过v-bind实现style的绑定
>vue中没有专门style的绑定，但是可以通过v-bind实现类似于v-style的绑定。
```
<span v-bind:style="{'color':'red'}">绑定color:red样式</span>
```
###### 5.8、v-class 通过v-bind实现class的绑定
>vue中没有专门class的绑定，但是可以通过v-bind实现类似于v-class的绑定。
```
<span v-bind:class="'text'">绑定title样式</span>
```
###### 5.9、v-on 事件绑定
>可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码
    然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的
    因此 v-on 还可以接收一个需要调用的方法名称
```
<span v-on:click="clickMe()">点击我输出日志</span>
```

###### 5.10、v-text 读取文本
>会将变量中的内容以文本的形式输出，哪怕内容中含有html标签，也不会解析，而是以文本的形式输出。
    如:someHtml: '<i><b>我是一些html斜体字</b></i>' 得到的结果就是：<i><b>我是一些html斜体字</b></i>
```
<span v-text="someText"></span>
```
###### 5.11、v-html 读取html标签
>会将变量中的内容读取出来，会解析内容中的html标签
    如下得到的结果就是加粗的斜体字：我是一些html斜体字
```
<span v-html="someHtml"></span>
```

###### 5.12、v-once 只渲染一次
>v-once  进入页面时,只渲染一次,不再进行渲染:<span v-once>我只渲染一次</span>
    如果如下绑定在事件中，那么这个事件只会执行一次，而且是在渲染的时候自动帮我们执行了这个事件，之后的点击效果就失效
```
<span v-on.once:click="clickMe()">我是只渲染一次的点击事件</span>
```
###### 5.13、v-pre 把标签内部的元素原位输出
>不会解析somePreText内的东西，直接原样输出{{soemPreText}}
```
<span v-pre>{{soemPreText}}</span>
```
###### 5.14、v-show 是否显示
>控制dom是否显示，即显示或隐藏
    不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。
注意，v-show 不支持 <template> 元素，也不支持 v-else。
```
<span v-show="condition">显示</span><br>
<span v-show="!condition">隐藏</span><br>
```


