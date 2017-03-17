Ext.define('M.controller.Users', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users'
         ],
    
    models: ['User'],
         
    views: [
            'user.UserList'
        ],
       
    init: function() {
    	this.control({
    		'userlist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'userlist button[id=add]':{
              	click: this.addClick
            },
            'userlist button[id=save]': {
                click: this.updateUser
            },
            'userlist button[id=search]': {
                click: this.searchUser
            }
        });
    },
	 
	searchUser: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('userlist');
		var store = grid.getStore();
		store.getProxy().url = "user/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('account') == 'admin'){
    		alert("����Ա�ʺŲ���ɾ��");
    	}else{
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
		   		    				url: 'user/delete.action?userid='+ store.getAt(rowIndex).get('id'),
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
    	}
    },
	 
	addClick: function(o){
		var rec = new M.model.User();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('userlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateUser: function(o) {
    	var grid = o.up('userlist');
    	cellEdit.completeEdit();
		var store = grid.getStore();
    	var records = store.getNewRecords();
    	var records1 = store.getUpdatedRecords();
    	records = records.concat(records1);
    	var data = [];
    	var isok = 1;
    	var err = "";
    	Ext.Array.each(records, function(model){
    		if(model.get('zdy3') == '' || model.get('zdy3') == null){
    			isok = 0;
    			err = "���Ͳ���Ϊ��";
    		}
    		if(model.get('name') == '' || model.get('name') == null){
    			isok = 0;
    			err = "��������Ϊ��";
    		}
    		if(model.get('account') == '' || model.get('account') == null){
    			isok = 0;
    			err = "�˺Ų���Ϊ��";
    		}
    		if(model.get('password') == '' || model.get('password') == null){
    			isok = 0;
    			err = "���벻��Ϊ��";
    		}else{
	    		if(model.get('password') != '****'){
	    			model.set('password', hex_md5(model.get('password')));
	    		}else{
	    			if(model.get('id') == null || model.get('id') == ''){
		    			isok = 0;
		    			err = "���벻��Ϊ4��*";
	    			}
	    		}
    		}
    		if(model.get('zdy3') == '2' && (model.get('zdy7') == null || model.get('zdy7') == '')){
    			isok = 0;
    			err = "�ͻ��˺���ѡ�������ͻ�";
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
    				url: 'user/add.action?user.zdy10='+ escape(data),
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