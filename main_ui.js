"ui";
const thiscommon = require("./mycommon.js");
const thisswipe = require("./myswipe.js");
var color = "#009688";
var color = "#4C484C";
var frameColor = "#7E787F";
var textColor = "#009688";
var img_scriptIconColor = "#007E787F";
var img_refreshIconColor = "#FFFFFF";
var appversion = app.versionName;
importClass(android.view.View);
importClass(android.graphics.Color)
importClass(android.app.AlertDialog);
importClass(android.widget.EditText);
importClass(java.io.File);
importClass(android.content.Context);
importClass(android.provider.Settings);
importClass(java.lang.Runnable);


var window = activity.getWindow();
var decorView = window.getDecorView();
var option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
decorView.setSystemUiVisibility(option);

window.addFlags(android.view.WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
window.setStatusBarColor(Color.TRANSPARENT);

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="阅读精灵 V{{appversion}}" />
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                <scroll layout_gravity="center">
                    <frame>
                        <vertical h="*">
                           <horizontal id="progressw" gravity="center" marginTop="0">
                                <progressbar id="progress" w="*" h="3" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal" />
                            </horizontal>
                            <button id="start" text="开始运行" style="Widget.AppCompat.Button.Colored" textColor="#ffffff" />


                            {/* 空行 */}
                            <Switch id="autoService" text="无障碍服务" textColor="{{textColor}}" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />
                            

                            <linear w="*" h="40" paddingLeft="8" gravity="left|center" >
                                <text text="手机型号" textSize="12sp" textColor="{{textColor}}" />
                            <linear h="40" paddingTop="1" >
                                    <radiogroup id='fbName' orientation="horizontal">
                                    
                                    </radiogroup>
                                </linear>
                            </linear>


                            <linear w="*" h="40" paddingLeft="8" gravity="left|center" >
                                <text text="工作模式" textSize="12sp" textColor="{{textColor}}" />
                              
                                <linear h="40" paddingTop="1" >
                                    <radiogroup id='fbName' orientation="horizontal">
                                    
                                        <radio id="autoread" text='自动阅读' color="{{textColor}}" checked="true"></radio>
                                     </radiogroup>
                                </linear>
                            </linear>


                          
                            <linear w="*" h="40" paddingLeft="8" gravity="left|center" >
                                <linear h="40" paddingTop="1" >
                                    <radiogroup id='changjing' orientation="horizontal">
                                      
                                        <checkbox id="floatywindow" text="悬浮窗" color="{{textColor}}" checked="true" />
                                    </radiogroup>
                                </linear>
                            </linear>

                            {/* <linear w="*" h="40" paddingLeft="8" gravity="left|center" >
                                <text text="激活码" textSize="12sp" textColor="{{textColor}}" />
                                <input id="fsn" layout_weight="1" textColor="black" textSize="16sp" marginLeft="16"></input>
                                <button id="licence_activate" w="80" text="激活" style="Widget.AppCompat.Button.Colored" textColor="#ffffff" />
                            </linear> */}
                           
                            <vertical w="*" h="1" bg="{{textColor}}" ></vertical>

                            {/* 其他功能区域相关配置 */}
                            <linear w="*" h="*" paddingLeft="8" gravity="left|center" >
                                <text text="软件列表" textSize="12sp" textColor="{{textColor}}" />
                                <button id="appinfo" text="展开详情" style="Widget.AppCompat.Button.Borderless.Colored" />
                               </linear>

                            <vertical margin="0 0 0 0" id="applist">
                         
                            </vertical>

                            {/* 分割线填充 */}
                            <vertical w="*" h="1" bg="{{textColor}}" ></vertical>
                          







                        </vertical>

                    </frame>
                </scroll>
                <scroll layout_gravity="center">
                    <frame>
                        <vertical>
                            <button text="自动初始化配置" id="autoconfig" style="Widget.AppCompat.Button.Colored" textColor="#ffffff" />
                        </vertical>

                    </frame>
                </scroll>
                <frame >
                    <vertical margin="0 0 0 0" id="logframe">






                    </vertical>
                </frame>
                {/* <frame>
                    <text text="第三页内容" textColor="green" textSize="16sp"/>
                </frame> */}
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg" />
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

console.setGlobalLogConfig({
    "file": "/sdcard/haiqu_error.log",//日志路径，测试打包后相对路径无法生成日志文件，绝对路径可以
    "rootLevel": "DEBUG",//写入的日志级别,默认为"ALL"（所有日志），可以为"OFF"(关闭), "DEBUG", "INFO", "WARN", "ERROR", "FATAL"等
    "maxFileSize": 512 * 1024,//默认为512 * 1024 (512KB)
    "maxBackupSize": 5//日志备份文件最大数量，默认为5

});

//ui.downloadapp.setVisibility(6);
//ui.progress.setVisibility(6);
//检测无障碍服务
ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});
//开始运行脚本
ui.start.on("click", function () {
    //如果licence是激活状态才更新开关量
    if (Glicence == true) {
        Guser_start = true;
        //程序开始运行之前判断无障碍服务
        if (auto.service == null) {
            toast("请先开启无障碍服务！");
            return;
        }
        Gdevicetype="xiaomi4";
      
        if (ui.autoread.checked == true) {
            Grunstate = "autoread";
            // alert("自动阅读");
        }
     
    } else {
        toast("请先激活");
    }

});

activity.setSupportActionBar(ui.toolbar);



//设置滑动页面的标题
//判断是否开启了本地收益统计
var resultanaly = files.exists("/sdcard/脚本/localanaly")
if (resultanaly) {
    ui.viewpager.setTitles(["全局设置", "收益统计"]);

} else {
    ui.viewpager.setTitles(["全局设置"]);

}

//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

// //让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource(
    [
        {
            title: "退出1",
            icon: "@drawable/ic_exit_to_app_black_48dp"
        }
    ]
);

ui.menu.on("item_click", item => {
    switch (item.title) {
        case "退出":
            ui.finish();
            break;
            // case "开始运行":
            //     //alert("start");
            //     Grunstate="autoread";

            break;
    }
})
//获取哪些要刷的app列表
ui.appinfo.click(() => {

    //  alert(Gapps);
    try {
        // ref_ui_list();
        // setTimeout(() => {
        if (thiscommon.ref_ui_list()) {
            ui.appinfo.setVisibility(8);
        };
        // }, 5000);

    } catch (e) {
        alert(e);
        toast("列表加载中..请等3秒钟再试");
    }


});



ui.floatywindow.on('check', (checked) => {
    if (checked) {
        Gfloatywindow = true;
    } else {
        Gfloatywindow = false;
    }
});

ui.autoconfig.on("click", function () {
    // engines.execScript("auto configuration", "thisautoconfig.autoconfiguration();\n" + thisautoconfig.autoconfiguration.toString());
    engines.execScriptFile("./autoconfig.js");
});
ui.viewpager.setOnPageChangeListener({ //设置非第一页时,刷新按钮隐藏
    onPageSelected: function (position, positionOffset, positionOffsetPixels) {
        //  toast('position: ' + position + "\npositionOffsetPixels: " + positionOffsetPixels );
        if (position == 1) {
            toast("aaa")
           
        } else {
            
        }
    }
});

applist=[];
//GdeviceMac="";
GdeviceImei = "";
//机器码
Gdevicecode = "";
//getdevicemac();
thiscommon.getdeviceimei();



thiscommon.opennobarrier();
//是否开启本地日志和日志上报
Ginsert_log = false;
var logresult = files.exists("/sdcard/脚本/locallog");
if (logresult) {
    Ginsert_log = true;
    toast("日志功能已经开启");
} else {
    Ginsert_log = false;
}
//是否要统计收益
Ganalyincome = false;
var result = files.exists("/sdcard/脚本/localincome");
if (result) {
    Ganalyincome = true;
    toast("统计收益已经开启");
} else {
    Ganalyincome = false;
}


Glicence = false;
Gcode_state = "ui";//noui ui
//记录当前统计是app开始前的统计还是结束前的统计
Ganalyflag = ""
//记录本app是否收益统计完成了
Ganalybreak = false;
//记录当前APP是否统计过收益
Galreadyaci = false;

//秒计数器，用于记录app阅读时间，超时后切换下一个
Gsecond = 0;
//当该变量为true时，可以中途结束某一个app的阅读直接切换到下一个
Grunbreak = false;
//finditem 上一次返回的ele控件top值;
Gfindnews_last_ele_top = 0;
//砖头数量计数器，findnew readnews 在工作的时候需要每次循环增加一块砖，while_control每次循环先验证砖是不是0，如果不是0置空砖头为0
Gbrick_count = 0;
//线程错误数量计数器
workthread_errorcount = 0;
//所有开关量app对应的包名json
Gpackagename_lists = "";
//脚本运行速度
Grunspeed = "slow";//fast normal slow;
//当前工作模式，如果有UI界面，则该变量需要在UI的启动按钮中声明
//运行模式变量 自动阅读，绑定微信，微信养号 // 对应字典autoread bindwechat trainwechat popupdebug
if (Gcode_state == "ui") {
    Grunstate = "";
} else if (Gcode_state == "noui") {
    Grunstate = "autoread";

}
//手机场景  包括室内 和户外 分别用indoor outdoor字典表示
Genv = "indoor";
//是否根据本地于都标记，从下一个app开始阅读
Greadflag = false;
//是否开启守护
Gopendaemon = false;
//悬浮窗开关量
Gfloatywindow = true;
//软件语音开关量 true false
Gsoftvoice = false;
//底层是否已经运行
Galready = false;
//是否加载过json文件
Galready_loadjson = false;
//用户是否点击了开始运行
Guser_start = false;
//用户是否手动取消了倒计时
Guser_cancel = false;
Gworkthread = "";
Gfirstrun = true;
//签到之后定位首页模块是否操作过
Gisaction = false;
//是否开启调试打印  字典true false
Gdebug = false;
//多少次找不到新闻执行一次重启app
Gnofindnews_countback = 5;
//所有要阅读那些app数据结构
//30分钟=1800秒=1800000毫秒
//1.3分钟=100000毫秒
//每一个app阅读多长时间的变量
Gappinterval = "1800000";
//关闭弹窗线程的循环周期
Gabinterval = "3000";
//block_mode阻塞验证超时秒数
Gblock_mode_interval = 5;
//用户试图退出外挂计数器
Guser_close_myself_count = 0;
//Gincome_flag 统计收益时服务器下发的统计标记
Gincome_flag = "";

//设备类型
//自动判断
devicestr = device.model
// if ("Redmi Note 2" == devicestr) {
//     Gdevicetype = "xiaominote2";
// } 
if ("MI 4S" == devicestr) {
    Gdevicetype = "xiaomi4s";
    try { if (Gcode_state == "ui") { ui.xiaomi4s.checked = true } } catch (e) { };
} 
// if ("MI 4LTE" == devicestr) {
//     Gdevicetype = "xiaomi4";
//     try { if (Gcode_state == "ui") { ui.xiaomi4.checked = true } } catch (e) { };
// } if ("R11 Plus" == devicestr) {
//     Gdevicetype = "lnnl"; //字典 xiaomi4 xiaomi4s lnnl xiaominote2
//     try { if (Gcode_state == "ui") { ui.lnnl.checked = true } } catch (e) { };
// } if (devicestr == "Le X625" || devicestr == "Le X620" || devicestr == "Le X820") {
//     Gdevicetype = "le"; //字典 xiaomi4 xiaomi4s lnnl xiaominote2
//     try { if (Gcode_state == "ui") { ui.le.checked = true } } catch (e) { };
// } if (devicestr == "vmos") {
//     Gdevicetype = "vmos";
//     try { if (Gcode_state == "ui") { ui.vmos.checked = true } } catch (e) { };

// }
//显示序列号
try {
    thread_upfsn.interrupt();
} catch (e) { }
//调用initlicence，看本地数据库有无激活码并到云端验证
thread_upfsn = threads.start(
    function () {
        Guser_cancel = true;
        Glicence = true;//默认激活
        // var fsn = initlicence('');
     
        // if (fsn == null || fsn == '') {
        //     toast("请输入激活码");
        //     //取消倒计时

        // } else {
            
        //     //到云端验证，更新Glicence状态
        //     //  Glicence=true;

        //     try { thread_setvisi.interrupt(); } catch (e) { }
        //     //跟新界面
        //     thread_setvisi = threads.start(function () {
        //         ui.fsn.setText(fsn);
        //         ui.licence_activate.setVisibility(7);
        //     });
        //     //  var session=Gdevicecode;//device.getAndroidId();
        //     //   alert("fsn is:"+fsn+" aid is:"+session);
        //     // var r=http.get(Gchecklicence_api+"&fsn="+fsn+"&fsession="+session);



        //     //生成机器码
        //     Gdevicecode = thiscommon.builddevicecode();
        //    // alert("有激活码："+fsn);

        //    // toast("thread fsn is:"+fsn);
        //     var r = http.postJson(Gchecklicense_api_new, {
        //         "fsn": fsn,
        //         "fsession": Gdevicecode
        //     });
        //     if (r.statusCode == "200") {
        //         var result = r.body.string();
        //         var resultobj = eval('(' + result + ')');
        //         //  if("ok"==resultobj[0]["status"]){
        //         //      toast("已经激活");
        //         if (0 == resultobj.code) {
        //             toast(resultobj.message);
        //             Guser_cancel = false;
        //             Glicence = true;
        //         } else {
        //             toast(resultobj.message);
        //         }

        //         //  }else if("error1"==resultobj[0]["status"]){
        //         //     toast("激活码不正确");
        //         //  }else if("error2"==resultobj[0]["status"]){
        //         //     toast("您的设备信息与云端不一致，24小时后自动解锁");
        //         //  }
        //     }



        // }
    }
);
//Gdevicetype="xiaomi4"; //字典 xiaomi4 xiaomi4s lnnl xiaominote2

//json特征码加载方式 remote local 
//目前已经支持从云端获取特征码，Gjsonloadstate改为remote即可从指定的云端路径下载json文件，现在Gapplistpath_remote的路径
//使用的是开发人员及其，后期发版是需要改为点趣域名，并将特征码更新到云端路径
Gjsonloadstate = "remote";

/**************************研发常用开关量 ******************************************************/
//日志上报接口
Guploadlog_url = "http://192.168.3.254:8888/import/import_log";

//1 app json特征码远程下载根路径
Gapplistpath_remote = "https://haiqu-app.oss-cn-qingdao.aliyuncs.com/海趣助手/applist";//公有云


