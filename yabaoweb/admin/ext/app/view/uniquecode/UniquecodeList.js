var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.uniquecode.UniquecodeList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.uniquecodelist',
    id: 'uniquecodeGrid',
    requires: [
               'M.model.Uniquecode',
               'M.store.Uniquecodes',
               'M.model.Product',
               'M.store.Products',
               'M.model.Productspec',
               'M.store.Productspecs',
               'M.model.Keyvalue',
               'M.store.Keyvalues-10',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Uniquecodes',
    
    title : 'Ψһ��',

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
            	header: '��������',
            	dataIndex: 'zdy4',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
                id: 'productid',
                header: '��Ʒ', 
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Products'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: 'ѡ���Ʒ',
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
                id: 'productspecid',
                header: '��Ʒ���', 
                dataIndex: 'zdy3',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Productspecs'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: 'ѡ���Ʒ���',
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
                id: 'type',
                header: '����', 
                dataIndex: 'zdy5',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-10'),
                    valueField: 'value',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: 'ѡ������',
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
            	header: '������������200��', 
            	dataIndex: 'total',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		maxValue: 200,
        	        minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1
            },    
            {
            	header: '����', 
            	dataIndex: 'url',
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
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '�鿴������Ψһ��',
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
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Uniquecodes',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});