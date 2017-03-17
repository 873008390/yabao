Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Drugstoresearchs'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    split: true,
        	    bodyStyle: 'padding:0px',
        	    xtype: 'drugstoresearchlist'
        	},
        	items: [{
        	    title: '药店',
        	    region: 'south',
        	    height: 300,
        	    cmargins: '0 0 0 0'
        	},{
        	    title: '药店概要',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'drugstoreoutlinelist'
        	}]
        });
    }
});