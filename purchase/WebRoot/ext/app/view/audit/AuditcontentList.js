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
								fieldLabel: '编号',
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
								fieldLabel: '供应商',
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
								fieldLabel: '座机号',
								name: 'tel',
								value: '',
								readOnly: true
							},
							{
								id: 'phoneno',
								xtype: 'textfield',
								fieldLabel: '手机号',
								padding: '0 0 0 30',
								name: 'phoneno',
								value: '',
								readOnly: true
							},
							{
								id: 'bankaccount',
								xtype: 'textfield',
								fieldLabel: '银行账号',
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
								fieldLabel: '传真号',
								name: 'fax',
								value: '',
								readOnly: true
							},
							{
								id: 'taxrate',
								xtype: 'textfield',
								fieldLabel: '默认税率',
								padding: '0 0 0 30',
					            name: 'taxrate',
								value: '',
								readOnly: true
							},
							{
								id: 'bankname',
								xtype: 'textfield',
								fieldLabel: '开户名称',
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
								fieldLabel: '发票类型',
								name: 'invoicetype',
								value: '',
								readOnly: true
							},
							{
								id: 'taxtype',
								xtype: 'textfield',
								fieldLabel: '纳税类型',
								padding: '0 0 0 30',
					            name: 'taxtype',
								value: '',
								readOnly: true
							},
							{
								id: 'bank',
								xtype: 'textfield',
								fieldLabel: '开户银行',
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
								fieldLabel: '类型',
					            name: 'type',
								value: '',
								readOnly: true
							},
							{
								id: 'contactperson',
								xtype: 'textfield',
								fieldLabel: '联系人',
								padding: '0 0 0 30',
								name: 'contactperson',
								value: '',
								readOnly: true
							},
							{
								id: 'companycode',
								xtype: 'textfield',
								fieldLabel: '营业执照',
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
								fieldLabel: '省份',
					            name: 'zdy6',
								value: '',
								readOnly: true
							},
							{
								id: 'cityid',
								xtype: 'textfield',
								fieldLabel: '城市',
								padding: '0 0 0 30',
					            name: 'zdy7',
								value: '',
								readOnly: true
							},
							{
								id: 'address',
								xtype: 'textfield',
								fieldLabel: '详细地址',
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
								fieldLabel: '审核结果',
								name: 'operation',
								store: Ext.create('M.store.Keyvalues-17'),
					            valueField: 'keyname',
					            displayField: 'keyname',
					            typeAhead: true,
					            queryMode: 'local',
					            emptyText: '选择',
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
								fieldLabel: '审核意见',
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
//								fieldLabel: '当前审核组',
//								padding: '0 0 0 0',
//					            name: 'currentauditgroup',
//								value: '',
//								readOnly: true
//							},
//							{
//								id: 'currentaudituser',
//								xtype: 'textfield',
//								fieldLabel: '当前审核人',
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
			    text: '返回',
			    action: 'back',
			    formBind: true, //only enabled once the form is valid
			    disabled: true
			 },
			 '->',
			  {
			    text: '提交',
			    action: 'audit',
			    formBind: true, //only enabled once the form is valid
			    disabled: true
			}]
});
