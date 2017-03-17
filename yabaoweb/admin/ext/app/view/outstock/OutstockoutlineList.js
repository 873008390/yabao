var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.outstock.OutstockoutlineList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.outstockoutlinelist',
    id: 'outstockoutlineGrid',
    requires: [
               'M.model.Outstock',
               'M.store.Outstocks',
               'M.model.Keyvalue',
               'M.store.Keyvalues-14',
               'M.model.Customer',
               'M.store.Customer-outstocks',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Outstocks',
    
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
                header: '录入人',                 
                dataIndex: 'zdy3',
                editor: {
                    xtype: 'textfield',
                    readOnly: true
                },
                flex: 1
            },
            {
                header: '出库单号',                 
                dataIndex: 'outstockno',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
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
                flex: 1
            },  
            {
                header: '出库日期',                 
                dataIndex: 'zdy2',
                editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                flex: 1
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
                header: '出库类型', 
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-14'),
                    valueField: 'keyname',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: '选择入库类型',
                    editable: true,
                    allowBlank: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
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
        store: 'Outstocks',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});