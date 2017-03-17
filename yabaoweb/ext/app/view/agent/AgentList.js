var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.agent.AgentList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.agentlist',
    id: 'agentGrid',
    requires: [
               'M.model.Agent',
               'M.store.Agents',
               'M.model.User',
               'M.store.User-agents',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Agents',
    
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
            	header: '登记日期',             	
            	dataIndex: 'zdy7',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
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
            	header: '编码',             	
            	dataIndex: 'customerno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
                id: 'manageruserid',
                header: '负责人', 
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.User-agents'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择负责人',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },           
            {
                id: 'saleuserid',
                header: '省总', 
                dataIndex: 'zdy8',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.User-saleusers'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },     
            {
                id: 'uppercustomerid',
                header: '上级代理', 
                dataIndex: 'zdy6',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Customers'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择上级代理',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },      
            {
                id: 'provinceid',
                header: '所属省份', 
                dataIndex: 'zdy3',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Provinces'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择省份',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },              
            {
                id: 'cityid',
                header: '所在城市', 
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Citys'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择城市',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },              
            {
                id: 'townid',
                header: '所在县/镇', 
                dataIndex: 'zdy5',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Towns'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择所在县/镇',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },             
            {
            	header: '详细地址', 
            	dataIndex: 'addressdetail',
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
                header: '座机号', 
                dataIndex: 'tel',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },                        
            {
                header: '类型', 
                dataIndex: 'type',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1,
                hidden: true
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
                    {
                    	id: 'report',
                    	xtype: 'button',
                    	scope: this,
                    	text : '报表',
                    	icon : 'images/report.png'
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
        store: 'Agents',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});