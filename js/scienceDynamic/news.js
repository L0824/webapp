var vm = new Vue({
    el:'#app',
    data:{
     list : []
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
            var _this = this;
            var apiUrl = x + '/manage/wrokApi/list';
            // console.log(apiUrl);
            // 请求工作动态数据
            axios.get(apiUrl).then(function(response) {
                var d = response.data.result;
                console.log(d);
        	    d.map(function(value){
                    value.content = unescape(unescape(value.content));
                    value.topPic =  _this.getTopUrl(value.content);
                    // value.text = unescape(unescape(value.content)).replace(/<\/?.+?>/g,"");
                    return value;
                }); 
                
        	vm.list = d;    
                
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
        },
        clamp:function(){
            var para = $(".news-cnt ul li");
            // console.log(para);
            for(var i = 0;i<para.length;i++){
                var pra = para.eq(i).find(".news-para p");
                // console.log(pra) ;
                pra.each(function(index, element) {
                    $clamp(element, { clamp: 2, useNativeClamp: false });
                });           
            }
			
        }
    },
    created : function() {
        this.getUrl();        
    },
    mounted:function(){
        this.startLb();
        this.gotoTop();      
    },
    updated:function(){
        
        // this.clamp();
   
    }
});