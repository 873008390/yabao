Ext.define('M.controller.Supplieradds', {
    extend: 'Ext.app.Controller',

    stores: [
             'Suppliers'
         ],
    
    models: ['Supplier'],
         
    views: [
            'supplier.SupplierAdd'
        ],
       
    init: function() {
    	this.control({
    		'supplieradd button[action=save]': {
                click: this.updateClick
            }
            
        });
    },

    updateClick: function(o) {
    	if(Ext.getCmp('name').getValue() == null || Ext.getCmp('name').getValue() == ''){
    		alert("��ܰ��ʾ:����������");
    	}else{
    		if(Ext.getCmp('iscompany').getValue() == null || Ext.getCmp('iscompany').getValue() == ''){
    			alert("��ܰ��ʾ:��ѡ������");
        	}else{
        		if(Ext.getCmp('taxrate').getValue() == null || Ext.getCmp('taxrate').getValue() == ''){
        			Ext.getCmp('taxrate').setValue('0');
            	}
	    		var form = o.up('form').getForm();
		        if (form.isValid()) {
		        	Ext.getBody().mask("���ݴ����У����Ե�");
		            form.submit({
		                success: function(form, action) {
			               Ext.getBody().unmask();
			               alert("��ܰ��ʾ:"+action.result.result);
		                   form.reset();
		                },
		                failure: function(form, action) {
		                    Ext.getBody().unmask();
		                    alert("��ܰ��ʾ:"+action.result.result);
		                }
		            });
		        }
        	}
    	}
    }
});