//2 Gapps,哪些app要刷的开关量json云端文件路径
Gappspath_remote = "http://manager.dianqu666.online:9999/app/list";
//Gappspath_remote="http://192.168.3.201/haiqu/gapps.json";                                         //私有云

//apk下载地址
Gappdownloadpath = "https://haiqu-app.oss-cn-qingdao.aliyuncs.com/apk/";

//3 api 接口文件路径

Gapi_json_url = "http://manager.dianqu666.online:8888/repo/haiqu_helper/version/version.json"; //公有云



Gchecklicense_api_new = "http://manager.dianqu666.online:9999/license/check"  //请勿修改

/**************************研发常用开关量结束 ******************************************************/
//海趣助手apk下载路径
//Gdownloadpath = "http://115.29.141.214:8888/repo/haiqu_helper/update/haiqu.apk"  //请勿修改
//Gdownloadpath = "http://manager.dianqu666.online:8888/repo/haiqu_helper/update/haiqu.apk"  //请勿修改
Gdownloadpath = "https://haiqu-app.oss-cn-qingdao.aliyuncs.com/%E6%B5%B7%E8%B6%A3%E5%8A%A9%E6%89%8B/update/haiqu.apk"  //请勿修改
//特征码路径 字典./applist/  表示到根目录脚本里找applist， /storage/emulated/0/applist/ 表示只到根目录下找applist
Gapplistpath = "./applist/";  //请勿修改
//语音包路径  /storage/emulated/0/voice/ 表示到根目录下找voice
Gvoicepath = "./voice/";    //请勿修改
Gapps = "";

//fitem 函数专用定界特征码
v4feature = "android.support.v4.view.ViewPager";
v7feature = "android.support.v7.widget.RecyclerView";
androidx = "androidx.recyclerview.widget.RecyclerView";

Gclass_awt='android.widget.TextView';
Gclass_awi='android.widget.ImageView';


if (Gcode_state == "ui") {
    var thisnum = 10;
    UI_run_thread = threads.start(function () {
        setInterval(function () {

            if (Grunstate != "" && Galready == false) {
                 //   alert("run");
                Galready = true;
                thiscommon.loadGapps();
                init();
                run();

                //  try{UI_run_thread.interrupt()}catch(e){};
            };
            if (Galready_loadjson == false) {
                //这里在app弹出界面后自动执行
                Galready_loadjson = true;
             //   var result = thiscommon.sysupdate_check();


             //   if (result) {

            //    } else {
                    //  alert("123")
                    //   ui.downloadapp.setVisibility(3);
                    //  ui.progress.setVisibility(3);
            //        thiscommon.play("global", "发现新版本");
           //     }
                // alert("882266");
                thiscommon.loadGapps();
                // alert("882288")
                applist=thiscommon.loadappjson();
                //   alert("hahah");

            }
            if (thisnum > 0 && Guser_cancel == false) {
                thisnum = thisnum - 1;
                toast("还有" + thisnum + "秒开始自动执行");
            } else {
                //如果用户没有点击开始运行，脚本本身也没有运行，而且用户也没有取消才进入倒计时
                if (Guser_start == false && Galready == false && Guser_cancel == false) {
                    Galready = true;
                    Grunstate = "autoread"
                    thiscommon.loadGapps();
                    init();

                    run();
                }

            }

            //  ui.start.setText("开始执行("+thisnum+")");
        }, 1000)
    });
}


if (Gcode_state == "noui") {
    thiscommon.loadGapps();
    run();
}
function init() {
    if ("ui" == Gcode_state) {
        try {
            // if (ui.shorttime.checked) {
            //     Gappinterval = 100000;
            // }

            // if (ui.opendaemon.checked) {
            //     Gopendaemon = true;
            //     //  alert("开启守护")
            // } else {
            //     Gopendaemon = false;
            // }

            // if (ui.readflag.checked) {
            //     // alert("阅读进度");
            //     Greadflag = true;
            // } else {
            //     Greadflag = false;
            // }

            // //运行速度判断
            // if(ui.slow.checked){
            //     Grunspeed="slow";
            // }else if(ui.normal.checked){
            //     Grunspeed="normal"
            // }else if(ui.fast.checked){
            //     Grunspeed="fast";
            // }
            // toast("当前速度："+Grunspeed);
        } catch (e) { }
        // "opendaemon" text="开启守护" color="{{textColor}}" checked="true"/>
        // <checkbox id="readflag"

    }

}

/*************************以下是主线程循环 *******************************************************************/
function run() {

    if (!requestScreenCapture()) {
        toast("权限失败");
        exit();
    };
   // ra = new RootAutomator();
    // //ra.setScreenMetrics(device.width, device.height);
   // ra.setScreenMetrics(1080, 1920);
    events.setKeyInterceptionEnabled("volume_down", true);
    threads.start(function () {
        events.observeKey();
        events.on("key", function (volume_down, event) {
            Guser_close_myself_count += 1;
            //处理按键事件
            toast("连续按5次音量下退出海趣助手!!!");
            try {
              
            } catch (e) {
                alert("关闭脚本：" + e);
            }


        });
    });
    //取出安卓ID作为session
    Gsession = device.getAndroidId();


   

    thiscommon.voice_runstate();
    thiscommon.voice_devicetype();

    //voice_env();

    //读取配置文件

    applist=thiscommon.loadappjson();

    // if (Greadflag) {//如果开关量打开，才根据本地app标志位确定下一个app
    //     thiscommon.resort_applist();
    // }
    //根据场景设置gps
    //thiscommon.setgps_status();
    //alert("run")

    //如果是微信养号需要的操作
    if (Grunstate == "trainwechat") {

        engines.execScriptFile('mytrainwechat.js');
        //lanuchApp("微信");

        // whchat();

    } else {
        
        while (true) {
            for (var i = 0; i < applist.length; i++) {

                //每轮运行前杀死之前的线程，防止缓存
                thiscommon.clear_normal_thread();
                try { thread_control.interrupt(); } catch (e) { };
                try { thread_abnormal.interrupt(); } catch (e) { };
                try { thread_abnormal_overtime.interrupt(); } catch (e) { };
                try { thread_closewindow.interrupt(); } catch (e) { };
                //while_pagecheck();


                sleep(2000);
                //根据设备类型优化内存
                thiscommon.clean(Gdevicetype, Gpackagename_lists);
                //初始化是否统计过收益状态 
                Galreadyaci = false;
                //给各个app用的计数器
                Callback_finditem_swipecount = 0;

                //签到之后定位首页模块是否操作过
                Gisaction = false;
                //拉起一次守护，保证相互守护
                // activity="com.example.linyuming.broadcasttest/com.example.linyuming.broadcasttest.MainActivity"
                // shell("am start -n " + activity, true);
                // if (Gopendaemon) {//如果开关量开启，才拉起守护
                //     //使用带参数的拉起守护进程
                //     app.startActivity(
                //         {
                //             packageName: "com.example.linyuming.broadcasttest",
                //             className: "com.example.linyuming.broadcasttest.MainActivity",
                //             data: "start_thread",
                //             root: true
                //         }
                //     );
                // } else {
                //     // alert("未打开守护");
                // }
                if (Gfloatywindow){
                    //创建并生成一个悬浮窗。
                    var window = floaty.window(
                        //创建一个按钮，并设置其id宽高文字等属性。
                        <button  id="but" w="50px" h="200px" text="长按结束脚本"/>
                    );
                    // var xw=device.width;//屏幕的宽度
                    // var yh=device.height;//屏幕的高度
                    window.setPosition(0,device.height/5);//悬浮窗的位置
                    //输出提示信息。
                    // toastLog("长按悬浮窗关闭本脚本");
                    //空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
                    setInterval(() => {}, 500);
                    //声明一个变量用来控制线程。
                    var thread = null;
                    //创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
                    var ad = new 悬块(window, window.but);
                    //设置长按事件。
                    ad.setLongClick(function() {
                        //输出气泡信息。
                        threads.shutDownAll()
                        ui.finish();
                        toast("脚本已关闭");
                    });
                    //设置点击事件。
                    ad.setClick(function() {
                        //输出气泡信息。
                        toast("点击");
                        window.but.attr('w','400px');
                        setTimeout(()=>{
                            window.but.attr('w','50px');
                        }, 5000);
                        
                        //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
                        if (thread?!thread.isAlive():true) { //线程没有运行。
                            //新建一个线程，赋值给变量thread
                            thread = threads.start(function() {
                                //在线程里面执行其他事情。比如点击滑动等自动操作。(需要无障碍权限)
                                //提示线程开始运行。
                                
                    
                            //    toast("线程开始运行");
                            });
                        };
                    });
                }


                // var enable=applist[i]['enable'];
                appname = applist[i]['appname'];
                try { apptype = applist[i]['apptype']; } catch (e) { apptype = "layer2" }
                if ("layers" == apptype) {
                    //针对pagecheck 机制，加载对应的函数
                    Gext_common=require('./applist/'+appname+'_ext.js');
                    pagecheck_obj = applist[i]['pagecheck'];
                    //alert("pagecheck_obj:"+pagecheck_obj);
                }
                analyincome_obj = "";
                // alert("analyincome_obj is1:"+analyincome_obj);
                try { analyincome_obj = applist[i]['analyincome']; } catch (e) { analyincome_obj = "" };

                packagename = applist[i]['packagename']
                activityname = applist[i]['activityname'];
                open_obj = applist[i]["open"];
                bindwechat_obj = applist[i]['bindwechat'];
                signin_obj = applist[i]['signin'];
                incomeanaly_obj = applist[i]["incomeanaly"];
                try {
                    Grunspeed = applist[i]["speed"];
                    if ("undefined" == typeof (Grunspeed)) {
                        Grunspeed = "normal";
                    }
                } catch (e) {
                    Grunspeed = "normal";
                }

                Gappinterval = applist[i]["interval"]
                Gappinterval = Number(Gappinterval) * 60 * 1000;
                //app要读多少秒
                Gappinterval_second = Gappinterval / 1000;


                //根据设置的速断设置滑动量速度
                //判断当前运行速度是快速，普通还是慢
                if ("fast" == Grunspeed) {
                    //两次滑动之间最大等待多少毫秒
                    Gmax = 300;
                    //两次滑动之间最小等待多少毫秒
                    Gmin = 200;
                    //单次滑动时两点间用的时间
                    Gppinterval = 200;
                } else if ("normal" == Grunspeed) {
                    Gmax = 800;
                    Gmin = 501;
                    Gppinterval = 250;
                } else if ("normal+" == Grunspeed) {
                    Gmax = 800;
                    Gmin = 501;
                    Gppinterval = 300;
                }
                else if ("slow" == Grunspeed) {
                    Gmax = 4000;
                    Gmin = 1000;
                    Gppinterval = 500;
                } else {
                    Gmin = 4000;
                    Gmin = 1000;
                }
                toast("当前速度" + Grunspeed);
                //             //从云端获取特征码js
                // try{
                // http.__okhttp__.setTimeout(10000);
                // var r=http.get(Gapplistpath_remote+"/"+appname+".js")

                // Gfinditemstr=r.body.string();
                // eval(Gfinditemstr);//alert("加载"+appname+".js");
                // }catch(e){
                // toast("this is findnews httpget and eval:"+e);
                // }
                //从本地获取特征码js
                try {

                    Gfinditemstr = files.read(Gapplistpath + "/" + appname + ".hqjs");


                    // console.log(Gfinditemstr);
                    eval(Gfinditemstr);//alert("加载"+appname+".js");
                } catch (e) {
                    toast("this is findnews httpget and eval:" + e);
                }


                try {
                    mulityback = applist[i]["mulityback"];
                    if ("undefined" == typeof (mulityback)) {
                        //如果没有声明mulityback 按照true来做 
                        mulityback = "back";
                    }
                } catch (e) {
                    mulityback = "back";
                }
                if ("undefined" == typeof (signin_obj)) {
                    toast(appname + ".json signin数据项缺失");
                }
                autoread_obj = applist[i]["autoread"];
                abnormal_obj = applist[i]["abnormal"];
                try {
                    activitys_obj = applist[i]["activitys"];
                    if ("undefined" == typeof (activitys_obj)) {
                        toast(appname + ".json activitys数据项缺失");
                    }
                } catch (e) {

                }

                //当开启app版本号输出时
                try {
                 //   if (ui.showappver.checked == true) {
                        // 乐视不兼容console。hide
                        //     console.show();
                        var appversion = thiscommon.getPackageVersion(packagename);
                        var appversion_server = "未设置";
                        try { appversion_server = applist[i]["appver"]; } catch (e) {
                        }
                        if ("undefined" == typeof (appversion_server)) {
                            var appversion_server = "未设置";
                        }
                   //     toast(appname + " ver: " + appversion + "\n服务器ver: " + appversion_server);
                        sleep(5000);
                        //   console.hide();
                   // }

                } catch (e) {

                }


                toast('开始' + applist[i]['appname']);

                //    //每轮运行前杀死之前的线程，防止缓存
                //    clear_normal_thread();
                //    try{    thread_control.interrupt();}catch(e){};
                //    try{    thread_abnormal.interrupt();}catch(e){};
                //    try{    thread_abnormal_overtime.interrupt();}catch(e){};
                //    try{    thread_closewindow.interrupt();}catch(e){};
                //    //while_pagecheck();


                //    sleep(2000);
                //    //根据设备类型优化内存
                //    thiscommon.clean(Gdevicetype,Gpackagename_lists);

                //while_pagecheck();
                //开启异常处理弹窗线程
                while_abnormal(abnormal_obj);
                //demon_abnormal(abnormal_obj);
                while_closewindow(Gdevicetype);

                //开启控制线程--通用 该函数感知Grunstate的变化，调用对应的线程
                while_control(appname, packagename, activityname, open_obj, bindwechat_obj, signin_obj, autoread_obj);

                //阻塞运行打开app 
            //    insert_log('', 'main', appname, '012', '')
               // alert("run"); 
               
                var openstate = thiscommon.openAPP(appname, packagename, activityname, open_obj);
               // alert("openstate "+openstate);
               // alert("test openstate is："+openstate);

                //每个app需要阅读的时间sleep

                //var thisinterval=3*100000;
                //30分钟=1800秒=1800000毫秒
                //1分20秒=100000毫秒

                //var thisinterval=1800000;
                // alert(openstate);
                //如果打开失败跳转到下一个app，如果成功则进行延迟等待，这样节约时间
                if (openstate) {
                    Gworkthread="openapp_stop";
                    //alert("打开成功-写日志")
                    insert_log('', 'main', appname, '012', '1');
                    try { setlastapp("1", appname); } catch (e) { }

                   
                    toast("阅读" + Gappinterval_second / 60 + "分钟......................");
                    // setlastapp("",appname);
                    if ("popupdebug" == Grunstate) {
                        while_abnormal_overtime(activitys_obj);
                    }
                    //当前app驻留时间
                    if (Grunstate == "analy") {
                        //income_getflag  获取标志位
                        var tmpurl = "http://download.dqu360.com:81/haiqu/api.aspx?&action=income_getflag";
                        var r = http.get(tmpurl);
                        if ("200" == r.statusCode) {
                            //[{"fincome_flag":17756134}]
                            var tmpstr = r.body.string();
                            var jsonstr = eval('(' + tmpstr + ')');
                            Gincome_flag = jsonstr[0]['fincome_flag'];
                            //如果是统计收益，走blockanalay阻塞函数
                            thiscommon.block_analay(incomeanaly_obj);
                        }

                    } else {
                        while (true) {
                            //如果Grunbreak 为false，说明没有接到通知，切换下一个
                            if (Grunbreak == false) {

                                if (Gsecond > Gappinterval_second) {
                                    Gsecond = 0;
                                    break;
                                }

                                //+1秒
                                Gsecond += 1;
                                sleep(1000)
                            } else {
                                toast("接到线程指令，提前切换下一个")
                                thiscommon.clear_normal_thread();
                                Gsecond = 0;
                                Callback_finditem_swipecount = 0;
                                //反之，接到了某一个线程或函数的通知，要求切换app，立刻跳出主线程阻塞，并且重载Grunbreak为false，否则会一直多米诺方式切换下一个的
                                Grunbreak = false;

                                break;
                            }
                        }
                        //最后需要再次统计一次收益
                        //clean
                        //openapp
                        //统计收益函数 finish标志，标识是该app刷完了，如果本地统计收益开关量为开，再次统计收益
                        if (Ganalyincome == true) {
                            while_analycoinincome('finish')

                        }
                        // sleep(Gappinterval);
                    }
                } else {
                    insert_log('', 'main', appname, '012', '0')

                }
                toast("准备开始下一个");

                //开启异常处理线程--通用
                Gfirstrun = false;
                sleep(1000)
            }
            //for end
            //如果是统计收益，就不要用到外层的while了，只统计一轮就好
            if (Grunstate == "analy") {
                alert("统计完成，请到服务器上查看统计标记为:" + Gincome_flag + "，手机标识为:" + Gsession + "的相关记录");
                break;

            }
        }
        //while end

    }
    //if end

} //while end

