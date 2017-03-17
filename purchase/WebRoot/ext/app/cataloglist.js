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
        	    title: '一级栏目',
        	    region: 'west',
        	    width: 400,
        	    cmargins: '0 0 0 0',
        	    xtype: 'cataloglist'
        	},{
        	    title: '二级栏目',
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
		var message = confirm("温馨提醒:存在未保存数据，是否继续搜索？");
		if(message == true){
			store.getProxy().url = newurl; 
			store.load();
		}
	}
}