var GlobleNcScpdsi = window.GlobleNcScpdsi || {};

GlobleNcScpdsi.show = function(time) {
	billboards = scene.primitives.add(new Cesium.BillboardCollection());
//	labels = scene.primitives.add(new Cesium.LabelCollection());
	var pixelRadius = 8;
	var bWorking, currentData, handlerSc;
	var bID = [];
	
	function showncmap() {
		bWorking = true;

		function getDryText(value) {
			var text = "无";
			if (value > -2.0 && value <= -1.0) {
				text = "轻旱";
			} else if (value > -3.0 && value <= -2.0) {
				text = "中旱";
			} else if (value > -4.0 && value <= -3.0) {
				text = "重旱";
			} else if (value <= -4.0) {
				text = "特旱";
			} else {
				text = "正常";
			}
			return text;
		}
		function getDryColor(val) {
			var col;
			if (val == "轻旱") {
				col = new Cesium.Color.fromCssColorString('#FFFF8B').withAlpha(0.5);
			} else if (val == "中旱") {
				col = new Cesium.Color.fromCssColorString('#FF9632').withAlpha(0.5);
			} else if (val == "重旱") {
				col = new Cesium.Color.fromCssColorString('#FF0001').withAlpha(0.5);
			} else if (val == "特旱") {
				col = new Cesium.Color.fromCssColorString('#6F0015').withAlpha(0.5);
			} else if (val == "正常") {
				col = new Cesium.Color.fromCssColorString('#FFFFFF').withAlpha(0.5);
			}
			return col;
		}
		// nc干旱图例
		function showNcLegend(){
			var length = GcGateConfig.dataConfig["ncLegendColor"].length;
			var innerHtml = "<div class='legendTitle'><span>图  例</span></div><div class='legendContent' style='margin:5px;'><table>";
			for(var i=0; i<length; i++){
				innerHtml += "<tr><td class='legendItemHeader'>"+GcGateConfig.dataConfig["ncLegendColor"][i].dec
				+"</td><td class='legendItemValue' style='background:"+ GcGateConfig.dataConfig["ncLegendColor"][i].color +";width:15px;height:15px'></td>";
			}
			innerHtml += "</table></div>";
			$("#ncLegend").html(innerHtml);
			$("#ncLegend").css('display', 'block');
		}

		function tick() {
			if (bWorking) {
				function startWorker() {
					currentData = getNcScpdsi(time);
//					currentData = getNcTa();
					if (currentData.length != 0) {
						for (var i = 0; i < currentData.length; i++) {
							var val = getDryText(currentData[i].scpdsi)
							var color = getDryColor(val);
							billboards.add({
								id : val,
								position : Cesium.Cartesian3
									.fromDegrees(
										currentData[i].lon,
										currentData[i].lat),
								image : './image/images.png',
								scaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
								width : pixelRadius * 1,
								height : pixelRadius * 1,
								color : color
							});
//							labels.add({
//								id : i,
//								show : false,	
//								position : Cesium.Cartesian3
//									.fromDegrees(
//										currentData[i].lon,
//										currentData[i].lat),
//								text : val,
//								font: '14px monospace',
//								fillColor: Cesium.Color.CHARTREUSE,
//								horizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
//			                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//			                    pixelOffset: new Cesium.Cartesian2(-10, -10)
//							});
//							viewer.entities
//									.add({
//										position : Cesium.Cartesian3
//												.fromDegrees(
//														currentData[i].lon,
//														currentData[i].lat),
//										billboard : {
//											image : './image/images.png',
//											width : pixelRadius * 0.5,
//											height : pixelRadius * 0.5,
//											color : color
//										},
//										name : "全球干旱等级",
//										description : val
//									});
						}
					}
				}
				startWorker();
			}
		}
		if (bWorking) {
			tick();
			scene.globe.enableLighting = false; // 关闭日光
			showNcLegend(); // 调用图例
			bWorking = false;
			if(bWorking){
				// 鼠标左键点击查看billboards属性，右键关闭billboards属性
				handlerSc = new Cesium.ScreenSpaceEventHandler(scene.canvas);
				handlerSc.setInputAction(function(movement) {
			        var pickedObject = scene.pick(movement.position);
			        if (Cesium.defined(pickedObject)) {
			        	bID.push(pickedObject.id);
			        	billboards.get(pickedObject.id).scale = 2.0;
			        	labels.get(pickedObject.id).show = true;
			        }
			    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
			    
				handlerSc.setInputAction(function(movement) {
			    	for(var i=0; i<bID.length; i++){
			    		billboards.get(bID[i]).scale = 1.0;
			        	labels.get(bID[i]).show = false;
			    	}
			    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
			}
			lockHandler = true;
			customPop();
		}
	}
	showncmap();
}
