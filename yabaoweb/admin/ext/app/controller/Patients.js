Ext.define('M.controller.Patients', {
    extend: 'Ext.app.Controller',

    stores: [
             'Patients'
         ],
    
    models: ['Patient'],
         
    views: [
            'patient.PatientList'
        ],
       
    init: function() {
    	this.control({
    		'patientlist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'patientlist button[id=add]':{
              	click: this.addClick
               },
            'patientlist button[id=save]': {
                click: this.updatePatient
            },
            'patientlist button[id=report]': {
                click: this.reportClick
            },
            'patientlist button[id=search]': {
                click: this.searchClick
            },
            'patientlist actioncolumn[id=informationphoto]': {
                click: this.informationphotoClick
            },
            'patientlist actioncolumn[id=tosharer]': {
                click: this.tosharerClick
            }
        });
    },
    
    tosharerClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();   
    	if(store.getAt(rowIndex).get('id') == 0){
    		alert("虚拟患者不能转分享人");
    	}else{
	    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
	    		store.removeAt(rowIndex);
	    	}else{
	    		
	    		Ext.Msg.show({
		   		     title:'温馨提示',
		   		     msg: '确定要转成分享人：'+ store.getAt(rowIndex).get('name') +'？',
		   		     buttons: Ext.Msg.OKCANCEL,
		   		     icon: Ext.Msg.QUESTION,
		   		     buttonText:{ok:'确定',cancel: '取消'},
		   		     fn:function(btn){
		   		    	 if(btn == 'ok') {
		   		    		 Ext.getBody().mask("数据处理中，请稍等");
		   		             var result = "";
		   		             Ext.Ajax.request({
		   		    				url: 'customer/modify.action?idtype=tosharer&customer.id='+ store.getAt(rowIndex).get('id'),
		   		    				method: 'GET',
		   		    				timeout: 4000,
		   		    				success: function(response,opts){
		   		    					var result = Ext.JSON.decode(response.responseText);
		   		    					Ext.Msg.alert("温馨提示",result.result);
		   		    					if(result.result.indexOf("成功")>-1){
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
    	}
    },
    
    informationphotoClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = "patientphotolist.html?idtype=customer&typeid="+ store.getAt(rowIndex).get('id');
    },
	 
    searchClick: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('patientlist');
		var store = grid.getStore();
		store.getProxy().url = "customer/list.action?idtype=search&typeid=4_"+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
	 
	reportClick: function(o){
		self.location = 'patientreportlist.html';
	 },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == 0){
    		alert("虚拟患者不能删除");
    	}else{
	    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
	    		store.removeAt(rowIndex);
	    	}else{
	    		Ext.Msg.show({
		   		     title:'温馨提示',
		   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('name') +'？',
		   		     buttons: Ext.Msg.OKCANCEL,
		   		     icon: Ext.Msg.QUESTION,
		   		     buttonText:{ok:'确定',cancel: '取消'},
		   		     fn:function(btn){
		   		    	 if(btn == 'ok') {
		   		    		 Ext.getBody().mask("数据处理中，请稍等");
		   		             var result = "";
		   		             Ext.Ajax.request({
		   		    				url: 'customer/delete.action?customerid='+ store.getAt(rowIndex).get('id'),
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
    	}
    },
	 
	addClick: function(o){
		var rec = new M.model.Customer();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('patientlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updatePatient: function(o) {
    	var grid = o.up('patientlist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('zdy2') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "推荐人不能为空";
    		}
    		if(model.get('name') == '' || model.get('name') == null){
    			isok = 0;
    			err = "姓名不能为空";
    		}
    		if(model.get('zdy3') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "省份不能为空";
    		}
    		if(model.get('zdy4') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "城市不能为空";
    		}
    		if((model.get('phoneno') == '' || model.get('phoneno') == null) && (model.get('tel') == '' || model.get('tel') == null)){
    			isok = 0;
    			err = "手机和电话不能同时为空";
    		}
    		if(model.get('age') == '' || model.get('age') == null){
    			model.set('age', 0);
    		}
    		if(model.get('clearstatus') == '' || model.get('clearstatus') == null){
    			model.set('clearstatus', 0);
    		}
    		model.set('type', 4);
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
    				url: 'customer/add.action?customer.zdy10='+ escape(data),
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