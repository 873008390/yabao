Ext.define('M.view.audit.AuditcontentList' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.auditcontentlist',
    
    requires: [
               'Ext.grid.*',
               'Ext.form.*',
               'Ext.selection.CellModel'
              ],
    
    title : '',
    
    bodyPadding: 7,

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
								value: '',
								readOnly: true
							},
							{
								id: 'id',
								xtype: 'textfield',
								fieldLabel: 'ID',
								padding: '0 0 0 30',
					            name: 'id',
								value: '',
								readOnly: true
							},
							{
								id: 'name',
								xtype: 'textfield',
								fieldLabel: '��Ӧ��',
								padding: '0 0 0 30',
					            name: 'name',
								value: '',
								readOnly: true
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
								name: 'tel',
								value: '',
								readOnly: true
							},
							{
								id: 'phoneno',
								xtype: 'textfield',
								fieldLabel: '�ֻ���',
								padding: '0 0 0 30',
								name: 'phoneno',
								value: '',
								readOnly: true
							},
							{
								id: 'bankaccount',
								xtype: 'textfield',
								fieldLabel: '�����˺�',
								padding: '0 0 0 30',
					            name: 'bankaccount',
								value: '',
								readOnly: true
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
								name: 'fax',
								value: '',
								readOnly: true
							},
							{
								id: 'taxrate',
								xtype: 'textfield',
								fieldLabel: 'Ĭ��˰��',
								padding: '0 0 0 30',
					            name: 'taxrate',
								value: '',
								readOnly: true
							},
							{
								id: 'bankname',
								xtype: 'textfield',
								fieldLabel: '��������',
								padding: '0 0 0 30',
					            name: 'bankname',
								value: '',
								readOnly: true
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
								xtype: 'textfield',
								fieldLabel: '��Ʊ����',
								name: 'invoicetype',
								value: '',
								readOnly: true
							},
							{
								id: 'taxtype',
								xtype: 'textfield',
								fieldLabel: '��˰����',
								padding: '0 0 0 30',
					            name: 'taxtype',
								value: '',
								readOnly: true
							},
							{
								id: 'bank',
								xtype: 'textfield',
								fieldLabel: '��������',
								padding: '0 0 0 30',
					            name: 'bank',
								value: '',
								readOnly: true
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
								id: 'type',
								xtype: 'textfield',
								fieldLabel: '����',
					            name: 'type',
								value: '',
								readOnly: true
							},
							{
								id: 'contactperson',
								xtype: 'textfield',
								fieldLabel: '��ϵ��',
								padding: '0 0 0 30',
								name: 'contactperson',
								value: '',
								readOnly: true
							},
							{
								id: 'companycode',
								xtype: 'textfield',
								fieldLabel: 'Ӫҵִ��',
								padding: '0 0 0 30',
					            name: 'companycode',
								value: '',
								readOnly: true
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
								id: 'provinceid',
								xtype: 'textfield',
								fieldLabel: 'ʡ��',
					            name: 'zdy6',
								value: '',
								readOnly: true
							},
							{
								id: 'cityid',
								xtype: 'textfield',
								fieldLabel: '����',
								padding: '0 0 0 30',
					            name: 'zdy7',
								value: '',
								readOnly: true
							},
							{
								id: 'address',
								xtype: 'textfield',
								fieldLabel: '��ϸ��ַ',
								padding: '0 0 0 30',
								name: 'address',
								value: '',
								readOnly: true
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
					padding: '55 5 5 5',
					width: 1450,
					bodyStyle: {
						border: '#ffffff solid 1px',
						background: '#ffffff',padding: '0 0 5 0'
					},                	
					items: [							
							{
								id: 'operation',
								xtype: 'combobox',
					            size: 20,
								fieldLabel: '��˽��',
								name: 'operation',
								store: Ext.create('M.store.Keyvalues-17'),
					            valueField: 'keyname',
					            displayField: 'keyname',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: 'ѡ��',
								columnWidth: 0.3
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
								id: 'memo',
								xtype: 'textareafield',
								fieldLabel: '������',
								padding: '0 0 0 0',
					            name: 'memo',
								value: '',
								cols: 126,
								rows: 5
							}
				     ]
				}]
			}
//			,{
//				bodyStyle: {
//					border: '#ffffff solid 1px',
//					background: '#ffffff',padding: '0 0 5 0'
//				},
//				items:[{
//					layout: 'column',
//					frame: false,
//					padding: '5 5 5 5',
//					width: 1450,
//					bodyStyle: {
//						border: '#ffffff solid 1px',
//						background: '#ffffff',padding: '0 0 5 0'
//					},                	
//					items: [							
//							{
//								id: 'currentauditgroup',
//								xtype: 'textfield',
//								fieldLabel: '��ǰ�����',
//								padding: '0 0 0 0',
//					            name: 'currentauditgroup',
//								value: '',
//								readOnly: true
//							},
//							{
//								id: 'currentaudituser',
//								xtype: 'textfield',
//								fieldLabel: '��ǰ�����',
//								padding: '0 0 0 30',
//					            name: 'currentaudituser',
//								value: '',
//								readOnly: true
//							}
//				     ]
//				}]
//			}          
          ],
	
	//Reset and Submit buttons
	buttons: [ 
			 {
			    text: '����',
			    action: 'back',
			    formBind: true, //only enabled once the form is valid
			    disabled: true
			 },
			 '->',
			  {
			    text: '�ύ',
			    action: 'audit',
			    formBind: true, //only enabled once the form is valid
			    disabled: true
			}]
});
