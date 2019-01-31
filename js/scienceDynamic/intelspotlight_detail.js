var vm = new Vue({
    el:"#app",
    data:function(){
        return{
            baseUrl:null,
            intelDetail:null
        }
    },
    methods:{
         gotoTop:function(){        
            $(".toTop").tooltip("toTop",{
                'movespeed':'300',
                'showspeed':'300',
                'overheight':'400'
            });
        },
        getUrl:function(){
            var _this = this;
            $.ajax({
                url:"../../api.json",
                type:"get",
                async: false,
                dataType:"json",
                success:function(data){
                    _this.baseUrl = data.result.baseUrl;
                    // console.log( _this.baseUrl);
                   

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
            var apiUrl = this.baseUrl + '/manage/focusintApi/info/'+param;
            var _this = this;
            axios.get(apiUrl).then(function(res) {
                var datas = res.data.result;
                datas.content = unescape(unescape(datas.content));
                if(datas.newsSource==null||datas.newsSource==''){
                    datas.newsSource = '无';
                } 
                _this.intelDetail = datas;
                console.log(datas)
                
            }).catch(function(err) {
                console.error(err);
            });
        },
       
       

    },
    created:function(){
        this.getUrl();
    },
    mounted:function(){
        
        this.getDetail();
        this.gotoTop();
    }
})