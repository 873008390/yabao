Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Supplier'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    header: false,
        	    split: true,
        	    bodyStyle: 'padding:0px',
        	    xtype: 'supplierlist'
        	},
        	items: [{
        	    title: '��Ӧ���б�',
        	    region: 'center',
        	    cmargins: '0 0 0 0'
        	}]
        });
    }
});

function reloadstore(newurl){
	var grid = Ext.getCmp("supplierGrid");
	var store = grid.getStore();
	var records = store.getNewRecords();
	var records1 = store.getUpdatedRecords();
	records = records.concat(records1);
	if(records == null || records == ''){
		store.getProxy().url = newurl;  
	    store.load();  
	}else{
		Ext.Msg.confirm("��ܰ����","����δ�������ݣ��Ƿ����������",function(btn){
			if(btn == 'yes'){
				store.getProxy().url = newurl;  
			    store.load();
			}
		});
	}
}