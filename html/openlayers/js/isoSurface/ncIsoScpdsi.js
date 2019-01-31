/*
 * openlayers3展示geotools生成的全球干旱等值面
 */
var GlobleNcIsoScpdsi = window.GlobleNcIsoScpdsi || {};
var vector;
GlobleNcIsoScpdsi.show = function() {
	
//	var currentData = getNcScpdsiIso();
	
//	var isFirst=true;//是否第一次加载该canvas图层
//	var canvasOption=new Object();
//	//ImageCanvas有一个canvasFunction属性
//	//通过查看源代码，发现该属性其实是一个回调函数，需要对该函数进行实现，从而创建一个canvas
//	//创建回调函数如下
//	canvasOption.canvasFunction=function(extent, resolution, pixelRatio, size, projection){
//		if(isFirst)//这里必须要做一个判断，每次的范围变动都会引起重绘，从而触发该回调函数，不判断的话，将会导致canvas无法被绘制到地图上，出现闪现的情况
//		{
//			isFirst=false;
//			var canvas=document.createElement('canvas');
//			canvas.width=513;
//			canvas.height=456;
//			
//			var i, j, k, n ;  
//		    n = points.length;  
//		    var t = Array(n);  
//		    var x = Array(n);  
//		    var y = Array(n); 
//		    
//		    for(i = 0;i < n ; i++){  
//		        t[i] = points[i].attributes.TN_;  
//		        x[i] = points[i].geometry.x;  
//		        y[i] = points[i].geometry.y; 
//		    }
//		    
//		    var variogram = kriging.train(t, x, y, "exponential", 0, 10);  
//		    
//		    var width = 0.0005; 
//		    
//		    var colors = ["#00A600", "#01A600", "#03A700", "#04A700", "#05A800", "#07A800", "#08A900", "#09A900", "#0BAA00", "#0CAA00", "#0DAB00", "#0FAB00", "#10AC00", "#12AC00", "#13AD00", "#14AD00", "#16AE00", "#17AE00", "#19AF00", "#1AAF00", "#1CB000", "#1DB000", "#1FB100", "#20B100", "#22B200", "#23B200", "#25B300", "#26B300", "#28B400", "#29B400", "#2BB500", "#2CB500", "#2EB600", "#2FB600", "#31B700", "#33B700", "#34B800", "#36B800", "#37B900", "#39B900", "#3BBA00", "#3CBA00", "#3EBB00", "#3FBB00", "#41BC00", "#43BC00", "#44BD00", "#46BD00", "#48BE00", "#49BE00", "#4BBF00", "#4DBF00", "#4FC000", "#50C000", "#52C100", "#54C100", "#55C200", "#57C200", "#59C300", "#5BC300", "#5DC400", "#5EC400", "#60C500", "#62C500", "#64C600", "#66C600", "#67C700", "#69C700", "#6BC800", "#6DC800", "#6FC900", "#71C900", "#72CA00", "#74CA00", "#76CB00", "#78CB00", "#7ACC00", "#7CCC00", "#7ECD00", "#80CD00", "#82CE00", "#84CE00", "#86CF00", "#88CF00", "#8AD000", "#8BD000", "#8DD100", "#8FD100", "#91D200", "#93D200", "#95D300", "#97D300", "#9AD400", "#9CD400", "#9ED500", "#A0D500", "#A2D600", "#A4D600", "#A6D700", "#A8D700", "#AAD800", "#ACD800", "#AED900", "#B0D900", "#B2DA00", "#B5DA00", "#B7DB00", "#B9DB00", "#BBDC00", "#BDDC00", "#BFDD00", "#C2DD00", "#C4DE00", "#C6DE00", "#C8DF00", "#CADF00", "#CDE000", "#CFE000", "#D1E100", "#D3E100", "#D6E200", "#D8E200", "#DAE300", "#DCE300", "#DFE400", "#E1E400", "#E3E500", "#E6E600", "#E6E402", "#E6E204", "#E6E105", "#E6DF07", "#E6DD09", "#E6DC0B", "#E6DA0D", "#E6D90E", "#E6D710", "#E6D612", "#E7D414", "#E7D316", "#E7D217", "#E7D019", "#E7CF1B", "#E7CE1D", "#E7CD1F", "#E7CB21", "#E7CA22", "#E7C924", "#E8C826", "#E8C728", "#E8C62A", "#E8C52B", "#E8C42D", "#E8C32F", "#E8C231", "#E8C133", "#E8C035", "#E8BF36", "#E9BE38", "#E9BD3A", "#E9BC3C", "#E9BB3E", "#E9BB40", "#E9BA42", "#E9B943", "#E9B945", "#E9B847", "#E9B749", "#EAB74B", "#EAB64D", "#EAB64F", "#EAB550", "#EAB552", "#EAB454", "#EAB456", "#EAB358", "#EAB35A", "#EAB35C", "#EBB25D", "#EBB25F", "#EBB261", "#EBB263", "#EBB165", "#EBB167", "#EBB169", "#EBB16B", "#EBB16C", "#EBB16E", "#ECB170", "#ECB172", "#ECB174", "#ECB176", "#ECB178", "#ECB17A", "#ECB17C", "#ECB17E", "#ECB27F", "#ECB281", "#EDB283", "#EDB285", "#EDB387", "#EDB389", "#EDB38B", "#EDB48D", "#EDB48F", "#EDB591", "#EDB593", "#EDB694", "#EEB696", "#EEB798", "#EEB89A", "#EEB89C", "#EEB99E", "#EEBAA0", "#EEBAA2", "#EEBBA4", "#EEBCA6", "#EEBDA8", "#EFBEAA", "#EFBEAC", "#EFBFAD", "#EFC0AF", "#EFC1B1", "#EFC2B3", "#EFC3B5", "#EFC4B7", "#EFC5B9", "#EFC7BB", "#F0C8BD", "#F0C9BF", "#F0CAC1", "#F0CBC3", "#F0CDC5", "#F0CEC7", "#F0CFC9", "#F0D1CB", "#F0D2CD", "#F0D3CF", "#F1D5D1", "#F1D6D3", "#F1D8D5", "#F1D9D7", "#F1DBD8", "#F1DDDA", "#F1DEDC", "#F1E0DE", "#F1E2E0", "#F1E3E2", "#F2E5E4", "#F2E7E6", "#F2E9E8", "#F2EBEA", "#F2ECEC", "#F2EEEE", "#F2F0F0", "#F2F2F2"];
//		    
//		 // Plot grid  
//	        var grid = kriging.grid(world, variogram, width);  
//	        //  
//	        kriging.plot(canvas, grid, [113.220276, 113.476929], [29.737915, 29.965698], colors);
//				
////			var context = canvas.getContext('2d');
//		      
////		        context.fillStyle = "blue";
////		        context.fillRect(100,100,1000,1000);
//			return canvas;
//		}
//	};
//	//为ImageCanvasLayer创建数据源
//	var imageCanvas=new ol.source.ImageCanvas(canvasOption);
//	//创建一个ImageCanvasLayer图层
//	var imageCanvasLayer=new ol.layer.Image({
//			source:imageCanvas
//		});
//	map.addLayer(imageCanvasLayer);
//	var result = $.parseJSON(getNcScpdsiIso());
//	var features = (new ol.format.GeoJSON()).readFeatures(result);
//	var vectorSource = new ol.source.Vector();
//	vectorSource.addFeatures(features);
//	vector = new ol.layer.Vector({
//		extent: [-180,-60,180,80],
//		source: vectorSource,
//		style:function(feature, resolution) {
//			var lvalue = feature.get("lvalue"), color = "0,0,0,0";
////			var length = GcGate2DConfig.ncColor["airTemLegendColor"].length;
////			for(var i=0; i<length; i++){
////				if(lvalue>=GcGate2DConfig.ncColor["airTemLegendColor"][i].valStart&&
////						lvalue<GcGate2DConfig.ncColor["airTemLegendColor"][i].valEnd){
////					color = "rgb(" + GcGate2DConfig.ncColor["airTemLegendColor"][i].colorR +","
////		 			+GcGate2DConfig.ncColor["airTemLegendColor"][i].colorG +"," 
////		 			+GcGate2DConfig.ncColor["airTemLegendColor"][i].colorB+")";
////				}
////			}
//			if(lvalue<0){
//				color = "151,232,173,255";
//			}
//			else if(lvalue>=0&&lvalue<5){
//				color = "244,217,99,255";
//			}
//			else if(lvalue>=5&&lvalue<10){
//				color = "247,180,45,255";
//			}
//			else if(lvalue>=10&&lvalue<15){
//				color = "241,147,3,255";
//			}
//			else if(lvalue>=15&&lvalue<20){
//				color = "239,117,17,255";
//			}
//			else if(lvalue>=25&&lvalue<30){
//				color = "238,88,31,255";
//			}
//			else if(lvalue>=30&&lvalue<35){
//				color = "224,63,22,255";
//			}
//			else{
//				color = "208,36,14,255";
//			}
//			return new ol.style.Style({
//			    stroke: new ol.style.Stroke({
//			        color: '#FFFFFF',
////			        lineDash: [10],
//			        width: 1
//			    }),
//			    fill: new ol.style.Fill({
//			        color: "rgba("+color+")",
//			        opacity:0.6
//			    })
//			});
//		}
//	});
	var cv = document.createElement('canvas');
	cv.id = "canvas";
	cv.width = map.getSize()[0];
	cv.height = map.getSize()[1];
	cv.style.position = 'absolute';
	cv.style.top = 0;
	cv.style.left = 0;
	cv.zIndex = 9999;
	map.getViewport().appendChild(cv);
	
function drawCv(){
	
	var mapPt = new ol.geom.Point(ol.proj.transform([104,30], 
			'EPSG:4326', 'EPSG:3857'));
//	var mapPt = new ol.geom.Point([104,30]);
//	console.log(mapPt);
//	console.log(mapPt.A[0]);
//	var resolution = ol.extent.getWidth(ol.proj.get('EPSG:4326').getExtent());
	var resolution = map.getView().getResolution();
	var center = map.getView().getCenter();
//	var c = new ol.geom.Point(ol.proj.transform([center[0],center[1]], 
//			'EPSG:3857', 'EPSG:4326'));
//	var sx = ((mapPt.A[0]-center[0])/resolution+0.5);
//	var sy = ((mapPt.A[1]-center[1])/resolution+0.5);
	var w = map.getSize()[0], h = map.getSize()[1];
	var sx=w/2+((mapPt.A[0]-center[0])/resolution+0.5);
	var sy=h/2-((mapPt.A[1]-center[1])/resolution+0.5);
	
	var coords = [104,30];
	var resXY = map.getPixelFromCoordinate(coords);
	console.log(resXY);
	
	cv.width = cv.width;
	var ctx = cv.getContext("2d");
	ctx.beginPath();
	ctx.globalAlpha = 0.5;
//	ctx.lineWidth = 2;
    ctx.arc(sx, sy, (map.getView().getZoom() / 4)*8, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
//    ctx.stroke();
}	
	drawCv();
	moveendListener = function(){
		drawCv();
	}
	map.on("moveend", moveendListener);
	
	vector = new ol.layer.Vector({
	    source: new ol.source.Vector()
	})
	
	// 使用canvas绘制一个不规则几何图形
    var canvas =document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 250;
    // 检测支持性
    if(canvas.getContext){
    	var context = canvas.getContext("2d");
//	    context.strokeStyle = "red";  
//	    context.lineWidth = 1;  
//	    context.beginPath();   
//	    context.moveTo(0, 0);
//	    context.lineTo(20, 10);
//	    context.lineTo(0, 20);
//	    context.lineTo(10, 10);
//	    context.lineTo(0, 0);  
//	    context.stroke();
//    	context.fillStyle="rgb(200,0,0)";
//    	context.fillRect(10,10,55,50); // 绘制矩形
//    	context.fillStyle="rgba(0,0,250,0.9)"
//    	context.strokeRect(15,15,55,50); // 绘制矩形边框
//    	context.fillStyle="rgba(0,0,200,0.5)";
//    	context.fillRect(30,30,55,50);
    	context.strokeRect(0,0,250,250);
    	context.beginPath(); // 新建一条路径
    	context.moveTo(40,200); // 把画笔移动到指定坐标
//    	context.lineTo(200,50); // 绘制一条从当前位置到指定坐标(200, 50)的直线
//    	context.lineTo(200,200); //虽然我们只绘制了两条线段，但是closePath会closePath，仍然是一个3角形
    	//闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
//    	context.closePath();
//    	context.stroke(); // 绘制路径,描边。stroke不会自动closePath()
//    	context.fill(); //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径
//    	context.arc(50,50,40,0,-Math.PI/2,false); // 画圆弧，参数说明以(x, y)为圆心，以r为半径，从 startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针。(默认是顺时针)
    	//参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
//    	context.arcTo(200,50,200,200,100);
//    	context.lineTo(200,200);
//    	context.stroke();
//    	context.beginPath();
//    	context.rect(50, 50, 10, 10);
//    	context.rect(200, 50, 10, 10)
//        context.rect(200, 200, 10, 10)
//        context.fill()
    	// 绘制贝瑟尔曲线
    	var cp1x = 20, cp1y = 100; // 控制点
    	var cp2x = 100, cp2y = 120; // 控制点
    	var x = 200, y = 200; // 结束点
//    	context.quadraticCurveTo(cp1x,cp1y,x,y); // 开始二次贝瑟尔曲线绘制
    	context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y); // 开始三次贝瑟尔曲线绘制
    	context.lineWidth = 10;
    	context.stroke();
    }else{
    	alert("你的浏览器不支持canvas,请升级你的浏览器");
    }

    // 把绘制了的canvas设置到style里面
    var style = new ol.style.Style({
        image: new ol.style.Icon({
          img: canvas,
          imgSize: [canvas.width, canvas.height]
//          rotation: 90 * Math.PI / 180
        })
    });

    // 创建一个Feature
    var shape = new ol.Feature({
    	geometry: new ol.geom.Point(ol.proj.transform([104,30], 
			'EPSG:4326', 'EPSG:3857'))
    });

    // 应用具有不规则几何图形的样式到Feature
    shape.setStyle(style);
    
    vector.getSource().addFeature(shape);
	
	map.addLayer(vector);
}