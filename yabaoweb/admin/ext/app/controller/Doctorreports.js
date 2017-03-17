Ext.define('M.controller.Doctorreports', {
    extend: 'Ext.app.Controller',

    stores: [
             'Keyvalues-5'
         ],
    
    models: ['Keyvalue'],
         
    views: [
            'doctor.DoctorreportList'
        ],
       
    init: function() {
    	this.control({
    		'doctorreportlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'doctorreportlist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = store.getAt(rowIndex).get('value');
    },
    
    backClick: function(o){
    	self.location = 'doctorlist.html?idtype=allwithlimit&typeid=2';
    }
});