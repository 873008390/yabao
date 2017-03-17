var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.pointexchange.PointexchangeList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pointexchangelist',
    id: 'pointexchangeGrid',
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
    
    title : '积分兑换',

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
                header: '产品',               
                dataIndex: 'productid',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '规格',               
                dataIndex: 'productspecid',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },           
            {
                header: '单位', 
                dataIndex: 'productunitid',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '金额', 
                dataIndex: 'money',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '数量', 
                dataIndex: 'quantity',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1,
                hidden: true
            }
            {
                header: '积分', 
                dataIndex: 'point',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1,
                hidden: true
            }            
        ];

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