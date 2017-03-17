Ext.define('M.controller.Provinces', {
    extend: 'Ext.app.Controller',

    stores: [
             'Provinces'
         ],
    
    models: ['Province'],
         
    views: [
            'province.ProvinceList'
        ],
       
    init: function() {
    	this.control({
    		'provincelist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'provincelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'provincelist button[id=add]':{
              	click: this.addClick
               },
            'provincelist button[id=save]': {
                click: this.updateProvince
            }
        });
    },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		var message = confirm("ȷ��Ҫɾ����"+ store.getAt(rowIndex).get('name') +" ��");
    		if(message == true){
    			 Ext.getBody().mask("���ݴ����У����Ե�");
	             var result = "";
	             Ext.Ajax.request({
	    				url: 'province/delete.action?provinceid='+ store.getAt(rowIndex).get('id'),
	    				method: 'GET',
	    				timeout: 4000,
	    				success: function(response,opts){
	    					var result = Ext.JSON.decode(response.responseText);
	    					alert("��ܰ��ʾ:"+result.result);
	    					if(result.result == "ɾ���ɹ�"){
	    						store.removeAt(rowIndex);
	    					}
    			    	    Ext.getBody().unmask();
	    				},
	    				failure: function(response,opts){
	    					var result = Ext.JSON.decode(response.responseText);
	    					alert("��ܰ��ʾ:"+result.result);
    			    	    Ext.getBody().unmask();
	    				}
	    		 });
    		}
    	}
    },
	 
	addClick: function(o){
		var rec = new M.model.Province();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('provincelist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateProvince: function(o) {
    	var grid = o.up('provincelist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('name') == '' || model.get('name') == null){
    			isok = 0;
    			err = "���Ʋ���Ϊ��";
    		}
    		data.push(Ext.JSON.encode(model.data));
    	});
    	if(isok == 0){
    		alert("��ܰ��ʾ:"+err);
    		cellEdit.enable();
    		cellEdit.startEditByPosition({
     			row:0,
     			column:0
     		});
    	}else{
    		if(data.length>0){
   			    Ext.Ajax.request({
    				url: 'province/add.action?province.zdy10='+ escape(data),
    				method: 'GET',
    				timeout: 4000,
    				success: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					alert("��ܰ��ʾ:"+result.result);
    					if(result.result == "����ɹ�"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					alert("��ܰ��ʾ:"+result.result);
    				}
    			});
    		}else{
    			alert("��ܰ��ʾ:δ�Ķ������豣��");
    		}
    	} 
    }
});