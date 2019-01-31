var GlobleNcHeight = window.GlobleNcHeight || {};
GlobleNcHeight.show = function(time, airPressure, dirHeight) {
	billboards = scene.primitives.add(new Cesium.BillboardCollection());
	var pixelRadius = 12;
	var bWorking, currentData;
	var bID = [];
	
	function showncmap() {
		bWorking = true;

		function tick() {
			if (bWorking) {
				function startWorker() {
					currentData = getNcHeight(time, airPressure, dirHeight);
					if (currentData.length != 0) {
						for (var i = 0; i < currentData.length; i++) {
							billboards.add({
								id : currentData[i].height + 'm',
								position : Cesium.Cartesian3
									.fromDegrees(
										currentData[i].lon,
										currentData[i].lat),
								image : './image/images.png',
								scaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
								width : pixelRadius * 2,
								height : pixelRadius * 2,
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
