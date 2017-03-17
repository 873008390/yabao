var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.supplier.AuditlogList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.auditloglist',
    id: 'auditlogGrid',
    requires: [
               'M.model.Auditlog',
               'M.store.Auditlogs',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
    
    store: 'Auditlogs',
    
    title : '',

    initComponent: function() {        

        this.columns = [
            {
            	xtype: 'rownumberer',
            	width: 40
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
            	header: '����',             	
            	dataIndex: 'zdy5',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '��Ӧ��',             	
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '������',             	
            	dataIndex: 'zdy2',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '��˲���',             	
            	dataIndex: 'operation',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '������',             	
            	dataIndex: 'memo',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 3
            },
            {
            	header: '�޸�����',             	
            	dataIndex: 'modifycontent',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 3
            }
        ];
        

        this.tbar = [ 
                    {
                    	id: 'logback',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Auditlogs',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});