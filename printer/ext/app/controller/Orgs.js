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
            title:'��ܰ��ʾ',
            msg: '���ڿ�ʼͬ�� ��',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
            fn:function(btn){
                if(btn == 'ok') {
                    Ext.getBody().mask("���ݴ����У����Ե�");
                    var result = "";
                    Ext.Ajax.request({
                           url: 'org/syn.action',
                           method: 'GET',
                           timeout: 4000,
                           success: function(response,opts){
                               var result = Ext.JSON.decode(response.responseText);
                               Ext.Msg.alert("��ܰ��ʾ",result.result);
                               if(result.result == "ͬ���ɹ�"){
                               	var grid = o.up('orggrouplist');
                               	var store = grid.getStore();
                               	store.reload();
                               }
                               Ext.getBody().unmask();
                           },
                           failure: function(response,opts){
                               var result = Ext.JSON.decode(response.responseText);
                               Ext.Msg.alert("��ܰ��ʾ",result.result);
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
	   		     title:'��ܰ��ʾ',
	   		     msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('name') +' ��',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("���ݴ����У����Ե�");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'org/delete.action?orgid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("��ܰ��ʾ",result.result);
	   		    					if(result.result == "ɾ���ɹ�"){
	   		    						store.removeAt(rowIndex);
	   		    						store.reload();
	   		    					}
	   	    			    	    Ext.getBody().unmask();
	   		    				},
	   		    				failure: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("��ܰ��ʾ",result.result);
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
    			err = "���Ʋ���Ϊ��";
    		}
    		model.set('zdy2', '0');
    		data.push(Ext.JSON.encode(model.data));
    	});
    	//alert(data);
    	if(isok == 0){
    		Ext.Msg.alert('��ܰ��ʾ',err);
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
    					Ext.Msg.alert("��ܰ��ʾ",result.result);
    					if(result.result == "����ɹ�"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("��ܰ��ʾ",result.result);
    				}
    			});
    		}else{
    			Ext.Msg.alert("��ܰ��ʾ","δ�Ķ������豣��");
    		}
    	} 
    },
    
    deletecenterClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'��ܰ��ʾ',
	   		     msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('name') +' ��',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("���ݴ����У����Ե�");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'org/delete.action?orgid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("��ܰ��ʾ",result.result);
	   		    					if(result.result == "ɾ���ɹ�"){
	   		    						store.removeAt(rowIndex);
	   		    						store.reload();
	   		    					}
	   	    			    	    Ext.getBody().unmask();
	   		    				},
	   		    				failure: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("��ܰ��ʾ",result.result);
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
    			err = "���Ʋ���Ϊ��";
    		}
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			isok = 0;
    			err = "�ϼ���������Ϊ��";
    		}
    		data.push(Ext.JSON.encode(model.data));
    	});
    	//alert(data);
    	if(isok == 0){
    		Ext.Msg.alert('��ܰ��ʾ',err);
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
    					Ext.Msg.alert("��ܰ��ʾ",result.result);
    					if(result.result == "����ɹ�"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("��ܰ��ʾ",result.result);
    				}
    			});
    		}else{
    			Ext.Msg.alert("��ܰ��ʾ","δ�Ķ������豣��");
    		}
    	} 
    },
    
    deletesonClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'��ܰ��ʾ',
	   		     msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('name') +' ��',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("���ݴ����У����Ե�");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: 'org/delete.action?orgid='+ store.getAt(rowIndex).get('id'),
	   		    				method: 'GET',
	   		    				timeout: 4000,
	   		    				success: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("��ܰ��ʾ",result.result);
	   		    					if(result.result == "ɾ���ɹ�"){
	   		    						store.removeAt(rowIndex);
	   		    						store.reload();
	   		    					}
	   	    			    	    Ext.getBody().unmask();
	   		    				},
	   		    				failure: function(response,opts){
	   		    					var result = Ext.JSON.decode(response.responseText);
	   		    					Ext.Msg.alert("��ܰ��ʾ",result.result);
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
    			err = "���Ʋ���Ϊ��";
    		}
    		if(model.get('zdy2') == '' || model.get('zdy2') == null){
    			isok = 0;
    			err = "�ϼ���������Ϊ��";
    		}
    		data.push(Ext.JSON.encode(model.data));
    	});
    	//alert(data);
    	if(isok == 0){
    		Ext.Msg.alert('��ܰ��ʾ',err);
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
    					Ext.Msg.alert("��ܰ��ʾ",result.result);
    					if(result.result == "����ɹ�"){
    						store.load();
    					}
    				},
    				failure: function(response,opts){
    					var result = Ext.JSON.decode(response.responseText);
    					Ext.Msg.alert("��ܰ��ʾ",result.result);
    				}
    			});
    		}else{
    			Ext.Msg.alert("��ܰ��ʾ","δ�Ķ������豣��");
    		}
    	} 
    }
});