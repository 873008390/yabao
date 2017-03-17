Ext.define('M.controller.Catalogs', {
    extend: 'Ext.app.Controller',

    stores: [
             'Catalogs',
             'Catalog-seconds',
             'Catalog-thirds'
         ],
    
    models: [
             'Catalog'
            ],
         
    views: [
            'catalog.CatalogList',
            'catalog.CatalogdownList',
            'catalog.CatalogthirdList'
        ],
       
    init: function() {
    	this.control({
    		'cataloglist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'catalogdownlist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'cataloglist button[id=save]': {
                click: this.updateClick
            },
            'catalogdownlist button[id=addsecond]': {
                click: this.addClick
            },
            'catalogdownlist button[id=savesecond]': {
                click: this.updatesecondClick
            },
            'catalogdownlist actioncolumn[id=information]': {
                click: this.informationdownClick
            },
            'catalogthirdlist button[id=addthird]': {
                click: this.addthirdClick
            },
            'catalogthirdlist button[id=savethird]': {
                click: this.updatethirdClick
            },
            'catalogthirdlist actioncolumn[id=information]': {
                click: this.informationthirdClick
            },
            'catalogthirdlist actioncolumn[id=delete]': {
                click: this.deletethirdClick
            }
        });
    },
    
    deletethirdClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            store.removeAt(rowIndex);
        }else{
            Ext.Msg.show({
                 title:'��ܰ��ʾ',
                 msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('name') +' ��',
                 buttons: Ext.Msg.OKCANCEL,
                 icon: Ext.Msg.QUESTION,
                 buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
                 fn:function(btn){
                     if(btn == 'ok') {
                         Ext.getBody().mask("���ݴ����У����Ե�");
                         var result = "";
                         Ext.Ajax.request({
                                url: '../admin/catalogdelete.action?catalogid='+ store.getAt(rowIndex).get('id'),
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
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            store.removeAt(rowIndex);
        }else{
            Ext.Msg.show({
                 title:'��ܰ��ʾ',
                 msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('name') +' ��',
                 buttons: Ext.Msg.OKCANCEL,
                 icon: Ext.Msg.QUESTION,
                 buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
                 fn:function(btn){
                     if(btn == 'ok') {
                         Ext.getBody().mask("���ݴ����У����Ե�");
                         var result = "";
                         Ext.Ajax.request({
                                url: '../admin/catalogdelete.action?catalogid='+ store.getAt(rowIndex).get('id'),
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
     
    addClick: function(o){
        var rec = new M.model.Catalog();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('catalogdownlist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },
     
     addthirdClick: function(o){
         var rec = new M.model.Catalog();
         //var grid = o.ownerCt.ownerCt;
         var grid = o.up('catalogthirdlist');
         var edit = grid.getPlugin('celledit');
         edit.cancelEdit();
         grid.getStore().insert(0, rec);
         edit.startEditByPosition({
             row:0,
             column:1
         });
      },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('catalogdownGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "../admin/catalog.action?type=allsecond_"+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    informationdownClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('catalogthirdGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "../admin/catalog.action?type=allsecond_"+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    informationthirdClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else if(store.getAt(rowIndex).get('shortname') == 'projectreply'){
    		alert("ǰ̨��Ŀ������ǰ̨���");
    	}else{
    		self.location = store.getAt(rowIndex).get('shortname')+"list.html?idtype=allwithlimit&typeid="+ store.getAt(rowIndex).get('id');
    	}
    },
    
    updateClick: function(o) {
    	var grid = o.up('cataloglist');
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
    			err = "���Ʋ���Ϊ��";
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
    				url: '../admin/addcatalog.action?catalog.url='+ escape(data),
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
    			store.load();
    		}
    	} 
    },
    
    updatesecondClick: function(o) {
    	var grid = o.up('catalogdownlist');
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
    			err = "���Ʋ���Ϊ��";
    		}
    		if(model.get('icon') == '' || model.get('icon') == null){
    			isok = 0;
    			err = "�ϼ���Ŀ����Ϊ��";
    		} 	
    		if(model.get('orderid') == '' || model.get('orderid') == null){
    			model.set('orderid', 1);
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
    				url: '../admin/addcatalog.action?catalog.url='+ escape(data),
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
    			store.load();
    		}
    	} 
    },
    
    updatethirdClick: function(o) {
    	var grid = o.up('catalogthirdlist');
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
    			err = "���Ʋ���Ϊ��";
    		}
    		if(model.get('icon') == '' || model.get('icon') == null){
    			isok = 0;
    			err = "�ϼ���Ŀ����Ϊ��";
    		} 	
    		if(model.get('orderid') == '' || model.get('orderid') == null){
    			model.set('orderid', 1);
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
    				url: '../admin/addcatalog.action?catalog.url='+ escape(data),
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
    			store.load();
    		}
    	} 
    }
});