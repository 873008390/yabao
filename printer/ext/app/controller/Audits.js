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
    		'auditcontentlist button[action=audit]':{
              	click: this.auditClick
            },
            'supplierlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            }
            
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	var store = o.getStore();
    	var downgrid = Ext.getCmp('auditlogGrid');
		var downstore = downgrid.getStore();
		downstore.getProxy().url = "auditgroup/loglist.action?idtype=supplier&typeid="+ store.getAt(rowIndex).get('id');
		downstore.load();
		
		Ext.getCmp('supplierno').setValue(store.getAt(rowIndex).get('supplierno'));
		Ext.getCmp('address').setValue(store.getAt(rowIndex).get('address'));
		Ext.getCmp('contactperson').setValue(store.getAt(rowIndex).get('contactperson'));
		Ext.getCmp('phoneno').setValue(store.getAt(rowIndex).get('phoneno'));
		Ext.getCmp('tel').setValue(store.getAt(rowIndex).get('tel'));
		Ext.getCmp('bankaccount').setValue(store.getAt(rowIndex).get('bankaccount'));
		Ext.getCmp('bank').setValue(store.getAt(rowIndex).get('bank'));
		Ext.getCmp('bankname').setValue(store.getAt(rowIndex).get('bankname'));
		Ext.getCmp('fax').setValue(store.getAt(rowIndex).get('fax'));
		Ext.getCmp('companycode').setValue(store.getAt(rowIndex).get('companycode'));
		Ext.getCmp('taxrate').setValue(store.getAt(rowIndex).get('taxrate'));
		Ext.getCmp('id').setValue(store.getAt(rowIndex).get('id'));
		Ext.getCmp('name').setValue(store.getAt(rowIndex).get('name'));
		Ext.getCmp('currentauditgroup').setValue(store.getAt(rowIndex).get('zdy4'));
		Ext.getCmp('currentaudituser').setValue(store.getAt(rowIndex).get('zdy5'));
		if(store.getAt(rowIndex).get('type') == 1){
			Ext.getCmp('type').setValue("公司");
		}else{
			Ext.getCmp('type').setValue("个人");
		}
		
		Ext.getCmp('invoicetype').setValue(store.getAt(rowIndex).get('invoicetype'));
		Ext.getCmp('taxtype').setValue(store.getAt(rowIndex).get('taxtype'));
    },
    
    auditClick: function(o){
    	if(Ext.getCmp('id').getValue() == ''){
    		Ext.Msg.alert("温馨提示", "请选择供应商");
    	}else{
    		if(Ext.getCmp('operation').getValue() == '' || Ext.getCmp('operation').getValue() == null){
    			Ext.Msg.alert("温馨提示", "请选择审核结果");
    		}else{
    			if(Ext.getCmp('operation').getValue() == '拒绝' && (Ext.getCmp('memo').getValue() == '' || Ext.getCmp('memo').getValue() == null)){
    				Ext.Msg.alert("温馨提示", "请输入审核意见");
    			}else{
    				Ext.Msg.show({
    		   		     title:'温馨提示',
    		   		     msg: '确定审核：'+ Ext.getCmp('name').getValue() +' ？',
    		   		     buttons: Ext.Msg.OKCANCEL,
    		   		     icon: Ext.Msg.QUESTION,
    		   		     buttonText:{ok:'确定',cancel: '取消'},
    		   		     fn:function(btn){
    		   		    	 if(btn == 'ok') {
    		   		    		 Ext.getBody().mask("数据处理中，请稍等");
    		   		             var result = "";
    		   		             Ext.Ajax.request({
    		   		    				url: 'supplier/audit.action?supplier.id='+ Ext.getCmp('id').getValue() +"&supplier.zdy2="+ Ext.getCmp('memo').getValue() +"&supplier.zdy3="+ Ext.getCmp('operation').getValue(),
    		   		    				method: 'GET',
    		   		    				timeout: 4000,
    		   		    				success: function(response,opts){
    		   		    					var result = Ext.JSON.decode(response.responseText);
    		   		    					Ext.Msg.alert("温馨提示",result.result);
    		   		    					if(result.result == "审核成功"){
    		   		    						var grid = Ext.getCmp('auditlogGrid');
    		   		    						var store = grid.getStore();
    		   		    						store.reload();
    		   		    						grid = Ext.getCmp('supplierGrid');
    		   		    						store = grid.getStore();
    		   		    						store.reload();
    		   		    					}
    		   	    			    	    Ext.getBody().unmask();
    		   		    				},
    		   		    				failure: function(response,opts){
    		   		    					var result = Ext.JSON.decode(response.responseText);
    		   		    					Ext.Msg.alert("温馨提示",result.result);
    		   	    			    	    Ext.getBody().unmask();
    		   		    				}
    		   		    		 });	 
    		   		    	 }
    		   		     }
    		   		});
    			}
    		}    		
    	}
    }
});