var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.stock.StockList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.stocklist',
    id: 'stockGrid',
    requires: [
               'M.model.Stockdetail',
               'M.store.Stockdetails',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Stockdetails',
    
    title : '�ֿ����',

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
                header: '����',               
                dataIndex: 'zdy5',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },            
            {
                header: '��Ʒ',               
                dataIndex: 'zdy2',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '���',               
                dataIndex: 'zdy3',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            }, 
            {
                header: '����', 
                dataIndex: 'quantity',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '��λ',               
                dataIndex: 'zdy4',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            }, 
            {
                header: '����',                 
                dataIndex: 'zdy6',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },                                
            {
                header: '����',               
                dataIndex: 'zdy7',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '����',               
                dataIndex: 'zdy8',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            }                 
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Stockdetails',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});