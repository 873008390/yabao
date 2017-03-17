var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.patient.PatientList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.patientlist',
    id: 'patientGrid',
    requires: [
               'M.model.Patient',
               'M.store.Patients',
               'M.model.User',
               'M.store.User-agentanddoctors',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Patients',
    
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
            	flex: 2
            },
            {
                id: 'sex',
                header: '�Ա�', 
                dataIndex: 'zdy9',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-22'),
                    valueField: 'keyname',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: '��ѡ��',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },    
            {
            	header: '����',             	
            	dataIndex: 'customerno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },   
            {
            	header: '���֤',             	
            	dataIndex: 'idcard',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },   
            {
                id: 'hospitalid',
                header: '����ҽԺ', 
                dataIndex: 'zdy6',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Customer-hospitals'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ��ҽԺ',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 2
            },   
            {
            	header: '��Ͻ��',             	
            	dataIndex: 'diagnosis',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
                header: '�Ƿ�����', 
                dataIndex: 'clearstatus',
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
            	header: '��������',             	
            	dataIndex: 'familyname',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },  
            {
            	header: '�����绰',             	
            	dataIndex: 'familyphoneno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },           
            {
            	header: '������ϵ', 
            	dataIndex: 'familyrelationship',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            }, 
            {
                header: '������״', 
                dataIndex: 'patientstatus',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-23'),
                    valueField: 'keyname',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: '��ѡ��',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },  
            {
                id: 'salerid',
                header: '�Ƽ���', 
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Users'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ���Ƽ���',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 2
            }, 
            {
            	header: '�����Ƽ���',             	
            	dataIndex: 'changesaler',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '�������ʱ��',             	
            	dataIndex: 'zdy8',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
                id: 'provinceid',
                header: '����ʡ��', 
                dataIndex: 'zdy3',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Provinces'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ��ʡ��',
                    editable: true,                    
                    listeners:{
                    	select : function(combo, record,index){
                    		var grid = combo.up('patientlist');
                    		var store = grid.getStore();
                        }
                    }
                }),
                flex: 1
            },            
            {
                id: 'cityid',
                header: '���ڳ���', 
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Citys'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ�����',
                    editable: true,                    
                    listeners:{
                      select : function(combo, record,index){
                    	  
                      }
                    }
                }),
                flex: 1
            },           
            {
                id: 'townid',
                header: '������/��', 
                dataIndex: 'zdy5',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Towns'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ����/��',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },               
            {
            	header: '��ϸ��ַ', 
            	dataIndex: 'addressdetail',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },  
            {
            	header: '�ֻ���', 
            	dataIndex: 'phoneno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
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
                dataIndex: 'age',
                xtype: 'numbercolumn',
                format: '0',
                editor: {
                    maxValue: 110,
                    minValue: 0,
                	format: '0',
                    xtype: 'numberfield'
                },
                flex: 1
            },                           
            {
                header: '����', 
                dataIndex: 'type',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1,
                hidden: true
            },   
            {
            	header: '��Ƭ����',             	
            	dataIndex: 'zdy11',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
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
                id: 'informationphoto',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '�鿴��Ƭ',
                    scope: this
                }]
            },
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'tosharer',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/tosharer.png',
                    tooltip: 'ת������',
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
                    {
                    	id: 'report',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����',
                    	icon : 'images/report.png'
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
        store: 'Patients',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});