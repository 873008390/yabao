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
            	header: 'orgid',
            	dataIndex: 'orgid',
            	editor: {
            		readOnly: true,
            		xtype: 'numberfield'
            	},
            	hidden: true
            },
            {
            	header: '����',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 5
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
            	},
                flex: 1
            },       
            {
                header: '����', 
                dataIndex: 'zdy2',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 5
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'backgroup',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {  
                    	id: 'addauditgroup',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {
                    	id: 'saveauditgroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
                    },
                    {
                    	id: 'deleteauditgroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ɾ��'
                    },
                    {
                    	id: 'addauditgroupuser',
                    	xtype: 'button',
                    	scope: this,
                    	text : '���������'
                    },
                    {
                    	id: 'viewauditgroupuser',
                    	xtype: 'button',
                    	scope: this,
                    	text : '�鿴�����'
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