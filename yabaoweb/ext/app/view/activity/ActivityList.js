var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.activity.ActivityList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.activitylist',
    id: 'activityGrid',
    requires: [
               'M.model.Activity',
               'M.store.Activitys',
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
    
    store: 'Activitys',
    
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
                header: 'zdy10',
                dataIndex: 'zdy10',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                hidden: true
            },
            {
                header: '�б�ͼƬ',
                dataIndex: 'icon',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '�Ƿ��ö�',                 
                dataIndex: 'topstatus',
                xtype: 'numbercolumn',
                format: '0',
                editor: {
                    maxValue: 1,
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
                header: '��������',                 
                dataIndex: 'signupnum',
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
                header: 'ת������',                 
                dataIndex: 'sharenum',
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
                header: '��Ƭ��',                 
                dataIndex: 'photonum',
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
                header: '¼������',               
                dataIndex: 'zdy2',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 2
            },
            {
            	header: '���ʼ����', 
            	dataIndex: 'zdy5',
            	editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            	flex: 2
            },
            {
                header: '��ʼʱ��',               
                dataIndex: 'timefrom',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-12'),
                    valueField: 'keyname',
                    displayField: 'value',
                    queryMode: 'local',
                    emptyText: 'ѡ��ʼʱ��',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },
            {
            	header: '���ֹ����', 
            	dataIndex: 'zdy6',
            	editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            	flex: 2
            },
            {
                header: '��ֹʱ��',               
                dataIndex: 'timeto',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-12'),
                    valueField: 'keyname',
                    displayField: 'value',
                    queryMode: 'local',
                    emptyText: 'ѡ���ֹʱ��',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
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
                header: '����',               
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Citys'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: 'ѡ�����',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 1
            },
            {
                header: '����',               
                dataIndex: 'zdy7',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-15'),
                    valueField: 'keyname',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: 'ѡ������',
                    editable: true,
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 2
            },
            {
                header: '���Ѷ���',               
                dataIndex: 'zdy8',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-20'),
                    valueField: 'keyname',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: '��ѡ��',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 2
            },
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'addcontent',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/add.png',
                    tooltip: '���ӻ��޸�����',
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
                    tooltip: '�鿴����',
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
            },
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'informationphoto',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '�鿴��Ƭ',
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
        store: 'Activitys',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});