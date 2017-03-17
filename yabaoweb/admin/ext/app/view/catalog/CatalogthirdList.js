var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.catalog.CatalogthirdList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.catalogthirdlist',
    id: 'catalogthirdGrid',
    requires: [
               'M.model.Catalog',
               'M.store.Catalog-thirds',
               'M.store.Catalog-seconds',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Catalog-thirds',
    
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
            	header: 'shortname',
            	dataIndex: 'shortname',
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
            	header: '上级栏目', 
            	dataIndex: 'icon',
            	editor: new Ext.form.ComboBox({
            		id: 'secondcatalogid',
                	store: Ext.create('M.store.Catalog-seconds'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'remote',
                	emptyText: '选择上级栏目',
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
                header: '顺序', 
                dataIndex: 'orderid',
                editor: {
                    xtype: 'numberfield',
                    minValue:1 
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
            }, 
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '详情',
                    scope: this
                }]
            }
        ];
        

        this.tbar = [ 
                    {
			        	id: 'addthird',
			        	xtype: 'button',
			        	scope: this,
			        	text : '新增',
			        	icon : 'images/add.png'
			        },
                    {
                    	id: 'savethird',
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
        store: 'Catalog-thirds',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});