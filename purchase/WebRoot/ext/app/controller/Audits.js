Ext.define('M.controller.Audits', {
    extend: 'Ext.app.Controller',

    stores: [
             'Suppliers-myauditing',
             'Auditlogs'
         ],
    
    models: ['Supplier','Auditlog'],
         
    views: [
            'audit.SupplierList',
            'audit.AuditcontentList',
            'audit.AuditlogList'
        ],
       
    init: function() {
    	this.control({
    		'supplierlist' : {
    			itemdblclick: this.informationClick
    		},
    		'auditcontentlist button[action=audit]':{
              	click: this.auditClick
            },
            'auditcontentlist button[action=back]':{
              	click: this.backClick
            },
            'supplierlist button[id=information]':{
           	 	click: this.informationClick
            },
            'supplierlist button[id=log]':{
           	 	click: this.logClick
            }
            
        });
    },
    
    backClick:function(o){
    	history.back();
    },
    
    logClick:function(o){
    	var grid = o.up('supplierlist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		
	    	}else{
	    		self.location = "supplierauditloglist.html?idtype=supplier&typeid="+ record.get('id');
	    	}
    	}else{
    		alert("��ѡ��Ӧ��");
    	}
    },
    
    informationClick: function(o){
    	var grid = o.up('supplierlist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		
	    	}else{
	    		self.location = "auditsupplier.html?idtype=supplier&typeid="+ record.get('id');
//	    		var downgrid = Ext.getCmp('auditlogGrid');
//	    		var downstore = downgrid.getStore();
//	    		downstore.getProxy().url = "auditgroup/loglist.action?idtype=supplier&typeid="+ record.get('id');
//	    		downstore.load();
	    		
//	    		Ext.getCmp('supplierno').setValue(record.get('supplierno'));
//	    		Ext.getCmp('address').setValue(record.get('address'));
//	    		Ext.getCmp('contactperson').setValue(record.get('contactperson'));
//	    		Ext.getCmp('phoneno').setValue(record.get('phoneno'));
//	    		Ext.getCmp('tel').setValue(record.get('tel'));
//	    		Ext.getCmp('bankaccount').setValue(record.get('bankaccount'));
//	    		Ext.getCmp('bank').setValue(record.get('bank'));
//	    		Ext.getCmp('bankname').setValue(record.get('bankname'));
//	    		Ext.getCmp('fax').setValue(record.get('fax'));
//	    		Ext.getCmp('companycode').setValue(record.get('companycode'));
//	    		Ext.getCmp('taxrate').setValue(record.get('taxrate'));
//	    		Ext.getCmp('id').setValue(record.get('id'));
//	    		Ext.getCmp('name').setValue(record.get('name'));
////	    		Ext.getCmp('currentauditgroup').setValue(record.get('zdy4'));
////	    		Ext.getCmp('currentaudituser').setValue(record.get('zdy5'));
//	    		if(record.get('type') == 1){
//	    			Ext.getCmp('type').setValue("��˾");
//	    		}else{
//	    			Ext.getCmp('type').setValue("����");
//	    		}
//	    		
//	    		Ext.getCmp('invoicetype').setValue(record.get('invoicetype'));
//	    		Ext.getCmp('taxtype').setValue(record.get('taxtype'));
	    	}
    	}else{
    		alert("��ѡ��Ӧ��");
    	}
    	
    },
    
    auditClick: function(o){
    	if(Ext.getCmp('id').getValue() == ''){
    		alert("��ܰ��ʾ:��ѡ��Ӧ��");
    	}else{
    		if(Ext.getCmp('operation').getValue() == '' || Ext.getCmp('operation').getValue() == null){
    			alert("��ܰ��ʾ:��ѡ����˽��");
    		}else{
    			if(Ext.getCmp('operation').getValue() == '�ܾ�' && (Ext.getCmp('memo').getValue() == '' || Ext.getCmp('memo').getValue() == null)){
    				alert("��ܰ��ʾ:������������");
    			}else{
    				Ext.getBody().mask("���ݴ����У����Ե�");
  		             var result = "";
  		             Ext.Ajax.request({
  		    				url: 'supplier/audit.action?supplier.id='+ Ext.getCmp('id').getValue() +"&supplier.zdy2="+ Ext.getCmp('memo').getValue() +"&supplier.zdy3="+ Ext.getCmp('operation').getValue(),
  		    				method: 'GET',
  		    				timeout: 4000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("��ܰ��ʾ:"+result.result);
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
    	}
    }
});