$(function(){$(".search_ico1").click(function(){$(this).hide();$(".search").show()});$(".nav").children("li").mouseover(function(){$(this).siblings().children(".nav_list").hide();$(this).children(".nav_list").show();$('<span class="line"></span>').prependTo($(this))});$(".nav").children("li").mouseout(function(){$(this).children(".nav_list").hide();$(".line").remove()});(function(){$(".shuffling").css("width",$(".shuffling li").length*100+"%");$(".shuffling li").css("width",(100/$(".shuffling li").length).toFixed(6)+"%");var e=0,h=null;function g(j,k,i){j.addClass("bgd71920").siblings().removeClass("bgd71920");k.stop().animate({"left":"-"+i*100+"%"},{"duration":1000,"easeing":"linear"})}function f(){e++;if(e>$(".round_btn ul li").length-1){e=0}g($(".round_btn ul li:eq("+e+")"),$(".shuffling"),e)}if($("#btn_right").length>0||$("#btn_left").length>0||$(".shuffling").length>0){$("#btn_right")[0].onmouseover=$("#btn_left")[0].onmouseover=$(".shuffling")[0].onmouseover=function(){clearInterval(h)};$("#btn_right")[0].onmouseout=$("#btn_left")[0].onmouseout=$(".shuffling")[0].onmouseout=function(){h=setInterval(f,5000)}}h=setInterval(f,5000);$(".round_btn ul li").each(function(j,k){$(this).click(function(){e=j;g($(this),$(".shuffling"),e)})});$("#btn_left").click(function(){e--;if(e<0){e=$(".round_btn ul li").length-1}g($(".round_btn ul li:eq("+e+")"),$(".shuffling"),e)});$("#btn_right").click(function(){f()})})();(function(){$(".events ul li").each(function(g,h){e($(h)[0])});$(".events ul li").click(function(){$(".events_bg img").attr("src",$(this).children("img").attr("src"));$(".events_bg a").attr("href",$(this).find("img").attr("data-href"));$(".events_bg").show();$(".mask").show();var h=(document.documentElement.clientWidth-$(".events_bg").outerWidth())/2+document.documentElement.scrollLeft||document.body.scrollLeft;var g=document.documentElement.scrollTop||document.body.scrollTop+(document.documentElement.clientHeight-$(".events_bg").outerHeight())/2;$(".events_bg").css({"top":g,"left":h})});$(".close").click(function(){$(".events_bg").hide();$(".mask").hide()});function f(j,k){var g=j.offsetWidth;var l=j.offsetHeight;var h=$(j).offset().left+g/2-k.pageX;var i=$(j).offset().top+l/2-k.pageY;return Math.round((Math.atan2(i,h)*180/Math.PI+180)/90)%4}function e(g){var h=g.children[1];g.onmouseover=function(j){var k=j||event;var l=k.formElement||k.relatedTarget;if(g.contains(l)){return}var i=f(g,k);switch(i){case 0:h.style.top=0;h.style.left=g.offsetWidth+"px";break;case 1:h.style.top=g.offsetHeight+"px";h.style.left=0;break;case 2:h.style.top=0;h.style.left=-g.offsetWidth+"px";break;case 3:h.style.top=-g.offsetHeight+"px";h.style.left=0;break}$(h).stop().animate({"left":0,"top":0},{"duration":300})};g.onmouseout=function(k){var l=k||event;var j=l.toElement||l.relatedTarget;if(g.contains(j)){return}var i=f(g,l);switch(i){case 0:$(h).stop().animate({"top":0,"left":g.offsetWidth});break;case 1:$(h).stop().animate({"top":g.offsetHeight,"left":0});break;case 2:$(h).stop().animate({"top":0,"left":-g.offsetWidth});break;case 3:$(h).stop().animate({"top":-g.offsetHeight,"left":0});break}}}})();function d(e){return e<10?"0"+e:""+e}(function(){var h=null;var f=new Date();f.setFullYear(2016,4,15);f.setHours(7,30,0,0);var g=f.getTime();function e(){var m=new Date();var j=m.getTime();var l=parseInt((g-j)/1000);if(l<=0){n=k=o=l=0;clearInterval(h)}var n=parseInt(l/86400);l%=86400;var k=parseInt(l/3600);l%=3600;var o=parseInt(l/60);l%=60;var i=[d(n),d(k),d(o),d(l)];$(".cd_time li").each(function(p,q){$(q).children("i").html(i[p])})}e();h=setInterval(e,1000)})();var c=v_hk01661.split("~");var a=c[30].split(" ");var b;if(a[1].split(":")[0]>12){b="PM"}else{b="AM"}$(function(){var e;if(c[32]>0){e="<span style='color:#FFF'>&nbsp;"+c[32]+"%</span>"}else{if(c[32]<0){e="<span style='color:#FFF'>&nbsp;"+c[32]+"%</span>"}else{e="<span style='color:#fff'>&nbsp;"+c[32]+"%</span>"}}$(".stock").html("香港证券交易所&nbsp;"+c[30]+" "+b+" &nbsp;01661&nbsp;HK:<strong>"+c[3]+"</strong>&nbsp;HKD "+e)});$(".ev_ico li").each(function(){$(this).mouseover(function(){$(this).addClass("ev_ico1")});$(this).mouseout(function(){$(this).removeClass("ev_ico1")})});$(".wb_box a").mouseover(function(){$(this).find("div").show()});$(".wb_box a").mouseout(function(){$(this).find("div").hide()});(function(f){var e=f.location.href.split("/");e.splice(0,3);var g="/"+e.join("/");$('.list_con_l a[href="'+g+'"]').addClass("on").siblings().removeClass(".on")})(window);$(".list_con_l a").click(function(){$(this).addClass("on").siblings().removeClass("on")});$(".pag_btn li a").click(function(){$(this).parent().addClass("active").siblings().removeClass("active")})});