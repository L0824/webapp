/*
 * 二维GIS读取NC数据
 */
		var getNcScpdsiIso = function() {
			var dataNC;
			var param = {
					"endDateStr" : "2010-01-01"
			}
			// ajax请求nc数据
			$.ajax({
				url: GcGateConfig.ncIso.ScDataUrl,
				type: "POST",
//				data: param,
				dataType: "text",
				async: false, // 同步请求
				beforeSend: ajaxLoading,
				success: function(data){
					ajaxLoadEnd();
					var result = data;
					dataNC = data;
					if(result==null||result==undefined
							||result==""){
						alert("请求的nc干旱等值面为空！！！");
						return;
					}
				},
				error: function(){
					alert("请求的nc干旱等值面出错啦！！！");
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