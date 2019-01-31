/**
 * 全球火烧数据
 */
var GlobleFireSlash = window.GlobleFireSlash || {};
var fireLayer;
GlobleFireSlash.addFireLayer = function(){
	fireLayer = new ol.layer.Tile({
		opacity:0.7,
	    source:new ol.source.TileWMS({
	        extent:[-180,-60,180,80],
	        params:{
	            'LAYERS':'gc:data',
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
	map.addLayer(fireLayer);
}