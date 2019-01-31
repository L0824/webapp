var search = Vue.component('search',{
    template:'#search',
    data:function(){
        return {
            index:0,
            startTime:"",
            endTime:"",
            mapLocation:null,
            citys:[
                {
                    name:'北京',
                    station:[
                        {
                            StationID: "54398",
                            CNAME:"顺义",
                        },
                        {
                            StationID: "54399",
                            CNAME:"海淀",
                        },
                        {
                            StationID: "54406",
                            CNAME:"延庆",
                        },
                        {
                            StationID: "54416",
                            CNAME:"密云",
                        },
                        {
                            StationID: "54419",
                            CNAME:"怀柔",
                        },
                        {
                            StationID: "54421",
                            CNAME:"密云上甸子",
                        },
                        {
                            StationID: "54424",
                            CNAME:"平谷",
                        },
                        {
                            StationID: "54431",
                            CNAME:"通州",
                        },
                        {
                            StationID: "54433",
                            CNAME:"朝阳",
                        },
                        {
                            StationID: "54499",
                            CNAME:"昌平",
                        },
                        {
                            StationID: "54501",
                            CNAME:"斋堂",
                        },
                        {
                            StationID: "54505",
                            CNAME:"门头沟",
                        },
                        {
                            StationID: "54511",
                            CNAME:"北京",
                        },
                        {
                            StationID: "54513",
                            CNAME:"石景山",
                        },
                        {
                            StationID: "54514",
                            CNAME:"丰台",
                        },
                        {
                            StationID: "54594",
                            CNAME:"大兴",
                        },
                        {
                            StationID: "54596",
                            CNAME:"房山",
                        },
                        {
                            StationID: "54597",
                            CNAME:"霞云岭",
                        },
                    ]
                },
                {
                    name:'天津'
                },
                {
                    name:'河北'
                },
                {
                    name:'山西'
                },
                {
                    name:'内蒙古'
                },
                {
                    name:'辽宁'
                },
                {
                    name:'吉林'
                },
                {
                    name:'黑龙江'
                },
                {
                    name:'上海'
                },
                {
                    name:'江苏'
                },
                {
                    name:'浙江'
                },
                {
                    name:'安徽'
                },
                {
                    name:'福建'
                },
                {
                    name:'江西'
                },
                {
                    name:'山东'
                },
                {
                    name:'河南'
                },
                {
                    name:'湖北'
                },
                {
                    name:'湖南'
                },
                {
                    name:'广东'
                },
                {
                    name:'广西'
                },
                {
                    name:'海南'
                },
                {
                    name:'重庆'
                },
                {
                    name:'四川'
                },
                {
                    name:'贵州'
                },
                {
                    name:'云南'
                },
                {
                    name:'西藏'
                },
                {
                    name:'陕西'
                },
                {
                    name:'甘肃'
                },
                {
                    name:'青海'
                },
                {
                    name:'宁夏'
                },
                {
                    name:'新疆'
                },
                {
                    name:'台湾'
                },
                {
                    name:'香港'
                },
                {
                    name:'澳门'
                },
                {
                    name:'极地'
                },
            ],
            yaosu:[
                {
                    name:'纬度',
                    zd:'V05001'
                },
                {
                    name:'经度',
                    zd:'V06001'
                },
                {
                    name:'测站高度',
                    zd:'V07001',
                },
                {
                    name:'气压',
                    zd:'V07004',
                },
                {
                    name:'位势高度',
                    zd:'V10009',
                },
                {
                    name:'温度',
                    zd:'V12001',
                },
                {
                    name:'露点温度',
                    zd:'V12003',
                },
                {
                    name:'风向',
                    zd:'V11001',
                },
            ],
            checkedTags:{},
            tags:[]
        }
    },
    methods:{
        init:function(){
            // 初始化 要素默认选择经纬度
            var _this = this;
           
            this.startTime = '1947-01-01';
            this.endTime = '1948-01-01';
            //初始化tags
            for(var i = 0;i<this.yaosu.length;i++){
                this.$set(this.tags,i,{'flag':false,'icon':true,'v1':this.yaosu[i].name,'v2':this.yaosu[i].zd})
                if(this.tags[i]['v1']=='经度'||this.tags[i]['v1']=='纬度' ){
                    this.tags[i]['flag'] = true;
                    this.tags[i]['icon'] = false;
                }
            }
           
            // layui初始化
            layui.use('form',function(){
                var form = layui.form
                var zt = $(".zt-selected");
                var btn = $(".toggle-btn");
                form.on('checkbox(city)', function(data){
                    if(data.elem.checked){
                        for(var i = 0;i<_this.citys[0]['station'].length;i++){
                            _this.$set(_this.checkedTags,i,true)
                        }  
                        btn.addClass('cur');
                        zt.css('height','auto');
                    }else{
                        for(var i = 0;i<_this.citys[0]['station'].length;i++){
                            _this.$set(_this.checkedTags,i,false)
                        }
                    }
                })
                form.on('checkbox(yaosu)', function(data){
                    if(data.elem.checked){
                        for(var i = 0;i<_this.yaosu.length;i++){
                            _this.tags[i]['flag'] = true;
                            
                        }  
                    }else{
                        for(var i = 0;i<_this.yaosu.length;i++){
                            _this.tags[i]['flag'] = false;
                            if(_this.tags[i]['v1']=='经度'||_this.tags[i]['v1'] =='纬度'){
                                _this.tags[i]['flag'] = true;
                            }
                            
                        }
                    }
                })
            });
        },
        openDate:function(){
            var _this = this;
            layui.use('laydate',function(){
                var $ = layui.jquery, 
                    laydate = layui.laydate;
                    laydate.render({
                        elem: '#d-from', //指定元素
                        value:'1947-01-01',
                        // min: '2018-09-01',            // 最小日期
                        // max: '2018-12-26', 
                        theme: '#656df5',
                        done: function(value, date, endDate){
                            _this.startTime = value;
                        }
                    });
                    laydate.render({
                        elem: '#d-to', //指定元素
                        value:'1948-01-01',
                        // min: '2018-09-01',            // 最小日期
                        // max: '2018-12-26',
                        theme: '#656df5',
                        done: function(value, date, endDate){
                            _this.endTime = value;
                        } 
                    });
            })
        },
        // 选择地图
        openMap:function(){
            var _this = this;
            layui.use('layer',function(){
                var $ = layui.jquery, 
                    layer = layui.layer;
                    layer.open({
                        type:2,
                        title:'地图选择',
                        closeBtn: 1,
                        anim: 0,
                        area: ['750px','513px'],
                        shade:[0.1,'#000'],
                        fixed: false,
                        btn: ['确定', '取消'],
                        move:false,
                        shadeClose: false,
                        content: "../../html/dataResource/dataR-map.html",
                        yes:function(index,layero){
                          var string = $("#location").html();
                          console.log(string)
                          if(string){
                              var arr =string.split(",");
                              var NodeToLink = function(Q){
                                    var F = 0,R = [];
                                    for (;++F < Q.length;) {
                                        R.push({x : Q[F - 1],y : Q[F]});
                                        F++; 
                                    }
                                    return R
                              };
                              var links = NodeToLink(arr);
                              _this.mapLocation = links;
                              $(".ztbox .mark").html("已选择地图区域")
                              console.log(_this.mapLocation)
                            }else{
                                _this.mapLocation = null;
                                $(".ztbox .mark").html("未选择地图区域")
                            }
                            layer.close(index);
                          
                        },
                        success:function(layero,index){
                          
                        }
                        
    
                    });
            })
        },
        // 选择站台效果
        selectZT:function(x){
            this.index = x;
        },
        // 选择城市
        selectCity:function(y){
            this.$set(this.checkedTags,y,true)
        },
        // 取消城市选择
        cancelSelect:function(z){
            this.$nextTick(function () {
                // DOM 更新了 在这里调用你的方法  
                this.checkedTags[z] = false;
            })
        },
        // 点击展开
        slideDown:function(){
            var zt = $(".zt-selected");
            var btn = $(".toggle-btn");
            btn.toggleClass("cur");
            if(btn.hasClass('cur')){
                zt.css('height','auto');
            }else{
                zt.css({'height':'84px','overflow':'hidden'})
            }
        },
        // 选择要素
        selectYS:function(param1,param2){
            
            this.tags[param2]['flag'] = true;
        },
        // 取消要素选择
        cancelYS:function(param){
            this.$nextTick(function () {
                // DOM 更新了 在这里调用你的方法  
                this.tags[param]['flag'] = false;
            })
        },
        // 选择全部要素
        // selectAllYS:function(){
        //     this.flag2 = !this.flag2;
        //     if(this.flag2){
        //         for(var i = 0;i<this.yaosu.length;i++){
        //                 this.$set(this.tags,i,true)
        //         }  
        //     }else{
        //         for(var i = 0;i<this.yaosu.length;i++){
        //             this.$set(this.tags,i,false)
        //         }
        //     }
        // }
        //点击开始检索，先验证，再检索
        search:function(){
            var _this = this;
            var base = this.$parent.baseUrl;
            //验证
            // 1、日期验证
            //日期不能为空
            if(!this.startTime || !this.endTime){
                alert("日期不能为空!");
                return false
            }
            // 开始时间不能大于结束时间
            if (this.startTime.length > 0 && this.endTime.length > 0) {
                var startTmp = this.startTime.split("-");
                var endTmp = this.endTime.split("-");
                var sd = new Date(startTmp[0], startTmp[1], startTmp[2]);
                var ed = new Date(endTmp[0], endTmp[1], endTmp[2]);
                if (sd.getTime() > ed.getTime()) {
                    alert("开始日期不能大于结束日期!");
                    return false;
                }
            }
            //2、要素选择不能为空
            var temp = false;
            for(var i = 0;i<this.tags.length;i++){
                if(this.tags[i]['flag']){
                    temp = true;
                }
            }
            if(!temp){
                alert('要素选择不能为空!')
                return false
            }
            //存储选择信息
            var arr = [];
            for(var i = 0;i<this.tags.length;i++){
                if(this.tags[i].flag){
                    arr.push(this.tags[i]);
                }
            }
            var obj = {
                starttime:this.startTime,
                endtime:this.endTime,
                yaosu:arr,
                point:_this.mapLocation
            };
            axios({
                method: 'post',
                url:base+'/manage/uparApi/getCont',
                data: {
                    begintime:obj.starttime,
                    endtime:obj.endtime,
                    point:obj.point
                }
            }).then((res) => {
                var datas = res.data;
                console.log(datas);
                if(datas>0){
                    console.log(datas)
                    sessionStorage.setItem('searchInfo',JSON.stringify(obj));
                    window.location.href="../../html/dataResource/result.html"
                }else{
                    alert('当前条件检索下无数据！');
                }
            });
        }

    },
mounted:function(){
    this.init();
    this.openDate();
   
}

})
var vm = new Vue({
    el:'#app',
    data:function(){
        return {
            baseUrl:'',
            categoryArr:[],
            id:'',
            dataGroupId:null,
        }
    },
    methods:{
        ini:function(){
            // 获取登录成功后的用户名
        },
         // 点击全部，显示所有表格数据
         showAllData:function(){
            this.dataGroupId = null;
            window.location = "../../html/dataResource/dataResource.html"
            sessionStorage.setItem('id','');
        },
        // 点击左边，右边内容切换
        changeRight:function(id){
            window.location = "../../html/dataResource/dataResource.html"
            sessionStorage.setItem('id',id);
            this.dataGroupId = null,
            this.id = id;
        },
        getUrl:function(){
            _this = this;
            $.ajax({
                url:"../../api.json",
                type:"get",
                dataType:"json",
                success:function(data){ 
                    _this.baseUrl = data.result.baseUrl;
                    _this.showList();
                },
                error:function(){
                    console.log(error);
                }
            })
        },
        showList:function(){
            var apiUrl = this.baseUrl + '/manage/dataResourcesApi/dataTree';
            // 请求数据检索数据
            axios.get(apiUrl).then(function(res) {
            var datas = res.data.result.resources;
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
        }
    },
    created:function(){
        this.getUrl();
        this.ini();

    },
    mounted:function(){
        this.gotoTop();  
          
    }
})