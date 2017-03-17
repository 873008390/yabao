Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Catalogs'
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
        	    title: 'һ����Ŀ',
        	    region: 'west',
        	    width: 400,
        	    cmargins: '0 0 0 0',
        	    xtype: 'cataloglist'
        	},{
        	    title: '������Ŀ',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'catalogdownlist'
        	}]
        });
    }
});

function reloadstore(newurl){
	var grid = Ext.getCmp("cataloguserGrid");
	var store = grid.getStore();
	var records = store.getNewRecords();
	var records1 = store.getUpdatedRecords();
	
	records = records.concat(records1);
	if(records == null || records == ''){
		store.getProxy().url = newurl; 
		store.load();
	}else{
		var message = confirm("��ܰ����:����δ�������ݣ��Ƿ����������");
		if(message == true){
			store.getProxy().url = newurl; 
			store.load();
		}
	}
}