var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.contactus.ContactusList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.contactuslist',
    id: 'contactusGrid',
    requires: [
               'M.model.Contactus',
               'M.store.Contactuss',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Contactuss',
    
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
            	header: '地址',             	
            	dataIndex: 'address',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '电话',             	
            	dataIndex: 'tel',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '传真',             	
            	dataIndex: 'fax',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },              
            {
            	header: '邮箱', 
            	dataIndex: 'email',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },               
            {
            	header: '邮政编码', 
            	dataIndex: 'postcode',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            }
        ];
        

        this.tbar = [ 
                    {
                    	id: 'save',
                    	xtype: 'button',
                    	scope: this,
                    	text : '保存',
                    	icon : 'images/save.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Contactuss',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});