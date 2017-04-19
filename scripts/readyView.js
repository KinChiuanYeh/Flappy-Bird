/**
 * Created by Administrator on 2017-1-12.
 */
(function (Flappy) {
    function ReadyView(config) {
        this.ctx = Flappy.getCV().ctx;
        this.getCanvasWidth = Flappy.getCV().width;

        //准备文本
        this.readyImg = config.readyImg;
        this.readyX = config.readyX;
        this.readyY = config.readyY;
        this.readyW = this.readyImg.width;
        this.readyH = this.readyImg.height;

        this.needDestroy = false;
        this.startTime = 0;
    }

    ReadyView.prototype = {
        constructor: ReadyView,
        draw: function () {
            var self = this,
                ctx = this.ctx,
                startTime = this.startTime;

            if(this.needDestroy) return;

            if(startTime <= 100){
                ctx.drawImage(self.readyImg , self.readyX, self.readyY, self.readyW, self.readyH);
            }
            else{
                this.needDestroy = true;
                this.startTime = 0;
            }

            this.startTime ++;
        }
    };
    Flappy.ReadyView = ReadyView;
})(Flappy);