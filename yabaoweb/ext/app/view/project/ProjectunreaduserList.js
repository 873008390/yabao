var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.project.ProjectunreaduserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.projectunreaduserlist',
    id: 'projectunreaduserGrid',
    requires: [
				'M.model.Projectreply',
				'M.store.Projectreply-unreads',
				'Ext.grid.*',
				'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Projectreply-unreads',
    
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
                dataIndex: 'username',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '手机号',               
                dataIndex: 'phoneno',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'informationunread',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看该用户纪录',
                    scope: this
                }]
            }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Projectreply-unreads',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});