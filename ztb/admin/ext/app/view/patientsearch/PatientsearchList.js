var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.patientsearch.PatientsearchList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.patientsearchlist',
    id: 'patientsearchGrid',
    requires: [
               'M.model.Customer',
               'M.store.Customer-patientsearchs',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Customer-patientsearchs',
    
    title : '患者',

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
            	header: '姓名',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '编码',             	
            	dataIndex: 'customerno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },   
            {
                id: 'salerid',
                header: '推荐人', 
                dataIndex: 'zdy2',
                editor: {
            		xtype: 'textfield'
            	},
                flex: 1
            },         
            {
                id: 'provinceid',
                header: '所属省份', 
                dataIndex: 'zdy3',
                editor: {
            		xtype: 'textfield'
            	},
                flex: 1
            },            
            {
                id: 'cityid',
                header: '所在城市', 
                dataIndex: 'zdy4',
                editor: {
            		xtype: 'textfield'
            	},
                flex: 1
            },           
            {
                id: 'townid',
                header: '所在县/镇', 
                dataIndex: 'zdy5',
                editor: {
            		xtype: 'textfield'
            	},
                flex: 1
            },  
            {
            	header: '手机号', 
            	dataIndex: 'phoneno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '座机号', 
            	dataIndex: 'tel',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Customer-patientsearchs',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});