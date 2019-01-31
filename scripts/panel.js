

var t;

var panel = Vue.component('panel',{
    template:'#mainPanel',
    props:{
        imark:{
            type:Number,
            default:0
        },
        sign:{
            type:Object
        }
    },
    data:function(){
        return {
            qy:"",
            dTwo:"",
            starttime:'',
            endtime:'',
            zdName:'',
            times:'',
            V01301:'',
            qiwendate:"",
            qiwentimes:'',
            zdshow:false,
            stationInfo:null,
            stationElements:null,
            ncStarttime:null,
            ncEndtime:null
           
        }
    },
    mounted:function(){
        this.ini();
        window.t = this;
       
    },
    watch:{
        sign:function(){
            //判断当前的站点数据集名称是高空还是地面
            if(this.sign.label == '全球高空定时值基础数据集（V2.0）'){
                this.zdshow = true;
            }else{
                this.zdshow = false;
            }
        } 
    },
    methods:{
       
        ini:function(){
            var _this = this;
            // console.log(_this.sign)
            
            layui.use(['form','laydate'],function(){
                var $ = layui.jquery, 
                laydate = layui.laydate,
                layform = layui.form,
                element = layui.element;
            layform.on('select(qiya)',function(data){
                val = data.value;
                qiya = data.elem[data.elem.selectedIndex].text;
                _this.qy = qiya;
            })
            layform.on('select(times)',function(data){
                _this.times = data.value;
            })
            layform.on('select(qiwen)',function(data){
                _this.qiwentimes = data.value;
            })
         
                //时间范围
                //开始时间
                var start,end;
                lay('.d-from').each(function(){
                     start = laydate.render({
                      elem: this
                    //   ,min:new Date().valueOf()
                      ,trigger: 'click'
                      ,theme: '#656df5'
                      ,done:function(value,date){
                        endMax = end.config.max;
                        end.config.min = date;
                        end.config.min.month = date.month -1;
                        _this.starttime = value;
                      }
                    });
                  });
                  //结束时间
                lay('.d-to').each(function(){
                    end = laydate.render({
                      elem: this
                      ,trigger: 'click'
                      ,theme: '#656df5'
                      ,done:function(value,date){
                            if($.trim(value) == ''){
                                var curDate = new Date();
                                date = {'date': curDate.getDate(), 'month': curDate.getMonth()+1, 'year': curDate.getFullYear()};
                            }
                            start.config.max = date;
                            start.config.max.month = date.month -1;
                            _this.endtime = value;
                      }
                    });
                  });
                  var s;
                  lay('.date-two').each(function(){
                    s = laydate.render({
                      elem: this
                      ,trigger:'click'
                      ,theme: '#656df5'
                      ,type: 'month'
                      ,done:function(value,date,endDate){
                        _this.dTwo = value;
                      }
                    });
                  });
                lay('.qiwendate').each(function(){
                    laydate.render({
                      elem: this
                      ,trigger: 'click'
                      ,theme: '#656df5'
                      ,min:'2005-01-01'
                      ,max:'2014-12-31'
                      ,done:function(value,date,endDate){
                          _this.qiwendate = value;
                      }
                    });
                  });
                  
               
                
            })
        },
        showTable:function(base,h,id,ele){
            var _this = this;
            layui.use(['table','laydate'],function(){
                var table = layui.table;
                var laydate = layui.laydate
                table.render({
                    elem:'#'+ele,
                    height:h,
                    url:base+'/manage/metadataApi/ossList',
                    method:'post',
                    page:true,
                    contentType:'application/json',
                    request: {
                        pageName: 'pageNumber', //页码的参数名称，默认：page
                        limitName: 'pageSize' //每页数据量的参数名，默认：limit
                    },
                    limits: [10, 25, 50, 100],
                    limit:10, //每页默认显示的数量
                    where: { metadataId: id },
                    text: {
                        none: '暂无相关数据！'//默认无数据
                    },
                    cols: [[
                        { 
                            type:'radio',
                        },
                        {
                            field: 'fileName',
                            title : "文件名称",
                        },
                    ]],
                    done: function(res, curr, count){
                        //如果是异步请求数据方式，res即为你接口返回的信息。
                        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                        // console.log(res);
                        
                        //得到当前页码
                        // console.log(curr); 
                        
                        //得到数据总量
                        // console.log(count);
                      },
                    parseData: function(res) { //res 即为原始返回的数据
                        return {
                            "code":0, //解析接口状态
                            "msg": '', //解析提示文本
                            "count":res.total, //解析数据长度
                            "data": res.rows //解析数据列表
                        }
                    }
                });
                table.on('radio(nctable)', function(obj){
                    // console.log(obj.data)
                    var d = obj.data.fileName;
                    var s = d.split(".nc");
                    var startDate;
                    var endDate;
                    var elements;
                    if(s[0].indexOf("_") != -1){
                        var arr = s[0].split("_");
                        var str = arr[arr.length-1].split("-");
                        startDate = str[0].substring(0, 4) + "-" + str[0].substring(4, 6);
                        endDate = str[1].substring(0, 4) + "-" + str[1].substring(4, 6);
                        elements = arr[0];
                    }else{
                        var arr = s[0].split(".");
                        startDate = arr[arr.length-2];
                        endDate = arr[arr.length-1];
                        startDate = arr[arr.length-2];
                        endDate = arr[arr.length-1];
                    }
                        _this.ncStarttime = startDate;
                        _this.ncEndtime = endDate;
                        var minY,minM,maxY,maxM;
                        if(_this.ncStarttime.indexOf('-')>0){
                          minY = _this.ncStarttime.split('-')[0];
                          minM = parseInt(_this.ncStarttime.split('-')[1])+1<10?'0'+(parseInt(_this.ncStarttime.split('-')[1])+1):parseInt(_this.ncStarttime.split('-')[1])+1;
                        }else{
                          minY = parseInt(_this.ncStarttime)+1;
                          minM = '0'+1;
                        }
                        if(_this.ncEndtime.indexOf('-')>0){
                          maxY = _this.ncEndtime.split('-')[0];
                          maxM = parseInt(_this.ncEndtime.split('-')[1])-1<10?'0'+parseInt(_this.ncEndtime.split('-')[1])-1:parseInt(_this.ncEndtime.split('-')[1])-1;
                        }else{
                          maxY = parseInt(_this.ncEndtime)-1;
                          maxM = 12;
                        }
                        // console.log(maxY,maxM)
                        $(".date-two").remove();
                        var ele = '<input type="text" readonly lay-verType="tips" name="title"   lay-verify="date" placeholder="点击选择'+minY+'-'+minM+'至'+maxY+'-'+maxM+'之间日期'+'" class="layui-input date-two" >';
                        $(ele).appendTo($('#div-laydate'));

                        var s;
                        lay('.date-two').each(function(){
                           s = laydate.render({
                              elem: this
                              ,trigger:'click'
                              ,theme: '#656df5'
                              ,type: 'month'
                              ,ready:function(){
                                    s.config.min = {
                                        year:minY,
                                        month:minM-1
                                    };
                                    s.config.max = {
                                        year:maxY,
                                        month:maxM
                                    }
                              }
                              ,done:function(value,date,endDate){
                                _this.dTwo = value;
                              }
                            });
                          });
                           
                });
            })
        },
        // 站点数据表格
        showzdTable:function(ele,begintime,endtime,V01301,V04004,stationName){
              var _this = this;
              layui.use('table',function(){
                $(".form1 .info").addClass('cur');
                var table = layui.table;
                table.render({
                    elem:'#'+ele,
                    width : 'auto', 
                    height:'260',
                    cellMinWidth: 80,
                    url:_this.$parent.baseUrl+'/manage/uparApi/listByStationForPage',
                    method:'post',
                    page:true,
                    contentType:'application/json',
                    request: {
                        pageName: 'pageNumber', //页码的参数名称，默认：page
                        limitName: 'pageSize' //每页数据量的参数名，默认：limit
                    },
                    limits: [10, 25, 50, 100],
                    limit:10, //每页默认显示的数量
                    where: { 
                        begintime:begintime ,
                        endtime:endtime,
                        V01301:V01301,
                        V04004:V04004
                    },
                    text: {
                        none: '暂无相关数据！'//默认无数据
                    },
                    cols: [[
                    {
                        field: 'dDatetime',
                        title : '日期',
                        width:120
                    },
                    {
                        field: 'v04004',
                        title : '时次',
                        width:60,
                    },
                    {
                        field: 'v12001',
                        title : '温度(℃)',
                        width:90,
                        templet:function(d){
                            return Number(d.v12001*0.1).toFixed(1)
                        }
                    },
                    {
                        field: 'v12003',
                        title : '露点温度(℃)',
                        width:110,
                        templet:function(d){
                            if(Number(d.v12003) == -9999){
                                return -9999
                            }else{
                                return Number(d.v12003*0.1).toFixed(1)
                            }
                        }
                    },
                    {
                        field: 'v07004',
                        title : '气压(hPa)',
                        width:95,
                        templet:function(d){
                            if(Number(d.v07004) == -9999){
                                return -9999
                            }else{
                                return Number(d.v07004)
                            }
                        }
                    },
                    {
                        field: 'v10009',
                        title : '位势高度(gPm)',
                        width:130,
                        templet:function(d){
                            if(Number(d.v07004) == -9999){
                                return -9999
                            }else{
                                return Number(d.v10009)
                            }
                        }
                    },
                    {
                        field: 'v11001',
                        title : '风向',
                        width:80,
                        templet:function(d){
                            var degree = d.v11001;
                            if(degree>=348.76&&degree<=360||degree>=0&&degree<=11.25){
                                return '北';
                            }else if(degree>=11.26&&degree<=33.75){
                                return '东北偏东';
                            }else if(degree>=33.76&&degree<=56.25){
                                return '东北';
                            }else if(degree>=56.26&&degree<=78.75){
                                return '东北偏北';
                            }else if(degree>=78.76&&degree<=101.25){
                                return '东';
                            }else if(degree>=101.26&&degree<=123.75){
                                return '东南偏南';
                            }else if(degree>123.76&&degree<=146.25){
                                return '东南';
                            }else if(degree>=146.26&&degree<=168.75){
                                return '东南偏东';
                            }else if(degree>=168.76&&degree<=191.25){
                                return '南';
                            }else if(degree>=191.26&&degree<=213.75){
                                return '西南偏西';
                            }else if(degree>=213.76&&degree<=236.25){
                                return '西南';
                            }else if(degree>=236.26&&degree<=258.75){
                                return '西南偏南';
                            }else if(degree>=258.76&&degree<=281.25){
                                return '西';
                            }else if(degree>=281.26&&degree<=303.75){
                                return '西北偏北';
                            }else if(degree>=303.76&&degree<=326.75){
                                return '西北';
                            }else if(degree>=326.76&&degree<=348.75){
                                return '西北偏西';
                            }else{
                                return '无';
                            }
                        }
                    },
                    {
                        field: 'v11002',
                        title : '风速(m/s)',
                        width:95,
                        templet:function(d){
                            if(Number(d.v11002) == -9999){
                                return -9999
                            }else{
                                return Number(d.v11002*0.1).toFixed(1)
                            }
                        }
                    },
                    ]],
                    done: function(res, curr, count){
                        $(".zdName").html(stationName);
                        $(".d-from").val(begintime);
                        $(".d-to").val(endtime);
                        _this.starttime = begintime;
                        _this.endtime = endtime;
                        _this.zdName = stationName;
                        _this.V01301 = V01301;
                      },
                    parseData: function(res) { //res 即为原始返回的数据
                        return {
                            "code":0, //解析接口状态
                            "msg": '', //解析提示文本
                            "count":res.total, //解析数据长度
                            "data": res.rows //解析数据列表
                        }
                    }

                })
            })
            
        } ,
        //1 站点数据加载地图站点
        loadMapZD:function(event){
            sessionStorage.removeItem("formData");
            var data = {
                mark:this.sign
            };
            // console.log(data)
            this.$parent.load(event);
            sessionStorage.setItem("formData",JSON.stringify(data));
            // console.log(JSON.parse(sessionStorage.getItem("formData")));                        
        },
        //1站点数据(高空)前台查询
        zdfind:function(){
            sessionStorage.removeItem("formData");
            var _this = this,times;
            layui.use('form',function(){
                var form = layui.form;
                form.verify({
                    starttime:function(value,item){
                        if(!value){
                            return '开始时间不能为空'
                        }
                    },
                    endtime:function(value,item){
                        if(!value){
                            return '结束时间不能为空'
                        }
                    }
                })
                
                form.on('submit(zdfind)', function(data){
                    //获取表单的值
                    // console.log(_this.zdName)
                    // console.log(_this.starttime)
                    // console.log(_this.endtime)
                    // console.log(_this.times)
                    // console.log(_this.V01301)
                    _this.showzdTable('zdTable',_this.starttime,_this.endtime,_this.V01301,_this.times,_this.zdName);
                    return false; 
                  });
            });

        },
        //1站点（地面）数据
        qwsubmit:function(event){
            sessionStorage.removeItem("formData");
            var _this = this;
            layui.use('form',function(){
                var form = layui.form;
                form.verify({
                    date:function(value,item){
                        if(!value){
                            return '日期不能为空'
                        }else{
                            // console.log(value)
                            var oDate1 = new Date('2005-01-01');
                            var oDate2 = new Date('2014-12-31');
                            var pickDate = new Date(value);
                            // console.log(value)
                            // console.log(pickDate)
                            // console.log(oDate1)
                            // console.log(oDate2)
                            // console.log(pickDate)
                            if(pickDate>=oDate1&&pickDate<=oDate2){
                            }else{
                                return '日期有误，请选择2005年1月1日至2014年12月31日之间的日期！'
                            }

                        }
                    },
                    times:function(value,item){
                        if(!value){
                            return '时次不能为空'
                        }
                    }
                })
                
                form.on('submit(qiwenloading)', function(data){
                    var data = {
                        date:_this.qiwendate,
                        times:_this.qiwentimes,
                        mark:_this.sign
                    }
                    _this.$parent.load(event);
                    sessionStorage.setItem("formData",JSON.stringify(data));
                    return false; 
                  });
            });
        },
        //1站点：获取全球气温历史数据信息
        getGWInfo:function(param){
            var station = JSON.parse(param);
            this.stationInfo = station.stationInfo;
            this.stationElements = station.stationElements;
//            console.log(station)
//            console.log(this.stationInfo);
//            console.log(this.stationElements);
            $(".t2 .stationBox").addClass("cur");            
        },
        //2nc数据表单提交
        ncsubmit:function(event){
            sessionStorage.removeItem("formData");
            //提交时的验证规则
            var _this = this,tabSelected;
            layui.use(['table','form'],function(){
                var form = layui.form;
                var table = layui.table;
                 tabSelected = table.checkStatus('ncTable').data;
                 //验证规则
                 form.verify({
                     qiya:function(value,item){
                        if(!value){
                            return '气压值不能为空'
                        }
                     },
                     table:function(value,item){
                        if(tabSelected.length<=0){
                            return '请勾选一条文件数据！'
                        }
                     },
                     date:function(value,item){
                        if(!value){
                            return '日期不能为空'
                        }else{
                            var d = tabSelected[0].fileName;
                            var s = d.split(".nc");
                            var startDate;
                            var endDate;
                            var elements;
                            if(s[0].indexOf("_") != -1){
                                var arr = s[0].split("_");
                                var str = arr[arr.length-1].split("-");
                                startDate = str[0].substring(0, 4) + "-" + str[0].substring(4, 6);
                                endDate = str[1].substring(0, 4) + "-" + str[1].substring(4, 6);
                                elements = arr[0];
                            }else{
                                var arr = s[0].split(".");
                                startDate = arr[arr.length-2];
                                endDate = arr[arr.length-1];
                                startDate = arr[arr.length-2];
                                endDate = arr[arr.length-1];
                            }
                            var oDate1 = new Date(startDate);
                            var oDate2 = new Date(endDate);
                            var pickDate = new Date(value);

                            
                            // console.log(startDate)
                            // console.log(endDate)
                            // console.log(value)
                            // console.log(oDate1)
                            // console.log(oDate2)
                            // console.log(pickDate)
                            if(pickDate>oDate1&&pickDate<oDate2){
                                // return [true, elements];
                            }else{
                                // return [false, elements];
                                return '日期有误，请选择'+startDate+'年'+'至'+endDate+'年'+'之间的日期！'
                            }
                        }
                     }
                 })
                 //submit 成功
                 form.on('submit(zdloading)', function(data){
                    var data = {
                        qiya:_this.qy,
                        tabSelect:tabSelected[0],
                        date:_this.dTwo,
                        mark:_this.sign
                    };
                    // console.log(data);
                    _this.$parent.load(event);
                    sessionStorage.setItem("formData",JSON.stringify(data));
                    // console.log(JSON.parse(sessionStorage.getItem("formData"))); 
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                  });
            })
                                
        },
        //6火烧迹地数据提交
        hssubmit:function(){
            sessionStorage.removeItem("formData");
           
            var data = {
                mark:this.sign
            };
            this.$parent.load(event);
            sessionStorage.setItem("formData",JSON.stringify(data));
        },
        //7遥感数据提交
        ygsubmit:function(event){
            sessionStorage.removeItem("formData");
            var _this = this,tabSelected;
            layui.use(['table','form'],function(){
                var table = layui.table;
                var form = layui.form;
                 tabSelected = table.checkStatus('ygTable').data;
                 form.verify({
                    table:function(){
                        if(tabSelected.length<=0){
                            return '请勾选一条文件数据！'
                        }
                    }
                 })
                   //submit 成功
                   form.on('submit(ygloading)', function(data){
                    var data = {
                        tabSelect:tabSelected[0],
                        mark:_this.sign
                    };
                    // console.log(data);
                    _this.$parent.load(event);
                    sessionStorage.setItem("formData",JSON.stringify(data));
                    // console.log(JSON.parse(sessionStorage.getItem("formData"))); 
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                  });
            })
        }       
        
    }

});

