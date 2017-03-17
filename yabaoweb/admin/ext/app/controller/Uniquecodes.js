Ext.define('M.controller.Uniquecodes', {
    extend: 'Ext.app.Controller',

    stores: [
             'Uniquecodes',
             'Uniquecodedetails'
         ],
    
    models: [
             'Uniquecode',
             'Uniquecodedetail'
            ],
         
    views: [
            'uniquecode.UniquecodeList',
            'uniquecode.UniquecodedetailList'
        ],
       
    init: function() {
    	this.control({
    		'uniquecodelist actioncolumn[id=delete]':{

           	 	click: this.deleteClick
            },
            'uniquecodelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'uniquecodelist button[id=add]':{
              	click: this.addClick
               },
            'uniquecodelist button[id=save]': {
                click: this.updateUniquecode
            },
            'uniquecodedetaillist button[id=search]': {
                click: this.searchClick
            }
        });
    },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('uniquecodedetaillist');
		var store = grid.getStore();
		store.getProxy().url = "uniquecode/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('uniquecodedetailGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "uniquecode/list.action?idtype=idwithlimit&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'��ܰ��ʾ',
	   		     msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('zdy2') +' ��',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("���ݴ����У����Ե�");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'uniquecode/generatedelete.action?uniquecodegenerateid='+ store.getAt(rowIndex).get('id'),
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
	 
	addClick: function(o){
		var rec = new M.model.Uniquecode();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('uniquecodelist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateUniquecode: function(o) {
    	var grid = o.up('uniquecodelist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('zdy3') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "�����Ϊ��";
    		}
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			isok = 0;
    			err = "��Ʒ����Ϊ��";
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
    			Ext.getBody().mask("���ݴ����У����Ե�");
   			    Ext.Ajax.request({
    				url: 'uniquecode/generateadd.action?uniquecodegenerate.zdy10='+ escape(data),
    				method: 'GET',
    				timeout: 30000,
    				success: function(response,opts){
   			    	    Ext.getBody().unmask();
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("��ܰ��ʾ",result.result);
    					if(result.result == "����ɹ�"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
   			    	    Ext.getBody().unmask();
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