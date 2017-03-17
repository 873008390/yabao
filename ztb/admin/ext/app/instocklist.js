Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Instocks'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    split: true,
        	    bodyStyle: 'padding:0px',
        	    xtype: 'instocklist'
        	},
        	items: [{
        	    title: '入库明细',
        	    region: 'south',
        	    height: 300,
        	    cmargins: '0 0 0 0'
        	},{
        	    title: '入库概要',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'instockoutlinelist'
        	}]
        });
    }
});