Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Suppliers'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    split: true,
        	    bodyStyle: 'padding:0px',
        	    xtype: 'supplierlist'
        	},
        	items: [{
        	    title: '供应商',
        	    region: 'north',
        	    height: 300,
        	    cmargins: '0 0 0 0'
        	},
            {
                title: '项目类型',
                region:'east',
        	    margins: '0 0 0 0',
        	    cmargins: '5 5 0 0',
        	    width: 400,
                xtype: 'suppliercataloglist'
            },
        	{
        	    title: '资质文件',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'supplierfilelist'
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
		Ext.Msg.confirm("温馨提醒","存在未保存数据，是否继续搜索？",function(btn){
			if(btn == 'yes'){
				store.getProxy().url = newurl;  
			    store.load();
			}
		});
	}
}