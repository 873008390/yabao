var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.socialresponsibility.SocialresponsibilityreaduserList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.socialresponsibilityreaduserlist',
    id: 'socialresponsibilityreaduserGrid',
    requires: [
               'M.model.Socialresponsibilityreply',
               'M.store.Socialresponsibilityreplys',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Socialresponsibilityreplys',
    
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
                header: '主纪录ID',
                dataIndex: 'socialresponsibilityid',
                editor: {
                    readOnly: true,
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '姓名/IP',               
                dataIndex: 'username',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '阅读日期',                 
                dataIndex: 'zdy4',
                editor: {
            		xtype: 'datefield',
                    readOnly: true
            	},
                flex: 1
            }                                      
        ];       

        this.tbar = [ 
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
        store: 'Socialresponsibilityreplys',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});