Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Overseas'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout:'border',
            defaults: {
                collapsible: true,
                split: true,
                bodyStyle: 'padding:0px',
                xtype: 'oversealist'
            },
            items: [{
                title: '¹ú¼ÊÒµÎñ',
                region: 'north',
                height: 400,
                cmargins: '0 0 0 0'
            },
            {
                title: 'ÒÑ¶ÁÓÃ»§',
                collapsible: false,
                region:'center',
                margins: '0 0 0 0',
                xtype: 'overseareaduserlist'
            }]
        });
    }
});

function reloadstore(newurl){
    var grid = Ext.getCmp("overseaGrid");
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