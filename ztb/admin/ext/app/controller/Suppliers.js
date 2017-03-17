Ext.define('M.controller.Suppliers', {
    extend: 'Ext.app.Controller',

    stores: [
             'Suppliers',
             'Supplierfiles',
             'Supplier-catalogs'
         ],
    
    models: ['Supplier','Supplierfile'],
         
    views: [
            'supplier.SupplierList',
            'supplier.SupplierfileList',
            'supplier.SuppliercatalogList'
        ],
       
    init: function() {
    	this.control({
    		'supplierlist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'supplierlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'supplierlist button[id=add]':{
              	click: this.addClick
            },
            'supplierlist button[id=save]': {
                click: this.updateSupplier
            },
            'supplierlist button[id=report]': {
                click: this.reportClick
            },
            'supplierlist button[id=search]': {
                click: this.searchClick
            },
            'supplierfilelist actioncolumn[id=delete]':{
           	 	click: this.deletefileClick
            },
            'suppliercataloglist actioncolumn[id=deletecatalog]':{
           	 	click: this.deletecatalogClick
            },
            'suppliercataloglist button[id=addcatalog]':{
              	click: this.addcatalogClick
            },
            'suppliercataloglist button[id=savecatalog]': {
                click: this.updatecatalogClick
            }
            
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('supplierfileGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "../supplier/listfile.action?idtype=supplier&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
			downgrid = Ext.getCmp('suppliercatalogGrid');
			downstore = downgrid.getStore();
			downstore.getProxy().url = "../supplier/list.action?idtype=catalog&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    deletefileClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'温馨提示',
	   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('oldfilename') +'？',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'确定',cancel: '取消'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("数据处理中，请稍等");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: '../supplier/deletefile.action?supplierfileid='+ store.getAt(rowIndex).get('id'),
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
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('supplierlist');
		var store = grid.getStore();
		store.getProxy().url = "../supplier/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
	 
	reportClick: function(o){
		self.location = 'supplierreportlist.html';
	 },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'温馨提示',
	   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('name') +'？',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'确定',cancel: '取消'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("数据处理中，请稍等");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: '../supplier/delete.action?supplierid='+ store.getAt(rowIndex).get('id'),
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
		var rec = new M.model.Supplier();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('supplierlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateSupplier: function(o) {
    	var grid = o.up('supplierlist');
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
    			err = "姓名不能为空";
    		}
    		model.set('type', 1);
    		model.set('filenum', 0);
    		if(model.get('iscompany') == '' || model.get('iscompany') == null){
    			model.set('iscompany',1);
    		}
    		if(model.get('taxrate') == '' || model.get('taxrate') == null){
    			model.set('iscompany',0);
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
    				url: '../supplier/add.action?supplier.zdy10='+ escape(data),
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
	 
	addcatalogClick: function(o){
		var rec = new M.model.Supplier();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('suppliercataloglist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },
    
    deletecatalogClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		var typeid = store.getProxy().url.split("typeid=")[1];
			if(typeid == 0){
				Ext.Msg.alert("温馨提示","请先选择供应商");
			}else{
	    		Ext.Msg.show({
		   		     title:'温馨提示',
		   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('name') +'？',
		   		     buttons: Ext.Msg.OKCANCEL,
		   		     icon: Ext.Msg.QUESTION,
		   		     buttonText:{ok:'确定',cancel: '取消'},
		   		     fn:function(btn){
		   		    	 if(btn == 'ok') {
		   		    		 Ext.getBody().mask("数据处理中，请稍等");
		   		             var result = "";
		   		             Ext.Ajax.request({
		   		    				url: '../supplier/deletecatalog.action?supplierid='+ typeid +'&catalogname='+ store.getAt(rowIndex).get('name'),
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
    	}
    },

    updatecatalogClick: function(o) {
    	var grid = o.up('suppliercataloglist');
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
    			err = "类型不能为空";
    		}
    		model.set('type', 1);
    		model.set('filenum', 0);
    		if(model.get('iscompany') == '' || model.get('iscompany') == null){
    			model.set('iscompany',1);
    		}
    		if(model.get('taxrate') == '' || model.get('taxrate') == null){
    			model.set('taxrate',0);
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
    			var typeid = store.getProxy().url.split("typeid=")[1];
    			if(typeid == 0){
    				Ext.Msg.alert("温馨提示","请先选择供应商");
    			}else{
	   			    Ext.Ajax.request({
	    				url: '../supplier/addcatalog.action?supplier.zdy10='+ escape(data) +'&supplier.zdy9='+ typeid,
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
    			}
    		}else{
    			Ext.Msg.alert("温馨提示","未改动，无需保存");
    		}
    	} 
    }
});