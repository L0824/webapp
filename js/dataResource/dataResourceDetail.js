
// 详情组件
var dataResourceDetail = Vue.component('data-resource-detail',{
    template:'#dataResourceDetail',
    props:['details','parentstyle','isshow'],
    data:function(){
        return {
        s:0,
        id:null,
        ishow:false,
        date:'',
        jd:'',
        wd:'',
        tabcontent:'数据来源'+
        '欧空局网站下载'+
        
        '欧空局网站下载'+
        
        '数据产生或加工方法'+
        '1.格式转化 2.空间插值'+
        
        '数据空间投影'        ,
            relatedData:[
                {
                  name:'数据详细描述'  ,
                  tabcontent:'数据来源'+
                  '欧空局网站下载'+
                  
                  '欧空局网站下载'+
                  
                  '数据产生或加工方法'+
                  '1.格式转化 2.空间插值'+
                  
                  '数据空间投影'
                },
                {
                  name:'数据引用方式',
                  tabcontent:'a.	标注知识产权说明(数据使用引用方式规定等)'+
                  '[1]江洪. 0.5°SCIAMACHY中国逐月CO柱浓度数据（2003.01-2008.12）. 国家地球系统科学数据共享平台-全球变化模拟科学数据中心.2014'+
                  'b.	数据标注参考以下规范：'+
                  '中文发表的成果：数据来源于国家科技基础条件平台-国家地球系统科学数据共享平台-全球变化模拟科学数据中心'+
                  '(http://nju.geodata.cn/)'+
                  '英文发表的成果：'+
                  'National Science & Technology Infrast'+
                  '1.格式转化 2.空间插值'+
                  
                  '数据空间投影'
                  
                },
                {
                    name:'数据附件',
                    tabcontent:'数据文档'
                },
                {
                    name:'相关文献',
                    tabcontent:
                    '<div class="pertinent-literature">'+
                        '<ul class="literature-ul">'+
                            '<li><a target="_blank" href="http://cdmd.cnki.com.cn/Article/CDMD-10157-1017028631.htm"><span>1</span><span>、</span><span>齐齐哈尔市干旱特征分析及降水量预测研究</span></a></li>'+
                            '<li ><a target="_blank" href="http://www.cnki.com.cn/Article/CJFDTotal-ZGNY2011S1028.htm"><span>2</span><span>、</span><span>内蒙古东部地区作物产量对气候变化的响应</span></a></li>'+
                            '<li><a target="_blank" href="http://www.cnki.com.cn/Article/CJFDTotal-SWZZ201606002.htm"><span>3</span><span>、</span><span>均生函数与BP神经网络耦合模拟预测模型(MGF-BP-I)的建立与应用</span></a></li>'+
                            '<li ><a target="_blank" href="http://cdmd.cnki.com.cn/Article/CDMD-10224-1016094531.htm"><span>4</span><span>、</span><span>黑龙江省近44年来气候时空变化趋势及其对玉米生产的影响</span></a></li>'+
                            '<li ><a target="_blank" href="http://cdmd.cnki.com.cn/Article/CDMD-10200-1016119935.htm"><span>5</span><span>、</span><span>松嫩草地昆虫多样性对放牧干扰和降水格局变化的响应 </span></a></li>'+
                            '<li><a target="_blank" href="http://cdmd.cnki.com.cn/Article/CDMD-10157-1016144732.htm"><span>6</span><span>、</span><span>近540年强火山喷发对中国地区降水的影响</span></a></li>'+
                            '<li ><a target="_blank" href="http://cdmd.cnki.com.cn/Article/CDMD-10755-1016768283.htm"><span>7</span><span>、</span><span>空间变系数模型的局部线性BGWR估计及其应用</span></a></li>'+
                            '<li ><a target="_blank" href="http://cdmd.cnki.com.cn/Article/CDMD-10300-1015580058.htm"><span>8</span><span>、</span><span>基于WSN的称重式雨量计系统设计</span></a></li>'+
                        '</ul>'+
                '</div>'
                }
            ],             
        }
    },
    methods:{
        tabChange:function(x,y){                 
            this.s = y;
            this.tabcontent = x.tabcontent
        },
        getRetrievalData:function(){
            var _this = this;
            this.ishow = true;
            this.baseUrl = this.$parent.baseUrl;
            var base = this.baseUrl
            this.id = this.$parent.detail.id;
            var id =  this.id;
            //弹窗打开
            layui.use(['layer','laydate'], function(){
            var $ = layui.jquery, 
                layer = layui.layer
                laydate = layui.laydate;
            $("#retrieval").bootstrapTable('destroy'); 
            $('#retrieval').bootstrapTable({
                url:_this.baseUrl+'/manage/metadataApi/ossList',
                method:'post',
                pagination: true,
                pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
                pageSize:10,                     //每页的记录行数（*）
                pageList: [10, 25, 50, 100],
                smartDisplay:false, 
                dataField: "rows",
                paginationLoop: false,
                sidePagination:'server',  
                dataType: 'json',
                queryParamsType: null,   
                queryParams: function (p) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
                    p.metadataId = _this.id;
                    return p;
                },
                paginationPreText:'上一页',
                paginationNextText:'下一页',
                columns: [
                    {
                        field: 'fileName',
                        title : "文件名称"
                        
                    },
                    {
                        field: 'fileSize',
                        title : "文件大小"
                        
                    },
                    {
                        field: 'gmtCreate',
                        title : "创建时间"
                        
                    },
                    {
                        field: 'ossDownloadAddress',
                        title : "下载地址",
                        formatter:function(value,row,index){
                            return "<a target='_blank' class='dataDownBtn' href='"+base+"/manage/metadataApi/download?objectName="+value+"'>点击下载</a>"
                        }
                    },
                    
                ],
                onLoadSuccess:function(data){
                    console.log(data)                 
                }
            });
                layer.open({
                    type: 1,
                    title:'文件数据信息',
                    closeBtn: 1,
                    anim: 0,
                    area: ['750px','583px'],
                    shade:[0.1,'#000'],
                    fixed: false,
                    move:false,
                    shadeClose: false,
                    content: $("#layer-box"),
                    success:function(){
                        laydate.render({
                            elem: '#dateS'
                            ,range: true,
                            theme: '#2F75F5'
                        });
                           
                      
                    }

                });
            })
    },
    getRData:function(){
        var _this = this;
        this.ishow = true;
        this.baseUrl = this.$parent.baseUrl;
        var base = this.baseUrl
        this.id = this.$parent.detail.id;
        var id =  this.id;
        //弹窗打开
        layui.use(['layer','laydate'], function(){
        var $ = layui.jquery, 
            layer = layui.layer
            laydate = layui.laydate;
        $("#retrieval2").bootstrapTable('destroy'); 
        $('#retrieval2').bootstrapTable({
            url:'http://123.57.174.98:2111/tasktxt/uwgmf/list',
            method:'post',
            pagination: true,
            pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
            pageSize:10,                     //每页的记录行数（*）
            pageList: [10, 25, 50, 100],
            smartDisplay:false, 
            dataField: "rows",
            paginationLoop: false,
            sidePagination:'server',  
            dataType: 'json',
            queryParamsType: null,   
            queryParams: function (p) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
                // p.metadataId= _this.id;
                p.year = _this.date;
                return p;
            },
            paginationPreText:'上一页',
            paginationNextText:'下一页',
            columns: [
                {
                    field: 'dIymdhm',
                    title : "入库时间"
                    
                },
                {
                    field: 'v04001',
                    title : "资料年"
                    
                },
                {
                    field: 'v04002',
                    title : "资料月"
                    
                },
                {
                    field: 'v04003',
                    title : "资料日",
                    
                },
                {
                    field: 'v04004',
                    title : "资料时",
                    
                },
                {
                    field: 'V07004',
                    title : "气压",
                    
                },
                {
                    field: 'v10009',
                    title : "位势高度",
                },
                {
                    field: 'v12001',
                    title : "温度",
                },
                {
                    field: 'v12003',
                    title : "露点温度",
                },
                {
                    field: 'v11001',
                    title : "风向",
                },
                {
                    field: 'v11002',
                    title : "风速",
                },
            ],
            
        });
            layer.open({
                type: 1,
                title:'数据检索信息',
                closeBtn: 1,
                area: ['970','583px'],
                shift: 2,
                anim: 5,
                shade:0,
                fixed: false,
                move:false,
                shadeClose: true,
                content: $("#layer-box2"),
                success:function(){
                    laydate.render({
                        elem: '#dateS2',
                        type: 'year',
                        theme: '#2F75F5',
                        done: function(value, date, endDate){
                            // alert(value); //得到日期生成的值，如：2017-08-18
                            _this.date = value
                            }
                    });
                       
                }

            });
        })
},
    openDate:function(){
        var _this = this;
    },
    refreshD:function(){
        $("#retrieval2").bootstrapTable('refresh');
    },
    exportExcel:function(){
        $('#retrieval').tableExport({ type: 'excel', escape: 'false' });
    },
    exportExcel2:function(){
        $('#retrieval2').tableExport({ type: 'excel', escape: 'false' });
    },
    getParam:function(x){
        localStorage.setItem('GisType', x.title);
        x.type = x.dataType;
        x.label = x.title;
        x.dataId = x.id;
        console.log(x)
        localStorage.setItem('detail',JSON.stringify(x));
    }
    },
    mounted:function(){
       this.openDate();
    }
})
var vm = new Vue({
    el:'#dataR',
    data:function(){
        return {
            baseUrl:null,
            categoryArr:[],
            id:'',
            detail:null,
            flag:false,
            dataGroupId:null,
            style:[],
            isshow:false
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
                    _this.showdetail();
                },
                error:function(){
                    console.log(error);
                }
            })
        },
        
        showList:function(){
            var _this = this;
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
         //子组件传过来的点击某一行的数据
         showdetail:function(){
            var _this = this;
            var url = location.search; //获取url中"?"符后的字串
            var param = url.split("=")[1];
            var apiUrl = this.baseUrl+'/manage/metadataApi/info/'+param;
            axios.get(apiUrl).then(function(res){
                var datas = res.data.result;
                console.log(datas);
                if(datas.dataType == 1){
                    _this.isshow = true;
                }else{
                    _this.isshow = false;
                }
                datas.metadata = JSON.parse(datas.metadata);
                _this.detail = datas;
                sessionStorage.setItem('detailTitle',_this.detail.title);
                // console.log(datas)
                if(_this.detail.imgUrl==null || _this.detail.imgUrl==false){
                    _this.detail.imgUrl = false
                }else{
                    _this.detail.imgUrl = _this.baseUrl + _this.detail.imgUrl;
                }
                _this.dataGroupId = _this.detail.dataGroupId;
                var metadata = _this.detail.metadata;
                for(k1 in metadata){
                    _this.flag = false;
                   
                    if(typeof metadata[k1] == 'object'){
                        
                        for(k2 in metadata[k1]){
                            if(typeof metadata[k1][k2] == 'object'){
                                    console.log(typeof metadata[k1][k2])
                                        _this.flag = true
                            }
                        }
                    }
                    _this.style.push(_this.flag);
                }
                // console.log(_this.style)
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
