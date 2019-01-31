var clockViewModel = new Cesium.ClockViewModel();


function onload(CesiumHeatmap) {
   	ccesiumHeatmap = CesiumHeatmap;
   	
   }

function removeAll() {
	$("#cesiumContainer #trackPopUp").remove();
	if(handler3D){
		handler3D.isDestroyed();
		handler3D = undefined;
		lockHandler = false;
		lockHandler1 = false;
	}
	clearbillboards(); // 清除billboards
	viewer.entities.removeAll();
//	if (time != null) {
//		clearInterval(time);
//	}
	scene.globe.enableLighting = true; // 开启日光
	$("#ncLegend").html("");
	$("#ncLegend").css('display', 'none');
	$("#ncTaLegend").html("");
	$("#ncTaLegend").css('display', 'none');
//	viewer.clock.onTick.removeEventListener(clockStartListener); // 取消地球自转
	var imagerLayer = new Array();
	if (imageryLayers.length != 0 && imageryLayers.length > 1) {
		for (var i = 2; i < imageryLayers.length; i++) {
			imagerLayer.push(imageryLayers.get(i));
		}
		for (var j = 0; j < imagerLayer.length; j++) {
			imageryLayers.remove(imagerLayer[j]);
		}
	}
//	document.getElementById('toolbars').style.display = 'none';
//	document.getElementById('mea-cal-toolbar').style.display = 'none';
//	document.getElementById('box').style.display = 'none';
	viewer.dataSources.removeAll();
//	viewer.scene.primitives.removeAll();
//	$("#divwind").hide();
	// 取消位置拾取
//	handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
//	progressTimeStop();
}
//function fullScreenButton() {
//	Cesium.Fullscreen.requestFullscreen(document.body); // 全屏
//}
// 地球自转
var lastNow = Date.now();
var clockStartListener = function(clock) {
	var now = Date.now();
	var splitRate = 0.1;
	var delta = (now - lastNow) / 1000;
	lastNow = now;
	camera.rotate(Cesium.Cartesian3.UNIT_Z, splitRate * delta);
};
function earthRotation() {
	viewer.clock.onTick.addEventListener(clockStartListener)
}
function clearRotation() {
	viewer.clock.onTick.removeEventListener(clockStartListener)
}
//获取经纬度高程坐标
//function getPosition(){
//	removeAll();
//	handler.setInputAction(positionEvent, Cesium.ScreenSpaceEventType.LEFT_CLICK);
//}
//// 打开编辑绘制
//function editDraw(){
//	removeAll();
//	document.getElementById('toolbars').style.display = 'block';
//}
//// 打开量算
//function measureCal(){
//	removeAll();
//	document.getElementById('mea-cal-toolbar').style.display = 'block';
//}
//// 风向
//function windMapShow(){
//	removeAll();
//	require([ 'WindMap' ], function(windmap) {
//		windmap.show();		
//	});
//}
// nc Data
function findNCDataShow(){
	removeAll();
	var ele = $('#elements').combobox('getText');
	var time = $('#attYearMonth').datebox('getValue');
	if(time==""){
		alert("时间不能为空，请选择时间！！！");
	}else{
		time = time + '-' + '01';
		GlobleNc.show(time);
	}
}
// 清除nc数据
function clearbillboards(){
	if(billboards){
		billboards.removeAll();
	}
	if(labels){
		labels.removeAll();
	}
}
$('.zd-loading').on('click', function(){
	removeAll();
//	GlobleLand.show('2008-01-02',23);
	GlobleHigh.show();
});
//  加载数据
function loadDatas(){
	removeAll();
	var res = JSON.parse(sessionStorage.getItem('formData'));
	var dataSets = res.mark.label; // 获取数据集名称
	var dataType = res.mark.type;
	
	if(dataSets==GcGateConfig.dataSet.scpdsi){
		var date = res.date; // 获取日期
		GlobleNcScpdsi.show(date+'-01');
	}else if(dataType==GcGateConfig.dataSet.rcp45Num){
		var date = res.date; // 获取日期
		var airPressure = res.qiya; // 获取气压
		var fileName = res.tabSelect.fileName; // 获取文件名称
		
		airPressure = airPressure.split('(Pa)');
		airPressure = airPressure[0].trim();
			var datePoint = judgeDate(fileName, date); // 判断日期选择是否正确
			if(datePoint[0]==true){
				date = date + '-' + '01';
				if(datePoint[1]=='ta'){
					GlobleNcTa.show(date, airPressure, fileName);
				}else if(datePoint[1]=='ua'||datePoint[1]=='va'){
					GlobleNcWind.show(date, airPressure, fileName);
				}else if(datePoint[1]=='zg'){
					GlobleNcHeight.show(date, airPressure, fileName);
				}else{
					alert('敬请期待。。。');	
				}
			}
	}else if(dataSets==GcGateConfig.dataSet.fireSlash){
		loadFireSlash(); // 加载火烧迹地
	}else if(dataSets==GcGateConfig.dataSet.fy3){
		var fileName = res.tabSelect.fileName; // 获取文件名称
		loadFY3(fileName); // 加载风云3遥感数据
	}else if(dataSets==GcGateConfig.dataSet.highStation){
		GlobleHigh.show(); // 加载所有高空站点
	}else if(dataSets==GcGateConfig.dataSet.landStation){
		var time = res.date;
		var hour = res.times;
		GlobleLand.show(time, hour);
	}else{
		alert('敬请期待。。。');
	}
}
// d:文件名	t:日期
function judgeDate(d, t){
	//ta_Amon_bcc-csm1-1_rcp45_r1i1p1_200601-209912.nc
	//scPDSI.cru.3.25.bams2017.GLOBAL.1901.2016.nc
	var s = d.split(".nc");
	var startDate;
	var endDate;
	var elements;
	if(s[0].indexOf("_") != -1){
		var arr = s[0].split("_");
		var str = arr[arr.length-1].split("-");
		startDate = str[0].substring(0, 4) + "-" + str[0].substring(4, 6);
		endDate = str[1].substring(0, 4) + "-" + str[1].substring(4, 6);
		elements = arr[0];
	}else{
		var arr = s[0].split(".");
		startDate = arr[arr.length-2];
		endDate = arr[arr.length-1];startDate = arr[arr.length-2];
		endDate = arr[arr.length-1];
	}
	var oDate1 = new Date(startDate);
    var oDate2 = new Date(endDate);
    var pickDate = new Date(t);
    if(pickDate>oDate1&&pickDate<oDate2){
    	return [true, elements];
    }else{
    	return [false, elements];
    }
}
function loadFireSlash(){
	var provider = new Cesium.WebMapServiceImageryProvider({
		url: GcGateConfig.fireSlash.serverUrl,
		layers: 'gc:data',
		parameters: {
			service: 'WMS',
			format: 'image/png',
			transparent: true
		},
		enablePickFeatures: false
	});
	imageryLayers.addImageryProvider(provider);
	scene.globe.enableLighting = false;
}
function loadFY3(fileName){
	if(fileName.indexOf(".img") != -1||fileName.indexOf(".hdr") != -1){
		var name;
		if(fileName.indexOf(".img") != -1){
			name = fileName.split(".img");
			loadDatas(name[0]);
		}else{
			name = fileName.split(".hdr");
			loadDatas(name[0]);
		}
	}else{
		alert("不支持的数据源，请重新选择！");
	}
	function loadDatas(fy3Name){
		var layerName = "gc:"+fy3Name;
		var provider = new Cesium.WebMapServiceImageryProvider({
			url: GcGateConfig.fireSlash.serverUrl,
			layers: layerName,
			parameters: {
				service: 'WMS',
				format: 'image/png',
				transparent: true
			},
			enablePickFeatures: false
		});
		imageryLayers.addImageryProvider(provider);
		scene.globe.enableLighting = false;
//		var imageryLayer = new Cesium.ImageryLayer(provider);
//		viewer.flyTo(imageryLayer);
	}
}
$('.layClear-btn').on('click', function(){
	
	removeAll();
});
//document.getElementById('layClear-btn').onclick = function() {
//	removeAll();
//}
//function ncShowTog(){
//	$("#ncEles").fadeToggle();
//}
//var layer = new Array();
//var startTimeLine = "1981/01/01 0:00:00";
//var endTimeLine = "1983/12/01 0:00:00";
//// 温度
//function initTmp(){
//	removeAll();
//	layer.splice(0,layer.length);//清空数组 
//	for(var i=0; i<12; i++){
//		updateLayers(1981, i+1);
//	}
//	
//	for(var i=0; i<12; i++){
//		updateLayers(1982, i+1);
//	}
//	
//	for(var i=0; i<12; i++){
//		updateLayers(1983, i+1);
//	}
//
//	function updateLayers(nY,nM) {
//	    var urlNew = "../images/tmp/" + nY + "." + nM + ".png";
//	
//	    var pNew = new Cesium.SingleTileImageryProvider({
//	        url :urlNew
//	    });
//	    layer.push(imageryLayers.addImageryProvider(pNew));
//	}
//	scene.globe.enableLighting = false;
//	document.getElementById('box').style.display = 'block';
//	startTimeLine = "1981/01/01 0:00:00";
//	endTimeLine = "1983/12/01 0:00:00";
//}
//// 降水
//function initRain(){
//	removeAll();
//	layer.splice(0,layer.length);//清空数组 
//	for(var i=0; i<12; i++){
//    	updateLayers(1981, i+1);
//    }
//    
//    for(var i=0; i<12; i++){
//    	updateLayers(1982, i+1);
//    }
//    
//    for(var i=0; i<12; i++){
//    	updateLayers(1981, i+1);
//    }
//    
//    function updateLayers(nY,nM) {
//        var urlNew = "../images/pre/" + nY + "." + nM + ".png";
//
//        var pNew = new Cesium.SingleTileImageryProvider({
//            url :urlNew
//        });
//        layer.push(imageryLayers.addImageryProvider(pNew));
//    }
//    scene.globe.enableLighting = false;
//    document.getElementById('box').style.display = 'block';
//    startTimeLine = "1981/01/01 0:00:00";
//	endTimeLine = "1983/12/01 0:00:00";
//}
//// 干旱
//function initArid(){
//	removeAll();
//	layer.splice(0,layer.length);//清空数组 
//	for(var i=0; i<12; i++){
//    	updateLayers(2015, i+1);
//    }
//    
//    for(var i=0; i<12; i++){
//    	updateLayers(2016, i+1);
//    }
//    
//    for(var i=0; i<12; i++){
//    	updateLayers(2015, i+1);
//    }
//    
//    function updateLayers(nY,nM) {
//        var urlNew = "../images/scp/" + nY + "." + nM + ".png";
//
//        var pNew = new Cesium.SingleTileImageryProvider({
//            url :urlNew
//        });
//        layer.push(imageryLayers.addImageryProvider(pNew));
//    }
//    scene.globe.enableLighting = false;
//    document.getElementById('box').style.display = 'block';
//    startTimeLine = "2015/01/01 0:00:00";
//	endTimeLine = "2016/12/01 0:00:00";
//}
function customPop(){
	/**
	 * 动态添加气泡窗口
	 */
	var removeHandler;
	var content;
	var autoInfoWindow;
	var infoDiv = '<div id="trackPopUp" style="display:none;">'+
				                 '<div id="trackPopUpContent" class="leaflet-popup" style="top:5px;left:0;">'+
		                           '<a class="leaflet-popup-close-button" href="#">×</a>'+
		                           '<div class="leaflet-popup-content-wrapper">'+
		                             '<div id="trackPopUpLink" class="leaflet-popup-content" style="max-width: 300px;"></div>'+
		                           '</div>'+
		                           '<div class="leaflet-popup-tip-container">'+
		                             '<div class="leaflet-popup-tip"></div>'+
		                           '</div>'+
		                         '</div>'+
				               '</div>';
				 $("#cesiumContainer").append(infoDiv);
		 
    handler3D = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler3D.setInputAction(function(movement) {
    	if(lockHandler){
	    	var ray = viewer.scene.camera.getPickRay(movement.position);
	        var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
	        var cartographic=Cesium.Cartographic.fromCartesian(cartesian); 
			var longitude=Cesium.Math.toDegrees(cartographic.longitude);//经度值  
			var latitude=Cesium.Math.toDegrees(cartographic.latitude);//纬度值 
			var position = Cesium.Cartesian3.fromDegrees(longitude, latitude);
			
			var pick = scene.pick(movement.position);
			if(pick && pick.id){
	//			console.log(pick.id);
				$('#trackPopUp').show();
			    content = '<table><tbody><tr><th style="color:black;">'+pick.id+'</th></tbody></table>';	
	        var obj = {position:movement.position,content:content};
	        infoWindow(obj);
	        
	        function infoWindow(obj) {
		        var picked = scene.pick(obj.position);
		        if (Cesium.defined(picked)) {
		            var id = Cesium.defaultValue(picked.id, picked.primitive.id);
		            if (id) {
		            	$(".cesium-selection-wrapper").show();
		            	$('#trackPopUpLink').empty();
		            	$('#trackPopUpLink').append(obj.content);
		        		function positionPopUp (c) {
		        			var x = c.x - ($('#trackPopUpContent').width()) / 2;
		        			var y = c.y - ($('#trackPopUpContent').height());
		        			$('#trackPopUpContent').css('transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)');
		        		}
		        		var c = new Cesium.Cartesian2(obj.position.x, obj.position.y);
		        		$('#trackPopUp').show();
		        		positionPopUp(c); // Initial position
						// Monitoring position changes
	//	        		removeHandler = viewer.scene.postRender.addEventListener(function () {
	//	        			// Transforms a position in WGS84 coordinates to window coordinates.
	//	        			var changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position);
	//	        			if ((c.x !== changedC.x) || (c.y !== changedC.y)) {		
	//	        				positionPopUp(changedC);		        		        				
	//	        				c = changedC;		        		        			
	//	        			}
	//	        		});
		        		// PopUp close button event handler
		        		$('.leaflet-popup-close-button').click(function() {
		        			$('#trackPopUp').hide();
		        			$('#trackPopUpLink').empty();
		        			$(".cesium-selection-wrapper").hide();
	//	        			removeHandler.call();
		        			return false;
		        		});	            				
		                return id;
		            }
		        }	    	
	          }  
			}
			else{
				$('#trackPopUp').hide();
			}
    	}
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //绑定地图移动
    handler3D.setInputAction(function (movement) {
        $('#trackPopUp').hide();
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
    //绑定地图缩放
    handler3D.setInputAction(function (movement) {
        $('#trackPopUp').hide();
    }, Cesium.ScreenSpaceEventType.WHEEL);
    //绑定滚轮点击事件
    handler3D.setInputAction(function (movement) {
        $('#trackPopUp').hide();
    }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
}