//function fun end
/*************************以下是函数实现部分 *******************************************************************/
//序列号验证
//加载开关量
function checklicence(fsn) {

    http.__okhttp__.setTimeout(10000);
    var r = http.get(Gappspath_remote);
    if ("200" == r.statusCode) {
        // alert(r.body.string());
        var tmpstr = r.body.string();
        Gapps = eval('(' + tmpstr + ')');



    } else {
        toast("加载云端gapps列表出错");
    }




}


//加载finditem js脚本
function loadappjs() {
    // thisfinditem=require(Gapplistpath+"/"+appname+".js");
    //thisfinditem=require("http://192.168.3.89/jsonurl/2345%E6%B5%8F%E8%A7%88%E5%99%A8.js");
    //   http://192.168.3.89/jsonurl/2345%E6%B5%8F%E8%A7%88%E5%99%A8.js
    // alert("loadappjs appname is:"+appname);
    var r = http.get(Gapplistpath_remote + "/" + appname + ".js")
    tmpstr = r.body.string();
    // alert(tmpstr);
    //thisfinditem=
    try {
        eval(r);

    } catch (e) {
        alert("eval error:" + e)
    }
    //  alert('code=',r.statusCode)
    //   //alert(r.body.string());
    //   var r=http.get(Gapplistpath_remote+"/"+appname+".js")
    //  var jsbyte=r.body.bytes();

    // // files.createWithDirs(Gapplistpath+"/tmp");
    //  files.writeBytes(Gapplistpath+"/tmp/finditem.js",jsbyte);


    // sleep(3000);
    //  thisfinditem=require(Gapplistpath+"/tmp/finditem.js");
    // files.remove(Gapplistpath+"/tmp/finditem.js");
    // //files.close();
}





//语音广播场景
function voice_env() {
    thiscommon.play('global', "场景")
    if (ui.indoor.checked == true) {
        thiscommon.play('global', "室内")
    } else if (ui.outdoor.checked == true) {
        thiscommon.play('global', "户外")

    }
}









//用悬浮窗里控制运行代码的方法。
//每一行都有注释

//定义悬浮窗控制模块，命名为(悬块)。
var 悬块 = function(window, view) {
    //判断是否缺少构造参数。
    if (!window || !view) {
        //缺少构造参数，抛出错误。
        throw "缺参数";
    };
    //记录按键被按下时的触摸坐标
    this.x = 0, this.y = 0;
    //记录按键被按下时的悬浮窗位置
    this.windowX, this.windowY;
    //按下时长超过此值则执行长按等动作
    this.downTime = 500;
    //记录定时执行器的返回id
    this.Timeout = 0;
    //创建点击长按事件
    this.Click = function() {};
    this.LongClick = function() {};
    //可修改点击长按事件
    this.setClick = function(fun) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.Click = fun;
        };
    };
    this.setLongClick = function(fun, ji) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.LongClick = fun;
            //判断参数是否可为设置数字？
            if (parseInt(ji) <= 1000) {
                this.downTime = parseInt(ji);
            };
        };
    };

    view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        //判断当前触控事件，以便执行操作。
        switch (event.getAction()) {
            //按下事件。
            case event.ACTION_DOWN:
                //按下记录各种坐标数据。
                this.x = event.getRawX();
                this.y = event.getRawY();
                this.windowX = window.getX();
                this.windowY = window.getY();
                //创建一个定时器用来定时执行长按操作。
                this.Timeout = setTimeout(() => {
                    this.LongClick();
                    this.Timeout = 0;
                }, this.downTime);
                return true;
                //移动事件。
            // case event.ACTION_MOVE:
            //     //移动距离过大则判断为移动状态
            //     if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
            //         //移动状态清除定时器
            //         if (this.Timeout) {
            //             //定时器存在则清除定时器。
            //             clearTimeout(this.Timeout);
            //             this.Timeout = 0;
            //         };
            //         //移动手指时调整悬浮窗位置
            //         window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
            //     };
            //     return true;
                //抬起事件。
            case event.ACTION_UP:
                if (this.Timeout) {
                    //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                    //清除定时器。
                    clearTimeout(this.Timeout);
                    this.Timeout = 0;
                    //执行点击事件。
                    this.Click();
                };
                return true;
        };
        //控件的触控事件函数必须要返回true。否则报错。
        return true;
    }));
};


//主模块自主判断滑动机制
function main_swipe() {
    if ("lnnl" == Gdevicetype || "xiaomi4" == Gdevicetype || "le" == Gdevicetype || "vmos" == Gdevicetype) {
        try { thisswipe.swiperealup_custom_lnnl(Gppinterval); } catch (e) { toast("e2:" + e) };
    } else {
        thisswipe.swiperealup_custom();
    }
}




function addTextView(parent) {
    // var child = view
    var child = new TextView(context);
    child.setTextSize(20);
    child.setTextColor(colors.parseColor("#ff00f0"))
    child.setText("左护法");
    child.setGravity(0); //左护法
    parent.addView(child);
    log(child)
    var child = new TextView(context);
    child.setTextSize(20);
    child.setTextColor(colors.parseColor("#ff00f0"))
    child.setText("大长老"); //中间的是大长老
    child.setGravity(1);
    parent.addView(child);
    log(child)
    var child = new TextView(context);
    child.setTextSize(20);
    child.setTextColor(colors.parseColor("#ff00f0"))
    child.setText("右护法");
    child.setGravity(5); //右护法
    parent.addView(child);
    log(child)
}
function whthumbup() {

    click("发现");
    thiscommon.play("global", "点击");
    thiscommon.play("global", "发现");



    ele = className("android.widget.TextView").text("朋友圈");
    thiscommon.clickxy_for_ele_once(ele.findOne(1000));
    thiscommon.play("global", "点击");
    thiscommon.play("global", "朋友圈");
    sleep(2000);
    //上滑
    //thiscommon.swiperealup_custom();
    //sleep(1000);
    //点击评论三个小点
    thiscommon.play("global", "点击");
    thiscommon.play("global", "赞");
    ele = className("android.widget.ImageView").desc("评论");
    thiscommon.clickxy_for_ele_once(ele.findOne(1000));
    sleep(1000);

    // //点赞代码
    // ele=className("android.widget.ImageView").desc("评论");
    // clickxy_for_ele_once(ele.findOne(1000));
    // sleep(1000);
    // ele=className("android.widget.TextView").text("赞");
    // clickxy_for_ele_once(ele.findOne());
    // 评论代码

    // 点击评论弹窗
    // ele=className("android.widget.TextView").text("评论");
    // clickxy_for_ele_once(ele.findOne());
    // 录入文字
    // setText("找到好的告诉我，我也在找哦");
    // sleep(1000);
    // ele=className("android.widget.Button").text("发送");
    // clickxy_for_ele_once(ele.findOne(1000));

    // alert(ele.findOne(1000));
    // sleep(1000);
    // ele=className("android.widget.TextView").text("取消");
    // clickxy_for_ele_once(ele.findOne());

}
// while_abnormal的守护线程，有时候click事件会阻塞，所以每隔5秒杀掉abnormal线程再启动
function demon_abnormal(abnormal_obj) {
    thiscommon.mytoast("this is demon_abnormal...");
    thread_demon_abnormal = threads.start(
        function () {
            setInterval(function () {
                while_abnormal(abnormal_obj);
                sleep(5000);
                thread_abnormal.interrupt();
            }, 1000);
        }
    );

}
//波波视频的一个特殊阅读处理
function callback_boboshipin(fucname, ele) {
    var thisnum = 0;
    //alert(ele.child(1).child(0).text());
    var thistop = ele.child(1).child(0).bounds().top + 20;
    var thisleft = ele.child(1).child(0).bounds().left + 130;

    //     while(1){
    //         if(thisnum>30){
    //             break;
    //         }
    //         //toast("top is"+thistop+" left is"+thisleft);
    //         thiscommon.touchreal(thistop,thisleft);     
    //        // toast("fuck ............."+thisnum);
    //         thisnum+=1;
    //     sleep(3000);
    // }
    var thisnum = 0;
    while (1) {
        // thiscommon.touchreal(300,1273);
        //toast("top is"+thistop+" left is"+thisleft);
        //点击有收益的地方
        sleep(1000);
        thiscommon.touchreal(thisleft, thistop);
        sleep(800);

        //如果是点击领取
        var elelq = className("android.view.View").desc("点击领取");//.findOnce(0);
        if (elelq.exists()) {
            //点击
            elelq.findOnce(0).click();
            sleep(1000);
            //  elelq.findOnce(0).click();  

            //关闭
            sleep(1000);
            var eleclose = id("e8").exists();
            if (eleclose) {
                id("e8").click();
            }

        }
        //如果是分享给朋友
        var elefx = className("android.view.View").desc("分享给朋友");
        if (elefx.exists()) {
            sleep(1000);
            //关闭
            var eleclose = id("e8").exists();
            if (eleclose) {
                id("e8").click();
            }
        }


        if (thisnum > 20) {
            break;
        }
        thisnum += 1;
        sleep(5000)
    }
    exit();

}

//读取本地标志位
function readlastapp() {
    importClass('android.database.sqlite.SQLiteDatabase');
    //importClass("android.content.ContentValues");
    //importClass("android.content.Context");
    importClass("android.database.Cursor");
    //context.deleteDatabase("haiqu.db");  
    //打开或创建haiqu.db数据库        
    db = context.openOrCreateDatabase("haiqu.db", Context.MODE_PRIVATE, null);
    //创建t_tag表
    db.execSQL("create table if not exists " + "t_tag" + "(_id integer primary key,appnum,appname)");
    var c = db.query("t_tag", null, "", null, null, null, null, null);
    lastappname = "";
    while (c.moveToNext()) {
        var appname = c.getString(c.getColumnIndex("appname"));
        return appname;

    }
}



