var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.healthknowledge.HealthknowledgereaduserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.healthknowledgereaduserlist',
    id: 'healthknowledgereaduserGrid',
    requires: [
               'M.model.Healthknowledge',
               'M.store.Healthknowledge-reads',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Healthknowledge-reads',
    
    title : '�Ѷ��û�',

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
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '�Ķ�����',             	
            	dataIndex: 'zdy2',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
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
        store: 'Healthknowledge-reads',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});