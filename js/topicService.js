$(function(){
    var tab_li = $(".tabs .related-ul>li");
    tab_li.eq(3).addClass("cur").siblings().removeClass("cur");
    var tab_panel = $(".tabs .related-panel .panel-box");
    tab_panel.eq(3).show();
    tab_li.click(function(){
        var index = $(this).index();
        $(this).addClass("cur").siblings().removeClass("cur");
        tab_panel.eq(index).fadeIn().siblings().fadeOut();
    })
})
    var vm = new Vue({
        el:"#app",
        data:{
            categoryArr:[
                {
                    "className":"icon-qixiang",
                    "menuTitle":"全球及中国气候变化情景预估专题",
                },
                
               
            ],
        },
        methods:{
            getUrl:function(){
                _this = this;
                var baseUrl;
                $.ajax({
                    url:"../api.json",
                    type:"get",
                    dataType:"json",
                    success:function(data){
                        _this.baseUrl = data.result.baseUrl;
                        // _this.showList(_this.baseUrl);
                    },
                    error:function(){
                    //    console.log(error);
                    }
                })
            },
            showList:function(x){
                var apiUrl = x + '/manage/dataResourcesApi/dataTree';
            // console.log(apiUrl);
            // 请求合作交流数据
            axios.get(apiUrl).then(function(res) {
                var datas = res.data.result;
                for(var i = 0;i<datas.length;i++){
                    _this.categoryArr.push(datas[i]);

                }
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
            },

        },
        created:function(){
            this.getUrl();
        },
        mounted:function(){
            this.gotoTop();
        }
    })
