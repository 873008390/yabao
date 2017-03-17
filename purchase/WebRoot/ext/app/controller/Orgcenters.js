Ext.define('M.controller.Orgcenters', {
    extend: 'Ext.app.Controller',

    stores: [
             'Orgcenters'
         ],
    
    models: [
             'Org'
            ],
         
    views: [
			'org.OrgcenterList'
        ],
       
    init: function() {
    	this.control({
    		
            'orgcenterlist button[id=deletecenter]':{
           	 	click: this.deletecenterClick
            },
            'orgcenterlist button[id=informationcenter]':{
           	 	click: this.informationcenterClick
            },
            'orgcenterlist button[id=addcenter]':{
              	click: this.addcenterClick
            },
            'orgcenterlist button[id=savecenter]': {
                click: this.updatecenterClick
            },
            'orgcenterlist button[id=backcenter]': {
                click: this.backClick
            },
            'orgcenterlist button[id=searchcenter]': {
                click: this.searchcenterClick
            }
            
        });
    },
    backClick:function(o){
    	history.back();
    },
	 
    searchcenterClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('orgcenterlist');
		var store = grid.getStore();
		store.getProxy().url = "org/list.action?idtype=searchcenter&typeid="+ Ext.getCmp("keywordcenter").getValue();
		store.load();
	 },
    
    informationcenterClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('orgcenterlist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		alert("���ȱ���");
	    	}else{
	    		self.location = "orgthirdlist.html?idtype=son&typeid="+ record.get('id') +"&name="+ escape(record.get('name'));
	    	}
    	}else{
    		alert("��ѡ���������");
    	}
    },
    
    deletecenterClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('orgcenterlist');
    	var store = grid.getStore();
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
    		var rowIndex = store.indexOf(record);
	    	if(record.get('id') == null || record.get('id') == ''){
	    		store.removeAt(rowIndex);
	    	}else{
	    		var message = confirm("ȷ��Ҫɾ����"+ record.get('name') +" ��");
	    		if(message == true){
	    			Ext.getBody().mask("���ݴ����У����Ե�");
  		             var result = "";
  		             Ext.Ajax.request({
  		    				url: 'org/delete.action?orgid='+ record.get('id'),
  		    				method: 'GET',
  		    				timeout: 4000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("��ܰ��ʾ:"+result.result);
  		    					if(result.result == "ɾ���ɹ�"){
  		    						store.removeAt(rowIndex);
  		    						store.reload();
  		    					}
  	    			    	    Ext.getBody().unmask();
  		    				},
  		    				failure: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("��ܰ��ʾ:"+result.result);
  	    			    	    Ext.getBody().unmask();
  		    				}
  		    		 });
	    		}
	    	}
    	}else{
    		alert("��ѡ���������");
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
    			err = "���Ʋ���Ϊ��";
    		}
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			model.set('zdy2', unescape(getParameter("name")));
    		}
    		data.push(Ext.JSON.encode(model.data));
    	});
    	if(isok == 0){
    		alert("��ܰ��ʾ:"+err);
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
    					alert("��ܰ��ʾ:"+result.result);
    					if(result.result == "����ɹ�"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					alert("��ܰ��ʾ:"+result.result);
    				}
    			});
    		}else{
    			alert("��ܰ��ʾ:δ�Ķ������豣��");
    		}
    	} 
    }
});