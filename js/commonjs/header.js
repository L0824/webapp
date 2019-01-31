
Vue.component('head-nav',{
    props:{
        isShow: {
            type: Boolean,
            default: true
          },
         
    },
    data:function(){
        return {
            username:null
        }
    },
    template:
         '<div>'+
         '<div class="welcome-title">'+
         '<div class="g-container">'+
           '<div>欢迎进入全球变化大数据云共享平台！</div>'+
           '<div v-show="username" class="username">欢迎您！{{username}}</div>'+
         '</div>'+
         '</div>'+
         '<div class="header-container">'+
         '<div class="header-title">'+
         '<div class="g-container">'+
         '<a class="title-left" href="/gcGate/html/home.html">'+
         '<i class="icon-logo pull-left"></i>'+
         '<div class="title-text pull-left">'+
         '<span class="chinese-text">全球变化大数据云共享平台</span>'+
         '<span class="english-text"></span>'+
         '</div> '+
         '</a>'+
         '<a href="/gcGate/html/websiteMap.html" class="title-right"> '+
         '<div class="toWebsiteMap"><i class="iconfont icon-ditu1"></i><span>网站地图</span></div>'+  
         '</a>'+
         '</div>'+
         '</div>'+
         '<div class="header-nav" v-show="isShow">'+
         '<div class="g-container">'+
         '<ul class="nav-ul">'+
         '<li>'+
         '<a class="a0" href="/gcGate/html/home.html">首页</a><span class="line"></span>'+
         '</li>'+   
         '<li>'+
         ' <a class="a0" href="javascript:void(0)" >数据服务</a><span class="line"></span>'+
         '<ul class="sub-ul">'+
         '<li>'+'<a href="/gcGate/html/dataResource/dataResource.html">数据检索</a>'+'</li>'+
         '<li>'+'<a href="/gcGate/html/cesium3D.html" target="_blank">三维可视化</a>'+'</li>'+
         '<li>'+'<a href="/gcGate/html/2D.html" target="_blank">二维可视化</a>'+'</li>'+
         '<li>'+'<a href="/gcGate/html/topicService.html">专题服务</a>'+'</li>'+
         ' </ul>'+
         ' </li>'+
         '<li>'+'<a class="a0" href="/gcGate/html/daq.html">数据汇聚</a><span class="line"></span>'+'</li>'+ 
         '<li>'+'<a class="a0" href="http://47.94.130.255:8080/index/" >在线云计算</a><span class="line"></span>'+'</li>'+
         '<li>'+
         '<a class="a0" href="javascript:void(0)" >科技动态</a><span class="line"></span>'+
         '<ul class="sub-ul">'+
         '<li>'+'<a href="/gcGate/html/scienceDynamic/news.html">工作动态</a>'+'</li>'+
         '<li>'+'<a href="/gcGate/html/scienceDynamic/internationalSpotlight.html">国际焦点</a>'+'</li>'+
         '<li>'+'<a href="/gcGate/html/scienceDynamic/latestProgress.html">最新进展</a>'+'</li>'+
         '<li>'+'<a href="/gcGate/html/scienceDynamic/cooperation.html">合作交流</a>'+'</li>'+
         '</ul>'+
         ' </li>'+
         '<li>'+'<a class="a0" href="/gcGate/html/download/download.html" >下载园地</a><span class="line"></span>'+'</li>'+
                     
         '</ul>'+
         '</div>'+
         '</div>'+
         '</div>'+
         '</div>',
         methods:{
            getName:function(){
                var name = sessionStorage.getItem("loginName");
                if(name){
                    this.username = name;
                }
            }
         },
         mounted:function(){
            this.getName();
         }
});