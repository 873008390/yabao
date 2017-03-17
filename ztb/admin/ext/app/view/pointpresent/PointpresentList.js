var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.pointpresent.PointpresentList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pointpresentlist',
    id: 'pointpresentGrid',
    requires: [
               'M.model.Pointpresent',
               'M.store.Pointpresents',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Pointpresents',
    
    title : '积分赠送',

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
                header: '赠与日期',                 
                dataIndex: 'zdy2',
                editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                flex: 1
            },
            {
            	header: '录单人',             	
            	dataIndex: 'zdy3',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '受赠人',             	
            	dataIndex: 'zdy4',
            	editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.User-nolimits'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择受赠人',
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
                header: '积分',              
                dataIndex: 'point',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1
            },
            {
            	header: '备注', 
            	dataIndex: 'memo',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 5
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
        store: 'Pointpresents',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});