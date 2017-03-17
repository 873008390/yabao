var cellEdit = Ext.create('Ext.grid.plugin.CellEditing', { 
            pluginId:'celledit', 
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: true, 
            clicksToEdit:2 
        });

Ext.define('M.view.patient.PatientList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.patientlist',
    id: 'patientGrid',
    requires: [
               'M.model.Patient',
               'M.store.Patients',
               'M.model.User',
               'M.store.User-agentanddoctors',
               'Ext.grid.*',
               'Ext.toolbar.Paging'
              ],

    selType: 'cellmodel',
              
    columnLines : true,
              
    plugins: [
              cellEdit
             ],
    
    store: 'Patients',
    
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
            	header: '登记日期',             	
            	dataIndex: 'zdy7',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '姓名',             	
            	dataIndex: 'name',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
                id: 'sex',
                header: '性别', 
                dataIndex: 'zdy9',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-22'),
                    valueField: 'keyname',
                    displayField: 'keyname',
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
            	header: '编码',             	
            	dataIndex: 'customerno',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },   
            {
            	header: '身份证',             	
            	dataIndex: 'idcard',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },   
            {
                id: 'hospitalid',
                header: '就诊医院', 
                dataIndex: 'zdy6',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Customer-hospitals'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择医院',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 2
            },   
            {
            	header: '诊断结果',             	
            	dataIndex: 'diagnosis',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },
            {
                header: '是否清晰', 
                dataIndex: 'clearstatus',
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
            	header: '家属姓名',             	
            	dataIndex: 'familyname',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },  
            {
            	header: '家属电话',             	
            	dataIndex: 'familyphoneno',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
            },           
            {
            	header: '亲属关系', 
            	dataIndex: 'familyrelationship',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            }, 
            {
                header: '患者现状', 
                dataIndex: 'patientstatus',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Keyvalues-23'),
                    valueField: 'keyname',
                    displayField: 'keyname',
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
                id: 'salerid',
                header: '推荐人', 
                dataIndex: 'zdy2',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Users'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择推荐人',
                    editable: true,
                    
                    listeners:{
//                      blur:function(type, the){
//                          alert(type.getPosition());
//                      }
                    }
                }),
                flex: 2
            }, 
            {
            	header: '更换推荐人',             	
            	dataIndex: 'changesaler',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
            	header: '申请更换时间',             	
            	dataIndex: 'zdy8',
            	editor: {
            		readOnly: true,
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
                id: 'provinceid',
                header: '所属省份', 
                dataIndex: 'zdy3',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Provinces'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择省份',
                    editable: true,                    
                    listeners:{
                    	select : function(combo, record,index){
                    		var grid = combo.up('patientlist');
                    		var store = grid.getStore();
                        }
                    }
                }),
                flex: 1
            },            
            {
                id: 'cityid',
                header: '所在城市', 
                dataIndex: 'zdy4',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Citys'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择城市',
                    editable: true,                    
                    listeners:{
                      select : function(combo, record,index){
                    	  
                      }
                    }
                }),
                flex: 1
            },           
            {
                id: 'townid',
                header: '所在县/镇', 
                dataIndex: 'zdy5',
                editor: new Ext.form.ComboBox({
                    store: Ext.create('M.store.Towns'),
                    valueField: 'name',
                    displayField: 'name',
                    queryMode: 'local',
                    emptyText: '请选择县/镇',
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
            	header: '详细地址', 
            	dataIndex: 'addressdetail',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 2
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
            	header: '座机号', 
            	dataIndex: 'tel',
            	editor: {
            		xtype: 'textfield'
            	},
            	flex: 1
            },
            {
                header: '年龄', 
                dataIndex: 'age',
                xtype: 'numbercolumn',
                format: '0',
                editor: {
                    maxValue: 110,
                    minValue: 0,
                	format: '0',
                    xtype: 'numberfield'
                },
                flex: 1
            },                           
            {
                header: '类型', 
                dataIndex: 'type',
                editor: {
                    xtype: 'numberfield'
                },
                flex: 1,
                hidden: true
            },   
            {
            	header: '照片数量',             	
            	dataIndex: 'zdy11',
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
                id: 'informationphoto',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/information.png',
                    tooltip: '查看照片',
                    scope: this
                }]
            },
            {               
                xtype: 'actioncolumn',
                width: 30,
                id: 'tosharer',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'images/tosharer.png',
                    tooltip: '转分享人',
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
                    {
                    	id: 'report',
                    	xtype: 'button',
                    	scope: this,
                    	text : '报表',
                    	icon : 'images/report.png'
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
        store: 'Patients',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
});