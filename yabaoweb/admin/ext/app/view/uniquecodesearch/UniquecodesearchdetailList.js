var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.uniquecodesearch.UniquecodesearchdetailList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.uniquecodesearchdetaillist',
    id: 'uniquecodesearchdetailGrid',
    requires: [
               'M.model.Uniquecodesearchdetail',
               'M.store.Uniquecodesearchdetails',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Uniquecodesearchdetails',
    
    title : '',

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
            	header: '唯一码',
            	dataIndex: 'code',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '日期',
            	dataIndex: 'zdy2',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Uniquecodesearchdetails',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});