//检测本地手机app是否符合要求
//加载特征码
function checklocalapp() {

    var start = '[]'
    var tempstr = "";
    var appname = "";
    var voiceplaynum = 0;
    var thisjsonstr = "";
    var diffcount = 0;
    var alertstr = "";
    for (var i = 0; i < Gapps.length; i++) {

        appname = Gapps[i]["appname"];
        appnum = Gapps[i]["appnum"];
        //console.log(appnum);
        //if("true"==Gapps[i]['enable']){
        if (Gapps[i]['enable']) {
            //alert("1");
            //如果是云端特征码机制
            if (Gjsonloadstate == "remote") {
                if (voiceplaynum == 0) {
                    thiscommon.play("global", "加载");
                    //    play("global","云端");
                    thiscommon.play("global", "特征码");
                    voiceplaynum += 1;
                }

                // http.__okhttp__.setTimeout(10000);
                // var r=http.get(Gapplistpath_remote+"/"+appname+".json")
                var r = files.read(Gapplistpath + "/" + appname + ".json")

                //if(r.statusCode=="200"){ 
                //console.log(r); 
                var jsonstr = r;
                // console.log(jsonstr);

                try {
                    tempjson = eval('(' + jsonstr + ')');
                    var pname = tempjson['packagename'];
                    // alert(pname);
                    var appname = tempjson['appname'];
                    var appver = tempjson['appver'];
                    var result = app.getAppName(pname);
                    //alert(result);
                    if (result == null) {
                        diffcount += 1;
                        thisjsonstr += '{"appnum":"' + appnum + '","appname":"' + appname + '","state":"您未安装该APP，请安装"},';
                        alertstr += appname + "-未安装\n";
                    } else {

                        var localappver = thiscommon.getPackageVersion(pname);

                        if (localappver != appver) {
                            diffcount += 1;
                            thisjsonstr += '{"appnum":"' + appnum + '","appname":"' + appname + '","state":"您的版本' + localappver + ' 与云端版本' + appver + '不匹配"},';
                            alertstr += appname + "-版本不匹配\n";
                        }



                    }

                } catch (e) {
                    alert(appname + " 远程数据结构错误");
                }

                // }else{
                //     alert("没有找到远程-2"+appname+".json");
                // }


                //如果是本地特征码机制
            }




        } else {
            //alert("1");
        }

    }

    if ("" != thisjsonstr) {
        //     thisjsonstr='['+thisjsonstr+']';
        //    // log(thisjsonstr);
        //    if(diffcount>10){
        //     urlStr = 'http://download.dqu360.com:81/haiqu/api.aspx?&action=showapplist';

        //    }else{
        //     urlStr = 'http://download.dqu360.com:81/haiqu/api.aspx?&action=showdiffapplist&jsonstr='+thisjsonstr;
        //    }

        //      var result=shell("am start -a android.intent.action.VIEW -d '" + urlStr+"'", true);
        alert(alertstr + "\n请允许打开浏览器，根据本提示下载对应app");
        //urlStr = 'http://115.29.141.214:8888/repo/haiqu_helper/html/index.html';
        urlStr = 'http://manager.dianqu666.online:8888/repo/haiqu_helper/html/index.html';
        var result = shell("am start -a android.intent.action.VIEW -d '" + urlStr + "'", true);

    } else {
        alert("您手机上的APP与云端一致，请定期检测");
    }

}
function installapp(path) {
    var result = shell(" pm install -r -d " + path, true);
    return result;

}
//穿入文件名 和本地要保存的路径
function getScriptFromServer() { //从服务器获取脚本
    // var i, download_res, script_file_url = "https://script.iqqclub.com/Script/" + FILE;
    var i, download_res
    //  console.show();
    for (i = 0; 10 > i; i++) try {
        if (download_res = http.get(Gdownloadpath), 200 == download_res.statusCode) break;
        log("res:" + download_res.statusCode);
        if (i > 8) return !1;
    } catch (e) {
        //log("error res:"+download_res);
        if (sleep(500), 9 == i) return !1;
    }
    //alert("1")
    return files.writeBytes("/sdcard/脚本/haiqu.apk", download_res.body.bytes()), !0;
}
function once_check(checktype, f1, f2, f3) {
    thiscommon.mytoast("once_check checktype is" + checktype + " f1 is" + f1);
    if ("classname_text" == checktype) {
        var ele = className(f1).text(f2).exists();
        if (ele) {
            return true;
        }

    } else if ("classname_desc" == checktype) {
        var ele = className(f1).desc(f2).exists();
        if (ele) {
            return true;
        }
    } else if ("id" == checktype) {
        thiscommon.mytoast("once_check checktype is id执行");
        var ele = id(f1).exists();
        thiscommon.mytoast("once_check ele is:" + ele);
        if (ele) {
            return true;
        }
    } else {
        return false;
    }
}
//初始化licence 当传入空值时执行本地查询并返回本地fsn，传入fsn激活码时，只写入本地
function initlicence(fsn) {
   // alert("initlicence fsn is:"+fsn)
    importClass('android.database.sqlite.SQLiteDatabase');
    importClass("android.content.ContentValues");
    //importClass("android.content.Context");
    importClass("android.database.Cursor");

    //context.deleteDatabase("haiqu.db");  
    //打开或创建haiqu.db数据库        
    db = context.openOrCreateDatabase("haiqu.db", Context.MODE_PRIVATE, null);
    //创建t_tag表
    db.execSQL("create table if not exists " + "t_licence" + "(fsn,fsession,fvar1,fvar2,fvar3)");
    //      db.execSQL("DELETE FROM  t_licence");
    if (fsn != "") {
        var t_tag = new Object;
        t_tag.fsn = fsn;
        //ContentValues以键值对的形式存放数据       
        var cv = new ContentValues();
        cv.put("fsn", t_tag.fsn);
        //插入ContentValues中的数据        
        db.insert("t_licence", null, cv);
    }


    var c = db.query("t_licence", null, "", null, null, null, null, null);
    while (c.moveToNext()) {
        var fsn = c.getString(c.getColumnIndex("fsn"));
       
        return fsn;

    }
    db.close();
}




function page_check() {
    // toast("this is pagecheck")
    try {
        var thisispageone = false;
        var thisispagetwo = false;

        //一级页面验证方式取值
        var pageone_featuremode = open_obj["featuremode"];
        //   alert("1")
        if ("classname_text" == pageone_featuremode) {
            //   alert("2")
            var thisclassname = open_obj["classname"];
            var thistext = open_obj["text"];
            // alert("3")
            try {
                var thisdepth = open_obj["depth"];
                var thisindexinparent = open_obj["indexinparent"];
                var result = className(thisclassname).text(thistext).depth(thisdepth).indexInParent(thisindexinparent).exists();
                // alert("4")
            } catch (e) {
                toast("open_obj classname_text depth indexinparent error");
                var result = false;
            }

            if (result) { thisispageone = true }
        } else if ("classname" == pageone_featuremode) {
            var thisclassname = open_obj["classname"];
            try {
                var thisdepth = open_obj["depth"];
                var thisindexinparent = open_obj["indexinparent"];
                var result = className(thisclassname).depth(thisdepth).indexInParent(thisindexinparent).exists();
            } catch (e) {
                toast("open_obj classname depth indexinparent error");
                var result = false;
            }

            if (result) { thisispageone = true; toast('当前识别为1级页面') }
        }
        //二级页面验证方式取值
        var pagetwo_featuremode = autoread_obj["ar1"]["featuremode"];
        //  alert()
        obja = "ar1";
        if ("classname_desc" == pagetwo_featuremode) {
            var thisclassname = autoread_obj[obja]["classname"];
            var thisdesc = autoread_obj[obja]["desc"];
            var result = className(thisclassname).desc(thisdesc).exists();
            if (result) { thisispagetwo = true }
        } else if ("classname_text" == pagetwo_featuremode) {
            var thisclassname = autoread_obj[obja]["classname"];
            var thistext = autoread_obj[obja]["text"];
            var result = className(thisclassname).text(thistext).exists();
            if (result) { thisispagetwo = true }
        } else if ("classname" == pagetwo_featuremode) {
            var thisclassname = autoread_obj[obja]["classname"];
            var result = className(thisclassname).exists();
            if (result) { thisispagetwo = true }
        } else if ("id" == pagetwo_featuremode) {
            //    alert("5 id")
            var thisid = autoread_obj[obja]["id"];
            //  alert("thisis is:"+thisid)
            var result = id(thisid).exists();
            //  alert("thisid:"+thisid)
            if (result) { thisispagetwo = true }
        } else if ("ids" == pagetwo_featuremode) {

            var thisid = autoread_obj[obja]["ids"];
            ids_arr = thisid.split("||");
            var num = 0;
            try {
                for (var i = 0; i < ids_arr.length; i++) {
                    if (id(ids_arr[i]).exists()) {
                        thisispagetwo = true
                        //  toast('当前识别为2级页面')
                        break;
                    }
                }
            } catch (e) {
                //  break;
            }
        }//else if end

        //开始判断
        //     如果当前是一级线程在工作，又是一级页面 pass
        // 如果当前是一级线程在工作，却是二级页面，则切换成readnews 工作
        // 如果当前是一级线程在工作，既是一级页面又是二级页面则弹窗

        // 如果当前是二级线程在工作 又是二级页面 pass
        // 如果当前是二级线程在工作，却又是一级页面，则切换成findnews工作
        // 如果当前是二级线程在工作，既是一级又是二级页面则弹窗

        if ("findnews_start" == Gworkthread) {
            //  alert("panduan 1")
            if (thisispageone == true && thisispagetwo == true) {
                //     alert("panduan 1-1")
                toast("当前页面识别：既是1级又是2级");
            } else if (thisispagetwo == true) {
                // alert("panduan 1-2")
                toast("发现一级切换到了二级")
                while_readnews(autoread_obj);
                sleep(1000)
                try { thread_findnews.interrupt() } catch (e) { }

                //   toast();
            } else if (thisispageone == true) {
                //   toast("1级线程与1级页面匹配")
            }
        }
        else if ("readnews_start" == Gworkthread) {
            //  alert("Gworkthread is"+Gworkthread);
            if (thisispageone == true && thisispagetwo == true) {
                //alert("panduan 2-1")
                toast("当前页面识别：既是1级又是2级");
            } else if (thisispageone == true) {
                toast("发现2级切换到了1级")
                //   alert("panduan 2-2")
                while_findnews(autoread_obj);
                sleep(1000)
                try { thread_readnews.interrupt() } catch (e) { }

            } else if (thisispagetwo == true) {
                //  toast("2级线程与2级页面匹配")

            }
        }
        if (thisispageone == false && thisispagetwo == false) {
            toast("没有识别当前页面1or2级");
        }
    } catch (e) { toast("page_check 异常") }
    //初始化页面状态

}



//目标页面检测
function while_pagecheck_bak() {

    //  return true;
    try { thread_pachagecheck.interrupt(); } catch (e) { }
    var nowpage = "";
    var while_count = 0;
    //while(true){
    //alert("目标页面识别准备启动")
    thread_pachagecheck = threads.start(
        function () {
            try { } catch (e) { };

            var thisfeaturemode = open_obj["featuremode"];
            if ("classname_text" == thisfeaturemode) {

                var thisclassname = open_obj["classname"];
                var thistext = open_obj["text"];
                var thisdepth = open_obj["depth"];
                var thisindexinparent = open_obj["indexinparent"];
                var result = className(thisclassname).text(thistext).depth(thisdepth).indexInParent(thisindexinparent).exists();
                //  var result=className(thisclassname).text(thistext).exists();
                //     alert("result is:"+result)
                if (result) {  //说明当前是在一级页     
                    nowpage = "1";
                }
            }
            //目标页面判断 结束

            //执行目标识别后的操作

            if ("findnews_start" == Gworkthread) {
                //如果是 findnews_start则验证是不是一级页面
                if ("1" == nowpage) {
                    while_count = 0;
                } else {
                    while_count += 1;
                }

                if (while_count > 10) {
                    toast("findnews_start检测：未识别页面特征码")
                    workthread_errorcount = 999;
                    while_count = 0;

                    // break;
                }




            }//function end;


            //目标页面判断





            //执行目标识别后的操作 结束


        })
}
//统计收益函数
function callback_updatecoinincome(coin, income) {
    importClass('android.database.sqlite.SQLiteDatabase');
    //importClass("android.content.ContentValues");
    //    importClass("android.content.Context");
    importClass("android.database.Cursor");
    var analystate = 'unknow';
    alert("Ganalyflag is:" + Ganalyflag);
    if ("first" == Ganalyflag) {
        analystate = '1';

    } else if ("finish" == Ganalyflag) {
        analystate = '2';

    }

    toast("回调函数接收到了金币" + coin + " 收益" + income);
    try {
        var db = context.openOrCreateDatabase("haiqu.db", Context.MODE_PRIVATE, null);
        db.execSQL("create table if not exists " + "app_income_mass" + "(deviceid,appnum,appname,coin,income,createtime,analystate)");
        var cv = new ContentValues();
        //cv.put("deviceid",GdeviceMac);
        cv.put("deviceid", GdeviceImei);
        cv.put("appnum", '');
        cv.put("appname", appname);
        cv.put("coin", coin);
        cv.put("income", income);
        cv.put("createtime", thiscommon.load_time());
        cv.put("analystate", analystate);
        db.insert("app_income_mass", null, cv);
        db.close();
    } catch (e) {
        toast("upcoinincome:" + e);
    }

}

// 数据库：haiqu 表：t_log表结构
// 手机mac app名称 动作 动作所在线程 执行时间  执行结果
// fsession,fappname,faction,fthread,factime,fresult


// 获取手机系统时间函数
// 动作faction 编号解释
// 001 返回一级 二级页面滑栋超过50次
// 002 返回一级 无收益圈 -
// 003 返回一级 获得获益 -
// 004 返回一级 打开失败 -
// 005 返回一级 超过线程计数器90次 -
// 006 拉回站内-
// 007 拉回主线-
// 008 找新闻 -
// 009 读新闻 -
// 010 签到
// 011 优化进程
// 012 打开APP -
// 013 搬砖计数器超过次数重启 -
// 014 找到新闻并打开 -
// 015 一直没有找到新闻返回 -
// 016 超过相同页面停留计数器50次，重启APP
// 017 返回一级 滑动数量到达随机最大数
// 018 刮刮卡页面识别
// 019 检查

//获取系统时间

function update_log() {

}
// function getdevicemac(){
//     setTimeout(function(){
// //如果mac地址为空
//    var mac=device.getMacAddress();
//    if(mac==null){
//     GdeviceMac="";
//     //alert("mac is kong");
//     toast("助手需要无线网络，请确认wifi开关处于开启状态");
//    }else{
//     GdeviceMac=mac;
//    // alert("this is fun "+device.getMacAddress());
//    }
//    var midhead="dqprop01h2";
//    webView = ui.findById("webview");

//    //var aa=device.getMacAddress();;
//    var mid=GdeviceMac.replace(/:/g,"");
//    mid=mid.toLocaleLowerCase()
//   // alert(GdeviceMac);
//    tmpstr="";
//    for(var i in mid){
//        tmpstr+=mid[i]+mid[i].charCodeAt(0);
//     //    if(tmpstr.length==18){
//     //        break;
//     //    }
//    }
//    tmpstr=tmpstr.substring(0,18);

//    //生成机器码
//   // Gdevicecode=midhead+mid+tmpstr;
//    //return Gdevicecode;

//    html = files.path("./qrcode.html");
//    webView.loadUrl("file://" + html);
//    setTimeout(() => {
//        webView.post(new Runnable({
//            run: function() {
//                // 调用javascript的callJS()方法
//                webView.loadUrl("javascript:callJS('"+midhead+mid+tmpstr+"')");//传入的值为123
//            }
//        }));
//    }, 2000);

// },2000)
// }


