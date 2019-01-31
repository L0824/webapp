

var vm = new Vue({
    el:'#app',
    data:{
        baseUrl:null,
        newsList:null,
        metaList:null,
        intelData:null,
        lastedData:null
    },
    created:function(){
        this.getUrl();
    },
    mounted:function(){
        this.gotoTop();
        this.init();     
    },
    methods:{
        init:function(){
           
        },
        getUrl:function(){
            _this = this;
            $.ajax({
                url:"../../gcGate/api.json",
                type:"get",
                dataType:"json",
                success:function(data){
                console.log(data)    
                    _this.baseUrl = data.result.baseUrl;
                    _this.showNewsData(6);
                    _this.showMetaData(4);
                    _this.getIntelData(_this.baseUrl);
                    _this.getLastedData(_this.baseUrl);
                    
                },
                error:function(){
                    console.log(error);
                }
            })
        },
        showNewsData:function(num){
                var _this = this;
                var apiUrl = this.baseUrl+'/manage/newsApi/getNewsByNum/'+num;
                axios.get(apiUrl).then(function(res) {
                console.log(res)
                var datas = res.data;
                _this.newsList = datas;
                _this.newsList.forEach(function(element) {
                    element.content = unescape(unescape(element.content));
                    element.topPic =  _this.getTopUrl(element.content);
                });
                // console.log( _this.newsList);
                }).catch(function(err) {
                    console.error(err);
                });
        },
        //获取国际焦点数据
        getIntelData:function(base){
            var _this = this;
            var apiUrl = base+"/manage/focusintApi/list";
            axios.get(apiUrl).then(function(res) {
                var datas = res.data.result;
                // console.log(res.data.result);
                _this.intelData = datas;
                _this.intelData.forEach(element => {
                    for(var i =0;i<element.length;i++){
                        element[i].content = unescape(unescape(element[i].content));
                        element[i].topPic =  _this.getTopUrl(element[i].content);
                    }
                });
               
                // console.log(_this.intelData);
            }).catch(function(err) {
                console.error(err);
            });
        },
        //获取最新进展数据
        getLastedData:function(base){
                var _this = this;
                var apiUrl = base+"/manage/latestdevApi/list";
                axios.get(apiUrl).then(function(res) {
                    var datas = res.data.result;
                    // console.log(res.data.result);
                    _this.lastedData = datas;

                    _this.lastedData.forEach(element => {
                        for(var i =0;i<element.length;i++){
                            element[i].content = unescape(unescape(element[i].content));
                            if(element[i].topPic){
                                element[i].topPic = _this.lastedData.topPic;
                            }else{

                                element[i].topPic =  _this.getTopUrl(element[i].content);
                            }
                        }
                    });
                    console.log(_this.lastedData);
                }).catch(function(err) {
                    console.error(err);
                });
        },
        getTopUrl :function(str){          
            var array = [];
            str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
            function(match, capture) {
                array.push(capture);
            });
            if (array === undefined || array.length == 0) {
                return '';
            }
            return array[0].replace(/^\/\/[^/]+/, "");
        },
        showMetaData:function(num){
                var _this = this;
                var apiUrl = this.baseUrl+'/manage/metadataApi/getTopByNum/'+num;
                axios.get(apiUrl).then(function(res) {
                var datas = res.data;
                _this.metaList = datas;
                _this.metaList.forEach(function(element) {
                    if(element.mixImgUrl==null ||element.mixImgUrl==false){
                        element.mixImgUrl = false
                    }else{
                        element.mixImgUrl = _this.baseUrl+element.mixImgUrl;
                    }
                });
                // console.log(_this.metaList)
                }).catch(function(err) {
                    console.error(err);
                });
        },
        saveParam:function(x){
            sessionStorage.setItem('newsDynamicTitle',x);
        },
        linkToDetail:function(x){
            window.location.href = 'dataResource/dataResourceDetail.html?id='+x;
            
        },
        gotoTop:function(){
        
            $(".toTop").tooltip("toTop",{
                'movespeed':'300',
                'showspeed':'300',
                'overheight':'400'
            });
         
        }
    }
})