var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.supplier.SupplierfileList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.supplierfilelist',
    id: 'supplierfileGrid',
    requires: [
               'M.model.Supplierfile',
               'M.store.Supplierfiles',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Supplierfiles',
    
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
            	header: '文件说明',             	
            	dataIndex: 'zdy10',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '上传日期',             	
            	dataIndex: 'zdy2',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '供应商',             	
            	dataIndex: 'zdy4',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '下载',             	
            	dataIndex: 'url',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            }
        ];
        

        this.tbar = [ 
                    {
                    	id: 'fileback',
                    	xtype: 'button',
                    	scope: this,
                    	text : '返回'
                    },
                    {
                    	id: 'deletefile',
                    	xtype: 'button',
                    	scope: this,
                    	text : '删除'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Supplierfiles',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});