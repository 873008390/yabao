var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.supplier.SupplierList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.supplierlist',
    id: 'supplierGrid',
    requires: [
               'M.model.Supplier',
               'M.store.Suppliers',
               'M.model.Keyvalue',
               'M.store.Keyvalues-13',
               'M.store.Keyvalues-14',
               'M.store.Keyvalues-15',
               'M.model.User',
               'M.store.User-suppliers',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Suppliers',
    
    title : '',

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
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '����',             	
            	dataIndex: 'supplierno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },              
            {
            	header: '��ϸ��ַ', 
            	dataIndex: 'address',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },               
            {
            	header: '��ϵ��', 
            	dataIndex: 'contactperson',
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
                dataIndex: 'fax',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },      
            {
                header: '��������', 
                dataIndex: 'bank',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },   
            {
                header: '��������', 
                dataIndex: 'bankname',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },   
            {
                header: '�����˺�', 
                dataIndex: 'bankaccount',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },      
            {
                header: 'Ӫҵִ�պ���', 
                dataIndex: 'companycode',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },      
            {
                header: 'Ĭ��˰��', 
                dataIndex: 'taxrate',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },   
            {
            	header: '�α�����(1��ʾ��˾��0��ʾ����)', 
            	dataIndex: 'iscompany',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Keyvalues-13'),
                	valueField: 'value',
                	displayField: 'keyname',
                	queryMode: 'local',
                	emptyText: 'ѡ��α�����',
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
            	header: '��Ʊ����', 
            	dataIndex: 'invoicetype',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Keyvalues-14'),
                	valueField: 'keyname',
                	displayField: 'keyname',
                	queryMode: 'local',
                	emptyText: 'ѡ��Ʊ����',
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
            	header: '��˰����', 
            	dataIndex: 'taxtype',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Keyvalues-15'),
                	valueField: 'keyname',
                	displayField: 'keyname',
                	queryMode: 'local',
                	emptyText: 'ѡ����˰����',
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
                header: '��������', 
                dataIndex: 'filenum',
                editor: {
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
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '�鿴�����ļ�',
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
                    },
                    '->',
                    {
                    	id: 'keyword',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '������ؼ���'
                    },
                    {
                    	id: 'search',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Suppliers',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});