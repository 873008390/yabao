wx.ready(function () {
	if(window.location.href.indexOf("code=")>-1){
		$('#code').val(window.location.href.split("code=")[1]);
	}	
	document.querySelector('#login').onclick = function(){
		window.location = "scan.html?code="+ $('#code').val();
	};
});