Ext.define('M.controller.Auditgroups', {
    extend: 'Ext.app.Controller',

    stores: [
             'Auditgroups',
             'Auditgroupusers',
             'Auditgroupsuppliers',
             'Orgs-all'
         ],
    
    models: [
             'Auditgroup',
             'Auditgroupuser',
             'Auditgroupsupplier',
             'Org'
            ],
         
    views: [
            'auditgroup.AuditgroupList',
            'auditgroup.AuditgroupuserList',
            'auditgroup.AuditgroupsupplierList',
            'auditgroup.OrgList'
        ],
       
    init: function() {
    	this.control({
    		'orglist' : {
    			itemdblclick: this.informationorgClick
    		},
    		'orglist button[id=informationorg]':{
           	 	click: this.informationorgClick
            },
            'auditgrouplist button[id=backgroup]': {
                click: this.backClick
            },
            'auditgrouplist button[id=deleteauditgroup]':{
           	 	click: this.deleteauditgroupClick
            },
            'auditgrouplist actioncolumn[id=informationauditgroup]':{
           	 	click: this.informationauditgroupClick
            },
            'auditgrouplist button[id=addauditgroup]':{
              	click: this.addauditgroupClick
            },
            'auditgrouplist button[id=saveauditgroup]': {
                click: this.updateauditgroupClick
            },
            'auditgrouplist button[id=viewauditgroupuser]': {
                click: this.viewauditgroupuserClick
            },
            'auditgrouplist button[id=addauditgroupuser]': {
                click: this.viewauditgroupuserClick
            },
            'auditgroupuserlist button[id=deleteuser]':{
           	 	click: this.deleteuserClick
            },
            'auditgroupuserlist button[id=adduser]':{
              	click: this.adduserClick
               },
            'auditgroupuserlist button[id=saveuser]': {
                click: this.updateuserClick
            },
            'auditgroupsupplierlist actioncolumn[id=deletesupplier]':{
           	 	click: this.deletesupplierClick
            },
            'auditgroupsupplierlist button[id=addsupplier]':{
              	click: this.addsupplierClick
               },
            'auditgroupsupplierlist button[id=savesupplier]': {
                click: this.updatesupplierClick
            },
            'auditgrouplist button[id=searchauditgroup]': {
                click: this.searchauditgroupClick
            },
            'auditgroupuserlist button[id=searchuser]': {
                click: this.searchuserClick
            },
            'auditgroupuserlist button[id=back]': {
                click: this.backClick
            },
            'auditgroupsupplierlist button[id=searchsupplier]': {
                click: this.searchsupplierClick
            }
        });
    },
    
    backClick:function(o){
    	history.back();
    },
    
    informationorgClick:function(o){
    	var grid = o.up('orglist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		alert("请先保存");
	    	}else{
	    		parent.location = "auditgrouplist.html?idtype=org&typeid="+ record.get('id');
	    	}
    	}else{
    		alert("请选择机构");
    	}
    },
    
    viewauditgroupuserClick:function(o){
    	var grid = o.up('auditgrouplist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		alert("请先保存");
	    	}else{
	    		parent.location = "auditgroupuserlist.html?idtype=mainid&typeid="+ record.get

('id');
	    	}
    	}else{
    		alert("请选择审核组");
    	}
    },
	 
    informationauditgroupClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		alert("请先保存");
    	}else{
//    		var downgrid = Ext.getCmp('auditgroupsupplierGrid');
//			var downstore = downgrid.getStore();
//			downstore.getProxy().url = "auditgroup/detaillist.action?idtype=mainid&typeid="+ 

store.getAt(rowIndex).get('id');
//			downstore.load();
			downgrid = Ext.getCmp('auditgroupuserGrid');
			downstore = downgrid.getStore();
			downstore.getProxy().url = "auditgroup/userlist.action?idtype=mainid&typeid="+ 

store.getAt(rowIndex).get('id');
			downstore.load();
    	}
	 },
	 
    searchuserClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('auditgroupuserlist');
		var store = grid.getStore();
		store.getProxy().url = "auditgroup/userlist.action?idtype=search&typeid="+ Ext.getCmp

("keyworduser").getValue();
		store.load();
	 },
	 
    searchsupplierClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('auditgroupsupplierlist');
		var store = grid.getStore();
		store.getProxy().url = "auditgroup/detaillist.action?idtype=search&typeid="+ Ext.getCmp

