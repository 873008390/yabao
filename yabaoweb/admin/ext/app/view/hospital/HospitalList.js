var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.hospital.HospitalList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.hospitallist',
    id: 'hospitalGrid',
    requires: [
               'M.model.Customer',
               'M.store.Customers',
               'M.model.User',
               'M.store.User-agents',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Customers',
    
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
            	dataIndex: 'customerno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
                header: '����ҵ��Ա', 
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.User-agents'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ�����ҵ��Ա',
                    editable: true,
                    allowBlank: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },
            {
                header: 'ʡ��', 
                dataIndex: 'zdy3',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Provinces'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ��ʡ��',
                    editable: true,
                    allowBlank: true,
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
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Citys'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ�����',
                    editable: true,
                    allowBlank: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
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
                header: '�̶��绰',               
                dataIndex: 'tel',
                editor: {
                    xtype: 'textfield'
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
        store: 'Customers',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});