function showanalylog() {
    var xmlstr = "";
    xmlstr += ' <TableLayout '
    xmlstr += '        layout_width="match_parent"'
    xmlstr += '        layout_height="match_parent"'
    xmlstr += '        background="#ffffff"'
    xmlstr += '        stretchColumns="1"'
    xmlstr += '        >'
    xmlstr += ''
    xmlstr += ''
    xmlstr += '        <TableRow>'
    xmlstr += '        <TextView'
    xmlstr += '            layout_width="wrap_content"'
    xmlstr += '            layout_height="wrap_content"'
    xmlstr += '            background="#7E787F"   '
    xmlstr += '            layout_margin="1dip" '
    xmlstr += '            style="Widget.AppCompat.Button.Colored"'
    xmlstr += '            text="app名称"/>'
    xmlstr += '        <TextView'
    xmlstr += '            layout_width="wrap_content"'
    xmlstr += '            layout_height="wrap_content"'
    xmlstr += '            background="#7E787F"    '
    xmlstr += '            layout_margin="1dip" '
    xmlstr += '            style="Widget.AppCompat.Button.Colored"'
    xmlstr += '            text="金币数量"/>'
    xmlstr += '        <TextView'
    xmlstr += '            layout_width="wrap_content"'
    xmlstr += '            layout_height="wrap_content"'
    xmlstr += '            background="#7E787F"   '
    xmlstr += '            layout_margin="1dip" '
    xmlstr += '            style="Widget.AppCompat.Button.Colored"'
    xmlstr += '            text="收益"/>'
    xmlstr += '        <TextView'
    xmlstr += '            w="auto"'
    xmlstr += '            layout_height="wrap_content"'
    xmlstr += '            background="#7E787F"   '
    xmlstr += '            layout_margin="1dip" '
    xmlstr += '            style="Widget.AppCompat.Button.Colored"'
    xmlstr += '            text="统计时间"/>'
    xmlstr += '        </TableRow>'





    // xmlstr="";


    for (var i = 0; i < 10; i++) {
        xmlstr += ' <TableRow>';
        xmlstr += '            <TextView'
        xmlstr += '                layout_width="wrap_content"'
        xmlstr += '                layout_height="wrap_content"'
        xmlstr += '                background="#7E787F"   '
        xmlstr += '                layout_margin="0dip" '
        xmlstr += '                style="Widget.AppCompat.Button.Colored"'
        xmlstr += '                text="北京知天下"/>'
        xmlstr += '            <TextView'
        xmlstr += '                layout_width="wrap_content"'
        xmlstr += '                layout_height="wrap_content"'
        xmlstr += '                background="#7E787F"    '
        xmlstr += '                layout_margin="0dip" '
        xmlstr += '                style="Widget.AppCompat.Button.Colored"'
        xmlstr += '                text="2000"/>'
        xmlstr += '            <TextView'
        xmlstr += '                layout_width="wrap_content"'
        xmlstr += '                layout_height="wrap_content"'
        xmlstr += '                background="#7E787F"   '
        xmlstr += '                layout_margin="0dip" '
        xmlstr += '                style="Widget.AppCompat.Button.Colored"'
        xmlstr += '                text="1.1"/>'
        xmlstr += '            <TextView'
        xmlstr += '                w="auto"'
        xmlstr += '                layout_height="wrap_content"'
        xmlstr += '                background="#7E787F"   '
        xmlstr += '                layout_margin="0dip" '
        xmlstr += '                style="Widget.AppCompat.Button.Colored"'
        xmlstr += '                text="2019-08-09 11:22:33"/>'
        xmlstr += '            </TableRow>'
    }

    xmlstr += '    '
    xmlstr += '       '
    xmlstr += '        </TableLayout>'

    ui.inflate(xmlstr, ui.logframe, true);

}

//写日志函数
function insert_log(psessionid, pthread, pappname, paction, presult) {
    importClass('android.database.sqlite.SQLiteDatabase');
    //importClass("android.content.ContentValues");
    //    importClass("android.content.Context");
    importClass("android.database.Cursor");
    if (Ginsert_log) {
        try {
            var db = context.openOrCreateDatabase("haiqu.db", Context.MODE_PRIVATE, null);
            db.execSQL("create table if not exists " + "t_log" + "(fsession,fthread,fappname,faction,factime,fresult)");
            //var c = db.query("t_log", null, "", null, null, null, null, null);
            var t_tag = new Object;
            t_tag.sessionid = psessionid;
            t_tag.thread = pthread;
            t_tag.appname = pappname;
            t_tag.action = paction;
            t_tag.actime = thiscommon.load_time();
            t_tag.result = presult;
            //ContentValues以键值对的形式存放数据???????
            var cv = new ContentValues();
            cv.put("fsession", t_tag.sessionid);
            cv.put("fthread", t_tag.thread);
            cv.put("fappname", t_tag.appname);
            cv.put("faction", t_tag.action);
            cv.put("factime", t_tag.actime);
            cv.put("fresult", t_tag.result);

            //插入ContentValues中的数据????????
            db.insert("t_log", null, cv);
            db.close();
            // alert("this is insert log")

        } catch (e) {

        }
        try {


            var timestamp = new Date().getTime();
            //var url = Guploadlog_url;
            var factime = timestamp;
            var faction = paction;
            var fappname = pappname;
            var fresult = presult;
            //var fsession=GdeviceMac; //这里使用全局变量
            var fsession = GdeviceImei;
            var fthread = pthread;
            // var factime = timestamp;
            //var faction = "017";
            //var fappname="北京知天下1";
            //var fresult= "";
            //var fsession="005056c0000f";
            //var fthread="control";

            //alert("this is uploadlog1"+Guploadlog_url)
            try { thread_uploadlog.interrupt(); } catch (e) { }
            thread_uploadlog = threads.start(function () {
                var res = http.postJson(Guploadlog_url, {
                    "factime": factime,
                    "faction": faction,
                    "fappname": fappname,
                    "fresult": fresult,
                    "fsession": fsession,
                    "fthread": fthread
                });
                //alert("this is uploadlog2")

                //  var html = res.body.string();
                //  alert(html);
            });



        } catch (e) {
            //  alert(e);
        }
    }


}
//写入标志位函数
function setlastapp(appnum, appname) {

    //context.deleteDatabase("haiqu.db");  
    //打开或创建haiqu.db数据库        
    db = context.openOrCreateDatabase("haiqu.db", Context.MODE_PRIVATE, null);
    //创建t_tag表
    db.execSQL("create table if not exists " + "t_tag" + "(_id integer primary key,appnum,appname)");
    //取出数据库内容
    //  查询  c 是 Cursor类
    //alert("abc");
    var c = db.query("t_tag", null, "", null, null, null, null, null);
    // lastappname="";

    // if(appname==null){
    //    alert("没有记录上次阅读的app");
    // }else{
    //     alert("上次阅读到了："+lastappname);
    // }
    //ok. 删除表内容
    db.execSQL("DELETE FROM  t_tag");
    //alert("set 数据库 appnum="  +  appnum  +  " appname="  +  appname );
    var t_tag = new Object;
    t_tag.appnum = appnum;
    t_tag.appname = appname;
    //ContentValues以键值对的形式存放数据       
    var cv = new ContentValues();
    cv.put("appnum", t_tag.appnum);
    //cv.put("appname",  java.lang.Integer(35));
    cv.put("appname", t_tag.appname);

    //插入ContentValues中的数据        
    db.insert("t_tag", null, cv);
    //db.insert("t_tag",  null,  cv);  
    //删除表数据  ok
    //db.delete("person", null,null);  
    //ok. 删除表内容
    // db.execSQL("DELETE FROM  person  WHERE age>32");
    //关闭当前数据库      
    db.close();
}
//签到
function while_signin(signin_obj) {
    //  alert("signin_obj is:"+signin_obj)
    Gworkthread = "signin_start";
    insert_log('', 'signin', appname, '010', '')
    thiscommon.play("global", "执行");
    thiscommon.play("global", "每日签到");
    sleep(1000);
    //针对数据结构错误的处理
    if ("undefined" == typeof (signin_obj)) {
        thiscommon.play("global", "执行完成");
        // play("global","9")
        Gworkthread = "signin_stop";
        try { thread_signin.interrupt(); } catch (e) { }

        toast(appname + ".json signin数据项缺失");
    } else {
        thread_signin = threads.start(
            function () {
                for (var i = 1; i <= thiscommon.JSONLength(signin_obj); i++) {

                    try {
                        var action = signin_obj["sg" + i]["action"];
                        if ("undefined" == typeof (action)) { toast(appname + "signin_obj[\"sg\"" + i + "][\"action\"]数据结构错误"); }

                        var featuremode = signin_obj["sg" + i]["featuremode"];
                        if ("undefined" == typeof (featuremode)) { toast(appname + "signin_obj[\"sg\"" + i + "][\"featuremode\"]数据结构错误"); }

                        thiscommon.play("global", "执行步骤");
                        thiscommon.play("global", i);
                        if ("click_text" == action) {
                            thiscommon.click_text(signin_obj["sg" + i]["click_text"]);
                        } else if ("click_id" == action) {
                            try {
                                var thisid = signin_obj["sg" + i]["click_id"];
                                thiscommon.clickxy_for_ele(id(thisid).findOnce());
                            } catch (e) {

                            }

                        } else if ("check_signin" == action) {
                            //判断是否签过到
                            result = thiscommon.block_mode("while_signin", featuremode, signin_obj, i)
                            if (result) {
                                thiscommon.play("global", "已签到过");
                                Gworkthread = "signin_stop";
                                break;
                            }

                        } else if ("click_boundary_path" == action) {
                            try {
                                var boundary = signin_obj["sg" + i]["boundary"];;
                                var path = signin_obj["sg" + i]["path"];;;
                                //   alert("boundary is:"+boundary+"  path is:"+path);
                                thiscommon.click_boundary_path(boundary, path);
                            } catch (e) {

                            }

                        } else if ("click_xypercent" == action) {
                            try {

                                var xypercent = signin_obj["sg" + i]["click_xypercent"];
                                var tmparr = xypercent.split("||");
                                var xpercent = tmparr[0];
                                var ypercent = tmparr[1];
                                thiscommon.touchreal(device.width * xpercent, device.height * ypercent);
                            } catch (e) {

                            }

                        }

                        var result = false;

                        result = thiscommon.block_mode("while_signin", featuremode, signin_obj, i)
                        //最后判断result
                        if (result) {
                            if (i == thiscommon.JSONLength(signin_obj)) {
                                //最后一步的执行成功
                                thiscommon.play("global", "签到成功");
                                insert_log('', 'signin', appname, '010', '1')
                            } else {
                                thiscommon.play("global", "执行完成");
                            }

                        } else {
                            insert_log('', 'signin', appname, '019', '')
                            thiscommon.play("global", "检查");
                        }


                    } catch (e) {
                        toast("signin error:" + e);
                    }

                }//for end;
                //  play("global","执行完成");
                Gworkthread = "signin_stop";
                thread_signin.interrupt();
            });
    }




}

//一级页面循环上滑找新闻线程
function while_findnews(autoread_obj) {
    
    Gworkthread = "findnews_start";
    //有多少次新闻ele是top值相同的
    var same_ele_count = 0;

    //线程执行前初始化一下没有找到新闻的次数为0；
    //线程计数器
    var nofindnews_count = 0;

    //正在找新闻状态
    findnews_state = false;
    insert_log('', 'findnews', appname, '008', '')
    toast("找新闻线程启动..."); thiscommon.play("global", "正在检索");

    //取出action的值
    try {
        var action = autoread_obj["ar1"]["action"];
        //根据action的值进行操作
        if ("undefined" == typeof (action)) {
            toast(appname + ":" + "autoread_obj[\"ar1\"][\"action\"]数据结构错误");
        } else {
            if (Gisaction == false) {
                //如果没有定位过首页模块，则开始定位，并且把标志位改为true，这样以后二级页面读完后返回一级页面时无需再次出发，避免首页刷新到top10，导致一直读重复新闻
                Gisaction = true;
                //定位首页模块
                if ("click_text" == action) {
                    var text = autoread_obj["ar1"]["click_text"];
                    if ("undefined" == typeof (text)) { toast(appname + ":" + "autoread_obj[\"ar1\"][\"click_text\"]数据结构错误"); }
                    //alert("click_text is:"+text);
                    try {
                        click(text);
                    } catch (e) { }

                    sleep(1000);

                } else if ("click_id" == action) {

                    try {
                        var click_id = autoread_obj["ar1"]["click_id"];
                        thiscommon.clickxy_for_ele(id(click_id).findOnce());
                    } catch (e) { }
                } else if ("click_boundary_path" == action) {
                    try {
                        var boundary = autoread_obj["ar1"]["boundary"];
                        var path = autoread_obj["ar1"]["path"];
                        thiscommon.click_boundary_path(boundary, path);
                    } catch (e) {

                    }

                }
                //定位首页模块结束
            }
        }
    } catch (e) { }
    //根据action的值进行操作 结束

    //取出打开二级页面后的判断成功特征码
    try {
        var thisfeaturemode = autoread_obj["ar1"]["featuremode"];
        if ("undefined" == typeof (thisfeaturemode)) { toast(appname + "autoread_obj[\"ar1\"][\"featuremode\"]数据结构错误"); }
    } catch (e) { }

    //滑动多少次后开始找新闻的计数器
    var upcount = 0;
    //  try{console.hide()}catch(e){}
    thread_findnews = threads.start(function () {
        //把finditem字符串变成函数
      
        try { eval(Gfinditemstr) } catch (e) { toast("finditem eval error") };
        page_check();
        //两次上滑之间的间隔
        var x = Math.round(Math.random() * (Gmax - Gmin)) + Gmin;
        toast("findnews 滑动间隔" + x + "毫秒");
        setInterval(function () {
            //   pagecheck();

            try {
                //滑动
                main_swipe();

                sleep(1500);
                upcount += 1;
                var maxswipecount = 2;
                var minswipecount = 1;
                //swipecount 为向上滑动多少次后打开新闻
                var swipecount = Math.round(Math.random() * (maxswipecount - minswipecount)) + minswipecount;
                //当upcount大于了x次数后，开始打开当前发现的新闻条目
                if (upcount >= swipecount && findnews_state == false) {
                    try {
                        //调用finditem方式获取element进行点击
                        var ele = finditem();
                        toast("finditem ele is:"+ele);
                    } catch (e) {
                        ele = false;
                        thiscommon.toastAt("finditem e \n:" + e + "findnews_state:" + findnews_state);
                    }

                    if (ele) {
                        //取出取出ele的top值 与 Gfindnews_last_ele_top进行比较
                        try {
                            var thiseletop = ele.bounds().top;

                            //如果两个值一致 计数器same_ele_count+1
                            if (thiseletop == Gfindnews_last_ele_top) {
                                same_ele_count += 1;
                            }
                            //取出ele的top值放入全局变量   Gfindnews_last_ele_top
                            Gfindnews_last_ele_top = same_ele_count;
                            //如果same_ele_count>5 1触发action机制，并且初始化same_ele_count计数器
                            if (same_ele_count > 5) {
                                //action
                                toast("新闻到底了，刷新一次");
                                //定位首页模块
                                if ("click_text" == action) {
                                    var text = autoread_obj["ar1"]["click_text"];
                                    if ("undefined" == typeof (text)) { toast(appname + ":" + "autoread_obj[\"ar1\"][\"click_text\"]数据结构错误"); }
                                    //alert("click_text is:"+text);
                                    try {
                                        click(text);
                                    } catch (e) { }

                                    sleep(1000);

                                } else if ("click_id" == action) {

                                    try {
                                        var click_id = autoread_obj["ar1"]["click_id"];
                                        thiscommon.clickxy_for_ele(id(click_id).findOnce());
                                    } catch (e) { }
                                } else if ("click_boundary_path" == action) {
                                    try {
                                        var boundary = autoread_obj["ar1"]["boundary"];
                                        var path = autoread_obj["ar1"]["path"];
                                        thiscommon.click_boundary_path(boundary, path);
                                    } catch (e) {

                                    }

                                }
                                //定位首页模块结束
                                same_ele_count = 0;
                            }
                        } catch (e) { }






                        //如果存在，点击新闻
                        thiscommon.play("global", "打开新闻");
                        insert_log('', 'findnews', appname, '014', '')
                        try {
                            thiscommon.clickxy_for_ele(ele);
                            findnews_state = true//标识现在正在打开一个新闻，成功与否尚未确定，所该告诉finditem 不要着急滑动
                        } catch (e) { toast("findnews e4 " + e) }
                        sleep(2000);
                        var result = false;
                        //最后判断二级页面特定控件是否存在，来确定是否打开成功
                        try { result = thiscommon.block_mode("while_findnews", thisfeaturemode, autoread_obj, ''); } catch (e) { result = false; toast("findnews e5:" + e) };
                        thiscommon.mytoast("判断二级页面打开结果为:" + result);
                        if (result) {
                            thiscommon.play("global", "打开成功");
                            insert_log('', 'findnews', appname, '014', '1')
                            Gworkthread = "findnews_stop";
                            findnews_state = true;
                            // sleep(1000);
                            try { thread_findnews.interrupt(); } catch (e) { }
                        } else {
                            thiscommon.play("global", "打开失败");
                            insert_log('', 'findnews', appname, '004', '')
                            thiscommon.funmulityback();
                            findnews_state = false;//告诉findimte 可以动了
                        }

                    } else {
                        //没有找到新闻
                        //视频类的不需要线程计数器
                        if ("快狗视频" == appname || "红包视频" == appname || "快手极速版" == appname) {
                            Gbrick_count += 1;//砖头+1
                        } else {
                            //线程计数器加1
                            nofindnews_count += 1;
                            Gbrick_count += 1;//砖头+1
                        }
                        //如果线程计数器到达设定值，通知while_control
                        if (nofindnews_count > Gnofindnews_countback) {
                            nofindnews_count = 0;
                            toast("初始化线程计数器findnews");
                            insert_log('', 'control', appname, '015', '')
                            workthread_errorcount = 999;

                        }
                    }
                }
            } catch (e) {
                toast("findnews error " + e)
                findnews_state = false;
            }


        }, x);
    }
    );//thread_findnews end
}

