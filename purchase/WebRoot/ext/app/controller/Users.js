Ext.define('M.controller.Users', {
    extend: 'Ext.app.Controller',

    stores: [
             'Users'
         ],
    
    models: ['User'
        ],
         
    views: [
            'user.UserList'
        ],
       
    init: function() {
    	this.control({
    		'userlist button[id=delete]':{
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
            },
            'userlist button[id=information]': {
                click: this.informationuserClick
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
    	var grid = o.up('userlist');
    	var store = grid.getStore();
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
    		var rowIndex = store.indexOf(record);
	    	if(record.get('id') == null || record.get('id') == ''){
	    		store.removeAt(rowIndex);
	    	}else{
	    		var message = confirm("ȷ��Ҫɾ����"+ record.get('name') +" ��");
	    		if(message == true){
	    			 Ext.getBody().mask("���ݴ����У����Ե�");
  		             var result = "";
  		             Ext.Ajax.request({
  		    				url: 'user/delete.action?userid='+ record.get('id'),
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
    		alert("��ѡ���û�");
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
    		if(model.get('zdy3') == '�ڲ�Ա��' && (model.get('zdy8') == null || model.get('zdy8') == '')){
    			isok = 0;
    			err = "�ڲ�Ա����ѡ�������ڲ���λ";
    		}
    		if(model.get('zdy3') == '��Ӧ��' && (model.get('zdy7') == null || model.get('zdy7') == '')){
    			isok = 0;
    			err = "��Ӧ���˺���ѡ��������Ӧ��";
    		}
    		if(model.get('auditstatus') == '' || model.get('auditstatus') == null){
    			model.set('auditstatus', 1);
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
    				url: 'user/add.action?user.zdy10='+ escape(data),
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
    informationuserClick: function(o){
    	var grid = o.up('userlist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		alert("���ȱ���");
	    	}else{
	    		self.location = "permissionlist-main.html?idtype=user&typeid="+ record.get('id');
	    	}
    	}else{
    		alert("��ѡ���û�");
    	}
    }
});