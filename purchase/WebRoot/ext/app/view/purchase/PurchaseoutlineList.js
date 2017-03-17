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

    selType: 'rowmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Purchases',
    
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
            	//flex: 1
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
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'add',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增'
                    },
                    {
                    	id: 'delete',
                    	xtype: 'button',
                    	scope: this,
                    	text : '删除'
                    },
                    {
                    	id: 'information',
                    	xtype: 'button',
                    	scope: this,
                    	text : '查看'
                    },
                    {
                    	id:'exportexcel',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'excel导出'
                    },
                    /*{
                    	id:'exportpdf',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'pdf导出'
                    },*/
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
        store: 'Purchases',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});