//二级页面阅读线程??可以优化

function while_readnews(autoread_obj) {
    //toast("readnews启动。。。。");
    Gworkthread = "readnews_start";
    //线程执行前初始化一下没有找到新闻的次数为0； 
    thiscommon.play("global", "开始阅读");
    insert_log('', 'readnews', appname, '009', '')

    var upcount = 0;
    //初始化第一次截屏为是
    var firstcapture = true;
    //线程计数器
    var thisthread_count = 0;
    //目标页面检测
    //pagecheck();
    // var readnews_count=0;
    var backtrigger_maincount = 0;
    var backtrigger_subcount = 0;
    //是否发现了展开更多
    var deployfind = false;
    //是否错过了展开更多
    var deploypass = false;
    //初始化本页面随机上滑次数，如果配置文件中有有upcount则按其初始化，否则随机初始化5到10次
    try {
        var thisupcount = autoread_obj["ar2"]["upcount"];
        //如果没有指定upcount的情况
        if (typeof (thisupcount) == "undefined") {
            var o = 10;//最大上滑次数
            var p = 5;//最小上滑次数
            var maxupcount = Math.round(Math.random() * (o - p)) + p;
        } else {
            //如果指定了upcount的情况，当然如果指定了色差方法会按照色差法返回
            var maxupcount = thisupcount;
        }
        //从配置文件中取出展开更多的特征码
        var thisdeploymode = autoread_obj["ar2"]["deploymode"];
        if ("undefined" == typeof (thisdeploymode)) { alert(appname + "autoread_obj[\"ar2\"][\"deploymode\"]数据结构错误"); }

    } catch (e) {
        var o = 10;//最大上滑次数
        var p = 5;//最小上滑次数
        var maxupcount = Math.round(Math.random() * (o - p)) + p;
    }


    thread_readnews = threads.start(
        function () {
            //两次上滑之间的间隔
            var x = Math.round(Math.random() * (Gmax - Gmin)) + Gmin;
            try { thiscommon.toastAt("readnews 滑动间隔" + x + "毫秒 两点间隔" + Gppinterval + "毫秒"); } catch (e) { }
            //判断返回机制
            var thisbacktrigger = "normal"
            try {
                var thisbacktrigger = autoread_obj["ar2"]["backtrigger"];
                if (typeof (thisbacktrigger) == "undefined") {
                    thisbacktrigger = "normal"
                } else {
                    // 如果有特殊返回机制的情况的各种情况处理
                    if ("xy_color_bool" == thisbacktrigger) {
                        //取出私有字段
                        var thisxy = autoread_obj["ar2"]["xy"];
                        var thisxyarr = thisxy.split("||");
                        var thisx = thisxyarr[0];
                        var thisy = thisxyarr[1];
                    } else if ("id_xyoffset_color_bool" == thisbacktrigger) {
                        //alert("else if");
                        //取出私有字段                                  
                        var thisid = autoread_obj["ar2"]["id"];
                        var thisxyoffset = autoread_obj["ar2"]["xyoffset"];
                        var thisxyoffsetarr = thisxyoffset.split("||");

                        try {
                            var elex = id(thisid).findOnce().bounds().left;
                            var eley = id(thisid).findOnce().bounds().top;
                        } catch (e) {

                            thiscommon.funmulityback();

                            Gworkthread = "readnews_stop";
                            sleep(1000);
                            thread_readnews.interrupt();
                        }
                        var thisx = Number(elex) + Number(thisxyoffsetarr[0]);
                        var thisy = Number(eley) + Number(thisxyoffsetarr[1]);
                        //  alert("else if end");
                    }
                    //取出共有字段
                    var thiscolor = autoread_obj["ar2"]["color"];
                    var thisbool = autoread_obj["ar2"]["bool"];
                    var thisreswipe = autoread_obj["ar2"]["reswipe"];
                }//else end
            } catch (e) {
                thisbacktrigger = "normal";
            }
            ///判断返回机制结束

            setInterval(function () {
                page_check();
                thisthread_count += 1; //线程计数器增加一
                Gbrick_count += 1;//砖头加一

                //           pagecheck();
                //线程计数器机制开始

                if (thisthread_count > 90) {
                    try {
                        insert_log('', 'readnews', appname, '005', '')
                        workthread_errorcount = 999;//修改变量，通知while_control重启app
                        toast("初始化线程计数器readnews");
                        thisthread_count = 0;
                    } catch (e) { toast("初始化线程计数器readnews 1001") }
                }
                //线程计数器机制 结束

                try {
                    //展开更多处理方式
                    if ("classname_desc" == thisdeploymode) {
                        var thisdeployclassname = autoread_obj["ar2"]["deployclassname"];
                        if ("undefined" == typeof (thisdeployclassname)) { alert(appname + "autoread_obj[\"ar2\"][\"deployclassname\"]数据结构错误"); }
                        var thisdeploydesc = autoread_obj["ar2"]["deploydesc"];
                        if ("undefined" == typeof (thisdeploydesc)) { alert(appname + "autoread_obj[\"ar2\"][\"deploydesc\"]数据结构错误"); }
                        var ele = className(thisdeployclassname).desc(thisdeploydesc);


                        if (ele.exists() && ele.findOnce().bounds().top < device.height) {
                            // if( ele.findOnce().bounds().top <device.height){
                            var deploy_top = ele.findOnce().bounds().top;
                            //如果展开更多的top值小于0，那么就是滑动过了
                            if (deploy_top < 0) {
                                deployfind = true;
                                deploypass = true;
                                thiscommon.backswipe();
                                thiscommon.toastAt("错过了展开更多\n,反向滑动一次")
                            }
                            //如果在屏幕可视区
                            else if (Number(deploy_top) < Number(device.height) && Number(deploy_top) > 280) {
                                //  toastAt("gg deploy_top："+deploy_top);
                                //设置找到展开更多标记为true
                                deployfind = true;
                                thiscommon.toastAt("发现展开更多desc方式")
                                thiscommon.play("global", "展开更多");


                                try {
                                    //再次验证
                                    if (ele.findOnce().bounds().centerY() < 0) {
                                        deploypass = true;
                                        thiscommon.backswipe();
                                    } else {
                                        thiscommon.toastAt("点击展开更多x:" + ele.findOnce().bounds().centerX() + " y:" + ele.findOnce().bounds().centerY())
                                        thiscommon.clickxy_for_ele(ele.findOnce());
                                        deployfind = false;
                                        deploypass = false;
                                    }

                                } catch (e) {
                                    deployfind = false;
                                    deploypass = false;
                                }
                            }
                            //  }//if end



                        }
                    } else if ("classname_text" == thisdeploymode) {
                        var thisdeployclassname = autoread_obj["ar2"]["deployclassname"];
                        if ("undefined" == typeof (thisdeployclassname)) { alert(appname + "autoread_obj[\"ar2\"][\"deployclassname\"]数据结构错误"); }
                        var thistext = autoread_obj["ar2"]["deploytext"];
                        if ("undefined" == typeof (thistext)) { alert(appname + "autoread_obj[\"ar2\"][\"deploytext\"]数据结构错误"); }
                        var ele = className(thisdeployclassname).text(thistext);

                        if (ele.exists() && ele.findOnce().bounds().top < device.height) {

                            var deploy_top = ele.findOnce().bounds().top;
                            //如果展开更多的top值小于0，那么就是滑动过了
                            if (deploy_top < 0) {
                                deployfind = true;
                                deploypass = true;
                                thiscommon.backswipe();
                                thiscommon.toastAt("错过了展开更多\n,反向滑动一次")
                            }
                            //如果在屏幕可视区
                            else if (Number(deploy_top) < Number(device.height) && Number(deploy_top) > 280) {
                                //  toastAt("gg deploy_top："+deploy_top);
                                //设置找到展开更多标记为true
                                deployfind = true;
                                thiscommon.toastAt("发现展开更多text方式")
                                thiscommon.play("global", "展开更多");


                                try {
                                    //再次验证
                                    if (ele.findOnce().bounds().centerY() < 0) {
                                        deploypass = true;
                                        thiscommon.backswipe();
                                    } else {
                                        thiscommon.toastAt("点击展开更多x:" + ele.findOnce().bounds().centerX() + " y:" + ele.findOnce().bounds().centerY())
                                        thiscommon.clickxy_for_ele(ele.findOnce());
                                        deployfind = false;
                                        deploypass = false;
                                    }

                                } catch (e) {
                                    deployfind = false;
                                    deploypass = false;
                                }
                            }


                        }
                    } else if ("click_boundary_path" == thisdeploymode) {

                        try {
                            var deployboundary = autoread_obj["ar2"]["deployboundary"];
                            var deploypath = autoread_obj["ar2"]["deploypath"];
                            thiscommon.click_boundary_path(deployboundary, deploypath);
                        } catch (e) {

                        }
                    }
                    //展开更多处理方式结束

                    //滑动开始
                    if (deployfind == false && deploypass == false) {
                        //如果没有发现展开更多，才允许滑动，否则不滑动，等待展开更多发送过来的信号量false
                        main_swipe();
                    }
                    //滑动结束

                    //延迟一下         
                    sleep(x);

                    //执行返回机制验证
                    if ("normal" == thisbacktrigger) {
                        //采用计数器方式判断是否返回一级页面
                        upcount += 1;
                        //  toast("上滑："+upcount+"/"+maxupcount+"次");
                        if (upcount > maxupcount) {
                            toast("返回首页...");
                            //  insert_log('','readnews',appname,'017','')
                            thiscommon.funmulityback();
                            var openstate = thiscommon.openAPP(appname, packagename, activityname, open_obj);
                            if (openstate) {
                                insert_log('', 'readnews', appname, '017', '1')
                                //while_findnews(autoread_obj);  
                                Gworkthread = "readnews_stop";
                                sleep(1000);
                                thread_readnews.interrupt();
                            } else {
                                insert_log('', 'readnews', appname, '017', '0')
                                thiscommon.funmulityback();
                            }

                        }
                        //采用坐标取色法判断是否得到收益并赶回一级页面
                        // toast("间隔："+x+"毫秒");

                    } else {
                        if ("xy_color_bool" == thisbacktrigger || "id_xyoffset_color_bool" == thisbacktrigger) {
                            //截屏

                            try {

                                var img = captureScreen();
                                //取出坐标值所属颜色值
                                var color = images.pixel(img, thisx, thisy);
                                color = colors.toString(color);
                                //  alert("thisx is:"+thisx+" thisy is:"+thisy+" mcolor is:"+color+" jsoncolor is:"+thiscolor);
                            } catch (e) {
                                toast("截取图像失败...");
                            }


                            //判断是否是第一次取值
                            if (firstcapture == true && thisbool == false) {
                                // alert("3");
                                //如果是第一次取值并且bool为false，那么当前坐标的值必须等于thiscolor,同时更新取值次数为2

                                //如果是第一次取值并且bool为false,但是当前坐标值不等于thiscolor，不可能这么快就有收益，这是非收益页面
                                if (color != "#" + thiscolor) {
                                    firstcapture = false;
                                    //  toast("没有匹配到收益圈坐标:"+thisxy+" 的颜色值:"+thiscolor);
                                    toast("非收益页面，返回首页...");
                                    insert_log('', 'readnews', appname, '002', '')
                                    thiscommon.funmulityback();
                                    var openstate = thiscommon.openAPP(appname, packagename, activityname, open_obj);
                                    if (openstate) {
                                        insert_log('', 'readnews', appname, '002', '1')
                                        //while_findnews(autoread_obj);  
                                        Gworkthread = "readnews_stop";
                                        sleep(1000);
                                        thread_readnews.interrupt();
                                    } else {
                                        insert_log('', 'readnews', appname, '002', '0')
                                        thiscommon.funmulityback();
                                    }

                                    // alert("4");
                                }
                            } else {
                                //如果通过了上面判断，就判断当前坐标的值是不是不等于thiscolor了，如果不等于了，那么就是有收益了，返回一级页面
                                if (color != "#" + thiscolor) {
                                    //  toast("有收益了，坐标:"+thisxy+" 符合条件：颜色值不等于"+thiscolor);
                                    //  toast("返回首页...");
                                    insert_log('', 'readnews', appname, '003', '')
                                    thiscommon.backswipe();
                                    sleep(500);
                                    thiscommon.funmulityback();

                                    var openstate = thiscommon.openAPP(appname, packagename, activityname, open_obj);
                                    if (openstate) {
                                        insert_log('', 'readnews', appname, '003', '1')
                                        //while_findnews(autoread_obj);  
                                        Gworkthread = "readnews_stop";
                                        sleep(1000);
                                        thread_readnews.interrupt();
                                    } else {
                                        insert_log('', 'readnews', appname, '003', '0')
                                        thiscommon.funmulityback();
                                    }
                                }
                                //更新backtrigger子计数器+1，如果3次计数后，圆圈还没有闭合，有可能没有阅读完，也有可能是二级页面已经到底，需要触发一次下滑
                                backtrigger_subcount += 1;
                                if (backtrigger_subcount > 3) {
                                    if (thisreswipe == "true") {
                                        thiscommon.backswipe();
                                        //     toast("反向滑动一次")
                                    }
                                    backtrigger_subcount = 0;
                                }
                                //当然也要更新backtrigger总计数器，总集数器超过50次则返回一级页面
                                backtrigger_maincount += 1;
                                if (backtrigger_maincount > 50) {
                                    thiscommon.toastAt("滑动次数太多了，一直未获取到收益，返回一级页面")
                                    insert_log('', 'readnews', appname, '001', '')
                                    thiscommon.funmulityback();

                                    var openstate = thiscommon.openAPP(appname, packagename, activityname, open_obj);
                                    if (openstate) {
                                        insert_log('', 'readnews', appname, '001', '1')
                                        //while_findnews(autoread_obj);  
                                        Gworkthread = "readnews_stop";
                                        sleep(1000);
                                        thread_readnews.interrupt();
                                    } else {
                                        insert_log('', 'readnews', appname, '001', '0')
                                        thiscommon.funmulityback();
                                    }
                                }
                            }




                        }//xy_color_bool end

                    }
                    //执行返回机制验证结束

                } catch (e) {
                    thiscommon.toastAt("readnews 检测到 " + appname + " 出现异常\n 如果异常持续超过1分钟将重新启动APP")
                }



            }, x);
        }
    );
}
//绑定微信线程
function while_bindwechat(bindwechat_obj) {
    Gworkthread = "bindwechat_start";
    toast("开始绑定微信");
    for (var i = 1; i <= thiscommon.JSONLength(bindwechat_obj); i++) {
        //取动作
        var action = bindwechat_obj["bw" + i]["action"];
        if ("undefined" == typeof (action)) { alert(appname + "bindwechat_obj[\"bw\"" + i + "][\"action\"]数据结构错误"); }
        //取验证模式
        var featuremode = bindwechat_obj["bw" + i]["featuremode"];
        if ("undefined" == typeof (featuremode)) { alert(appname + "bindwechat_obj[\"bw\"" + i + "][\"featuremode\"]数据结构错误"); }
        thiscommon.play("global", "执行步骤");
        thiscommon.play("global", i);
        //如果是点击文本
        var result = false;
        if ("click_text" == action) {
            //点击文本
            thiscommon.click_text(bindwechat_obj["bw" + i]["click_text"]);
            //执行阻塞验证
            result = thiscommon.block_mode("while_bindwechat", featuremode, bindwechat_obj, i);
        }
        //if end
        //如果是点击ID
        else if ("click_id" == action) {
            var thisid = bindwechat_obj["bw" + i]["click_id"];
            if ("undefined" == typeof (thisid)) { alert(appname + "bindwechat_obj[\"bw\"" + i + "][\"click_id\"]数据结构错误"); }
            thiscommon.click_id(thisid);
            //  id(thisid).findOne(1000).click();
            var result = false;
            //执行阻塞验证
            result = thiscommon.block_mode("while_bindwechat", featuremode, bindwechat_obj, i);
        }
        //最后判断result
        if (result) {
            if (i == thiscommon.JSONLength(bindwechat_obj)) {
                //最后一步的执行成功
                thiscommon.play("global", "绑定成功");
            } else {
                thiscommon.play("global", "执行完成");
            }

        } else {
            thiscommon.play("global", "执行失败");
        }

    }
}
//layers机制
function while_pagecheck() {
    Gworkthread = "pagecheck_start";
    //for 循环阻塞
    var thisforstart = false;
    //是否识别了该页面
    var thisfindpage = false;
    //提示计数器
    var thistoastcount = 0;
    //上一个pc编号
    var lastpcx = "";
    //相同页面计数器
    var samepcx_count = 0;
    thread_pagecheck = threads.start(function () {
        //检测页面 并且根据页面acton
        //for循环pagecheck_obj 
        toast("页面识别启动")
        setInterval(function () {
            thistoastcount += 1;
            if (thistoastcount > 5) {
                thiscommon.toastAt("pagecheck相同页面计数器" + samepcx_count)
                // toast("thisforstart is:"+thisforstart);
                thistoastcount = 0;
            }

            //这是线程内测循环执行，执行前要判断for循环是否结束
            if (thisforstart == false) {
                try {
                    thisforstart = true;
                    thisfindpage = false;
                    for (var i = 1; i <= thiscommon.JSONLength(pagecheck_obj); i++) {
                        var thisfeaturemode = pagecheck_obj["pc" + i]["featuremode"];
                        insert_log('', 'pagecheck', appname, '018', '')
                        var thisresult = eval(thisfeaturemode);
                        var thisinfo = pagecheck_obj["pc" + i]["info"]

                        if (thisresult) {
                            insert_log('', 'pagecheck', appname, '018', '1')
                            var thispcx = "pc" + i;
                            //判断当前pc与上一个pc是否是一样的
                            //如果是一样的线程计数器增加一
                            if (thispcx == lastpcx) {
                                samepcx_count += 1;
                            } else {
                                lastpcx = thispcx;
                                //如果不一样，线程计数器清零
                                samepcx_count = 0;
                            }

                            //如果线程计数器>90那么restartapp


                            thisfindpage = true;
                            toast(thisinfo);
                            var thisactiontype = pagecheck_obj["pc" + i]["actiontype"];
                            var thisaction = pagecheck_obj["pc" + i]["action"];
                            //如果是执行一段私有函数
                            if (thisactiontype == "func") {

                                try {
                                    eval(Gfinditemstr);
                                    if ("" != thisaction) {
                                        eval(thisaction)
                                    }
                                } catch (e) { toast("pagecheck eval func e:" + e); thisforstart == false }
                            }//if end;
                            else if (thisactiontype == "code") {

                                try {
                                    if ("" != thisaction) {
                                        eval(thisaction)
                                    }
                                } catch (e) {
                                    thisforstart = false;
                                    toast("pagecheck eval code e:" + e)
                                };
                            }else if(thisactiontype=="func_ext"){
                                try {
                                  eval("Gext_common."+thisaction);
                                }catch(e){
                                    log("Gext_common error:"+e);
                                }
                            }

                            break;

                        }//if end;

                    }//for end
                    //线程计数器超过数量
                    try {
                        if (samepcx_count > 50) {
                            try{
                            log("没有识别页面："+currentActivity());
                            log("没有识别页面所属包名:"+appname+currentPackage());
                            back();}catch(e){}

                            if(appname=="快手极速版"||appname=='快看点'||appname=='波波视频'){
                                samepcx_count = 0;
                            }else{
                                toast("本页面停留太长，重新拉起")
                                insert_log('', 'pagecheck', appname, '016', '')
                                samepcx_count = 0;
                                workthread_errorcount = 999
                            }
                           
                        }
                    } catch (e) {
                        toast("> e:" + e);
                    }

                    Gbrick_count += 1;
                    thisforstart = false;
                    if (thisfindpage == false) {
                        samepcx_count += 1;
                        insert_log('', 'pagecheck', appname, '018', '0')
                        toast("没有识别当前页面");
                    }
                } catch (e) {
                    //  toast("pagecheck main e:"+e);
                    thisforstart = false;
                }

            }

        }, 3000);

    });

}

