Ext.define('M.controller.Pointreports', {
    extend: 'Ext.app.Controller',

    stores: [
             'Keyvalues-9'
         ],
    
    models: ['Keyvalue'],
         
    views: [
            'point.PointreportList'
        ],
       
    init: function() {
    	this.control({
    		'pointreportlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = store.getAt(rowIndex).get('value');
    }
});