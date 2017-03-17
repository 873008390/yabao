Ext.define('M.controller.Products', {
    extend: 'Ext.app.Controller',

    stores: [
             'Producttypes',
             'Productunits',
             'Productspecs',
             'Products'
         ],
    
    models: [
             'Producttype',
             'Productunit',
             'Productspec',
             'Product'
            ],
         
    views: [
            'product.ProducttypeList',
            'product.ProductunitList',
            'product.ProductspecList',
            'product.ProductList'
        ],
       
    init: function() {
    	this.control({
    		'producttypelist button[id=deletetype]':{
           	 	click: this.deletetypeClick
            },
            'producttypelist button[id=addtype]':{
              	click: this.addtypeClick
            },
            'producttypelist button[id=savetype]': {
                click: this.updatetypeClick
            },
            'producttypelist actioncolumn[id=informationtype]': {
                click: this.informationtypeClick
            },
            'productunitlist button[id=deleteunit]':{
           	 	click: this.deleteunitClick
            },
            'productunitlist button[id=addunit]':{
              	click: this.addunitClick
               },
            'productunitlist button[id=saveunit]': {
                click: this.updateunitClick
            },
            'productspeclist button[id=deletespec]':{
           	 	click: this.deletespecClick
            },
            'productspeclist button[id=addspec]':{
              	click: this.addspecClick
               },
            'productspeclist button[id=savespec]': {
                click: this.updatespecClick
            },
            'productspeclist actioncolumn[id=informationspec]': {
                click: this.informationspecClick
            },
            'productlist button[id=delete]':{
           	 	click: this.deleteClick
            },
            'productlist button[id=add]':{
              	click: this.addClick
            },
            'productlist button[id=save]': {
                click: this.updateClick
            },
            'productlist button[id=syn]': {
                click: this.synClick
            },
            'productlist button[id=exportexcel]': {
            	click: this.exportExcelClick
            },
            'productunitlist button[id=exportexcel]': {
            	click: this.exportUnitExcelClick
            },
            'producttypelist button[id=exportexcel]': {
            	click: this.exportTypeExcelClick
            },
            'productspeclist button[id=exportexcel]': {
            	click: this.exportSpecExcelClick
            }
        });
    },
    exportExcelClick: function(o){
    	var message = confirm("是否开始导出？");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'product/exportProductExcel.action?idtype=exportwithlimit&typeid=' + getParameter("typeid"),
                method: 'GET',
                timeout: 40000,
                success: function(response,opts){
                    Ext.getBody().unmask();
                	var obj = Ext.JSON.decode(response.responseText);
                	window.location.href = obj.result;
                },
                failure: function(response,opts){
                	Ext.getBody().unmask();
                	alert("导出失败！");
                }
    		});
    	}
    },
    exportUnitExcelClick: function(o){
    	var message = confirm("是否开始导出？");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'productunit/exportUnitExcel.action?idtype=export&typeid=0',
                method: 'GET',
                timeout: 40000,
                success: function(response,opts){
                    Ext.getBody().unmask();
                	var obj = Ext.JSON.decode(response.responseText);
                	window.location.href = obj.result;
                },
                failure: function(response,opts){
                	Ext.getBody().unmask();
                	alert("导出失败！");
                }
    		});
    	}
    },
    exportTypeExcelClick: function(o){
    	var message = confirm("是否开始导出？");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'producttype/exportTypeExcel.action?idtype=export&typeid=0',
                method: 'GET',
                timeout: 40000,
                success: function(response,opts){
                    Ext.getBody().unmask();
                	var obj = Ext.JSON.decode(response.responseText);
                	window.location.href = obj.result;
                },
                failure: function(response,opts){
                	Ext.getBody().unmask();
                	alert("导出失败！");
                }
    		});
    	}
    },
    exportSpecExcelClick: function(o){
    	var message = confirm("是否开始导出？");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'productspec/exportSpecExcel.action?idtype=export&typeid=0',
                method: 'GET',
                timeout: 40000,
                success: function(response,opts){
                    Ext.getBody().unmask();
                	var obj = Ext.JSON.decode(response.responseText);
                	window.location.href = obj.result;
                },
                failure: function(response,opts){
                	Ext.getBody().unmask();
                	alert("导出失败！");
                }
    		});
    	}
    },
    informationtypeClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('productGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "product/list.action?idtype=type&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    informationspecClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('productGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "product/list.action?idtype=spec&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    synClick: function(o){
    	var message = confirm("现在开始同步 ？");
    	if(message == true){
            var result = "";
    		//Ext.getBody().mask("数据处理中，请稍等");
            Ext.Ajax.request({
                   url: 'product/syn.action',
                   method: 'GET',
                   timeout: 8000,
                   success: function(response,opts){
                       var result = Ext.JSON.decode(response.responseText);
                       if(result.result == "同步成功"){
                    	   alert("同步执行中，请稍候再查询");
                    	   var grid = o.up('productlist');
                    	   var store = grid.getStore();
                    	   store.reload();
                       }else{
                    	   alert(result.result);
                       }
                       Ext.getBody().unmask();
                   },
                   failure: function(response,opts){
                       var result = Ext.JSON.decode(response.responseText);
                       alert("温馨提示:同步失败");
                       Ext.getBody().unmask();
                   }
            }); 
    	}
    },
    
    deletetypeClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('producttypelist');
    	var model = grid.getSelectionModel();
    	var store = grid.getStore();
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
  		    				url: 'producttype/delete.action?producttypeid='+ record.get('id'),
  		    				method: 'GET',
  		    				timeout: 10000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("温馨提示:"+result.result);
  		    					if(result.result == "删除成功"){
  		    						store.removeAt(rowIndex);
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
    		alert("请选择物料类型");
    	}
    },
	 
	addtypeClick: function(o){
		var rec = new M.model.Producttype();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('producttypelist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updatetypeClick: function(o) {
    	var grid = o.up('producttypelist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('name') == ''){
    			isok = 0;
    			err = "名称不能为空";
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
    				url: 'producttype/add.action?producttype.zdy10='+ escape(data),
    				method: 'GET',
    				timeout: 10000,
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
    },
    
    deleteunitClick: function(o){
    	var grid = o.up('productunitlist');
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
  		    				url: 'productunit/delete.action?productunitid='+ record.get('id'),
  		    				method: 'GET',
  		    				timeout: 10000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("温馨提示:"+result.result);
  		    					if(result.result == "删除成功"){
  		    						store.removeAt(rowIndex);
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
    		alert("请选择物料类型");
    	}
    },
	 
	addunitClick: function(o){
		var rec = new M.model.Productunit();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('productunitlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateunitClick: function(o) {
    	var grid = o.up('productunitlist');
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
    		if(model.get('isbase') == ''|| model.get('isbase') == null){
    			model.set('isbase', 0);
    		}
    		if(model.get('isbase') == 0){
    			if(model.get('zdy2') == '' || model.get('zdy2') == null){    		
	    			isok = 0;
	    			err = "下级单位不能为空";
    			}else if(model.get('zdy2') == model.get('name')){    		
	    			isok = 0;
	    			err = "下级单位只能选其它单位";
    			}
    			if(model.get('total') == ''){    		
	    			isok = 0;
	    			err = "比率不能为空";
    			}else if(model.get('total') == 0){    		
	    			isok = 0;
	    			err = "比率不能为0";
    			}
    		}else{
    			model.set('total', 1);
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
    				url: 'productunit/add.action?productunit.zdy10='+ escape(data),
    				method: 'GET',
    				timeout: 10000,
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
    			Ext.Msg.alert("温馨提示:未改动，无需保存");
    		}
    	} 
    },
    
    deletespecClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('productspeclist');
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
  		    				url: 'productspec/delete.action?productspecid='+ record.get('id'),
  		    				method: 'GET',
  		    				timeout: 10000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("温馨提示:"+result.result);
  		    					if(result.result == "删除成功"){
  		    						store.removeAt(rowIndex);
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
    		alert("请选择物料规格");
    	}
    },
	 
	addspecClick: function(o){
		var rec = new M.model.Productspec();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('productspeclist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updatespecClick: function(o) {
    	var grid = o.up('productspeclist');
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
    				url: 'productspec/add.action?productspec.zdy10='+ escape(data),
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
    },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('productlist');
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
  		    				url: 'product/delete.action?productid='+ record.get('id'),
  		    				method: 'GET',
  		    				timeout: 10000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("温馨提示:"+result.result);
  		    					if(result.result == "删除成功"){
  		    						store.removeAt(rowIndex);
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
    		alert("请选择物料");
    	}
    },
	 
	addClick: function(o){
		var rec = new M.model.Product();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('productlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateClick: function(o) {
    	var grid = o.up('productlist');
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
    			isok = 0;
    			err = "规格不能为空";
    		}
    		if(model.get('zdy3') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "类型不能为空";
    		}
    		if(model.get('productno') == '' || model.get('productno') == null){
    			isok = 0;
    			err = "编码不能为空";
    		}
    		if(model.get('periodofvalidity') == '' || model.get('periodofvalidity') == null){
    			isok = 0;
    			err = "有效期不能为空";
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
    				url: 'product/add.action?product.zdy10='+ escape(data),
    				method: 'GET',
    				timeout: 10000,
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