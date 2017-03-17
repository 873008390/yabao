Ext.define('M.controller.Agentsales', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customer-agentsales',
             'Sales'
         ],
    
    models: [
             'Customer',
             'Sale'
            ],
         
    views: [
            'agentsale.AgentsaleList',
            'agentsale.AgentsaleoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'agentsaleoutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'agentsaleoutlinelist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == '0'){
    		
    	}else{
    		var downgrid = Ext.getCmp('agentsaleGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "sale/list.action?idtype=agentsale&typeid="+ store.getAt(rowIndex).get('zdy3') +"_"+ store.getAt(rowIndex).get('zdy4');
			downstore.load();
    	}
    },
    
    backClick: function(o){
    	self.location = 'agentreportlist.html';
    }
});