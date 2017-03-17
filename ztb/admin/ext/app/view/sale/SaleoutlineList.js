var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.sale.SaleoutlineList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.saleoutlinelist',
    id: 'saleoutlineGrid',
    requires: [
               'M.model.Sale',
               'M.store.Sales',
               'M.model.Keyvalue',
               'M.store.Keyvalues-13',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Sales',
    
    title : '概要',

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
                header: '支付状态',                 
                dataIndex: 'paystatus',
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
                header: '录入人',                 
                dataIndex: 'zdy3',
                editor: {
                    xtype: 'textfield',
                    readOnly: true
                },
                flex: 2
            },
            {
                header: '下单日期',                 
                dataIndex: 'zdy2',
                editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                flex: 2
            },
            {
                header: '单号',                 
                dataIndex: 'saleno',
                editor: {
                    xtype: 'textfield'
                },
                flex: 2
            },
            {
                header: '总金额',              
                dataIndex: 'total',
                editor: {
                    xtype: 'numberfield',
                    readOnly: true
                },
                flex: 1
            },
            {
                header: '总数量',                 
                dataIndex: 'totalquantity',
                editor: {
                    xtype: 'numberfield',
                    readOnly: true
                },
                flex: 1
            },
            {
                header: '类型', 
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-16'),
                    valueField: 'keyname',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: '选择类型',
                    editable: true,
                    allowBlank: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 2
            },    
            {
                header: '客户', 
                dataIndex: 'zdy5',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Customer-outstocks'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '选择客户',
                    editable: true,
                    allowBlank: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 3
            },  
            {
                header: '收货地址',                 
                dataIndex: 'zdy8',
                editor: {
                    xtype: 'textfield'
                },
                flex: 5
            },
            {
                header: '收货人',                 
                dataIndex: 'zdy6',
                editor: {
                    xtype: 'textfield'
                },
                flex: 2
            },
            {
                header: '收货电话',                 
                dataIndex: 'zdy7',
                editor: {
                    xtype: 'textfield'
                },
                flex: 2
            },                     
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看明细',
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
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Sales',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});