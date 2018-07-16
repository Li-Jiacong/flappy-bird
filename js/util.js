var util = {
    loadImage: function (imgUrl, fn) {
        var imgObj = {}; //保存图片资源
        var tempImg, loaded = 0, imgLength = 0;
        for (var key in imgUrl) {
            imgLength++; //imgUrl中图片的总数
            tempImg = new Image();
            tempImg.onload = function(){
                loaded++; //统计已经加载完成的图片数量
                //当图片全部加载完成，执行回调函数
                if( loaded >= imgLength ){
                    fn(imgObj);
                }
            }
            tempImg.src = imgUrl[key];
            imgObj[key] = tempImg;
        }
    }

};
