var GlobleNcWind = window.GlobleNcWind || {};
GlobleNcWind.show = function(time, airPressure, dirWind) {
	var currentData;
	var uData = [], vData = [];
	// 获取uv风数据
//	currentData = getNc2dWind(time, airPressure, dirWind);
//	currentData = idwcomputer(resultData.sourceList, resultData.resultList);
//	currentData = getNcWind(time, airPressure, dirWind);
//	if(currentData.length!=0){
//		for(var i=0; i<currentData.length; i++){
//			if(i!=currentData.length-1){
//                var interpolate = d3.interpolateNumber(currentData[i].uWind, currentData[i+1].uWind);
//                uData.push(interpolate(0));
//                uData.push(interpolate(0.0126));
//                uData.push(interpolate(0.0252));
//                uData.push(interpolate(0.0378));
//                uData.push(interpolate(0.0504));
//                uData.push(interpolate(0.073));
//                uData.push(interpolate(0.0856));
//                uData.push(interpolate(1));
//                var interpolate1 = d3.interpolateNumber(currentData[i].vWind, currentData[i+1].vWind);
//                vData.push(interpolate1(0));
//                vData.push(interpolate(0.0126));
//                vData.push(interpolate(0.0252));
//                vData.push(interpolate(0.0378));
//                vData.push(interpolate(0.0504));
//                vData.push(interpolate(0.073));
//                vData.push(interpolate(0.0856));
//                vData.push(interpolate1(1));
//            }
//			uData.push(currentData[i].uWind);
//			vData.push(currentData[i].vWind);
//		}
//	}
//	var testJson = {"uData":uData,"vData":vData}
//	var blob = new Blob([JSON.stringify(testJson)], { type: "" });
//	saveAs(blob, "hello.json");
	
	//创建canvas
	canvas = document.createElement('canvas');
	canvas.id = "canvas";
	canvas.width = map.getSize()[0];
	canvas.height = map.getSize()[1];
	canvas.style.position = 'absolute';
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.zIndex = 9999;
	map.getViewport().appendChild(canvas);
//	map.getView().on('propertychange',function(){
//	    windy.stop();
//	    canvas.style.display='none';
//	});
	moveendListener = function(){
		windy.stop();
	    drawWind();
	}
	map.on("moveend", moveendListener);
	//获取数据
	var xhr=new XMLHttpRequest();
	xhr.open('get','./openlayers/js/nc/gfs.json');
	xhr.send();
	xhr.onreadystatechange=function () {
	    if(xhr.readyState==4&&xhr.status==200){
	        var result=JSON.parse(xhr.responseText);
//	        result[0].data = uData;
//	        result[1].data = vData;
//	        result[0].header.nx = 128;
//	        result[0].header.ny = 64;
//	        result[1].header.nx = 128;
//	        result[1].header.ny = 64;
	        windy = new Windy({canvas: canvas, data: result });
	        drawWind();
	    }
	};
	function drawWind() {
	    canvas.style.display='block';
	    if(!windy) {
	        return;
	    }
	    windy.stop();
	    var mapsize = map.getSize();
	    var extent = map.getView().calculateExtent(mapsize);
	    extent = ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');

	    canvas.width = mapsize[0];
	    canvas.height = mapsize[1];

	    windy.start(
	        [[0,0], [canvas.width, canvas.height]],
	        canvas.width,
	        canvas.height,
	        [[extent[0], extent[1]],[extent[2], extent[3]]]
	    );
	}
	
	// idw算法
	function idwcomputer(datas,result){
		   if(datas.lenght<3) return result;
		   var m0=datas.length;
		   var m1=result.length;
		   
		   //console.info(datas);
		   
		   //距离列表
		   var r=[];
		   
		   for(var i=0;i<m1;i++){
		       for(var j=0;j<m0;j++){
		             var tmpDis = Math.sqrt(Math.pow(result[i].lon - datas[j].lon, 2) + Math.pow(result[i].lat - datas[j].lat, 2));
		             r.push(tmpDis);
		       }
		   }
		   
		   //插值函数

		   for (var i = 0; i < m1; i++)
		   {
		       //查找重复
		       var ifFind = false;
		       for (var j = m0 * i; j < m0 * i + m0; j++)
		       {
		           if (Math.abs(r[j]) < 0.0001)
		           {
		               result[i].uWind = datas[j - m0 * i].uWind;
		               result[i].vWind = datas[j - m0 * i].vWind;
		               ifFind = true;
		               break;
		           }
		       }

		       if (ifFind) continue;

		       var Unumerator = 0;
		       var Udenominator = 0;
		       var Vnumerator = 0;
		       var Vdenominator = 0;

		       for (var j = m0 * i; j < m0 * i + m0; j++)
		       {
		    	   Unumerator += datas[j - m0 * i].uWind / (r[j] * r[j]);
		    	   Udenominator += 1 / (r[j] * r[j]);
		    	   Vnumerator += datas[j - m0 * i].vWind / (r[j] * r[j]);
		    	   Vdenominator += 1 / (r[j] * r[j]);
		       }
		     
		       result[i].uWind = Unumerator / Udenominator;
		       result[i].vWind = Vnumerator / Vdenominator;
		   }
		   return result;

		}
}