var GlobleHigh = window.GlobleHigh || {};

GlobleHigh.show = function(){
	billboards = scene.primitives.add(new Cesium.BillboardCollection());
	labels = scene.primitives.add(new Cesium.LabelCollection());
	scene.primitives.raiseToTop(billboards);
	var pixelRadius = 5;
	var bWorking, currentData;
	var bID = [];
	scene.globe.enableLighting = false; // 关闭日光
	
	function showHighMap(){
		bWorking = true;
		if(bWorking){
			currentData = getAllHigh();
			if (currentData.length != 0) {
				for (var i = 0; i < currentData.length; i++) {
					billboards.add({
						id : i,
						position : Cesium.Cartesian3
							.fromDegrees(
								currentData[i].v06001,
								currentData[i].v05001),
						image : './image/images.png',
						scaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
						width : pixelRadius * 2,
						height : pixelRadius * 2,
						color : Cesium.Color.CHARTREUSE.withAlpha(0.7)
					});
					labels.add({
						position : Cesium.Cartesian3
							.fromDegrees(
								currentData[i].v06001,
								currentData[i].v05001),
						text : '区站名：'+currentData[i].stationName,
						horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
		                verticalOrigin : Cesium.VerticalOrigin.BASELINE,
		                pixelOffset : new Cesium.Cartesian2(10.0, 15.0),
						scaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
						translucencyByDistance : new Cesium.NearFarScalar(1.5e5, 1.0, 0.3e7, 0.0),
						font : '12px sans-serif',
					});
				}
			}
			lockHandler1 = true;
		}
		if(bWorking){
			// 鼠标左键点击查看billboards属性，右键关闭billboards属性
			handler3D = new Cesium.ScreenSpaceEventHandler(scene.canvas);
			handler3D.setInputAction(function(movement) {
				if(lockHandler1){
					var pickedObject = scene.pick(movement.position);
			        if (Cesium.defined(pickedObject)&&pickedObject.id!=undefined) {
			        	if(bID.length!=0){
			        		for(var i=0; i<bID.length; i++){
					    		billboards.get(bID[i]).scale = 1.0;
					    		billboards.get(bID[i]).color = Cesium.Color.CHARTREUSE.withAlpha(0.7);
					    	}
			        	}
			        	bID.push(pickedObject.id);
			        	billboards.get(pickedObject.id).scale = 2.0;
			        	billboards.get(pickedObject.id).color = Cesium.Color.YELLOW;
			        	loadHigh(pickedObject.id);
			        }else{
			        	if(bID.length!=0){
			        		for(var i=0; i<bID.length; i++){
					    		billboards.get(bID[i]).scale = 1.0;
					    		billboards.get(bID[i]).color = Cesium.Color.CHARTREUSE.withAlpha(0.7);
					    	}
			        	}
			        }
				}
		    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		    
//		    handler.setInputAction(function(movement) {
//		    	for(var i=0; i<bID.length; i++){
//		    		billboards.get(bID[i]).scale = 1.0;
//		    	}
//		    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		}
	}
	
	showHighMap();
	function loadHigh(i){
		// var url = "http://123.57.174.98:4389";
		var stationNum = currentData[i].v01301;
		var startTime = currentData[i].startTime.substring(0, 4) + "-" + currentData[i].startTime.substring(4, 6) + "-01";
		var endTime = currentData[i].endTime.substring(0, 4) + "-" + currentData[i].endTime.substring(4, 6) + "-01";
		var stationName = currentData[i].stationName;
//		var val = currentData[i].v01301+'-'+currentData[i].startTime+'-'+currentData[i].endTime;
//		console.log(val);
		t.showzdTable('zdTable',startTime,endTime,stationNum,'',stationName);
	}
}
