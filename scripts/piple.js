/**
 * 管道对象
 * Created by Administrator on 2017-1-11.
 */
(function (Flappy) {
    function Pipe(config) {
        var fcp = Flappy.Config.pipe;

        this.ctx = config.ctx;
        this.pipeXSpaceDelta = fcp.pipeXSpaceDelta;//左右间距系数 为管道宽度的倍数
        this.paddingLeft = fcp.paddingLeft;//距离左侧的留白
        this.x = config.x * this.pipeXSpaceDelta + this.paddingLeft;
        this.imgUp = config.imgUp;
        this.imgDown = config.imgDown;

        this.imgW = this.imgUp.width;
        this.imgH = this.imgUp.height;

        this.speed = fcp.speed;//移动速度

        this.pipeYSpace = fcp.pipeYSpace;//管道上下距离
        this.upY = 0;
        this.downY = 0;
        this.canMove = false;

        this.getBirdXPosition = Flappy.Config.bird.position.x;//获取小鸟的位置

        this._initPipeY();//初始化管道的位置
    }
    
    Pipe.prototype = {
       constructor: Pipe,
       hasPassed: function () {
           return this.x + this.paddingLeft % this.speed + (this.speed == 4 ? 2 : 0)
               == this.getBirdXPosition - this.imgW;
       },
       draw: function () {
           var ctx = this.ctx;

           if(this.canMove){
               this.x -= this.speed;

               if(this.x < -this.imgW){
                   this.x += this.imgW * 3 * 6;

                   this._initPipeY();
               }
           }

           ctx.drawImage(this.imgUp, this.x, this.upY);//绘制上管道
           ctx.drawImage(this.imgDown, this.x, this.downY);//绘制下管道

           this._initPath(ctx);
       },
       _initPipeY: function () {
           //随机生成上下管道的Y轴位置
           var pipeTopHeight = Math.floor(Math.random() * 200) + 50;

           this.upY = pipeTopHeight - this.imgH;
           this.downY = pipeTopHeight + this.pipeYSpace;

       },
        _initPath: function(ctx) {
            ctx.rect(this.x, this.upY, this.imgW, this.imgH);
            ctx.rect(this.x, this.downY, this.imgW, this.imgH);
        }
    };

    Flappy.Pipe = Pipe;
})(Flappy);