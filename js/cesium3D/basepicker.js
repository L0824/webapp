var providerViewModels = [];

	var providerTerrainViewModels = [];
	
	// 天地图
	var tdtModel = new Cesium.ProviderViewModel({
        name : '天地图影像',
        iconUrl : "../images/tianditu.jpg",
        tooltip : 'TianDiTu Provider',
        creationFunction : function() {
            return new Cesium.WebMapTileServiceImageryProvider({
                url : 'http://t0.tianditu.com/img_c/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=img&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles',
                layer : 'img',
                style : 'default',
                format : 'tiles',
                tileMatrixSetID : 'c',
                credit : new Cesium.Credit('天地图全球影像服务'),
                subdomains : ['t0','t1','t2','t3','t4','t5','t6','t7'],
                maximumLevel : 15,
                tilingScheme : new Cesium.GeographicTilingScheme(),
                tileMatrixLabels:['1','2','3','4','5','6','7']
            });
        }
    });
    providerViewModels.push(tdtModel);

	var tdtVectorModel = new Cesium.ProviderViewModel({
		name : '天地图矢量',
        iconUrl : "../images/tianditu.jpg",
        tooltip : 'TianDiTu Provider',
        creationFunction : function() {
            return new Cesium.WebMapTileServiceImageryProvider({
                url : 'http://t0.tianditu.com/vec_w/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=vec&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles',
                layer : 'vec',
                style : 'default',
                format : 'tiles',
                tileMatrixSetID : 'w',
                credit : new Cesium.Credit('天地图全球矢量地图服务'),
                maximumLevel : 18
            });
        }
	});
	providerViewModels.push(tdtVectorModel);
	
	// 本地地图
	var globeModel = new Cesium.ProviderViewModel({
            name : '本地地图',	// 名字
            iconUrl : "../images/earthIcon.jpg",	// 缩略图的url
            tooltip : '本地全球地图',	// 鼠标悬浮提示
            creationFunction : function() {	// 对应绑定的ImageryProvider
                return new Cesium.SingleTileImageryProvider({
                    url : '../images/earth.jpg'
                });
            }
        });
        providerViewModels.push(globeModel);
	
	// ARCGIS地图
	var arcgisModel = new Cesium.ProviderViewModel({
		name : 'ESRI地图',	// 名字
        iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),	// 缩略图的url
        tooltip : 'ESRI_Imagery_World_2D imagery',	// 鼠标悬浮提示
        creationFunction : function() {	// 对应绑定的ImageryProvider
            return new Cesium.ArcGisMapServerImageryProvider({
                url: 'http://server.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer',
				enablePickFeatures: false
               });
          }
	});
	providerViewModels.push(arcgisModel);
	
	var localModel = new Cesium.ProviderViewModel({
            name : 'pre_Layer1',	// 名字
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerial.png'),	// 缩略图的url
            tooltip : 'pre_Layer1 imagery',	// 鼠标悬浮提示
            creationFunction : function() {	// 对应绑定的ImageryProvider
                return new Cesium.SingleTileImageryProvider({
                    url : '../asset/img/pre_Layer1.png'
                });
            }
        });
//        providerViewModels.push(localModel);

		var localModel1 = new Cesium.ProviderViewModel({
            name : 'scpdsi_Layer1',
            iconUrl : "../asset/local.png",
            tooltip : 'Local Image Provider',
            creationFunction : function() {
                return new Cesium.SingleTileImageryProvider({
                    url : '../asset/img/scpdsi_Layer1.png'
                });
            }
        });
//        providerViewModels.push(localModel1);

		// 必应地图
		var bingMapModel = new Cesium.ProviderViewModel({
            name : '必应地图',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerial.png'),
            tooltip : 'Bing Maps aerial imagery \nhttp://www.bing.com/maps',
            creationFunction : function() {
                return new Cesium.BingMapsImageryProvider({
                    url : 'https://dev.virtualearth.net',
                    mapStyle : Cesium.BingMapsStyle.AERIAL
                });
            }
        });
