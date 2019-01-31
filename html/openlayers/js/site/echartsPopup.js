/*
 * 地图弹出框为echarts图表
 */

// 基于准备好的dom，初始化echarts实例
//myChart = echarts.init(document.getElementById('popup-content'));
var GlobleLandTrend = window.GlobleLandTrend || {};

GlobleLandTrend.show = function(data, stationNum){
	// 数据解析
	var date = [], tmpAvg = [], tmpDp = [], humidity = [], pressure = [], wind = [];
	if(data.length!=0){
		for(var i=0; i<data.length; i++){
			// 提取日期和时次
//			var ymdh = data[i].V04001 + '/' +
			var ymdh = data[i].V04002 + '/' +
					   data[i].V04003 + ' ' +
					   data[i].V04004 + ':00';
			date.push(ymdh);
			// 提取平均温度
			if(data[i].V12001==999999){
				tmpAvg.push(0);
			}else{
				tmpAvg.push(data[i].V12001);
			}
			// 提取露点温度
			if(data[i].V12003==999999){
				tmpDp.push(0);
			}else{
				tmpDp.push(data[i].V12003);
			}
			// 提取相对湿度
			if(data[i].V13003==999999){
				humidity.push(0);
			}else{
				humidity.push(getHumidity(data[i].V13003));
			}
			// 提取海平面气压
			if(data[i].V10051==999999){
				pressure.push(0);
			}else{
				pressure.push(data[i].V10051);
			}
			// 提取风
			if(data[i].V11001==999999&&data[i].V11002==999999){
				var w = {windSpeed:0, windDir:0};
				wind.push(w);
			}else{
				var w = {windSpeed:data[i].V11002, windDir:data[i].V11001};
				wind.push(w);
			}
		}
	}
	
	//指定图表的配置项和数据
	var colors = ['#EB0605', '#0B79E2', '#49BE5B', '#2B3336', '#ED8506'];
//	var legendName = ['平均温度', '露点温度', '相对湿度', '海平面气压', '风'];
	var legendName = ['平均温度', '相对湿度', '海平面气压', '风'];
//	myChart.showLoading({
//	    text :"图表数据正在努力加载..."
//	});
	option = {
	    color: colors,
	    
	    title: {
	        text: '站点【'+ stationNum +'】前后15天数据',
	        top: 20,
	        bottom: 20,
	        left: 100,
	        textStyle: {
	        	fontSize: 12
	        }
	    },
	    
	    tooltip: {
	    	trigger: 'axis',
	        axisPointer: {
	            animation: false
	        }
	    },
	    grid: {
//	    	left: '20%',
	        right: '30%'
	    },
	    toolbox: {
	        feature: {
	            dataView: {show: false, readOnly: false},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    legend: {
	        data:legendName,
	        selected: {
	        	'相对湿度' : false,
	        	'海平面气压' : false
	        },
	        textStyle: {
	        	fontSize: 11
	        }
	    },
	    xAxis: [
	        {
	            type: 'category',
	            axisTick: {
	                alignWithLabel: true
	            },
	            data: date
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '平均温度(°C)',
	//            min: 0,
	//            max: 250,
	            position: 'left',
	            axisLine: {
	                lineStyle: {
	                    color: colors[0]
	                }
	            },
	            axisLabel: {
	//                formatter: '{value} ml'
	            }
	        },
//	        {
//	            type: 'value',
//	            name: '露点温度(°C)',
	//            min: 0,
	//            max: 250,
//	            position: 'left',
//	            offset: 50,
//	            axisLine: {
//	                lineStyle: {
//	                    color: colors[1]
//	                }
//	            },
//	            axisLabel: {
	//                formatter: '{value} ml'
//	            }
//	        },
	        {
	            type: 'value',
	            name: '相对湿度(%)',
	//            min: 0,
	//            max: 25,
	            position: 'right',
	            offset: 45,
	            inverse: true,
	            axisLine: {
	                lineStyle: {
	                    color: colors[2]
	                }
	            },
	            axisLabel: {
	//                formatter: '{value} °C'
	            }
	        },
	        {
	            type: 'value',
	            name: '海平面气压(hpa)',
	//            min: 0,
	//            max: 25,
	            position: 'right',
	            offset: 90,
	            axisLine: {
	                lineStyle: {
	                    color: colors[3]
	                }
	            },
	            axisLabel: {
	//                formatter: '{value} °C'
	            }
	        },
	        {
	            type: 'value',
	            name: '风(m/s)',
	//            min: 0,
	//            max: 25,
	            position: 'right',
//	            offset: 50,
	            axisLine: {
	                lineStyle: {
	                    color: colors[4]
	                }
	            },
	            axisLabel: {
	//                formatter: '{value} °C'
	            }
	        }
	    ],
	    dataZoom: [
	        {
	            show: true,
	            type: 'slider',
	            start: 45,
	            end: 55
	        }
	    ],
	    series: [
	        {
	            name:'平均温度',
	            type:'line',
	            smooth: true,
	            data:tmpAvg
	        },
//	        {
//	            name:'露点温度',
//	            type:'line',
//	            smooth: true,
//	            yAxisIndex: 1,
//	            data:tmpDp
//	        },
	        {
	            name:'相对湿度',
	            type:'line',
	            smooth: true,
	            yAxisIndex: 1,
	            data:humidity
	        },
	        {
	            name:'海平面气压',
	            type:'line',
	            smooth: true,
	            yAxisIndex: 2,
	            data:pressure
	        },
	        {
	            name:'风',
	            type:'line',
	            smooth: true,
	            yAxisIndex: 3,
	            data:wind.map(function(item){
	            	return{
	            		value: item.windSpeed,
	            		symbol: 'image://' + getWindSymbols(item.windSpeed),
	            		symbolSize: [25, 50],
	            		symbolRotate: item.windDir,
	            		symbolOffset: [3, 3]
	            	};
	            })
	        }
	    ]
	};
//	myChart.hideLoading();
	
	function getWindSymbols(windSpeed){
		var picUrl ="./image/wind27x54/Calm.png";
		if(windSpeed<=1.5){
			
		}
		else if(windSpeed<=3.3){
			picUrl="./image/wind27x54/2-3LevelWind.png";
		}
		else if(windSpeed<=5.4){
			picUrl="./image/wind27x54/3-4LevelWind.png";
		}
		else if(windSpeed<=7.9){
			picUrl="./image/wind27x54/4-5LevelWind.png";
		}
		else if(windSpeed<=10.7){
			picUrl="./image/wind27x54/5-6LevelWind.png";
		}
		else if(windSpeed<=13.8){
			picUrl="./image/wind27x54/6-7LevelWind.png";
		}
		else if(windSpeed<=17.1){
			picUrl="./image/wind27x54/7-8LevelWind.png";
		}
		else if(windSpeed<=20.7){
			picUrl="./image/wind27x54/8-9LevelWind.png";
		}
		else if(windSpeed<=24.4){
			picUrl="./image/wind27x54/9-10LevelWind.png";
		}
		else if(windSpeed<=28.4){
			picUrl="./image/wind27x54/10-11LevelWind.png";
		}
		else if(windSpeed<=32.6){
			picUrl="./image/wind27x54/11-12LevelWind.png";
		}
		else{
			picUrl="./image/wind27x54/11-12LevelWind.png";
		}
		return picUrl;
	}
}