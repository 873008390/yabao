Ext.define('M.controller.Patientreports', {
    extend: 'Ext.app.Controller',

    stores: [
             'Keyvalues-7'
         ],
    
    models: ['Keyvalue'],
         
    views: [
            'patient.PatientreportList'
        ],
       
    init: function() {
    	this.control({
    		'patientreportlist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'patientreportlist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	self.location = store.getAt(rowIndex).get('value');
    },
    
    backClick: function(o){
    	self.location = 'patientlist.html?idtype=allwithlimit&typeid=4';
    }
});