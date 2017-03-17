var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.auditgroup.AuditgroupuserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.auditgroupuserlist',
    id: 'auditgroupuserGrid',
    requires: [
               'M.model.Auditgroupuser',
               'M.store.Auditgroupusers',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Auditgroupusers',
    
    title : '',

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
            	header: 'zdy10',
            	dataIndex: 'zdy10',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	hidden: true
            },
            {
            	header: '姓名',             	
            	dataIndex: 'zdy2',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Users-allorg'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'remote',
                	emptyText: '选择',
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
            	header: '所属审核组', 
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
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
                    	id: 'adduser',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增'
                    },
                    {
                    	id: 'saveuser',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存'
                    },
                    {
                    	id: 'deleteuser',
                    	xtype: 'button',
                    	scope: this,
                    	text : '删除'
                    },
                    '->',
                    {
                    	id: 'keyworduser',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '请输入关键词'
                    },
                    {
                    	id: 'searchuser',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Auditgroupusers',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});