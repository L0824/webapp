<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!doctype html>
<html lang="en">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
     <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>全球变化大数据云共享平台</title>
    <link rel="icon" type="image/x-icon" href="images/favicon.ico"/> 
    <link rel="stylesheet" href="css/commoncss/normalize.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="font/iconfont.css"> 
  <link href="Cesium-1.44/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
  <script type="text/javascript" src="Cesium-1.44/Build/Cesium/Cesium.js"></script>
  <style>
      html, body, #cesiumContainer {
          width: 100%; height: 85%; margin: 0; padding: 0; overflow: hidden;
      }
  </style>
 </head>
 <body class="body-box">
 <div class="body-wrapper" style="z-index:100">
        <!-- 标题 start-->
            <header class="header">
                    <i class="icon-logo entr-r"><img src="images//logo.png" alt=""></i>
                    <div class="title-text entr">
                        <span class="chinese-text">全球变化大数据云共享平台</span>
                        <span class="english-text">Global change large data cloud sharing platform</span>
                    </div>               
            </header>
        <!-- 标题 end-->
        <!-- 项目简介 start-->
        <div class="program-des">
            <div class="p-description">
                <p class="title">项目简介:</p>
                <p class="p2">国家重大研发计划“全球变化大数据的科学认知与云共享平台”项目拟通过整合中国优势数据</p>
            </div>
            <div class="div-link">
                <a href="#" class="a-link"><span>更多</span><i class="iconfont icon-jiantouyou"></i></a>
            </div>
        </div>
        <!-- 项目简介 end-->
        <!-- 功能页面入口 start-->
        <div id="cesiumContainer" class="">
        
        <!-- 功能页面入口 end-->
    </div>
    
    <div class="function-entrance">
        <!-- <a href="html/home.html" class="toHome"> -->
            <div class="entrance-box">
                <div class="entrance-ul">
                    <div class="entrance-li">
                        <a class="left-icon entr entr-box" href="#">
                                <i class="icon-data icon"></i>
                                <div class="page-description">
                                        <div class="page-title">数据资源</div>
                                        <div class="p-des">数据资源是在大数据时代，对各种统计、计算、科学研究或技术所倚靠的数据来源</div>
                                </div>
                                
                        </a>
                    </div>
                    <div class="entrance-li">
                        <a href="html/home.html" class="enter-home">
                            <div class="outer-a">
                                <div class="outer-b">
                                    <div class="outer-c">
                                       
                                        <span class="enter-text">点击进入</span>
                                        <i class="iconfont icon-jiantou"></i>
                                  
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="entrance-li">
                        <a class="right-icon entr entr-box" href="#">
                                
                                <div class="page-description">
                                    
                                        <div class="page-title right-text">在线算法分析</div>
                                        <div class="p-des right-text">在线分析是在大数据时代，对数据采集挖掘、应用的技术越来越受到瞩目</div>
                                    </div>
                                    <i class="icon-sf icon"></i>
                                    
                                
                                
                                
                        </a>
                    </div>
                </div>
              
                
                
            </div>
        <!-- </a> -->
        </div>
  </div>
    <script type="text/javascript" src="scripts/cesium/main.js"></script>
 </body>
</html>