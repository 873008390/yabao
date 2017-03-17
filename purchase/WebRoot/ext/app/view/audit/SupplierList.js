var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.audit.SupplierList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.supplierlist',
    id: 'supplierGrid',
    requires: [
               'M.model.Supplier',
               'M.store.Suppliers-myauditing',
               'M.model.Keyvalue',
               'M.store.Keyvalues-13',
               'M.store.Keyvalues-14',
               'M.store.Keyvalues-15',
               'M.model.User',
               'M.store.User-suppliers',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'rowmodel',
              
    columnLines : true,
              
//    plugins: [
//              cellEdit
//             ],
    
    store: 'Suppliers-myauditing',
    
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
            	header: '编号',             	
            	dataIndex: 'supplierno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '名称',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 3
            }
        ];
        

        this.tbar = [ 
                    {
                    	id: 'information',
                    	xtype: 'button',
                    	scope: this,
                    	text : '审核'
                    },
                    {
                    	id: 'log',
                    	xtype: 'button',
                    	scope: this,
                    	text : '审核日志'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Suppliers-myauditing',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});