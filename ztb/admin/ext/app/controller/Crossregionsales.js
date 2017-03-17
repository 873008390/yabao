Ext.define('M.controller.Crossregionsales', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customers'
         ],
    
    models: ['Customer'],
         
    views: [
            'crossregionsale.CrossregionsaleList',
            'crossregionsale.CrossregionsaleoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'crossregionsalelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'crossregionsaleoutlinelist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = store.getAt(rowIndex).get('value');
    },
    
    backClick: function(o){
    	self.location = 'doctorreportlist.html';
    }
});