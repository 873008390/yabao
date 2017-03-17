$(document).ready(function(){
	$("#registerurl").click(function(){
		self.location = "register.html";
	});
	$("#loginsubmit").click(function(){
		login();
	});
	setmenu();
});

function rep(str){
	var res = str;
	res=res.replace(/<\/?.+?>/g,"");
	return res; 
}

//写cookies
function setCookie(name,value)
{
var Days = 30;
var exp = new Date(); 
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//读取cookies
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}

function getParameter(param)  
{  
    var query = window.location.search;  
    var iLen = param.length;  
    var iStart = query.indexOf(param);  
    if (iStart == -1)  
       return "";  
    iStart += iLen + 1;  
    var iEnd = query.indexOf("&", iStart);  
    if (iEnd == -1)  
       return query.substring(iStart);  
    return query.substring(iStart, iEnd);  
}

function register(){
	var param ={
		'user.account': $("#phone").val(),
		'user.password': hex_md5($("#password").val()),
		'user.phoneno': $("#phone").val(),
		'user.email':$("#email").val(),
		'user.zdy2': "",
		'user.type': 1
	};
	$.post("user/register.action",param,function(res){
		if(res.flag == 1){
			self.location = "information.html";
		}else if(res.flag == 2){
			alert(res.result);
			self.location = "entry.html";
		}else{
			alert(res.result);
		}
	});
}

function registercomplete(catalogids){
	var param ={
		'user.name':$("#contacts").val(),
		'user.zdy1': $("#name").val(),
		'user.zdy2': $("#address").val(),
		'user.zdy3': $("#bank").val(),
		'user.zdy4': $("#tel").val(),
		'user.zdy5': $("#bankname").val(),
		'user.zdy6': $("#bankaccount").val(),
		'user.zdy7': $("#invoicetype").val(),
		'user.zdy8': $("#taxtype").val(),
		'user.zdy9': $("#taxrate").val(),
		'user.zdy10': $("#fax").val() +"_"+ $("#companycode").val() +"_"+ $("#iscompany").val() +"_"+ catalogids
	};
	$.post("user/modify.action",param,function(res){
		if(res.success){
			self.location = "index.html";
		}else{
			alert(res.result);
		}
	});
}

function logout(){
	$.post("user/logout.action","",function(res){
		self.location = "index.html";
	});
}