var vm = new Vue({
    el:"#app",
    data:function(){
        return {
           id:'',
           baseUrl:'',
           menutree:null,
           dataType:'',
           dataName:'',
           dataId:null,
           isAcitve:false,
           curDataInfo:null,
           i1:0,
           i2:0,
           i3:0,
           mark:0,
           loadlayer:null
        }
    },
    methods:{
        init:function(base){
            var _t = this;
            //页面加载就清除sessionstorage
               // 面板收缩
            var arrow = $(".right-box .arrow-r");
            var icon = arrow.find("i");
            var panel = $(".right-box .main-b");
            arrow.click(function(){
                if(!icon.hasClass("fa-angle-double-right")){
                    panel.animate({'width':'0'},80);
                }else{
                    panel.animate({'width':'446px'},80);
                }
                icon.toggleClass("fa-angle-double-right");

            })
        },
        load:function(e){
            var _this = this;
            layui.use('layer',function(){
                var layer = layui.layer;
                $(".mask").addClass("cur");  
                _this.loadlayer = layer.load(0,{time:1*1000});
                setTimeout(function(){
                    _this.closeLoad();
                    if(e){
                        loadDatas();
                    }
                },700);
                // _this.closeLoad();
            })
            // layui.use('element',function(){
            //     var $ = layui.jquery
            //     ,element = layui.element; 
            //     // 进度条加载
            //     //触发事件
            //     layui.use('element', function(){
            //         var $ = layui.jquery
            //         ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
            //         $(".mask").addClass("cur")  
                   
                    
            //         //触发事件
            //         var active = {
            //             loading: function(othis){
            //                 var DISABLED = 'layui-btn-disabled';
            //                 if(othis.hasClass(DISABLED)) return;
                          
            //                 //模拟loading
            //                 var n = 0, timer = setInterval(function(){
            //                   n = n + Math.random()*10|0;  
            //                   if(n>100){
            //                     n = 100;
            //                     clearInterval(timer);
            //                     othis.removeClass(DISABLED);
            //                     $(".mask").removeClass('cur');
            //                     element.progress('demo','0%');
            //                     loadDatas();
            //                   }else{
            //                     element.progress('demo', n+'%');
            //                   }
            //                 }, 30+Math.random()*1);
                            
            //                 othis.addClass(DISABLED);
            //               }
            //         };
            //         var othis = $(e.target), type = othis.data('type');
            //         active[type] ? active[type].call(this, othis) : '';
                    
                     
            //       });
            // }) 
        },

        closeLoad:function(){
            layui.use('layer',function(){
                var layer = layui.layer;
                layer.close(_this.loadlayer); 
                $(".mask").removeClass("cur");    
            })
        },
        getTree:function(base){
            var apiUrl1 = base+ '/manage/metadataInfoApi/getMetaTree';
            axios.get(apiUrl1).then(function(res) {
                var datas = res.data.result;
                _this.menutree = datas;
                if(localStorage.getItem('detail')){
                    var data = JSON.parse(localStorage.getItem('detail'));
                     _this.changePanel(data);
                      localStorage.removeItem('detail');
                }else{

                    _this.changePanel(_this.menutree[0]['children'][0]['children'][0],0,0,0);
                }
                
            })
        },
        getUrl:function(){
            _this = this;
            $.ajax({
                url:"../api.json",
                type:"get",
                dataType:"json",
                success:function(data){ 
                    _this.baseUrl = data.result.baseUrl;
                    _this.init(_this.baseUrl);
                    _this.getTree(_this.baseUrl);
                //    console.log(_this.baseUrl);                

                },
                error:function(){
                    console.log(error);
                }
            })
        },
        changePanel:function(param1,param2,param3,param4){
            // console.log(param1,param2,param3,param4)
            this.i3 = param2;
            this.i2 = param3;
            this.i1 = param4;
            this.curDataInfo = param1;
            // this.i = param4;
            this.mark = param1.type;
            this.dataName = param1.label;
            this.dataId = param1.dataId;
            $(".reset").trigger('click');
            if(param1.type == 1){
                this.dataType = '站点数据';
                $(".t2 .stationBox").removeClass('cur');
                $(".form1 .info").removeClass('cur');
            }
            if(param1.type == 2){
                this.dataType = 'NC数据';
                $(".date-two").attr('placeholder','请选择年月');
                this.$refs.mp.showTable(this.baseUrl,260,param1.dataId,'ncTable')
            }
            if(param1.type == 3){
                this.dataType = '文件数据';
            }
            if(param1.type == 4){
                this.dataType = '图片数据';
            }
            if(param1.type == 5){
                this.dataType = '卫星遥感数据';
                this.$refs.mp.showTable(this.baseUrl,340,param1.dataId,'ygTable')
            }
            if(param1.type == 6){
                this.dataType = '火烧迹地数据';
            }
            if(param1.type == 7){
                this.dataType = '星地融合数据';
            }
            this.isAcitve = true;
            var arrow = $(".right-box .arrow-r");
            var panel = $(".right-box .main-b");
            var icon = arrow.find("i");
            var panelW =  panel.outerWidth(); 
            if(panelW == 0){
                panel.animate({'width':'446px'},80);
                icon.toggleClass("fa-angle-double-right");
            }       
        }       
    },
    created:function(){
        this.getUrl();
        // this.load();
    },
    mounted:function(){
        // var _this = this;
        // setTimeout(function(){
        //     _this.closeLoad();
        // },2000);
       
    }
})