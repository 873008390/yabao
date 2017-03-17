var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.indexphoto.IndexphotoList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.indexphotolist',
    id: 'indexphotoGrid',
    requires: [
               'M.model.Keyvalue',
               'M.store.Keyvalues-1000',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Keyvalues-1000',
    
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
            	header: '图片类型',             	
            	dataIndex: 'keyname',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: 'url',             	
            	dataIndex: 'value',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'add',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/add.png',
                    tooltip: '上传/修改',
                    scope: this
                }]
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'delete',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/delete.png',
                    tooltip: '清空',
                    scope: this
                }]
            }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Keyvalues-1000',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});