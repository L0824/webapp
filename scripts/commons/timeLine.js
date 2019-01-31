var viewer;
var imageryLayers,labelImagery,cesium,ccesiumHeatmap,scene,clock,camera,ellipsoid,handler,handler3D,lockHandler,lockHandler1;
var time = null;
var billboards, labels;
$(document).ready(function (e) {
//    SetProgressTime(null, startTimeLine, endTimeLine);
   
    
     viewer = new Cesium.Viewer('cesiumContainer', {
    	animation : false, // 动画
    	timeline : false, // 时间线
    	baseLayerPicker : true, // 关闭指定影像服务控件
    	navigationHelpButton : false, // 关闭帮助控件
    	homeButton : false, // 关闭Home控件
    	fullscreenButton : false, // 关闭全屏显示
    	geocoder : true, // 关闭搜索控件
    	//automaticallyTrackDataSourceClocks : false,
    	//dataSources : null,
    	//clock : null, // 关闭时针
    	terrainShadows : Cesium.ShadowMode.ENABLED, // 关闭地形阴影
//    	imageryProvider : new Cesium.TiandituImageryProvider({mapStyle : Cesium.TiandituMapsStyle.VEC_W}),
    	imageryProviderViewModels : providerViewModels, // 加载影像
    	terrainProviderViewModels : providerTerrainViewModels, // 加载地形
//    	infoBox : false, // Disable InfoBox widget
    	selectionIndicator : false, // Disable selection indicator
    	shouldAnimate : true,
    	navigation:false,
    	sceneModePicker:true,
    	clockViewModel : clockViewModel
    });
      imageryLayers = viewer.imageryLayers;
   //初始化天地图全球中文注记服务，并添加至影像图层
    labelImagery = new Cesium.TiandituImageryProvider({
       mapStyle : Cesium.TiandituMapsStyle.CIA_C//天地图全球中文注记服务（经纬度投影）
   });
   imageryLayers.addImageryProvider(labelImagery);
   //请开发者自行到supermap online官网（http://www.supermapol.com/）申请key
   viewer.geocoder.viewModel.geoKey = '79F9yph6kv8c8I9aARQUxtvn';

    

   viewer.extend(Cesium.viewerCesiumNavigationMixin, {
   	defaultResetView : Cesium.Cartographic.fromCartesian(Cesium.Cartesian3
   			.fromDegrees(110, 32, 15000000.1))
   // 重置视图
   });

 

    scene = viewer.scene;
    clock = viewer.clock;
    camera = viewer.camera;
    ellipsoid = viewer.scene.globe.ellipsoid; // 获取地球球体对象
   //var imageryLayers = viewer.imageryLayers; // 创建图层管理容器
  
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

   viewer.camera.flyTo({
   	destination : Cesium.Cartesian3.fromDegrees(110, 32, 15000000.1),
   	duration : 5, // 旋转速度 数值越大越慢
   	orientation : { // 朝北向下俯视
   		heading : 0.0,
   		pitch : -Cesium.Math.PI_OVER_TWO, // 相机间距
   		roll : 0.0
   	// 相机滚动
   	}
   });

   scene.globe.enableLighting = true; // 开启日光

   // 变焦时摄像机位置的最大幅值（米）
   scene.screenSpaceCameraController.maximumZoomDistance = 40000000.0;

   viewer._cesiumWidget._creditContainer.style.display = "none"; // 去除水印
   
   
//   var tp = localStorage.getItem('GisType');
//   if(tp != null){
//   	console.log(tp);
//   	if(tp == "帕默尔干旱指数[1900-2016]"){
//   		initArid();
//   	}
//   	else if(tp == "全球气温历史数据"){
//   		initTmp();
//   	}
   			
//   }
   
   
});
var _index = 0;//进度
var _mProgressTimer;//定时器
var _speed = 1000;
var myfun;//执行方法，当前时间为参数
function SetProgressTime(fun, startTime, endTime) {
    myfun = fun;
    $("#progressTime").show();
    // 开始时间
    var startDate = new Date(startTime);
    var Year = startDate.getFullYear();
    var Month = (startDate.getMonth()+1) < 10 ? "0" + (startDate.getMonth()+1) : (startDate.getMonth()+1);
    var indexStart2 = Year + "年" + Month + "月";
    var indexStart3 = Month;
    var firstStart = Year;
    // 结束时间
    var endDate = new Date(endTime);
    var endYear = endDate.getFullYear();
    var endMonth = (endDate.getMonth()+1) < 10 ? "0" + (endDate.getMonth()+1) : (endDate.getMonth()+1);
    var lastEnd = endYear;
    $("#scroll_Thumb").html(indexStart2);
    $(".timecode").html(indexStart3);
    $("#startTime").text(startTime);
    $("#endTime").text(endTime);
    // 得到总年数
    function getDateDiff(date1,date2){
		if(date2>date1){
			return date2-date1;
		}else{
            alert("两个日期之间并非整年，请重新选择");
        }
        
    }
    var dateNum = getDateDiff(firstStart,lastEnd)+1;
    var str = '';
    for(var i = 0; i < dateNum; i ++){
        var d1 = new Date(startTime);
        var d2 = new Date(d1);
        d2.setFullYear(d1.getFullYear() + i);
        var yearNum = d2.getFullYear();
        str += '<p>'+yearNum + ' ' + '年'+'</p>';
    }
    $(".time_slot").html(str);
    $(".time_slot p").css({"width":"calc("+100/dateNum+"% - 1px)"});
    //设置最大值
    var qdsjDate = new Date(startTime);
    var jssjDate = new Date(endTime);
	ScrollBar.maxValue = (jssjDate.getFullYear() - qdsjDate.getFullYear() + 1) * 12
    //初始化
    ScrollBar.Initialize();
}
//滑块
var ScrollBar = {
    value: 0,
    maxValue: 40,
    step: 1,
    currentX: 0,
    Initialize: function () {
        if (this.value > this.maxValue) {
            alert("给定当前值大于了最大值");
            return;
        }
        this.GetValue();
        $("#scroll_Track").css("width", this.currentX + "px");
        $("#scroll_Thumb").css("margin-left", this.currentX + "px");
        this.Value();
    },
    SetValue: function (aValue) {
        this.value = aValue;
        if (this.value >= this.maxValue) this.value = this.maxValue;
        if (this.value <= 0) this.value = 0;
        var mWidth = this.value / this.maxValue * $("#scrollBar").width() + "px";
        $("#scroll_Track").css("width", mWidth);
        $("#scroll_Thumb").css("margin-left", mWidth);
    },
    Value: function () {
        var valite = false;
        var currentValue;
        // 点击进度条时滑块到达对应位置
        $("#scrollBarBox").click(function (event) {
            var changeX = event.clientX - ScrollBar.currentX;
            currentValue = changeX - ScrollBar.currentX - $("#scrollBar").offset().left;
            $("#scroll_Thumb").css("margin-left", currentValue + "px");
            $("#scroll_Track").css("width", currentValue + 2 + "px");
            if ((currentValue + 1) >= $("#scrollBar").width()) {
                $("#scroll_Thumb").css("margin-left", $("#scrollBar").width() - 1 + "px");
                $("#scroll_Track").css("width", $("#scrollBar").width() + 2 + "px");
                ScrollBar.value = ScrollBar.maxValue;
            } else if (currentValue <= 0) {
                $("#scroll_Thumb").css("margin-left", "0px");
                $("#scroll_Track").css("width", "0px");
                ScrollBar.value = 0;
            } else {
                ScrollBar.value = Math.round(currentValue * ScrollBar.maxValue / $("#scrollBar").width());
            }
            SetTime(ScrollBar.value);
            SetInterval(ScrollBar.value);
            _index = ScrollBar.value;
            imageryLayers.raiseToTop(layer[_index+1]);
        });
        // 鼠标在进度条上面滑动时小滑块显示并对应相应的时间
        $("#scrollBarBox").mousemove(function (event) {
            var changeX = event.clientX - ScrollBar.currentX;
            currentValue = changeX - ScrollBar.currentX - $("#scrollBar").offset().left;
            $(".timecode").show().css("left", currentValue -28 + "px");
            if ((currentValue + 1) >= $("#scrollBar").width()) {
                $(".timecode").css("left", $("#scrollBar").width() - 43 + "px");
                ScrollBar.value = ScrollBar.maxValue;
            } else if (currentValue <= 0) {
                $(".timecode").css("left", "-28px");
                ScrollBar.value = 0;
            } else {
                ScrollBar.value = Math.round(currentValue * ScrollBar.maxValue / $("#scrollBar").width());
            }
            SetTime1(ScrollBar.value);
        });
        // 鼠标移入进度条时小滑块显示
        $("#scrollBarBox").mouseover(function (event) {
            $(".timecode").show();
        });
        // 鼠标移除进度条时小滑块消失
        $("#scrollBarBox").mouseout(function (event) {
            $(".timecode").hide();
        });
    },
    GetValue: function () {
        this.currentX = $("#scrollBar").width() * (this.value / this.maxValue);
    }
}

