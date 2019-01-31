var GloblePm = window.GloblePm || {};
GloblePm.canvas;
GloblePm.ctx;
var heatLayer = null;
var bHeatMap = false;
var imgData = null;
var currentData;
GloblePm.helper = null;
var circleTable = [];

GloblePm.show=function(){
	removeAll();
	//var canvas=GloblePm.canvas, ctx = GloblePm.ctx ;
	var pixelRadius = 13;
	var nWidth = 500;
	var currentRectangle, bWorking;
	
	function draw() {
		if(GloblePm.canvas != null || GloblePm.ctx != null){
			return;
		}
		GloblePm.canvas = document.createElement('canvas');
		GloblePm.canvas.width = nWidth;
		GloblePm.canvas.height = nWidth;
		GloblePm.ctx = GloblePm.canvas.getContext('2d');
		GloblePm.ctx.beginPath();
		/* 指定渐变区域 */
		var grad = GloblePm.ctx.createLinearGradient(0, 0, nWidth, 0);
		/* 指定几个颜色 */
		grad.addColorStop(0.05, 'rgb(0, 228, 0)'); // green
		grad.addColorStop(0.15, 'rgb(256, 256, 0)'); // yellow
		grad.addColorStop(0.25, 'rgb(256, 126, 0)'); // orange
		grad.addColorStop(0.35, 'rgb(256, 0, 0)'); // red
		grad.addColorStop(0.5, 'rgb(153, 0, 76)'); // purple
		grad.addColorStop(0.8, 'rgb(126, 0, 35)'); // maroon
		/* 将这个渐变设置为fillStyle */
		GloblePm.ctx.fillStyle = grad;
		/* 绘制矩形 */
		GloblePm.ctx.rect(0, 0, nWidth, nWidth);
		GloblePm.ctx.fill();
		// ctx.fillRect(0,0, 140,140);
		imgData = GloblePm.ctx.getImageData(0, 0, nWidth, 1);
	}


	function getData() {
		var points = [];
		var maxValue = 0, minValue = 0;

		for (var i = currentData.length - 1; i >= 0; i--) {
			var x = currentData[i].lon;
			var y = currentData[i].lat;
			var value = currentData[i].aqiValue;

			maxValue = Math.max(maxValue, value);
			minValue = Math.min(minValue, value);

			points.push({
				x : x,
				y : y,
				value : value
			});
		}
		var data = {
			max : maxValue,
			points : points,
			min : minValue
		};
		return data;
	}

	function getBounds() {
		var bounds = {
			north : currentRectangle.north * 180.0 / Math.PI,
			west : currentRectangle.west * 180.0 / Math.PI,
			south : currentRectangle.south * 180.0 / Math.PI,
			east : currentRectangle.east * 180.0 / Math.PI
		};
		return bounds;
	}

	function showheatmap(Cesium, CesiumHeatmap) {
		
		 var toolbar = document.getElementById("toolbar");
		 toolbar.innerHTML = ""; 
		var btn = Sandcastle.addToolbarButton('HeatMap', function() {
			var data = getData();
			var bounds = getBounds();

			var provider = createHeatmapImageryProvider(Cesium, {
				data : data,
				bounds : bounds,
				chInstance : CesiumHeatmap
			});
			var layer = viewer.imageryLayers.addImageryProvider(provider);
			viewer.entities.removeAll();
			if (heatLayer != null) {
				viewer.imageryLayers.remove(heatLayer);
				heatLayer = layer;
			} else {
				heatLayer = layer;
			}
		});

//		var viewer = new Cesium.Viewer('cesiumContainer', {
//			imageryProvider : new Cesium.SingleTileImageryProvider({
//				url : './images/2016c.jpg'
//			}),
//			baseLayerPicker : false,
//			geocoder : true
//		});

		viewer.scene.globe.depthTestAgainstTerrain = false;

		var imageryLayers = viewer.imageryLayers;

		currentRectangle = null;
		bWorking = false;

		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			}
		}
		function showPosition(position) {
			viewer.scene.camera.flyTo({
				destination : Cesium.Cartesian3.fromDegrees(
						position.coords.longitude,
						position.coords.latitude, 6378137)
			});
		}

		//getLocation();

		draw();
		var clock = viewer.cesiumWidget.clock;
		var startTimestamp, endTimestamp;
		var timeout = 1000;

		var send;

		function tick() {
			endTimestamp = (new Date).getTime();
			if (bWorking == false) {
				var localRectangle = viewer.camera.computeViewRectangle();
				if (!localRectangle.equals(currentRectangle)) {
					var bounds = localRectangle.south * 180.0 / Math.PI
							+ "," + localRectangle.west * 180.0 / Math.PI
							+ "," + localRectangle.north * 180.0 / Math.PI
							+ "," + localRectangle.east * 180.0 / Math.PI;

					function startWorker(strBounds) {
						startTimestamp = endTimestamp = (new Date)
								.getTime();
						send = new Worker("./js/pmworkers.js");
						var obj = {
							bounds : strBounds,
							imgData : imgData.data
						};
						send.postMessage(obj);
						bWorking = true;

						send.onmessage = function(event) {
							currentData = event.data.entityTable;
							var currentDate = event.data.date;
							if (currentData.length != 0
									&& currentDate > startTimestamp) {
								viewer.entities.removeAll();
								for (var i = currentData.length - 1; i >= 0; i--) {
									var color = new Cesium.Color(
											currentData[i].color.red,
											currentData[i].color.green,
											currentData[i].color.blue, 1.0);

									viewer.entities
											.add({
												position : Cesium.Cartesian3
														.fromDegrees(
																currentData[i].lon,
																currentData[i].lat),
												billboard : {
													image : './images/images.png',
													width : pixelRadius * 2,
													height : pixelRadius * 2,
													color : color
												},
												name : currentData[i].name,
												description : currentData[i].description
											});

									/*viewer.entities.add({
										position : Cesium.Cartesian3.fromDegrees(currentData[i].lon, currentData[i].lat,100),
										point : {
											show : true, // default
											color : color, // default: WHITE
											pixelSize : 25, // default: 1
											outlineColor : Cesium.Color.YELLOW, // default: BLACK
											outlineWidth : 0 // default: 0
										},
										name:currentData[i].name,
										description:currentData[i].description
									});
									var imgCircle = circleTable[currentData[i].aqiValue];
									if(imgCircle == null){								
										var circleCanvas = document.createElement('canvas');
										circleCanvas.width = pixelRadius * 2;
										circleCanvas.height = pixelRadius * 2;
										circleCtx = circleCanvas.getContext('2d');
										circleCtx.fillStyle = "#ffffff00";
										circleCtx.globalAlpha = 0.0;
										
										circleCtx.fillRect(0, 0, pixelRadius*2, pixelRadius*2);
										
										var r = imgData.data[currentData[i].aqiValue*4];
										var g = imgData.data[currentData[i].aqiValue*4+1];
										var b = imgData.data[currentData[i].aqiValue*4+2];
										
										circleCtx.globalAlpha = 1.0;
										circleCtx.beginPath();
										circleCtx.arc(pixelRadius, pixelRadius, pixelRadius, 0, Math.PI * 2, true);
										circleCtx.closePath();
										var strColor = 'rgb('+r+','+g+','+b+')';
										circleCtx.fillStyle = strColor;
										circleCtx.fill();
										
										imgCircle = circleTable[currentData[i].aqiValue] = circleCanvas;									
									}
									viewer.entities.add({
										position : Cesium.Cartesian3.fromDegrees(currentData[i].lon, currentData[i].lat),
										billboard : {
											image : imgCircle.toDataURL(), // default: undefined
											show : true										
										},
										name:currentData[i].name,
										description:currentData[i].description
									});
									 */
								}

								currentRectangle = localRectangle;
							}

							bWorking = false;
							send.terminate();
						};
					}

					startWorker(bounds);
				}
			} else if (endTimestamp - startTimestamp > timeout) {
				bWorking = false;
				timeout += 1000;
				send.terminate();
			}
		}
		if(GloblePm.helper == null){			
			GloblePm.helper = new Cesium.EventHelper();
			GloblePm.helper.add(clock.onTick, tick,this);
		}
		
	}
	
	showheatmap(Cesium,ccesiumHeatmap)
}
