var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.crossregionsale.CrossregionsaleList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.crossregionsalelist',
    id: 'crossregionsaleGrid',
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
    
    title : '疑似串货预警',

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
                header: '日期',                 
                dataIndex: 'createdate',
                editor: {
                    xtype: 'datepicker'
                },
                flex: 1
            },
            {
                header: '唯一码',               
                dataIndex: 'uniquecode',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            }, 
            {
                header: '类型',               
                dataIndex: 'type',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },    
            {
                header: '单号',               
                dataIndex: 'no',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },                                              
            {
                header: '客户', 
                dataIndex: 'customerid',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1,
                hidden: true
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