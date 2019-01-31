$(function(){
    // 项目名称展开收起功能
    

    var text = $("#des-xxjs").text();
    var subtrText = text.substring(0, 112);
    $("#des-xxjs").html(subtrText+"...");
    var textHeight = $("#des-xxjs").height();
    $("#des-xxjs").parents(".main-cnt-box").find(".m-img").height(textHeight);

    var open_a =$("#des-xxjs").siblings(".open-btn");
    open_a.click(function(){
        var btnText = $(this).text();
        if(btnText=='展开'){
            
            $("#des-xxjs").text(text);
            $(this).text("收起");
        }else{
            $("#des-xxjs").text(subtrText+"...");
            $(this).text("展开");
        }
    })

    // 首席科学家收起和展开功能
    // 两端对齐实现
    var box=document.getElementById("person-des");
    box.style.textAlign = "justify";
    box.style.letterSpacing = '-.15em';
    box.innerHTML = box.innerHTML.split("").join(" ");
    var text2 = $("#person-des").text();
    var subtrText2 = text2.substring(0, 348);
    $("#person-des").html(subtrText2+"...");

    var textHeight = $("#person-des").parents(".right-des").height();
    $("#person-des").parents(".main-cnt-box").find(".m-img").height(textHeight);
    var open_a2 =$("#person-des").siblings(".open-btn");
    open_a2.click(function(){
        var btnText = $(this).text();
        if(btnText=='展开'){            
            $("#person-des").text(text2);
            $(this).text("收起");
        }else{
            $("#person-des").text(subtrText2+"...");
            $(this).text("展开");
        }
    })


})
