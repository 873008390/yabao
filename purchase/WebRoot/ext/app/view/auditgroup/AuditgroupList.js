var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.auditgroup.AuditgroupList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.auditgrouplist',
    id: 'auditgroupGrid',
    requires: [
               'M.model.Auditgroup',
               'M.store.Auditgroups',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Auditgroups',
    
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
            	header: 'orgid',
            	dataIndex: 'orgid',
            	editor: {
            		readOnly: true,
            		xtype: 'numberfield'
            	},
            	hidden: true
            },
            {
            	header: '名称',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 5
            },  
            {
            	header: '顺序',             	
            	dataIndex: 'orderid',
            	editor: {
            		xtype: 'numberfield'            		
            	},
            	flex: 1
            },   
            {
            	header: '成员数',
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 1
            },       
            {
                header: '机构', 
                dataIndex: 'zdy2',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 5
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'backgroup',
                    	xtype: 'button',
			        	scope: this,  
			            text : '返回'
                    },
                    {  
                    	id: 'addauditgroup',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增'
                    },
                    {
                    	id: 'saveauditgroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存'
                    },
                    {
                    	id: 'deleteauditgroup',
                    	xtype: 'button',
                    	scope: this,
                    	text : '删除'
                    },
                    {
                    	id: 'addauditgroupuser',
                    	xtype: 'button',
                    	scope: this,
                    	text : '新增审核人'
                    },
                    {
                    	id: 'viewauditgroupuser',
                    	xtype: 'button',
                    	scope: this,
                    	text : '查看审核人'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Auditgroups',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});