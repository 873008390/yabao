var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.user.UserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',
    id: 'userGrid',
    requires: [
               'M.model.User',
               'M.store.Users',
               'M.model.Keyvalue',
               'M.store.Keyvalues',
               'M.model.Customer',
               'M.store.Customer-users',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Users',
    
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
                header: '开通状态',                 
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
                header: '是否客服',                 
                dataIndex: 'servicestatus',
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
            	header: '客服号',             	
            	dataIndex: 'serviceno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
                header: '是否省总',                 
                dataIndex: 'salestatus',
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
            	header: '省总地址',             	
            	dataIndex: 'saleaddress',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '账号',             	
            	dataIndex: 'account',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '姓名',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '注册日期', 
            	dataIndex: 'zdy2',
            	editor: {
                	readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '密码', 
            	dataIndex: 'password',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '手机号', 
            	dataIndex: 'phoneno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	header: '电话', 
            	dataIndex: 'tel',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
            	id: 'type',
            	header: '类型', 
            	dataIndex: 'zdy3',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Keyvalues'),
                	valueField: 'keyname',
                	displayField: 'keyname',
                	queryMode: 'local',
                	emptyText: '选择类型',
                	editable: true,
            		
            		listeners:{
//            			blur:function(type, the){
//            				alert(type.getPosition());
//            			}
            		}
                }),
            	flex: 1
            },
            {
            	id: 'customerid',
            	header: '所属单位', 
            	dataIndex: 'zdy7',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Customer-users'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: '选择所属单位',
                	editable: true,
            		
            		listeners:{
//            			blur:function(type, the){
//            				alert(type.getPosition());
//            			}
            		}
                }),
            	flex: 2
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
                    	id: 'add',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增',  
			            icon : 'images/add.png'
                    },
                    {
                    	id: 'save',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存',
                    	icon : 'images/save.png'
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
        store: 'Users',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});