var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.suggest.SuggestList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.suggestlist',
    id: 'suggestGrid',
    requires: [
               'M.model.Suggest',
               'M.store.Suggests',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Suggests',
    
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
            	header: '回复状态',             	
            	dataIndex: 'zdy6',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '录入日期', 
            	dataIndex: 'zdy2',
            	editor: {
                	readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '标题', 
            	dataIndex: 'title',
            	editor: {
                	readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '姓名',             	
            	dataIndex: 'zdy3',
            	editor: {
                	readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '电话',             	
            	dataIndex: 'zdy4',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	id: 'supplierid',
            	header: '供应商', 
            	dataIndex: 'zdy7',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
                },
            	flex: 2
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'add',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/add.png',
                    tooltip: '回复',
                    scope: this
                }]
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
            }
        ];
        

        this.tbar = [ 
                    {
                        id: 'back',
                        xtype: 'button',
                        scope: this,
                        text : '返回',
                        icon : 'images/back.png'
                    },
                    {  
                    	id: 'addhelp',
                    	xtype: 'button',
			        	scope: this,  
			            text : '投诉指南',  
			            icon : 'images/add.png'
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
        store: 'Suggests',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});