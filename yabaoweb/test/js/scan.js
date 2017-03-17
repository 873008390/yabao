var i = 1;
var timeInterval;
wx.ready(function () {
	if(window.location.href.indexOf("code=") > -1){
		if(window.location.href.split("code=")[1].substr(0,1) == 'B'){
			$('#boxcodes').html(window.location.href.split("code=")[1]);
		}else{
			$('#codes').html("<p id='c1'>"+ window.location.href.split("code=")[1] +"</p>");
		}
	}
	scan();
	document.querySelector('#continuescan').onclick = function(){
		i = 1;
		scan();
	};
	document.querySelector('#save').onclick = function(){
		if($('#boxcodes').html() == '-'){
			alert("请扫码箱码");
		}
		if($('#codes').html() == '-'){
			alert("请扫码瓶码/盒码");
		}else{
			var scaned = $('#codes').html().split("</p>").length -1;
			var total = $('#total').html();
			if(scaned != total){
				alert("已扫码数量与预设总数不符，请核对");
			}
		}
	};
});

function scan(){
	var scaned = $('#codes').html().split("</p>").length -1;
	var total = $('#total').html();
	if(scaned == total && $('#boxcodes').html() != '-'){
		alert("已扫码完成");
		i = 0;
	}else{
		if(i == 1){
			i = 0;
			wx.scanQRCode({
			      needResult: 1,
			      desc: 'scanQRCode desc',
			      success: function (res) {
			    	  var obj = eval("("+ JSON.stringify(res) +")")
			    	  var code = "1";
			    	  var boxcode = "1";
			    	  if(obj.resultStr.indexOf("code=") > -1){
			    		  if(obj.resultStr.split("code=")[1].substr(0,1) == 'B'){
			    			  boxcode = obj.resultStr.split("code=")[1];
			    		  }else if(scaned != total){
			    			  code = obj.resultStr.split("code=")[1];
			    		  }
			    	  }
			    	  if(boxcode != '1'){
				    	  $('#boxcodes').html(boxcode);
			    	  }
			    	  if(code != '1'){
				    	  if($('#codes').html() == '-' || $('#codes').html() == ''){
				    		  $('#codes').html("<p id='c1'>"+ code +"</p>");
				    	  }else{
				    		  if($('#codes').html() != ">"+ code +"</p>" && (";"+$('#codes').html()).indexOf(">"+ code +"</p>") == -1){
				    			  var num = $('#codes').html().split("</p>").length;
				    			  $('#codes').html($('#codes').html() +"<p id='c"+ num +"'>"+ code +"</p>");
				    		  }
				    	  }
			    	  }
			    	  i = 1;
			    	  senddata(code);
			    	  setTimeout(scan, 1000);
			      }
			});
		}
	}	
}
function senddata(code){
	var xmlhttp;
	   xmlhttp=null;
	   if (window.XMLHttpRequest)
	   {// code for Firefox, Mozilla, IE7, etc.
	   	xmlhttp=new XMLHttpRequest();
	   }else if (window.ActiveXObject)
	   {// code for IE6, IE5
	   	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	   }
	   if (xmlhttp!=null)
	   {
	   	  xmlhttp.onreadystatechange=state_Change;
	   	  xmlhttp.open("post","../user/list?code="+ code,true);
	   	  xmlhttp.send(null);
	   }	

	   function state_Change()
	   {
	   	if (xmlhttp.readyState==4)
	   	{// 4 = "loaded"
	   		if (xmlhttp.status==200)
	   		  {// 200 = "OK"
	   			  
	   		  }	  
	   	}
	   }
}