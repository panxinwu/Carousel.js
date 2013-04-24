!function ($) {
/**
 * @description Carousel UI Tool
 * @author yangchunwen@baidu.com
 * @date since 2013/04/17
 */
    function Carousel (option) {
        $.extend(this, option);
        this.init();
    }
    //默认值配置
    var SPEED = 0.6,//滚动速度
        INTERVAL = 5,//自动滚动间隔时间
        autoDIRECTION = "right",//left,自动滚动方向
        indicatorPosition = 'bottom',//top,指示器（小圆点）的位置，默认在底部
        indicatorAlign = 'center',//left,right,指示器的水平位置，默认是中间
        HEIGHT = 100,//轮播内容区域的高和宽，默认为100%
        WIDTH = 100;

    Carousel.prototype = {
        constructor: Carousel,
        id: null,
        speed: SPEED,
        interval: INTERVAL,
        showSurrounding: false,//是否显示旁边的元素,默认不显示
        reverse: false,
        indicatorPosition: indicatorPosition,//指示器位置配置
        indicatorAlign: indicatorAlign,//指示器对齐方式配置
        animate: false,//标记当前是否在执行动画
        forward: false,
        backward: false,
        inited: false,
        $outer: null,
        $inner: null,
        $wrapper: null,
        $indicator: null,
        $pointer: null,
        $active: null,
        $next: null,
        $prev: null,
        $toRemove: null,
        $toRemoveLast: null,
        $toRemoveFirst: null,
        amount: null,
        width: null,
        left: null,
        aminateLeft: null,
        intervalHandler: null,
        height: HEIGHT + '%',
        width: WIDTH + '%',
        execStack: [],//动画执行堆栈，多个连续动画（例如需要一次跳动多步时），把每一步的动画存放在此
        init: function () {
            var me = this;
            me.initeComponents();
            me.startInterval();
            me.bindHandler();
            me.inited = true;
        },
        initeComponents: function () {
            var me = this, inner, wrapper, width, items, pointers;

            me.$outer = me.$outer || me.$element.addClass('carousel-outer');

            if(!me.showSurrounding) {
                me.$outer.css('overflow', 'hidden');
            }

            inner = $('<div class="carousel-inner"></div>');
            wrapper = $('<div class="carousel-inner-wrapper"></div>');

            me.$inner = inner;
            me.$wrapper = wrapper;

            items = me.$outer.find('.item');
            items.appendTo(wrapper);
            wrapper.appendTo(inner);
            inner.appendTo(me.$outer);

            items.each(function (i, v) {
                v.setAttribute('index', i + 1);
            });

            width = me.width = inner.width();
            me.left = -width;

            items.width(width);
            wrapper.css('margin-left', me.left);
            me.$active = items.eq(1);
            
            me.aminateLeft = me.left - width;

            //指示器（小圆点）
            me.$indicator = me.$outer.find('div.carousel-indicator');
            !me.$indicator.length && (me.$indicator = $('<div class="carousel-indicator"></div>').appendTo(me.$outer));
            indicators = '';
            for(var i = 0, len = me.amount = items.length; i < len; i++) {
                if(i === 1) indicators += '<a ' + 'index="' + (i + 1) + '" class="active"></a>';
                else indicators += '<a ' + 'index="' + (i + 1) + '"></a>';
            }
            me.$indicator.html(indicators);
            me.$indicator.css({'text-align': me.indicatorAlign});
            me.indicatorPosition == 'top' ? me.$indicator.css({'top': 0}) : me.$indicator.css({'bottom': 0});

            //左右箭头
            me.$pointer = me.$outer.find('div.carousel-pointer');
            !me.$pointer.length && (me.$pointer = $('<div class="carousel-pointer"></div>').appendTo(me.$outer));
            me.$pointer.html('<a class="turn-left">&lt;</a><a class="turn-right">&gt;</a>');
        },
        jumpLeft: function (speed, callback) {
            if(typeof speed === 'function') {
                callback = speed;
                speed = null;
            }

            var me  = this,
                speed = speed || me.speed,
                $toRemove,
                $toBePrev,
                goal;

            //当前动画未完成，则直接忽略动作 TODO
            if(me.animate) {
                return;
            }

            //动画开始
            me.animate = true;
            me.stopInterval();

            //动画开始后，把当前回调存放到执行队列中
            if(typeof callback === 'function') {
                me.execStack.push(callback);
            }

            /**
             * @基本原理：
             * 当前显示区域$active向右消失后，其前一个显示到中间
             * 而此时这个刚显示到中间的前一个$toBePrev不存在，动画开始之前，需要把循环队列（各个区块）的最后一个复制到最前面去，并设置外层区域的margin-left往左退一格，使外表看起来像没有移动一样
             * 动画中，改变margin-left的值，使当前区域$active的前一个显示到中间区域
             * 动画完成后，最后一个toRemoveLast已经被复制到了最前面，所以要将其移除
             */
            $toRemove = me.$toRemove = me.$wrapper.find('.item:last');
            $toBePrev = $toRemove.clone(true)
            me.$toRemoveLast = $toRemove;
            $toBePrev.prependTo(me.$wrapper);
            me.$wrapper.css('margin-left', me.left - me.width);

            goal = me.left;
            me.$wrapper.animate(
                {'margin-left': goal},
                speed * 1000,
                $.proxy(me.resetLeft, me)
            );
        },
        resetLeft: function () {
            var me = this, indicators;
            if(me.$toRemoveLast) {
                me.$toRemoveLast.remove();
                me.$toRemoveLast = null;
            }
            me.$active = me.$active.prev();

            indicators = me.$indicator.find('a');
            indicators.filter('.active').removeClass('active');
            indicators.filter('a[index=' + me.$active.attr('index') + ']').addClass('active');

            me.animate = false;

            if(!me.execStack.length) {
                me.startInterval();
            }
            //仅执行执行队列里的第一个，下一个会成为它的回调
            else {
                me.execStack.shift().call(me);
            }
        },
        jumpRight: function (speed, callback) {
            if(typeof speed === 'function') {
                callback = speed;
                speed = null;
            }

            var me  = this,
                speed = speed || me.speed,
                $toBeNext,
                $prev, goal;

            if(me.animate) {
                return;
            }

            me.animate = true;//动画行为开始
            me.stopInterval();
            
            //动画开始后，把当前回调存放到执行队列中
            if(typeof callback === 'function') {
                me.execStack.push(callback);
            }

            /**
             * @基本原理：
             * 当前显示区域$active向左消失后，其下一个$active.next()显示到中间
             * 而这个刚显示到中间的下一个$toBeNext不存在的情况下，需要把当前区域的前一个$prev复制到最后面去
             * 动画完成后,把这个已经复制到最后的$prev删除，并重新设置外层margin-left使目的区域定位到中间
             * （其实就是只有三个循环区块的时候会出现这种情况）
             */
            $prev = me.$active.prev();
            $toBeNext = me.$active.next().next();
            if(!$toBeNext.length) {
                me.$toRemove = $prev;
                $toBeNext = $prev.clone(true).appendTo(me.$wrapper);//如前面注释，把前一个复制到最后面，
                me.$toRemoveFirst = me.$toRemove;
            }

            goal = me.aminateLeft;
            me.$wrapper.animate(
                {'margin-left': goal},
                speed * 1000,
                $.proxy(me.resetRight, me, callback)
            );
        },
        resetRight: function (callback) {
            var me = this, indicators;
            if(me.$toRemoveFirst) {
                me.$toRemoveFirst.remove();
                me.$toRemoveFirst = null;
            } else {
                me.$wrapper.find('.item:first').appendTo(me.$wrapper);
            }
            me.$wrapper.css('margin-left', me.left);
            me.$active = me.$active.next();

            indicators = me.$indicator.find('a');
            indicators.filter('.active').removeClass('active');
            indicators.filter('a[index=' + me.$active.attr('index') + ']').addClass('active');

            me.animate = false;

            if(!me.execStack.length) {
                me.startInterval();
            }
            //仅执行执行队列里的第一个，下一个会成为它的回调
            else {
                me.execStack.shift().call(me);
            }
        },
        /*跳转多步*/
        jump: function (span) {
            var me = this,
                i = 0,
                speed, animate;
            
            if(span === 0) return;
            animate = span < 0 ? me.jumpLeft : me.jumpRight;

            span = Math.abs(span);
            //TODO 待优化
            speed = me.speed / span - 0.02;

            //动作在队列中，启动第一个动作，后面的会相应成为回调
            for(; i < span; i++) {
                me.execStack.push($.proxy(animate, me, speed));
            }
            !!me.execStack[0] && me.execStack.shift().call(me);
        },
        reInit: function () {
        },
        buildComponents: function () {
        },
        bindHandler: function () {
            var me = this;
            me.$pointer.click(function (e) {
                me._pointerHandler(e);
            });
            me.$indicator.click(function (e) {
                me._indicatorHandler(e);
            });
        },
        _pointerHandler: function (e) {
            var me = this;
            var e = e || window.event,
                $target = $(e.target || e.srcElement);
            if($target.hasClass('turn-left')) {
                me.jumpLeft();
            } else if($target.hasClass('turn-right')) {
                me.jumpRight();
            }
        },
        _indicatorHandler: function (e) {
            var me = this;
            var e = e || window.event,
                $target = $(e.target || e.srcElement),
                index = parseInt($target.attr('index')),
                active = parseInt($target.siblings('.active').attr('index')),
                span;
            /**
             * 此处逻辑有点拗口
             * 点击的index在当前active之前与之后，需要向前或向后走的步数是不一样的
             * 计算向前和向后需要走的步数后，选择最小的
             */
            if(index > active) {
                forward = index - active;//向前跳需要走的步数
                backward = active + (me.amount - index);//向后跳需要走的步数
                if(forward <= backward) {
                    span = forward;
                } else {
                    span = -backward;
                }
            } else if(index < active) {
                forward = (me.amount - active) + index;
                backward = active - index;
                if(forward < backward) {
                    span = forward;
                } else {
                    span = -backward;
                }
            }

            if(span) me.jump(span);
        },
        startInterval: function (reverse) {
            var me = this,
                interval = me.interval,
                reverse = me.reverse;
            if(!me.intervalHandler) {
                me.intervalHandler = setInterval(function () {
                    if(!reverse) me.jumpRight();
                    else me.jumpLeft();
                }, interval * 1000);
            }
        },
        stopInterval: function () {
            var me = this;
            if(me.intervalHandler) {
                clearInterval(me.intervalHandler);
                me.intervalHandler = null;
            }
        },
        dissmiss: function () {
            var me = this;
            me.stopInterval();
        }
    };

    $.fn.carousel = function (option) {
        this.each(function () {
            var data, $this = $(this);
            $this.data('carousel', data = new Carousel($.extend({$element: $this}, option)));
        });
    };

}(window.jQuery);
