Ext.define('M.controller.Patientsales', {
    extend: 'Ext.app.Controller',

    stores: [
             'Customer-patientsales',
             'Sales'
         ],
    
    models: [
              'Customer',
              'Sale'
            ],
         
    views: [
            'patientsale.PatientsaleList',
            'patientsale.PatientsaleoutlineList'
        ],
       
    init: function() {
    	this.control({
    		'patientsaleoutlinelist actioncolumn[id=information]':{
           	 	click: this.informationClick
            },
            'patientsaleoutlinelist button[id=back]':{
           	 	click: this.backClick
            }
        });
    },
    
    informationClick: function(o, item, rowIndex, colIndex, e){
    	store = o.getStore();
    	if(store.getAt(rowIndex).get('id') == null || store.getAt(rowIndex).get('id') == '0'){
    		
    	}else{
    		var downgrid = Ext.getCmp('patientsaleGrid');
			var downstore = downgrid.getStore();
			downstore.getProxy().url = "sale/list.action?idtype=patientsale&typeid="+ store.getAt(rowIndex).get('zdy3') +"_"+ store.getAt(rowIndex).get('zdy4');
			downstore.load();
    	}
    },
    
    backClick: function(o){
    	self.location = 'patientreportlist.html';
    }
});