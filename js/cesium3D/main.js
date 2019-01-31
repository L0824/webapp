var developMode = false;

if(developMode){
	require.config({
	baseUrl : '../Source',

    paths: {
        echarts: '../examples/js/echarts.simple.min',
        CesiumHeatmap : '../examples/js/heatmap.min',
    },
    shim: {
        CesiumHeatmap : {
			exports : "CesiumHeatmap"
		},
        echarts : {
            exports : 'echarts'
        }
    }
	});
} else{
	require.config({
		  paths: {
                'WindMap':'../../scripts/widget/visual/windmap',
		  },
		  shim: {
              CesiumHeatmap : {
			  	exports : "CesiumHeatmap"
			  }
		  }
	});
}

if ( typeof CesiumHeatmap !== "undefined") {
    onload(CesiumHeatmap);
} else if (typeof require === "function") {
    require(["CesiumHeatmap"], onload);
}
