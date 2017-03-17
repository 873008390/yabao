Ext.define('M.controller.Auditgroups', {
    extend: 'Ext.app.Controller',

    stores: [
             'Auditgroups',
             'Auditgroupusers',
             'Auditgroupsuppliers'
         ],
    
    models: [
             'Auditgroup',
             'Auditgroupuser',
             'Auditgroupsupplier'
            ],
         
    views: [
            'auditgroup.AuditgroupList',
            'auditgroup.AuditgroupuserList',
            'auditgroup.AuditgroupsupplierList'
        ],
       
    init: function() {
    	this.control({
    		'auditgrouplist actioncolumn[id=deleteauditgroup]':{
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
            'auditgroupuserlist actioncolumn[id=deleteuser]':{
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
            'auditgroupsupplierlist button[id=searchsupplier]': {
                click: this.searchsupplierClick
            }
        });
    },
	 
    informationauditgroupClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		alert("请先保存");
    	}else{
//    		var downgrid = Ext.getCmp('auditgroupsupplierGrid');
//			var downstore = downgrid.getStore();
//			downstore.getProxy().url = "auditgroup/detaillist.action?idtype=mainid&typeid="+ store.getAt(rowIndex).get('id');
//			downstore.load();
			downgrid = Ext.getCmp('auditgroupuserGrid');
			downstore = downgrid.getStore();
			downstore.getProxy().url = "auditgroup/userlist.action?idtype=mainid&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
	 },
	 
    searchuserClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('auditgroupuserlist');
		var store = grid.getStore();
		store.getProxy().url = "auditgroup/userlist.action?idtype=search&typeid="+ Ext.getCmp("keyworduser").getValue();
		store.load();
	 },
	 
    searchsupplierClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('auditgroupsupplierlist');
		var store = grid.getStore();
		store.getProxy().url = "auditgroup/detaillist.action?idtype=search&typeid="+ Ext.getCmp("keywordsupplier").getValue();
		store.load();
	 },
    
    deleteauditgroupClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'温馨提示',
	   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('name') +' ？',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'确定',cancel: '取消'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("数据处理中，请稍等");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'auditgroup/delete.action?auditgroupid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   		    					if(result.result == "删除成功"){
	   		    						store.removeAt(rowIndex);
	   		    					}
	   	    			    	    Ext.getBody().unmask();
	   		    				},
	   		    				failure: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   	    			    	    Ext.getBody().unmask();
	   		    				}
	   		    		 });	 
	   		    	 }
	   		     }
	   		});
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
    		data.push(Ext.JSON.encode(model.data));
    	});
    	//alert(data);
    	if(isok == 0){
    		Ext.Msg.alert('温馨提示',err);
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
    					Ext.Msg.alert("温馨提示",result.result);
    					if(result.result == "保存成功"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("温馨提示",result.result);
    				}
    			});
    		}else{
    			Ext.Msg.alert("温馨提示","未改动，无需保存");
    		}
    	} 
    },
    
    deleteuserClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'温馨提示',
	   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('name') +' ？',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'确定',cancel: '取消'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("数据处理中，请稍等");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'auditgroup/userdelete.action?auditgroupuserid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   		    					if(result.result == "删除成功"){
	   		    						store.removeAt(rowIndex);
	   		    					}
	   	    			    	    Ext.getBody().unmask();
	   		    				},
	   		    				failure: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   	    			    	    Ext.getBody().unmask();
	   		    				}
	   		    		 });	 
	   		    	 }
	   		     }
	   		});
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
    		data.push(Ext.JSON.encode(model.data));
    	});
    	var mainid = store.getProxy().url.split("typeid=")[1];
    	if(mainid == 0){
    		isok = 0;
    		err = "请选择审核组";
    	}
    	//alert(getParameter("typeid"));
    	if(isok == 0){
    		Ext.Msg.alert('温馨提示',err);
    		cellEdit.enable();
    		cellEdit.startEditByPosition({
     			row:0,
     			column:0
     		});
    	}else{
    		if(data.length>0){
   			    Ext.Ajax.request({
    				url: 'auditgroup/useradd.action?auditgroupuser.zdy10='+ escape(data) +"&auditgroupuser.mainid="+ mainid,
    				method: 'GET',
    				timeout: 4000,
    				success: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("温馨提示",result.result);
    					if(result.result == "保存成功"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("温馨提示",result.result);
    				}
    			});
    		}else{
    			Ext.Msg.alert("温馨提示","未改动，无需保存");
    		}
    	} 
    },
    
    deletesupplierClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'温馨提示',
	   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('name') +' ？',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'确定',cancel: '取消'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("数据处理中，请稍等");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'auditgroup/detaildelete.action?auditgroupdetailid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   		    					if(result.result == "删除成功"){
	   		    						store.removeAt(rowIndex);
	   		    					}
	   	    			    	    Ext.getBody().unmask();
	   		    				},
	   		    				failure: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   	    			    	    Ext.getBody().unmask();
	   		    				}
	   		    		 });	 
	   		    	 }
	   		     }
	   		});
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
    	//alert(getParameter("typeid"));
    	if(isok == 0){
    		Ext.Msg.alert('温馨提示',err);
    		cellEdit.enable();
    		cellEdit.startEditByPosition({
     			row:0,
     			column:0
     		});
    	}else{
    		if(data.length>0){
   			    Ext.Ajax.request({
    				url: 'auditgroup/detailadd.action?auditgroupdetail.zdy10='+ escape(data) +"&auditgroupdetail.mainid="+ mainid,
    				method: 'GET',
    				timeout: 4000,
    				success: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("温馨提示",result.result);
    					if(result.result == "保存成功"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("温馨提示",result.result);
    				}
    			});
    		}else{
    			Ext.Msg.alert("温馨提示","未改动，无需保存");
    		}
    	} 
    }
});