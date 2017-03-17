var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.activity.ActivityphotoList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.activityphotolist',
    id: 'activityphotoGrid',
    requires: [
               'M.model.Activityphoto',
               'M.store.Activityphotos',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Activityphotos',
    
    title : '活动照片',

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
            	header: 'wxserverID',
            	dataIndex: 'wxserverid',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	hidden: true
            },
            {
            	header: '照片',             	
            	dataIndex: 'url',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '姓名',             	
            	dataIndex: 'username',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '身份证号',             	
            	dataIndex: 'idcard',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '地址', 
            	dataIndex: 'address',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },            
            {
            	header: '手机号', 
            	dataIndex: 'phoneno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },           
            {
            	header: '备注', 
            	dataIndex: 'memo',
            	editor: {
            		xtype: 'textfield'
            	},
            	renderer : function (value, meta, record) {
            		meta.style = 'white-space:normal;word-break:break-all;';
            		return value;
            	},
            	flex: 1
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
                    	id: 'save',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存',
                    	icon : 'images/save.png'
                    },
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
        store: 'Activityphotos',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});