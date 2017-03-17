Ext.define('M.controller.Permissions', {
    extend: 'Ext.app.Controller',

    stores: [
             'Catalogs',
             'Permissions',
             'Users'
         ],
    
    models: [
             'Catalog',
             'Permission',
             'User'
            ],
         
    views: [
            'permission.PermissionList',
            'permission.PermissionvalueList',
            'permission.PermissionuserList'
        ],
       
    init: function() {
    	this.control({
    		'permissionuserlist' : {
    			itemdblclick: this.informationuserClick
    		},
    		'permissionvaluelist' : {
    			itemdblclick: this.informationvalueClick
    		},
    		'permissionvaluelist button[id=informationvalue]':{
           	 	click: this.informationvalueClick
            },
            'permissionuserlist button[id=information]':{
           	 	click: this.informationuserClick
            },
            'permissionuserlist button[id=add]':{
           	 	click: this.informationuserClick
            },
            'permissionlist button[id=save]': {
                click: this.updateClick
            },
            'permissionlist button[id=back]': {
                click: this.backClick
            }
        });
    },
    
    backClick:function(o){
    	history.back();
    },
    
    informationvalueClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('permissionvaluelist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		alert("请先保存");
	    	}else{
	    		self.location = "permissionlist-main.html?idtype=permission&typeid="+ record.get('id');
	    	}
    	}else{
    		alert("请选择权限");
    	}
    },
    
    informationuserClick: function(o){
    	var grid = o.up('permissionuserlist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		alert("请先保存");
	    	}else{
	    		self.location = "permissionlist-main.html?idtype=user&typeid="+ record.get('id');
	    	}
    	}else{
    		alert("请选择用户");
    	}
    },
    
    updateClick: function(o) {
    	var grid = o.up('permissionlist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('status') == ''){
    			model.set('status',1);
    		}
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			isok = 0;
    			err = "姓名不能为空";
    		}
    		if(model.get('zdy3') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "权限不能为空";
    		}
    		if(model.get('adddata') == ''){
    			model.set('adddata',0);
    		}
    		if(model.get('modifydata') == ''){
    			model.set('modifydata',0);
    		}
    		if(model.get('deletedata') == ''){
    			model.set('deletedata',0);
    		}
    		if(model.get('searchdata') == ''){
    			model.set('searchdata',0);
    		}
    		if(model.get('uploaddata') == ''){
    			model.set('uploaddata',0);
    		}
    		data.push(Ext.JSON.encode(model.data));   		
    	});
//    	alert(data);
    	if(isok == 0){
    		alert("温馨提示:"+err);
    		cellEdit.enable();
    		cellEdit.startEditByPosition({
     			row:0,
     			column:0
     		});
    	}else{
    		if(data.length>0){
   			    Ext.Ajax.request({
    				url: 'admin/permissionadd.action?permission.zdy10='+ escape(data),
    				method: 'GET',
    				timeout: 4000,
    				success: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					alert("温馨提示:"+result.result);
    					if(result.result == "保存成功"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					alert("温馨提示:"+result.result);
    				}
    			});
    		}else{
    			alert("温馨提示:未改动，无需保存");
    			store.load();
    		}
    	} 
    }
});