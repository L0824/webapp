var vm = new Vue({
    el:"#progress",
    data:{
        progressDetail:[]
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
            var url = location.search; //获取url中"?"符后的字串
            var param = url.split("=")[1];
           
            var apiUrl = x + '/manage/latestdevApi/info/'+param;
            // console.log(apiUrl);
            var _this = this;
            axios.get(apiUrl).then(function(res) {
                var datas = res.data.result;
                // console.log(res.data.result);
                // if(datas.topPic !=''){
                //     datas.topPic = x + datas.topPic;
                // }
                datas.content = unescape(unescape(datas.content));
                // console.log( datas.content);

                _this.progressDetail = datas;
                
            }).catch(function(err) {
                console.error(err);
            });
        },
        

    },
    created:function(){
        this.getUrl();
    }
})