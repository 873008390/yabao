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
    	var message = confirm("�Ƿ�ʼ������");
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
                	alert("����ʧ�ܣ�");
                }
    		});
    	}
    },
   /* exportPdfClick: function(o){
    	var message = confirm("�Ƿ�ʼ������");
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
                	alert("����ʧ�ܣ�");
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
    		alert("��ѡ��ɹ���");
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
    		alert("��ѡ��ɹ���");
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
 	    		var message = confirm("ȷ��Ҫɾ����"+ record.get('purchaseno') +" ��");
 	    		if(message == true){
 	    			 Ext.getBody().mask("���ݴ����У����Ե�");
                     var result = "";
                     Ext.Ajax.request({
                            url: 'purchase/delete.action?purchaseid='+ record.get('id'),
                            method: 'GET',
                            timeout: 4000,
                            success: function(response,opts){
                                var result = Ext.JSON.decode(response.responseText);
                                alert("��ܰ��ʾ:"+result.result);
                                if(result.result == "ɾ���ɹ�"){
                                    store.removeAt(rowIndex);
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
     		alert("��ѡ��ɹ���");
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
                     url: 'purchase/add.action?purchase.zdy10='+ escape(data),
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
     
     synClick: function(o){
    	 var message = confirm("���ڿ�ʼͬ�� ��");
    	 if(message == true){
             var result = "";
     		 //Ext.getBody().mask("���ݴ����У����Ե�");
             Ext.Ajax.request({
                    url: 'purchase/syn.action',
                    method: 'GET',
                    timeout: 8000,
                    success: function(response,opts){
                        var result = Ext.JSON.decode(response.responseText);
                        if(result.result == "ͬ���ɹ�"){
                            alert("ͬ��ִ���У����Ժ��ٲ�ѯ");
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
  	    		var message = confirm("ȷ��Ҫɾ����"+ record.get('zdy2') +" ��");
  	    		if(message == true){
  	    			Ext.getBody().mask("���ݴ����У����Ե�");
                    var result = "";
                    Ext.Ajax.request({
                           url: 'purchase/detaildelete.action?purchasedetailid='+ record.get('id'),
                           method: 'GET',
                           timeout: 4000,
                           success: function(response,opts){
                               var result = Ext.JSON.decode(response.responseText);
                               alert("��ܰ��ʾ:"+result.result);
                               if(result.result == "ɾ���ɹ�"){
                                   store.removeAt(rowIndex);
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
      		alert("��ѡ���¼");
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
                      url: 'purchase/detailadd.action?purchasedetail.zdy10='+ escape(data),
                      method: 'GET',
                      timeout: 4000,
                      success: function(response,opts){
                          var result = Ext.JSON.decode(response.responseText);
                          alert("��ܰ��ʾ:"+result.result);
                          if(result.result == "����ɹ�"){
                              store.load();
                              var downgrid = Ext.getCmp('purchaseoutlineGrid');
                              var downstore = downgrid.getStore();
                              downstore.load();
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