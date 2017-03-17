var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.area.CityList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.areacitylist',
    id: 'areacityGrid',
    requires: [
               'M.model.City',
               'M.store.Citys',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Citys',
    
    title : '����',

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
            	header: '����ʡ��', 
            	dataIndex: 'zdy2',
            	editor: {
            		xtype: 'textfield',
            		readOnly:true
            	},
            	flex: 1
            }
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'back',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {  
                    	id: 'addcity',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����'
                    },
                    {
                    	id: 'savecity',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����'
                    },
                    {
                    	id: 'deletecity',
                    	xtype: 'button',
                    	scope: this,
                    	text : 'ɾ��'
                    },
                    '->',
                    {
                    	id: 'keywordcity',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '������ؼ���'
                    },
                    {
                    	id: 'searchcity',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Citys',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});