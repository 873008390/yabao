var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.project.ProjectphotoList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.projectphotolist',
    id: 'projectphotoGrid',
    requires: [
               'M.model.Projectreply',
               'M.store.Projectphotos',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Projectphotos',
    
    title : 'Ͷ�긽��',

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
            	header: '�ļ�',             	
            	dataIndex: 'zdy4',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },          
            {
            	header: '�ļ�˵��', 
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '��Ŀ����',             	
            	dataIndex: 'zdy2',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: 'Ͷ����',             	
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
            	flex: 1
            }, 
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'delete',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/delete.png',
                    tooltip: 'ɾ��',
                    scope: this
                }]
            }
        ];
        

        this.tbar = [ 
                    {
                    	id: 'back',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����',
                    	icon : 'images/back.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Projectphotos',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});