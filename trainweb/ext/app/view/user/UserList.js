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
               'M.model.Supplier',
               'M.store.Supplier-users',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Users',
    
    title : '用户',

    initComponent: function() {        
//账号、姓名、注册日期、密码、部门、机构、性别、地区、手机号、微信号、头像
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
            	hidden: true,
                flex: 1
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
                id: 'orgid',
                header: '部门', 
                dataIndex: 'zdy8',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Orgs-all'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '选择所属机构',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 2
            },
            {
                id: 'orgid',
                header: '机构', 
                dataIndex: 'zdy8',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Orgs-all'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '选择所属机构',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 2
            },
            {
                header: '性别', 
                dataIndex: 'gender',
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
            	header: '微信号', 
            	dataIndex: '<w></w>echat',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
                header: '头像', 
                dataIndex: 'portrait',
                editor: {
                    xtype: 'textfield'
                },
                flex: 2
            }

        ];
        

        this.tbar = [ 
                    {  
                    	id: 'add',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增'
                    },
                    {
                    	id: 'save',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存'
                    },
                    {
                    	id: 'delete',
                    	xtype: 'button',
                    	scope: this,
                    	text : '删除'
                    },
                    {
                    	id: 'information',
                    	xtype: 'button',
                    	scope: this,
                    	text : '查看权限'
                    },
                    {
                        id: 'upload',
                        xtype: 'button',
                        scope: this,
                        text : '上传头像'
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