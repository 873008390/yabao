var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.productexpiring.ProductexpiringList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.productexpiringlist',
    id: 'productexpiringGrid',
    requires: [
               'M.model.Product',
               'M.store.Products',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Products',
    
    title : '产品近效期预警',

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
                dataIndex: 'agented',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
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
                header: '数量', 
                dataIndex: 'total',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '批号', 
                dataIndex: 'lotnumbel',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },            
            {
                header: '生产日期', 
                dataIndex: 'manufacturedate',
                editor: {
                    xtype: 'datepicker'
                },
                flex: 1
            }            
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Products',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});