//        providerViewModels.push(bingMapModel);

		// 谷歌地图
		var googlemap = createGoogleMapsByAPI(Cesium,{key:"AIzaSyBV9Ir9skml9c2i4iORl_Sa6OwspWtBwbk"});
        var googlemapModel = new Cesium.ProviderViewModel({
            name : '谷歌地图',
            iconUrl : "./asset/local.png",
            tooltip : 'Google Maps Provider',
            creationFunction : function() {
                return googlemap;
            }
        });
//        providerViewModels.push(googlemapModel);

		// MapBox
		var mapBoxModel = new Cesium.ProviderViewModel({
            name : 'MapBox地图',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapboxTerrain.png'),
            tooltip : 'MapBox Provider',
            creationFunction : function() {
                return new Cesium.MapboxImageryProvider({
                    mapId: 'mapbox.satellite'
                });
            }
        });
        providerViewModels.push(mapBoxModel);

		// openStreetMap
		providerViewModels.push(new Cesium.ProviderViewModel({
            name : 'OSM地图',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
            tooltip : 'OpenStreetMap (OSM) is a collaborative project to create a free editable map \
of the world.\nhttp://www.openstreetmap.org',
            creationFunction : function() {
                return Cesium.createOpenStreetMapImageryProvider({
                    url : 'https://a.tile.openstreetmap.org/'
                });
            }
        }));

		// 全球夜景图
		var earthNightModel = new Cesium.ProviderViewModel({
			name : '全球夜景图',
            iconUrl : "../images/tianditu.jpg",
            tooltip : 'The Earth at night by NASA',
			creationFunction : function() {
                return new Cesium.IonImageryProvider({ assetId: 3812 });
            }
		});
//		providerViewModels.push(earthNightModel);

		// arcgis online
		var tilingScheme = new Cesium.WebMercatorTilingScheme();
        var rectangle = tilingScheme.rectangle;
        var url = "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
        var arcgis = new Cesium.UrlTemplateImageryProvider({
            url: url,
            tilingScheme: tilingScheme,
            tileWidth: 256,
            tileHeight: 256,
            minimumLevel: 0,
            rectangle: rectangle
        });

        var arcgisModel = new Cesium.ProviderViewModel({
            name : 'ArcGIS',
            iconUrl : "./images/arcgis.png",
            tooltip : 'ArcGIS Online',
            creationFunction : function() {
                return arcgis;
            }
        });
//        providerViewModels.push(arcgisModel);

		// 地形图
        providerTerrainViewModels.push(new Cesium.ProviderViewModel({
            name : 'WGS84 Ellipsoid',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/Ellipsoid.png'),
            tooltip : 'WGS84 standard ellipsoid, also known as EPSG:4326',
            creationFunction : function() {
                return new Cesium.EllipsoidTerrainProvider();
            }
        }));
        
        providerTerrainViewModels.push(new Cesium.ProviderViewModel({
            name : 'STK World Terrain meshes',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/STK.png'),
            tooltip : 'High-resolution, mesh-based terrain for the entire globe. Free for use on the Internet. Closed-network options are available.\nhttp://www.agi.com',
            creationFunction : function() {
                return new Cesium.CesiumTerrainProvider({
                    url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
                    requestWaterMask : true,
                    requestVertexNormals : true
                });
            }
        }));
        
//        providerTerrainViewModels.push(new Cesium.ProviderViewModel({
//            name : 'ArcGIS World Terrain meshes',
//            iconUrl : "./asset/local.png",
//            tooltip : 'High-resolution, mesh-based terrain for the entire globe. Free for use on the Internet. Closed-network options are available.\nhttp://www.agi.com',
//            creationFunction : function() {
//                return createArcGisElevation3DTerrainProvider(Cesium);
//            }
//        }));

