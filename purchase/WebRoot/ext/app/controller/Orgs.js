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
            'orggrouplist button[id=searchgroup]': {
                click: this.searchgroupClick
            },
            'orgcenterlist button[id=searchcenter]': {
                click: this.searchcenterClick
            },
            'orgsonlist button[id=searchson]': {
                click: this.searchsonClick
            },
            'orggrouplist button[id=exportexcel_group]': {
            	click: this.exportGroupExcelClick
            }/*,
            'orgcenterlist button[id=exportexcel_center]': {
            	click: this.exportCenterExcelClick
            },
            'orgsonlist button[id=exportexcel_son]': {
            	click: this.exportSonExcelClick
            }*/
            
        });
    },
    /*exportGroupExcelClick: function(o){
    	var message = confirm("�Ƿ�ʼ������");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'org/group.action?idtype=all',
                method: 'GET',
                timeout: 4000,
                success: function(response,opts){
                    Ext.getBody().unmask();
                	var obj = Ext.JSON.decode(response.responseText);
                	window.location.href = obj.result;
                },
                failure: function(response,opts){
                	Ext.getBody().unmask();
                	alert("����ʧ�ܣ�");
                }
    		});
    	}
    },
    exportCenterExcelClick: function(o){
    	var message = confirm("�Ƿ�ʼ������");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'org/center.action?idtype=center&typeid='+ getParameter("typeid"),
                method: 'GET',
                timeout: 4000,
                success: function(response,opts){
                    Ext.getBody().unmask();
                	var obj = Ext.JSON.decode(response.responseText);
                	window.location.href = obj.result;
                },
                failure: function(response,opts){
                	Ext.getBody().unmask();
                	alert("����ʧ�ܣ�");
                }
    		});
    	}
    },*/
    exportSonExcelClick: function(o){
    	var message = confirm("�Ƿ�ʼ������");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'org/son.action?idtype=son&typeid='+ getParameter("typeid"),
                method: 'GET',
                timeout: 4000,
                success: function(response,opts){
                    Ext.getBody().unmask();
                	var obj = Ext.JSON.decode(response.responseText);
                	window.location.href = obj.result;
                },
                failure: function(response,opts){
                	Ext.getBody().unmask();
                	alert("����ʧ�ܣ�");
                }
    		});
    	}
    },
    backClick:function(o){
    	history.back();
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
    		alert("��ѡ����������");
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