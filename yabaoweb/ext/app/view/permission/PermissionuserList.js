var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.permission.PermissionuserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.permissionuserlist',
    id: 'permissionuserGrid',
    requires: [
               'M.model.User',
               'M.store.Users',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Users',
    
    title : '用户',

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
            	header: 'zdy10',
            	dataIndex: 'zdy10',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	hidden: true
            },
            {
            	header: '姓名',             	
            	dataIndex: 'name',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'informationuser',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看已有权限',
                    scope: this
                }]
            }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Users',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});