function islogin(){
	//alert("ok");
	var name;
	if(getCookie("username") != null && getCookie("username") != ''){
		name = getCookie("username");
	}
	var params = {
 	  		'idtype':'autologin' ,
			'typeid':'1_'+ name    						
	}
	$.post("user/islogin.action",params,function(res) {
		if(res.result == "no"){
			self.location = 'entry.html';
		}else{
			$.post("user/getuserinfo.action","",function(res){
				//alert(res.result);
				if(res.result == "yes"){
					var content = "<form><p style='margin-top:10px;'>公司："+ res.userinfo.name +"</p>"+
								  "<p style='margin-top:10px;'>账号："+ res.userinfo.phoneno +"</p>"+
								  "<p style='margin-top:5px;'><a href='infomodify.html' class='forgetpassword'>修改资料</a>&nbsp;&nbsp;&nbsp;&nbsp;"+	
								  "<a onclick='logout()' class='forgetpassword' style='cursor:pointer;'>退出</a>"+					
								  "</p></form>";
					$("#loginform").html(content);
				}
			});			
		}
	},"json");
}
function autologin(){
	//alert("ok");
	var name;
	if(getCookie("username") != null && getCookie("username") != ''){
		name = getCookie("username");
	}
	var params = {
 	  		'idtype':'autologin' ,
			'typeid':'1_'+ name    						
	}
	$.post("user/islogin.action",params,function(res) {
		if(res.result == "no"){
			//self.location = 'entry.html';
		}else if(res.result == "discomplete"){
			self.location = 'infomodify.html';
		}else{
			$.post("user/getuserinfo.action","",function(res){
				//alert(res.result);
				if(res.result == "yes"){
					var content = "<form><p style='margin-top:10px;'>公司："+ res.userinfo.name +"</p>"+
								  "<p style='margin-top:10px;'>账号："+ res.userinfo.phoneno +"</p>"+
								  "<p style='margin-top:5px;'><a href='infomodify.html' class='forgetpassword'>修改资料</a>&nbsp;&nbsp;&nbsp;&nbsp;"+	
								  "<a onclick='logout()' class='forgetpassword' style='cursor:pointer;'>退出</a>"+					
								  "</p></form>";
					$("#loginform").html(content);
				}
			});			
		}
	},"json");
}
function getuserinfo(){
	//alert("ok");
	var name;
	if(getCookie("username") != null && getCookie("username") != ''){
		name = getCookie("username");
	}
	var params = {
 	  		'idtype':'autologin' ,
			'typeid':'1_'+ name    						
	}
	$.post("user/getuserinfo.action","",function(res){
		//alert(res.result);
		if(res.result == "yes"){
			var user = res.userinfo;
			$("#email").val(user.email);
			$("#name").val(user.zdy1);
			$("#address").val(user.zdy2);
			$("#contacts").val(user.name);
			$("#tel").val(user.zdy4);
			$("#bank").val(user.zdy3);
			$("#bankname").val(user.zdy5);
			$("#bankaccount").val(user.zdy6);
			$("#invoicetype").val(user.zdy7);
			$("#taxtype").val(user.zdy8);
			$("#taxrate").val(user.zdy9);
			if(user.zdy10.split("_")[0] != null){
				$("#fax").val(user.zdy10.split("_")[0]);
			}
			if(user.zdy10.split("_")[1] != null){
				$("#companycode").val(user.zdy10.split("_")[1]);
			}
			if(user.zdy10.split("_")[2] != null){
				$("#iscompany").val(user.zdy10.split("_")[2]);
			}
		}
	});
}

function login(){
	var param = {
			'name': $("#name").val(),
			'password': hex_md5($("#pwd").val())
	};
	$.post("user/login.action",param,function(res){
		//alert(res.result);
		if(res.success){
			self.location = "index.html";
		}else{
			alert(res.result);
		}
	});
}

