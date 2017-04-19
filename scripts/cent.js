/**
 * 分数对象
 * Created by Administrator on 2017-1-11.
 */
(function (Flappy, ww) {
    function Cent(centImg, y) {
        this.cent = 0;
        this.y = y;
        this.centImg = centImg;
        this.imgW = this.centImg.width / 10;
        this.imgH = this.centImg.height;
        this.ctx = Flappy.getCV().ctx;
        this.getCanvasWidth = Flappy.getCV().width;

        //历史最高分
        this.maxCent = ww.localStorage.getItem('flappy_max_cent') || 0;
    }
    Cent.prototype = {
        constructror : Cent,
        set: function (cent) {
            this.cent = cent;
        },
        get: function () {
            return this.cent;
        },
        draw: function (cent, x0, y) {
            var ctx = this.ctx,
                cent = cent || this.get(),
                x = 0, y = y || this.y,
                centerPostion = 0,
                frameIndex = 0,
                imgW = this.imgW,
                imgH = this.imgH,
                centArr = (cent + "").split(""),
                length = centArr.length;

            centerPostion = this.getCanvasWidth / 2  - imgW * length / 2;//中间点位置
            if(x0){//文字分数
                ctx.fillStyle = "#543847";
                ctx.font = '26px consolas';
                ctx.fillText(cent, centerPostion + x0 , y + 12);
            }else{//图片分数
                for (var i = 0; i < centArr.length; i++) {
                    frameIndex = centArr[i];//当前数字帧
                    //计算每个数字摆放的位置
                    if(i + 1 <= length / 2){
                        x = centerPostion - (length / 2 - i)  * imgW;
                    }
                    //基数中间的数字放中间
                    else  if(length % 2 == 0 && i + 1 == Math.ceil(length / 2)){
                        x = centerPostion - 1/2 * imgW;
                    }
                    else{
                        x = centerPostion + (i - length / 2)  * imgW;
                    }
                    x += imgW * length / 2;//摆到中间

                    //绘制数字
                    ctx.drawImage(this.centImg, frameIndex * imgW, 0, imgW, imgH,
                        x , y , imgW, imgH);
                }
            }
        }
    };
    Flappy.Cent = Cent;
})(Flappy, window);
