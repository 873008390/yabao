﻿Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Outstocks'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout:'border',
        	defaults: {
        	    collapsible: true,
        	    split: true,
        	    bodyStyle: 'padding:0px',
        	    xtype: 'outstocklist'
        	},
        	items: [{
        	    title: '出库明细',
        	    region: 'south',
        	    height: 300,
        	    cmargins: '0 0 0 0'
        	},{
        	    title: '出库概要',
        	    collapsible: false,
        	    region:'center',
        	    margins: '0 0 0 0',
        	    xtype: 'outstockoutlinelist'
        	}]
        });
    }

});