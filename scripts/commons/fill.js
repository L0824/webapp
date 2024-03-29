/**
 * 地形填充（等值线面）
 */	
function fill(){
	//设置相机视角
    viewer.scene.camera.setView({
        destination : new Cesium.Cartesian3.fromDegrees(103.064734,31.12816,8870.867706),
        orientation : {
            heading : 0.34555839949062594,
            pitch : -0.1422794351856307,
            roll : 0.0009471063581933947
        }
    });

    //创建分层设色对象
    var hyp = new Cesium.HypsometricSetting();
    //设置分层设色的显示模式为线
    hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.LINE;
    //设置线颜色为红色
    hyp._lineColor = new Cesium.Color(1.0, 0.0, 0.0, 1.0);
    //等高线间隔为100m
    hyp.LineInterval = 100.0;
    //设置分层设色的最大/最小可见高度
    hyp.MaxVisibleValue = 9000;
    hyp.MinVisibleValue = 0;
    //设置分层设色颜色表的最大/最小key值,表示在此高度范围内显示颜色表
    hyp.ColorTableMinKey = 2736.88110351563;
    hyp.ColorTableMaxKey = 5597.06640625;
    //新建颜色表
    var colorTable = new Cesium.ColorTable();

    colorTable.insert(5597.06640625,new Cesium.Color(0, 0, 255/255));
    colorTable.insert(5406.3873860677086,new Cesium.Color(0, 51/255, 255/255));
    colorTable.insert(5215.7083658854172,new Cesium.Color(0, 102/255, 255/255));
    colorTable.insert(5025.0293457031257,new Cesium.Color(0, 153/255, 255/255));
    colorTable.insert(4834.3503255208343,new Cesium.Color(0, 204/255, 255/255));
    colorTable.insert(4643.6713053385429,new Cesium.Color(0, 255/255, 255/255));
    colorTable.insert(4452.9922851562524,new Cesium.Color(51/255, 255/255, 204/255));
    colorTable.insert(4262.3132649739609,new Cesium.Color(102/255, 255/255, 153/255));
    colorTable.insert(4071.6342447916695,new Cesium.Color(153/255, 255/255, 102/255));
    colorTable.insert(3880.9552246093781,new Cesium.Color(204/255, 255/255, 51/255));
    colorTable.insert(3690.2762044270867,new Cesium.Color(255/255, 255/255, 0));
    colorTable.insert(3499.5971842447952,new Cesium.Color(255/255, 204/255, 0));
    colorTable.insert(3308.9181640625038,new Cesium.Color(255/255, 153/255, 0));
    colorTable.insert(3118.2391438802129,new Cesium.Color(255/255, 102/255, 0));
    colorTable.insert(2927.5601236979214,new Cesium.Color(255/255, 51/255, 0));
    colorTable.insert(2736.88110351563,new Cesium.Color(255/255, 0, 0));

    //设置分层设色的颜色表
    hyp.ColorTable = colorTable;
    //设置分层设色的透明度
    hyp.Opacity = 0.4;

    //下拉菜单变化时切换分层设色的显示模式
    $('#fillOptions').change(function(){
        var value = $(this).val();
        switch (value){
            case 'None' : viewer.scene.globe.HypsometricSetting = undefined;break;
            case 'Line' : {
                hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.LINE;
                viewer.scene.globe.HypsometricSetting = {
                    hypsometricSetting : hyp,
                    analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
                };
            }
                break;
            case 'Region' : {
                hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
                viewer.scene.globe.HypsometricSetting = {
                    hypsometricSetting : hyp,
                    analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
                };
            }
                break;
            case 'Line_Region' : {
                hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE_AND_LINE;
                viewer.scene.globe.HypsometricSetting = {
                    hypsometricSetting : hyp,
                    analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
                };
            }
                break;
            default : break;
        }

    });
    $('#fill').show();
    $('#loadingbar').remove();
}