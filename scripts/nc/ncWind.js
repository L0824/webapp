var GlobleNcWind = window.GlobleNcWind || {};
GlobleNcWind.show = function(time, airPressure, dirWind) {
	billboards = scene.primitives.add(new Cesium.BillboardCollection());
	var pixelRadius = 12;
	var bWorking, currentData;
	var bID = [];
	
	function showncmap() {
		bWorking = true;
		
		// 风向角度换算
		function DegreeConvertWindSp(degree){
			if(degree>=348.76&&degree<=360||degree>=0&&degree<=11.25){
				return ['北', './image/fx-S.png'];
			}else if(degree>=11.26&&degree<=33.75){
				return ['东北偏东', './image/fx-W.png'];
			}else if(degree>=33.76&&degree<=56.25){
				return ['东北', './image/fx-W.png'];
			}else if(degree>=56.26&&degree<=78.75){
				return ['东北偏北', './image/fx-W.png'];
			}else if(degree>=78.76&&degree<=101.25){
				return ['东', './image/fx-N.png'];
			}else if(degree>=101.26&&degree<=123.75){
				return ['东南偏南', './image/fx-E.png'];
			}else if(degree>123.76&&degree<=146.25){
				return ['东南', './image/fx-E.png'];
			}else if(degree>=146.26&&degree<=168.75){
				return ['东南偏东', './image/fx-E.png'];
			}else if(degree>=168.76&&degree<=191.25){
				return ['南', './image/fx-S.png'];
			}else if(degree>=191.26&&degree<=213.75){
				return ['西南偏西', './image/fx-W.png'];
			}else if(degree>=213.76&&degree<=236.25){
				return ['西南', './image/fx-W.png'];
			}else if(degree>=236.26&&degree<=258.75){
				return ['西南偏南', './image/fx-W.png'];
			}else if(degree>=258.76&&degree<=281.25){
				return ['西', './image/fx-N.png'];
			}else if(degree>=281.26&&degree<=303.75){
				return ['西北偏北', './image/fx-E.png'];
			}else if(degree>=303.76&&degree<=326.75){
				return ['西北', './image/fx-E.png'];
			}else if(degree>=326.76&&degree<=348.75){
				return ['西北偏西', './image/fx-E.png'];
			}
		}
		
		function tick() {
			if (bWorking) {
				function startWorker() {
					currentData = getNcWind(time, airPressure, dirWind);
					if (currentData.length != 0) {
						for (var i = 0; i < currentData.length; i++) {
							var fx = DegreeConvertWindSp(currentData[i].windDir);
							billboards.add({
								id : currentData[i].windSpeed + 'm/s' + ';' + fx[0] + '风',
								position : Cesium.Cartesian3
									.fromDegrees(
										currentData[i].lon,
										currentData[i].lat),
								image : fx[1],
								scaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
								width : pixelRadius * 3,
								height : pixelRadius * 3,
								rotation : Cesium.Math.toRadians(currentData[i].windDir),
								color : Cesium.Color.WHITE.withAlpha(0.5)
							});
						}
					}
				}
				startWorker();
			}
		}
		if (bWorking) {
			tick();
			scene.globe.enableLighting = false; // 关闭日光
			bWorking = false;
			lockHandler = true;
			customPop();
		}
	}
	showncmap();
}
