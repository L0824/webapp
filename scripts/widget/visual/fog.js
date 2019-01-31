/**
 * 雾展示
 */
define(function() {
	return {
		show : function() {
			var skyAtmosphere = scene.skyAtmosphere;

			// The viewModel tracks the state of our mini application.
			var viewModel = {
			    hueShift: 0.0,
			    saturationShift: 0.0,
			    brightnessShift: 0.0
			};
			// Convert the viewModel members into knockout observables.
			Cesium.knockout.track(viewModel);

			// Bind the viewModel to the DOM elements of the UI that call for it.
			var toolbar = document.getElementById('fogDiv');
			Cesium.knockout.applyBindings(viewModel, toolbar);

			// Make the skyAtmosphere's HSB parameters subscribers of the viewModel.
			function subscribeParameter(name) {
			    Cesium.knockout.getObservable(viewModel, name).subscribe(
			        function(newValue) {
			            skyAtmosphere[name] = newValue;
			        }
			    );
			}

			subscribeParameter('hueShift');
			subscribeParameter('saturationShift');
			subscribeParameter('brightnessShift');

			Sandcastle.addToggleButton('日光', scene.globe.enableLighting, function(checked) {
			    scene.globe.enableLighting = checked;
			});

			Sandcastle.addToggleButton('雾', scene.fog.enabled, function(checked) {
			    scene.fog.enabled = checked;
			});

			var camera = viewer.camera;
			camera.setView({
			    destination : Cesium.Cartesian3.fromDegrees(-75.5847, 40.0397, 1000.0),
			    orientation: {
			        heading : -Cesium.Math.PI_OVER_TWO,
			        pitch : 0.1,
			        roll : 0.0
			    }
			});

			//Sandcastle_End
			    Sandcastle.finishedLoading();
		}

	};

});