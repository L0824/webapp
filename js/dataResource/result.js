var result = Vue.component('result',{
    template:'#result',
    data:function(){
        return{
            dataName:'',
            selectedInfo:'',
            str:[],
            string:'',
            dynamicRow:[
                 {
                    title : "序号",
                    formatter:function(value,row,index){
                        var pageSize = $('#i-table').bootstrapTable('getOptions').pageSize;     //通过table的#id 得到每页多少条
                        var pageNumber = $('#i-table').bootstrapTable('getOptions').pageNumber; //通过table的#id 得到当前第几页
                        return (pageSize * (pageNumber - 1) + index + 1)
                    }
                        
                },
            ]
        }
    },
    methods:{
        // 初始化
        init:function(){
            var info = JSON.parse(sessionStorage.getItem('searchInfo'));
            this.selectedInfo = info;
            console.log(this.selectedInfo);
            for(var i = 0;i<this.selectedInfo.yaosu.length;i++){
                this.dynamicRow.push({
                    'title':this.selectedInfo.yaosu[i].v1,
                    'field':this.selectedInfo.yaosu[i].v2
                })
                this.str.push(this.selectedInfo.yaosu[i].v2)
                // this.str = this.str + this.selectedInfo.yaosu[i].v2+","
            }
            // console.log(this.dynamicRow)
            this.string = this.str.join(',');
            console.log(this.string)

        },
        showTable:function(base){
            var _this = this;
            $("#i-table").bootstrapTable('destroy'); 
            $('#i-table').bootstrapTable({
                url:base+'/manage/uparApi/pointList',
                method:'post',
                pagination: true,
                pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
                pageSize:5,                     //每页的记录行数（*）
                pageList: [5,10, 25, 50, 100],
                smartDisplay:false, 
                dataField: "rows",
                paginationLoop: false,
                sidePagination:'server',  
                dataType: 'json',
                queryParamsType: null,   
                queryParams: function (p) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
                    p.begintime  = _this.selectedInfo.starttime;
                    p.endtime   = _this.selectedInfo.endtime;
                    p.fields  = _this.string;
                    p.point =  _this.selectedInfo.point;
                    console.log(p)
                    return p;
                },
                // onLoadSuccess:function(data){
                //     console.log(data)
                // },
                paginationPreText:'上一页',
                paginationNextText:'下一页',
                columns: _this.dynamicRow
            });
        },
        // 加入订单
        addOrder:function(){
            
            var apiUrl = this.$parent.baseUrl + '/manage/dataOrderApi/add'
            var date = new Date();
            var now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            var update = now;
            var buyName = this.dataName;
            var userId = Math.floor(Math.random()*10+1);
            var orderStatus = 0;
            axios({
                method: 'post',
                url: apiUrl,
                data: {
                    createTime:now,
                    updateTime:update,
                    buyName:buyName,
                    userId:userId,
                    orderStatus:orderStatus
                }
            }).then((res) => {
                if(res.data.status){
                    layui.use('layer',function(){
                        var layer = layui.layer
                        layer.confirm("订单添加成功！ 确定进入订单页吗?",{
                            skin: 'bg',
                            // area: ['290px','153px'],
                            title:'提示',
                            move:false,
                            shade:false
                        }, function(){
                            window.location.href = "order.html";
                        });
                    })
                }else{
                    layui.use('layer',function(){
                        var layer = layui.layer
                        layer.confirm("抱歉，订单添加失败!",{
                            skin: 'bg',
                            // area: ['290px','153px'],
                            title:'提示',
                            move:false,
                            shade:false
                        });
                    })
                }
            });
        }
    },
    mounted:function(){
        this.init();
        // this.showTable();
        this.dataName = sessionStorage.getItem('detailTitle');
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
                    _this.$refs.result.showTable(_this.baseUrl)
                    
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
    },
    mounted:function(){
        this.gotoTop();  
          
    }
})