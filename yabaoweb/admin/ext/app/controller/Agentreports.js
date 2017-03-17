Ext.define('M.controller.Agentreports', {
    extend: 'Ext.app.Controller',

    stores: [
             'Keyvalues-8'
         ],
    
    models: ['Keyvalue'],
         
    views: [
            'agent.AgentreportList'
        ],
       
    init: function() {
    	this.control({
    		'agentreportlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'agentreportlist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = store.getAt(rowIndex).get('value');
    },
    
    backClick: function(o){
    	self.location = 'agentlist.html?idtype=allwithlimit&typeid=1';
    }
});