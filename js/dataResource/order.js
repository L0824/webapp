var order = Vue.component('order',{
    template:'#order',
    data:function(){
        return{
            status:'',
            starttime:'',
            endtime:'',
            baseUrl:''
        }
    },
    methods:{
        showTable:function(base){
            var _this = this;
            $("#s-table").bootstrapTable('destroy'); 
            // debugger;
            $('#s-table').bootstrapTable({
                url:base+'/manage/dataOrderApi/list',
                method:'post',
                pagination: true,
                pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
                pageSize:10,                     //每页的记录行数（*）
                pageList: [5,10, 25, 50, 100],
                smartDisplay:false, 
                dataField: "rows",
                paginationLoop: false,
                sidePagination:'server',  
                dataType: 'json',
                queryParamsType: null,   
                queryParams: function (p) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
                    p.orderStatus = _this.status;
                    p.begintime  = _this.starttime;
                    p.endtime = _this.endtime;
                    console.log(p)
                    return p;
                },
                paginationPreText:'上一页',
                paginationNextText:'下一页',
                columns: [
                    // {
                    //     field: 'orderNumber',
                    //     title : "订单编号"
                        
                    // },
                    // {
                    //     field: 'buyName',
                    //     title : "订单名称"
                        
                    // },
                    {
                        field: 'orderId',
                        title : "订单ID"
                        
                    },
                    {
                        field: 'userId',
                        title : "用户编号"
                        
                    },
                    {
                        field: 'orderStatus',
                        title : "订单状态",
                        formatter:function(value,row,index){
                            if(value){
                                return '订单完成'
                            }else{
                                return '数据处理中'
                            }
                        }
                    },
                    {
                        field: 'createTime',
                        title : "创建时间",
                    },
                    {
                        field: 'updateTime',
                        title : "更新时间",
                    },
                    {
                        title : "操作",
                        formatter:function(value,row,index){
                            if(row['orderStatus']){
                                if(row['downloadUrl']){
                                    return "<a href='"+base+'/manage'+row.downloadUrl+"' class='d-btn  cur' download=''>下载</a>"
                                }else{
                                    return "<a href='javascript:;' class='d-btn  cur' >下载</a>"
                                }
                            }else{
                                return "<a href='javascript:;' class='d-btn noload'>下载</a>"
                            }
                        }
                    },
                ],
            });
        },
        // 表格查询
        search:function(){
            $("#s-table").bootstrapTable('refresh');
        },
        openDate:function(){
            var _this = this;
            layui.use(['form','laydate'],function(){
                var $ = layui.jquery, 
                    laydate = layui.laydate,
                    layform = layui.form;
                    // 下拉选择框获取值
                    layform.on('select',function(obj){
                        _this.status = obj.value;
                        console.log(typeof parseInt(_this.status) )
                    });

                    laydate.render({
                        elem: '#d-from', //指定元素
                        theme: '#656df5',
                        done:function(value){
                            _this.starttime = value;
                        }
                    });
                    laydate.render({
                        elem: '#d-to', //指定元素
                        theme: '#656df5',
                        done:function(value){
                            _this.endtime = value;
                        }
                    });

            })
        }
        
    },
    mounted:function(){
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
                    _this.$refs.order.showTable(_this.baseUrl)
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