Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Projects'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout:'border',
            defaults: {
                collapsible: true,
                split: true,
                bodyStyle: 'padding:0px',
                xtype: 'projectlist'
            },
            items: [{
                title: 'ÏîÄ¿',
                region: 'north',
                height: 300,
                cmargins: '0 0 0 0'
            },
            {
                title: '¹©Ó¦ÉÌ',
                region:'west',
                margins: '0 0 0 0',
                cmargins: '5 5 0 0',
                width: 150,
                xtype: 'projectuserlist'
            },
            {
                title: 'Î´¶Á¹©Ó¦ÉÌ',
                region:'east',
                margins: '0 0 0 0',
                cmargins: '5 5 0 0',
                width: 350,
                xtype: 'projectunreaduserlist'
            },
            {
                title: 'ÒÑÍ¶¹©Ó¦ÉÌ',
                collapsible: false,
                region:'center',
                margins: '0 0 0 0',
                xtype: 'projectreaduserlist'
            }]
        });
    }
});

function reloadstore(newurl){
    var grid = Ext.getCmp("projectGrid");
    var store = grid.getStore();
    var records = store.getNewRecords();
    var records1 = store.getUpdatedRecords();
    records = records.concat(records1);
    //alert(newurl.split("__")[2]);
    if(records == null || records == ''){
        store.getProxy().url = newurl; 
        store.load();
    }else{
        Ext.Msg.confirm("ï¿½ï¿½Ü°ï¿½ï¿½ï¿½ï¿½","ï¿½ï¿½ï¿½ï¿½Î´ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ý£ï¿½ï¿½Ç·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½",function(btn){
            if(btn == 'yes'){
                store.getProxy().url = newurl; 
                store.load();
            }
        });
    }
}