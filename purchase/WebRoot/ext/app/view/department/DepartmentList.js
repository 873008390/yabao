var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
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
    
    title : '����',

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
            	header: '����',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: 'ְ��',             	
            	dataIndex: 'zdy10',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '������', 
            	dataIndex: 'zdy3',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Users-all'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'remote',
                	emptyText: 'ѡ������',
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
            	header: '��������', 
            	dataIndex: 'zdy4',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Orgs-current'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'remote',
                	emptyText: 'ѡ��',
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
			            text : '����'
                    },
                    {  
                    	id: 'add',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {
                    	id: 'save',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
                    },
                    {
                    	id: 'delete',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ɾ��'
                    },
                    {
                    	id: 'exportexcel',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'excel����'
                    },
                    {
                    	id: 'syn',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ͬ��'
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