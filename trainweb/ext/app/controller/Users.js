Ext.define('M.controller.Users', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users'
         ],
    
    models: ['User'
        ],
         
    views: [
            'user.UserList'
        ],
       
    init: function() {
    	this.control({
    		'userlist button[id=delete]':{
           	 	click: this.deleteClick
            },
            'userlist button[id=add]':{
              	click: this.addClick
            },
            'userlist button[id=save]': {
                click: this.updateUser
            },
            'userlist button[id=search]': {
                click: this.searchUser
            },
            'userlist button[id=information]': {
                click: this.informationuserClick
            }
        });
    },
	 
	searchUser: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('userlist');
		var store = grid.getStore();
		store.getProxy().url = "user/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('userlist');
    	var store = grid.getStore();
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
    		var rowIndex = store.indexOf(record);
	    	if(record.get('id') == null || record.get('id') == ''){
	    		store.removeAt(rowIndex);
	    	}else{
	    		var message = confirm("确定要删除："+ record.get('name') +" ？");
	    		if(message == true){
	    			 Ext.getBody().mask("数据处理中，请稍等");
  		             var result = "";
  		             Ext.Ajax.request({
  		    				url: 'user/delete.action?userid='+ record.get('id'),
  		    				method: 'GET',
  		    				timeout: 4000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("温馨提示:"+result.result);
  		    					if(result.result == "删除成功"){
  		    						store.removeAt(rowIndex);
  		    					}
  	    			    	    Ext.getBody().unmask();
  		    				},
  		    				failure: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("温馨提示:"+result.result);
  	    			    	    Ext.getBody().unmask();
  		    				}
  		    		 });
	    		}
	    	}
    	}else{
    		alert("请选择用户");
    	}
    },
	 
	addClick: function(o){
		var rec = new M.model.User();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('userlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateUser: function(o) {
    	var grid = o.up('userlist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('zdy3') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "类型不能为空";
    		}
    		if(model.get('name') == '' || model.get('name') == null){
    			isok = 0;
    			err = "姓名不能为空";
    		}
    		if(model.get('account') == '' || model.get('account') == null){
    			isok = 0;
    			err = "账号不能为空";
    		}
    		if(model.get('password') == '' || model.get('password') == null){
    			isok = 0;
    			err = "密码不能为空";
    		}else{
	    		if(model.get('password') != '****'){
	    			model.set('password', hex_md5(model.get('password')));
	    		}else{
	    			if(model.get('id') == null || model.get('id') == ''){
		    			isok = 0;
		    			err = "密码不能为4个*";
	    			}
	    		}
    		}
    		if(model.get('zdy3') == '内部员工' && (model.get('zdy8') == null || model.get('zdy8') == '')){
    			isok = 0;
    			err = "内部员工请选择所属内部单位";
    		}
    		if(model.get('zdy3') == '供应商' && (model.get('zdy7') == null || model.get('zdy7') == '')){
    			isok = 0;
    			err = "供应商账号请选择所属供应商";
    		}
    		if(model.get('auditstatus') == '' || model.get('auditstatus') == null){
    			model.set('auditstatus', 1);
    		}
    		data.push(Ext.JSON.encode(model.data));
    	});
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
    				url: 'user/add.action?user.zdy10='+ escape(data),
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
    		}
    	} 
    },
    informationuserClick: function(o){
    	var grid = o.up('userlist');
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
    }
});