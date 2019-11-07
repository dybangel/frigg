

Gonce_click_shipin=0;

module.exports={
    p1:function(){
             var upcount=Math.round(Math.random()*(2-1))+1;
            log("随机上滑:"+upcount+"次");
            if(Gonce_click_shipin==0){
                    elestr=id(packagename+":id/tab_tv").text('视频');
                    thiscommon.clickxy_for_ele(elestr.findOnce());
                    Gonce_click_shipin=1;
            }
           

            for(var i=1;i<=upcount;i++){
                thiscommon.swipeup();sleep(800);
            }
        
            elestr=id(packagename+":id/iv_comment").boundsInside(0,device.height*0.2,device.width,device.height*0.8);
            result=elestr.exists();
            if(result){
                thiscommon.clickxy_for_ele(elestr.findOnce());
            }else{
                //没有找到特征码，则点击视频tab
              
            }
    },
    p2:function(){
          //视频播放完毕的情况
             result=className(Gclass_awt).text('重播').exists();
             if(result){
                //随机点赞
                var shoucang=Math.round(Math.random()*(5-1))+1;
                if(shoucang==1||shoucang==3){
                    //判断收藏按钮是否存在
                    result=id(packagename+':id/collect').boundsInside(0,device.height*0.8,device.width,device.height).exists();
                //  alert(result);
                    if(result){
                        log('收藏')
                    //  id(packagename+':id/collect').click(); 
                    thiscommon.clickxy_for_ele( id(packagename+':id/collect').findOnce());
                    }else{
                        log('没有找到收藏按钮');
                    }
                }else{
                    log('不收藏')
                }
                //随机关注
            var guanzhu=Math.round(Math.random()*(5-1))+1;
            if(guanzhu==1||guanzhu==3){
                log('关注')
                result=className(Gclass_awt).textContains('关注').exists();
                result2=className(Gclass_awt).text('已关注').exists();
                //alert(result);
                if(result && result2==false){
                    className(Gclass_awt).textContains('关注').findOnce().click();
                }
            }else{
                log('不关注')
            }
        //sleep(2000)
                back();
            }
        
            //随机上滑评论
            result=className(Gclass_awt).text('没有更多了').exists();
            result2=className(Gclass_awt).text('暂无评论，点击抢占沙发').exists();
            if(result==false){
                var swipepinglun=Math.round(Math.random()*(5-1))+1;
            if(swipepinglun==1||swipepinglun==3){
                thiscommon.swipeup();
            }else{
                log('不上滑评论')
            }
            }else{
                log('评论到底或者没有评论，不要滑动了')
            }
            //判断是否需要解锁
            var tz=images.read("./img/快看点_锁.png");
            var p=findImage(captureScreen(),tz,{
                region:[0,0],
                threshold:0.8
            });
          
            if(p){
                log("找到了锁"+p.x);
                click(p.x,p.y);
               
            }else{
                log("未发现锁")
            }
            //判断是否需要砸金蛋
             var tz=images.read("./img/快看点_砸金蛋.png");
                        var p=findImage(captureScreen(),tz,{
                            region:[0,0],
                            threshold:0.8
                        });
                      
                        if(p){
                            log("找到了砸金蛋"+p.x);
                            click(p.x,p.y);
                           
                        }else{
                            log("无金蛋可砸")
                        }
    },
    p3:function(){
        elestr=className(Gclass_awi).boundsInside(0,0 ,device.width*0.5,device.height*0.2);
        result=elestr.exists();
        if(result){
            thiscommon.clickxy_for_ele(elestr.findOnce())
        }
    },
    p5:function(){
        elestr=className(Gclass_awi).boundsInside(0,0 ,device.width*0.5,device.height*0.2);
        result=elestr.exists();
        if(result){
            thiscommon.clickxy_for_ele(elestr.findOnce())
        }
    },
    p6:function(){
        elestr=id(packagename+":id/tt_video_ad_close_layout");
        result=elestr.exists();
        if(result){
            thiscommon.clickxy_for_ele(elestr.findOnce());
        }
    }
}

