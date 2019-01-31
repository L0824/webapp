var GlobleLand = window.GlobleLand || {};

GlobleLand.show = function(time, hour){
	billboards = scene.primitives.add(new Cesium.BillboardCollection());
	labels = scene.primitives.add(new Cesium.LabelCollection());
	scene.primitives.raiseToTop(billboards);
	var pixelRadius = 5;
	var bWorking, currentData;
	var bID = [];
	scene.globe.enableLighting = false; // 关闭日光
	
	// 风向角度换算
	function getDegreeConvertWindSp(degree){
		if(degree>=348.76&&degree<=360||degree>=0&&degree<=11.25){
			return '北';
		}else if(degree>=11.26&&degree<=33.75){
			return '东北偏东';
		}else if(degree>=33.76&&degree<=56.25){
			return '东北';
		}else if(degree>=56.26&&degree<=78.75){
			return '东北偏北';
		}else if(degree>=78.76&&degree<=101.25){
			return '东';
		}else if(degree>=101.26&&degree<=123.75){
			return '东南偏南';
		}else if(degree>123.76&&degree<=146.25){
			return '东南';
		}else if(degree>=146.26&&degree<=168.75){
			return '东南偏东';
		}else if(degree>=168.76&&degree<=191.25){
			return '南';
		}else if(degree>=191.26&&degree<=213.75){
			return '西南偏西';
		}else if(degree>=213.76&&degree<=236.25){
			return '西南';
		}else if(degree>=236.26&&degree<=258.75){
			return '西南偏南';
		}else if(degree>=258.76&&degree<=281.25){
			return '西';
		}else if(degree>=281.26&&degree<=303.75){
			return '西北偏北';
		}else if(degree>=303.76&&degree<=326.75){
			return '西北';
		}else if(degree>=326.76&&degree<=348.75){
			return '西北偏西';
		}else{
			return '无';
		}
	}
	
	function showLandMap(){
		bWorking = true;
		if(bWorking){
			currentData = getLandByTime(time, hour);
			if (currentData.length != 0) {
				for (var i = 0; i < currentData.length; i++) {
					billboards.add({
						id : i,
						position : Cesium.Cartesian3
							.fromDegrees(
								currentData[i].V06001,
								currentData[i].V05001),
						image : './image/images.png',
						scaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
						width : pixelRadius * 2,
						height : pixelRadius * 2,
						color : Cesium.Color.CHARTREUSE.withAlpha(0.7)
					});
					labels.add({
						position : Cesium.Cartesian3
							.fromDegrees(
								currentData[i].V06001,
								currentData[i].V05001),
						text : '区站号：'+currentData[i].V01300,
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
			        	loadLand(pickedObject.id);
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
		}
	}
	function getHumidity(h){
		if(h!=999999){
			return (h*0.01).toFixed(2);
		}else{
			return h;
		}
	}
	
	showLandMap();
	function loadLand(i){
		var data = {
			stationInfo: [
				{value: currentData[i].V01300, name: '区站号'},
				{value: currentData[i].V05001+'°', name: '纬度'},
				{value: currentData[i].V06001+'°', name: '经度'},
				{value: currentData[i].V07001+'m', name: '测站高度'}
			],
			stationElements: [
				{value: currentData[i].V12001+'℃', name: '平均温度', class: 'layui-col-md6'},
				{value: currentData[i].V12003+'℃', name: '露点温度', class: 'layui-col-md6'},
				{value: getHumidity(currentData[i].V13003)+'%', name: '相对湿度', class: 'layui-col-md6'},
				{value: currentData[i].V10051+'hpa', name: '海平面气压', class: 'layui-col-md6'},
				{value: getDegreeConvertWindSp(currentData[i].V11001), name: '风向', class: 'layui-col-md6'},
				{value: currentData[i].V11002+'m/s', name: '风速', class: 'layui-col-md6'},
				
				{value: currentData[i].V13019+'mm', name: '过去1小时降水量', class: 'layui-col-md12'},
				{value: currentData[i].V13020+'mm', name: '过去3小时降水量', class: 'layui-col-md12'},
				{value: currentData[i].V13021+'mm', name: '过去6小时降水量', class: 'layui-col-md12'},
				{value: currentData[i].V13022+'mm', name: '过去12小时降水量', class: 'layui-col-md12'},
				{value: currentData[i].V13023+'mm', name: '过去24小时降水量', class: 'layui-col-md12'},
				{value: currentData[i].V12014+'℃', name: '过去12小时最高气温', class: 'layui-col-md12'},
				{value: currentData[i].V12015+'℃', name: '过去12小时最低气温', class: 'layui-col-md12'},
				{value: currentData[i].V12016+'℃', name: '过去24小时最高气温', class: 'layui-col-md12'},
				{value: currentData[i].V12017+'℃', name: '过去24小时最低气温', class: 'layui-col-md12'}
			]
		}
		var params = JSON.stringify(data);
		t.getGWInfo(params);
	}
}
