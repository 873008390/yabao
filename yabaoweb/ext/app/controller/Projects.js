Ext.define('M.controller.Projects', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users',
             'User-projectreaders',
             'Projects',
             'Projectreplys',
             'Projectreply-unreads'
         ],
    
    models: [
             'User',
             'Project',
             'Projectreply'
            ],
         
    views: [
            'project.ProjectuserList',
            'project.ProjectreaduserList',
            'project.ProjectunreaduserList',
            'project.ProjectList'
        ],
       
    init: function() {
        this.control({
            'projectlist actioncolumn[id=addcontent]': {
                click: this.addcontentClick
            },
            'projectlist actioncolumn[id=information]': {
                click: this.informationClick
            },
            'projectuserlist actioncolumn[id=informationuser]': {
                click: this.informationuserClick
            },
            'projectreaduserlist actioncolumn[id=informationphoto]': {
                click: this.informationphotoClick
            },
            'projectlist actioncolumn[id=delete]':{
                click: this.deleteClick
            },
            'projectlist button[id=add]':{
                click: this.addClick
            },
            'projectlist button[id=save]': {
                click: this.updateClick
            },
            'projectlist button[id=back]': {
                click: this.backClick
            },
            'projectlist button[id=search]': {
                click: this.searchClick
            },
            'projectuserlist button[id=searchuser]': {
                click: this.searchuserClick
            },
            'projectreaduserlist button[id=searchread]': {
                click: this.searchreadClick
            },
            'projectunreaduserlist actioncolumn[id=informationunread]': {
                click: this.informationunreadClick
            }
        });
    },
	 
    informationphotoClick: function(o, item, rowIndex, colIndex, e){
		//alert(Ext.getCmp("keyword").getValue());
    	var grid = Ext.getCmp('projectreaduserGrid');
		var store = grid.getStore();
		//alert(store.getAt(rowIndex).get('zdy3'));
		if(store.getAt(rowIndex).get('zdy3') == '' || store.getAt(rowIndex).get('zdy3') == null){
			alert('δͶ��');
		}else{
			self.location = "projectphotolist.html?idtype=file&typeid="+ store.getAt(rowIndex).get('id');
		}
	 },
	 
    informationunreadClick: function(o, item, rowIndex, colIndex, e){
		//alert(Ext.getCmp("keyword").getValue());
    	var grid = Ext.getCmp('projectreaduserGrid');
		var store = grid.getStore();
		store.getProxy().url = "../projectreply/list.action?idtype=search&typeid="+ getParameter("typeid") +"_"+ o.getStore().getAt(rowIndex).get('username');
		store.load();
	 },
	 
    searchreadClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('projectreaduserlist');
		var store = grid.getStore();
		store.getProxy().url = "../projectreply/list.action?idtype=search&typeid="+ getParameter("typeid") +"_"+ Ext.getCmp("keywordread").getValue();
		store.load();
	 },
	 
    searchuserClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('projectuserlist');
		var store = grid.getStore();
		store.getProxy().url = "../user/list.action?idtype=search&typeid="+ Ext.getCmp("keyworduser").getValue();
		store.load();
	 },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('projectlist');
		var store = grid.getStore();
		store.getProxy().url = "../project/list.action?idtype=search&typeid="+ getParameter("typeid") +"_"+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    addcontentClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
        	Ext.Msg.alert('��ܰ��ʾ',"���ȱ���");
        }else{
        	self.location = "projectadd.html?id="+ store.getAt(rowIndex).get('id');
        }
    },
    
    backClick: function(o, item, rowIndex, colIndex, e){
    	self.location = "../admin/cataloglist.html?idtype=allwithlimit&typeid=0";
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else{
            var downgrid = Ext.getCmp('projectreaduserGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "../projectreply/list.action?idtype=projectwithlimit&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
            downgrid = Ext.getCmp('projectunreaduserGrid');
            downstore = downgrid.getStore();
            downstore.getProxy().url = "../projectreply/list.action?idtype=unread&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
        }
    },
    
    informationuserClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else{
            var downgrid = Ext.getCmp('projectreaduserGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "../projectreply/list.action?idtype=search&typeid="+ store.getAt(rowIndex).get('name');
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
                                url: '../project/delete.action?projectid='+ store.getAt(rowIndex).get('id'),
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
        var rec = new M.model.Project();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('projectlist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },

    updateClick: function(o) {
        var grid = o.up('projectlist');
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
            if(model.get('zdy5') == '' || model.get('zdy5') == null){
                isok = 0;
                err = "��ʼ���ڲ���Ϊ��";
            }
            if(model.get('zdy6') == '' || model.get('zdy6') == null){
                isok = 0;
                err = "��ֹ���ڲ���Ϊ��";
            }
            if(model.get('timefrom') == '' || model.get('timefrom') == null){
                isok = 0;
                err = "��ʼʱ�䲻��Ϊ��";
            }
            if(model.get('timeto') == '' || model.get('timeto') == null){
                isok = 0;
                err = "��ֹʱ�䲻��Ϊ��";
            }
            if(model.get('topstatus') == '' || model.get('topstatus') == null){
            	model.set('topstatus', 0);
            }
            model.set('signupnum', 0);
            model.set('readnum', 0);
            var typeid = 0;
            if(getParameter("typeid") == null || getParameter("typeid") == ''){
            	typeid = getCookie("typeid");
            }else{
            	typeid = getParameter("typeid");
            }
            model.set('catalogid',typeid);
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
                    url: '../project/add.action?project.zdy10='+ escape(data),
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
                                url: '../projectreply/delete.action?projectreplyid='+ store.getAt(rowIndex).get('id'),
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
        var rec = new M.model.Projectreply();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('projectreaduserlist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },

    readupdateClick: function(o) {
        var grid = o.up('projectreaduserlist');
        cellEdit.completeEdit();
        var store = grid.getStore();
        var records = store.getNewRecords();
        var records1 = store.getUpdatedRecords();
        records = records.concat(records1);
        var data = [];
        var isok = 1;
        var err = "";
        var url = store.getProxy().url;
		var projectid = getParameter("typeid");
		if(projectid == 0){
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
	            model.set('projectid', projectid);
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
                    url: '../projectreply/add.action?projectreply.zdy10='+ escape(data) +"&projectreply.projectid="+ projectid,
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