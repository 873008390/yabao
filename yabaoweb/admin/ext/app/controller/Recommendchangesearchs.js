Ext.define('M.controller.Recommendchanges', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customers'
         ],
    
    models: ['Customer'],
         
    views: [
            'recommendchange.RecommendchangeList',
            'recommendchange.RecommendchangeoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'recommendchangelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'recommendchangeoutlinelist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = store.getAt(rowIndex).get('value');
    },
    
    backClick: function(o){
    	self.location = 'monitorreportlist.html';
    }
});