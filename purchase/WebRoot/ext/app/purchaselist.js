Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Purchase'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    header: false,
        	    split: true,
        	    bodyStyle: 'padding:0px'
        	},
        	items: [
        	   {
        	    title: '采购单',
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'purchaseoutlinelist'
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