var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.pointrule.PointruleList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.pointrulelist',
    id: 'pointruleGrid',
    requires: [
               'M.model.Pointrule',
               'M.store.Pointrules',
               'M.model.Product',
               'M.store.Products',
               'M.model.Productspec',
               'M.store.Productspecs',
               'M.model.Keyvalue',
               'M.store.Keyvalues-3',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Pointrules',
    
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
                id: 'name',
                header: '名称', 
                dataIndex: 'name',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-3'),
                    valueField: 'keyname',
                    displayField: 'keyname',
                    queryMode: 'local',
                    emptyText: '选择名称',
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
                id: 'productid',
                header: '产品', 
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Products'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '选择产品',
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
                id: 'productspecid',
                header: '产品规格', 
                dataIndex: 'zdy3',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Productspecs'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '选择产品规格',
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
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '起始日期', 
            	dataIndex: 'zdy4',
            	editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            	flex: 1
            },
            {
            	header: '截止日期', 
            	dataIndex: 'zdy5',
            	editor: {
            		xtype: 'datefield',
            		Format: 'Y-m-d'
            	},
            	renderer: Ext.util.Format.dateRenderer('Y-m-d'),
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
        store: 'Pointrules',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});