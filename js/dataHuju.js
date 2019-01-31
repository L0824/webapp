$(function(){
    var oUl=$(".header-container .header-nav .nav-ul");
    var oLi=oUl.find("li");
	var oSpan=oUl.find(".line");	
    var oA=oUl.find(".a0");
    oLi.hover(function(){ 
        $(this).find('.line').css('width','100%');
    },function(){
        $(this).find('.line').css('width','0');
    });
    // 搜索输入框
    $(".header-title .title-right input").focus(function(){
        $(this).parents(" .title-right").addClass("cur");
    }).blur(function(){
        $(this).parents(" .title-right").removeClass("cur");
    })
    // 左边导航栏
    $('.sjhj_leftli').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
    // 新增数据汇聚
    $('.addData').click(function(){
        var addDatatitle ="<div class='sjhj_head'>\
                  <img src='../images/notepad.png' class='sh_img'>\
                  <div class='sh_title'>新增数据汇聚</div></div>\
                  <div class='sh_line1'></div>\
                  <div class='sh_line2'></div>\
                  <div class='sjhj_conbg'>\
                  <div class='col-sm-12 addTitle>\
                  <span class='addData1'>新增数据</span>\
                  </div>\
                  <form class='form-horizontal'>\
                      <div class='form-group'>\
                          <label for='input1' class='col-sm-4 control-label'>数据集名称：</label>\
                          <div class='col-sm-4'>\
                              <input type='text' class='form-control' id='input1' placeholder=''>\
                         </div>\
                      </div>\
                      <div class='form-group'>\
                          <label  class='col-sm-4 control-label'>资料类型：</label>\
                          <div class='col-sm-4'>\
                                <select class='form-control'>\
                                    <option>--请选择--</option>\
                                    <option>气象灾害</option>\
                                    <option>气象灾害</option>\
                                    <option>气象灾害</option>\
                                    <option>气象灾害</option>\
                               </select>\
                          </div>\
                      </div>\
                      <div class='form-group'>\
                          <label  class='col-sm-4 control-label'>上传方式：</label>\
                          <div class='col-sm-4'>\
                              <input type='text' class='form-control'  placeholder=''>\
                          </div>\
                      </div>\
                      <div class='form-group'>\
                            <label class='col-sm-4 control-label'>日期：</label>\
                            <div class='col-sm-4'>\
                                <input type='date' class='form-control'  placeholder=''>\
                            </div>\
                     </div>\
                      <div class='form-group'>\
                          <label  class='col-sm-4 control-label'>状态：</label>\
                          <div class='col-sm-4'>\
                            <select class='form-control'>\
                            <option>--请选择--</option>\
                            <option>已审核</option>\
                            <option>未审核</option>\
                            <option>待通过</option>\
                            <option>通过</option>\
                            </select>\
                          </div>\
                      </div>\
                      <div class='form-group'>\
                            <label  class='col-sm-4 control-label'>说明：</label>\
                            <div class='col-sm-4'>\
                                <textarea name='' id='' cols='35' rows='10'></textarea>\
                            </div>\
                    </div>\
                      <div class='form-group'>\
                      <div class='col-sm-offset-4 col-sm-10'>\
                          <button type='submit' class='btn btn-info'>文件上传</button>\
                      </div>\
                      </div>\
                  </form>\
             </div>\
        ";
        $('.sjhj_right').html(addDatatitle)
     })


    
    // 汇聚流程
    $('.liucheng').click(function(){
        var liucheng ="<div class='sjhj_head'><img src='../images/notepad.png' class='sh_img'><div class='sh_title'>汇聚流程</div></div>\
                  <div class='sh_line1'></div>\
                  <div class='sh_line2'></div>\
                  <div class='sjhj_conbg'>\
                      <img src='../images/liuchengtu.png' class='sjhj_img'>\
                  </div>\
                  ";
        $('.sjhj_right').html(liucheng)
     })

})

