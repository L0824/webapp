/**
 * 编辑绘制
 */
	var clampMode1 = 0;
    var tooltip = createTooltip(document.body);

    var handlerPoint = new Cesium.DrawHandler(viewer,Cesium.DrawMode.Point);
    handlerPoint.activeEvt.addEventListener(function(isActive){
        if(isActive == true){
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        }
        else{
            viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });
    handlerPoint.movingEvt.addEventListener(function(windowPosition){
        tooltip.showAt(windowPosition,'<p>点击绘制一个点</p>');
    });
    handlerPoint.drawEvt.addEventListener(function(result){
        tooltip.setVisible(false);
    });


    var handlerLine = new Cesium.DrawHandler(viewer,Cesium.DrawMode.Line);
    handlerLine.activeEvt.addEventListener(function(isActive){
        if(isActive == true){
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        }
        else{
            viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });
    handlerLine.movingEvt.addEventListener(function(windowPosition){
        if(handlerLine.isDrawing){
            tooltip.showAt(windowPosition,'<p>左键点击确定折线中间点</p><p>右键单击结束绘制</p>');
        }
        else{
            tooltip.showAt(windowPosition,'<p>点击绘制第一个点</p>');
        }

    });
    handlerLine.drawEvt.addEventListener(function(result){
        tooltip.setVisible(false);
    });

    var handlerPolygon = new Cesium.DrawHandler(viewer,Cesium.DrawMode.Polygon,clampMode1);
    handlerPolygon.activeEvt.addEventListener(function(isActive){
        if(isActive == true){
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        }
        else{
            viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });
    handlerPolygon.movingEvt.addEventListener(function(windowPosition){
        if(handlerPolygon.isDrawing){
            tooltip.showAt(windowPosition,'<p>点击确定多边形中间点</p><p>右键单击结束绘制</p>');
        }
        else{
            tooltip.showAt(windowPosition,'<p>点击绘制第一个点</p>');
        }
    });
    handlerPolygon.drawEvt.addEventListener(function(result){
        tooltip.setVisible(false);
    });


    var handlerMarker = new Cesium.DrawHandler(viewer,Cesium.DrawMode.Marker);
    handlerMarker.activeEvt.addEventListener(function(isActive){
        if(isActive == true){
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        }
        else{
            viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });
    handlerMarker.movingEvt.addEventListener(function(windowPosition){
        tooltip.showAt(windowPosition,'<p>点击绘制地标</p>');
    });
    handlerMarker.drawEvt.addEventListener(function(result){
        tooltip.setVisible(false);
    });
    $('#point').click(function(){
        deactiveEditDrawAll();
        handlerPoint.activate();
    });
    $('#polyline').click(function(){
        deactiveEditDrawAll();
        handlerLine.activate();
    });
    $('#polygon').click(function(){
        deactiveEditDrawAll();
        handlerPolygon.activate();
    });
    $('#marker').click(function(){
        deactiveEditDrawAll();
        handlerMarker.activate();
    });
    $('#clear').click(function(){
    	clearEditDrawAll();
    });
    $('#toolbar').show();
    $('#loadingbar').remove();
    function deactiveEditDrawAll(){
        handlerLine.deactivate();
        handlerPoint.deactivate();
        handlerPolygon.deactivate();
        handlerMarker.deactivate();
    }
    function clearEditDrawAll(){
        handlerLine.clear();
        handlerPoint.clear();
        handlerPolygon.clear();
        handlerMarker.clear();
    }
    if(!scene.pickPositionSupported){
        alert('不支持深度拾取,无法进行鼠标交互绘制！');
    }