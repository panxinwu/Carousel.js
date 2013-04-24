Carousel.js
===========

轮播UI插件

//TODO 使用文档

##1.最简单的用法

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
        &lt;div class="container" data-carousel&gt;
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
