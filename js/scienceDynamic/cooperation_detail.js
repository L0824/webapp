var vm = new Vue({
    el:"#app",
    data:{
        coopDetail:null,
        baseUrl:null,
    },
    methods:{
        getUrl:function(){
            _this = this;
            $.ajax({
                url:"../../api.json",
                type:"get",
                dataType:"json",
                async: false,
                success:function(data){
                    _this.baseUrl = data.result.baseUrl;

                },
                error:function(){
                   console.log(error);
                }
            })
        },
        getDetail:function(){
            var _this = this;
            // 最新资讯详情接口            
            var url = location.search; //获取url中"?"符后的字串
            var param = url.split("=")[1];
            var apiUrl = this.baseUrl + '/manage/exchangeApi/info/'+param;
            axios.get(apiUrl).then(function(res) {
                var datas = res.data.result;
                datas.content = unescape(unescape(datas.content));
                if(datas.newsSource==null||datas.newsSource==''){
                    datas.newsSource = '无';
                } 
                // console.log( datas.content);
                // console.log(datas.content);
                _this.coopDetail = datas;
                
            }).catch(function(err) {
                console.error(err);
            });
        },
        gotoTop:function(){
            $(".toTop").tooltip("toTop",{
                'movespeed':'300',
                'showspeed':'300',
                'overheight':'400'
            });
        }

    },
    created:function(){
        this.getUrl();
    },
    mounted:function(){
        this.gotoTop(); 
        this.getDetail();
        
    }
})