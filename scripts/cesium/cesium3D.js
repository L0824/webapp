/**
 * cesium 
 */
var viewer = new Cesium.Viewer('cesium3DContainer', {
    baseLayerPicker : true, // 关闭指定影像服务控件
	animation : false,	// 
	timeline : false,	// 时间线
	navigationHelpButton : false,	// 关闭帮助控件
	homeButton : false, // 关闭Home控件
	fullscreenButton : false, // 关闭全屏显示
	geocoder : false,	// 关闭搜索控件
	scene3DOnly: false,	// 关闭二维切换
	dataSources: null,
	clock: null,	// 关闭时针
	terrainShadows: Cesium.ShadowMode.DISABLED, // 关闭地形阴影
	imageryProviderViewModels: providerViewModels,
	terrainProviderViewModels: null,
	infoBox: false, //Disable InfoBox widget
	selectionIndicator: false, //Disable selection indicator
	shouldAnimate: true // Enable animations
});

viewer._cesiumWidget._creditContainer.style.display = "none"; // 去除水印
//扩展cesiumNavigation
viewer.extend(Cesium.viewerCesiumNavigationMixin, {
	defaultResetView : Cesium.Cartographic.fromCartesian(Cesium.Cartesian3.fromDegrees(110, 32, 20000000.1))	// 重置视图
});

var scene = viewer.scene;
var clock = viewer.clock;
var camera = viewer.camera;
var ellipsoid = viewer.scene.globe.ellipsoid; // 获取地球球体对象
scene.globe.enableLighting = true;	// 开启日光
//变焦时摄像机位置的最小幅度（米）
//scene.screenSpaceCameraController.minimumZoomDistance = 10000000.0;

// 变焦时摄像机位置的最大幅值（米）
scene.screenSpaceCameraController.maximumZoomDistance  = 40000000.0;

var camera = viewer.scene.camera;

viewer.camera.flyTo({
	destination: Cesium.Cartesian3.fromDegrees(110, 32, 20000000.1),
	duration: 5, //旋转速度 数值越大越慢
	orientation : {	// 朝北向下俯视
		heading : 0.0,
		pitch : -Cesium.Math.PI_OVER_TWO,	// 相机间距
		roll : 0.0	// 相机滚动
	}
});

//var imageryLayers = viewer.imageryLayers;	// 创建图层
//
//var p0 = new Cesium.SingleTileImageryProvider({
//    url : 'image/asset/tmp1.png'
//});
//var p1 = new Cesium.SingleTileImageryProvider({
//    url : 'image/asset/tmp2.png'
//});
//var p2 = new Cesium.SingleTileImageryProvider({
//    url : 'image/asset/tmp3.png'
//});
//var p3 = new Cesium.SingleTileImageryProvider({
//    url : 'image/asset/tmp4.png'
//});
//var p4 = new Cesium.SingleTileImageryProvider({
//    url : 'image/asset/tmp5.png'
//});
//var layer0 = imageryLayers.addImageryProvider(p0);
//var layer1 = imageryLayers.addImageryProvider(p1);
//var layer2 = imageryLayers.addImageryProvider(p2);
//var layer3 = imageryLayers.addImageryProvider(p3);
//var layer4 = imageryLayers.addImageryProvider(p4);
//layer0.alpha = 0.5;
//layer1.alpha = 0.5;
//layer2.alpha = 0.5;
//layer3.alpha = 0.5;
//layer4.alpha = 0.5;
//
//imageryLayers.raiseToTop(layer0);
//
//function clock(){
//	imageryLayers.lower(layer0);
//	imageryLayers.raiseToTop(layer1);
//}
//function clock1(){
//	imageryLayers.lower(layer1);
//	imageryLayers.raiseToTop(layer2);
//}	
//function clock2(){
//	imageryLayers.lower(layer2);
//	imageryLayers.raiseToTop(layer3);
//}	
//function clock3(){
//	imageryLayers.lower(layer3);
//	imageryLayers.raiseToTop(layer4);
//}
//function clock4(){
//	imageryLayers.lower(layer4);
//	imageryLayers.raiseToTop(layer0);
//}
//
//function start() {
//    for (var i = 0; i < 3; i++) {
//        var yin = (function (i) {
//        	var int=self.setInterval("clock()",1000);
//        	var int1=self.setInterval("clock1()",2000);
//        	var int2=self.setInterval("clock2()",3000);
//        	var int3=self.setInterval("clock3()",4000);
//        	var int4=self.setInterval("clock4()",5000);
//        })(i);
//        setTimeout(yin, 1000);
//    }
//}
//start()





