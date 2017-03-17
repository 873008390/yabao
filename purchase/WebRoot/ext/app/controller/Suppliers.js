Ext.define('M.controller.Suppliers', {
    extend: 'Ext.app.Controller',

    stores: [
             'Suppliers',
             'Supplierfiles',
             'Auditlogs'
         ],
    
    models: ['Supplier','Supplierfile', 'Auditlog'],
         
    views: [
            'supplier.SupplierList',
            'supplier.SupplierfileList',
            'supplier.AuditlogList'
        ],
       
    init: function() {
    	this.control({
    		'supplierlist' : {
    			itemdblclick: this.modifyClick
    		},
    		'supplierlist button[id=delete]':{
           	 	click: this.deleteClick
            },
            'supplierlist button[id=information]':{
           	 	click: this.informationClick
            },
            'supplierlist button[id=informationlog]':{
           	 	click: this.informationlogClick
            },
            'supplierlist button[id=modify]':{
           	 	click: this.modifyClick
            },
            'supplierlist button[id=all]':{
           	 	click: this.allClick
            },
            'supplierlist button[id=syn]':{
              	click: this.synClick
            },
            'supplierlist button[id=addone]':{
              	click: this.addoneClick
            },
            'supplierlist button[id=add]':{
              	click: this.addClick
            },
            'supplierlist button[id=save]': {
                click: this.updateSupplier
            },
            'supplierlist button[id=audit]': {
                click: this.auditClick
            },
            'supplierlist button[id=auditing]': {
                click: this.auditingClick
            },
            'supplierlist button[id=audited]': {
                click: this.auditedClick
            },
            'supplierlist button[id=search]': {
                click: this.searchClick
            },
            'supplierfilelist button[id=deletefile]':{
           	 	click: this.deletefileClick
            },
            'supplierfilelist button[id=fileback]':{
           	 	click: this.filebackClick
            },
            'auditloglist button[id=logback]':{
           	 	click: this.filebackClick
            },
            'supplierlist button[id=upload]':{
           	 	click: this.uploadClick
            },
            'supplierlist button[id=exportexcel]':{
            	click:this.exportexcelClick
            }/*,
            'supplierlist button[id=exportpdf]':{
            	click:this.exportpdfClick
            }*/
            
        });
    },
    
    filebackClick: function(o){
    	history.back();
    },
    
    allClick: function(o){
    	var grid = o.up('supplierlist');
    	var store = grid.getStore();
    	store.getProxy().url = "supplier/list.action?idtype=allwithlimit&typeid=0";
		store.load();
    },
    
    addoneClick: function(o){
    	parent.location = "supplieradd.html?idtype=allwithlimit&typeid=0";
    },
    
    modifyClick: function(o){
    	var grid = o.up('supplierlist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		
	    	}else{
	    		parent.location = "suppliermodify.html?id="+ record.get('id');
	    	}
    	}else{
    		alert("��ѡ��Ӧ��");
    	}
    },
    
    uploadClick: function(o){
    	var grid = o.up('supplierlist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		
	    	}else{
	    		parent.location = "supplierfileadd.html?id="+ record.get('id');
	    	}
    	}else{
    		alert("��ѡ��Ӧ��");
    	}
    },
    
    informationClick: function(o){
    	var grid = o.up('supplierlist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		
	    	}else{
	    		parent.location = "supplierfilelist.html?idtype=supplier&typeid="+ record.get('id');
	    	}
    	}else{
    		alert("��ѡ��Ӧ��");
    	}
    },
    
    informationlogClick: function(o){
    	var grid = o.up('supplierlist');
    	var model = grid.getSelectionModel();
//    	alert(model);
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		
	    	}else{
	    		parent.location = "supplierauditloglist.html?idtype=supplier&typeid="+ record.get('id');
	    	}
    	}else{
    		alert("��ѡ��Ӧ��");
    	}
    },
    
    synClick: function(o){
    	var message = confirm("���ڿ�ʼͬ�� ��");
    	if(message == true){
    		//Ext.getBody().mask("���ݴ����У����Ե�");
            var result = "";
            Ext.Ajax.request({
                   url: 'supplier/syn.action',
                   method: 'GET',
                   timeout: 8000,
                   success: function(response,opts){
                       var result = Ext.JSON.decode(response.responseText);
                       
                       if(result.result == "ͬ���ɹ�"){
                           alert("ͬ��ִ���У����Ժ��ٲ�ѯ");
                           var grid = o.up('supplierlist');
                           var store = grid.getStore();
                           store.reload();
                       }else{
                    	   alert(result.result);
                       }
                       Ext.getBody().unmask();
                   },
                   failure: function(response,opts){
                       var result = Ext.JSON.decode(response.responseText);
                       alert("��ܰ��ʾ:ͬ��ʧ��");
                       Ext.getBody().unmask();
                   }
            });
    	}
    },
    
    deletefileClick: function(o){
    	var grid = o.up('supplierfilelist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
    		var store = grid.getStore();
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		store.reload();
	    	}else{
	    		var message = confirm("ȷ��Ҫɾ����"+ record.get('zdy10') +"��");
	    		if(message == true){
	    			Ext.getBody().mask("���ݴ����У����Ե�");
  		             var result = "";
  		             Ext.Ajax.request({
  		    				url: 'supplier/deletefile.action?supplierfileid='+ record.get('id'),
  		    				method: 'GET',
  		    				timeout: 4000,
  		    				success: function(response,opts){
  		    					var result = Ext.JSON.decode(response.responseText);
  		    					alert("��ܰ��ʾ:"+result.result);
  		    					if(result.result == "ɾ���ɹ�"){
  		    						store.reload();
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
    		alert("��ѡ���ļ�");
    	}
    },
	 
    auditingClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('supplierlist');
		var store = grid.getStore();
		store.getProxy().url = "supplier/list.action?idtype=allauditingwithlimit&typeid=0";
		store.load();
	 },
	 
    auditedClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('supplierlist');
		var store = grid.getStore();
		store.getProxy().url = "supplier/list.action?idtype=allauditedwithlimit&typeid=0";
		store.load();
	 },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('supplierlist');
		var store = grid.getStore();
		store.getProxy().url = "supplier/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
	 
	auditClick: function(o){
		var grid = o.up('supplierlist');
		var store = grid.getStore();
		var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	if(records != null && records != ''){
    		var message = confirm("��δ�������ݣ�ȷ���뿪��ҳ�棿");
    		if(message == true){
    			parent.location = 'auditlist.html?idtype='+ getParameter("idtype") +"&typeid="+ getParameter("typeid");
    		}
    	}else{
    		parent.location = 'auditlist.html?idtype='+ getParameter("idtype") +"&typeid="+ getParameter("typeid");
    	}
	 },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	var grid = o.up('supplierlist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
    		var store = grid.getStore();
	    	var record = model.getLastSelected();
	    	var rowIndex = store.indexOf(record);
	    	if(record.get('id') == null || record.get('id') == ''){
	    		store.removeAt(rowIndex);
	    	}else{
	    		var message = confirm("ȷ��Ҫɾ����" + record.get('name') + "��");
	    		if(message == true){
	    			Ext.Ajax.request({
		    				url: 'supplier/delete.action?supplierid='+ record.get('id'),
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
    		alert("��ѡ��Ӧ��");
    	}
    },
	 
	addClick: function(o){
		parent.location = "supplieradd.html?idtype=allwithlimit&typeid=0";
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
    			err = "��������Ϊ��";
    		}
//    		if(model.get('zdy6') == '' || model.get('zdy6') == null){
//    			isok = 0;
//    			err = "ʡ�ݲ���Ϊ��";
//    		}
//    		if(model.get('zdy7') == '' || model.get('zdy7') == null){
//    			isok = 0;
//    			err = "���в���Ϊ��";
//    		}
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
    				url: 'supplier/add.action?supplier.zdy10='+ escape(data),
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
    exportexcelClick: function(o){
    	var message = confirm("�Ƿ�ʼ������");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'supplier/exportSupplierExcel.action?idtype=exportwithlimit&typeid=' + getParameter("typeid"),
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
    }/*,
    exportpdfClick: function(o){
    	var message = confirm("�Ƿ�ʼ������");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'supplier/exportSupplierPdf.action?idtype=exportwithlimit&typeid='+ getParameter("typeid"),
                method: 'GET',
                timeout: 40000,
                success: function(response,opts){
                	Ext.getBody().unmask();
                	var obj = Ext.JSON.decode(response.responseText);
                	console.log(obj.result);
                	window.location.href = obj.result;
                },
                failure: function(response,opts){
                	Ext.getBody().unmask();
                    alert("����ʧ��!");
                }
            }); 
    	}
    }*/
});