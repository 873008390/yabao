﻿Ext.define('M.controller.Promotions', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users',
             'User-promotionreaders',
             'Promotions'
         ],
    
    models: [
             'User',
             'Promotion'
            ],
         
    views: [
            'promotion.PromotionuserList',
            'promotion.PromotionreaduserList',
            'promotion.PromotionList'
        ],
       
    init: function() {
        this.control({
            'promotionlist actioncolumn[id=information]': {
                click: this.informationClick
            },
            'promotionuserlist actioncolumn[id=informationuser]': {
                click: this.informationuserClick
            },
            'promotionlist actioncolumn[id=delete]':{
                click: this.deleteClick
            },
            'promotionlist button[id=add]':{
                click: this.addClick
               },
            'promotionlist button[id=save]': {
                click: this.updateClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('promotionreaduserGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "user/list.action?idtype=allpromotionwithlimit&typeid="+ store.getAt(rowIndex).get('id');
			downstore.load();
    	}
    },
    
    informationuserClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		
    	}else{
    		var downgrid = Ext.getCmp('promotionGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "promotion/list.action?idtype=userwithlimit&typeid="+ store.getAt(rowIndex).get('id');
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
                 msg: '确定要删除：'+ store.getAt(rowIndex).get('name') +' ？',
                 buttons: Ext.Msg.OKCANCEL,
                 icon: Ext.Msg.QUESTION,
                 buttonText:{ok:'确定',cancel: '取消'},
                 fn:function(btn){
                     if(btn == 'ok') {
                         Ext.getBody().mask("数据处理中，请稍等");
                         var result = "";
                         Ext.Ajax.request({
                                url: 'promotion/delete.action?promotionid='+ store.getAt(rowIndex).get('id'),
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
        var rec = new M.model.Promotion();
        //var grid = o.ownerCt.ownerCt;
        var grid = o.up('promotionlist');
        var edit = grid.getPlugin('celledit');
        edit.cancelEdit();
        grid.getStore().insert(0, rec);
        edit.startEditByPosition({
            row:0,
            column:1
        });
     },

    updateClick: function(o) {
        var grid = o.up('promotionlist');
        cellEdit.completeEdit();
        var store = grid.getStore();
        var records = store.getNewRecords();
        var records1 = store.getUpdatedRecords();
        records = records.concat(records1);
        var data = [];
        var isok = 1;
        var err = "";
        Ext.Array.each(records, function(model){
            if(model.get('zdy2') == '' || model.get('zdy2') == null){
                isok = 0;
                err = "起始日期不能为空";
            }
            if(model.get('zdy3') == '' || model.get('zdy3') == null){
                isok = 0;
                err = "截止日期不能为空";
            }
            if(model.get('content') == '' || model.get('content') == null){
                isok = 0;
                err = "内容不能为空";
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
                    url: 'promotion/add.action?promotion.zdy10='+ escape(data),
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