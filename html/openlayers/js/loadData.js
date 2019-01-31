        var dx = 3;
        var dy = 3;
        var px, py;
        var features = [];
        var strategy, clusters;;
        function draw() {
            var ic = "../image/images.png";
            for (var i = 0; i < 400; i++) {
                var sHtml = "<tr><td valign=\"top\">test</td><td valign=\"top\">" + i.toString() + "</td></tr>";
                px = Math.random() * (122 - 121 + 0.001) + 121;
                py = Math.random() * (30 - 29 + 0.001) + 29;
                var ll = tranformTo4326(px, py);  //将3857坐标转换为4326
                features.push(new ol.layer.Vector(
                        new ol.geom.Point(ll.lon, ll.lat), { x: ll.lon, y: ll.lat, html: sHtml, img: ic, name: "浙B" + i.toString() }
                    ));
            }

 

            var style = new ol.Style({
                fontSize: "9pt",
                fontWeight: "bold"
            }, {
                rules: [
                new ol.Format({
                    filter: new ol.format.filter.Comparison({      //设置单点时的图标
                        type: ol.format.filter.Comparison.EQUAL_TO,   
                        property: "count",  //获取合并点数
                        value: 1
                    }),
                    symbolizer: {
                        graphicWidth: 25,
                        graphicHeight: 25,
                        labelYOffset: "-10",  //设置显示文字的偏移量
                        label: "${name}",   //获取显示文字
                        externalGraphic: "${img}"  //获取显示图标
                    }
                }),
                 new ol.Format({
                     // apply this rule if no others apply
                     elseFilter: true,
                     symbolizer: {
                         pointRadius: "${radius}",  //计算点半径
                         fillColor: "#ffcc66",
                         fillOpacity: 0.8,
                         strokeColor: "#cc6633",
                         strokeWidth: "${width}",
                         labelYOffset: "-8",
                         label: "${count}",  //获取合并点数
                         strokeOpacity: 0.8
                     }
                 })
               ],
                context: {
                    width: function (feature) {
                        return (feature.cluster) ? 2 : 1;
                    },
                    radius: function (feature) {
                        var pix = 2;
                        if (feature.cluster) {
                            pix = Math.min(feature.attributes.count, 7) + 2;
                        }
                        return pix;
                    },
                    count: function (feature) {
                        return feature.attributes.count;
                    },
                    img: function (feature) {
                        return feature.cluster[0].data.img;
                    },
                    name: function (feature) {
                        return feature.cluster[0].data.name;
                    }
                }
            });

            strategy = new ol.Strategy.Cluster();

            clusters = new ol.Layer.Vector("Clusters", {
                strategies: [strategy],
                styleMap: new ol.StyleMap(style)
            });

            var select = new ol.Control.SelectFeature(clusters);
            map.addControl(select);
            select.activate();
            map.addLayer(clusters);
            strategy.distance = 50;   //设置合并范围
           // strategy.threshold =  strategy.threshold;
            clusters.removeFeatures(clusters.features);
            clusters.addFeatures(features);


            //画popup窗
            clusters.events.on({
                featureselected: function (e) {
                    feature = e.feature;
                    var fHtml = "<table style=\"width:150px;height:100px;\">";
                    for (var i = 0; i < feature.cluster.length; i++) {
                        fHtml += feature.cluster[i].data.html;
                    }
                    fHtml += "</table>";
                    var lonlat = new ol.LonLat(feature.cluster[0].geometry.x, feature.cluster[0].geometry.y);
                    popup = new ol.Popup.FramedCloud("featurePopup",
                                                     lonlat,
                                         new ol.Size(300, 300),
                                       fHtml,
                                         null, true, function (e) {

                                             select.unselect(this.feature);
                                         });
                    feature.popup = popup;
                    popup.feature = feature;
                    popup.size = new ol.Size(300, 300);
                    map.addPopup(popup);
                },
                featureunselected: function (e) {
                    feature = e.feature;
                    if (feature.popup) {
                        popup.feature = null;
                        map.removePopup(feature.popup);
                        feature.popup.destroy();
                        feature.popup = null;
                    }
                }
            });
        }

function tranformTo4326(lon, lat) {
    var proj = [lon, lat];
    var lonlat = ol.proj.transform(proj, 'EPSG:4326', 'EPSG:3857' );
    return lonlat;
}
