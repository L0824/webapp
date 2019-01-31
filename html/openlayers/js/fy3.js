/**
 *	风云3数据
 */
var GlobleFy3Data = window.GlobleFy3Data || {};
var fy3Layer;
GlobleFy3Data.addFy3Layer = function(fileName){
	if(fileName.indexOf(".img") != -1||fileName.indexOf(".hdr") != -1){
		var name;
		if(fileName.indexOf(".img") != -1){
			name = fileName.split(".img");
			loadDatas(name[0]);
		}else{
			name = fileName.split(".hdr");
			loadDatas(name[0]);
		}
	}else{
		alert("不支持的数据源，请重新选择！");
	}
	function loadDatas(fy3Name){
		var layerName = 'gc:'+fy3Name;
		fy3Layer = new ol.layer.Tile({
			opacity:0.7,
		    source:new ol.source.TileWMS({
		        extent:[-180,-60,180,80],
		        params:{
		            'LAYERS':layerName,
		            'VERSION':'1.1.0',
		            'BBOX':[-180,-60,180,80],
		            'CRS':'EPSG:4326',
		            'WIDTH':256,
		            'HEIGHT':256
		        },
		        projection:"EPSG:4326",
		        url:GcGateConfig.fireSlash.serverUrl
		        })
			});
		map.addLayer(fy3Layer);
	}
}