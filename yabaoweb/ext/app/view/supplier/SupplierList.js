var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.supplier.SupplierList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.supplierlist',
    id: 'supplierGrid',
    requires: [
               'M.model.Supplier',
               'M.store.Suppliers',
               'M.model.User',
               'M.store.User-suppliers',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Suppliers',
    
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
            	header: '登记日期',             	
            	dataIndex: 'zdy7',
            	editor: {
            		readOnly: true,
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
            	flex: 1
            },
            {
            	header: '编码',             	
            	dataIndex: 'supplierno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },              
            {
            	header: '详细地址', 
            	dataIndex: 'address',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },               
            {
            	header: '联系人', 
            	dataIndex: 'contactperson',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },             
            {
            	header: '手机号', 
            	dataIndex: 'phoneno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
                header: '座机号', 
                dataIndex: 'tel',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },                        
            {
                header: '附件数量', 
                dataIndex: 'filenum',
                editor: {
                    xtype: 'numberfield'
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
                    tooltip: '删除',
                    scope: this
                }]
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看资质文件',
                    scope: this
                }]
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'add',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增',  
			            icon : 'images/add.png'
                    },
                    {
                    	id: 'save',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存',
                    	icon : 'images/save.png'
                    },
                    '->',
                    {
                    	id: 'keyword',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '请输入关键词'
                    },
                    {
                    	id: 'search',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Suppliers',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});