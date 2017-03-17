function setCookie(name,value)
{
	var Days = 30;
	var exp = new Date(); 
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/ztb";
}
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)) return unescape(arr[2]);
	else return "";
}
function islogin(){
	var params ={
			'idtype': 'no'
	}
	$.post("user/islogin.action",params,function(res) {
		if(res.result == "no"){
			  self.location = 'login.html';
		  }
	});
}

function GetMenu(){
	var menuparams = {
						'type':'inner'  
					 }
	$.post("admin/catalog.action",menuparams,function(res) {
		var catalogs = res.catalogs;
		var menucontent = "";
		if(catalogs[0].id == 0)
		{ 
			notlogin();
		}else{	
			for(i=0;i<catalogs.length;i++) {
				if (catalogs[i].upperid == 0) {
					menucontent += '<li class="menu_1">' +
						'<a href="javascript:void(0)" class="menu_bt">'+'<img class="img' + i + '">' + catalogs[i].name + '</a>'+
						'<ul class="menu_2">';
					for (j = 0; j < catalogs.length; j++) {
						if (catalogs[j].upperid == catalogs[i].id) {
							menucontent +=
								'<li  class="menu_2_' + i + ' menuative"><a href="'+catalogs[j].url+'" target="main">' + catalogs

[j].name + '<span></span>'+'</a></li>';
						}
					}
					menucontent += '</ul></li>';
				}
			}
			$("#nav").append(menucontent);			
			/*var menucontent2 = '<ul class="main_rt_menu menu_3_1">'+
							'    <li class="main_rt_menu2"><a href="supplieradd.html" target="main">供应商新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="supplierlist.html?idtype=allwithlimit&typeid=0" target="main">供应商列

表</a></li>'+
							'    <li class="main_rt_menu2"><a href="auditlist.html?idtype=allwithlimit&typeid=0" target="main">供应商审核

</a></li>'+
							'</ul> 	';
			 var menucontent3 =	'<ul class="main_rt_menu menu_3_2">'+
							'    <li class="main_rt_menu2"><a href="purchaseadd.html?idtype=allwithlimit&typeid=0" target="main">采购单新

增</a></li>'+
							'    <li class="main_rt_menu2"><a href="purchaselist.html?idtype=allwithlimit&typeid=0" target="main">采购单列

表</a></li>'+
							'</ul>';
			 var menucontent4 =	'<ul class="main_rt_menu menu_3_3">'+
							'    <li class="main_rt_menu2"><a href="orglist.html?idtype=allwithlimit&typeid=0" target="main">机构新增

</a></li>'+
							'    <li class="main_rt_menu2"><a href="orglist.html?idtype=allwithlimit&typeid=0" target="main">机构列表

</a></li>'+
							'</ul>';
			 var menucontent5 =	'<ul class="main_rt_menu menu_3_4">'+
							'    <li class="main_rt_menu2"><a href="departmentadd.html?idtype=allwithlimit&typeid=0" target="main">部门新

增</a></li>'+
							'    <li class="main_rt_menu2"><a href="departmentlist.html?idtype=allwithlimit&typeid=0" target="main">部门列

表</a></li>'+
							'</ul>';
			 var menucontent6 =	'<ul class="main_rt_menu menu_3_5">'+
							'    <li class="main_rt_menu2"><a href="arealist.html?idtype=allwithlimit&typeid=0" target="main">地区新增

</a></li>'+
							'    <li class="main_rt_menu2"><a href="arealist.html?idtype=allwithlimit&typeid=0" target="main">地区列表

</a></li>'+
							'</ul>';								
			 var menucontent7 =	'<ul class="main_rt_menu menu_3_6">'+
							'    <li class="main_rt_menu2"><a href="productunitlist.html?idtype=allwithlimit&typeid=0" target="main">单位

新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="productunitlist.html?idtype=allwithlimit&typeid=0" target="main">单位

列表</a></li>'+
							'</ul>';	
			 var menucontent8 =	'<ul class="main_rt_menu menu_3_7">'+
							'    <li class="main_rt_menu2"><a href="userlist.html?idtype=allwithlimit&typeid=0" target="main">用户新增

</a></li>'+
							'    <li class="main_rt_menu2"><a href="userlist.html?idtype=allwithlimit&typeid=0" target="main">用户列表

</a></li>'+
							'</ul>';		
			 var menucontent9 =	'<ul class="main_rt_menu menu_3_8">'+
							'    <li class="main_rt_menu2"><a href="auditgrouporglist.html?idtype=allwithlimit&typeid=0" target="main">审

核组新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="auditgrouporglist.html?idtype=allwithlimit&typeid=0" target="main">审

核组列表</a></li>'+
							'</ul>';	
			 var menucontent10 =	'<ul class="main_rt_menu menu_3_9">'+
							'    <li class="main_rt_menu2"><a href="permissionuserlist.html?idtype=allwithlimit&typeid=0" target="main">权

限列表</a></li>'+
							'    <li class="main_rt_menu2"><a href="permissionslist.html?idtype=allwithlimit&typeid=0" target="main">权限

库</a></li>'+
							'</ul>';
			 var menucontent11 =	'<ul class="main_rt_menu menu_3_10">'+
							'    <li class="main_rt_menu2"><a href="productspeclist.html?idtype=allwithlimit&typeid=0" target="main">规格

新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="productspeclist.html?idtype=allwithlimit&typeid=0" target="main">规格

列表</a></li>'+
							'</ul>';
			 var menucontent12 =	'<ul class="main_rt_menu menu_3_11">'+
							'    <li class="main_rt_menu2"><a href="producttypelist.html?idtype=allwithlimit&typeid=0" target="main">类型

新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="producttypelist.html?idtype=allwithlimit&typeid=0" target="main">类型

列表</a></li>'+
							'</ul>';							
			 var menucontent13 =	'<ul class="main_rt_menu menu_3_12">'+
							'    <li class="main_rt_menu2"><a href="productlist.html?idtype=allwithlimit&typeid=0" target="main">物料新增

</a></li>'+
							'    <li class="main_rt_menu2"><a href="productlist.html?idtype=allwithlimit&typeid=0" target="main">物料列表

</a></li>'+
							'</ul>';							*/

			$('.img0').attr('src','images/user2.png');
			$('.img1').attr('src','images/purchase.png');
			$('.img2').attr('src','images/data.png');
			$('.img3').attr('src','images/system.png');
			$('.menu_1').eq(0).before('<li class="menu_1">' +'<a href="home.html"  target="main" class="menu_bt menu_bt1">'+'<img src = "images/shouye.png">' + "首页" + '</a>'+'</li>');
			$('.menu_3_1').css('display','block');
			Tab3('.menu_2_0',0,'.menu_3_1','供应商');
			Tab3('.menu_2_0',1,'.menu_3_1','供应商');
			Tab3('.menu_2_0',2,'.menu_3_1','供应商');
			Tab3('.menu_2_1',0,'.menu_3_2','采购管理');
			Tab3('.menu_2_1',1,'.menu_3_2','采购管理');
			Tab3('.menu_2_2',0,'.menu_3_3','基础资料');
			Tab3('.menu_2_2',1,'.menu_3_4','基础资料');
			Tab3('.menu_2_2',2,'.menu_3_5','基础资料');
			Tab3('.menu_2_2',3,'.menu_3_6','基础资料');
			Tab3('.menu_2_3',0,'.menu_3_7','系统管理');
			Tab3('.menu_2_3',1,'.menu_3_8','系统管理');
			Tab3('.menu_2_3',2,'.menu_3_9','系统管理');
			Tab3('.menu_2_3',3,'.menu_3_13','系统管理');
			Tab3('.menu_2_2',4,'.menu_3_10','基础资料');
			Tab3('.menu_2_2',5,'.menu_3_11','基础资料');
			Tab3('.menu_2_2',6,'.menu_3_12','基础资料');
			Show();	
			$('.menu_2:first').css('display','block').addClass('active3');
			$('.menu_2_0:first').find('span').attr('class','span1');
			$('.main_rt').find('.main_rt_menu li:eq(1)').addClass('active');
			OK();
			menuTab();
			$('.newsupplier2_top_2').addClass('clearfix');
			Tab4('.menu_3_1');
			Tab4('.menu_3_2');
			Tab4('.menu_3_3');
			Tab4('.menu_3_4');
			Tab4('.menu_3_5');
			Tab4('.menu_3_6');
			Tab4('.menu_3_7');
			Tab4('.menu_3_8');
			Tab4('.menu_3_9'); 
			Tab4('.menu_3_10'); 
			Tab4('.menu_3_11'); 
			Tab4('.menu_3_12'); 
		}
	});						 		  
				
}
function notlogin(){
	setTimeout("location.href = 'login.html'",3000);
}
function logout(){
	nexturl = "login.html";
	$.post("user/logout.action",null,function(res) {
			location.href = nexturl;
	},"json");
}

