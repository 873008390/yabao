Ext.define('M.controller.Pointdetails', {
    extend: 'Ext.app.Controller',

    stores: [
             'Pointdetails'
         ],
    
    models: ['Pointdetail'],
         
    views: [
            'pointdetail.PointdetailList'
        ],
       
    init: function() {
    	this.control({
    		'pointdetaillist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'pointdetaillist button[id=add]':{
              	click: this.addClick
               },
            'pointdetaillist button[id=save]': {
                click: this.updatePointdetail
            }
        });
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
	   		    				url: 'pointdetail/delete.action?pointdetailid='+ store.getAt(rowIndex).get('id'),
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
		var rec = new M.model.Pointdetail();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('pointdetaillist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updatePointdetail: function(o) {
    	var grid = o.up('pointdetaillist');
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
                err = "姓名不能为空";
            }

    		if(model.get('pointdate') == '' || model.get('pointdate') == null){
    			isok = 0;
    			err = "日期不能为空";
    		}
    		if(model.get('point') == '' || model.get('point') == null){
    			isok = 0;
    			err = "积分值不能为空";
    		}
    		if(model.get('pointtype') == '' || model.get('pointtype') == null){
    			isok = 0;
    			err = "类型不能为空";
    		}
    		if(model.get('memo') == '' || model.get('memo') == null){
    			isok = 0;
    			err = "备注不能为空";
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
    				url: 'pointdetail/add.action?pointdetail.zdy10='+ escape(data),
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