var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.product.ProductunitList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.productunitlist',
    id: 'productunitGrid',
    requires: [
               'M.model.Productunit',
               'M.store.Productunits',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Productunits',
    
    title : '产品单位',

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
            	header: '名称',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '基础单位',             	
            	dataIndex: 'isbase',
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
            	header: '下级单位',             	
            	dataIndex: 'zdy2',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Productunits'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: '选择下级单位',
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
            	header: '比率',             	
            	dataIndex: 'total',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'deleteunit',
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
                    	id: 'addunit',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增',  
			            icon : 'images/add.png'
                    },
                    {
                    	id: 'saveunit',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存',
                    	icon : 'images/save.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Productunits',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});