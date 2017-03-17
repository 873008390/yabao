var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.org.OrgcenterList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.orgcenterlist',
    id: 'orgcenterGrid',
    requires: [
               'M.model.Org',
               'M.store.Orgcenters',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Orgcenters',
    
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
            	header: '�ϼ�����', 
            	dataIndex: 'zdy2',
            	editor: {
            		xtype: 'textfield',
            		readOnly: true
            	},
            	flex: 1
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'backcenter',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {  
                    	id: 'addcenter',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {
                    	id: 'savecenter',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
                    },
                    {
                    	id: 'deletecenter',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ɾ��'
                    },
                    /*{
                    	id: 'exportexcel_center',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'excel����'
                    },*/
                    {
                    	id: 'informationcenter',
                    	xtype: 'button',
                    	scope: this,
                    	text : '��������'
                    },
                    '->',
                    {
                    	id: 'keywordcenter',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: 'ģ������'
                    },
                    {
                    	id: 'searchcenter',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Orgcenters',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});