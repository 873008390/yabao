var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.sale.SaleList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.salelist',
    id: 'saleGrid',
    requires: [
               'M.model.Saledetail',
               'M.store.Saledetails',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Saledetails',
    
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
            	header: '概要ID',
            	dataIndex: 'mainid',
            	editor: {
            		xtype: 'numberfield',
            		format: '0'
            	},
            	flex: 1
            },
            {
                header: '产品',               
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Products'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: '选择产品',
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
                header: '规格',               
                dataIndex: 'zdy3',
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
                header: '单位', 
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Productunits'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: '选择单位',
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
                header: '金额', 
                dataIndex: 'money',
                editor: {
                    xtype: 'numberfield',
                    readOnly: true
                },
                flex: 1
            },
            {
                header: '数量', 
                dataIndex: 'quantity',
                editor: {
                    xtype: 'numberfield',
                    format: '0.0'
                },
                flex: 1
            },
            {
                header: '单价', 
                dataIndex: 'price',
                editor: {
                    xtype: 'numberfield',
                    format: '0.0'
                },
                flex: 1
            } ,
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'detaildelete',
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
                    	id: 'detailadd',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增',  
			            icon : 'images/add.png'
                    },
                    {
                        id: 'detailsave',
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
        store: 'Saledetails',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});