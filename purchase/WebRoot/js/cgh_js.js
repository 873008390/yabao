/**
 * Created by admin on 2016/9/8.
 */
function setcopyright2(){
    $("footer").html("<p>版权所有： "+ (new Date()).getFullYear() +" @亚宝药业集团股份有限公司v1.0 &nbsp;<a href='./images/shiyong.pdf'>使用说明</a></p>");
}
function Show(){
    $('.menu_1 ').find('.menu_bt').on('click',function(){
        $(this).parent().find('ul').toggle();

    })
}
function Tab(a,b){
    var aBtn = $(a);
    var aDiv = $('#main').find(b);
    aBtn.click(function(){
        $('.main_rt').css('display', 'none');
        aDiv.eq($(this).index()).css('display', 'block');
    })
}
function Tab2(a,b){
    var aBtn = $(a);
    var aDiv = $('#main').find(b);
    aBtn.click(function(){
        $('.main_rt').css('display', 'none');
        aDiv.eq($(this).index()/2).css('display', 'block');
    })
}
function Tab3(a,b,c,d){
    $('.menuative').find('span').attr('class','span2');
    var aBtn = $(a).eq(b);
    var aDiv = $(c);
    aBtn.click(function(){
        $('.menuative').removeClass('active');
        $('.menu_2').removeClass('active3');
        $('.main_rt_menu2').find('a').css('color','#545656');
        $(this).next().find('.main_rt_menu2').eq(1).find('a').css('color','#4CB643');
        aDiv.toggle();
        if (aBtn.hasClass('active')) {
            $(this).removeClass('active');
        }else{
           $(this).addClass('active');
            $(this).parent().addClass('active3');
        }
        if(aDiv.css('display')=='block'){
            $(this).find('span').attr('class','span1');

        }else {
            $(this).find('span').attr('class','span2');
        };
    })
    aDiv.click(function() {
        $('.menu_2').removeClass('active3');
        $('.menuative').removeClass('active'); 
        aDiv.prev().addClass('active');
        $(this).parent().addClass('active3');
        $('#miantitle').html(d);      
    })   
}
function settitle(a,b) {
        $(a).click(function () {

            $('#miantitle').html(b);
        })
}
function setUsername(){
    var params ={
        'idtype': 'name'
    }
    $.post("user/getusername.action",params,function(res) {
        if(res.result == "no"){
            location.href = "login.html";
        }else{
            $("#setuser").html(res.username);
        }
    });
}
function Active1(a,b){
    var aBtn = $(a).find(b);
    aBtn.click(function(){
        alert(1)
        aBtn.css('background','#b3b3b3');
      /*  $(this).addClass('active');*/
        $('.main_rt_menu2 ').removeClass('active');
    })
}
function OK(){
    var aBtn = $('.menu_2_0').eq(0);
    aBtn.click(function(){
        $('#miantitle').html('供应商');
        //$('.src1').attr('src','supplierlist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn1 = $('.menu_2_1').eq(0);
    aBtn1.click(function(){
        $('#miantitle').html('采购管理');
        //$('.src1').attr('src','purchaselist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn2 = $('.menu_2_2').eq(0);
    aBtn2.click(function(){
        $('#miantitle').html('基础资料');
        //$('.src1').attr('src','orglist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn3 = $('.menu_2_2').eq(1);
    aBtn3.click(function(){
        $('#miantitle').html('基础资料');
        //$('.src1').attr('src','departmentlist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn4 = $('.menu_2_2').eq(2);
    aBtn4.click(function(){
        $('#miantitle').html('基础资料');
        //$('.src1').attr('src','arealist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn5 = $('.menu_2_2').eq(3);
    aBtn5.click(function(){
        $('#miantitle').html('基础资料');
        //$('.src1').attr('src','productlist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn6 = $('.menu_2_3').eq(0);
    aBtn6.click(function(){
        $('#miantitle').html('系统管理');
        //$('.src1').attr('src','userlist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn7 = $('.menu_2_3').eq(1);
    aBtn7.click(function(){
        $('#miantitle').html('系统管理');
        //$('.src1').attr('src','auditgrouporglist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn8 = $('.menu_2_3').eq(2);
    aBtn8.click(function(){
        $('#miantitle').html('系统管理');
        //$('.src1').attr('src','permissionuserlist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn9 = $('.menu_2_2').eq(4);
    aBtn9.click(function(){
        $('#miantitle').html('基础资料');
        //$('.src1').attr('src','productlist.html?idtype=allwithlimit&typeid=0');
    });    
    var aBtn10 = $('.menu_2_2').eq(5);
    aBtn10.click(function(){
        $('#miantitle').html('基础资料');
        //$('.src1').attr('src','productlist.html?idtype=allwithlimit&typeid=0');
    });    
    var aBtn11 = $('.menu_2_2').eq(6);
    aBtn11.click(function(){
        $('#miantitle').html('基础资料');
        //$('.src1').attr('src','productlist.html?idtype=allwithlimit&typeid=0');
    });    
}
	function textSeach(){			
 		if($("#product").val() != ""){
 			var display =$('.textseach1').css('display');
 			if(display == 'none'){
 				$('.textseach1').show();
 			}
 			var val = encodeURIComponent(encodeURIComponent($("#product").val()));
 			//$("#iframe3").attr('src',"productlist-main2.html?idtype=search&typeid="+ val);
 			window.frames["iframe3"].reloadstore(val);
 		}
	}
	function textSeach2(){			
 		if($("#supplier").val() != ""){
 			var display =$('.textseach2').css('display');
 			if(display == 'none'){
 				$('.textseach2').show();
 			}
 			var val = encodeURIComponent($("#product").val()) + "_" + encodeURIComponent(encodeURIComponent($("#supplier").val()));
// 			$("#iframe4").attr('src',"supplierlist-main2.html?idtype=searchbyproduct&typeid="+ val);
 			window.frames["iframe4"].reloadstore(val);
 		}
	}	
	function textSeach3(){			
 		if($("#supplier").val() != ""){
 			var display =$('.textseach3').css('display');
 			if(display == 'none'){
 				$('.textseach3').show();
 			}
 			var val =  encodeURIComponent(encodeURIComponent($("#supplier").val()));
 			//$("#iframe4").attr('src',"supplierlist-main2.html?idtype=search&typeid="+ val);
 			window.frames["iframe4"].reloadstore(val);
 		}
	}	
	function textShuru(){
		$('.textseach2').hide();
		if($("#product").val() != ""){
			$('.textseach1').show();
		}
	}
	function textShuru2(){
		$('.textseach1').hide();
		if($("#product").val() != ""){
			if($("#supplier").val() != ""){
				$('.textseach2').show();
				$('.textseach3').show();
			}			
		}else{
			alert("请先选择物料");
			$("#product").focus();
		}
	}