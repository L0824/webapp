/**
 * 量算
 */
	var clampMode = 0;
	var handlerDis,handlerArea,handlerHeight;
	//初始化测量距离
    handlerDis = new Cesium.MeasureHandler(viewer,Cesium.MeasureMode.Distance,0);
    //注册测距功能事件
    handlerDis.measureEvt.addEventListener(function(result){
        var distance = result.distance > 1000 ? (result.distance/1000).toFixed(2) + 'km' : parseFloat(result.distance).toFixed(2) + 'm';
        handlerDis.disLabel.text = '距离:' + distance;
        
    });
    handlerDis.activeEvt.addEventListener(function(isActive){
        if(isActive == true){
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('measureCur').addClass('measureCur');
        }
        else{
            viewer.enableCursorStyle = true;
            $('body').removeClass('measureCur');
        }
    });

    //初始化测量面积
    handlerArea = new Cesium.MeasureHandler(viewer,Cesium.MeasureMode.Area,0);
    handlerArea.measureEvt.addEventListener(function(result){
        var area = result.area > 1000000 ? (result.area/1000000).toFixed(2) + 'km²' : parseFloat(result.area).toFixed(2) + 'm²';
        handlerArea.areaLabel.text = '面积:' + area;
    });
    handlerArea.activeEvt.addEventListener(function(isActive){
        if(isActive == true){
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('measureCur').addClass('measureCur');
        }
        else{
            viewer.enableCursorStyle = true;
            $('body').removeClass('measureCur');
        }
    });

    //初始化测量高度
    handlerHeight = new Cesium.MeasureHandler(viewer,Cesium.MeasureMode.DVH);
    handlerHeight.measureEvt.addEventListener(function(result){
        var distance = result.distance > 1000 ? (result.distance/1000).toFixed(2) + 'km' : result.distance + 'm';
        var vHeight = result.verticalHeight > 1000 ? (result.verticalHeight/1000).toFixed(2) + 'km' : result.verticalHeight + 'm';
        var hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance/1000).toFixed(2) + 'km' : result.horizontalDistance + 'm';
        handlerHeight.disLabel.text = '空间距离:' + distance;
        handlerHeight.vLabel.text = '垂直高度:' + vHeight;
        handlerHeight.hLabel.text = '水平距离:' + hDistance;
    });
    handlerHeight.activeEvt.addEventListener(function(isActive){
        if(isActive == true){
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('measureCur').addClass('measureCur');
        }
        else{
            viewer.enableCursorStyle = true;
            $('body').removeClass('measureCur');
        }
    });

    $('#distance').click(function(){
        deactiveMeaCalAll();
        handlerDis && handlerDis.activate();
    });

    $('#area').click(function(){
        deactiveMeaCalAll();
        handlerArea && handlerArea.activate();
    });
    $('#height').click(function(){
        deactiveMeaCalAll();
        handlerHeight && handlerHeight.activate();
    });
    $('#clear1').click(function(){
    	clearMeaCalAll();
    });

    $('#selOpt').change(function() {
        var value = $(this).val();
        if(value == '1'){
            clampMode = 0;
            handlerArea.clampMode = 0;
            handlerDis.clampMode = 0;
        }
        else{
            clampMode = 1;
            handlerArea.clampMode = 1;
            handlerDis.clampMode = 1;
        }
    });


    if(!scene.pickPositionSupported){
        alert('不支持深度拾取,量算功能无法使用(无法进行鼠标交互绘制)！');
    }

    function clearMeaCalAll(){
        handlerDis  && handlerDis.clear();
        handlerArea  && handlerArea.clear();
        handlerHeight && handlerHeight.clear();
    }

    function deactiveMeaCalAll(){
        handlerDis  && handlerDis.deactivate();
        handlerArea  && handlerArea.deactivate();
        handlerHeight && handlerHeight.deactivate();
    }
