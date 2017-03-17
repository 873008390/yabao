Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Healthknowledges'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    split: true,
        	    bodyStyle: 'padding:0px',
        	    xtype: 'healthknowledgelist'
        	},
        	items: [{
        	    title: '文章',
        	    region: 'south',
        	    height: 300,
        	    cmargins: '0 0 0 0'
        	},{
        	    title: '用户',
        	    region:'west',
        	    margins: '0 0 0 0',
        	    cmargins: '5 5 0 0',
        	    width: 400,
        	    xtype: 'healthknowledgeuserlist'
        	},{
        	    title: '已读用户',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'healthknowledgereaduserlist'
        	}]
        });
    }
});

function reloadstore(newurl){
	var grid = Ext.getCmp("healthknowledgeGrid");
	var store = grid.getStore();
	var records = store.getNewRecords();
	var records1 = store.getUpdatedRecords();
	records = records.concat(records1);
	//alert(newurl.split("__")[2]);
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