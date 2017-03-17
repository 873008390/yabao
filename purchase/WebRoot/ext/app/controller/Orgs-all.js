Ext.define('M.controller.Orgs-all', {
    extend: 'Ext.app.Controller',

    stores: [
             'Orgs-all'
         ],
    
    models: [
             'Org'
            ],
         
    views: [
            'auditgroup.OrgList'
        ],
       
    init: function() {
    	this.control({
    		'orglist' : {
    			itemdblclick: this.informationorgClick
    		},
    		'orglist button[id=informationorg]':{
           	 	click: this.informationorgClick
            }
        });
    },
    informationorgClick:function(o){
    	var grid = o.up('orglist');
    	var model = grid.getSelectionModel();
    	if(model.hasSelection()){
	    	var record = model.getLastSelected();
	    	if(record.get('id') == null || record.get('id') == ''){
	    		alert("请先保存");
	    	}else{
	    		parent.location = "auditgrouplist.html?idtype=org&typeid="+ record.get('id');
	    	}
    	}else{
    		alert("请选择机构");
    	}
    },
	

    
});