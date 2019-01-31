var GlobleNcScpdsi = window.GlobleNcScpdsi || {};

GlobleNcScpdsi.show = function(time) {
	var currentData;
	// 创建画布
	canvasScpdsi = document.createElement('canvas');
	canvasScpdsi.id = "canvasScpdsi";
	canvasScpdsi.width = map.getSize()[0];
	canvasScpdsi.height = map.getSize()[1];
	canvasScpdsi.style.position = 'absolute';
	canvasScpdsi.style.top = 0;
	canvasScpdsi.style.left = 0;
	canvasScpdsi.zIndex = 9999;
	map.getViewport().appendChild(canvasScpdsi);
	
	// 获取数据
	currentData = getNcScpdsi(time);
	
	function drawCvScpdsi(){
		canvasBoole = true;
		canvasScpdsi.style.display='block';
		canvasScpdsi.width = canvasScpdsi.width;
		var ctx = canvasScpdsi.getContext("2d");
		if(currentData.length!=0){
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
					ctx.beginPath();
					ctx.globalAlpha = 0.5;
					var r = (map.getView().getZoom() / 4)*4;
					ctx.arc(sx, sy, r, 0, 2 * Math.PI, false);
					ctx.fillStyle = setColor(currentData[i].scpdsi);
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}
	
	function setColor(value){
		var text = "#FFFFFF";
		if (value > -2.0 && value <= -1.0) {
			text = "#FFFF8B";
		} else if (value > -3.0 && value <= -2.0) {
			text = "#FF9632";
		} else if (value > -4.0 && value <= -3.0) {
			text = "#FF0001";
		} else if (value <= -4.0) {
			text = "#6F0015";
		} else {
			text = "#FFFFFF";
		}
		return text;
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
	
	drawCvScpdsi();
	showNcLegend(); // 调用图例
	moveendListener = function(){
		drawCvScpdsi();
	}
	map.on("moveend", moveendListener);
}