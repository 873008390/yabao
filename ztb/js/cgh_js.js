/*通用函数*/
function checkMobile(id){ 
    var sMobile = $("#"+ id).val(); 
    if(!(/^1[34578]\d{9}$/.test(sMobile))){ 
        $("#mobile label:eq(1)").html("手机号无效，请调整，谢谢。");         
        return false; 
    }else{
    	return true;
    }
}


function validation(type,prompt) {
	if($(type).val() == '' || $(type).val() == null){
		$(prompt).css('display','inline-block'); 
	}else{
		$(prompt).css('display','none'); 
	}
}
function getYear() {
    var myDate = new Date();
   return myDate.getFullYear();
}
function setcopyright(){
    $("footer").html("<p>版权所有： "+ (new Date()).getFullYear() +" @亚宝药业集团股份有限公司 互联网药品信息服务资格证书：（晋）-非经营性-2008-2007</p><p>晋ICP备ICP备15001663</p>");
}

function clearFloat() {
    $(".tender_mian").addClass("clearfloat");
}

/*用户验证*/
$("#register").click(function() {
	checkMobile("phone");
});


$(function(){  
	clearFloat();
    /*底部函数运行*/
    setcopyright();
    /*表单验证*/
	$.extend($.validator.messages, {
	    required: "不能为空",
	    remote: "请修正该字段",
	    email: "请输入正确格式的电子邮件",
	    url: "请输入合法的网址",
	    date: "请输入合法的日期",
	    dateISO: "请输入合法的日期 (ISO).",
	    number: "请输入合法的数字",
	    digits: "只能输入整数",
	    creditcard: "请输入合法的信用卡号",
	    equalTo: "请再次输入相同的值",
	    accept: "请输入拥有合法后缀名的字符串",
	    maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
	    minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
	    rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
	    range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
	    max: $.validator.format("请输入一个最大为 {0} 的值"),
	    min: $.validator.format("请输入一个最小为 {0} 的值")
	});

     // 手机号码验证    
    jQuery.validator.addMethod("isMobile", function(value, element) {    
      var length = value.length;    
      return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(value));    
    }, "请正确填写您的手机号码。");

   // 电话号码验证    
    jQuery.validator.addMethod("isPhone", function(value, element) {    
      var tel = /^(\d{3,4}-?)?\d{7,9}$/g;    
      return this.optional(element) || (tel.test(value));    
    }, "请正确填写您的电话号码。");



    var validate = $("#myform").validate({
        debug: true, //调试模式取消submit的默认提交功能   
        //errorClass: "label.error", //默认为错误的样式类为：error   
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
        onkeyup: false,   
        submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form    
            //form.submit();   //提交表单   
        	register();
        },   
        
        rules:{

			phone : {
				required : true,
				minlength : 11,
				// 自定义方法：校验手机号在数据库中是否存在
				// checkPhoneExist : true,
				 isMobile : true
			},
			// code : {
			// 	digits : true,
			// 	required : true
			// },              	
            myname:{
				required : true,
			    rangelength:[6,10]
			   //  remote : {
			   //    url : "student_isExistName.action",
			   //    type : "get",
			   //    cache:false,
			   //    dataType : "json",
			   //    data : {
			   //     name: function() {
			   //      return $("#name").val();
				  //      }
				  // }
            },
            email:{
                required:true,
                email:true
            },
            password:{
                required:true,
                rangelength:[6,15]
            },
            confirm_password:{
                equalTo:"#password"
            },
            phone1:{
            	isPhone:true
            }
	                    
        },
        messages:{

			phone : {
				required : "请输入手机号",
				minlength : "手机号有误",
				isMobile : "请正确填写您的手机号码"
			},
            phone1:{
            	isPhone:"请正确填写您的电话号码"
            },					
            myname:{
			    required : "请填写用户名",
			    rangelength : "用户名必须在6-15个字符",                     
            },
            email:{
                required:"不能为空",
                email:"E-Mail格式不正确"
            },
            password:{
                required: "不能为空",
                rangelength: "密码必须在6-15个字符"
            },
            confirm_password:{
                equalTo:"两次密码输入不一致"
            }                                    
        }
                  
    });       
});

/*选项卡*/
/*
window.onload = function(){
           var oParent = document.getElementById('tender_tab');
            var aBtn = oParent.getElementsByTagName('a');
           var aDiv = oParent.getElementsByTagName('ul');

            for(var i=0;i<aBtn.length;i++){         //遍历div1中的按钮
              
              aBtn[i].index=i;          //给aBth[]添加自定义属性
              aBtn[i].onclick=function (){
                
                for(var i=0;i<aBtn.length;i++){ //遍历按钮，将class清除
                  aBtn[i].className='';
                  aDiv[i].style.display='none';
                }
                this.className='active';
                aDiv[this.index].style.display='block';
              }
            }
          }*/
