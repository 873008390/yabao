Ext.define('M.controller.Iasks', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users',
             'Iaskreplys',
             'Iasks'
         ],
    
    models: [
             'User',
             'Iask',
             'Iaskreply'
            ],
         
    views: [
            'iask.IaskuserList',
            'iask.IaskreplyList',
            'iask.IaskList'
        ],
       
    init: function() {
    	this.control({
    		'iasklist actioncolumn[id=information]': {
                click: this.informationClick
            },
            'iaskuserlist actioncolumn[id=informationuser]': {
                click: this.informationuserClick
            },
            'iasklist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'iasklist button[id=add]':{
              	click: this.addClick
            },
            'iasklist button[id=save]': {
                click: this.updateClick
            },
            'iaskreplylist button[id=replyadd]':{
              	click: this.replyaddClick
            },
            'iaskreplylist button[id=replysave]': {
                click: this.replyupdateClick
            },
            'iaskreplylist actioncolumn[id=replydelete]':{
           	 	click: this.replydeleteClick
            },
            'iasklist button[id=search]': {
                click: this.searchClick
            },
            'iaskuserlist button[id=searchuser]': {
                click: this.searchuserClick
            },
            'iaskreplylist button[id=searchread]': {
                click: this.searchreadClick
            }
        });
    },
	 
    searchreadClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('iaskreplylist');
		var store = grid.getStore();
		store.getProxy().url = "iaskreply/list.action?idtype=search&typeid="+ Ext.getCmp("keywordread").getValue();
		store.load();
	 },
	 
    searchuserClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('iaskuserlist');
		var store = grid.getStore();
		store.getProxy().url = "user/list.action?idtype=search&typeid="+ Ext.getCmp("keyworduser").getValue();
		store.load();
	 },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('iasklist');
		var store = grid.getStore();
		store.getProxy().url = "iask/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('iaskreplyGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "iaskreply/list.action?idtype=iask&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    informationuserClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('iaskGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "iask/list.action?idtype=userwithlimit&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'温馨提示',
	   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('title') +' ？',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'确定',cancel: '取消'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("数据处理中，请稍等");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'iask/delete.action?iaskid='+ store.getAt(rowIndex).get('id'),
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
	 
	addClick: function(o){
		var rec = new M.model.Iask();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('iasklist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

	 updateClick: function(o) {
	    	var grid = o.up('iasklist');
	    	cellEdit.completeEdit();
			var store = grid.getStore();
	    	var records = store.getNewRecords();
	    	var records1 = store.getUpdatedRecords();
	    	records = records.concat(records1);
	    	var data = [];
	    	var isok = 1;
	    	var err = "";
	    	Ext.Array.each(records, function(model){
	    		if(model.get('content') == '' || model.get('content') == null){
	    			isok = 0;
	    			err = "内容不能为空";
	    		}
	    		if(model.get('topstatus') == '' || model.get('topstatus') == null){
	    			model.set('topstatus', 0);
	    		}
	    		if(model.get('readnum') == '' || model.get('readnum') == null){
	    			model.set('readnum', 0);
	    		}
	    		if(model.get('replynum') == '' || model.get('replynum') == null){
	    			model.set('replynum', 0);
	    		}
	    		if(model.get('auditstatus') == '' || model.get('auditstatus') == null){
	    			model.set('auditstatus', 0);
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
	    				url: 'iask/add.action?iask.zdy10='+ escape(data),
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
    
	replydeleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'温馨提示',
	   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('content') +' ？',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'确定',cancel: '取消'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("数据处理中，请稍等");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'iaskreply/delete.action?iaskreplyid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("温馨提示",result.result);
	   		    					if(result.result == "删除成功"){
	   		    						store.removeAt(rowIndex);
	   		    						var downgrid = Ext.getCmp('iaskGrid');
	   		    						var downstore = downgrid.getStore();
	   		    						downstore.load();
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
	 
    replyaddClick: function(o){
		var rec = new M.model.Iaskreply();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('iaskreplylist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

	 replyupdateClick: function(o) {
	    	var isok = 1;
	    	var grid = o.up('iaskreplylist');
	    	cellEdit.completeEdit();
			var store = grid.getStore();
			var records = store.getNewRecords();
	    	var records1 = store.getUpdatedRecords();
	    	records = records.concat(records1);
	    	var data = [];
	    	var err = "";
	    	var url = store.getProxy().url;
			var iaskid = url.split("typeid=")[1];
			if(iaskid == 0){
				isok = 0;
				err = "请先选择咨询内容";
			}else{
				Ext.Array.each(records, function(model){
		    		if(model.get('content') == '' || model.get('content') == null){
		    			isok = 0;
		    			err = "内容不能为空";
		    		}
		    		if(model.get('auditstatus') == '' || model.get('auditstatus') == null){
		    			model.set('auditstatus', 0);
		    		}
		    		model.set('type', 2);
		    		data.push(Ext.JSON.encode(model.data));
		    	});
			}
	    	
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
	    				url: 'iaskreply/add.action?iaskreply.zdy10='+ escape(data) +"&iaskreply.iaskid="+ iaskid,
	    				method: 'GET',
	    				timeout: 4000,
	    				success: function(response,opts){
	    					var result = Ext.JSON.decode(response.responseText);
	    					Ext.Msg.alert("温馨提示",result.result);
	    					if(result.result == "保存成功"){
	    						store.load();
	    						var downgrid = Ext.getCmp('iaskGrid');
	    						var downstore = downgrid.getStore();
	    						downstore.load();
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