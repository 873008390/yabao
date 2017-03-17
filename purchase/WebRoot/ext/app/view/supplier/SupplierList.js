//var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
//            pluginId:'celledit', 
//            saveBtnText: '保存', 
//            cancelBtnText: "取消", 
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
            	header: '登记日期',             	
            	dataIndex: 'zdy8',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                width: 200
            },
            {
            	header: '名称',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
                width: 400
            },                 
            {
                header: '审核状态', 
                dataIndex: 'zdy3',
                editor: {
                	readOnly: true,
                    xtype: 'textfield'
                },
                width: 100
            },           
            {
                header: '机构', 
                dataIndex: 'zdy2',
                editor: {
                	readOnly: true,
                    xtype: 'textfield'
                },
                width: 200
            },  
            {
            	header: '编码',             	
            	dataIndex: 'supplierno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
                width: 100
            },              
            {
            	header: '详细地址', 
            	dataIndex: 'address',
            	editor: {
            		xtype: 'textfield'
            	},
                width: 400
            },               
            {
            	header: '联系人', 
            	dataIndex: 'contactperson',
            	editor: {
            		xtype: 'textfield'
            	},
                width: 100
            },             
            {
            	header: '手机号', 
            	dataIndex: 'phoneno',
            	editor: {
            		xtype: 'textfield'
            	},
                width: 100
            },
            {
                header: '座机号', 
                dataIndex: 'tel',
                editor: {
                    xtype: 'textfield'
                },
                width: 100
            },   
            {
                header: '传真', 
                dataIndex: 'fax',
                editor: {
                    xtype: 'textfield'
                },
                width: 100
            },      
            {
                header: '开户银行', 
                dataIndex: 'bank',
                editor: {
                    xtype: 'textfield'
                },
                width: 200
            },   
            {
                header: '开户名称', 
                dataIndex: 'bankname',
                editor: {
                    xtype: 'textfield'
                },
                width: 400
            },   
            {
                header: '银行账号', 
                dataIndex: 'bankaccount',
                editor: {
                    xtype: 'textfield'
                },
                width: 200
            },      
            {
                header: '营业执照号码', 
                dataIndex: 'companycode',
                editor: {
                    xtype: 'textfield'
                },
                width: 200
            },      
            {
                header: '默认税率(%)', 
                dataIndex: 'taxrate',
                editor: {
                    xtype: 'numberfield'
                },
                width: 100
            },   
            {
            	header: '类型(1表示公司，0表示个人)', 
            	dataIndex: 'iscompany',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Keyvalues-13'),
                	valueField: 'value',
                	displayField: 'keyname',
                	queryMode: 'local',
                	emptyText: '选择参标类型',
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
            	header: '发票类型', 
            	dataIndex: 'invoicetype',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Keyvalues-14'),
                	valueField: 'keyname',
                	displayField: 'keyname',
                	queryMode: 'local',
                	emptyText: '选择发票类型',
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
            	header: '纳税类型', 
            	dataIndex: 'taxtype',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Keyvalues-15'),
                	valueField: 'keyname',
                	displayField: 'keyname',
                	queryMode: 'local',
                	emptyText: '选择纳税类型',
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
            	header: '省份', 
            	dataIndex: 'zdy6',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Provinces'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: '选择',
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
            	header: '城市', 
            	dataIndex: 'zdy7',
            	editor: new Ext.form.ComboBox({
                	store: Ext.create('M.store.Citys'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'local',
                	emptyText: '选择',
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
                header: '附件数量', 
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
//                    tooltip: '上传附件',
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
//                    tooltip: '查看资质文件',
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
//                    tooltip: '删除',
//                    scope: this
//                }]
//            }
        ];
        

        this.tbar = [ 
                    {
                    	id: 'add',
                    	xtype: 'button',
                    	scope: this,
                    	text : '新增'
                    },
                    {
                    	id: 'information',
                    	xtype: 'button',
                    	scope: this,
                    	text : '查看附件'
                    },
/*                    {
                    	id: 'upload',
                    	xtype: 'button',
                    	scope: this,
                    	text : '上传附件'
                    },*/
                    {
                    	id: 'informationlog',
                    	xtype: 'button',
                    	scope: this,
                    	text : '查看日志'
                    },
                    {
                    	id: 'modify',
                    	xtype: 'button',
                    	scope: this,
                    	text : '修改'
                    },
                    {
                    	id: 'delete',
                    	xtype: 'button',
                    	scope: this,
                    	text : '删除'
                    },
                    {
                    	id: 'auditing',
                    	xtype: 'button',
                    	scope: this,
                    	text : '审核中'
                    },
                    {
                    	id: 'audited',
                    	xtype: 'button',
                    	scope: this,
                    	text : '已审核'
                    },
                    {
                    	id: 'all',
                    	xtype: 'button',
                    	scope: this,
                    	text : '全部'
                    },
                    {
                     	id: 'exportexcel',
                     	xtype: 'button',
                     	scope: this,
                     	text : 'excel导出'
                     },{
                    	id: 'syn',
                    	xtype: 'button',
                    	scope: this,
                    	text : '同步'
                    }/*,
                     {
                     	id: 'exportpdf',
                     	xtype: 'button',
                     	scope: this,
                     	text : 'PDF导出'
                     }*/,
                    '->',
                    {
                    	id: 'keyword',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '模糊搜索'
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