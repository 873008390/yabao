Ext.define('M.controller.Supplierfiles', {
    extend: 'Ext.app.Controller',

    stores: [
             'Supplierfiles'
         ],
    
    models: ['Supplier','Supplierfile', 'Auditlog'],
         
    views: [
            'supplier.SupplierList',
            'supplier.SupplierfileList',
            'supplier.AuditlogList'
        ],
       
    init: function() {
    	this.control({
            'supplierfilelist button[id=deletefile]':{
           	 	click: this.deletefileClick
            },
            'supplierfilelist button[id=fileback]':{
           	 	click: this.filebackClick
            }
        });
    },
    
    filebackClick: function(o){
    	history.back();
    },
    deletefileClick: function(o){
    	var grid = o.up('supplierfilelist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
    		var store = grid.getStore();
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		store.reload();
	    	}else{
	    		var message = confirm("ȷ��Ҫɾ����"+ record.get('zdy10') +"��");
	    		if(message == true){
	    			Ext.getBody().mask("���ݴ����У����Ե�");
  		             var result = "";
  		             Ext.Ajax.request({
  		    				url: 'supplier/deletefile.action?supplierfileid='+ record.get('id'),
  		    				method: 'GET',
  		    				timeout: 4000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("��ܰ��ʾ:"+result.result);
  		    					if(result.result == "ɾ���ɹ�"){
  		    						store.reload();
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
    	}else{
    		alert("��ѡ���ļ�");
    	}
    }
});