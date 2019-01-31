var GlobleNcTa = window.GlobleNcTa || {};
GlobleNcTa.show = function(time, airPressure, dirTa) {
	billboards = scene.primitives.add(new Cesium.BillboardCollection());
	var pixelRadius = 12;
	var bWorking, currentData;
	var bID = [];
	
	function showncmap() {
		bWorking = true;
		// 获取填充颜色
		function getDryColor(val) {
			var col;
			var length = GcGateConfig.dataConfig["airTemLegendColor"].length;
			for(var i=0; i<length; i++){
				if(GcGateConfig.dataConfig["airTemLegendColor"][i].valStart<val&&
						val<=GcGateConfig.dataConfig["airTemLegendColor"][i].valEnd){
					var red = GcGateConfig.dataConfig["airTemLegendColor"][i].colorR;
					var green = GcGateConfig.dataConfig["airTemLegendColor"][i].colorG;
					var blue = GcGateConfig.dataConfig["airTemLegendColor"][i].colorB;
					var alpha = 127.5;
					col = new Cesium.Color.fromBytes(red, green, blue, alpha);
					break;
				}else{
					col = new Cesium.Color.fromBytes(255, 255, 255, alpha);
				}
			}
			return col;
		}
		// nc大气温度图例
		function showNcTaLegend(){
			var length = GcGateConfig.dataConfig["airTemLegendColor"].length;
			var innerHtml = "<div class='legendTitle'><span>图  例</span></div><div class='legendContent' style='margin:1px;'><table>";
			for(var i=0; i<length; i++){
				var rgb = "RGB(" + GcGateConfig.dataConfig["airTemLegendColor"][i].colorR +","
		 			+GcGateConfig.dataConfig["airTemLegendColor"][i].colorG +"," 
		 			+GcGateConfig.dataConfig["airTemLegendColor"][i].colorB+")";
				innerHtml += "<tr><td class='legendItemHeader' style='font-size:3px'>"
					+GcGateConfig.dataConfig["airTemLegendColor"][i].valStart+"~"+GcGateConfig.dataConfig["airTemLegendColor"][i].valEnd
					+"</td><td class='legendItemValue' style='background:"+ rgb +";width:15px;height:3px'></td>";
			}
			innerHtml += "</table></div>";
			$("#ncTaLegend").html(innerHtml);
			$("#ncTaLegend").css('display', 'block');
		}

		function tick() {
			if (bWorking) {
				function startWorker() {
					currentData = getNcTa(time, airPressure, dirTa);
					if (currentData.length != 0) {
						for (var i = 0; i < currentData.length; i++) {
							var color = getDryColor(currentData[i].tmp);
							billboards.add({
								id : currentData[i].tmp + '℃',
								position : Cesium.Cartesian3
									.fromDegrees(
										currentData[i].lon,
										currentData[i].lat),
								image : './image/images.png',
								scaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
								width : pixelRadius * 2,
								height : pixelRadius * 2,
								color : color
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
			showNcTaLegend(); // 调用图例
			bWorking = false;
			lockHandler = true;
			customPop();
		}
	}
	showncmap();
}
