$(document).ready(function(){
	setmenu();
	setcopyright();
});

function rep(str){
	var res = str;
	res=res.replace(/<\/?.+?>/g,"");
	return res; 
}

function setPhotowidth(str){
	var res = str;
	res=res.replace(/<img/g,"<img width='100%'");
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

function setcopyright(){
	$("#copyright").html("&copy;"+ (new Date()).getFullYear() +"  亚宝药业集团股份有限公司  互联网药品信息服务资格证书：(晋)-非经营性-2008-0007  晋ICP备15001663号</p><p>咨询电话： <a href='tel:0359-3388114'>0359-3388114</a>");
}

function setmenu(){
	var menuparams = {
			'type':'inner'  
		 };
	$.post("admin/menu.action",menuparams,function(res) {
		var contentStr = "";
		var menus = res.menus;
		if(menus[0].id == 0)
		{ 
			contentStr = "<li class='dropdown'>您已退出或超时自动退出，请重新登录。</li>";
		}else{	
			//contentStr += "<li class='dropdown'>";
			//contentStr += "<a href='index.html' class='dropdown-toggle' data-toggle='dropdown'>首页<b class='caret'></b></a></li>";
			for(var i=0;i<menus.length;i++){
				if(menus[i].upperid == 0){
					contentStr += "<li class='dropdown'>";
					contentStr += "<a href='#' class='dropdown-toggle' data-toggle='dropdown'>"+ menus[i].name +"<b class='caret'></b></a>";
					var second=0;
					var j=0;
					var secondcontentStr = "<ul class='dropdown-menu'>";
					for(j;j<menus.length;j++){
						if(menus[j].upperid == menus[i].id){
							second = 1;
							secondcontentStr += "<li><a href='"+ menus[j].url +"?menuid="+ menus[j].id +"'><b>"+ menus[j].name +"</b></a></li>";
							var k = 0;
							for(k;k<menus.length;k++){
								if(menus[k].upperid == menus[j].id){
									secondcontentStr += "<li><a href='"+ menus[k].url +"?menuid="+ menus[k].id +"'>"+ menus[k].name +"</a></li>";
								}
							}
							secondcontentStr += "<li class='divider'></li>";
						}
					}
					secondcontentStr += "</ul>";
					if(second == 1){
						contentStr += secondcontentStr;
					}
					contentStr += "</li>";
				}
			}
		}
		//alert(contentStr);
		$("#nav").html(contentStr);
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
				if(i==0){
					contentStr += "<img src='image/column_li.png'>";
				}
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
				if(i==0){
					contentStr += "<img src='image/column_li.png'>";
				}
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
			contentStr = "<p>"+ contacts[0].title +"</p>";
		}else{
			contentStr += "<p>亚宝药业集团股份有限公司</p>"
						  +"<p>地 址："+ contacts[0].address +"</p>"
						  +"<p>邮政编码："+ contacts[0].postcode +"</p>"
						  +"<p>办公地点："+ contacts[0].address +"</p>"
						  +"<p>公司传真："+ contacts[0].fax +"</p>"
						  +"<p>电子邮箱："+ contacts[0].email +"</p>";
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
				contentStr += "<div class='subtitle'><span>时间："+ projects[0].zdy2 +"</span></div>";
				contentStr += "<div class='news_content_cot'>"+ projects[0].content +"</div>";	
				contentStr += "<br />";	
				contentStr += "<a  class='onlinebidding' href='onlinebidding.html?id="+ projects[0].id +"&menuid="+ getParameter("menuid") +"&title="+ projects[0].title +"'>在线投标</a>";
			
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
			contentStr = "<li>"+ suggests[0].content +"</li>";
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
			contentStr = "<li>"+ suggests[0].content +"</li>";
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
			'idtype':'projectwithlimit',
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

function getvideo(){
	var param = {
		'idtype': 'content',
		'typeid': '23'
	};
 if(navigator.userAgent.indexOf("MSIE 9.0")>0) { 
			$.post("about/list.action",param,function(res){
				var abouts = res.abouts;
				var contentStr = "";
				var content = "";
					contentStr += "<video id='demo3' poster='images/s1.jpg' controls width='570' height='270' preload='auto' style='background: #000;'>"
					+"<source type='video/mp4' src='"+ abouts[0].zdy10 +"' />"
					+"</video>"
					+"<script>"
					+" var video1=document.getElementById('demo3');"
					+"video1.onclick=function(){"
					+"if(video1.paused){"
					+" video1.play();"
					+" }else{"
					+"video1.pause();"
					+" }"
					+"}"
					+"</script>";
					content = "<a href='about.html?menuid=23' target='_blank'>"+ abouts[0].content.substring(0,150) +"......</a>";
				$("#video").html(contentStr);
				$("#aboutus").html(content);
			});			
	} else{
		if (window.screen.width>800) {
			$.post("about/list.action",param,function(res){
				var abouts = res.abouts;
				var contentStr = "";
				var content = "";
					contentStr += "<video id='demo3' poster='images/s1.jpg' controls  width='100%' height='270' preload='auto' style='background: #000;'>"
					+"<source type='video/mp4' src='"+ abouts[0].zdy10 +"' />"
					+"</video>"
					+"<script>"
					+" var video1=document.getElementById('demo3');"
					+"video1.onclick=function(){"
					+"if(video1.paused){"
					+" video1.play();"
					+" }else{"
					+"video1.pause();"
					+" }"
					+"}"
					+"</script>";
					content = "<a href='about.html?menuid=23' target='_blank'>"+ abouts[0].content.substring(0,150) +"......</a>";
				$("#video").html(contentStr);
				$("#aboutus").html(content);
			});		
		} else {
			$.post("about/list.action",param,function(res){
				var abouts = res.abouts;
				var contentStr = "";
				var content = "";
					contentStr += "<video id='demo3' poster='images/s3.jpg' controls  width='100%' height='270' preload='auto' style='background: #000;'>"
					+"<source type='video/mp4' src='"+ abouts[0].zdy10 +"' />"
					+"</video>"
					+"<script>"
					+" var video1=document.getElementById('demo3');"
					+"video1.onclick=function(){"
					+"if(video1.paused){"
					+" video1.play();"
					+" }else{"
					+"video1.pause();"
					+" }"
					+"}"
					+"</script>";
					content = "<a href='about.html?menuid=23' target='_blank'>"+ abouts[0].content.substring(0,150) +"......</a>";
				$("#video").html(contentStr);
				$("#aboutus").html(content);
			});	
		}		
	}


}

function getvideo1(){
	var param = {
		'idtype': 'content',
		'typeid': '23'
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += "<figure><video id='demo3' controls poster='images/s2.jpg' width='100%'' preload='metadata' aria-describedby='full-descript'>"
            				+"<source type='video/webm' src='' />"
            				+"<source type='video/mp4' src='' />"
            				+"<track src='subs/TOS-arabic.srt' kind='subtitles' srclang='ar' label='Arabic' />"
            				+"<track src='subs/TOS-japanese.srt' kind='subtitles' srclang='jp' label='Japanese' />"
            				+"<track src='subs/TOS-english.srt' kind='subtitles' srclang='en' label='English' />"
            				+"<track src='subs/TOS-turkish.srt' kind='subtitles' srclang='tr' label='Turkish' />"
            				+"<track src='subs/TOS-ukrainian.srt' kind='subtitles' srclang='uk' label='Ukrainian' />"
            				+"</video></figure>"
            				+"<script src='js/jquery-ui-1.10.0.custom.min.js'></script>"
            				+"<script src='js/modernizr.custom.js'></script>"
            				+"<script>"
            				+"if(window.webshims) {"
            				+"webshims.polyfill('mediaelement');"
            				+"}"
            				+"</script>"
            				+"<script src='acornmediaplayer/jquery.acornmediaplayer.js'></script>"
            				+"<script>"
            				+"jQuery(function() {"
            				+"jQuery('#demo3, #demo3-audio').acornMediaPlayer({"
            				+"theme: 'darkglass',"
            				+"volumeSlider: 'vertical'"
            				+"});"
            				+"});"
            				+"</script>";
		}else{
			contentStr += "<figure><video id='demo3' controls poster='images/s2.jpg' width='100%'' preload='metadata' aria-describedby='full-descript'>"
							+"<source type='video/webm' src='"+ abouts[0].zdy10 +"' />"
							+"<source type='video/mp4' src='"+ abouts[0].zdy10 +"' />"
							+"<track src='subs/TOS-arabic.srt' kind='subtitles' srclang='ar' label='Arabic' />"
							+"<track src='subs/TOS-japanese.srt' kind='subtitles' srclang='jp' label='Japanese' />"
							+"<track src='subs/TOS-english.srt' kind='subtitles' srclang='en' label='English' />"
							+"<track src='subs/TOS-turkish.srt' kind='subtitles' srclang='tr' label='Turkish' />"
							+"<track src='subs/TOS-ukrainian.srt' kind='subtitles' srclang='uk' label='Ukrainian' />"
							+"</video></figure>"
            				+"<script src='js/jquery-ui-1.10.0.custom.min.js'></script>"
            				+"<script src='js/modernizr.custom.js'></script>"
            				+"<script>"
            				+"if(window.webshims) {"
            				+"webshims.polyfill('mediaelement');"
            				+"}"
            				+"</script>"
            				+"<script src='acornmediaplayer/jquery.acornmediaplayer.js'></script>"
            				+"<script>"
            				+"jQuery(function() {"
            				+"jQuery('#demo3, #demo3-audio').acornMediaPlayer({"
            				+"theme: 'darkglass',"
            				+"volumeSlider: 'vertical'"
            				+"});"
            				+"});"
            				+"</script>";
			content = "<a href='about.html?menuid=23' target='_blank'>"+ abouts[0].content.substring(0,150) +"......</a>";
		}
		$("#video").html(contentStr);
		$("#aboutus").html(content);
	});
}

function getnewslist(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'alltypewithlimit',
			'typeid':'0',
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("news/list.action",params,function(res) {
		var news = res.newss;
		var contentStr = "";
		var newimg = "";
		var topnew = "";
		if(news[0].id == 0)
		{ 
			contentStr = "<li>"+ news[0].username +"</li>";
		}else{	
			var topvalid = 0;
			for(var i=0;i<news.length;i++){
				if(i==(limit-1) && topvalid==0){
					break;
				}
				if(topvalid == 0 && news[i].icon != null && news[i].icon != ''){
					newimg = "<img src='"+ news[i].zdy4 +"' />";
					topvalid = 1;	
					if(news[i].title != null && news[i].title != ''){
						topnew = "<a href='newsdetail.html?id="+ news[i].id +"'>"+ news[i].title.substring(0,13) +"</a>";
					}
				}else{
					if(news[i].title != null){
						if(news[i].title.length > 24){
							contentStr += "<li><a href='newsdetail.html?id="+ news[i].id +"'>"+ news[i].title.substring(0,24) +"...</a><span>"+ news[i].zdy2 +"</span></li>";
						}else{
							contentStr += "<li><a href='newsdetail.html?id="+ news[i].id +"'>"+ news[i].title +"</a><span>"+ news[i].zdy2 +"</span></li>";
						}
					}
				}
			}
		}
		$("#newslist").html(contentStr);
		if(newimg != ''){
			$("#newimg").html(newimg);
		}
		if(topnew != ''){
			$("#topnew").html(topnew);
		}
	});
}

function getaboutus(){
	var typeid = getParameter("menuid");
	if(typeid == 7){
		typeid=23;
	}
	var param = {
		'idtype': 'content',
		'typeid': typeid
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += "<h5>"+ abouts[0].zdy2 +"</h5>";
		}else{
			contentStr += "<h5>"+ abouts[0].content +"</h5>";
		}
		$("#content").html(contentStr);
	});
}

