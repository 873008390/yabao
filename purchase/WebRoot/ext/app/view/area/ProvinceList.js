var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.area.ProvinceList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.areaprovincelist',
    id: 'areaprovinceGrid',
    requires: [
               'M.model.Province',
               'M.store.Provinces',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Provinces',
    
    title : 'ʡ��',

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
            	header: 'zdy10',
            	dataIndex: 'zdy10',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	hidden: true
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
            	header: '���', 
            	dataIndex: 'shortname',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'addprovince',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {
                    	id: 'saveprovince',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
                    },
                    {
                    	id: 'deleteprovince',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ɾ��'
                    },
                    '->',
                    {
                    	id: 'keywordprovince',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: 'ģ������'
                    },
                    {
                    	id: 'searchprovince',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Provinces',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});