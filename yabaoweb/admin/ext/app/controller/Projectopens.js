Ext.define('M.controller.Projectopens', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users',
             'User-projectopenreaders',
             'Projectopens',
             'Projectopenreplys',
             'Projectopenreply-unreads'
         ],
    
    models: [
             'User',
             'Projectopen',
             'Projectopenreply'
            ],
         
    views: [
            'projectopen.ProjectopenuserList',
            'projectopen.ProjectopenreaduserList',
            'projectopen.ProjectopenunreaduserList',
            'projectopen.ProjectopenList'
        ],
       
    init: function() {
        this.control({
            'projectopenlist actioncolumn[id=addcontent]': {
                click: this.addcontentClick
            },
            'projectopenlist actioncolumn[id=information]': {
                click: this.informationClick
            },
            'projectopenuserlist actioncolumn[id=informationuser]': {
                click: this.informationuserClick
            },
            'projectopenlist actioncolumn[id=informationphoto]': {
                click: this.informationphotoClick
            },
            'projectopenlist actioncolumn[id=delete]':{
                click: this.deleteClick
            },
            'projectopenlist button[id=add]':{
                click: this.addClick
            },
            'projectopenlist button[id=save]': {
                click: this.updateClick
            },
            'projectopenlist button[id=back]': {
                click: this.backClick
            },
            'projectopenlist button[id=search]': {
                click: this.searchClick
            },
            'projectopenuserlist button[id=searchuser]': {
                click: this.searchuserClick
            },
            'projectopenreaduserlist button[id=searchread]': {
                click: this.searchreadClick
            },
            'projectopenunreaduserlist actioncolumn[id=informationunread]': {
                click: this.informationunreadClick
            }
        });
    },
	 
    informationunreadClick: function(o, item, rowIndex, colIndex, e){
		//alert(Ext.getCmp("keyword").getValue());
    	var grid = Ext.getCmp('projectopenreaduserGrid');
		var store = grid.getStore();
		store.getProxy().url = "../projectopenreply/list.action?idtype=search&typeid="+ getParameter("typeid") +"_"+ o.getStore().getAt(rowIndex).get('username');
		store.load();
	 },
	 
    searchreadClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('projectopenreaduserlist');
		var store = grid.getStore();
		store.getProxy().url = "../projectopenreply/list.action?idtype=search&typeid="+ getParameter("typeid") +"_"+ Ext.getCmp("keywordread").getValue();
		store.load();
	 },
	 
    searchuserClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('projectopenuserlist');
		var store = grid.getStore();
		store.getProxy().url = "../user/list.action?idtype=search&typeid="+ Ext.getCmp("keyworduser").getValue();
		store.load();
	 },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('projectopenlist');
		var store = grid.getStore();
		store.getProxy().url = "../projectopen/list.action?idtype=search&typeid="+ getParameter("typeid") +"_"+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    addcontentClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
        	Ext.Msg.alert('��ܰ��ʾ',"���ȱ���");
        }else{
        	self.location = "projectopenadd.html?id="+ store.getAt(rowIndex).get('id');
        }
    },
    
    backClick: function(o, item, rowIndex, colIndex, e){
    	self.location = "../admin/cataloglist.html?idtype=allwithlimit&typeid=0";
    },
    
    informationphotoClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = "projectopenphotolist.html?idtype=projectopen&typeid="+ store.getAt(rowIndex).get('id');
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else{
            var downgrid = Ext.getCmp('projectopenreaduserGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "../projectopenreply/list.action?idtype=projectopenwithlimit&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
            downgrid = Ext.getCmp('projectopenunreaduserGrid');
            downstore = downgrid.getStore();
            downstore.getProxy().url = "../projectopenreply/list.action?idtype=unread&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
        }
    },
    
    informationuserClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else{
            var downgrid = Ext.getCmp('projectopenreaduserGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "../projectopenreply/list.action?idtype=search&typeid="+ store.getAt(rowIndex).get('name');
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
                                url: '../projectopen/delete.action?projectopenid='+ store.getAt(rowIndex).get('id'),
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
        var rec = new M.model.Projectopen();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('projectopenlist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },

    updateClick: function(o) {
        var grid = o.up('projectopenlist');
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
                    url: '../projectopen/add.action?projectopen.zdy10='+ escape(data),
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
                                url: '../projectopenreply/delete.action?projectopenreplyid='+ store.getAt(rowIndex).get('id'),
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
        var rec = new M.model.Projectopenreply();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('projectopenreaduserlist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },

    readupdateClick: function(o) {
        var grid = o.up('projectopenreaduserlist');
        cellEdit.completeEdit();
        var store = grid.getStore();
        var records = store.getNewRecords();
        var records1 = store.getUpdatedRecords();
        records = records.concat(records1);
        var data = [];
        var isok = 1;
        var err = "";
        var url = store.getProxy().url;
		var projectopenid = getParameter("typeid");
		if(projectopenid == 0){
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
	            model.set('projectopenid', projectopenid);
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
                    url: '../projectopenreply/add.action?projectopenreply.zdy10='+ escape(data) +"&projectopenreply.projectopenid="+ projectopenid,
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