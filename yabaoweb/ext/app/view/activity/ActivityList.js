var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
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
                header: '列表图片',
                dataIndex: 'icon',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '是否置顶',                 
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
                header: '阅读人数',                 
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
                header: '报名人数',                 
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
                header: '转发人数',                 
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
                header: '照片数',                 
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
                header: '录入日期',               
                dataIndex: 'zdy2',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 2
            },
            {
            	header: '活动开始日期', 
            	dataIndex: 'zdy5',
            	editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            	flex: 2
            },
            {
                header: '开始时间',               
                dataIndex: 'timefrom',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-12'),
                    valueField: 'keyname',
                    displayField: 'value',
                    queryMode: 'local',
                    emptyText: '选择开始时间',
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
            	header: '活动截止日期', 
            	dataIndex: 'zdy6',
            	editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            	flex: 2
            },
            {
                header: '截止时间',               
                dataIndex: 'timeto',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-12'),
                    valueField: 'keyname',
                    displayField: 'value',
                    queryMode: 'local',
                    emptyText: '选择截止时间',
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
                header: '发布人',              
                dataIndex: 'zdy3',
                editor: {
                    xtype: 'textfield',
                    readOnly: true
                },
                flex: 1
            },
            {
                header: '标题',               
                dataIndex: 'title',
                editor: {
                    xtype: 'textfield'
                },
                flex: 10
            },
            {
                header: '城市',               
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Citys'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '选择城市',
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
                header: '类型',               
                dataIndex: 'zdy7',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-15'),
                    valueField: 'keyname',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: '选择类型',
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
                header: '提醒对象',               
                dataIndex: 'zdy8',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-20'),
                    valueField: 'keyname',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: '请选择',
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
                    tooltip: '增加或修改内容',
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
                    tooltip: '查看报名',
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
                    tooltip: '删除',
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
                    tooltip: '查看照片',
                    scope: this
                }]
            }
        ];        

        this.tbar = [ 
                    {  
                        id: 'add',
                        xtype: 'button',
                        scope: this,  
                        text : '新增',  
                        icon : 'images/add.png'
                    },
                    {
                        id: 'save',
                        xtype: 'button',
                        scope: this,
                        text : '保存',
                        icon : 'images/save.png'
                    },
                    '->',
                    {
                    	id: 'keyword',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '请输入关键词'
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