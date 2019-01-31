function initTmp(){
	removeAll();
    var layer = new Array();
    if(time != null){
    	clearInterval(time);
    }
    for(var i=0; i<12; i++){
    	updateLayers(1981, i+1);
    }
    
    for(var i=0; i<12; i++){
    	updateLayers(1982, i+1);
    }
    
    for(var i=0; i<12; i++){
    	updateLayers(1983, i+1);
    }
    
    function updateLayers(nY,nM) {
        var urlNew = "../images/tmp/" + nY + "." + nM + ".png";

        var pNew = new Cesium.SingleTileImageryProvider({
            url :urlNew
        });
        layer.push(imageryLayers.addImageryProvider(pNew));
    }
    scene.globe.enableLighting = false;
    imageryLayers.raiseToTop(layer[0]);
    viewer.clock.onTick.removeEventListener(clockStartListener); 
    earthRotation();
    
    var months = document.getElementById('months')
    var years = document.getElementById('years')
    var a = true;
    var len = 1;
    var y = 1981
    var i = 0;
        if (a) {
        	years.style.display = 'block';
        	months.style.display = 'block';
        	years.innerHTML = y + '年';
            months.innerHTML = len + '月';
            time = setInterval(function() {
            	if(i!=0 && (i+1)%12 == 0){
            		years.innerHTML = parseFloat(years.innerHTML) + 1 + '年'
            		months.innerHTML = (len-1) + '月';
            	}
                months.innerHTML = parseFloat(months.innerHTML) + 1 + '月'
                imageryLayers.remove(layer[i]); 
                imageryLayers.raiseToTop(layer[i+1]);
                i++;
                if (months.innerHTML == '12月' && years.innerHTML == '1983年') {
                    clearInterval(time);
                    a = true;
                    viewer.clock.onTick.removeEventListener(clockStartListener);
                }
            }, 1000);
            a = false;
        } else {
            return false;
        }
}