function setcopyright(){
	$("#copyrightid").html("Power by ZK Mobile Soft");
}
function Tab4(a){
	var oBtn = $(a).find('.main_rt_menu2');
	oBtn.eq(1).find('a').css('color','#4CB643');
	oBtn.click(function(){
		$('.main_rt_menu2').find('a').css('color','#545656');
		$(this).find('a').css('color','#4CB643');
	})
}
function getParameter(param)
{
    var query = window.location.search;  
    var iLen = param.length;  
    var iStart = query.indexOf("?"+ param +"=");  
    if (iStart == -1)  {
    	iStart = query.indexOf("&"+ param +"="); 
    	if (iStart == -1)  {
    		return "";  
    	}
    }
    iStart += iLen+2;  
    var iEnd = query.indexOf("&", iStart);  
    if (iEnd == -1)  
       return query.substring(iStart);  
    return query.substring(iStart, iEnd);  
}

function setUsername(){
	var params ={
			'idtype': 'name'
	};
	$.post("user/getusername.action",params,function(res) {
		if(res.result == "no"){
			location.href = "login.html";
		}else{
			var tip = "";
			var today = new Date();
			var t = today.getHours();
			if(t>=6 && t<8){
				tip += "早上好，";
			}else if(t>=8 && t<12){
				tip += "上午好，";
			}else if(t>=12 && t<14){
				tip += "中午好，";
			}else if(t>=14 && t<18){
				tip += "下午好，";
			}else if(t>=18 && t<23){
				tip += "晚上好，";
			}else if(t>=23 || t<6){
				tip += "晚上好，";
			}
			$("#setuser").html('<strong>'+tip+'</strong>' + '<a class="fo">'+res.username+'</a>');
		}
	});
}
function menuTab(){
    $('.menu_1').first('a').click(function () {
        $('.menuative').removeClass('active');
    })
}

