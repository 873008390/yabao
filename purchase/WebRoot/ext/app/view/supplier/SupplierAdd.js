Ext.define('M.view.supplier.SupplierAdd' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.supplieradd',
    
    requires: [
               'Ext.grid.*',
               'Ext.form.*',
               'Ext.selection.CellModel'
              ],
    
    title : '新增供应商',
    
    bodyPadding: 7,
    
    url: 'supplier/onlineadd.action',  

    items: [
			{
				bodyStyle: {
					border: '#ffffff solid 1px',
					background: '#ffffff',padding: '0 0 5 0'
				},
				items:[{
					layout: 'column',
					frame: false,
					padding: '5 5 5 5',
					width: 1450,
					bodyStyle: {
						border: '#ffffff solid 1px',
						background: '#ffffff',padding: '0 0 5 0'
					},                	
					items: [
							{
								id: 'supplierno',
								xtype: 'textfield',
								fieldLabel: '编号',
								name: 'supplierno',
								value: '自动生成',
								readOnly: true
							},
							{
								id: 'name',
								xtype: 'textfield',
								fieldLabel: '名称',
								padding: '0 0 0 30',
					            name: 'supplier.name',
								value: ''
							},
							{
								id: 'contactperson',
								xtype: 'textfield',
								fieldLabel: '联系人',
								padding: '0 0 0 30',
								name: 'supplier.contactperson',
								value: ''
							},
							{
								id: 'phoneno',
								xtype: 'textfield',
								fieldLabel: '手机号',
								padding: '0 0 0 30',
								name: 'supplier.phoneno',
								value: ''
							}
				     ]
				}]
			},
			{
				bodyStyle: {
					border: '#ffffff solid 1px',
					background: '#ffffff',padding: '0 0 5 0'
				},
				items:[{
					layout: 'column',
					frame: false,
					padding: '5 5 5 5',
					width: 1450,
					bodyStyle: {
						border: '#ffffff solid 1px',
						background: '#ffffff',padding: '0 0 5 0'
					},                	
					items: [							
							{
								id: 'tel',
								xtype: 'textfield',
								fieldLabel: '座机号',
								name: 'supplier.tel',
								value: ''
							},
							{
								id: 'bankaccount',
								xtype: 'textfield',
								fieldLabel: '银行账号',
								padding: '0 0 0 30',
					            name: 'supplier.bankaccount',
								value: ''
							},
							{
								id: 'bank',
								xtype: 'textfield',
								fieldLabel: '开户银行',
								padding: '0 0 0 30',
					            name: 'supplier.bank',
								value: ''
							},
							{
								id: 'bankname',
								xtype: 'textfield',
								fieldLabel: '开户名称',
								padding: '0 0 0 30',
					            name: 'supplier.bankname',
								value: ''
							}
				     ]
				}]
			} ,
			{
				bodyStyle: {
					border: '#ffffff solid 1px',
					background: '#ffffff',padding: '0 0 5 0'
				},
				items:[{
					layout: 'column',
					frame: false,
					padding: '5 5 5 5',
					width: 1450,
					bodyStyle: {
						border: '#ffffff solid 1px',
						background: '#ffffff',padding: '0 0 5 0'
					},                	
					items: [							
							{
								id: 'fax',
								xtype: 'textfield',
								fieldLabel: '传真号',
								name: 'supplier.fax',
								value: ''
							},
							{
								id: 'companycode',
								xtype: 'textfield',
								fieldLabel: '营业执照',
								padding: '0 0 0 30',
					            name: 'supplier.companycode',
								value: ''
							},
							{
								id: 'taxrate',
								xtype: 'textfield',
								fieldLabel: '默认税率(%)',
								padding: '0 0 0 30',
					            name: 'supplier.taxrate',
								value: ''
							},
							{
								id: 'iscompany',
								xtype: 'combobox',
					            size: 40,
								fieldLabel: '类型',
								padding: '0 0 0 30',
					            name: 'supplier.iscompany',
					            store: Ext.create('M.store.Keyvalues-13'),
					            valueField: 'value',
					            displayField: 'keyname',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '请选择'
							}
				     ]
				}]
			},
			{
				bodyStyle: {
					border: '#ffffff solid 1px',
					background: '#ffffff',padding: '0 0 5 0'
				},
				items:[{
					layout: 'column',
					frame: false,
					padding: '5 5 5 5',
					width: 1450,
					bodyStyle: {
						border: '#ffffff solid 1px',
						background: '#ffffff',padding: '0 0 5 0'
					},                	
					items: [							
							{
								id: 'invoicetype',
								xtype: 'combobox',
					            size: 40,
								fieldLabel: '发票类型',
								name: 'supplier.invoicetype',
								store: Ext.create('M.store.Keyvalues-14'),
					            valueField: 'keyname',
					            displayField: 'keyname',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '请选择'
							},
							{
								id: 'taxtype',
								xtype: 'combobox',
					            size: 40,
								fieldLabel: '纳税类型',
								padding: '0 0 0 30',
					            name: 'supplier.taxtype',
					            store: Ext.create('M.store.Keyvalues-15'),
					            valueField: 'keyname',
					            displayField: 'keyname',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '请选择'
							},
							{
								id: 'province',
								xtype: 'combobox',
					            size: 40,
								fieldLabel: '省份',
								padding: '0 0 0 30',
								name: 'supplier.zdy2',
								store: Ext.create('M.store.Provinces'),
					            valueField: 'name',
					            displayField: 'name',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '请选择'
							},
							{
								id: 'city',
								xtype: 'combobox',
					            size: 40,
								fieldLabel: '城市',
								padding: '0 0 0 30',
					            name: 'supplier.zdy3',
					            store: Ext.create('M.store.Citys'),
					            valueField: 'name',
					            displayField: 'name',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '请选择'
							}
				     ]
				}]
			},
			{
				bodyStyle: {
					border: '#ffffff solid 1px',
					background: '#ffffff',padding: '0 0 5 0'
				},
				items:[{
					layout: 'column',
					frame: false,
					padding: '5 5 5 5',
					width: 1450,
					bodyStyle: {
						border: '#ffffff solid 1px',
						background: '#ffffff',padding: '0 0 5 0'
					},                	
					items: [							
							{
								id: 'address',
								xtype: 'textfield',
								fieldLabel: '详细地址',
								maxSize: 100,
								name: 'supplier.address',
								value: ''
							}
				     ]
				}]
			}         
          ],
	
	//Reset and Submit buttons
	buttons: [ 
			  {
			    text: '返回',
			    action: 'clear',
			    handler: function() {
			    	self.location = 'supplierlist.html?idtype=allwithlimit&typeid=0';
			    }
			  }, 
			  '->',
			  {
			    text: '保存',
			    action: 'save',
			    formBind: true, //only enabled once the form is valid
			    disabled: true
			}]
});
