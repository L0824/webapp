/*
 *  jQuery分页
 */
(function ($) {
    $.fn.extend({
        simplePaging: function (opts) {
            //设置默认参数
            var opt = {
                allPage: 12,//总页数
                showPage: 5,//显示页数
                startPage: 1,//第一页页码数字
                initPage: 1,//加载完毕自动跳转到第n页
                first: "首页",//首页显示字符
                last: "尾页",//尾页显示字符
                prev: "«",//上一页显示字符
                next: "»",//下一页显示字符
                animateType: "animation",//过渡模式：动画“animation”、跳动“jumpy”、快速移动“fast”、正常速度移动“normal”、缓慢的速度移动“slow”、异常缓慢的速度移动“verySlow”
                animationTime: 300,//animateType为animation时，动画过渡时间(ms)
                callBack: function (num) {
                    console.log(num)
                }
            };
            //合并参数
            var option = $.extend(opt, opts);
            if (option.initPage < option.startPage) {
                alert("错误：初始化显示页码不应该小于第一页页码");
                return false;
            } else if (option.animateType !== "animation") {
                switch (option.animateType) {
                    case "jumpy":
                        option.animationTime = 0;
                        break;
                    case "fast":
                        option.animationTime = 100;
                        break;
                    case "normal":
                        option.animationTime = 200;
                        break;
                    case "slow":
                        option.animationTime = 400;
                        break;
                    case "verySlow":
                        option.animationTime = 800;
                        break;
                }
            }
            option.showPage <= 0 ? option.showPage = 1 : option.showPage;
            option.showPage > option.allPage ? option.showPage = option.allPage : option.showPage;
            var dialog = {};
            var simplePaging = $(this);
            var spPrev = $("<div class='spPrev'>");
            var spFirst = $("<div class='spFirst'>");
            var spPage = $("<div class='spPage'>");
            var spCover = $("<div class='spCover'>");
            var spActiveBg = $("<div class='spActiveBg'>");
            var spLast = $("<div class='spLast'>");
            var spNext = $("<div class='spNext'>");
            var ul = $("<ul>");
            var delay = false;
            var centerShowPage;
            if (option.showPage % 2 === 0) {
                centerShowPage = Math.floor((option.showPage - 1) / 2)
            } else {
                centerShowPage = Math.floor(option.showPage / 2)
            }
            dialog.init = function () {
                ul.append(spActiveBg);
                for (var i = 0, j = option.startPage; i < option.allPage; i++, j++) {
                    var li = $("<li>");
                    if (!i) {
                        li.addClass("active");
                    }
                    li.html("<p>" + j + "</p>").on("click", function () {
                        if (!delay) {
                            delay = !delay;
                            changePage($(this).text())
                        }
                    });
                    ul.append(li)
                }
                spPrev.text(option.prev).on("click", function () {
                    if (!delay) {
                        var num = ul.find("li.active").text() - 1;
                        delay = !delay;
                        changePage(num)
                    }
                });
                spFirst.text(option.first).on("click", function () {
                    if (!delay) {
                        var num = ul.find("li:first").text();
                        delay = !delay;
                        changePage(num)
                    }
                });
                spLast.text(option.last).on("click", function () {
                    if (!delay) {
                        var num = ul.find("li:last").text();
                        delay = !delay;
                        changePage(num)
                    }
                });
                spNext.text(option.next).on("click", function () {
                    if (!delay) {
                        var num = ul.find("li.active").text() - 0 + 1;
                        delay = !delay;
                        changePage(num)
                    }
                });
                spCover.append(ul);
                spPage.append(spCover);
                simplePaging.append(spPrev, spFirst, spPage, spLast, spNext);
                spCover.width(ul.find("li").outerWidth(true) * option.showPage);
                ul.width(ul.find("li").outerWidth(true) * option.allPage).find("li").eq(option.initPage - option.startPage).trigger("click");
                simplePaging.width(ul.find("li").outerWidth(true) * (option.showPage + 4));
            };
            function changePage(num) {
                if (num < option.startPage || num > option.allPage + option.startPage - 1) {
                    delay = !delay;
                    return false;
                } else if (ul.find("li.active").text() === num) {
                    delay = !delay;
                    return false;
                }
                var leng = num - option.startPage;
                var liWidth = ul.find("li").outerWidth(true);
                ul.find("li.active").removeClass("active");
                spActiveBg.animate({"left": liWidth * (num - option.startPage)}, option.animationTime);
                if (leng <= centerShowPage) {
                    ul.animate({"left": 0}, option.animationTime, function () {
                        autoActive()
                    });
                } else if (leng >= option.allPage - centerShowPage - 1) {
                    ul.animate({"left": -liWidth * (option.allPage - option.showPage)}, option.animationTime, function () {
                        autoActive()
                    });
                } else {
                    ul.animate({"left": -liWidth * (leng - centerShowPage)}, option.animationTime, function () {
                        autoActive()
                    });
                }
                function autoActive() {
                    delay = !delay;
                    ul.find("li").eq(num - option.startPage).addClass("active");
                    option.callBack(num)
                }
            }
            dialog.init();
        }
    });
})(jQuery);