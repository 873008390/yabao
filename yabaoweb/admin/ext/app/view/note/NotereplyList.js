var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '����', 
            cancelBtnText: "ȡ��", 
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
            	header: '����ID',
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
//                header: '����',               
//                dataIndex: 'zdy4',
//                editor: new Ext.form.ComboBox({
//                    store: Ext.create('M.store.Keyvalues-19'),
//                    valueField: 'keyname',
//                    displayField: 'keyname',
//                    queryMode: 'local',
//                    emptyText: 'ѡ������',
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
                header: '�Ķ���',                 
                dataIndex: 'zdy2',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            }, 
            {
                header: '�Ķ�����',               
                dataIndex: 'zdy3',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            }, 
//            {
//                header: '������',                 
//                dataIndex: 'zdy5',
//                editor: new Ext.form.ComboBox({
//                    store: Ext.create('M.store.User-agentanddoctorandpatients'),
//                    valueField: 'name',
//                    displayField: 'name',
//                    queryMode: 'remote',
//                    emptyText: 'ѡ�������',
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
                header: '�ظ�����', 
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
                    tooltip: 'ɾ��',
                    scope: this
                }]
            }                   
        ];
        

        this.tbar = [ 
                    {  
                    	id: 'replyadd',
                    	xtype: 'button',
			        	scope: this,  
			            text : '����',  
			            icon : 'images/add.png'
                    },
                    {
                    	id: 'replysave',
                    	xtype: 'button',
                    	scope: this,
                    	text : '����',
                    	icon : 'images/save.png'
                    },
                    '->',
                    {
                    	id: 'keywordread',
                    	xtype: 'textfield',
                    	scope: this,
                    	emptyText: '������ؼ���'
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