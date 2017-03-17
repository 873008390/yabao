Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Audits'
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
        	    title: '¥˝…Ûπ©”¶…Ã',
        	    region: 'center',
        	    cmargins: '0 0 0 0',
        	    xtype: 'supplierlist'
        	}]
        });
    }
});