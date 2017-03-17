Ext.define('M.controller.Drugstoresearchs', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customers'
         ],
    
    models: ['Customer'],
         
    views: [
            'drugstoresearch.DrugstoresearchList',
            'drugstoresearch.DrugstoreoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'drugstoresearchlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'drugstoreoutlinelist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = store.getAt(rowIndex).get('value');
    },
    
    backClick: function(o){
    	self.location = 'drugstorereportlist.html';
    }
});