var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.agent.AgentList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.agentlist',
    id: 'agentGrid',
    requires: [
               'M.model.Agent',
               'M.store.Agents',
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
    
    store: 'Agents',
    
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
                id: 'manageruserid',
                header: '������', 
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.User-agents'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ������',
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
                id: 'saleuserid',
                header: 'ʡ��', 
                dataIndex: 'zdy8',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.User-saleusers'),
                    valueField: 'name',
                    displayField: 'name',
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
                id: 'uppercustomerid',
                header: '�ϼ�����', 
                dataIndex: 'zdy6',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Customers'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '��ѡ���ϼ�����',
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
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
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
                    emptyText: '��ѡ��������/��',
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
                header: '������', 
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
        store: 'Agents',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});