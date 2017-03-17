var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.drugstoresearch.DrugstoreoutlineList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.drugstoreoutlinelist',
    id: 'drugstoreoutlineGrid',
    requires: [
               'M.model.Customer',
               'M.store.Customers',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Customers',
    
    title : '概要',

    initComponent: function() {        

        this.columns = [
            {
                xtype: 'rownumberer'
            },
            {
                header: 'ID',
                dataIndex: 'id',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                hidden: true
            },
            {
                header: '省份',               
                dataIndex: 'zdy2',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '城市',               
                dataIndex: 'zdy3',
                editor: {
                    xtype: 'textfield',
                    readOnly: true
                },
                flex: 1
            },
            {
                header: '患者数量',                 
                dataIndex: 'zdy5',
                editor: {
                    xtype: 'textfield',
                    readOnly: true
                },
                flex: 1
            },
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看所有医生',
                    scope: this
                }]
            }
        ];
        

        this.tbar = [ 
                    {  
                        id: 'back',
                        xtype: 'button',
                        scope: this,  
                        text : '返回',  
                        icon : 'images/back.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Customers',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});