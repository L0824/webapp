var developMode = false;

if(developMode){
	
} else{
	require.config({
		  paths: {
                'WindMap':'../../scripts/widget/visual/windmap',
                'Cesium':'../../Cesium-1.44/Build/Cesium/Cesium.js'
		  },
		  shim: {
              
		  }
	});
}

 if (typeof require === "function") {
	 require(["Cesium"], onload);
}