//统计收益函数
function while_analycoinincome(flag) {
    alert("给Ganalyflag赋值为" + flag);
    Gworkthread = "analycoinincome_start";
    Ganalyflag = flag;
    //for 循环阻塞
    var thisforstart = false;
    //是否识别了该页面
    var thisfindpage = false;
    //提示计数器
    var thistoastcount = 0;
    //上一个pc编号
    var lastpcx = "";
    //相同页面计数器
    var samepcx_count = 0;

    toast("这是统计收益函数开始执行");
    //  alert("analyincome_obj is:"+analyincome_obj);
    if (analyincome_obj == "" || "undefined" == typeof (analyincome_obj)) {
        //如果obj为空，那么说明json文件没有实现统计收益特征码，切换到签到
        toast("json文件没有统计收益特征码");
        Gworkthread = "openapp_stop";
        Galreadyaci = true;
        return;//返回，不执行下面的线程了

    } else {

    }
    // sleep(1000);
    // toast("执行完成");
    // alert("Ganalybreak is:"+Ganalybreak);
    try { thread_analycoinincome.interrupt() } catch (e) { };
    thread_analycoinincome = threads.start(function () {
        setInterval(() => {
            //检测是否统计完成收益开关量，
            if (Ganalybreak == true) {
                //修改全局变量，标识该app打开时已经统计过收益
                Galreadyaci = true;
                //如果统计完成了，那么根据标志位进行下一步
                //如果是app第一次统计，那么统计完成后需要触发签到
                if ("first" == flag) {


                    toast('切换到签到')
                    //前台进程优化
                    thiscommon.clean(Gdevicetype, Gpackagename_lists);
                    //这里延迟一秒防止clean延迟导致刚打开的app被clean
                    sleep(1000);
                    var openstate = thiscommon.openAPP(appname, packagename, activityname, open_obj);
                    if (openstate) {
                        //如果打开成功，更新标志位 Gworkthread=openapp_stop，交由while_control处理
                        Gworkthread = "openapp_stop";
                    } else {

                    }

                } else if ("finish" == flag) {

                    toast('交给主线程')
                    //如果是切换app时的统计（刷完统计）,统计完成后什么也不要做，退出本函数，交由主线程切换下一个app
                }
                //初始化标识位
                Ganalybreak = false;
                try { thread_analycoinincome.interrupt() } catch (e) { };
            } else {
                try {
                    //如果没有统计完，则继续进行页面识别和统计
                    thistoastcount += 1;
                    if (thistoastcount > 5) {
                        thiscommon.toastAt("pagecheck相同页面计数器" + samepcx_count)
                        // toast("thisforstart is:"+thisforstart);
                        thistoastcount = 0;
                    }

                    //这是线程内测循环执行，执行前要判断for循环是否结束
                    if (thisforstart == false) {
                        try {
                            thisforstart = true;
                            thisfindpage = false;
                            for (var i = 1; i <= thiscommon.JSONLength(analyincome_obj); i++) {
                                var thisfeaturemode = analyincome_obj["ai" + i]["featuremode"];
                                // alert("thisfeaturemode is"+thisfeaturemode);
                                // insert_log('','pagecheck',appname,'018','')
                                var thisresult = eval(thisfeaturemode);
                                var thisinfo = analyincome_obj["ai" + i]["info"]
                                //   alert("thisresult is"+thisresult)
                                if (thisresult) {
                                    // insert_log('','pagecheck',appname,'018','1')
                                    var thispcx = "ai" + i;
                                    //判断当前pc与上一个pc是否是一样的
                                    //如果是一样的线程计数器增加一
                                    if (thispcx == lastpcx) {
                                        samepcx_count += 1;
                                    } else {
                                        lastpcx = thispcx;
                                        //如果不一样，线程计数器清零
                                        samepcx_count = 0;
                                    }

                                    //如果线程计数器>90那么restartapp


                                    thisfindpage = true;
                                    toast(thisinfo);
                                    var thisactiontype = analyincome_obj["ai" + i]["actiontype"];
                                    var thisaction = analyincome_obj["ai" + i]["action"];
                                    //如果是执行一段私有函数
                                    if (thisactiontype == "func") {

                                        try {
                                            //把js函数声明
                                            eval(Gfinditemstr);
                                            if ("" != thisaction) {
                                                eval(thisaction)
                                            }
                                        } catch (e) { toast("analy eval func e:" + e); thisforstart == false }
                                    }//if end;
                                    else if (thisactiontype == "code") {

                                        try {
                                            if ("" != thisaction) {
                                                eval(thisaction)
                                            }
                                        } catch (e) {
                                            thisforstart = false;
                                            toast("analy eval code e:" + e)
                                        };
                                    }

                                    break;

                                }//if end;

                            }//for end
                            //线程计数器超过数量
                            try {
                                if (samepcx_count > 20) {
                                    toast("本页面停留太长，重新拉起")
                                    // insert_log('','pagecheck',appname,'016','')
                                    samepcx_count = 0;
                                    workthread_errorcount = 999
                                    Galreadyaci = true;

                                }
                            } catch (e) {
                                toast("> e:" + e);
                            }

                            Gbrick_count += 1;
                            thisforstart = false;
                            if (thisfindpage == false) {
                                samepcx_count += 1;
                                //     insert_log('','pagecheck',appname,'018','0')
                                toast("没有识别当前页面");
                            }
                        } catch (e) {
                            toast("analy main e:" + e);
                            thisforstart = false;
                        }

                    }

                } catch (e) { }


            }//else 结束


        }, 3000);
    });


}
//全局调度线程
function while_control(appname, packagename, activityname, open_obj, bindwechat_obj, signin_obj, autoread_obj) {
    //appname,packagename,activityname,open_obj,bindwechat_obj,autoread_obj
   
    var nowcurrentPackage = "";
    var nowcurrentActivity = "";
    //站外计数器
    var outsidecount = 0;
    //站内非白名单计数器
    var erroraocount = 0;
    //搬砖异常
    brick_error = 0;

    //var tmpflag=0;
    //显示当前app toast计数器，目的是不要太频繁的显示，计数器到5就显示一次后重载，再到5后再显示重载
    var showpacount = 0;
    thread_control = threads.start(
        function () {
            setInterval(function () {
               
                //1如果打开app完成后要做的工作  
                if ("openapp_stop" == Gworkthread) {
                    //如果工作模式是绑定微信runstate
                    if ("bindwechat" == Grunstate) {
                        //toast("开始绑定微信");
                        while_bindwechat(bindwechat_obj);
                    } else if ("autoread" == Grunstate) {
                        //如果没有统计过收益，并且设置了统计收益本地文件开关量，先执行统计收益
                        if (Galreadyaci == false && Ganalyincome == true) {
                            //统计收益函数
                            while_analycoinincome('first');
                        } else {
                            //反之执行原型的流程，签到或刮刮卡pagecheck机制

                            if ("layers" == apptype) {
                                while_pagecheck();//临时代码，为了加快测试绕过签到
                            } else {
                                toast("开始签到...");
                                try { thread_signin.interrupt(); } catch (e) { };
                                while_signin(signin_obj);
                            }

                        }


                    } else if ("popupdebug" == Grunstate) {
                        toast("弹窗跟踪调试");
                    } else if ("analy" == Grunstate) {
                        toast("while_contorl...统计收益");

                    }
                }
                //2如果是签到完成后要执行的工作   //3如果阅读完成后要做的工作
                else if ("signin_stop" == Gworkthread) {
                    //  alert("findnews start");
                  
                    thiscommon.restartapp();
                    // try{    thread_findnews.interrupt();}catch(e){};
                    // try{    thread_readnews.interrupt();}catch(e){};
                    // try{    thread_signin.interrupt();}catch(e){};
                    // thiscommon.clean(Gdevicetype);
                    // sleep(1000);
                    // var openstate=openAPP(appname,packagename,activityname,open_obj);
                    // if(openstate){
                    //     while_findnews(autoread_obj);  
                    // }

                } else if ("readnews_stop" == Gworkthread) {
                    try { thread_findnews.interrupt(); } catch (e) { };
                    try { thread_readnews.interrupt(); } catch (e) { };
                    while_findnews(autoread_obj);
                }
                //4如果找到新闻后要做的工作    
                else if ("findnews_stop" == Gworkthread) {
                    try { thread_findnews.interrupt(); } catch (e) { };
                    try { thread_readnews.interrupt(); } catch (e) { };
                    while_readnews(autoread_obj);
                }
                try {
                    nowcurrentPackage = currentPackage();
                    nowcurrentActivity = currentActivity();
                    showpacount += 1;
                    if (showpacount > 5) {
                        var thisruntime = 0;
                        try { thisruntime = Gsecond / 60; thisruntime = thisruntime.toFixed(0); } catch (e) { toast("thisruntime e" + e) }

                        //            toastAt("当前app:"+appname+"\n包名："+nowcurrentPackage+"\n"+"当前窗体名："+nowcurrentActivity);
                        try {
                            thiscommon.toastAt("当前app:" + appname + "运行了" + thisruntime + "分钟" + "\nf线程:" + thread_findnews.isAlive() + " r线程:" + thread_readnews.isAlive() + "\nGworkthread is:" + Gworkthread + "\n" + "workthread_error is：" + workthread_errorcount + "\nbe:" + brick_error + " bc:" + Gbrick_count + "\n当前窗体名：" + nowcurrentActivity);
                        } catch (e) {
                            try {
                                thiscommon.toastAt("当前app:" + appname + "运行了" + thisruntime + "分钟" + "\np线程：" + thread_pagecheck.isAlive() + "\nGworkthread is:" + Gworkthread + "\n" + "workthread_error is：" + workthread_errorcount + "\nbe:" + brick_error + " bc:" + Gbrick_count + "\n当前窗体名：" + nowcurrentActivity);
                                //  toastAt("页面识别线程:"+thread_pagecheck.isAlive());
                            } catch (e) { toast("p5 e"+e) }
                        }

                        showpacount = 0;
                    }
                } catch (e) { }


                //站外检测 对于layers的不适用
                if (nowcurrentPackage != "" && apptype != "layers") {
                    //这是跳转到站外的情况了
                    if (nowcurrentPackage != packagename) {
                        outsidecount += 1;
                        if (outsidecount > 10) {
                            //   alert("警告，跳出站外");
                            // packagename,activityname
                            //   play("global","拉回站内");

                            toast("拉回站内......");
                            insert_log('', 'control', appname, '006', '')
                            // thiscommon.openpackage(packagename+"/"+activityname);
                            thiscommon.restartapp();
                            outsidecount = 0;
                        }
                    } else {
                        //这是站内的情况，再做白名单检测
                        try {
                            var aocount = thiscommon.JSONLength(activitys_obj);
                            erroraocount += 1;
                            //如果一直没有匹配到白名单
                            if (erroraocount > 10) {
                                log("erroraocount is:" + erroraocount);
                                insert_log('', 'control', appname, '007', '')
                                toast("拉回主线......");
                                try { thread_findnews.interrupt(); } catch (e) { };
                                try { thread_readnews.interrupt(); } catch (e) { };
                                try { thread_signin.interrupt(); } catch (e) { };

                                thiscommon.funmulityback();
                                thiscommon.openpackage(packagename + "/" + activityname);
                                while_findnews(autoread_obj);

                                erroraocount = 0;

                            }
                            //
                            for (var i = 1; i <= aocount; i++) {
                                // alert(activitys_obj["at"+i]);
                                //判断当前活动页面是否在白名单里
                                if (nowcurrentActivity != "") {
                                    if (nowcurrentActivity == activitys_obj["at" + i]) {
                                        //alert("正常 nocur is:"+nowcurrentActivity);
                                        erroraocount = 0;
                                        break;
                                    } else {

                                    }
                                }
                            }//for end
                        } catch (e) {
                            toast("noaocount:" + e);
                        }

                    }


                }//站外检测结束

                //线程守护  搬砖验证
                if ("findnews_start" == Gworkthread) {
                    try {
                        var result = thread_findnews.isAlive();
                        if (result == false) {
                            workthread_errorcount += 1;
                        } else {
                            if (workthread_errorcount < 10) { workthread_errorcount = 0 }
                            if (Gbrick_count != 0) {
                                //如果砖块不等于0 ，初始化为0，说明线程活着的同时还在滑动着
                                Gbrick_count = 0;
                                brick_error = 0;
                            } else if (Gbrick_count == 0) {
                                //如果砖块等于0，这是在线程活着的情况，砖块一直等于0就说明线程活着但是不搬砖了
                                brick_error += 1;
                            }
                        }
                    } catch (e) { };
                } else if ("openapp_start" == Gworkthread) {
                    //openapp_start 是openapp更新的标志位 虽然不是线程，但如果一直卡在openapp_start也是不正常，所以计数器+1
                    workthread_errorcount += 1;
                } else if ("readnews_start" == Gworkthread) {
                    try {
                        var result = thread_readnews.isAlive();
                        if (result == false) {
                            workthread_errorcount += 1;
                        } else {
                            if (workthread_errorcount < 10) { workthread_errorcount = 0 }
                            if (Gbrick_count != 0) {
                                //如果砖块不等于0 ，初始化为0，说明线程活着的同时还在滑动着
                                Gbrick_count = 0;
                                brick_error = 0;
                            } else if (Gbrick_count == 0) {
                                //如果砖块等于0，这是在线程活着的情况，砖块一直等于0就说明线程活着但是不搬砖了
                                brick_error += 1;
                            }
                        }
                    } catch (e) { };
                } else if ("signin_start" == Gworkthread) {
                    try {
                        var result = thread_signin.isAlive();
                        if (result == false) {
                            workthread_errorcount += 1;
                        } else { if (workthread_errorcount < 10) { workthread_errorcount = 0 } }
                    } catch (e) { };
                } else if ("pagecheck_start" == Gworkthread) {
                    try {
                        var result = thread_pagecheck.isAlive();
                        if (result == false) {
                            workthread_errorcount += 1;
                        } else {
                            if (workthread_errorcount < 10) { workthread_errorcount = 0 }
                            if (Gbrick_count != 0) {
                                //如果砖块不等于0 ，初始化为0，说明线程活着的同时还在滑动着
                                Gbrick_count = 0;
                                brick_error = 0;
                            } else if (Gbrick_count == 0) {
                                //如果砖块等于0，这是在线程活着的情况，砖块一直等于0就说明线程活着但是不搬砖了
                                brick_error += 1;
                            }
                        }
                    } catch (e) { };
                    // try{
                    //     var result=thread_pagecheck.isAlive();
                    //     if(result==false){
                    //         workthread_errorcount+=1;
                    //     }else{if(workthread_errorcount<10){workthread_errorcount=0}}
                    // }catch(e){};
                } else {
                    try { var result1 = thread_findnews.isAlive(); } catch (e) { var result1 = false }
                    try { var result2 = thread_readnews.isAlive(); } catch (e) { var result2 = false; }
                    try { var result3 = thread_signin.isAlive(); } catch (e) { var result3 = false; }
                    if (result1 == false && result2 == false && result3 == false && apptype != "layers") {
                        workthread_errorcount += 1;
                    }


                }
                if (workthread_errorcount > 10) {
                    workthread_errorcount = 0;
                    toast("重新激活线程......");
                    thiscommon.restartapp();

                }
                if (brick_error > 10) {
                    brick_error = 0;
                    insert_log('', 'control', appname, '013', '')
                    toast("搬砖计数器重新激活线程......");
                    thiscommon.restartapp();
                }
                //其它线程检测结束

                //发送心跳广播
                var action = "com.example.broadcasttest.MY_BROADCAST"
                //  while(1){
                app.sendBroadcast(
                    {
                        action: action,
                    }
                );

                //判断退出
                if (Guser_close_myself_count > 6) {
                
                    //  shell("am force-stop com.example.linyuming.broadcasttest", true);
                  //  shell("am force-stop org.autojs.autojs", true);
                   // shell("am force-stop com.haiqu.autoread", true);

                    //
                } else {
                    Guser_close_myself_count = 0;
                }

            }, 3000);//bindwechat注释
        }//bindwechat注释
    );//bindwechat注释
}
//关闭操作系统弹窗
function while_closewindow(devicetype) {
    if ("le" == devicetype) {
        thread_closewindow = threads.start(
            function () {
                setInterval(function () {
                    //判断关闭 app申请授权的弹窗
                    try {
                        var elestr = id('com.android.packageinstaller:id/permission_deny_button');
                        if (elestr.exists()) {
                            elestr.click();
                        }
                    } catch (e) { }
                    //关闭某某程序已经停止运行的弹窗
                    try {
                        var elestr = id('android:id/le_bottomsheet_default_cancel');
                        if (elestr.exists()) {
                            elestr.click();
                        }
                    } catch (e) { }
                    //android:id/le_bottomsheet_default_cancel


                }, 1000);
            }
        );
    }
}
//异常处理线程
function while_abnormal(abnormal_obj) {
    // Gworkthread="abnormal_start"; 不要这个，会干扰逻辑

    thread_abnormal = threads.start(function () {
        setInterval(function () {
            //       toast("this is while_abnormal... allcount is:"+thiscommon.JSONLength(abnormal_obj));             
            for (var i = 1; i <= thiscommon.JSONLength(abnormal_obj); i++) {

                try{var featuremode = abnormal_obj["ab" + i]["featuremode"];}catch(e){var featuremode=""}

                if ("id" == featuremode) {

                    var thisid = abnormal_obj["ab" + i]["id"];
                    thiscommon.mytoast("while_abnormal，featuremode is id， for x is :" + i + " thisid is:" + thisid);
                    try {
                        // var result=once_check("id",thisid,'','');
                        thiscommon.mytoast("while_abnormal result is:" + result);
                        //  if(result){ 
                        // var result=id(thisid).click();
                        // alert("result is:"+result);
                        //if(result){
                        try {
                            thiscommon.clickxy_for_ele(id(thisid).findOnce());
                            thiscommon.play("global", "关闭弹窗");
                        } catch (e) {

                        }

                        //}


                        //    }
                    } catch (e) {
                        back();

                    }


                } else if ("id_depth" == featuremode) {
                    try {
                        var thisid = abnormal_obj["ab" + i]["id"];
                        var thisdepth = abnormal_obj["ab" + i]["depth"];

                        var elestr = id(thisid);
                        var result = elestr.exists();
                        if (result) {
                            var eledepth = elestr.findOnce().depth();
                            if (eledepth == thisdepth) {
                                thiscommon.clickxy_for_ele(id(thisid).findOnce());
                            }
                        }
                    } catch (e) {
                        //  toast("id_depth:"+e);
                    }

                } else if ("classname_text" == featuremode) {

                    try {
                        var thisclass = abnormal_obj["ab" + i]["classname"];
                        var thistext = abnormal_obj["ab" + i]["text"];
                        var result = thiscommon.block_check(featuremode, thisclass, thistext, '');
                        //   alert(thisclass+":"+thistext);
                        if (result) {
                            thiscommon.click_classname_text(thisclass, thistext);
                            //play("global","关闭弹窗");

                        }
                    } catch (e) {

                    }

                } else if ("classname_desc" == featuremode) {
                    try {
                        var thisclass = abnormal_obj["ab" + i]["classname"];
                        var thisdesc = abnormal_obj["ab" + i]["desc"];
                        var result = thiscommon.block_check(featuremode, thisclass, thisdesc, '');
                        //   alert(thisclass+":"+thistext);
                        if (result) {
                            thiscommon.click_classname_desc(thisclass, thisdesc);
                            //play("global","关闭弹窗");

                        }
                    } catch (e) {

                    }
                } else if ("click_boundary_path" == featuremode) {
                    try {
                        var boundary = abnormal_obj["ab" + i]["boundary"];
                        var path = abnormal_obj["ab" + i]["path"];
                        thiscommon.click_boundary_path(boundary, path);
                    } catch (e) {

                    }

                }

            }
            //for end
        }, Gabinterval);
    });
}
//弹窗与跳出app监测
function while_abnormal_overtime(activitys_obj) {
    thread_abnormal_overtime = threads.start(
        function () {
            setInterval(function () {
                try {
                    var thispackagename = currentPackage();
                    var thisactivity = currentActivity();
                    var itemcount = thiscommon.JSONLength(activitys_obj);
                    // alert("itemcount is :"+itemcount);
                    Gwindowstate = false;
                    for (var i = 1; i <= itemcount; i++) {
                        // alert(activitys_obj["at"+i]);
                        if (thisactivity == activitys_obj["at" + i]) {
                            thiscommon.play("global", "状态正常")
                            thiscommon.play("global", i);
                            Gwindowstate = true;
                        }
                    }
                    if (Gwindowstate == false) {
                        //    alert(thisactivity);
                        thiscommon.play("global", "发现未关闭弹窗");
                    }
                } catch (e) {
                    toast(e);
                }

            }, 1000);
        }
    );
}