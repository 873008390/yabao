var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.pointsearch.PointsearchList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pointsearchlist',
    id: 'pointsearchGrid',
    requires: [
               'M.model.Point',
               'M.store.Points',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Points',
    
    title : '���ֻ���',

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
                header: '����',               
                dataIndex: 'name',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },  
            {
                header: '���',              
                dataIndex: 'point',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
                hidden: true
            },
            {
                header: '��������',              
                dataIndex: 'thismonthadd',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
                hidden: true
            },
            {
                header: '���¶һ�',              
                dataIndex: 'thismonthexchange',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
                hidden: true
            },
            {
                header: '���µ���',              
                dataIndex: 'thismonthchange',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
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
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Points',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});