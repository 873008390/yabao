var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.patientsale.PatientsaleList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.patientsalelist',
    id: 'patientsaleGrid',
    requires: [
               'M.model.Sale',
               'M.store.Sales',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Sales',
    
    title : '患者购买',

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
                dataIndex: 'zdy5',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '总数量',              
                dataIndex: 'totalquantity',
                editor: {
                    readOnly: true,
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '本月购买',              
                dataIndex: 'zdy6',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            }, 
            {
                header: '上月购买',              
                dataIndex: 'zdy7',
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
        store: 'Sales',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});