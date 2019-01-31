
var dataResourceBox = Vue.component('data-resource-box',{
    template:'#dataResourceBox',
    props:['topRow','base'],
    data:function(){
        return {
            isshow:true,
            searchKey:'',
            baseUrl:null,
            id:'',
            checkedCur:[],
            params:[],
            all:null
        }
    },
    mounted:function(){
        this.setState();
    },
    methods:{
        setState:function(){
            
            for(var i = 0;i<this.topRow.length;i++){
                var arr = [];
                var array = [];
                this.params.push(array);
                for(var j = 0;j<this.topRow[i].list.length;j++){
                    var obj = new Object();
                    obj.isActive = false;
                    obj.name = this.topRow[i].list[j].txt;
                    arr[j] = obj;
                }
                this.checkedCur.push(arr)
            }
            var arr1 = [];
            for(var z = 0;z<this.topRow.length;z++){
                var obj1 = new Object();
                obj1.isActive = true;
                obj1.name = '全部';
                arr1[z] = obj1;
            }
            this.all = arr1;
        },
        clickAll:function(x){
            if(!this.all[x]['isActive']){
                for(var i = 0;i<this.checkedCur[x].length;i++){
                    if(this.checkedCur[x][i]['isActive']){
                        this.all[x]['isActive'] = true;
                        this.checkedCur[x][i]['isActive'] = false;
                        this.params[x].length = 0;
                    }
                }
            }else{
                
            }
            this.showData(this.baseUrl,'');
        },
        changeCur:function(x1,x2){
            this.$set(this.checkedCur[x1][x2],'isActive',!(this.checkedCur[x1][x2]["isActive"]))
            var flag = true;
            for(var i = 0;i<this.checkedCur[x1].length;i++){
                if(this.checkedCur[x1][i]['isActive']){
                    this.all[x1]['isActive'] = false;
                    flag = false;
                }
            }
            if(flag){
                this.all[x1]['isActive'] = true;
                this.params[x1].length = 0;
            }
            if(this.checkedCur[x1][x2]['isActive']&&this.params[x1].indexOf(this.checkedCur[x1][x2]['name'])==-1){
                this.params[x1].push(this.checkedCur[x1][x2]['name']);
            }else{
                this.params[x1].splice(this.params[x1].indexOf(this.checkedCur[x1][x2]['name']),1);
            }
            this.showData(this.baseUrl,'');
        },
        // 获取后台数据，显示在右边表格上
        showData:function(baseUrl,id){
              t = this;
              this.id = id;
            //   alert(id)
            $("#table").bootstrapTable('destroy'); 
            // debugger;
            $('#table').bootstrapTable({
                url:this.baseUrl+'/manage/metadataApi/list',
                method:'post',
                pagination: true,
                pageNumber: 1,     //初始化加载第一页，默认第一页,并记录
                dataField: "rows",//后端分页 返回total页数 可显示页码 rows 为后端数据
                pageSize: 5,                     //每页的记录行数（*）
                pageList: [5, 10, 15, 20],
                // 是否显示分页
                smartDisplay: false,
                paginationLoop: false,
                sidePagination:'server',  
                dataType: 'json',
                queryParamsType: null,     
                queryParams: function (p) { 
                    // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
                   
                    if(t.id){
                        p.dataGroupId = t.id;
                        
                    }else{
                        p.subjectType = t.params[0].join(',');
                        p.theme = t.params[1].join(',');
                        p.spatialLocation = t.params[2].join(',');
                    }
                    return p;
                },
                locale:'zh-CN',
                paginationPreText:'上一页',
                paginationNextText:'下一页', 
                onLoadSuccess : function(data) {
                    console.log(data.rows);//这边是有数据的
                }, 
                onClickRow:function(row){
                    window.location = '../../html/dataResource/dataResourceDetail.html?id='+row.id;
                },
                columns: [
                    {
                        field: 'dataGroupId',
                        formatter:function(value,row,index){
                            var pageSize = $('#table').bootstrapTable('getOptions').pageSize;     //通过table的#id 得到每页多少条
                            var pageNumber = $('#table').bootstrapTable('getOptions').pageNumber; //通过table的#id 得到当前第几页
                            return "<span class='label label-info'>"+(pageSize * (pageNumber - 1) + index + 1)+"</span>"
                        }
                    },
                    {
                        formatter:function(value,row,index){
                            return "<div class='row'><div class='col-md-10'><div class='text-left'><a href='javascript:void(0)'  style='color: black'><span class='table-title'>"+row.title+"</span><span class='border-line'></span></a></div> </div><div class='col-md-2 table-time'>"+row.gmtCreate+"</div></div><div class='line-dot'></div>  <div  class='table-cnt'>"+row.summary+"</br></div></div>"
                        }
                    } 
                    
                ]
         });
    },
    // 点击右边头部分类，过滤表格数据
    filterTable:function(){
        // this.active = true;
    }
    },
    watch:{
        base:function(){
           
            this.baseUrl = this.base;
            this.showData(this.base,this.$parent.id);
        }
    }
});

var vm = new Vue({
    el:'#app',
    data:function(){
        return {
            baseUrl:'',
            categoryArr:null,
            id:'',
            isCur:false,
            dataGroupId:null,
            topRow:[
                {
                   title:'学科类',
                   list:[
                       
                       {
                           txt:'大气物理'
                       },
                       {
                           txt:'大气环境'
                       },
                       {
                           txt:'生态环境'
                       },
                       {
                           txt:'冰川动图'
                       },
                       {
                           txt:'冰川动图'
                       },
                   ] 
                },
                {
                   title:'主题词',
                   list:[
                       
                       {
                           txt:'中国'
                       },
                       {
                           txt:'NO2'
                       },
                       {
                           txt:'AOT'
                       },
                       {
                           txt:'气候'
                       },
                       {
                           txt:'IBIS模型'
                       },
                       {
                           txt:'遥感 MODIS'
                       }
                   ] 
                },
                {
                   title:'空间位置',
                   list:[
                       
                       {
                           txt:'全球'
                       },
                       {
                           txt:'中国'
                       },
                       {
                           txt:'欧美美国'
                       },
                       {
                           txt:'珠三角地区'
                       },
                       
                       
                   ] 
                },
            ]       
        }
    },
    methods:{
        // 点击全部，显示所有表格数据
        showAllData:function(){
            this.dataGroupId = null;
            this.isCur = true;
            this.$refs.rightTable.showData(this.baseUrl);
        },
       
        // 点击左边，右边内容切换
        changeRight:function(index,subindex,id){
            this.dataGroupId = id,
            this.isCur = false;
            this.id = id;
            this.$refs.rightTable.showData(this.baseUrl,this.id);
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
            console.log(datas)
            _this.categoryArr = datas;
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
        this.id = sessionStorage.getItem('id');
        if(this.id){
           
            this.isCur = false;
        }else{
            
            this.isCur = true;
        }
        this.dataGroupId = sessionStorage.getItem('id');
       
    },
    mounted:function(){
        this.gotoTop();    
    }
})
