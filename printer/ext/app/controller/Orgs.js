Ext.define('M.controller.Orgs', {
    extend: 'Ext.app.Controller',

    stores: [
             'Orgcenters',
             'Orggroups',
             'Orgsons'
         ],
    
    models: [
             'Org'
            ],
         
    views: [
            'org.OrggroupList',
            'org.OrgcenterList',
            'org.OrgsonList'
        ],
       
    init: function() {
    	this.control({
    		'orggrouplist actioncolumn[id=deletegroup]':{
           	 	click: this.deletegroupClick
            },
            'orggrouplist actioncolumn[id=informationgroup]':{
           	 	click: this.informationgroupClick
            },
            'orggrouplist button[id=syn]':{
              	click: this.synClick
            },
            'orggrouplist button[id=addgroup]':{
              	click: this.addgroupClick
            },
            'orggrouplist button[id=savegroup]': {
                click: this.updategroupClick
            },
            'orgcenterlist actioncolumn[id=deletecenter]':{
           	 	click: this.deletecenterClick
            },
            'orgcenterlist actioncolumn[id=informationcenter]':{
           	 	click: this.informationcenterClick
            },
            'orgcenterlist button[id=addcenter]':{
              	click: this.addcenterClick
               },
            'orgcenterlist button[id=savecenter]': {
                click: this.updatecenterClick
            },
            'orgsonlist actioncolumn[id=deleteson]':{
           	 	click: this.deletesonClick
            },
            'orgsonlist button[id=addson]':{
              	click: this.addsonClick
               },
            'orgsonlist button[id=saveson]': {
                click: this.updatesonClick
            },
            'orggrouplist button[id=searchgroup]': {
                click: this.searchgroupClick
            },
            'orgcenterlist button[id=searchcenter]': {
                click: this.searchcenterClick
            },
            'orgsonlist button[id=searchson]': {
                click: this.searchsonClick
            }
        });
    },
	 
    searchgroupClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('orggrouplist');
		var store = grid.getStore();
		store.getProxy().url = "org/list.action?idtype=searchgroup&typeid="+ Ext.getCmp("keywordgroup").getValue();
		store.load();
	 },
	 
    searchcenterClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('orgcenterlist');
		var store = grid.getStore();
		store.getProxy().url = "org/list.action?idtype=searchcenter&typeid="+ Ext.getCmp("keywordcenter").getValue();
		store.load();
	 },
	 
    searchsonClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('orgsonlist');
		var store = grid.getStore();
		store.getProxy().url = "org/list.action?idtype=searchson&typeid="+ Ext.getCmp("keywordson").getValue();
		store.load();
	 },
    
    informationgroupClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('orgcenterGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "org/list.action?idtype=center&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    informationcenterClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('orgsonGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "org/list.action?idtype=son&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    synClick: function(o){
   	 Ext.Msg.show({
            title:'温馨提示',
            msg: '现在开始同步 ？',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            buttonText:{ok:'确定',cancel: '取消'},
            fn:function(btn){
                if(btn == 'ok') {
                    Ext.getBody().mask("数据处理中，请稍等");
                    var result = "";
                    Ext.Ajax.request({
                           url: 'org/syn.action',
                           method: 'GET',
                           timeout: 4000,
                           success: function(response,opts){
                               var result = Ext.JSON.decode(response.responseText);
                               Ext.Msg.alert("温馨提示",result.result);
                               if(result.result == "同步成功"){
                               	var grid = o.up('orggrouplist');
                               	var store = grid.getStore();
                               	store.reload();
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
    },
    
    deletegroupClick: function(o, item, rowIndex, colIndex, e){
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
	   		    				url: 'org/delete.action?orgid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   		    					if(result.result == "删除成功"){
	   		    						store.removeAt(rowIndex);
	   		    						store.reload();
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
	 
	addgroupClick: function(o){
		var rec = new M.model.Org();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('orggrouplist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updategroupClick: function(o) {
    	var grid = o.up('orggrouplist');
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
    		model.set('zdy2', '0');
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
    				url: 'org/add.action?org.zdy10='+ escape(data),
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
    
    deletecenterClick: function(o, item, rowIndex, colIndex, e){
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
	   		    				url: 'org/delete.action?orgid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   		    					if(result.result == "删除成功"){
	   		    						store.removeAt(rowIndex);
	   		    						store.reload();
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
	 
	addcenterClick: function(o){
		var rec = new M.model.Org();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('orgcenterlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updatecenterClick: function(o) {
    	var grid = o.up('orgcenterlist');
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
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			isok = 0;
    			err = "上级机构不能为空";
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
    				url: 'org/add.action?org.zdy10='+ escape(data),
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
    
    deletesonClick: function(o, item, rowIndex, colIndex, e){
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
	   		    				url: 'org/delete.action?orgid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   		    					if(result.result == "删除成功"){
	   		    						store.removeAt(rowIndex);
	   		    						store.reload();
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
	 
	addsonClick: function(o){
		var rec = new M.model.Org();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('orgsonlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updatesonClick: function(o) {
    	var grid = o.up('orgsonlist');
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
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			isok = 0;
    			err = "上级机构不能为空";
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
    				url: 'org/add.action?org.zdy10='+ escape(data),
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