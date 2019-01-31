
;(function(){
    var methods = {
        toTop:function(options){
            // 设置参数           
            var settings = $.extend({
                'movespeed':'',
                'showspeed':'',
                'overheight':''
            },options);
            var topBtn = this;
            $(window).scroll(function(){
                if($(window).scrollTop()>settings.overheight){
                    topBtn.fadeIn(settings.showspeed); 
                }else{
                    topBtn.fadeOut(settings.showspeed); 
                }
            });
            topBtn.click(function(){
                $('html,body').animate({scrollTop: '0px'}, settings.movespeed);     
            });
            return topBtn;
        },


    };
    $.fn.tooltip = function(method){
        if(methods[method]){
            return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
        }else if(typeof method === 'object' || !method){
            return methods.init.apply(this,arguments);
        }else{
            $.error('Method'+method+'does not exist on jQuery.tooltip');
        }
    }
})(jQuery);