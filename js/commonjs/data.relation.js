(function() {

	var dom = document.getElementById("container-data-relation");
	var myChart = echarts.init(dom);
	option = null;
	var colors = [ '#0B79E2', '#EB0605', '#ED8506' ];
	var categories = [];
	var urlarray = [];
	$.get(
					'http://123.57.174.98:4389/manage/dataResourcesApi/dataTree',
					function(data) {
						// console.info(data);
						if (data == null || data.status != "ok"
								|| data.result == null) {
							alert('获取数据目录树出错!');
							return;
						}
						dataarray = data.result.resources;
						for (var i = 0; i < dataarray.length; i++) {
							var category = {
								'name' : dataarray[i].name,
								'id' : dataarray[i].name
							}
							categories.push(category);
							var dataobj = dataarray[i];
							if (dataobj.list == null)
								continue;

							for (var j = 0; j < dataobj.list.length; j++) {
								var url = {
									'name' : dataobj.list[j].name,
									'id' : dataobj.list[j].id,
								}
								urlarray.push(url);
							}

						}

						option = {
							// color: colors,
							backgroundColor : '#fff',
							// title: {
							// text: "全球变化大数据云共享平台数据关系",
							// top: "top",
							// left: "left"
							// },
							tooltip : {},
							legend : [ {
								itemWidth: 12,
								itemHeight: 12,
								itemGap: 10,
								formatter : function(name) {
									return echarts.format.truncateText(name,
											120, '14px Microsoft Yahei', '…');
								},
								data : categories.map(function(a) {
									return a.name;
								}),
								tooltip : {
									show : true
								},
								selectedMode : 'false',
								bottom : 20
							// data: ['国内资料和产品','国外资料和产品','WAFS资料']
							} ],
							toolbox : {
								show : true,
								feature : {
									dataView : {
										show : false
									// 数据视图
									},
									restore : {
										show : true
									// 还原
									},
									saveAsImage : {
										show : false
									// 保存为图
									}
								}
							},
							animationDuration : 2500, // 初始动画的时长
							animationEasingUpdate : 'quinticInOut',
							series : [ {
								name : '全球变化大数据',
								type : 'graph',
								layout : 'force',

								force : {
									repulsion : 250
								},
								data : [ {
									"name" : "全球变化大数据",
									// "x": 0,
									// y: 0,
									"symbolSize" : 45,
									"draggable" : "true",
									"value" : 1001

								}, {
									"name" : "气象基础观测数据与产品",
									"value" : 3,
									"symbolSize" : 30,
									"category" : "全球变化大数据",
									"draggable" : "true"
								}, {
									"name" : "全球30m分辨率数据产品",
									"value" : 3,
									"symbolSize" : 30,
									"category" : "全球变化大数据",
									"draggable" : "true"
								}, {
									"name" : "风云卫星遥感数据产品",
									"value" : 3,
									"symbolSize" : 30,
									"category" : "全球变化大数据",
									"draggable" : "true"
								}, {
									"name" : "星地融合数据产品",
									"value" : 3,
									"symbolSize" : 30,
									"category" : "全球变化大数据",
									"draggable" : "true"
								}, {
									"name" : "全球气候变化情景预估数据",
									"value" : 3,
									"symbolSize" : 30,
									"category" : "全球变化大数据",
									"draggable" : "true"
								}, {
									"name" : "全球高空日、月、旬、年观测数据",
									"value" : 3,
									"symbolSize" : 20,
									"category" : "气象基础观测数据与产品",
									"draggable" : "true"
								}, {
									"name" : "全球火烧迹地产品",
									"symbolSize" : 20,
									"category" : "全球30m分辨率数据产品",
									"draggable" : "true",
									"value" : 29
								}, {
									"name" : "FY3遥感数据产品",
									"symbolSize" : 20,
									"category" : "风云卫星遥感数据产品",
									"draggable" : "true",
									"value" : 10
								}, {
									"name" : "CMIP5_BCC",
									"symbolSize" : 20,
									"category" : "全球气候变化情景预估数据",
									"draggable" : "true",
									"value" : 10
								}, {
									"name" : "CMIP5_CANESM2",
									"symbolSize" : 20,
									"category" : "全球气候变化情景预估数据",
									"draggable" : "true",
									"value" : 10
								}, {
									"name" : "CMIP5_GFDL_ESM2M",
									"symbolSize" : 20,
									"category" : "全球气候变化情景预估数据",
									"draggable" : "true",
									"value" : 10
								}, {
									"name" : "CMIP5_HADGEM2_CC",
									"symbolSize" : 20,
									"category" : "全球气候变化情景预估数据",
									"draggable" : "true",
									"value" : 10
								}, {
									"name" : "CMIP5_MPI_ESM_lr",
									"symbolSize" : 20,
									"category" : "全球气候变化情景预估数据",
									"draggable" : "true",
									"value" : 13
								}, {
									"name" : "CMIP5_NORESM1_m",
									"symbolSize" : 20,
									"category" : "全球气候变化情景预估数据",
									"draggable" : "true",
									"value" : 13
								} ],
								links : [ {
									"source" : "全球变化大数据",
									"target" : "气象基础观测数据与产品"
								}, {
									"source" : "气象基础观测数据与产品",
									"target" : "全球高空日、月、旬、年观测数据"
								}, {
									"source" : "全球变化大数据",
									"target" : "全球30m分辨率数据产品"
								}, {
									"source" : "全球30m分辨率数据产品",
									"target" : "全球火烧迹地产品"
								}, {
									"source" : "全球变化大数据",
									"target" : "风云卫星遥感数据产品"
								}, {
									"source" : "风云卫星遥感数据产品",
									"target" : "FY3遥感数据产品"
								}, {
									"source" : "全球变化大数据",
									"target" : "星地融合数据产品"
								}, {
									"source" : "全球变化大数据",
									"target" : "全球气候变化情景预估数据"
								}, {
									"source" : "全球气候变化情景预估数据",
									"target" : "CMIP5_BCC"
								}, {
									"source" : "全球气候变化情景预估数据",
									"target" : "CMIP5_CANESM2"
								}, {
									"source" : "全球气候变化情景预估数据",
									"target" : "CMIP5_CANESM2"
								}, {
									"source" : "全球气候变化情景预估数据",
									"target" : "CMIP5_GFDL_ESM2M"
								}, {
									"source" : "全球气候变化情景预估数据",
									"target" : "CMIP5_HADGEM2_CC"
								}, {
									"source" : "全球气候变化情景预估数据",
									"target" : "CMIP5_MPI_ESM_lr"
								}, {
									"source" : "全球气候变化情景预估数据",
									"target" : "CMIP5_NORESM1_m"
								} ],
								categories : categories,
								focusNodeAdjacency : true, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
								roam : true, // 是否开启鼠标缩放和平移漫游
								label : { // 图形上的文本标签
									normal : {
										show : true,
										position : 'top',
									}
								},
								lineStyle : {
									normal : {
										color : 'source',
										curveness : 0,
										type : "solid"
									}
								}
							} ]
						};
						myChart.setOption(option);
						myChart.on('click',function(params) {
							for (var i = 0; i < urlarray.length; i++) {
								if (params.name == urlarray[i].name) {
									var index = i;
									layer.confirm('确定进入'+params.name+"页面吗?",{
										skin: 'bg',
										title:'提示',
										move:false,
										shade:false
									}, function(){
										sessionStorage.setItem('id',urlarray[index].id);
										window.location.href = "dataResource/dataResource.html?id="+urlarray[index].id;
									});
								}
							}

						 });
						
						
							
					});

	// categories = [ {
	// 'name' : '气象基础观测数据与产品'
	// }, {
	// 'name' : '全球30m分辨率数据产品'
	// }, {
	// 'name' : '风云卫星遥感数据产品'
	// }, {
	// 'name' : '星地融合数据产品'
	// }, {
	// 'name' : '全球气候变化情景预估数据'
	// } ];

})();
