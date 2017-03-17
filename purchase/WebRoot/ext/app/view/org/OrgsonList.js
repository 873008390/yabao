var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.org.OrgsonList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.orgsonlist',
    id: 'orgsonGrid',
    requires: [
               'M.model.Org',
               'M.store.Orgsons',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Orgsons',
    
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
                    	id: 'backson',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {  
                    	id: 'addson',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {
                    	id: 'saveson',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
                    },
                    {
                    	id: 'deleteson',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ɾ��'
                    },
                    /*{
                    	id: 'exportexcel_son',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'excel����'
                    },*/
                    '->',
                    {
                    	id: 'keywordson',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: 'ģ������'
                    },
                    {
                    	id: 'searchson',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Orgsons',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});