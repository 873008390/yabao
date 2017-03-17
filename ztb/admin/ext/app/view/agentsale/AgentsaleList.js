var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.agentsale.AgentsaleList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.agentsalelist',
    id: 'agentsaleGrid',
    requires: [
               'M.model.Sale',
               'M.store.Sales',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Sales',
    
    title : '代理',

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
            	header: '名称',             	
            	dataIndex: 'zdy5',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '总数量',             	
            	dataIndex: 'totalquantity',
            	editor: {
            		xtype: 'numberfield'
            	},
            	flex: 1
            },
            {
                header: '本月购买', 
                dataIndex: 'zdy6',
                editor: {
            		xtype: 'numberfield'
            	},
                flex: 1
            },   
            {
                header: '上月购买', 
                dataIndex: 'zdy7',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },   
    
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