Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Products2'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    split: true,
                header: false,
        	    bodyStyle: 'padding:0px',
        	    xtype: 'productlist'
        	},
        	items: [{
        	    title: 'ŒÔ¡œ',
        	    region: 'center',
        	    cmargins: '0 0 0 0'
        	}]
        });
    }
});

function reloadstore(str){
	var grid = Ext.getCmp("productGrid");
	var store = grid.getStore();
	//alert(store.getProxy().url);
	store.getProxy().url = store.getProxy().url.split("&typeid=")[0] +"&typeid="+ str; 
	store.load();
}