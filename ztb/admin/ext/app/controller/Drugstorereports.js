Ext.define('M.controller.Drugstorereports', {
    extend: 'Ext.app.Controller',

    stores: [
             'Keyvalues-6'
         ],
    
    models: ['Keyvalue'],
         
    views: [
            'drugstore.DrugstorereportList'
        ],
       
    init: function() {
    	this.control({
    		'drugstorereportlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'drugstorereportlist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = store.getAt(rowIndex).get('value');
    },
    
    backClick: function(o){
    	self.location = 'drugstorelist.html?idtype=allwithlimit&typeid=3';
    }
});