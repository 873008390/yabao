var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
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
                    	id: 'addgroup',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增'
                    },
                    {
                    	id: 'savegroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存'
                    },
                    {
                    	id: 'deletegroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : '删除'
                    },
                    /*{
                    	id: 'exportexcel_group',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'excel导出'
                    },*/
                    {
                    	id: 'informationgroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : '二级机构'
                    },
                    {
                    	id: 'syn',
                    	xtype: 'button',
                    	scope: this,
                    	text : '同步'
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