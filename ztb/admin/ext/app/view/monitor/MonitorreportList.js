var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
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
    
    title : 'ϵͳ����౨��',

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
            	dataIndex: 'keyname',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '��ַ',             	
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
                    tooltip: '��',
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