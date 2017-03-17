Ext.define('M.controller.Honors', {
    extend: 'Ext.app.Controller',

    stores: [
             'Honors'
         ],
    
    models: ['Honor'],
         
    views: [
            'honor.HonorList'
        ],
       
    init: function() {
    	this.control({
    		'honorlist button[id=add]':{
              	click: this.addClick
            },
            'honorlist actioncolumn[id=information]':{
              	click: this.informationClick
            },
            'honorlist actioncolumn[id=delete]':{
              	click: this.deleteClick
            },
            'honorlist button[id=back]': {
                click: this.backClick
            }
        });
    },
    
    backClick: function(o, item, rowIndex, colIndex, e){
    	self.location = "../admin/cataloglist.html?idtype=allwithlimit&typeid=0";
    },
	 
    informationClick: function(o, item, rowIndex, colIndex, e){
		store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == '0'){
    		
    	}else{
    		self.location = "honoradd.html?catalogid="+ store.getAt(rowIndex).get('catalogid') +"&id="+ store.getAt(rowIndex).get('id');
    	}
	},

    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
    		store.removeAt(rowIndex);
    	}else{
    		Ext.Msg.show({
	   		     title:'温馨提示',
	   		     msg: '确定要删除：'+ store.getAt(rowIndex).get('zdy3') +' ？',
	   		     buttons: Ext.Msg.OKCANCEL,
	   		     icon: Ext.Msg.QUESTION,
	   		     buttonText:{ok:'确定',cancel: '取消'},
	   		     fn:function(btn){
	   		    	 if(btn == 'ok') {
	   		    		 Ext.getBody().mask("数据处理中，请稍等");
	   		             var result = "";
	   		             Ext.Ajax.request({
	   		    				url: '../about/delete.action?aboutid='+ store.getAt(rowIndex).get('id'),
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
		var grid = o.up('honorlist');
		var store = grid.getStore();
		self.location = "honoradd.html?catalogid="+ getParameter('typeid') +"&id=0";
	}
});