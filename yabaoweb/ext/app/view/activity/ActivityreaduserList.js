var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.activity.ActivityreaduserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.activityreaduserlist',
    id: 'activityreaduserGrid',
    requires: [
               'M.model.Activityreply',
               'M.store.Activityreplys',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Activityreplys',
    
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
                hidden: true,
                flex: 1
            },
            {
                header: '活动ID',
                dataIndex: 'activityid',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '姓名',               
                dataIndex: 'username',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '手机号',                 
                dataIndex: 'phoneno',
                editor: {
                    xtype: 'textfield'
                },
                flex: 2
            },  
            {
                header: '阅读日期',                 
                dataIndex: 'zdy4',
                editor: {
            		xtype: 'datefield',
                    readOnly: true
            	},
                flex: 1
            },  
            {
                header: '转发日期',                 
                dataIndex: 'zdy6',
                editor: {
            		xtype: 'datefield',
                    readOnly: true
            	},
                flex: 1
            }, 
            {
                header: '报名日期',                 
                dataIndex: 'zdy2',
                editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                flex: 1
            },
            {
                id: 'shareuserid',
                header: '分享人', 
                dataIndex: 'zdy5',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Users'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择',
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
                header: '签到日期',                 
                dataIndex: 'zdy3',
                editor: {
                	readOnly: true,
                    xtype: 'textfield'
                },
                flex: 2
            },
            {
                header: '签到码',                 
                dataIndex: 'signcode',
                editor: {
                	readOnly: true,
                    xtype: 'textfield'
                },
                flex: 2
            },
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'readdelete',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/delete.png',
                    tooltip: '删除',
                    scope: this
                }]
            }                                          
        ];       

        this.tbar = [ 
                    {  
                        id: 'readadd',
                        xtype: 'button',
                        scope: this,  
                        text : '新增',  
                        icon : 'images/add.png'
                    },
                    {
                        id: 'readsave',
                        xtype: 'button',
                        scope: this,
                        text : '保存',
                        icon : 'images/save.png'
                    },
                    '->',
                    {
                    	id: 'keywordread',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '请输入关键词'
                    },
                    {
                    	id: 'searchread',
                    	xtype: 'button',
                    	scope: this,
                    	icon : 'images/search.png'
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Activityreplys',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});