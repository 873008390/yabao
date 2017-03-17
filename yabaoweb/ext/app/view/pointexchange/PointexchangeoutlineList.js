var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.pointexchange.PointexchangeoutlineList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pointexchangeoutlinelist',
    id: 'pointexchangeoutlineGrid',
    requires: [
               'M.model.Customer',
               'M.store.Customers',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Customers',
    
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
            	hidden: true
            },
            {
            	header: '客户',             	
            	dataIndex: 'customerid',
            	editor: {
            		readOnly: true,
            		xtype: 'numberfield'
            	},
            	flex: 1
            },
            {
            	header: '兑换日期',             	
            	dataIndex: 'exchangedate',
            	editor: {
            		xtype: 'datepicker',
            		readOnly: true
            	},
            	flex: 1
            },
            {
            	header: '兑换单号',             	
            	dataIndex: 'exchangeno',
            	editor: {
            		xtype: 'textfield',
            		readOnly: true
            	},
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
                header: '录入人',                 
                dataIndex: 'userid',
                editor: {
                    xtype: 'numberfield',
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
                    tooltip: '查看所有医生',
                    scope: this
                }]
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'back',
                    	xtype: 'button',
			        	scope: this,  
			            text : '返回',  
			            icon : 'images/back.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Customers',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});