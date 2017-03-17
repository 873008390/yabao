Ext.define('M.controller.Purchases', {
    extend: 'Ext.app.Controller',

    stores: [
             'Purchases',
             'Purchasedetails'
         ],
    
    models: [
             'Purchase',
             'Purchasedetail'
             
            ],
         
    views: [
            'purchase.PurchaseadddetailList',
            'purchase.PurchaseList',
            'purchase.PurchaseoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'purchaseoutlinelist' : {
    			itemdblclick: this.informationClick
    		},
    		'purchaseoutlinelist button[id=information]':{
           	 	click: this.informationClick
            },
            'purchaseoutlinelist button[id=delete]':{
                click: this.deleteClick
            },
            'purchaseoutlinelist button[id=add]':{
              	click: this.addClick
            },
            'purchaseoutlinelist button[id=save]': {
                click: this.updateClick
            },
            'purchaseoutlinelist button[id=syn]': {
                click: this.synClick
            },
            'purchaseadddetaillist button[id=detaildelete]':{
                click: this.detaildeleteClick
            },
            'purchaseadddetaillist button[id=detailadd]':{
              	click: this.detailaddClick
            },
            'purchaselist button[id=detailsave]': {
                click: this.detailupdateClick
            },
            'purchaseoutlinelist button[id=exportexcel]':{
            	click:this.exportExcelClick
            }/*,
            'purchaseoutlinelist button[id=exportpdf]':{
            	click:this.exportPdfClick
            }*/
        });
    },
    exportExcelClick: function(o){
    	var message = confirm("是否开始导出？");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'purchase/exportPurchaseExcel.action?idtype=exportwithlimit&typeid=' + 

getParameter("typeid"),
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
   /* exportPdfClick: function(o){
    	var message = confirm("是否开始导出？");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'purchase/exportPurchasePdf.action?idtype=exportwithlimit&typeid=' + getParameter

("typeid"),
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
    },*/
    modifyClick: function(o){
    	var grid = o.up('purchaseoutlinelist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		
	    	}else{
	    		parent.location = "purchasemodify.html?id="+ record.get('id');
	    	}
    	}else{
    		alert("请选择采购单");
    	}
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('purchaseoutlinelist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		
	    	}else{
	    		parent.location = "purchasemodify.html?id="+ record.get('id');
	    	}
    	}else{
    		alert("请选择采购单");
    	}
    },
    
    addClick: function(o){
    	parent.location = "purchaseadd.html?idtype=allwithlimit&typeid=0";
     },
     
     deleteClick: function(o){
    	var grid = o.up('purchaseoutlinelist');
     	var model = grid.getSelectionModel();
     	if(model.hasSelection()){
	    	var record = model.getLastSelected();
     		var store = grid.getStore();
	    	var rowIndex = store.indexOf(record);
 	    	if(record.get('id') == null || record.get('id') == ''){
 	    		store.removeAt(rowIndex);
 	    	}else{
 	    		var message = confirm("确定要删除："+ record.get('purchaseno') +" ？");
 	    		if(message == true){
 	    			 Ext.getBody().mask("数据处理中，请稍等");
                     var result = "";
                     Ext.Ajax.request({
                            url: 'purchase/delete.action?purchaseid='+ record.get('id'),
                            method: 'GET',
                            timeout: 4000,
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
     		alert("请选择采购单");
     	}
     },

     updateClick: function(o) {
         var grid = o.up('purchaseoutlinelist');
         cellEdit.completeEdit();
         var store = grid.getStore();
         var records = store.getNewRecords();
         var records1 = store.getUpdatedRecords();
         records = records.concat(records1);
         var data = [];
         var isok = 1;
         var err = "";
         Ext.Array.each(records, function(model){
             if(model.get('zdy4') == '' || model.get('zdy4') == null){
                 isok = 0;
                 err = "供应商不能为空";
             }
             if(model.get('zdy2') == '' || model.get('zdy2') == null){
                 isok = 0;
                 err = "日期不能为空";
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
                     url: 'purchase/add.action?purchase.zdy10='+ escape(data),
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
     
     synClick: function(o){
    	 var message = confirm("现在开始同步 ？");
    	 if(message == true){
             var result = "";
     		 //Ext.getBody().mask("数据处理中，请稍等");
             Ext.Ajax.request({
                    url: 'purchase/syn.action',
                    method: 'GET',
                    timeout: 8000,
                    success: function(response,opts){
                        var result = Ext.JSON.decode(response.responseText);
                        if(result.result == "同步成功"){
                            alert("同步执行中，请稍候再查询");
                        	var grid = o.up('purchaseoutlinelist');
                        	var store = grid.getStore();
                        	store.reload();
                        }else{
                        	alert(result.result);
                        }
                        Ext.getBody().unmask();
                    },
                    failure: function(response,opts){
                        var result = Ext.JSON.decode(response.responseText);
                        Ext.getBody().unmask();
                    }
             });
    	 }
    	
     },
     
     detailaddClick: function(o){
         var rec = new M.model.Purchasedetail();
         //var grid = o.ownerCt.ownerCt;
         var grid = o.up('purchaseadddetaillist');
         var edit = grid.getPlugin('celledit');
         edit.cancelEdit();
         grid.getStore().insert(0, rec);
         edit.startEditByPosition({
             row:0,
             column:1
         });
      },
      
      detaildeleteClick: function(o){
    	var grid = o.up('purchaseadddetaillist');
      	var model = grid.getSelectionModel();
      	if(model.hasSelection()){
      		var store = grid.getStore();
  	    	var record = model.getLastSelected();
	    	var rowIndex = store.indexOf(record);
  	    	if(record.get('id') == null || record.get('id') == ''){
  	    		store.reload();
  	    	}else{
  	    		var message = confirm("确定要删除："+ record.get('zdy2') +" ？");
  	    		if(message == true){
  	    			Ext.getBody().mask("数据处理中，请稍等");
                    var result = "";
                    Ext.Ajax.request({
                           url: 'purchase/detaildelete.action?purchasedetailid='+ record.get('id'),
                           method: 'GET',
                           timeout: 4000,
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
      		alert("请选择记录");
      	}
      },

      detailupdateClick: function(o) {
          var grid = o.up('purchaselist');
          cellEdit.completeEdit();
          var store = grid.getStore();
          var records = store.getNewRecords();
          var records1 = store.getUpdatedRecords();
          records = records.concat(records1);
          var data = [];
          var isok = 1;
          var err = "";

          var mainid = store.getProxy().url.split("typeid=")[1];
          if(mainid == null || mainid == '' || mainid == 0){
        	  isok = 0;
        	  err = "请选择采购单";
          }else{
	          Ext.Array.each(records, function(model){
	              if(model.get('zdy3') == '' || model.get('zdy3') == null){
	                  isok = 0;
	                  err = "规格不能为空";
	              }
	              if(model.get('zdy4') == '' || model.get('zdy4') == null){
	                  isok = 0;
	                  err = "单位不能为空";
	              }
	              if(model.get('zdy2') == '' || model.get('zdy2') == null){
	                  isok = 0;
	                  err = "产品不能为空";
	              }
	              if(model.get('quantity') == '' || model.get('quantity') == null){
	                  isok = 0;
	                  err = "数量不能为空";
	              }
	              if(model.get('price') == '' || model.get('price') == null){
	                  isok = 0;
	                  err = "价格不能为空";
	              }
	              model.set('mainid', mainid);
	              model.set('money', model.get('quantity')*model.get('price'));
	              data.push(Ext.JSON.encode(model.data));
	          });
          }
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
                      url: 'purchase/detailadd.action?purchasedetail.zdy10='+ escape(data),
                      method: 'GET',
                      timeout: 4000,
                      success: function(response,opts){
                          var result = Ext.JSON.decode(response.responseText);
                          alert("温馨提示:"+result.result);
                          if(result.result == "保存成功"){
                              store.load();
                              var downgrid = Ext.getCmp('purchaseoutlineGrid');
                              var downstore = downgrid.getStore();
                              downstore.load();
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