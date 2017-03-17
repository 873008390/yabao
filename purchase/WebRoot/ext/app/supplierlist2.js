Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Suppliers2'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    header:false,
        	    split: true,
        	    bodyStyle: 'padding:0px',
        	    xtype: 'supplierlist'
        	},
        	items: [{
        	    title: '选择供应商',
        	    region: 'center',
        	    cmargins: '0 0 0 0'
        	}]
        });
    }
});

function reloadstore(str){
	var grid = Ext.getCmp("supplierGrid");
	var store = grid.getStore();
	//alert(store.getProxy().url);
	store.getProxy().url = store.getProxy().url.split("&typeid=")[0] +"&typeid="+ str; 
	store.load();
}