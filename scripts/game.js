/**
 * 游戏对象
 * Created by Administrator on 2017-1-11.
 */

(function (Flappy, ww) {
    function Game(canvas) {
        this.canvas = canvas;

        this.roleList = [];//渲染对象列表

        this.control = {};//可供监听的对象列表

        this.hasLoadStaticSource = false; //是否加载过静态资源

        this.animateFrame = null;//游戏动画引擎

        this.isFirstStart = true;//是否第一次开始

        this.hasReady = false;//是否准备好

        this.isOver = false; //游戏结束
    }
    Game.prototype = {
        constructor: Game,

        _init: init, //初始化

        start: start, //开始

        _play: play,//准备完毕后开始玩

        _reStart: reStart, //重新开始

        over: over,//结束

        _render: render, //渲染

        _centChange: centChange,//分数变化

        _addListener: addListener, //添加监听

        extend: extend//扩展
    };

    //======================= 初始化 =========================
    function init(){
        var self = this;

        self.canvas.width = Flappy.Config.viewContainer.width;
        self.canvas.height = Flappy.Config.viewContainer.height;

        Flappy.createCV(self.canvas);

        Flappy.getStaticSource().load(function () {
            var Factory = Flappy.Factory;

            /************** 绘制入口场景 ******************/
            if(self.isFirstStart){
                //初始化 开始界面
                var startView = Factory.createStartView();
                //开始按钮 点击回调函数
                var btnHandle = function () {
                    //解除绑定事件
                    Flappy.getCV().removeListner();
                    //游戏开始
                    self.start();
                };
                startView.draw(btnHandle);
                self.isFirstStart = false;

                return;
            }

            /************** 绘制游戏场景 ******************/
            //初始化 天空
            var skys = Factory.createBackground('sky');
            self.roleList = self.roleList.concat(skys);

            //初始化 管道
            var pipes = Factory.createPipes();
            self.roleList = self.roleList.concat(pipes);
            self.control.getPipes = pipes;

            //初始化 大地
            var lands = Factory.createBackground('land');
            self.roleList = self.roleList.concat(lands);

            //初始化 小鸟
            var bird = Factory.createBird();
            self.roleList.push(bird);
            self.control.getBird = bird;

            //初始化 分数
            var cent = Factory.createCent();
            self.roleList.push(cent);
            self.control.getCent = cent;

            var readyView = Factory.createReadyView();
            self.roleList.push(readyView);
            self.control.getReadyView = readyView;

            //初始化 结束图形
            var over = Factory.createOverView(cent);
            self.control.getOverView = over;

            self._render();
            self._addListener();
        });
    }
    //==================== 点击鼠标左键 ===================
    function addListener() {
        var that = this;
        Flappy.getCV().addListner(function() {
            //控制小鸟向上飞
            that.control.getBird.fly();
        });
    }
    //======================= 开 始 ==========================
    function start() {
        //初始化
        this._init();
    }
    //====================== 重新开始 =========================
    function reStart() {
        var self = this;
        //游戏是否准备完毕
        self.hasReady = false;
        //游戏是否结束
        self.isOver = false;
        //解除绑定事件
        Flappy.getCV().removeListner();
        //刷新小鸟
        self.control.getBird.refresh();
        //渲染对象列表
        self.roleList = [];
        //可供监听的对象列表
        self.control = {};
        //游戏动画引擎
        self.animateFrame = null;
        //初始化
        self._init();
    }
    //================== 准备完毕后开始玩 =====================
    function play(role) {
        if(role instanceof Flappy.Background ||
            role instanceof Flappy.Pipe ||
            role instanceof Flappy.Bird
        ){
            role.canMove = true;
        }
    }
    //======================= 结 束 ==========================
    function over() {
        var self = this,
            strorage = ww.localStorage,
            historyCent = strorage.getItem('flappy_max_cent'),
            curCent = self.control.getCent.get();

        //保存最高记录
        if(historyCent < curCent){
            strorage.setItem('flappy_max_cent', curCent);
            self.control.getCent.maxCent = curCent;
        }
        /************** 绘结束场景 ******************/
        setTimeout(function () {
            //绘制背景
            self.roleList.forEach(function (role) {
                if(role instanceof Flappy.Background){
                    role.draw();
                }
            });
            //重新开始按钮 点击回调函数
            var btnHandle = function () {
                self._reStart();
            };
            //绘制游戏结束界面
            self.control.getOverView.draw(btnHandle);
        }, 300);
    }

    //======================= 渲 染 ==========================
    function render() {
        var self = this,
            ctx = Flappy.getCV().ctx,
            width = this.width,
            height = this.height;
        (function render() {
            ctx.beginPath();
            ctx.clearRect(0, 0, width, height);

            var roleList = self.roleList;
            //渲染 图形对象列表
            roleList.forEach(function (role) {
                if(role.needDestroy){
                    roleList.splice(roleList.indexOf(role, 1));

                    if(role instanceof Flappy.ReadyView){
                        self.hasReady = true;//准备完毕
                    }
                }else{
                    role.draw();
                }

                if(self.hasReady){
                    self._play(role);
                }
            });

            //监听游戏是否结束
            self.isOver = self.control.getBird.isGoDie(self);

            //监听分数变化
            self._centChange();

            if(!self.isOver){
                self.animateFrame = ww.requestAnimationFrame(render);
            }else{
                self.over();
            }
        })();
    }

    //======================= 分数变化 ========================
    function centChange() {
        var self = this;
        self.control.getPipes.forEach(function (pipe) {
            if(pipe.hasPassed()) {
                var cent = self.control.getCent;
                cent.set(cent.get() + 1);
            }
        });
    }

    //======================== 扩展 =========================
    function extend(obj){
        for(var item in obj){
            if(item == 'constructor') continue;
            Game.prototype[item] = obj[item];
        }
    }
    //======================= 暴 露 ========================
    //单例模式
    var instance = null;
    Flappy.Game = {
        getInstance : function(canvas){
            if(instance){
                return instance;
            }else{
                return new Game(canvas);
            }
    }};
})(Flappy, window);