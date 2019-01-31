/*
 * 读取nc格式3个维度的数据，包括时间、经度、维度，返回数值为干旱数据
 * 根据输入时间维度，获取该时间点所有的干旱数值及经纬度位置
 */
		var getNcScpdsi = function(time) {
			var dataNC;
			var param = {
					"endDateStr" : time
			}
			// ajax请求nc数据
			$.ajax({
				url: GcGateConfig.nc.ScDataUrl,
				type: "POST",
				data: param,
				dataType: "json",
				async: false, // 同步请求
				beforeSend: ajaxLoading,
				success: function(data){
					ajaxLoadEnd();
					var result = data;
					dataNC = data;
					if(result==null||result==undefined
							||result==""){
						alert("请求的nc干旱数据为空！！！");
						return;
					}
				},
				error: function(){
					alert("请求的nc干旱数据出错啦！！！");
				}
			})
			return dataNC;
		}
		
		var getNcTa = function(time, airPressure, dirTa) {
			var dataNC;
			var param = {
					"endDateStr" : time,
					"airPressure" : airPressure,
					"dirTa" : dirTa
			}
			// ajax请求nc数据
			$.ajax({
				url: GcGateConfig.nc.TaDataUrl,
				type: "POST",
				data: param,
				dataType: "json",
				async: false, // 同步请求
				beforeSend: ajaxLoading,
				success: function(data){
					ajaxLoadEnd();
					var result = data;
					dataNC = data;
					if(result==null||result==undefined
							||result==""){
						alert("请求的nc情景预估温度数据为空！！！");
						return;
					}
				},
				error: function(){
					alert("请求的nc情景预估温度数据出错啦！！！");
				}
			})
			return dataNC;
		}
		
		var getNc2dTa = function(time, airPressure, dirTa) {
			var dataNC;
			var param = {
					"endDateStr" : time,
					"airPressure" : airPressure,
					"dirTa" : dirTa
			}
			// ajax请求nc数据
			$.ajax({
				url: GcGateConfig.nc.Ta2dDataUrl,
				type: "POST",
				data: param,
				dataType: "json",
				async: false, // 同步请求
				beforeSend: ajaxLoading,
				success: function(data){
					ajaxLoadEnd();
					var result = data;
					dataNC = data;
					if(result==null||result==undefined
							||result==""){
						alert("请求的nc情景预估温度数据为空！！！");
						return;
					}
				},
				error: function(){
					alert("请求的nc情景预估温度数据出错啦！！！");
				}
			})
			return dataNC;
		}
		
		var getNcWind = function(time, airPressure, dirWind) {
			var dataNC;
			var param = {
					"endDateStr" : time,
					"airPressure" : airPressure,
					"dirWind" : dirWind
			}
			// ajax请求nc数据
			$.ajax({
				url: GcGateConfig.nc.WindDataUrl,
				type: "POST",
				data: param,
				dataType: "json",
				async: false, // 同步请求
				beforeSend: ajaxLoading,
				success: function(data){
					ajaxLoadEnd();
					var result = data;
					dataNC = data;
					if(result==null||result==undefined
							||result==""){
						alert("请求的nc情景预估风数据为空！！！");
						return;
					}
				},
				error: function(){
					alert("请求的nc情景预估风数据出错啦！！！");
				}
			})
			return dataNC;
		}
		
		var getNc2dWind = function(time, airPressure, dirWind) {
			var dataNC;
			var param = {
					"endDateStr" : time,
					"airPressure" : airPressure,
					"dirWind" : dirWind
			}
			// ajax请求nc数据
			$.ajax({
				url: GcGateConfig.nc.Wind2dDataUrl,
				type: "POST",
				data: param,
				dataType: "json",
				async: false, // 同步请求
				beforeSend: ajaxLoading,
				success: function(data){
					ajaxLoadEnd();
					var result = data;
					dataNC = data;
					if(result==null||result==undefined
							||result==""){
						alert("请求的nc情景预估风数据为空！！！");
						return;
					}
				},
				error: function(){
					alert("请求的nc情景预估风数据出错啦！！！");
				}
			})
			return dataNC;
		}
		
		var getNcHeight = function(time, airPressure, dirHeight) {
			var dataNC;
			var param = {
					"endDateStr" : time,
					"airPressure" : airPressure,
					"dirHeight" : dirHeight
			}
			// ajax请求nc数据
			$.ajax({
				url: GcGateConfig.nc.HeightDataUrl,
				type: "POST",
				data: param,
				dataType: "json",
				async: false, // 同步请求
				beforeSend: ajaxLoading,
				success: function(data){
					ajaxLoadEnd();
					var result = data;
					dataNC = data;
					if(result==null||result==undefined
							||result==""){
						alert("请求的nc情景预估位势高度数据为空！！！");
						return;
					}
				},
				error: function(){
					alert("请求的nc情景预估位势高度数据出错啦！！！");
				}
			})
			return dataNC;
		}
		
		//loading效果
		function ajaxLoading(){   
		    $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo("body");   
		    $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({display:"block",left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 45) / 2});   
		 }   
		function ajaxLoadEnd(){   
		     $(".datagrid-mask").remove();   
		     $(".datagrid-mask-msg").remove();               
		} 
