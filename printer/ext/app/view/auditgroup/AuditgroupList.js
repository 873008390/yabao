var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.auditgroup.AuditgroupList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.auditgrouplist',
    id: 'auditgroupGrid',
    requires: [
               'M.model.Auditgroup',
               'M.store.Auditgroups',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Auditgroups',
    
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
            	header: '����',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },  
            {
            	header: '˳��',             	
            	dataIndex: 'orderid',
            	editor: {
            		xtype: 'numberfield'            		
            	},
            	flex: 1
            },   
            {
            	header: '��Ա��',
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	}
            },       
            {
                header: '�����ڲ���λ', 
                dataIndex: 'zdy2',
                editor: {
                	readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },   
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'informationauditgroup',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '�鿴',
                    scope: this
                }]
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'deleteauditgroup',
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
                    	id: 'addauditgroup',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����',  
			            icon : 'images/add.png'
                    },
                    {
                    	id: 'saveauditgroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����',
                    	icon : 'images/save.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Auditgroups',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});