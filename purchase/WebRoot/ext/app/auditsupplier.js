Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Auditgroups'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    split: true,
        	    bodyStyle: 'padding:0px'
        	},
        	items: [{
        	    title: '审核供应商',
        	    region: 'north',
        	    height:500,
        	    cmargins: '0 0 0 0',
        	    xtype: 'auditcontentlist'
        	}]
        });
        getData();
    }
});

function getData(){
	var params ={
			'idtype': "id",
			'typeid': getParameter("typeid")
	};
	$.post("supplier/list.action", params, function(res){
		var record = res.suppliers[0];
		Ext.getCmp('supplierno').setValue(record.supplierno);
		Ext.getCmp('address').setValue(record.address);
		Ext.getCmp('contactperson').setValue(record.contactperson);
		Ext.getCmp('phoneno').setValue(record.phoneno);
		Ext.getCmp('tel').setValue(record.tel);
		Ext.getCmp('bankaccount').setValue(record.bankaccount);
		Ext.getCmp('bank').setValue(record.bank);
		Ext.getCmp('bankname').setValue(record.bankname);
		Ext.getCmp('fax').setValue(record.fax);
		Ext.getCmp('companycode').setValue(record.companycode);
		Ext.getCmp('taxrate').setValue(record.taxrate);
		Ext.getCmp('id').setValue(record.id);
		Ext.getCmp('name').setValue(record.name);
//		Ext.getCmp('currentauditgroup').setValue(record.get('zdy4'));
//		Ext.getCmp('currentaudituser').setValue(record.get('zdy5'));
		if(record.get('type') == 1){
			Ext.getCmp('type').setValue("公司");
		}else{
			Ext.getCmp('type').setValue("个人");
		}
		
		Ext.getCmp('invoicetype').setValue(record.invoicetype);
		Ext.getCmp('taxtype').setValue(record.taxtype);
	});
}