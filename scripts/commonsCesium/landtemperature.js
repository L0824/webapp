function initTmp(){
	var buttonAttr = document.getElementById('tmp');
	var imageryLayers = viewer.imageryLayers;
    var layer = new Array();
	
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
    
    imageryLayers.raiseToTop(layer[0]);
    scene.globe.enableLighting = false;
    
    var btn = document.getElementById('btn')
    var year = document.getElementById('year')
    var a = true;
    var len = 1;
    var y = 1981
    var i = 0;
        if (a) {
        	year.style.display = 'block';
        	btn.style.display = 'block';
        	year.innerHTML = y + '年';
            btn.innerHTML = len + '月';
            var time = setInterval(function() {
            	if(i!=0 && (i+1)%12 == 0){
            		year.innerHTML = parseFloat(year.innerHTML) + 1 + '年'
            		btn.innerHTML = (len-1) + '月';
            	}
                btn.innerHTML = parseFloat(btn.innerHTML) + 1 + '月'
                imageryLayers.remove(layer[i]); 
                imageryLayers.raiseToTop(layer[i+1]);
                i++;
                if (btn.innerHTML == '12月' && year.innerHTML == '1983年') {
                    clearInterval(time);
                    a = true;
                }
            }, 700);
            a = false;
        } else {
            return false;
        }
        
    var clear = document.getElementById('clear');
    clear.onclick=function(){
    	imageryLayers.remove(layer[layer.length-1]);
    	scene.globe.enableLighting = true;
    	buttonAttr.disabled = false;
    }
    
    buttonAttr.disabled = true;
}