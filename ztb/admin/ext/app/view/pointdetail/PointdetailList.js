﻿var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2
        });

Ext.define('M.view.pointdetail.PointdetailList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pointdetaillist',
    id: 'pointdetailGrid',
    requires: [
               'M.model.Pointdetail',
               'M.store.Pointdetails',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Pointdetails',
    
    title : '积分明细',

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
                header: '日期',               
                dataIndex: 'pointdate',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '积分值',              
                dataIndex: 'point',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
                hidden: true
            }, 
            {
                header: '类型',               
                dataIndex: 'pointtype',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            },
            {
                header: '备注',               
                dataIndex: 'memo',
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
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
        store: 'Pointdetails',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});