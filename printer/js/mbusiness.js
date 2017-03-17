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

function setMenu(){
	var menuparams = {
			'type':'inner'  
		 }
	$.post("admin/catalog.action",menuparams,function(res) {
		var contentStr = "";
		var catalogs = res.catalogs;
		var typeid = 0;
		var url = "";
		var cls = "";
		if(catalogs[0].id == 0)
		{ 
			contentStr = "您已退出或超时自动退出，请重新登录。";
		}else{	
			for(i=0;i<catalogs.length;i++){
				if(catalogs[i].upperid == 0){
					contentStr += 	"<div class='main' id='"+ catalogs[i].shortname +"' onClick=\"document.all."+ catalogs[i].shortname +"child.style.display=(document.all."+ catalogs[i].shortname +"child.style.display =='none')?'':'none'\" ><a>"+ catalogs[i].name +"</a></div>"+
									"<div class='child' id='"+ catalogs[i].shortname +"child' style='display:none'>"+
									"<ul>";
					for(j=0;j<catalogs.length;j++){
						cls = catalogs[j].shortname;
						url = catalogs[j].shortname +"list.html";
						if(catalogs[j].url.indexOf("agent")>-1){
							typeid = 1;
							url = "agentlist.html";
							cls = "agent";
						}else if(catalogs[j].url.indexOf("doctor")>-1){
							typeid = 2;
							url = "doctorlist.html";
							cls = "doctor";
						}else if(catalogs[j].url.indexOf("drugstore")>-1){
							typeid = 3;
							url = "drugstorelist.html";
							cls = "drugstore";
						}else if(catalogs[j].url.indexOf("patient")>-1){
							typeid = 4;
							url = "patientlist.html";
							cls = "patient";
						}else if(catalogs[j].url.indexOf("hospital")>-1){
							typeid = 5;
							url = "hospitallist.html";
							cls = "hospital";
						}else if(catalogs[j].url.indexOf("sharer")>-1){
							typeid = 6;
							url = "sharerlist.html";
							cls = "sharer";
						}
						if(catalogs[j].upperid == catalogs[i].id){
							contentStr += 	"<a onclick=\"d1('"+ catalogs[j].name +"','"+ url +"?idtype=allwithlimit&typeid="+ typeid +"','"+ cls +"'),appendFb('"+ catalogs[j].name +"','"+ url +"?idtype=allwithlimit&typeid="+ typeid +"','"+ cls +"')\"><li class='icon-"+ cls +"list'>"+ catalogs[j].name +"</li></a>";
						}
					}
					contentStr += "</ul></div>";
				}
			}
		}
		//alert(contentStr);
		$("#nav").html(contentStr);
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
								'<li  class="menu_2_' + i + ' menuative"><a href="javascript:void(0)">' + catalogs[j].name + '<span></span>'+'</a></li>';
						}
					}
					menucontent += '</ul></li>';
				}
			}
			$("#nav").append(menucontent);			
			var menucontent2 = '<ul class="main_rt_menu menu_3_1">'+
							'    <li class="main_rt_menu2"><a href="supplieradd.html" target="main">新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="supplierlist.html?idtype=allwithlimit&typeid=0" target="main">列表</a></li>'+
							'    <li class="main_rt_menu2"><a href="auditlist.html?idtype=allwithlimit&typeid=0" target="main">审核</a></li>'+
							'</ul> 	';
			 var menucontent3 =	'<ul class="main_rt_menu menu_3_2">'+
							'    <li class="main_rt_menu2"><a href="purchaselist.html?idtype=allwithlimit&typeid=0" target="main">新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="purchaselist.html?idtype=allwithlimit&typeid=0" target="main">列表</a></li>'+
							'</ul>';
			 var menucontent4 =	'<ul class="main_rt_menu menu_3_3">'+
							'    <li class="main_rt_menu2"><a href="orglist.html?idtype=allwithlimit&typeid=0" target="main">新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="orglist.html?idtype=allwithlimit&typeid=0" target="main">列表</a></li>'+
							'</ul>';
			 var menucontent5 =	'<ul class="main_rt_menu menu_3_4">'+
							'    <li class="main_rt_menu2"><a href="departmentlist.html?idtype=allwithlimit&typeid=0" target="main">新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="departmentlist.html?idtype=allwithlimit&typeid=0" target="main">列表</a></li>'+
							'</ul>';	
			 var menucontent6 =	'<ul class="main_rt_menu menu_3_5">'+
							'    <li class="main_rt_menu2"><a href="productlist.html?idtype=allwithlimit&typeid=0" target="main">新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="productlist.html?idtype=allwithlimit&typeid=0" target="main">列表</a></li>'+
							'</ul>';	
			 var menucontent7 =	'<ul class="main_rt_menu menu_3_6">'+
							'    <li class="main_rt_menu2"><a href="arealist.html?idtype=allwithlimit&typeid=0" target="main">新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="arealist.html?idtype=allwithlimit&typeid=0" target="main">列表</a></li>'+
							'</ul>';
			 var menucontent8 =	'<ul class="main_rt_menu menu_3_7">'+
							'    <li class="main_rt_menu2"><a href="userlist.html?idtype=allwithlimit&typeid=0" target="main">新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="userlist.html?idtype=allwithlimit&typeid=0" target="main">列表</a></li>'+
							'</ul>';		
			 var menucontent9 =	'<ul class="main_rt_menu menu_3_8">'+
							'    <li class="main_rt_menu2"><a href="auditgrouplist.html?idtype=allwithlimit&typeid=0" target="main">新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="auditgrouplist.html?idtype=allwithlimit&typeid=0" target="main">列表</a></li>'+
							'</ul>';	
			 var menucontent10 =	'<ul class="main_rt_menu menu_3_9">'+
							'    <li class="main_rt_menu2"><a href="permissionlist.html?idtype=allwithlimit&typeid=0" target="main">新增</a></li>'+
							'    <li class="main_rt_menu2"><a href="permissionlist.html?idtype=allwithlimit&typeid=0" target="main">列表</a></li>'+
							'</ul>';																																$('.img0').attr('src','images/user2.png');
			$('.img1').attr('src','images/purchase.png');
			$('.img2').attr('src','images/data.png');
			$('.img3').attr('src','images/system.png');
			$('.menu_2_0').eq(0).after(menucontent2);
			$('.menu_2_1').eq(0).after(menucontent3);
			$('.menu_2_2').eq(0).after(menucontent4);
			$('.menu_2_2').eq(1).after(menucontent5);
			$('.menu_2_2').eq(2).after(menucontent6);
			$('.menu_2_2').eq(3).after(menucontent7);
			$('.menu_2_3').eq(0).after(menucontent8);
			$('.menu_2_3').eq(1).after(menucontent9);
			$('.menu_2_3').eq(2).after(menucontent10);
			$('.menu_3_1').css('display','block');
			Tab3('.menu_2_0',0,'.menu_3_1','供应商');
			Tab3('.menu_2_1',0,'.menu_3_2','采购管理');
			Tab3('.menu_2_2',0,'.menu_3_3','基础资料');
			Tab3('.menu_2_2',1,'.menu_3_4','基础资料');
			Tab3('.menu_2_2',2,'.menu_3_5','基础资料');
			Tab3('.menu_2_2',3,'.menu_3_6','基础资料');
			Tab3('.menu_2_3',0,'.menu_3_7','系统管理');
			Tab3('.menu_2_3',1,'.menu_3_8','系统管理');
			Tab3('.menu_2_3',2,'.menu_3_9','系统管理');
			Show();	
			$('.menu_2:first').css('display','block');
			$('.menu_2_0:first').addClass('active');
			$('.menu_2_0:first').find('span').attr('class','span1');
			$('.main_rt').find('.main_rt_menu li:eq(1)').addClass('active');
			OK();

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
	}
	$.post("user/getusername.action",params,function(res) {
		if(res.result == "no"){
			location.href = "login.html";
		}else{
			$("#setuser").html(res.username);
		}
	});
}


