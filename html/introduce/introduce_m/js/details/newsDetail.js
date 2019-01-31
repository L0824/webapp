var vm = new Vue({
    el:"#app",
    data:{
        newsDetail:[]
    },
    methods:{
        getUrl:function(){
            _this = this;
            var baseUrl;
            $.ajax({
                url:"../../../../../api.json",
                type:"get",
                dataType:"json",
                success:function(data){
                    _this.baseUrl = data.result.baseUrl;
                    // console.log( _this.baseUrl);
                    _this.getDetail(_this.baseUrl);

                },
                error:function(){
                   console.log(error);
                }
            })
        },
        getDetail:function(x){
            var _this = this;
            //location.search可以获取到地址栏中"?"符后的字串
            var url = location.search; //获取url中"?"符后的字串
            var param = url.split("=")[1];
            // 最新资讯详情接口            
            var url = location.search; //获取url中"?"符后的字串
            var param = url.split("=")[1];
           
            var apiUrl = x + '/manage/latestinfoApi/info/'+param;
            // http://192.168.1.27:4389/manage/latestdevApi/info/{7}
            console.log(apiUrl);
            var _this = this;
            axios.get(apiUrl).then(function(res) {
                var datas = res.data.result;
                // console.log(datas);
                // if(datas.topPic !=''){
                //     datas.topPic = x + datas.topPic;
                // }
                datas.content = unescape(unescape(datas.content));
                // console.log( datas.content);

                _this.newsDetail = datas;
                
            }).catch(function(err) {
                console.error(err);
            });
        },
        

    },
    created:function(){
        this.getUrl();
    }
})