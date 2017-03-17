var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.product.ProductspecList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.productspeclist',
    id: 'productspecGrid',
    requires: [
               'M.model.Productspec',
               'M.store.Productspecs',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Productspecs',
    
    title : '产品规格',

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
            	header: '名称',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'addspec',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增'
                    },
                    {
                    	id: 'savespec',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存'
                    },
                    {
                    	id: 'deletespec',
                    	xtype: 'button',
                    	scope: this,
                    	text : '删除'
                    },
                    {
                    	id: 'exportexcel',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'excel导出'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Productspecs',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});