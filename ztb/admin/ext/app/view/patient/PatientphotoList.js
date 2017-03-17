var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.patient.PatientphotoList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.patientphotolist',
    id: 'patientphotoGrid',
    requires: [
               'M.model.Patientphoto',
               'M.store.Patientphotos',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Patientphotos',
    
    title : '照片',

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
            	header: '上传时间',             	
            	dataIndex: 'zdy2',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '类型',             	
            	dataIndex: 'zdy3',
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
        store: 'Patientphotos',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});