/**
 * 多重同步视图
 */
define(function() {
	return {
		show : function() {
			var options2D = {
				    homeButton : false,
				    fullscreenButton : false,
				    sceneModePicker : false,
				    clockViewModel : clockViewModel,
				    baseLayerPicker : true,
				    infoBox : false,
				    geocoder : false,
				    sceneMode : Cesium.SceneMode.SCENE2D, // 只显示二维地图
				    imageryProviderViewModels : providerViewModels, // 加载影像
				    navigationHelpButton : false,
					timeline : false, // 时间线
				    animation : false,
				    navigation : false
				};
			var view2D = new Cesium.Viewer('view2D', options2D);
//			view2D._cesiumWidget._creditContainer.style.display = "none"; // 去除水印
			var worldPosition;
			var distance;

			function sync2DView() {
			    // The center of the view is the point that the 3D camera is focusing on
			    var viewCenter = new Cesium.Cartesian2(Math.floor(viewer.canvas.clientWidth / 2), Math.floor(viewer.canvas.clientHeight / 2));
			    // Given the pixel in the center, get the world position
			    var newWorldPosition = viewer.scene.camera.pickEllipsoid(viewCenter);
			    if (Cesium.defined(newWorldPosition)){
			        // Guard against the case where the center of the screen
			        // does not fall on a position on the globe
			        worldPosition = newWorldPosition;
			    }
			    // Get the distance between the world position of the point the camera is focusing on, and the camera's world position
			    distance = Cesium.Cartesian3.distance(worldPosition, viewer.scene.camera.positionWC);
			    // Tell the 2D camera to look at the point of focus. The distance controls how zoomed in the 2D view is
			    // (try replacing `distance` in the line below with `1e7`. The view will still sync, but will have a constant zoom)
			    view2D.scene.camera.lookAt(worldPosition, new Cesium.Cartesian3(0.0, 0.0, distance));
			}

			// Apply our sync function every time the 3D camera view changes
			viewer.camera.changed.addEventListener(sync2DView);
			// By default, the `camera.changed` event will trigger when the camera has changed by 50%
			// To make it more sensitive, we can bring down this sensitivity
			viewer.camera.percentageChanged = 0.01;

			// Since the 2D view follows the 3D view, we disable any
			// camera movement on the 2D view
			view2D.scene.screenSpaceCameraController.enableRotate = false;
			view2D.scene.screenSpaceCameraController.enableTranslate = false;
			view2D.scene.screenSpaceCameraController.enableZoom = false;
			view2D.scene.screenSpaceCameraController.enableTilt = false;
			view2D.scene.screenSpaceCameraController.enableLook = false;
			//Sandcastle_End
			    Sandcastle.finishedLoading();
			document.getElementById('view2D').style.display = 'inline-block';
		}
	};

});