module.exports={
    p1:function(){
          //随机选择板块
                //弹窗 金币翻倍按钮     
                result=className('android.widget.Button').text('免费领').exists();
                if(result){
                    ele=className('android.widget.Button').text('免费领').findOnce();
                    thiscommon.clickxy_for_ele(ele);
                    //id('tv.yixia.bobo:id/bdf').click();
                }
    
             //波波视频时段奖励 先领时段奖励，反之继续
        
            
                    //上滑动一次
                    thiscommon.swipeup();sleep(1000);
                    //点击视频
                    result=id('tv.yixia.bobo:id/vb').boundsInside(device.width *0.2,device.height *0.2,device.width,device.height*0.8).exists();
                    if(result){
                    id('tv.yixia.bobo:id/vb').boundsInside(device.width *0.2,device.height *0.2,device.width,device.height*0.8).click();   
                    }
    },
    p2:function(){
          
                    //排除视频播放完的情况
                    result=className('android.widget.TextView').text('重播').exists();
                    if(result){
                        log('视频已经播放完了');
                        //随机点赞
                        result=id('tv.yixia.bobo:id/vd').exists();
                            if(result){
                                var dianzan=Math.round(Math.random()*(5-1))+1;
                                if(dianzan==1||dianzan==3){
                                    log('点赞');
                                    thiscommon.clickxy_for_ele(id('tv.yixia.bobo:id/vd').findOnce());
                                }else{
                                    log('不点赞');
                                }
                            }
                        back();
                    }
                    //排除掉视频内嵌广告时的点击
                    result=className('android.widget.TextView').text('跳过广告').exists();
                    if(result==false){
                        log('没有广告')
                        click(device.width *0.2,device.height*0.2);
                        result=id('tv.yixia.bobo:id/wa').exists();
                    //  alert(result);
                        if(result){
                            //获取视频时间长度
                        try{
                            var stoptime=id('tv.yixia.bobo:id/wa').findOnce().text();
                            var nowtime=id('tv.yixia.bobo:id/w_').findOnce().text()
                            //随机快进
                            var kuaijin=Math.round(Math.random()*(6-1))+1;
                            if(kuaijin==3){
                                log('快进');
                            swipe(device.width*0.2,device.height *0.2,device.width*0.8,device.height *0.2,500);
                            }else{
                                log('不快进')
                            }
                        log("时间长度:"+stoptime+" 已经播放了:"+nowtime);
                        }catch(e){
                            log("e ："+e)
                        } 
                        }
                    }else{
                        //等待广告完成
                        ele=className('android.widget.TextView').text('跳过广告').findOnce();
                        thiscommon.clickxy_for_ele(ele);
                    }
    },
    p3:function(){
            //广告视频关闭按钮
            result=id('tv.yixia.bobo:id/tt_video_ad_close').indexInParent(3).depth(3).exists();
            if(result){
                id('tv.yixia.bobo:id/tt_video_ad_close').click();
            }
            // 广告视频关闭按钮
            result=className('android.widget.ImageView').indexInParent(1).depth(5).exists();
            if(result){
                className('android.widget.ImageView').indexInParent(1).depth(5).findOnce().click();
            }
    },
    p4:function(){

    },
    p5:function(){
        try{
            ele=className('android.widget.TextView').textContains('金币翻倍').findOnce();
            thiscommon.clickxy_for_ele(ele);
          }catch(e){
          }
    },
    p6:function(){
        className('android.widget.TextView').textContains('看视频继续领').findOnce().click();

    },
    p7:function(){
        elestr=className('android.widget.RelativeLayout').boundsInside(0,0,device.width,device.height*0.3);
        result=elestr.exists();
        if(result){
            thiscommon.clickxy_for_ele(elestr.findOnce());
        }
    }

}