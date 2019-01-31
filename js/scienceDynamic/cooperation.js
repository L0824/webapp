var vm = new Vue({
    el:"#app",
    data:{
        cooperation:[]
    },
    methods:{
        getUrl:function(){
            _this = this;
            var baseUrl;
            $.ajax({
                url:"../../api.json",
                type:"get",
                dataType:"json",
                success:function(data){
                    _this.baseUrl = data.result.baseUrl;
                    _this.showList(_this.baseUrl);
                },
                error:function(){
                //    console.log(error);
                }
            })
        },
        showList:function(x){
            var apiUrl = x + '/manage/exchangeApi/list';
            // console.log(apiUrl);
            // 请求合作交流数据
            axios.get(apiUrl).then(function(res) {
                var datas = res.data.result;
                // console.log(datas)
                for(var i = 0;i<datas.length;i++){
                    _this.cooperation.push(datas[i]);
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
        startLb:function(){
            $('#iview2').iView({
                pauseTime: 7000,
                pauseOnHover: true,
                directionNav: true,
                directionNavHide: false,
                controlNav: true,
                controlNavNextPrev: false,
                controlNavTooltip: false,
                nextLabel: "Próximo",
                previousLabel: "Anterior",
                playLabel: "Jugada",
                pauseLabel: "Pausa",
                // timer: "360Bar",
                // timerBg: "#EEE",
                // timerColor: "#000",
                // timerDiameter: 40,
                // timerPadding: 4,
                // timerStroke: 8,
                // timerPosition: "bottom-right"
            });
        }
    },
    created:function(){
       this.getUrl(); 
    },
    mounted:function(){
        this.gotoTop();
        this.startLb();
    }
});