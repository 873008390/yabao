var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.uniquecode.UniquecodeList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.uniquecodelist',
    id: 'uniquecodeGrid',
    requires: [
               'M.model.Uniquecode',
               'M.store.Uniquecodes',
               'M.model.Product',
               'M.store.Products',
               'M.model.Productspec',
               'M.store.Productspecs',
               'M.model.Keyvalue',
               'M.store.Keyvalues-10',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Uniquecodes',
    
    title : '唯一码',

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
            	header: '生成日期',
            	dataIndex: 'zdy4',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
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
                id: 'type',
                header: '类型', 
                dataIndex: 'zdy5',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-10'),
                    valueField: 'value',
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
            	header: '数量（不大于200）', 
            	dataIndex: 'total',
            	xtype: 'numbercolumn',
            	format: '0',
        		editor: {
            		maxValue: 200,
        	        minValue: 0,
        	        format: '0',
        	        xtype: 'numberfield'
            	},
            	flex: 1
            },    
            {
            	header: '下载', 
            	dataIndex: 'url',
            	editor: {
            		readOnly: true,
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
            },
            {            	
                xtype: 'actioncolumn',
                width: 30,
                id: 'information',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看已生成唯一码',
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
        store: 'Uniquecodes',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});