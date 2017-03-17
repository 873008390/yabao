Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Areas'
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
        	    title: '省份',
        	    region: 'west',
        	    width: 400,
        	    cmargins: '0 0 0 0',
        	    xtype: 'areaprovincelist'
        	},{
        	    title: '县/镇',
        	    region:'east',
        	    margins: '0 0 0 0',
        	    cmargins: '5 5 0 0',
        	    width: 400,
        	    xtype: 'areatownlist'
        	},{
        	    title: '城市',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'areacitylist'
        	}]
        });
    }
});

function reloadstore(newurl){
	var citygrid = Ext.getCmp("areacityGrid");
	var citystore = citygrid.getStore();
	var records = citystore.getNewRecords();
	var records1 = citystore.getUpdatedRecords();
	var provincegrid = Ext.getCmp("areaprovinceGrid");
	var provincestore = provincegrid.getStore();
	records = records.concat(provincestore.getNewRecords());
	records1 = records1.concat(provincestore.getUpdatedRecords());
	var towngrid = Ext.getCmp("areatownGrid");
	var townstore = towngrid.getStore();
	records = records.concat(townstore.getNewRecords());
	records1 = records1.concat(townstore.getUpdatedRecords());
	
	records = records.concat(records1);
	//alert(newurl.split("__")[2]);
	if(records == null || records == ''){
		provincestore.getProxy().url = newurl.split("__")[0]; 
		provincestore.load();
		citystore.getProxy().url = newurl.split("__")[1];  
		citystore.load();
		townstore.getProxy().url = newurl.split("__")[2];  
		townstore.load();
	}else{
		Ext.Msg.confirm("温馨提醒","存在未保存数据，是否继续搜索？",function(btn){
			if(btn == 'yes'){
				provincestore.getProxy().url = newurl.split("__")[0];  
				provincestore.load();
				citystore.getProxy().url = newurl.split("__")[1];  
				citystore.load();
				townstore.getProxy().url = newurl.split("__")[2];  
				townstore.load();
			}
		});
	}
}