/**
 * 对外暴露对象 含canvas创建 和 图片静态资源加载方法
 * Created by Administrator on 2017-1-11.
 */
(function (ww) {
    // 角度转弧度
    function toRadian(angle) {
        return angle / 180 * Math.PI;
    };

    //获取canvas相关信息
    function CanvasInfo(canvas) {
        this.self = canvas;
        this.width = canvas.width,
        this.height = canvas.height,
        this.ctx = canvas.getContext('2d');
        this.handleList = [];//点击时间回调函数列表

        this.EventType =
            ww.navigator.userAgent.indexOf('Mobile') > -1
                ? 'mousedown' : 'click';

    }

    CanvasInfo.prototype = {
        constructor: CanvasInfo,
        addListner: function (fn) {
            var self = this;

            if(!fn || self.handleList.indexOf(fn) > -1)return;

            self.handleList.push(fn);
            self.self.addEventListener(self.EventType, fn);
        },
        removeListner: function (index) {
            var self = this;

            if(index){
                var fn = this.handleList[index];
                self.self.removeEventListener(self.EventType, fn);
                self.handleList.splice(index, 1);
            }else{
                self.handleList.forEach(function (fn) {
                    self.self.removeEventListener(self.EventType, fn);
                });
                self.handleList.length = 0;
            }
        }
    };

    //静态资源列表
    function StaticSource() {
        //图片名字集合
        this.imgSrcs = [
            "birds", "land", "pipe1", "pipe2",
            "sky", 'cent', 'score_panel',
            'text_game_over', 'button_play',
            'title', 'tutorial', 'text_ready'
        ];
        //图片对象列表
        this.imgList = {};
        //是否已经加载过资源
        this.hasLoadStaticSource = false;
    }
    //加载静态资源
    StaticSource.prototype.load = function (callBack) {
        var imgNO = this.imgSrcs.length,
            loadedNo = 0,
            that = this;
        //杜绝重复加载
        if(this.hasLoadStaticSource){
            callBack && callBack.call(that);
            return;
        }
        this.imgSrcs.forEach(function (src) {
            var img = new Image();
            img.src = "imgs/" + src + ".png";
            that.imgList[src] = img;

            img.addEventListener('load', function () {
                loadedNo ++;
                if(loadedNo == imgNO){
                    this.hasLoadStaticSource = true;
                    callBack && callBack.call(that);
                }
            });
        });
    };

    var instance1 = null,
        instance2 = null;
    var Flappy = {
        toRadian: toRadian,
        createCV: function (canvas) {
            if(instance1 == null){
              instance1 = new CanvasInfo(canvas);
            }
        },
        getCV: function () {
            return instance1;
        },
        getStaticSource: function () {
            if(instance2 == null){
                instance2 = new StaticSource();
            }
            return instance2;
        }
    };
    ww.Flappy = Flappy;
})(window);