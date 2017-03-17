Ext.define('M.controller.Purchasedetails', {
    extend: 'Ext.app.Controller',

    stores: [
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
            'purchaseadddetaillist button[id=detaildelete]':{
                click: this.detaildeleteClick
            },
            'purchaseadddetaillist button[id=detailadd]':{
              	click: this.detailaddClick
            },
            'purchaselist button[id=detailsave]': {
                click: this.detailupdateClick
            },
        });
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