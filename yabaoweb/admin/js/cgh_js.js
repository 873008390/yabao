/**
 * Created by admin on 2016/9/8.
 */
function setcopyright2(){
    $("footer").html("<p>版权所有： "+ (new Date()).getFullYear() +" @亚宝药业集团股份有限公司 互联网药品信息服务资格证书：（晋）-非经营性-2008-2007</p><p>晋ICP备ICP备15001663</p>");
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
        aBtn.removeClass('active');
        $(this).addClass('active');
        /*$('.main_rt_menu2 ').removeClass('active');*/
        $('.main_rt').find('.main_rt_menu li:eq(1)').addClass('active');
    })
}
function OK(){
    var aBtn = $('.menu_2_0').eq(0);
    aBtn.click(function(){
        $('.src1').attr('src','cataloglist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn1 = $('.menu_2_0').eq(1);
    aBtn1.click(function(){
        $('.src2').attr('src','contactuslist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn2 = $('.menu_2_0').eq(2);
    aBtn2.click(function(){
        $('.src3').attr('src','zhaopinadd.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn3 = $('.menu_2_0').eq(3);
    aBtn3.click(function(){
        $('.src4').attr('src','indexphotolist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn4 = $('.menu_2_0').eq(4);
    aBtn4.click(function(){
        $('.src5').attr('src','legaladd.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn5 = $('.menu_2_0').eq(5);
    aBtn5.click(function(){
        $('.src6').attr('src','youqinglianjielist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn6 = $('.menu_2_1').eq(0);
    aBtn6.click(function(){
        $('.src7').attr('src','userlist.html?idtype=allwithlimit&typeid=0');
    })
    var aBtn7 = $('.menu_2_1').eq(1);
    aBtn7.click(function(){
        $('.src8').attr('src','permissionlist.html?idtype=allwithlimit&typeid=0');
    })
}
