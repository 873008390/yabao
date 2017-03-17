var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.note.NoteList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.notelist',
    id: 'noteGrid',
    requires: [
               'M.model.Note',
               'M.store.Notes',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Notes',
    
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
                header: '已读人数',                 
                dataIndex: 'readnum',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '回复人数',                 
                dataIndex: 'replynum',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
                header: '发送日期',              
                dataIndex: 'zdy2',
                editor: {
                    xtype: 'textfield',
                    readOnly: true
                },
                flex: 1
            },       
            {
                header: '发送人',              
                dataIndex: 'zdy3',
                editor: {
                    xtype: 'textfield',
                    readOnly: true
                },
                flex: 1
            },    
            {
                header: '类型',               
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-18'),
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
                flex: 1
            },
            {
                header: '指定人',                 
                dataIndex: 'zdy5',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.User-agentanddoctorandpatients'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '选择人员',
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
                header: '内容', 
                dataIndex: 'content',
                editor: {
                    xtype: 'textfield'
                },
                flex: 8
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'talk',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/talk.png',
                    tooltip: '对话',
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
                    tooltip: '查看回复',
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
        store: 'Notes',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});