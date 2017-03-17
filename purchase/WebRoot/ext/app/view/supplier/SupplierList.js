//var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
//            pluginId:'celledit', 
//            saveBtnText: '����', 
//            cancelBtnText: "ȡ��", 
//            autoCancel: true, 
//            clicksToEdit:2 
//        });

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

    selType: 'rowmodel',
              
    columnLines : true,
              
//    plugins: [
//              cellEdit
//             ],
    
    store: 'Suppliers',
    
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
            	header: '�Ǽ�����',             	
            	dataIndex: 'zdy8',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                width: 200
            },
            {
            	header: '����',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
                width: 400
            },                 
            {
                header: '���״̬', 
                dataIndex: 'zdy3',
                editor: {
                	readOnly: true,
                    xtype: 'textfield'
                },
                width: 100
            },           
            {
                header: '����', 
                dataIndex: 'zdy2',
                editor: {
                	readOnly: true,
                    xtype: 'textfield'
                },
                width: 200
            },  
            {
            	header: '����',             	
            	dataIndex: 'supplierno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                width: 100
            },              
            {
            	header: '��ϸ��ַ', 
            	dataIndex: 'address',
            	editor: {
            		xtype: 'textfield'
            	},
                width: 400
            },               
            {
            	header: '��ϵ��', 
            	dataIndex: 'contactperson',
            	editor: {
            		xtype: 'textfield'
            	},
                width: 100
            },             
            {
            	header: '�ֻ���', 
            	dataIndex: 'phoneno',
            	editor: {
            		xtype: 'textfield'
            	},
                width: 100
            },
            {
                header: '������', 
                dataIndex: 'tel',
                editor: {
                    xtype: 'textfield'
                },
                width: 100
            },   
            {
                header: '����', 
                dataIndex: 'fax',
                editor: {
                    xtype: 'textfield'
                },
                width: 100
            },      
            {
                header: '��������', 
                dataIndex: 'bank',
                editor: {
                    xtype: 'textfield'
                },
                width: 200
            },   
            {
                header: '��������', 
                dataIndex: 'bankname',
                editor: {
                    xtype: 'textfield'
                },
                width: 400
            },   
            {
                header: '�����˺�', 
                dataIndex: 'bankaccount',
                editor: {
                    xtype: 'textfield'
                },
                width: 200
            },      
            {
                header: 'Ӫҵִ�պ���', 
                dataIndex: 'companycode',
                editor: {
                    xtype: 'textfield'
                },
                width: 200
            },      
            {
                header: 'Ĭ��˰��(%)', 
                dataIndex: 'taxrate',
                editor: {
                    xtype: 'numberfield'
                },
                width: 100
            },   
            {
            	header: '����(1��ʾ��˾��0��ʾ����)', 
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
                width: 200
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
                width: 200
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
                width: 200
            },     
            {
            	header: 'ʡ��', 
            	dataIndex: 'zdy6',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Provinces'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: 'ѡ��',
                	editable: true,
            		
            		listeners:{
//            			blur:function(type, the){
//            				alert(type.getPosition());
//            			}
            		}
                }),
                width: 100
            },     
/*            {
            	header: '����', 
            	dataIndex: 'zdy7',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Citys'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: 'ѡ��',
                	editable: true,
            		
            		listeners:{
//            			blur:function(type, the){
//            				alert(type.getPosition());
//            			}
            		}
                }),
                width: 100
            }, */ 
            {
                header: '��������', 
                dataIndex: 'filenum',
                editor: {
                	readOnly: true,
                    xtype: 'numberfield'
                },
                width: 100
            }
//            ,{            	
//                xtype: 'actioncolumn',
//                width: 30,
//                id: 'upload',
//                sortable: false,
//                menuDisabled: true,
//                items: [{
//                    icon: 'images/add.png',
//                    tooltip: '�ϴ�����',
//                    scope: this
//                }]
//            },
//            {            	
//                xtype: 'actioncolumn',
//                width: 30,
//                id: 'information',
//                sortable: false,
//                menuDisabled: true,
//                items: [{
//                    icon: 'images/information.png',
//                    tooltip: '�鿴�����ļ�',
//                    scope: this
//                }]
//            },
//            {            	
//                xtype: 'actioncolumn',
//                width: 30,
//                id: 'delete',
//                sortable: false,
//                menuDisabled: true,
//                items: [{
//                    icon: 'images/delete.png',
//                    tooltip: 'ɾ��',
//                    scope: this
//                }]
//            }
        ];
        

        this.tbar = [ 
                    {
                    	id: 'add',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
                    },
                    {
                    	id: 'information',
                    	xtype: 'button',
                    	scope: this,
                    	text : '�鿴����'
                    },
/*                    {
                    	id: 'upload',
                    	xtype: 'button',
                    	scope: this,
                    	text : '�ϴ�����'
                    },*/
                    {
                    	id: 'informationlog',
                    	xtype: 'button',
                    	scope: this,
                    	text : '�鿴��־'
                    },
                    {
                    	id: 'modify',
                    	xtype: 'button',
                    	scope: this,
                    	text : '�޸�'
                    },
                    {
                    	id: 'delete',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ɾ��'
                    },
                    {
                    	id: 'auditing',
                    	xtype: 'button',
                    	scope: this,
                    	text : '�����'
                    },
                    {
                    	id: 'audited',
                    	xtype: 'button',
                    	scope: this,
                    	text : '�����'
                    },
                    {
                    	id: 'all',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ȫ��'
                    },
                    {
                     	id: 'exportexcel',
                     	xtype: 'button',
                     	scope: this,
                     	text : 'excel����'
                     },{
                    	id: 'syn',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ͬ��'
                    }/*,
                     {
                     	id: 'exportpdf',
                     	xtype: 'button',
                     	scope: this,
                     	text : 'PDF����'
                     }*/,
                    '->',
                    {
                    	id: 'keyword',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: 'ģ������'
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