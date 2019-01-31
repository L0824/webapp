var vm = new Vue({
    el: "#app",
    data: function () {
        return {
            newsDynamicDetail: null
        }
    },
    methods: {
        getUrl: function () {
            _this = this;
            $.ajax({
                url: "../../api.json",
                type: "get",
                dataType: "json",
                success: function (data) {
                    // console.log(data)            
                    _this.baseUrl = data.result.baseUrl;
                    _this.showDetail();
                },
                error: function () {
                    console.log(error);
                }
            })

        },
        gotoTop:function(){
            $(".toTop").tooltip("toTop",{
                'movespeed':'300',
                'showspeed':'300',
                'overheight':'400'
            });
        },
        showDetail: function () {
            var param = sessionStorage.getItem('newsDynamicTitle');
            var _this = this;
            var apiUrl = this.baseUrl + '/manage/newsApi/getNewsByTitle'
            let params = new URLSearchParams();
            params.append("title", param);
            axios({
                method: 'post',
                url: apiUrl,
                data: params
            }).then((res) => {
                var datas = res.data;
                datas[0].content = unescape(unescape(datas[0].content));
                _this.newsDynamicDetail = datas[0];
                // console.log(datas[0]);
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
    created: function () {
        this.getUrl()
    },
    mounted:function(){
        this.gotoTop(); 
    }
})