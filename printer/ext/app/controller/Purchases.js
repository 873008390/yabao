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
            'purchase.PurchaseList',
            'purchase.PurchaseoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'purchaseoutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'purchaseoutlinelist actioncolumn[id=delete]':{
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
            'purchaselist actioncolumn[id=detaildelete]':{
                click: this.detaildeleteClick
            },
            'purchaselist button[id=detailadd]':{
              	click: this.detailaddClick
            },
            'purchaselist button[id=detailsave]': {
                click: this.detailupdateClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else if(store.getAt(rowIndex).get('id') == 0){
        	
        }else{
            var downgrid = Ext.getCmp('purchaseGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "purchase/detaillist.action?idtype=mainid&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
        }
    },
    
    addClick: function(o){
        var rec = new M.model.Purchase();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('purchaseoutlinelist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },
     
     deleteClick: function(o, item, rowIndex, colIndex, e){
         store = o.getStore();
         if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
             store.removeAt(rowIndex);
         }else{
             Ext.Msg.show({
                  title:'温馨提示',
                  msg: '确定要删除：'+ store.getAt(rowIndex).get('purchaseno') +' ？',
                  buttons: Ext.Msg.OKCANCEL,
                  icon: Ext.Msg.QUESTION,
                  buttonText:{ok:'确定',cancel: '取消'},
                  fn:function(btn){
                      if(btn == 'ok') {
                          Ext.getBody().mask("数据处理中，请稍等");
                          var result = "";
                          Ext.Ajax.request({
                                 url: 'purchase/delete.action?purchaseid='+ store.getAt(rowIndex).get('id'),
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
                     url: 'purchase/add.action?purchase.zdy10='+ escape(data),
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
     
     synClick: function(o){
    	 Ext.Msg.show({
             title:'温馨提示',
             msg: '现在开始同步 ？',
             buttons: Ext.Msg.OKCANCEL,
             icon: Ext.Msg.QUESTION,
             buttonText:{ok:'确定',cancel: '取消'},
             fn:function(btn){
                 if(btn == 'ok') {
                     Ext.getBody().mask("数据处理中，请稍等");
                     var result = "";
                     Ext.Ajax.request({
                            url: 'purchase/syn.action',
                            method: 'GET',
                            timeout: 4000,
                            success: function(response,opts){
                                var result = Ext.JSON.decode(response.responseText);
                                Ext.Msg.alert("温馨提示",result.result);
                                if(result.result == "同步成功"){
                                	var grid = o.up('purchaseoutlinelist');
                                	var store = grid.getStore();
                                	store.reload();
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
     },
     
     detailaddClick: function(o){
         var rec = new M.model.Purchasedetail();
         //var grid = o.ownerCt.ownerCt;
         var grid = o.up('purchaselist');
         var edit = grid.getPlugin('celledit');
         edit.cancelEdit();
         grid.getStore().insert(0, rec);
         edit.startEditByPosition({
             row:0,
             column:1
         });
      },
      
      detaildeleteClick: function(o, item, rowIndex, colIndex, e){
          store = o.getStore();
          if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
              store.removeAt(rowIndex);
          }else{
              Ext.Msg.show({
                   title:'温馨提示',
                   msg: '确定要删除：'+ store.getAt(rowIndex).get('zdy2') +' ？',
                   buttons: Ext.Msg.OKCANCEL,
                   icon: Ext.Msg.QUESTION,
                   buttonText:{ok:'确定',cancel: '取消'},
                   fn:function(btn){
                       if(btn == 'ok') {
                           Ext.getBody().mask("数据处理中，请稍等");
                           var result = "";
                           Ext.Ajax.request({
                                  url: 'purchase/detaildelete.action?purchasedetailid='+ store.getAt(rowIndex).get('id'),
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
                      url: 'purchase/detailadd.action?purchasedetail.zdy10='+ escape(data),
                      method: 'GET',
                      timeout: 4000,
                      success: function(response,opts){
                          var result = Ext.JSON.decode(response.responseText);
                          Ext.Msg.alert("温馨提示",result.result);
                          if(result.result == "保存成功"){
                              store.load();
                              var downgrid = Ext.getCmp('purchaseoutlineGrid');
                              var downstore = downgrid.getStore();
                              downstore.load();
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