// 控制大滑块的当前时间
function SetTime(value) {
    var start = $("#startTime").html();
    var startDate = new Date(start);
    startDate.setMonth(startDate.getMonth() + 1 * value);//以 月为进度
    var month = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1;
    var indexStart = startDate.getFullYear() + "/" + month;
    var indexStart1 = startDate.getFullYear() + "年" + month + "月";
    $("#scroll_Thumb").html(indexStart1);
    if (window.parent.currentTime) {
        currentTime = indexStart;
    }
    if (typeof (myfun) == "function") {
        var jscode = new Function('return ' + myfun)();
        jscode(indexStart)
    }
}
// 控制小滑块的当前时间，小滑块时间变化时大滑块不变
function SetTime1(value) {
    var start = $("#startTime").html();
    var startDate = new Date(start);
    startDate.setMonth(startDate.getMonth() + 1 * value);//以月为进度
	var month = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1;
    var indexStart = month;
    var indexStart2 = month;
    $(".timecode").html(indexStart2);
    if (window.parent.currentTime) {
        currentTime = indexStart;
    }
    if (typeof (myfun) == "function") {
        var jscode = new Function('return ' + myfun)();
        jscode(indexStart)
    }
}

//开始 暂停
function progressTimeControl(img) {
    if ($(img).attr("title") == "暂停") {
        $(img).attr("title", "开始");
        $(img).css("background-image", "url(../images/play.png)");
        window.clearInterval(_mProgressTimer);
        clearRotation();
    }else {
        $(img).attr("title", "暂停");
        $(img).css("background-image", "url(../images/pause.png)");
        _mProgressTimer = window.setInterval(function () {
            if (_index <= ScrollBar.maxValue-2) {
            	clearRotation();
            	earthRotation();
                _index += 1;
                ScrollBar.SetValue(_index);
                SetTime(_index);
                if(_index == 0){
                	imageryLayers.raiseToTop(layer[_index]); 
                }else{
                	imageryLayers.lower(layer[_index]); 
                	imageryLayers.raiseToTop(layer[_index+1]);
                }
            }else {
                progressTimeStop();
                clearRotation();
            }
        }, _speed);
    }
}

