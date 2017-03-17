// JavaScript Document


$(function (){   

	$("#test a").click(function(){
		var index = $("#test a").index($(this));
		$.msgbox({
			closeImg: 'close.gif',
			height:600,
			width:1200,
			content:'outClose.html',
			type :'iframe',
		    title: '从外部关闭msgbox'
		});	
		// 外部关闭提示框代码:  最简单的方式 $.closemsgbox(top.window.document)
		// $.closemsgbox({
		// document : top.window.document,
		//  bgAnimate: true,    // 允许背景动画
		//  boxAnimate: true,  // 允许提示框动画
		//  onClose: function()  // 关闭时的事件
		//});
	});

$(".prev").click(function(){ 
  //根据curIndex进行上一个图片处理
  alert(1);
});


});  





