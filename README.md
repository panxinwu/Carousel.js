Carousel.js
===========

#循环轮播插件

//TODO 使用文档

##1.准备开始使用
页面中引用carousel.js和carousel.css，指定一个div作为容器（下文简称容器），并按自己的需求设置高宽，在这个div里面放置多个class="item"的div，各个div放置轮播内容。如：
<pre><code>
&lt;!doctype html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="utf-8" /&gt;
        &lt;meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /&gt;
        &lt;title&gt;carousel.js demo&lt;/title&gt;
        &lt;style type="text/css"&gt;
            .container{
                width:1000px;
                height:500px;
                margin-bottom:50px;
            }
            .item{
                background:none #e1e1e1;
                font-size:5em;
            }
        &lt;/style&gt;
        &lt;link href="carousel.css" rel="stylesheet" type="text/css" /&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div class="container"&gt;
                    &lt;div class="item"&gt;111&lt;/div&gt;
                    &lt;div class="item"&gt;22&lt;/div&gt;
                    &lt;div class="item"&gt;3 3 3&lt;/div&gt;
                    &lt;div class="item"&gt; 4444&lt;/div&gt;
                    &lt;div class="item"&gt; 5 5 5 5 5&lt;/div&gt;
        &lt;/div&gt;
        &lt;script src="jquery-1.7.2.js"&gt;&lt;/script&gt;
        &lt;script src="carousel.js"&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;

</code></pre>

##2.最简单的用法
为第一步中的“容器”指定一个data-carousel属性，值留空或任意值，便可以自动生成轮播效果。

##3.自定义配置方法
