//var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
//            pluginId:'celledit', 
//            saveBtnText: '保存', 
//            cancelBtnText: "取消", 
//            autoCancel: true, 
//            clicksToEdit:2 
//        });

Ext.define('M.view.supplier.SupplierList2' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.supplierlist',
    id: 'supplierGrid',
    requires: [
               'M.model.Supplier',
               'M.store.Suppliers',
               'M.model.Keyvalue',
               'M.store.Keyvalues-13',
               'M.store.Keyvalues-14',
               'M.store.Keyvalues-15',
               'M.model.User',
               'M.store.User-suppliers',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'rowmodel',
              
    columnLines : true,
              
//    plugins: [
//              cellEdit
//             ],
    
    store: 'Suppliers',
    
    title : '',

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
                header: '编码',               
                dataIndex: 'supplierno',
                editor: {
                    xtype: 'textfield'
                },
                width: 140
            },            
            {
                header: '名称',               
                dataIndex: 'name',
                editor: {
                    xtype: 'textfield'
                },
                width: 540
            },                 
 
   
        ];
        

        this.tbar = [ 

                     {
                        id: 'close',
                        xtype: 'button',
                        scope: this,
                        text : '关闭'
                     },
                    '->',
                    {
                        id: 'keyword',
                        xtype: 'textfield',
                        scope: this,
                        emptyText: '模糊搜索'
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
        store: 'Suppliers',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});