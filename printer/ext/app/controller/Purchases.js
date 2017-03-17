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
                  title:'��ܰ��ʾ',
                  msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('purchaseno') +' ��',
                  buttons: Ext.Msg.OKCANCEL,
                  icon: Ext.Msg.QUESTION,
                  buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
                  fn:function(btn){
                      if(btn == 'ok') {
                          Ext.getBody().mask("���ݴ����У����Ե�");
                          var result = "";
                          Ext.Ajax.request({
                                 url: 'purchase/delete.action?purchaseid='+ store.getAt(rowIndex).get('id'),
                                 method: 'GET',
                                 timeout: 4000,
                                 success: function(response,opts){
                                     var result = Ext.JSON.decode(response.responseText);
                                     Ext.Msg.alert("��ܰ��ʾ",result.result);
                                     if(result.result == "ɾ���ɹ�"){
                                         store.removeAt(rowIndex);
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
                 err = "��Ӧ�̲���Ϊ��";
             }
             if(model.get('zdy2') == '' || model.get('zdy2') == null){
                 isok = 0;
                 err = "���ڲ���Ϊ��";
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
                     url: 'purchase/add.action?purchase.zdy10='+ escape(data),
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
                            url: 'purchase/syn.action',
                            method: 'GET',
                            timeout: 4000,
                            success: function(response,opts){
                                var result = Ext.JSON.decode(response.responseText);
                                Ext.Msg.alert("��ܰ��ʾ",result.result);
                                if(result.result == "ͬ���ɹ�"){
                                	var grid = o.up('purchaseoutlinelist');
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
                   title:'��ܰ��ʾ',
                   msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('zdy2') +' ��',
                   buttons: Ext.Msg.OKCANCEL,
                   icon: Ext.Msg.QUESTION,
                   buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
                   fn:function(btn){
                       if(btn == 'ok') {
                           Ext.getBody().mask("���ݴ����У����Ե�");
                           var result = "";
                           Ext.Ajax.request({
                                  url: 'purchase/detaildelete.action?purchasedetailid='+ store.getAt(rowIndex).get('id'),
                                  method: 'GET',
                                  timeout: 4000,
                                  success: function(response,opts){
                                      var result = Ext.JSON.decode(response.responseText);
                                      Ext.Msg.alert("��ܰ��ʾ",result.result);
                                      if(result.result == "ɾ���ɹ�"){
                                          store.removeAt(rowIndex);
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
        	  err = "��ѡ��ɹ���";
          }else{
	          Ext.Array.each(records, function(model){
	              if(model.get('zdy3') == '' || model.get('zdy3') == null){
	                  isok = 0;
	                  err = "�����Ϊ��";
	              }
	              if(model.get('zdy4') == '' || model.get('zdy4') == null){
	                  isok = 0;
	                  err = "��λ����Ϊ��";
	              }
	              if(model.get('zdy2') == '' || model.get('zdy2') == null){
	                  isok = 0;
	                  err = "��Ʒ����Ϊ��";
	              }
	              if(model.get('quantity') == '' || model.get('quantity') == null){
	                  isok = 0;
	                  err = "��������Ϊ��";
	              }
	              if(model.get('price') == '' || model.get('price') == null){
	                  isok = 0;
	                  err = "�۸���Ϊ��";
	              }
	              model.set('mainid', mainid);
	              model.set('money', model.get('quantity')*model.get('price'));
	              data.push(Ext.JSON.encode(model.data));
	          });
          }
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
                      url: 'purchase/detailadd.action?purchasedetail.zdy10='+ escape(data),
                      method: 'GET',
                      timeout: 4000,
                      success: function(response,opts){
                          var result = Ext.JSON.decode(response.responseText);
                          Ext.Msg.alert("��ܰ��ʾ",result.result);
                          if(result.result == "����ɹ�"){
                              store.load();
                              var downgrid = Ext.getCmp('purchaseoutlineGrid');
                              var downstore = downgrid.getStore();
                              downstore.load();
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