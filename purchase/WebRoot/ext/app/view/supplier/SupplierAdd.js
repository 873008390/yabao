Ext.define('M.view.supplier.SupplierAdd' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.supplieradd',
    
    requires: [
               'Ext.grid.*',
               'Ext.form.*',
               'Ext.selection.CellModel'
              ],
    
    title : '������Ӧ��',
    
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
								fieldLabel: '���',
								name: 'supplierno',
								value: '�Զ�����',
								readOnly: true
							},
							{
								id: 'name',
								xtype: 'textfield',
								fieldLabel: '����',
								padding: '0 0 0 30',
					            name: 'supplier.name',
								value: ''
							},
							{
								id: 'contactperson',
								xtype: 'textfield',
								fieldLabel: '��ϵ��',
								padding: '0 0 0 30',
								name: 'supplier.contactperson',
								value: ''
							},
							{
								id: 'phoneno',
								xtype: 'textfield',
								fieldLabel: '�ֻ���',
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
								fieldLabel: '������',
								name: 'supplier.tel',
								value: ''
							},
							{
								id: 'bankaccount',
								xtype: 'textfield',
								fieldLabel: '�����˺�',
								padding: '0 0 0 30',
					            name: 'supplier.bankaccount',
								value: ''
							},
							{
								id: 'bank',
								xtype: 'textfield',
								fieldLabel: '��������',
								padding: '0 0 0 30',
					            name: 'supplier.bank',
								value: ''
							},
							{
								id: 'bankname',
								xtype: 'textfield',
								fieldLabel: '��������',
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
								fieldLabel: '�����',
								name: 'supplier.fax',
								value: ''
							},
							{
								id: 'companycode',
								xtype: 'textfield',
								fieldLabel: 'Ӫҵִ��',
								padding: '0 0 0 30',
					            name: 'supplier.companycode',
								value: ''
							},
							{
								id: 'taxrate',
								xtype: 'textfield',
								fieldLabel: 'Ĭ��˰��(%)',
								padding: '0 0 0 30',
					            name: 'supplier.taxrate',
								value: ''
							},
							{
								id: 'iscompany',
								xtype: 'combobox',
					            size: 40,
								fieldLabel: '����',
								padding: '0 0 0 30',
					            name: 'supplier.iscompany',
					            store: Ext.create('M.store.Keyvalues-13'),
					            valueField: 'value',
					            displayField: 'keyname',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '��ѡ��'
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
								fieldLabel: '��Ʊ����',
								name: 'supplier.invoicetype',
								store: Ext.create('M.store.Keyvalues-14'),
					            valueField: 'keyname',
					            displayField: 'keyname',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '��ѡ��'
							},
							{
								id: 'taxtype',
								xtype: 'combobox',
					            size: 40,
								fieldLabel: '��˰����',
								padding: '0 0 0 30',
					            name: 'supplier.taxtype',
					            store: Ext.create('M.store.Keyvalues-15'),
					            valueField: 'keyname',
					            displayField: 'keyname',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '��ѡ��'
							},
							{
								id: 'province',
								xtype: 'combobox',
					            size: 40,
								fieldLabel: 'ʡ��',
								padding: '0 0 0 30',
								name: 'supplier.zdy2',
								store: Ext.create('M.store.Provinces'),
					            valueField: 'name',
					            displayField: 'name',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '��ѡ��'
							},
							{
								id: 'city',
								xtype: 'combobox',
					            size: 40,
								fieldLabel: '����',
								padding: '0 0 0 30',
					            name: 'supplier.zdy3',
					            store: Ext.create('M.store.Citys'),
					            valueField: 'name',
					            displayField: 'name',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '��ѡ��'
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
								fieldLabel: '��ϸ��ַ',
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
			    text: '����',
			    action: 'clear',
			    handler: function() {
			    	self.location = 'supplierlist.html?idtype=allwithlimit&typeid=0';
			    }
			  }, 
			  '->',
			  {
			    text: '����',
			    action: 'save',
			    formBind: true, //only enabled once the form is valid
			    disabled: true
			}]
});
