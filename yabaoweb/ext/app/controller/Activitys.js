Ext.define('M.controller.Activitys', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users',
             'User-activityreaders',
             'Activitys',
             'Activityreplys',
             'Activityreply-unreads'
         ],
    
    models: [
             'User',
             'Activity',
             'Activityreply'
            ],
         
    views: [
            'activity.ActivityuserList',
            'activity.ActivityreaduserList',
            'activity.ActivityunreaduserList',
            'activity.ActivityList'
        ],
       
    init: function() {
        this.control({
            'activitylist actioncolumn[id=addcontent]': {
                click: this.addcontentClick
            },
            'activitylist actioncolumn[id=information]': {
                click: this.informationClick
            },
            'activityuserlist actioncolumn[id=informationuser]': {
                click: this.informationuserClick
            },
            'activitylist actioncolumn[id=informationphoto]': {
                click: this.informationphotoClick
            },
            'activitylist actioncolumn[id=delete]':{
                click: this.deleteClick
            },
            'activitylist button[id=add]':{
                click: this.addClick
            },
            'activitylist button[id=save]': {
                click: this.updateClick
            },
            'activityreaduserlist actioncolumn[id=readdelete]':{
                click: this.readdeleteClick
            },
            'activityreaduserlist button[id=readadd]':{
                click: this.readaddClick
            },
            'activityreaduserlist button[id=readsave]': {
                click: this.readupdateClick
            },
            'activitylist button[id=search]': {
                click: this.searchClick
            },
            'activityuserlist button[id=searchuser]': {
                click: this.searchuserClick
            },
            'activityreaduserlist button[id=searchread]': {
                click: this.searchreadClick
            },
            'activityunreaduserlist actioncolumn[id=informationunread]': {
                click: this.informationunreadClick
            }
        });
    },
	 
    informationunreadClick: function(o, item, rowIndex, colIndex, e){
		//alert(Ext.getCmp("keyword").getValue());
    	var grid = Ext.getCmp('activityreaduserGrid');
		var store = grid.getStore();
		store.getProxy().url = "activityreply/list.action?idtype=search&typeid="+ o.getStore().getAt(rowIndex).get('username');
		store.load();
	 },
	 
    searchreadClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('activityreaduserlist');
		var store = grid.getStore();
		store.getProxy().url = "activityreply/list.action?idtype=search&typeid="+ Ext.getCmp("keywordread").getValue();
		store.load();
	 },
	 
    searchuserClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('activityuserlist');
		var store = grid.getStore();
		store.getProxy().url = "user/list.action?idtype=search&typeid="+ Ext.getCmp("keyworduser").getValue();
		store.load();
	 },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('activitylist');
		var store = grid.getStore();
		store.getProxy().url = "activity/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    addcontentClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
        	Ext.Msg.alert('温馨提示',"请先保存");
        }else{
        	self.location = "activityadd.html?id="+ store.getAt(rowIndex).get('id');
        }
    },
    
    informationphotoClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = "activityphotolist.html?idtype=activity&typeid="+ store.getAt(rowIndex).get('id');
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else{
            var downgrid = Ext.getCmp('activityreaduserGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "activityreply/list.action?idtype=activitywithlimit&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
            downgrid = Ext.getCmp('activityunreaduserGrid');
            downstore = downgrid.getStore();
            downstore.getProxy().url = "activityreply/list.action?idtype=unread&typeid="+ store.getAt(rowIndex).get('id');
            downstore.load();
        }
    },
    
    informationuserClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            
        }else{
            var downgrid = Ext.getCmp('activityreaduserGrid');
            var downstore = downgrid.getStore();
            downstore.getProxy().url = "activityreply/list.action?idtype=search&typeid="+ store.getAt(rowIndex).get('name');
            downstore.load();
        }
    },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            store.removeAt(rowIndex);
        }else{
            Ext.Msg.show({
                 title:'温馨提示',
                 msg: '确定要删除：'+ store.getAt(rowIndex).get('title') +' ？',
                 buttons: Ext.Msg.OKCANCEL,
                 icon: Ext.Msg.QUESTION,
                 buttonText:{ok:'确定',cancel: '取消'},
                 fn:function(btn){
                     if(btn == 'ok') {
                         Ext.getBody().mask("数据处理中，请稍等");
                         var result = "";
                         Ext.Ajax.request({
                                url: 'activity/delete.action?activityid='+ store.getAt(rowIndex).get('id'),
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
     
    addClick: function(o){
        var rec = new M.model.Activity();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('activitylist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },

    updateClick: function(o) {
        var grid = o.up('activitylist');
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
                err = "标题不能为空";
            }
            if(model.get('zdy4') == '' || model.get('zdy4') == null){
                isok = 0;
                err = "城市不能为空";
            }
            if(model.get('zdy5') == '' || model.get('zdy5') == null){
                isok = 0;
                err = "活动开始日期不能为空";
            }
            if(model.get('zdy6') == '' || model.get('zdy6') == null){
                isok = 0;
                err = "活动截止日期不能为空";
            }
            if(model.get('timefrom') == '' || model.get('timefrom') == null){
                isok = 0;
                err = "开始时间不能为空";
            }
            if(model.get('timeto') == '' || model.get('timeto') == null){
                isok = 0;
                err = "截止时间不能为空";
            }
            if(model.get('zdy7') == '' || model.get('zdy7') == null){
                isok = 0;
                err = "类型不能为空";
            }
            if(model.get('topstatus') == '' || model.get('topstatus') == null){
            	model.set('topstatus', 0);
            }
            model.set('signupnum', 0);
            model.set('photonum', 0);
            model.set('readnum', 0);
            model.set('sharenum', 0);
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
                    url: 'activity/add.action?activity.zdy10='+ escape(data),
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
    
    readdeleteClick: function(o, item, rowIndex, colIndex, e){
        store = o.getStore();
        if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
            store.removeAt(rowIndex);
        }else{
            Ext.Msg.show({
                 title:'温馨提示',
                 msg: '确定要删除：'+ store.getAt(rowIndex).get('username') +' ？',
                 buttons: Ext.Msg.OKCANCEL,
                 icon: Ext.Msg.QUESTION,
                 buttonText:{ok:'确定',cancel: '取消'},
                 fn:function(btn){
                     if(btn == 'ok') {
                         Ext.getBody().mask("数据处理中，请稍等");
                         var result = "";
                         Ext.Ajax.request({
                                url: 'activityreply/delete.action?activityreplyid='+ store.getAt(rowIndex).get('id'),
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
     
    readaddClick: function(o){
        var rec = new M.model.Activityreply();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('activityreaduserlist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },

    readupdateClick: function(o) {
        var grid = o.up('activityreaduserlist');
        cellEdit.completeEdit();
        var store = grid.getStore();
        var records = store.getNewRecords();
        var records1 = store.getUpdatedRecords();
        records = records.concat(records1);
        var data = [];
        var isok = 1;
        var err = "";
        var url = store.getProxy().url;
		var activityid = url.split("typeid=")[1];
		if(activityid == 0){
			isok = 0;
			err = "请先选择活动";
		}else{
	        Ext.Array.each(records, function(model){
	            if(model.get('username') == '' || model.get('username') == null){
	                isok = 0;
	                err = "姓名不能为空";
	            }
	            if(model.get('zdy2') == '' || model.get('zdy2') == null){
	                isok = 0;
	                err = "报名日期不能为空";
	            }
	            if(model.get('phoneno') == '' || model.get('phoneno') == null){
	                isok = 0;
	                err = "手机号不能为空";
	            }
	            if(model.get('activityid') == '' || model.get('activityid') == null){
	                model.set('activityid', 0);
	            }
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
                    url: 'activityreply/add.action?activityreply.zdy10='+ escape(data) +"&activityreply.activityid="+ activityid,
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
    }
});