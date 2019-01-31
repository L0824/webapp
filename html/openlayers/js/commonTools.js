/**
通用工具
 */
var CommonTool = window.CommonTool || {};

//清空地图
CommonTool.clearMap = function() {
	
	map.getOverlays().clear();
	map.un('click', mapClick);
	$("#ncLegend").html("");
	$("#ncLegend").css('display', 'none');

	if(fireLayer!=null){
		map.removeLayer(fireLayer);
	}
	
	if(fy3Layer!=null){
		map.removeLayer(fy3Layer);
	}
	
	if(vector!=null){
		map.removeLayer(vector);
	}
	
	if(scpdsiVector!=null){
		scpdsiVector.getSource().clear(true);
		map.removeLayer(scpdsiVector);
	}
	
	if(canvasBoole){
		map.un("moveend", moveendListener);
		canvasScpdsi.width = canvasScpdsi.width;
		canvasScpdsi.style.display='none';
		canvasBoole = false;
	}
	
	if(canvasTa!=null){
		canvasTa.width = canvasTa.width;
		canvasTa.style.display='none';
	}
	
	if(highVector!=null){
		highVector.getSource().clear(true);
		map.removeInteraction(pointerMove);
		map.removeInteraction(clickSelect);
		map.removeLayer(highVector);
	}
	
	if(landVector!=null){
		landVector.getSource().clear(true); // 清除feature
		map.removeInteraction(pointerMove);
		map.removeInteraction(clickSelect);
		map.removeLayer(landVector);
	}
	
	if(windy){
		map.un("moveend", moveendListener);
	    windy.stop();
	    canvas.style.display='none';
	}
	
	if(overlay){
		map.removeOverlay(overlay);
	}
		
}

//地图打印
CommonTool.printMap = function() {
	map.once('postcompose', function(event) {
		var canvas = event.context.canvas;
		if (navigator.msSaveBlob) {
			navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
		} else {
			canvas.toBlob(function(blob) {
				saveAs(blob, 'map.png');
			});
		}
	});
	map.renderSync();
}

//距离测量
CommonTool.lineMeasure = function() {

}

//面积测量
CommonTool.lineMeasure = function() {

}