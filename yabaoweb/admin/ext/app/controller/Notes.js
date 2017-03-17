Ext.define('M.controller.Notes', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users',
             'Notereplys',
             'Notes'
         ],
    
    models: [
             'User',
             'Note',
             'Notereply'
            ],
         
    views: [
            'note.NoteuserList',
            'note.NotereplyList',
            'note.NoteList'
        ],
       
    init: function() {
    	this.control({
    		'notelist actioncolumn[id=information]': {
                click: this.informationClick
            },
            'noteuserlist actioncolumn[id=informationuser]': {
                click: this.informationuserClick
            },
            'notelist actioncolumn[id=talk]': {
                click: this.talkClick
            },
            'notelist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'notelist button[id=add]':{
              	click: this.addClick
            },
            'notelist button[id=save]': {
                click: this.updateClick
            },
            'notereplylist actioncolumn[id=replydelete]':{
           	 	click: this.replydeleteClick
            },
            'notereplylist button[id=replyadd]':{
              	click: this.replyaddClick
            },
            'notereplylist button[id=replysave]': {
                click: this.replyupdateClick
            },
            'notelist button[id=search]': {
                click: this.searchClick
            },
            'noteuserlist button[id=searchuser]': {
                click: this.searchuserClick
            },
            'notereplylist button[id=searchread]': {
                click: this.searchreadClick
            }
        });
    },
    
    talkClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('noteGrid');
			var downstore = downgrid.getStore();
			if(store.getAt(rowIndex).get('zdy4').indexOf('一个人')>-1){
				var username = "";
				Ext.Ajax.request({
	    				url: 'user/getusername.action',
	    				method: 'GET',
	    				timeout: 4000,
	    				success: function(response,opts){
	    					var result = Ext.JSON.decode(response.responseText);
	    					username = result.username;
	    					if(store.getAt(rowIndex).get('zdy5') == username){
	    						window.open("wxsaler/talk_admin.html?status=1&id="+ store.getAt(rowIndex).get('id') +"&username="+ escape(store.getAt(rowIndex).get('zdy3')));
	    					}else if(store.getAt(rowIndex).get('zdy3') == username){
	    						window.open("wxsaler/talk_admin.html?status=1&id="+ store.getAt(rowIndex).get('id') +"&username="+ escape(store.getAt(rowIndex).get('zdy5'))); 
	    					}else{
	    						alert("替同事答复，请在上部的已读用户中新增");
	    						var downgrid = Ext.getCmp('notereplyGrid');
	    						var downstore = downgrid.getStore();
	    						downstore.getProxy().url = "notereply/list.action?idtype=note&typeid="+ store.getAt(rowIndex).get('id');
	    						downstore.load();
	    					}
	    				},
	    				failure: function(response,opts){
	    					
	    				}
	    		 });
			}else{
				alert("类型为指定一个人时才能启动对话界面");
			}
    	}
    },
	 
    searchreadClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('notereplylist');
		var store = grid.getStore();
		store.getProxy().url = "notereply/list.action?idtype=search&typeid="+ Ext.getCmp("keywordread").getValue();
		store.load();
	 },
	 
    searchuserClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('noteuserlist');
		var store = grid.getStore();
		store.getProxy().url = "user/list.action?idtype=search&typeid="+ Ext.getCmp("keyworduser").getValue();
		store.load();
	 },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('notelist');
		var store = grid.getStore();
		store.getProxy().url = "note/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('notereplyGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "notereply/list.action?idtype=note&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    informationuserClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('noteGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "note/list.action?idtype=userwithlimit&typeid="+ store.getAt(rowIndex).get('id');
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
	   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('content') +' ？',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'确定',cancel: '取消'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("数据处理中，请稍等");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'note/delete.action?noteid='+ store.getAt(rowIndex).get('id'),
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
		var rec = new M.model.Note();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('notelist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

	 updateClick: function(o) {
	    	var grid = o.up('notelist');
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
	    		if(model.get('zdy4') == '' || model.get('zdy4') == null){
	    			isok = 0;
	    			err = "类型不能为空";
	    		}else if(model.get('zdy4') == '指定一个人' && (model.get('zdy5') == '' || model.get('zdy5') == null)){
	    			isok = 0;
	    			err = "请选择指定人";
	    		}
	    		if(model.get('topstatus') == '' || model.get('topstatus') == null){
	    			model.set('topstatus',0);
	    		}
	    		if(model.get('readnum') == '' || model.get('readnum') == null){
	    			model.set('readnum',0);
	    		}
	    		if(model.get('replynum') == '' || model.get('replynum') == null){
	    			model.set('replynum',0);
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
	    				url: 'note/add.action?note.zdy10='+ escape(data),
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
		   		    				url: 'notereply/delete.action?notereplyid='+ store.getAt(rowIndex).get('id'),
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
		 
	    replyaddClick: function(o){
			var rec = new M.model.Notereply();
			//var grid = o.ownerCt.ownerCt;
			var grid = o.up('notereplylist');
			var edit = grid.getPlugin('celledit');
			edit.cancelEdit();
			grid.getStore().insert(0, rec);
			edit.startEditByPosition({
				row:0,
				column:1
			});
		 },

		 replyupdateClick: function(o) {
		    	var grid = o.up('notereplylist');
		    	cellEdit.completeEdit();
				var store = grid.getStore();
		    	var records = store.getNewRecords();
		    	var records1 = store.getUpdatedRecords();
		    	records = records.concat(records1);
		    	var data = [];
		    	var isok = 1;
		    	var err = "";
		    	var url = store.getProxy().url;
				var noteid = url.split("typeid=")[1];
				if(noteid == 0){
					isok = 0;
					err = "请先选择信息";
				}else{
			    	Ext.Array.each(records, function(model){
			    		if(model.get('content') == '' || model.get('content') == null){
			    			isok = 0;
			    			err = "内容不能为空";
			    		}
			    		if(model.get('noteid') == '' || model.get('noteid') == null){
			    			model.set('noteid', 0);
			    		}
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
		    				url: 'notereply/add.action?notereply.zdy10='+ escape(data) +"&notereply.noteid="+ noteid,
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