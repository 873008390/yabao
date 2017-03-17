var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.patientsale.PatientsaleoutlineList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.patientsaleoutlinelist',
    id: 'patientsaleoutlineGrid',
    requires: [
               'M.model.Customer',
               'M.store.Customer-patientsales',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Customer-patientsales',
    
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
            	header: '省份',             	
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '城市',             	
            	dataIndex: 'zdy4',
            	editor: {
            		xtype: 'textfield',
            		readOnly: true
            	},
            	flex: 1
            },
            {
            	header: '患者数量',             	
            	dataIndex: 'age',
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
        store: 'Customer-patientsales',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});