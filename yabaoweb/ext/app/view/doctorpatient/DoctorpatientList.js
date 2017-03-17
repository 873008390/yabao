var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.doctorpatient.DoctorpatientList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.doctorpatientlist',
    id: 'doctorpatientGrid',
    requires: [
               'M.model.Customer',
               'M.store.Customer-doctorpatients',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Customer-doctorpatients',
    
    title : 'ҽ������',

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
            	header: '�Ǽ�����',             	
            	dataIndex: 'zdy7',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '����',             	
            	dataIndex: 'name',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '����',             	
            	dataIndex: 'customerno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
                id: 'salerid',
                header: '�Ƽ���', 
                dataIndex: 'zdy2',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 1
            }, 
            {
                id: 'provinceid',
                header: '����ʡ��', 
                dataIndex: 'zdy3',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 1
            },            
            {
                id: 'cityid',
                header: '���ڳ���', 
                dataIndex: 'zdy4',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 1
            },           
            {
                id: 'townid',
                header: '������/��', 
                dataIndex: 'zdy5',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 1
            },               
            {
            	header: '��ϸ��ַ', 
            	dataIndex: 'addressdetail',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },            
            {
            	header: '����', 
            	dataIndex: 'sicknesstype',
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
            },
            {
                header: '����', 
                dataIndex: 'age',
                xtype: 'numbercolumn',
                format: '0',
                editor: {
                    maxValue: 110,
                    minValue: 0,
                	format: '0',
                    xtype: 'numberfield'
                },
                flex: 1
            }        
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Customer-doctorpatients',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});