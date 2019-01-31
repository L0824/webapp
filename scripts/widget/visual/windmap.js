/**
 * 风向图
 */
define(function() {
	return {
		show : function() {
			$("#divwind").show();
			
			var value = 1234567.1234567;
			var splitValue = Cesium.EncodedCartesian3.encode(value);

			function color2(color) {
				var red = parseInt(color.charAt(0) + color.charAt(1), 16) / 255.0;
				var green = parseInt(color.charAt(2) + color.charAt(3), 16) / 255.0;
				var blue = parseInt(color.charAt(4) + color.charAt(5), 16) / 255.0;

				return new Cesium.Color(red, green, blue);
			}

			function getRandomColor() {
				return "#"
						+ ("00000" + ((Math.random() * 16777215 + 0.5) >> 0)
								.toString(16)).slice(-6);
			}

			$.ajax({
				url : '../Build/SampleData/winds.json',
				success : function(data) {
					var field = [];
					var p = 0;
					for (var j = 0; j < data.ny; j++) {
						field[j] = [];
						for (var i = 0; i < data.nx; i++, p++) {
							data.data[p][0] /= data.max;
							data.data[p][1] /= data.max;
							field[j][i] = data.data[p];
						}
					}

					//var viewer = new Cesium.Viewer('cesiumContainer');
					var scene = viewer.scene;
					var widget = viewer.cesiumWidget;
					var clock = viewer.cesiumWidget.clock;
					$('#toolbar').show();
					$('#loadingbar').remove();

					var bInit = false;
					var imageryProvider = null;
					document.getElementById("chooseView").onclick = function() {
						if (bInit == false) {
							imageryProvider = new Cesium.WindMapProvider({
								url : "./images/home_banner.jpg",
								data : field,
								scene : scene,
								number : 512 * 512,
								surfaceWidth : 4096,
								surfaceHeight : 2048,
								clock : clock
							});
							var imageryLayers = viewer.imageryLayers;
							imageryLayers.addImageryProvider(imageryProvider);
							bInit = true;
						} else {
							imageryProvider.update();
						}

						/*
						 var promise1 = scene.addS3MTilesLayerByScp("http://localhost:8090/iserver/services/3D-volume/rest/realspace/datas/volume/config",{
						     name : 'srsb'
						 });
						 Cesium.when.all([promise1],function(){
						     scene.camera.setView({
						         destination: Cesium.Cartesian3.fromDegrees(113.348970, 23.151947,6378137)
						         
						     });

						     var layer = scene.layers.find("srsb");
						     var hyp = new Cesium.HypsometricSetting();

						     //创建分层设色对象   设置最大/最小可见高度   颜色表  显示模式   透明度及线宽
						     var colorTable = new Cesium.ColorTable();

						     var colorTable = new Cesium.ColorTable();
						     var height = layer._fMinValue;
						     //每隔100m向颜色表插入一个随机色
						     for(var i= 0;i<10;i++){
						         height+=i*10;
						         colorTable.insert(height,color2(getRandomColor()));
						     }

						     hyp.ColorTable = colorTable;
						     hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
						     hyp.Opacity = 1;

						     hyp.LineInterval = 10.0;

						     hyp.MaxVisibleValue = layer._fMaxValue;
						     hyp.MinVisibleValue = layer._fMinValue;

						     //设置图层分层设色属性
						     layer.HypsometricSetting = {    
						         hypsometricSetting : hyp,
						         analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
						     }
						 },function(){
						     var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
						     widget.showErrorPanel(title, undefined, e);
						 }); 
						 */
					};
				}
			});
		}
	}
})