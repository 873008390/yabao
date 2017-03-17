var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
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
    
    title : '仓库管理',

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
                header: '代理',               
                dataIndex: 'zdy5',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },            
            {
                header: '产品',               
                dataIndex: 'zdy2',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '规格',               
                dataIndex: 'zdy3',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            }, 
            {
                header: '数量', 
                dataIndex: 'quantity',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '单位',               
                dataIndex: 'zdy4',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            }, 
            {
                header: '日期',                 
                dataIndex: 'zdy6',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },                                
            {
                header: '单号',               
                dataIndex: 'zdy7',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '类型',               
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