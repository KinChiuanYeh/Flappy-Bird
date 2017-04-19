/**
 * Created by Administrator on 2017-1-12.
 */
(function (Flappy) {
    function StartView(config) {
        this.ctx = Flappy.getCV().ctx;

        //标题
        this.titleImg = config.titleImg;
        this.titleX = config.titleX
        this.titleY = config.titleY;
        this.titleW = this.titleImg.width;
        this.titleH = this.titleImg.height;

        //帮助
        this.helpImg = config.helpImg;
        this.helpX = config.helpX;
        this.helpY = config.helpY;
        this.helpW = this.helpImg.width;
        this.helpH = this.helpImg.height;

        //获取背景
        this.getSkyBackgroud = Flappy.Factory.createBackground('sky');
    }

    StartView.prototype = {
        constructor: StartView,
        draw: function (btnHandle) {
            var self = this,
                ctx = this.ctx;

            //绘制背景
            this.getSkyBackgroud[0].draw();

            //绘制标题文字
            ctx.drawImage(self.titleImg , self.titleX, self.titleY, self.titleW, self.titleH);

            //绘制帮助
            ctx.drawImage(self.helpImg , self.helpX, self.helpY, self.helpW, self.helpH);

            //绘制开始游戏按钮
            var buttonImg = Flappy.getStaticSource().imgList.button_play;
            var btn = new Flappy.Button({
                buttonImg: buttonImg,
                x: self.helpX + self.helpW / 2 -  buttonImg.width / 2 ,
                y: self.helpY + self.helpH + 30
            });
            btn.draw();
            btn.addListener(function () {
                btnHandle && btnHandle();
            });
        }
    };

    Flappy.StartView = StartView;
})(Flappy);