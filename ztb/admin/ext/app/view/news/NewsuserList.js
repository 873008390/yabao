var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.news.NewsuserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.newsuserlist',
    id: 'newsuserGrid',
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
    
    title : '供应商',

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
                    tooltip: '查看该用户投标纪录',
                    scope: this
                }]
            }
        ];
        
        this.tbar = [
                     '->',
                    {
                    	id: 'keyworduser',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '请输入关键词'
                    },
                    {
                    	id: 'searchuser',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
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