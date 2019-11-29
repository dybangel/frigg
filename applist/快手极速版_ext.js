
module.exports = {
	p1:function(){

		thiscommon.swipeup();
		try{thread_p1.interrupt()}catch(e){};
		thread_p1=threads.start(function(){
		//	toast('thread_p1线程执行一次');
						//通用弹窗 
						var result=className('android.widget.TextView').text('设置青少年模式').exists();
						if(result){
							back();
						}
						result=id('com.kuaishou.nebula:id/close').exists();
						if(result){
							id('com.kuaishou.nebula:id/close').click();
						}	
						//随机评论
						var pinglun=Math.round(Math.random()*(5-1))+1;
						if(pinglun==1||pinglun==3){
							log('评论');
							var comment_json=[
								'666',
								'这个必须顶',
								'我也想上热门',
								'好像看过另一个版本的',
								'有人心情不happy',
								'!......!',
								'天王盖地虎',
								'我之前都不大评论，但是看很多评论都热门了，我也发评论试试吧',
								'这是啥时候的视频',
								'容内的发我出看人有没有',
								'我有一个大胆的想法',
							];
							//alert(comment_json.length);exit();
							var comment_count=comment_json.length;
							if(comment_count>0){
								var zz=Math.round(Math.random()*(comment_count-1))+1;
								//直接点击文本区域
								elestr1=id('com.kuaishou.nebula:id/editor_holder').boundsInside(0,device.height*0.7,device.width,device.height);
							
								result1=elestr1.exists();
								if(result1){
									thiscommon.clickxy_for_ele(elestr1.findOnce());
									sleep(500);
									setText(comment_json[zz]);
									sleep(500)
									click('发送');
								}else {
									//另一种布局的情况
									elestr2=id('com.kuaishou.nebula:id/comment_icon').
									boundsInside(0,device.height*0.5,device.width,device.height);
									result2=elestr2.exists();
									if(result2){
											thiscommon.clickxy_for_ele(elestr2.findOnce());
											sleep(500);
											setText(comment_json[zz]);
											sleep(500)
											var x=id('com.kuaishou.nebula:id/comment_editor_avatar').findOnce().bounds().left;
											var y=id('com.kuaishou.nebula:id/comment_editor_avatar').findOnce().bounds().centerY();
											//调出发送按钮
											click(x+device.width/2,y);
											sleep(800);
                                            click('发送');
                                            sleep(800);back();
									}

								}

							}
	
						}else{log('不评论')}
						//随机看评论
						var kanpinglun=Math.round(Math.random()*(5-1))+1;
									if(kanpinglun==1||kanpinglun==3){
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
									}
						//随机点赞
						var dianzan=Math.round(Math.random()*(5-1))+1;
						if(dianzan==1||dianzan==3){
							var result=id('com.kuaishou.nebula:id/like_icon').exists();
							if(result){
								ele=id('com.kuaishou.nebula:id/like_icon').boundsInside(device.width *0.5, device.height *0.5, device.width, device.height).findOne();
								thiscommon.clickxy_for_ele(ele);
								log('点赞');};
									
						}else{
							log('不点赞');
						}
		});
		thiscommon.mysleep(8,12);
	
	},
	p3:function(){
  	  	var elestr=className('android.widget.TextView').text('我知道了')
   		 thiscommon.clickxy_for_ele(elestr.findOnce());
	},
	p4:function(){
		var elestr=className('android.widget.TextView').textContains('重播')
		thiscommon.clickxy_for_ele(elestr.findOnce());
	},
	
}

