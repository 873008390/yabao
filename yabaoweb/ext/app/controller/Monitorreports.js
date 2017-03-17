Ext.define('M.controller.Monitorreports', {
    extend: 'Ext.app.Controller',

    stores: [
             'Keyvalues-11'
         ],
    
    models: ['Keyvalue'],
         
    views: [
            'monitor.MonitorreportList'
        ],
       
    init: function() {
    	this.control({
    		'monitorreportlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'monitorreportlist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = store.getAt(rowIndex).get('value');
    }
});