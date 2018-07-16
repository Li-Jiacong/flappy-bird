(function (w) {
    //与sky.js原理一致
    function Land(ctx,img,speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed||2;
        this.width = img.width;
        this.height = img.height;
        Land.callCount++;
        this.x = this.width*(Land.callCount-1);
        this.y = cvs.height-this.height //也可以this.ctx.canvas.height-this.height  ctx存在height属性
    };
    Land.callCount = 0;
    Land.prototype = {
        constuctor: Land,
        draw: function () {
            this.ctx.drawImage(this.img,this.x,this.y);
        },
        update: function(){
            this.x = this.x - this.speed;
            if(this.x <= -this.width){
                this.x = this.x + this.width*Land.callCount;
            }
        }
    };
    w.getLand = function(ctx,img,speed){
        return new Land(ctx,img,speed);
    }
})(window);