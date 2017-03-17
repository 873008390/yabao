var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.productexpiring.ProductexpiringoutlineList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.productexpiringoutlinelist',
    id: 'productexpiringoutlineGrid',
    requires: [
               'M.model.Product',
               'M.store.Products',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Products',
    
    title : '概要',

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
                header: '代理',               
                dataIndex: 'agented',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },            
            {
                header: '产品',               
                dataIndex: 'productid',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '规格',               
                dataIndex: 'productspecid',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },           
            {
                header: '总数量',                 
                dataIndex: 'total',
                editor: {
                    xtype: 'numberfield',
                    readOnly: true
                },
                flex: 1
            },      
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看所有',
                    scope: this
                }]
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'back',
                    	xtype: 'button',
			        	scope: this,  
			            text : '返回',  
			            icon : 'images/back.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Products',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});