function sNav(a,b) {
    var isShow=false;
    $(a).mouseover(function(){
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
}

function setmenu(){
	var menuparams = {
			'type':'inner'  
		 };
	$.post("admin/menu.action",menuparams,function(res) {
		var contentStr = "";
		var subcontentStr = "<div class='subnav clearfloat' id='subnav'>";
		var menus = res.menus;
		if(menus[0].id == 0)
		{ 
			contentStr = "<div class='mainnav'><ul class='mainnav_ul'>您已退出或超时自动退出，请重新登录。</ul></div>";
		}else{	
			contentStr += "<div class='mainnav'>"
						  +"<ul class='mainnav_ul'>";
			contentStr += "<li><a href='index.html'>首页</a><span>|</span> </li>";
			for(var i=0;i<menus.length;i++){
				if(menus[i].upperid == 0){
					contentStr += "<li><a href='"+ menus[i].url +"?menuid="+ menus[i].id +"' class='mainnav_a"+ (i+1) +"'>"+ menus[i].name +"</a><span>|</span>";
					var upperid=0;
					var j=0;
					for(j;j<menus.length;j++){
						if(menus[j].upperid == menus[i].id){
							if(upperid == 0){
								upperid = 1;
								subcontentStr += "<ul class='subnav"+ (i+1) +" clearfloat'>";
							}
							subcontentStr += "<li><a href='"+ menus[j].url +"?menuid="+ menus[j].id +"'>"+ menus[j].name +"</a></li>";
						}
					}
					if(upperid == 1){
						subcontentStr += "</ul>";
					}
					contentStr += "</li>";
				}
			}
			contentStr += "</ul></div>";
		}
		subcontentStr += "</div>";
		//alert(contentStr);
		$("#nav").html(contentStr + subcontentStr);
	    for(var i=0;i<menus.length;i++){
			if(menus[i].upperid == 0){
				sNav(".mainnav_a"+ (i+1),".subnav"+ (i+1));
			}
	    }
	});
}

function getproject(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'frontallwithlimit',
			'typeid':'0',
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("project/list.action",params,function(res) {
		var projects = res.projects;
		var contentStr = "";
		if(projects[0].id == 0)
		{ 
			contentStr = "<li>"+ projects[0].title +"</li>";
		}else{	
			for(var i=0;i<projects.length;i++){
				contentStr += "<li><a href='projectcontent.html?id="+ projects[i].id +"'><span>[ "+ projects[i].zdy2 +" ]</span>"+ projects[i].title.substring(0,20);
				contentStr += "</a></li>";				
			}
		}
		$("#projectlist").html(contentStr);
	});
}

function getprojectopen(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'frontallwithlimit',
			'typeid':'0',
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("projectopen/list.action",params,function(res) {
		var projectopens = res.projectopens;
		var contentStr = "";
		if(projectopens[0].id == 0)
		{ 
			contentStr = "<li>"+ projectopens[0].title +"</li>";
		}else{	
			for(var i=0;i<projectopens.length;i++){
				contentStr += "<li><a href='projectopencontent.html?id="+ projectopens[i].id +"'><span>[ "+ projectopens[i].zdy2 +" ]</span>"+ projectopens[i].title.substring(0,20);
				contentStr += "</a></li>";				
			}
		}
		$("#projectopenlist").html(contentStr);
	});
}

function getnews(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'allwithlimit',
			'typeid':'0',
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("news/list.action",params,function(res) {
		var newss = res.newss;
		var contentStr = "";
		if(newss[0].id == 0)
		{ 
			contentStr = "<li>"+ newss[0].title +"</li>";
		}else{	
			for(var i=0;i<newss.length;i++){
				contentStr += "<li><a href='newscontent.html?id="+ newss[i].id +"'><span>[ "+ newss[i].zdy2 +" ]</span>"+ newss[i].title.substring(0,18) +"</a></li>";
			}
		}
		$("#newslist").html(contentStr);
	});
}

function settypemenu(type){
	var menuparams = {
			'type':'type_'+ type  
		 };
	$.post("admin/menu.action",menuparams,function(res) {
		var contentStr = "";
		var contentnav = "";
		var title = "";
		var menus = res.menus;
		if(menus[0].id == 0)
		{ 
			alert(menus[0].name);
			self.location = menus[0].url;
		}else{	
			contentnav = "<li><a href='index.html'>亚宝药业招投标网</a></li>";
			contentStr += "<ul>";
			for(var i=0;i<menus.length;i++){
				if(menus[i].upperid == 0){
					title = menus[i].name;
					contentnav += "<li>&nbsp;>&nbsp;<a href='"+ menus[i].url +"?menuid="+ menus[i].id +"'>"+ menus[i].name +"</a></li>";
					contentStr += "<li><a href='"+ menus[i].url +"?menuid="+ menus[i].id +"'>"+ menus[i].name +"</a></li>";
					var upperid=0;
					var j=0;
					for(j;j<menus.length;j++){
						if(menus[j].id == type){
							title = menus[j].name;
							contentnav += "<li>&nbsp;>&nbsp;<a href='"+ menus[j].url +"?menuid="+ menus[j].id +"'>"+ menus[j].name +"</a></li>";
						}
						if(menus[j].upperid == menus[i].id){
							if(menus[j].id == type){
								contentStr += "<li class='active'><a href='"+ menus[j].url +"?menuid="+ menus[j].id +"'>&nbsp;&nbsp;"+ menus[j].name +"</a></li>";
							}else{
								contentStr += "<li><a href='"+ menus[j].url +"?menuid="+ menus[j].id +"'>&nbsp;&nbsp;"+ menus[j].name +"</a></li>";
							}
						}
					}
				}
			}
			contentStr += "</ul>";
		}
		$("#navlist").html(contentStr);
		$("#navbar").html(contentnav);
		$("#title").html(title);
	});
}

function gettypeproject(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'typeallwithlimit',
			'typeid':getParameter("menuid"),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("project/list.action",params,function(res) {
		var projects = res.projects;
		var contentStr = "";
		if(projects[0].id == 0)
		{ 
			contentStr = "<li>"+ projects[0].title +"</li>";
		}else{	
			for(var i=0;i<projects.length;i++){//alert(projects[i].content.substring(0,80));
				contentStr += "<li><a href='projectcontent.html?id="+ projects[i].id +"&menuid="+ getParameter("menuid") +"&title="+ projects[i].title +"'><h2>"+ projects[i].title.substring(0,30);
				contentStr += "</h2><span class='time'>"+ projects[i].zdy2 +"</span><p class='clearfloat'>"+ rep(projects[i].content).substring(0,80) +"...</p></a></li>";				
			}
		}
		$("#projectlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeprojectreply(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'userwithlimit',
			'typeid':getParameter("menuid"),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("project/list.action",params,function(res) {
		var projects = res.projects;
		var contentStr = "";
		if(projects[0].id == 0)
		{ 
			contentStr = "<li>"+ projects[0].title +"</li>";
		}else{	
			for(var i=0;i<projects.length;i++){
				contentStr += "<li><a href='projectcontent.html?id="+ projects[i].id +"&menuid="+ getParameter("menuid") +"&title="+ projects[i].title +"'><h2>"+ projects[i].title.substring(0,30);
				contentStr += "</h2><span class='time'>"+ projects[i].zdy2 +"</span><p class='clearfloat'>"+ rep(projects[i].content).substring(0,80) +"...</p></a></li>";				
			}
		}
		$("#projectlist").html(contentStr);
		$("#pagelist").html(res.pages);
		$("#pagelist").html(res.pages);
	});
}

function gettypeprojectopen(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'typeallwithlimit',
			'typeid':getParameter("menuid"),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("projectopen/list.action",params,function(res) {
		var projectopens = res.projectopens;
		var contentStr = "";
		if(projectopens[0].id == 0)
		{ 
			contentStr = "<li>"+ projectopens[0].title +"</li>";
		}else{	
			for(var i=0;i<projectopens.length;i++){
				contentStr += "<li><a href='projectopencontent.html?id="+ projectopens[i].id +"&menuid="+ getParameter("menuid") +"&title="+ projectopens[i].title +"'><h2>"+ projectopens[i].title.substring(0,30);
				contentStr += "</h2><span class='time'>"+ projectopens[i].zdy2 +"</span><p class='clearfloat'>"+ rep(projectopens[i].content).substring(0,80) +"...</p></a></li>";			
			}
		}
		$("#projectopenlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function getalltypeprojectopen(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'frontallwithlimit',
			'typeid':getParameter("menuid"),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("projectopen/list.action",params,function(res) {
		var projectopens = res.projectopens;
		var contentStr = "";
		if(projectopens[0].id == 0)
		{ 
			contentStr = "<li>"+ projectopens[0].title +"</li>";
		}else{	
			for(var i=0;i<projectopens.length;i++){
				contentStr += "<li><a href='projectopencontent.html?id="+ projectopens[i].id +"&menuid="+ getParameter("menuid") +"&title="+ projectopens[i].title +"'><h2>"+ projectopens[i].title.substring(0,30);
				contentStr += "</h2><span class='time'>"+ projectopens[i].zdy2 +"</span><p class='clearfloat'>"+ rep(projectopens[i].content).substring(0,80) +"...</p></a></li>";			
			}
		}
		$("#projectopenlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypenews(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'typeallwithlimit',
			'typeid':getParameter("menuid"),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("news/list.action",params,function(res) {
		var newss = res.newss;
		var contentStr = "";
		if(newss[0].id == 0)
		{ 
			contentStr = "<li>"+ newss[0].title +"</li>";
		}else{	
			for(var i=0;i<newss.length;i++){
				contentStr += "<li><a href='newscontent.html?id="+ newss[i].id +"'><h2>"+ newss[i].title.substring(0,30);
				contentStr += "</h2><span class='time'>"+ newss[i].zdy2 +"</span><p class='clearfloat'>"+ rep(newss[i].content).substring(0,80) +"...</p></a></li>";
			}
		}
		$("#newslist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function getalltypenews(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'frontallwithlimit',
			'typeid':getParameter("menuid"),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("news/list.action",params,function(res) {
		var newss = res.newss;
		var contentStr = "";
		if(newss[0].id == 0)
		{ 
			contentStr = "<li>"+ newss[0].title +"</li>";
		}else{	
			for(var i=0;i<newss.length;i++){
				contentStr += "<li><a href='newscontent.html?id="+ newss[i].id +"'><h2>"+ newss[i].title.substring(0,30);
				contentStr += "</h2><span class='time'>"+ newss[i].zdy2 +"</span><p class='clearfloat'>"+ rep(newss[i].content).substring(0,80) +"...</p></a></li>";
			}
		}
		$("#newslist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeexplain(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'allwithlimit',
			'typeid':getParameter("menuid"),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("helpfile/list.action",params,function(res) {
		var helpfiles = res.helpfiles;
		var contentStr = "";
		if(helpfiles[0].id == 0)
		{ 
			contentStr = "<li>"+ helpfiles[0].title +"</li>";
		}else{	
			for(var i=0;i<helpfiles.length;i++){
				contentStr += "<li><a href='explaincontent.html?id="+ helpfiles[i].id +"'><h2>"+ helpfiles[i].title.substring(0,30);
				contentStr += "</h2><span class='time'>"+ helpfiles[i].zdy2 +"</span><p class='clearfloat'>"+ rep(helpfiles[i].content).substring(0,80) +"...</p></a></li>";
			}
		}
		$("#explainlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function getalltypeproject(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'frontallwithlimit',
			'typeid':getParameter("menuid"),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("project/frontlist.action",params,function(res) {
		var projects = res.projects;
		var contentStr = "";
		if(projects[0].id == 0)
		{ 
			contentStr = "<li>"+ projects[0].title +"</li>";
		}else{	
			for(var i=0;i<projects.length;i++){
				contentStr += "<li><a href='projectcontent.html?id="+ projects[i].id +"&menuid="+ getParameter("menuid") +"&title="+ projects[i].title +"'><h2>"+ projects[i].title.substring(0,30);
				contentStr += "</h2><span class='time'>"+ projects[i].zdy2 +"</span><p class='clearfloat'>"+ rep(projects[i].content).substring(0,80) +"...</p></a></li>";				
			}
		}
		$("#projectlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function getcontact(){
	var params = {
			'idtype':'allwithlimit',
			'typeid':getParameter("menuid"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("contact/list.action",params,function(res) {
		var contacts = res.contacts;
		var contentStr = "";
		if(contacts[0].id == 0)
		{ 
			contentStr = "<li>"+ contacts[0].title +"</li>";
		}else{
			contentStr += "<p>地 址："+ contacts[0].address +"</p>"
						  +"<p>电 话："+ contacts[0].tel +"</p>"
						  +"<p>传 真："+ contacts[0].fax +"</p>"
						  +"<p>邮 箱："+ contacts[0].email +"</p>"
						  +"<p>邮政编码："+ contacts[0].postcode +"</p>";
		}
		$("#contact").html(contentStr);
	});
}

function gettypenewscontent(id){
	var params = {
			'idtype':'content',
			'typeid':id,
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("news/list.action",params,function(res) {
		var newss = res.newss;
		var contentStr = "";
		if(newss[0].id == 0)
		{ 
			contentStr = "<li>"+ newss[0].title +"</li>";
		}else{	
			for(var i=0;i<newss.length;i++){
				contentStr += "<h2>"+ newss[0].title +"</h2>";
				contentStr += "<div class='subtitle'><span>时间："+ newss[0].zdy2 +"</span></div>";
				contentStr += "<div class='news_content_cot'>"+ newss[0].content +"</div>";				
			}
		}
		$("#content").html(contentStr);
	});
}

function gettypeprojectcontent(id){
	var params = {
			'idtype':'content',
			'typeid':id,
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("project/list.action",params,function(res) {
		var projects = res.projects;
		var contentStr = "";
		if(projects[0].id == 0)
		{ 
			contentStr = "<li>"+ projects[0].title +"</li>";
		}else{	
			for(var i=0;i<projects.length;i++){
				contentStr += "<h2>"+ projects[0].title +"</h2>";
				contentStr += "<div class='subtitle'><span>发布日期："+ projects[0].zdy2 +"</span></div>";
				contentStr += "<div class='news_content_cot'>"+ projects[0].content +"</div>";	
				contentStr += "<br />";	
				if(projects[0].zdy9 == '' || projects[0].zdy9 == '0'){
					contentStr += "<a  class='onlinebidding' href='#'>已截止</a>";
				}else{
					if(projects[0].zdy8 == ''){
						contentStr += "<a  class='onlinebidding' href='onlinebidding.html?id="+ projects[0].id +"&menuid="+ getParameter("menuid") +"&title="+ projects[0].title +"'>在线投标</a>";
					}else{
						contentStr += "<div style='margin-top:20px;width:100%;font-weight:blod;font-size:14pt;color:#ce281f;'>已投信息</div>";
						contentStr += "<div style='border-top:1px solid #cccccc;line-height:30px;margin-top:10px;width:100%;'>投标日期："+ projects[0].zdy7 +"</div>";
						var len = projects[0].zdy8.split(";").length;
						contentStr +="<table width='100%' border='0'>"
						for(var j=0;j<len;j++){
							if(projects[0].zdy8.split(";")[j] != null && projects[0].zdy8.split(";")[j] != ''){
								contentStr += "<tr><td height='30' valign='middle' style='border-top:1px dotted #cccccc;line-height:30px;margin-top:0px;'>"+ projects[0].zdy8.split(";")[j].split("_")[1] +"</td><td valign='middle' align='right' width='100' style='border-top:1px dotted #cccccc;'><img src='image/download.png'/></td><td valign='middle' align='left' width='50' style='border-top:1px dotted #cccccc;'><a href='"+ projects[0].zdy8.split(";")[j].split("_")[0] +"'>下载</a></td><td width='50' align='right' valign='middle' style='border-top:1px dotted #cccccc;'><a onclick='deletefile("+ projects[0].zdy8.split(";")[j].split("_")[2] +")' style='cursor:pointer;'><img src='image/delete.png' alt='删除'/></td></tr>"; 
							}
						}
						contentStr += "</table>";
						contentStr += "<a  class='onlinebidding' href='onlinebidding.html?id="+ projects[0].id +"&menuid="+ getParameter("menuid") +"&title="+ projects[0].title +"'>追加文件</a>";
					}
				}
			}
		}
		$("#content").html(contentStr);
	});
}

function gettypeprojectopencontent(id){
	var params = {
			'idtype':'content',
			'typeid':id,
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("projectopen/list.action",params,function(res) {
		var projectopens = res.projectopens;
		var contentStr = "";
		if(projectopens[0].id == 0)
		{ 
			contentStr = "<li>"+ projectopens[0].title +"</li>";
		}else{	
			for(var i=0;i<projectopens.length;i++){
				contentStr += "<h2>"+ projectopens[0].title +"</h2>";
				contentStr += "<div class='subtitle'><span>时间："+ projectopens[0].zdy2 +"</span></div>";
				contentStr += "<div class='news_content_cot'>"+ projectopens[0].content +"</div>";			
			}
		}
		$("#content").html(contentStr);
	});
}

function gettypeexplaincontent(id){
	var params = {
			'idtype':'content',
			'typeid':id,
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("helpfile/list.action",params,function(res) {
		var helpfiles = res.helpfiles;
		var contentStr = "";
		if(helpfiles[0].id == 0)
		{ 
			contentStr = "<li>"+ helpfiles[0].title +"</li>";
		}else{	
			for(var i=0;i<helpfiles.length;i++){
				contentStr += "<h2>"+ helpfiles[0].title +"</h2>";
				contentStr += "<div class='subtitle'><span>时间："+ helpfiles[0].zdy2 +"</span></div>";
				contentStr += "<div class='news_content_cot'>"+ helpfiles[0].content +"</div>";	
			}
		}
		$("#content").html(contentStr);
	});
}

function getsupplierfile(){
	var params = {
			'idtype':'myfile',
			'typeid':'0',
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("supplier/listfile.action",params,function(res) {
		var supplierfiles = res.supplierfiles;
		var contentStr = "";
		if(supplierfiles[0].id == 0)
		{ 
			contentStr = "<li>"+ supplierfiles[0].url +"</li>";
		}else{	
			for(var i=0;i<supplierfiles.length;i++){
				contentStr += "<li  class='file-box'>";
				contentStr += "<span>*</span> 资质材料<img src='image/zip.png' alt="+ supplierfiles[i].oldfilename +"> ";
				contentStr += "<input type='button' class='btn' value='删除' onclick='deletefile("+ supplierfiles[i].id +")'/> </li>";	
			}
		}
		$("#filelist").html(contentStr);
	});
}

function gettypesuggest0(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'help',
			'typeid':0,
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("suggest/list.action",params,function(res) {
		var suggests = res.suggests;
		var contentStr = "";
		if(suggests[0].id == 0)
		{ 
			contentStr = "<li>"+ suggests[0].title +"</li>";
		}else{	
			for(var i=0;i<suggests.length;i++){
				contentStr += suggests[i].content;			
			}
		}
		$("#guide_cot").html(contentStr);
	});
}

function gettypesuggest(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'myallwithlimit',
			'typeid':1,
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("suggest/list.action",params,function(res) {
		var suggests = res.suggests;
		var contentStr = "";
		if(suggests[0].id == 0)
		{ 
			contentStr = "<li>"+ suggests[0].title +"</li>";
		}else{	
			contentStr += "<tr><th>标题</th><th>投诉时间</th><th>状态</th></tr><tr>";
			for(var i=0;i<suggests.length;i++){
				contentStr += "<td><a href='detailedcomplaint.html?id="+ suggests[i].id +"&menuid="+ getParameter("menuid") +"'>"+ suggests[i].title.substring(0,5) +"</a></td>";
				contentStr += "<td><a href='detailedcomplaint.html?id="+ suggests[i].id +"&menuid="+ getParameter("menuid") +"'>"+ suggests[i].zdy2 +"</a></td>";			
				contentStr += "<td><a href='detailedcomplaint.html?id="+ suggests[i].id +"&menuid="+ getParameter("menuid") +"'>"+ suggests[i].zdy6 +"</a></td>";	
				if(i<(suggests.length-1)){
					contentStr += "</tr><tr>";
				}
			}
			contentStr += "</tr>";
		}//alert(contentStr);
		$("#suggestlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function getmycomplaintcontent(id){
	var params = {
			'idtype':'content',
			'typeid':id,
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("suggest/list.action",params,function(res) {
		var suggests = res.suggests;
		var contentStr = "";
		if(suggests[0].id == 0)
		{ 
			contentStr = "<tr><td>"+ suggests[0].title +"</td></tr>";
		}else{	
			for(var i=0;i<suggests.length;i++){
				contentStr += "<tr><td width='30%'>投诉日期</td><td>"+ suggests[0].zdy2 +"</td></tr>";
				contentStr += "<tr class='acceptance'><td>标题</td><td>"+ suggests[0].title +"</td></tr>";
				contentStr += "<tr class='acceptance'><td>投诉内容</td><td>"+ suggests[0].content +"</td></tr>";
				if(suggests[0].icon == ''){
					contentStr += "<tr><td>附件</td><td>&nbsp;</td></tr>";	
				}else{
					contentStr += "<tr><td>附件</td><td><a href='"+ suggests[0].icon +"' target='_blank'>下载</a></td></tr>";		
				}
				contentStr += "<tr class='acceptance'><td>受理情况</td><td>"+ suggests[0].zdy10 +"</td></tr>";
			}
		}
		$("#content").html(contentStr);
	});
}

function gettypeexplain0(){
	var params = {
			'idtype':'photo',
			'typeid':'0',
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("helpfile/list.action",params,function(res) {
		var helpfiles = res.helpfiles;
		var contentStr = "";
		if(helpfiles[0].id == 0)
		{ 
			contentStr = "<li>"+ helpfiles[0].title +"</li>";
		}else{	
			for(var i=0;i<helpfiles.length;i++){
				contentStr += "<img src='"+ helpfiles[0].icon +"' width='640'></img>";
			}
		}
		$("#content").html(contentStr);
	});
}

function gettypeprojectreplyfile(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'userwithlimit',
			'typeid':getParameter("id"),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("projectreply/list.action",params,function(res) {
		var projectreplys = res.projectreplys;
		var contentStr = "";
		if(projectreplys[0].id == 0)
		{ 
			contentStr = "<li>"+ projectreplys[0].username +"</li>";
		}else{	
			for(var i=0;i<projectreplys.length;i++){
				contentStr += "<li  class='file-box2'>";
				contentStr += "<div class='bidtitle1'><span>*</span> 投标项目";
				contentStr += "<p class='bidtitle'>"+ projectreplys[i].zdy7 +"</p></div>";	
				contentStr += "<div class='bidtitle4'><span>*</span> 投标时间 <p>"+ projectreplys[i].zdy4 +"</p></div>";
				contentStr += "<div class='bidtitle2'><span>*</span>投标材料<img src='image/zip.png' alt=''> ";
				contentStr += "<input type='button' class='btn' value='删除' onclick='deletefile("+ projectreplys[i].id +")'/></div><br>";
				contentStr += "<div class='bidtitle3'><span>*</span>文件说明<p class=‘reviewed’>"+ projectreplys[i].zdy10 +"</p></div>";
				if(projectreplys[i].bondstatus == 1){
					contentStr += "<div class='bidtitle3'><span>*</span>保证金<p class=‘reviewed’>&nbsp;&nbsp;&nbsp;&nbsp;已交</p></div>";
				}else{
					contentStr += "<div class='bidtitle3'><span>*</span>保证金<p class=‘reviewed’>&nbsp;&nbsp;&nbsp;&nbsp;未交</p></div>";
				}
				contentStr += "</li>";			
			}
		}
		$("#projectreplylist").html(contentStr);
		//$("#pagelist").html(res.pages);
	});
}

function search(page,limit, keyword){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'searchall',
			'typeid':keyword,
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("project/list.action",params,function(res) {
		var projects = res.projects;
		var contentStr = "";
		if(projects[0].id == 0)
		{ 
			contentStr = "<li>"+ projects[0].title +"</li>";
		}else{	
			for(var i=0;i<projects.length;i++){
				contentStr += "<li>";
				contentStr += "<a href="+ projects[i].zdy3 +"content.html?id="+ projects[i].zdy4 +">";
				contentStr += "<h2>"+ projects[i].title +" </h2><span class='time'>"+ projects[i].zdy2 +"</span>";
				if(projects[i].content != null){
					contentStr += "<p class='clearfloat'>"+ rep(projects[i].content).substring(0,80) +"<span>... 【详细】</span></p>	";		
				}
				contentStr += "</a>";
				contentStr += "</li>";				
			}
		}
		$("#content").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function findpassword(username){
	var param ={
			'phoneno': username,
			'idtype': 'forgetpassword',
			'typeid': ''
	};
	$.post("admin/getrandomcode.action",param,function(res){
		alert(res.result);
		if(res.success){
			self.location = "index.html";
		}
	});
}

function savenewpassword(name,code,password){
	var param = {
			'user.phoneno': name,
			'user.zdy1':code,
			'user.password':hex_md5(password)
	};
	$.post("user/changepassword.action",param,function(res){
		alert(res.result);
		if(res.success){
			self.location = "index.html";
		}
	});
}
