Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Agentreports'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout: {
        	    type: 'vbox',
        	    align : 'stretch',
        	    pack  : 'start'
        	},
            items: [
                    {
                    	xtype: 'agentreportlist',
                    	flex: 1
                    }]
        });
    }
});