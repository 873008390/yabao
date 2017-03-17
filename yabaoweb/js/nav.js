

jQuery.noConflict();

var ebadusmenu={

effectduration: 0, //出现动画的时间 毫秒
delaytimer: 200, //菜单隐藏时间  毫秒

//这里不要编辑
badugmenulabels: [],
badugmenus: [],
zIndexVal: 1000, //从 z-index 后显示下拉菜单
$shimobj: null,

addshim:function($){
	$(document.getElementById("headerb")).append('<IFRAME id="outlineiframeshim" src="'+(location.protocol=="https:"? 'blank.htm' : 'about:blank')+'" style="display:none; left:0; top:0; z-index:999; position:absolute; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)" frameBorder="0" scrolling="no"></IFRAME>')
	this.$shimobj=$("#outlineiframeshim")
},

alignmenu:function($, e, badugmenu_pos){
	var badugmenu=this.badugmenus[badugmenu_pos]
	var $anchor=badugmenu.$anchorobj
	var $menu=badugmenu.$menuobj
	var menuleft=($(window).width()-(badugmenu.offsetx-$(document).scrollLeft())>badugmenu.actualwidth)? badugmenu.offsetx : badugmenu.offsetx-badugmenu.actualwidth+badugmenu.anchorwidth //获取菜单的坐标
	//var menutop=($(window).height()-(badugmenu.offsety-$(document).scrollTop()+badugmenu.anchorheight)>badugmenu.actualheight)? badugmenu.offsety+badugmenu.anchorheight : badugmenu.offsety-badugmenu.actualheight
	//var menutop=badugmenu.offsety+badugmenu.anchorheight  //获取菜单的y值
//	$menu.css({left:menuleft+"px", top:menutop+"px"})
//	this.$shimobj.css({width:badugmenu.actualwidth+"px", height:badugmenu.actualheight+"px", left:menuleft+"px", top:menutop+"px", display:"block"})
},

showmenu:function(e, badugmenu_pos){
	var badugmenu=this.badugmenus[badugmenu_pos]
	var $menu=badugmenu.$menuobj
	var $menuinner=badugmenu.$menuinner
	if ($menu.css("display")=="none"){
		this.alignmenu(jQuery, e, badugmenu_pos)
		$menu.css("z-index", ++this.zIndexVal)
		$menu.show(this.effectduration, function(){
			$menuinner.css('visibility', 'visible')
		})
	}
	else if ($menu.css("display")=="block" && e.type=="click"){ //如果菜单是隐藏的，这是一个"点击"事件（或"鼠标离开状态"）
		this.hidemenu(e, badugmenu_pos)
	}
	return false
},

hidemenu:function(e, badugmenu_pos){
	var badugmenu=this.badugmenus[badugmenu_pos]
	var $menu=badugmenu.$menuobj
	var $menuinner=badugmenu.$menuinner
	$menuinner.css('visibility', 'hidden')
	this.$shimobj.css({display:"none", left:0, top:0})
	$menu.hide(this.effectduration)
},

definemenu:function(anchorid, menuid, revealtype){
	this.badugmenulabels.push([anchorid, menuid, revealtype])
},

render:function($){
	for (var i=0, labels=this.badugmenulabels[i]; i<this.badugmenulabels.length; i++, labels=this.badugmenulabels[i]){
		if ($('#'+labels[0]).length!=1 || $('#'+labels[1]).length!=1) //当两个元素不明确的时候存在
			return
		this.badugmenus.push({$anchorobj:$("#"+labels[0]), $menuobj:$("#"+labels[1]), $menuinner:$("#"+labels[1]).children('ul:first-child'), revealtype:labels[2], hidetimer:null})
		var badugmenu=this.badugmenus[i]	
		badugmenu.$anchorobj.add(badugmenu.$menuobj).attr("_badugmenupos", i+"pos") //记住下拉菜单的历史
		badugmenu.actualwidth=badugmenu.$menuobj.outerWidth()
		badugmenu.actualheight=badugmenu.$menuobj.outerHeight()
		badugmenu.offsetx=badugmenu.$anchorobj.offset().left
		badugmenu.offsety=badugmenu.$anchorobj.offset().top
		badugmenu.anchorwidth=badugmenu.$anchorobj.outerWidth()
		badugmenu.anchorheight=badugmenu.$anchorobj.outerHeight()
		$(document.getElementById("headerb")).append(badugmenu.$menuobj) //下拉菜单移动结束
		badugmenu.$menuobj.css("z-index", ++this.zIndexVal).hide()
		badugmenu.$menuinner.css("visibility", "hidden")
		badugmenu.$anchorobj.bind(badugmenu.revealtype=="click"? "click" : "mouseenter", function(e){
			var menuinfo=ebadusmenu.badugmenus[parseInt(this.getAttribute("_badugmenupos"))]
			clearTimeout(menuinfo.hidetimer) 
			return ebadusmenu.showmenu(e, parseInt(this.getAttribute("_badugmenupos")))
		})
		badugmenu.$anchorobj.bind("mouseleave", function(e){
			var menuinfo=ebadusmenu.badugmenus[parseInt(this.getAttribute("_badugmenupos"))]
			if (e.relatedTarget!=menuinfo.$menuobj.get(0) && $(e.relatedTarget).parents("#"+menuinfo.$menuobj.get(0).id).length==0){ //检查鼠标有没有进入下拉菜单里面
				menuinfo.hidetimer=setTimeout(function(){ //添加延迟显示的隐藏菜单
					ebadusmenu.hidemenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_badugmenupos")))
				}, ebadusmenu.delaytimer)
			}
		})
		badugmenu.$menuobj.bind("mouseenter", function(e){
			var menuinfo=ebadusmenu.badugmenus[parseInt(this.getAttribute("_badugmenupos"))]
			clearTimeout(menuinfo.hidetimer) 
		})
		badugmenu.$menuobj.bind("click mouseleave", function(e){
			var menuinfo=ebadusmenu.badugmenus[parseInt(this.getAttribute("_badugmenupos"))]
			menuinfo.hidetimer=setTimeout(function(){
				ebadusmenu.hidemenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_badugmenupos")))
			}, ebadusmenu.delaytimer)
		})
	} //end
	if(/Safari/i.test(navigator.userAgent)){ //if Safari
		$(window).bind("resize load", function(){
			for (var i=0; i<ebadusmenu.badugmenus.length; i++){
				var badugmenu=ebadusmenu.badugmenus[i]
				var $anchorisimg=(badugmenu.$anchorobj.children().length==1 && badugmenu.$anchorobj.children().eq(0).is('img'))? badugmenu.$anchorobj.children().eq(0) : null
				if ($anchorisimg){ 
					badugmenu.offsetx=$anchorisimg.offset().left
					badugmenu.offsety=$anchorisimg.offset().top
					badugmenu.anchorwidth=$anchorisimg.width()
					badugmenu.anchorheight=$anchorisimg.height()
				}
			}
		})
	}
	else{
		$(window).bind("resize", function(){
			for (var i=0; i<ebadusmenu.badugmenus.length; i++){
				var badugmenu=ebadusmenu.badugmenus[i]	
				badugmenu.offsetx=badugmenu.$anchorobj.offset().left
				badugmenu.offsety=badugmenu.$anchorobj.offset().top
			}
		})
	}
	ebadusmenu.addshim($)
}

}

