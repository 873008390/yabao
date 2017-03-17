var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.promotion.PromotionreaduserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.promotionreaduserlist',
    id: 'promotionreaduserGrid',
    requires: [
               'M.model.User',
               'M.store.User-promotionreaders',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'User-promotionreaders',
    
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
            	header: '姓名',             	
            	dataIndex: 'name',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '阅读日期',             	
            	dataIndex: 'zdy5',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            }               
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'User-promotionreaders',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});