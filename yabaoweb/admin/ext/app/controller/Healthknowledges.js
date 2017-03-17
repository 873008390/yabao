Ext.define('M.controller.Healthknowledges', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users',
             'Healthknowledge-reads',
             'Healthknowledges'
         ],
    
    models: [
             'User',
             'Healthknowledge'
            ],
         
    views: [
            'healthknowledge.HealthknowledgeuserList',
            'healthknowledge.HealthknowledgereaduserList',
            'healthknowledge.HealthknowledgeList'
        ],
       
    init: function() {
    	this.control({
    		'healthknowledgelist actioncolumn[id=addcontent]': {
                click: this.addcontentClick
            },
            'healthknowledgelist actioncolumn[id=information]': {
                click: this.informationClick
            },
            'healthknowledgeuserlist actioncolumn[id=informationuser]': {
                click: this.informationuserClick
            },
            'healthknowledgelist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'healthknowledgelist button[id=add]':{
              	click: this.addClick
            },
            'healthknowledgelist button[id=addcontent]':{
              	click: this.addcontentClick
            },
            'healthknowledgelist button[id=save]': {
                click: this.updateClick
            },
            'healthknowledgelist button[id=search]': {
                click: this.searchClick
            },
            'healthknowledgeuserlist button[id=searchuser]': {
                click: this.searchuserClick
            },
            'healthknowledgereaduserlist button[id=searchread]': {
                click: this.searchreadClick
            }
        });
    },
	 
    searchreadClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('healthknowledgereaduserlist');
		var store = grid.getStore();
		store.getProxy().url = "healthknowledge/list.action?idtype=searchread&typeid="+ Ext.getCmp("keywordread").getValue();
		store.load();
	 },
	 
    searchuserClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('healthknowledgeuserlist');
		var store = grid.getStore();
		store.getProxy().url = "user/list.action?idtype=search&typeid="+ Ext.getCmp("keyworduser").getValue();
		store.load();
	 },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('healthknowledgelist');
		var store = grid.getStore();
		store.getProxy().url = "healthknowledge/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    addcontentClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
        	Ext.Msg.alert('温馨提示',"请先保存");
        }else{
        	self.location = "healthknowledgeadd.html?id="+ store.getAt(rowIndex).get('id');
        }
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('healthknowledgereaduserGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "healthknowledge/list.action?idtype=read&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    informationuserClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('healthknowledgereaduserGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "healthknowledge/list.action?idtype=searchread&typeid="+ store.getAt(rowIndex).get('name');
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
	   		    				url: 'healthknowledge/delete.action?healthknowledgeid='+ store.getAt(rowIndex).get('id'),
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
		var rec = new M.model.Healthknowledge();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('healthknowledgelist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateClick: function(o) {
    	var grid = o.up('healthknowledgelist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('title') == '' || model.get('title') == null){
    			isok = 0;
    			err = "标题不能为空";
    		}
    		if(model.get('zdy4') == '' || model.get('zdy4') == null){
    			isok = 0;
    			err = "类型不能为空";
    		}
    		if(model.get('id') == '' || model.get('id') == null || model.get('id') == 0){
    			model.set('readnum',0);
    		}
    		if(model.get('topstatus') == '' || model.get('topstatus') == null){
    			model.set('topstatus',0);
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
    				url: 'healthknowledge/add.action?healthknowledge.zdy10='+ escape(data),
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