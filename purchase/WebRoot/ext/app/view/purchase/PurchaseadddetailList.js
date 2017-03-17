var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.purchase.PurchaseadddetailList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.purchaseadddetaillist',
    id: 'purchaseadddetailGrid',
    requires: [
               'M.model.Purchasedetail',
               'M.store.Purchasedetails',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Purchasedetails',
    
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
            },
            {
            	header: '�ɹ���ID',
            	dataIndex: 'mainid',
            	editor: {
            		xtype: 'numberfield',
            		format: '0',
            		readOnly: true
            	},
            	flex: 1,
            	hidden: true
            },
            {
                header: '����',               
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Products-all'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: 'ѡ������',
                	editable: true,
            		pageSize:5,  
                    
            		listeners:{
//            			blur:function(type, the){
//            				alert(type.getPosition());
//            			}
            			'select':function(combo,record,index){
//            				alert("1");
            			}
            		}
                }),
                width:350,
                renderer:function(value, metaData, record, rowIndex, colIndex){
                	record.set('productno',value.split("-")[0]);
                	return value.split("-")[1];
                }
            },
            {
                header: '���',               
                dataIndex: 'zdy3',
                editor: {
            		xtype: 'textfield',
            		readOnly: true
            	},
                flex: 1,
            	hidden: true
            },
            {
            	header: '����',             	
            	dataIndex: 'productno',
            	editor: {
            		xtype: 'textfield',
            		readOnly: true
            	},
            	flex: 1
            },            
            {
                header: '��λ', 
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Productunits-all'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: 'ѡ��λ',
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
                header: '����', 
                dataIndex: 'quantity',
                editor: {
                    xtype: 'numberfield',
                    format: '0.0'
                },
                flex: 1
            },
            {
                header: '����', 
                dataIndex: 'price',
                editor: {
                    xtype: 'numberfield',
                    format: '0.0'
                },
                flex: 1
            },
            {
                header: '���', 
                dataIndex: 'money',
                editor: {
                    xtype: 'numberfield',
                    format: '0.00',
                    readOnly: true
                },
                flex: 1,
                renderer:function(value, metaData, record, rowIndex, colIndex){
                	return (record.get('quantity')*record.get('price')).toFixed(2);
                }
            }     
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'detailadd',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {
                    	id: 'detaildelete',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ɾ��'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Purchasedetails',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});