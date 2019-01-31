var vm = new Vue({
    el:"#app",
    data:{
        lastProgress:[],
        lastNews:[],
    },
    methods:{
        // 页面渲染前获取列表消息
        getUrl:function(){            
            _this = this;
            var baseUrl;
            $.ajax({
                url:"../../../../api.json",
                type:"get",
                dataType:"json",
                success:function(data){
                    _this.baseUrl = data.result.baseUrl;
                    _this.showList(_this.baseUrl);

                },
                error:function(){
                   console.log(error);
                }
            })
        
        },
        showList:function(x){
            // 最新进展列表接口
            var apiUrl1 =  x + '/manage/latestdevApi/list';
            // 最新资讯列表接口
            var apiUrl2 = x + '/manage/latestinfoApi/list';
            var _this = this;
            //请求最新进展数据
            axios.get(apiUrl1).then(function(res) {
                var datas = res.data.result;
                for(var i = 0;i<datas.length;i++){
                    _this.lastProgress.push(datas[i]);
                }
            }).catch(function(err) {
                console.error(err);
            });
            // console.log(_this.lastProgress);
            // 请求最新资讯数据
            axios.get(apiUrl2).then(function(res) {
                var datas = res.data.result;
                for(var i = 0;i<datas.length;i++){
                    _this.lastNews.push(datas[i]);
                }
                
            }).catch(function(err) {
                console.error(err);
            });
        }
    },
    created:function(){
        this.getUrl();
    }
})