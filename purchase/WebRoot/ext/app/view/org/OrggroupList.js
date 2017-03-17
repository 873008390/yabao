var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.org.OrggroupList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.orggrouplist',
    id: 'orggroupGrid',
    requires: [
               'M.model.Org',
               'M.store.Orggroups',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Orggroups',
    
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
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'addgroup',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {
                    	id: 'savegroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
                    },
                    {
                    	id: 'deletegroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ɾ��'
                    },
                    /*{
                    	id: 'exportexcel_group',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'excel����'
                    },*/
                    {
                    	id: 'informationgroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : '��������'
                    },
                    {
                    	id: 'syn',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ͬ��'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Orggroups',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});