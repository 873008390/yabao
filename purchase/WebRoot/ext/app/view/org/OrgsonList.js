var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.org.OrgsonList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.orgsonlist',
    id: 'orgsonGrid',
    requires: [
               'M.model.Org',
               'M.store.Orgsons',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Orgsons',
    
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
            	header: '名称',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '上级机构', 
            	dataIndex: 'zdy2',
            	editor: {
            		xtype: 'textfield',
            		readOnly: true
            	},
            	flex: 1
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'backson',
                    	xtype: 'button',
			        	scope: this,  
			            text : '返回'
                    },
                    {  
                    	id: 'addson',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增'
                    },
                    {
                    	id: 'saveson',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存'
                    },
                    {
                    	id: 'deleteson',
                    	xtype: 'button',
                    	scope: this,
                    	text : '删除'
                    },
                    /*{
                    	id: 'exportexcel_son',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'excel导出'
                    },*/
                    '->',
                    {
                    	id: 'keywordson',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '模糊搜索'
                    },
                    {
                    	id: 'searchson',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Orgsons',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});