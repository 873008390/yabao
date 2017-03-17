var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.healthknowledge.HealthknowledgeList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.healthknowledgelist',
    id: 'healthknowledgeGrid',
    requires: [
               'M.model.Healthknowledge',
               'M.store.Healthknowledges',
               'M.model.Keyvalue',
               'M.store.Keyvalues-2',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Healthknowledges',
    
    title : '文章',

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
            	header: 'zdy10',
            	dataIndex: 'zdy10',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	hidden: true
            },
            {
                header: '列表图片',
                dataIndex: 'icon',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 2
            },
            {
            	header: '是否置顶',             	
            	dataIndex: 'topstatus',
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
            	header: '阅读人数',             	
            	dataIndex: 'readnum',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		readOnly: true,
            		maxValue: 1,
        	        minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1
            },
            {
            	header: '日期',             	
            	dataIndex: 'zdy2',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
//            {
//            	header: '日期',             	
//            	dataIndex: 'zdy2',
//            	editor: {
//            		format:'Y-m-d',
//            		xtype: 'datefield'
//            	},
//        		renderer: Ext.util.Format.dateRenderer('Y-m-d'),
//            	flex: 1
//            },
            {
            	header: '发送人',             	
            	dataIndex: 'zdy3',
            	editor: {
            		xtype: 'textfield',
            		readOnly: true
            	},
            	flex: 1
            },
            {
            	header: '标题',             	
            	dataIndex: 'title',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 5
            },
            {
            	header: '类型',             	
            	dataIndex: 'zdy4',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Keyvalues-2'),
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
                xtype: 'actioncolumn',
                width: 30,
                id: 'addcontent',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/add.png',
                    tooltip: '增加或修改内容',
                    scope: this
                }]
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看已读用户',
                    scope: this
                }]
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
        store: 'Healthknowledges',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});