var vm = new Vue({
    el:'#app',
    data: {
      
            menuTitle1:"数据集名称",
            menuTitle2:"资料分类",
            menuTitle3:"数据上传方式",
            menuTitle4:"创建时间",
            menuTitle5:"状态",
            menuTitle6:"元数据操作",
            menuTitle7:"数据操作",
            menuTitle8:"说明",
            dataObj:
                {
                    'name':'洪涝灾害数据集',
                    'classFly':'气象灾害',
                    'upload':'人工',
                    'creatTime':'2018-4-20',
                    'state':'未知',
                    'ydataCapzuo':'审核 ',
                    'dataCapzuo':'人工审核',
                    'explain':'已审核'
                },
                dataObj1:
                {
                    'name':'中国干旱灾害数据集',
                    'classFly':'气象灾害',
                    'upload':'人工',
                    'creatTime':'2018-4-24',
                    'state':'未知',
                    'ydataCapzuo':'审核 ',
                    'dataCapzuo':'人工审核',
                    'explain':'未通过'
                },
                dataObj2:
                {
                    'name':'中国热带气旋灾害数据集 ',
                    'classFly':'气象灾害',
                    'upload':'机器',
                    'creatTime':'2018-4-26',
                    'state':'未知',
                    'ydataCapzuo':'审核 ',
                    'dataCapzuo':'人工审核',
                    'explain':'待审核'
                },
                dataObj3:
                {
                    'name':'干旱灾害数据集',
                    'classFly':'气象灾害',
                    'upload':'人工',
                    'creatTime':'2018-4-29',
                    'state':'未知',
                    'ydataCapzuo':'审核 ',
                    'dataCapzuo':'人工审核',
                    'explain':'已审核'
                },
                dataObj4:
                {
                    'name':'天气干旱灾害数据集',
                    'classFly':'气象灾害',
                    'upload':'人工',
                    'creatTime':'2018-4-29',
                    'state':'未知',
                    'ydataCapzuo':'审核 ',
                    'dataCapzuo':'人工审核',
                    'explain':'审核中'
                }
      
    },
    methods:{
        getData:function(){
            var dataList ="<div class='sjhj_head'><img src='../images/notepad.png' class='sh_img'><div class='sh_title'>汇聚协议</div></div>\
            <div class='sh_line1'></div>\
            <div class='sh_line2'></div>\
            <div class='sjhj_conbg'>\
                <div class='sjhj_sx'>\
                    <form name='search_form' method='post' action=''>\
                        <div class='sjhj_f_xz'>\
                            <span class='f_title'>数据名称：</span>\
                            <input type='text' name='title' value='' class='f_input'>\
                        </div>\
                        <div class='sjhj_s_xz'>\
                            <span class='s_title'>状态：</span>\
                            <select class='s_select' name='status'>\
                                <option value='null'>请选择</option>\
                                <option value='10'>元数据待提交</option>\
                                <option value='1'>审核中</option>\
                                <option value='2'>审核通过</option>\
                                <option value='3'>审核退回</option>\
                                <option value='11'>DOI信息待完善</option>\
                                <option value='4'>DOI待送审</option>\
                                <option value='7'>DOI专家审核</option>\
                                <option value='8'>DOI待汇审</option>\
                                <option value='9'>DOI审核拒绝</option>\
                                <option value='5'>DOI审核退回</option>\
                                <option value='6'>DOI审核通过</option>\
                            </select>\
                        </div>\
                        <div class='sjhj_sub_btn'></div>\
                    </form>\
                </div>\
               <div class='jihe'>\
                    <div class='sjhj_thead clear-fix'>\
                        <div class='sjhj_th_m1 comm'>"+this.menuTitle1+"</div>\
                        <div class='sjhj_th_m2 comm'>"+this.menuTitle2+"</div>\
                        <div class='sjhj_th_m3 comm'>"+this.menuTitle3+"</div>\
                        <div class='sjhj_th_m4 comm'>"+this.menuTitle4+"</div>\
                        <div class='sjhj_th_m5 comm'>"+this.menuTitle5+"</div>\
                        <div class='sjhj_th_m6 comm'>"+this.menuTitle6+"</div>\
                        <div class='sjhj_th_m7 comm'>"+this.menuTitle7+"</div>\
                        <div class='sjhj_th_m8 comm'>"+this.menuTitle8+"</div>\
                    </div>\
                    <div class='sjhj_table'>\
                        <div class='dataConnect one' >"+this.dataObj.name+"</div>\
                        <div class='dataConnect two' >"+this.dataObj.classFly+"</div>\
                        <div class='dataConnect two' >"+this.dataObj.upload+"</div>\
                        <div class='dataConnect four' >"+this.dataObj.creatTime+"</div>\
                        <div class='dataConnect two' >"+this.dataObj.state+"</div>\
                        <div class='dataConnect three' >"+this.dataObj.ydataCapzuo+"</div>\
                        <div class='dataConnect three'>"+this.dataObj.dataCapzuo+"</div>\
                        <div class='dataConnect five' >"+this.dataObj.explain+"</div>\
                    </div>\
                    <div class='sjhj_table'>\
                        <div class='dataConnect one' >"+this.dataObj1.name+"</div>\
                        <div class='dataConnect two' >"+this.dataObj1.classFly+"</div>\
                        <div class='dataConnect two' >"+this.dataObj1.upload+"</div>\
                        <div class='dataConnect four' >"+this.dataObj1.creatTime+"</div>\
                        <div class='dataConnect two' >"+this.dataObj1.state+"</div>\
                        <div class='dataConnect three' >"+this.dataObj1.ydataCapzuo+"</div>\
                        <div class='dataConnect three'>"+this.dataObj1.dataCapzuo+"</div>\
                        <div class='dataConnect five' >"+this.dataObj1.explain+"</div>\
                    </div>\
                    <div class='sjhj_table'>\
                        <div class='dataConnect one' >"+this.dataObj2.name+"</div>\
                        <div class='dataConnect two' >"+this.dataObj2.classFly+"</div>\
                        <div class='dataConnect two' >"+this.dataObj2.upload+"</div>\
                        <div class='dataConnect four' >"+this.dataObj2.creatTime+"</div>\
                        <div class='dataConnect two' >"+this.dataObj2.state+"</div>\
                        <div class='dataConnect three' >"+this.dataObj2.ydataCapzuo+"</div>\
                        <div class='dataConnect three'>"+this.dataObj2.dataCapzuo+"</div>\
                        <div class='dataConnect five' >"+this.dataObj2.explain+"</div>\
                    </div>\
                    <div class='sjhj_table'>\
                        <div class='dataConnect one' >"+this.dataObj3.name+"</div>\
                        <div class='dataConnect two' >"+this.dataObj3.classFly+"</div>\
                        <div class='dataConnect two' >"+this.dataObj3.upload+"</div>\
                        <div class='dataConnect four' >"+this.dataObj3.creatTime+"</div>\
                        <div class='dataConnect two' >"+this.dataObj3.state+"</div>\
                        <div class='dataConnect three' >"+this.dataObj3.ydataCapzuo+"</div>\
                        <div class='dataConnect three'>"+this.dataObj3.dataCapzuo+"</div>\
                        <div class='dataConnect five' >"+this.dataObj3.explain+"</div>\
                    </div>\
                    <div class='sjhj_table'>\
                        <div class='dataConnect one' >"+this.dataObj4.name+"</div>\
                        <div class='dataConnect two' >"+this.dataObj4.classFly+"</div>\
                        <div class='dataConnect two' >"+this.dataObj4.upload+"</div>\
                        <div class='dataConnect four' >"+this.dataObj4.creatTime+"</div>\
                        <div class='dataConnect two' >"+this.dataObj4.state+"</div>\
                        <div class='dataConnect three' >"+this.dataObj4.ydataCapzuo+"</div>\
                        <div class='dataConnect three'>"+this.dataObj4.dataCapzuo+"</div>\
                        <div class='dataConnect five' >"+this.dataObj4.explain+"</div>\
                    </div></div></div>";
           $('.sjhj_right').html(dataList);
        },
        gotoTop:function(){
            $(".toTop").tooltip("toTop",{
                'movespeed':'300',
                'showspeed':'300',
                'overheight':'400'
            });
        }
    },
    mounted:function(){
        this.gotoTop();    
    }
});