("keywordsupplier").getValue();
		store.load();
	 },
    
    deleteauditgroupClick: function(o){
    	var grid = o.up('auditgrouplist');
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
	    			Ext.Ajax.request({
		    				url: 'auditgroup/delete.action?auditgroupid='+ 

record.get('id'),
		    				method: 'GET',
		    				timeout: 4000,
		    				success: function(response,opts){
		    					var result = Ext.JSON.decode

(response.responseText);
		    					alert("温馨提示:"+result.result);
		    					if(result.result == "删除成功"){
		    						store.removeAt(rowIndex);
		    					}
	    			    	    Ext.getBody().unmask();
		    				},
		    				failure: function(response,opts){
		    					var result = Ext.JSON.decode

(response.responseText);
		    					alert("温馨提示:"+result.result);
	    			    	    Ext.getBody().unmask();
		    				}
		    		 });
	    		}
	    	}
    	}else{
    		alert("请选择审核组");
    	}
    },
	 
	addauditgroupClick: function(o){
		var rec = new M.model.Auditgroup();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('auditgrouplist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateauditgroupClick: function(o) {
    	var grid = o.up('auditgrouplist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('name') == '' || model.get('name') == null){
    			isok = 0;
    			err = "名称不能为空";
    		}
    		if(model.get('orderid') == '' || model.get('orderid') == null){
    			isok = 0;
    			err = "顺序不能为空";
    		}
    		model.set('orgid', getParameter("typeid"));
    		data.push(Ext.JSON.encode(model.data));
    	});
    	//alert(data);
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
    				url: 'auditgroup/add.action?auditgroup.zdy10='+ escape(data),
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
    
    deleteuserClick: function(o){
    	var grid = o.up('auditgroupuserlist');
    	var store = grid.getStore();
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
    		var rowIndex = store.indexOf(record);
	    	if(record.get('id') == null || record.get('id') == ''){
	    		store.removeAt(rowIndex);
	    	}else{
	    		var message = confirm("确定要删除："+ store.getAt(rowIndex).get('zdy2') +" ？");
	    		if(message == true){
	    			Ext.Ajax.request({
		    				url: 'auditgroup/userdelete.action?auditgroupuserid='+ 

record.get('id'),
		    				method: 'GET',
		    				timeout: 4000,
		    				success: function(response,opts){
		    					var result = Ext.JSON.decode

(response.responseText);
		    					alert("温馨提示:"+result.result);
		    					if(result.result == "删除成功"){
		    						store.removeAt(rowIndex);
		    					}
	    			    	    Ext.getBody().unmask();
		    				},
		    				failure: function(response,opts){
		    					var result = Ext.JSON.decode

(response.responseText);
		    					alert("温馨提示:"+result.result);
	    			    	    Ext.getBody().unmask();
		    				}
		    		 });
	    		}
	    		
	    	}
    	}else{
    		alert("请选择审核人");
    	}
    },
	 
	adduserClick: function(o){
		var rec = new M.model.Auditgroupuser();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('auditgroupuserlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateuserClick: function(o) {
    	var grid = o.up('auditgroupuserlist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			isok = 0;
    			err = "姓名不能为空";
    		}
//    		if(model.get('zdy3') == '' || model.get('zdy3') == null){
//    			isok = 0;
//    			err = "所属审核组不能为空";
//    		}
    		data.push(Ext.JSON.encode(model.data));
    	});
    	var mainid = store.getProxy().url.split("typeid=")[1];
    	if(mainid == 0){
    		isok = 0;
    		err = "请选择审核组";
    	}
    	//alert(getParameter("typeid"));
    	if(isok == 0){
    		//Ext.Msg.alert('温馨提示',err);
    		alert(err);
    		cellEdit.enable();
    		cellEdit.startEditByPosition({
     			row:0,
     			column:0
     		});
    	}else{
    		if(data.length>0){
   			    Ext.Ajax.request({
    				url: 'auditgroup/useradd.action?auditgroupuser.zdy10='+ escape(data) 

+"&auditgroupuser.mainid="+ mainid,
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
    
    deletesupplierClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		var message = confirm("确定要删除："+ store.getAt(rowIndex).get('name') +" ？");
    		if(message == true){
    			Ext.getBody().mask("数据处理中，请稍等");
    			Ext.Ajax.request({
	    				url: 'auditgroup/detaildelete.action?auditgroupdetailid='+ 

store.getAt(rowIndex).get('id'),
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
    },
	 
	addsupplierClick: function(o){
		var rec = new M.model.Auditgroupsupplier();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('auditgroupsupplierlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updatesupplierClick: function(o) {
    	var grid = o.up('auditgroupsupplierlist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			isok = 0;
    			err = "名称不能为空";
    		}
    		data.push(Ext.JSON.encode(model.data));
    	});
    	var mainid = store.getProxy().url.split("typeid=")[1];
    	if(mainid == 0){
    		isok = 0;
    		err = "请选择审核组";
    	}
    	//alert(store.getProxy().url);
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
    				url: 'auditgroup/detailadd.action?auditgroupdetail.zdy10='+ escape(data) 

+"&auditgroupdetail.mainid="+ mainid,
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
    }
});
