Ext.define('M.controller.Doctors', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customers'
         ],
    
    models: ['Customer'],
         
    views: [
            'doctor.DoctorList'
        ],
       
    init: function() {
    	this.control({
    		'doctorlist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'doctorlist button[id=add]':{
              	click: this.addClick
            },
            'doctorlist button[id=save]': {
                click: this.updateClick
            },
            'doctorlist button[id=report]': {
                click: this.reportClick
            },
            'doctorlist button[id=search]': {
                click: this.searchClick
            }
        });
    },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('doctorlist');
		var store = grid.getStore();
		store.getProxy().url = "customer/list.action?idtype=search&typeid=2_"+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'��ܰ��ʾ',
	   		     msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('name') +'��',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("���ݴ����У����Ե�");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'customer/delete.action?customerid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("��ܰ��ʾ",result.result);
	   		    					if(result.result == "ɾ���ɹ�"){
	   		    						store.removeAt(rowIndex);
	   		    					}
	   	    			    	    Ext.getBody().unmask();
	   		    				},
	   		    				failure: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("��ܰ��ʾ",result.result);
	   	    			    	    Ext.getBody().unmask();
	   		    				}
	   		    		 });	 
	   		    	 }
	   		     }
	   		});
    	}
    },
	 
	reportClick: function(o){
		self.location = 'doctorreportlist.html';
	 },
	 
	addClick: function(o){
		var rec = new M.model.Customer();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('doctorlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateClick: function(o) {
    	var grid = o.up('doctorlist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			isok = 0;
    			err = "ҵ��Ա����Ϊ��";
    		}
    		if(model.get('zdy6') == '' || model.get('zdy6') == null){
    			isok = 0;
    			err = "����ҽԺ����Ϊ��";
    		}
    		if(model.get('name') == '' || model.get('name') == null){
    			isok = 0;
    			err = "��������Ϊ��";
    		}
    		if(model.get('zdy3') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "ʡ�ݲ���Ϊ��";
    		}
    		if(model.get('zdy4') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "���в���Ϊ��";
    		}
    		if((model.get('phoneno') == '' || model.get('phoneno') == null) && (model.get('tel') == '' || model.get('tel') == null)){
    			isok = 0;
    			err = "�ֻ��͵绰����ͬʱΪ��";
    		}
    		model.set('type', 2);
    		model.set('age', 0);
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
    				url: 'customer/add.action?customer.zdy10='+ escape(data),
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