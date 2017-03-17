Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Pointrules'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout: {
        	    type: 'vbox',
        	    align : 'stretch',
        	    pack  : 'start'
        	},
            items: [
                    {
                    	xtype: 'pointrulelist',
                    	flex: 1
                    }]
        });
    }
});

function reloadstore(newurl){
	var grid = Ext.getCmp("pointruleGrid");
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