function getzuzhijiagou(){
	var param = {
		'idtype': 'content',
		'typeid': getParameter("menuid")
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += abouts[0].zdy2;
		}else{
			contentStr += abouts[0].content;
		}
		$("#content").html(contentStr);
	});
}

function getdongshizhang(){
	var param = {
		'idtype': 'content',
		'typeid': getParameter("menuid")
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += abouts[0].zdy2;
		}else{
			contentStr += abouts[0].content;
		}
		$("#content").html(contentStr);
	});
}

function getrongyu(){
	var typeid = getParameter("menuid");
	if(typeid == 8){
		typeid=26;
	}
	var param = {
		'idtype': 'content',
		'typeid': typeid
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += abouts[0].zdy2;
		}else{
			contentStr += abouts[0].content;
		}
		$("#content").html(contentStr);
	});
}

function getgongsilinian(){
	var typeid = getParameter("menuid");
	if(typeid == 9){
		typeid=28;
	}
	var param = {
		'idtype': 'content',
		'typeid': typeid
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += abouts[0].zdy2;
		}else{
			contentStr += abouts[0].content;
		}
		$("#content").html(contentStr);
	});
}

function getleader(){
	var param = {
		'idtype': 'content',
		'typeid': getParameter("menuid")
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += abouts[0].zdy2;
		}else{
			contentStr += abouts[0].content;
		}
		$("#content").html(contentStr);
	});
}

