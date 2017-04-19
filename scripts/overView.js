/**
 * Created by Administrator on 2017-1-11.
 */
(function (Flappy) {
    function OverView(config) {
        this.ctx = Flappy.getCV().ctx;
        this.getCanvasWidth = Flappy.getCV().width;

        //结束文本
        this.overImg = config.overImg;
        this.overX = config.overX;
        this.overY = config.overY;
        this.overW = this.overImg.width;
        this.overH = this.overImg.height;

        //分数面板
        this.scorePanelImg = config.scorePanelImg;
        this.scoreX = config.scoreX;
        this.scoreY = config.scoreY;
        this.scoreW = this.scorePanelImg.width;
        this.scoreH = this.scorePanelImg.height;

        //获取分数对象
        this.getCent = config.getCent;
    }
    OverView.prototype = {
      constructor: OverView,
      draw: function (btnCallBack) {
          var ctx = this.ctx,
              self = this;

          //绘制结束文字
          ctx.drawImage(self.overImg , self.overX, self.overY, self.overW, self.overH);
          //绘制分数面板
          ctx.drawImage(self.scorePanelImg , self.scoreX, self.scoreY, self.scoreW, self.scoreH);

          //绘制当前分数 和 历史分数
          var curcent = this.getCent.get();
          var historyCent = this.getCent.maxCent;
          this.getCent.draw(curcent, 95, self.scoreY + 40);
          this.getCent.draw(historyCent, 95, self.scoreY + 82);

          //绘制开始游戏按钮
          var buttonImg = Flappy.getStaticSource().imgList.button_play;
          var btn = new Flappy.Button({
              buttonImg: buttonImg,
              x: self.scoreX + self.scoreW / 2 -  buttonImg.width / 2 ,
              y: self.scoreY + self.scoreH + 30
          });
          btn.draw();
          btn.addListener(function () {
              btnCallBack && btnCallBack();
          });
      }
    };
    Flappy.OverView = OverView;
})(Flappy);