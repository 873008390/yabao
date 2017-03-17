var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.iask.IaskreplyList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.iaskreplylist',
    id: 'iaskreplyGrid',
    requires: [
               'M.model.Iaskreply',
               'M.store.Iaskreplys',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Iaskreplys',
    
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
            	header: 'zdy10',
            	dataIndex: 'zdy10',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	hidden: true
            },
            {
                header: '是否公开',                 
                dataIndex: 'auditstatus',
                xtype: 'numbercolumn',
                format: '0',
                editor: {
                    maxValue: 1,
                    minValue: 0,
                    format: '0',
                    xtype: 'numberfield'
                },
                flex: 1
            }, 
            {
                header: '阅读人',                 
                dataIndex: 'zdy3',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            }, 
            {
                header: '阅读日期',               
                dataIndex: 'zdy2',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '回复内容', 
                dataIndex: 'content',
                editor: {
                    xtype: 'textfield'
                },
                flex: 10
            }, 
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'replydelete',
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
                    	id: 'replyadd',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增',  
			            icon : 'images/add.png'
                    },
                    {
                    	id: 'replysave',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存',
                    	icon : 'images/save.png'
                    },
                    '->',
                    {
                    	id: 'keywordread',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '请输入关键词'
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
        store: 'Iaskreplys',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});