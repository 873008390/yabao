var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.recommendchange.RecommendchangeList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.recommendchangelist',
    id: 'recommendchangeGrid',
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
    
    title : '推荐人变更一览表',

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
                header: '患者',               
                dataIndex: 'customerid',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },           
            {
                header: '原推荐人', 
                dataIndex: 'olduserid',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '新推荐人', 
                dataIndex: 'newuserid',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
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