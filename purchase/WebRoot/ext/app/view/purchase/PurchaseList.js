var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.purchase.PurchaseList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.purchaselist',
    id: 'purchaseGrid',
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
            	flex: 1
            },
            {
                header: '��Ʒ',               
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Products'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: 'ѡ���Ʒ',
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
                header: '���',               
                dataIndex: 'zdy3',
                editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Productspecs'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: 'ѡ����',
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
                header: '��λ', 
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Productunits'),
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
                header: '���', 
                dataIndex: 'money',
                editor: {
                    xtype: 'numberfield',
                    readOnly: true
                },
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
            } ,
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'detaildelete',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/delete.png',
                    tooltip: 'ɾ��',
                    scope: this
                }]
            }           
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'detailadd',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����',  
			            icon : 'images/add.png'
                    },
                    {
                    	id: 'detailsave',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����',
                    	icon : 'images/save.png'
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