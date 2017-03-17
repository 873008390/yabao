var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.permission.PermissionList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.permissionlist',
    id: 'permissionGrid',
    requires: [
               'M.model.Permission',
               'M.store.Permissions',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Permissions',
    
    title : '用户权限',

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
            	header: 'permission',
            	dataIndex: 'permission',
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
            	header: 'type',
            	dataIndex: 'type',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	hidden: true
            },
            {
            	header: '姓名',             	
            	dataIndex: 'zdy2',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '权限',             	
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '菜单',             	
            	dataIndex: 'status',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		maxValue: 1,
        	        minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	
            	flex: 1,
	           	 renderer : function(data, cell, record, rowIndex,columnIndex, store) {  
	        		 var re = record.get('status');
	                 if(re==0){
	                	 return '';
	                 }else{
	                	 return re;
	                 }
	             },
	             hidden: true
            },
            {
            	header: '增加',             	
            	dataIndex: 'adddata',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		maxValue: 1,
        	        minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1,
            	 renderer : function(data, cell, record, rowIndex,columnIndex, store) {  
            		 var re = record.get('adddata');
                     if(re==0){
                    	 return '';
                     }else{
                    	 return re;
                     }
                 }  
            },
            {
            	header: '删除',             	
            	dataIndex: 'deletedata',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		maxValue: 1,
        	        minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1,
	           	 renderer : function(data, cell, record, rowIndex,columnIndex, store) {  
	        		 var re = record.get('deletedata');
	                 if(re==0){
	                	 return '';
	                 }else{
	                	 return re;
	                 }
	             }              	
            },
            {
            	header: '修改',             	
            	dataIndex: 'modifydata',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		maxValue: 1,
        	        minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1,
	           	 renderer : function(data, cell, record, rowIndex,columnIndex, store) {  
	        		 var re = record.get('modifydata');
	                 if(re==0){
	                	 return '';
	                 }else{
	                	 return re;
	                 }
	             }             	
            },
            {
            	header: '查询',             	
            	dataIndex: 'searchdata',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		maxValue: 1,
        	        minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1,
	           	 renderer : function(data, cell, record, rowIndex,columnIndex, store) {  
	        		 var re = record.get('searchdata');
	                 if(re==0){
	                	 return '';
	                 }else{
	                	 return re;
	                 }
	             }             	
            },
            {
            	header: '同步',             	
            	dataIndex: 'uploaddata',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		maxValue: 1,
        	        minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1,
	           	 renderer : function(data, cell, record, rowIndex,columnIndex, store) {  
	        		 var re = record.get('uploaddata');
	                 if(re==0){
	                	 return '';
	                 }else{
	                	 return re;
	                 }
	             }              	
            }
        ];
        

        this.tbar = [ 
                    {
                    	id: 'back',
                    	xtype: 'button',
                    	scope: this,
                    	text : '返回'
                    },
                    {
                    	id: 'save',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Permissions',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});