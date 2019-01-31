var GlobleNcTa = window.GlobleNcTa || {};
GlobleNcTa.show = function(time, airPressure, dirTa) {
	var currentData;
	
	// 创建画布
	canvasTa = document.createElement('canvas');
	canvasTa.id = "canvasTa";
	canvasTa.width = map.getSize()[0];
	canvasTa.height = map.getSize()[1];
	canvasTa.style.position = 'absolute';
	canvasTa.style.top = 0;
	canvasTa.style.left = 0;
	canvasTa.zIndex = 9999;
	map.getViewport().appendChild(canvasTa);
	
	// 获取数据
	currentData = getNcTa(time, airPressure, dirTa);
	
	function drawTa(){
		var mapsize = map.getSize();
		var points = [];
	
		for(var i=0; i<currentData.length; i++){
			var mapPt = new ol.geom.Point(ol.proj.transform(
					[currentData[i].lon,currentData[i].lat], 
					'EPSG:4326', 'EPSG:3857'));
			var resolution = map.getView().getResolution();
			var center = map.getView().getCenter();
			var w = map.getSize()[0], h = map.getSize()[1];
			var sx=w/2+((mapPt.A[0]-center[0])/resolution+0.5);
			var sy=h/2-((mapPt.A[1]-center[1])/resolution+0.5);
			if(sx>0&&sy>0){
				points.push({ x: sx, y: sy, value: currentData[i].tmp });
			}
		}
		
		var ctx = canvasTa.getContext("2d");
		var drw = new TemperatureMap(ctx);
		drw.setRandomPoints(points, canvasTa.width, canvasTa.height);
		drw.drawLow(50, 80, false, function () {  });
	}
	drawTa();
	
	moveendListener = function(){
		drawTa();
	}
	map.on("moveend", moveendListener);
}