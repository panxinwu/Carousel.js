Carousel.js
===========

#循环轮播插件


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
为第一步中的“容器”指定一个data-carousel属性，值留空或任意值，便可以自动生成轮播效果。如：
<pre><code>
    &lt;div class="container" data-carousel="something"&gt;
        &lt;div class="item"&gt;111&lt;/div&gt;
        &lt;div class="item"&gt;22&lt;/div&gt;
        &lt;div class="item"&gt;3 3 3&lt;/div&gt;
        &lt;div class="item"&gt; 4444&lt;/div&gt;
        &lt;div class="item"&gt; 5 5 5 5 5&lt;/div&gt;
    &lt;/div&gt;
</code></pre>

##3.自定义配置方法
觉得上面的方法太弱了？那你可以不添加data-carouse，自行在页面中使用这样的代码来自定义配置
<pre><code>
    &lt;div class="container" id="jscontrol"&gt;
        &lt;div class="item"&gt;111&lt;/div&gt;
        &lt;div class="item"&gt;22&lt;/div&gt;
        &lt;div class="item"&gt;3 3 3&lt;/div&gt;
        &lt;div class="item"&gt; 4444&lt;/div&gt;
        &lt;div class="item"&gt; 5 5 5 5 5&lt;/div&gt;
    &lt;/div&gt;
    $(function () {
        $('#jscontrol').carousel({
            showSurrounding: true //是否显示周围的区域，不设置则默认为false，个别需要显示旁边元素显示美化效果的需求时用到，如百度相册首页就有这样的效果
            ,reverse:true //自动动画方向，不设置则默认为向右（false），设置为true则相反
            ,interval: 1 //自动播放的间隔时间（秒），不设置则默认是5（秒）
            ,speed: 0.2 //滚动一次需要的时间(秒)，不设置则默认是0.6（秒）
            ,indicatorPosition: 'top' //指示器（小圆点）的位置（top，bottom），不设置则默认是bottom
            ,indicatorAlign: 'right' //指示器水平位置（left，center，right），不设置则默认是center
        });
    });
</code></pre>
