var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.department.DepartmentList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.departmentlist',
    id: 'departmentGrid',
    requires: [
               'M.model.Department',
               'M.store.Departments',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Departments',
    
    title : '部门',

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
            	header: 'zdy2',
            	dataIndex: 'zdy2',
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
            },
            {
            	header: '职务',             	
            	dataIndex: 'zdy10',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '负责人', 
            	dataIndex: 'zdy3',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Users-all'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'remote',
                	emptyText: '选择负责人',
                	editable: true,
            		allowBlank: true,
            		listeners:{
//            			blur:function(type, the){
//            				alert(type.getPosition());
//            			}
            		}
                }),
            	flex: 1
            },
            {
            	header: '所属机构', 
            	dataIndex: 'zdy4',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Orgs-current'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'remote',
                	emptyText: '选择',
                	editable: true,
            		allowBlank: true,
            		listeners:{
//            			blur:function(type, the){
//            				alert(type.getPosition());
//            			}
            		}
                }),
            	flex: 1
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
                    	id: 'exportexcel',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'excel导出'
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
        store: 'Departments',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});