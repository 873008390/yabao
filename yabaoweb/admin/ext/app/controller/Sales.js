Ext.define('M.controller.Sales', {
    extend: 'Ext.app.Controller',

    stores: [
             'Sales',
             'Saledetails'
         ],
    
    models: [
             'Sale',
             'Saledetail'
             
            ],
         
    views: [
            'sale.SaleList',
            'sale.SaleoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'saleoutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'saleoutlinelist actioncolumn[id=delete]':{
                click: this.deleteClick
            },
            'saleoutlinelist button[id=add]':{
              	click: this.addClick
            },
            'saleoutlinelist button[id=save]': {
                click: this.updateClick
            },
            'salelist actioncolumn[id=detaildelete]':{
                click: this.detaildeleteClick
            },
            'salelist button[id=detailadd]':{
              	click: this.detailaddClick
            },
            'salelist button[id=detailsave]': {
                click: this.detailupdateClick
            }
        });
    },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('salelist');
		var store = grid.getStore();
		store.getProxy().url = "sale/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else if(store.getAt(rowIndex).get('id') == 0){
        	
        }else{
            var downgrid = Ext.getCmp('saleGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "sale/detaillist.action?idtype=mainid&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
        }
    },
    
    addClick: function(o){
        var rec = new M.model.Sale();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('saleoutlinelist');
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
                  msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('saleno') +' ��',
                  buttons: Ext.Msg.OKCANCEL,
                  icon: Ext.Msg.QUESTION,
                  buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
                  fn:function(btn){
                      if(btn == 'ok') {
                          Ext.getBody().mask("���ݴ����У����Ե�");
                          var result = "";
                          Ext.Ajax.request({
                                 url: 'sale/delete.action?saleid='+ store.getAt(rowIndex).get('id'),
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
         var grid = o.up('saleoutlinelist');
         cellEdit.completeEdit();
         var store = grid.getStore();
         var records = store.getNewRecords();
         var records1 = store.getUpdatedRecords();
         records = records.concat(records1);
         var data = [];
         var isok = 1;
         var err = "";
         Ext.Array.each(records, function(model){
             if(model.get('saleno') == '' || model.get('saleno') == null){
                 isok = 0;
                 err = "���Ų���Ϊ��";
             }
             if(model.get('zdy4') == '' || model.get('zdy4') == null){
                 isok = 0;
                 err = "���Ͳ���Ϊ��";
             }
             if(model.get('zdy2') == '' || model.get('zdy2') == null){
                 isok = 0;
                 err = "�µ����ڲ���Ϊ��";
             }
             model.set('total', '0');
             model.set('totalquantity', 0);
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
                     url: 'sale/add.action?sale.zdy10='+ escape(data),
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
     
     detailaddClick: function(o){
         var rec = new M.model.Saledetail();
         //var grid = o.ownerCt.ownerCt;
         var grid = o.up('salelist');
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
                                  url: 'sale/detaildelete.action?saleid='+ store.getAt(rowIndex).get('id'),
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
          var grid = o.up('salelist');
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
              if(model.get('mainid') == '' || model.get('mainid') == null){
                  isok = 0;
                  err = "��ҪID����Ϊ��";
              }else  if(model.get('mainid') == 0){
            	  isok = 0;
                  err = "��ҪID����Ϊ0";
              }
              if(model.get('paystatus') == '' || model.get('paystatus') == null){
                  model.set('paystatus', 0);
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
                      url: 'sale/detailadd.action?saledetail.zdy10='+ escape(data),
                      method: 'GET',
                      timeout: 4000,
                      success: function(response,opts){
                          var result = Ext.JSON.decode(response.responseText);
                          Ext.Msg.alert("��ܰ��ʾ",result.result);
                          if(result.result == "����ɹ�"){
                              store.load();
                              var downgrid = Ext.getCmp('saleoutlineGrid');
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