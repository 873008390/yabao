var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
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
    
    title : '医生患者',

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
            	header: '登记日期',             	
            	dataIndex: 'zdy7',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '姓名',             	
            	dataIndex: 'name',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '编码',             	
            	dataIndex: 'customerno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
                id: 'salerid',
                header: '推荐人', 
                dataIndex: 'zdy2',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 1
            }, 
            {
                id: 'provinceid',
                header: '所属省份', 
                dataIndex: 'zdy3',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 1
            },            
            {
                id: 'cityid',
                header: '所在城市', 
                dataIndex: 'zdy4',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 1
            },           
            {
                id: 'townid',
                header: '所在县/镇', 
                dataIndex: 'zdy5',
                editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                flex: 1
            },               
            {
            	header: '详细地址', 
            	dataIndex: 'addressdetail',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },            
            {
            	header: '病种', 
            	dataIndex: 'sicknesstype',
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
            },
            {
                header: '年龄', 
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