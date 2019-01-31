/**
 * 拾取位置
 */  
var positionEvent =	function(e) {
        //首先移除之前添加的点
        viewer.entities.removeAll();
        //获取点击位置的经纬度高程坐标
        var ray=viewer.camera.getPickRay(e.position);  
        var cartesian=viewer.scene.globe.pick(ray,viewer.scene);
    	var cartographic=Cesium.Cartographic.fromCartesian(cartesian);  
    	var longitude=Cesium.Math.toDegrees(cartographic.longitude);//经度值  
    	var latitude=Cesium.Math.toDegrees(cartographic.latitude);//纬度值  
    	var height=viewer.scene.globe.getHeight(cartographic);  
    	if(height < 0) {
            height = 0;
        }
    	
        //创建弹出框信息
        var entity = new Cesium.Entity({
            name : "位置信息",
            description : createDescription(Cesium, [longitude, latitude, height])
        });
        viewer.selectedEntity = entity;

        //在点击位置添加对应点
        viewer.entities.add(new Cesium.Entity({
            point : new Cesium.PointGraphics({
                color : new Cesium.Color(1, 1, 0),
                pixelSize : 10,
                outlineColor : new Cesium.Color(0, 1, 1)
            }),
            position : Cesium.Cartesian3.fromDegrees(longitude, latitude , height + 0.5)
        }));
    }

    //创建描述位置的对话框
    function createDescription(Cesium,properties){
        var simpleStyleIdentifiers = ['经度','纬度','高度'];
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
