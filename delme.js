var thiscommon=require('./mycommon.js');
elestr2=id('com.kuaishou.nebula:id/comment_icon').
									boundsInside(0,device.height*0.5,device.width,device.height);
									result2=elestr2.exists();
									if(result2){
											thiscommon.clickxy_for_ele(elestr2.findOnce());
											sleep(500);
											setText('吼吼哈');
											sleep(500)
											var x=id('com.kuaishou.nebula:id/comment_editor_avatar').findOnce().bounds().left;
											var y=id('com.kuaishou.nebula:id/comment_editor_avatar').findOnce().bounds().centerY();
											click(x+device.width/2,y);
											sleep(800);
											//调出发送按钮
                                            click('发送');
                                            sleep(800);back();
									}


                                    exit();
var result=id('com.kuaishou.nebula:id/like_icon').exists();
        
if(result){ele=id('com.kuaishou.nebula:id/like_icon').boundsInside(device.width *0.5, device.height *0.5, device.width, device.height).findOne();
									thiscommon.clickxy_for_ele(ele);
                                    log('点赞');};
                                    
exit();
var result=id('com.kuaishou.nebula:id/comment_icon').exists();
if(result){
                    var ele=id('com.kuaishou.nebula:id/comment_icon').depth(14).findOnce(1);
                    thiscommon.clickxy_for_ele(ele);
                    sleep(2000);
                    var result1=id('com.kuaishou.nebula:id/comment_header_close').exists();
                    var result2=id('com.kuaishou.nebula:id/slide_play_comment_expand_icon_view').exists();
                    if(result1 || result2){
                        thiscommon.swipeup();sleep(1000);thiscommon.swipeup();
                    back();
                    }
                }
exit();


elestr2=id('com.kuaishou.nebula:id/comment_icon').
boundsInside(0,device.height*0.5,device.width,device.height);
result2=elestr2.exists();
if(result2){
        thiscommon.clickxy_for_ele(elestr2.findOnce());
        sleep(500);
        setText('123123');
        sleep(500)
        var x=id('com.kuaishou.nebula:id/comment_editor_avatar').findOnce().bounds().left;
        var y=id('com.kuaishou.nebula:id/comment_editor_avatar').findOnce().bounds().centerY();
        click(x+device.width/2,y);
        //调出发送按钮
        click('发送');
 }
                                
exit();



elestr=id('com.kuaishou.nebula:id/editor_holder').boundsInside(0,device.height*0.7,device.width,device.height);
							
                                result=elestr.exists();
alert(result);
                                exit()
//className('')
result=className('android.widget.TextView').textContains('重播').exists()
if(result){
    
    var elestr=className('android.widget.TextView').textContains('重播')
    thiscommon.clickxy_for_ele(elestr.findOnce());
}