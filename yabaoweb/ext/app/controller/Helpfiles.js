Ext.define('M.controller.Helpfiles', {
    extend: 'Ext.app.Controller',

    stores: [
             'Helpfiles'
         ],
    
    models: ['Helpfile'],
         
    views: [
            'helpfile.HelpfileList'
        ],
       
    init: function() {
    	this.control({
    		'helpfilelist actioncolumn[id=delete]':{
           	 	click: this.deleteClick
            },
            'helpfilelist actioncolumn[id=information]':{
              	click: this.updateHelpfile
            },
            'helpfilelist button[id=addhelp]': {
                click: this.addhelpClick
            },
            'helpfilelist button[id=add]': {
                click: this.addClick
            },
            'helpfilelist button[id=search]': {
                click: this.searchHelpfile
            },
            'helpfilelist button[id=back]': {
                click: this.backClick
            }
        });
    },
    
    backClick: function(o, item, rowIndex, colIndex, e){
    	self.location = "../admin/cataloglist.html?idtype=allwithlimit&typeid=0";
    },
	 
	searchHelpfile: function(o){
		//alert(Ext.getCmp("keyword").getValue());
		var grid = o.up('helpfilelist');
		var store = grid.getStore();
		store.getProxy().url = "../helpfile/list.action?idtype=search&typeid="+ Ext.getCmp("keyword").getValue();
		store.load();
	 },
    
    deleteClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
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
	   		    				url: '../helpfile/delete.action?helpfileid='+ store.getAt(rowIndex).get('id'),
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
	 
	addhelpClick: function(o){
		self.location = "helpfilephotoadd.html";
	 },
	 
	addClick: function(o){
		self.location = "helpfileadd.html?id=0";
	 },
	 
	 updateHelpfile: function(o, item, rowIndex, colIndex, e){
		    var store = o.getStore();
		    if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == ''){
		    	
		    }else{
		    	self.location = "helpfileadd.html?id="+ store.getAt(rowIndex).get('id');	
		    }
	}
});