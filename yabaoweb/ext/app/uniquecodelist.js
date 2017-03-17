Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Uniquecodes'
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
        	    title: '已生成唯一码',
        	    region: 'east',
        	    width: 400,
        	    cmargins: '0 0 0 0',
        	    xtype: 'uniquecodedetaillist'
        	},{
        	    title: '生成纪录',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'uniquecodelist'
        	}]
        });
    }
});

function reloadstore(newurl){
	var grid = Ext.getCmp("uniquecodedetailGrid");
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