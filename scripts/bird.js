/**
 * 鸟对象
 * Created by Administrator on 2017-1-11.
 */

(function (Flappy) {
    function Bird(config) {
        var fcb = Flappy.Config.bird;

        this.ctx = config.ctx;
        this.x0 = fcb.position.x; //小鸟的横坐标位置
        this.y0 = fcb.position.y; //小鸟的纵坐标位置
        this.birdImg = config.birdImg;
        this.imgW = this.birdImg.width / 3; //小鸟每一帧的高度
        this.imgH = this.birdImg.height; //小鸟每一帧的宽度
        this.frameIndex = 0; //小鸟对应的每一帧
        this.a = fcb.a; //重力加速度
        this.flyUpMaxDropSpeed = fcb.flyUpMaxDropSpeed;//向上飞的最高点的速度
        this.flySpeed = 0; //振翅速度
        this.flySpeedDelta = fcb.flySpeedDelta; //振翅速度系数
        this.dropSpeed = 0; //下落速度
        this.maxAngleSpeed = fcb.maxAngleSpeed;//达到多少速度旋转
        this.curTime = 0; //当前绘制时间
        this.lastTime = new Date(); //上一次绘制时间
        this.canMove = false;

        //因为每次渲染都要判断鸟是否撞到柱子和大地 所以获取 画布高度 和 地板高度
        this._getCanvasHeight = config.canvasHeight;//获取canvas
        this._getLandHieght = config.landHieght;
    }
    Bird.prototype = {
        constructor: Bird,
        //====================  返回默认状态  =====================
        refresh: function () {
            this.frameIndex = 0; //小鸟对应的每一帧
            this.flySpeed = 0; //振翅速度
            this.dropSpeed = 0; //下落速度
            this.curTime = 0; //当前绘制时间
            this.lastTime = new Date(); //上一次绘制时间
        },
        //=======================  向上飞  ========================
        fly: function () {
            if(this.canMove)
            this.dropSpeed = - this.flyUpMaxDropSpeed;
        },
        //====================== 是否狗带 =========================
        isGoDie : function () {
            var ctx = this.ctx,
                flag = false,
                maxY = this._getCanvasHeight - this._getLandHieght - 10,
                halfBirdWidth = 1/2 * this.imgW - 10,
                halfBirdHeight = 1/ 2 * this.imgH - 10;

            if(this.y0 < 0 ||
                this.y0 >= maxY ||
                //默认鸟的位置在鸟的正中心 所以要加减鸟的一半的宽度
                ctx.isPointInPath(this.x0 + halfBirdWidth, this.y0 + halfBirdHeight)||
                ctx.isPointInPath(this.x0 - halfBirdWidth, this.y0 - halfBirdHeight)) {

                flag = true;
            }
            if(Flappy.Config.GODMODE){//是否开始上帝模式
                flag = false;
            }
            return flag;
        },
        //======================= 绘制小鸟 ========================
        draw: function () {
            var ctx = this.ctx;
            this.curTime = new Date();

            var imgW = this.imgW,
                imgH = this.imgH,
                dely = this.curTime - this.lastTime;

            this.lastTime = this.curTime;

            ctx.save();

            //旋转绘制鸟头的朝向
            this._rotate(ctx);

            //绘制小鸟
            ctx.drawImage(this.birdImg, this.frameIndex * imgW, 0, imgW, imgH,
                -1/2 * imgW, -1/2 *imgH , imgW, imgH);

            ctx.restore();

            //计算下一帧绘制图片的哪个位置 实现翅膀抖动效果
            this._nextFPS();

            if(this.canMove){
                //下落速度变化
                this._dropSpeedChange(dely);
            }
        },
        //======================= 旋转小鸟 ========================
        _rotate: function (ctx) {
            // 计算 bird 的角度
            var maxAngleSpeed = this.maxAngleSpeed,
                curAngle = 0;
            if(this.dropSpeed >= maxAngleSpeed) {
                curAngle = 45;
            } else if(this.dropSpeed <= -maxAngleSpeed) {
                curAngle = -45;
            }

            curAngle = this.dropSpeed / maxAngleSpeed * 45;

            ctx.translate(this.x0, this.y0);

            ctx.rotate( Flappy.toRadian(curAngle) );
        },
        //====================== 绘制下一帧小鸟 =======================
        _nextFPS: function () {
            this.flySpeed ++;
            if( this.flySpeed % this.flySpeedDelta == 0){
                this.frameIndex ++;
                this.frameIndex %= 3;
            }
        },
        //======================= 改变下落速度 ========================
        _dropSpeedChange: function (dely) {
            var a = this.a;
            this.dropSpeed +=  a * dely;
            this.y0 += this.dropSpeed * dely + 1/2 * a * dely * dely;
        }
    };
    //======================= 暴  露 ========================
    Flappy.Bird = Bird
})(Flappy);