var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.product.ProductList2' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.productlist',
    id: 'productGrid',
    requires: [
               'M.model.Product',
               'M.store.Products',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Products',
    
    title : '产品',

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
            	header: '名称',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield',
            		 readOnly: true
            	},
            	flex: 1
            },
            {
            	header: '编码',             	
            	dataIndex: 'productno',
            	editor: {
            		 readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '规格',             	
            	dataIndex: 'zdy2',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Productspecs'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: '选择规格',
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
            	header: '类型',             	
            	dataIndex: 'zdy3',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Producttypes'),
                	valueField: 'name',
                	displayField: 'name',
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
            	header: '有效期（月）',             	
            	dataIndex: 'periodofvalidity',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1
            }
        ];
        

        this.tbar = [ 
                     {
                         id: 'close',
                         xtype: 'button',
                         scope: this,
                         text : '关闭'
                      },
                     '->',
                     {
                         id: 'keyword',
                         xtype: 'textfield',
                         scope: this,
                         emptyText: '模糊搜索'
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
        store: 'Products',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});