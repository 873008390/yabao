Ext.define('M.controller.Contactuss', {
    extend: 'Ext.app.Controller',

    stores: [
             'Contactuss'
         ],
    
    models: ['Contactus'],
         
    views: [
            'contactus.ContactusList'
        ],
       
    init: function() {
    	this.control({
    		'contactuslist button[id=save]': {
                click: this.updateContactus
            }
        });
    },
    
    updateContactus: function(o) {
    	var grid = o.up('contactuslist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('address') == '' || model.get('address') == null){
    			isok = 0;
    			err = "��ַ����Ϊ��";
    		}
    		if(model.get('tel') == '' || model.get('tel') == null){
    			isok = 0;
    			err = "�绰����Ϊ��";
    		}
    		if(model.get('fax') == '' || model.get('fax') == null){
    			isok = 0;
    			err = "���治��Ϊ��";
    		}
    		if(model.get('email') == '' || model.get('email') == null){
    			isok = 0;
    			err = "���䲻��Ϊ��";
    		}
    		if(model.get('postcode') == '' || model.get('postcode') == null){
    			isok = 0;
    			err = "�������벻��Ϊ��";
    		}
    		data.push(Ext.JSON.encode(model.data));
    	});
    	//alert(data);
    	if(isok == 0){
    		Ext.Msg.alert('��ܰ��ʾ',err);
    		cellEdit.enable();
    		cellEdit.startEditByPosition({
     			row:0,
     			column:0
     		});
    	}else{
    		if(data.length>0){
   			    Ext.Ajax.request({
    				url: '../contact/add.action?contact.zdy10='+ escape(data),
    				method: 'GET',
    				timeout: 4000,
    				success: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("��ܰ��ʾ",result.result);
    					if(result.result == "����ɹ�"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("��ܰ��ʾ",result.result);
    				}
    			});
    		}else{
    			Ext.Msg.alert("��ܰ��ʾ","δ�Ķ������豣��");
    		}
    	} 
    }
});