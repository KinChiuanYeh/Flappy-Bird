/**
 * Created by Administrator on 2017-1-12.
 */
(function (Flappy) {
    function Button(config) {
        this.ctx = Flappy.getCV().ctx;
        this.x = config.x;
        this.y = config.y;
        this.buttonImg = config.buttonImg;
        this.imgW = this.buttonImg.width;
        this.imgH  = this.buttonImg.height;
    }
    Button.prototype = {
        constructor: Button,
        draw: function () {
            this.ctx.drawImage(this.buttonImg, this.x, this.y, this.imgW, this.imgH);
        },
        addListener: function (callBack) {
            var self = this;

            var handle = function (e) {
                var x = self.x, y = self.y,
                    offsetX = e.offsetX, offsetY = e.offsetY;
                if(offsetX >= x &&
                    offsetX <= x + self.imgW &&
                    offsetY >= y &&
                    offsetY <= y + self.imgH) {
                    callBack && callBack();
                }
            };
            Flappy.getCV().addListner(handle);
        }
    };
    Flappy.Button = Button;
})(Flappy);