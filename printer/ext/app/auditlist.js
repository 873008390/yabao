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
        	    title: '供应商',
        	    region: 'west',
        	    width: 400,
        	    cmargins: '0 0 0 0',
        	    xtype: 'supplierlist'
        	},{
        	    title: '审核日志',
        	    region:'south',
        	    margins: '0 0 0 0',
        	    height: 250,
        	    xtype: 'auditloglist'
        	},{
        	    title: '审核',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'auditcontentlist'
        	}]
        });
    }
});