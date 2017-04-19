/**
 * 工厂类
 * Created by Administrator on 2017-1-11.
 */
(function (Flappy) {
    //工厂
    var Factory  = {
        //======================= 创建小鸟 =========================
        createBird: function () {
            var cv = Flappy.getCV(),
                imgList = Flappy.getStaticSource().imgList;
            var bird = new Flappy.Bird({
                ctx: cv.ctx,
                birdImg: imgList.birds,
                landHieght: imgList.land.height,
                canvasHeight: cv.height
            });

            return bird;
        },

        //======================= 创建背景 =========================
        /**
         * @param name  value[sky: 天空 , land : 地板]
         * @return {Array} 背景对象集合
         */
        createBackground: function (name) {
            var ctx = Flappy.getCV().ctx,
                imgList = Flappy.getStaticSource().imgList,
                canvas = Flappy.getCV().self,
                bg = null,
                bgImg = null,
                bgImgWidth = 0,
                x = 0,
                y = 0,
                bgList = [],
                count = 0;
            if(name == "sky"){
                bgImg = imgList.sky;
                count = 2;
                y = 0;
            }
            else  if(name == "land"){
                bgImg = imgList.land;
                count = 4;
                y = canvas.height - bgImg.height;
            }

            bgImgWidth = bgImg.width;

            for(var i = 0; i < count; i++){
                x = i * bgImgWidth;
                bg = new Flappy.Background(ctx, bgImg, x, y, count);
                bgList.push(bg);
            }
            return bgList;
        },


        //======================= 创建管道 =========================
        createPipes: function () {
            var ctx = Flappy.getCV().ctx;
            var imgList = Flappy.getStaticSource().imgList;
            // 绘制管道
            var pipeUp = imgList["pipe2"];
            var pipeDown = imgList["pipe1"];
            var pipeList = [];
            var fcp = Flappy.Config.pipe;
            for(var i = 0; i < 6; i++) {
                var pipe = new Flappy.Pipe({
                    ctx: ctx,
                    imgUp: pipeUp,
                    imgDown: pipeDown,
                    x: i * pipeUp.width
                });

                pipeList.push(pipe);
            }
            return pipeList;
        },

        //======================= 创建分数 =========================
        createCent: function () {
            return new Flappy.Cent(Flappy.getStaticSource().imgList.cent, 70);
        },

        //===================== 创建游戏开始界面 =======================
        createStartView: function () {
            var canvasWidth = Flappy.getCV().width,
                imgList = Flappy.getStaticSource().imgList,
                titleImg = imgList.title,
                helpImg = imgList.tutorial;

            return new Flappy.StartView({
                titleImg: titleImg,
                titleX: canvasWidth / 2 - titleImg.width / 2,
                titleY: 50,
                helpImg: helpImg,
                helpX: canvasWidth / 2 - helpImg.width / 2,
                helpY: 150
            });
        },

        //===================== 创建游戏准备界面 =======================
        createReadyView: function () {
            var canvasWidth = Flappy.getCV().width,
                imgList = Flappy.getStaticSource().imgList,
                numberImg = imgList.cent,
                readyImg = imgList.text_ready;

            return new Flappy.ReadyView({
                readyImg: readyImg,
                readyX: canvasWidth / 2 - readyImg.width / 2,
                readyY: 150
            });
        },

        //===================== 创建游戏结束界面 =======================
        createOverView: function (centObj) {
            var canvasWidth = Flappy.getCV().width,
                imgList = Flappy.getStaticSource().imgList,
                overImg = imgList.text_game_over,
                scorePanelImg = imgList.score_panel;
            return new Flappy.OverView({
                getCent: centObj,
                overImg: overImg,
                overX: canvasWidth / 2 - overImg.width / 2,
                overY: 50,
                scorePanelImg: scorePanelImg,
                scoreX: canvasWidth / 2 - scorePanelImg.width / 2,
                scoreY: 130
            });
        }
    };
    Flappy.Factory = Factory;
})(Flappy);
