Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Recommendchanges'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout:'border',
            defaults: {
                collapsible: true,
                split: true,
                bodyStyle: 'padding:0px',
                xtype: 'recommendchangelist'
            },
            items: [{
                title: '推荐人变更一览表',
                region: 'south',
                height: 300,
                cmargins: '0 0 0 0'
            },{
                title: '推荐人概要',
                collapsible: false,
                region:'center',
                margins: '0 0 0 0',
                xtype: 'recommendchangeoutlinelist'
            }]
        });
    }
});