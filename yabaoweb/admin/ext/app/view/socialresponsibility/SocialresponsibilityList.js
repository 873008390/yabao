var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.socialresponsibility.SocialresponsibilityList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.socialresponsibilitylist',
    id: 'socialresponsibilityGrid',
    requires: [
               'M.model.Socialresponsibility',
               'M.store.Socialresponsibilitys',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Socialresponsibilitys',
    
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
                flex: 1
            },
            {
                header: 'catalogid',
                dataIndex: 'catalogid',
                editor: {
                    readOnly: true,
                    xtype: 'numberfield'
                },
                flex: 1,
                hidden:true
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
                header: 'ͼƬ',
                dataIndex: 'icon',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '�Ƽ�˳��',                 
                dataIndex: 'topstatus',
                xtype: 'numbercolumn',
                format: '0',
                editor: {
                    minValue: 0,
                    format: '0',
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '�Ķ�����',                 
                dataIndex: 'readnum',
                xtype: 'numbercolumn',
                format: '0',
                editor: {
                    readOnly: true,
                    minValue: 0,
                    format: '0',
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '����',               
                dataIndex: 'zdy2',
                editor: {
                    readOnly: true,
            		xtype: 'datefield',
            		Format: 'Y.m.d',
            		value: new Date()
            	},
            	renderer: Ext.util.Format.dateRenderer('Y.m.d'),
            	flex: 2
            },
            {
                header: '������',              
                dataIndex: 'zdy3',
                editor: {
                    xtype: 'textfield',
                    readOnly: true
                },
                flex: 1
            },
            {
                header: '����',               
                dataIndex: 'title',
                editor: {
                    xtype: 'textfield'
                },
                flex: 10
            },
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'addcontent',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/add.png',
                    tooltip: '�޸�����',
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
                    tooltip: '�鿴�Ѷ�',
                    scope: this
                }]
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
                        id: 'back',
                        xtype: 'button',
                        scope: this,
                        text : '����',
                        icon : 'images/back.png'
                    },
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
                    },
                    '->',
                    {
                    	id: 'keyword',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '������ؼ���'
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
        store: 'Socialresponsibilitys',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});