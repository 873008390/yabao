var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
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
                header: '��ĿID',
                dataIndex: 'projectid',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '��λ',               
                dataIndex: 'zdy6',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 3
            },
            {
                header: '˰��',               
                dataIndex: 'zdy8',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '����',               
                dataIndex: 'username',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '�ֻ���',                 
                dataIndex: 'phoneno',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 2
            },  
            {
                header: 'Ͷ������',                 
                dataIndex: 'zdy4',
                editor: {
            		xtype: 'datefield',
                    readOnly: true
            	},
                flex: 2
            },
            {
                header: '��֤��(1��ʾ�ѽ���0��ʾδ��)',                 
                dataIndex: 'bondstatus',
                editor: {
            		xtype: 'numberfield',
            		readOnly: true
            	},
                flex: 2
            }, 
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'informationphoto',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '�鿴����',
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
                    	emptyText: '������ؼ���'
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