var map;
var scpdsiVector;
var landVector;
var highVector;
var clickSelect;
var pointerMove;
var windy;
var moveendListener;
var canvas;
var canvasScpdsi, canvasTa;
var canvasBoole;
var overlay;
var mapClick;
var myChart;
var option;
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
$(function() {
	var tian_di_tu_satellite_layer = new ol.layer.Tile({
	    title: "天地图卫星影像",
	    visible:false,
	    source: new ol.source.XYZ({
	        url: 'http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
	    })
	});
	var tian_di_tu_road_layer = new ol.layer.Tile({
	    title: "天地图路网",
	    source: new ol.source.XYZ({
	        url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
	    })
	});
	var tian_di_tu_annotation = new ol.layer.Tile({
	    title: "天地图文字标注",
	    source: new ol.source.XYZ({
	        url: 'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
	    })
	});
	
	map = new ol.Map({
		controls: ol.control.defaults({ // 更改地图初始化默认属性
			attribution: false,	// 去除右下角i
			zoom: false, // 去除左上角缩放控件
			rotate: false
	    }),
		layers: [tian_di_tu_satellite_layer, tian_di_tu_road_layer, tian_di_tu_annotation],
		target : 'map',
		
		view : new ol.View({
			center: ol.proj.transform([106.52714, 29.62487], 'EPSG:4326', 'EPSG:3857'),
	        projection:'EPSG:3857',
//			projection:'EPSG:4326',
//			center : [ 106.52714, 29.62487 ],
			zoom : 4,
//			extent:[-180,-90,180,90],
			minZoom: 2,
			maxZoom: 15
		})
	});

	 //右下角工具
//    var tool_text = $(".tool-box .tool-ul .tool-text");
//    tool_text.click(function(){
//        $(this).parent().toggleClass("cur");
//        if($(this).parent().hasClass("cur")){
//            $(this).parent().find(".tool-submenu").fadeIn('500');
//            $(this).parent().siblings().removeClass("cur");
//            $(this).parent().siblings().find(".tool-submenu").fadeOut('500');
//
//        }else{
//            $(this).parent().find(".tool-submenu").fadeOut('500');
//
//        }
//    });
//    var tool_subli = $(".tool-box .tool-submenu>li");
//    tool_subli.click(function(){
//        $(this).toggleClass("cur");
//        if($(this).hasClass("cur")){
//            $(this).siblings().removeClass("cur");
//        }
//
//    })
	
});

var initStyle = new ol.style.Style({ // 设置初始化圆样式
	image: new ol.style.Circle({
		radius: 6,
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.7)'
		}),
		stroke: new ol.style.Stroke({
			color: 'rgba(123, 104, 238, 0.9)',
	    	width: 1
		})
	})
})

//设置变化后圆样式
var circleStyle = function(feature){
	var ftype = feature.get('ftype'); // 获取feature的name
	if(ftype=='circle'){ // 判断点击feature类型是否为circle
		return new ol.style.Style({
	    	image: new ol.style.Circle({
	            radius: 10,
	            fill: new ol.style.Fill({
					color: 'rgba(0, 0, 205, 0.9)'
				}),
				stroke: new ol.style.Stroke({
					color: 'rgba(255, 255, 255, 0.9)',
			    	width: 2
				})
	        })
		})
	}
}

//设置feature文本变化
var circleTextStyle = function(feature){
	var ftype = feature.get('ftype'); // 获取feature的name
	var id = feature.getId(); // 获取feature的id
	var stationName = feature.get('stationName'); // 获取站点名称
	if(ftype=='circle'){ // 判断点击feature类型是否为circle
		return new ol.style.Style({
	    	image: new ol.style.Circle({
	            radius: 10,
	            fill: new ol.style.Fill({
					color: 'rgba(0, 0, 205, 0.9)'
				}),
				stroke: new ol.style.Stroke({
					color: 'rgba(255, 255, 255, 0.9)',
			    	width: 2
				})
	        }),
	        text: new ol.style.Text({
	        	text: '区站名：'+stationName,
	        	textAlign: 'left',
	        	font: '12px sans-serif',
	        	offsetX: 15,
	        	offsetY: 15,
	        	fill: new ol.style.Fill({
	        		color: 'rgb(0, 0, 0)'
	        	}),
	        	stroke: new ol.style.Stroke({
	        		color: 'rgb(255, 255, 255)',
	        		width: 1
	        	})
	        })
		})
	}
}

var circleTextStyle2 = function(feature){
	var ftype = feature.get('ftype'); // 获取feature的name
	var id = feature.getId(); // 获取feature的id
	var staNum = feature.get('stationNum'); // 获取站点名称
	if(ftype=='circle'){ // 判断点击feature类型是否为circle
		return new ol.style.Style({
	    	image: new ol.style.Circle({
	            radius: 10,
	            fill: new ol.style.Fill({
					color: 'rgba(0, 0, 205, 0.9)'
				}),
				stroke: new ol.style.Stroke({
					color: 'rgba(255, 255, 255, 0.9)',
			    	width: 2
				})
	        }),
	        text: new ol.style.Text({
	        	text: '区站号：'+staNum,
	        	textAlign: 'left',
	        	font: '12px sans-serif',
	        	offsetX: 15,
	        	offsetY: 15,
	        	fill: new ol.style.Fill({
	        		color: 'rgb(0, 0, 0)'
	        	}),
	        	stroke: new ol.style.Stroke({
	        		color: 'rgb(255, 255, 255)',
	        		width: 1
	        	})
	        })
		})
	}
}

function getHumidity(h){
	if(h!=999999){
		return (h*0.01).toFixed(2);
	}else{
		return h;
	}
}

$('.zd-loading').on('click', function(){
	CommonTool.clearMap();
	GlobleHigh.show();
//	GlobleNcIsoScpdsi.show();
});

//加载数据
function loadDatas(){
	CommonTool.clearMap();
	var res = JSON.parse(sessionStorage.getItem('formData'));
	var dataSets = res.mark.label; // 获取数据集名称
	var dataType = res.mark.type;
	
	if(dataSets==GcGateConfig.dataSet.scpdsi){
		var date = res.date; // 获取日期
		GlobleNcScpdsi.show(date+'-01');
//		GlobleNcIsoScpdsi.show();
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
		GlobleFireSlash.addFireLayer(); // 加载火烧迹地
	}else if(dataSets==GcGateConfig.dataSet.fy3){
		var fileName = res.tabSelect.fileName; // 获取文件名称
		GlobleFy3Data.addFy3Layer(fileName); // 加载风云3遥感数据
	}else if(dataSets==GcGateConfig.dataSet.highStation){
		GlobleHigh.show(); // 加载所有高空站点
	}else if(dataSets==GcGateConfig.dataSet.landStation){
		var time = res.date;
		var hour = res.times;
		GlobleLand.show(time, hour); // 加载陆地站点信息
	}else{
		alert('敬请期待。。。');
	}
}

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
// 清除数据
$('.layClear-btn').on('click', function(){
	CommonTool.clearMap();
});
// 关闭openlayers的popup
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };