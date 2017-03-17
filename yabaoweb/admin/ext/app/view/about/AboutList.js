var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.about.AboutList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.aboutlist',
    id: 'aboutGrid',
    requires: [
               'M.model.About',
               'M.store.Abouts',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Abouts',
    
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
            	header: 'catalogid',
            	dataIndex: 'catalogid',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	hidden: true
            },
            {
            	header: '栏目名称', 
            	dataIndex: 'zdy3',
            	editor: {
                	readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '录入日期', 
            	dataIndex: 'zdy2',
            	editor: {
                	readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'add',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/add.png',
                    tooltip: '查看/修改',
                    scope: this
                }]
            }
        ];
        

        this.tbar = [ 
                    {
                        id: 'back',
                        xtype: 'button',
                        scope: this,
                        text : '返回',
                        icon : 'images/back.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Abouts',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});