jQuery(document).ready(function($){
	ebadusmenu.render($)
})












jQuery(document).ready(function(){
	jQuery.jq51menu = function(menuboxid,submenu){
		var menuboxli = jQuery(menuboxid+" li");
		menuboxli.eq(0).find(submenu).show();
		menuboxli.find("a:first").attr("href","javascript:;");
		menuboxli.click( function () { 
			jQuery(this).addClass("thismenu").find(submenu).show().end().siblings("li").removeClass("thismenu").find(submenu).hide();
		});
	};
	//调用方法，可重用
	jQuery.jq51menu("#menubox","div.submenu");
});








	jQuery(document).ready(function() {
		jQuery.jqtab = function(tabtit,tab_conbox,shijian) {
			jQuery(tab_conbox).find("li").hide();
			jQuery(tabtit).find("li:first").addClass("thistab").show(); 
			jQuery(tab_conbox).find("li:first").show();
		
			jQuery(tabtit).find("li").bind(shijian,function(){
			  jQuery(this).addClass("thistab").siblings("li").removeClass("thistab"); 
				var activeindex = jQuery(tabtit).find("li").index(this);
				jQuery(tab_conbox).children().eq(activeindex).show().siblings().hide();
				return false;
			});
		
		};
		/*调用方法如下：*/
		jQuery.jqtab("#tabs","#tab_conbox","click");
		
		jQuery.jqtab("#tabs2","#tab_conbox2","mouseenter");
		
	});




jQuery(function(){
	jQuery('#brand-waterfall').waterfall();
});


// 瀑布流插件
// pannysp 2013.4.9
;(function (jQuery) {
    jQuery.fn.waterfall = function(options) {
        var df = {
            item: '.item',
            margin: 15,
            addfooter: true
        };
        options = jQuery.extend(df, options);
        return this.each(function() {
            var jQuerybox = jQuery(this), pos = [],
            _box_width = jQuerybox.width(),
            jQueryitems = jQuerybox.find(options.item),
            _owidth = jQueryitems.eq(0).outerWidth() + options.margin,
            _oheight = jQueryitems.eq(0).outerHeight() + options.margin,
            _num = Math.floor(_box_width/_owidth);

            (function() {
                var i = 0;
                for (; i < _num; i++) {
                    pos.push([i*_owidth,0]);
                } 
            })();

            jQueryitems.each(function() {
                var _this = jQuery(this),
                _temp = 0,
                _height = _this.outerHeight() + options.margin;

                _this.hover(function() {
                    _this.addClass('hover');
                },function() {
                    _this.removeClass('hover');
                });

                for (var j = 0; j < _num; j++) {
                    if(pos[j][1] < pos[_temp][1]){
                        //暂存top值最小那列的index
                        _temp = j;
                    }
                }
                this.style.cssText = 'left:'+pos[_temp][0]+'px; top:'+pos[_temp][1]+'px;';
                //插入后，更新下该列的top值
                pos[_temp][1] = pos[_temp][1] + _height;
            });

            // 计算top值最大的赋给外围div
            (function() {
                var i = 0, tops = [];
                for (; i < _num; i++) {
                    tops.push(pos[i][1]);
                }
                tops.sort(function(a,b) {
                    return a-b;
                });
                jQuerybox.height(tops[_num-1]);

                //增加尾部填充div
                if(options.addfooter){
                    addfooter(tops[_num-1]);
                }

            })();

            function addfooter(max) {
                var addfooter = document.createElement('div');
                addfooter.className = 'item additem';
                for (var i = 0; i < _num; i++) {
                    if(max != pos[i][1]){
                        var clone = addfooter.cloneNode(),
                        _height = max - pos[i][1] - options.margin;
                        clone.style.cssText = 'left:'+pos[i][0]+'px; top:'+pos[i][1]+'px; height:'+_height+'px;';
                        jQuerybox[0].appendChild(clone);
                    }
                }
            }

        });
    }
})(jQuery); 