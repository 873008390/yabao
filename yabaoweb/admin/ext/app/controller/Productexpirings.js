Ext.define('M.controller.Productexpirings', {
    extend: 'Ext.app.Controller',

    stores: [
             'Products'
         ],
    
    models: ['Product'],
         
    views: [
            'productexpiring.ProductexpiringList',
            'productexpiring.ProductexpiringoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'productexpiringlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'productexpiringoutlinelist button[id=back]':{
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