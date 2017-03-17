Ext.define('M.controller.Orggroups', {
    extend: 'Ext.app.Controller',

    stores: [
             'Orggroups'
         ],
    
    models: [
             'Org'
            ],
         
    views: [
			'org.OrggroupList'
        ],
       
    init: function() {
    	this.control({
    		'orggrouplist button[id=deletegroup]':{
           	 	click: this.deletegroupClick
            },
            'orggrouplist button[id=informationgroup]':{
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
            'orggrouplist button[id=searchgroup]': {
                click: this.searchgroupClick
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
	 
    informationgroupClick: function(o){
    	var grid = o.up('orggrouplist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		alert("���ȱ���");
	    	}else{
	    		parent.location = "orgsecondlist.html?idtype=center&typeid="+ record.get('id') +"&name="+ escape(record.get('name'));
	    	}
    	}else{
    		alert("��ѡ��һ������");
    	}
    },
    
    
    synClick: function(o){
    	var message = confirm("���ڿ�ʼͬ�� ��");
    	if(message == true){
    		//Ext.getBody().mask("���ݴ����У����Ե�");
            var result = "";
            Ext.Ajax.request({
                   url: 'org/syn.action',
                   method: 'GET',
                   timeout: 8000,
                   success: function(response,opts){
                       var result = Ext.JSON.decode(response.responseText);
                       if(result.result == "ͬ���ɹ�"){
                           alert("ͬ��ִ���У����Ժ��ٲ�ѯ");
                           var grid = o.up('orggrouplist');
                           var store = grid.getStore();
                           store.reload();
                       }else{
                    	   alert(result.result);
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
    },
    
    deletegroupClick: function(o){
    	var grid = o.up('orggrouplist');
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
    		alert("��ѡ��һ������");
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
    			err = "���Ʋ���Ϊ��";
    		}
    		model.set('zdy2', '0');
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