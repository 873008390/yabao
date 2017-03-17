var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.note.NotereplyList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.notereplylist',
    id: 'notereplyGrid',
    requires: [
               'M.model.Notereply',
               'M.store.Notereplys',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Notereplys',
    
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
            	header: '留言ID',
            	dataIndex: 'noteid',
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
//            {
//                header: '类型',               
//                dataIndex: 'zdy4',
//                editor: new Ext.form.ComboBox({
//                    store: Ext.create('M.store.Keyvalues-19'),
//                    valueField: 'keyname',
//                    displayField: 'keyname',
//                    queryMode: 'local',
//                    emptyText: '选择类型',
//                    editable: true,
//                    
//                    listeners:{
////                      blur:function(type, the){
////                          alert(type.getPosition());
////                      }
//                    }
//                }),
//                flex: 1
//            },
            {
                header: '阅读人',                 
                dataIndex: 'zdy2',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            }, 
            {
                header: '阅读日期',               
                dataIndex: 'zdy3',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            }, 
//            {
//                header: '接收人',                 
//                dataIndex: 'zdy5',
//                editor: new Ext.form.ComboBox({
//                    store: Ext.create('M.store.User-agentanddoctorandpatients'),
//                    valueField: 'name',
//                    displayField: 'name',
//                    queryMode: 'remote',
//                    emptyText: '选择接收人',
//                    editable: true,
//                    
//                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
//                    }
//                }),
//                flex: 1
//            }, 
            {
                header: '回复内容', 
                dataIndex: 'content',
                editor: {
                    xtype: 'textfield'
                },
                flex: 10
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'replydelete',
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
                    	id: 'replyadd',
                    	xtype: 'button',
			        	scope: this,  
			            text : '新增',  
			            icon : 'images/add.png'
                    },
                    {
                    	id: 'replysave',
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
        store: 'Notereplys',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});