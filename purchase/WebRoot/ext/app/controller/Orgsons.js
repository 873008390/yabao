Ext.define('M.controller.Orgsons', {
    extend: 'Ext.app.Controller',

    stores: [
             'Orgsons'
         ],
    
    models: [
             'Org'
            ],
         
    views: [
			'org.OrgsonList'
        ],
       
    init: function() {
    	this.control({
    		
            'orgsonlist button[id=deleteson]':{
           	 	click: this.deletesonClick
            },
            'orgsonlist button[id=addson]':{
              	click: this.addsonClick
            },
            'orgsonlist button[id=backson]': {
                click: this.backClick
            },
            'orgsonlist button[id=saveson]': {
                click: this.updatesonClick
            },
            'orgsonlist button[id=searchson]': {
                click: this.searchsonClick
            }
        });
    },
   
   
    backClick:function(o){
    	history.back();
    },
	 
    searchsonClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('orgsonlist');
		var store = grid.getStore();
		store.getProxy().url = "org/list.action?idtype=searchson&typeid="+ Ext.getCmp("keywordson").getValue();
		store.load();
	 },
    
    deletesonClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('orgsonlist');
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
  		    				url: 'org/delete.action?orgid='+ record.get('id'),
  		    				method: 'GET',
  		    				timeout: 4000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("温馨提示:"+result.result);
  		    					if(result.result == "删除成功"){
  		    						store.removeAt(rowIndex);
  		    						store.reload();
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
    		alert("请选择三级机构");
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
    			model.set('zdy2', unescape(getParameter("name")));
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
    				url: 'org/add.action?org.zdy10='+ escape(data),
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