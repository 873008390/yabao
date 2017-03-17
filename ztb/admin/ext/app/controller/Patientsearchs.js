Ext.define('M.controller.Patientsearchs', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customer-patientsales',
             'Customer-patientsearchs'
         ],
    
    models: ['Customer'],
         
    views: [
            'patientsearch.PatientsearchList',
            'patientsearch.PatientoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'patientoutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'patientoutlinelist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == '0'){
    		
    	}else{
    		var downgrid = Ext.getCmp('patientsearchGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "customer/list.action?idtype=patientsearch&typeid="+ store.getAt(rowIndex).get('zdy3') +"_"+ store.getAt(rowIndex).get('zdy4');
			downstore.load();
    	}
    },
    
    backClick: function(o){
    	self.location = 'patientreportlist.html';
    }
});