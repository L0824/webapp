//Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(110, -50, 110, 50); // default view position

var viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker : false,
	animation : false,	// 
	timeline : false,	// 时间线
	navigationHelpButton : false,	// 关闭帮助控件
	homeButton :false, // 关闭Home控件
	fullscreenButton : false, // 关闭全屏显示
	geocoder : false,	// 关闭搜索控件
	scene3DOnly: true,	// 关闭二维切换
//	skyBox : false,
//    skyAtmosphere : false,
//	automaticallyTrackDataSourceClocks: false,
//	dataSources: null,
	imageryProvider: new Cesium.SingleTileImageryProvider({// 加载全球地图
		url: 'images/asset/globe.jpg'
	})
});

viewer._cesiumWidget._creditContainer.style.display = "none"; // 去除水印

var camera = viewer.scene.camera;

camera.flyTo({
	destination : Cesium.Cartesian3.fromDegrees(110, 32, 30000000.1),
	duration: 5,
	orientation : { // 朝北向下俯视
		heading : 0.0,
		pitch : -Cesium.Math.PI_OVER_TWO, // 相机间距
		roll : 0.0
	// 相机滚动
	}
});

// 地球自转
var lastNow = Date.now();
viewer.clock.onTick.addEventListener(clock=>{
	var now = Date.now();
	var splitRate = 0.1;
	var delta = (now - lastNow)/1000;
	lastNow = now;
	camera.rotate(Cesium.Cartesian3.UNIT_Z, splitRate * delta);
})

//camera.flyTo({
//	destination: Cesium.Cartesian3.fromDegrees(-60, 32, 30000000.1),
//	duration: 100, //旋转速度 数值越大越慢
//	orientation : {	// 朝北向下俯视
//		heading : 0.0,
//		pitch : -Cesium.Math.PI_OVER_TWO,	// 相机间距
//		roll : 0.0	// 相机滚动
//	},
//	complete : function() {
//		setTimeout(function() {
//			camera.flyTo({
//				destination : Cesium.Cartesian3.fromDegrees(120, 32, 30000000.1),
//				duration: 80,
//				orientation : {	// 朝北向下俯视
//					heading : 0.0,
//					pitch : -Cesium.Math.PI_OVER_TWO,
//					roll : 0.0
//				},	
//				complete : function() {
//					camera.flyTo({
//						destination : Cesium.Cartesian3.fromDegrees(-50, 32, 30000000.1),
//						duration: 80,
//						orientation : {	// 朝北向下俯视
//							heading : 0.0,
//							pitch : -Cesium.Math.PI_OVER_TWO,
//							roll : 0.0
//						}
//					});
//				}
//			});
//		}, 100);
//	}
//})

var imageryLayers = viewer.imageryLayers;	// 创建图层

var p0 = new Cesium.SingleTileImageryProvider({
    url : 'images/asset/tmp1.png'
});
var p1 = new Cesium.SingleTileImageryProvider({
    url : 'images/asset/tmp2.png'
});
var p2 = new Cesium.SingleTileImageryProvider({
    url : 'images/asset/tmp3.png'
});
var p3 = new Cesium.SingleTileImageryProvider({
    url : 'images/asset/tmp4.png'
});
var p4 = new Cesium.SingleTileImageryProvider({
    url : 'images/asset/tmp5.png'
});
var layer0 = imageryLayers.addImageryProvider(p0);
var layer1 = imageryLayers.addImageryProvider(p1);
var layer2 = imageryLayers.addImageryProvider(p2);
var layer3 = imageryLayers.addImageryProvider(p3);
var layer4 = imageryLayers.addImageryProvider(p4);
layer0.alpha = 0.5;
layer1.alpha = 0.5;
layer2.alpha = 0.5;
layer3.alpha = 0.5;
layer4.alpha = 0.5;

imageryLayers.raiseToTop(layer0);

function clock(){
	imageryLayers.lower(layer0);
	imageryLayers.raiseToTop(layer1);
}
function clock1(){
	imageryLayers.lower(layer1);
	imageryLayers.raiseToTop(layer2);
}	
function clock2(){
	imageryLayers.lower(layer2);
	imageryLayers.raiseToTop(layer3);
}	
function clock3(){
	imageryLayers.lower(layer3);
	imageryLayers.raiseToTop(layer4);
}
function clock4(){
	imageryLayers.lower(layer4);
	imageryLayers.raiseToTop(layer0);
}

function startjianyin() {
    for (var i = 0; i < 3; i++) {
        var yin = (function (i) {
        	var int=self.setInterval("clock()",1000);
        	var int1=self.setInterval("clock1()",2000);
        	var int2=self.setInterval("clock2()",3000);
        	var int3=self.setInterval("clock3()",4000);
        	var int4=self.setInterval("clock4()",5000);
        })(i);
        setTimeout(yin, 1000);
    }
}
startjianyin();



