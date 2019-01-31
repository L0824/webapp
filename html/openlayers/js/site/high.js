var GlobleHigh = window.GlobleHight || {};

GlobleHigh.show = function(){
	var currentData, circleFeature, features = [];
	
	highVector = new ol.layer.Vector({
		source: new ol.source.Vector(),
		style: initStyle
	});
	
	// 设置变化后圆样式
//	var circleStyle = function(feature){
//		var ftype = feature.get('ftype'); // 获取feature的name
//		if(ftype=='circle'){ // 判断点击feature类型是否为circle
//			return new ol.style.Style({
//		    	image: new ol.style.Circle({
//		            radius: 10,
//		            fill: new ol.style.Fill({
//						color: 'rgba(0, 0, 205, 0.9)'
//					}),
//					stroke: new ol.style.Stroke({
//						color: 'rgba(255, 255, 255, 0.9)',
//				    	width: 2
//					})
//		        })
//			})
//		}
//	}
	
	currentData = getAllHigh(); // 获取所有的高空站点数据
	
	if(currentData.length!=0){
		for(var i=0; i<currentData.length; i++){
			circleFeature = new ol.Feature({
				geometry: new ol.geom.Point(
						ol.proj.transform([currentData[i].v06001,
							currentData[i].v05001], 
							'EPSG:4326', 'EPSG:3857')),
				name: 'My Geometry'
			});
			circleFeature.setId(i);
			circleFeature.set('ftype', 'circle'); // 设置feature类型为circle
			circleFeature.set('stationName', currentData[i].stationName);
//			circleFeature.setGeometryName('circle');
//			var id = circleFeature.getId();
//			circleFeature.setStyle(circleStyle);
			features.push(circleFeature);
		}
		if(features.length!=0){
			highVector.getSource().addFeatures(features);
		}
	}
	
//	// 设置feature文本变化
//    var circleTextStyle = function(feature){
//		var ftype = feature.get('ftype'); // 获取feature的name
//		var id = feature.getId(); // 获取feature的id
//		if(ftype=='circle'){ // 判断点击feature类型是否为circle
//			return new ol.style.Style({
//		    	image: new ol.style.Circle({
//		            radius: 10,
//		            fill: new ol.style.Fill({
//						color: 'rgba(0, 0, 205, 0.9)'
//					}),
//					stroke: new ol.style.Stroke({
//						color: 'rgba(255, 255, 255, 0.9)',
//				    	width: 2
//					})
//		        }),
//		        text: new ol.style.Text({
//		        	text: '区站名：'+currentData[id].stationName,
//		        	textAlign: 'left',
//		        	font: '12px sans-serif',
//		        	offsetX: 15,
//		        	offsetY: 15,
//		        	fill: new ol.style.Fill({
//		        		color: 'rgb(0, 0, 0)'
//		        	}),
//		        	stroke: new ol.style.Stroke({
//		        		color: 'rgb(255, 255, 255)',
//		        		width: 1
//		        	})
//		        })
//			})
//		}
//	}
	
//	var source = new ol.source.Vector({
//		features: features
//	});
//	
//	highVector = new ol.layer.Vector({
//		source: source
//	});

	map.addLayer(highVector);
	
	// 添加一个用于选择Feature的交互方式
    clickSelect = new ol.interaction.Select({
        style: circleStyle,
    });
    map.addInteraction(clickSelect);
    
    pointerMove = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove, // 唯一的不同之处，设置鼠标移到feature上就选取
        style: circleTextStyle
    })
    
    map.addInteraction(pointerMove);
    
    // 点击选中feature触发业务事件
    clickSelect.on('select', function(e){
//    	var test = e.selected[0].c;
    	var arr=e.target; //获取事件对象，即产生这个事件的元素-->ol.interaction.Select
    	var collection = arr.getFeatures(); //获取这个事件绑定的features-->返回值是一个ol.Collection对象
    	var feature = collection.getArray(); //获取这个集合的第一个元素-->真正的feature
    	if(feature.length>0){
    		var i = feature[0].getId(); // 获取之前设置的id
    		var stationNum = currentData[i].v01301;
    		var startTime = currentData[i].startTime.substring(0, 4) + "-" + currentData[i].startTime.substring(4, 6) + "-01";
    		var endTime = currentData[i].endTime.substring(0, 4) + "-" + currentData[i].endTime.substring(4, 6) + "-01";
    		var stationName = currentData[i].stationName;
    		t.showzdTable('zdTable',startTime,endTime,stationNum,'',stationName);
    	}
    })
    
//	 // 监听地图层级变化
//	  map.getView().on('change:resolution', function(){
//	      var style = circleFeature.getStyle();
//	      // 重新设置图标的缩放率，基于层级4来做缩放
//	      style.getImage().setScale(this.getZoom() / 4);
//	      circleFeature.setStyle(style);
//	  })
//    map.on('click', function(e){
//    	//在点击时获取像素区域
//        var pixel = map.getEventPixel(e.originalEvent);
//        map.forEachFeatureAtPixel(pixel,function(feature){
//            //coodinate存放了点击时的坐标信息
//            var coodinate = e.coordinate;
//            console.log(coodinate);
//            console.log(feature);
//        });
//    })
}
//创建Featrue,设置geometry属性
//var saoguan = new ol.Feature({
//	geometry: new ol.geom.Point([104, 30])
//});
//传入source 
//var source = new ol.source.Vector({
//    features:[saoguan]
//});
//// 传入layer,设置点
//highVector = new ol.layer.Vector({
//       source: source
//});
// 设置此点的样式
//saoguan.setStyle(new ol.style.Style({
//	image: new ol.style.Circle({
//	    radius: 7,
//	    fill: new ol.style.Fill({
//	    	color: 'rgba(255, 255, 255, 0.7)'
//	    }),
//	    stroke: new ol.style.Stroke({
//	    	color: 'rgba(123, 104, 238, 0.7)',
//	    	width: 1
//	    }),
//	    text: new ol.style.Text({ //文本样式
//	        font: '12px Calibri,sans-serif',
//	        fill: new ol.style.Fill({
//	          color: '#000'
//	        }),
//	        stroke: new ol.style.Stroke({
//	          color: '#fff',
//	          width: 3
//	        })
//	      })
//	})
//}));