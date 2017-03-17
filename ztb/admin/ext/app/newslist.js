Ext.application({
    requires: ['Ext.container.Viewport'],  
    name: 'M',

    appFolder: 'ext/app',
    
    controllers: [
                  'Newss'
              ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout:'border',
            defaults: {
                collapsible: true,
                split: true,
                bodyStyle: 'padding:0px',
                xtype: 'newslist'
            },
            items: [{
                title: '����',
                region: 'north',
                height: 400,
                cmargins: '0 0 0 0'
            },
            {
                title: '�û�',
                region:'west',
                margins: '0 0 0 0',
                cmargins: '5 5 0 0',
                width: 150,
                xtype: 'newsuserlist'
            },
            {
                title: 'δ���û�',
                region:'east',
                margins: '0 0 0 0',
                cmargins: '5 5 0 0',
                width: 350,
                xtype: 'newsunreaduserlist'
            },
            {
                title: '�Ѷ��û�',
                collapsible: false,
                region:'center',
                margins: '0 0 0 0',
                xtype: 'newsreaduserlist'
            }]
        });
    }
});

function reloadstore(newurl){
    var grid = Ext.getCmp("newsGrid");
    var store = grid.getStore();
    var records = store.getNewRecords();
    var records1 = store.getUpdatedRecords();
    records = records.concat(records1);
    //alert(newurl.split("__")[2]);
    if(records == null || records == ''){
        store.getProxy().url = newurl; 
        store.load();
    }else{
        Ext.Msg.confirm("��ܰ����","����δ������ݣ��Ƿ����������",function(btn){
            if(btn == 'yes'){
                store.getProxy().url = newurl; 
                store.load();
            }
        });
    }
}