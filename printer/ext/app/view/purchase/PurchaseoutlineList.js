var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.purchase.PurchaseoutlineList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.purchaseoutlinelist',
    id: 'purchaseoutlineGrid',
    requires: [
               'M.model.Purchase',
               'M.store.Purchases',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Purchases',
    
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
            	flex: 1
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
            	header: '供应商',             	
            	dataIndex: 'zdy4',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Suppliers-audited'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
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
            	header: '采购日期',             	
            	dataIndex: 'zdy2',
            	editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            	flex: 1
            },
            {
                header: '采购单号',                 
                dataIndex: 'purchaseno',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
            	header: '录单人',             	
            	dataIndex: 'zdy3',
            	editor: {
            		xtype: 'textfield',
            		readOnly: true
            	},
            	flex: 1
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看',
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
                    	id: 'syn',
                    	xtype: 'button',
                    	scope: this,
                    	text : '同步',
                    	icon : 'images/save.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Purchases',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});