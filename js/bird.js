(function (w) {
    function Bird(ctx,img,widthFrame,heightFrame,x,y) {
        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;        //图片中横向的帧数
        this.heightFrame = heightFrame;     //图片中竖向的帧数
        this.x = x;
        this.y = y;
        this.width = this.img.width/this.widthFrame;        //小鸟宽度
        this.height = this.img.height/this.heightFrame;     //小鸟高度
        this.currentFrame = 0;
        this.speed = 2;     //小鸟下落速度
        this.a = 0.05;      //重力加速度
        this._bind();       //绑定鼠标点击时间
    }
    Bird.prototype = {
        constructor: Bird,
        _bind: function () {
            that= this;
            this.ctx.canvas.addEventListener('click',function(){
                that.speed = -1.5;
            })
        },
        draw: function () {
            var baseRadian = Math.PI/180*10;      //一单位speed旋转 1/9 PI
            var maxRadian = Math.PI/180*45;     //最大转角为 1/4 PI
            var rotateRadian = baseRadian*this.speed;
            if(rotateRadian > maxRadian){
                rotateRadian = maxRadian;
            }
            this.ctx.save();
            this.ctx.translate(this.x+this.width/2,this.y+this.height/2)
            this.ctx.rotate(rotateRadian);
            this.ctx.drawImage(this.img,
                this.width*this.currentFrame,0,this.width,this.height,
                -this.width/2,-this.height/2,this.width,this.height
            );
            this.ctx.restore();
        },
        update: function () {
            this.currentFrame++;
            if(this.currentFrame>=this.widthFrame){
                this.currentFrame = 0;
            }
            this.y = this.y + this.speed;
            this.speed = this.speed + this.a;

        }

    };
    var bird = null;
    w.getBird = function (ctx,img,widthFrame,heightFrame,x,y) {
        if(!bird){
            bird = new Bird(ctx,img,widthFrame,heightFrame,x,y);
        }
        return bird;
    };

})(window)
