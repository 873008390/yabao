/*
   * ע�⣺
   * 1. ���е�JS�ӿ�ֻ���ڹ��ںŰ󶨵������µ��ã����ںſ�������Ҫ�ȵ�¼΢�Ź���ƽ̨���롰���ں����á��ġ��������á�����д��JS�ӿڰ�ȫ��������
   * 2. ��������� Android ���ܷ����Զ������ݣ��뵽�����������µİ����ǰ�װ��Android �Զ������ӿ��������� 6.0.2.58 �汾�����ϡ�
   * 3. �������⼰���� JS-SDK �ĵ���ַ��http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * ������������������ĵ�����¼5-�������󼰽���취�����������δ�ܽ����ͨ����������������
   * �����ַ��weixin-open@qq.com
   * �ʼ����⣺��΢��JS-SDK��������������
   * �ʼ�����˵�����ü��������������������ڣ��������������������ĳ������ɸ��Ͻ���ͼƬ��΢���Ŷӻᾡ�촦����ķ�����
   */
   var appid;
   var timestamp;
   var nonceStr;
   var signature;
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
   	  xmlhttp.open("post","../weixin/jslist?url="+ window.location.href +"&corporationid=1",true);
   	  xmlhttp.send(null);
   }	

   function state_Change()
   {
   	if (xmlhttp.readyState==4)
   	{// 4 = "loaded"
   		if (xmlhttp.status==200)
   		  {// 200 = "OK"
   			  //alert("1");
   			  var obj = eval("("+xmlhttp.responseText+")");	  
   			  appid = obj.appid;
   			  timestamp = obj.timestamp;
   			  nonceStr = obj.nonceStr;
   			  signature = obj.signature;
   		   	  
   			  //alert("ok");
   			  
   			  wx.config({
   			      debug: true,
   			      appId: appid,
   			      timestamp: timestamp,
   			      nonceStr: nonceStr,
   			      signature: signature,
   			      jsApiList: [
   			        'checkJsApi',
   			        'onMenuShareTimeline',
   			        'onMenuShareAppMessage',
   			        'onMenuShareQQ',
   			        'onMenuShareWeibo',
   			        'onMenuShareQZone',
   			        'hideMenuItems',
   			        'showMenuItems',
   			        'hideAllNonBaseMenuItem',
   			        'showAllNonBaseMenuItem',
   			        'translateVoice',
   			        'startRecord',
   			        'stopRecord',
   			        'onVoiceRecordEnd',
   			        'playVoice',
   			        'onVoicePlayEnd',
   			        'pauseVoice',
   			        'stopVoice',
   			        'uploadVoice',
   			        'downloadVoice',
   			        'chooseImage',
   			        'previewImage',
   			        'uploadImage',
   			        'downloadImage',
   			        'getNetworkType',
   			        'openLocation',
   			        'getLocation',
   			        'hideOptionMenu',
   			        'showOptionMenu',
   			        'closeWindow',
   			        'scanQRCode',
   			        'chooseWXPay',
   			        'openProductSpecificView',
   			        'addCard',
   			        'chooseCard',
   			        'openCard'
   			      ]
   			  });
   		  }	  
   	}
}