//停止
function progressTimeStop() {
    $("#progressTime_control").attr("title", "开始");
    $("#progressTime_control").css("background-image", "url(../images/play.png)");
    $("#scroll_Thumb").css("margin-left", "0px");
    $("#scroll_Track").css("width", "0px");
    ScrollBar.value = 0;
    _index = 0;
    _speed = 1000;
    window.clearInterval(_mProgressTimer);
    SetTime(ScrollBar.value);
    SetInterval(_index);
}

//重制时间
function SetInterval(_index) {
    window.clearInterval(_mProgressTimer);
    if ($("#progressTime_control").attr("title") == "开始") {
        ScrollBar.SetValue(_index);
        SetTime(_index);
        clearRotation();
    }else{
        _mProgressTimer = window.setInterval(function () {
            if (_index <= ScrollBar.maxValue-2) {
            	clearRotation();
            	earthRotation();
                _index += 1;
                ScrollBar.SetValue(_index);
                SetTime(_index);
                if(_index == 0){
                	imageryLayers.raiseToTop(layer[_index]); 
                }else{
                	imageryLayers.lower(layer[_index]); 
                	imageryLayers.raiseToTop(layer[_index+1]);
                }
            }else {
                progressTimeStop();
                clearRotation();
            }
        }, _speed);
    }
}