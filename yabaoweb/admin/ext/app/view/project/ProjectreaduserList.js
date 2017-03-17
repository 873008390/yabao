var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.project.ProjectreaduserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.projectreaduserlist',
    id: 'projectreaduserGrid',
    requires: [
               'M.model.Projectreply',
               'M.store.Projectreplys',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Projectreplys',
    
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
                hidden: true,
                flex: 1
            },
            {
                header: '项目ID',
                dataIndex: 'projectid',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '姓名',               
                dataIndex: 'username',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '手机号',                 
                dataIndex: 'phoneno',
                editor: {
                    xtype: 'textfield'
                },
                flex: 2
            },  
            {
                header: '阅读日期',                 
                dataIndex: 'zdy4',
                editor: {
            		xtype: 'datefield',
                    readOnly: true
            	},
                flex: 1
            },
            {
                header: '投标日期',                 
                dataIndex: 'zdy3',
                editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                flex: 1
            }, 
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'informationphoto',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看附件',
                    scope: this
                }]
            }                                       
        ];       

        this.tbar = [ 
                    '->',
                    {
                    	id: 'keywordread',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '请输入关键词'
                    },
                    {
                    	id: 'searchread',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Projectreplys',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});