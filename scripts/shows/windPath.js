var windpath = { "type": "Feature", "properties": { "Id": 0 }, "geometry": { "type": "LineString", "coordinates": [[141.20, 10.70], [139.50, 11.20], [137.80, 11.50], [135.90, 11.80], [134.00, 12.00], [132.10, 12.20], [130.20, 12.30], [128.30, 12.30], [126.40, 12.30], [124.50, 12.20], [122.70, 12.10], [121.10, 12.10], [119.90, 12.20], [118.90, 12.40], [117.80, 12.90], [116.80, 13.50], [115.90, 13.90], [114.90, 14.10], [113.90, 14.30], [112.90, 14.70], [112.00, 15.20], [111.10, 15.70], [110.30, 16.10], [109.70, 16.40],[109.30, 16.90],[109.00, 17.50],[108.80, 18.10],[108.60, 18.70],[108.50, 19.20],[108.60, 19.80],[108.90, 20.40],[109.30, 21.00],[109.70, 21.70]] } };

function addWind() {
    

    var positionA = windpath.geometry.coordinates;
    var position = [];
    for (i = 0; i < positionA.length; i++) {
        var x = positionA[i][0];
        var y = positionA[i][1];
        position.push({ x: x, y: y });
    }

    function computeCirclularFlight(lon, lat, radius) {
        var property = new Cesium.SampledPositionProperty();
        //var _position = [{ x: 113.106100, y: 33.498900 }, { x: 111.100000, y: 34.320000 }, { x: 109.050000, y: 35.150000 }, { x: 107.010000, y: 35.9140000 }, { x: 104.900000, y: 36.7140000 }, { x: 102.800000, y: 37.600000 }, { x: 100.690800, y: 38.422000 }, { x: 98.570700, y: 39.241700 }, { x: 96.396500, y: 40.066100 }];
        for (var i = 0; i < position.length; i++) {
            if (i == 0) {
                var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
                var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170);
                property.addSample(time, _position);
            }
            if (i < 10000 && i > 0) {
                var position_a = new Cesium.Cartesian3(property._property._values[i * 3 - 3], property._property._values[i * 3 - 2], property._property._values[i * 3 - 1]);
                if (i < 976) {
                    var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170);
                }
                else if (i > 975 && i < 986) {
                    var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170 + 20 * (i - 980));
                }
                else if (i > 985) {
                    var _position = Cesium.Cartesian3.fromDegrees(position[i].x, position[i].y, 1170 + 200);
                }

                var positions = [Cesium.Ellipsoid.WGS84.cartesianToCartographic(position_a), Cesium.Ellipsoid.WGS84.cartesianToCartographic(_position)];
                var a = new Cesium.EllipsoidGeodesic(positions[0], positions[1]);
                var long = a.surfaceDistance;
                var _time = long/10000;
                var time = Cesium.JulianDate.addSeconds(property._property._times[i - 1], _time, new Cesium.JulianDate());

                property.addSample(time, _position);
            }
        }
        // property.setInterpolationOptions({
        //    interpolationDegree: 5,
        //    interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
        //});
        console.log(property._property._values);
        console.log(property);
        return property;
    }
	  var start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));  
    var stop = Cesium.JulianDate.addSeconds(start, 30000, new Cesium.JulianDate());
    //创建描述位置的对话框
    function createDescription(Cesium,properties){
        var simpleStyleIdentifiers = ['名称','结束时间','英文名称','中心坐标'];
        var html = '';
        for ( var key in properties) {
            if (properties.hasOwnProperty(key)) {
                if (simpleStyleIdentifiers.indexOf(key) !== -1) {
                    continue;
                }
                var value = properties[key];
                if (Cesium.defined(value) && value !== '') {
                    html += '<tr><td>' + simpleStyleIdentifiers[key] + '</td><td>' + value + '</td></tr>';
                }
            }
        }
        if (html.length > 0) {
            html = '<table class="zebra"><tbody>' + html + '</tbody></table>';
        }
        return html;
    }
    //Make sure viewer is at the desired time.
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
    viewer.clock.multiplier = 10;
    viewer.clock.canAnimate = false;

    var __position = computeCirclularFlight(-112.110693, 36.0994841, 0.00005);

    entityee = viewer.entities.add({
        //Set the entity availability to the same interval as the simulation time.
        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
            start: start,
            stop: stop
        })]),
        position: __position,
        orientation: new Cesium.VelocityOrientationProperty(__position),
        model: {
            uri: './../data/SampleData/models/CesiumBalloon/CesiumBalloon.glb',
            scale: 6,
            minimumPixelSize: 64,

            //heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        },
        label:new Cesium.LabelGraphics({
        	text: new Cesium.CallbackProperty(getLabel, false),
            font : '20px sans-serif',
            showBackground : true,
            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
            pixelOffset : new Cesium.Cartesian2(0.0, -10),
            pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5)
//            pixelOffset : new Cesium.Cartesian2(0.5, 50)
            //eyeOffset : new Cesium.Cartesian3(0.2, 0.3,0.4)
        }),
        description : createDescription(Cesium, ['尼伯特', '2003/11/19 12:00:00', 'NEPARTAK','21.200000,124.850000']),
       
        //Show the path as a pink line sampled in 1 second increments.
        path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.1,
                color: Cesium.Color.YELLOW
            }),
            width: 30
        }
    });
//    var geodesic = new Cesium.EllipsoidGeodesic();
//    var endCartographic = new Cesium.Cartographic();
//    var startCartographic = Cesium.Cartographic.fromDegrees(-112.110693, 36.0994841);
   function getLabel(time,result){
//	   var endPoint = entityee.position.getValue(time, result);
//	   endCartographic = Cesium.Cartographic.fromCartesian(endPoint);
//	   geodesic.setEndPoints(startCartographic, endCartographic);
//	   var lengthInMeters = Math.round(geodesic.surfaceDistance);
//	   var length = (lengthInMeters / 10000).toFixed(0);
	   var txt = "中心气压:"+(Math.random()*120).toFixed(0)+"百帕， 最大风速:"+(Math.random()*20).toFixed(0)+" 米/秒";
	   return txt;
   }
   
    viewer.trackedEntity = entityee;
   
}