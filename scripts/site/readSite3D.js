/*
 * 读取站点数据
 */
	var getAllHigh = function(){
		var datas;
		$.ajax({
			url: GcGateConfig.fixed.highDataUrl,
			type: "GET",
			dataTyep: "json",
			async: false,
			beforeSend: ajaxLoading,
			success: function(data){
				ajaxLoadEnd();
				var result = data;
				if(result==null||result==""
					||result==undefined){
					alert("请求高空定时值数据为空！");
					return;
				}else{
					datas = data;
				}
			},
			error: function(){
				alert("请求高空定时值出错！");
			}
		})
		return datas;
	}
	
	var getLandByTime = function(time, hour){
		var datas;
		var param = {
				"time" : time,
				"hour" : hour
		}
		$.ajax({
			url: GcGateConfig.fixed.landDataUrl,
			type: "POST",
			data: param,
			dataType: "json",
			async: false,
			beforeSend: ajaxLoading,
			success: function(data){
				ajaxLoadEnd();
				var result = data;
				if(result==null||result==undefined
						||result==""){
					alert("请求陆地定时值数据为空！");
					return;
				}else{
					datas = data;
				}
			},
			error: function(){
				alert("请求陆地定时值出错！");
			}
		})
		return datas;
	}
	
	var getLandTrend = function(date, stationNum){
		var datas;
		var param = {
				"date" : date,
				"v01301" : stationNum
		}
		$.ajax({
			url: GcGateConfig.trend.serverUrl,
			type: "POST",
			data: param,
			dataType: "json",
			async: false,
			beforeSend: ajaxLoading,
			success: function(data){
				ajaxLoadEnd();
				var result = data;
				if(result==null||result==undefined
						||result==""){
					alert("请求陆地定时值数据为空！");
					return;
				}else{
					datas = data;
				}
			},
			error: function(){
				alert("请求陆地定时值出错！");
			}
		})
		return datas;
	}