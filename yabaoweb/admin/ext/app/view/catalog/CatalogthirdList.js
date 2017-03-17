var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.catalog.CatalogthirdList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.catalogthirdlist',
    id: 'catalogthirdGrid',
    requires: [
               'M.model.Catalog',
               'M.store.Catalog-thirds',
               'M.store.Catalog-seconds',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Catalog-thirds',
    
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
            	header: 'shortname',
            	dataIndex: 'shortname',
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
            	header: '�ϼ���Ŀ', 
            	dataIndex: 'icon',
            	editor: new Ext.form.ComboBox({
            		id: 'secondcatalogid',
                	store: Ext.create('M.store.Catalog-seconds'),
                	valueField: 'name',
                	displayField: 'name',
                	queryMode: 'remote',
                	emptyText: 'ѡ���ϼ���Ŀ',
                	editable: true,
            		
            		listeners:{
//            			blur:function(type, the){
//            				alert(type.getPosition());
//            			}
            		}
                }),
            	flex: 1
            },
            {
                header: '˳��', 
                dataIndex: 'orderid',
                editor: {
                    xtype: 'numberfield',
                    minValue:1 
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
                    tooltip: '����',
                    scope: this
                }]
            }
        ];
        

        this.tbar = [ 
                    {
			        	id: 'addthird',
			        	xtype: 'button',
			        	scope: this,
			        	text : '����',
			        	icon : 'images/add.png'
			        },
                    {
                    	id: 'savethird',
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
        store: 'Catalog-thirds',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});