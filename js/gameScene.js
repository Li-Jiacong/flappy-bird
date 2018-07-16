(function (w) {
    function Scene(ctx,imgObj) {
        this.ctx = ctx;
        this.imgObj = imgObj;
        this.listeners = [];        //听众队列
        this.roles = [];        //创建画面所需角色
        this._initRoles();      //初始化角色
    }
    Scene.prototype = {
        constructor: Scene,
        _initRoles: function () {
            //两张背景图
            for(var i=0; i<2; i++){
                this.roles.push(getSky(this.ctx,this.imgObj.sky,3));
            }
            //六个管道
            for(var i=0; i<6; i++){
                this.roles.push(getPipe(this.ctx,this.imgObj.pipeUp,this.imgObj.pipeDown,150,this.imgObj.land.height,3));
            }
            //四个地板
            for(var i=0; i<4; i++){
                this.roles.push(getLand(this.ctx,this.imgObj.land,3));
            }
            //一只鸟
            this.roles.push(getBird(this.ctx,this.imgObj.bird,3,1,20,10));
        },
        addListener: function(listener){
            this.listeners.push(listener);
        },
        triggerBirdOver: function(){
            this.listeners.forEach(function(listener){
                listener();
            });
        },
        draw: function(){
            var bird = getBird();
            birdCoreX = bird.x + bird.width/2;
            birdCoreY = bird.y + bird.height/2;
            if(this.ctx.isPointInPath(birdCoreX,birdCoreY)||birdCoreY <= 0||birdCoreY >= (this.ctx.canvas.height-this.imgObj.land.height)){
                this.triggerBirdOver()
            }else{
                this.ctx.beginPath();
                this.roles.forEach(function(role){
                    role.draw();
                    role.update();
                });
            }
        }


    }

    w.getScene = function(ctx,imgObj){
        return new Scene(ctx,imgObj);
    }

})(window);