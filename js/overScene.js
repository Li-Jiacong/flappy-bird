(function (w) {
    function OverScene(ctx) {
        this.ctx = ctx;
    }
    OverScene.prototype = {
        draw: function () {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(80,80,80,0.8)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillStyle = 'rgb(255,0,0)';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.font = '900 45px Microsoft Yahei';
            this.ctx.fillText('GAME OVER', this.ctx.canvas.width/2, this.ctx.canvas.height/2);
            this.ctx.restore();
        }
    };
    w.getOverScene = function (ctx) {
        return new OverScene(ctx);
    }
})(window);
