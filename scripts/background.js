/**
 * 背景对象
 * Created by Administrator on 2017-1-11.
 */
(function (Flappy) {
    function Background(ctx, img, x0, y0, count) {
        var fcb = Flappy.Config.background;

        this.ctx = ctx;
        this.img = img;
        this.imgW = img.width;
        this.x0 = x0;
        this.y0 = y0;
        this.count = count;
        this.speed = fcb.speed;

        this.canMove = false;
    }

    Background.prototype = {
      constructor: Background,
      draw: function () {
          if(this.canMove){
              this.x0 -= this.speed;//左移

              if(this.x0 <= - this.imgW){
                  this.x0 += this.imgW * this.count;//一次绘制count张
              }
          }

          this.ctx.drawImage(this.img, this.x0, this.y0);
      }
    };

    Flappy.Background = Background;
})(Flappy);