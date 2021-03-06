var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.pointsearch.PointsearchList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pointsearchlist',
    id: 'pointsearchGrid',
    requires: [
               'M.model.Point',
               'M.store.Points',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Points',
    
    title : '积分汇总',

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
                header: '姓名',               
                dataIndex: 'name',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },  
            {
                header: '余额',              
                dataIndex: 'point',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
                hidden: true
            },
            {
                header: '本月新增',              
                dataIndex: 'thismonthadd',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
                hidden: true
            },
            {
                header: '本月兑换',              
                dataIndex: 'thismonthexchange',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
                hidden: true
            },
            {
                header: '本月调整',              
                dataIndex: 'thismonthchange',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
                hidden: true
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
                    }
        ];

        this.callParent(arguments);
    },
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Points',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});