function gettypeinnerpublication(page,limit){
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
	$.post("innerpublication/list.action",params,function(res) {
		var innerpublications = res.innerpublications;
		var contentStr = "";
		if(innerpublications[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ innerpublications[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<innerpublications.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='qiyeneikandetail.html?id="+ innerpublications[i].id +"'><span class=anchorjs-icon>"+ innerpublications[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ innerpublications[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeinnerpublicationcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("innerpublication/list.action",params,function(res) {
		var innerpublications = res.innerpublications;
		var contentStr = "";
		if(innerpublications[0].id == 0)
		{ 
			contentStr = "<li>"+ innerpublications[0].title +"</li>";
		}else{	
			for(var i=0;i<innerpublications.length;i++){
				contentStr = "<h4>"+ innerpublications[0].title +"</h4>"
                    			+"<h5>"+ innerpublications[0].zdy2 +"</h5>"
                    			+ innerpublications[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = innerpublications[0].title;
	});
}

function gettypedangjian(page,limit){
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
	$.post("innerpublication/list.action",params,function(res) {
		var innerpublications = res.innerpublications;
		var contentStr = "";
		if(innerpublications[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ innerpublications[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<innerpublications.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='dangjiandetail.html?id="+ innerpublications[i].id +"'><span class=anchorjs-icon>"+ innerpublications[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ innerpublications[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypedangjiancontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("innerpublication/list.action",params,function(res) {
		var innerpublications = res.innerpublications;
		var contentStr = "";
		if(innerpublications[0].id == 0)
		{ 
			contentStr = "<li>"+ innerpublications[0].title +"</li>";
		}else{	
			for(var i=0;i<innerpublications.length;i++){
				contentStr = "<h4>"+ innerpublications[0].title +"</h4>"
                    			+"<h5>"+ innerpublications[0].zdy2 +"</h5>"
                    			+ innerpublications[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = innerpublications[0].title;
	});
}

function gettypenews(page,limit){
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
	$.post("news/list.action",params,function(res) {
		var news = res.newss;
		var contentStr = "";
		if(news[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ news[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<news.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='newsdetail.html?id="+ news[i].id +"'><span class=anchorjs-icon>"+ news[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ news[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypenewscontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
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
				contentStr = "<h4>"+ newss[0].title +"</h4>"
                    			+"<h5>"+ newss[0].zdy2 +"</h5>"
                    			+ setPhotowidth(newss[0].content);
			}
		}
		$("#content").html(contentStr);
		document.title = newss[0].title;
	});
}

function gettypehangyenews(page,limit){
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
	$.post("news/list.action",params,function(res) {
		var news = res.newss;
		var contentStr = "";
		if(news[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ news[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<news.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='hangyenewsdetail.html?id="+ news[i].id +"'><span class=anchorjs-icon>"+ news[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ news[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypehangyenewscontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
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
				contentStr = "<h4>"+ newss[0].title +"</h4>"
                    			+"<h5>"+ newss[0].zdy2 +"</h5>"
                    			+ newss[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = newss[0].title;
	});
}

function getproduct(){
	var typeid = getParameter("menuid");
	if(typeid==12){
		typeid = 46;
	}
	var param = {
		'idtype': 'content',
		'typeid': typeid
	};
	$.post("product/list.action",param,function(res){
		var products = res.products;
		var contentStr = "";
		var content = "";
		if(products[0].id == 0){
			contentStr += products[0].zdy2;
		}else{
			contentStr += products[0].content;
		}
		$("#content").html(contentStr);
	});
}

function getchildproduct(){
	var param = {
		'idtype': 'content',
		'typeid': getParameter("menuid")
	};
	$.post("product/list.action",param,function(res){
		var products = res.products;
		var contentStr = "";
		var content = "";
		if(products[0].id == 0){
			contentStr += products[0].zdy2;
		}else{
			contentStr += products[0].content;
		}
		$("#content").html(contentStr);
	});
}

function getheartproduct(){
	var param = {
		'idtype': 'content',
		'typeid': getParameter("menuid")
	};
	$.post("product/list.action",param,function(res){
		var products = res.products;
		var contentStr = "";
		var content = "";
		if(products[0].id == 0){
			contentStr += products[0].zdy2;
		}else{
			contentStr += products[0].content;
		}
		$("#content").html(contentStr);
	});
}

function getwomenproduct(){
	var param = {
		'idtype': 'content',
		'typeid': getParameter("menuid")
	};
	$.post("product/list.action",param,function(res){
		var products = res.products;
		var contentStr = "";
		var content = "";
		if(products[0].id == 0){
			contentStr += products[0].zdy2;
		}else{
			contentStr += products[0].content;
		}
		$("#content").html(contentStr);
	});
}

function gethealthproduct(){
	var param = {
		'idtype': 'content',
		'typeid': getParameter("menuid")
	};
	$.post("product/list.action",param,function(res){
		var products = res.products;
		var contentStr = "";
		var content = "";
		if(products[0].id == 0){
			contentStr += products[0].zdy2;
		}else{
			contentStr += products[0].content;
		}
		$("#content").html(contentStr);
	});
}

function gettypegongyi(page,limit){
	var typeid = getParameter("menuid");
	if(typeid==15){
		typeid = 38;
	}
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'allwithlimit',
			'typeid':typeid,
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ socialresponsibilitys[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='gongyidetail.html?id="+ socialresponsibilitys[i].id +"'><span class=anchorjs-icon>"+ socialresponsibilitys[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ socialresponsibilitys[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages.replace(/socialresponsibility/g,'gongyi'));
	});
}

function gettypegongyicontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<li>"+ socialresponsibilitys[0].title +"</li>";
		}else{	
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr = "<h4>"+ socialresponsibilitys[0].title +"</h4>"
                    			+"<h5>"+ socialresponsibilitys[0].zdy2 +"</h5>"
                    			+ socialresponsibilitys[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = socialresponsibilitys[0].title;
	});
}

function gettypezhucan(page,limit){
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
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ socialresponsibilitys[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='zhucandetail.html?id="+ socialresponsibilitys[i].id +"'><span class=anchorjs-icon>"+ socialresponsibilitys[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ socialresponsibilitys[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages.replace(/socialresponsibility/g,'zhucan'));
	});
}

function gettypezhucancontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<li>"+ socialresponsibilitys[0].title +"</li>";
		}else{	
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr = "<h4>"+ socialresponsibilitys[0].title +"</h4>"
                    			+"<h5>"+ socialresponsibilitys[0].zdy2 +"</h5>"
                    			+ socialresponsibilitys[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = socialresponsibilitys[0].title;
	});
}

function gettypejiuzai(page,limit){
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
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ socialresponsibilitys[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='jiuzaidetail.html?id="+ socialresponsibilitys[i].id +"'><span class=anchorjs-icon>"+ socialresponsibilitys[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ socialresponsibilitys[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages.replace(/socialresponsibility/g,'jiuzai'));
	});
}

function gettypejiuzaicontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<li>"+ socialresponsibilitys[0].title +"</li>";
		}else{	
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr = "<h4>"+ socialresponsibilitys[0].title +"</h4>"
                    			+"<h5>"+ socialresponsibilitys[0].zdy2 +"</h5>"
                    			+ socialresponsibilitys[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = socialresponsibilitys[0].title;
	});
}

function gettypezhuxue(page,limit){
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
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ socialresponsibilitys[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='zhuxuedetail.html?id="+ socialresponsibilitys[i].id +"'><span class=anchorjs-icon>"+ socialresponsibilitys[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ socialresponsibilitys[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages.replace(/socialresponsibility/g,'zhuxue'));
	});
}

function gettypezhuxuecontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<li>"+ socialresponsibilitys[0].title +"</li>";
		}else{	
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr = "<h4>"+ socialresponsibilitys[0].title +"</h4>"
                    			+"<h5>"+ socialresponsibilitys[0].zdy2 +"</h5>"
                    			+ socialresponsibilitys[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = socialresponsibilitys[0].title;
	});
}

function gettypehuanbao(page,limit){
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
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ socialresponsibilitys[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='huanbaodetail.html?id="+ socialresponsibilitys[i].id +"'><span class=anchorjs-icon>"+ socialresponsibilitys[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ socialresponsibilitys[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypehuanbaocontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<li>"+ socialresponsibilitys[0].title +"</li>";
		}else{	
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr = "<h4>"+ socialresponsibilitys[0].title +"</h4>"
                    			+"<h5>"+ socialresponsibilitys[0].zdy2 +"</h5>"
                    			+ socialresponsibilitys[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = socialresponsibilitys[0].title;
	});
}

function gettypebjresearch(page,limit){
	var typeid = getParameter("menuid");
	if(typeid == 13){
		typeid=32;
	}
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'allwithlimit',
			'typeid':typeid,
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("research/list.action",params,function(res) {
		var researchs = res.researchs;
		var contentStr = "";
		if(researchs[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ researchs[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<researchs.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='bjresearchdetail.html?id="+ researchs[i].id +"'><span class=anchorjs-icon>"+ researchs[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ researchs[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypebjresearchcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("research/list.action",params,function(res) {
		var researchs = res.researchs;
		var contentStr = "";
		if(researchs[0].id == 0)
		{ 
			contentStr = "<li>"+ researchs[0].title +"</li>";
		}else{	
			for(var i=0;i<researchs.length;i++){
				contentStr = "<h4>"+ researchs[0].title +"</h4>"
                    			+"<h5>"+ researchs[0].zdy2 +"</h5>"
                    			+ researchs[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = researchs[0].title;
	});
}

function gettypeszresearch(page,limit){
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
	$.post("research/list.action",params,function(res) {
		var researchs = res.researchs;
		var contentStr = "";
		if(researchs[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ researchs[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<researchs.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='szresearchdetail.html?id="+ researchs[i].id +"'><span class=anchorjs-icon>"+ researchs[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ researchs[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeszresearchcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("research/list.action",params,function(res) {
		var researchs = res.researchs;
		var contentStr = "";
		if(researchs[0].id == 0)
		{ 
			contentStr = "<li>"+ researchs[0].title +"</li>";
		}else{	
			for(var i=0;i<researchs.length;i++){
				contentStr = "<h4>"+ researchs[0].title +"</h4>"
                    			+"<h5>"+ researchs[0].zdy2 +"</h5>"
                    			+ researchs[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = researchs[0].title;
	});
}

function gettypeoversearesearch(page,limit){
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
	$.post("research/list.action",params,function(res) {
		var researchs = res.researchs;
		var contentStr = "";
		if(researchs[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ researchs[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<researchs.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='oversearesearchdetail.html?id="+ researchs[i].id +"'><span class=anchorjs-icon>"+ researchs[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ researchs[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeoversearesearchcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("research/list.action",params,function(res) {
		var researchs = res.researchs;
		var contentStr = "";
		if(researchs[0].id == 0)
		{ 
			contentStr = "<li>"+ researchs[0].title +"</li>";
		}else{	
			for(var i=0;i<researchs.length;i++){
				contentStr = "<h4>"+ researchs[0].title +"</h4>"
                    			+"<h5>"+ researchs[0].zdy2 +"</h5>"
                    			+ researchs[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = researchs[0].title;
	});
}

function gettypetpresearch(page,limit){
	var typeid = getParameter("menuid");
	if(typeid == 14){
		typeid=35;
	}
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'allwithlimit',
			'typeid':typeid,
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("lab/list.action",params,function(res) {
		var labs = res.labs;
		var contentStr = "";
		if(labs[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ labs[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<labs.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='tplabdetail.html?id="+ labs[i].id +"'><span class=anchorjs-icon>"+ labs[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ labs[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypetpresearchcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("lab/list.action",params,function(res) {
		var labs = res.labs;
		var contentStr = "";
		if(labs[0].id == 0)
		{ 
			contentStr = "<li>"+ labs[0].title +"</li>";
		}else{	
			for(var i=0;i<labs.length;i++){
				contentStr = "<h4>"+ labs[0].title +"</h4>"
                    			+"<h5>"+ labs[0].zdy2 +"</h5>"
                    			+ labs[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = labs[0].title;
	});
}

function gettypearearesearch(page,limit){
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
	$.post("lab/list.action",params,function(res) {
		var labs = res.labs;
		var contentStr = "";
		if(labs[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ labs[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<labs.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='researchareadetail.html?id="+ labs[i].id +"'><span class=anchorjs-icon>"+ labs[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ labs[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypearearesearchcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("lab/list.action",params,function(res) {
		var labs = res.labs;
		var contentStr = "";
		if(labs[0].id == 0)
		{ 
			contentStr = "<li>"+ labs[0].title +"</li>";
		}else{	
			for(var i=0;i<labs.length;i++){
				contentStr = "<h4>"+ labs[0].title +"</h4>"
                    			+"<h5>"+ labs[0].zdy2 +"</h5>"
                    			+ labs[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = labs[0].title;
	});
}

function gettypeopenresearch(page,limit){
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
	$.post("lab/list.action",params,function(res) {
		var labs = res.labs;
		var contentStr = "";
		if(labs[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ labs[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<labs.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='openresearchdetail.html?id="+ labs[i].id +"'><span class=anchorjs-icon>"+ labs[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ labs[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeopenresearchcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("lab/list.action",params,function(res) {
		var labs = res.labs;
		var contentStr = "";
		if(labs[0].id == 0)
		{ 
			contentStr = "<li>"+ labs[0].title +"</li>";
		}else{	
			for(var i=0;i<labs.length;i++){
				contentStr = "<h4>"+ labs[0].title +"</h4>"
                    			+"<h5>"+ labs[0].zdy2 +"</h5>"
                    			+ labs[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = labs[0].title;
	});
}

function gettypeoversea(page,limit){
	var typeid = getParameter("menuid");
	if(typeid == 16){
		typeid=43;
	}
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'allwithlimit',
			'typeid':typeid,
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("oversea/list.action",params,function(res) {
		var overseas = res.overseas;
		var contentStr = "";
		if(overseas[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ overseas[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<overseas.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='overseadetail.html?id="+ overseas[i].id +"'><span class=anchorjs-icon>"+ overseas[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ overseas[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeoverseacontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("oversea/list.action",params,function(res) {
		var overseas = res.overseas;
		var contentStr = "";
		if(overseas[0].id == 0)
		{ 
			contentStr = "<li>"+ overseas[0].title +"</li>";
		}else{	
			for(var i=0;i<overseas.length;i++){
				contentStr = "<h4>"+ overseas[0].title +"</h4>"
                    			+"<h5>"+ overseas[0].zdy2 +"</h5>"
                    			+ overseas[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = overseas[0].title;
	});
}

function gettypeyuanliao(page,limit){
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
	$.post("oversea/list.action",params,function(res) {
		var overseas = res.overseas;
		var contentStr = "";
		if(overseas[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ overseas[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<overseas.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='yuanliaodetail.html?id="+ overseas[i].id +"'><span class=anchorjs-icon>"+ overseas[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ overseas[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeyuanliaocontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("oversea/list.action",params,function(res) {
		var overseas = res.overseas;
		var contentStr = "";
		if(overseas[0].id == 0)
		{ 
			contentStr = "<li>"+ overseas[0].title +"</li>";
		}else{	
			for(var i=0;i<overseas.length;i++){
				contentStr = "<h4>"+ overseas[0].title +"</h4>"
                    			+"<h5>"+ overseas[0].zdy2 +"</h5>"
                    			+ overseas[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = overseas[0].title;
	});
}

function gettypeoverseaproduct(page,limit){
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
	$.post("oversea/list.action",params,function(res) {
		var overseas = res.overseas;
		var contentStr = "";
		if(overseas[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ overseas[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<overseas.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='overseaproductdetail.html?id="+ overseas[i].id +"'><span class=anchorjs-icon>"+ overseas[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ overseas[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeoverseaproductcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("oversea/list.action",params,function(res) {
		var overseas = res.overseas;
		var contentStr = "";
		if(overseas[0].id == 0)
		{ 
			contentStr = "<li>"+ overseas[0].title +"</li>";
		}else{	
			for(var i=0;i<overseas.length;i++){
				contentStr = "<h4>"+ overseas[0].title +"</h4>"
                    			+"<h5>"+ overseas[0].zdy2 +"</h5>"
                    			+ overseas[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = overseas[0].title;
	});
}

function gettypegufeninfo(page,limit){
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
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ relationships[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<relationships.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='gufeninfodetail.html?id="+ relationships[i].id +"'><span class=anchorjs-icon>"+ relationships[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ relationships[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypegufeninfocontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<li>"+ relationships[0].title +"</li>";
		}else{	
			for(var i=0;i<relationships.length;i++){
				contentStr = "<h4>"+ relationships[0].title +"</h4>"
                    			+"<h5>"+ relationships[0].zdy2 +"</h5>"
                    			+ relationships[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = relationships[0].title;
	});
}

function gettypezhangcheng(page,limit){
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
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ relationships[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<relationships.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='zhangchengdetail.html?id="+ relationships[i].id +"'><span class=anchorjs-icon>"+ relationships[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ relationships[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypezhangchengcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<li>"+ relationships[0].title +"</li>";
		}else{	
			for(var i=0;i<relationships.length;i++){
				contentStr = "<h4>"+ relationships[0].title +"</h4>"
                    			+"<h5>"+ relationships[0].zdy2 +"</h5>"
                    			+ relationships[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = relationships[0].title;
	});
}

function gettypegonggao(page,limit){
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
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ relationships[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<relationships.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='gonggaodetail.html?id="+ relationships[i].id +"'><span class=anchorjs-icon>"+ relationships[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ relationships[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypegonggaocontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<li>"+ relationships[0].title +"</li>";
		}else{	
			for(var i=0;i<relationships.length;i++){
				contentStr = "<h4>"+ relationships[0].title +"</h4>"
                    			+"<h5>"+ relationships[0].zdy2 +"</h5>"
                    			+ relationships[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = relationships[0].title;
	});
}

function gettypecaiwureport(page,limit){
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
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ relationships[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<relationships.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='caiwureportdetail.html?id="+ relationships[i].id +"'><span class=anchorjs-icon>"+ relationships[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ relationships[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypecaiwureportcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<li>"+ relationships[0].title +"</li>";
		}else{	
			for(var i=0;i<relationships.length;i++){
				contentStr = "<h4>"+ relationships[0].title +"</h4>"
                    			+"<h5>"+ relationships[0].zdy2 +"</h5>"
                    			+ relationships[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = relationships[0].title;
	});
}

function gettypedongshihui(page,limit){
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
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ relationships[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<relationships.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='dongshihuidetail.html?id="+ relationships[i].id +"'><span class=anchorjs-icon>"+ relationships[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ relationships[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypedongshihuicontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<li>"+ relationships[0].title +"</li>";
		}else{	
			for(var i=0;i<relationships.length;i++){
				contentStr = "<h4>"+ relationships[0].title +"</h4>"
                    			+"<h5>"+ relationships[0].zdy2 +"</h5>"
                    			+ relationships[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = relationships[0].title;
	});
}

function gettypejiaoyu(page,limit){
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
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ relationships[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<relationships.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='jiaoyudetail.html?id="+ relationships[i].id +"'><span class=anchorjs-icon>"+ relationships[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ relationships[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypejiaoyucontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<li>"+ relationships[0].title +"</li>";
		}else{	
			for(var i=0;i<relationships.length;i++){
				contentStr = "<h4>"+ relationships[0].title +"</h4>"
                    			+"<h5>"+ relationships[0].zdy2 +"</h5>"
                    			+ relationships[0].content;
			}
		}
		$("#content").html(contentStr);
		document.title = relationships[0].title;
	});
}

function getzhaopin(){
	var param = {
		'idtype': 'content',
		'typeid': '0'
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += abouts[0].zdy2;
		}else{
			contentStr += abouts[0].content;
		}
		$("#content").html(contentStr);
	});
}

function getlegal(){
	var param = {
		'idtype': 'content',
		'typeid': '1000'
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += abouts[0].zdy2;
		}else{
			contentStr += abouts[0].content;
		}
		$("#content").html(contentStr);
	});
}

function getindexbanner(){
	var param = {
			'idtype': 'indexbanner',
			'typeid': '1000'
		};
	$.post("admin/keyvaluelistnew.action",param,function(res){
			var keyvalues = res.keyvalues;
			var contentStr = "";
			if(keyvalues[0].id == 0){
				contentStr += "<ol class='carousel-indicators'>"
								+"<li class='active' data-slide-to='0' data-target='#carousel-179374'> </li>"
								+"<li data-slide-to='1' data-target='#carousel-179374'> </li>"
								+"<li data-slide-to='2' data-target='#carousel-179374'> </li>"
								+"</ol>"
								+"<div class='carousel-inner'>"
								+"<div class='item active'>";
				contentStr += "<img alt='' src='images/banner5.jpg' />";
				contentStr += "<div class='carousel-caption'>"
								+"</div>"
								+"</div>"
								+"<div class='item'>";
				contentStr += "<img alt='' src='images/banner6.jpg' />";
				contentStr += "<div class='carousel-caption'>"
								+"</div>"
								+"</div>"
								+"<div class='item'>";
				contentStr += "<img alt='' src='images/banner7.jpg' />";
				contentStr += "<div class='carousel-caption'>"
								+"</div>"
								+"</div>"
								+"</div>"
								+"<a data-slide='prev' href='#carousel-179374' class='left carousel-control'>‹</a> <a data-slide='next' href='#carousel-179374' class='right carousel-control'>›</a>";
			}else{
				contentStr += "<ol class='carousel-indicators'>"
								+"<li class='active' data-slide-to='0' data-target='#carousel-179374'> </li>"
								+"<li data-slide-to='1' data-target='#carousel-179374'> </li>"
								+"<li data-slide-to='2' data-target='#carousel-179374'> </li>"
								+"</ol>"
								+"<div class='carousel-inner'>"
								+"<div class='item active'>";
				if(keyvalues[0].value != ''){
					contentStr += "<img alt='' src='"+ keyvalues[0].value +"' />";
				}else{
					contentStr += "<img alt='' src='images/banner5.jpg' />";
				}
				contentStr += "<div class='carousel-caption'>"
								+"</div>"
								+"</div>"
								+"<div class='item'>";
				if(keyvalues[1].value != ''){
					contentStr += "<img alt='' src='"+ keyvalues[1].value +"' />";
				}else{
					contentStr += "<img alt='' src='images/banner6.jpg' />";
				}
				contentStr += "<div class='carousel-caption'>"
								+"</div>"
								+"</div>"
								+"<div class='item'>";
				if(keyvalues[2].value != ''){
					contentStr += "<img alt='' src='"+ keyvalues[2].value +"' />";
				}else{
					contentStr += "<img alt='' src='images/banner7.jpg' />";
				}
				contentStr += "<div class='carousel-caption'>"
								+"</div>"
								+"</div>"
								+"</div>"
								+"<a data-slide='prev' href='#carousel-179374' class='left carousel-control'>‹</a> <a data-slide='next' href='#carousel-179374' class='right carousel-control'>›</a>";
			}
			$("#carousel-179374").html(contentStr);
			$('.carousel').carousel({
		     	interval: 4000
		    })
		});
}

function getindexproduct(){
	var param = {
			'idtype': 'indexproduct',
			'typeid': '1000'
		};
	$.post("admin/keyvaluelistnew.action",param,function(res){
			var keyvalues = res.keyvalues;
			var contentStr = "";
			if(keyvalues[0].id == 0){
				contentStr += "<div class='col-md-3 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'>"
								+"<a class='mask' href='childproduct.html?menuid=46'>"
								+"<img src='images/img5.jpg' class='img-responsive zoom-img' alt='' />"
								+"</a>"
								+"<div class='child'> "
								+"<span class='zhu-tit'><a href='childproduct.html?menuid=46'>儿童用药</a></span> "
								+"<span class='more-tit'><a class='bloc' href='childproduct.html?menuid=46'>查看详情>></a></span>"
								+"</div>"
								+"</div>"
								+"<div class='col-md-3 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'> "
								+"<a class='mask' href='heartproduct.html?menuid=47'>"
								+"<img src='images/img6.jpg' class='img-responsive zoom-img' alt='' />"
								+"</a>"
								+"<div class='child'> "
								+"<span class='zhu-tit'><a href='heartproduct.html?menuid=47'>心脑血管用药</a></span> "
								+"<span class='more-tit'><a class='bloc' href='heartproduct.html?menuid=47'>查看详情>></a></span>"
								+"</div>"
								+"</div>"
								+"<div class='col-md-3 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'> "
								+"<a class='mask' href='womenproduct.html?menuid=48'>"
								+"<img src='images/img7.jpg' class='img-responsive zoom-img' alt='' />"
								+"</a>"
								+"<div class='child'> "
								+"<span class='zhu-tit'><a href='womenproduct.html?menuid=48'>妇科用药</a></span> "
								+"<span class='more-tit'><a class='bloc' href='womenproduct.html?menuid=48'>查看详情>></a></span>"
								+"</div>"
								+"</div>"
								+"<div class='col-md-3 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'> "
								+"<a class='mask' href='healthproduct.html?menuid=49'>"
								+"<img src='images/img8.jpg' class='img-responsive zoom-img' alt='' />"
								+"</a>"
								+"<div class='child'> "
								+"<span class='zhu-tit'><a href='healthproduct.html?menuid=49'>大健康</a></span> "
								+"<span class='more-tit'><a class='bloc' href='healthproduct.html?menuid=49'>查看详情>></a></span>"
								+"</div>"
								+"</div>"
								+"<div class='clearfix'> </div>";
			}else{
				contentStr += "<div class='col-md-3 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'>"
								+"<a class='mask' href='childproduct.html?menuid=46'>";
				if(keyvalues[0].value != ''){
					contentStr += "<img src='"+ keyvalues[0].value +"' class='img-responsive zoom-img' alt='' />";
				}else{
					contentStr += "<img src='images/img5.jpg' class='img-responsive zoom-img' alt='' />";
				}
				contentStr += "</a>"
								+"<div class='child'> "
								+"<span class='zhu-tit'><a href='childproduct.html?menuid=46'>儿童用药</a></span> "
								+"<span class='more-tit'><a class='bloc' href='childproduct.html?menuid=46'>查看详情>></a></span>"
								+"</div>"
								+"</div>"
								+"<div class='col-md-3 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'> "
								+"<a class='mask' href='heartproduct.html?menuid=47'>";
				if(keyvalues[1].value != ''){
					contentStr += "<img src='"+ keyvalues[1].value +"' class='img-responsive zoom-img' alt='' />";
				}else{
					contentStr += "<img src='images/img6.jpg' class='img-responsive zoom-img' alt='' />";
				}
				contentStr += "</a>"
								+"<div class='child'> "
								+"<span class='zhu-tit'><a href='heartproduct.html?menuid=47'>心脑血管用药</a></span> "
								+"<span class='more-tit'><a class='bloc' href='heartproduct.html?menuid=47'>查看详情>></a></span>"
								+"</div>"
								+"</div>"
								+"<div class='col-md-3 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'> "
								+"<a class='mask' href='womenproduct.html?menuid=48'>";
				if(keyvalues[2].value != ''){
					contentStr += "<img src='"+ keyvalues[2].value +"' class='img-responsive zoom-img' alt='' />";
				}else{
					contentStr += "<img src='images/img7.jpg' class='img-responsive zoom-img' alt='' />";
				}
				contentStr += "</a>"
								+"<div class='child'> "
								+"<span class='zhu-tit'><a href='womenproduct.html?menuid=48'>妇科用药</a></span> "
								+"<span class='more-tit'><a class='bloc' href='womenproduct.html?menuid=48'>查看详情>></a></span>"
								+"</div>"
								+"</div>"
								+"<div class='col-md-3 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'> "
								+"<a class='mask' href='healthproduct.html?menuid=49'>";
				if(keyvalues[3].value != ''){
					contentStr += "<img src='"+ keyvalues[3].value +"' class='img-responsive zoom-img' alt='' />";
				}else{
					contentStr += "<img src='images/img8.jpg' class='img-responsive zoom-img' alt='' />";
				}
				contentStr += "</a>"
								+"<div class='child'> "
								+"<span class='zhu-tit'><a href='healthproduct.html?menuid=49'>大健康</a></span> "
								+"<span class='more-tit'><a class='bloc' href='healthproduct.html?menuid=49'>查看详情>></a></span>"
								+"</div>"
								+"</div>"
								+"<div class='clearfix'> </div>";
			}
			$("#indexproductcontent").html(contentStr);
	});
}

function getindexinternational(){
	var param = {
			'idtype': 'indexinternational',
			'typeid': '1000'
		};
	$.post("admin/keyvaluelistnew.action",param,function(res){
			var keyvalues = res.keyvalues;
			var contentStr = "";
			if(keyvalues[0].id == 0){
				contentStr += "<div class='col-md-4 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'>"
								+"<a href='bjresearch.html?menuid=32' class='mask'>"
								+"<img src='images/img1.jpg' class='img-responsive zoom-img' alt='' />"
								+"</a>"
								+"<div class='child'>" 
								+"<span class='cen-tit'><a href='bjresearch.html?menuid=32' class='cen' >创新与研发</a></span> "
								+"</div>"
								+"</div>"
								+"<div class='col-md-4 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'>"
								+"<a href='oversea.html?menuid=43' class='mask'>"
								+"<img src='images/img2.jpg' class='img-responsive zoom-img' alt='' />"
								+"</a>"
								+"<div class='child'>" 
								+"<span class='cen-tit'><a href='oversea.html?menuid=43' class='cen' >国际合作</a></span> "
								+"</div>"
								+"</div>"
								+"<div class='col-md-4 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'>"
								+"<a href='tplab.html?menuid=35' class='mask'>"
								+"<img src='images/img3.jpg' class='img-responsive zoom-img' alt='' />"
								+"</a>"
								+"<div class='child'>" 
								+"<span class='cen-tit'><a href='tplab.html?menuid=35' class='cen' >重点实验室</a></span> "
								+"</div>"
								+"</div>"
							    +"<div class='clearfix'> </div>";
			}else{
				contentStr += "<div class='col-md-4 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'>"
									+"<a href='bjresearch.html?menuid=32' class='mask'>";
				if(keyvalues[0].value != ''){
					contentStr += "<img src='"+ keyvalues[0].value +"' class='img-responsive zoom-img' alt='' />";
				}else{
					contentStr += "<img src='images/img1.jpg' class='img-responsive zoom-img' alt='' />";
				}
				contentStr += "</a>"
									+"<div class='child'>" 
									+"<span class='cen-tit'><a href='bjresearch.html?menuid=32' class='cen' >创新与研发</a></span> "
									+"</div>"
									+"</div>"
									+"<div class='col-md-4 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'>"
									+"<a href='oversea.html?menuid=43' class='mask'>";
				if(keyvalues[1].value != ''){
					contentStr += "<img src='"+ keyvalues[1].value +"' class='img-responsive zoom-img' alt='' />";
				}else{
					contentStr += "<img src='images/img2.jpg' class='img-responsive zoom-img' alt='' />";
				}
				contentStr += "</a>"
									+"<div class='child'>" 
									+"<span class='cen-tit'><a href='oversea.html?menuid=43' class='cen' >国际合作</a></span> "
									+"</div>"
									+"</div>"
									+"<div class='col-md-4 news-grid wow bounceIn animated' data-wow-delay='0.4s' style='visibility: visible; -webkit-animation-delay: 0.4s;'>"
									+"<a href='tplab.html?menuid=35' class='mask'>";
				if(keyvalues[2].value != ''){
					contentStr += "<img src='"+ keyvalues[2].value +"' class='img-responsive zoom-img' alt='' />";
				}else{
					contentStr += "<img src='images/img3.jpg' class='img-responsive zoom-img' alt='' />";
				}
				contentStr += "</a>"
									+"<div class='child'>" 
									+"<span class='cen-tit'><a href='tplab.html?menuid=35' class='cen' >重点实验室</a></span> "
									+"</div>"
									+"</div>"
								    +"<div class='clearfix'> </div>";
			}
			$("#indexinternational").html(contentStr);
	});
}

function getsearch(page,limit){
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'searchall',
			'typeid':encodeURIComponent(unescape(getParameter("keyword"))),
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
	};
	$.post("about/listsearch.action",params,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ abouts[0].zdy2 +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<abouts.length;i++){
				content = rep(abouts[i].content).substring(0,40);
				if(content == ''){
					content = "[详情]";
				}
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='searchdetail.html?table="+ abouts[i].zdy10 +"&id="+ abouts[i].zdy9 +"'><span class=anchorjs-icon>"+ content +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ abouts[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
		$("#total").html(res.total);
	});
}

function getsearchdetail(){
	var param = {
		'idtype': 'searchdetail',
		'typeid': getParameter("table") +"_"+ getParameter("id")
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += abouts[0].zdy2;
		}else{
			contentStr += abouts[0].content;
		}
		$("#content").html(contentStr);
		$("#date").html(abouts[0].zdy2);
	});
}

function getchengzhang(){
	var typeid = getParameter("menuid");
	if(typeid == 7){
		typeid=23;
	}
	var param = {
		'idtype': 'content',
		'typeid': typeid
	};
	$.post("about/list.action",param,function(res){
		var abouts = res.abouts;
		var contentStr = "";
		var content = "";
		if(abouts[0].id == 0){
			contentStr += "<h5>"+ abouts[0].zdy2 +"</h5>";
		}else{
			contentStr += "<h5>"+ abouts[0].content +"</h5>";
		}
		$("#content").html(contentStr);
	});
}

function gettypeproductnew(page,limit){
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
	$.post("lab/list.action",params,function(res) {
		var labs = res.labs;
		var contentStr = "";
		if(labs[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ labs[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<labs.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='productnewdetail.html?id="+ labs[i].id +"'><span class=anchorjs-icon>"+ labs[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ labs[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		if(labs[0].zdy6 != '' && labs[0].zdy6 != null){
			var len = labs[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(labs[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ labs[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeproductnewcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("lab/list.action",params,function(res) {
		var labs = res.labs;
		var contentStr = "";
		if(labs[0].id == 0)
		{ 
			contentStr = "<li>"+ labs[0].title +"</li>";
		}else{	
			for(var i=0;i<labs.length;i++){
				contentStr = "<h4>"+ labs[0].title +"</h4>"
                    			+"<h5>"+ labs[0].zdy2 +"</h5>"
                    			+ labs[0].content;
			}
		}
		if(labs[0].zdy6 != '' && labs[0].zdy6 != null){
			var len = labs[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(labs[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ labs[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#content").html(contentStr);
		document.title = labs[0].title;
	});
}

function gettypeaboutnew(page,limit){
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
	$.post("innerpublication/list.action",params,function(res) {
		var innerpublications = res.innerpublications;
		var contentStr = "";
		if(innerpublications[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ innerpublications[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<innerpublications.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='aboutnewdetail.html?id="+ innerpublications[i].id +"'><span class=anchorjs-icon>"+ innerpublications[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ innerpublications[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		if(innerpublications[0].zdy6 != '' && innerpublications[0].zdy6 != null){
			var len = innerpublications[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(innerpublications[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ innerpublications[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeaboutnewcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("innerpublication/list.action",params,function(res) {
		var innerpublications = res.innerpublications;
		var contentStr = "";
		if(innerpublications[0].id == 0)
		{ 
			contentStr = "<li>"+ innerpublications[0].title +"</li>";
		}else{	
			for(var i=0;i<innerpublications.length;i++){
				contentStr = "<h4>"+ innerpublications[0].title +"</h4>"
                    			+"<h5>"+ innerpublications[0].zdy2 +"</h5>"
                    			+ innerpublications[0].content;
			}
		}
		if(innerpublications[0].zdy6 != '' && innerpublications[0].zdy6 != null){
			var len = innerpublications[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(innerpublications[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ innerpublications[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#content").html(contentStr);
		document.title = innerpublications[0].title;
	});
}

function gettypesocialresponsibilitynew(page,limit){
	var typeid = getParameter("menuid");
	if(typeid==15){
		typeid = 38;
	}
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'allwithlimit',
			'typeid':typeid,
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ socialresponsibilitys[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='socialresponsibilitynewdetail.html?id="+ socialresponsibilitys[i].id +"'><span class=anchorjs-icon>"+ socialresponsibilitys[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ socialresponsibilitys[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		if(socialresponsibilitys[0].zdy6 != '' && socialresponsibilitys[0].zdy6 != null){
			var len = socialresponsibilitys[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(socialresponsibilitys[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ socialresponsibilitys[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages.replace(/socialresponsibility/g,'gongyi'));
	});
}

function gettypesocialresponsibilitynewcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("socialresponsibility/list.action",params,function(res) {
		var socialresponsibilitys = res.socialresponsibilitys;
		var contentStr = "";
		if(socialresponsibilitys[0].id == 0)
		{ 
			contentStr = "<li>"+ socialresponsibilitys[0].title +"</li>";
		}else{	
			for(var i=0;i<socialresponsibilitys.length;i++){
				contentStr = "<h4>"+ socialresponsibilitys[0].title +"</h4>"
                    			+"<h5>"+ socialresponsibilitys[0].zdy2 +"</h5>"
                    			+ socialresponsibilitys[0].content;
			}
		}
		if(socialresponsibilitys[0].zdy6 != '' && socialresponsibilitys[0].zdy6 != null){
			var len = socialresponsibilitys[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(socialresponsibilitys[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ socialresponsibilitys[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#content").html(contentStr);
		document.title = socialresponsibilitys[0].title;
	});
}

function gettypenewsnew(page,limit){
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
	$.post("news/list.action",params,function(res) {
		var newss = res.newss;
		var contentStr = "";
		if(newss[0].id == 0)
		{ 
			contentStr = "<li>"+ newss[0].title +"</li>";
		}else{	
			for(var i=0;i<newss.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='newsnewdetail.html?id="+ newss[i].id +"'><span class=anchorjs-icon>"+ newss[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ newss[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
		}
		if(newss[0].zdy6 != '' && newss[0].zdy6 != null){
			var len = newss[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(newss[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ newss[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypenewsnewcontent(id){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
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
				contentStr = "<h4>"+ newss[0].title +"</h4>"
			    			+"<h5>"+ newss[0].zdy2 +"</h5>"
			    			+ newss[0].content;
			}
		}
		if(newss[0].zdy6 != '' && newss[0].zdy6 != null){
			var len = newss[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(newss[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ newss[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#content").html(contentStr);
	});
}

function gettypeoverseanew(page,limit){
	var typeid = getParameter("menuid");
	if(typeid == 16){
		typeid=43;
	}
	if(page == 0){
		page = 1;
	}
	var params = {
			'idtype':'allwithlimit',
			'typeid':typeid,
			'start': (page-1)*limit,
			'limit': limit,
			'page': 1
		 };
	$.post("oversea/list.action",params,function(res) {
		var overseas = res.overseas;
		var contentStr = "";
		if(overseas[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ overseas[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<overseas.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='overseanewdetail.html?id="+ overseas[i].id +"'><span class=anchorjs-icon>"+ overseas[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ overseas[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		if(overseas[0].zdy6 != '' && overseas[0].zdy6 != null){
			var len = overseas[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(overseas[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ overseas[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettypeoverseanewcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("oversea/list.action",params,function(res) {
		var overseas = res.overseas;
		var contentStr = "";
		if(overseas[0].id == 0)
		{ 
			contentStr = "<li>"+ overseas[0].title +"</li>";
		}else{	
			for(var i=0;i<overseas.length;i++){
				contentStr = "<h4>"+ overseas[0].title +"</h4>"
                    			+"<h5>"+ overseas[0].zdy2 +"</h5>"
                    			+ overseas[0].content;
			}
		}
		if(overseas[0].zdy6 != '' && overseas[0].zdy6 != null){
			var len = overseas[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(overseas[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ overseas[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#content").html(contentStr);
		document.title = overseas[0].title;
	});
}

function gettyperelationshipnew(page,limit){
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
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<tbody><tr><td>"+ relationships[0].title +"</td></tr></tbody>";
		}else{	
			contentStr += "<tbody>";
			for(var i=0;i<relationships.length;i++){
				contentStr += "<tr><td><h4><a class='anchorjs-link' href='relationshipnewdetail.html?id="+ relationships[i].id +"'><span class=anchorjs-icon>"+ relationships[i].title +"</span></a></h4></td>";
				contentStr += "<td class='type-info'><h4>"+ relationships[i].zdy2 +"</h4></td>";			
				contentStr += "</tr>";
			}
			contentStr += "</tbody>";
		}
		if(relationships[0].zdy6 != '' && relationships[0].zdy6 != null){
			var len = relationships[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(relationships[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ relationships[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#contentlist").html(contentStr);
		$("#pagelist").html(res.pages);
	});
}

function gettyperelationshipnewcontent(){
	var params = {
			'idtype':'content',
			'typeid':getParameter("id"),
			'start': 0,
			'limit': 1,
			'page': 1
		 };
	$.post("relationship/list.action",params,function(res) {
		var relationships = res.relationships;
		var contentStr = "";
		if(relationships[0].id == 0)
		{ 
			contentStr = "<li>"+ relationships[0].title +"</li>";
		}else{	
			for(var i=0;i<relationships.length;i++){
				contentStr = "<h4>"+ relationships[0].title +"</h4>"
                    			+"<h5>"+ relationships[0].zdy2 +"</h5>"
                    			+ relationships[0].content;
			}
		}
		if(relationships[0].zdy6 != '' && relationships[0].zdy6 != null){
			var len = relationships[0].zdy6.split("_").length;
			$("#innercurrentmenu").html(relationships[0].zdy6.split("_")[len-1]);
			var innermenu = "<li><a href='index.html'>首页</a></li>";
			for(var i=0;i<len;i++){
				innermenu += "<li><a href='#'>"+ relationships[0].zdy6.split("_")[i] +"</a></li>";
			}
			$("#innermenu").html(innermenu);
		}
		$("#content").html(contentStr);
		document.title = relationships[0].title;
	});
}