// $(function(){
//     var isShow=false;

//     $(".mainnav_li1").mouseover(function(){
//         $(".subnav").hide(); 
//         $(".subnav1").show();
//     });
//     $(".subnav1").mouseover(function(){
//         isShow=true;   
//         $(this).show(); 
//     });
//     $(".subnav1").mouseout(function(){
//         if(isShow)
//         {
//             $(this).hide(); 
//             isShow=false;
//         }   
//     });
//   $(".subnav").hide(); 
// });
$(function(){
	function getcatalog(){
		var content = "";
		var param ={
				'type': "allcheckedsupplier_1"
		};
		$.post("admin/catalog.action",param,function(res){
			var catalogs = res.catalogs;
			if(catalogs[0].id == 0){
				content += "<div class='options1'><input type='checkbox' value='0'  name='options'>"+ catalogs[0].name+"</div>";
			}else{
				var len = catalogs.length;
				for (var i = 0; i < len; i++) {
					if(catalogs[i].status == 10){
						content += "<div class='options"+ (i+1) +"'><input type='checkbox' id='c"+ catalogs[i].id+"' value='"+ catalogs[i].id+"'  name='options' checked='checked'>&nbsp;&nbsp;"+ catalogs[0].name+"</div>";
					}else{
						content += "<div class='options"+ (i+1) +"'><input type='checkbox' id='c"+ catalogs[i].id+"' value='"+ catalogs[i].id+"'  name='options'>&nbsp;&nbsp;"+ catalogs[0].name+"</div>";
					}
				}
			}
			$("#myform2").html(content);
		});
		
	}
	getcatalog();
	
    function sNav(a,b) {
        var isShow=false;
        $(a).mouseover(function(){
            // $(".subnav").hide(); 
            $(b).show();
        });
        $(a).mouseout(function(){
            $(b).hide(); 
        });        
        $(b).mouseover(function(){
            isShow=true;   
            $(this).show(); 
        });
        $(b).mouseout(function(){
            if(isShow)
            {
                $(this).hide(); 
                isShow=false;
            }   
        }); 
     // $(".subnav").hide();  
    }
    sNav(".mainnav_a1",".subnav1");
    // sNav(".mainnav_a2",".subnav2");
    sNav(".mainnav_a3",".subnav3");
    // sNav(".mainnav_a4",".subnav4");
    sNav(".mainnav_a5",".subnav5");
    sNav(".mainnav_a6",".subnav6");    
});
function gradeChange(a){
        var objS = document.getElementById(a);
        var grade = objS.options[objS.selectedIndex].value;
        if (grade==0) {
                $('#name').parent().css("display","none");
                $('#companycode').parent().css("display","none");
                $('#fax').parent().css("display","none");
                $('#name').parent().css("display","none");
                $('#taxtype').html("<option value ='个人代开'>个人代开</option>");
                $('#invoicetype').html("<option value ='普通发票'>普通发票</option>");

        } else if(grade==1){
                $('#name').parent().css("display","block");
                $('#companycode').parent() .css("display","block");
                $('#fax').parent().css("display","block");
                $('#name').parent().css("display","block");
                $('#taxtype').html("<option value ='增值税专用发票'>增值税专用发票</option><option value ='增值税普通发票'>增值税普通发票</option>");
                $('#invoicetype').html("<option value ='小规模纳税人'>小规模纳税人</option><option value ='一般纳税人'>一般纳税人</option>");
        }
}
function gradeChange2(){
    if ($('#iscompany option').val()==0) {
                $('#name').parent().css("display","none");
                $('#companycode').parent().css("display","none");
                $('#fax').parent().css("display","none");
                $('#name').parent().css("display","none");
                $('#taxtype').html("<option value ='个人代开'>个人代开</option>");
                $('#invoicetype').html("<option value ='普通发票'>普通发票</option>");
    }else if ($('#iscompany option').val()==1) {
                $('#name').parent().css("display","block");
                $('#companycode').parent() .css("display","block");
                $('#fax').parent().css("display","block");
                $('#name').parent().css("display","block");
                $('#taxtype').html("<option value ='增值税专用发票'>增值税专用发票</option><option value ='增值税普通发票'>增值税普通发票</option>");
                $('#invoicetype').html("<option value ='小规模纳税人'>小规模纳税人</option><option value ='一般纳税人'>一般纳税人</option>");
    }
}