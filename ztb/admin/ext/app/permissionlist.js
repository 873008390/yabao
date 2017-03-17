Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Permissions'
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
        	    title: '�û�',
        	    region: 'west',
        	    width: 300,
        	    cmargins: '0 0 0 0',
        	    xtype: 'permissionuserlist'
        	},{
        	    title: 'Ȩ�޿�',
        	    region:'east',
        	    margins: '0 0 0 0',
        	    cmargins: '5 5 0 0',
        	    width: 200,
        	    xtype: 'permissionvaluelist'
        	},{
        	    title: 'Ȩ��',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'permissionlist'
        	}]
        });
    }
});

function reloadstore(newurl){
	var grid = Ext.getCmp("permissionuserGrid");
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