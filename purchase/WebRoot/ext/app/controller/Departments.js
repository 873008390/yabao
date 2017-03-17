Ext.define('M.controller.Departments', {
    extend: 'Ext.app.Controller',

    stores: [
             'Departments',
             'Orgs-all'
         ],
    
    models: ['Department',
             'Org'
			 ],
         
    views: [
            'department.DepartmentList',
            'department.OrgList'
        ],
       
    init: function() {
    	this.control({
    		'orglist' : {
    			itemdblclick: this.informationorgClick
    		},
            'departmentlist button[id=back]': {
                click: this.backClick
            },
    		'departmentlist button[id=delete]':{
           	 	click: this.deleteClick
            },
            'departmentlist button[id=syn]': {
                click: this.synClick
            },
            'departmentlist button[id=add]':{
              	click: this.addClick
            },
            'departmentlist button[id=save]': {
                click: this.updateDepartment
            },
            'departmentlist button[id=exportexcel]': {
            	click: this.exportExcelClick
            },
            'orglist  button[id=informationorg]':{
            	click: this.informationorgClick 
            }
        });
    },
    
    backClick:function(o){
    	history.back();
    },
    
    informationorgClick:function(o){
    	var grid = o.up('orglist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		alert("���ȱ���");
	    	}else{
	    		parent.location = "departmentlist.html?idtype=org&typeid="+ record.get('id');
	    	}
    	}else{
    		alert("��ѡ�����");
    	}
    },
    
    exportExcelClick: function(o){
    	var message = confirm("�Ƿ�ʼ������");
    	if(message == true){
    		Ext.Ajax.request({
                url: 'department/exportDepartmentExcel.action?idtype=exportwithlimit&typeid=' + getParameter("typeid"),
                method: 'GET',
                timeout: 40000,
                success: function(response,opts){
                    Ext.getBody().unmask();
                	var obj = Ext.JSON.decode(response.responseText);
                	window.location.href = obj.result;
                },
                failure: function(response,opts){
                	Ext.getBody().unmask();
                	alert("����ʧ�ܣ�");
                }
    		});
    	}
    },
    synClick: function(o){
    	var message = confirm("���ڿ�ʼͬ�� ��");
    	if(message == true){
            var result = "";
    		//Ext.getBody().mask("���ݴ����У����Ե�");
            Ext.Ajax.request({
                   url: 'department/syn.action',
                   method: 'GET',
                   timeout: 8000,
                   success: function(response,opts){
                       var result = Ext.JSON.decode(response.responseText);
                       if(result.result == "ͬ���ɹ�"){
                    	   alert("ͬ��ִ���У����Ժ��ٲ�ѯ");
	                       var grid = o.up('departmentlist');
	                       var store = grid.getStore();
	                       store.reload();
                       }else{
                    	   alert(result.result);
                       }
                       Ext.getBody().unmask();
                   },
                   failure: function(response,opts){
                       var result = Ext.JSON.decode(response.responseText);
                       Ext.getBody().unmask();
                   }
            });
    	}
	   
    },
    
    deleteClick: function(o){
    	var grid = o.up('departmentlist');
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
  		    				url: 'department/delete.action?departmentid='+ record.get('id'),
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
    		alert("��ѡ����");
    	}
    },
	 
	addClick: function(o){
		var rec = new M.model.Department();
		//var grid = o.ownerCt.ownerCt;
		var grid = o.up('departmentlist');
		var edit = grid.getPlugin('celledit');
		edit.cancelEdit();
		grid.getStore().insert(0, rec);
		edit.startEditByPosition({
			row:0,
			column:1
		});
	 },

    updateDepartment: function(o) {
    	var grid = o.up('departmentlist');
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
    		model.set('zdy2', "");
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
    				url: 'department/add.action?department.zdy10='+ escape(data),
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
    }
});