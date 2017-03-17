/**
 * Created by admin on 2016/9/8.
 */
function setcopyright2(){
    $("footer").html("<p>版权所有： "+ (new Date()).getFullYear() +" @天威飞马股份有限公司 ：（粤）-非经营性-2008-2007</p><p>粤ICP备ICP备xxxxx</p>");
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
function Tab3(a,b,c){
    $('.menuative').find('span').attr('class','span2');
    var aBtn = $(a).eq(b);
    var aDiv = $(c);
    aBtn.click(function(){
        $('.menuative').removeClass('active');
        aDiv.toggle();
        if (aBtn.hasClass('active')) {
            $(this).removeClass('active');
        }else{
           $(this).addClass('active');
        }
        if(aDiv.css('display')=='block'){
            $(this).find('span').attr('class','span1');
        }else {
            $(this).find('span').attr('class','span2');
        };
    })  
    aDiv.click(function() {
        $('.menuative').removeClass('active'); 
        aDiv.prev().addClass('active');
        $('.main_rt_menu2').removeClass('active');
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
        aBtn.css('background','#000');
      /*  $(this).addClass('active');*/
        $('.main_rt_menu2 ').removeClass('active');
    })
}
function OK(){
    var aBtn = $('.menu_2_0').eq(0);
    aBtn.click(function(){
        $('.src1').attr('src','customerlist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn1 = $('.menu_2_1').eq(0);
    aBtn1.click(function(){
        $('.src1').attr('src','iasklist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn2 = $('.menu_2_2').eq(0);
    aBtn2.click(function(){
        $('.src1').attr('src','productlist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn3 = $('.menu_2_2').eq(1);
    aBtn3.click(function(){
        $('.src1').attr('src','productlist.html?idtype=allwithlimit&typeid=0');
    });
    var aBtn4 = $('.menu_2_3').eq(0);
    aBtn4.click(function(){
        $('.src1').attr('src','userlist.html?idtype=allwithlimit&typeid=0');
    })
    var aBtn5 = $('.menu_2_3').eq(1);
    aBtn5.click(function(){
        $('.src1').attr('src','permissionlist.html?idtype=allwithlimit&typeid=0');
    })
}
