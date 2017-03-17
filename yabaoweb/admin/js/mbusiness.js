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
	$.post("../user/islogin.action",params,function(res) {
		if(res.result == "no"){
			  self.location = 'login.html';
		  }
	});
}

function setMenu(){
	var menuparams = {
			'type':'inner'  
		 }
	$.post("../admin/catalog.action",menuparams,function(res) {
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
						'<a href="javascript:void(0)" class="menu_bt">' + catalogs[i].name + '</a>'+
						'<ul class="menu_2">';
					for (j = 0; j < catalogs.length; j++) {
						if (catalogs[j].upperid == catalogs[i].id) {
							menucontent +=
								'<li  class="menu_2_' + i + '	"><a href="javascript:void(0)">' + catalogs[j].name + '</a></li>';
						}
					}
					menucontent += '</ul></li>';
				}
			}

			$("#nav").append(menucontent);
			Show();
			Active1('.menu_2','li');
			Tab('.menu_2_0','.show_1');
			Tab('.menu_2_1','.show_2');
			Tab('.menu_2_2','.show_3');
			$('.menu_2:first').css('display','block');
			$('.menu_2_0:first').addClass('active');
			$('.main_rt').find('.main_rt_menu li:eq(0)').addClass('active');

		}
	});						 		  
				
}
function notlogin(){
	setTimeout("location.href = 'login.html'",3000);
}
function logout(){
	nexturl = "login.html";
	$.post("../user/logout.action",null,function(res) {
			location.href = nexturl;
	},"json");
}
function setcopyright(){
	$("#copyrightid").html("power by 深圳市掌控移动软件有限公司");
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
	$.post("../user/getusername.action",params,function(res) {
		if(res.result == "no"){
			location.href = "login.html";
		}else{
			$("#setuser").html(res.username);
		}
	});
}


