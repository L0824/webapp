var GlobleLand = window.GlobleLand || {};

GlobleLand.show = function(time, hour){
	var currentData, circleFeature, features = [];
	
	landVector = new ol.layer.Vector({ // 创建陆地站点layer
		source: new ol.source.Vector(),
		style: initStyle
	});
	
	// 获取数据
	currentData = getLandByTime(time, hour);
	
	if(currentData.length!=0){
		for(var i=0; i<currentData.length; i++){
			circleFeature = new ol.Feature({
				geometry: new ol.geom.Point(
						ol.proj.transform([currentData[i].V06001,
							currentData[i].V05001], 
							'EPSG:4326', 'EPSG:3857')),
				name: 'My Geometry'
			});
			circleFeature.setId(i);
			circleFeature.set('ftype', 'circle'); // 设置feature类型为circle
			circleFeature.set('stationNum', currentData[i].V01300); // 设置区站号
			features.push(circleFeature);
		}
		if(features.length!=0){
			landVector.getSource().addFeatures(features); // 将feature添加到layer
		}
	}
	
	// 添加layer到map
	map.addLayer(landVector);
	
	// 添加一个用于选择Feature的交互方式
    clickSelect = new ol.interaction.Select({
        style: circleStyle,
    });
    map.addInteraction(clickSelect);
    
    pointerMove = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove, // 唯一的不同之处，设置鼠标移到feature上就选取
        style: circleTextStyle2
    })
    
    map.addInteraction(pointerMove);
    
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
	
	// 设置popup
	$('.ol-popup').css('display', 'block');
	overlay = new ol.Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      },
      positioning: 'bottom-center',
      stopEvent: true,
      offset: [0, -2]
    });
    map.addOverlay(overlay);
    
    // 地图点击事件
    mapClick = function(evt){
    	showPopup(evt); // show popup
    }
    map.on('click', mapClick);
    
    // 点击选中feature触发业务事件
    clickSelect.on('select', function(e){
    	var arr=e.target; //获取事件对象，即产生这个事件的元素-->ol.interaction.Select
    	var collection = arr.getFeatures(); //获取这个事件绑定的features-->返回值是一个ol.Collection对象
    	var feature = collection.getArray(); //获取这个集合的第一个元素-->真正的feature
    	if(feature.length>0){
    		var i = feature[0].getId(); // 获取之前设置的id
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
    })
    
    function showPopup(evt){
    	var f = map.forEachFeatureAtPixel(evt.pixel,
          function(f) {
            return f;
          });
        if (f) {
        	var stationNum = f.get('stationNum');
        	var coordinate = f.getGeometry().getCoordinates();
//            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
//
//            content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
//                '</code>';
            overlay.setPosition(coordinate);
            var trendData = getLandTrend(time, stationNum);
            GlobleLandTrend.show(trendData, stationNum);
            myChart = echarts.init(document.getElementById('popup-content'));
            myChart.setOption(option);
        } else {
//        	overlay.setPosition(undefined);
//            closer.blur();
        }
    }
}