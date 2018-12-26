(function(w){
    function Pipe(ctx,imgUp,imgDown,space,landHeight,speed) {
        this.ctx = ctx;
        this.imgUp = imgUp;
        this.imgDown = imgDown;
        this.space = space;
        this.landHeight = landHeight;
        this.speed = speed;
        //水管宽高，因为两张图大小一样，选一个做代表
        this.width = imgUp.width;
        this.height = imgUp.height;
        this.minHeight = 100;       //水管的最小高度
        Pipe.callCount++;
        this.x = 300 + this.width*3*(Pipe.callCount-1);
        //没有this.y，因为两个管的y坐标不能共用
        this._init();       //初始化上下水管的起始坐标
    }
    Pipe.callCount = 0;
    Pipe.prototype = {
        constuctor: Pipe,
        //计算绘制水管的y坐标
        _init: function () {
            var maxHeight = cvs.height - this.landHeight - this.space - this.minHeight;
            //生成随机高度
            var randomHeight = Math.random() * maxHeight;
            //随机高度不得小于minHeight
            if(randomHeight<this.minHeight){
                randomHeight = this.minHeight;
            }
            //管口向下绘制管道y的坐标
            this.downY = randomHeight - this.height;
            this.upY = randomHeight + this.space;
        },
        draw: function(){
            this.ctx.drawImage(this.imgUp,this.x,this.upY);
            this.ctx.drawImage(this.imgDown,this.x,this.downY);
            this.ctx.rect(this.x,this.upY,this.width,this.height);
            this.ctx.rect(this.x,this.downY,this.width,this.height);
        },
        update: function(){
            this.x = this.x - this.speed;
            if(this.x <= -this.width){
                this._init();
                this.x = this.x + this.width*Pipe.callCount*3;
            }
        }
    
    };
    w.getPipe = function(ctx,imgUp,imgDown,space,landHeight,speed){
        return new Pipe(ctx,imgUp,imgDown,space,landHeight,speed);
    }
})(window)
