var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
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
    
    title : '����',

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
            	header: '����',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '����',             	
            	dataIndex: 'customerno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },   
            {
                id: 'salerid',
                header: '�Ƽ���', 
                dataIndex: 'zdy2',
                editor: {
            		xtype: 'textfield'
            	},
                flex: 1
            },         
            {
                id: 'provinceid',
                header: '����ʡ��', 
                dataIndex: 'zdy3',
                editor: {
            		xtype: 'textfield'
            	},
                flex: 1
            },            
            {
                id: 'cityid',
                header: '���ڳ���', 
                dataIndex: 'zdy4',
                editor: {
            		xtype: 'textfield'
            	},
                flex: 1
            },           
            {
                id: 'townid',
                header: '������/��', 
                dataIndex: 'zdy5',
                editor: {
            		xtype: 'textfield'
            	},
                flex: 1
            },  
            {
            	header: '�ֻ���', 
            	dataIndex: 'phoneno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '������', 
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