var vm = new Vue({
    el:"#app",
    data:function(){
        return{
            baseUrl:null,
            intelData1:null,
            intelData2:null
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
            _this = this;
            $.ajax({
                url:"../../api.json",
                type:"get",
                async: false,
                dataType:"json",
                success:function(data){                 
                    _this.baseUrl = data.result.baseUrl;
                   
                },
                error:function(){
                    console.log(error);
                }
            })

        },
        getData:function(){
            var _this = this;
            var apiUrl = this.baseUrl +'/manage/latestdevApi/list';
            axios.get(apiUrl).then(function(res) {
                var datas = res.data.result;
                var newArr1 = [];
                var newArr2 = [];
                var newArr3 = [];
                var newArr4 = [];
                var newArr5 = [];
                var newArr6 = [];
                var newArr7 = [];
                var newArr8 = [];
                var newArr9 = [];
                var newArr10 = [];
                var newArr11 = [];
                var newArr12 = [];
                var newArr13 = [];
                var newArr14 = [];
                var newArr15 = [];
                var newArr16 = [];
                var intelList1 = [];
                for(var i = 0;i<datas.length;i++){
                    if(i<25){
                        newArr1.push(datas[i]);
                    }
                }
                for(var i = 0;i<newArr1.length;i++){
                    if(i<22){
                        newArr2.push(newArr1[i]);
                    }else{
                        newArr3.push(newArr1[i]);
                    }
                }
                
                for(var i = 0;i<newArr2.length;i++){
                    if(i<11){
                        newArr4.push(newArr2[i]);
                    }else{
                        newArr5.push(newArr2[i]);
                    }
                }
                for(var i = 0;i<newArr4.length;i++){
                    if(i==0){
                        newArr6.push(newArr4[i]);
                    }else{
                        newArr7.push(newArr4[i]);
                    }
                }
                for(var i = 0;i<newArr7.length;i++){
                    if(i<5){
                        newArr11.push(newArr7[i]);
                    }else{
                        newArr12.push(newArr7[i]);
                    }
                }
                newArr15.push(newArr11);
                newArr15.push(newArr12);
                newArr6.push(newArr15);
                if(newArr5.length>0){

                    for(var i =0;i<newArr5.length;i++){
                        if(i==0){
                            newArr9.push(newArr5[i]);
                        }else{
                            newArr10.push(newArr5[i]);
                        }
                    }
                    for(var i = 0;i<newArr10.length;i++){
                        if(i<5){
                            newArr13.push(newArr10[i]);
                        }else{
                            newArr14.push(newArr10[i]);
                        }
                    }
                    newArr16.push(newArr13);
                    newArr16.push(newArr14);
                    newArr9.push(newArr16);
                }
                intelList1.push(newArr6);
                if(newArr9.length!=0){
                    intelList1.push(newArr9);
                }
                _this.intelData1 = intelList1;
                if(newArr3.length!=0){
                    _this.intelData2 = newArr3;
                }
                //遍历获取第一个img的url
                _this.intelData1.forEach(element => {
                    for(var i =0;i<element.length;i++){
                        element[i].content = unescape(unescape(element[i].content));
                        element[i].topPic =  _this.getTopUrl(element[i].content);
                    }
                });
                console.log(_this.intelData1)
                console.log(_this.intelData2)
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
    },
    created:function(){
        this.getUrl();
    },
    mounted:function(){
        this.gotoTop(); 
        this.getData();
       
        
    }
})