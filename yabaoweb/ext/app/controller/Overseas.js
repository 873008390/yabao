Ext.define('M.controller.Overseas', {
    extend: 'Ext.app.Controller',

    stores: [
             'Overseas',
             'Overseareplys'
         ],
    
    models: [
             'Oversea',
             'Overseareply'
            ],
         
    views: [
            'oversea.OverseareaduserList',
            'oversea.OverseaList'
        ],
       
    init: function() {
        this.control({
            'oversealist actioncolumn[id=addcontent]': {
                click: this.addcontentClick
            },
            'oversealist actioncolumn[id=information]': {
                click: this.informationClick
            },
            'overseauserlist actioncolumn[id=informationuser]': {
                click: this.informationuserClick
            },
            'oversealist actioncolumn[id=informationphoto]': {
                click: this.informationphotoClick
            },
            'oversealist actioncolumn[id=delete]':{
                click: this.deleteClick
            },
            'oversealist button[id=add]':{
                click: this.addClick
            },
            'oversealist button[id=save]': {
                click: this.updateClick
            },
            'oversealist button[id=back]': {
                click: this.backClick
            },
            'oversealist button[id=search]': {
                click: this.searchClick
            },
            'overseauserlist button[id=searchuser]': {
                click: this.searchuserClick
            },
            'overseareaduserlist button[id=searchread]': {
                click: this.searchreadClick
            },
            'overseaunreaduserlist actioncolumn[id=informationunread]': {
                click: this.informationunreadClick
            }
        });
    },
	 
    informationunreadClick: function(o, item, rowIndex, colIndex, e){
		//alert(Ext.getCmp("keyword").getValue());
    	var grid = Ext.getCmp('overseareaduserGrid');
		var store = grid.getStore();
		store.getProxy().url = "../overseareply/list.action?idtype=search&typeid="+ getParameter("typeid") +"_"+ o.getStore().getAt(rowIndex).get('username');
		store.load();
	 },
	 
    searchreadClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('overseareaduserlist');
		var store = grid.getStore();
		store.getProxy().url = "../overseareply/list.action?idtype=search&typeid="+ getParameter("typeid") +"_"+ Ext.getCmp("keywordread").getValue();
		store.load();
	 },
	 
    searchuserClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('overseauserlist');
		var store = grid.getStore();
		store.getProxy().url = "../user/list.action?idtype=search&typeid="+ Ext.getCmp("keyworduser").getValue();
		store.load();
	 },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('oversealist');
		var store = grid.getStore();
		store.getProxy().url = "../oversea/list.action?idtype=search&typeid="+ getParameter("typeid") +"_"+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    addcontentClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
        	Ext.Msg.alert('��ܰ��ʾ',"��������");
        }else{
        	self.location = "overseaadd.html?id="+ store.getAt(rowIndex).get('id') +"&catalogid="+ store.getAt(rowIndex).get('catalogid');
        }
    },
    
    backClick: function(o, item, rowIndex, colIndex, e){
    	self.location = "../admin/cataloglist.html?idtype=allwithlimit&typeid=0";
    },
    
    informationphotoClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = "overseaphotolist.html?idtype=oversea&typeid="+ store.getAt(rowIndex).get('id');
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else{
            var downgrid = Ext.getCmp('overseareaduserGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "../overseareply/list.action?idtype=overseawithlimit&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
        }
    },
    
    informationuserClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else{
            var downgrid = Ext.getCmp('overseareaduserGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "../overseareply/list.action?idtype=search&typeid="+ store.getAt(rowIndex).get('name');
            downstore.load();
        }
    },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            store.removeAt(rowIndex);
        }else{
            Ext.Msg.show({
                 title:'��ܰ��ʾ',
                 msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('title') +' ��',
                 buttons: Ext.Msg.OKCANCEL,
                 icon: Ext.Msg.QUESTION,
                 buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
                 fn:function(btn){
                     if(btn == 'ok') {
                         Ext.getBody().mask("���ݴ����У����Ե�");
                         var result = "";
                         Ext.Ajax.request({
                                url: '../oversea/delete.action?overseaid='+ store.getAt(rowIndex).get('id'),
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
    	self.location = "overseaadd.html?id=0&catalogid="+ getParameter("typeid");
     },

    updateClick: function(o) {
        var grid = o.up('oversealist');
        cellEdit.completeEdit();
        var store = grid.getStore();
        var records = store.getNewRecords();
        var records1 = store.getUpdatedRecords();
        records = records.concat(records1);
        var data = [];
        var isok = 1;
        var err = "";
        Ext.Array.each(records, function(model){
            if(model.get('title') == '' || model.get('title') == null){
                isok = 0;
                err = "���ⲻ��Ϊ��";
            }
            if(model.get('topstatus') == '' || model.get('topstatus') == null){
            	model.set('topstatus', 0);
            }
            model.set('readnum', 0);
            model.set('catalogid',getParameter("typeid"));
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
                    url: '../oversea/add.action?oversea.zdy10='+ escape(data),
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
    
    readdeleteClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            store.removeAt(rowIndex);
        }else{
            Ext.Msg.show({
                 title:'��ܰ��ʾ',
                 msg: 'ȷ��Ҫɾ����'+ store.getAt(rowIndex).get('username') +' ��',
                 buttons: Ext.Msg.OKCANCEL,
                 icon: Ext.Msg.QUESTION,
                 buttonText:{ok:'ȷ��',cancel: 'ȡ��'},
                 fn:function(btn){
                     if(btn == 'ok') {
                         Ext.getBody().mask("���ݴ����У����Ե�");
                         var result = "";
                         Ext.Ajax.request({
                                url: '../overseareply/delete.action?overseareplyid='+ store.getAt(rowIndex).get('id'),
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
     
    readaddClick: function(o){
        var rec = new M.model.Overseareply();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('overseareaduserlist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },

    readupdateClick: function(o) {
        var grid = o.up('overseareaduserlist');
        cellEdit.completeEdit();
        var store = grid.getStore();
        var records = store.getNewRecords();
        var records1 = store.getUpdatedRecords();
        records = records.concat(records1);
        var data = [];
        var isok = 1;
        var err = "";
        var url = store.getProxy().url;
		var overseaid = getParameter("typeid");
		if(overseaid == 0){
			isok = 0;
			err = "����ѡ��";
		}else{
	        Ext.Array.each(records, function(model){
	            if(model.get('username') == '' || model.get('username') == null){
	                isok = 0;
	                err = "��������Ϊ��";
	            }
	            if(model.get('zdy2') == '' || model.get('zdy2') == null){
	                isok = 0;
	                err = "Ͷ�����ڲ���Ϊ��";
	            }
	            if(model.get('phoneno') == '' || model.get('phoneno') == null){
	                isok = 0;
	                err = "�ֻ��Ų���Ϊ��";
	            }
	            model.set('overseaid', overseaid);
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
                    url: '../overseareply/add.action?overseareply.zdy10='+ escape(data) +"&overseareply.overseaid="+ overseaid,
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
    }
});