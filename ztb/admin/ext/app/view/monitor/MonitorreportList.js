var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.monitor.MonitorreportList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.monitorreportlist',
    id: 'monitorreportGrid',
    requires: [
               'M.model.Keyvalue',
               'M.store.Keyvalues-11',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Keyvalues-11',
    
    title : '系统监测类报表',

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
            	header: '报表名称',             	
            	dataIndex: 'keyname',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '地址',             	
            	dataIndex: 'value',
            	editor: {
            		xtype: 'textfield'
            	},
            	hidden: true,
            	flex: 1
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '打开',
                    scope: this
                }]
            }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Keyvalues-11',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});