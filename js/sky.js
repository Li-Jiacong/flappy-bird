(function(w){
    function Sky(ctx,img,speed) {
        this.ctx = ctx;     //绘制环境
        this.img = img;     //导入需绘制的图片
        this.speed = speed||2;      //背景移动的速度
        this.width = this.img.width;
        this.height = this.img.height;
        Sky.callCount++;        //被实例化的次数，背景要无缝滚动，需要多次实例化，在绘制背景后继续绘制相同背景
        this.x = (Sky.callCount-1) * this.width;
        this.y = 0;
    }
    Sky.callCount = 0;
    Sky.prototype = {
        constructor: Sky,
        //绘制背景
        draw: function () {
            this.ctx.drawImage(this.img,this.x,this.y)
        },
        //更新下一帧的数据
        update: function () {
            this.x = this.x - this.speed;
            if(this.x <= -this.width){
                this.x = this.x + this.width * Sky.callCount;
            }
        }
    }
    w.getSky = function (ctx,img,speed) {
        return new Sky(ctx,img,speed);
    };
}(window))
