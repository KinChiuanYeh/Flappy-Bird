/**
 *  游戏配置文件
 *  Created by Administrator on 2017-1-11.
 */
(function (Flappy) {
    var Config = {
        viewContainer: {
            width: window.innerWidth > 800 ? 800 : window.innerWidth,
            height: window.innerHeight > 667 ? 667 : window.innerHeight
        },
        bird: {
            position:{
                x: 150,
                y: 150
            },//小鸟位置
            a: 0.0006,//重力加速度`
            flySpeedDelta: 5,//振翅速度系数
            maxAngleSpeed: 0.5,//达到多少速度旋转
            flyUpMaxDropSpeed: 0.32//向上飞的最高点的速度
        },
        pipe: {
            speed: [1, 2, 3, 4][2],//管道挪移速度
            pipeYSpace: 150,//管道上下间距
            pipeXSpaceDelta: 3,//左右间距系数 为管道宽度的倍数
            paddingLeft : 400 //初始绘制距离左侧的位置
        },
        background: {
            speed: 2 //背景挪移速度 最好跟管道挪移速度一致
        },
        GODMODE: false,//是否开始上帝模式
    };
    Flappy.Config = Config;
})(Flappy);