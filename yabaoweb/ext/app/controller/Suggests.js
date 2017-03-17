Ext.define('M.controller.Suggests', {
    extend: 'Ext.app.Controller',

    stores: [
             'Suggests'
         ],
    
    models: ['Suggest'],
         
    views: [
            'suggest.SuggestList'
        ],
       
    init: function() {
    	this.control({
    		'suggestlist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'suggestlist actioncolumn[id=add]':{
              	click: this.replyClick
            },
            'suggestlist button[id=addhelp]': {
                click: this.addClick
            },
            'suggestlist button[id=search]': {
                click: this.searchSuggest
            },
            'suggestlist button[id=back]': {
                click: this.backClick
            }
        });
    },
    
    replyClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = "../admin/suggestreplyadd.html?idtype=content&typeid="+ store.getAt(rowIndex).get('id');
    },
    
    backClick: function(o, item, rowIndex, colIndex, e){
    	self.location = "../admin/cataloglist.html?idtype=allwithlimit&typeid=0";
    },
	 
	searchSuggest: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('suggestlist');
		var store = grid.getStore();
		store.getProxy().url = "../suggest/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
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
	   		    				url: '../suggest/delete.action?suggestid='+ store.getAt(rowIndex).get('id'),
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
		self.location = "suggesthelpadd.html";
	 },

    updateSuggest: function(o) {
    	var grid = o.up('suggestlist');
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
    				url: '../suggest/add.action?suggest.zdy10='+ escape(data),
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