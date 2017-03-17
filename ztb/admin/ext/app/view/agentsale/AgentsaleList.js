var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.agentsale.AgentsaleList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.agentsalelist',
    id: 'agentsaleGrid',
    requires: [
               'M.model.Sale',
               'M.store.Sales',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Sales',
    
    title : '����',

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
            	header: '����',             	
            	dataIndex: 'zdy5',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '������',             	
            	dataIndex: 'totalquantity',
            	editor: {
            		xtype: 'numberfield'
            	},
            	flex: 1
            },
            {
                header: '���¹���', 
                dataIndex: 'zdy6',
                editor: {
            		xtype: 'numberfield'
            	},
                flex: 1
            },   
            {
                header: '���¹���', 
                dataIndex: 'zdy7',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },   
    
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Sales',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});