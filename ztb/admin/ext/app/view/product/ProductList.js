var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.product.ProductList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.productlist',
    id: 'productGrid',
    requires: [
               'M.model.Product',
               'M.store.Products',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Products',
    
    title : '��Ʒ',

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
            	header: 'zdy10',
            	dataIndex: 'zdy10',
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
            	header: '���',             	
            	dataIndex: 'zdy2',
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
            	header: '����',             	
            	dataIndex: 'zdy3',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Producttypes'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: 'ѡ������',
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
            	header: '��Ч�ڣ��£�',             	
            	dataIndex: 'periodofvalidity',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1
            },
            {
            	header: '���߹���',             	
            	dataIndex: 'type',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
        			maxValue: 1,
            		minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'delete',
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
                    	id: 'add',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����',  
			            icon : 'images/add.png'
                    },
                    {
                    	id: 'save',
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
        store: 'Products',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});