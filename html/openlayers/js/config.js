/**
 * 二维地图的各种配置
 */
var GcGate2DConfig = window.GcGate2DConfig || {};

// 地图相关的配置
GcGate2DConfig.climateConfig = {
	fireUrl : 'http://59.110.81.81:8080/geoserver/gc/wms',
//	fireUrl : 'http://123.57.174.98:8089/geoserver/gc/wms',
	preUrl : '../images/pre/',
	tmpUrl : '../images/tmp/'
};

GcGate2DConfig.climateConfig = {
		fy3: "http://59.110.81.81:8080/geoserver/gc/wms"
}

/** nc等值面后台path **/
GcGate2DConfig.ncIso = {
		ScDataUrl: "http://localhost:4389/manage/netcdApi/getScpdsiIso"
}

/** nc等值面颜色配置 **/
GcGate2DConfig.ncColor = {
		airTemLegendColor: 
  	 		[{'valStart':-100,'valEnd':-30,'colorR':0,'colorG':0,'colorB':49},
	         {'valStart':-32,'valEnd':-28,'colorR':7,'colorG':30,'colorB':120},
//	         {'valStart':-28,'valEnd':-26,'colorR':17,'colorG':49,'colorB':139},
	         {'valStart':-28,'valEnd':-24,'colorR':27,'colorG':68,'colorB':159},
//	         {'valStart':-24,'valEnd':-22,'colorR':38,'colorG':87,'colorB':179},
	         {'valStart':-24,'valEnd':-20,'colorR':48,'colorG':106,'colorB':199},
//	         {'valStart':-20,'valEnd':-18,'colorR':59,'colorG':126,'colorB':219},
	         {'valStart':-20,'valEnd':-16,'colorR':78,'colorG':138,'colorB':221},
//	         {'valStart':-16,'valEnd':-14,'colorR':97,'colorG':150,'colorB':224},
	         {'valStart':-16,'valEnd':-12,'colorR':116,'colorG':163,'colorB':226},
//	         {'valStart':-12,'valEnd':-10,'colorR':135,'colorG':175,'colorB':229},
	         {'valStart':-12,'valEnd':-8,'colorR':155,'colorG':188,'colorB':232},
//	         {'valStart':-8,'valEnd':-6,'colorR':154,'colorG':196,'colorB':220},
	         {'valStart':-8,'valEnd':-4,'colorR':153,'colorG':205,'colorB':208},
//	         {'valStart':-4,'valEnd':-2,'colorR':152,'colorG':214,'colorB':196},
	         {'valStart':-4,'valEnd':0,'colorR':151,'colorG':232,'colorB':173},
	         {'valStart':0,'valEnd':4,'colorR':215,'colorG':222,'colorB':126},
//	         {'valStart':2,'valEnd':4,'colorR':234,'colorG':219,'colorB':112},
	         {'valStart':4,'valEnd':8,'colorR':244,'colorG':217,'colorB':99},
//	         {'valStart':6,'valEnd':8,'colorR':250,'colorG':204,'colorB':79},
	         {'valStart':8,'valEnd':12,'colorR':247,'colorG':180,'colorB':45},
//	         {'valStart':10,'valEnd':12,'colorR':242,'colorG':155,'colorB':0},
	         {'valStart':12,'valEnd':16,'colorR':241,'colorG':147,'colorB':3},
//	         {'valStart':14,'valEnd':16,'colorR':240,'colorG':132,'colorB':10},
	         {'valStart':16,'valEnd':20,'colorR':239,'colorG':117,'colorB':17},
//	         {'valStart':18,'valEnd':20,'colorR':238,'colorG':102,'colorB':24},
	         {'valStart':20,'valEnd':24,'colorR':238,'colorG':88,'colorB':31},
//	         {'valStart':22,'valEnd':24,'colorR':231,'colorG':75,'colorB':26},
	         {'valStart':24,'valEnd':28,'colorR':224,'colorG':63,'colorB':22},
//	         {'valStart':26,'valEnd':28,'colorR':217,'colorG':51,'colorB':18},
	         {'valStart':28,'valEnd':32,'colorR':208,'colorG':36,'colorB':14},
//	         {'valStart':30,'valEnd':32,'colorR':194,'colorG':0,'colorB':3},
	         {'valStart':32,'valEnd':36,'colorR':181,'colorG':1,'colorB':9},
//	         {'valStart':35,'valEnd':37,'colorR':169,'colorG':2,'colorB':16},
	         {'valStart':36,'valEnd':40,'colorR':138,'colorG':5,'colorB':25},
	         {'valStart':40,'valEnd':100,'colorR':80,'colorG':0,'colorB':15}]
}