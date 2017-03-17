Ext.define('M.controller.Outstocks', {
    extend: 'Ext.app.Controller',

    stores: [
             'Outstocks',
             'Outstockdetails'
         ],
    
    models: [
             'Outstock',
             'Outstockdetail'
             
            ],
         
    views: [
            'outstock.OutstockList',
            'outstock.OutstockoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'outstockoutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'outstockoutlinelist actioncolumn[id=delete]':{
                click: this.deleteClick
            },
            'outstockoutlinelist button[id=add]':{
              	click: this.addClick
            },
            'outstockoutlinelist button[id=save]': {
                click: this.updateClick
            },
            'outstocklist actioncolumn[id=detaildelete]':{
                click: this.detaildeleteClick
            },
            'outstocklist button[id=detailadd]':{
              	click: this.detailaddClick
            },
            'outstocklist button[id=detailsave]': {
                click: this.detailupdateClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else if(store.getAt(rowIndex).get('id') == 0){
        	
        }else{
            var downgrid = Ext.getCmp('outstockGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "outstock/detaillist.action?idtype=mainid&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
        }
    },
    
    addClick: function(o){
        var rec = new M.model.Outstock();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('outstockoutlinelist');
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
                  msg: '确定要删除：'+ store.getAt(rowIndex).get('outstockno') +' ？',
                  buttons: Ext.Msg.OKCANCEL,
                  icon: Ext.Msg.QUESTION,
                  buttonText:{ok:'确定',cancel: '取消'},
                  fn:function(btn){
                      if(btn == 'ok') {
                          Ext.getBody().mask("数据处理中，请稍等");
                          var result = "";
                          Ext.Ajax.request({
                                 url: 'outstock/delete.action?outstockid='+ store.getAt(rowIndex).get('id'),
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
         var grid = o.up('outstockoutlinelist');
         cellEdit.completeEdit();
         var store = grid.getStore();
         var records = store.getNewRecords();
         var records1 = store.getUpdatedRecords();
         records = records.concat(records1);
         var data = [];
         var isok = 1;
         var err = "";
         Ext.Array.each(records, function(model){
             if(model.get('outstockno') == '' || model.get('outstockno') == null){
                 isok = 0;
                 err = "出库单号不能为空";
             }
             if(model.get('zdy4') == '' || model.get('zdy4') == null){
                 isok = 0;
                 err = "出库类型不能为空";
             }
             if(model.get('zdy2') == '' || model.get('zdy2') == null){
                 isok = 0;
                 err = "出库日期不能为空";
             }
             if(model.get('zdy5') == '' || model.get('zdy5') == null){
                 isok = 0;
                 err = "客户不能为空";
             }
             model.set('total', '0');
             model.set('totalquantity', 0);
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
                     url: 'outstock/add.action?outstock.zdy10='+ escape(data),
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
     
     detailaddClick: function(o){
         var rec = new M.model.Outstockdetail();
         //var grid = o.ownerCt.ownerCt;
         var grid = o.up('outstocklist');
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
                                  url: 'outstock/detaildelete.action?outstockid='+ store.getAt(rowIndex).get('id'),
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
          var grid = o.up('outstocklist');
          cellEdit.completeEdit();
          var store = grid.getStore();
          var records = store.getNewRecords();
          var records1 = store.getUpdatedRecords();
          records = records.concat(records1);
          var data = [];
          var isok = 1;
          var err = "";
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
              if(model.get('mainid') == '' || model.get('mainid') == null){
                  isok = 0;
                  err = "概要ID不能为空";
              }else  if(model.get('mainid') == 0){
            	  isok = 0;
                  err = "概要ID不能为0";
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
                      url: 'outstock/detailadd.action?outstockdetail.zdy10='+ escape(data),
                      method: 'GET',
                      timeout: 4000,
                      success: function(response,opts){
                          var result = Ext.JSON.decode(response.responseText);
                          Ext.Msg.alert("温馨提示",result.result);
                          if(result.result == "保存成功"){
                              store.load();
                              var downgrid = Ext.getCmp('outstockoutlineGrid');
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