var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
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
    
    title : '�û�Ȩ��',

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
            	header: '����',             	
            	dataIndex: 'zdy2',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: 'Ȩ��',             	
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '�˵�',             	
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
            	header: '����',             	
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
            	header: 'ɾ��',             	
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
            	header: '�޸�',             	
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
            	header: '��ѯ',             	
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
            	header: 'ͬ��',             	
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
                    	text : '����'
                    },
                    {
                    	id: 'save',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
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