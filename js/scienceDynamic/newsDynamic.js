var vm = new Vue({  
    el: "#app",
    data: function () {
    return {
        baseUrl:''
    }
    },
    methods:{
        showNewsTable:function(){
            $("#news-table").bootstrapTable('destroy'); 
            // debugger;
            $('#news-table').bootstrapTable({
                url:this.baseUrl+'/manage/newsApi/listForPage',
                method:'post',
                pagination: true,
                pageNumber: 1,     //初始化加载第一页，默认第一页,并记录
                dataField: "rows",//后端分页 返回total页数 可显示页码 rows 为后端数据
                pageSize: 10,                     //每页的记录行数（*）
                pageList: [5, 10, 15, 20],
                // 是否显示分页
                smartDisplay: false,
                paginationLoop: false,
                sidePagination:'server',  
                dataType: 'json',
                queryParamsType: null,     
                queryParams: function (p) { 
                    return p;
                },
                locale:'zh-CN',
                paginationPreText:'上一页',
                paginationNextText:'下一页', 
                // onLoadSuccess : function(data) {
                //     console.log(data.result.rows);//这边是有数据的
                //     $('#news-table').bootstrapTable('load',data.result.rows); 
                // }, 
                onClickRow:function(row){
                    window.location = '../../html/scienceDynamic/newsDynamicDetail.html?'+Math.random();
                    sessionStorage.setItem('newsDynamicTitle',row.title);
                },
                // responseHandler:function(res){
                //     return {
                //         'total':res.result.total,
                //         'rows':res.result.rows
                //     }
                // },
                columns: [
                    {
                        field:"title",
                        title:"标题",
                        formatter:function(value,row,index){
                            return "<div class='news-title'>"+row.title+"</div>"
                        }
                    },
                    {
                        field:"submtDate",
                        title:"时间",
                        formatter:function(value,row,index){
                            return "<div class='news-time'>"+row.submtDate.split(' ')[0]+"</div>"
                        }
                    } 
                    
                ]
         });
        },
        getUrl:function(){
            _this = this;
            $.ajax({
                url:"../../api.json",
                type:"get",
                dataType:"json",
                success:function(data){                 
                    _this.baseUrl = data.result.baseUrl;
                    _this.showNewsTable();
                },
                error:function(){
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
    },
    created:function(){
        this.getUrl();
    },
    mounted:function(){
        this.gotoTop(); 
    },
    
})